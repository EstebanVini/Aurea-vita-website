import { Link } from 'react-router-dom';

/**
 * Tarjeta del grid del Home (brief §5.3, variante simple):
 * foto 4:5 + eyebrow + título serif + texto + "Descubrir".
 * Toda la tarjeta es un único link accesible; el zoom de la foto
 * vive dentro de un contenedor con overflow oculto para que el
 * hover no provoque saltos de layout.
 *
 * Ratio de la foto (ronda 15 jun §9.3, ajustado por visual-designer):
 * el cliente pidió "fotos más pequeñas para que la composición de la
 * sección entre completa en pantalla". El paso 3:4→4:5 iba al revés
 * (4:5 = 0.80 es MÁS alto que 3:4 = 0.75). Se corrige a 4:3 (paisaje,
 * 1.33): cada tarjeta baja casi a la mitad de su alto, las tres + su
 * texto editorial entran completas en un viewport de escritorio y la
 * composición se lee como una sola unidad horizontal (eco del grid
 * editorial de SHA). Consistente en las tres tarjetas. El recorte
 * horizontal favorece fotos panorámicas (mesa servida, sala de masaje)
 * sin estirarlas; habitaciones_12 conserva su object-position 62%.
 *
 * Hover (brief §5.3 y §6.5): zoom de foto a scale(1.04) + elevación
 * sutil de toda la card (translateY, no layout) con sombra suave.
 */
export default function FeatureCard({
  to,
  image,
  eyebrow,
  title,
  text,
  linkLabel = 'Descubrir',
}) {
  return (
    <Link
      to={to}
      className="group block transition-transform duration-500 ease-out motion-safe:hover:-translate-y-1"
    >
      <div className="overflow-hidden shadow-marino/0 transition-shadow duration-500 group-hover:shadow-[0_28px_48px_-28px] group-hover:shadow-marino/35">
        <img
          src={image.src}
          alt={image.alt}
          width="940"
          height="627"
          loading="lazy"
          /* image.position permite reencuadrar fotos horizontales dentro
             del recorte 4:3 (p. ej. centrar la cama, no la cortina) */
          style={image.position ? { objectPosition: image.position } : undefined}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-6">
        {/* Eyebrow en marino/80, no dorado ni piedra: tres cards dorados
            romperían la regla de ≤3 dorados por viewport (brief §1.5) y
            piedra sobre arena da 3.93:1 — falla WCAG AA en 12px.
            marino/80 sobre arena: 5.4:1. */}
        <p className="eyebrow text-marino/80">{eyebrow}</p>
        <h3 className="mt-2 font-display text-3xl font-light text-marino">
          {title}
        </h3>
        <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-marino/75">
          {text}
        </p>
        {/* Sin cambio a dorado en hover: dorado sobre arena da 1.61:1
            (falla AA incluso como estado). El feedback de hover vive en
            la flecha, el zoom de la foto y la elevación de la card. */}
        <span className="eyebrow mt-6 inline-flex min-h-[44px] items-center gap-2.5 text-marino">
          {linkLabel}
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
        </span>
      </div>
    </Link>
  );
}
