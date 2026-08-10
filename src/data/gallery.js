/**
 * Galería — selección curada de la fotografía DEFINITIVA del cliente
 * (agosto 2026, inventario en docs/fotos/catalogo-definitivas.md).
 *
 * Fuente única: `public/fotos/<categoria>/<categoria>_NN.jpg`. El set
 * demo `public/fotos_hotel/` se eliminó por completo; ninguna ruta de
 * este archivo apunta ya ahí, y la extensión pasó de `.jpeg` a `.jpg`
 * (versiones web: máx. 1600px, JPEG q80 progresivo).
 *
 * Siete categorías reales — alberca, fachadas, habitaciones, lobby,
 * restaurante, spa, terraza. La entrega del cliente NO incluye ninguna
 * toma aérea/dron, así que la categoría `aereas` desaparece del sitio
 * (decisión aprobada por el cliente).
 *
 * Curaduría (72 de 120): entran todas las fotos de calidad 4 y 5 del
 * catálogo y se completa con calidad 3; nada de calidad ≤ 2 llega al
 * grid. La excepción es `restaurante`: tiene 45 archivos y una treintena
 * son primeros planos de comida casi intercambiables (cocos, parfaits,
 * aguas frescas, tés), así que se limita a 15 con un tope de dos fotos
 * por motivo para que la galería no se convierta en un menú. En las
 * categorías con poco material (fachadas, lobby, spa) la selección es
 * deliberadamente generosa.
 *
 * Cada item es { src, alt, category, ratio } — la forma que consume
 * src/pages/Galeria.jsx (masonry + Lightbox). `category` coincide con el
 * nombre de la carpeta. Los textos alt son los EXACTOS del catálogo, en
 * el estilo editorial aprobado: lugar + qué se ve + atmósfera.
 *
 * Las mayúsculas de las etiquetas las pone CSS (utilidad `eyebrow` /
 * uppercase), nunca estos datos: `fachadas` se escribe en minúscula como
 * id, pero su etiqueta visible es "Arquitectura".
 */

/**
 * Filtros de la galería. "Todas" primero (estado por defecto, muestra
 * toda la selección) y luego las 7 categorías reales ordenadas por
 * etiqueta visible; cada id coincide con el nombre de carpeta salvo
 * `fachadas` → etiqueta "Arquitectura".
 */
export const galleryFilters = [
  { id: 'todas', label: 'Todas' },
  { id: 'alberca', label: 'Alberca' },
  { id: 'fachadas', label: 'Arquitectura' },
  { id: 'habitaciones', label: 'Habitaciones' },
  { id: 'lobby', label: 'Lobby' },
  { id: 'restaurante', label: 'Restaurante' },
  { id: 'spa', label: 'Spa' },
  { id: 'terraza', label: 'Terraza' },
];

/**
 * Texto de respaldo para un filtro sin fotos. No debería ocurrir —las
 * siete categorías tienen selección—, pero la galería lo implementa.
 */
export const galleryEmpty = {
  texto:
    'Aún no hay fotografías en esta categoría. Mira todas las imágenes mientras tanto.',
  link: 'Ver todas',
};

/**
 * Relación de aspecto (ancho/alto) real de cada foto curada, medida
 * sobre el archivo web y transcrita del catálogo. La galería la usa para
 * reservar el espacio exacto con `aspect-ratio` ANTES de que la imagen
 * cargue: el masonry no da saltos al ir cargando.
 *
 * La entrega definitiva se disparó casi entera en 3:2 (1.501), así que
 * el rango útil es estrecho: sólo diez fotos se salen de esa proporción
 * (1.286–1.818) y son las que introducen varianza de alto entre
 * columnas. El masonry sigue funcionando, pero se lee más regular que
 * con el set anterior.
 */
const RATIOS = {
  alberca_01: 1.501, alberca_02: 1.501, alberca_03: 1.501, alberca_04: 1.501,
  alberca_05: 1.501, alberca_06: 1.501, alberca_08: 1.501, alberca_09: 1.501,
  alberca_10: 1.501, alberca_11: 1.501, alberca_12: 1.501,
  fachadas_01: 1.501, fachadas_02: 1.501, fachadas_03: 1.501, fachadas_04: 1.501,
  habitaciones_01: 1.501, habitaciones_02: 1.501, habitaciones_03: 1.501,
  habitaciones_06: 1.501, habitaciones_07: 1.501, habitaciones_08: 1.501,
  habitaciones_10: 1.501, habitaciones_12: 1.501, habitaciones_13: 1.501,
  habitaciones_15: 1.501, habitaciones_16: 1.501, habitaciones_18: 1.501,
  habitaciones_19: 1.501, habitaciones_20: 1.501, habitaciones_25: 1.501,
  habitaciones_26: 1.501, habitaciones_27: 1.501, habitaciones_28: 1.501,
  habitaciones_29: 1.501,
  lobby_01: 1.501, lobby_02: 1.501, lobby_03: 1.501, lobby_04: 1.501,
  lobby_05: 1.501, lobby_06: 1.501, lobby_07: 1.501,
  restaurante_05: 1.501, restaurante_06: 1.501, restaurante_11: 1.501,
  restaurante_14: 1.501, restaurante_16: 1.501, restaurante_17: 1.501,
  restaurante_19: 1.501, restaurante_22: 1.667, restaurante_23: 1.605,
  restaurante_29: 1.818, restaurante_31: 1.501, restaurante_39: 1.501,
  restaurante_42: 1.501, restaurante_44: 1.501, restaurante_45: 1.501,
  spa_02: 1.501, spa_05: 1.608, spa_06: 1.501, spa_07: 1.597, spa_09: 1.501,
  spa_10: 1.501, spa_11: 1.286,
  terraza_01: 1.501, terraza_02: 1.501, terraza_03: 1.501, terraza_04: 1.501,
  terraza_05: 1.501, terraza_06: 1.501, terraza_07: 1.341, terraza_08: 1.481,
  terraza_10: 1.501,
};

/**
 * Construye una entrada de foto. `n` es el número del catálogo; se
 * rellena a dos dígitos para casar con el nombre del archivo
 * (alberca_02.jpg). Ruta fija: /fotos/<categoria>/<categoria>_NN.jpg.
 */
function foto(category, n, alt) {
  const nn = String(n).padStart(2, '0');
  const id = `${category}_${nn}`;
  return {
    src: `/fotos/${category}/${id}.jpg`,
    alt,
    category,
    ratio: RATIOS[id],
  };
}

/**
 * Selección curada (72 fotos), agrupada por categoría en el mismo orden
 * que los filtros y, dentro de cada categoría, en el orden del catálogo.
 * El grid masonry recorre este array tal cual, así que el agrupamiento
 * también define el ritmo del scroll: se entra por la alberca al
 * crepúsculo, se pasa por arquitectura y habitaciones, y se cierra con
 * los atardeceres de terraza. Textos alt EXACTOS del catálogo.
 */
export const galleryPhotos = [
  // alberca — 11 de 12 (fuera: 07, borde de mosaico redundante con 06)
  foto('alberca', 1, 'Alberca iluminada al anochecer junto al edificio, aguas azules en calma'),
  foto('alberca', 2, 'Alberca infinita frente al Pacífico bajo el azul profundo del crepúsculo'),
  foto('alberca', 3, 'Piscina turquesa y camastros con el mar abriéndose al horizonte nocturno'),
  foto('alberca', 4, 'Borde infinito de la alberca sobre el océano en penumbra tropical'),
  foto('alberca', 5, 'Camastros a la orilla de la alberca con sombrero de palma al sol'),
  foto('alberca', 6, 'Sombrilla azul y camastros alineados junto al espejo de agua'),
  foto('alberca', 8, 'Alberca infinita enmarcada por palmeras frente al horizonte marino'),
  foto('alberca', 9, 'Dispensador de agua de pepino junto a la alberca frente al océano'),
  foto('alberca', 10, 'Alberca de mosaico azul al pie de los ventanales iluminados del hotel'),
  foto('alberca', 11, 'Alberca de mosaico cobalto con camastros alineados junto al edificio principal'),
  foto('alberca', 12, 'Alberca y jacuzzi abiertos al Pacífico con camastros sobre deck de madera'),

  // fachadas (Arquitectura) — 4 de 6 (fuera: 05 y 06, calidad 2)
  foto('fachadas', 1, 'Fachada blanca del hotel sobre jardín abierto con torre celosía de acero'),
  foto('fachadas', 2, 'Torre escultórica de celosía y acceso principal enmarcados por palapa de palma'),
  foto('fachadas', 3, 'Arquitectura contemporánea del hotel vista desde el jardín bajo palapa'),
  foto('fachadas', 4, 'Palapa de palma sobre jardín extendido hacia la línea de palmeras del Pacífico'),

  // habitaciones — 19 de 29: todas las de calidad 4 y 5, más 12 y 19
  // (los otros calidad 3 repetían cama de lino, vestidor o charola de té)
  foto('habitaciones', 1, 'Suite amplia con ventanales abiertos al océano y sala de estar'),
  foto('habitaciones', 2, 'Servicio de té de cortesía en la terraza privada de la suite'),
  foto('habitaciones', 3, 'Suite principal con cabecera de madera curva y luz de jardín'),
  foto('habitaciones', 6, 'Suite doble con camas gemelas, madera cálida y luz natural'),
  foto('habitaciones', 7, 'Habitación doble con libreros de madera y arte gráfico en muro'),
  foto('habitaciones', 8, 'Suite amplia de dos camas con techo alto y piso de mármol claro'),
  foto('habitaciones', 10, 'Recámara king con vestidor abierto y banca al pie de cama'),
  foto('habitaciones', 12, 'Toallas dobladas junto a lavabo de ónix en baño de mármol negro'),
  foto('habitaciones', 13, 'Baño de suite con doble lavabo de ónix, orquídeas y regadera de cristal'),
  foto('habitaciones', 15, 'Suite king con vestidor de nogal y marina enmarcada sobre la cama'),
  foto('habitaciones', 16, 'Recámara luminosa con clóset abierto, sillón y paleta de maderas cálidas'),
  foto('habitaciones', 18, 'Suite king con clóset integrado, televisión y arte costero'),
  foto('habitaciones', 19, 'Cama king al amanecer con repisas de madera y textiles blancos'),
  foto('habitaciones', 20, 'Baño con tina exenta, mármol negro y lavabo de ónix bajo luz natural'),
  foto('habitaciones', 25, 'Vestidor de suite en madera con butaca blanca y luz indirecta'),
  foto('habitaciones', 26, 'Suite principal con cama vestida en lino blanco y luz natural del Pacífico'),
  foto('habitaciones', 27, 'Suite amplia con cabecera de mármol, banca de madera y vista al mar'),
  foto('habitaciones', 28, 'Recámara luminosa con paleta neutra y accesos de madera tropical'),
  foto('habitaciones', 29, 'Estancia de suite frente al ventanal con el oleaje del Pacífico'),

  // lobby — las 7 del catálogo, ninguna baja de calidad 3
  foto('lobby', 1, 'Escalera interior con barandal de cristal y luz filtrada desde el jardín'),
  foto('lobby', 2, 'Comedor de mármol abierto al ventanal panorámico sobre la alberca y el mar'),
  foto('lobby', 3, 'Sala interior de líneas curvas con ventanal continuo hacia el Pacífico'),
  foto('lobby', 4, 'Estancia común de mobiliario escultórico y vegetación frente al horizonte marino'),
  foto('lobby', 5, 'Recepción de doble altura con muro de piedra y lámparas de fibra natural'),
  foto('lobby', 6, 'Vestíbulo principal con muros de piedra caliza y sala de espera cálida'),
  foto('lobby', 7, 'Lounge de recepción con butacas de mimbre, piedra natural y palmeras al fondo'),

  // restaurante — 15 de 45, máximo dos por motivo: mesa montada (05/06),
  // plato principal (11/14), camarón y aguacate (16/17), coco (22/23),
  // desayuno (29/31), aguas frescas (42/44), más vino, parfait y cocina
  foto('restaurante', 5, 'Montaje de mesa frente al mar con luz dorada del atardecer'),
  foto('restaurante', 6, 'Mesa para dos frente al oleaje del Pacífico bajo sombrilla'),
  foto('restaurante', 11, 'Pescado a la plancha con espárragos y pimientos en vajilla blanca'),
  foto('restaurante', 14, 'Fettuccine al burro acompañado de copa de vino blanco'),
  foto('restaurante', 16, 'Camarones y aguacate junto a copa de vino sobre mármol oscuro'),
  foto('restaurante', 17, 'Entrada de camarón y aguacate vista cenital sobre piedra negra'),
  foto('restaurante', 19, 'Vino blanco sirviéndose en copa dentro de la cocina del hotel'),
  foto('restaurante', 22, 'Dos cocos frescos sobre mosaico azul frente al mar abierto'),
  foto('restaurante', 23, 'Coco natural con naranja recién cortada y el Pacífico desenfocado detrás'),
  foto('restaurante', 29, 'Montaje de desayuno cenital sobre mesa de madera viva'),
  foto('restaurante', 31, 'Mesa de desayuno completa vista desde arriba con arreglo floral'),
  foto('restaurante', 39, 'Hilera de parfaits de yogur sobre mesa de madera con flores'),
  foto('restaurante', 42, 'Agua cítrica y vasos labrados dispuestos sobre el mar abierto de Acapulco'),
  foto('restaurante', 44, 'Tarros de jamaica y limonada alineados sobre madera en la estancia principal'),
  foto('restaurante', 45, 'Barra de mármol y cocina abierta en tonos grafito con vista a las palmeras'),

  // spa — 7 de 11: el jardín de yoga se repite en siete tomas casi
  // idénticas (01–08), así que entran tres y se completa con las dos
  // salas de tratamiento y el set de aceites
  foto('spa', 2, 'Tapetes de yoga y toallas listos sobre el jardín para práctica matutina'),
  foto('spa', 5, 'Área de yoga en el jardín con toallas y agua bajo luz suave'),
  foto('spa', 6, 'Tapetes de yoga dispuestos sobre el jardín frente al mar'),
  foto('spa', 7, 'Sesión de yoga al aire libre con el Pacífico de fondo'),
  foto('spa', 9, 'Sala de masaje con camilla, silla ergonómica y ventanal al cielo'),
  foto('spa', 10, 'Set de aceites esenciales sobre camilla, antesala de un ritual de bienestar'),
  foto('spa', 11, 'Sala de tratamiento con camilla de masaje y muro de madera acanalada'),

  // terraza — 9 de 10 (fuera: 09, bebidas sobre mesa redundante con 08)
  foto('terraza', 1, 'Tipi de picnic privado sobre el jardín al atardecer entre palmeras'),
  foto('terraza', 2, 'Cena íntima bajo tipi de lona con palmeras recortadas contra el cielo'),
  foto('terraza', 3, 'Tipi de lona blanca iluminado por dentro sobre césped al ocaso'),
  foto('terraza', 4, 'Tipi privado entre palmeras con cojines verdes sobre el jardín'),
  foto('terraza', 5, 'Sol poniente detrás del tipi de picnic en el jardín del hotel'),
  foto('terraza', 6, 'Libros sobre mesa exterior con el rumor del Pacífico al fondo'),
  foto('terraza', 7, 'Sombrero de palma sobre camastro con vista abierta al oleaje'),
  foto('terraza', 8, 'Limonadas y follaje sobre mesa de camastro frente al mar'),
  foto('terraza', 10, 'Camastros alineados con bebidas frías y el Pacífico de fondo'),
];
