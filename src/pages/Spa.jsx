import { usePageMeta } from '../hooks/usePageMeta.js';

/** Stub. El contenido completo se implementa en la fase Spa.
    Única página donde el eyebrow va en salvia (brief §4.4). */
export default function Spa() {
  usePageMeta(
    'Spa Vita — Spa & Bienestar · Aurea Vita Acapulco',
    'Rituales de descanso profundo frente al Pacífico: masajes, envolturas, faciales y circuito de aguas. Abierto todos los días de 9:00 a 20:00.',
  );

  return (
    <section className="pt-20">
      <div className="mx-auto min-h-[55vh] max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <p className="eyebrow text-oliva">Bienestar</p>
        <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] font-light leading-tight">
          Spa Vita
        </h1>
        <p className="mt-6 max-w-[65ch] text-lg text-piedra">
          Rituales de descanso profundo entre piedra, agua y aromas de la
          costa.
        </p>
      </div>
    </section>
  );
}
