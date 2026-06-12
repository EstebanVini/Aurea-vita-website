import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta.js';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal.jsx';
import { drawLine, fadeRise, staggerGroup } from '../lib/motion.js';
import {
  spaAromaterapia,
  spaCircuito,
  spaCta,
  spaFilosofia,
  spaHeader,
  spaMenu,
  spaNota,
} from '../data/spa.js';

/* Entrada del hero interior: eyebrow → H1, mismo lenguaje que
   /habitaciones y /gastronomia (brief §6.1). Spa es la página más
   pausada del sitio — más espacio en blanco que ninguna otra. */
const heroSequence = staggerGroup({ stagger: 0.12, delayChildren: 0.1 });
const heroItem = fadeRise({ y: 18, duration: 0.7 });

/**
 * Página /spa (brief §4.4). Estructura, la más "SHA" del sitio:
 * hero interior 70vh (spa_01) → filosofía de bienestar (marfil, SOLO
 * texto: el silencio visual ES el mensaje) → menú de tratamientos
 * (lista tipográfica vertical, sin foto por tratamiento) → "Circuito
 * de aguas" (la ÚNICA sección de contraste de la página, en oliva en
 * lugar de marino — brief §1.4) → rituales/aromaterapia (marfil) →
 * nota práctica (arena) → banda CTA (marino) → footer.
 *
 * Disciplina de color (brief §4.4, regla dura): los verdes (oliva/
 * salvia) dominan SOLO aquí, pero el salvia y el oliva fallan AA como
 * texto pequeño sobre fondos claros. Por eso el verde se expresa en
 * líneas decorativas (bg-salvia / bg-oliva), en fondos suaves y en el
 * bloque de contraste oliva — los eyebrows sobre marfil/arena van en
 * marino (comportamiento por defecto de SectionHeading). Sobre el
 * bloque oliva el texto va en marfil (eyebrow incluido: el dorado da
 * contraste insuficiente sobre oliva).
 *
 * Motion (intensidad 6/10): reveals de una sola vez, solo transform/
 * opacity, reduced-motion seguro vía las primitivas Reveal. El menú de
 * tratamientos entra con stagger sutil (80ms, brief §6.3) y nada se
 * mueve por línea más allá de eso (brief §6: "sin hovers que muevan
 * duraciones").
 */
export default function Spa() {
  usePageMeta(
    'Spa Vita — Spa & Bienestar · Aurea Vita Acapulco',
    'Rituales de descanso profundo frente al Pacífico: masajes, envolturas, faciales y circuito de aguas. Abierto todos los días de 9:00 a 20:00.',
  );

  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* 1 · Hero interior (70vh, no fullscreen — brief §4.4): spa_01
          es la mejor foto del set, editorial dramática. La foto es el
          LCP: sin lazy, eager + fetchPriority alta. */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-marino">
        <img
          src={spaHeader.hero.src}
          alt={spaHeader.hero.alt}
          width="940"
          height="627"
          fetchPriority="high"
          /* Encuadre levemente alto (42%): el masaje sobre la camilla
             vive en la banda central de la foto; subirlo lo aleja del
             pie, donde el overlay denso y el título lo taparían. El
             borde inferior queda en el mármol claro, no en el sujeto. */
          className="absolute inset-0 h-full w-full object-cover object-[50%_42%]"
        />
        {/* Overlay degradado marino solo donde hay texto (brief §1.1):
            denso al pie, ligero arriba para que la penumbra serena de
            la foto respire. Nunca negro puro. */}
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
            {spaHeader.eyebrow}
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-light leading-[1.05] text-marfil"
          >
            {spaHeader.titulo}
          </motion.h1>
        </motion.div>
      </section>

      {/* 2 · Filosofía de bienestar (marfil, brief §4.4): bloque
          editorial SOLO texto, máx 65ch, serif protagonista. Sin foto:
          el silencio visual es el mensaje. Más aire que en ninguna otra
          página. La línea decorativa va en salvia (no dorado): es el
          hilo verde de la página, y como decorativa 1px no necesita
          pasar contraste de texto. */}
      <section className="bg-marfil py-20 lg:py-32">
        <Reveal className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <p className="eyebrow text-marino">{spaFilosofia.eyebrow}</p>
          <h2 className="mt-4 max-w-[20ch] font-display text-4xl font-light leading-[1.1] text-balance text-marino sm:text-5xl lg:text-6xl">
            {spaFilosofia.titulo}
          </h2>
          {/* Línea salvia: el verde se gana en lo decorativo (brief
              §4.4), no en el texto pequeño sobre claros. */}
          <div className="mt-7 h-px w-12 bg-salvia" aria-hidden="true" />
          <div className="mt-8 max-w-[65ch] space-y-6 font-display text-xl font-light leading-relaxed text-marino/90 sm:text-2xl">
            <p>{spaFilosofia.parrafos[0]}</p>
            <p>{spaFilosofia.parrafos[1]}</p>
          </div>
        </Reveal>
      </section>

      {/* 3 · Menú de tratamientos (arena, brief §4.4): lista tipográfica
          vertical estilo SHA — nombre en Cormorant, duración como
          eyebrow, descripción en piedra, separadores 1px arena. Sin foto
          por tratamiento. El eyebrow va en marino (AA sobre arena); la
          regla salvia que abre el menú se DIBUJA (drawLine, §6.8) — eco
          verde del menú "Marea", el único deleite puntual de /spa.
          Stagger sutil de 80ms (brief §6.3): el menú se "lee"
          tratamiento a tratamiento. */}
      <section className="bg-arena py-20 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-marino">{spaMenu.eyebrow}</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-[1.1] text-balance text-marino sm:text-5xl lg:text-6xl">
              {spaMenu.titulo}
            </h2>
          </Reveal>
          {/* amount bajo (0.15): la lista es alta; evita que en móvil
              tarde en aparecer. Los variants atraviesan el <ul> plano
              vía contexto (mismo patrón que el menú Marea). */}
          <RevealGroup
            stagger={0.08}
            delayChildren={0.1}
            amount={0.15}
            className="mx-auto mt-14 max-w-4xl lg:mt-16"
          >
            {/* Regla salvia que abre el menú: se dibuja de izquierda a
                derecha (solo scaleX + opacity), eco verde del momento de
                deleite del menú "Marea" en /gastronomia (brief §6.8).
                Aquí es la página más calmada del sitio: la línea se traza
                más lento (1.1s) que la dorada de Marea, sin brusquedad.
                Entra dentro del RevealGroup, así hereda el initial/
                whileInView del grupo y queda visible desde el primer
                frame con prefers-reduced-motion (initial={false} en
                RevealGroup). El delay del propio drawLine corre desde el
                disparo del grupo, no se suma al delayChildren. */}
            <motion.div
              variants={drawLine({ duration: 1.1, delay: 0.1 })}
              className="mb-14 h-px w-12 origin-left bg-salvia lg:mb-16"
              aria-hidden="true"
            />
            {/* role="list" explícito: el list-style:none del preflight
                hace que Safari/VoiceOver deje de anunciar la lista. */}
            <ul
              role="list"
              className="list-none divide-y divide-marino/15 border-y border-marino/15"
            >
              {spaMenu.tratamientos.map((tratamiento) => (
                <RevealItem
                  as="li"
                  key={tratamiento.nombre}
                  y={16}
                  /* En móvil la duración va ARRIBA del nombre sin romper
                     línea (brief §4.4 caso extremo); en desktop pasa a la
                     izquierda en su propia columna fija. */
                  className="grid gap-x-10 gap-y-2 py-7 sm:grid-cols-[7rem_1fr] sm:py-8"
                >
                  {/* Duración como eyebrow en marino (AA sobre arena).
                      tabular-nums alinea las cifras entre filas.
                      whitespace-nowrap: la duración nunca rompe línea en
                      móvil (brief §4.4, caso extremo). marino sólido: a
                      0.75rem es texto pequeño y exige 4.5:1 — marino/70
                      sobre arena da 4.23:1 (falla AA), el sólido 9.28:1. */}
                  <span className="eyebrow pt-1.5 text-marino tabular-nums whitespace-nowrap">
                    {tratamiento.duracion}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-light leading-snug text-marino sm:text-3xl">
                      {tratamiento.nombre}
                    </h3>
                    {/* Descripción en marino/75 (no piedra): piedra sobre
                        arena da 3.93:1 y falla AA en texto pequeño;
                        marino/75 da 4.80:1 conservando la jerarquía tenue. */}
                    <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-marino/75 sm:text-base">
                      {tratamiento.descripcion}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </ul>
          </RevealGroup>
        </div>
      </section>

      {/* 4 · Circuito de aguas — sección de contraste y "momento de
          profundidad" de /spa (brief §1.4 / §4.4). El pase global la
          rehízo como banda INMERSIVA de foto a sangre completa (spa_06
          + overlay marino, patrón de los heroes y de la banda CTA del
          Home, brief §1.1 "la foto manda"). Motivo: el fondo plano oliva
          NO alcanza AA con ningún token para texto pequeño (marfil sobre
          oliva = 3.09:1; ver QA P1). Sobre el scrim marino el texto
          marfil pasa AA holgado. La identidad verde se conserva en el
          agua verde de la propia alberca, el eyebrow salvia y la línea
          oliva. Se retiró spa_03 (turquesa/grifo dorado fuera de paleta,
          QA P2): spa_06 sostiene el bloque sola, más SHA/serena. */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-marino py-24 lg:py-36">
        <img
          src={spaCircuito.foto.src}
          alt={spaCircuito.foto.alt}
          width="867"
          height="650"
          loading="lazy"
          /* No es el LCP (vive a media página): lazy. Encuadre al centro
             para conservar la alberca y los muros de arena. */
          className="absolute inset-0 h-full w-full object-cover object-[50%_55%]"
        />
        {/* Overlay marino: denso a la izquierda (donde va el texto) y
            ligero a la derecha (deja respirar la alberca). Garantiza el
            AA del marfil con independencia de la luminancia de la foto.
            Nunca negro puro (brief §1.1). */}
        <div
          className="absolute inset-0 bg-linear-to-r from-marino/85 via-marino/55 to-marino/25"
          aria-hidden="true"
        />
        <Reveal className="relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-8">
          <div className="max-w-xl">
            {/* Eyebrow salvia sobre marino (5.54:1, AA): el acento verde
                de la página sin texto sobre oliva. */}
            <p className="eyebrow text-salvia">{spaCircuito.eyebrow}</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-[1.1] text-balance text-marfil sm:text-5xl lg:text-6xl">
              {spaCircuito.titulo}
            </h2>
            {/* Línea oliva: el verde se gana en lo decorativo. */}
            <div className="mt-7 h-px w-12 bg-oliva" aria-hidden="true" />
            <p className="mt-7 max-w-[58ch] text-base leading-relaxed text-marfil/90 sm:text-lg">
              {spaCircuito.texto}
            </p>
          </div>
        </Reveal>
      </section>

      {/* 5 · Rituales / aromaterapia (marfil, brief §4.4): spa_15
          (still-life de aceites, alineada con la paleta de marca) como
          foto principal + spa_09 (vela/difusor) como detalle. Layout
          alternado: texto-izq / foto-der; en móvil la foto va primero
          (orden del DOM + lg:order). Eyebrow marino, línea salvia. */}
      <section className="bg-marfil py-20 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <Reveal className="lg:order-1">
            <p className="eyebrow text-marino">{spaAromaterapia.eyebrow}</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-light leading-[1.1] text-balance text-marino sm:text-5xl lg:text-6xl">
              {spaAromaterapia.titulo}
            </h2>
            <div className="mt-7 h-px w-12 bg-salvia" aria-hidden="true" />
            <p className="mt-7 max-w-[60ch] text-base leading-relaxed text-marino/80 sm:text-lg">
              {spaAromaterapia.texto}
            </p>
          </Reveal>
          {/* Dúo de fotos: el still-life de aceites grande, la vela
              montada sobre su esquina con marco marfil. En móvil grid de
              2 columnas (foto primero respecto al texto). */}
          <RevealGroup
            stagger={0.1}
            delayChildren={0.1}
            className="grid gap-5 sm:grid-cols-2 lg:order-2 lg:block"
          >
            <RevealItem className="overflow-hidden lg:w-[82%]">
              <img
                src={spaAromaterapia.fotos.aceites.src}
                alt={spaAromaterapia.fotos.aceites.alt}
                width="940"
                height="627"
                loading="lazy"
                /* spa_15 es panorámica (16:9) en marco vertical 4:5: el
                   still-life de botellas vive en la mitad inferior, bajo
                   el arco. Encuadre bajo (66%) para conservar el bodegón
                   y la luz de las varillas, no la pared superior vacía. */
                className="aspect-[4/5] w-full object-cover object-[50%_66%] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:hover:scale-[1.04]"
              />
            </RevealItem>
            <RevealItem className="overflow-hidden lg:relative lg:z-10 lg:-mt-28 lg:ml-auto lg:w-[58%] lg:border-[10px] lg:border-marfil">
              <img
                src={spaAromaterapia.fotos.vela.src}
                alt={spaAromaterapia.fotos.vela.alt}
                width="940"
                height="627"
                loading="lazy"
                /* spa_09 horizontal (3:2) en marco 4:5: el difusor y la
                   llama están al centro-bajo. Encuadre a 58% para anclar
                   la vela y la veta de madera, no el fondo en penumbra. */
                className="aspect-[4/5] w-full object-cover object-[50%_58%] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:hover:scale-[1.04]"
              />
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* 6 · Nota práctica (arena, copy §5.6): información de servicio en
          formato sobrio, no editorial. Título pequeño como eyebrow en
          marino, texto en piedra. Ancho contenido (60ch) para lectura
          de utilidad, no de inmersión. */}
      <section className="bg-arena py-16 lg:py-24">
        <Reveal className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="max-w-[60ch] border-l-2 border-salvia pl-6 sm:pl-8">
            <h2 className="eyebrow text-marino">{spaNota.titulo}</h2>
            {/* marino/75 (no piedra): piedra sobre arena da 3.93:1 y falla
                AA; marino/75 da 4.80:1 manteniendo el tono de utilidad. */}
            <p className="mt-4 text-base leading-relaxed text-marino/75 sm:text-lg">
              {spaNota.texto}
            </p>
          </div>
        </Reveal>
      </section>

      {/* 7 · Banda CTA de cierre (copy §5.7): marino sólido — ningún
          recorrido termina en callejón sin salida (brief §2.2).

          DECISIÓN visual-designer (botón, brief §4.4): el brief permite,
          como única excepción del sitio, un botón OLIVA aquí. Se RECHAZA.
          Motivo de contraste (verificado): el label usa la utilidad
          `eyebrow` (0.75rem/12px, peso 500 — texto PEQUEÑO, AA exige
          4.5:1). Sobre oliva da 3.09:1 con marfil y 3.46:1 con marino:
          ambos fallan AA para ese tamaño. El brief es explícito: "si
          oliva no alcanza AA con marfil para el texto pequeño del botón,
          NO lo uses." Por tanto el botón se queda DORADO (marino sobre
          dorado = 5.32:1, AA holgado) — patrón global de Gastronomia/
          Habitaciones, disciplina de paleta (regla dura §0.2) intacta.
          La identidad verde de Spa NO se pierde en el cierre: se gana en
          el eyebrow salvia y la línea oliva de esta banda (decorativos
          sobre marino, donde el verde respira sin label accionable), de
          modo que la página cierra en verde aunque el CTA siga dorado. */}
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
              /* Eyebrow salvia (no dorado) sobre marino: cierra la página
                 en su acento verde. salvia sobre marino respira sin ser
                 texto accionable; el dorado se reserva al botón. */
              eyebrowClassName="text-salvia"
              title={spaCta.titulo}
            >
              <p>{spaCta.texto}</p>
            </SectionHeading>
          </RevealItem>
          <RevealItem>
            <Link
              to="/contacto"
              /* Anillo de foco marfil sobre marino: el currentColor del
                 botón (marino) sería invisible aquí (patrón RoomCard).
                 Feedback del CTA: cambio de tono al hover + "asentamiento"
                 al presionar, solo motion-safe. */
              className="eyebrow mt-10 inline-flex min-h-[48px] items-center bg-dorado px-8 text-marino transition-[background-color,transform] duration-300 hover:bg-dorado/85 focus-visible:outline-marfil motion-safe:active:scale-[0.99]"
            >
              {spaCta.boton}
            </Link>
          </RevealItem>
        </RevealGroup>
      </section>
    </>
  );
}
