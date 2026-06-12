import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { rooms } from '../data/rooms.js';
import {
  confirmacion,
  contactoHeader,
  contactoInfo,
  errores,
  formCopy,
  guestOptions,
} from '../data/contact.js';

/* ============================================================
   Utilidades puras (sin estado de React)
   ============================================================ */

/** Fecha local de hoy en formato YYYY-MM-DD para el atributo `min`. */
function hoyISO() {
  const ahora = new Date();
  ahora.setMinutes(ahora.getMinutes() - ahora.getTimezoneOffset());
  return ahora.toISOString().slice(0, 10);
}

/* Email: validación deliberadamente conservadora — algo@algo.dominio,
   sin espacios. No se persigue el RFC 5322 completo; el objetivo es
   atajar el typo evidente, no rechazar correos legítimos raros. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Convierte una fecha YYYY-MM-DD en texto legible es-MX para el resumen
 * de confirmación (ej. "14 de julio de 2026"). Se construye en hora
 * local con desestructuración para evitar el corrimiento de zona que
 * sufre `new Date('2026-07-14')` (que se interpreta como UTC).
 */
function fechaLegible(iso) {
  if (!iso) return '';
  const [anio, mes, dia] = iso.split('-').map(Number);
  if (!anio || !mes || !dia) return iso;
  const fecha = new Date(anio, mes - 1, dia);
  return fecha.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Texto del huésped a partir del value del select (copy §8.2). */
function huespedesLegible(value) {
  return guestOptions.find((option) => option.value === value)?.label ?? '';
}

/** formLabel de la habitación elegida; "Sin preferencia" si no hay slug. */
function habitacionLegible(slug) {
  if (!slug) return formCopy.habitacion.sinPreferencia;
  return (
    rooms.find((room) => room.slug === slug)?.formLabel ??
    formCopy.habitacion.sinPreferencia
  );
}

/**
 * Valida el formulario completo y devuelve un objeto { campo: mensaje }
 * solo con los campos en error. Reglas (copy §8.3, brief §4.7):
 *  - nombre: requerido.
 *  - email: requerido + formato válido.
 *  - llegada: requerida + no en el pasado.
 *  - salida: requerida + estrictamente posterior a llegada.
 *  - huéspedes: requerido (sin valor por defecto: se elige activamente).
 * Mensaje (opcional) no se valida.
 */
function validar(valores, hoy) {
  const next = {};

  if (!valores.nombre.trim()) next.nombre = errores.nombreVacio;

  if (!valores.email.trim()) next.email = errores.emailVacio;
  else if (!EMAIL_RE.test(valores.email.trim()))
    next.email = errores.emailInvalido;

  if (!valores.llegada) next.llegada = errores.llegadaVacia;
  else if (valores.llegada < hoy) next.llegada = errores.llegadaPasado;

  if (!valores.salida) next.salida = errores.salidaVacia;
  /* Comparación de cadenas ISO (YYYY-MM-DD ordena lexicográficamente):
     la salida debe ser estrictamente posterior a la llegada. Solo se
     evalúa cuando la llegada es válida, para no apilar dos errores de
     fecha sobre el mismo malentendido. */
  else if (valores.llegada && valores.salida <= valores.llegada)
    next.salida = errores.salidaInvalida;

  if (!valores.huespedes) next.huespedes = errores.huespedesVacio;

  return next;
}

/* Orden de campos para llevar el foco al primero con error al enviar. */
const ORDEN_CAMPOS = ['nombre', 'email', 'llegada', 'salida', 'huespedes'];

/* ============================================================
   Subrayado dorado de feedback (mismo lenguaje que la BookingBar,
   brief §6.7). Crece de izquierda a derecha al enfocar; queda tenue
   cuando el campo ya tiene valor. Solo transform y opacity. El wrapper
   del campo debe ser `group relative`.
   ============================================================ */
function FieldUnderline({ filled }) {
  return (
    <span
      aria-hidden="true"
      className={[
        'pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-dorado',
        'transition-[transform,opacity] duration-300 ease-out',
        'group-focus-within:scale-x-100 group-focus-within:opacity-100',
        filled ? 'scale-x-100 opacity-50' : 'scale-x-0 opacity-0',
      ].join(' ')}
    />
  );
}

/* ============================================================
   Mensaje de error de campo. Aparece con fade ≤150ms (brief §6:
   "la validación es seria, no juguetona"; sin animación de entrada
   por campo más allá del fundido del mensaje). El color de error se
   deriva de la paleta: texto `marino` (no rojo genérico fuera de
   tokens) y el borde `dorado` del campo es la señal de estado. La
   intención semántica se transmite por `role="alert"`, no por el
   color, para no depender de él (WCAG 1.4.1). Coordinar con el
   visual-designer.
   ============================================================ */
function FieldError({ id, mensaje }) {
  return (
    <p
      id={id}
      role="alert"
      className={[
        'mt-2 flex items-start gap-1.5 text-sm text-marino',
        'transition-opacity duration-150 ease-out',
      ].join(' ')}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="mt-0.5 shrink-0 text-dorado"
      >
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="8" x2="12" y2="13" />
        <line x1="12" y1="16.5" x2="12" y2="16.5" />
      </svg>
      <span>{mensaje}</span>
    </p>
  );
}

/* ============================================================
   Modal de confirmación simulada (copy §8.4). Patrón de foco/teclado
   tomado de Navbar.jsx: role="dialog" + aria-modal, foco atrapado,
   Esc cierra, scroll del body bloqueado, y al cerrar el foco vuelve al
   elemento que abrió el modal.
   ============================================================ */
function ConfirmacionModal({ resumen, onClose, returnFocusRef }) {
  const panelRef = useRef(null);
  const tituloId = useId();
  const cuerpoId = useId();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    /* Foco inicial dentro del diálogo (el botón "Entendido"). */
    const cerrar = panelRef.current?.querySelector('[data-autofocus]');
    cerrar?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusables = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      returnFocusRef?.current?.focus();
    };
  }, [onClose, returnFocusRef]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-5 motion-safe:animate-fade-rise"
      role="dialog"
      aria-modal="true"
      aria-labelledby={tituloId}
      aria-describedby={cuerpoId}
    >
      {/* Telón marino (brief §1.1: overlay marino, nunca negro puro). */}
      <button
        type="button"
        aria-label="Cerrar"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 -z-10 cursor-default bg-marino/80 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        className="relative w-full max-w-lg bg-marfil px-7 py-9 shadow-[0_40px_90px_-30px] shadow-marino/60 ring-1 ring-arena sm:px-10 sm:py-11"
      >
        <p className="eyebrow text-marino">{contactoHeader.eyebrow}</p>
        <h2
          id={tituloId}
          className="mt-4 font-display text-3xl font-light leading-tight text-marino sm:text-4xl"
        >
          {confirmacion.titulo}
        </h2>
        <div className="mt-6 h-px w-12 bg-dorado" aria-hidden="true" />

        <p
          id={cuerpoId}
          className="mt-6 text-base leading-relaxed text-marino/80"
        >
          Gracias, {resumen.nombre}. Recibimos tu solicitud para{' '}
          <span className="text-marino">{resumen.tipoHabitacion}</span> ·{' '}
          <span className="text-marino">
            {resumen.fechaLlegada} – {resumen.fechaSalida}
          </span>{' '}
          · <span className="text-marino">{resumen.huespedes}</span>. Nuestro
          concierge revisará la disponibilidad y te escribirá a{' '}
          <span className="text-marino">{resumen.email}</span> en el transcurso
          del día para confirmar los detalles. Por ahora no se ha realizado
          ningún cargo ni reservación definitiva — falta lo mejor: ponerle fecha
          al mar.
        </p>

        <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            className="eyebrow inline-flex min-h-[48px] items-center justify-center bg-dorado px-8 text-marino transition-[background-color,transform] duration-300 hover:bg-dorado/85 motion-safe:active:scale-[0.99]"
          >
            {confirmacion.boton}
          </button>
          <Link
            to={confirmacion.linkSecundarioTo}
            className="group relative inline-flex min-h-[44px] items-center self-start text-sm text-marino/80 transition-colors duration-300 hover:text-marino sm:self-auto"
          >
            <span className="relative">
              {confirmacion.linkSecundario}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-dorado transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Página /contacto (brief §4.7). Cierre del funnel: layout de dos
   columnas en desktop (formulario izquierda, contexto derecha); en
   móvil el formulario va primero y el contexto debajo. La navbar
   inicia sólida aquí (/contacto no está en HERO_ROUTES) — el pt-
   evita quedar bajo la navbar fija de ~80px.
   ============================================================ */
export default function Contacto() {
  usePageMeta(
    'Reservaciones y contacto · Aurea Vita Acapulco',
    'Cuéntanos tus fechas y nuestro concierge te responde el mismo día con disponibilidad. Av. Escénica 1200, Acapulco, Guerrero, México.',
  );

  const [searchParams] = useSearchParams();
  const hoy = useMemo(() => hoyISO(), []);

  /* Precarga desde query params (brief §2.2). La BookingBar manda
     llegada/salida/huespedes; las RoomCard mandan habitacion=<slug>.
     Se lee una sola vez al montar (useMemo sin deps reactivas sobre
     searchParams: la URL inicial es la fuente; cambios posteriores no
     deben pisar lo que la persona ya tecleó). El slug solo se acepta
     si corresponde a una habitación real (contrato con rooms.js); un
     huespedes fuera del set se descarta para no romper el select. */
  const preload = useMemo(() => {
    const slug = searchParams.get('habitacion') ?? '';
    const habitacionValida = rooms.some((room) => room.slug === slug);

    const huespedesParam = searchParams.get('huespedes') ?? '';
    const huespedesValido = guestOptions.some(
      (option) => option.value === huespedesParam,
    );

    return {
      nombre: '',
      email: '',
      llegada: searchParams.get('llegada') ?? '',
      salida: searchParams.get('salida') ?? '',
      huespedes: huespedesValido ? huespedesParam : '',
      habitacion: habitacionValida ? slug : '',
      mensaje: '',
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [valores, setValores] = useState(preload);
  const [errs, setErrs] = useState({});
  /* Solo los campos "tocados" muestran error al hacer blur, para no
     gritar antes de tiempo; al enviar se marcan todos. */
  const [tocados, setTocados] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [resumen, setResumen] = useState(null);
  const [resumenError, setResumenError] = useState(false);

  /* Refs a los campos para llevar el foco al primero con error. */
  const refs = {
    nombre: useRef(null),
    email: useRef(null),
    llegada: useRef(null),
    salida: useRef(null),
    huespedes: useRef(null),
  };
  /* El botón de envío: el foco vuelve aquí al cerrar el modal. */
  const submitRef = useRef(null);

  /* ids estables para enlazar cada campo con su mensaje de error. */
  const fieldId = useId();
  const errId = (campo) => `${fieldId}-${campo}-error`;

  const setCampo = (campo, value) => {
    setValores((prev) => ({ ...prev, [campo]: value }));
    /* Re-valida en caliente solo los campos ya tocados, para que el
       error desaparezca en cuanto se corrige (sin esperar al blur). */
    if (tocados[campo]) {
      setErrs((prev) => {
        const recalculo = validar({ ...valores, [campo]: value }, hoy);
        const next = { ...prev };
        if (recalculo[campo]) next[campo] = recalculo[campo];
        else delete next[campo];
        /* La salida depende de la llegada: si cambia la llegada, revisa
           también la salida ya tocada. */
        if (campo === 'llegada' && tocados.salida) {
          if (recalculo.salida) next.salida = recalculo.salida;
          else delete next.salida;
        }
        return next;
      });
    }
  };

  const onBlur = (campo) => {
    setTocados((prev) => ({ ...prev, [campo]: true }));
    const recalculo = validar(valores, hoy);
    setErrs((prev) => {
      const next = { ...prev };
      if (recalculo[campo]) next[campo] = recalculo[campo];
      else delete next[campo];
      return next;
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (enviando) return;

    const next = validar(valores, hoy);
    setErrs(next);
    setTocados({
      nombre: true,
      email: true,
      llegada: true,
      salida: true,
      huespedes: true,
    });

    const camposConError = ORDEN_CAMPOS.filter((campo) => next[campo]);
    if (camposConError.length > 0) {
      setResumenError(true);
      /* Foco al primer campo con error, en el orden visual del form. */
      refs[camposConError[0]]?.current?.focus();
      return;
    }

    /* Envío válido: estado de carga simulada ~800ms (brief §4.7: evita
       el doble envío) y luego confirmación. Sin backend, sin cargos. */
    setResumenError(false);
    setEnviando(true);
    window.setTimeout(() => {
      setEnviando(false);
      setResumen({
        nombre: valores.nombre.trim(),
        email: valores.email.trim(),
        tipoHabitacion: habitacionLegible(valores.habitacion),
        fechaLlegada: fechaLegible(valores.llegada),
        fechaSalida: fechaLegible(valores.salida),
        huespedes: huespedesLegible(valores.huespedes),
      });
    }, 800);
  };

  /* ---- Clases compartidas de campo ---- */
  const labelClass = 'eyebrow block text-[0.7rem] text-piedra';
  const baseInputClass =
    'mt-2 block min-h-[48px] w-full bg-transparent px-3 py-2.5 font-body text-base text-marino [color-scheme:light] transition-colors duration-200';
  /* El borde es la señal de estado del campo (brief §4.7: borde dorado
     en error, en lugar de rojo fuera de tokens). El foco visible lo da
     el :focus-visible global; nunca focus:outline-none. */
  const borderClass = (campo) =>
    errs[campo] ? 'border border-dorado bg-dorado/5' : 'border border-arena';

  const describedBy = (campo) => (errs[campo] ? errId(campo) : undefined);

  return (
    <>
      {/* pt-28: la navbar fija mide ~80px; el espacio extra da el "aire"
          editorial entre el borde superior y el encabezado (brief §1.3). */}
      <section className="bg-marfil pb-24 pt-28 sm:pt-32 lg:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          {/* Encabezado de la página (copy §8.1) */}
          <header className="max-w-3xl">
            <p className="eyebrow text-marino">{contactoHeader.eyebrow}</p>
            <h1 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] font-light leading-[1.1] text-balance text-marino">
              {contactoHeader.titulo}
            </h1>
            <div className="mt-7 h-px w-12 bg-dorado" aria-hidden="true" />
            <p className="mt-7 max-w-[60ch] text-base leading-relaxed text-marino/80 sm:text-lg">
              {contactoHeader.intro}
            </p>
          </header>

          {/* Dos columnas en desktop. En móvil el formulario va primero
              (order natural del DOM) y el contexto debajo. */}
          <div className="mt-14 grid gap-x-16 gap-y-14 lg:mt-16 lg:grid-cols-[1.1fr_0.9fr]">
            {/* ===== Columna izquierda — formulario ===== */}
            <div>
              {/* Resumen aria-live al enviar con errores (copy §8.3). Se
                  mantiene en el DOM para que los lectores de pantalla
                  anuncien el cambio; visible solo cuando hay error. */}
              <div aria-live="assertive" className="sr-only" role="status">
                {resumenError ? errores.resumen : ''}
              </div>
              {resumenError && (
                <p
                  className="mb-8 flex items-start gap-2.5 border-l-2 border-dorado bg-arena/60 px-4 py-3.5 text-sm text-marino transition-opacity duration-150"
                  aria-hidden="true"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-dorado"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <line x1="12" y1="8" x2="12" y2="13" />
                    <line x1="12" y1="16.5" x2="12" y2="16.5" />
                  </svg>
                  <span>{errores.resumen}</span>
                </p>
              )}

              <form noValidate onSubmit={onSubmit} className="space-y-8">
                {/* Nombre */}
                <div className="group relative">
                  <label htmlFor={`${fieldId}-nombre`} className={labelClass}>
                    {formCopy.nombre.label}
                  </label>
                  <input
                    id={`${fieldId}-nombre`}
                    ref={refs.nombre}
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder={formCopy.nombre.placeholder}
                    value={valores.nombre}
                    aria-required="true"
                    aria-invalid={Boolean(errs.nombre)}
                    aria-describedby={describedBy('nombre')}
                    onChange={(event) => setCampo('nombre', event.target.value)}
                    onBlur={() => onBlur('nombre')}
                    className={[baseInputClass, borderClass('nombre')].join(' ')}
                  />
                  <FieldUnderline filled={Boolean(valores.nombre)} />
                  {errs.nombre && (
                    <FieldError id={errId('nombre')} mensaje={errs.nombre} />
                  )}
                </div>

                {/* Email */}
                <div className="group relative">
                  <label htmlFor={`${fieldId}-email`} className={labelClass}>
                    {formCopy.email.label}
                  </label>
                  <input
                    id={`${fieldId}-email`}
                    ref={refs.email}
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder={formCopy.email.placeholder}
                    value={valores.email}
                    aria-required="true"
                    aria-invalid={Boolean(errs.email)}
                    aria-describedby={describedBy('email')}
                    onChange={(event) => setCampo('email', event.target.value)}
                    onBlur={() => onBlur('email')}
                    className={[baseInputClass, borderClass('email')].join(' ')}
                  />
                  <FieldUnderline filled={Boolean(valores.email)} />
                  {errs.email && (
                    <FieldError id={errId('email')} mensaje={errs.email} />
                  )}
                </div>

                {/* Fechas: llegada y salida en dos columnas desde sm. */}
                <div className="grid gap-8 sm:grid-cols-2">
                  {/* Llegada */}
                  <div className="group relative">
                    <label
                      htmlFor={`${fieldId}-llegada`}
                      className={labelClass}
                    >
                      {formCopy.llegada.label}
                    </label>
                    <input
                      id={`${fieldId}-llegada`}
                      ref={refs.llegada}
                      type="date"
                      name="checkin"
                      min={hoy}
                      value={valores.llegada}
                      aria-required="true"
                      aria-invalid={Boolean(errs.llegada)}
                      aria-describedby={
                        errs.llegada
                          ? errId('llegada')
                          : `${fieldId}-llegada-ayuda`
                      }
                      onChange={(event) =>
                        setCampo('llegada', event.target.value)
                      }
                      onBlur={() => onBlur('llegada')}
                      className={[baseInputClass, borderClass('llegada')].join(
                        ' ',
                      )}
                    />
                    <FieldUnderline filled={Boolean(valores.llegada)} />
                    {errs.llegada ? (
                      <FieldError
                        id={errId('llegada')}
                        mensaje={errs.llegada}
                      />
                    ) : (
                      <p
                        id={`${fieldId}-llegada-ayuda`}
                        className="mt-2 text-sm text-piedra"
                      >
                        {formCopy.llegada.ayuda}
                      </p>
                    )}
                  </div>

                  {/* Salida */}
                  <div className="group relative">
                    <label htmlFor={`${fieldId}-salida`} className={labelClass}>
                      {formCopy.salida.label}
                    </label>
                    <input
                      id={`${fieldId}-salida`}
                      ref={refs.salida}
                      type="date"
                      name="checkout"
                      min={valores.llegada || hoy}
                      value={valores.salida}
                      aria-required="true"
                      aria-invalid={Boolean(errs.salida)}
                      aria-describedby={
                        errs.salida
                          ? errId('salida')
                          : `${fieldId}-salida-ayuda`
                      }
                      onChange={(event) =>
                        setCampo('salida', event.target.value)
                      }
                      onBlur={() => onBlur('salida')}
                      className={[baseInputClass, borderClass('salida')].join(
                        ' ',
                      )}
                    />
                    <FieldUnderline filled={Boolean(valores.salida)} />
                    {errs.salida ? (
                      <FieldError id={errId('salida')} mensaje={errs.salida} />
                    ) : (
                      <p
                        id={`${fieldId}-salida-ayuda`}
                        className="mt-2 text-sm text-piedra"
                      >
                        {formCopy.salida.ayuda}
                      </p>
                    )}
                  </div>
                </div>

                {/* Huéspedes y tipo de habitación en dos columnas desde sm. */}
                <div className="grid gap-8 sm:grid-cols-2">
                  {/* Huéspedes */}
                  <div className="group relative">
                    <label
                      htmlFor={`${fieldId}-huespedes`}
                      className={labelClass}
                    >
                      {formCopy.huespedes.label}
                    </label>
                    <select
                      id={`${fieldId}-huespedes`}
                      ref={refs.huespedes}
                      name="guests"
                      value={valores.huespedes}
                      aria-required="true"
                      aria-invalid={Boolean(errs.huespedes)}
                      aria-describedby={describedBy('huespedes')}
                      onChange={(event) =>
                        setCampo('huespedes', event.target.value)
                      }
                      onBlur={() => onBlur('huespedes')}
                      className={[
                        baseInputClass,
                        borderClass('huespedes'),
                        valores.huespedes ? '' : 'text-piedra',
                      ].join(' ')}
                    >
                      <option value="" disabled>
                        {formCopy.huespedes.placeholder}
                      </option>
                      {guestOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <FieldUnderline filled={Boolean(valores.huespedes)} />
                    {errs.huespedes && (
                      <FieldError
                        id={errId('huespedes')}
                        mensaje={errs.huespedes}
                      />
                    )}
                  </div>

                  {/* Tipo de habitación (opcional, contrato con rooms.js) */}
                  <div className="group relative">
                    <label
                      htmlFor={`${fieldId}-habitacion`}
                      className={labelClass}
                    >
                      {formCopy.habitacion.label}
                    </label>
                    <select
                      id={`${fieldId}-habitacion`}
                      name="room"
                      value={valores.habitacion}
                      onChange={(event) =>
                        setCampo('habitacion', event.target.value)
                      }
                      className={[
                        baseInputClass,
                        'border border-arena',
                      ].join(' ')}
                    >
                      <option value="">
                        {formCopy.habitacion.sinPreferencia}
                      </option>
                      {rooms.map((room) => (
                        <option key={room.slug} value={room.slug}>
                          {room.formLabel}
                        </option>
                      ))}
                    </select>
                    <FieldUnderline filled={Boolean(valores.habitacion)} />
                  </div>
                </div>

                {/* Mensaje (opcional) */}
                <div className="group relative">
                  <label htmlFor={`${fieldId}-mensaje`} className={labelClass}>
                    {formCopy.mensaje.label}
                  </label>
                  <textarea
                    id={`${fieldId}-mensaje`}
                    name="message"
                    rows={4}
                    placeholder={formCopy.mensaje.placeholder}
                    value={valores.mensaje}
                    onChange={(event) => setCampo('mensaje', event.target.value)}
                    className={[
                      baseInputClass,
                      'border border-arena resize-y',
                    ].join(' ')}
                  />
                  <FieldUnderline filled={Boolean(valores.mensaje)} />
                </div>

                {/* Envío */}
                <div className="pt-2">
                  <button
                    ref={submitRef}
                    type="submit"
                    disabled={enviando}
                    aria-busy={enviando}
                    className="eyebrow inline-flex min-h-[52px] w-full items-center justify-center bg-dorado px-8 text-marino transition-[background-color,transform,opacity] duration-300 hover:bg-dorado/85 disabled:cursor-not-allowed disabled:opacity-70 motion-safe:active:scale-[0.99] sm:w-auto"
                  >
                    {enviando ? (
                      <span className="inline-flex items-center gap-2.5">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                          className="motion-safe:animate-spin"
                        >
                          <path
                            d="M21 12a9 9 0 1 1-6.219-8.56"
                            strokeLinecap="round"
                          />
                        </svg>
                        {formCopy.enviando}
                      </span>
                    ) : (
                      formCopy.enviar
                    )}
                  </button>
                  <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-piedra">
                    {formCopy.nota}
                  </p>
                </div>
              </form>
            </div>

            {/* ===== Columna derecha — contexto ===== */}
            <aside className="lg:pt-1">
              <div className="overflow-hidden">
                <img
                  src={contactoInfo.foto.src}
                  alt={contactoInfo.foto.alt}
                  loading="lazy"
                  width="900"
                  height="1100"
                  className="aspect-[4/5] w-full bg-arena object-cover"
                />
              </div>

              <div className="mt-9 border-t border-arena pt-9">
                <h2 className="font-display text-2xl font-light text-marino">
                  {contactoInfo.encabezado}
                </h2>

                <dl className="mt-7 space-y-7 text-base text-marino/80">
                  <div>
                    <dt className="eyebrow text-piedra">Dirección</dt>
                    <dd className="mt-2 leading-relaxed">
                      {contactoInfo.direccion.map((linea) => (
                        <span key={linea} className="block">
                          {linea}
                        </span>
                      ))}
                    </dd>
                  </div>

                  <div>
                    <dt className="eyebrow text-piedra">Teléfono</dt>
                    <dd className="mt-2">
                      <a
                        href={contactoInfo.telefonoHref}
                        className="group relative inline-flex min-h-[44px] items-center text-marino transition-colors duration-300 hover:text-dorado"
                      >
                        <span className="relative">
                          {contactoInfo.telefono}
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-dorado transition-transform duration-300 ease-out group-hover:scale-x-100"
                          />
                        </span>
                      </a>
                    </dd>
                  </div>

                  <div>
                    <dt className="eyebrow text-piedra">Correo</dt>
                    <dd className="mt-2">
                      <a
                        href={`mailto:${contactoInfo.email}`}
                        className="group relative inline-flex min-h-[44px] items-center text-marino transition-colors duration-300 hover:text-dorado"
                      >
                        <span className="relative">
                          {contactoInfo.email}
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-dorado transition-transform duration-300 ease-out group-hover:scale-x-100"
                          />
                        </span>
                      </a>
                    </dd>
                  </div>

                  <div>
                    <dt className="eyebrow text-piedra">Horario de atención</dt>
                    <dd className="mt-2 leading-relaxed">
                      {contactoInfo.horario}
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Confirmación simulada (copy §8.4). Sin backend: ningún cargo. */}
      {resumen && (
        <ConfirmacionModal
          resumen={resumen}
          returnFocusRef={submitRef}
          onClose={() => setResumen(null)}
        />
      )}
    </>
  );
}
