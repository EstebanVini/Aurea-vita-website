/**
 * Primitivas de motion compartidas (brief §6, intensidad 6/10).
 * "El sitio respira, no actúa": solo transform y opacity, easing
 * suave, reveals de una sola vez. Las páginas interiores reutilizan
 * estas mismas constantes y fábricas de variants vía <Reveal />.
 */

/** Easing editorial: arranque decidido, aterrizaje muy suave. */
export const EASE_OUT = [0.22, 1, 0.36, 1];

/** Reveal estándar (brief §6.2): 24px de elevación, 600–700ms. */
export const REVEAL_DISTANCE = 24;
export const REVEAL_DURATION = 0.65;

/** Viewport por defecto: una sola vez, ~20% visible (brief §6.2). */
export const VIEWPORT_ONCE = { once: true, amount: 0.2 };

/**
 * Variants de fade + leve translateY para un bloque individual.
 * Ojo: el `delay` solo se incluye cuando es > 0 — un `delay: 0`
 * explícito en la transition del hijo pisa el staggerChildren del
 * padre en Framer Motion y los grupos entrarían en bloque.
 */
export function fadeRise({
  y = REVEAL_DISTANCE,
  duration = REVEAL_DURATION,
  delay = 0,
} = {}) {
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: EASE_OUT, ...(delay > 0 && { delay }) },
    },
  };
}

/**
 * Variants de contenedor que orquesta a sus hijos con stagger
 * (brief §6.3: 80–100ms entre ítems). Los hijos declaran fadeRise.
 */
export function staggerGroup({ stagger = 0.09, delayChildren = 0 } = {}) {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  };
}

/**
 * Línea decorativa que se "dibuja" de izquierda a derecha (scaleX,
 * solo transform). El elemento necesita la clase `origin-left`.
 * Momento de deleite puntual (brief §6.8) — usar con moderación:
 * hoy solo lo llevan la línea dorada de la Suite Aurea y la regla
 * que abre el menú "Marea" en /gastronomia.
 */
export function drawLine({ duration = 0.9, delay = 0.35 } = {}) {
  return {
    hidden: { opacity: 0, scaleX: 0 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: { duration, delay, ease: EASE_OUT },
    },
  };
}
