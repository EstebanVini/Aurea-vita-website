import { usePageMeta } from '../hooks/usePageMeta.js';

/** Stub. El contenido completo se implementa en la fase Experiencias. */
export default function Experiencias() {
  usePageMeta(
    'Experiencias · Aurea Vita Acapulco',
    'Alberca infinita, atardeceres en la terraza de Cielo y salidas por Acapulco: vela en la bahía, La Quebrada, manglares de Coyuca y el viejo puerto.',
  );

  return (
    <section className="pt-20">
      <div className="mx-auto min-h-[55vh] max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <p className="eyebrow text-dorado">Experiencias</p>
        <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] font-light leading-tight">
          Maneras de pasar el día
        </h1>
        <p className="mt-6 max-w-[65ch] text-lg text-piedra">
          Dentro de la casa o bahía adentro: aquí nadie programa tu agenda,
          pero sí la habilitamos.
        </p>
      </div>
    </section>
  );
}
