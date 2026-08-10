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
          clip tiene cielo y la fachada, ver la calibración de scrims
          abajo (brief §3.1). overflow-hidden contiene el fondo, como
          contenía el Ken Burns (§6.8). */}
      <section className="relative flex min-h-[100dvh] flex-col justify-start overflow-hidden bg-marino pt-[max(20vh,9rem)]">
        {/* Con prefers-reduced-motion NO se reproduce video (brief §6).
            Ronda "entrada": la foto estática de esta rama es ahora el
            primer frame del propio clip (entrada_poster.jpeg, 1920×1080)
            en vez de aereas_11 — que además había desaparecido del disco
            con el set demo fotos_hotel/ y daba 404. Ventaja doble: los
            dos modos muestran EXACTAMENTE la misma escena y el mismo
            encuadre (object-cover + object-center, igual que el <video>
            de VideoBucle), así que una sola calibración de scrims sirve
            para ambos (ver bloque siguiente) y el <link rel="preload">
            de arriba es el mismo en los dos caminos.
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
        {/* ── SCRIMS DEL HERO (ronda "entrada", ago 2026) ──────────────
            Pedido del cliente: «quitar el filtro azul verdoso». El clip
            NO tiene tinte alguno: sus colores son cálidos y naturales
            (cielo de atardecer, piedra, palmeras, césped). El verde
            azulado lo ponían estos tres overlays, que teñían el frame
            entero con el token `marino` (#1f3a44), que es literalmente un
            azul-verde oscuro. Solución acordada: conservar un degradado
            detrás del texto (hace falta para AA) pero en NEGRO puro, sin
            componente de color, para que el video se lea con sus colores
            reales.

            El cambio de color permite ADEMÁS bajar las opacidades,
            porque a igual alfa un scrim negro rinde bastante más que uno
            marino (el marino aporta su propia luminancia: L = 0.038, no
            0). Medido sobre la franja del H1 a 1440×900: negro/45 →
            3.75:1, marino/45 → 2.74:1, marino/60 → 3.87:1. O sea
            negro/45 ≈ marino/58. Por eso los tres scrims bajan (60→45,
            40→35, 35→25 el vertical; 60→45, 30→25 el lateral; 65→50 el
            de móvil) sin perder piso de contraste: se quita el color Y
            se destapa video.

            CALIBRACIÓN (WCAG 1.4.3: el H1 es texto grande → 3:1; el
            subtítulo, texto normal → 4.5:1). Metodología: 19 frames de
            entrada.mp4 y entrada_movil.mp4 (uno cada 0.5s), recortados
            con el mismo object-cover/object-center que aplica el
            navegador, con los tres degradados compuestos encima en sRGB
            NO lineal — c_salida = c_video · Π(1−αᵢ), que es lo que hace
            el compositor — y luminancia relativa WCAG del resultado
            contra el marfil #f5f1ec (L = 0.884). Como el fondo siempre
            queda más oscuro que el marfil, el peor caso de una zona es
            su parte más CLARA; se evaluó la peor teja de 24×24 px (≈ el
            fondo local de un glifo) sobre 11 viewports × 19 frames.
            Peores casos con los valores de abajo:
              H1         4.53:1  @1024×768   (pide 3:1)
              subtítulo  4.79:1  @768×1024   (pide 4.5:1)
            Los dos mínimos caen en tablet, donde el bloque de texto ocupa
            casi todo el ancho y el scrim lateral ya se agotó; en
            escritorio ancho suben a 5.6:1 / 8.8:1 y en móvil a 8.1:1 /
            5.6:1. El pixel suelto más claro (p99.9) queda en ~4.2:1 para
            el H1 y ~4.0:1 para el subtítulo: bajo 4.5 en el 0.1% del área
            (reflejos puntuales del muro blanco), que es exactamente lo
            que cubre el text-shadow del copy (abajo) — el mismo recurso
            que ya sostenía los glints de sol de la foto anterior.

            UN SOLO juego de scrims para los DOS modos: desde esta ronda
            reduced-motion muestra el primer frame de este mismo clip, así
            que la rama marino/45–20/35 que tenía la foto aérea dejó de
            aplicar (y sobre esta escena habría fallado: subtítulo 2.93:1
            en móvil, H1 con p99.9 de 2.78:1 en tablet). ─────────────── */}
        <div
          className="absolute inset-0 bg-linear-to-b from-black/45 via-black/35 to-black/25"
          aria-hidden="true"
        />
        {/* Scrim lateral, reforzando la columna donde vive el texto
            (brief §1.1: overlay "solo donde hay texto encima"). El
            degradado vertical por sí solo no basta en la mitad izquierda,
            que en este clip cruza la fachada blanca y el cielo; la mitad
            derecha del frame — césped, palmeras, el campo al fondo —
            queda sin refuerzo y se ve limpia. Se apaga a transparent
            antes del borde derecho para que la caída no se note como
            banda. */}
        <div
          className="absolute inset-0 bg-linear-to-r from-black/45 via-black/25 to-transparent"
          aria-hidden="true"
        />
        {/* En < md el bloque de texto ocupa todo el ancho y el scrim
            lateral se agota antes de cubrirlo, así que el texto cruzaría
            la zona más clara del frame casi sin refuerzo. Scrim superior
            dedicado, solo < md: negro/50 → transparente sobre la franja
            que ocupa el texto con pt-[max(20vh,9rem)]. Se extiende de
            55dvh a 60dvh en esta ronda: en móvil el recorte object-cover
            deja a la vista solo la banda CENTRAL del frame 16:9 (≈26% del
            ancho a 390×844), que es justo el acceso iluminado y el muro
            blanco — lo más claro del clip. Con 55dvh el degradado ya
            estaba casi agotado a la altura del subtítulo (~50dvh) y este
            se quedaba en 4.45:1; con 60dvh sube a 4.79:1 y entra en AA.
            La mitad inferior del clip sigue limpia (brief §1.1).
            Va en los dos modos: con reduced-motion el fondo es el primer
            frame de este mismo clip y tiene el problema idéntico. */}
        <div
          className="absolute inset-x-0 top-0 h-[60dvh] bg-linear-to-b from-black/50 to-transparent md:hidden"
          aria-hidden="true"
        />
        <motion.div
          variants={heroSequence}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 sm:px-8"
        >
          {/* Eyebrow "Aurea Vita · Acapulco" eliminado en la ronda 15 jun
              (§9.3): el H1 abre la secuencia. */}
          {/* text-shadow (QA 15 jun, P1): garantía AA del marfil sobre
              los reflejos puntuales que el overlay no puede cubrir sin
              oscurecer todo el fondo — antes los glints de sol/espuma de
              aereas_11, hoy los del muro blanco y el cielo del clip de la
              entrada (el 0.1% de pixels que la calibración de arriba deja
              bajo 4.5:1). El halo sostiene el contraste en el borde de
              cada glifo aun sobre el pixel más claro, conservando "la
              imagen manda" en la mitad derecha limpia (brief §1.1).
              Ronda "entrada": el halo pasa de marino a NEGRO por el mismo
              pedido de quitar el azul verdoso — era el último resto de
              color tintando el video, y a igual alfa un halo negro rinde
              más, así que el respaldo queda incluso algo más firme. */}
          <motion.h1
            variants={heroItem}
            className="max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] text-marfil [text-shadow:0_1px_18px_rgb(0_0_0_/_0.55)]"
          >
            {heroHome.titulo}
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="mt-6 max-w-2xl text-lg text-marfil [text-shadow:0_1px_12px_rgb(0_0_0_/_0.7)]"
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
                height="1066"
                loading="lazy"
                /* Encuadre heredado de la aérea anterior («Dron Casa 21»),
                   que la entrega definitiva no incluye. Sobre alberca_12
                   —deck, alberca y jacuzzi abiertos al Pacífico, 3:2— el
                   recorte 4:5 con encuadre bajo (62%) sigue conservando el
                   espejo de agua y los camastros en vez del cielo. */
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
                width="1600"
                height="1066"
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
