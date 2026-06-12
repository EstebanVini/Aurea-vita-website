import { motion, useReducedMotion } from 'framer-motion';
import { fadeRise, staggerGroup } from '../lib/motion.js';

/**
 * Scroll-reveals reutilizables (brief §6.2 y §6.3). Tres piezas:
 *
 * - <Reveal>       bloque individual: fade + translateY al entrar al
 *                  viewport, una sola vez.
 * - <RevealGroup>  contenedor que orquesta a sus <RevealItem> hijos
 *                  con stagger (cards, listas, strips de fotos).
 * - <RevealItem>   hijo de RevealGroup; hereda el disparo del padre.
 *
 * Accesibilidad: con prefers-reduced-motion el contenido se renderiza
 * directamente en su estado final (initial={false}), nunca invisible.
 * El prop `as` acepta cualquier etiqueta ('div', 'ul', 'li', ...).
 */

export function Reveal({
  as = 'div',
  delay = 0,
  y,
  duration,
  amount = 0.2,
  once = true,
  className,
  children,
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      variants={fadeRise({ y, duration, delay })}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once, amount }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function RevealGroup({
  as = 'div',
  stagger = 0.09,
  delayChildren = 0,
  amount = 0.2,
  once = true,
  className,
  children,
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      variants={staggerGroup({ stagger, delayChildren })}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once, amount }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ as = 'div', y, duration, className, children, ...rest }) {
  const Tag = motion[as];

  return (
    <Tag className={className} variants={fadeRise({ y, duration })} {...rest}>
      {children}
    </Tag>
  );
}

export default Reveal;
