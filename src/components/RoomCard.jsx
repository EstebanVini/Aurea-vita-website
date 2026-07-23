import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { RevealGroup, RevealItem } from './Reveal.jsx';
import { EASE_OUT, drawLine, slideFrom } from '../lib/motion.js';

/**
 * Bloque de categoría de /habitaciones (brief §4.2 y §5.3, variante
 * completa): mini-galería (foto principal 4:3 + thumbnails selectores)
 * + eyebrow, nombre, descripción, specs en serif grande, amenidades y
 * CTA "Reservar" → /contacto?habitacion=<slug>.
 *
 * Motion (brief §6, intensidad 6/10):
 * - El bloque entero es un RevealGroup: fade + rise con stagger sutil
 *   foto → thumbnails → texto → specs → amenidades/CTA (5 ítems, el
 *   máximo del brief §6.3).
 * - Ronda 23 jul (pase de motion): dentro del marco recortado, la foto
 *   principal hace un glide direccional (slideFrom) — entra desde la
 *   izquierda en las cards normales y desde la derecha con `reverse` —
 *   para que 7 tarjetas seguidas no repitan el mismo reveal idéntico.
 * - Swap de la mini-galería: crossfade vía AnimatePresence. La foto
 *   entrante hace fade-in encima; la saliente se mantiene opaca debajo
 *   y se retira justo al terminar (sin "dip" hacia el fondo). Las dos
 *   viven en un contenedor aspect-[4/3] con posiciones absolutas:
 *   cero layout shift. Con reduced-motion el cambio es instantáneo.
 * - Hovers solo transform/opacity y con `motion-safe:`: zoom 1.04 en
 *   la foto principal (mismo patrón del Home) y leve scale en
 *   thumbnails, con `active:` como feedback de tap.
 * - Suite Aurea (tone="dark", la insignia): su línea dorada se
 *   "dibuja" de izquierda a derecha al revelarse — el único toque
 *   extra de deleite del bloque (brief §6.8).
 *
 * Acento de categoría (salvia/marino/dorado) SOLO en decorativos:
 * línea bajo el título, borde del thumbnail activo y filete de specs.
 * El eyebrow toma el acento únicamente sobre fondo marino y solo si es
 * dorado (5.8:1, AA); sobre claros queda en marino/80 — salvia y dorado
 * a 12px fallan WCAG AA sobre marfil/arena (lección del Home).
 * El botón es siempre dorado: en la Suite Aurea acento y CTA coinciden
 * a propósito (brief: "eso la hace insignia").
 *
 * Props:
 * - room:    entrada de src/data/rooms.js.
 * - tone:    'light' (marfil/arena) | 'dark' (marino — Suite Aurea).
 * - reverse: invierte galería/texto en desktop (ritmo editorial);
 *            en móvil siempre foto → texto (brief §4.3).
 */

const ACCENT = {
  salvia: {
    line: 'bg-salvia',
    thumb: 'border-salvia',
    stat: 'border-salvia',
  },
  marino: {
    line: 'bg-marino',
    thumb: 'border-marino',
    stat: 'border-marino/40',
  },
  dorado: {
    line: 'bg-dorado',
    thumb: 'border-dorado',
    stat: 'border-dorado/60',
  },
};

/** Duración del crossfade de la mini-galería (brief §6: 250–500ms). */
const SWAP_DURATION = 0.45;

export default function RoomCard({ room, tone = 'light', reverse = false }) {
  const [activa, setActiva] = useState(0);
  const reduceMotion = useReducedMotion();

  const onDark = tone === 'dark';
  const accent = ACCENT[room.accent];
  const fotoActiva = room.fotos[activa];

  const eyebrowColor = onDark
    ? room.accent === 'dorado'
      ? 'text-dorado'
      : 'text-marfil/85'
    : 'text-marino';

  return (
    <RevealGroup
      as="article"
      stagger={0.1}
      amount={0.15}
      id={room.slug}
      aria-labelledby={`${room.slug}-titulo`}
      className={[
        'mx-auto grid max-w-[1400px] items-start gap-10 px-5 sm:px-8 lg:gap-16',
        reverse
          ? 'lg:grid-cols-[1fr_1.1fr]'
          : 'lg:grid-cols-[1.1fr_1fr]',
      ].join(' ')}
    >
      {/* Mini-galería: principal + thumbnails que la intercambian.
          En móvil va siempre primero (orden natural del DOM). */}
      <div className={reverse ? 'lg:order-2' : undefined}>
        <RevealItem>
          {/* El contenedor fija el aspect-ratio; las fotos van en
              absoluto durante el crossfade → cero layout shift. */}
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            {/* Glide direccional (ronda 23 jul, pase de motion): la foto
                entra "desde su lado" DENTRO del marco recortado — x
                negativo con la galería a la izquierda, positivo con
                `reverse` — mientras el RevealItem pone el fade+rise.
                Con 7 tarjetas seguidas, la dirección alternada rompe la
                monotonía del reveal idéntico. slideFrom no lleva opacity
                (evita el doble-fade) y su sobre-escala que asienta a 1
                cubre el viaje sin mostrar hueco. Clipeado: jamás genera
                scroll lateral en móvil. Hereda el disparo del
                RevealGroup por propagación de variants → visible desde
                el primer frame con reduced-motion (initial={false}). */}
            <motion.div
              variants={slideFrom({ x: reverse ? 32 : -32 })}
              className="absolute inset-0"
            >
              <AnimatePresence initial={false}>
                <motion.img
                  key={fotoActiva.src}
                  src={fotoActiva.src}
                  alt={fotoActiva.alt}
                  width="940"
                  height="705"
                  loading="lazy"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      duration: reduceMotion ? 0 : SWAP_DURATION,
                      ease: EASE_OUT,
                    },
                  }}
                  /* La saliente queda opaca DEBAJO de la entrante y se
                     retira al completarse el fade: crossfade sin destello
                     del fondo a mitad de camino. */
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: 0,
                      delay: reduceMotion ? 0 : SWAP_DURATION,
                    },
                  }}
                  className={[
                    /* `pos` por foto (rooms.js): encuadra la cama al centro
                       y deja fuera elementos ajenos a la paleta. */
                    'absolute inset-0 h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:hover:scale-[1.04]',
                    fotoActiva.pos ?? 'object-center',
                  ].join(' ')}
                />
              </AnimatePresence>
            </motion.div>
          </div>
        </RevealItem>
        {/* Anuncia el cambio de foto a lectores de pantalla. */}
        <p aria-live="polite" className="sr-only">
          {fotoActiva.alt}
        </p>
        {/* Ronda 23 jul: las habitaciones reales llegaron con UNA foto
            cada una — con una sola no hay nada que intercambiar, así
            que la tira de thumbnails solo se pinta con 2+. */}
        {room.fotos.length > 1 && (
        <RevealItem
          as="ul"
          className={[
            'mt-4 grid gap-3 sm:gap-4',
            { 3: 'grid-cols-3', 4: 'grid-cols-4', 5: 'grid-cols-5' }[
              room.fotos.length
            ] ?? 'grid-cols-4',
          ].join(' ')}
        >
          {room.fotos.map((foto, indice) => (
            <li key={foto.src}>
              <button
                type="button"
                onClick={() => setActiva(indice)}
                aria-pressed={indice === activa}
                aria-label={`Ver fotografía ${indice + 1} de ${room.fotos.length}: ${foto.alt}`}
                className={[
                  'block w-full border-2 transition-[opacity,border-color,transform] duration-300',
                  /* El anillo de foco global usa currentColor; sin esto,
                     el botón hereda marino del body y el anillo sería
                     invisible sobre el fondo marino de la Suite Aurea. */
                  onDark ? 'text-marfil' : 'text-marino',
                  /* Feedback de selección: leve scale al hover y un
                     "asentamiento" al presionar — solo motion-safe. */
                  'motion-safe:hover:scale-[1.03] motion-safe:active:scale-[0.97]',
                  indice === activa
                    ? `${accent.thumb} opacity-100`
                    : 'border-transparent opacity-60 hover:opacity-100 focus-visible:opacity-100',
                ].join(' ')}
              >
                <img
                  src={foto.src}
                  alt=""
                  width="235"
                  height="176"
                  loading="lazy"
                  className={[
                    'aspect-[4/3] w-full object-cover',
                    foto.pos ?? 'object-center',
                  ].join(' ')}
                />
              </button>
            </li>
          ))}
        </RevealItem>
        )}
      </div>

      {/* Contenido: misma anatomía en las 3 categorías para que se
          sientan comparables (brief §4.2: specs alineables). Los
          variants atraviesan este div plano: sus RevealItem entran en
          el mismo stagger del grupo, después de la galería. */}
      <div className={reverse ? 'lg:order-1 lg:pt-2' : 'lg:pt-2'}>
        <RevealItem>
          <p className={['eyebrow', eyebrowColor].join(' ')}>{room.eyebrow}</p>
          <h2
            id={`${room.slug}-titulo`}
            className={[
              /* Misma escala display que SectionHeading en el Home
                 (lg:text-6xl): el título recupera jerarquía clara sobre
                 los specs en serif de 5xl. */
              'mt-4 font-display text-4xl font-light leading-[1.1] text-balance sm:text-5xl lg:text-6xl',
              onDark ? 'text-marfil' : 'text-marino',
            ].join(' ')}
          >
            {room.nombre}
          </h2>
          {onDark ? (
            /* Suite Aurea: la línea dorada se dibuja de izquierda a
               derecha — el toque de deleite de la insignia (§6.8). */
            <motion.div
              variants={drawLine()}
              className={['mt-6 h-px w-12 origin-left', accent.line].join(' ')}
              aria-hidden="true"
            />
          ) : (
            <div
              className={['mt-6 h-px w-12', accent.line].join(' ')}
              aria-hidden="true"
            />
          )}
          <p
            className={[
              'mt-6 max-w-[60ch] text-base leading-relaxed sm:text-lg',
              onDark ? 'text-marfil/85' : 'text-marino/80',
            ].join(' ')}
          >
            {room.descripcion}
          </p>
        </RevealItem>

        {/* Specs en serif gigante, patrón de datos del Home (brief §1).
            Opcionales desde la ronda 23 jul: el cliente no entregó
            superficies/cupos de las habitaciones reales y no se
            inventan datos — sin stats, el bloque no se pinta. */}
        {room.stats?.length > 0 && (
        <RevealItem as="dl" className="mt-10 flex gap-10 sm:gap-14">
          {room.stats.map((stat) => (
            <div
              key={stat.detalle}
              className={['flex flex-col-reverse border-l pl-5', accent.stat].join(' ')}
            >
              <dt
                className={[
                  /* marino/70 da 4.23:1 sobre arena (falla AA en 14px);
                     a /75 queda en 4.8:1 sobre arena y 5.2:1 sobre marfil. */
                  'mt-2 text-sm leading-snug',
                  onDark ? 'text-marfil/70' : 'text-marino/75',
                ].join(' ')}
              >
                {stat.detalle}
              </dt>
              <dd
                className={[
                  'font-display text-4xl font-light leading-none sm:text-5xl',
                  onDark ? 'text-marfil' : 'text-marino',
                ].join(' ')}
              >
                {stat.valor}
                {stat.sufijo && (
                  <span className="ml-1.5 text-2xl sm:text-3xl">
                    {stat.sufijo}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </RevealItem>
        )}

        {/* Amenidades con marcador lineal neutro (el acento ya vive en
            línea, filete y thumbnail — disciplina de paleta, brief §1.5).
            Revelan en bloque junto con el CTA: sin animación por línea
            (brief §6, "dónde NO animar"). */}
        <RevealItem>
          <ul className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {room.amenidades.map((amenidad) => (
              <li
                key={amenidad}
                className={[
                  'flex gap-3 text-sm leading-relaxed',
                  onDark ? 'text-marfil/85' : 'text-marino/80',
                ].join(' ')}
              >
                <span
                  aria-hidden="true"
                  className={[
                    'mt-[0.7em] h-px w-4 shrink-0',
                    onDark ? 'bg-marfil/40' : 'bg-marino/35',
                  ].join(' ')}
                />
                {amenidad}
              </li>
            ))}
          </ul>

          <Link
            to={`/contacto?habitacion=${room.slug}`}
            className={[
              'eyebrow mt-11 inline-flex min-h-[48px] items-center bg-dorado px-8 text-marino transition-colors duration-300 hover:bg-dorado/85',
              /* El anillo currentColor sería marino sobre marino (offset
                 3px lo dibuja fuera del botón): en tono oscuro se fuerza
                 a marfil para que el foco sea visible (WCAG 2.4.7). */
              onDark ? 'focus-visible:outline-marfil' : '',
            ].join(' ')}
          >
            {room.cta}
          </Link>
        </RevealItem>
      </div>
    </RevealGroup>
  );
}
