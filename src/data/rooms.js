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
 * FOTOS (restitución, docs/Fotos WEB AV.pdf): el PDF del cliente asigna
 * una foto nominal a CINCO de las siete habitaciones —casa_39, casa_46,
 * casa_51, casa_70 y casa_42, todas en `public/fotos/casa/`— y para las
 * otras dos escribe literalmente "FOTO: PENDIENTE". La ronda ago 26
 * había repartido tomas de `public/fotos/habitaciones/` por criterio
 * propio; esas cinco quedan sustituidas (los archivos NO se borran:
 * siguen alimentando la galería) y las dos pendientes conservan la que
 * tenían, marcadas con `fotoPendiente: true` hasta que el cliente
 * entregue la suya. O sea que el flag vuelve: la nota anterior decía que
 * había desaparecido con el set demo, y ya no es cierto.
 *
 * `pos` (clase Tailwind que RoomCard concatena al className del <img>,
 * NO un valor CSS suelto): encuadres del curador visual dentro del
 * recorte 4:3 de la mini-galería. Las cinco fotos nuevas son 3:2
 * (1600×1066), así que el recorte es lateral y suave, pero el sujeto
 * —cabecera, clóset, ventanal— no siempre cae en el centro geométrico.
 * Las dos pendientes siguen sin `pos` (heredan `object-center`).
 *
 * ALT: texto del curador visual VERBATIM, sin anteponer el nombre
 * comercial. Motivo de accesibilidad (WCAG 1.1.1): cuatro habitaciones
 * se llaman "Vista al Mar" pero solo casa_70 enseña el océano —
 * anteponer el nombre metería "vista al mar" en el alt de fotos donde
 * no hay mar, describiendo algo que no está en la imagen. El nombre ya
 * lo anuncia el <h2> contiguo (`${slug}-titulo`), así que no se pierde
 * contexto: el alt describe, el encabezado identifica.
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
        src: '/fotos/casa/casa_39.jpg',
        alt: 'Habitación amplia con cabecera arqueada retroiluminada y ventanal hacia la vegetación',
        /* 55%: descentra hacia el ventanal para que la cabecera arqueada
           y la luz del jardín entren juntas en el recorte 4:3. */
        pos: 'object-[55%_50%]',
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
        src: '/fotos/casa/casa_46.jpg',
        alt: 'Habitación serena con librero de madera, orquídeas y ropa de cama impecable',
        /* 55%: mismo desplazamiento que sus hermanas de categoría, para
           que las tres se sientan encuadradas igual en la página. */
        pos: 'object-[55%_50%]',
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
        src: '/fotos/casa/casa_51.jpg',
        alt: 'Habitación cálida con clóset abierto de madera, orquídeas y marina sobre la cama',
        /* 55%: conserva el clóset abierto de madera, que es lo que
           distingue a esta toma de la de su gemela casa_46. */
        pos: 'object-[55%_50%]',
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
        src: '/fotos/casa/casa_70.jpg',
        alt: 'Suite con ventanales de piso a techo abiertos al oleaje del Pacífico',
        /* 45%: la única de las cuatro "vista al mar" que de verdad enseña
           el océano. El encuadre corre a la izquierda para no perder la
           hoja de ventanal donde entra el oleaje. */
        pos: 'object-[45%_50%]',
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
    /* docs/Fotos WEB AV.pdf dice literalmente "FOTO: PENDIENTE" para
       esta habitación: el cliente AÚN NO la entregó. Se conserva
       habitaciones_08 (ronda ago 26) como provisional en vez de dejar el
       bloque sin imagen —RoomCard exige `fotos[0]` y romperlo por una
       foto que falta no ayuda a nadie— y se marca con el flag para que
       la sustitución sea un grep, no una arqueología.
       Al llegar la definitiva: cambiar src/alt, añadir `pos` si el
       encuadre 4:3 lo pide y BORRAR este flag. */
    fotoPendiente: true,
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
        src: '/fotos/casa/casa_42.jpg',
        alt: 'Habitación doble con dos camas, muro de duelas de madera y tocador arqueado',
        /* Encuadre apenas bajo (55%): las dos camas y el tocador viven
           por debajo del eje; el borde superior es solo muro de duelas. */
        pos: 'object-[50%_55%]',
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
    /* Segunda entrada con "FOTO: PENDIENTE" en docs/Fotos WEB AV.pdf:
       el cliente no entregó foto propia de esta suite (la del PDF es la
       de la suite 1, casa_70, y NO se reutiliza aquí: dos bloques con el
       mismo nombre comercial y la misma imagen se leerían como un error
       de maquetación). Se conserva habitaciones_27 como provisional y se
       marca igual que la Familiar. Mismo procedimiento al recibirla. */
    fotoPendiente: true,
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
 * H1) + `cuerpo` editorial de 3 párrafos del cliente.
 *
 * HERO (restitución, docs/Fotos WEB AV.pdf): el cliente pide casa_41
 * para la portada de /habitaciones. Sustituye a habitaciones_03, que la
 * ronda ago 26 había elegido por calidad; habitaciones_03 sigue en
 * disco. Encuadre y dimensiones, en Habitaciones.jsx (el <img> del hero
 * vive ahí): 1600×1066 y recorte ALTO al 25%, porque la mitad inferior
 * de casa_41 es edredón blanco sobreexpuesto sin detalle.
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
    src: '/fotos/casa/casa_41.jpg',
    alt: 'Cama vestida en blanco frente a muro de madera y luz cálida indirecta',
  },
};

/** Banda CTA de cierre (copy §3.5). */
export const habitacionesCta = {
  titulo: '¿Cuál es la tuya?',
  texto: 'Escríbenos tus fechas y te ayudamos a elegir.',
  boton: 'Consultar disponibilidad',
};
