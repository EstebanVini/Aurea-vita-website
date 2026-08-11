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
     Ronda fotos jul 2026: el LCP dependía del modo — poster del video en
     motion, aereas_11 con reduced-motion.
     Ronda "entrada" (ago 2026): el set demo fotos_hotel/ desapareció del
     disco (aereas_11 era un 404 en la rama reduced-motion) y los dos
     modos convergieron en la MISMA imagen: entrada_poster.jpeg, el
     primer frame de entrada.mp4. Así que el LCP ya no depende del modo y
     el efecto no necesita depender de reduceMotion — un solo <link> para
     ambos caminos, y la foto estática de reduced-motion coincide al
     pixel con el primer frame del video (mismo 1920×1080, mismo
     object-cover/object-center). Nota que sigue vigente para las ramas
     reduceMotion del render: useReducedMotion de framer-motion 12 NO se
     actualiza en vivo (useState con el valor inicial de la media query;
     hay un TODO al respecto en su fuente), así que un cambio de
     preferencia con la página abierta no se refleja hasta el siguiente
     montaje. */
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = '/videos/entrada_poster.jpeg';
    link.setAttribute('fetchpriority', 'high');
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      {/* 1 · Hero fullscreen (brief §3). Ronda fotos jul 2026: el fondo
          es video (VideoBucle en modo prioridad) y el poster del primer
          frame es el LCP: sin lazy.
          Ronda "entrada" (ago 2026, pedido del cliente): «utilizar CLIP 9
          como la entrada». CLIP 9 es la toma de dron que se aproxima al
          ACCESO PRINCIPAL del hotel — literalmente la entrada — así que
          el hero pasa a UN SOLO clip (entrada.mp4) en bucle simple, en
          vez de la secuencia de dos. El máster 4K pesaba 91.8 MB, así que
          se sirve transcodificado: 1920×1080 / 3.5 MB en escritorio y
          960×540 / 1.05 MB en < md, ambos sin pista de audio y con
          faststart (el moov al principio: el navegador puede empezar a
          reproducir sin bajar el archivo entero).
          El bloque de texto sigue anclado al tercio superior — ahí el
          clip tiene cielo y la fachada blanca, que es justo la zona más
          clara del frame; ver el bloque SIN SCRIMS más abajo, que
          documenta el compromiso de contraste que eso implica desde que
          el cliente pidió el video limpio (brief §3.1). overflow-hidden
          contiene el fondo, como contenía el Ken Burns (§6.8).
          `bg-marino` de la sección NO es un filtro: es el color de
          respaldo que se ve mientras el poster aún no pinta, y queda
          DEBAJO del video, nunca encima. */}
      <section className="relative flex min-h-[100dvh] flex-col justify-start overflow-hidden bg-marino pt-[max(20vh,9rem)]">
        {/* Con prefers-reduced-motion NO se reproduce video (brief §6).
            Ronda "entrada": la foto estática de esta rama es ahora el
            primer frame del propio clip (entrada_poster.jpeg, 1920×1080)
            en vez de aereas_11 — que además había desaparecido del disco
            con el set demo fotos_hotel/ y daba 404. Ventaja doble: los
            dos modos muestran EXACTAMENTE la misma escena y el mismo
            encuadre (object-cover + object-center, igual que el <video>
            de VideoBucle) y el <link rel="preload"> de arriba es el
            mismo en los dos caminos. Desde la ronda "sin filtro" esa
            equivalencia importa más todavía: NINGUNO de los dos modos
            lleva capa encima, así que la foto estática y el video se ven
            idénticos — que es exactamente lo que pidió el cliente.
            Se retira el `motion-safe:animate-kenburns` que arrastraba
            aereas_11: en esta rama nunca podía correr (motion-safe y
            reduceMotion son excluyentes) salvo si la preferencia cambiaba
            en caliente — y ahí habría desalineado el encuadre respecto
            del video. Estático y punto. */}
        {reduceMotion ? (
          <img
            src="/videos/entrada_poster.jpeg"
            alt="Acceso principal de Aurea Vita visto desde el aire, entre palmeras y con la iluminación cálida encendida al atardecer"
            width="1920"
            height="1080"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : (
          <VideoBucle
            prioridad
            clips={{
              escritorio: ['/videos/entrada.mp4'],
              movil: ['/videos/entrada_movil.mp4'],
            }}
            poster={{
              src: '/videos/entrada_poster.jpeg',
              alt: 'Acceso principal de Aurea Vita visto desde el aire, entre palmeras y con la iluminación cálida encendida al atardecer',
              width: 1920,
              height: 1080,
            }}
          />
        )}
        {/* ── HERO SIN SCRIMS (ronda "sin filtro", ago 2026) ───────────
            AQUÍ NO VA NINGUNA CAPA. Si alguien está por añadir un <div
            absolute inset-0> con un degradado encima del video, lea esto
            antes: se quitó a propósito y por pedido expreso del cliente.

            HISTORIA. El hero llevaba tres scrims apilados sobre el clip:
            un degradado vertical, uno lateral y uno superior solo < md.
            En la ronda anterior el cliente pidió «quitar el filtro azul
            verdoso» y esas tres capas pasaron de `marino` (#1f3a44, que
            es literalmente un azul-verde oscuro) a negro puro, con las
            opacidades rebajadas (60→45, 40→35, 35→25 el vertical; 60→45,
            30→25 el lateral; 65→50 el de móvil). No bastó: en esta ronda
            el pedido es «quita el filtro del video del inicio, quiero que
            se vea tal cuál está el video». Es la SEGUNDA vez que lo pide
            y ya conoce el resultado de la primera, así que se va hasta el
            final: el video se ve con su luminancia y sus colores reales,
            sin nada encima. Lo mismo en la rama prefers-reduced-motion
            (entrada_poster.jpeg es el primer frame de este mismo clip):
            los dos modos deben verse idénticos.

            LO QUE SOSTIENE LA LEGIBILIDAD es ahora SOLO el text-shadow
            del copy (ver el bloque del H1 abajo), que es el único recurso
            que no toca un pixel de la imagen: vive pegado al contorno de
            cada glifo, no es un rectángulo sobre el video.

            ─── COMPROMISO DE ACCESIBILIDAD ASUMIDO ───────────────────
            Esto tiene un costo medido y hay que decirlo sin adornos: el
            hero YA NO CUMPLE WCAG 1.4.3 (AA). No es un descuido, es una
            decisión del cliente, tomada con el número delante.

            Medición (ago 2026, misma metodología que la calibración
            anterior, ahora con la geometría REAL): rects de línea del H1
            y del subtítulo medidos en Chrome headless con Cormorant
            Garamond / Jost cargadas, 19 frames de entrada.mp4 y
            entrada_movil.mp4 (uno cada 0.5s), recortados con el mismo
            object-cover/object-center que aplica el navegador, luminancia
            relativa WCAG contra el marfil #f5f1ec (L = 0.884) y peor teja
            de 24×24 px CSS (≈ el fondo local de un glifo), sobre 14
            viewports × 19 frames.

              SIN SCRIM (lo que hay hoy)   H1 pide 3:1 · subtítulo 4.5:1
                H1         1.14:1  peor caso @1920×1080   → NO CUMPLE
                subtítulo  1.96:1  peor caso @1920×1080   → NO CUMPLE
              Rango por viewport: H1 entre 1.14:1 y 1.20:1; subtítulo
              entre 1.96:1 y 2.95:1 (el mejor caso es móvil, 360–430px).
              Y no es un instante desafortunado del bucle: a 1440×900 el
              H1 va de 1.16:1 a 1.96:1 a lo largo de los 9.6s y el
              subtítulo se queda plano en ~2.2:1. En NINGÚN frame, en
              NINGÚN viewport, el H1 llega a 3:1 ni el subtítulo a 4.5:1.

              CON LOS SCRIMS ANTERIORES (referencia, para dimensionar lo
              que se cedió): H1 5.21:1 @900×1200 y subtítulo 7.05:1
              @768×1024 en el peor caso — ambos cumplían con holgura.

            La causa es el encuadre, no el códec: el bloque de texto está
            anclado al tercio superior y ahí el clip tiene el CIELO y la
            FACHADA BLANCA del hotel, cuya luminancia es casi la del
            marfil del copy (de ahí ratios de ~1.1:1, prácticamente marfil
            sobre blanco en los frames más cerrados del acercamiento).

            El text-shadow NO entra en el cálculo formal de WCAG —la
            norma mide color de texto contra color de fondo y no reconoce
            halos—, así que sostiene la legibilidad percibida pero no
            recupera el ratio. Las salidas que SÍ cumplirían sin volver a
            poner una capa sobre el video serían cambiar el encuadre del
            texto (bajarlo al césped) o mover el copy fuera del video; las
            dos alteran el diseño aprobado y ninguna se hizo aquí.
            Si en el futuro el cliente cambia de opinión, lo que había era
            el trío negro/45–35/25 vertical + negro/45–25/transparent
            lateral + negro/50 superior h-[60dvh] md:hidden. ─────────── */}
        <motion.div
          variants={heroSequence}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 sm:px-8"
        >
          {/* Eyebrow "Aurea Vita · Acapulco" eliminado en la ronda 15 jun
              (§9.3): el H1 abre la secuencia. */}
          {/* text-shadow — ÚNICO soporte de legibilidad del hero desde
              que se retiraron los scrims (ver el bloque de arriba). Pasa
              de ser un remate para reflejos puntuales a ser la estructura
              entera, así que se rehace como halo APILADO, que es la
              técnica estándar para texto sobre foto:
                1) sombra corta y densa (1–2px): reconstruye el borde del
                   glifo contra el fondo claro. Es la que hace el trabajo
                   real de separación, sobre todo en la Cormorant Light
                   del H1, cuyas astas finas se disuelven sobre el muro
                   blanco sin un contorno que las sostenga.
                2) sombra media (9–14px): rellena el hueco entre el borde
                   y el halo, para que no se lea como un stroke duro.
                3) halo amplio y suave (24–38px, α ≤ 0.55): apoya la
                   silueta completa. Amplio a propósito y de opacidad
                   moderada: más alfa aquí empezaría a leerse como una
                   mancha rectangular alrededor del bloque — es decir,
                   como el scrim que el cliente pidió quitar.
              Todo en NEGRO PURO, nunca marino: un halo marino es
              exactamente el tinte azul-verde que el cliente sacó del
              video (fue el pedido de la ronda anterior), y a igual alfa
              el negro rinde más porque no aporta luminancia propia
              (marino L = 0.038, negro L = 0).
              El H1 lleva radios mayores porque su cuerpo va de 40 a 80px;
              el subtítulo, de 18px, los lleva más cerrados y algo más
              densos: a ese tamaño un halo ancho emborrona la contraforma
              de la letra en vez de despegarla del fondo.
              Recordatorio: esto NO cuenta para WCAG (la norma compara
              texto contra fondo, no reconoce halos). Los ratios formales
              siguen siendo los del bloque de arriba. */}
          <motion.h1
            variants={heroItem}
            className="max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] text-marfil [text-shadow:0_1px_2px_rgb(0_0_0_/_0.85),0_2px_14px_rgb(0_0_0_/_0.65),0_0_38px_rgb(0_0_0_/_0.5)]"
          >
            {heroHome.titulo}
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="mt-6 max-w-2xl text-lg text-marfil [text-shadow:0_1px_2px_rgb(0_0_0_/_0.9),0_1px_9px_rgb(0_0_0_/_0.75),0_0_24px_rgb(0_0_0_/_0.55)]"
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
                width="1600"
                height="1200"
                loading="lazy"
                /* Restitución docs/Fotos WEB AV.pdf: la foto vuelve a ser
                   la aérea que pedía el cliente («Dron Casa 21» =
                   dron_21), así que el encuadre deja de ser heredado.
                   Intrínsecas 1600×1200 (4:3), NO 1600×1066 como el resto
                   del set: la aérea es la excepción y el hint debe decir
                   la verdad.
                   Encuadre ALTO (35%, antes 62%): el recorte 4:5 sobre una
                   fuente 4:3 es el más agresivo de la página —descarta
                   ~44% del ancho— y el 62% que servía a alberca_12 aquí
                   cortaba la casa por el techo dejando jardín y camino de
                   acceso. A 35% el volumen construido, la alberca y la
                   franja de mar quedan dentro; lo que se cede es el
                   antejardín del pie, que no aporta. */
                className="aspect-[4/5] w-full object-cover object-[50%_35%]"
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
                width="1600"
                height="1163"
                loading="lazy"
                /* Restitución docs/Fotos WEB AV.pdf: dron_26, 1600×1163
                   (no 1600×1066 como el grueso del set — el hint lo
                   refleja). Encuadre bajo (58%): el marco es 4:3 en móvil
                   y una columna casi cuadrada en lg (h acotada a
                   100dvh-9rem, máx 34rem), así que sobra cielo por arriba;
                   bajar el recorte deja la casa y la línea de costa a la
                   altura de los datos en serif, y conserva el degradado
                   del atardecer que da el color a la sección marino. */
                className="aspect-[4/3] w-full object-cover object-[50%_58%] lg:aspect-auto lg:h-[calc(100dvh-9rem)] lg:max-h-[34rem]"
              />
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* Sección "Momentos — El agua, a su propio ritmo" (strip
          scroll-snap de alberca/terraza) ELIMINADA en la ronda 15 jun
          (§9.3): JSX retirado de Home y `momentosFotos` de home.js. */}

      {/* 6 · Banda CTA final de reserva. Ronda 28 jul (pedido del
          cliente): en modo motion el fondo son dos clips del video de
          marca en bucle secuencial (VideoBucle en modo lazy: nada
          descarga hasta que la banda entra al viewport). Son los clips
          por defecto del componente (hero_01/hero_02) — hasta la ronda
          "entrada" (ago 2026) eran los mismos del hero y su descarga
          salía del caché HTTP; ahora que el hero reproduce entrada.mp4
          ya no se comparten, y el modo lazy pasa de optimización a
          requisito: son ~4.3 MB que no deben competir con el LCP.
          La banda conserva su alto de siempre (py-28 / lg:py-40): los
          clips se recortan con object-cover y no importa (acordado con
          el cliente). El poster del video —y el fondo estático con
          prefers-reduced-motion (brief §6)— es hoy `alberca_02`, la
          alberca infinita frente al Pacífico en el azul del crepúsculo,
          que sustituye a la aérea `aereas_09` del set demo. Ese
          camino sustituye al deleite de scale 1.08 → 1.0 que traía la
          foto (§6.8): el movimiento ahora lo pone el video.
          Ronda 15 jun (§9.3): texto de apoyo centralizado en home.js;
          el botón ya está a la escala G2 (min-h-[48px] px-8). */}
      <section className="relative overflow-hidden bg-marino">
        {reduceMotion ? (
          <img
            src={ctaFinal.foto.src}
            alt={ctaFinal.foto.alt}
            width="1600"
            height="1066"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <VideoBucle
            poster={{
              src: ctaFinal.foto.src,
              alt: ctaFinal.foto.alt,
              width: 1600,
              height: 1066,
            }}
            etiquetaBoton="video de fondo de la banda de reserva"
          />
        )}
        {/* QA 15 jun (P1): el fondo de esta banda tiene un cielo amplio
            muy claro (no un glint puntual) y el texto centrado lo cruza.
            El flat marino/60 dejaba el cuerpo (marfil/85) en 3.14:1 y el
            eyebrow dorado en 1.84:1 sobre el cielo → falla AA. Se sube el
            overlay a /72 (sube el piso del cuerpo) y el text-shadow del
            bloque (abajo) garantiza el borde de los glifos del eyebrow
            dorado, que sobre cualquier fondo claro no alcanza 4.5:1 por sí
            solo (regla dura: dorado como texto solo sobre marino). /78
            deja el cuerpo (marfil/85) en ~4.6:1 incluso sobre el pixel de
            cielo más claro; el eyebrow dorado, que ningún overlay lleva a
            4.5:1 sobre claro, se apoya en el halo marino del text-shadow.
            Ronda 28 jul: el overlay pasa a cubrir también los clips de
            video — que comparten el problema (el QA del hero midió luma
            198–205 en el cielo del clip 01) — así que /78 sigue siendo
            el piso correcto con fondo en movimiento.
            Ronda "entrada" (ago 2026): el poster cambió a `alberca_02`,
            un crepúsculo bastante MÁS oscuro que la aérea que había, así
            que /78 pasa a ser holgado en la rama reduced-motion. NO se
            baja: el caso que manda sigue siendo el de los clips
            hero_01/02, que no cambiaron y conservan su cielo claro. El
            overlay se dimensiona por el peor fondo de los dos, no por el
            poster. A diferencia del hero, aquí el marino SÍ se conserva:
            el cliente pidió quitar el tinte verdoso del video de entrada,
            no de esta banda, cuyo lavado marino es intencional (§4.1). */}
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
