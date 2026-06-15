/**
 * Categorías de habitaciones (docs/copy.md §3, brief §4.2).
 * Orden ascendente de lujo: Vista Jardín → Vista al Mar → Suite Aurea.
 *
 * Contrato con /contacto: el botón "Reservar" de cada categoría navega a
 * `/contacto?habitacion=<slug>` y el formulario usa `formLabel` como
 * opción del select "Tipo de habitación" (copy §8.2).
 *
 * `accent` (brief §4.2) se aplica SOLO a elementos decorativos
 * (línea, borde del thumbnail activo, filete de specs) y al eyebrow
 * únicamente donde el contraste lo permite — los botones siguen
 * siendo dorados; en la Suite Aurea acento y CTA coinciden adrede.
 *
 * Las mayúsculas de los eyebrows las pone CSS (utilidad `eyebrow`),
 * nunca estos datos (copy §11). La primera foto es la principal.
 * habitaciones_08 y habitaciones_09 están en lista negra (brief §4.8).
 * habitaciones_06 (asignada a la Suite Aurea en el brief) se retiró en
 * la revisión visual: la Torre de Tokio domina su ventana y rompe la
 * continuidad de Acapulco — daña la credibilidad premium.
 *
 * `pos` (opcional): clase de object-position que RoomCard aplica a la
 * foto en principal y thumbnail, para centrar la cama y dejar fuera
 * elementos ajenos a la paleta. Sin `pos` → object-center.
 */
export const rooms = [
  {
    slug: 'vista-jardin',
    accent: 'salvia',
    eyebrow: 'Categoría · Vista Jardín',
    nombre: 'Habitación Vista Jardín',
    formLabel: 'Habitación Vista Jardín',
    descripcion:
      'La más recogida de la casa. Sus ventanales dan a los jardines interiores, donde la vegetación filtra la luz y amortigua el mundo. Es la habitación de quien viaja para leer, dormir y no mirar el reloj.',
    stats: [
      { valor: '45', sufijo: 'm²', detalle: 'de superficie' },
      { valor: '2', sufijo: null, detalle: 'huéspedes' },
    ],
    amenidades: [
      'Cama king size con ropa de algodón egipcio',
      'Terraza privada hacia el jardín',
      'Regadera tipo lluvia y amenidades Spa Vita',
      'Cafetera de prensa francesa y selección de té',
      'Clima individual y cortinas blackout',
      'Wifi de alta velocidad sin costo',
    ],
    cta: 'Reservar esta habitación',
    fotos: [
      {
        src: '/fotos_hotel/habitaciones/habitaciones_13.jpeg',
        alt: 'Habitación Vista Jardín con cama king size y luz verde filtrada del jardín',
      },
      {
        src: '/fotos_hotel/habitaciones/habitaciones_11.jpeg',
        alt: 'Detalle del área de descanso de la Habitación Vista Jardín',
      },
      {
        src: '/fotos_hotel/habitaciones/habitaciones_01.jpeg',
        alt: 'Cama vestida en tonos claros en la Habitación Vista Jardín',
      },
      {
        src: '/fotos_hotel/habitaciones/habitaciones_04.jpeg',
        alt: 'Rincón de lectura junto a la ventana de la Habitación Vista Jardín',
      },
      {
        src: '/fotos_hotel/habitaciones/habitaciones_14.jpeg',
        alt: 'Recámara de la Habitación Vista Jardín con cama tapizada en tonos claros',
      },
    ],
  },
  {
    slug: 'suite-vista-al-mar',
    accent: 'marino',
    eyebrow: 'Categoría · Vista al Mar',
    nombre: 'Suite Vista al Mar',
    formLabel: 'Suite Vista al Mar',
    descripcion:
      'Una sala, una recámara y un solo protagonista: el Pacífico. La terraza corre a lo largo de la suite, de modo que el mar acompaña desde el primer café hasta la última copa. Al anochecer, las luces de la bahía hacen el resto.',
    stats: [
      { valor: '68', sufijo: 'm²', detalle: 'de superficie' },
      { valor: '2', sufijo: null, detalle: 'huéspedes' },
    ],
    amenidades: [
      'Terraza panorámica con camastros y mesa exterior',
      'Sala independiente con sofá de descanso',
      'Tina con vista al mar',
      'Cava privada con selección de vinos mexicanos',
      'Servicio a la habitación de Origen, de 7:00 a 23:00',
      'Wifi de alta velocidad sin costo',
    ],
    cta: 'Reservar esta suite',
    fotos: [
      {
        src: '/fotos_hotel/habitaciones/habitaciones_05.jpeg',
        alt: 'Suite Vista al Mar con ventanales abiertos hacia el Pacífico',
        /* El recorte 4:3 toma la banda izquierda: centra la cama y deja
           fuera el escritorio rojo del costado derecho (fuera de paleta). */
        pos: 'object-left',
      },
      {
        src: '/fotos_hotel/habitaciones/habitaciones_10.jpeg',
        alt: 'Sala de estar de la Suite Vista al Mar con luz de la tarde',
      },
      {
        src: '/fotos_hotel/habitaciones/habitaciones_03.jpeg',
        alt: 'Recámara de la Suite Vista al Mar en tonos marfil y arena',
      },
      {
        src: '/fotos_hotel/habitaciones/habitaciones_15.jpeg',
        alt: 'Detalle de la terraza privada de la Suite Vista al Mar',
      },
    ],
  },
  {
    slug: 'suite-aurea',
    accent: 'dorado',
    eyebrow: 'La insignia · Suite Aurea',
    nombre: 'Suite Aurea',
    formLabel: 'Suite Aurea',
    descripcion:
      'La suite que da nombre a la casa ocupa la esquina más alta del edificio, donde la bahía se ve completa. Dos recámaras, comedor propio y una terraza pensada para ver atardecer sin testigos. Quien la conoce, vuelve a pedirla por nombre.',
    stats: [
      { valor: '120', sufijo: 'm²', detalle: 'de superficie' },
      { valor: '4', sufijo: null, detalle: 'huéspedes' },
    ],
    amenidades: [
      'Dos recámaras con baño completo cada una',
      'Terraza de esquina con alberca de inmersión privada',
      'Comedor para seis y barra de servicio',
      'Concierge dedicado durante toda la estancia',
      'Traslados al aeropuerto incluidos',
      'Ritual de bienvenida del Spa Vita para dos',
    ],
    cta: 'Reservar la Suite Aurea',
    fotos: [
      {
        src: '/fotos_hotel/habitaciones/habitaciones_12.jpeg',
        alt: 'Suite Aurea con cama amplia y vista panorámica de la bahía',
        /* Favorece cama y terraza; recorta parte del muro de piedra. */
        pos: 'object-[60%_50%]',
      },
      {
        src: '/fotos_hotel/habitaciones/habitaciones_02.jpeg',
        alt: 'Recámara principal de la Suite Aurea con textiles en tonos claros',
      },
      {
        src: '/fotos_hotel/habitaciones/habitaciones_07.jpeg',
        alt: 'Área de estar de la Suite Aurea con luz natural',
      },
    ],
  },
];

/**
 * Encabezado de la página (copy §3.1 / §12). Ronda 15 jun: la `intro`
 * de una línea se expandió a dos niveles —`subtitulo` corto (bajo el
 * H1) + `cuerpo` editorial de 3 párrafos del cliente— según la
 * recomendación del ux-writer. Las 3 categorías no cambian.
 */
export const habitacionesHeader = {
  eyebrow: 'Descanso',
  titulo: 'Habitaciones & Suites',
  subtitulo: 'Diseñadas para el descanso, inspiradas por el mar.',
  cuerpo: [
    'Cada habitación de Aurea Vita ha sido concebida como un refugio privado donde la tranquilidad y el bienestar se convierten en parte de la experiencia. Las amplias vistas al Pacífico acompañan cada amanecer, los espacios generosos y los detalles cuidadosamente seleccionados invitan a desconectar del ritmo cotidiano y reconectar con uno mismo en armonía.',
    'Todas nuestras habitaciones cuentan con vista al mar, baño con tina, amplio clóset de caoba, estación de té, pantalla de entretenimiento y una cama de masaje integrada a la experiencia wellness de tu propia habitación.',
    'Aquí, cada espacio ha sido diseñado para favorecer el descanso profundo, la relajación y la sensación de bienestar que define la esencia de Aurea Vita. Porque descansar no es solamente dormir. Es balancear los sentidos y sentirse en paz.',
  ],
  hero: {
    src: '/fotos_hotel/habitaciones/habitaciones_02.jpeg',
    alt: 'Interior de suite en Aurea Vita con textiles claros y luz natural',
  },
};

/** Banda CTA de cierre (copy §3.5). */
export const habitacionesCta = {
  titulo: '¿Cuál es la tuya?',
  texto: 'Escríbenos tus fechas y te ayudamos a elegir.',
  boton: 'Consultar disponibilidad',
};
