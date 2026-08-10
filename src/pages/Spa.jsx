import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta.js';
import Parallax from '../components/Parallax.jsx';
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
  spaReserva,
} from '../data/spa.js';

/**
 * Bandera reversible "en construcción" (ronda 15 jun §9.5 / D2). En true
 * oculta los tres bloques gateados (menú de tratamientos, circuito de
 * aguas, aromaterapia) SIN borrar su JSX ni sus datos: reactivar = poner
 * en false. Mismo espíritu que la página /contacto. La página queda
 * coherente y con cierre: hero + texto central + nota "próximamente" +
 * banda CTA. NO implementa calendario/Odoo (mejora futura, §9.8).
 */
const SECCIONES_EN_CONSTRUCCION = true;

/* Entrada del hero interior: eyebrow → H1, mismo lenguaje que
   /habitaciones y /gastronomia (brief §6.1). Spa es la página más
   pausada del sitio — más espacio en blanco que ninguna otra. */
const heroSequence = staggerGroup({ stagger: 0.12, delayChildren: 0.1 });
const heroItem = fadeRise({ y: 18, duration: 0.7 });

/**
 * Página /spa (brief §4.4). Estructura, la más "SHA" del sitio:
 * hero interior 70vh (spa_07) → banda de reserva anclada al hero
 * (arena: microcopy + botón "Reservar espacio" a la derecha, como lo
 * dibujó el cliente en docs/Fotos WEB AV.pdf, ronda 23 jul) →
 * filosofía de bienestar (marfil, SOLO texto centrado: el silencio
 * visual ES el mensaje) → menú de tratamientos
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
    'Wellness · Aurea Vita Acapulco',
    'Wellness frente al Pacífico: masajes, terapias y experiencias para desacelerar y reconectar contigo mismo, al ritmo del mar. Muy pronto, el menú completo.',
  );

  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* 1 · Hero interior (70vh, no fullscreen — brief §4.4): el hero
          es spa_07 (yoga al aire libre con el Pacífico de fondo), la
          única calidad 4 del set de spa en la entrega definitiva; la
          nota anterior hablaba de spa_01 y de una editorial en penumbra
          que ya no es esta foto. La foto es el LCP: sin lazy, eager +
          fetchPriority alta. */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-marino">
        <img
          src={spaHeader.hero.src}
          alt={spaHeader.hero.alt}
          width="1600"
          height="1002"
          fetchPriority="high"
          /* Encuadre bajo (58%) heredado de la foto anterior (una mesa
             de masaje en interior, que ya no es esta). Sobre spa_07
             funciona por otro motivo: baja el horizonte y deja el césped
             con los tapetes en la mitad inferior, que es donde va el
             texto; arriba quedan el seto, el mar y el cielo.
             Ken Burns lento (§6.8, ronda 23 jul, pase de motion): mismo
             pulso que el Home — CSS puro (no retrasa el LCP), contenido
             por el overflow-hidden del section, solo motion-safe. En la
             página más pausada del sitio, la penumbra respira. */
          className="absolute inset-0 h-full w-full object-cover object-[50%_58%] motion-safe:animate-kenburns"
        />
        {/* Overlay degradado marino solo donde hay texto (brief §1.1):
            denso al pie, ligero arriba para que la foto respire. Nunca
            negro puro.
            RECALIBRADO (QA ago 2026, fotografía definitiva): era
            40/15/65, calibrado para spa_01 (penumbra de mármol). El hero
            es ahora spa_07 —yoga sobre césped a pleno día, mucho más
            claro— y con los valores viejos el eyebrow caía a 3.00:1 y el
            H1 a 2.98:1, por debajo de AA. El `via` sube 15→45 (el H1
            ocupa dos líneas y empuja el eyebrow a ~57% de la altura,
            donde mandaba el `via`) y el pie 65→80. Medido sobre el
            archivo web con el object-cover real, peor teja de 24×24 px,
            5 viewports × Ken Burns: eyebrow 5.12:1, H1 4.80:1. */}
        <div
          className="absolute inset-0 bg-linear-to-b from-marino/40 via-marino/45 to-marino/80"
          aria-hidden="true"
        />
        {/* text-shadow marino (QA 15 jun, P1). La nota original hablaba
            de los reflejos del mármol de spa_01; el hero es ahora spa_07
            y el papel del halo es el mismo pero sobre otro riesgo: los
            brillos del césped a pleno sol y las toallas blancas de los
            tapetes. Sostiene el contraste en el borde de cada glifo allí
            donde el degradado recalibrado no llega, sin oscurecer más el
            hero. */}
        <motion.div
          variants={heroSequence}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-16 pt-44 sm:px-8 lg:pb-20 [text-shadow:0_1px_12px_rgb(31_58_68_/_0.7)]"
        >
          <motion.p variants={heroItem} className="eyebrow text-marfil">
            {spaHeader.eyebrow}
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-light leading-[1.05] text-marfil"
          >
            {spaHeader.titulo}
          </motion.h1>
          {/* Subtítulo nuevo (ronda 15 jun §9.5): más pequeño, bajo el H1,
              dentro de la secuencia de entrada. marfil/90 sobre el overlay
              denso al pie del hero pasa AA en la mediana; el text-shadow
              del bloque cubre los reflejos del mármol. */}
          <motion.p
            variants={heroItem}
            className="mt-5 max-w-xl text-lg text-marfil/90"
          >
            {spaHeader.subtitulo}
          </motion.p>
        </motion.div>
      </section>

      {/* 1b · Banda de reserva anclada al hero (ronda 23 jul, docs/
          Fotos WEB AV.pdf pág. Wellness + recomposición 23 jul): el
          cliente dibujó el botón dorado "Reservar espacio" inmediatamente
          bajo el hero, cargado a la derecha, rumbo al calendario de citas
          de masajes y terapias (aún no existe: el destino vive
          centralizado en spaReserva.to, hoy /contacto). Antes el botón
          colgaba suelto bajo la filosofía — ahora vive aquí, con una
          línea de microcopy que lo ancla para que no flote solo. Banda
          arena compacta: separa el hero marino del marfil de la filosofía
          y se lee como barra de acción, no como sección editorial. En
          móvil microcopy y botón se apilan a la izquierda; en desktop la
          pareja se recarga a la derecha, como en el dibujo del cliente.
          marino/75 sobre arena = 4.80:1 (AA); botón dorado estándar. */}
      <section className="bg-arena">
        {/* Ronda 23 jul (pase de motion): la banda entra en dos tiempos
            (RevealGroup, stagger 0.12) — el microcopy aterriza primero y
            el botón dorado lo sigue un paso después, ganando su propia
            jerarquía como remate de la barra de acción. Mismas
            primitivas estándar: una sola vez, visible y estático con
            reduced-motion (initial={false} en RevealGroup). Las
            utilidades de flex del botón (shrink-0 / self-*) migran al
            RevealItem, que ahora es el hijo del flexbox. */}
        <RevealGroup
          stagger={0.12}
          className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-end lg:gap-10 lg:py-12"
        >
          <RevealItem
            as="p"
            className="max-w-[42ch] text-base leading-relaxed text-marino/75 sm:text-lg"
          >
            {spaReserva.nota}
          </RevealItem>
          <RevealItem className="shrink-0 self-start lg:self-auto">
            <Link
              to={spaReserva.to}
              className="eyebrow inline-flex min-h-[48px] items-center bg-dorado px-8 text-marino transition-[background-color,transform] duration-300 hover:bg-dorado/85 motion-safe:active:scale-[0.99]"
            >
              {spaReserva.boton}
            </Link>
          </RevealItem>
        </RevealGroup>
      </section>

      {/* 2 · Filosofía de bienestar (marfil, brief §4.4): bloque
          editorial SOLO texto, serif protagonista. Sin foto: el
          silencio visual es el mensaje. Más aire que en ninguna otra
          página. Recomposición ronda 23 jul: antes el bloque iba
          alineado a la izquierda con toda la mitad derecha vacía y el
          botón suelto debajo — ahora es una declaración CENTRADA a lo
          SHA (eyebrow, línea salvia y párrafo sobre el mismo eje), de
          modo que el vacío alrededor se lee deliberado; el botón subió
          a la banda de reserva anclada al hero. La línea decorativa va
          en salvia (no dorado): es el hilo verde de la página, y como
          decorativa 1px no necesita pasar contraste de texto. */}
      <section className="bg-marfil py-20 lg:py-32">
        <Reveal className="mx-auto max-w-[1400px] px-5 text-center sm:px-8">
          <p className="eyebrow text-marino">{spaFilosofia.eyebrow}</p>
          {/* Línea salvia: el verde se gana en lo decorativo (brief
              §4.4), no en el texto pequeño sobre claros. */}
          <div className="mx-auto mt-7 h-px w-12 bg-salvia" aria-hidden="true" />
          {/* Texto central nuevo (ronda 15 jun §9.5): va sin H2 (copy
              §5.2), como párrafo editorial en serif protagonista —el
              silencio visual es el mensaje. */}
          <p className="mx-auto mt-8 max-w-[42ch] font-display text-2xl font-light leading-snug text-balance text-marino sm:text-3xl lg:text-4xl">
            {spaFilosofia.texto}
          </p>
        </Reveal>
      </section>

      {/* 3 · Menú de tratamientos (arena, brief §4.4): lista tipográfica
          vertical estilo SHA — nombre en Cormorant, duración como
          eyebrow, descripción en piedra, separadores 1px arena. Sin foto
          por tratamiento. El eyebrow va en marino (AA sobre arena); la
          regla salvia que abre el menú se DIBUJA (drawLine, §6.8) — eco
          verde del menú "Marea", el único deleite puntual de /spa.
          Stagger sutil de 80ms (brief §6.3): el menú se "lee"
          tratamiento a tratamiento.

          GATEADO (ronda 15 jun §9.5, D2): este bloque y los dos
          siguientes (circuito de aguas, aromaterapia) quedan ocultos
          tras SECCIONES_EN_CONSTRUCCION; el JSX y los datos se conservan
          íntegros. Reactivar = poner la bandera en false. */}
      {!SECCIONES_EN_CONSTRUCCION && (
        <>
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
          oliva. Ronda ago 26: el bloque lo sostiene alberca_10 (la
          alberca de mosaico al pie de los ventanales al atardecer); las
          notas sobre spa_03 y spa_06 eran del set anterior.
          ⚠ QA ago 2026 (P1): el overlay horizontal de abajo se calibró
          para la foto anterior y sobre alberca_10 NO cumple AA — ver el
          comentario del overlay. */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-marino py-24 lg:py-36">
        <img
          src={spaCircuito.foto.src}
          alt={spaCircuito.foto.alt}
          width="1600"
          height="1066"
          loading="lazy"
          /* No es el LCP (vive a media página): lazy. Encuadre al centro
             para conservar la alberca de mosaico y los ventanales
             iluminados del hotel (alberca_10; la nota anterior hablaba
             de unos muros de arena que eran de la foto vieja). */
          className="absolute inset-0 h-full w-full object-cover object-[50%_55%]"
        />
        {/* Overlay marino: denso a la izquierda (donde va el texto) y
            ligero a la derecha (deja respirar la alberca).
            RECALIBRADO (QA ago 2026). Era 85/55/25 y la nota afirmaba que
            garantizaba el AA "con independencia de la luminancia de la
            foto": cierto para spa_06 (alberca verde en sombra), falso
            para alberca_10, bastante más clara. Con los valores viejos:
            eyebrow 2.37:1, h2 2.37:1, párrafo 4.12:1.
            Tres cambios, en este orden de importancia:
            1) El eyebrow deja de ser salvia. #a3b5a0 tiene L=0.444 y
               exige un fondo casi marino sólido para dar 4.5:1 — sobre
               foto no llega ni a 94/80/45 (3.90:1). Es el mismo caso que
               el dorado en §1.1: acento válido sobre marino sólido, no
               sobre imagen. Pasa a marfil (el verde se conserva en la
               línea oliva de abajo, que es decorativa).
            2) El degradado sube a 92/78/50.
            3) El párrafo pasa de marfil/90 a marfil sólido, el mismo
               recurso que en los heroes interiores.
            Medido con el copy real sobre el archivo web, peor teja de
            24×24 px, 7 viewports: eyebrow 7.03:1, h2 5.12:1, p 7.15:1. */}
        <div
          className="absolute inset-0 bg-linear-to-r from-marino/92 via-marino/78 to-marino/50"
          aria-hidden="true"
        />
        {/* El degradado de arriba es HORIZONTAL y en < md el texto ocupa
            todo el ancho: el h2 se metía en el extremo claro y caía a
            3.87:1. Scrim plano solo en móvil (mismo patrón que el hero
            del Home), que sube el h2 a 5.12:1. En md+ no aplica: ahí el
            texto vive en la mitad izquierda y la alberca sigue abierta
            a la derecha. */}
        <div
          className="absolute inset-0 bg-marino/35 md:hidden"
          aria-hidden="true"
        />
        <Reveal className="relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-8">
          <div className="max-w-xl">
            {/* Marfil, no salvia: los 5.54:1 que citaba esta nota eran
                sobre marino SÓLIDO, y aquí el fondo es una foto (ver el
                overlay arriba). El acento verde de la página lo sostiene
                la línea oliva de abajo. */}
            <p className="eyebrow text-marfil">{spaCircuito.eyebrow}</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-[1.1] text-balance text-marfil sm:text-5xl lg:text-6xl">
              {spaCircuito.titulo}
            </h2>
            {/* Línea oliva: el verde se gana en lo decorativo. */}
            <div className="mt-7 h-px w-12 bg-oliva" aria-hidden="true" />
            {/* marfil sólido, no /90: sobre alberca_10 la opacidad dejaba
                el párrafo en 4.12:1 (pide 4.5:1). */}
            <p className="mt-7 max-w-[58ch] text-base leading-relaxed text-marfil sm:text-lg">
              {spaCircuito.texto}
            </p>
          </div>
        </Reveal>
      </section>

      {/* 5 · Rituales / aromaterapia (marfil, brief §4.4): spa_10
          (still-life de aceites, alineada con la paleta de marca) como
          (set de aceites) como foto principal + spa_11 (sala de
          tratamiento) como detalle. Layout
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
              {/* Parallax sutil (ronda 23 jul, pase de motion): solo la
                  foto grande responde al scroll; la vela enmarcada
                  encima queda fija — el desfase entre capas da la
                  profundidad del collage. Estático con reduced-motion
                  (useParallax). */}
              <Parallax>
                <img
                  src={spaAromaterapia.fotos.aceites.src}
                  alt={spaAromaterapia.fotos.aceites.alt}
                  width="1600"
                  height="1066"
                  loading="lazy"
                  /* spa_15 es panorámica (16:9) en marco vertical 4:5: el
                     still-life de botellas vive en la mitad inferior, bajo
                     el arco. Encuadre bajo (66%) para conservar el bodegón
                     y la luz de las varillas, no la pared superior vacía. */
                  className="aspect-[4/5] w-full object-cover object-[50%_66%] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:hover:scale-[1.04]"
                />
              </Parallax>
            </RevealItem>
            <RevealItem className="overflow-hidden lg:relative lg:z-10 lg:-mt-28 lg:ml-auto lg:w-[58%] lg:border-[10px] lg:border-marfil">
              <img
                src={spaAromaterapia.fotos.vela.src}
                alt={spaAromaterapia.fotos.vela.alt}
                width="1600"
                height="1244"
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
        </>
      )}

      {/* 6 · Nota de cierre "próximamente" (arena, copy §5.6 / §12, ronda
          15 jun): reemplaza la nota práctica mientras el menú está
          gateado. Voz de marca, sin disculpas; cierra la página y guía
          al concierge. Título pequeño como eyebrow en marino, texto en
          marino/75 (AA sobre arena). Ancho contenido (60ch). NO está
          gateada: es la que da cierre coherente a la página. */}
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
