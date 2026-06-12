import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta.js';
import BookingBar from '../components/BookingBar.jsx';
import FeatureCard from '../components/FeatureCard.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal.jsx';
import { EASE_OUT, fadeRise, staggerGroup } from '../lib/motion.js';
import { destinoStats, homeCards, momentosFotos } from '../data/home.js';

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

/* Secuencia de carga del hero (brief §6.1): eyebrow → tagline →
   subtítulo → indicador, con stagger de ~120ms; la BookingBar cierra
   la secuencia. Total < 1.2s. Variants compartidos de src/lib/motion. */
const heroSequence = staggerGroup({ stagger: 0.12, delayChildren: 0.1 });
const heroItem = fadeRise({ y: 18, duration: 0.7 });
const bookingBarEntrance = fadeRise({ y: 16, duration: 0.7, delay: 0.55 });

/**
 * Página de inicio (brief §3 y §4.1). Estructura en secciones planas:
 * hero → BookingBar → bienvenida → grid de 3 → destino (marino)
 * → strip de momentos → banda CTA final.
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
      <section className="relative flex min-h-[100dvh] flex-col justify-start overflow-hidden bg-marino pt-[max(20vh,8rem)]">
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
            ~60% de marino efectivo (≥4.5:1); la mitad derecha de la
            foto sigue limpia. */}
        <div
          className="absolute inset-0 bg-linear-to-r from-marino/45 via-marino/25 to-transparent"
          aria-hidden="true"
        />
        <motion.div
          variants={heroSequence}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 sm:px-8"
        >
          <motion.p variants={heroItem} className="eyebrow text-marfil/90">
            Aurea Vita · Acapulco
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] text-marfil"
          >
            Santuario frente al Pacífico
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="mt-6 max-w-xl text-lg text-marfil/90"
          >
            Un refugio de calma sobre la bahía de Acapulco, donde el tiempo se
            mide en mareas.
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
          Entra al final de la secuencia del hero (§6.1). */}
      <motion.div
        variants={bookingBarEntrance}
        initial={reduceMotion ? false : 'hidden'}
        animate="visible"
        className="relative z-20 mx-auto -mt-7 w-full max-w-5xl px-5 sm:px-8 md:-mt-11"
      >
        <BookingBar />
      </motion.div>

      {/* 3 · Editorial "Bienvenido a Aurea Vita" (marfil, 50/50) */}
      <section className="bg-marfil py-20 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="El hotel" title="Bienvenido a Aurea Vita">
              <p>
                Hay lugares que se visitan y lugares que se habitan. Aurea Vita
                pertenece a los segundos: una casa frente al mar donde la
                arquitectura se abre a la luz del Pacífico y cada espacio
                invita a quedarse un poco más. Aquí el lujo no se anuncia; se
                siente en la temperatura del mármol, en el silencio de los
                pasillos, en la distancia exacta entre tu terraza y el
                horizonte.
              </p>
              <p>
                Llegar es sencillo. Soltar el ritmo de afuera toma apenas una
                tarde. Lo demás —las mañanas largas, la mesa frente a la bahía,
                el agua quieta de la alberca— sucede solo.
              </p>
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

      {/* 5 · Contraste "El destino — Acapulco" (marino, brief §4.1).
          El texto revela en bloque (§6: no animar texto en lectura). */}
      <section className="bg-marino py-20 lg:py-32">
        {/* lg:items-stretch: la foto llena la altura de la columna de texto
            (composición editorial sólida, no una foto flotando pequeña) */}
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:items-stretch lg:gap-20">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="El destino"
              title="Acapulco, la bahía que enseñó al mundo a mirar el mar"
            >
              <p>
                Antes de los reflectores, Acapulco ya era esto: una bahía honda
                y tibia, montañas que caen al agua y una luz que dura todo el
                año. Aurea Vita se asoma a esa herencia desde la parte alta de
                la costa, lo bastante cerca para vivirla y lo bastante lejos
                para escucharla apenas.
              </p>
            </SectionHeading>
            {/* Datos en serif gigante (brief §1: "como SHA") con línea
                fina de 1px al margen — detalle editorial deliberado */}
            <dl className="mt-14 grid grid-cols-3 gap-5 sm:gap-8">
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
          <Reveal delay={0.12} className="overflow-hidden lg:h-full">
            <img
              src="/fotos_hotel/aereas/aereas_15.jpeg"
              alt="Vista aérea de la bahía de Acapulco al atardecer, con el sol bajo sobre el Pacífico"
              width="867"
              height="650"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover lg:aspect-auto lg:h-full"
            />
          </Reveal>
        </div>
      </section>

      {/* 6 · Strip de alberca/terraza con scroll-snap nativo (marfil) */}
      <section className="bg-marfil py-20 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Momentos"
              title="El agua, a su propio ritmo"
            >
              <p>
                De la alberca infinita al amanecer a la terraza de Cielo cuando
                cae la tarde: el día en Aurea Vita transcurre entre dos aguas,
                la dulce y la del Pacífico.
              </p>
            </SectionHeading>
          </Reveal>
        </div>
        <div
          role="region"
          aria-label="Momentos de la alberca y la terraza"
          tabIndex={0}
          className="mt-14 snap-x snap-mandatory overflow-x-auto scroll-pl-5 sm:scroll-pl-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* 5 fotos: dentro del límite de stagger del brief (§6.3) */}
          <RevealGroup
            as="ul"
            stagger={0.1}
            amount={0.1}
            className="flex w-max gap-5 px-5 sm:px-8"
          >
            {momentosFotos.map((foto) => (
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
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.04]"
                  />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 7 · Banda CTA final de reserva (foto con overlay marino).
          Momento de deleite permitido (§6.8): la foto asienta de
          scale 1.08 → 1.0 al entrar al viewport, una sola vez. */}
      <section className="relative overflow-hidden bg-marino">
        <motion.img
          src="/fotos_hotel/aereas/aereas_09.jpeg"
          alt="Costa de Acapulco bajo la luz dorada de la mañana, vista desde el aire"
          width="940"
          height="529"
          loading="lazy"
          initial={reduceMotion ? false : { scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: EASE_OUT }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-marino/60" aria-hidden="true" />
        <RevealGroup
          stagger={0.12}
          className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center px-5 py-28 sm:px-8 lg:py-40"
        >
          <RevealItem>
            <SectionHeading
              align="center"
              tone="dark"
              eyebrow="Reservaciones"
              title="El Pacífico no se apura. Tú tampoco deberías."
            >
              <p>
                Cuéntanos tus fechas y deja el resto en manos de nuestro
                concierge.
              </p>
            </SectionHeading>
          </RevealItem>
          <RevealItem>
            <Link
              to="/contacto"
              /* Sobre foto+overlay marino el anillo global (currentColor=
                 marino) es invisible; se fuerza marfil para el foco visible. */
              className="eyebrow mt-11 inline-flex min-h-[48px] items-center bg-dorado px-8 text-marino transition-colors duration-300 hover:bg-dorado/85 focus-visible:outline-marfil"
            >
              Reservar mi estancia
            </Link>
          </RevealItem>
        </RevealGroup>
      </section>
    </>
  );
}
