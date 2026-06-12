import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT } from '../lib/motion.js';

/**
 * Lightbox de la galería (brief §5.4 + copy §9.3).
 *
 * Visor modal sobre overlay marino/95 con la foto centrada a
 * max-h-[85vh]. Controlado por el padre (Galeria): `index` es la
 * posición activa dentro de `photos`; `null` significa cerrado. La
 * navegación (onPrev/onNext/onClose) la gobierna el padre para que el
 * conteo "N de Total" siempre case con la lista filtrada visible.
 *
 * Accesibilidad (brief §5.4, copy §9.3):
 * - role="dialog" + aria-modal + aria-label "Visor de fotografías".
 * - Teclado: ← → navegan, Esc cierra (mismo modelo que el menú móvil
 *   del Navbar). Foco ATRAPADO dentro del diálogo: Tab/Shift+Tab
 *   ciclan entre cerrar/anterior/siguiente sin escapar al fondo.
 * - Al abrir, el foco entra al botón cerrar; al cerrar, el padre
 *   devuelve el foco al thumbnail de origen (recibe `triggerRef`).
 * - Scroll del body bloqueado mientras está abierto.
 * - Anillo de foco marfil sobre el overlay marino (currentColor sería
 *   marino sobre marino — mismo patrón que RoomCard/Gastronomia).
 *
 * Motion (brief §6.6, intensidad 6/10, solo transform/opacity):
 * - Overlay: fade ~250ms.
 * - Foto: slide horizontal corto entre fotos ~300ms; la dirección la
 *   marca `direction` (+1 siguiente, −1 anterior). Con reduced-motion
 *   todo es instantáneo (sin slide, sin fade de duración perceptible).
 * - Precarga de la foto siguiente y anterior para que el slide no
 *   muestre un flash de carga.
 *
 * Móvil (brief §5.4): las flechas laterales se ocultan; se navega con
 * tap en las mitades izquierda/derecha de la foto (zonas con
 * aria-label) y el botón cerrar siempre visible arriba-derecha.
 *
 * Props:
 * - photos:     array de { src, alt } (la lista filtrada visible).
 * - index:      índice activo, o null si está cerrado.
 * - direction:  +1 / −1, sentido del último cambio (para el slide).
 * - onClose, onPrev, onNext: handlers del padre.
 * - triggerRef: ref al thumbnail que abrió el visor (foco de retorno).
 */

/** Duraciones del brief §6.6. */
const OVERLAY_FADE = 0.25;
const SLIDE_DURATION = 0.3;
/** Recorrido del slide horizontal: "corto", no un barrido completo. */
const SLIDE_OFFSET = 48;

/** Selector de elementos enfocables dentro del diálogo. */
const FOCUSABLE =
  'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

export default function Lightbox({
  photos,
  index,
  direction = 1,
  onClose,
  onPrev,
  onNext,
  triggerRef,
}) {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  const isOpen = index !== null && index >= 0 && index < photos.length;
  const photo = isOpen ? photos[index] : null;
  const total = photos.length;

  /* Bloqueo de scroll del body mientras el visor está abierto.
     Restaura el valor previo de overflow al cerrar (no asume vacío). */
  useEffect(() => {
    if (!isOpen) return undefined;
    const { body } = document;
    const previo = body.style.overflow;
    body.style.overflow = 'hidden';
    return () => {
      body.style.overflow = previo;
    };
  }, [isOpen]);

  /* Al abrir, el foco entra al botón cerrar. Al desmontar el efecto
     (cierre), devuelve el foco al thumbnail de origen — el padre pasa
     ese nodo por triggerRef. Solo se enfoca de retorno si el elemento
     sigue en el documento (el filtro pudo cambiar). */
  useEffect(() => {
    if (!isOpen) return undefined;
    const origen = triggerRef?.current ?? null;
    closeRef.current?.focus();
    return () => {
      if (origen && document.contains(origen)) {
        origen.focus();
      }
    };
    // Solo al abrir/cerrar: no re-enfocar cerrar al cambiar de foto.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  /* Teclado global mientras está abierto: ← → navegan, Esc cierra,
     Tab queda atrapado dentro del diálogo (focus trap manual, mismo
     enfoque que el panel móvil del Navbar). */
  const onKeyDown = useCallback(
    (evento) => {
      if (!isOpen) return;

      if (evento.key === 'Escape') {
        evento.preventDefault();
        onClose();
        return;
      }
      if (evento.key === 'ArrowRight') {
        evento.preventDefault();
        onNext();
        return;
      }
      if (evento.key === 'ArrowLeft') {
        evento.preventDefault();
        onPrev();
        return;
      }
      if (evento.key === 'Tab') {
        const nodo = dialogRef.current;
        if (!nodo) return;
        const enfocables = Array.from(nodo.querySelectorAll(FOCUSABLE)).filter(
          (el) => el.offsetParent !== null || el === document.activeElement,
        );
        if (enfocables.length === 0) return;
        const primero = enfocables[0];
        const ultimo = enfocables[enfocables.length - 1];
        const activo = document.activeElement;

        if (evento.shiftKey && activo === primero) {
          evento.preventDefault();
          ultimo.focus();
        } else if (!evento.shiftKey && activo === ultimo) {
          evento.preventDefault();
          primero.focus();
        }
      }
    },
    [isOpen, onClose, onNext, onPrev],
  );

  useEffect(() => {
    if (!isOpen) return undefined;
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onKeyDown]);

  /* Precarga de vecinas (brief §5.4): construye las URLs siguiente y
     anterior con módulo y las carga en memoria, sin pintarlas, para
     que el slide no muestre un flash de carga. */
  useEffect(() => {
    if (!isOpen || total <= 1) return;
    const siguiente = photos[(index + 1) % total];
    const anterior = photos[(index - 1 + total) % total];
    [siguiente, anterior].forEach((p) => {
      if (!p) return;
      const img = new Image();
      img.src = p.src;
    });
  }, [isOpen, index, total, photos]);

  /* Variants del slide horizontal. La foto entrante llega desde el
     lado del avance y la saliente sale por el opuesto; con
     reduced-motion el desplazamiento es 0 (solo opacity instantánea). */
  const offset = reduceMotion ? 0 : SLIDE_OFFSET;
  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? offset : -offset }),
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: reduceMotion ? 0 : SLIDE_DURATION,
        ease: EASE_OUT,
      },
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -offset : offset,
      transition: {
        duration: reduceMotion ? 0 : SLIDE_DURATION * 0.8,
        ease: EASE_OUT,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Visor de fotografías"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: reduceMotion ? 0 : OVERLAY_FADE },
          }}
          exit={{
            opacity: 0,
            transition: { duration: reduceMotion ? 0 : OVERLAY_FADE },
          }}
          className="fixed inset-0 z-[100] flex flex-col bg-marino/95 text-marfil backdrop-blur-sm"
        >
          {/* Ayuda de teclado para lectores de pantalla (copy §9.3). */}
          <p className="sr-only">
            Usa las flechas para navegar y Escape para cerrar.
          </p>

          {/* Capa de cierre: clic en el fondo (fuera de la foto y los
              controles) cierra el visor. Decorativa para lectores de
              pantalla; el cierre accesible es el botón Cerrar. */}
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 z-0 cursor-default"
          />

          {/* Barra superior: contador a la izquierda, cerrar a la
              derecha. Contador en marfil/90 sobre marino/95 → AA. */}
          <div className="relative z-20 flex items-center justify-between px-5 pt-5 sm:px-8 sm:pt-6">
            <p className="eyebrow text-marfil/90 tabular-nums" aria-live="polite">
              <span className="sr-only">Fotografía </span>
              {index + 1} de {total}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Cerrar visor"
              className="-mr-2 inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-marfil/90 transition-colors duration-200 hover:text-marfil focus-visible:outline-marfil"
            >
              <span className="eyebrow mr-3 hidden sm:inline">Cerrar</span>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M5 5l12 12M17 5L5 17" />
              </svg>
            </button>
          </div>

          {/* Escenario de la foto. Las flechas laterales (desktop) y
              las zonas de tap (móvil) navegan; la foto vive en el
              centro con AnimatePresence para el slide. */}
          <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-4 py-4 sm:px-16 sm:py-6">
            {/* Flecha anterior — oculta en móvil (brief §5.4). */}
            <button
              type="button"
              onClick={onPrev}
              aria-label="Fotografía anterior"
              className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center text-marfil/80 transition-colors duration-200 hover:text-marfil focus-visible:outline-marfil sm:inline-flex sm:h-12 sm:w-12 lg:left-6"
            >
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 6L10 17l11 11" />
              </svg>
            </button>

            {/* Zonas de tap en móvil: mitades izquierda/derecha sobre la
                foto. Ocultas en desktop (allí mandan las flechas).
                Tamaño táctil generoso, sin texto visible. */}
            <button
              type="button"
              onClick={onPrev}
              aria-label="Fotografía anterior"
              className="absolute inset-y-0 left-0 z-20 w-1/4 focus-visible:outline-marfil sm:hidden"
            />
            <button
              type="button"
              onClick={onNext}
              aria-label="Fotografía siguiente"
              className="absolute inset-y-0 right-0 z-20 w-1/4 focus-visible:outline-marfil sm:hidden"
            />

            {/* La foto: contenedor con AnimatePresence en modo wait para
                que entrante y saliente no se solapen durante el slide.
                custom=direction pasa el sentido a los variants. */}
            <div className="relative flex h-full w-full items-center justify-center">
              <AnimatePresence
                custom={direction}
                mode="wait"
                initial={false}
              >
                <motion.img
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  draggable={false}
                  className="max-h-[85vh] max-w-full object-contain shadow-2xl"
                />
              </AnimatePresence>
            </div>

            {/* Flecha siguiente — oculta en móvil. */}
            <button
              type="button"
              onClick={onNext}
              aria-label="Fotografía siguiente"
              className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center text-marfil/80 transition-colors duration-200 hover:text-marfil focus-visible:outline-marfil sm:inline-flex sm:h-12 sm:w-12 lg:right-6"
            >
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M13 6l11 11-11 11" />
              </svg>
            </button>
          </div>

          {/* Pie: el alt de la foto activa como leyenda discreta,
              centrada, en marfil tenue. Refuerza el contexto sin robar
              protagonismo a la imagen. */}
          <div className="relative z-10 px-6 pb-6 pt-2 text-center sm:pb-8">
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-marfil/70">
              {photo.alt}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
