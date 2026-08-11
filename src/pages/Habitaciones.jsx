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
 * Página /habitaciones (brief §4.2, ronda 23 jul — docs/Fotos WEB
 * AV.pdf). Estructura: hero interior 70vh → intro editorial (marfil) →
 * las 7 habitaciones reales de la casa → banda CTA → footer.
 *
 * Ritmo de fondos: las suites (accent dorado) ocupan los "momentos de
 * profundidad" sobre marino (brief §1.4); el resto alterna
 * marfil/arena, con la galería espejada (reverse) en las bandas arena
 * para sostener el ritmo editorial de la ronda anterior.
 */
export default function Habitaciones() {
  usePageMeta(
    'Habitaciones & Suites · Aurea Vita Acapulco',
    'Habitaciones y suites frente al mar en Acapulco Diamante: vista al Pacífico, baño con tina, clóset de caoba y suites con cuarto de masajes privado.',
  );

  const reduceMotion = useReducedMotion();

  /* Fondos por habitación: las suites doradas van sobre marino (tone
     dark); las claras alternan marfil ↔ arena entre sí, invirtiendo la
     galería en las bandas arena. El cómputo vive aquí (no en datos):
     es presentación, no contenido. */
  let clarasVistas = 0;
  const secciones = rooms.map((room) => {
    if (room.accent === 'dorado') {
      return { room, fondo: 'bg-marino py-20 lg:py-36', dark: true, reverse: false };
    }
    const esArena = clarasVistas % 2 === 1;
    clarasVistas += 1;
    return {
      room,
      fondo: esArena ? 'bg-arena py-16 lg:py-28' : 'bg-marfil py-16 lg:py-28',
      dark: false,
      reverse: esArena,
    };
  });

  return (
    <>
      {/* 1 · Hero interior (60–70vh, no fullscreen — brief §4.2):
          jerarquía menor que el Home. La foto es casa_41 y es el LCP:
          sin lazy, eager + fetchPriority alta.
          Ronda ago 2026 (cambios.txt): archivo a 2048px, encuadre a 35%
          y fuera el tinte marino — el detalle, en las notas del <img> y
          del scrim. Este es el hero donde el scrim NO es opcional: leer
          la nota antes de tocarlo. */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-marino">
        <img
          src={habitacionesHeader.hero.src}
          alt={habitacionesHeader.hero.alt}
          width="2048"
          height="1365"
          fetchPriority="high"
          /* Hero: «Cámara Casa 41» (casa_41), restituida desde docs/Fotos
             WEB AV.pdf.
             INTRÍNSECAS 2048×1365 (ronda ago 2026, queja «se ven poco
             nítidas»): el archivo se servía reescalado a 1600px y en
             pantallas ≥1600 CSS lo estiraba por encima de su resolución
             nativa —de ahí el aspecto blando—. Regenerado a su ancho
             original; el hint width/height sube con él para que el
             aspect-ratio reservado siga siendo exacto y no haya CLS.
             ENCUADRE 25% → 35% (misma ronda, queja «se ven muy arriba y
             mal recortadas»). El 25% venía de huir del edredón: la mitad
             inferior del frame es blanco sobreexpuesto sin textura, así
             que se subió el recorte al máximo. El precio era que el hero
             enseñaba sobre todo techo y pared alta —lo que el cliente
             leyó como «mal recortada»—. A 35% el eje del encuadre baja
             ~47 px de fuente (a 1440×900: el recorte visible pasa de
             y≈117 a y≈164 sobre 1365) y entran completos el muro de
             duelas, el espejo de arco, las repisas y las flores; el techo
             se retira al borde superior y el edredón sigue siendo base,
             no sujeto. Verificado renderizando el object-cover real a 7
             viewports × Ken Burns.
             Ken Burns lento (§6.8, ronda 23 jul, pase de motion): mismo
             pulso que el hero del Home — CSS puro, no retrasa el LCP,
             contenido por el overflow-hidden del section y solo
             motion-safe (estático con reduced-motion). El zoom 1→1.06
             cierra el recorte ~3% por lado, así que el encuadre se midió
             a escala 1.0 y 1.06: a 1.06 entra algo menos de techo, nunca
             más. */
          className="absolute inset-0 h-full w-full object-cover object-[50%_35%] motion-safe:animate-kenburns"
        />
        {/* SCRIM NEUTRO anclado al pie (ronda ago 2026, petición literal
            del cliente: «sin el filtro azul, que las fotos se vean tal
            cual»). Sustituye al degradado marino 40/50/80, que teñía la
            foto ENTERA —incluido el cielo y el muro de duelas del tercio
            superior— con el azul-verde de marca (#1f3a44). Aquí no hay
            color: negro puro, así que la foto conserva su balance de
            blancos y la madera sigue leyéndose cálida; lo único que hace
            el degradado es bajar luminancia, y solo donde vive el texto.
            Forma: linear-gradient(to top) con parada final TRANSPARENTE
            al 72%. El 28% superior del hero queda intacto (alfa 0.00) y
            la cobertura media sobre toda la altura cae de 0.55 (marino) a
            0.30 (negro). Las paradas 55/52/47/32/14/0 dibujan una meseta
            —no una rampa lineal— porque el eyebrow NO vive al pie: con el
            H1 a dos líneas se sitúa en u≈0.23–0.42 medido desde abajo, y
            una rampa lineal ya estaría casi apagada ahí. La meseta
            mantiene ~0.48 hasta u=0.45 y luego cae rápido.
            POR QUÉ ESTE HERO SÍ NECESITA SCRIM (dato honesto para el
            cliente): la mitad inferior de casa_41 es edredón blanco
            sobreexpuesto y el bloque de texto vive abajo a la izquierda.
            Con la foto 100% limpia el marfil (#f5f1ec) sobre ese blanco
            da eyebrow 1.63:1 y H1 1.42:1 — ilegible, y ningún text-shadow
            lo arregla. Se probaron los cuatro encuadres candidatos: en
            ninguno el texto cae sobre algo oscuro. El alfa mínimo de
            negro que devuelve AA en la banda crítica es 0.422 (eyebrow) y
            0.317 (H1); el scrim entrega ~0.50 ahí, ~1.2× de margen, que
            es lo que pide el modelo de layout (aproximado, ±0.7).
            Método: archivo 2048px, object-cover y object-position reales,
            composición en sRGB no lineal, peor teja de 24×24 px, 7
            viewports (390→1920) × Ken Burns (scale 1.0 y 1.06) × 1–3
            líneas de H1. Resultado: eyebrow 5.83:1 (pide 4.5:1, AA OK),
            H1 5.00:1 (texto grande, pide 3:1, AA OK). Peor caso del
            eyebrow: 414×896 a scale 1.06.
            Si el cliente quiere el hero SIN scrim alguno, la vía no es
            bajar el alfa —es cambiar esta fotografía por una con zona
            oscura en el tercio inferior izquierdo. */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0_/_0.55)_0%,rgb(0_0_0_/_0.52)_25%,rgb(0_0_0_/_0.47)_45%,rgb(0_0_0_/_0.32)_55%,rgb(0_0_0_/_0.14)_63%,transparent_72%)]"
          aria-hidden="true"
        />
        {/* text-shadow NEGRO (ronda ago 2026, nuevo en este hero). Con el
            marino fuera, el halo tampoco puede ser marino: sería
            reintroducir por el borde del glifo el mismo tinte que el
            cliente rechaza. Negro a 0.55 y 10px de blur — no entra en la
            cifra de contraste de arriba (WCAG mide fondo plano, no
            halos), es margen extra sobre los pliegues brillantes del
            edredón, donde el scrim solo no basta para separar el marfil
            del blanco. */}
        <motion.div
          variants={heroSequence}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-16 pt-44 sm:px-8 lg:pb-20 [text-shadow:0_1px_10px_rgb(0_0_0_/_0.55)]"
        >
          <motion.p variants={heroItem} className="eyebrow text-marfil">
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

      {/* 3 · Las 7 habitaciones de la casa (ronda 23 jul): fondos y
          espejado calculados arriba; las suites doradas van sobre
          marino con el padding mayor de la insignia (brief §1.3). */}
      {secciones.map(({ room, fondo, dark, reverse }) => (
        <section key={room.slug} className={fondo}>
          <RoomCard
            room={room}
            tone={dark ? 'dark' : 'light'}
            reverse={reverse}
          />
        </section>
      ))}

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
