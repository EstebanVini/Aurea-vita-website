/**
 * Galería — selección curada de Aurea Vita (docs/brief.md §4.6,
 * copy §7.2 y §7.3).
 *
 * Solo las ~60 fotos aprobadas, no las 120 del catálogo. La curaduría
 * por categoría es exactamente la del brief §4.6 (lista negra §4.8
 * aplicada): habitaciones sin 08/09, lobby solo las cinco sin
 * cubrebocas, terraza ÚNICAMENTE 03/10/13 en todo el sitio. Todas las
 * fotos de la selección son `.jpeg` — lobby_13 (.png) y terraza_09
 * (.jpg) quedan fuera de la curaduría, así que no hay excepciones de
 * extensión que manejar (brief §4.6, casos extremos). Ruta fija:
 * /fotos_hotel/<categoria>/<categoria>_NN.jpeg.
 *
 * Cada item es { src, alt, category } donde `category` es uno de los 8
 * ids que coinciden con el nombre de carpeta (copy §11). Los textos
 * alt son los EXACTOS de copy §7.3, lugar + qué se ve + atmósfera.
 *
 * Las mayúsculas de las etiquetas las pone CSS (utilidad `eyebrow` /
 * uppercase), nunca estos datos (copy §11): `fachadas` se escribe en
 * minúscula como id, pero su etiqueta visible es "Arquitectura".
 */

/**
 * Filtros de la galería (copy §7.2). El orden es el del copy: "Todas"
 * primero, luego las 8 categorías. El id `todas` es el estado por
 * defecto (muestra toda la selección); el resto coincide con el
 * nombre de carpeta salvo `fachadas` → etiqueta "Arquitectura".
 */
export const galleryFilters = [
  { id: 'todas', label: 'Todas' },
  { id: 'aereas', label: 'Vistas aéreas' },
  { id: 'alberca', label: 'Alberca' },
  { id: 'fachadas', label: 'Arquitectura' },
  { id: 'habitaciones', label: 'Habitaciones' },
  { id: 'lobby', label: 'Lobby' },
  { id: 'restaurante', label: 'Restaurante' },
  { id: 'spa', label: 'Spa' },
  { id: 'terraza', label: 'Terraza' },
];

/**
 * Texto de respaldo para un filtro sin fotos (copy §7.2). No debería
 * ocurrir —toda categoría tiene fotos—, pero la galería lo implementa.
 */
export const galleryEmpty = {
  texto:
    'Aún no hay fotografías en esta categoría. Mira todas las imágenes mientras tanto.',
  link: 'Ver todas',
};

/**
 * Relación de aspecto (ancho/alto) real de cada foto curada, medida
 * desde el archivo. La galería la usa para reservar el espacio exacto
 * con `aspect-ratio` ANTES de que la imagen cargue: el masonry no da
 * saltos al ir cargando (brief §4.6, casos extremos). Toda la
 * selección es horizontal (1.1–1.78); la varianza de alto dentro de
 * cada columna nace de esa diferencia de proporción.
 */
const RATIOS = {
  aereas_01: 1.334, aereas_02: 1.777, aereas_04: 1.334, aereas_05: 1.502,
  aereas_06: 1.334, aereas_08: 1.334, aereas_09: 1.777, aereas_10: 1.334,
  aereas_11: 1.334, aereas_12: 1.777, aereas_15: 1.334,
  alberca_01: 1.378, alberca_02: 1.509, alberca_04: 1.499, alberca_05: 1.499,
  alberca_06: 1.499, alberca_07: 1.499, alberca_10: 1.497, alberca_11: 1.497,
  alberca_13: 1.334, alberca_14: 1.499, alberca_15: 1.499,
  fachadas_04: 1.499, fachadas_05: 1.499, fachadas_09: 1.118, fachadas_10: 1.499,
  fachadas_12: 1.451, fachadas_14: 1.499, fachadas_15: 1.499,
  habitaciones_01: 1.499, habitaciones_02: 1.499, habitaciones_03: 1.499,
  habitaciones_04: 1.334, habitaciones_05: 1.499, habitaciones_06: 1.334,
  habitaciones_07: 1.777, habitaciones_10: 1.499, habitaciones_11: 1.499,
  habitaciones_12: 1.499, habitaciones_13: 1.334, habitaciones_14: 1.499,
  habitaciones_15: 1.497,
  lobby_05: 1.499, lobby_07: 1.476, lobby_08: 1.499, lobby_12: 1.499,
  lobby_15: 1.499,
  restaurante_01: 1.499, restaurante_03: 1.499, restaurante_06: 1.499,
  restaurante_07: 1.499, restaurante_09: 1.499, restaurante_11: 1.389,
  restaurante_12: 1.499, restaurante_13: 1.499, restaurante_14: 1.499,
  restaurante_15: 1.777,
  spa_01: 1.499, spa_02: 1.499, spa_03: 1.655, spa_04: 1.499, spa_05: 1.499,
  spa_06: 1.334, spa_09: 1.499, spa_10: 1.499, spa_12: 1.499, spa_13: 1.499,
  spa_15: 1.784,
  terraza_03: 1.499, terraza_10: 1.499, terraza_13: 1.499,
};

/**
 * Construye una entrada de foto. `n` es el número curado; se rellena a
 * dos dígitos para casar con el nombre del archivo (aereas_01.jpeg).
 */
function foto(category, n, alt) {
  const nn = String(n).padStart(2, '0');
  const id = `${category}_${nn}`;
  return {
    src: `/fotos_hotel/${category}/${id}.jpeg`,
    alt,
    category,
    ratio: RATIOS[id],
  };
}

/**
 * Selección curada, en orden de categoría (brief §4.6) y dentro de
 * cada categoría en el orden del archivo. El grid masonry mezcla
 * orientaciones de forma deliberada al recorrer este array tal cual.
 * Textos alt EXACTOS de copy §7.3.
 */
export const galleryPhotos = [
  // aereas — 01,02,04,05,06,08,09,10,11,12,15
  foto('aereas', 1, 'Vista aérea de la costa del Pacífico con playa extensa'),
  foto('aereas', 2, 'Bahía de Acapulco vista desde el aire con aguas turquesa'),
  foto('aereas', 4, 'Manglares y vegetación costera vistos desde el aire'),
  foto('aereas', 5, 'Línea de costa con oleaje suave vista desde el aire'),
  foto('aereas', 6, 'Playa y montañas de la costa de Guerrero desde el aire'),
  foto('aereas', 8, 'Acantilados cayendo al mar en la costa de Acapulco'),
  foto('aereas', 9, 'Costa bajo la luz dorada de la mañana, vista aérea'),
  foto('aereas', 10, 'Panorámica aérea de la bahía y la ciudad de Acapulco'),
  foto('aereas', 11, 'Costa turquesa y cielo despejado del Pacífico desde el aire'),
  foto('aereas', 12, 'Vista aérea del litoral con vegetación y mar abierto'),
  foto('aereas', 15, 'Atardecer sobre la bahía de Acapulco visto desde el aire'),

  // alberca — 01,02,04,05,06,07,10,11,13,14,15
  foto('alberca', 1, 'Alberca de Aurea Vita rodeada de vegetación'),
  foto('alberca', 2, 'Camastros y palmeras junto a la alberca'),
  foto('alberca', 4, 'Borde de la alberca con vista hacia el mar'),
  foto('alberca', 5, 'Alberca infinita fundiéndose con el horizonte del Pacífico'),
  foto('alberca', 6, 'Reflejos de la luz del mediodía en el agua de la alberca'),
  foto('alberca', 7, 'Desayuno servido junto a la alberca por la mañana'),
  foto('alberca', 10, 'Agua en calma de la alberca reflejando la luz de la tarde'),
  foto('alberca', 11, 'Área de descanso a la sombra junto a la alberca'),
  foto('alberca', 13, 'Alberca y terraza bajo un cielo despejado'),
  foto('alberca', 14, 'Alberca iluminada al caer la noche'),
  foto('alberca', 15, 'Nado en alberca rodeada de entorno natural'),

  // fachadas (Arquitectura) — 04,05,09,10,12,14,15
  foto('fachadas', 4, 'Fachada de Aurea Vita con vegetación tropical'),
  foto('fachadas', 5, 'Muro del hotel cubierto de enredadera bajo la luz del día'),
  foto('fachadas', 9, 'Entrada principal de Aurea Vita con acceso ceremonial'),
  foto('fachadas', 10, 'Fachada del hotel bañada por la luz de la tarde'),
  foto('fachadas', 12, 'Detalle arquitectónico de la fachada entre palmeras'),
  foto('fachadas', 14, 'Arquitectura del hotel enmarcada por jardines'),
  foto('fachadas', 15, 'Vista exterior del edificio principal al atardecer'),

  // habitaciones — 01,02,03,04,05,06,07,10,11,12,13,14,15 (sin 08 ni 09)
  foto('habitaciones', 1, 'Cama vestida en tonos claros con luz natural'),
  foto('habitaciones', 2, 'Interior de suite con textiles claros y luz suave'),
  foto('habitaciones', 3, 'Recámara en tonos marfil y arena'),
  foto('habitaciones', 4, 'Rincón de lectura junto a la ventana de la habitación'),
  foto('habitaciones', 5, 'Suite con ventanales abiertos hacia el Pacífico'),
  foto('habitaciones', 6, 'Comedor privado de la suite con luz de día'),
  foto('habitaciones', 7, 'Área de estar de la suite con sillones claros'),
  foto('habitaciones', 10, 'Sala de estar de la suite con luz de la tarde'),
  foto('habitaciones', 11, 'Detalle del área de descanso de la habitación'),
  foto('habitaciones', 12, 'Suite con cama amplia y vista abierta al mar'),
  foto('habitaciones', 13, 'Habitación con luz verde filtrada del jardín'),
  foto('habitaciones', 14, 'Baño con acabados en piedra clara'),
  foto('habitaciones', 15, 'Terraza privada de la suite con vista exterior'),

  // lobby — 05,07,08,12,15 (solo las sin cubrebocas)
  foto('lobby', 5, 'Lobby de Aurea Vita con arquitectura de doble altura'),
  foto('lobby', 7, 'Área de recepción con mobiliario en tonos cálidos'),
  foto('lobby', 8, 'Sala de estar del lobby con luz natural'),
  foto('lobby', 12, 'Detalle del mobiliario y materiales del lobby'),
  foto('lobby', 15, 'Pasillo del lobby abierto hacia los jardines'),

  // restaurante — 01,03,06,07,09,11,12,13,14,15
  foto('restaurante', 1, 'Techo de redes náuticas tejidas en el comedor de Origen'),
  foto('restaurante', 3, 'Cena íntima en una mesa de Origen a la luz de las velas'),
  foto('restaurante', 6, 'Mesa montada en Origen con vajilla artesanal'),
  foto('restaurante', 7, 'Comedor de Origen con vista hacia el exterior'),
  foto('restaurante', 9, 'Chef de Origen trabajando en la cocina'),
  foto('restaurante', 11, 'Mesa servida frente a la bahía bajo la luz dorada'),
  foto('restaurante', 12, 'Desayuno en la terraza verde de Origen'),
  foto('restaurante', 13, 'Detalle de platillos de cocina del Pacífico en Origen'),
  foto('restaurante', 14, 'Cena en Origen con el horizonte crepuscular al fondo'),
  foto('restaurante', 15, 'Barra y comedor de Origen al caer la tarde'),

  // spa — 01,02,03,04,05,06,09,10,12,13,15
  foto('spa', 1, 'Camilla de masaje sobre piso de mármol en penumbra serena'),
  foto('spa', 2, 'Sala de tratamientos del Spa Vita en tonos neutros'),
  foto('spa', 3, 'Tina de piedra orgánica junto a un muro de textura natural'),
  foto('spa', 4, 'Área de relajación del spa con luz tenue'),
  foto('spa', 5, 'Detalle de toallas y amenidades del Spa Vita'),
  foto('spa', 6, 'Alberca de inmersión del circuito de aguas en penumbra'),
  foto('spa', 9, 'Vela encendida y difusor de aromaterapia'),
  foto('spa', 10, 'Espacio de descanso del spa con camastros'),
  foto('spa', 12, 'Sala de masaje con vista hacia la vegetación'),
  foto('spa', 13, 'Salón panorámico del spa con ventanales amplios'),
  foto('spa', 15, 'Aceites y sales del Spa Vita en composición de tonos arena'),

  // terraza — SOLO 03,10,13 en todo el sitio (brief §4.8)
  foto('terraza', 3, 'Terraza de Cielo durante el día con vista despejada'),
  foto('terraza', 10, 'Lounge de Cielo con iluminación cálida de noche'),
  foto('terraza', 13, 'Terraza de Cielo al crepúsculo con luces encendidas'),
];
