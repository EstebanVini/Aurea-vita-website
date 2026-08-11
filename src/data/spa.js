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
 * HERO (restitución, docs/Fotos WEB AV.pdf): el cliente asigna casa_63
 * —la camilla de masaje frente al muro de duelas— a la portada de
 * /spa. Sustituye a spa_07 (la sesión de yoga que había elegido la
 * ronda ago 26); spa_07 no se borra, sigue en disco para la galería.
 * Es además un hero más literal: la página se llama Wellness y ahora
 * abre con la camilla, no con una actividad de jardín. Dimensiones
 * 1600×1244 —de las pocas del set que NO son 3:2— y encuadre 50% 45%
 * van en Spa.jsx, que es donde vive el <img>.
 *
 * Resto de fotos (ronda ago 26, docs/fotos/catalogo-definitivas.md): el
 * set real de spa son 11 tomas —yoga en el jardín y dos salas de
 * tratamiento—, ninguna de agua. Por eso
 * la aromaterapia usa el par spa_10 (aceites sobre camilla, el detalle)
 * + spa_11 (la sala completa, para dar escala). El circuito de aguas no
 * tiene foto propia en la entrega: lo sostiene alberca_10, el espejo de
 * agua al pie de los ventanales, que además aguanta el scrim marino de
 * la banda inmersiva sin perder legibilidad.
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
    src: '/fotos/casa/casa_63.jpg',
    alt: 'Camilla de masaje frente a muro de duelas de madera y flores frescas',
  },
};

/**
 * CTA de reservación de espacios (ronda 23 jul, docs/Fotos WEB AV.pdf):
 * el cliente pidió un botón "Reservar espacio" bajo el hero que mande a
 * un calendario de citas para masajes y terapias. El calendario AÚN NO
 * EXISTE: mientras tanto `to` apunta a /contacto — cuando el cliente
 * entregue la herramienta (Calendly/Odoo/etc.), basta cambiar aquí el
 * destino (si es URL externa, cambiar el <Link> por <a> en Spa.jsx).
 *
 * Ronda 23 jul, recomposición: el botón dejó de colgar suelto bajo la
 * filosofía y vive en una banda compacta anclada al hero (el cliente lo
 * dibujó justo ahí, cargado a la derecha). `nota` es microcopy NUEVO de
 * apoyo (no es texto del cliente): una línea serena que ancla el botón
 * para que no flote solo en la banda.
 */
export const spaReserva = {
  nota: 'Tu momento de calma también se reserva.',
  boton: 'Reservar espacio',
  to: '/contacto',
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
 * completa (foto + overlay marino, patrón de los heroes): el texto
 * marfil sobre el scrim marino alcanza AA, lo que el fondo plano oliva
 * no permitía con ningún token (QA P1). Ronda ago 26: sin tomas de agua
 * en el set de spa, la banda la sostiene alberca_10 —mosaico azul al
 * pie de los ventanales al caer la tarde—; su azul profundo sigue
 * dialogando con el eyebrow salvia y la línea oliva.
 */
export const spaCircuito = {
  eyebrow: 'El agua como medicina',
  titulo: 'Frío, calor y nada más',
  texto:
    'El circuito de aguas alterna temperaturas como lo ha hecho la gente de mar desde siempre: vapor que abre, agua fría que despierta, flotación que suelta. Cuarenta minutos después, el cuerpo opina distinto.',
  foto: {
    src: '/fotos/alberca/alberca_10.jpg',
    alt: 'Alberca de mosaico azul al pie de los ventanales iluminados del hotel',
  },
};

/** Bloque rituales / aromaterapia (copy §5.5). */
export const spaAromaterapia = {
  eyebrow: 'Los detalles',
  titulo: 'Aromas de la costa',
  texto:
    'Todos los aceites y mezclas del Spa Vita se preparan en casa con ingredientes de la región: coco, salvia, cacao, sal de mar. Lo que toca tu piel viene de cerca.',
  /* Par detalle + escala: el primer slot va al close-up de los aceites
     y el segundo abre a la sala que los recibe (no hay tomas de velas
     ni difusores en la entrega). */
  fotos: {
    aceites: {
      src: '/fotos/spa/spa_10.jpg',
      alt: 'Set de aceites esenciales sobre la camilla, antesala de un ritual de bienestar',
    },
    vela: {
      src: '/fotos/spa/spa_11.jpg',
      alt: 'Sala de tratamiento con camilla de masaje y muro de madera acanalada',
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
