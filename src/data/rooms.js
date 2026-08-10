/**
 * Habitaciones de la casa (ronda 23 jul, docs/Fotos WEB AV.pdf).
 * Esta ronda REEMPLAZA las 3 categorías conceptuales (Vista Jardín /
 * Suite Vista al Mar / Suite Aurea, ver git history) por las 7
 * habitaciones REALES que el cliente definió, con sus textos literales.
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
 * Fotos (ronda ago 26, docs/fotos/catalogo-definitivas.md): las siete
 * habitaciones toman una foto propia de `public/fotos/habitaciones/`
 * (29 disponibles), elegida por lo que describe cada ficha —camas,
 * ventanal, vestidor. Ya no hay ninguna genérica provisional: el flag
 * `fotoPendiente` desapareció junto con el set demo. Sin `pos`: las 29
 * son 3:2 con el sujeto centrado, así que el recorte por defecto de
 * RoomCard (`object-center`) las encuadra bien.
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
        src: '/fotos/habitaciones/habitaciones_01.jpg',
        alt: 'Habitación Vista al Mar 1 con ventanales abiertos al océano y sala de estar para leer por las tardes',
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
        src: '/fotos/habitaciones/habitaciones_16.jpg',
        alt: 'Habitación Vista al Mar Compartida 1, luminosa, con clóset abierto, sillón y maderas cálidas',
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
        src: '/fotos/habitaciones/habitaciones_28.jpg',
        alt: 'Habitación Vista al Mar Compartida 2 en paleta neutra, con acentos de madera tropical',
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
        src: '/fotos/habitaciones/habitaciones_29.jpg',
        alt: 'Estancia de la Suite con Vista al Mar frente al ventanal, con el oleaje del Pacífico al fondo',
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
    fotos: [
      {
        src: '/fotos/habitaciones/habitaciones_08.jpg',
        alt: 'Habitación Familiar de dos camas, con techo alto y piso de mármol claro',
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
        src: '/fotos/habitaciones/habitaciones_06.jpg',
        alt: 'Habitación Doble Vista al Mar 1 con camas gemelas, madera cálida y luz natural',
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
    fotos: [
      {
        src: '/fotos/habitaciones/habitaciones_27.jpg',
        alt: 'Suite con Vista al Mar de cabecera de mármol, banca de madera y vista al océano',
      },
    ],
  },
];

/**
 * Encabezado de la página (copy §3.1 / §12). Ronda 15 jun: la `intro`
 * de una línea se expandió a dos niveles —`subtitulo` corto (bajo el
 * H1) + `cuerpo` editorial de 3 párrafos del cliente. Ronda ago 26: el
 * hero toma habitaciones_03, la única calidad 5 del set de recámaras
 * (cabecera de madera curva bañada por la luz del jardín).
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
    src: '/fotos/habitaciones/habitaciones_03.jpg',
    alt: 'Suite principal con cabecera de madera curva y luz de jardín',
  },
};

/** Banda CTA de cierre (copy §3.5). */
export const habitacionesCta = {
  titulo: '¿Cuál es la tuya?',
  texto: 'Escríbenos tus fechas y te ayudamos a elegir.',
  boton: 'Consultar disponibilidad',
};
