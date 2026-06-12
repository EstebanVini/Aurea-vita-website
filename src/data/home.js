/**
 * Datos listados de la página de inicio (docs/copy.md §2).
 * Las mayúsculas de los eyebrows se aplican vía CSS (utilidad `eyebrow`),
 * nunca en estos datos (copy §11).
 */

/** Grid de 3 tarjetas: Habitaciones / Gastronomía / Spa (copy §2.2). */
export const homeCards = [
  {
    to: '/habitaciones',
    eyebrow: 'Descanso',
    title: 'Habitaciones & Suites',
    text: 'Espacios serenos con vista al jardín o al mar, pensados para dormir con la ventana abierta.',
    image: {
      src: '/fotos_hotel/habitaciones/habitaciones_12.jpeg',
      alt: 'Suite con cama amplia en tonos arena y vista abierta al mar',
      /* La cama vive en el 60% derecho de la foto; el recorte 3:4
         centrado mostraba cortina y puerta en lugar del sujeto. */
      position: '62% 50%',
    },
  },
  {
    to: '/gastronomia',
    eyebrow: 'La mesa',
    title: 'Gastronomía',
    text: 'Cocina del Pacífico en Origen y atardeceres con coctel en mano en la terraza de Cielo.',
    image: {
      src: '/fotos_hotel/restaurante/restaurante_11.jpeg',
      alt: 'Mesa servida del restaurante Origen con vista a la bahía al atardecer',
    },
  },
  {
    to: '/spa',
    eyebrow: 'Bienestar',
    title: 'Spa Vita',
    text: 'Rituales de descanso profundo entre piedra, agua y aromas de la costa.',
    image: {
      src: '/fotos_hotel/spa/spa_01.jpeg',
      alt: 'Sala de masaje del Spa Vita con camilla sobre piso de mármol',
    },
  },
];

/** Datos del destino en serif grande (copy §2.3). */
export const destinoStats = [
  { valor: '300', detalle: 'días de sol al año' },
  { valor: '27°', detalle: 'temperatura media del agua' },
  /* Cifra pura, como "300" y "27°": las tres columnas comparten la misma
     anatomía (número gigante en serif + detalle) sin saltos de línea. */
  { valor: '12', detalle: 'minutos de la bahía de Santa Lucía' },
];

/**
 * Strip de alberca/terraza (copy §2.4). Del set terraza solo está
 * permitida terraza_13 aquí (brief §4.8).
 */
export const momentosFotos = [
  {
    src: '/fotos_hotel/alberca/alberca_05.jpeg',
    alt: 'Alberca infinita de Aurea Vita fundiéndose con el horizonte del Pacífico',
  },
  {
    src: '/fotos_hotel/alberca/alberca_02.jpeg',
    alt: 'Camastros junto a la alberca bajo la sombra de palmeras',
  },
  {
    src: '/fotos_hotel/alberca/alberca_14.jpeg',
    alt: 'Alberca iluminada al caer la noche, con el cielo en tonos azules',
  },
  {
    src: '/fotos_hotel/alberca/alberca_10.jpeg',
    alt: 'Detalle del agua quieta de la alberca reflejando la luz de la tarde',
  },
  {
    src: '/fotos_hotel/terraza/terraza_13.jpeg',
    alt: 'Terraza del bar Cielo al crepúsculo, con luces cálidas y vista abierta',
  },
];
