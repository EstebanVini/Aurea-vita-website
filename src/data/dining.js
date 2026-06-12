/**
 * Gastronomía — Origen y Cielo (docs/copy.md §4, brief §4.3).
 *
 * Fotos según curaduría (docs/fotos/lobby-restaurante.md y
 * spa-terraza.md): restaurante_11 es el hero de la página;
 * restaurante_14/01/12 acompañan los slots alternados de Origen.
 * Regla dura de terraza (brief §4.8): SOLO terraza_13, terraza_10 y
 * terraza_03 son utilizables en todo el sitio — Cielo usa las tres.
 * restaurante_02/08/10 están descartadas (estilos ajenos al concepto).
 *
 * Las mayúsculas de los eyebrows las pone CSS (utilidad `eyebrow`),
 * nunca estos datos (copy §11). Sin precios en menú ni cocteles:
 * la carta es tipográfica, no transaccional (brief §4.3).
 */

/** Encabezado de la página (copy §4.1). */
export const gastronomiaHeader = {
  eyebrow: 'La mesa',
  titulo: 'Gastronomía',
  intro:
    'Dos lugares, dos horas del día. Origen cocina lo que el Pacífico entrega cada mañana; Cielo lo celebra cuando el sol empieza a caer.',
  hero: {
    src: '/fotos_hotel/restaurante/restaurante_11.jpeg',
    alt: 'Mesa servida del restaurante Origen frente a la bahía, bajo la luz dorada de la tarde',
  },
};

/** Restaurante Origen — cocina del Pacífico (copy §4.2). */
export const origen = {
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
      src: '/fotos_hotel/restaurante/restaurante_14.jpeg',
      alt: 'Cena en Origen con el horizonte crepuscular al fondo',
    },
    redes: {
      src: '/fotos_hotel/restaurante/restaurante_01.jpeg',
      alt: 'Techo de redes náuticas tejidas en el comedor de Origen',
    },
    terrazaVerde: {
      src: '/fotos_hotel/restaurante/restaurante_12.jpeg',
      alt: 'Desayuno servido en la terraza verde de Origen',
    },
  },
};

/** Menú degustación "Marea" — 7 tiempos (copy §4.2). */
export const menuMarea = {
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
};

/** Bar de terraza Cielo (copy §4.3). */
export const cielo = {
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
      src: '/fotos_hotel/terraza/terraza_13.jpeg',
      alt: 'Terraza del bar Cielo al crepúsculo, con luces cálidas encendidas',
    },
    lounge: {
      src: '/fotos_hotel/terraza/terraza_10.jpeg',
      alt: 'Lounge de palapas de Cielo, con cojines turquesa bajo la luz cálida de la tarde',
    },
    diurna: {
      src: '/fotos_hotel/terraza/terraza_03.jpeg',
      alt: 'Terraza de Cielo durante el día, con sombras y vista despejada',
    },
  },
};

/** Carta breve de cocteles de autor (copy §4.3). */
export const cocteles = [
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
];

/** Banda CTA de cierre (copy §4.4). */
export const gastronomiaCta = {
  titulo: 'Tu mesa frente a la bahía te espera.',
  texto: 'Reserva tu estancia y deja las cenas en nuestras manos.',
  boton: 'Reservar mi estancia',
};
