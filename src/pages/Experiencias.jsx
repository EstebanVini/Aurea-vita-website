import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { useLang, useT } from '../i18n/LanguageContext.jsx';
import Parallax from '../components/Parallax.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal.jsx';
import { drawLine, fadeRise, staggerGroup } from '../lib/motion.js';
import {
  albercaInfinita as albercaInfinitaData,
  atardeceres as atardeceresData,
  descubreAcapulco as descubreAcapulcoData,
  experienciasCta as experienciasCtaData,
  experienciasEditorial as experienciasEditorialData,
  experienciasHeader as experienciasHeaderData,
  experienciasProximamente as experienciasProximamenteData,
} from '../data/experiences.js';

/**
 * Bandera reversible "en construcción" (ronda 15 jun §9.6 / D2). En true
 * oculta los tres bloques temáticos (Alberca infinita, Atardeceres en
 * Cielo, Descubre Acapulco) SIN borrar su JSX ni sus datos. La página
 * NO queda en callejón sin salida (regla §2.2): conserva su hero
 * fotográfico + intro + bloque "próximamente" + banda CTA a /contacto.
 * Reactivar = poner en false.
 */
const SECCIONES_EN_CONSTRUCCION = true;

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
 * Página /experiencias (brief §4.5, ronda 23 jul). Estructura visible:
 * hero interior 70vh (alberca_11) → unidad editorial "vivir el día"
 * (50/50: párrafos literales del cliente + pull-quote "Te sugerimos
 * registrarte…" + CTA "Reservar experiencia" | tipi terraza_04) →
 * "próximamente" → banda CTA (arena) → footer. Gateados mientras
 * tanto: bloque "Alberca infinita" en layout imagen/texto + strip
 * scroll-snap de tres fotos y un apoyo editorial (desayuno junto al
 * agua) sobre marfil/arena → bloque "Atardeceres en Cielo" alternado
 * con link cruzado a /gastronomia → bloque "Descubre Acapulco" sobre
 * marino (el único momento de profundidad de la página, brief §1.4:
 * cuatro cards con foto y texto marfil).
 *
 * En móvil los bloques se apilan SIEMPRE con la foto primero (brief
 * §4.5). Las cards del destino usan aspect-ratio fijo + object-cover
 * para uniformar orientaciones mixtas. Motion 6/10: reveals de una
 * sola vez, solo transform/opacity, reduced-motion seguro.
 */
export default function Experiencias() {
  /* i18n: contenido del idioma activo (src/data/experiences.js) con
     sus nombres históricos — incluidos los bloques gateados, que
     quedan traducidos para cuando revivan; usePageMeta recibe los
     metadatos por idioma. */
  const { lang } = useLang();
  const t = useT();
  const experienciasHeader = experienciasHeaderData[lang];
  const experienciasEditorial = experienciasEditorialData[lang];
  const experienciasProximamente = experienciasProximamenteData[lang];
  const albercaInfinita = albercaInfinitaData[lang];
  const atardeceres = atardeceresData[lang];
  const descubreAcapulco = descubreAcapulcoData[lang];
  const experienciasCta = experienciasCtaData[lang];

  usePageMeta(
    experienciasHeader.metaTitulo,
    experienciasHeader.metaDescripcion,
  );

  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* 1 · Hero interior (60–70vh, brief §4.5): casa_16 — la mesa de
          terraza puesta frente al Pacífico en la hora dorada. La nota
          anterior hablaba de alberca_11 (mosaico cobalto), que ya no es
          esta foto. LCP: sin lazy, eager + fetchPriority alta.
          Ronda ago 2026 (cambios.txt): archivo a 2048px, encuadre a 60%
          y fuera el tinte marino — el detalle, en las notas del <img> y
          del scrim. */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-marino">
        <img
          src={experienciasHeader.hero.src}
          alt={experienciasHeader.hero.alt}
          width="2048"
          height="1365"
          fetchPriority="high"
          /* Hero: casa_16, mesa de terraza frente al Pacífico en la hora
             dorada (docs/Fotos WEB AV.pdf).
             INTRÍNSECAS 2048×1365 (ronda ago 2026, queja «se ven poco
             nítidas»): se servía a 1600px y CSS la reescalaba hacia
             arriba en pantallas grandes. Regenerada a su ancho original;
             el hint sube con ella para conservar el aspect-ratio
             reservado y no introducir CLS.
             ENCUADRE 45% → 60% (misma ronda, queja «se ven muy arriba y
             mal recortadas»). A 45% el recorte partía la mesa por la
             mitad —platos y copas cortados por el borde inferior— y
             empujaba el horizonte al centro exacto del cuadro, que es el
             reparto más plano posible. A 60% la mesa puesta entra
             ENTERA, con las dos sillas de mimbre que la enmarcan, y el
             horizonte sube a su tercio: la foto vuelve a tener primer
             plano, medio y fondo. El piso de barro, riesgo de bajar más,
             se queda en el borde inferior.
             Ken Burns lento (§6.8, ronda 23 jul, pase de motion): mismo
             pulso que el Home — CSS puro (no retrasa el LCP), contenido
             por el overflow-hidden del section, solo motion-safe. El zoom
             1→1.06 cierra el recorte ~3% por lado; comprobado a ambas
             escalas: a 1.06 la mesa sigue completa y el horizonte sigue
             dentro. */
          className="absolute inset-0 h-full w-full object-cover object-[50%_60%] motion-safe:animate-kenburns"
        />
        {/* SCRIM NEUTRO anclado al pie (ronda ago 2026, petición literal
            del cliente: «sin el filtro azul, que las fotos se vean tal
            cual»). Sustituye al degradado marino 40/60/85. Es el hero al
            que más le costaba ese tinte: casa_16 es una hora dorada
            —cielo malva, mar turquesa, barro naranja— y el marino
            #1f3a44, que es azul-verde, la neutralizaba entera; el
            «atardecer» que decía la nota anterior era en realidad el
            overlay. Sin él, el mar vuelve a ser turquesa y el piso, barro.
            Mismas paradas que /habitaciones y /spa — los tres heroes
            hermanos comparten scrim, un solo sistema:
            linear-gradient(to top) 55/52/47/32/14 → TRANSPARENTE al 72%.
            El 28% superior (cielo y línea de horizonte) queda intacto,
            alfa 0.00, y la cobertura media sobre toda la altura cae de
            0.61 (marino) a 0.30 (negro). Meseta, no rampa: con el H1 a
            dos líneas el eyebrow se sitúa en u≈0.33–0.38 desde el pie,
            donde una rampa lineal ya estaría casi apagada.
            De los tres es el que menos alfa pedía —la mesa en penumbra y
            el mimbre ocupan la banda del texto—, pero tampoco aguanta la
            foto pelada: limpia da eyebrow 2.21:1 y H1 1.50:1 (el mantel
            rosa y los platos claros caen bajo el H1 en 1920). Alfa mínima
            de negro para AA: 0.328 (eyebrow) y 0.298 (H1); el scrim
            entrega ~0.50. Se mantienen las paradas comunes en lugar de
            aligerarlas solo aquí: tres páginas hermanas con tres scrims
            distintos es lo que produjo el desajuste de la ronda anterior.
            Método: archivo 2048px, object-cover y object-position reales,
            copy real («Experiencias» / «Maneras de pasar el día»),
            composición en sRGB no lineal, peor teja de 24×24 px, 7
            viewports (390→1920) × Ken Burns (scale 1.0 y 1.06) × 2–3
            líneas de H1. Resultado: eyebrow 6.83:1 (pide 4.5:1, AA OK),
            H1 5.94:1 (texto grande, pide 3:1, AA OK). Peor caso del
            eyebrow: 390×844 con H1 a tres líneas, scale 1.06. */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0_/_0.55)_0%,rgb(0_0_0_/_0.52)_25%,rgb(0_0_0_/_0.47)_45%,rgb(0_0_0_/_0.32)_55%,rgb(0_0_0_/_0.14)_63%,transparent_72%)]"
          aria-hidden="true"
        />
        {/* text-shadow NEGRO (ronda ago 2026, nuevo en este hero). Con el
            marino fuera, el halo tampoco puede ser marino: sería
            devolver por el borde del glifo el tinte que el cliente
            rechaza. Negro a 0.55, 10px de blur, contra los reflejos
            especulares del cristal del barandal y la cubertería. No entra
            en las cifras de contraste de arriba (WCAG mide fondo plano,
            no halos): es margen, no la razón por la que pasan. */}
        <motion.div
          variants={heroSequence}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-16 pt-44 sm:px-8 lg:pb-20 [text-shadow:0_1px_10px_rgb(0_0_0_/_0.55)]"
        >
          <motion.p variants={heroItem} className="eyebrow text-marfil">
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

      {/* 2 · Unidad editorial "vivir el día" (ronda 23 jul, docs/Fotos
          WEB AV.pdf: texto del cliente JUSTO debajo de la imagen;
          recomposición 23 jul). Antes eran DOS secciones: este 50/50 y,
          aparte, la línea "Te sugerimos registrarte…" sola con su línea
          dorada — que se leía huérfana, una frase flotando con media
          pantalla vacía. Ahora es UNA sola unidad editorial (patrón
          "Descubre Aurea Vita" del Home): los dos párrafos del cliente
          abren, la sugerencia de registro remata como pull-quote serif
          con pleca dorada, y el CTA "Reservar experiencia" cierra la
          columna con esa frase como ancla; terraza_04 (el tipi entre
          palmeras) sostiene la columna visual a la derecha. En móvil el
          texto abre la sección (aquí el texto ES el contenido pedido) y
          el tipi la cierra como pausa visual antes del "próximamente". */}
      <section className="bg-marfil py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            {/* La línea dorada que abre la unidad editorial se DIBUJA de
                izquierda a derecha (drawLine, §6.8 — ronda 23 jul, pase
                de motion): el deleite puntual de /experiencias, mismo
                vocabulario que la Suite Aurea y el menú "Marea". Hereda
                el disparo del Reveal por propagación de variants →
                visible desde el primer frame con reduced-motion
                (initial={false} en Reveal). */}
            <motion.div
              variants={drawLine({ duration: 0.9, delay: 0.2 })}
              className="h-px w-12 origin-left bg-dorado"
              aria-hidden="true"
            />
            <div className="mt-9 max-w-[65ch] space-y-5 text-base leading-relaxed text-marino/80 sm:text-lg">
              {experienciasEditorial.cuerpo.map((parrafo) => (
                <p key={parrafo}>{parrafo}</p>
              ))}
            </div>
            {/* Pull-quote serif con pleca dorada (mismo vocabulario que
                la nota de /spa, allí en salvia): el texto literal del
                cliente que antes vivía solo en su propia sección. El
                salto de escala serif + la pleca lo marcan como remate,
                y de paso ancla el botón que viene debajo. */}
            <p className="mt-10 max-w-[38ch] border-l-2 border-dorado pl-6 font-display text-2xl font-light leading-snug text-balance text-marino sm:pl-8 sm:text-3xl">
              {experienciasEditorial.remate}
            </p>
            {/* CTA al calendario de citas (hoy /contacto; ver nota en
                data/experiences.js). */}
            <Link
              to={experienciasEditorial.to}
              className="eyebrow mt-10 inline-flex min-h-[48px] items-center bg-dorado px-8 text-marino transition-[background-color,transform] duration-300 hover:bg-dorado/85 motion-safe:active:scale-[0.99]"
            >
              {experienciasEditorial.boton}
            </Link>
          </Reveal>
          <Reveal delay={0.12} className="overflow-hidden">
            {/* Parallax sutil (ronda 23 jul, pase de motion): el tipi
                responde al scroll ±4% dentro del marco recortado del
                Reveal — el wrapper lleva el parallax y el img conserva
                su zoom de hover CSS sin conflicto de transforms.
                Estático con reduced-motion (useParallax). */}
            <Parallax>
              <img
                src={experienciasEditorial.foto.src}
                alt={experienciasEditorial.foto.alt}
                width="1452"
                height="1364"
                loading="lazy"
                /* Restitución docs/Fotos WEB AV.pdf: casa_07, 1452×1364
                   (1.065) — la única casi cuadrada de la entrega, así que
                   las intrínsecas se apartan del 1600×1066 del resto y el
                   recorte 4:5 vuelve a ser suave: cede ~15% del ancho,
                   frente al ~47% que perdía terraza_04 (3:2). Ahora el
                   tipi entra completo CON las palmeras que lo flanquean,
                   que es justo lo que la nota anterior daba por perdido.
                   Sin object-position: el curador pide centro y el centro
                   es el valor por defecto — no hace falta clase. */
                className="aspect-[4/5] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:hover:scale-[1.04]"
              />
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* 2bis · Mensaje "próximamente" (marfil, copy §6.1bis, ronda 15
          jun §9.6): bloque visible entre la unidad editorial y la banda
          CTA mientras los bloques temáticos están gateados. Voz de
          marca, sereno; máx ~60ch. NO está gateado: garantiza que la
          entrada "Experiencias" del menú no lleve a una página vacía.
          Recomposición 23 jul: la sección suelta de la intro desapareció
          (su texto remata ahora la unidad editorial de arriba), así que
          este bloque sigue a la unidad editorial directamente. Comparten
          fondo marfil: se conserva el pt reducido (10/14) para que el
          marfil se lea continuo — del tipi al "próximamente" sin hueco
          de cabeceras sueltas — y la banda CTA (arena) siga siendo el
          verdadero cambio de ritmo. */}
      <section className="bg-marfil pb-20 pt-10 lg:pb-28 lg:pt-14">
        <Reveal className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading
            eyebrow={experienciasProximamente.eyebrow}
            title={experienciasProximamente.titulo}
          >
            <p>{experienciasProximamente.texto}</p>
          </SectionHeading>
        </Reveal>
      </section>

      {!SECCIONES_EN_CONSTRUCCION && (
        <>
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
              width="1600"
              height="1066"
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
          aria-label={t.experiencias.albercaStripAria}
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
                    /* Sin width/height: este slot recorre un set de
                       alturas MIXTAS (alberca_08/07/01 son 1600×1066 pero
                       restaurante_21 es 1600×1132), así que cualquier par
                       fijo sería falso para alguna foto. El
                       `aspect-[4/3]` del propio img ya reserva el espacio,
                       de modo que no hay CLS que cubrir. Si algún día se
                       necesitan, van en los datos, no aquí. */
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
                width="1600"
                height="1066"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:hover:scale-[1.04]"
              />
            </RevealItem>
            <RevealItem className="overflow-hidden lg:relative lg:z-10 lg:-mt-24 lg:ml-auto lg:w-[58%] lg:border-[10px] lg:border-arena">
              <img
                src={atardeceres.fotos.nocturna.src}
                alt={atardeceres.fotos.nocturna.alt}
                width="1600"
                height="1066"
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
                    /* Sin width/height: las cuatro cards tienen alturas
                       distintas (terraza_08 es 1600×1080, las otras tres
                       1600×1066) y el aspect-ratio fijo del contenedor ya
                       reserva el espacio. Ver nota del strip de arriba. */
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
        </>
      )}

      {/* 6 · Banda CTA de cierre (copy §6.5): arena — exhalación final;
          ningún recorrido termina en callejón sin salida (brief §2.2).
          NO está gateada: cierra siempre la página hacia /contacto. */}
      <section className="bg-arena py-24 lg:py-36">
        <RevealGroup
          stagger={0.12}
          className="mx-auto flex max-w-[1400px] flex-col items-center px-5 sm:px-8"
        >
          <RevealItem>
            <SectionHeading
              align="center"
              eyebrow={t.reservaciones}
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
