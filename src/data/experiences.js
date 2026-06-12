/**
 * Experiencias (docs/copy.md §6, brief §4.5).
 *
 * Tres bloques temáticos: la alberca infinita (agua dulce), los
 * atardeceres en Cielo (la hora dorada, con link cruzado a
 * /gastronomia) y "Descubre Acapulco" (el destino, única sección de
 * contraste en marino con texto marfil de la página).
 *
 * Fotos según curaduría (brief §4.5 y §4.8): alberca_05 es el hero;
 * alberca_02/10/14 + alberca_07 acompañan el bloque de la alberca.
 * Regla dura de terraza (brief §4.8): SOLO terraza_13, terraza_10 y
 * terraza_03 son utilizables en todo el sitio — aquí Cielo usa el dúo
 * terraza_13/terraza_10 (terraza_03 queda reservada a /gastronomia
 * para no repetir las tres en dos páginas). Las cards del destino usan
 * aereas_02/08/04/10; aereas_15 se evita aquí por aparecer ya en el
 * Home (brief §4.5: usar aereas_10 en su lugar).
 *
 * Las mayúsculas de los eyebrows las pone CSS (utilidad `eyebrow`),
 * nunca estos datos (copy §11).
 */

/** Encabezado de la página (copy §6.1). */
export const experienciasHeader = {
  eyebrow: 'Experiencias',
  titulo: 'Maneras de pasar el día',
  intro:
    'Dentro de la casa o bahía adentro: aquí nadie programa tu agenda, pero sí la habilitamos.',
  hero: {
    src: '/fotos_hotel/alberca/alberca_05.jpeg',
    alt: 'Alberca infinita de Aurea Vita extendiéndose hacia el horizonte del Pacífico',
  },
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
      src: '/fotos_hotel/alberca/alberca_02.jpeg',
      alt: 'Camastros y palmeras junto a la alberca de Aurea Vita',
    },
    detalle: {
      src: '/fotos_hotel/alberca/alberca_10.jpeg',
      alt: 'Detalle del agua en calma de la alberca reflejando la luz',
    },
    nocturna: {
      src: '/fotos_hotel/alberca/alberca_14.jpeg',
      alt: 'Alberca iluminada de noche bajo un cielo azul profundo',
    },
    desayuno: {
      src: '/fotos_hotel/alberca/alberca_07.jpeg',
      alt: 'Desayuno servido en una mesa junto a la alberca por la mañana',
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
      src: '/fotos_hotel/terraza/terraza_13.jpeg',
      alt: 'Atardecer desde la terraza de Cielo con el cielo encendido en tonos cálidos',
    },
    nocturna: {
      src: '/fotos_hotel/terraza/terraza_10.jpeg',
      alt: 'Ambiente nocturno del lounge de Cielo con iluminación tenue',
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
        src: '/fotos_hotel/aereas/aereas_02.jpeg',
        alt: 'Vista aérea de la costa y la bahía de Acapulco con aguas turquesa',
      },
    },
    {
      titulo: 'Los clavadistas de La Quebrada',
      descripcion:
        'El salto más famoso del Pacífico mexicano, visto desde el mirador al caer la noche, con cena posterior en el centro.',
      foto: {
        src: '/fotos_hotel/aereas/aereas_08.jpeg',
        alt: 'Acantilados de la costa de Acapulco cayendo hacia el mar',
      },
    },
    {
      titulo: 'Manglares de Coyuca',
      descripcion:
        'Recorrido en lancha por la laguna de Coyuca entre manglares y aves, con comida de mariscos en una enramada a la orilla.',
      foto: {
        src: '/fotos_hotel/aereas/aereas_04.jpeg',
        alt: 'Vista aérea de manglares y vegetación junto al agua',
      },
    },
    {
      titulo: 'Acapulco de memoria',
      descripcion:
        'Caminata guiada por el Fuerte de San Diego y el viejo centro: la historia del puerto que conectó dos océanos, contada sin prisa.',
      foto: {
        src: '/fotos_hotel/aereas/aereas_10.jpeg',
        alt: 'Panorámica aérea de la bahía de Acapulco y la ciudad junto al mar',
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
