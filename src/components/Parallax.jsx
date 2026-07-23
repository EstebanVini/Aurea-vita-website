import { motion } from 'framer-motion';
import { useParallax } from '../lib/motion.js';

/**
 * <Parallax> — marco interior de parallax sutil para las fotos de las
 * secciones 50/50 (ronda 23 jul, pase de motion). Se coloca DENTRO de
 * un contenedor con overflow-hidden (normalmente el <Reveal> que ya
 * envuelve la foto) y alrededor del <img>: el wrapper se desplaza
 * ±4% con el scroll y lleva una sobre-escala fija que cubre el viaje,
 * de modo que el marco nunca muestra hueco ni ensucia el layout.
 *
 * Por qué un wrapper y no el propio <img>: varios de estos imgs
 * llevan el zoom de hover por CSS (motion-safe:hover:scale-[1.04]);
 * si framer escribiera el transform inline del <img>, pisaría ese
 * hover. En el wrapper ambos conviven.
 *
 * - `target` opcional: ref externo a medir (caso sticky del Home).
 * - Sin variants ni animate propios: no rompe la propagación de
 *   variants del Reveal/RevealGroup que lo contiene.
 * - prefers-reduced-motion: useParallax colapsa y=0% y scale=1 — la
 *   foto queda estática y visible, sin recorte extra.
 */
export default function Parallax({ target, className, children, ...rest }) {
  const { ref, y, scale } = useParallax({ target });

  return (
    <motion.div ref={ref} style={{ y, scale }} className={className} {...rest}>
      {children}
    </motion.div>
  );
}
