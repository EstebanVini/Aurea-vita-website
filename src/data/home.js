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
 */
export const bienvenida = {
  titulo: 'Descubre Aurea Vita',
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
 */
export const homeCards = [
  {
    to: '/habitaciones',
    eyebrow: 'Descanso',
    title: 'Habitaciones & Suites',
    text: 'Amplios espacios para descansar y relajarse con absoluta privacidad.',
    image: {
      src: '/fotos_hotel/habitaciones/habitaciones_12.jpeg',
      alt: 'Suite con cama amplia en tonos arena y vista abierta al mar',
      /* La cama vive en el 60% derecho de la foto; el recorte centrado
         mostraba cortina y puerta en lugar del sujeto. El reencuadre
         horizontal (62%) sigue siendo el correcto en el nuevo recorte
         4:3 de FeatureCard: ancla la cama, no la cortina lateral. */
      position: '62% 50%',
    },
  },
  {
    to: '/gastronomia',
    eyebrow: 'La mesa',
    title: 'Alimentación Consciente',
    text: 'Cocina saludable y llena de sabor, pensada para nutrir el cuerpo al ritmo del Pacífico.',
    image: {
      src: '/fotos_hotel/restaurante/restaurante_11.jpeg',
      alt: 'Mesa servida del restaurante Origen con vista a la bahía al atardecer',
    },
  },
  {
    to: '/spa',
    eyebrow: 'Bienestar',
    title: 'Experiencia Aurea Vita',
    text: 'Descubre el descanso profundo a tu propio ritmo.',
    image: {
      src: '/fotos_hotel/spa/spa_01.jpeg',
      alt: 'Sala de masaje del Spa Vita con camilla sobre piso de mármol',
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
  foto: {
    src: '/fotos_hotel/aereas/aereas_15.jpeg',
    alt: 'Vista aérea de la bahía de Acapulco al atardecer, con el sol bajo sobre el Pacífico',
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

/** Banda CTA final de reserva (copy §2.5 / §12). */
export const ctaFinal = {
  eyebrow: 'Reservaciones',
  titulo: 'El Pacífico no se apura. Tú tampoco deberías.',
  texto:
    'Un refugio frente al mar para descansar, reconectar y disfrutar al ritmo de las olas.',
  boton: 'Reservar mi estancia',
  foto: {
    src: '/fotos_hotel/aereas/aereas_09.jpeg',
    alt: 'Costa de Acapulco bajo la luz dorada de la mañana, vista desde el aire',
  },
};

/* La sección "Momentos — El agua, a su propio ritmo" (antes §2.4 y su
   `momentosFotos`) se ELIMINÓ por completo en la ronda 15 jun (§9.3). */
