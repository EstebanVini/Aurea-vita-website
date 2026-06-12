import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** Opciones del selector de huéspedes (copy §8.2). */
const GUEST_OPTIONS = [
  { value: '1', label: '1 huésped' },
  { value: '2', label: '2 huéspedes' },
  { value: '3', label: '3 huéspedes' },
  { value: '4', label: '4 huéspedes' },
  { value: '5', label: '5 o más' },
];

/** Fecha local de hoy en formato YYYY-MM-DD para el atributo min. */
function hoyISO() {
  const ahora = new Date();
  ahora.setMinutes(ahora.getMinutes() - ahora.getTimezoneOffset());
  return ahora.toISOString().slice(0, 10);
}

/**
 * Subrayado dorado de feedback de campo (brief §6.7): crece de
 * izquierda a derecha al enfocar (group-focus-within) y permanece
 * tenue cuando el campo ya tiene valor elegido por el usuario.
 * Solo transform y opacity; el wrapper del campo debe ser
 * `group relative`.
 */
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

/**
 * BookingBar (brief §5.2): solo UI, sin motor de reservas. Al enviar
 * redirige a /contacto con las fechas y huéspedes como query params,
 * donde el formulario los precarga (brief §2.2).
 *
 * Desktop: barra horizontal de 4 zonas sobre marfil. Móvil: colapsa a
 * un botón único que despliega los campos como panel (brief §3.3 —
 * nunca tres selects apilados sobre la foto).
 */
export default function BookingBar() {
  const navigate = useNavigate();
  const [llegada, setLlegada] = useState('');
  const [salida, setSalida] = useState('');
  const [huespedes, setHuespedes] = useState('2');
  /* El select tiene valor por defecto: el subrayado "filled" solo se
     gana cuando la persona elige activamente (disciplina del dorado). */
  const [huespedesElegidos, setHuespedesElegidos] = useState(false);
  const [openMovil, setOpenMovil] = useState(false);
  const llegadaRef = useRef(null);

  /* El botón colapsado se desmonta al abrir el panel: sin esto el foco
     del teclado caía en <body> y la persona perdía su posición. */
  useEffect(() => {
    if (openMovil) llegadaRef.current?.focus();
  }, [openMovil]);

  const hoy = hoyISO();

  const onSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (llegada) params.set('llegada', llegada);
    if (salida) params.set('salida', salida);
    params.set('huespedes', huespedes);
    navigate(`/contacto?${params.toString()}`);
  };

  const fieldLabelClass = 'eyebrow block text-[0.65rem] text-piedra';
  /* Sin focus:outline-none: el subrayado dorado de 1px (1.86:1 sobre
     marfil) no alcanza el 3:1 que exige WCAG 1.4.11 como indicador de
     foco; el outline global :focus-visible es el indicador real y el
     subrayado queda como refuerzo decorativo. */
  const fieldInputClass =
    'mt-1.5 block min-h-[32px] w-full bg-transparent font-body text-sm text-marino [color-scheme:light]';

  return (
    <form
      aria-label="Consulta de disponibilidad"
      onSubmit={onSubmit}
      className="bg-marfil shadow-[0_24px_60px_-24px] shadow-marino/40 ring-1 ring-arena"
    >
      {/* Botón colapsado (solo móvil, panel cerrado) */}
      {!openMovil && (
        <button
          type="button"
          onClick={() => setOpenMovil(true)}
          aria-expanded={openMovil}
          aria-controls="bookingbar-campos"
          className="eyebrow flex min-h-[56px] w-full items-center justify-center bg-dorado px-6 text-marino transition-colors duration-300 hover:bg-dorado/85 md:hidden"
        >
          Consultar disponibilidad
        </button>
      )}

      {/* Campos: panel desplegable en móvil, barra de 4 zonas en desktop */}
      <div
        id="bookingbar-campos"
        className={[
          /* animate-fade-rise: despliegue suave del panel en móvil;
             en desktop openMovil nunca cambia, no re-dispara nada */
          openMovil ? 'grid motion-safe:animate-fade-rise' : 'hidden',
          'grid-cols-2 gap-x-4 gap-y-2 p-5',
          'md:grid md:grid-cols-[1.1fr_1.1fr_1fr_auto] md:items-stretch md:gap-0 md:divide-x md:divide-arena md:p-0',
        ].join(' ')}
      >
        <div className="group relative md:px-6 md:py-4">
          <label htmlFor="bookingbar-llegada" className={fieldLabelClass}>
            Llegada
          </label>
          <input
            id="bookingbar-llegada"
            ref={llegadaRef}
            type="date"
            min={hoy}
            value={llegada}
            onChange={(event) => setLlegada(event.target.value)}
            className={fieldInputClass}
          />
          <FieldUnderline filled={Boolean(llegada)} />
        </div>

        <div className="group relative md:px-6 md:py-4">
          <label htmlFor="bookingbar-salida" className={fieldLabelClass}>
            Salida
          </label>
          <input
            id="bookingbar-salida"
            type="date"
            min={llegada || hoy}
            value={salida}
            onChange={(event) => setSalida(event.target.value)}
            className={fieldInputClass}
          />
          <FieldUnderline filled={Boolean(salida)} />
        </div>

        <div className="group relative col-span-2 mt-2 md:col-span-1 md:mt-0 md:px-6 md:py-4">
          <label htmlFor="bookingbar-huespedes" className={fieldLabelClass}>
            Huéspedes
          </label>
          <select
            id="bookingbar-huespedes"
            value={huespedes}
            onChange={(event) => {
              setHuespedes(event.target.value);
              setHuespedesElegidos(true);
            }}
            className={fieldInputClass}
          >
            {GUEST_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldUnderline filled={huespedesElegidos} />
        </div>

        <button
          type="submit"
          className="eyebrow col-span-2 mt-4 flex min-h-[52px] items-center justify-center bg-dorado px-7 text-marino transition-[background-color,transform] duration-300 hover:bg-dorado/85 motion-safe:active:scale-[0.99] md:col-span-1 md:mt-0 md:min-h-full"
        >
          Consultar disponibilidad
        </button>
      </div>
    </form>
  );
}
