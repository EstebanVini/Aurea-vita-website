/**
 * Datos listados de la página de inicio (docs/copy.md §2 y §12,
 * ronda 15 jun). Las mayúsculas de los eyebrows se aplican vía CSS
 * (utilidad `eyebrow`), nunca en estos datos (copy §11).
 */

/** Hero del Home (copy §1.2 / §12). Sin eyebrow (eliminado en la ronda). */
export const heroHome = {
  titulo: 'Santuario frente al Pacífico',
  subtitulo:
    'Un santuario frente al mar donde no existen los horarios, solo el descanso, el bienestar y el placer de vivir plenamente.',
};

/**
 * Sección "Descubre Aurea Vita" (copy §2.1 / §12). Sin eyebrow
 * (eliminado en la ronda). Cuerpo en tres párrafos del cliente.
 * Ronda 23 jul: título ampliado con ", tu casa frente al mar".
 * Ronda ago 26 (docs/fotos/catalogo-definitivas.md): la entrega del
 * cliente NO trae ninguna toma de dron, así que la vista abierta de la
 * casa la sostiene ahora `alberca_12` (calidad 5): deck, alberca y
 * jacuzzi abiertos al Pacífico, el equivalente en espíritu a la aérea.
 */
export const bienvenida = {
  titulo: 'Descubre Aurea Vita, tu casa frente al mar',
  foto: {
    src: '/fotos/alberca/alberca_12.jpg',
    alt: 'Alberca y jacuzzi abiertos al Pacífico con camastros sobre deck de madera',
  },
  cuerpo: [
    'En Aurea Vita creemos que el verdadero lujo es disponer de tiempo para uno mismo. Frente al Pacífico, hemos creado un refugio donde los días transcurren sin prisas y cada experiencia está pensada para reconectar con lo esencial. Aquí no existen itinerarios rígidos ni horarios que seguir. El mar marca el ritmo, la tranquilidad guía cada momento y el bienestar surge de forma natural.',
    'Comienza la mañana con una vista infinita al océano, disfruta una gastronomía saludable y llena de sabor, relájate con terapias y masajes diseñados para restaurar cuerpo y mente, o simplemente encuentra un espacio para descansar profundamente mientras la brisa acompaña el día.',
    'Aurea Vita es una invitación a vivir despacio, a nutrirse conscientemente y a redescubrir el placer de estar presente. Porque algunas experiencias no se miden por lo que haces, sino por cómo te hacen sentir.',
  ],
};

/**
 * Grid de 3 tarjetas (copy §2.2 / §12). Ronda 15 jun:
 * T2 "Gastronomía" → "Alimentación Consciente" (el `to` sigue
 * /gastronomia, D1); T3 "Spa Vita" → "Experiencia Aurea Vita" (el `to`
 * sigue /spa, D4). Eyebrows y rutas conservados.
 * Ronda ago 26 (fotografía definitiva): el tríptico toma una foto de
 * cada mundo que enlaza —habitaciones_26 (suite), restaurante_32 (la
 * mesa) y terraza_07 (el descanso)— todas calidad 4, sin repetirse en
 * ninguna otra sección del sitio. Sin `position`: las tres son 3:2 y
 * el sujeto queda centrado en el recorte 4:3 de FeatureCard.
 */
export const homeCards = [
  {
    to: '/habitaciones',
    eyebrow: 'Descanso',
    title: 'Habitaciones & Suites',
    text: 'Amplios espacios para descansar y relajarse con absoluta privacidad.',
    image: {
      src: '/fotos/habitaciones/habitaciones_26.jpg',
      alt: 'Suite principal con cama vestida en lino blanco y luz natural del Pacífico',
    },
  },
  {
    to: '/gastronomia',
    eyebrow: 'La mesa',
    title: 'Alimentación Consciente',
    text: 'Cocina saludable y llena de sabor, pensada para nutrir el cuerpo al ritmo del Pacífico.',
    image: {
      src: '/fotos/restaurante/restaurante_32.jpg',
      alt: 'Fruta fresca de temporada y parfaits de yogur servidos sobre madera',
    },
  },
  {
    to: '/spa',
    eyebrow: 'Bienestar',
    title: 'Experiencia Aurea Vita',
    text: 'Descubre el descanso profundo a tu propio ritmo.',
    image: {
      src: '/fotos/terraza/terraza_07.jpg',
      alt: 'Sombrero de palma sobre camastro con vista abierta al oleaje',
    },
  },
];

/**
 * Sección "El destino — Acapulco" (copy §2.3 / §12). Eyebrow
 * conservado; título nuevo; cuerpo en dos párrafos del cliente.
 */
export const destino = {
  eyebrow: 'El destino',
  titulo: 'Acapulco Diamante',
  cuerpo: [
    'Acapulco Diamante, una de las zonas más privilegiadas y mejor conservadas del Pacífico mexicano. Aquí, la naturaleza sigue siendo la protagonista. Kilómetros de playa prácticamente ininterrumpida, extensas áreas de vegetación tropical y la presencia constante del océano crean un entorno donde el tiempo parece transcurrir de forma diferente. El sonido de las olas, la brisa marina y los colores del paisaje acompañan cada momento, invitando a reducir el ritmo y reconectar con lo esencial.',
    'En Aurea Vita, creemos que el bienestar comienza con el lugar que nos rodea y con la capacidad de detenernos para apreciarlo. Más que un destino, este es un espacio para respirar profundamente, reconectar con uno mismo y dejar que la naturaleza marque el ritmo del día.',
  ],
  /* Ronda ago 26: sin tomas de dron en la entrega, el destino lo cuenta
     la luz —terraza_05 (calidad 5), el sol poniéndose sobre el jardín
     del hotel: mismo cielo dorado del Pacífico que sostenía la aérea. */
  foto: {
    src: '/fotos/terraza/terraza_05.jpg',
    alt: 'Sol poniente sobre el jardín del hotel, con el tipi de picnic recortado contra el cielo',
  },
};

/** Datos del destino en serif grande (copy §2.3, D3: SE CONSERVAN). */
export const destinoStats = [
  { valor: '300', detalle: 'días de sol al año' },
  { valor: '27°', detalle: 'temperatura media del agua' },
  /* Cifra pura, como "300" y "27°": las tres columnas comparten la misma
     anatomía (número gigante en serif + detalle) sin saltos de línea. */
  { valor: '12', detalle: 'minutos de la bahía de Santa Lucía' },
];

/**
 * Banda CTA final de reserva (copy §2.5 / §12).
 * `foto` hace doble trabajo: fondo a sangre de la banda y poster del
 * video en bucle. Pide horizontal amplia y evocadora, así que toma la
 * mejor del catálogo —alberca_02, calidad 5, el borde infinito contra
 * el Pacífico en el azul profundo del crepúsculo— en sustitución de la
 * aérea de costa que ya no existe en la entrega.
 */
export const ctaFinal = {
  eyebrow: 'Reservaciones',
  titulo: 'El Pacífico no se apura. Tú tampoco deberías.',
  texto:
    'Un refugio frente al mar para descansar, reconectar y disfrutar al ritmo de las olas.',
  boton: 'Reservar mi estancia',
  foto: {
    src: '/fotos/alberca/alberca_02.jpg',
    alt: 'Alberca infinita frente al Pacífico bajo el azul profundo del crepúsculo',
  },
};

/* La sección "Momentos — El agua, a su propio ritmo" (antes §2.4 y su
   `momentosFotos`) se ELIMINÓ por completo en la ronda 15 jun (§9.3). */
