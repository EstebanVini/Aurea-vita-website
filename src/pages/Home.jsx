import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta.js';
import BookingBar from '../components/BookingBar.jsx';
import FeatureCard from '../components/FeatureCard.jsx';
import Parallax from '../components/Parallax.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import VideoBucle from '../components/VideoBucle.jsx';
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal.jsx';
import { EASE_OUT, fadeRise, staggerGroup } from '../lib/motion.js';
import {
  bienvenida,
  ctaFinal,
  destino,
  destinoStats,
  heroHome,
  homeCards,
} from '../data/home.js';

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

/**
 * Cifra de "El destino" con count-up sutil (ronda 23 jul, pase de
 * motion, brief §6.8 — deleite puntual): el número sube de 0 a su
 * valor UNA sola vez cuando entra al viewport (~1.2s, EASE_OUT), con
 * animate() de framer — sin dependencias nuevas. El sufijo no
 * numérico ('°') se pinta estático desde el primer frame.
 *
 * - prefers-reduced-motion: se renderiza el valor final directo, el
 *   efecto nunca corre.
 * - Accesibilidad: el lector de pantalla recibe SIEMPRE el valor
 *   final (sr-only); la cifra animada va aria-hidden para que ningún
 *   estado intermedio se anuncie.
 * - StrictMode-safe: el cleanup detiene la animación del primer
 *   montaje; useInView({ once }) rearma el segundo sin duplicar.
 */
function StatValue({ valor }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [mostrado, setMostrado] = useState(0);

  /* '300' → 300 + '' · '27°' → 27 + '°'. Si algún dato futuro no
     abriera con cifra, se pinta tal cual, sin efecto. */
  const partes = /^(\d+)(.*)$/.exec(valor);
  const objetivo = partes ? Number(partes[1]) : null;
  const sufijo = partes ? partes[2] : '';

  useEffect(() => {
    if (objetivo === null || reduceMotion || !inView) return undefined;
    const controls = animate(0, objetivo, {
      duration: 1.2,
      ease: EASE_OUT,
      onUpdate: (v) => setMostrado(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, objetivo, reduceMotion]);

  if (objetivo === null) return valor;

  return (
    <span ref={ref}>
      <span className="sr-only">{valor}</span>
      <span aria-hidden="true">
        {reduceMotion ? objetivo : mostrado}
        {sufijo}
      </span>
    </span>
  );
}

/* Secuencia de carga del hero (brief §6.1): H1 → subtítulo, con
   stagger de ~120ms; la BookingBar cierra la secuencia. Variants
   compartidos de src/lib/motion.
   Ronda 15 jun (§9.3): el eyebrow superior se eliminó. Ronda 28 jul:
   el indicador de scroll (línea dorada en loop) se quitó a pedido del
   cliente, así que la secuencia quedó en dos hijos, a 0.10s / 0.22s
   (delayChildren 0.1 + stagger 0.12). La BookingBar baja su delay de
   0.46s a 0.34s para seguir al subtítulo a un paso de stagger
   (0.22 + 0.12) y no heredar el hueco del indicador. Total ~1.04s y
   la entrada se sigue leyendo como una sola exhalación. */
const heroSequence = staggerGroup({ stagger: 0.12, delayChildren: 0.1 });
const heroItem = fadeRise({ y: 18, duration: 0.7 });
const bookingBarEntrance = fadeRise({ y: 16, duration: 0.7, delay: 0.34 });

/**
 * Página de inicio (brief §3 y §4.1, ronda 15 jun §9.3). Estructura en
 * secciones planas: hero → BookingBar → bienvenida → grid de 3 →
 * destino (marino) → banda CTA final. La sección "Momentos" (strip
 * scroll-snap) se eliminó en la ronda 15 jun (§9.3).
 *
 * Motion (§6): reveals de una sola vez con <Reveal>/<RevealGroup>;
 * con prefers-reduced-motion todo el contenido se renderiza visible
 * sin animación (initial={false} en las primitivas y en este archivo).
 */
export default function Home() {
  usePageMeta(
    'Aurea Vita · Santuario frente al Pacífico — Acapulco',
    'Hotel de lujo sereno en la bahía de Acapulco: habitaciones frente al mar, cocina del Pacífico, spa y atardeceres en terraza. Consulta disponibilidad.',
  );

  const reduceMotion = useReducedMotion();

  /* Referencia estable para el parallax de la foto sticky de "El
     destino" (ronda 23 jul, pase de motion): la foto se "pina" con
     lg:sticky y su propio rect no sirve para medir el progreso de
     scroll — se mide la sección completa, que fluye normal. */
  const destinoRef = useRef(null);

  /* Preload del LCP del hero acotado a esta ruta: antes vivía en
     index.html y se descargaba en todas las páginas. Se inyecta al
     montar y se retira al desmontar para no afectar a las rutas
     interiores (brief §3.3: head-start del LCP solo donde es el LCP).
     Ronda fotos jul 2026: el LCP depende del modo — poster del video en
     motion, aereas_11 con reduced-motion (el hero de video ni se
     monta). QA video hero (P3): useReducedMotion de framer-motion 12 NO
     se actualiza en vivo (useState con el valor inicial de la media
     query; hay un TODO al respecto en su fuente), así que la
     dependencia es formalmente correcta pero inerte dentro de un
     montaje: si la preferencia cambia con la página abierta, el link no
     se reinyecta hasta el siguiente montaje — igual que el resto de
     ramas reduceMotion del árbol. */
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = reduceMotion
      ? '/fotos_hotel/aereas/aereas_11.jpeg'
      : '/videos/hero_poster.jpeg';
    link.setAttribute('fetchpriority', 'high');
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [reduceMotion]);

  return (
    <>
      {/* 1 · Hero fullscreen (brief §3). Ronda fotos jul 2026: el fondo
          es video (2 clips del cliente en bucle secuencial, VideoBucle
          en modo prioridad); el poster del clip 1 es el LCP: sin lazy.
          El bloque de texto sigue anclado al tercio superior: ahí los
          clips tienen cielo despejado, ideal para el marfil (brief
          §3.1). overflow-hidden contiene el fondo, como contenía el Ken
          Burns (§6.8). */}
      <section className="relative flex min-h-[100dvh] flex-col justify-start overflow-hidden bg-marino pt-[max(20vh,9rem)]">
        {/* Con prefers-reduced-motion NO se reproduce video (brief §6):
            queda la foto aérea estática de siempre — su Ken Burns ya era
            motion-safe, así que aquí nunca corre. En modo motion,
            VideoBucle pinta el poster de inmediato y funde el video
            encima cuando de verdad reproduce. */}
        {reduceMotion ? (
          <img
            src="/fotos_hotel/aereas/aereas_11.jpeg"
            alt="Costa turquesa y cielo despejado del Pacífico desde el aire"
            width="867"
            height="650"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[28%_50%] motion-safe:animate-kenburns md:object-center"
          />
        ) : (
          <VideoBucle prioridad />
        )}
        {/* QA video hero (P1, jul 2026 — WCAG 1.4.3): la zona del texto
            en el poster y el clip 01 es cielo claro casi uniforme (luma
            media 198–205), mucho más claro que el agua de aereas_11
            para la que se calibraron estos scrims. Medido con la
            composición exacta de ambos gradientes: subtítulo desktop
            2.6–3.3:1 (AA pide 4.5:1), H1 móvil 1.8–2.4:1 (pide 3:1),
            subtítulo móvil 1.7–2.2:1. En modo video el scrim vertical
            refuerza su tramo superior (45→60 el ancla, 20→40 el via);
            la foto de reduced-motion conserva los valores originales,
            con los que ya medía ~5.4:1. Cierre del residual (re-QA):
            con via/35 el subtítulo quedaba en 4.1:1 sobre el frame
            claro sostenido del clip 01 — via/40 + subtítulo en marfil
            sólido (antes /90, abajo) lo suben por encima de 4.5:1. */}
        <div
          className={`absolute inset-0 ${
            reduceMotion
              ? 'bg-linear-to-b from-marino/45 via-marino/20 to-marino/35'
              : 'bg-linear-to-b from-marino/60 via-marino/40 to-marino/35'
          }`}
          aria-hidden="true"
        />
        {/* Scrim lateral solo bajo el bloque de texto (brief §1.1: overlay
            "solo donde hay texto encima"): la zona centro-izquierda de
            aereas_11 es agua turquesa clara y el marfil no alcanzaba AA.
            Combinado con el degradado vertical, el texto queda sobre
            ~60% de marino efectivo; la mitad derecha de la foto sigue
            limpia. QA 15 jun (P1): la franja del texto promedia oscura
            (~6:1) PERO contiene glints de sol/espuma puntuales (~1% del
            área) donde el overlay solo da ~2–3:1 → falla AA local. Se
            refuerza el ancla izquierda del scrim (45→60) para subir el
            piso de marino bajo la columna; el text-shadow del copy
            (abajo) cubre los glints residuales sin oscurecer la foto. */}
        <div
          className="absolute inset-0 bg-linear-to-r from-marino/60 via-marino/30 to-transparent"
          aria-hidden="true"
        />
        {/* QA video hero (P1, jul 2026): en móvil el bloque de texto
            ocupa todo el ancho y el scrim lateral se agota antes de
            cubrirlo, así que el H1 cruzaba el cielo claro del clip casi
            sin refuerzo (1.8–2.4:1, ver medición arriba). Scrim
            superior dedicado, solo < md y solo en modo video: marino/65
            → transparente hasta ~55dvh — la franja que ocupa el texto
            con pt-[max(20vh,9rem)]. La mitad inferior del clip queda
            limpia (brief §1.1: overlay solo donde hay texto encima). */}
        {!reduceMotion && (
          <div
            className="absolute inset-x-0 top-0 h-[55dvh] bg-linear-to-b from-marino/65 to-transparent md:hidden"
            aria-hidden="true"
          />
        )}
        <motion.div
          variants={heroSequence}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 sm:px-8"
        >
          {/* Eyebrow "Aurea Vita · Acapulco" eliminado en la ronda 15 jun
              (§9.3): el H1 abre la secuencia. */}
          {/* text-shadow marino (QA 15 jun, P1): garantía AA del marfil
              sobre los glints de sol/espuma puntuales de aereas_11, que el
              overlay no puede cubrir sin oscurecer toda la foto. El halo
              marino sostiene el contraste en el borde de cada glifo aun
              sobre el pixel más claro, conservando "la foto manda" en la
              mitad derecha limpia (brief §1.1). */}
          <motion.h1
            variants={heroItem}
            className="max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] text-marfil [text-shadow:0_1px_18px_rgb(31_58_68_/_0.55)]"
          >
            {heroHome.titulo}
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="mt-6 max-w-2xl text-lg text-marfil [text-shadow:0_1px_12px_rgb(31_58_68_/_0.7)]"
          >
            {heroHome.subtitulo}
          </motion.p>
        </motion.div>
      </section>

      {/* 2 · BookingBar mordiendo el borde foto→marfil (brief §5.2).
          Entra al final de la secuencia del hero (§6.1). Ronda 15 jun
          (§9.3): se redujo el solape negativo (antes -mt-7/-mt-11, que
          recortaba la barra) a -mt-3/-mt-5 — sigue "mordiendo" la
          transición sin cortar las 4 zonas, que ahora se leen completas. */}
      <motion.div
        variants={bookingBarEntrance}
        initial={reduceMotion ? false : 'hidden'}
        animate="visible"
        className="relative z-20 mx-auto -mt-3 w-full max-w-5xl px-5 sm:px-8 md:-mt-5"
      >
        <BookingBar />
      </motion.div>

      {/* 3 · Editorial "Descubre Aurea Vita" (marfil, 50/50). Ronda 15
          jun (§9.3): sin eyebrow "El hotel"; título y cuerpo nuevos
          (centralizados en home.js). SectionHeading sin prop eyebrow:
          el patrón degrada a título + línea + cuerpo. */}
      <section className="bg-marfil py-20 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading title={bienvenida.titulo}>
              {bienvenida.cuerpo.map((parrafo) => (
                <p key={parrafo}>{parrafo}</p>
              ))}
            </SectionHeading>
            <Link
              to="/habitaciones"
              /* hover a marino/70 (4.5:1 sobre marfil), no a dorado
                 (1.86:1 — falla AA); la flecha completa el feedback */
              className="eyebrow group mt-9 inline-flex min-h-[44px] items-center gap-2.5 text-marino transition-colors duration-300 hover:text-marino/70"
            >
              Conoce nuestras habitaciones
              <ArrowIcon />
            </Link>
          </Reveal>
          <Reveal delay={0.12} className="overflow-hidden">
            {/* Parallax sutil (ronda 23 jul, pase de motion): la foto
                responde al scroll ±4% dentro del marco recortado del
                Reveal — la sección deja de sentirse plana sin tocar el
                layout. Estático con reduced-motion (useParallax). */}
            <Parallax>
              <img
                src={bienvenida.foto.src}
                alt={bienvenida.foto.alt}
                width="1920"
                height="1440"
                loading="lazy"
                /* Dron Casa 21 (ronda 23 jul): el recorte 4:5 centra la
                   alberca y la terraza; el encuadre bajo (62%) conserva el
                   espejo de agua y los camastros, no el cielo. */
                className="aspect-[4/5] w-full object-cover object-[50%_62%]"
              />
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* 4 · Grid de 3 tarjetas: Habitaciones / Gastronomía / Spa (arena).
          Stagger de ~100ms entre cards (brief §6.3). */}
      <section className="bg-arena py-20 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <h2 className="sr-only">Habitaciones, gastronomía y spa</h2>
          <RevealGroup
            stagger={0.1}
            className="grid gap-12 md:grid-cols-3 md:gap-8"
          >
            {homeCards.map((card) => (
              <RevealItem key={card.to}>
                <FeatureCard {...card} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 5 · Contraste "El destino — Acapulco" (marino, brief §4.1,
          ronda 15 jun §9.3). El texto revela en bloque (§6: no animar
          texto en lectura). Título y cuerpo nuevos; los datos
          300/27°/12 min se conservan (D3).

          Arreglo de encuadre (cliente: "se corta el eyebrow arriba o no
          se ve el texto abajo"): el cuerpo creció a dos párrafos + stats
          + CTA, así que la columna de texto es más alta que la foto. Se
          cambió `items-center`+`items-stretch` (que estiraba la foto
          dejando el texto descuadrado) por `lg:items-start` con
          `lg:sticky`: la foto se alinea arriba con el eyebrow y se queda
          fija mientras el texto largo fluye a su lado — toda la sección
          queda visible, sin recortes. La foto usa aspect-[4/5] (más
          vertical) para sostener la columna sin estirarse. */}
      <section ref={destinoRef} className="bg-marino py-20 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-20">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow={destino.eyebrow}
              title={destino.titulo}
            >
              {destino.cuerpo.map((parrafo) => (
                <p key={parrafo}>{parrafo}</p>
              ))}
            </SectionHeading>
            {/* Datos en serif gigante (brief §1: "como SHA") con línea
                fina de 1px al margen — detalle editorial deliberado (D3).
                Ronda 23 jul (pase de motion): cada cifra hace count-up
                sutil al entrar al viewport, una sola vez (StatValue);
                con reduced-motion se pinta el valor final directo. */}
            <dl className="mt-12 grid grid-cols-3 gap-5 sm:gap-8">
              {destinoStats.map((stat) => (
                <div
                  key={stat.detalle}
                  className="flex flex-col-reverse border-l border-marfil/20 pl-4 sm:pl-6"
                >
                  <dt className="mt-2.5 text-sm leading-snug text-marfil/70">
                    {stat.detalle}
                  </dt>
                  <dd className="font-display text-4xl font-light leading-[1.05] text-marfil sm:text-6xl">
                    <StatValue valor={stat.valor} />
                  </dd>
                </div>
              ))}
            </dl>
            <Link
              to="/experiencias"
              className="eyebrow group mt-12 inline-flex min-h-[44px] items-center gap-2.5 text-marfil transition-colors duration-300 hover:text-dorado"
            >
              Explora las experiencias
              <ArrowIcon />
            </Link>
          </Reveal>
          {/* QA 15 jun (P1): la foto sticky (top-32 = 8rem) con aspect-4/5
              a 1280px mide ~676px de alto; en viewports cortos (≤800px)
              su base quedaba recortada bajo el pliegue mientras está
              pinada y nunca se veía completa. Se acota su alto a
              calc(100dvh-9rem) (la holgura bajo top-32) con object-cover:
              la foto siempre cabe entera en pantalla, sin recortes, y la
              columna de texto larga sigue fluyendo a su lado. */}
          <Reveal
            delay={0.12}
            className="overflow-hidden lg:sticky lg:top-32 lg:max-h-[calc(100dvh-9rem)]"
          >
            {/* Parallax sutil (ronda 23 jul, pase de motion). Caso
                especial: este marco es lg:sticky, así que su propio rect
                no sirve de referencia estable — se mide el <section>
                (destinoRef), que nunca se "pina". Mientras la foto está
                fija, la imagen deriva apenas dentro del marco: sigue
                viva sin pelearse con el sticky. Estático con
                reduced-motion. */}
            <Parallax target={destinoRef}>
              <img
                src={destino.foto.src}
                alt={destino.foto.alt}
                width="1920"
                height="1396"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover lg:aspect-auto lg:h-[calc(100dvh-9rem)] lg:max-h-[34rem]"
              />
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* Sección "Momentos — El agua, a su propio ritmo" (strip
          scroll-snap de alberca/terraza) ELIMINADA en la ronda 15 jun
          (§9.3): JSX retirado de Home y `momentosFotos` de home.js. */}

      {/* 6 · Banda CTA final de reserva. Ronda 28 jul (pedido del
          cliente): en modo motion el fondo son los MISMOS dos clips del
          hero en bucle secuencial (VideoBucle, modo lazy: nada descarga
          hasta que la banda entra al viewport — y aun entonces sale del
          caché del hero). La banda conserva su alto de siempre (py-28 /
          lg:py-40): los clips se recortan con object-cover y no importa
          (acordado con el cliente). aereas_09 queda como poster del
          video y como fondo estático con prefers-reduced-motion (brief
          §6) — ese camino sustituye al deleite de scale 1.08 → 1.0 que
          traía la foto (§6.8): el movimiento ahora lo pone el video.
          Ronda 15 jun (§9.3): texto de apoyo centralizado en home.js;
          el botón ya está a la escala G2 (min-h-[48px] px-8). */}
      <section className="relative overflow-hidden bg-marino">
        {reduceMotion ? (
          <img
            src={ctaFinal.foto.src}
            alt={ctaFinal.foto.alt}
            width="940"
            height="529"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <VideoBucle
            poster={{
              src: ctaFinal.foto.src,
              alt: ctaFinal.foto.alt,
              width: 940,
              height: 529,
            }}
            etiquetaBoton="video de fondo de la banda de reserva"
          />
        )}
        {/* QA 15 jun (P1): aereas_09 tiene un cielo amplio muy claro
            (no un glint puntual); el texto centrado lo cruza. El flat
            marino/60 dejaba el cuerpo (marfil/85) en 3.14:1 y el eyebrow
            dorado en 1.84:1 sobre el cielo → falla AA. Se sube el overlay
            a /72 (sube el piso del cuerpo) y el text-shadow del bloque
            (abajo) garantiza el borde de los glifos del eyebrow dorado,
            que sobre cualquier fondo claro no alcanza 4.5:1 por sí solo
            (regla dura: dorado como texto solo sobre marino). /78 deja el
            cuerpo (marfil/85) en ~4.6:1 incluso sobre el pixel de cielo
            más claro; el eyebrow dorado, que ningún overlay lleva a 4.5:1
            sobre claro, se apoya en el halo marino del text-shadow.
            Ronda 28 jul: el overlay pasa a cubrir también los clips de
            video — que comparten el problema (el QA del hero midió luma
            198–205 en el cielo del clip 01) — así que /78 sigue siendo
            el piso correcto con fondo en movimiento. */}
        <div className="absolute inset-0 bg-marino/78" aria-hidden="true" />
        <RevealGroup
          stagger={0.12}
          className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center px-5 py-28 text-center sm:px-8 lg:py-40 [text-shadow:0_1px_14px_rgb(31_58_68_/_0.85)]"
        >
          <RevealItem>
            <SectionHeading
              align="center"
              tone="dark"
              eyebrow={ctaFinal.eyebrow}
              title={ctaFinal.titulo}
            >
              <p>{ctaFinal.texto}</p>
            </SectionHeading>
          </RevealItem>
          <RevealItem>
            <Link
              to="/contacto"
              /* Sobre foto+overlay marino el anillo global (currentColor=
                 marino) es invisible; se fuerza marfil para el foco visible. */
              className="eyebrow mt-11 inline-flex min-h-[48px] items-center bg-dorado px-8 text-marino transition-colors duration-300 hover:bg-dorado/85 focus-visible:outline-marfil"
            >
              {ctaFinal.boton}
            </Link>
          </RevealItem>
        </RevealGroup>
      </section>
    </>
  );
}
