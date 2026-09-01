/**
 * Spa & Bienestar — "Spa Vita" (docs/copy.md §5, brief §4.4).
 *
 * i18n (ronda 31 ago 2026): cada export pasa a la forma { es, en }. El
 * bloque `es` conserva los textos existentes VERBATIM; el `en` sale de
 * docs/traduccion_ingles.md (cliente — cubre también el contenido
 * gateado del menú, el circuito y la aromaterapia) y de
 * docs/traduccion_ui_faltante.md (los dos bloques archivados). Se
 * traduce TODO, incluido lo gateado/archivado, para que la reactivación
 * no deje huecos — pero nada oculto se activa en esta ronda.
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
 * 2048×1592 —de las pocas del set que NO son 3:2— y encuadre 50% 70%
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
 * `metaTitulo`/`metaDescripcion` alimentan usePageMeta.
 */
export const spaHeader = {
  es: {
    metaTitulo: 'Wellness · Aurea Vita Acapulco',
    metaDescripcion:
      'Wellness frente al Pacífico: masajes, terapias y experiencias para desacelerar y reconectar contigo mismo, al ritmo del mar. Muy pronto, el menú completo.',
    eyebrow: 'Bienestar',
    titulo: 'Wellness',
    subtitulo: 'Donde el bienestar sucede de forma natural.',
    hero: {
      src: '/fotos/casa/casa_63.jpg',
      alt: 'Camilla de masaje frente a muro de duelas de madera y flores frescas',
    },
  },
  en: {
    metaTitulo: 'Wellness · Aurea Vita Acapulco',
    metaDescripcion:
      'Wellness on the Pacific: massages, therapies and experiences designed to help you slow down and reconnect with yourself, to the rhythm of the sea. The complete menu is coming soon.',
    eyebrow: 'Well-being',
    titulo: 'Wellness',
    subtitulo: 'Where well-being happens naturally.',
    hero: {
      src: '/fotos/casa/casa_63.jpg',
      alt: 'Massage table before a wood-slat wall, with fresh flowers',
    },
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
 * para que no flote solo en la banda. En inglés, nota y botón son el
 * RESERVATION MICROCOPY y el CTA del doc del cliente.
 */
export const spaReserva = {
  es: {
    nota: 'Tu momento de calma también se reserva.',
    boton: 'Reservar espacio',
    to: '/contacto',
  },
  en: {
    nota: 'Your moment of calm deserves to be reserved, too.',
    boton: 'Reserve your experience',
    to: '/contacto',
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
  es: {
    eyebrow: 'Nuestra filosofía',
    texto:
      'Disfruta nuestros masajes, terapias y experiencias que han sido diseñados para ayudarte a desacelerar, liberar tensiones y reconectar contigo mismo. Date el tiempo necesario para descansar y relajarte profundamente, armonizando con el sonido del Pacífico sin horarios y en tranquilidad total.',
  },
  en: {
    eyebrow: 'Our philosophy',
    texto:
      'Enjoy massages, therapies and experiences designed to help you slow down, release tension and reconnect with yourself. Give yourself the time you need to rest and relax deeply, in harmony with the sound of the Pacific—without schedules and in complete tranquility.',
  },
};

/** Filosofía anterior — ARCHIVADA (copy §5.2): revive con el menú. */
export const spaFilosofiaArchivada = {
  es: {
    eyebrow: 'Nuestra filosofía',
    titulo: 'El descanso también se aprende',
    parrafos: [
      'En Spa Vita no prometemos transformaciones. Trabajamos con algo más modesto y más difícil: que durante unas horas tu cuerpo no tenga nada que resolver. Piedra, agua tibia, aceites de la costa y manos que saben esperar. El resto lo hace el propio cuerpo, que recuerda descansar en cuanto se le permite.',
      'Cada ritual comienza con una conversación breve y un té de hierbas de la región. No hay música genérica ni prisa entre citas: la siguiente hora es tuya, completa. Te pedimos solo una cosa al entrar —dejar el teléfono en la canasta de la entrada—. Nadie lo ha lamentado.',
    ],
  },
  en: {
    eyebrow: 'Our philosophy',
    titulo: 'Rest, too, can be learned',
    parrafos: [
      'At Spa Vita, we promise no transformations. We work with something more modest and more difficult: that for a few hours, your body has nothing to resolve. Stone, warm water, oils from the coast and hands that know how to wait. The body does the rest—it remembers how to rest the moment it is allowed to.',
      'Every ritual begins with a brief conversation and a tea of regional herbs. There is no generic music, no rush between appointments: the next hour is yours, entirely. We ask only one thing as you enter—leave your phone in the basket by the door. No one has regretted it.',
    ],
  },
};

/**
 * Menú de tratamientos — lista tipográfica vertical (copy §5.3).
 * GATEADO tras SECCIONES_EN_CONSTRUCCION en Spa.jsx; traducido para
 * que la reactivación no deje huecos.
 */
export const spaMenu = {
  es: {
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
  },
  en: {
    eyebrow: 'Rituals & treatments',
    titulo: 'The Menu of Calm',
    tratamientos: [
      {
        nombre: 'Aurea Ritual',
        duracion: '90 min',
        descripcion:
          'The house signature: a sea-salt and coconut exfoliation, a full-body massage with warm sesame oil, and a finish of slow pressure applied to the face and scalp. You leave walking differently.',
      },
      {
        nombre: 'Pacific Stones',
        duracion: '80 min',
        descripcion:
          'Warm volcanic stones travel along the back in time with the breath. The heat does for the muscles what words cannot.',
      },
      {
        nombre: 'Tide Massage',
        duracion: '60 / 90 min',
        descripcion:
          'A medium-to-deep-pressure massage that follows the cadence of the surf: long, constant and without interruption. Ideal after a flight—or a season with more screens than sky.',
      },
      {
        nombre: 'Sage & Coconut Wrap',
        duracion: '75 min',
        descripcion:
          'The body is wrapped in a warm blend of fresh sage and coconut pulp while the face receives a massage with cool quartz. Skin feels as though it has spent a week by the sea.',
      },
      {
        nombre: 'Face at Dawn',
        duracion: '60 min',
        descripcion:
          'A deep-cleansing, hydrating facial with honey from the mountains of Guerrero and aloe. New light for skin that has embraced the sun enthusiastically.',
      },
      {
        nombre: 'Water Circuit',
        duracion: '120 min',
        descripcion:
          'A guided journey through steam, a cold plunge and a warm flotation pool, with pauses for tea and figs. Enjoy it on its own or as a prelude to any ritual.',
      },
    ],
  },
};

/**
 * Bloque "Circuito de aguas" — sección de contraste (copy §5.4).
 * GATEADO. El pase global la convirtió en una banda inmersiva de foto a
 * sangre completa (foto + overlay marino, patrón de los heroes): el
 * texto marfil sobre el scrim marino alcanza AA, lo que el fondo plano
 * oliva no permitía con ningún token (QA P1). Ronda ago 26: sin tomas
 * de agua en el set de spa, la banda la sostiene alberca_10 —mosaico
 * azul al pie de los ventanales al caer la tarde—; su azul profundo
 * sigue dialogando con el eyebrow salvia y la línea oliva.
 */
export const spaCircuito = {
  es: {
    eyebrow: 'El agua como medicina',
    titulo: 'Frío, calor y nada más',
    texto:
      'El circuito de aguas alterna temperaturas como lo ha hecho la gente de mar desde siempre: vapor que abre, agua fría que despierta, flotación que suelta. Cuarenta minutos después, el cuerpo opina distinto.',
    foto: {
      src: '/fotos/alberca/alberca_10.jpg',
      alt: 'Alberca de mosaico azul al pie de los ventanales iluminados del hotel',
    },
  },
  en: {
    eyebrow: 'Water as medicine',
    titulo: 'Cold, Heat and Nothing More',
    texto:
      'The water circuit alternates temperatures as people of the sea have always done: steam that opens, cold water that awakens, flotation that releases. Forty minutes later, the body has a different opinion.',
    foto: {
      src: '/fotos/alberca/alberca_10.jpg',
      alt: 'Blue mosaic pool beneath the hotel’s illuminated windows',
    },
  },
};

/**
 * Bloque rituales / aromaterapia (copy §5.5). GATEADO.
 * Par detalle + escala: el primer slot va al close-up de los aceites
 * y el segundo abre a la sala que los recibe (no hay tomas de velas
 * ni difusores en la entrega).
 */
export const spaAromaterapia = {
  es: {
    eyebrow: 'Los detalles',
    titulo: 'Aromas de la costa',
    texto:
      'Todos los aceites y mezclas del Spa Vita se preparan en casa con ingredientes de la región: coco, salvia, cacao, sal de mar. Lo que toca tu piel viene de cerca.',
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
  },
  en: {
    eyebrow: 'The details',
    titulo: 'Scents of the Coast',
    texto:
      'All Spa Vita oils and blends are prepared in-house with ingredients from the region: coconut, sage, cacao and sea salt. Everything that touches your skin comes from nearby.',
    fotos: {
      aceites: {
        src: '/fotos/spa/spa_10.jpg',
        alt: 'Essential oils arranged on the massage table, awaiting a wellness ritual',
      },
      vela: {
        src: '/fotos/spa/spa_11.jpg',
        alt: 'Treatment room with a massage table and fluted wood wall',
      },
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
  es: {
    titulo: 'Lo mejor, en camino',
    texto:
      'Estamos afinando cada detalle de nuestro Wellness: el menú de tratamientos, el circuito de aguas y los rituales de la costa llegarán muy pronto. Mientras tanto, nuestro concierge puede contarte qué preparamos y reservar tu lugar para cuando decidas venir.',
  },
  en: {
    titulo: 'The Best Is on Its Way',
    texto:
      'We are perfecting every detail of our Wellness offering. The treatment menu, water circuit and coastal rituals will arrive very soon. In the meantime, our concierge will be pleased to share what we are preparing and reserve your place whenever you decide to visit.',
  },
};

/** Nota práctica original — ARCHIVADA (copy §5.6): revive con el menú. */
export const spaNotaArchivada = {
  es: {
    titulo: 'Para tu visita',
    texto:
      'El spa abre todos los días de 9:00 a 20:00. Te sugerimos reservar tus rituales con 24 horas de anticipación con el concierge o desde el formulario de contacto, y llegar 20 minutos antes para comenzar sin prisa. Los tratamientos están disponibles para huéspedes y visitantes con reservación.',
  },
  en: {
    titulo: 'For your visit',
    texto:
      'The spa is open every day from 9:00 to 20:00. We suggest reserving your rituals 24 hours in advance with the concierge or through the contact form, and arriving 20 minutes early so you can begin without haste. Treatments are available to guests and visitors with a reservation.',
  },
};

/** Banda CTA de cierre (copy §5.7). */
export const spaCta = {
  es: {
    titulo: 'Tu cuerpo ya sabe lo que necesita.',
    texto: 'Agenda tu ritual y nosotros preparamos el silencio.',
    boton: 'Agendar mi ritual',
  },
  en: {
    titulo: 'Your body already knows what it needs.',
    texto: 'Schedule your ritual and we will prepare the silence.',
    boton: 'Schedule my ritual',
  },
};
