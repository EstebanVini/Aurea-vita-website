/**
 * Gastronomía — Origen y Cielo (docs/copy.md §4, brief §4.3).
 *
 * i18n (ronda 31 ago 2026): cada export pasa a la forma { es, en }. El
 * bloque `es` conserva los textos existentes VERBATIM; el `en` sale de
 * docs/traduccion_ingles.md (título de página, meta, eyebrow/H1, intro
 * y alt del hero) y docs/traduccion_ui_faltante.md (todo el detalle de
 * Origen, Marea, Cielo y los cocteles). Los nombres propios —Origen,
 * Marea, Cielo y los cocteles— no se traducen.
 *
 * Fotos (ronda ago 26, docs/fotos/catalogo-definitivas.md): el hero es
 * restaurante_06 (mesa para dos frente al oleaje: la escena que promete
 * la página, no un plato). Origen alterna crepúsculo (restaurante_05),
 * el comedor real de la casa —lobby_02, calidad 5, el ventanal
 * panorámico sobre la alberca y el mar— y el desayuno completo
 * (restaurante_31). Cielo toma tres tomas de terraza sin repetir con
 * /experiencias: los dos tipis al ocaso (terraza_03 y terraza_02) y los
 * camastros de día (terraza_10). La entrega no trae ninguna toma de las
 * redes náuticas ni del bar de azotea.
 *
 * Las mayúsculas de los eyebrows las pone CSS (utilidad `eyebrow`),
 * nunca estos datos (copy §11). Sin precios en menú ni cocteles:
 * la carta es tipográfica, no transaccional (brief §4.3).
 */

/**
 * Encabezado de la página (copy §4.1 / §12, ronda 15 jun — rebranding
 * D1). La ruta /gastronomia se conserva; solo se rebrandea el hero:
 * eyebrow "La mesa" → "Alimentación Consciente", H1 "Gastronomía" →
 * "Alimentación Consciente", intro nueva. La estructura interna
 * (Origen / Cielo / menú Marea / cartas) NO se toca esta ronda.
 * `metaTitulo`/`metaDescripcion` alimentan usePageMeta.
 */
export const gastronomiaHeader = {
  es: {
    metaTitulo: 'Alimentación Consciente · Aurea Vita Acapulco',
    metaDescripcion:
      'Alimentación consciente frente al Pacífico: cocina sana y de temporada en Origen y atardeceres en la terraza de Cielo. Comer bien como parte del descanso.',
    eyebrow: 'Alimentación Consciente',
    titulo: 'Alimentación Consciente',
    intro:
      'Comer bien es parte del descanso. Origen cocina lo que el Pacífico entrega cada mañana —sano, de temporada y con sabor— y Cielo lo acompaña cuando el sol empieza a caer.',
    hero: {
      src: '/fotos/restaurante/restaurante_06.jpg',
      alt: 'Mesa para dos frente al oleaje del Pacífico, bajo sombrilla',
    },
  },
  en: {
    metaTitulo: 'Conscious Dining · Aurea Vita Acapulco',
    metaDescripcion:
      'Conscious dining on the Pacific: wholesome, seasonal cuisine at Origen and sunset drinks on Cielo’s terrace. Eating well is part of resting well.',
    eyebrow: 'Conscious Dining',
    titulo: 'Conscious Dining',
    intro:
      'Eating well is part of resting well. Origen prepares what the Pacific brings each morning—wholesome, seasonal and full of flavor—while Cielo accompanies the moment when the sun begins to set.',
    hero: {
      src: '/fotos/restaurante/restaurante_06.jpg',
      alt: 'A table for two beside the Pacific surf, beneath an umbrella',
    },
  },
};

/**
 * Restaurante Origen — cocina del Pacífico (copy §4.2).
 * Las claves `redes` y `terrazaVerde` son posiciones de layout en
 * Gastronomia.jsx, no descripciones: sostienen ahora el comedor
 * panorámico y la mesa de desayuno de la entrega definitiva.
 * Las horas de los horarios no cambian entre idiomas.
 */
export const origen = {
  es: {
    eyebrow: 'Restaurante',
    titulo: 'Origen',
    parrafos: [
      'Origen empieza donde empieza todo aquí: en el muelle, antes del amanecer. La pesca del día decide la carta, y la cocina de Guerrero —la talla, el coco, el cacao de la Costa Grande— le da memoria. No hay platos de temporada; hay platos de esta mañana.',
      'El comedor se abre al puerto bajo un techo de redes náuticas tejidas a mano, homenaje a los pescadores que cada día deciden nuestro menú. La formalidad sobra; la sobremesa, nunca.',
    ],
    horarios: [
      { servicio: 'Desayuno', horas: '7:00 – 11:30' },
      { servicio: 'Comida', horas: '13:30 – 17:00' },
      { servicio: 'Cena', horas: '18:30 – 23:00' },
    ],
    notaHorarios: 'Se recomienda reservar para la cena.',
    fotos: {
      crepusculo: {
        src: '/fotos/restaurante/restaurante_05.jpg',
        alt: 'Montaje de mesa frente al mar con la luz dorada del atardecer',
      },
      redes: {
        src: '/fotos/lobby/lobby_02.jpg',
        alt: 'Comedor de mármol abierto al ventanal panorámico sobre la alberca y el mar',
      },
      terrazaVerde: {
        src: '/fotos/restaurante/restaurante_31.jpg',
        alt: 'Mesa de desayuno completa con arreglo floral, vista desde arriba',
      },
    },
  },
  en: {
    eyebrow: 'Restaurant',
    titulo: 'Origen',
    parrafos: [
      "Origen begins where everything begins here: at the dock, before sunrise. The day's catch decides the menu, and the cooking of Guerrero—pescado a la talla, coconut, cacao from the Costa Grande—gives it memory. There are no seasonal dishes; there are dishes of this morning.",
      'The dining room opens to the harbor beneath a ceiling of hand-woven fishing nets, a tribute to the fishermen who decide our menu each day. Formality is unnecessary; lingering at the table never is.',
    ],
    horarios: [
      { servicio: 'Breakfast', horas: '7:00 – 11:30' },
      { servicio: 'Lunch', horas: '13:30 – 17:00' },
      { servicio: 'Dinner', horas: '18:30 – 23:00' },
    ],
    notaHorarios: 'Reservations are recommended for dinner.',
    fotos: {
      crepusculo: {
        src: '/fotos/restaurante/restaurante_05.jpg',
        alt: 'Table setting by the sea in the golden light of sunset',
      },
      redes: {
        src: '/fotos/lobby/lobby_02.jpg',
        alt: 'Marble dining room open to a panoramic window over the pool and the sea',
      },
      terrazaVerde: {
        src: '/fotos/restaurante/restaurante_31.jpg',
        alt: 'A full breakfast table with a floral arrangement, seen from above',
      },
    },
  },
};

/** Menú degustación "Marea" — 7 tiempos (copy §4.2). */
export const menuMarea = {
  es: {
    eyebrow: 'Menú degustación',
    titulo: 'Marea',
    intro:
      'Siete tiempos que siguen el día de un pescador: del muelle al fuego, del fuego a la sobremesa. La carta cambia con la captura; esta es la marea de hoy.',
    tiempos: [
      {
        nombre: 'Tostada de la mañana',
        descriptor:
          'Pesca del día curada en limón, aguacate y polvo de chile guajillo',
      },
      {
        nombre: 'Tiradito de huachinango',
        descriptor: 'Leche de tigre de coco, pepino y aceite de cilantro',
      },
      {
        nombre: 'Aguachile de camarón de estero',
        descriptor:
          'Chile verde, xoconostle y tortilla de maíz azul recién hecha',
      },
      {
        nombre: 'Pulpo a las brasas',
        descriptor:
          'Adobo de chiles costeños, puré de plátano macho tatemado',
      },
      {
        nombre: 'Pescado a la talla',
        descriptor:
          'A la manera de Barra Vieja, sobre hoja de plátano, con arroz verde',
      },
      {
        nombre: 'Respiro de la costa',
        descriptor: 'Sorbete de mango Ataúlfo con sal de mar y hierbabuena',
      },
      {
        nombre: 'Cacao de la Costa Grande',
        descriptor:
          'Texturas de chocolate guerrerense, miel de la montaña y vainilla',
      },
    ],
    nota: 'Maridaje opcional con vinos mexicanos y destilados de agave. Avísanos de cualquier alergia o restricción: la marea siempre trae alternativas.',
  },
  en: {
    eyebrow: 'Tasting menu',
    titulo: 'Marea',
    intro:
      "Seven courses that follow a fisherman's day: from the dock to the fire, from the fire to the lingering table. The menu changes with the catch; this is today's tide.",
    tiempos: [
      {
        nombre: 'Morning tostada',
        descriptor:
          'Catch of the day cured in lime, avocado and guajillo chile powder',
      },
      {
        nombre: 'Red snapper tiradito',
        descriptor: 'Coconut leche de tigre, cucumber and cilantro oil',
      },
      {
        nombre: 'Estuary shrimp aguachile',
        descriptor:
          'Green chile, xoconostle and freshly made blue-corn tortilla',
      },
      {
        nombre: 'Charcoal-grilled octopus',
        descriptor: 'Costeño chile adobo, charred plantain purée',
      },
      {
        nombre: 'Pescado a la talla',
        descriptor: 'In the Barra Vieja style, on a banana leaf, with green rice',
      },
      {
        nombre: 'A breath of the coast',
        descriptor: 'Ataúlfo mango sorbet with sea salt and fresh mint',
      },
      {
        nombre: 'Cacao of the Costa Grande',
        descriptor: 'Textures of Guerrero chocolate, mountain honey and vanilla',
      },
    ],
    nota: 'Optional pairing with Mexican wines and agave spirits. Let us know of any allergy or restriction—the tide always brings alternatives.',
  },
};

/** Bar de terraza Cielo (copy §4.3). */
export const cielo = {
  es: {
    eyebrow: 'Bar de terraza',
    titulo: 'Cielo',
    concepto:
      'Cielo abre cuando la luz empieza a ablandarse. Es la terraza más alta de la casa, orientada exactamente hacia donde el sol toca el agua. La carta es corta y pensada para esa hora: cocteles de autor, mariscos fríos y ningún motivo para mirar el teléfono. El atardecer dura unos veinte minutos; la terraza, hasta medianoche.',
    horarios: [
      { servicio: 'Todos los días', horas: '16:00 – 24:00' },
      { servicio: 'La hora dorada', horas: '18:00 – 20:00' },
    ],
    notaHorarios: 'Con música en vivo los fines de semana.',
    fotos: {
      principal: {
        src: '/fotos/terraza/terraza_03.jpg',
        alt: 'Tipi de lona blanca iluminado por dentro sobre el césped al ocaso',
      },
      lounge: {
        src: '/fotos/terraza/terraza_02.jpg',
        alt: 'Cena íntima bajo el tipi de lona, con las palmeras recortadas contra el cielo',
      },
      diurna: {
        src: '/fotos/terraza/terraza_10.jpg',
        alt: 'Camastros alineados con bebidas frías y el Pacífico de fondo',
      },
    },
  },
  en: {
    eyebrow: 'Terrace bar',
    titulo: 'Cielo',
    concepto:
      'Cielo opens when the light begins to soften. It is the highest terrace in the house, oriented exactly toward where the sun touches the water. The menu is short and designed for that hour: signature cocktails, chilled seafood and no reason to look at your phone. The sunset lasts about twenty minutes; the terrace, until midnight.',
    horarios: [
      { servicio: 'Every day', horas: '16:00 – 24:00' },
      { servicio: 'Golden hour', horas: '18:00 – 20:00' },
    ],
    notaHorarios: 'With live music on weekends.',
    fotos: {
      principal: {
        src: '/fotos/terraza/terraza_03.jpg',
        alt: 'White canvas tipi glowing from within on the lawn at dusk',
      },
      lounge: {
        src: '/fotos/terraza/terraza_02.jpg',
        alt: 'Intimate dinner beneath the canvas tipi, palms silhouetted against the sky',
      },
      diurna: {
        src: '/fotos/terraza/terraza_10.jpg',
        alt: 'Sun loungers aligned with cold drinks and the Pacific beyond',
      },
    },
  },
};

/**
 * Carta breve de cocteles de autor (copy §4.3). Los nombres son
 * propios y se conservan en español en ambos idiomas.
 */
export const cocteles = {
  es: [
    {
      nombre: 'Última Luz',
      descriptor:
        'Mezcal espadín, toronja rosada, miel de agave y sal de gusano — para el minuto exacto en que el sol se va',
    },
    {
      nombre: 'Bahía de Santa Lucía',
      descriptor:
        'Ginebra, agua de coco joven, hierbabuena y un toque de limón amarillo',
    },
    {
      nombre: 'La Quebrada',
      descriptor:
        'Tequila reposado, piña tatemada, chile ancho y romero quemado',
    },
    {
      nombre: 'Vita',
      descriptor:
        'Sin alcohol: jamaica fría, jengibre, mandarina y espuma de vainilla',
    },
  ],
  en: [
    {
      nombre: 'Última Luz',
      descriptor:
        'Espadín mezcal, pink grapefruit, agave nectar and sal de gusano—for the exact minute the sun departs',
    },
    {
      nombre: 'Bahía de Santa Lucía',
      descriptor:
        'Gin, young coconut water, fresh mint and a touch of yellow lemon',
    },
    {
      nombre: 'La Quebrada',
      descriptor:
        'Reposado tequila, charred pineapple, ancho chile and burnt rosemary',
    },
    {
      nombre: 'Vita',
      descriptor:
        'Alcohol-free: chilled hibiscus, ginger, mandarin and vanilla foam',
    },
  ],
};

/** Banda CTA de cierre (copy §4.4). */
export const gastronomiaCta = {
  es: {
    titulo: 'Tu mesa frente a la bahía te espera.',
    texto: 'Reserva tu estancia y deja las cenas en nuestras manos.',
    boton: 'Reservar mi estancia',
  },
  en: {
    titulo: 'Your table by the bay awaits.',
    texto: 'Reserve your stay and leave the dinners to us.',
    boton: 'Reserve my stay',
  },
};
