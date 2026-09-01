import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { useT } from '../i18n/LanguageContext.jsx';
import { fadeRise, staggerGroup } from '../lib/motion.js';

/* Secuencia de entrada sobria, una sola vez (brief §6). */
const sequence = staggerGroup({ stagger: 0.12, delayChildren: 0.1 });
const item = fadeRise({ y: 18, duration: 0.7 });

/**
 * Página "Aún en construcción" (ruta /contacto).
 *
 * El sistema de reservaciones todavía no está disponible: TODOS los CTAs
 * de "Reservar" / "Consultar disponibilidad" / "Agendar mi ritual" del
 * sitio —y el botón persistente de la Navbar y la BookingBar— apuntan a
 * /contacto, así que reemplazar esta página deja todo el flujo coherente
 * con un solo cambio. Fondo marino casi a pantalla completa, en voz de
 * marca; el dato de contacto real queda como salida (también en el footer).
 */
export default function Contacto() {
  /* i18n: la página no tiene archivo de datos — todo su copy vive en
     src/i18n/ui.js (`contacto`); usePageMeta recibe los metadatos por
     idioma. */
  const t = useT();

  usePageMeta(t.contacto.metaTitulo, t.contacto.metaDescripcion);

  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-marino px-5 py-32 text-center sm:px-8">
      <motion.div
        variants={sequence}
        initial={reduceMotion ? false : 'hidden'}
        animate="visible"
        className="mx-auto flex max-w-2xl flex-col items-center"
      >
        {/* Logo en versión clara sobre marino (Logo.svg, filtro logo-claro). */}
        <motion.img
          variants={item}
          src="/Logo.svg"
          alt={t.contacto.logoAlt}
          width="96"
          height="96"
          className="logo-claro h-24 w-24"
        />
        {/* Eyebrow en salvia (5.54:1 sobre marino, AA). */}
        <motion.p variants={item} className="eyebrow mt-10 text-salvia">
          {t.contacto.eyebrow}
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] text-marfil"
        >
          {t.contacto.titulo}
        </motion.h1>
        <motion.div
          variants={item}
          className="mt-7 h-px w-12 bg-dorado"
          aria-hidden="true"
        />
        <motion.p
          variants={item}
          className="mt-8 max-w-[52ch] text-base leading-relaxed text-marfil/85 sm:text-lg"
        >
          {t.contacto.cuerpo}
        </motion.p>
        {/* Salida real mientras tanto (también está en el footer). */}
        <motion.div variants={item} className="mt-7 text-sm text-marfil/75">
          <p>{t.contacto.escribenos}</p>
          <p className="mt-2">
            <a
              href="tel:+527444820136"
              className="transition-colors duration-300 hover:text-dorado"
            >
              +52 744 482 0136
            </a>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            <a
              href="mailto:reservaciones@aureavita.mx"
              className="transition-colors duration-300 hover:text-dorado"
            >
              reservaciones@aureavita.mx
            </a>
          </p>
        </motion.div>
        <motion.div variants={item}>
          <Link
            to="/"
            onClick={() => window.scrollTo(0, 0)}
            /* Botón dorado sobre marino: anillo de foco marfil (el global
               currentColor=marino sería invisible aquí). */
            className="eyebrow mt-11 inline-flex min-h-[48px] items-center bg-dorado px-8 text-marino transition-[background-color,transform] duration-300 hover:bg-dorado/85 focus-visible:outline-marfil motion-safe:active:scale-[0.99]"
          >
            {t.contacto.volver}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
