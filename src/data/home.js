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
 *
 * FOTO (restitución, docs/Fotos WEB AV.pdf): el cliente asigna a esta
 * sección la aérea `dron_21`. La ronda ago 26 la había sustituido por
 * `alberca_12` porque el set de entrega de entonces no traía tomas de
 * dron; las aéreas SÍ existen ya en `public/fotos/casa/`, así que se
 * restituye la que pide el PDF. `alberca_12` no se borra del disco:
 * sigue disponible para la galería.
 * El encuadre (50% 35%) y las dimensiones intrínsecas (1600×1200) viven
 * en Home.jsx, que es donde este archivo pinta el <img> — ver la nota
 * de recorte ahí: el 4:5 sobre una aérea 4:3 es agresivo.
 */
export const bienvenida = {
  titulo: 'Descubre Aurea Vita, tu casa frente al mar',
  foto: {
    src: '/fotos/casa/dron_21.jpg',
    alt: 'Vista aérea de la casa frente al mar con alberca y jardines cuidados',
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
 *
 * FOTOS (restitución, docs/Fotos WEB AV.pdf): el cliente asigna una
 * foto concreta a cada card del tríptico —casa_69 (Descanso), casa_93
 * (La mesa) y casa_78 (Bienestar)—, que sustituyen al trío elegido en
 * la ronda ago 26 (habitaciones_26 / restaurante_32 / terraza_07; estas
 * NO se borran del disco, siguen sirviendo a la galería).
 * Las tres son 3:2 (1600×1066), igual que el hint 940×627 que
 * FeatureCard fija, así que el recorte 4:3 de la card es lateral y
 * suave. Ahora SÍ llevan `position` (la nota anterior decía que no
 * hacía falta): FeatureCard la aplica como `object-position` en línea y
 * son los encuadres del curador visual, que anclan el sujeto de cada
 * toma —cabecera, plato y camastro— dentro de ese recorte.
 */
export const homeCards = [
  {
    to: '/habitaciones',
    eyebrow: 'Descanso',
    title: 'Habitaciones & Suites',
    text: 'Amplios espacios para descansar y relajarse con absoluta privacidad.',
    image: {
      src: '/fotos/casa/casa_69.jpg',
      alt: 'Suite luminosa con cabecera de mármol retroiluminada y estancia en piedra clara',
      /* Apenas a la izquierda (45%): mantiene la cabecera retroiluminada
         en cuadro y cede el borde derecho, que es solo estancia. */
      position: '45% 50%',
    },
  },
  {
    to: '/gastronomia',
    eyebrow: 'La mesa',
    title: 'Alimentación Consciente',
    text: 'Cocina saludable y llena de sabor, pensada para nutrir el cuerpo al ritmo del Pacífico.',
    image: {
      src: '/fotos/casa/casa_93.jpg',
      alt: 'Fruta fresca de temporada y yogur con granola servidos en la mesa de desayuno',
      /* Encuadre apenas bajo (55%): la comida vive en la mitad inferior
         del cuadro; subir el recorte se comería los platos. */
      position: '50% 55%',
    },
  },
  {
    to: '/spa',
    eyebrow: 'Bienestar',
    title: 'Experiencia Aurea Vita',
    text: 'Descubre el descanso profundo a tu propio ritmo.',
    image: {
      src: '/fotos/casa/casa_78.jpg',
      alt: 'Coco natural, naranja y hierbabuena junto al camastro, ritual de descanso',
      /* Bajo y a la derecha (55% 55%): centra el servicio sobre la mesa
         auxiliar, que es el sujeto, y no el respaldo del camastro. */
      position: '55% 55%',
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
  /* FOTO (restitución, docs/Fotos WEB AV.pdf): el cliente asigna a
     "Acapulco Diamante" la aérea `dron_26`, la casa recortada contra el
     cielo del atardecer. Sustituye a `terraza_05`, que la ronda ago 26
     había puesto aquí como sucedáneo porque el set de entonces no traía
     aéreas; `terraza_05` queda en disco para la galería.
     Encuadre (50% 58%) y dimensiones (1600×1163) van en Home.jsx, que
     es donde vive este <img> (foto sticky con parallax). */
  foto: {
    src: '/fotos/casa/dron_26.jpg',
    alt: 'La casa recortada contra el cielo encendido del atardecer en Acapulco Diamante',
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
