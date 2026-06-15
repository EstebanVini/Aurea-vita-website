import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta.js';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal.jsx';
import { drawLine, fadeRise, staggerGroup } from '../lib/motion.js';
import {
  cielo,
  cocteles,
  gastronomiaCta,
  gastronomiaHeader,
  menuMarea,
  origen,
} from '../data/dining.js';

/* Entrada del hero interior: eyebrow → H1, mismo lenguaje que
   /habitaciones (brief §6.1) — página de lectura pausada, no de
   primera impresión. */
const heroSequence = staggerGroup({ stagger: 0.12, delayChildren: 0.1 });
const heroItem = fadeRise({ y: 18, duration: 0.7 });

/**
 * Tabla mínima de horarios (brief §4.3): servicio como eyebrow,
 * horas en cifras tabulares — grid, no flexbox con puntos, para que
 * nada se desalinee. Se usa en Origen (marfil) y Cielo (arena),
 * siempre sobre fondos claros.
 */
function Horarios({ items, nota, label }) {
  return (
    <div>
      <h3 className="sr-only">{label}</h3>
      <dl className="divide-y divide-marino/15 border-y border-marino/15">
        {items.map((item) => (
          <div
            key={item.servicio}
            className="grid grid-cols-[1fr_auto] items-baseline gap-6 py-3.5"
          >
            <dt className="eyebrow text-marino">{item.servicio}</dt>
            <dd className="text-sm text-marino/75 tabular-nums sm:text-base">
              {item.horas}
            </dd>
          </div>
        ))}
      </dl>
      {nota && <p className="mt-3.5 text-sm text-marino/75">{nota}</p>}
    </div>
  );
}

/**
 * Página /gastronomia (brief §4.3). Estructura, en layout alternado
 * imagen/texto estilo SHA:
 * hero interior 70vh (restaurante_11) → intro editorial (marfil) →
 * Origen en dos slots alternados + imagen ancha de la terraza verde
 * (marfil) → menú degustación "Marea" sobre marino (el momento de
 * profundidad de la página: lista tipográfica, sin fotos por plato)
 * → Cielo sobre arena (terraza_13 + cocteles de autor con el dúo
 * terraza_10/terraza_03) → banda CTA (marino) → footer.
 *
 * En móvil el layout alternado colapsa SIEMPRE a foto-arriba /
 * texto-abajo (brief §4.3: nunca alternar el orden vertical).
 * Motion: reveals de una sola vez. El menú "Marea" y la carta de
 * cocteles son las dos listas tipográficas de la página: sus líneas
 * entran con stagger suave (80–90ms, brief §6.3) y el menú abre con
 * la línea dorada que se dibuja (drawLine, §6.8) — el momento de
 * deleite puntual de /gastronomia, espejo de la Suite Aurea.
 */
export default function Gastronomia() {
  usePageMeta(
    'Alimentación Consciente · Aurea Vita Acapulco',
    'Alimentación consciente frente al Pacífico: cocina sana y de temporada en Origen y atardeceres en la terraza de Cielo. Comer bien como parte del descanso.',
  );

  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* 1 · Hero interior (60–70vh, brief §4.3): restaurante_11 es la
          narrativa completa de Origen en una imagen. LCP: sin lazy. */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-marino">
        <img
          src={gastronomiaHeader.hero.src}
          alt={gastronomiaHeader.hero.alt}
          width="903"
          height="650"
          fetchPriority="high"
          /* Encuadre levemente bajo (60%): prioriza la mesa servida y
             el puerto sobre el techo del comedor. */
          className="absolute inset-0 h-full w-full object-cover object-[50%_60%]"
        />
        {/* Overlay solo donde hay texto (brief §1.1): denso al pie,
            ligero arriba para que la luz dorada de la foto respire. */}
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
            {gastronomiaHeader.eyebrow}
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-light leading-[1.05] text-marfil"
          >
            {gastronomiaHeader.titulo}
          </motion.h1>
        </motion.div>
      </section>

      {/* 2 · Intro editorial (marfil): serif grande, la exhalación
          entre la inmersión del hero y la lectura (brief §1.3). */}
      <section className="bg-marfil pt-16 lg:pt-24">
        <Reveal className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <p className="max-w-3xl font-display text-2xl font-light leading-snug text-balance text-marino sm:text-3xl lg:text-4xl">
            {gastronomiaHeader.intro}
          </p>
          <div className="mt-9 h-px w-12 bg-dorado" aria-hidden="true" />
        </Reveal>
      </section>

      {/* 3 · Origen — slot 1 (marfil, foto-izq / texto-der):
          el concepto del muelle con la cena crepuscular al lado. */}
      <section className="bg-marfil py-16 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <Reveal className="overflow-hidden">
            <img
              src={origen.fotos.crepusculo.src}
              alt={origen.fotos.crepusculo.alt}
              width="940"
              height="627"
              loading="lazy"
              /* Encuadre a la izquierda (28%): el ventanal con el
                 horizonte crepuscular vive en ese tercio de la foto;
                 el centro solo muestra piso y techo del comedor. */
              className="aspect-[4/5] w-full object-cover object-[28%_50%] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:hover:scale-[1.04]"
            />
          </Reveal>
          <Reveal delay={0.12}>
            <SectionHeading eyebrow={origen.eyebrow} title={origen.titulo}>
              <p>{origen.parrafos[0]}</p>
            </SectionHeading>
          </Reveal>
        </div>

        {/* Origen — slot 2 (alternado: texto-izq / foto-der): las
            redes náuticas del comedor junto al párrafo que las nombra,
            más la tabla mínima de horarios. En móvil la foto va
            primero (orden del DOM + lg:order). */}
        <div className="mx-auto mt-20 grid max-w-[1400px] items-center gap-10 px-5 sm:px-8 lg:mt-32 lg:grid-cols-2 lg:gap-20">
          <Reveal className="overflow-hidden lg:order-2">
            <img
              src={origen.fotos.redes.src}
              alt={origen.fotos.redes.alt}
              width="940"
              height="627"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:hover:scale-[1.04]"
            />
          </Reveal>
          <Reveal delay={0.12} className="lg:order-1">
            <p className="max-w-[65ch] text-base leading-relaxed text-marino/80 sm:text-lg">
              {origen.parrafos[1]}
            </p>
            <div className="mt-10 max-w-md">
              <Horarios
                items={origen.horarios}
                nota={origen.notaHorarios}
                label="Horarios de Origen"
              />
            </div>
          </Reveal>
        </div>

        {/* Origen — cierre del bloque: la terraza verde en formato
            panorámico con pie de foto, puente hacia el desayuno. */}
        <figure className="mx-auto mt-20 max-w-[1400px] px-5 sm:px-8 lg:mt-32">
          <Reveal className="overflow-hidden">
            <img
              src={origen.fotos.terrazaVerde.src}
              alt={origen.fotos.terrazaVerde.alt}
              width="940"
              height="627"
              loading="lazy"
              className="aspect-[16/9] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:hover:scale-[1.04] lg:aspect-[21/9]"
            />
          </Reveal>
          <Reveal delay={0.1} as="figcaption" className="mt-4">
            <span className="eyebrow text-marino/75">
              La mañana en Origen · desayuno en la terraza verde
            </span>
          </Reveal>
        </figure>
      </section>

      {/* 4 · Menú degustación "Marea" (marino — el momento de
          profundidad de la página, brief §1.4). Lista tipográfica:
          tiempos numerados en dorado, nombres en serif, descriptores
          en marfil tenue. Sin fotos por plato, sin precios. Motion:
          la regla dorada superior se dibuja (drawLine) mientras los
          siete tiempos entran en stagger de 80ms — el menú se "sirve"
          tiempo a tiempo, sutileza editorial, nunca por letra. */}
      <section className="bg-marino py-20 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal className="mx-auto max-w-3xl">
            <SectionHeading
              align="center"
              tone="dark"
              eyebrow={menuMarea.eyebrow}
              title={menuMarea.titulo}
            >
              <p>{menuMarea.intro}</p>
            </SectionHeading>
          </Reveal>
          {/* El grupo dispara una sola vez con poco viewport (la lista
              es alta; 0.15 evita que en móvil tarde en aparecer). Los
              variants atraviesan el <ol> plano vía contexto (mismo
              patrón que RoomCard). */}
          <RevealGroup
            stagger={0.08}
            delayChildren={0.1}
            amount={0.15}
            className="mx-auto mt-16 max-w-3xl"
          >
            {/* Regla dorada del menú: se dibuja de izquierda a derecha
                (solo scaleX + opacity) y sustituye al border-top del
                <ol>. Con reduced-motion el grupo monta en estado final
                y la línea queda visible desde el primer frame. */}
            <motion.div
              variants={drawLine({ duration: 1, delay: 0.15 })}
              className="h-px origin-left bg-dorado/45"
              aria-hidden="true"
            />
            {/* role="list" explícito: el list-style:none del preflight
                hace que Safari/VoiceOver deje de anunciar la lista. */}
            <ol
              role="list"
              className="list-none divide-y divide-marfil/10 border-b border-marfil/10"
            >
              {menuMarea.tiempos.map((tiempo, indice) => (
                <RevealItem
                  as="li"
                  key={tiempo.nombre}
                  y={16}
                  className="grid gap-x-8 gap-y-1.5 py-6 sm:grid-cols-[3.5rem_1fr] sm:py-7"
                >
                  {/* Número de tiempo: dorado sobre marino (5.8:1, AA) */}
                  <span
                    aria-hidden="true"
                    className="eyebrow pt-1 text-dorado"
                  >
                    {String(indice + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-light leading-snug text-marfil sm:text-3xl">
                      <span className="sr-only">{`Tiempo ${indice + 1}: `}</span>
                      {tiempo.nombre}
                    </h3>
                    <p className="mt-1.5 max-w-[60ch] text-sm leading-relaxed text-marfil/70 sm:text-base">
                      {tiempo.descriptor}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </ol>
            {/* Nota de servicio en serif itálica — gesto de carta
                impresa que cierra el menú con voz distinta a la de
                los descriptores en Jost. */}
            <RevealItem
              as="p"
              y={16}
              className="mt-8 max-w-[58ch] font-display text-lg italic leading-relaxed text-marfil/75"
            >
              {menuMarea.nota}
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* 5 · Cielo — bar de terraza (arena, brief §4.3): concepto y
          horarios junto a terraza_13, la mejor foto del set. */}
      <section className="bg-arena py-16 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          {/* En móvil la foto abre el bloque; en desktop pasa a la
              derecha para alternar respecto al slot 1 de Origen. */}
          <Reveal className="overflow-hidden lg:order-2">
            <img
              src={cielo.fotos.principal.src}
              alt={cielo.fotos.principal.alt}
              width="940"
              height="627"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:hover:scale-[1.04]"
            />
          </Reveal>
          <Reveal delay={0.12} className="lg:order-1">
            <SectionHeading eyebrow={cielo.eyebrow} title={cielo.titulo}>
              <p>{cielo.concepto}</p>
            </SectionHeading>
            <div className="mt-10 max-w-md">
              <Horarios
                items={cielo.horarios}
                nota={cielo.notaHorarios}
                label="Horarios de Cielo"
              />
            </div>
          </Reveal>
        </div>

        {/* Cocteles de autor: dúo de fotos (lounge nocturno + terraza
            diurna — las dos horas del bar) junto a la carta breve en
            lista tipográfica. En desktop el dúo se compone como collage
            asimétrico: la noche grande, el día montado sobre su esquina
            con marco arena — el solape iguala la altura de la carta y
            evita el vacío muerto del apilado simétrico. La carta entra
            en stagger: encabezado primero, luego cada coctel a 90ms —
            eco discreto del menú Marea, sin drawLine (ese momento es
            solo del menú). */}
        <div className="mx-auto mt-20 grid max-w-[1400px] items-start gap-10 px-5 sm:px-8 lg:mt-32 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <RevealGroup stagger={0.1} className="grid gap-5 sm:grid-cols-2 lg:block">
            <RevealItem className="overflow-hidden lg:w-[82%]">
              <img
                src={cielo.fotos.lounge.src}
                alt={cielo.fotos.lounge.alt}
                width="940"
                height="627"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:hover:scale-[1.04]"
              />
            </RevealItem>
            <RevealItem className="overflow-hidden lg:relative lg:z-10 lg:-mt-24 lg:ml-auto lg:w-[58%] lg:border-[10px] lg:border-arena">
              <img
                src={cielo.fotos.diurna.src}
                alt={cielo.fotos.diurna.alt}
                width="940"
                height="627"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:hover:scale-[1.04]"
              />
            </RevealItem>
          </RevealGroup>
          <RevealGroup stagger={0.09} delayChildren={0.12} amount={0.15}>
            <RevealItem>
              <p className="eyebrow text-marino">La carta</p>
              <h3 className="mt-4 font-display text-3xl font-light leading-[1.1] text-balance text-marino sm:text-4xl">
                Cocteles de autor
              </h3>
              <div className="mt-7 h-px w-12 bg-dorado" aria-hidden="true" />
            </RevealItem>
            {/* role="list" por la misma razón que el menú Marea. */}
            <ul
              role="list"
              className="mt-9 divide-y divide-marino/15 border-y border-marino/15"
            >
              {cocteles.map((coctel) => (
                <RevealItem as="li" key={coctel.nombre} y={16} className="py-6">
                  <h4 className="font-display text-2xl font-light leading-snug text-marino sm:text-3xl">
                    {coctel.nombre}
                  </h4>
                  <p className="mt-1.5 max-w-[60ch] text-sm leading-relaxed text-marino/75 sm:text-base">
                    {coctel.descriptor}
                  </p>
                </RevealItem>
              ))}
            </ul>
          </RevealGroup>
        </div>
      </section>

      {/* 6 · Banda CTA de cierre (copy §4.4): marino sólido — ningún
          recorrido termina en callejón sin salida (brief §2.2). */}
      <section className="bg-marino py-24 lg:py-36">
        <RevealGroup
          stagger={0.12}
          className="mx-auto flex max-w-[1400px] flex-col items-center px-5 sm:px-8"
        >
          <RevealItem>
            <SectionHeading
              align="center"
              tone="dark"
              eyebrow="Reservaciones"
              title={gastronomiaCta.titulo}
            >
              <p>{gastronomiaCta.texto}</p>
            </SectionHeading>
          </RevealItem>
          <RevealItem>
            <Link
              to="/contacto"
              /* Anillo de foco marfil sobre marino: el currentColor del
                 botón (marino) sería invisible aquí (patrón RoomCard). */
              /* Feedback del CTA (patrón BookingBar): cambio de tono al
                 hover + "asentamiento" al presionar, solo motion-safe. */
              className="eyebrow mt-10 inline-flex min-h-[48px] items-center bg-dorado px-8 text-marino transition-[background-color,transform] duration-300 hover:bg-dorado/85 focus-visible:outline-marfil motion-safe:active:scale-[0.99]"
            >
              {gastronomiaCta.boton}
            </Link>
          </RevealItem>
        </RevealGroup>
      </section>
    </>
  );
}
