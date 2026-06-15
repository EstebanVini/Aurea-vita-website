import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta.js';
import RoomCard from '../components/RoomCard.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal.jsx';
import { fadeRise, staggerGroup } from '../lib/motion.js';
import {
  habitacionesCta,
  habitacionesHeader,
  rooms,
} from '../data/rooms.js';

/* Entrada del hero interior: eyebrow → H1, mismo lenguaje que el Home
   (brief §6.1) pero más breve — es una página de comparación, no de
   primera impresión. */
const heroSequence = staggerGroup({ stagger: 0.12, delayChildren: 0.1 });
const heroItem = fadeRise({ y: 18, duration: 0.7 });

/**
 * Página /habitaciones (brief §4.2). Estructura:
 * hero interior 70vh → intro editorial (marfil) → tres bloques de
 * categoría en orden ascendente de lujo con fondos alternados
 * (marfil → arena → marino: la Suite Aurea ocupa el "momento de
 * profundidad" de la página) → banda CTA → footer.
 *
 * Tonos por categoría: Vista Jardín (salvia, marfil), Suite Vista al
 * Mar (marino, arena) y Suite Aurea (dorado, sobre marino — la única
 * donde acento y CTA coinciden; eso la hace insignia).
 */
export default function Habitaciones() {
  usePageMeta(
    'Habitaciones & Suites · Aurea Vita Acapulco',
    'Tres maneras de habitar la costa: Habitación Vista Jardín, Suite Vista al Mar y la Suite Aurea, nuestra insignia con alberca privada y vista a la bahía.',
  );

  const reduceMotion = useReducedMotion();
  const [vistaJardin, vistaAlMar, suiteAurea] = rooms;

  return (
    <>
      {/* 1 · Hero interior (60–70vh, no fullscreen — brief §4.2):
          jerarquía menor que el Home. La foto es el LCP: sin lazy. */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-marino">
        <img
          src={habitacionesHeader.hero.src}
          alt={habitacionesHeader.hero.alt}
          width="940"
          height="627"
          fetchPriority="high"
          /* El recorte panorámico del hero baja el encuadre (70%): más
             cama y menos plafón — la promesa de la página es la cama. */
          className="absolute inset-0 h-full w-full object-cover object-[50%_70%]"
        />
        {/* Overlay solo donde hay texto (brief §1.1): denso al pie,
            ligero arriba para que la foto respire. */}
        <div
          className="absolute inset-0 bg-linear-to-b from-marino/40 via-marino/15 to-marino/65"
          aria-hidden="true"
        />
        <motion.div
          variants={heroSequence}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-16 pt-44 sm:px-8 lg:pb-20"
        >
          <motion.p variants={heroItem} className="eyebrow text-marfil/90">
            {habitacionesHeader.eyebrow}
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-light leading-[1.05] text-marfil"
          >
            {habitacionesHeader.titulo}
          </motion.h1>
        </motion.div>
      </section>

      {/* 2 · Intro editorial (marfil, brief §4.2, ronda 15 jun §9.4):
          dos niveles — subtítulo en serif grande (el "respiro" entre la
          inmersión del hero y la comparación) + cuerpo editorial de 3
          párrafos en Jost. La línea dorada separa el subtítulo del
          cuerpo, manteniendo el lenguaje de SectionHeading sin forzar el
          componente (aquí el subtítulo NO es un H2). */}
      <section className="bg-marfil pt-16 lg:pt-24">
        <Reveal className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <p className="max-w-3xl font-display text-2xl font-light leading-snug text-balance text-marino sm:text-3xl lg:text-4xl">
            {habitacionesHeader.subtitulo}
          </p>
          <div className="mt-9 h-px w-12 bg-dorado" aria-hidden="true" />
          <div className="mt-9 max-w-[65ch] space-y-5 text-base leading-relaxed text-marino/80 sm:text-lg">
            {habitacionesHeader.cuerpo.map((parrafo) => (
              <p key={parrafo}>{parrafo}</p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 3 · Habitación Vista Jardín (acento salvia, marfil) */}
      <section className="bg-marfil py-16 lg:py-28">
        <RoomCard room={vistaJardin} />
      </section>

      {/* 4 · Suite Vista al Mar (acento marino, arena, espejo) */}
      <section className="bg-arena py-16 lg:py-28">
        <RoomCard room={vistaAlMar} reverse />
      </section>

      {/* 5 · Suite Aurea — insignia (acento dorado sobre marino:
          el momento de profundidad de la página, brief §1.4).
          Padding mayor que las otras dos categorías: el aire extra
          es parte de la jerarquía (brief §1.3). */}
      <section className="bg-marino py-20 lg:py-36">
        <RoomCard room={suiteAurea} tone="dark" />
      </section>

      {/* 6 · Banda CTA de cierre (copy §3.5): arena tras el marino de
          la insignia — exhalación final, no segundo clímax. */}
      <section className="bg-arena py-24 lg:py-36">
        <RevealGroup
          stagger={0.12}
          className="mx-auto flex max-w-[1400px] flex-col items-center px-5 sm:px-8"
        >
          <RevealItem>
            <SectionHeading
              align="center"
              eyebrow="Reservaciones"
              title={habitacionesCta.titulo}
            >
              <p>{habitacionesCta.texto}</p>
            </SectionHeading>
          </RevealItem>
          <RevealItem>
            <Link
              to="/contacto"
              className="eyebrow mt-10 inline-flex min-h-[48px] items-center bg-dorado px-8 text-marino transition-colors duration-300 hover:bg-dorado/85"
            >
              {habitacionesCta.boton}
            </Link>
          </RevealItem>
        </RevealGroup>
      </section>
    </>
  );
}
