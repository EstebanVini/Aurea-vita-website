import { usePageMeta } from '../hooks/usePageMeta.js';

/** Stub. El formulario completo se implementa en la fase Contacto. */
export default function Contacto() {
  usePageMeta(
    'Reservaciones y contacto · Aurea Vita Acapulco',
    'Cuéntanos tus fechas y nuestro concierge te responde el mismo día con disponibilidad. Av. Escénica 1200, Acapulco, Guerrero, México.',
  );

  return (
    <section className="pt-20">
      <div className="mx-auto min-h-[55vh] max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <p className="eyebrow text-dorado">Reservaciones</p>
        <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] font-light leading-tight">
          Empecemos por tus fechas
        </h1>
        <p className="mt-6 max-w-[65ch] text-lg text-piedra">
          Cuéntanos cuándo te gustaría venir y nuestro concierge te responderá
          el mismo día con disponibilidad y una propuesta a tu medida. Sin
          compromiso: una conversación, no una transacción.
        </p>
      </div>
    </section>
  );
}
