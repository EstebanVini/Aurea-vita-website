/**
 * Habitaciones de la casa (ronda 23 jul, docs/Fotos WEB AV.pdf).
 * Esta ronda REEMPLAZA las 3 categorías conceptuales (Vista Jardín /
 * Suite Vista al Mar / Suite Aurea, ver git history) por las 7
 * habitaciones REALES que el cliente definió, con sus textos literales
 * y las fotos definitivas de la casa (public/fotos_hotel/casa/).
 *
 * Contrato con /contacto: el botón "Reservar" de cada habitación navega
 * a `/contacto?habitacion=<slug>` y el formulario usa `formLabel` como
 * opción del select "Tipo de habitación" (copy §8.2).
 *
 * `accent` se aplica SOLO a elementos decorativos (línea, borde del
 * thumbnail activo) — los botones siguen siendo dorados; en las suites
 * acento y CTA coinciden adrede (patrón "insignia" del brief §4.2).
 *
 * SIN `stats`: el cliente no entregó superficies ni cupos en esta ronda
 * y no se inventan datos (RoomCard omite el bloque si no hay stats).
 *
 * Fotos pendientes (PDF): Habitación Familiar y la segunda Suite con
 * Vista al Mar usan una foto genérica temporal del set anterior,
 * marcada con `fotoPendiente: true` — reemplazar cuando lleguen.
 *
 * Las mayúsculas de los eyebrows las pone CSS (utilidad `eyebrow`),
 * nunca estos datos (copy §11). La primera foto es la principal.
 */
export const rooms = [
  {
    slug: 'vista-al-mar-1',
    accent: 'salvia',
    eyebrow: 'Categoría · Vista al Mar',
    nombre: 'Habitación Vista al Mar 1',
    formLabel: 'Habitación Vista al Mar 1',
    descripcion:
      'Habitación en planta baja con vista al mar, ideal para leer por las tardes o relajarse escuchando las olas del mar.',
    amenidades: [
      'Cama king size',
      'Baño con tina',
      'Amplio clóset de caoba',
      'Mesa de masaje',
      'Escritorio',
    ],
    cta: 'Reservar esta habitación',
    fotos: [
      {
        src: '/fotos_hotel/casa/casa_39.jpeg',
        alt: 'Habitación Vista al Mar 1 con cama king size, cabecera de mármol iluminada y ventanal a la vegetación',
        /* La cama y la cabecera viven en la banda central-derecha. */
        pos: 'object-[58%_50%]',
      },
    ],
  },
  {
    slug: 'vista-al-mar-compartida-1',
    accent: 'marino',
    eyebrow: 'Categoría · Vista al Mar Compartida',
    nombre: 'Habitación Vista al Mar Compartida 1',
    formLabel: 'Habitación Vista al Mar Compartida 1',
    descripcion:
      'Habitación con balcón compartido y extraordinaria vista al mar, ideal para parejas que disfrutan el silencio y las actividades de relajación.',
    amenidades: [
      'Cama matrimonial',
      'Baño con tina',
      'Amplio clóset de caoba',
    ],
    cta: 'Reservar esta habitación',
    fotos: [
      {
        src: '/fotos_hotel/casa/casa_46.jpeg',
        alt: 'Habitación Vista al Mar Compartida 1 con cama matrimonial, clóset de caoba y servicio de té',
      },
    ],
  },
  {
    slug: 'vista-al-mar-compartida-2',
    accent: 'salvia',
    eyebrow: 'Categoría · Vista al Mar Compartida',
    nombre: 'Habitación Vista al Mar Compartida 2',
    formLabel: 'Habitación Vista al Mar Compartida 2',
    descripcion:
      'Habitación con balcón compartido y extraordinaria vista al mar, ideal para parejas que disfrutan el silencio y las actividades de relajación.',
    amenidades: [
      'Cama matrimonial',
      'Baño con tina',
      'Amplio clóset de caoba',
    ],
    cta: 'Reservar esta habitación',
    fotos: [
      {
        src: '/fotos_hotel/casa/casa_51.jpeg',
        alt: 'Habitación Vista al Mar Compartida 2 con cama matrimonial, clóset de caoba y cuadro del mar',
      },
    ],
  },
  {
    slug: 'suite-vista-al-mar-1',
    accent: 'dorado',
    eyebrow: 'Suite · Vista al Mar',
    nombre: 'Suite con Vista al Mar',
    formLabel: 'Suite con Vista al Mar 1',
    descripcion:
      'Amplia suite con vista al mar, cuarto de masajes privado, baño con tina y regadera de relajación, amplio clóset, sillón para leer o relajarse y la mejor vista de la casa. Déjate consentir con el ritmo del mar y relájate con la paz que produce el silencio, el viento y el mar.',
    amenidades: [
      'Cuarto de masajes privado',
      'Baño con tina y regadera de relajación',
      'Amplio clóset',
      'Sillón para leer o relajarse',
      'La mejor vista de la casa',
    ],
    cta: 'Reservar esta suite',
    fotos: [
      {
        src: '/fotos_hotel/casa/casa_70.jpeg',
        alt: 'Suite con Vista al Mar: sala con sofás frente al ventanal a la playa y cuarto de masajes privado',
      },
    ],
  },
  {
    slug: 'familiar',
    accent: 'marino',
    eyebrow: 'Categoría · Familiar',
    nombre: 'Habitación Familiar',
    formLabel: 'Habitación Familiar',
    descripcion:
      'Habitación familiar con vista al mar, ideal para parejas con niños, espacio diseñado para relajarse escuchando las olas del mar.',
    amenidades: [
      '2 camas matrimoniales',
      'Baño con tina',
      'Amplio clóset de caoba',
      'Escritorio',
    ],
    cta: 'Reservar esta habitación',
    /* FOTO PENDIENTE (PDF 23 jul): genérica temporal del set anterior;
       sustituir por la definitiva cuando el cliente la entregue. */
    fotoPendiente: true,
    fotos: [
      {
        src: '/fotos_hotel/habitaciones/habitaciones_13.jpeg',
        alt: 'Habitación Familiar de Aurea Vita en tonos claros (fotografía provisional)',
      },
    ],
  },
  {
    slug: 'doble-vista-al-mar-1',
    accent: 'salvia',
    eyebrow: 'Categoría · Vista al Mar',
    nombre: 'Habitación Doble Vista al Mar 1',
    formLabel: 'Habitación Doble Vista al Mar 1',
    descripcion:
      'Habitación doble con vista al mar, ideal para compartir experiencias con familiares, mientras el mar del Pacífico les ayuda a relajarse.',
    amenidades: [
      'Camas matrimoniales',
      'Baño con tina',
      'Amplio clóset de caoba',
      'Escritorio ideal para juegos de mesa',
    ],
    cta: 'Reservar esta habitación',
    fotos: [
      {
        src: '/fotos_hotel/casa/casa_42.jpeg',
        alt: 'Habitación Doble Vista al Mar 1 con dos camas vestidas de blanco y muro de madera con espejo',
      },
    ],
  },
  {
    slug: 'suite-vista-al-mar-2',
    accent: 'dorado',
    eyebrow: 'Suite · Vista al Mar',
    nombre: 'Suite con Vista al Mar',
    formLabel: 'Suite con Vista al Mar 2',
    descripcion:
      'Amplia suite con vista al mar, cuarto de masajes privado, baño con tina y regadera de relajación, amplio clóset, sillón para leer o relajarse y la mejor vista de la casa. Déjate consentir con el ritmo del mar y relájate con la paz que produce el silencio, el viento y el mar.',
    amenidades: [
      'Cuarto de masajes privado',
      'Baño con tina y regadera de relajación',
      'Amplio clóset',
      'Sillón para leer o relajarse',
      'La mejor vista de la casa',
    ],
    cta: 'Reservar esta suite',
    /* FOTO PENDIENTE (PDF 23 jul): genérica temporal del set anterior;
       sustituir por la definitiva cuando el cliente la entregue. */
    fotoPendiente: true,
    fotos: [
      {
        src: '/fotos_hotel/habitaciones/habitaciones_05.jpeg',
        alt: 'Suite con Vista al Mar con ventanales hacia el Pacífico (fotografía provisional)',
        /* El recorte 4:3 toma la banda izquierda: centra la cama y deja
           fuera el escritorio rojo del costado derecho (fuera de paleta). */
        pos: 'object-left',
      },
    ],
  },
];

/**
 * Encabezado de la página (copy §3.1 / §12). Ronda 15 jun: la `intro`
 * de una línea se expandió a dos niveles —`subtitulo` corto (bajo el
 * H1) + `cuerpo` editorial de 3 párrafos del cliente. Ronda 23 jul
 * (docs/Fotos WEB AV.pdf): hero con foto definitiva Cámara Casa 41.
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
    src: '/fotos_hotel/casa/casa_41.jpeg',
    alt: 'Cama vestida de blanco en primer plano frente al muro de madera de una habitación de Aurea Vita',
  },
};

/** Banda CTA de cierre (copy §3.5). */
export const habitacionesCta = {
  titulo: '¿Cuál es la tuya?',
  texto: 'Escríbenos tus fechas y te ayudamos a elegir.',
  boton: 'Consultar disponibilidad',
};
