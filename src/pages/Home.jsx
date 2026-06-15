import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta.js';
import BookingBar from '../components/BookingBar.jsx';
import FeatureCard from '../components/FeatureCard.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
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

/* Secuencia de carga del hero (brief §6.1): H1 → subtítulo →
   indicador, con stagger de ~120ms; la BookingBar cierra la secuencia.
   Variants compartidos de src/lib/motion.
   Ronda 15 jun (§9.3): el eyebrow superior se eliminó, así que la
   secuencia perdió su primer hijo. Los tres hijos del hero entran ahora
   a 0.10s / 0.22s / 0.34s (delayChildren 0.1 + stagger 0.12). La
   BookingBar baja su delay de 0.55s a 0.46s para seguir al indicador a
   un paso de stagger (0.34 + 0.12), no con el hueco de ~0.21s que dejó
   quitar el eyebrow. Total ~1.16s: sigue < 1.2s y la entrada se lee como
   una sola exhalación, sin que la barra arranque tarde. */
const heroSequence = staggerGroup({ stagger: 0.12, delayChildren: 0.1 });
const heroItem = fadeRise({ y: 18, duration: 0.7 });
const bookingBarEntrance = fadeRise({ y: 16, duration: 0.7, delay: 0.46 });

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

  /* Preload del LCP del hero (aereas_11) acotado a esta ruta: antes vivía
     en index.html y se descargaba en todas las páginas. Se inyecta al
     montar y se retira al desmontar para no afectar a las rutas interiores
     (brief §3.3: head-start del LCP solo donde es el LCP). */
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = '/fotos_hotel/aereas/aereas_11.jpeg';
    link.setAttribute('fetchpriority', 'high');
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      {/* 1 · Hero fullscreen (brief §3) — la foto es el LCP: sin lazy */}
      {/* El bloque de texto se ancla al tercio superior: ahí aereas_11
          tiene mar abierto despejado, ideal para el marfil (brief §3.1).
          overflow-hidden contiene el Ken Burns de la foto (§6.8). */}
      <section className="relative flex min-h-[100dvh] flex-col justify-start overflow-hidden bg-marino pt-[max(20vh,9rem)]">
        {/* Ken Burns muy lento (scale 1 → 1.06 en ~22s), solo motion-safe */}
        <img
          src="/fotos_hotel/aereas/aereas_11.jpeg"
          alt="Costa turquesa y cielo despejado del Pacífico desde el aire"
          width="867"
          height="650"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[28%_50%] motion-safe:animate-kenburns md:object-center"
        />
        <div
          className="absolute inset-0 bg-linear-to-b from-marino/45 via-marino/20 to-marino/35"
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
            className="mt-6 max-w-2xl text-lg text-marfil/90 [text-shadow:0_1px_12px_rgb(31_58_68_/_0.7)]"
          >
            {heroHome.subtitulo}
          </motion.p>
          {/* Indicador de scroll: línea dorada que se dibuja y desvanece
              en loop lento — el único loop permitido (brief §6) */}
          <motion.div variants={heroItem} className="mt-14">
            <span className="sr-only">Desplázate para descubrir</span>
            <span
              aria-hidden="true"
              className="ml-1 block h-14 w-px origin-top bg-dorado motion-safe:animate-scroll-pulse"
            />
          </motion.div>
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
            <img
              src="/fotos_hotel/fachadas/fachadas_05.jpeg"
              alt="Fachada de Aurea Vita entre vegetación, bañada por la luz de la tarde"
              width="940"
              height="627"
              loading="lazy"
              /* object-right: el recorte 4:5 toma la mitad derecha de la
                 fachada (enredadera + balcones) y deja fuera el letrero
                 "HOTEL" del costado izquierdo (brief §4.1: minimizar
                 marcas ajenas en encuadres) */
              className="aspect-[4/5] w-full object-cover object-right"
            />
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
      <section className="bg-marino py-20 lg:py-32">
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
                fina de 1px al margen — detalle editorial deliberado (D3) */}
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
                    {stat.valor}
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
            <img
              src={destino.foto.src}
              alt={destino.foto.alt}
              width="867"
              height="650"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover lg:aspect-auto lg:h-[calc(100dvh-9rem)] lg:max-h-[34rem]"
            />
          </Reveal>
        </div>
      </section>

      {/* Sección "Momentos — El agua, a su propio ritmo" (strip
          scroll-snap de alberca/terraza) ELIMINADA en la ronda 15 jun
          (§9.3): JSX retirado de Home y `momentosFotos` de home.js. */}

      {/* 6 · Banda CTA final de reserva (foto con overlay marino).
          Momento de deleite permitido (§6.8): la foto asienta de
          scale 1.08 → 1.0 al entrar al viewport, una sola vez. Ronda 15
          jun (§9.3): texto de apoyo nuevo (centralizado en home.js); el
          botón ya está a la escala G2 (min-h-[48px] px-8). */}
      <section className="relative overflow-hidden bg-marino">
        <motion.img
          src={ctaFinal.foto.src}
          alt={ctaFinal.foto.alt}
          width="940"
          height="529"
          loading="lazy"
          initial={reduceMotion ? false : { scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: EASE_OUT }}
          className="absolute inset-0 h-full w-full object-cover"
        />
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
            sobre claro, se apoya en el halo marino del text-shadow. */}
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
