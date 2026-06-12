import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta.js';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal.jsx';
import { fadeRise, staggerGroup } from '../lib/motion.js';
import {
  albercaInfinita,
  atardeceres,
  descubreAcapulco,
  experienciasCta,
  experienciasHeader,
} from '../data/experiences.js';

/** Flecha lineal para links editoriales (sin emojis; brief: iconos SVG). */
function ArrowIcon() {
  return (
    <svg
      width="18"
      height="12"
      viewBox="0 0 18 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
      className="transition-transform duration-300 group-hover:translate-x-1"
    >
      <line x1="0" y1="6" x2="16" y2="6" />
      <polyline points="11 1 16 6 11 11" />
    </svg>
  );
}

/* Entrada del hero interior: eyebrow → H1, mismo lenguaje que
   /habitaciones y /gastronomia (brief §6.1) — página de inspiración,
   no de primera impresión. */
const heroSequence = staggerGroup({ stagger: 0.12, delayChildren: 0.1 });
const heroItem = fadeRise({ y: 18, duration: 0.7 });

/**
 * Página /experiencias (brief §4.5). Estructura:
 * hero interior 70vh (alberca_05) → bloque "Alberca infinita" en
 * layout imagen/texto + strip scroll-snap de tres fotos y un apoyo
 * editorial (desayuno junto al agua) sobre marfil/arena → bloque
 * "Atardeceres en Cielo" alternado con link cruzado a /gastronomia →
 * bloque "Descubre Acapulco" sobre marino (el único momento de
 * profundidad de la página, brief §1.4: cuatro cards con foto y texto
 * marfil) → banda CTA (marino) → footer.
 *
 * En móvil los bloques se apilan SIEMPRE con la foto primero (brief
 * §4.5). Las cards del destino usan aspect-ratio fijo + object-cover
 * para uniformar orientaciones mixtas. Motion 6/10: reveals de una
 * sola vez, solo transform/opacity, reduced-motion seguro.
 */
export default function Experiencias() {
  usePageMeta(
    'Experiencias · Aurea Vita Acapulco',
    'Alberca infinita, atardeceres en la terraza de Cielo y salidas por Acapulco: vela en la bahía, La Quebrada, manglares de Coyuca y el viejo puerto.',
  );

  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* 1 · Hero interior (60–70vh, brief §4.5): alberca_05 es la
          imagen más aspiracional del set alberca. LCP: sin lazy. */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-marino">
        <img
          src={experienciasHeader.hero.src}
          alt={experienciasHeader.hero.alt}
          width="940"
          height="627"
          fetchPriority="high"
          /* Encuadre apenas bajo del centro (52%): conserva las palapas
             y la palmera focal (tercio medio) y deja el agua turquesa al
             pie, donde se asienta el texto marfil sobre el overlay denso.
             A 60% en desktop panorámico se perdían las copas y quedaba
             casi solo agua; 52% sostiene la arquitectura del encuadre. */
          className="absolute inset-0 h-full w-full object-cover object-[50%_52%]"
        />
        {/* Overlay solo donde hay texto (brief §1.1): denso al pie,
            ligero arriba para que la luz del agua respire. AA del
            marfil verificado sobre el degradado al pie. */}
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
            {experienciasHeader.eyebrow}
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-light leading-[1.05] text-marfil"
          >
            {experienciasHeader.titulo}
          </motion.h1>
        </motion.div>
      </section>

      {/* 2 · Intro editorial (marfil): serif grande, la exhalación
          entre la inmersión del hero y la lectura (brief §1.3). */}
      <section className="bg-marfil pt-16 lg:pt-24">
        <Reveal className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <p className="max-w-3xl font-display text-2xl font-light leading-snug text-balance text-marino sm:text-3xl lg:text-4xl">
            {experienciasHeader.intro}
          </p>
          <div className="mt-9 h-px w-12 bg-dorado" aria-hidden="true" />
        </Reveal>
      </section>

      {/* 3 · Bloque "Alberca infinita" (marfil): concepto junto a la
          foto principal (foto-izq / texto-der), con el apoyo editorial
          del desayuno junto al agua bajo el párrafo. En móvil la foto
          abre el bloque (orden del DOM + lg:order). */}
      <section className="bg-marfil py-16 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <Reveal className="overflow-hidden">
            <img
              src={albercaInfinita.fotos.principal.src}
              alt={albercaInfinita.fotos.principal.alt}
              width="940"
              height="623"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:hover:scale-[1.04]"
            />
          </Reveal>
          <Reveal delay={0.12}>
            <SectionHeading
              eyebrow={albercaInfinita.eyebrow}
              title={albercaInfinita.titulo}
            >
              <p>{albercaInfinita.texto}</p>
            </SectionHeading>
            {/* Apoyo editorial del desayuno junto al agua (copy §6.2):
                serif itálica como nota de carta, voz distinta a la del
                párrafo en Jost — puente narrativo con Gastronomía. */}
            <p className="mt-8 max-w-[60ch] font-display text-lg italic leading-relaxed text-marino/75">
              {albercaInfinita.textoSecundario}
            </p>
          </Reveal>
        </div>

        {/* Strip scroll-snap nativo (patrón del Home, brief §4.1):
            el detalle del agua, la nocturna y el desayuno junto a la
            alberca — los tres momentos del día. Stagger de 100ms entre
            fotos (brief §6.3). */}
        <div
          role="region"
          aria-label="Momentos de la alberca a lo largo del día"
          tabIndex={0}
          className="mt-14 snap-x snap-mandatory overflow-x-auto scroll-pl-5 sm:scroll-pl-8 lg:mt-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <RevealGroup
            as="ul"
            stagger={0.1}
            amount={0.1}
            className="flex w-max gap-5 px-5 sm:px-8"
          >
            {[
              albercaInfinita.fotos.detalle,
              albercaInfinita.fotos.nocturna,
              albercaInfinita.fotos.desayuno,
            ].map((foto) => (
              <RevealItem
                as="li"
                key={foto.src}
                className="w-[78vw] max-w-[560px] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw]"
              >
                <div className="overflow-hidden">
                  <img
                    src={foto.src}
                    alt={foto.alt}
                    width="940"
                    height="627"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:hover:scale-[1.04]"
                  />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 4 · Bloque "Atardeceres en Cielo" (arena): dúo terraza_13 +
          terraza_10 (regla dura del set terraza, brief §4.8) en
          layout alternado (texto-izq / foto-der en desktop) con el
          link cruzado a /gastronomia. En móvil la foto abre el bloque. */}
      <section className="bg-arena py-16 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          {/* Dúo de fotos: el crepúsculo grande, la nocturna montada
              sobre su esquina con marco arena — collage asimétrico que
              iguala la altura del texto (patrón Cielo en /gastronomia).
              En móvil pasan a dos fotos en grid; en desktop, solape. */}
          <RevealGroup
            stagger={0.1}
            className="grid gap-5 sm:grid-cols-2 lg:order-2 lg:block"
          >
            <RevealItem className="overflow-hidden lg:w-[84%]">
              <img
                src={atardeceres.fotos.crepusculo.src}
                alt={atardeceres.fotos.crepusculo.alt}
                width="940"
                height="627"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:hover:scale-[1.04]"
              />
            </RevealItem>
            <RevealItem className="overflow-hidden lg:relative lg:z-10 lg:-mt-24 lg:ml-auto lg:w-[58%] lg:border-[10px] lg:border-arena">
              <img
                src={atardeceres.fotos.nocturna.src}
                alt={atardeceres.fotos.nocturna.alt}
                width="940"
                height="627"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:hover:scale-[1.04]"
              />
            </RevealItem>
          </RevealGroup>
          <Reveal delay={0.12} className="lg:order-1">
            <SectionHeading eyebrow={atardeceres.eyebrow} title={atardeceres.titulo}>
              <p>{atardeceres.texto}</p>
            </SectionHeading>
            {/* Link cruzado a /gastronomia (copy §6.3): hover a
                marino/75 (4.8:1 sobre arena, AA), no a dorado — el dorado
                como texto sobre claros falla AA (brief §1.5). marino/70
                sobre arena solo da 4.23:1 (falla); sobre marfil pasaría,
                pero esta banda es arena. */}
            <Link
              to={atardeceres.cta.to}
              className="eyebrow group mt-9 inline-flex min-h-[44px] items-center gap-2.5 text-marino transition-colors duration-300 hover:text-marino/75"
            >
              {atardeceres.cta.label}
              <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 5 · Bloque "Descubre Acapulco" (marino — el único momento de
          profundidad de la página, brief §1.4 y §4.5). Cuatro cards
          horizontales: foto con aspect-ratio fijo + object-cover para
          uniformar orientaciones mixtas, título serif y descripción en
          marfil tenue. Stagger de 90ms entre cards (brief §6.3); el
          eyebrow va en dorado sobre marino (5.32:1, AA). */}
      <section className="bg-marino py-20 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow={descubreAcapulco.eyebrow}
              title={descubreAcapulco.titulo}
            >
              <p>{descubreAcapulco.intro}</p>
            </SectionHeading>
          </Reveal>
          <RevealGroup
            as="ul"
            stagger={0.09}
            delayChildren={0.1}
            amount={0.12}
            className="mt-14 list-none space-y-12 lg:mt-20 lg:space-y-20"
          >
            {descubreAcapulco.cards.map((card, indice) => (
              <RevealItem
                as="li"
                key={card.titulo}
                y={16}
                /* Alternancia foto/texto en cards pares (patrón SHA/
                   Anantara): rompe la monotonía de cuatro filas idénticas
                   y hace que el bloque se lea como editorial, no plantilla.
                   En móvil siempre foto-arriba (brief §4.5). */
                className="grid items-center gap-6 sm:grid-cols-[1fr_1.15fr] sm:gap-10 lg:gap-16"
              >
                {/* Foto: contenedor aspect-ratio fijo (16:10) +
                    object-cover. Las cuatro fotos son horizontales pero
                    de ratios distintos (~16:9 y ~4:3): cada una lleva su
                    object-position (en datos) para que el sujeto quede
                    en cuadro y las cards se sientan uniformes pese a los
                    recortes mixtos. */}
                <div
                  className={`overflow-hidden ${
                    indice % 2 === 1 ? 'sm:order-2' : ''
                  }`}
                >
                  <img
                    src={card.foto.src}
                    alt={card.foto.alt}
                    width="867"
                    height="542"
                    loading="lazy"
                    style={{ objectPosition: card.foto.objectPosition }}
                    className="aspect-[16/10] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:hover:scale-[1.04]"
                  />
                </div>
                {/* Bloque de texto. Número ordinal en dorado (eco del
                    menú "Marea" de /gastronomia, misma familia visual):
                    da jerarquía editorial y guía el ojo sin introducir
                    color fuera de los 7 tokens. El dorado sobre marino
                    da 5.32:1, AA. En cards pares el texto pasa al lado
                    opuesto para alternar con la foto. */}
                <div className={indice % 2 === 1 ? 'sm:order-1' : ''}>
                  <span
                    aria-hidden="true"
                    className="eyebrow block text-dorado"
                  >
                    {String(indice + 1).padStart(2, '0')}
                  </span>
                  <div
                    className="mt-5 h-px w-10 bg-dorado/45"
                    aria-hidden="true"
                  />
                  <h3 className="mt-6 font-display text-2xl font-light leading-snug text-balance text-marfil sm:text-3xl lg:text-4xl">
                    {card.titulo}
                  </h3>
                  <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-marfil/75 sm:text-lg">
                    {card.descripcion}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 6 · Banda CTA de cierre (copy §6.5): arena tras el marino del
          destino — exhalación final, no un segundo bloque marino
          pegado (patrón /habitaciones); ningún recorrido termina en
          callejón sin salida (brief §2.2). */}
      <section className="bg-arena py-24 lg:py-36">
        <RevealGroup
          stagger={0.12}
          className="mx-auto flex max-w-[1400px] flex-col items-center px-5 sm:px-8"
        >
          <RevealItem>
            <SectionHeading
              align="center"
              eyebrow="Reservaciones"
              title={experienciasCta.titulo}
            >
              <p>{experienciasCta.texto}</p>
            </SectionHeading>
          </RevealItem>
          <RevealItem>
            <Link
              to="/contacto"
              /* Feedback del CTA (patrón BookingBar/Gastronomia): cambio de
                 tono al hover + leve "asentamiento" al presionar, solo
                 motion-safe. La banda es arena, así que el anillo de foco
                 marino por defecto contrasta bien (no necesita outline-marfil). */
              className="eyebrow mt-10 inline-flex min-h-[48px] items-center bg-dorado px-8 text-marino transition-[background-color,transform] duration-300 hover:bg-dorado/85 motion-safe:active:scale-[0.99]"
            >
              {experienciasCta.boton}
            </Link>
          </RevealItem>
        </RevealGroup>
      </section>
    </>
  );
}
