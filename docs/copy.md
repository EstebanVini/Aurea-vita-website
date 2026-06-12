# Copy — Aurea Vita
**Todo el contenido textual del sitio, listo para `src/data/`**

- **Autor:** ux-writer
- **Fecha:** 12 de junio de 2026
- **Idioma:** español (México), tono editorial sereno
- **Input:** `prompt-claude-code-aurea-vita.md` + `docs/brief.md` (§8)

---

## 0. Glosario y reglas de voz

Términos fijos del producto (usar siempre estos, nunca sus sinónimos):

| Usar | Nunca |
|---|---|
| alberca | piscina, pool |
| habitación / suite | cuarto, room |
| huéspedes | personas, pax |
| reservar / reservación | booking, apartar |
| llegada / salida | check-in / check-out (solo en aviso legal si hace falta) |
| tratamiento / ritual | servicio de spa |
| atardecer | sunset |
| concierge | (se permite; es término hotelero asentado en es-MX) |

Reglas de voz:
- Segunda persona singular (tú), voz activa, presente.
- Frases cortas. El silencio entre frases es parte del tono.
- Prohibido: "paraíso", "experiencia inolvidable", "lujo sin igual", "el lugar de tus sueños", "ensueño", superlativos vacíos.
- El mar, la luz y el tiempo son los tres motivos narrativos del sitio. Cada página toca al menos uno.

---

## 1. Hero del Home

### 1.1 Tagline — evaluación y variantes

| Opción | Texto | Lectura |
|---|---|---|
| **A — GANADORA** | **Santuario frente al Pacífico** | Es la propuesta de posicionamiento original y funciona: sustantivo fuerte ("santuario" = calma + protección, sin religiosidad), geografía concreta, cero adjetivos. No se mejora añadiendo; se confirma. |
| B | El Pacífico, en calma | Más minimal y atmosférica; pierde la idea de refugio. Buena para campañas, no para el hero. |
| C | Donde el día baja la voz | La más editorial; demasiado abstracta para los primeros 3 segundos (no dice mar ni lugar). Reservarla como frase de marca del footer. |

### 1.2 Bloque del hero

- **Eyebrow:** `AUREA VITA · ACAPULCO`
- **H1 (tagline):** `Santuario frente al Pacífico`
- **Subtítulo:** `Un refugio de calma sobre la bahía de Acapulco, donde el tiempo se mide en mareas.`
- **Indicador de scroll (aria-label):** `Desplázate para descubrir`

---

## 2. Home — `/`

### 2.1 Sección "Bienvenido a Aurea Vita"

- **Eyebrow:** `EL HOTEL`
- **Título (H2):** `Bienvenido a Aurea Vita`
- **Párrafo 1:** `Hay lugares que se visitan y lugares que se habitan. Aurea Vita pertenece a los segundos: una casa frente al mar donde la arquitectura se abre a la luz del Pacífico y cada espacio invita a quedarse un poco más. Aquí el lujo no se anuncia; se siente en la temperatura del mármol, en el silencio de los pasillos, en la distancia exacta entre tu terraza y el horizonte.`
- **Párrafo 2:** `Llegar es sencillo. Soltar el ritmo de afuera toma apenas una tarde. Lo demás —las mañanas largas, la mesa frente a la bahía, el agua quieta de la alberca— sucede solo.`
- **CTA (link):** `Conoce nuestras habitaciones →`
- **Alt foto (`fachadas_10.jpeg` o `fachadas_05.jpeg`):** `Fachada de Aurea Vita entre vegetación, bañada por la luz de la tarde`

### 2.2 Grid de 3 tarjetas

**Tarjeta 1 — Habitaciones**
- Eyebrow: `DESCANSO`
- Título: `Habitaciones & Suites`
- Texto: `Espacios serenos con vista al jardín o al mar, pensados para dormir con la ventana abierta.`
- Link: `Descubrir →`
- Alt (`habitaciones_12.jpeg`): `Suite con cama amplia en tonos arena y vista abierta al mar`

**Tarjeta 2 — Gastronomía**
- Eyebrow: `LA MESA`
- Título: `Gastronomía`
- Texto: `Cocina del Pacífico en Origen y atardeceres con coctel en mano en la terraza de Cielo.`
- Link: `Descubrir →`
- Alt (`restaurante_11.jpeg`): `Mesa servida del restaurante Origen con vista a la bahía al atardecer`

**Tarjeta 3 — Spa**
- Eyebrow: `BIENESTAR`
- Título: `Spa Vita`
- Texto: `Rituales de descanso profundo entre piedra, agua y aromas de la costa.`
- Link: `Descubrir →`
- Alt (`spa_01.jpeg`): `Sala de masaje del Spa Vita con camilla sobre piso de mármol`

### 2.3 Sección "El destino — Acapulco" (fondo marino)

- **Eyebrow:** `EL DESTINO`
- **Título (H2):** `Acapulco, la bahía que enseñó al mundo a mirar el mar`
- **Párrafo:** `Antes de los reflectores, Acapulco ya era esto: una bahía honda y tibia, montañas que caen al agua y una luz que dura todo el año. Aurea Vita se asoma a esa herencia desde la parte alta de la costa, lo bastante cerca para vivirla y lo bastante lejos para escucharla apenas.`
- **Datos en serif grande:**
  - `300` — `días de sol al año`
  - `27°` — `temperatura media del agua`
  - `12 min` — `de la bahía de Santa Lucía`
- **CTA (link):** `Explora las experiencias →`
- **Alt (`aereas_15.jpeg`):** `Vista aérea de la bahía de Acapulco al atardecer, con el sol bajo sobre el Pacífico`

### 2.4 Strip alberca / terraza

- **Eyebrow:** `MOMENTOS`
- **Título (H2):** `El agua, a su propio ritmo`
- **Texto breve:** `De la alberca infinita al amanecer a la terraza de Cielo cuando cae la tarde: el día en Aurea Vita transcurre entre dos aguas, la dulce y la del Pacífico.`
- **Alts del carrusel:**
  - `alberca_05.jpeg`: `Alberca infinita de Aurea Vita fundiéndose con el horizonte del Pacífico`
  - `alberca_02.jpeg`: `Camastros junto a la alberca bajo la sombra de palmeras`
  - `alberca_14.jpeg`: `Alberca iluminada al caer la noche, con el cielo en tonos azules`
  - `alberca_10.jpeg`: `Detalle del agua quieta de la alberca reflejando la luz de la tarde`
  - `terraza_13.jpeg`: `Terraza del bar Cielo al crepúsculo, con luces cálidas y vista abierta`

### 2.5 CTA final de reserva

- **Eyebrow:** `RESERVACIONES`
- **Título (H2):** `El Pacífico no se apura. Tú tampoco deberías.`
- **Texto:** `Cuéntanos tus fechas y deja el resto en manos de nuestro concierge.`
- **Botón:** `Reservar mi estancia`
- **Alt (`aereas_09.jpeg`, si se usa foto):** `Costa de Acapulco bajo la luz dorada de la mañana, vista desde el aire`

---

## 3. Habitaciones — `/habitaciones`

### 3.1 Encabezado de página

- **Eyebrow:** `DESCANSO`
- **Título (H1):** `Habitaciones & Suites`
- **Intro:** `Tres maneras de habitar la costa: entre jardines, frente al mar o en la suite que da nombre a la casa. Todas comparten lo esencial —silencio, luz y una cama en la que amanece tarde—.`
- **Alt hero (`habitaciones_02.jpeg`):** `Interior de suite en Aurea Vita con textiles claros y luz natural`

### 3.2 Habitación Vista Jardín (acento salvia)

- **Eyebrow:** `CATEGORÍA · VISTA JARDÍN`
- **Nombre:** `Habitación Vista Jardín`
- **Descripción:** `La más recogida de la casa. Sus ventanales dan a los jardines interiores, donde la vegetación filtra la luz y amortigua el mundo. Es la habitación de quien viaja para leer, dormir y no mirar el reloj.`
- **Specs:** `45 m²` · `2 huéspedes`
- **Amenidades:**
  1. `Cama king size con ropa de algodón egipcio`
  2. `Terraza privada hacia el jardín`
  3. `Regadera tipo lluvia y amenidades Spa Vita`
  4. `Cafetera de prensa francesa y selección de té`
  5. `Clima individual y cortinas blackout`
  6. `Wifi de alta velocidad sin costo`
- **CTA:** `Reservar esta habitación`
- **Alts:**
  - `habitaciones_13.jpeg`: `Habitación Vista Jardín con cama king size y luz verde filtrada del jardín`
  - `habitaciones_11.jpeg`: `Detalle del área de descanso de la Habitación Vista Jardín`
  - `habitaciones_01.jpeg`: `Cama vestida en tonos claros en la Habitación Vista Jardín`
  - `habitaciones_04.jpeg`: `Rincón de lectura junto a la ventana de la Habitación Vista Jardín`
  - `habitaciones_14.jpeg`: `Baño de la Habitación Vista Jardín con acabados en piedra clara`

### 3.3 Suite Vista al Mar (acento marino)

- **Eyebrow:** `CATEGORÍA · VISTA AL MAR`
- **Nombre:** `Suite Vista al Mar`
- **Descripción:** `Una sala, una recámara y un solo protagonista: el Pacífico. La terraza corre a lo largo de la suite, de modo que el mar acompaña desde el primer café hasta la última copa. Al anochecer, las luces de la bahía hacen el resto.`
- **Specs:** `68 m²` · `2 huéspedes`
- **Amenidades:**
  1. `Terraza panorámica con camastros y mesa exterior`
  2. `Sala independiente con sofá de descanso`
  3. `Tina con vista al mar`
  4. `Cava privada con selección de vinos mexicanos`
  5. `Servicio a la habitación de Origen, de 7:00 a 23:00`
  6. `Wifi de alta velocidad sin costo`
- **CTA:** `Reservar esta suite`
- **Alts:**
  - `habitaciones_05.jpeg`: `Suite Vista al Mar con ventanales abiertos hacia el Pacífico`
  - `habitaciones_10.jpeg`: `Sala de estar de la Suite Vista al Mar con luz de la tarde`
  - `habitaciones_03.jpeg`: `Recámara de la Suite Vista al Mar en tonos marfil y arena`
  - `habitaciones_15.jpeg`: `Detalle de la terraza privada de la Suite Vista al Mar`

### 3.4 Suite Aurea — insignia (acento dorado)

- **Eyebrow:** `LA INSIGNIA · SUITE AUREA`
- **Nombre:** `Suite Aurea`
- **Descripción:** `La suite que da nombre a la casa ocupa la esquina más alta del edificio, donde la bahía se ve completa. Dos recámaras, comedor propio y una terraza pensada para ver atardecer sin testigos. Quien la conoce, vuelve a pedirla por nombre.`
- **Specs:** `120 m²` · `4 huéspedes`
- **Amenidades:**
  1. `Dos recámaras con baño completo cada una`
  2. `Terraza de esquina con alberca de inmersión privada`
  3. `Comedor para seis y barra de servicio`
  4. `Concierge dedicado durante toda la estancia`
  5. `Traslados al aeropuerto incluidos`
  6. `Ritual de bienvenida del Spa Vita para dos`
- **CTA:** `Reservar la Suite Aurea`
- **Alts:**
  - `habitaciones_12.jpeg`: `Suite Aurea con cama amplia y vista panorámica de la bahía`
  - `habitaciones_02.jpeg`: `Recámara principal de la Suite Aurea con textiles en tonos claros`
  - `habitaciones_07.jpeg`: `Área de estar de la Suite Aurea con luz natural`
  - `habitaciones_06.jpeg`: `Detalle del comedor privado de la Suite Aurea`

### 3.5 Banda CTA de la página

- **Título:** `¿Cuál es la tuya?`
- **Texto:** `Escríbenos tus fechas y te ayudamos a elegir.`
- **Botón:** `Consultar disponibilidad`

---

## 4. Gastronomía — `/gastronomia`

### 4.1 Encabezado de página

- **Eyebrow:** `LA MESA`
- **Título (H1):** `Gastronomía`
- **Intro:** `Dos lugares, dos horas del día. Origen cocina lo que el Pacífico entrega cada mañana; Cielo lo celebra cuando el sol empieza a caer.`
- **Alt hero (`restaurante_11.jpeg`):** `Mesa servida del restaurante Origen frente a la bahía, bajo la luz dorada de la tarde`

### 4.2 Restaurante "Origen" — cocina del Pacífico

- **Eyebrow:** `RESTAURANTE`
- **Título (H2):** `Origen`
- **Concepto (párrafo 1):** `Origen empieza donde empieza todo aquí: en el muelle, antes del amanecer. La pesca del día decide la carta, y la cocina de Guerrero —la talla, el coco, el cacao de la Costa Grande— le da memoria. No hay platos de temporada; hay platos de esta mañana.`
- **Concepto (párrafo 2):** `El comedor se abre al puerto bajo un techo de redes náuticas tejidas a mano, homenaje a los pescadores que cada día deciden nuestro menú. La formalidad sobra; la sobremesa, nunca.`
- **Horarios:**
  - `Desayuno · 7:00 – 11:30`
  - `Comida · 13:30 – 17:00`
  - `Cena · 18:30 – 23:00`
  - Nota: `Se recomienda reservar para la cena.`
- **Alts:**
  - `restaurante_14.jpeg`: `Cena en Origen con el horizonte crepuscular al fondo`
  - `restaurante_01.jpeg`: `Techo de redes náuticas tejidas en el comedor de Origen`
  - `restaurante_12.jpeg`: `Desayuno servido en la terraza verde de Origen`

#### Menú degustación "Marea" — 7 tiempos

- **Eyebrow del bloque:** `MENÚ DEGUSTACIÓN`
- **Título:** `Marea`
- **Intro breve:** `Siete tiempos que siguen el día de un pescador: del muelle al fuego, del fuego a la sobremesa. La carta cambia con la captura; esta es la marea de hoy.`

| # | Tiempo | Descriptor |
|---|---|---|
| 1 | `Tostada de la mañana` | `Pesca del día curada en limón, aguacate y polvo de chile guajillo` |
| 2 | `Tiradito de huachinango` | `Leche de tigre de coco, pepino y aceite de cilantro` |
| 3 | `Aguachile de camarón de estero` | `Chile verde, xoconostle y tortilla de maíz azul recién hecha` |
| 4 | `Pulpo a las brasas` | `Adobo de chiles costeños, puré de plátano macho tatemado` |
| 5 | `Pescado a la talla` | `A la manera de Barra Vieja, sobre hoja de plátano, con arroz verde` |
| 6 | `Respiro de la costa` | `Sorbete de mango Ataúlfo con sal de mar y hierbabuena` |
| 7 | `Cacao de la Costa Grande` | `Texturas de chocolate guerrerense, miel de la montaña y vainilla` |

- **Nota al pie del menú:** `Maridaje opcional con vinos mexicanos y destilados de agave. Avísanos de cualquier alergia o restricción: la marea siempre trae alternativas.`

### 4.3 Bar de terraza "Cielo"

- **Eyebrow:** `BAR DE TERRAZA`
- **Título (H2):** `Cielo`
- **Concepto:** `Cielo abre cuando la luz empieza a ablandarse. Es la terraza más alta de la casa, orientada exactamente hacia donde el sol toca el agua. La carta es corta y pensada para esa hora: cocteles de autor, mariscos fríos y ningún motivo para mirar el teléfono. El atardecer dura unos veinte minutos; la terraza, hasta medianoche.`
- **Horarios:**
  - `Todos los días · 16:00 – 24:00`
  - `La hora dorada · 18:00 – 20:00, con música en vivo los fines de semana`
- **Alts:**
  - `terraza_13.jpeg`: `Terraza del bar Cielo al crepúsculo, con luces cálidas encendidas`
  - `terraza_10.jpeg`: `Lounge de Cielo con asientos bajos e iluminación cálida de noche`
  - `terraza_03.jpeg`: `Terraza de Cielo durante el día, con sombras y vista despejada`

#### Cocteles de autor

| Coctel | Descriptor |
|---|---|
| `Última Luz` | `Mezcal espadín, toronja rosada, miel de agave y sal de gusano — para el minuto exacto en que el sol se va` |
| `Bahía de Santa Lucía` | `Ginebra, agua de coco joven, hierbabuena y un toque de limón amarillo` |
| `La Quebrada` | `Tequila reposado, piña tatemada, chile ancho y romero quemado` |
| `Vita` | `Sin alcohol: jamaica fría, jengibre, mandarina y espuma de vainilla` |

### 4.4 Banda CTA de la página

- **Título:** `Tu mesa frente a la bahía te espera.`
- **Texto:** `Reserva tu estancia y deja las cenas en nuestras manos.`
- **Botón:** `Reservar mi estancia`

---

## 5. Spa & Bienestar — `/spa`

### 5.1 Encabezado de página

- **Eyebrow (salvia):** `BIENESTAR`
- **Título (H1):** `Spa Vita`
- **Alt hero (`spa_01.jpeg`):** `Camilla de masaje sobre piso de mármol en el Spa Vita, en penumbra serena`

### 5.2 Filosofía de bienestar

- **Eyebrow:** `NUESTRA FILOSOFÍA`
- **Título (H2):** `El descanso también se aprende`
- **Párrafo 1:** `En Spa Vita no prometemos transformaciones. Trabajamos con algo más modesto y más difícil: que durante unas horas tu cuerpo no tenga nada que resolver. Piedra, agua tibia, aceites de la costa y manos que saben esperar. El resto lo hace el propio cuerpo, que recuerda descansar en cuanto se le permite.`
- **Párrafo 2:** `Cada ritual comienza con una conversación breve y un té de hierbas de la región. No hay música genérica ni prisa entre citas: la siguiente hora es tuya, completa. Te pedimos solo una cosa al entrar —dejar el teléfono en la canasta de la entrada—. Nadie lo ha lamentado.`

### 5.3 Menú de tratamientos

- **Eyebrow del bloque:** `RITUALES Y TRATAMIENTOS`
- **Título:** `El menú de la calma`

| Tratamiento | Duración | Descripción |
|---|---|---|
| `Ritual Aurea` | `90 MIN` | `El ritual insignia de la casa: exfoliación con sal de mar y coco, masaje de cuerpo completo con aceite tibio de ajonjolí y un cierre de presiones lentas en rostro y cuero cabelludo. Se sale caminando distinto.` |
| `Piedras del Pacífico` | `80 MIN` | `Piedras volcánicas calientes recorren la espalda al ritmo de la respiración. El calor hace en los músculos lo que las palabras no alcanzan.` |
| `Masaje Marea` | `60 / 90 MIN` | `Masaje de presión media a profunda que sigue el compás del oleaje: largo, constante, sin sobresaltos. Ideal tras un vuelo o una temporada de más pantallas que cielo.` |
| `Envoltura de Salvia y Coco` | `75 MIN` | `El cuerpo se envuelve en una mezcla tibia de salvia fresca y pulpa de coco mientras el rostro recibe un masaje con cuarzo frío. La piel queda como después de una semana de mar.` |
| `Rostro al Amanecer` | `60 MIN` | `Facial de limpieza profunda e hidratación con miel de la montaña de Guerrero y aloe. Luz nueva para la piel que ha tomado sol con entusiasmo.` |
| `Circuito de Aguas` | `120 MIN` | `Recorrido guiado por vapor, tina de inmersión fría y alberca templada de flotación, con pausas de té e higos. Puede tomarse solo o como preludio de cualquier ritual.` |

### 5.4 Bloque "Circuito de aguas" (sección oliva)

- **Eyebrow:** `EL AGUA COMO MEDICINA`
- **Título (H2):** `Frío, calor y nada más`
- **Texto:** `El circuito de aguas alterna temperaturas como lo ha hecho la gente de mar desde siempre: vapor que abre, agua fría que despierta, flotación que suelta. Cuarenta minutos después, el cuerpo opina distinto.`
- **Alts:**
  - `spa_06.jpeg`: `Alberca de inmersión del circuito de aguas en ambiente de penumbra`
  - `spa_03.jpeg`: `Tina de piedra orgánica del Spa Vita junto a un muro de textura natural`

### 5.5 Bloque rituales / aromaterapia

- **Eyebrow:** `LOS DETALLES`
- **Título (H2):** `Aromas de la costa`
- **Texto:** `Todos los aceites y mezclas del Spa Vita se preparan en casa con ingredientes de la región: coco, salvia, cacao, sal de mar. Lo que toca tu piel viene de cerca.`
- **Alts:**
  - `spa_15.jpeg`: `Composición de aceites y sales del Spa Vita en tonos arena`
  - `spa_09.jpeg`: `Vela encendida y difusor de aromaterapia en el Spa Vita`

### 5.6 Nota práctica

- **Título pequeño:** `Para tu visita`
- **Texto:** `El spa abre todos los días de 9:00 a 20:00. Te sugerimos reservar tus rituales con 24 horas de anticipación con el concierge o desde el formulario de contacto, y llegar 20 minutos antes para comenzar sin prisa. Los tratamientos están disponibles para huéspedes y visitantes con reservación.`

### 5.7 Banda CTA de la página

- **Título:** `Tu cuerpo ya sabe lo que necesita.`
- **Texto:** `Agenda tu ritual y nosotros preparamos el silencio.`
- **Botón:** `Agendar mi ritual`

---

## 6. Experiencias — `/experiencias`

### 6.1 Encabezado de página

- **Eyebrow:** `EXPERIENCIAS`
- **Título (H1):** `Maneras de pasar el día`
- **Intro:** `Dentro de la casa o bahía adentro: aquí nadie programa tu agenda, pero sí la habilitamos.`
- **Alt hero (`alberca_05.jpeg`):** `Alberca infinita de Aurea Vita extendiéndose hacia el horizonte del Pacífico`

### 6.2 Bloque "Alberca infinita"

- **Eyebrow:** `EL AGUA DULCE`
- **Título (H2):** `La alberca infinita`
- **Texto:** `Su borde coincide con el horizonte, así que nadar hacia el final de la alberca es, ópticamente, nadar hacia el mar. Por la mañana es de quienes madrugan a hacer largos; por la tarde, de quienes leen a la sombra; de noche, iluminada y tibia, casi siempre está sola. Casi.`
- **Texto secundario (apoyo `alberca_07`):** `El desayuno puede servirse junto al agua. Solo hay que pedirlo la noche anterior.`
- **Alts:**
  - `alberca_02.jpeg`: `Camastros y palmeras junto a la alberca de Aurea Vita`
  - `alberca_10.jpeg`: `Detalle del agua en calma de la alberca reflejando la luz`
  - `alberca_14.jpeg`: `Alberca iluminada de noche bajo un cielo azul profundo`
  - `alberca_07.jpeg`: `Desayuno servido en una mesa junto a la alberca por la mañana`

### 6.3 Bloque "Atardeceres en Cielo"

- **Eyebrow:** `LA HORA DORADA`
- **Título (H2):** `Atardeceres en Cielo`
- **Texto:** `Cada tarde, a la misma hora, la terraza gira hacia el poniente sin moverse de su sitio. El bar sirve su carta de autor, alguien baja la música, y durante veinte minutos nadie habla demasiado fuerte. Es lo más parecido a un ritual colectivo que tenemos.`
- **CTA (link):** `Conoce la carta de Cielo →`
- **Alts:**
  - `terraza_13.jpeg`: `Atardecer desde la terraza de Cielo con el cielo encendido en tonos cálidos`
  - `terraza_10.jpeg`: `Ambiente nocturno del lounge de Cielo con iluminación tenue`

### 6.4 Bloque "Descubre Acapulco" (sección marino)

- **Eyebrow:** `EL DESTINO`
- **Título (H2):** `Descubre Acapulco`
- **Intro:** `El concierge organiza cada salida con operadores locales de confianza. Estas son las cuatro que más nos piden.`

| Experiencia | Descripción | Alt |
|---|---|---|
| `La bahía a vela` | `Travesía privada al atardecer por la bahía de Santa Lucía, con copa de vino y regreso bajo las primeras luces de la costa.` | `aereas_02.jpeg`: `Vista aérea de la costa y la bahía de Acapulco con aguas turquesa` |
| `Los clavadistas de La Quebrada` | `El salto más famoso del Pacífico mexicano, visto desde el mirador al caer la noche, con cena posterior en el centro.` | `aereas_08.jpeg`: `Acantilados de la costa de Acapulco cayendo hacia el mar` |
| `Manglares de Coyuca` | `Recorrido en lancha por la laguna de Coyuca entre manglares y aves, con comida de mariscos en una enramada a la orilla.` | `aereas_04.jpeg`: `Vista aérea de manglares y vegetación junto al agua` |
| `Acapulco de memoria` | `Caminata guiada por el Fuerte de San Diego y el viejo centro: la historia del puerto que conectó dos océanos, contada sin prisa.` | `aereas_10.jpeg`: `Panorámica aérea de la bahía de Acapulco y la ciudad junto al mar` |

### 6.5 Banda CTA de la página

- **Título:** `Los días se llenan solos. Las fechas no.`
- **Texto:** `Reserva tu estancia y arma el resto al llegar.`
- **Botón:** `Reservar mi estancia`

---

## 7. Galería — `/galeria`

### 7.1 Encabezado

- **Eyebrow:** `GALERÍA`
- **Título (H1):** `La casa, en imágenes`
- **Intro:** `Un recorrido visual por Aurea Vita y su costa. Lo único que falta es la temperatura del aire.`

### 7.2 Filtros (8 categorías + "Todas")

| id (data) | Etiqueta visible |
|---|---|
| `todas` | `Todas` |
| `aereas` | `Vistas aéreas` |
| `alberca` | `Alberca` |
| `fachadas` | `Arquitectura` |
| `habitaciones` | `Habitaciones` |
| `lobby` | `Lobby` |
| `restaurante` | `Restaurante` |
| `spa` | `Spa` |
| `terraza` | `Terraza` |

- **Mensaje de respaldo (filtro vacío, no debería ocurrir):** `Aún no hay fotografías en esta categoría. Mira todas las imágenes mientras tanto.` + link `Ver todas`

### 7.3 Textos alt de la selección curada

Patrón general: lugar + qué se ve + atmósfera, en una frase. Lista completa para `src/data/gallery.js`:

**aereas** — 01: `Vista aérea de la costa del Pacífico con playa extensa` · 02: `Bahía de Acapulco vista desde el aire con aguas turquesa` · 04: `Manglares y vegetación costera vistos desde el aire` · 05: `Línea de costa con oleaje suave vista desde el aire` · 06: `Playa y montañas de la costa de Guerrero desde el aire` · 08: `Acantilados cayendo al mar en la costa de Acapulco` · 09: `Costa bajo la luz dorada de la mañana, vista aérea` · 10: `Panorámica aérea de la bahía y la ciudad de Acapulco` · 11: `Costa turquesa y cielo despejado del Pacífico desde el aire` · 12: `Vista aérea del litoral con vegetación y mar abierto` · 15: `Atardecer sobre la bahía de Acapulco visto desde el aire`

**alberca** — 01: `Alberca de Aurea Vita rodeada de vegetación` · 02: `Camastros y palmeras junto a la alberca` · 04: `Borde de la alberca con vista hacia el mar` · 05: `Alberca infinita fundiéndose con el horizonte del Pacífico` · 06: `Reflejos de la luz del mediodía en el agua de la alberca` · 07: `Desayuno servido junto a la alberca por la mañana` · 10: `Agua en calma de la alberca reflejando la luz de la tarde` · 11: `Área de descanso a la sombra junto a la alberca` · 13: `Alberca y terraza bajo un cielo despejado` · 14: `Alberca iluminada al caer la noche` · 15: `Nado en alberca rodeada de entorno natural`

**fachadas (Arquitectura)** — 04: `Fachada de Aurea Vita con vegetación tropical` · 05: `Muro del hotel cubierto de enredadera bajo la luz del día` · 09: `Entrada principal de Aurea Vita con acceso ceremonial` · 10: `Fachada del hotel bañada por la luz de la tarde` · 12: `Detalle arquitectónico de la fachada entre palmeras` · 14: `Arquitectura del hotel enmarcada por jardines` · 15: `Vista exterior del edificio principal al atardecer`

**habitaciones** — 01: `Cama vestida en tonos claros con luz natural` · 02: `Interior de suite con textiles claros y luz suave` · 03: `Recámara en tonos marfil y arena` · 04: `Rincón de lectura junto a la ventana de la habitación` · 05: `Suite con ventanales abiertos hacia el Pacífico` · 06: `Comedor privado de la suite con luz de día` · 07: `Área de estar de la suite con sillones claros` · 10: `Sala de estar de la suite con luz de la tarde` · 11: `Detalle del área de descanso de la habitación` · 12: `Suite con cama amplia y vista abierta al mar` · 13: `Habitación con luz verde filtrada del jardín` · 14: `Baño con acabados en piedra clara` · 15: `Terraza privada de la suite con vista exterior`

**lobby** — 05: `Lobby de Aurea Vita con arquitectura de doble altura` · 07: `Área de recepción con mobiliario en tonos cálidos` · 08: `Sala de estar del lobby con luz natural` · 12: `Detalle del mobiliario y materiales del lobby` · 15: `Pasillo del lobby abierto hacia los jardines`

**restaurante** — 01: `Techo de redes náuticas tejidas en el comedor de Origen` · 03: `Cena íntima en una mesa de Origen a la luz de las velas` · 06: `Mesa montada en Origen con vajilla artesanal` · 07: `Comedor de Origen con vista hacia el exterior` · 09: `Chef de Origen trabajando en la cocina` · 11: `Mesa servida frente a la bahía bajo la luz dorada` · 12: `Desayuno en la terraza verde de Origen` · 13: `Detalle de platillos de cocina del Pacífico en Origen` · 14: `Cena en Origen con el horizonte crepuscular al fondo` · 15: `Barra y comedor de Origen al caer la tarde`

**spa** — 01: `Camilla de masaje sobre piso de mármol en penumbra serena` · 02: `Sala de tratamientos del Spa Vita en tonos neutros` · 03: `Tina de piedra orgánica junto a un muro de textura natural` · 04: `Área de relajación del spa con luz tenue` · 05: `Detalle de toallas y amenidades del Spa Vita` · 06: `Alberca de inmersión del circuito de aguas en penumbra` · 09: `Vela encendida y difusor de aromaterapia` · 10: `Espacio de descanso del spa con camastros` · 12: `Sala de masaje con vista hacia la vegetación` · 13: `Salón panorámico del spa con ventanales amplios` · 15: `Aceites y sales del Spa Vita en composición de tonos arena`

**terraza** — 03: `Terraza de Cielo durante el día con vista despejada` · 10: `Lounge de Cielo con iluminación cálida de noche` · 13: `Terraza de Cielo al crepúsculo con luces encendidas`

---

## 8. Contacto / Reserva — `/contacto`

### 8.1 Encabezado

- **Eyebrow:** `RESERVACIONES`
- **Título (H1):** `Empecemos por tus fechas`
- **Intro:** `Cuéntanos cuándo te gustaría venir y nuestro concierge te responderá el mismo día con disponibilidad y una propuesta a tu medida. Sin compromiso: una conversación, no una transacción.`

### 8.2 Formulario — labels, placeholders y ayudas

| Campo | Label | Placeholder / ayuda |
|---|---|---|
| Nombre | `Nombre completo` | placeholder: `María Fernanda López` |
| Email | `Correo electrónico` | placeholder: `nombre@correo.com` |
| Llegada | `Fecha de llegada` | input nativo `type="date"`; ayuda: `A partir de hoy` |
| Salida | `Fecha de salida` | input nativo `type="date"`; ayuda: `Posterior a tu llegada` |
| Huéspedes | `Huéspedes` | select: `1 huésped`, `2 huéspedes`, `3 huéspedes`, `4 huéspedes`, `5 o más` |
| Habitación | `Tipo de habitación` | select: `Sin preferencia`, `Habitación Vista Jardín`, `Suite Vista al Mar`, `Suite Aurea` |
| Mensaje | `Mensaje (opcional)` | placeholder: `¿Celebras algo? ¿Llegas en vuelo nocturno? Cuéntanos.` |

- **Botón de envío:** `Enviar solicitud`
- **Botón en estado de carga:** `Enviando…`
- **Nota bajo el botón:** `Al enviar no se realiza ningún cargo. Un concierge confirmará disponibilidad contigo por correo.`

### 8.3 Mensajes de error de validación

| Caso | Mensaje |
|---|---|
| Nombre vacío | `Escribe tu nombre para saber a quién respondemos.` |
| Email vacío | `Necesitamos tu correo para enviarte la respuesta.` |
| Email con formato inválido | `Ese correo parece incompleto. Revisa que tenga el formato nombre@correo.com.` |
| Llegada vacía | `Elige tu fecha de llegada.` |
| Llegada en el pasado | `La fecha de llegada ya pasó. Elige una a partir de hoy.` |
| Salida vacía | `Elige tu fecha de salida.` |
| Salida anterior o igual a llegada | `La salida debe ser después de tu llegada. Ajusta las fechas.` |
| Huéspedes sin seleccionar | `Indícanos cuántos huéspedes serán.` |
| Resumen al enviar con errores (aria-live) | `Revisa los campos marcados antes de enviar tu solicitud.` |

### 8.4 Confirmación simulada (modal / panel de éxito)

- **Título:** `Tu solicitud está en buenas manos`
- **Cuerpo (con interpolación):** `Gracias, {nombre}. Recibimos tu solicitud para {tipoHabitacion} · {fechaLlegada} – {fechaSalida} · {huéspedes}. Nuestro concierge revisará la disponibilidad y te escribirá a {email} en el transcurso del día para confirmar los detalles. Por ahora no se ha realizado ningún cargo ni reservación definitiva — falta lo mejor: ponerle fecha al mar.`
- **Botón del modal:** `Entendido`
- **Link secundario del modal:** `Mientras tanto, conoce las experiencias →`

### 8.5 Datos de contacto (columna derecha)

- **Encabezado:** `Aurea Vita`
- **Dirección:** `Av. Escénica 1200, Lomas del Pacífico` / `Acapulco de Juárez, Guerrero, 39880 · México`
- **Teléfono:** `+52 744 482 0136`
- **Email:** `reservaciones@aureavita.mx`
- **Horario de atención:** `Concierge disponible todos los días · 8:00 – 22:00`
- **Alt foto (`lobby_05.jpeg`):** `Lobby de Aurea Vita con arquitectura de doble altura y luz natural`

---

## 9. Componentes globales

### 9.1 Navbar

- Links: `Inicio` · `Habitaciones` · `Gastronomía` · `Spa` · `Experiencias` · `Galería` · `Contacto`
- Botón persistente: `Reservar`
- aria-label hamburguesa: `Abrir menú de navegación` / `Cerrar menú`
- aria-label del logo (link a inicio): `Aurea Vita — Inicio`

### 9.2 BookingBar

- Label 1: `LLEGADA` — valor inicial: `Elegir fecha`
- Label 2: `SALIDA` — valor inicial: `Elegir fecha`
- Label 3: `HUÉSPEDES` — valor inicial: `2 huéspedes`
- Botón: `Consultar disponibilidad`
- Versión móvil (botón único al pie del hero): `Consultar disponibilidad`
- aria-label del componente: `Consulta de disponibilidad`

### 9.3 Lightbox

- aria-label del diálogo: `Visor de fotografías`
- Botón cerrar: `Cerrar` (aria-label: `Cerrar visor`)
- Flecha anterior (aria-label): `Fotografía anterior`
- Flecha siguiente (aria-label): `Fotografía siguiente`
- Contador (formato): `7 de 64`
- Ayuda de teclado (sr-only): `Usa las flechas para navegar y Escape para cerrar.`

### 9.4 Footer

- **Frase de marca (junto al logo):** `Donde el día baja la voz.`
- **Columna 1 — título:** `Navegación` → repite los 7 links del menú.
- **Columna 2 — título:** `Contacto`
  - `Av. Escénica 1200, Lomas del Pacífico`
  - `Acapulco de Juárez, Guerrero, México`
  - `+52 744 482 0136`
  - `reservaciones@aureavita.mx`
- **Columna 3 — Newsletter (decorativo):**
  - Título: `Cartas desde la costa`
  - Texto: `Una carta al mes: temporada, mesa y mareas. Nada más.`
  - Placeholder del input: `nombre@correo.com`
  - Label (sr-only): `Correo electrónico para recibir las cartas`
  - Botón: `Suscribirme`
  - Confirmación simulada (toast/inline): `Listo. La próxima carta llegará a tu correo.`
  - Error de email inválido: `Revisa tu correo: parece incompleto.`
- **Línea legal:** `© 2026 Aurea Vita. Hotel ficticio creado con fines de demostración; las fotografías son de dominio público. Aviso de privacidad · Términos de estancia`
- Links legales (rutas decorativas): `Aviso de privacidad` · `Términos de estancia`

### 9.5 Banda CTA genérica (fallback)

- Título: `El mar no cambia de planes.`
- Texto: `Elige tus fechas; nosotros guardamos el lugar.`
- Botón: `Reservar`

---

## 10. Metadatos por página

| Ruta | `<title>` | `<meta name="description">` |
|---|---|---|
| `/` | `Aurea Vita · Santuario frente al Pacífico — Acapulco` | `Hotel de lujo sereno en la bahía de Acapulco: habitaciones frente al mar, cocina del Pacífico, spa y atardeceres en terraza. Consulta disponibilidad.` |
| `/habitaciones` | `Habitaciones & Suites · Aurea Vita Acapulco` | `Tres maneras de habitar la costa: Habitación Vista Jardín, Suite Vista al Mar y la Suite Aurea, nuestra insignia con alberca privada y vista a la bahía.` |
| `/gastronomia` | `Gastronomía — Origen y Cielo · Aurea Vita Acapulco` | `Origen, cocina del Pacífico con menú degustación de siete tiempos, y Cielo, bar de terraza con cocteles de autor a la hora del atardecer.` |
| `/spa` | `Spa Vita — Spa & Bienestar · Aurea Vita Acapulco` | `Rituales de descanso profundo frente al Pacífico: masajes, envolturas, faciales y circuito de aguas. Abierto todos los días de 9:00 a 20:00.` |
| `/experiencias` | `Experiencias · Aurea Vita Acapulco` | `Alberca infinita, atardeceres en la terraza de Cielo y salidas por Acapulco: vela en la bahía, La Quebrada, manglares de Coyuca y el viejo puerto.` |
| `/galeria` | `Galería · Aurea Vita Acapulco` | `Un recorrido visual por Aurea Vita: vistas aéreas de la bahía, habitaciones, alberca infinita, gastronomía, spa y atardeceres en terraza.` |
| `/contacto` | `Reservaciones y contacto · Aurea Vita Acapulco` | `Cuéntanos tus fechas y nuestro concierge te responde el mismo día con disponibilidad. Av. Escénica 1200, Acapulco, Guerrero, México.` |

---

## 11. Nota para el ui-engineer

- Los textos con formato `{variable}` en §8.4 se interpolan desde el estado del formulario.
- Los ids de filtros (§7.2) coinciden con los nombres de carpeta de `public/fotos_hotel/` salvo `fachadas` → etiqueta `Arquitectura`.
- Mantener mayúsculas SOLO en eyebrows (vía CSS `uppercase`, no escribir en mayúsculas en los datos, salvo las duraciones del spa que ya van como eyebrow).
- Cualquier copy nuevo que surja durante la implementación debe pasar por el glosario de §0.
