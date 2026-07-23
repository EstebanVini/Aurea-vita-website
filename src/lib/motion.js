/**
 * Primitivas de motion compartidas (brief §6, intensidad 6/10).
 * "El sitio respira, no actúa": solo transform y opacity, easing
 * suave, reveals de una sola vez. Las páginas interiores reutilizan
 * estas mismas constantes y fábricas de variants vía <Reveal />.
 *
 * Ronda 23 jul (pase de motion): se suman `slideFrom` (deslizamiento
 * lateral dentro de marcos recortados) y `useParallax` (respuesta
 * sutil al scroll en las fotos 50/50). Ambos siguen las reglas duras:
 * solo transform, jamás layout, y con prefers-reduced-motion todo
 * queda estático y visible desde el primer frame.
 */

import { useRef } from 'react';
import { useReducedMotion, useScroll, useTransform } from 'framer-motion';

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
 * hoy lo llevan la línea dorada de la Suite Aurea, la regla que abre
 * el menú "Marea" en /gastronomia, la regla salvia del menú de /spa
 * (gateado) y, desde la ronda 23 jul (pase de motion), la línea
 * dorada que abre la unidad editorial de /experiencias.
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

/**
 * Deslizamiento lateral dentro de un marco recortado (ronda 23 jul,
 * pase de motion). Pensado para fotos que "entran desde su lado"
 * DENTRO de un contenedor overflow-hidden: sin opacity propia (el
 * fade lo pone el RevealItem padre, evitando el doble-fade) y con un
 * pelín de sobre-escala que se asienta a 1 para que el marco casi no
 * muestre hueco durante el viaje — eco del "asentamiento" de la banda
 * CTA del Home. Solo transform; al vivir clipeado, el desplazamiento
 * horizontal jamás genera scroll lateral en móvil. Hoy lo usa la
 * mini-galería de RoomCard: x negativo cuando la foto vive a la
 * izquierda, positivo con `reverse` — la dirección alternada rompe la
 * monotonía de 7 tarjetas idénticas seguidas sin volverse circo.
 */
export function slideFrom({ x = -32, scale = 1.06, duration = 0.9 } = {}) {
  return {
    hidden: { x, scale },
    visible: { x: 0, scale: 1, transition: { duration, ease: EASE_OUT } },
  };
}

/* ------------------------------------------------------------------
   Parallax sutil de scroll (ronda 23 jul, pase de motion)
   ------------------------------------------------------------------ */

/** Viaje vertical del parallax en % de la altura de la foto (±4%):
    perceptible como "profundidad", nunca como efecto protagonista. */
export const PARALLAX_TRAVEL = 4;

/** Sobre-escala fija que cubre el viaje: (1.1 − 1) / 2 = 5% de holgura
    por borde > 4% de viaje — el marco recortado nunca muestra hueco.
    Se mantiene baja para no traicionar los encuadres afinados por
    object-position en cada foto. */
export const PARALLAX_SCALE = 1.1;

/**
 * Hook de parallax vertical sutil para las fotos de secciones 50/50
 * (ronda 23 jul, pase de motion). La foto responde al scroll con un
 * desplazamiento de ±PARALLAX_TRAVEL% mientras su marco cruza el
 * viewport ('start end' → 'end start'), siempre dentro de un
 * contenedor overflow-hidden. Solo transform (translateY + scale
 * fija), GPU-friendly; sin scroll-jacking ni sticky nuevos.
 *
 * - `target` opcional: ref externo a medir cuando el elemento que se
 *   mueve no sirve como referencia estable (p. ej. la foto sticky de
 *   "Acapulco Diamante" en el Home — se mide su <section>, que nunca
 *   se "pina", y la foto deriva apenas mientras está fija).
 * - prefers-reduced-motion: el rango colapsa a 0% y la escala a 1 —
 *   la foto queda estática, completa y sin recorte extra.
 * - Sin SSR (Vite SPA) y seguro con StrictMode: useScroll solo mide
 *   refs ya montados y no registra nada fuera de efectos.
 */
export function useParallax({ target } = {}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: target ?? ref,
    offset: ['start end', 'end start'],
  });
  /* De −4% (marco entrando por abajo) a +4% (marco saliendo por
     arriba): la foto se retrasa respecto a la página — se lee como
     una ventana hacia una escena más profunda. */
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion
      ? ['0%', '0%']
      : [`-${PARALLAX_TRAVEL}%`, `${PARALLAX_TRAVEL}%`],
  );
  return { ref, y, scale: reduceMotion ? 1 : PARALLAX_SCALE };
}
