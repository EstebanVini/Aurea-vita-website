import { usePageMeta } from '../hooks/usePageMeta.js';

/** Stub. El contenido completo se implementa en la fase Galería. */
export default function Galeria() {
  usePageMeta(
    'Galería · Aurea Vita Acapulco',
    'Un recorrido visual por Aurea Vita: vistas aéreas de la bahía, habitaciones, alberca infinita, gastronomía, spa y atardeceres en terraza.',
  );

  return (
    <section className="pt-20">
      <div className="mx-auto min-h-[55vh] max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <p className="eyebrow text-dorado">Galería</p>
        <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] font-light leading-tight">
          La casa, en imágenes
        </h1>
        <p className="mt-6 max-w-[65ch] text-lg text-piedra">
          Un recorrido visual por Aurea Vita y su costa. Lo único que falta es
          la temperatura del aire.
        </p>
      </div>
    </section>
  );
}
