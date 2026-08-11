/**
 * Experiencias (docs/copy.md §6, brief §4.5).
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
 * excursión: sustituir en cuanto el cliente entregue tomas del destino.
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
 */
export const experienciasHeader = {
  eyebrow: 'Experiencias',
  titulo: 'Maneras de pasar el día',
  /* Hero pedido por el cliente en docs/Fotos WEB AV.pdf: casa_16, la
     mesa de terraza puesta frente al Pacífico en la luz dorada de la
     tarde. Sustituye a alberca_11, que a su vez había sustituido a
     alberca_05 en el QA de ago 2026 por un P0 de accesibilidad (aquel
     still-life de alta clave dejaba el marfil en 3.23:1 / 2.74:1). Como
     casa_16 es también una toma de conjunto y no un detalle, la lección
     de aquel QA se respeta; pero su hora dorada tiene cielo claro, así
     que la calibración del overlay heredada de alberca_11 dejó de ser
     válida — ver la nota del <img> y del overlay en Experiencias.jsx.
     Encuadre 50% 45% y dimensiones 1600×1066, en el JSX.
     Alt del curador visual, verbatim. */
  hero: {
    src: '/fotos/casa/casa_16.jpg',
    alt: 'Mesa de terraza puesta frente al Pacífico en la luz dorada de la tarde',
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
 * "Reservar
 * experiencia" apunta por ahora a /contacto — cuando exista el
 * calendario de citas, basta cambiar aquí el destino (si es URL
 * externa, cambiar el <Link> por <a> en Experiencias.jsx).
 *
 * Recomposición ronda 23 jul: `remate` es el texto literal del cliente
 * que reemplazó a la intro vieja ("CAMBIAR TEXTO POR"; solo se acentúa
 * "tú"). Vivía en experienciasHeader.intro y se renderizaba solo en su
 * propia sección, donde quedaba huérfano — ahora cierra ESTA unidad
 * editorial como pull-quote serif entre los párrafos y el botón.
 */
export const experienciasEditorial = {
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
};

/**
 * Mensaje "próximamente" (copy §6.1bis / §12, ronda 15 jun). Bloque
 * visible entre la intro y la banda CTA mientras los bloques temáticos
 * están gateados: voz de marca, sereno, sin disculparse. Sobre marfil.
 */
export const experienciasProximamente = {
  eyebrow: 'Próximamente',
  titulo: 'Estamos afinando los días',
  texto:
    'La alberca infinita, los atardeceres en la terraza y las salidas para descubrir Acapulco están casi listos. Preferimos contarlos cuando cada detalle esté en su sitio. Vuelve pronto; el mar, mientras tanto, sigue en su lugar.',
};

/** Bloque "Alberca infinita" (copy §6.2). */
export const albercaInfinita = {
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
};

/** Bloque "Atardeceres en Cielo" (copy §6.3). Link cruzado a /gastronomia. */
export const atardeceres = {
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
};

/** Bloque "Descubre Acapulco" — sección de contraste marino (copy §6.4). */
export const descubreAcapulco = {
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
        /* 1.48: el recorte 16:10 es lateral y mínimo. Centro conserva
           las bebidas y la franja de océano del fondo. */
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
        /* Encuadre apenas alto (45%): sostiene la caída del borde
           infinito sobre el agua oscura, que es lo que da el drama
           nocturno de la card, sin comerse el cielo. */
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
        /* Encuadre alto (38%): la palapa y la línea de palmeras viven
           en la mitad superior; la base es solo césped. Subirlo mete
           la vegetación al cuadro, que es el sujeto de la card. */
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
        /* Encuadre apenas bajo (58%): prioriza la torre y el acceso
           sobre la banda de cielo del borde superior. */
        objectPosition: '50% 58%',
      },
    },
  ],
};

/** Banda CTA de cierre (copy §6.5). */
export const experienciasCta = {
  titulo: 'Los días se llenan solos. Las fechas no.',
  texto: 'Reserva tu estancia y arma el resto al llegar.',
  boton: 'Reservar mi estancia',
};
