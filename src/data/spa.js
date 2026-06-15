/**
 * Spa & Bienestar — "Spa Vita" (docs/copy.md §5, brief §4.4).
 *
 * Es la página más "SHA" del sitio: los verdes (oliva/salvia)
 * sustituyen al dorado como acento dominante, pero SOLO en líneas
 * decorativas, en fondos suaves y en el bloque de contraste oliva —
 * nunca como texto pequeño sobre fondos claros (salvia y oliva fallan
 * AA ahí). Por eso los eyebrows sobre marfil/arena van en marino, igual
 * que el comportamiento por defecto de SectionHeading.
 *
 * Fotos según curaduría (docs/fotos/spa-terraza.md, brief §4.4/§4.8):
 * spa_01 es el hero; el circuito de aguas usa spa_06 (la alberca de
 * inmersión en patio de arena, la más serena y en paleta del set); los
 * rituales/aromaterapia usan spa_15 + spa_09. Descartadas: spa_11
 * (letrero ajeno), spa_14 (clínica médica), spa_07 (manicure dorada) y
 * spa_03 (azulejo turquesa + grifo cromado-dorado, fuera de paleta: el
 * pase global la retiró del bloque de contraste; QA P2).
 *
 * Las mayúsculas de los eyebrows y de las duraciones las pone CSS
 * (utilidad `eyebrow`), nunca estos datos (copy §11). Sin precios:
 * el menú de tratamientos es tipográfico, no transaccional (brief §4.4).
 */

/**
 * Encabezado de la página (copy §5.1 / §12, ronda 15 jun). Título
 * "Spa Vita" → "Wellness"; subtítulo nuevo (más pequeño, bajo el H1);
 * eyebrow salvia "Bienestar" se conserva. La ruta sigue /spa (D4).
 */
export const spaHeader = {
  eyebrow: 'Bienestar',
  titulo: 'Wellness',
  subtitulo: 'Donde el bienestar sucede de forma natural.',
  hero: {
    src: '/fotos_hotel/spa/spa_01.jpeg',
    alt: 'Camilla de masaje sobre piso de mármol en el Wellness de Aurea Vita, en penumbra serena',
  },
};

/**
 * Texto central — bloque solo-texto sobre marfil (copy §5.2 / §12,
 * ronda 15 jun). Reemplaza la filosofía anterior por el texto literal
 * del cliente. El eyebrow salvia se conserva como tratamiento visual.
 * Los párrafos viejos quedan archivados en `spaFilosofiaArchivada`
 * (reviven con el menú; no se borran del repo).
 */
export const spaFilosofia = {
  eyebrow: 'Nuestra filosofía',
  texto:
    'Disfruta nuestros masajes, terapias y experiencias que han sido diseñados para ayudarte a desacelerar, liberar tensiones y reconectar contigo mismo. Date el tiempo necesario para descansar y relajarte profundamente, armonizando con el sonido del Pacífico sin horarios y en tranquilidad total.',
};

/** Filosofía anterior — ARCHIVADA (copy §5.2): revive con el menú. */
export const spaFilosofiaArchivada = {
  eyebrow: 'Nuestra filosofía',
  titulo: 'El descanso también se aprende',
  parrafos: [
    'En Spa Vita no prometemos transformaciones. Trabajamos con algo más modesto y más difícil: que durante unas horas tu cuerpo no tenga nada que resolver. Piedra, agua tibia, aceites de la costa y manos que saben esperar. El resto lo hace el propio cuerpo, que recuerda descansar en cuanto se le permite.',
    'Cada ritual comienza con una conversación breve y un té de hierbas de la región. No hay música genérica ni prisa entre citas: la siguiente hora es tuya, completa. Te pedimos solo una cosa al entrar —dejar el teléfono en la canasta de la entrada—. Nadie lo ha lamentado.',
  ],
};

/** Menú de tratamientos — lista tipográfica vertical (copy §5.3). */
export const spaMenu = {
  eyebrow: 'Rituales y tratamientos',
  titulo: 'El menú de la calma',
  tratamientos: [
    {
      nombre: 'Ritual Aurea',
      duracion: '90 min',
      descripcion:
        'El ritual insignia de la casa: exfoliación con sal de mar y coco, masaje de cuerpo completo con aceite tibio de ajonjolí y un cierre de presiones lentas en rostro y cuero cabelludo. Se sale caminando distinto.',
    },
    {
      nombre: 'Piedras del Pacífico',
      duracion: '80 min',
      descripcion:
        'Piedras volcánicas calientes recorren la espalda al ritmo de la respiración. El calor hace en los músculos lo que las palabras no alcanzan.',
    },
    {
      nombre: 'Masaje Marea',
      duracion: '60 / 90 min',
      descripcion:
        'Masaje de presión media a profunda que sigue el compás del oleaje: largo, constante, sin sobresaltos. Ideal tras un vuelo o una temporada de más pantallas que cielo.',
    },
    {
      nombre: 'Envoltura de Salvia y Coco',
      duracion: '75 min',
      descripcion:
        'El cuerpo se envuelve en una mezcla tibia de salvia fresca y pulpa de coco mientras el rostro recibe un masaje con cuarzo frío. La piel queda como después de una semana de mar.',
    },
    {
      nombre: 'Rostro al Amanecer',
      duracion: '60 min',
      descripcion:
        'Facial de limpieza profunda e hidratación con miel de la montaña de Guerrero y aloe. Luz nueva para la piel que ha tomado sol con entusiasmo.',
    },
    {
      nombre: 'Circuito de Aguas',
      duracion: '120 min',
      descripcion:
        'Recorrido guiado por vapor, tina de inmersión fría y alberca templada de flotación, con pausas de té e higos. Puede tomarse solo o como preludio de cualquier ritual.',
    },
  ],
};

/**
 * Bloque "Circuito de aguas" — sección de contraste (copy §5.4).
 * El pase global la convirtió en una banda inmersiva de foto a sangre
 * completa (spa_06 + overlay marino, patrón de los heroes): el texto
 * marfil sobre el scrim marino alcanza AA, lo que el fondo plano oliva
 * no permitía con ningún token (QA P1). El verde del agua de la propia
 * alberca + el eyebrow salvia y la línea oliva conservan la identidad.
 */
export const spaCircuito = {
  eyebrow: 'El agua como medicina',
  titulo: 'Frío, calor y nada más',
  texto:
    'El circuito de aguas alterna temperaturas como lo ha hecho la gente de mar desde siempre: vapor que abre, agua fría que despierta, flotación que suelta. Cuarenta minutos después, el cuerpo opina distinto.',
  foto: {
    src: '/fotos_hotel/spa/spa_06.jpeg',
    alt: 'Alberca de inmersión del circuito de aguas en un patio de muros de arena',
  },
};

/** Bloque rituales / aromaterapia (copy §5.5). */
export const spaAromaterapia = {
  eyebrow: 'Los detalles',
  titulo: 'Aromas de la costa',
  texto:
    'Todos los aceites y mezclas del Spa Vita se preparan en casa con ingredientes de la región: coco, salvia, cacao, sal de mar. Lo que toca tu piel viene de cerca.',
  fotos: {
    aceites: {
      src: '/fotos_hotel/spa/spa_15.jpeg',
      alt: 'Composición de aceites y sales del Spa Vita en tonos arena',
    },
    vela: {
      src: '/fotos_hotel/spa/spa_09.jpeg',
      alt: 'Vela encendida y difusor de aromaterapia en el Spa Vita',
    },
  },
};

/**
 * Nota de cierre "próximamente" (copy §5.6 / §12, ronda 15 jun).
 * Reemplaza la nota práctica mientras el menú está gateado: voz de
 * marca, sin disculpas, que da continuidad a la página y guía al
 * concierge. Cuando el menú reviva, vuelve `spaNotaArchivada`.
 */
export const spaNota = {
  titulo: 'Lo mejor, en camino',
  texto:
    'Estamos afinando cada detalle de nuestro Wellness: el menú de tratamientos, el circuito de aguas y los rituales de la costa llegarán muy pronto. Mientras tanto, nuestro concierge puede contarte qué preparamos y reservar tu lugar para cuando decidas venir.',
};

/** Nota práctica original — ARCHIVADA (copy §5.6): revive con el menú. */
export const spaNotaArchivada = {
  titulo: 'Para tu visita',
  texto:
    'El spa abre todos los días de 9:00 a 20:00. Te sugerimos reservar tus rituales con 24 horas de anticipación con el concierge o desde el formulario de contacto, y llegar 20 minutos antes para comenzar sin prisa. Los tratamientos están disponibles para huéspedes y visitantes con reservación.',
};

/** Banda CTA de cierre (copy §5.7). */
export const spaCta = {
  titulo: 'Tu cuerpo ya sabe lo que necesita.',
  texto: 'Agenda tu ritual y nosotros preparamos el silencio.',
  boton: 'Agendar mi ritual',
};
