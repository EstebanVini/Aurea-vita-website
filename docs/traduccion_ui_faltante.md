# Traducción UI faltante — ES → EN

Complemento de `docs/traduccion_ingles.md` (la fuente canónica del cliente). Este
documento cubre **únicamente** los strings visibles o de accesibilidad que el doc
del cliente NO incluye: navegación, footer, formularios, aria-labels, la página
de Galería y Contacto completas, el detalle de Gastronomía (Origen, Marea,
Cielo, cocteles) y los huecos menores de las demás páginas.

Convenciones respetadas:

- Terminología exacta del cliente: **Rooms & Suites**, **Conscious Dining**,
  **Wellness**, **Reserve my stay**, **Check availability**, **concierge**,
  **Reservations**.
- Tono sereno y editorial, sin signos de exclamación.
- Eyebrows en sentence case (las mayúsculas las aplica CSS, igual que en ES).
- Los nombres propios no se traducen: Origen, Cielo, Marea, Aurea Vita,
  Acapulco Diamante, los nombres de cocteles y de tratamientos con nombre de
  casa.
- Los placeholders `{n}`, `{total}`, `{alt}`, `{etiqueta}` marcan las partes
  dinámicas de los strings interpolados.

---

## Strings compartidos (aparecen hardcodeados en varios archivos)

Eyebrow de las bandas CTA de cierre (`Habitaciones.jsx`, `Gastronomia.jsx`,
`Spa.jsx`, `Experiencias.jsx`) y de la página `Contacto.jsx`:

```
ES: Reservaciones
EN: Reservations
```

---

## src/App.jsx

Skip-link (primer elemento enfocable del sitio):

```
ES: Saltar al contenido
EN: Skip to content
```

---

## src/components/Navbar.jsx

Labels del menú (idénticos en `Footer.jsx` — traducir una sola vez):

```
ES: Inicio
EN: Home

ES: Habitaciones
EN: Rooms & Suites

ES: Wellness
EN: Wellness

ES: Experiencias
EN: Experiences

ES: Galería
EN: Gallery

ES: Contacto
EN: Contact
```

Botón persistente de reserva (desktop y panel móvil):

```
ES: Reservar
EN: Reserve
```

Aria-labels:

```
ES: Navegación principal          (aria-label del <nav>)
EN: Main navigation

ES: Aurea Vita — Inicio           (aria-label del link del logo)
EN: Aurea Vita — Home

ES: Abrir menú de navegación      (aria-label del botón hamburguesa, cerrado)
EN: Open navigation menu

ES: Cerrar menú                   (aria-label del botón hamburguesa, abierto)
EN: Close menu
```

---

## src/components/Footer.jsx

Tagline de marca:

```
ES: Donde el día baja la voz.
EN: Where the day lowers its voice.
```

Encabezados de columna:

```
ES: Navegación
EN: Navigation

ES: Contacto
EN: Contact

ES: Cartas desde la costa         (newsletter)
EN: Letters from the coast
```

Dirección (se conserva; solo se traduce el país):

```
ES: Av. Escénica 1200, Lomas del Pacífico / Acapulco de Juárez, Guerrero, México
EN: Av. Escénica 1200, Lomas del Pacífico / Acapulco de Juárez, Guerrero, Mexico
```

Newsletter:

```
ES: Una carta al mes: temporada, mesa y mareas. Nada más.
EN: One letter a month: the season, the table and the tides. Nothing more.

ES: Correo electrónico para recibir las cartas    (label sr-only del input)
EN: Email address to receive the letters

ES: nombre@correo.com                             (placeholder)
EN: name@email.com

ES: Suscribirme                                   (botón)
EN: Subscribe

ES: Listo. La próxima carta llegará a tu correo.  (mensaje de éxito)
EN: Done. The next letter will arrive in your inbox.

ES: Revisa tu correo: parece incompleto.          (mensaje de error)
EN: Please check your email address: it seems incomplete.
```

Línea legal:

```
ES: © 2026 Aurea Vita. Hotel ficticio creado con fines de demostración; las fotografías son de dominio público.
EN: © 2026 Aurea Vita. A fictional hotel created for demonstration purposes; the photographs are in the public domain.

ES: Aviso de privacidad
EN: Privacy notice

ES: Términos de estancia
EN: Terms of stay
```

Aria-labels:

```
ES: Navegación del pie de página   (aria-label del <nav> del footer)
EN: Footer navigation

ES: Aurea Vita — Inicio            (aria-label del link del logo)
EN: Aurea Vita — Home
```

---

## src/components/BookingBar.jsx

```
ES: Consulta de disponibilidad     (aria-label del <form>)
EN: Check availability

ES: Consultar disponibilidad       (botón colapsado móvil y botón de envío)
EN: Check availability

ES: Cerrar                         (botón que contrae el panel móvil)
EN: Close

ES: Llegada                        (label de fecha)
EN: Arrival

ES: Salida                         (label de fecha)
EN: Departure

ES: Huéspedes                      (label del select)
EN: Guests

ES: 1 huésped
EN: 1 guest

ES: 2 huéspedes
EN: 2 guests

ES: 3 huéspedes
EN: 3 guests

ES: 4 huéspedes
EN: 4 guests

ES: 5 o más
EN: 5 or more
```

---

## src/components/RoomCard.jsx

Aria-label de cada thumbnail de la mini-galería (string interpolado):

```
ES: Ver fotografía {n} de {total}: {alt}
EN: View photo {n} of {total}: {alt}
```

---

## src/components/Lightbox.jsx

```
ES: Visor de fotografías                          (aria-label del dialog)
EN: Photo viewer

ES: Usa las flechas para navegar y Escape para cerrar.   (ayuda sr-only)
EN: Use the arrow keys to navigate and Escape to close.

ES: Fotografía                                    (prefijo sr-only del contador)
EN: Photo

ES: {n} de {total}                                (contador visible)
EN: {n} of {total}

ES: Cerrar visor                                  (aria-label del botón cerrar)
EN: Close viewer

ES: Cerrar                                        (texto visible del botón, ≥sm)
EN: Close

ES: Fotografía anterior        (flecha desktop y zona de tap móvil izquierda)
EN: Previous photo

ES: Fotografía siguiente       (flecha desktop y zona de tap móvil derecha)
EN: Next photo
```

---

## src/components/FeatureCard.jsx

Label por defecto del link de las cards (coincide con el "Discover" del doc):

```
ES: Descubrir
EN: Discover
```

---

## src/components/VideoBucle.jsx

Control de pausa (aria-labels interpolados) y sustantivo por defecto:

```
ES: video de fondo                                (etiquetaBoton por defecto)
EN: background video

ES: Reproducir {etiqueta}
EN: Play {etiqueta}

ES: Pausar {etiqueta}
EN: Pause {etiqueta}
```

Alt del poster por defecto (`POSTER_DEFECTO`, solo lo consumiría un montaje
futuro sin poster propio):

```
ES: Entrada principal de Aurea Vita entre palmeras al atardecer, con la iluminación cálida encendida y el Pacífico al fondo
EN: Aurea Vita's main entrance among palm trees at sunset, warmly illuminated, with the Pacific beyond
```

---

## src/pages/Home.jsx

Los textos de datos (`home.js`) están cubiertos por el doc del cliente. Huecos
hardcodeados en el JSX:

```
ES: Conoce nuestras habitaciones           (link con flecha, sección bienvenida)
EN: Discover our rooms

ES: Explora las experiencias               (link con flecha, sección destino)
EN: Explore the experiences

ES: Habitaciones, gastronomía y spa        (h2 sr-only del grid de 3 cards)
EN: Rooms, dining and wellness

ES: video de fondo de la banda de reserva  (etiquetaBoton del VideoBucle del CTA)
EN: background video of the reservation banner
```

Alt del poster/imagen del hero (rama reduced-motion y poster del video). El
cliente ya fijó la versión inglesa de esta escena en su doc; se reutiliza
verbatim:

```
ES: Acceso principal de Aurea Vita visto desde el aire, entre palmeras y con la iluminación cálida encendida al atardecer
EN: Aurea Vita's main entrance viewed from above, nestled among palm trees and warmly illuminated at sunset
```

---

## src/pages/Habitaciones.jsx + src/data/rooms.js

Todo el contenido visible está cubierto por el doc del cliente (header, las 7
habitaciones, amenidades, CTAs, alts, banda de cierre). Único hueco: los
`formLabel` de las dos suites, que el formulario distingue con numeral aunque el
nombre visible sea el mismo:

```
ES: Suite con Vista al Mar 1               (formLabel, opción de select)
EN: Ocean View Suite 1

ES: Suite con Vista al Mar 2               (formLabel, opción de select)
EN: Ocean View Suite 2
```

---

## src/pages/Gastronomia.jsx (strings hardcodeados)

```
ES: La mañana en Origen · desayuno en la terraza verde    (figcaption)
EN: Morning at Origen · breakfast on the green terrace

ES: La carta                               (eyebrow del bloque de cocteles)
EN: The menu

ES: Cocteles de autor                      (h3 del bloque de cocteles)
EN: Signature cocktails

ES: Horarios de Origen                     (h3 sr-only de la tabla de horarios)
EN: Origen opening hours

ES: Horarios de Cielo                      (h3 sr-only de la tabla de horarios)
EN: Cielo opening hours

ES: Tiempo {n}:                            (prefijo sr-only de cada tiempo del menú)
EN: Course {n}:
```

---

## src/data/dining.js

El doc del cliente solo cubre título de página, meta, eyebrow/H1, intro y alt
del hero. Todo lo siguiente es hueco.

### Restaurante Origen

```
ES: Restaurante                            (eyebrow)
EN: Restaurant

ES: Origen                                 (título — nombre propio)
EN: Origen

ES: Origen empieza donde empieza todo aquí: en el muelle, antes del amanecer. La pesca del día decide la carta, y la cocina de Guerrero —la talla, el coco, el cacao de la Costa Grande— le da memoria. No hay platos de temporada; hay platos de esta mañana.
EN: Origen begins where everything begins here: at the dock, before sunrise. The day's catch decides the menu, and the cooking of Guerrero—pescado a la talla, coconut, cacao from the Costa Grande—gives it memory. There are no seasonal dishes; there are dishes of this morning.

ES: El comedor se abre al puerto bajo un techo de redes náuticas tejidas a mano, homenaje a los pescadores que cada día deciden nuestro menú. La formalidad sobra; la sobremesa, nunca.
EN: The dining room opens to the harbor beneath a ceiling of hand-woven fishing nets, a tribute to the fishermen who decide our menu each day. Formality is unnecessary; lingering at the table never is.
```

Horarios (las horas no cambian):

```
ES: Desayuno
EN: Breakfast

ES: Comida
EN: Lunch

ES: Cena
EN: Dinner

ES: Se recomienda reservar para la cena.
EN: Reservations are recommended for dinner.
```

Alts de Origen:

```
ES: Montaje de mesa frente al mar con la luz dorada del atardecer
EN: Table setting by the sea in the golden light of sunset

ES: Comedor de mármol abierto al ventanal panorámico sobre la alberca y el mar
EN: Marble dining room open to a panoramic window over the pool and the sea

ES: Mesa de desayuno completa con arreglo floral, vista desde arriba
EN: A full breakfast table with a floral arrangement, seen from above
```

### Menú degustación Marea

```
ES: Menú degustación                       (eyebrow)
EN: Tasting menu

ES: Marea                                  (título — nombre propio)
EN: Marea

ES: Siete tiempos que siguen el día de un pescador: del muelle al fuego, del fuego a la sobremesa. La carta cambia con la captura; esta es la marea de hoy.
EN: Seven courses that follow a fisherman's day: from the dock to the fire, from the fire to the lingering table. The menu changes with the catch; this is today's tide.
```

Los siete tiempos:

```
ES: Tostada de la mañana
EN: Morning tostada

ES: Pesca del día curada en limón, aguacate y polvo de chile guajillo
EN: Catch of the day cured in lime, avocado and guajillo chile powder

ES: Tiradito de huachinango
EN: Red snapper tiradito

ES: Leche de tigre de coco, pepino y aceite de cilantro
EN: Coconut leche de tigre, cucumber and cilantro oil

ES: Aguachile de camarón de estero
EN: Estuary shrimp aguachile

ES: Chile verde, xoconostle y tortilla de maíz azul recién hecha
EN: Green chile, xoconostle and freshly made blue-corn tortilla

ES: Pulpo a las brasas
EN: Charcoal-grilled octopus

ES: Adobo de chiles costeños, puré de plátano macho tatemado
EN: Costeño chile adobo, charred plantain purée

ES: Pescado a la talla
EN: Pescado a la talla

ES: A la manera de Barra Vieja, sobre hoja de plátano, con arroz verde
EN: In the Barra Vieja style, on a banana leaf, with green rice

ES: Respiro de la costa
EN: A breath of the coast

ES: Sorbete de mango Ataúlfo con sal de mar y hierbabuena
EN: Ataúlfo mango sorbet with sea salt and fresh mint

ES: Cacao de la Costa Grande
EN: Cacao of the Costa Grande

ES: Texturas de chocolate guerrerense, miel de la montaña y vainilla
EN: Textures of Guerrero chocolate, mountain honey and vanilla
```

Nota de servicio:

```
ES: Maridaje opcional con vinos mexicanos y destilados de agave. Avísanos de cualquier alergia o restricción: la marea siempre trae alternativas.
EN: Optional pairing with Mexican wines and agave spirits. Let us know of any allergy or restriction—the tide always brings alternatives.
```

### Bar de terraza Cielo

```
ES: Bar de terraza                         (eyebrow)
EN: Terrace bar

ES: Cielo                                  (título — nombre propio)
EN: Cielo

ES: Cielo abre cuando la luz empieza a ablandarse. Es la terraza más alta de la casa, orientada exactamente hacia donde el sol toca el agua. La carta es corta y pensada para esa hora: cocteles de autor, mariscos fríos y ningún motivo para mirar el teléfono. El atardecer dura unos veinte minutos; la terraza, hasta medianoche.
EN: Cielo opens when the light begins to soften. It is the highest terrace in the house, oriented exactly toward where the sun touches the water. The menu is short and designed for that hour: signature cocktails, chilled seafood and no reason to look at your phone. The sunset lasts about twenty minutes; the terrace, until midnight.

ES: Todos los días                         (horario)
EN: Every day

ES: La hora dorada                         (horario)
EN: Golden hour

ES: Con música en vivo los fines de semana.
EN: With live music on weekends.
```

Alts de Cielo:

```
ES: Tipi de lona blanca iluminado por dentro sobre el césped al ocaso
EN: White canvas tipi glowing from within on the lawn at dusk

ES: Cena íntima bajo el tipi de lona, con las palmeras recortadas contra el cielo
EN: Intimate dinner beneath the canvas tipi, palms silhouetted against the sky

ES: Camastros alineados con bebidas frías y el Pacífico de fondo
EN: Sun loungers aligned with cold drinks and the Pacific beyond
```

### Cocteles de autor (nombres propios, se conservan en español)

```
ES: Última Luz — Mezcal espadín, toronja rosada, miel de agave y sal de gusano — para el minuto exacto en que el sol se va
EN: Última Luz — Espadín mezcal, pink grapefruit, agave nectar and sal de gusano—for the exact minute the sun departs

ES: Bahía de Santa Lucía — Ginebra, agua de coco joven, hierbabuena y un toque de limón amarillo
EN: Bahía de Santa Lucía — Gin, young coconut water, fresh mint and a touch of yellow lemon

ES: La Quebrada — Tequila reposado, piña tatemada, chile ancho y romero quemado
EN: La Quebrada — Reposado tequila, charred pineapple, ancho chile and burnt rosemary

ES: Vita — Sin alcohol: jamaica fría, jengibre, mandarina y espuma de vainilla
EN: Vita — Alcohol-free: chilled hibiscus, ginger, mandarin and vanilla foam
```

### Banda CTA de cierre

```
ES: Tu mesa frente a la bahía te espera.
EN: Your table by the bay awaits.

ES: Reserva tu estancia y deja las cenas en nuestras manos.
EN: Reserve your stay and leave the dinners to us.

ES: Reservar mi estancia
EN: Reserve my stay
```

---

## src/pages/Spa.jsx + src/data/spa.js

El doc del cliente cubre todo el contenido visible y el contenido gateado
(menú de la calma, circuito de aguas, aromas de la costa). Huecos restantes:
solo los dos bloques **archivados** en `spa.js`, que reviven cuando se
reactive el menú. Se traducen para que la reactivación no deje huecos:

### spaFilosofiaArchivada (archivado)

```
ES: El descanso también se aprende
EN: Rest, too, can be learned

ES: En Spa Vita no prometemos transformaciones. Trabajamos con algo más modesto y más difícil: que durante unas horas tu cuerpo no tenga nada que resolver. Piedra, agua tibia, aceites de la costa y manos que saben esperar. El resto lo hace el propio cuerpo, que recuerda descansar en cuanto se le permite.
EN: At Spa Vita, we promise no transformations. We work with something more modest and more difficult: that for a few hours, your body has nothing to resolve. Stone, warm water, oils from the coast and hands that know how to wait. The body does the rest—it remembers how to rest the moment it is allowed to.

ES: Cada ritual comienza con una conversación breve y un té de hierbas de la región. No hay música genérica ni prisa entre citas: la siguiente hora es tuya, completa. Te pedimos solo una cosa al entrar —dejar el teléfono en la canasta de la entrada—. Nadie lo ha lamentado.
EN: Every ritual begins with a brief conversation and a tea of regional herbs. There is no generic music, no rush between appointments: the next hour is yours, entirely. We ask only one thing as you enter—leave your phone in the basket by the door. No one has regretted it.
```

### spaNotaArchivada (archivado)

```
ES: Para tu visita
EN: For your visit

ES: El spa abre todos los días de 9:00 a 20:00. Te sugerimos reservar tus rituales con 24 horas de anticipación con el concierge o desde el formulario de contacto, y llegar 20 minutos antes para comenzar sin prisa. Los tratamientos están disponibles para huéspedes y visitantes con reservación.
EN: The spa is open every day from 9:00 to 20:00. We suggest reserving your rituals 24 hours in advance with the concierge or through the contact form, and arriving 20 minutes early so you can begin without haste. Treatments are available to guests and visitors with a reservation.
```

Nota: el CTA `spaReserva.boton` "Reservar espacio" corresponde al
"Reserve your experience" del doc del cliente (sección RESERVATION MICROCOPY);
no se retraduce aquí.

---

## src/pages/Experiencias.jsx + src/data/experiences.js

El doc cubre header, editorial, pull-quote, CTA, "próximamente", banda de
cierre y el contenido gateado (textos y alts de la alberca, Cielo y las cuatro
excursiones). Huecos:

Aria-label del strip de fotos de la alberca (contenido gateado):

```
ES: Momentos de la alberca a lo largo del día      (aria-label del region)
EN: Moments at the pool throughout the day
```

Alts del bloque "Atardeceres en Cielo" (gateado, no listados en el doc):

```
ES: Tipi de picnic privado sobre el jardín al atardecer, entre palmeras
EN: Private picnic tipi on the garden at sunset, among palm trees

ES: Piscina turquesa y camastros con el mar abriéndose al horizonte nocturno
EN: Turquoise pool and sun loungers, the sea opening toward the night horizon
```

Alts de las cuatro cards de "Descubre Acapulco" (gateado; describen la costa
vista desde la casa, no la excursión — igual que en ES):

```
ES: Limonadas y follaje sobre la mesa de un camastro frente al mar
EN: Lemonades and foliage on a lounger-side table facing the sea

ES: Borde infinito de la alberca sobre el océano en penumbra tropical
EN: The pool's infinity edge above the ocean in tropical dusk

ES: Palapa de palma sobre el jardín extendido hacia la línea de palmeras del Pacífico
EN: Palm palapa over the garden, extending toward the line of Pacific palms

ES: Torre escultórica de celosía y acceso principal enmarcados por una palapa de palma
EN: Sculptural lattice tower and main entrance framed by a palm palapa
```

---

## src/pages/Contacto.jsx (página completa)

Meta:

```
ES: Aún en construcción · Aurea Vita Acapulco      (título de página)
EN: Under Construction · Aurea Vita Acapulco

ES: Nuestro sistema de reservaciones está en preparación. Muy pronto podrás apartar tu lugar frente al Pacífico.
EN: Our reservation system is in preparation. Very soon, you will be able to reserve your place on the Pacific.
```

Contenido:

```
ES: Aurea Vita                             (alt del logo)
EN: Aurea Vita

ES: Reservaciones                          (eyebrow)
EN: Reservations

ES: Aún en construcción                    (H1)
EN: Under Construction

ES: Estamos afinando los últimos detalles de nuestro sistema de reservaciones. Muy pronto podrás apartar aquí tu lugar frente al Pacífico. Gracias por tu paciencia: el mar no se irá a ningún lado.
EN: We are refining the final details of our reservation system. Very soon, you will be able to reserve your place on the Pacific right here. Thank you for your patience—the sea is not going anywhere.

ES: Mientras tanto, escríbenos:
EN: In the meantime, write to us:

ES: Volver al inicio                       (botón)
EN: Back to home
```

(El teléfono y el correo no se traducen.)

---

## src/pages/Galeria.jsx (página completa)

Meta:

```
ES: Galería · Aurea Vita Acapulco          (título de página)
EN: Gallery · Aurea Vita Acapulco

ES: Un recorrido visual por Aurea Vita: arquitectura frente al Pacífico, habitaciones, alberca infinita, gastronomía, spa y atardeceres en terraza.
EN: A visual journey through Aurea Vita: architecture on the Pacific, rooms, the infinity pool, dining, wellness and terrace sunsets.
```

Header:

```
ES: Galería                                (eyebrow)
EN: Gallery

ES: La casa, en imágenes                   (H1)
EN: The House, in Images

ES: Un recorrido visual por Aurea Vita y su costa. Lo único que falta es la temperatura del aire.
EN: A visual journey through Aurea Vita and its coastline. All that is missing is the warmth of the air.
```

Aria-labels:

```
ES: Filtrar fotografías por categoría      (aria-label del grupo de filtros)
EN: Filter photographs by category

ES: Ampliar fotografía {n} de {total}: {alt}    (aria-label de cada foto del grid)
EN: Enlarge photo {n} of {total}: {alt}
```

---

## src/data/gallery.js

Filtros:

```
ES: Todas
EN: All

ES: Alberca
EN: Pool

ES: Arquitectura
EN: Architecture

ES: Habitaciones
EN: Rooms

ES: Lobby
EN: Lobby

ES: Restaurante
EN: Restaurant

ES: Spa
EN: Spa

ES: Terraza
EN: Terrace
```

Estado vacío:

```
ES: Aún no hay fotografías en esta categoría. Mira todas las imágenes mientras tanto.
EN: There are no photographs in this category yet. In the meantime, browse the full collection.

ES: Ver todas
EN: View all
```

### Alts — alberca (11)

```
ES: Alberca iluminada al anochecer junto al edificio, aguas azules en calma
EN: The pool illuminated at nightfall beside the building, its blue water calm

ES: Alberca infinita frente al Pacífico bajo el azul profundo del crepúsculo
EN: Infinity pool overlooking the Pacific beneath the deep blue of twilight

ES: Piscina turquesa y camastros con el mar abriéndose al horizonte nocturno
EN: Turquoise pool and sun loungers, the sea opening toward the night horizon

ES: Borde infinito de la alberca sobre el océano en penumbra tropical
EN: The pool's infinity edge above the ocean in tropical dusk

ES: Camastros a la orilla de la alberca con sombrero de palma al sol
EN: Sun loungers at the pool's edge, a palm hat resting in the sun

ES: Sombrilla azul y camastros alineados junto al espejo de agua
EN: Blue umbrella and sun loungers aligned beside the still water

ES: Alberca infinita enmarcada por palmeras frente al horizonte marino
EN: Infinity pool framed by palms before the ocean horizon

ES: Dispensador de agua de pepino junto a la alberca frente al océano
EN: Cucumber-water dispenser beside the pool, facing the ocean

ES: Alberca de mosaico azul al pie de los ventanales iluminados del hotel
EN: Blue mosaic pool beneath the hotel's illuminated windows

ES: Alberca de mosaico cobalto con camastros alineados junto al edificio principal
EN: Cobalt mosaic pool with sun loungers aligned beside the main building

ES: Alberca y jacuzzi abiertos al Pacífico con camastros sobre deck de madera
EN: Pool and jacuzzi open to the Pacific, with sun loungers on a wooden deck
```

### Alts — fachadas / Arquitectura (4)

```
ES: Fachada blanca del hotel sobre jardín abierto con torre celosía de acero
EN: The hotel's white façade over an open garden, with a latticed steel tower

ES: Torre escultórica de celosía y acceso principal enmarcados por palapa de palma
EN: Sculptural lattice tower and main entrance framed by a palm palapa

ES: Arquitectura contemporánea del hotel vista desde el jardín bajo palapa
EN: The hotel's contemporary architecture seen from the garden beneath a palapa

ES: Palapa de palma sobre jardín extendido hacia la línea de palmeras del Pacífico
EN: Palm palapa over the garden, extending toward the line of Pacific palms
```

### Alts — habitaciones (19)

```
ES: Suite amplia con ventanales abiertos al océano y sala de estar
EN: Spacious suite with windows open to the ocean and a sitting area

ES: Servicio de té de cortesía en la terraza privada de la suite
EN: Complimentary tea service on the suite's private terrace

ES: Suite principal con cabecera de madera curva y luz de jardín
EN: Master suite with a curved wood headboard and garden light

ES: Suite doble con camas gemelas, madera cálida y luz natural
EN: Double suite with twin beds, warm wood and natural light

ES: Habitación doble con libreros de madera y arte gráfico en muro
EN: Double room with wooden bookshelves and graphic art on the wall

ES: Suite amplia de dos camas con techo alto y piso de mármol claro
EN: Spacious two-bed suite with a high ceiling and pale marble flooring

ES: Recámara king con vestidor abierto y banca al pie de cama
EN: King bedroom with an open dressing area and a bench at the foot of the bed

ES: Toallas dobladas junto a lavabo de ónix en baño de mármol negro
EN: Folded towels beside an onyx washbasin in a black marble bathroom

ES: Baño de suite con doble lavabo de ónix, orquídeas y regadera de cristal
EN: Suite bathroom with a double onyx washbasin, orchids and a glass shower

ES: Suite king con vestidor de nogal y marina enmarcada sobre la cama
EN: King suite with a walnut closet and a framed seascape above the bed

ES: Recámara luminosa con clóset abierto, sillón y paleta de maderas cálidas
EN: Light-filled bedroom with an open closet, an armchair and a palette of warm woods

ES: Suite king con clóset integrado, televisión y arte costero
EN: King suite with a built-in closet, television and coastal art

ES: Cama king al amanecer con repisas de madera y textiles blancos
EN: King bed at dawn with wooden shelves and white linens

ES: Baño con tina exenta, mármol negro y lavabo de ónix bajo luz natural
EN: Bathroom with a freestanding tub, black marble and an onyx washbasin in natural light

ES: Vestidor de suite en madera con butaca blanca y luz indirecta
EN: Wood-lined suite dressing room with a white armchair and indirect light

ES: Suite principal con cama vestida en lino blanco y luz natural del Pacífico
EN: Master suite with a bed dressed in white linen and the Pacific's natural light

ES: Suite amplia con cabecera de mármol, banca de madera y vista al mar
EN: Spacious suite with a marble headboard, wooden bench and ocean view

ES: Recámara luminosa con paleta neutra y accesos de madera tropical
EN: Light-filled bedroom with a neutral palette and tropical wood doorways

ES: Estancia de suite frente al ventanal con el oleaje del Pacífico
EN: Suite sitting area before a window opening onto the Pacific surf
```

### Alts — lobby (7)

```
ES: Escalera interior con barandal de cristal y luz filtrada desde el jardín
EN: Interior staircase with a glass balustrade and light filtering in from the garden

ES: Comedor de mármol abierto al ventanal panorámico sobre la alberca y el mar
EN: Marble dining room open to a panoramic window over the pool and the sea

ES: Sala interior de líneas curvas con ventanal continuo hacia el Pacífico
EN: Curved interior lounge with a continuous window toward the Pacific

ES: Estancia común de mobiliario escultórico y vegetación frente al horizonte marino
EN: Common lounge with sculptural furniture and greenery facing the ocean horizon

ES: Recepción de doble altura con muro de piedra y lámparas de fibra natural
EN: Double-height reception with a stone wall and natural-fiber lamps

ES: Vestíbulo principal con muros de piedra caliza y sala de espera cálida
EN: Main lobby with limestone walls and a warm sitting area

ES: Lounge de recepción con butacas de mimbre, piedra natural y palmeras al fondo
EN: Reception lounge with wicker armchairs, natural stone and palms beyond
```

### Alts — restaurante (15)

```
ES: Montaje de mesa frente al mar con luz dorada del atardecer
EN: Table setting by the sea in the golden light of sunset

ES: Mesa para dos frente al oleaje del Pacífico bajo sombrilla
EN: A table for two beside the Pacific surf, beneath an umbrella

ES: Pescado a la plancha con espárragos y pimientos en vajilla blanca
EN: Grilled fish with asparagus and peppers on white tableware

ES: Fettuccine al burro acompañado de copa de vino blanco
EN: Fettuccine al burro with a glass of white wine

ES: Camarones y aguacate junto a copa de vino sobre mármol oscuro
EN: Shrimp and avocado beside a glass of wine on dark marble

ES: Entrada de camarón y aguacate vista cenital sobre piedra negra
EN: Shrimp-and-avocado starter seen from above on black stone

ES: Vino blanco sirviéndose en copa dentro de la cocina del hotel
EN: White wine being poured in the hotel kitchen

ES: Dos cocos frescos sobre mosaico azul frente al mar abierto
EN: Two fresh coconuts on blue mosaic before the open sea

ES: Coco natural con naranja recién cortada y el Pacífico desenfocado detrás
EN: Fresh coconut with freshly cut orange, the Pacific soft-focus behind

ES: Montaje de desayuno cenital sobre mesa de madera viva
EN: Breakfast setting seen from above on a live-edge wooden table

ES: Mesa de desayuno completa vista desde arriba con arreglo floral
EN: A full breakfast table seen from above, with a floral arrangement

ES: Hilera de parfaits de yogur sobre mesa de madera con flores
EN: A row of yogurt parfaits on a wooden table with flowers

ES: Agua cítrica y vasos labrados dispuestos sobre el mar abierto de Acapulco
EN: Citrus water and cut glasses set against Acapulco's open sea

ES: Tarros de jamaica y limonada alineados sobre madera en la estancia principal
EN: Jars of hibiscus water and lemonade aligned on wood in the main lounge

ES: Barra de mármol y cocina abierta en tonos grafito con vista a las palmeras
EN: Marble bar and open kitchen in graphite tones, with a view of the palms
```

### Alts — spa (7)

```
ES: Tapetes de yoga y toallas listos sobre el jardín para práctica matutina
EN: Yoga mats and towels laid out on the garden lawn for morning practice

ES: Área de yoga en el jardín con toallas y agua bajo luz suave
EN: Garden yoga area with towels and water in soft light

ES: Tapetes de yoga dispuestos sobre el jardín frente al mar
EN: Yoga mats arranged on the garden lawn facing the sea

ES: Sesión de yoga al aire libre con el Pacífico de fondo
EN: Open-air yoga session with the Pacific beyond

ES: Sala de masaje con camilla, silla ergonómica y ventanal al cielo
EN: Massage room with a table, an ergonomic chair and a window to the sky

ES: Set de aceites esenciales sobre camilla, antesala de un ritual de bienestar
EN: Essential oils arranged on the massage table, awaiting a wellness ritual

ES: Sala de tratamiento con camilla de masaje y muro de madera acanalada
EN: Treatment room with a massage table and fluted wood wall
```

### Alts — terraza (9)

```
ES: Tipi de picnic privado sobre el jardín al atardecer entre palmeras
EN: Private picnic tipi on the garden at sunset, among palm trees

ES: Cena íntima bajo tipi de lona con palmeras recortadas contra el cielo
EN: Intimate dinner beneath a canvas tipi, palms silhouetted against the sky

ES: Tipi de lona blanca iluminado por dentro sobre césped al ocaso
EN: White canvas tipi glowing from within on the lawn at dusk

ES: Tipi privado entre palmeras con cojines verdes sobre el jardín
EN: Private tipi among palms, with green cushions on the garden lawn

ES: Sol poniente detrás del tipi de picnic en el jardín del hotel
EN: The setting sun behind the picnic tipi in the hotel garden

ES: Libros sobre mesa exterior con el rumor del Pacífico al fondo
EN: Books on an outdoor table, the murmur of the Pacific beyond

ES: Sombrero de palma sobre camastro con vista abierta al oleaje
EN: Palm hat on a sun lounger with an open view of the surf

ES: Limonadas y follaje sobre mesa de camastro frente al mar
EN: Lemonades and foliage on a lounger-side table facing the sea

ES: Camastros alineados con bebidas frías y el Pacífico de fondo
EN: Sun loungers aligned with cold drinks and the Pacific beyond
```

---

## Toggle de idioma (microcopy nuevo, en ambos idiomas)

Selector ES/EN del sitio. Las opciones muestran "ES" y "EN" como texto visible;
los aria-labels llevan el nombre completo del idioma. Recomendación técnica:
cada opción debe llevar su atributo `lang` ("es" / "en") y `aria-pressed` o
`aria-current` según el patrón elegido.

Aria-label del grupo:

```
ES: Idioma del sitio
EN: Site language
```

Opción español (texto visible: "ES"):

```
ES: Español                    (aria-label cuando la UI está en español)
EN: Spanish                    (aria-label cuando la UI está en inglés)
```

Opción inglés (texto visible: "EN"):

```
ES: Inglés                     (aria-label cuando la UI está en español)
EN: English                    (aria-label cuando la UI está en inglés)
```

Anuncio de estado (opcional, aria-live al cambiar de idioma):

```
ES: Idioma cambiado a español
EN: Language switched to English
```
