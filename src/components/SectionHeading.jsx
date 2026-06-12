/**
 * Patrón fijo de encabezado de sección (brief §5.6):
 * eyebrow → título display → línea dorada de 48px → párrafo(s) opcional(es).
 *
 * Props:
 * - eyebrow:   etiqueta corta (las mayúsculas las pone la utilidad CSS).
 * - title:     título de la sección, en serif ligera.
 * - as:        etiqueta del título ('h2' por defecto; 'h1' en encabezados de página).
 * - align:     'left' (por defecto) | 'center' (bandas CTA).
 * - tone:      tono del fondo donde vive el encabezado:
 *              'light' → texto marino sobre marfil/arena (por defecto)
 *              'dark'  → texto marfil sobre marino/foto con overlay.
 * - eyebrowClassName: color del eyebrow. Por defecto depende del tono:
 *              text-dorado sobre marino (5.8:1, AA) y text-marino sobre
 *              marfil/arena — el dorado sobre claros da 1.86:1 y falla
 *              WCAG AA en texto de 12px; en tono claro el dorado vive
 *              en la línea decorativa, no en el texto.
 * - children:  párrafos del bloque (se renderizan con espaciado editorial).
 */
export default function SectionHeading({
  eyebrow,
  title,
  as: Tag = 'h2',
  align = 'left',
  tone = 'light',
  eyebrowClassName,
  children,
}) {
  const centered = align === 'center';
  const onDark = tone === 'dark';
  const eyebrowColor =
    eyebrowClassName ?? (onDark ? 'text-dorado' : 'text-marino');

  return (
    <div className={centered ? 'flex flex-col items-center text-center' : ''}>
      <p className={['eyebrow', eyebrowColor].join(' ')}>{eyebrow}</p>
      <Tag
        className={[
          /* Escala display generosa (brief §1.2): la serif ligera a gran
             tamaño ES el lujo. En desktop sube a 3.75rem para sostener el
             contraste de escala frente al cuerpo en Jost. */
          'mt-4 max-w-2xl font-display text-4xl font-light leading-[1.1] text-balance sm:text-5xl lg:text-6xl',
          onDark ? 'text-marfil' : 'text-marino',
        ].join(' ')}
      >
        {title}
      </Tag>
      <div className="mt-7 h-px w-12 bg-dorado" aria-hidden="true" />
      {children && (
        <div
          className={[
            'mt-7 max-w-[65ch] space-y-5 text-base leading-relaxed sm:text-lg',
            onDark ? 'text-marfil/85' : 'text-marino/80',
          ].join(' ')}
        >
          {children}
        </div>
      )}
    </div>
  );
}
