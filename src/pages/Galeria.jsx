import { useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta.js';
import Reveal from '../components/Reveal.jsx';
import Lightbox from '../components/Lightbox.jsx';
import { EASE_OUT } from '../lib/motion.js';
import {
  galleryEmpty,
  galleryFilters,
  galleryPhotos,
} from '../data/gallery.js';

/**
 * Página /galeria (brief §4.6, copy §7 y §10) — la más técnica del
 * sitio. La galería ES la foto: header compacto (sin hero
 * fotográfico), filtros por categoría y grid masonry que abre un
 * Lightbox accesible.
 *
 * La navbar inicia sólida en /galeria (no está en HERO_ROUTES), así
 * que el contenido arranca bajo la barra fija de ~80px: el header
 * lleva `pt-32` (≈128px) para respirar sin quedar tapado.
 *
 * Masonry (brief §4.6): se resuelve con CSS `columns`, no con JS de
 * layout ni librería. Cada foto es un `<button>` con su `aspect-ratio`
 * real reservado desde los datos (gallery.js → ratio), de modo que el
 * masonry NO da saltos mientras las imágenes cargan. 2 columnas en
 * móvil, 3 en tablet, 4 en desktop. El recorrido del array mezcla
 * orientaciones de forma deliberada.
 *
 * Filtros (brief §6, "dónde NO animar"): el cambio de filtro es un
 * crossfade simple del grid completo (opacity, ~220ms), NUNCA un
 * re-layout animado tipo FLIP por foto (costoso y mareante con 60
 * fotos). Se logra re-montando el grid con `key={filtro}` y un fade de
 * entrada; con reduced-motion el cambio es instantáneo. El pill activo
 * lleva `aria-pressed`.
 *
 * Lightbox: el índice activo se guarda contra la lista FILTRADA
 * visible, de modo que el contador "N de Total" y las flechas siempre
 * recorren lo que el usuario ve. La navegación es circular (módulo).
 * `direction` alimenta el slide del visor. Al cerrar, el foco vuelve
 * al thumbnail de origen (triggerRef apunta al botón pulsado).
 */
export default function Galeria() {
  usePageMeta(
    'Galería · Aurea Vita Acapulco',
    'Un recorrido visual por Aurea Vita: vistas aéreas de la bahía, habitaciones, alberca infinita, gastronomía, spa y atardeceres en terraza.',
  );

  const reduceMotion = useReducedMotion();

  const [filtro, setFiltro] = useState('todas');
  /* Lightbox: índice dentro de la lista filtrada (null = cerrado) y
     sentido del último cambio para el slide. */
  const [activo, setActivo] = useState(null);
  const [direction, setDirection] = useState(1);
  /* Nodo del thumbnail que abrió el visor: el Lightbox le devuelve el
     foco al cerrarse (WCAG 2.4.3). */
  const triggerRef = useRef(null);

  const fotos = useMemo(
    () =>
      filtro === 'todas'
        ? galleryPhotos
        : galleryPhotos.filter((f) => f.category === filtro),
    [filtro],
  );

  const vacio = fotos.length === 0;

  /* Cambiar de filtro cierra cualquier visor abierto: el índice activo
     dejaría de tener sentido contra la nueva lista. */
  function cambiarFiltro(id) {
    setActivo(null);
    setFiltro(id);
  }

  function abrir(indice, evento) {
    triggerRef.current = evento.currentTarget;
    setDirection(1);
    setActivo(indice);
  }

  function cerrar() {
    setActivo(null);
  }

  function siguiente() {
    setDirection(1);
    setActivo((i) => (i + 1) % fotos.length);
  }

  function anterior() {
    setDirection(-1);
    setActivo((i) => (i - 1 + fotos.length) % fotos.length);
  }

  return (
    <>
      {/* Header compacto (copy §7.1): sin foto. La galería ES la foto,
          así que el header no compite — mismo lenguaje tipográfico que
          SectionHeading (eyebrow dorado → H1 serif ligera → línea dorada
          de 48px → intro), sólo que como H1 de página. pt-32 libra la
          navbar fija sólida de /galeria; pb generoso para que el cambio
          a la retícula de fotos se sienta como una exhalación (§1.3). */}
      <section className="bg-marfil pt-32 pb-12 lg:pt-40 lg:pb-16">
        <Reveal className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <p className="eyebrow text-dorado">Galería</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-light leading-[1.1] text-balance text-marino sm:text-5xl lg:text-6xl">
            La casa, en imágenes
          </h1>
          <div className="mt-7 h-px w-12 bg-dorado" aria-hidden="true" />
          <p className="mt-7 max-w-[60ch] text-base leading-relaxed text-marino/80 sm:text-lg">
            Un recorrido visual por Aurea Vita y su costa. Lo único que falta es
            la temperatura del aire.
          </p>
        </Reveal>
      </section>

      {/* Fila de filtros (brief §4.6, copy §7.2): pills con scroll
          horizontal en móvil. Sticky bajo la navbar (top-20 = 80px). Un
          solo filete arena abajo —no doble borde— para que la barra se
          lea como una continuación del header, no como una caja. El
          activo lleva aria-pressed y fondo marino sólido (marfil sobre
          marino = AA); los inactivos viven sin caja, sólo texto piedra
          con un filete dorado que crece al hover —mismo gesto que los
          links de la navbar—, evitando la estética de "botón genérico".
          Scroll horizontal sin barra fea (patrón del Home/Experiencias).
          Touch targets ≥44px. role="group" con etiqueta para el lector. */}
      <section className="sticky top-20 z-30 border-b border-arena bg-marfil/95 backdrop-blur-sm">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div
            role="group"
            aria-label="Filtrar fotografías por categoría"
            className="-mx-5 flex gap-1 overflow-x-auto px-5 py-3 sm:mx-0 sm:flex-wrap sm:gap-1.5 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {galleryFilters.map((f) => {
              const activoFiltro = f.id === filtro;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => cambiarFiltro(f.id)}
                  aria-pressed={activoFiltro}
                  className={[
                    'eyebrow group relative inline-flex min-h-[44px] shrink-0 items-center whitespace-nowrap px-3.5 transition-colors duration-200 sm:px-4',
                    activoFiltro
                      ? 'bg-marino text-marfil'
                      : 'text-piedra hover:text-marino',
                  ].join(' ')}
                >
                  {f.label}
                  {/* Filete dorado del estado inactivo: aparece bajo la
                      etiqueta al hover, crece desde la izquierda. En el
                      activo no se dibuja (el fondo marino ya marca el
                      estado). Decorativo. */}
                  {!activoFiltro && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-3.5 bottom-2 h-px origin-left scale-x-0 bg-dorado transition-transform duration-300 ease-out group-hover:scale-x-100 sm:inset-x-4"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid masonry o mensaje de respaldo (copy §7.2). */}
      <section className="bg-marfil pb-24 pt-10 lg:pb-32 lg:pt-14">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          {vacio ? (
            <div className="py-20 text-center">
              <p className="mx-auto max-w-[48ch] text-base leading-relaxed text-marino/75 sm:text-lg">
                {galleryEmpty.texto}
              </p>
              <button
                type="button"
                onClick={() => cambiarFiltro('todas')}
                className="eyebrow mt-6 inline-flex min-h-[44px] items-center text-marino underline decoration-dorado decoration-2 underline-offset-4 transition-colors hover:text-dorado"
              >
                {galleryEmpty.link}
              </button>
            </div>
          ) : (
            /* Crossfade del grid al cambiar de filtro: re-montaje por
               key + fade de opacity. Sin FLIP, sin reordenamiento
               animado. Con reduced-motion el fade es instantáneo. */
            <motion.div
              key={filtro}
              initial={{ opacity: reduceMotion ? 1 : 0 }}
              animate={{
                opacity: 1,
                transition: { duration: reduceMotion ? 0 : 0.22, ease: EASE_OUT },
              }}
              /* `columns` resuelve el masonry; gap entre columnas y
                 filas. Las fotos no deben partirse entre columnas. */
              className="columns-2 gap-3 sm:gap-4 lg:columns-3 xl:columns-4"
            >
              {fotos.map((foto, indice) => (
                <button
                  key={foto.src}
                  type="button"
                  onClick={(evento) => abrir(indice, evento)}
                  aria-label={`Ampliar fotografía ${indice + 1} de ${fotos.length}: ${foto.alt}`}
                  className="group relative mb-3 block w-full overflow-hidden text-marino focus-visible:outline-marino sm:mb-4"
                  /* Reserva el alto exacto desde el ratio real: el
                     masonry no salta al cargar (brief §4.6). break-inside
                     evita que una foto se corte entre columnas. */
                  style={{
                    aspectRatio: String(foto.ratio),
                    breakInside: 'avoid',
                  }}
                >
                  {/* alt="" a propósito: el nombre accesible ya lo da el
                      aria-label del botón contenedor (que incluye la
                      descripción de la foto). Dejar el alt aquí lo
                      duplicaría en el lector — mismo patrón que los
                      thumbnails de RoomCard. */}
                  <img
                    src={foto.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.04]"
                  />
                  {/* Velo marino sutil al hover (nunca negro, §1.1):
                      reafirma que la foto es interactiva sin robarle
                      protagonismo. Sólo opacity, decorativo. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-marino/0 transition-colors duration-500 ease-out group-hover:bg-marino/10"
                  />
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Lightbox
        photos={fotos}
        index={activo}
        direction={direction}
        onClose={cerrar}
        onPrev={anterior}
        onNext={siguiente}
        triggerRef={triggerRef}
      />
    </>
  );
}
