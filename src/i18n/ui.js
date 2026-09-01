/**
 * Diccionario de strings de UI compartidos (i18n ES/EN, ronda 31 ago
 * 2026). Fuentes: docs/traduccion_ingles.md (copy del cliente, usado
 * VERBATIM) y docs/traduccion_ui_faltante.md (UX Writer, mismo tono).
 * El contenido editorial por página vive en src/data/*.js con la misma
 * forma { es, en }; aquí solo hay chrome de UI: navegación, footer,
 * formularios, aria-labels y las dos páginas sin archivo de datos
 * (Galería y Contacto).
 *
 * Convenciones:
 * - Los eyebrows van en sentence case: las mayúsculas las aplica CSS
 *   (utilidad `eyebrow`), nunca estos datos (copy §11) — igual en EN.
 * - Los strings interpolados son funciones (n, total, alt…): así cada
 *   idioma ordena sus partes como le corresponde.
 * - Se consume vía useT() (src/i18n/LanguageContext.jsx), que devuelve
 *   el sub-objeto del idioma activo.
 */
export const ui = {
  es: {
    /* Compartidos */
    skipLink: 'Saltar al contenido',
    /* Eyebrow de las bandas CTA de cierre (Habitaciones, Gastronomía,
       Spa, Experiencias). */
    reservaciones: 'Reservaciones',
    /* Label por defecto del link de FeatureCard. */
    descubrir: 'Descubrir',

    /* Navegación: Navbar y Footer consumen ESTE MISMO array — la regla
       "idénticos entre sí" (brief §2.1 / copy §9.4) ahora se cumple por
       construcción, con una sola fuente por idioma. Sin "Gastronomía"
       (vive en la tarjeta del Home); "Wellness" apunta a /spa (D4). */
    navLinks: [
      { to: '/', label: 'Inicio' },
      { to: '/habitaciones', label: 'Habitaciones' },
      { to: '/spa', label: 'Wellness' },
      { to: '/experiencias', label: 'Experiencias' },
      { to: '/galeria', label: 'Galería' },
      { to: '/contacto', label: 'Contacto' },
    ],

    nav: {
      reservar: 'Reservar',
      navAria: 'Navegación principal',
      logoAria: 'Aurea Vita — Inicio',
      abrirMenu: 'Abrir menú de navegación',
      cerrarMenu: 'Cerrar menú',
    },

    /* Toggle de idioma (microcopy de docs/traduccion_ui_faltante.md):
       texto visible "ES"/"EN"; aria-labels con el nombre completo en el
       idioma ACTIVO de la UI. `cambiado` alimenta el aria-live. */
    toggle: {
      grupoAria: 'Idioma del sitio',
      esAria: 'Español',
      enAria: 'Inglés',
      cambiado: 'Idioma cambiado a español',
    },

    footer: {
      tagline: 'Donde el día baja la voz.',
      navTitulo: 'Navegación',
      contactoTitulo: 'Contacto',
      newsletterTitulo: 'Cartas desde la costa',
      /* Dos líneas de <address>; solo el país cambia de idioma. */
      direccion: [
        'Av. Escénica 1200, Lomas del Pacífico',
        'Acapulco de Juárez, Guerrero, México',
      ],
      newsletterTexto: 'Una carta al mes: temporada, mesa y mareas. Nada más.',
      newsletterLabel: 'Correo electrónico para recibir las cartas',
      newsletterPlaceholder: 'nombre@correo.com',
      suscribirme: 'Suscribirme',
      newsletterOk: 'Listo. La próxima carta llegará a tu correo.',
      newsletterError: 'Revisa tu correo: parece incompleto.',
      legal:
        '© 2026 Aurea Vita. Hotel ficticio creado con fines de demostración; las fotografías son de dominio público.',
      avisoPrivacidad: 'Aviso de privacidad',
      terminos: 'Términos de estancia',
      navAria: 'Navegación del pie de página',
      logoAria: 'Aurea Vita — Inicio',
    },

    booking: {
      formAria: 'Consulta de disponibilidad',
      consultar: 'Consultar disponibilidad',
      cerrar: 'Cerrar',
      llegada: 'Llegada',
      salida: 'Salida',
      huespedes: 'Huéspedes',
      opciones: [
        { value: '1', label: '1 huésped' },
        { value: '2', label: '2 huéspedes' },
        { value: '3', label: '3 huéspedes' },
        { value: '4', label: '4 huéspedes' },
        { value: '5', label: '5 o más' },
      ],
    },

    roomCard: {
      verFoto: (n, total, alt) => `Ver fotografía ${n} de ${total}: ${alt}`,
    },

    lightbox: {
      visorAria: 'Visor de fotografías',
      ayudaTeclado: 'Usa las flechas para navegar y Escape para cerrar.',
      /* Prefijo sr-only del contador; conserva su espacio final. */
      fotografiaSr: 'Fotografía ',
      /* Conector del contador visible: "{n} de {total}". */
      de: 'de',
      cerrarVisor: 'Cerrar visor',
      cerrar: 'Cerrar',
      anterior: 'Fotografía anterior',
      siguiente: 'Fotografía siguiente',
    },

    video: {
      etiquetaDefecto: 'video de fondo',
      reproducir: (etiqueta) => `Reproducir ${etiqueta}`,
      pausar: (etiqueta) => `Pausar ${etiqueta}`,
      /* Alt del POSTER_DEFECTO de VideoBucle (solo lo consumiría un
         montaje futuro sin poster propio). */
      posterAlt:
        'Entrada principal de Aurea Vita entre palmeras al atardecer, con la iluminación cálida encendida y el Pacífico al fondo',
    },

    home: {
      conoceHabitaciones: 'Conoce nuestras habitaciones',
      exploraExperiencias: 'Explora las experiencias',
      gridSr: 'Habitaciones, gastronomía y spa',
      videoCta: 'video de fondo de la banda de reserva',
    },

    gastronomia: {
      figcaptionTerraza: 'La mañana en Origen · desayuno en la terraza verde',
      laCarta: 'La carta',
      coctelesTitulo: 'Cocteles de autor',
      horariosOrigen: 'Horarios de Origen',
      horariosCielo: 'Horarios de Cielo',
      tiempoSr: (n) => `Tiempo ${n}: `,
    },

    experiencias: {
      albercaStripAria: 'Momentos de la alberca a lo largo del día',
    },

    galeria: {
      metaTitulo: 'Galería · Aurea Vita Acapulco',
      metaDescripcion:
        'Un recorrido visual por Aurea Vita: arquitectura frente al Pacífico, habitaciones, alberca infinita, gastronomía, spa y atardeceres en terraza.',
      eyebrow: 'Galería',
      titulo: 'La casa, en imágenes',
      intro:
        'Un recorrido visual por Aurea Vita y su costa. Lo único que falta es la temperatura del aire.',
      filtrosAria: 'Filtrar fotografías por categoría',
      ampliarFoto: (n, total, alt) =>
        `Ampliar fotografía ${n} de ${total}: ${alt}`,
    },

    contacto: {
      metaTitulo: 'Aún en construcción · Aurea Vita Acapulco',
      metaDescripcion:
        'Nuestro sistema de reservaciones está en preparación. Muy pronto podrás apartar tu lugar frente al Pacífico.',
      logoAlt: 'Aurea Vita',
      eyebrow: 'Reservaciones',
      titulo: 'Aún en construcción',
      cuerpo:
        'Estamos afinando los últimos detalles de nuestro sistema de reservaciones. Muy pronto podrás apartar aquí tu lugar frente al Pacífico. Gracias por tu paciencia: el mar no se irá a ningún lado.',
      escribenos: 'Mientras tanto, escríbenos:',
      volver: 'Volver al inicio',
    },
  },

  en: {
    skipLink: 'Skip to content',
    reservaciones: 'Reservations',
    descubrir: 'Discover',

    navLinks: [
      { to: '/', label: 'Home' },
      { to: '/habitaciones', label: 'Rooms & Suites' },
      { to: '/spa', label: 'Wellness' },
      { to: '/experiencias', label: 'Experiences' },
      { to: '/galeria', label: 'Gallery' },
      { to: '/contacto', label: 'Contact' },
    ],

    nav: {
      reservar: 'Reserve',
      navAria: 'Main navigation',
      logoAria: 'Aurea Vita — Home',
      abrirMenu: 'Open navigation menu',
      cerrarMenu: 'Close menu',
    },

    toggle: {
      grupoAria: 'Site language',
      esAria: 'Spanish',
      enAria: 'English',
      cambiado: 'Language switched to English',
    },

    footer: {
      tagline: 'Where the day lowers its voice.',
      navTitulo: 'Navigation',
      contactoTitulo: 'Contact',
      newsletterTitulo: 'Letters from the coast',
      direccion: [
        'Av. Escénica 1200, Lomas del Pacífico',
        'Acapulco de Juárez, Guerrero, Mexico',
      ],
      newsletterTexto:
        'One letter a month: the season, the table and the tides. Nothing more.',
      newsletterLabel: 'Email address to receive the letters',
      newsletterPlaceholder: 'name@email.com',
      suscribirme: 'Subscribe',
      newsletterOk: 'Done. The next letter will arrive in your inbox.',
      newsletterError: 'Please check your email address: it seems incomplete.',
      legal:
        '© 2026 Aurea Vita. A fictional hotel created for demonstration purposes; the photographs are in the public domain.',
      avisoPrivacidad: 'Privacy notice',
      terminos: 'Terms of stay',
      navAria: 'Footer navigation',
      logoAria: 'Aurea Vita — Home',
    },

    booking: {
      formAria: 'Check availability',
      consultar: 'Check availability',
      cerrar: 'Close',
      llegada: 'Arrival',
      salida: 'Departure',
      huespedes: 'Guests',
      opciones: [
        { value: '1', label: '1 guest' },
        { value: '2', label: '2 guests' },
        { value: '3', label: '3 guests' },
        { value: '4', label: '4 guests' },
        { value: '5', label: '5 or more' },
      ],
    },

    roomCard: {
      verFoto: (n, total, alt) => `View photo ${n} of ${total}: ${alt}`,
    },

    lightbox: {
      visorAria: 'Photo viewer',
      ayudaTeclado: 'Use the arrow keys to navigate and Escape to close.',
      fotografiaSr: 'Photo ',
      de: 'of',
      cerrarVisor: 'Close viewer',
      cerrar: 'Close',
      anterior: 'Previous photo',
      siguiente: 'Next photo',
    },

    video: {
      etiquetaDefecto: 'background video',
      reproducir: (etiqueta) => `Play ${etiqueta}`,
      pausar: (etiqueta) => `Pause ${etiqueta}`,
      posterAlt:
        "Aurea Vita's main entrance among palm trees at sunset, warmly illuminated, with the Pacific beyond",
    },

    home: {
      conoceHabitaciones: 'Discover our rooms',
      exploraExperiencias: 'Explore the experiences',
      gridSr: 'Rooms, dining and wellness',
      videoCta: 'background video of the reservation banner',
    },

    gastronomia: {
      figcaptionTerraza: 'Morning at Origen · breakfast on the green terrace',
      laCarta: 'The menu',
      coctelesTitulo: 'Signature cocktails',
      horariosOrigen: 'Origen opening hours',
      horariosCielo: 'Cielo opening hours',
      tiempoSr: (n) => `Course ${n}: `,
    },

    experiencias: {
      albercaStripAria: 'Moments at the pool throughout the day',
    },

    galeria: {
      metaTitulo: 'Gallery · Aurea Vita Acapulco',
      metaDescripcion:
        'A visual journey through Aurea Vita: architecture on the Pacific, rooms, the infinity pool, dining, wellness and terrace sunsets.',
      eyebrow: 'Gallery',
      titulo: 'The House, in Images',
      intro:
        'A visual journey through Aurea Vita and its coastline. All that is missing is the warmth of the air.',
      filtrosAria: 'Filter photographs by category',
      ampliarFoto: (n, total, alt) => `Enlarge photo ${n} of ${total}: ${alt}`,
    },

    contacto: {
      metaTitulo: 'Under Construction · Aurea Vita Acapulco',
      metaDescripcion:
        'Our reservation system is in preparation. Very soon, you will be able to reserve your place on the Pacific.',
      logoAlt: 'Aurea Vita',
      eyebrow: 'Reservations',
      titulo: 'Under Construction',
      cuerpo:
        'We are refining the final details of our reservation system. Very soon, you will be able to reserve your place on the Pacific right here. Thank you for your patience—the sea is not going anywhere.',
      escribenos: 'In the meantime, write to us:',
      volver: 'Back to home',
    },
  },
};
