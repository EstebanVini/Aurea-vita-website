/**
 * Experiencias (docs/copy.md §6, brief §4.5).
 *
 * i18n (ronda 31 ago 2026): cada export pasa a la forma { es, en }. El
 * bloque `es` conserva los textos existentes VERBATIM; el `en` sale de
 * docs/traduccion_ingles.md (cliente — cubre header, editorial,
 * pull-quote, "próximamente", banda de cierre y el contenido gateado:
 * alberca, Cielo y las cuatro excursiones) y docs/traduccion_ui_faltante.md
 * (los alts que el cliente no listó). Lo gateado se traduce pero NO se
 * activa en esta ronda.
 *
 * Tres bloques temáticos: la alberca infinita (agua dulce), los
 * atardeceres en Cielo (la hora dorada, con link cruzado a
 * /gastronomia) y "Descubre Acapulco" (el destino, única sección de
 * contraste en marino con texto marfil de la página).
 *
 * FOTOS DEL CLIENTE (restitución, docs/Fotos WEB AV.pdf): el PDF asigna
 * dos fotos a esta página —casa_16 al hero y casa_07 a la editorial que
 * acompaña al texto "vivir el día"—, y NADA a los bloques temáticos ni
 * a las cards del destino, que conservan lo que tenían. Las
 * desplazadas (alberca_11, terraza_04) no se borran del disco.
 *
 * Resto de fotos (ronda ago 26, docs/fotos/catalogo-definitivas.md):
 * el hero fue alberca_11 y, antes, alberca_05 hasta que el QA
 * de ago 2026 lo retiró por contraste — ver la nota sobre `hero`
 * más abajo. El bloque de la alberca alterna el borde infinito
 * (alberca_08), el mosaico en detalle (alberca_07), la noche iluminada
 * (alberca_01) y el servicio al borde del agua (restaurante_21, la más
 * cercana al desayuno junto a la alberca que existe en la entrega).
 * Cielo toma terraza_01 al atardecer y cierra con alberca_03 cuando ya
 * cayó la noche: no hay ninguna toma nocturna de terraza en el set.
 *
 * Nota de encuadre (visual-designer): las cards de "Descubre Acapulco"
 * viven en un contenedor 16:10 y la entrega es toda 3:2 (~1.50), así
 * que el recorte es lateral y suave; cada card conserva su
 * `objectPosition` para anclar el sujeto y que las cuatro se sientan
 * uniformes. Sin fotografía de destino en la entrega (no hay bahía,
 * clavadistas, manglares ni centro histórico), las cuatro las ilustra
 * la propia costa vista desde la casa y sus `alt` describen eso, no la
 * excursión (en ambos idiomas): sustituir en cuanto el cliente entregue
 * tomas del destino.
 *
 * Las mayúsculas de los eyebrows las pone CSS (utilidad `eyebrow`),
 * nunca estos datos (copy §11).
 */

/**
 * Encabezado de la página (copy §6.1 / §12, ronda 15 jun). Eyebrow y
 * H1 se conservan. La intro que vivía aquí ("Te sugerimos
 * registrarte…", texto literal del cliente que reemplazó a la vieja)
 * se movió a `experienciasEditorial.remate` en la recomposición del
 * 23 jul: sola en su propia sección quedaba huérfana — ahora remata la
 * unidad editorial bajo el hero como pull-quote serif.
 * `metaTitulo`/`metaDescripcion` alimentan usePageMeta.
 *
 * Hero pedido por el cliente en docs/Fotos WEB AV.pdf: casa_16, la
 * mesa de terraza puesta frente al Pacífico en la luz dorada de la
 * tarde. Sustituye a alberca_11, que a su vez había sustituido a
 * alberca_05 en el QA de ago 2026 por un P0 de accesibilidad (aquel
 * still-life de alta clave dejaba el marfil en 3.23:1 / 2.74:1). Como
 * casa_16 es también una toma de conjunto y no un detalle, la lección
 * de aquel QA se respeta; pero su hora dorada tiene cielo claro, así
 * que la calibración del overlay heredada de alberca_11 dejó de ser
 * válida — ver la nota del <img> y del overlay en Experiencias.jsx.
 * Encuadre 50% 60% y dimensiones 2048×1365, en el JSX.
 * Alt del curador visual, verbatim (y el del cliente en inglés).
 */
export const experienciasHeader = {
  es: {
    metaTitulo: 'Experiencias · Aurea Vita Acapulco',
    metaDescripcion:
      'Alberca infinita, atardeceres en la terraza de Cielo y salidas por Acapulco: vela en la bahía, La Quebrada, manglares de Coyuca y el viejo puerto.',
    eyebrow: 'Experiencias',
    titulo: 'Maneras de pasar el día',
    hero: {
      src: '/fotos/casa/casa_16.jpg',
      alt: 'Mesa de terraza puesta frente al Pacífico en la luz dorada de la tarde',
    },
  },
  en: {
    metaTitulo: 'Experiences · Aurea Vita Acapulco',
    metaDescripcion:
      'An infinity pool, sunsets on Cielo’s terrace and excursions through Acapulco: sailing on the bay, La Quebrada, Coyuca’s mangroves and the historic port.',
    eyebrow: 'Experiences',
    titulo: 'Ways to Spend the Day',
    hero: {
      src: '/fotos/casa/casa_16.jpg',
      alt: 'Terrace table set before the Pacific in the golden light of late afternoon',
    },
  },
};

/**
 * Bloque editorial bajo el hero (ronda 23 jul, docs/Fotos WEB AV.pdf:
 * "AGREGAR ESTE TEXTO JUSTO DEBAJO DE LA IMAGEN"). Cuerpo literal del
 * cliente en dos párrafos; la foto acompañante es la que el mismo PDF
 * asigna a este bloque: casa_07, el tipi de lino iluminado con farolas
 * sobre el jardín al anochecer. Sustituye a terraza_04 (el tipi al
 * atardecer) que había elegido la ronda ago 26 — mismo sujeto, otra
 * hora. Encuadre CENTRADO (por defecto, sin clase) y dimensiones
 * 1452×1364 en el JSX: casa_07 es la única casi cuadrada de la entrega,
 * así que el recorte 4:5 es el más benévolo de la página. El botón
 * "Reservar experiencia" apunta por ahora a /contacto — cuando exista
 * el calendario de citas, basta cambiar aquí el destino (si es URL
 * externa, cambiar el <Link> por <a> en Experiencias.jsx).
 *
 * Recomposición ronda 23 jul: `remate` es el texto literal del cliente
 * que reemplazó a la intro vieja ("CAMBIAR TEXTO POR"; solo se acentúa
 * "tú"). Vivía en experienciasHeader.intro y se renderizaba solo en su
 * propia sección, donde quedaba huérfano — ahora cierra ESTA unidad
 * editorial como pull-quote serif entre los párrafos y el botón.
 */
export const experienciasEditorial = {
  es: {
    cuerpo: [
      'En Aurea Vita no existe una forma correcta de vivir el día. Algunas mañanas invitan a caminar junto al mar, otras a permanecer en silencio con un café entre las manos. Hay quienes eligen un masaje, una lectura bajo la sombra de las palmeras, una copa de vino al atardecer o simplemente dejar que las horas transcurran sin mirar el reloj.',
      'Aquí, las mejores experiencias no siguen un itinerario; nacen de escuchar lo que el cuerpo necesita y permitir que el océano marque el tiempo.',
    ],
    remate:
      'Te sugerimos registrarte en nuestras actividades guiadas durante el día, recuerda que tú marcas el ritmo dentro de la casa.',
    foto: {
      src: '/fotos/casa/casa_07.jpg',
      alt: 'Tipi de lino iluminado con farolas sobre el jardín al anochecer entre palmeras',
    },
    boton: 'Reservar experiencia',
    to: '/contacto',
  },
  en: {
    cuerpo: [
      'At Aurea Vita, there is no single right way to spend the day. Some mornings invite a walk beside the sea; others call for silence with a cup of coffee in your hands. Some guests choose a massage, a book beneath the shade of the palms, a glass of wine at sunset—or simply allow the hours to pass without looking at the clock.',
      'Here, the best experiences follow no itinerary. They begin by listening to what the body needs and allowing the ocean to keep time.',
    ],
    remate:
      'We suggest registering for our guided activities throughout the day. Remember: you set the pace within the house.',
    foto: {
      src: '/fotos/casa/casa_07.jpg',
      alt: 'Linen tipi illuminated by lanterns in the garden at nightfall, among palm trees',
    },
    boton: 'Reserve an experience',
    to: '/contacto',
  },
};

/**
 * Mensaje "próximamente" (copy §6.1bis / §12, ronda 15 jun). Bloque
 * visible entre la intro y la banda CTA mientras los bloques temáticos
 * están gateados: voz de marca, sereno, sin disculparse. Sobre marfil.
 */
export const experienciasProximamente = {
  es: {
    eyebrow: 'Próximamente',
    titulo: 'Estamos afinando los días',
    texto:
      'La alberca infinita, los atardeceres en la terraza y las salidas para descubrir Acapulco están casi listos. Preferimos contarlos cuando cada detalle esté en su sitio. Vuelve pronto; el mar, mientras tanto, sigue en su lugar.',
  },
  en: {
    eyebrow: 'Coming soon',
    titulo: 'We Are Perfecting the Days',
    texto:
      'The infinity pool, terrace sunsets and excursions to discover Acapulco are almost ready. We prefer to share them when every detail is in place. Return soon; in the meantime, the sea remains exactly where it belongs.',
  },
};

/** Bloque "Alberca infinita" (copy §6.2). GATEADO; traducido igual. */
export const albercaInfinita = {
  es: {
    eyebrow: 'El agua dulce',
    titulo: 'La alberca infinita',
    texto:
      'Su borde coincide con el horizonte, así que nadar hacia el final de la alberca es, ópticamente, nadar hacia el mar. Por la mañana es de quienes madrugan a hacer largos; por la tarde, de quienes leen a la sombra; de noche, iluminada y tibia, casi siempre está sola. Casi.',
    textoSecundario:
      'El desayuno puede servirse junto al agua. Solo hay que pedirlo la noche anterior.',
    fotos: {
      principal: {
        src: '/fotos/alberca/alberca_08.jpg',
        alt: 'Alberca infinita enmarcada por palmeras frente al horizonte marino',
      },
      detalle: {
        src: '/fotos/alberca/alberca_07.jpg',
        alt: 'Borde de alberca en mosaico azul con palmeras difuminadas al fondo',
      },
      nocturna: {
        src: '/fotos/alberca/alberca_01.jpg',
        alt: 'Alberca iluminada al anochecer, con las aguas azules en calma',
      },
      /* No hay ninguna toma de desayuno junto al agua en la entrega: el
         slot lo cubre el servicio de cocos al borde de la alberca, que
         cuenta lo mismo —la cocina sale hasta el agua. */
      desayuno: {
        src: '/fotos/restaurante/restaurante_21.jpg',
        alt: 'Cocos servidos al borde de la alberca con el oleaje de fondo',
      },
    },
  },
  en: {
    eyebrow: 'Fresh water',
    titulo: 'The Infinity Pool',
    texto:
      'Its edge meets the horizon, so swimming toward the end of the pool appears to be swimming toward the sea. In the morning, it belongs to early risers doing laps; in the afternoon, to readers in the shade; at night, warmly lit, it is almost always empty. Almost.',
    textoSecundario:
      'Breakfast may be served beside the water. Simply request it the evening before.',
    fotos: {
      principal: {
        src: '/fotos/alberca/alberca_08.jpg',
        alt: 'Infinity pool framed by palms before the ocean horizon',
      },
      detalle: {
        src: '/fotos/alberca/alberca_07.jpg',
        alt: 'Blue-mosaic pool edge with softly blurred palms in the background',
      },
      nocturna: {
        src: '/fotos/alberca/alberca_01.jpg',
        alt: 'Pool illuminated at nightfall, its blue water perfectly still',
      },
      desayuno: {
        src: '/fotos/restaurante/restaurante_21.jpg',
        alt: 'Fresh coconuts served beside the pool with the surf in the background',
      },
    },
  },
};

/**
 * Bloque "Atardeceres en Cielo" (copy §6.3). GATEADO; traducido igual.
 * Link cruzado a /gastronomia.
 */
export const atardeceres = {
  es: {
    eyebrow: 'La hora dorada',
    titulo: 'Atardeceres en Cielo',
    texto:
      'Cada tarde, a la misma hora, la terraza gira hacia el poniente sin moverse de su sitio. El bar sirve su carta de autor, alguien baja la música, y durante veinte minutos nadie habla demasiado fuerte. Es lo más parecido a un ritual colectivo que tenemos.',
    cta: { label: 'Conoce la carta de Cielo', to: '/gastronomia' },
    fotos: {
      crepusculo: {
        src: '/fotos/terraza/terraza_01.jpg',
        alt: 'Tipi de picnic privado sobre el jardín al atardecer, entre palmeras',
      },
      /* Después de la hora dorada no hay foto de terraza en la entrega:
         el par lo cierra la alberca ya de noche, mismo nivel de deck. */
      nocturna: {
        src: '/fotos/alberca/alberca_03.jpg',
        alt: 'Piscina turquesa y camastros con el mar abriéndose al horizonte nocturno',
      },
    },
  },
  en: {
    eyebrow: 'Golden hour',
    titulo: 'Sunsets at Cielo',
    texto:
      'Every afternoon, at the same hour, the terrace turns west without moving at all. The bar serves its signature menu, someone lowers the music, and for twenty minutes no one speaks too loudly. It is the closest thing we have to a shared ritual.',
    cta: { label: 'Discover Cielo’s menu', to: '/gastronomia' },
    fotos: {
      crepusculo: {
        src: '/fotos/terraza/terraza_01.jpg',
        alt: 'Private picnic tipi on the garden at sunset, among palm trees',
      },
      nocturna: {
        src: '/fotos/alberca/alberca_03.jpg',
        alt: 'Turquoise pool and sun loungers, the sea opening toward the night horizon',
      },
    },
  },
};

/**
 * Bloque "Descubre Acapulco" — sección de contraste marino (copy §6.4).
 * GATEADO; traducido igual. Encuadres por card (curador visual, recorte
 * 16:10 sobre fuentes 3:2):
 * - terraza_08 · 50% 50%: recorte lateral y mínimo; centro conserva
 *   las bebidas y la franja de océano del fondo.
 * - alberca_04 · 50% 45%: apenas alto — sostiene la caída del borde
 *   infinito sobre el agua oscura, el drama nocturno de la card.
 * - fachadas_04 · 50% 38%: alto — la palapa y la línea de palmeras
 *   viven en la mitad superior; la base es solo césped.
 * - fachadas_02 · 50% 58%: apenas bajo — prioriza la torre y el acceso
 *   sobre la banda de cielo del borde superior.
 */
export const descubreAcapulco = {
  es: {
    eyebrow: 'El destino',
    titulo: 'Descubre Acapulco',
    intro:
      'El concierge organiza cada salida con operadores locales de confianza. Estas son las cuatro que más nos piden.',
    cards: [
      {
        titulo: 'La bahía a vela',
        descripcion:
          'Travesía privada al atardecer por la bahía de Santa Lucía, con copa de vino y regreso bajo las primeras luces de la costa.',
        foto: {
          src: '/fotos/terraza/terraza_08.jpg',
          alt: 'Limonadas y follaje sobre la mesa de un camastro frente al mar',
          objectPosition: '50% 50%',
        },
      },
      {
        titulo: 'Los clavadistas de La Quebrada',
        descripcion:
          'El salto más famoso del Pacífico mexicano, visto desde el mirador al caer la noche, con cena posterior en el centro.',
        foto: {
          src: '/fotos/alberca/alberca_04.jpg',
          alt: 'Borde infinito de la alberca sobre el océano en penumbra tropical',
          objectPosition: '50% 45%',
        },
      },
      {
        titulo: 'Manglares de Coyuca',
        descripcion:
          'Recorrido en lancha por la laguna de Coyuca entre manglares y aves, con comida de mariscos en una enramada a la orilla.',
        foto: {
          src: '/fotos/fachadas/fachadas_04.jpg',
          alt: 'Palapa de palma sobre el jardín extendido hacia la línea de palmeras del Pacífico',
          objectPosition: '50% 38%',
        },
      },
      {
        titulo: 'Acapulco de memoria',
        descripcion:
          'Caminata guiada por el Fuerte de San Diego y el viejo centro: la historia del puerto que conectó dos océanos, contada sin prisa.',
        foto: {
          src: '/fotos/fachadas/fachadas_02.jpg',
          alt: 'Torre escultórica de celosía y acceso principal enmarcados por una palapa de palma',
          objectPosition: '50% 58%',
        },
      },
    ],
  },
  en: {
    eyebrow: 'The destination',
    titulo: 'Discover Acapulco',
    intro:
      'Our concierge arranges each excursion with trusted local operators. These are the four our guests request most often.',
    cards: [
      {
        titulo: 'Sailing the Bay',
        descripcion:
          'A private sunset sail across Santa Lucía Bay, with a glass of wine and a return beneath the coast’s first evening lights.',
        foto: {
          src: '/fotos/terraza/terraza_08.jpg',
          alt: 'Lemonades and foliage on a lounger-side table facing the sea',
          objectPosition: '50% 50%',
        },
      },
      {
        titulo: 'The Divers of La Quebrada',
        descripcion:
          'The most famous dive on Mexico’s Pacific coast, viewed from the overlook at nightfall, followed by dinner downtown.',
        foto: {
          src: '/fotos/alberca/alberca_04.jpg',
          alt: "The pool's infinity edge above the ocean in tropical dusk",
          objectPosition: '50% 45%',
        },
      },
      {
        titulo: 'Coyuca Mangroves',
        descripcion:
          'A boat journey across Coyuca Lagoon among mangroves and birds, followed by a seafood lunch in a waterside enramada.',
        foto: {
          src: '/fotos/fachadas/fachadas_04.jpg',
          alt: 'Palm palapa over the garden, extending toward the line of Pacific palms',
          objectPosition: '50% 38%',
        },
      },
      {
        titulo: 'Acapulco Remembered',
        descripcion:
          'A guided walk through Fort San Diego and the historic center: the story of the port that connected two oceans, told without haste.',
        foto: {
          src: '/fotos/fachadas/fachadas_02.jpg',
          alt: 'Sculptural lattice tower and main entrance framed by a palm palapa',
          objectPosition: '50% 58%',
        },
      },
    ],
  },
};

/** Banda CTA de cierre (copy §6.5). */
export const experienciasCta = {
  es: {
    titulo: 'Los días se llenan solos. Las fechas no.',
    texto: 'Reserva tu estancia y arma el resto al llegar.',
    boton: 'Reservar mi estancia',
  },
  en: {
    titulo: 'The days fill themselves. Dates do not.',
    texto: 'Reserve your stay and shape the rest when you arrive.',
    boton: 'Reserve my stay',
  },
};
