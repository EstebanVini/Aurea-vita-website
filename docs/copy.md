# Copy — Aurea Vita
**Todo el contenido textual del sitio, listo para `src/data/`**

- **Autor:** ux-writer
- **Fecha:** 12 de junio de 2026 · **Revisión de ronda:** 15 de junio de 2026
- **Idioma:** español (México), tono editorial sereno
- **Input:** `prompt-claude-code-aurea-vita.md` + `docs/brief.md` (§8 y §9 ronda 15 jun)

> **Nota de la ronda "entrada" — ago 2026:** este documento nombra fotos del set demo `public/fotos_hotel/`, que ya no existe. Los **textos** siguen vigentes; las **referencias a archivos de foto y sus `alt` no**. El inventario actual está en `docs/fotos/catalogo-definitivas.md`, con el `alt` ya redactado de cada foto. Afecta sobre todo a §7.3 (alt de galería), §4 (cards de "Descubre Acapulco") y las notas de alt de §3. La categoría `aereas` de §7.2 desapareció del sitio: la entrega definitiva no tiene ninguna toma de dron.

> **Nota de la ronda 15 jun 2026:** los cambios de esta ronda están marcados a lo largo del documento con el prefijo **`[RONDA 15 JUN]`** e incluyen el texto viejo (tachado o etiquetado "ANTES") y el nuevo ("AHORA/DESPUÉS"). El resumen de qué archivo de datos toca cada cambio está en §12. Los textos largos del cliente van LITERALES; la división en párrafos y la ubicación titular/subtítulo/cuerpo son decisión del ux-writer (patrón SectionHeading).

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

> **`[RONDA 15 JUN]`** Se ELIMINA el eyebrow del hero. Se conserva el H1. Subtítulo reemplazado por el texto literal del cliente.

- **Eyebrow:** ~~`AUREA VITA · ACAPULCO`~~ → **ELIMINADO** (sin eyebrow en el hero).
- **H1 (tagline):** `Santuario frente al Pacífico` *(sin cambios)*
- **Subtítulo (ANTES):** ~~`Un refugio de calma sobre la bahía de Acapulco, donde el tiempo se mide en mareas.`~~
- **Subtítulo (AHORA — literal):** `Un santuario frente al mar donde no existen los horarios, solo el descanso, el bienestar y el placer de vivir plenamente.`
- **Indicador de scroll (aria-label):** `Desplázate para descubrir` *(sin cambios)*

---

## 2. Home — `/`

### 2.1 Sección "Descubre Aurea Vita" *(antes "Bienvenido a Aurea Vita")*

> **`[RONDA 15 JUN]`** Se ELIMINA el eyebrow "EL HOTEL". El título cambia. El cuerpo se reemplaza por el texto literal del cliente (3 párrafos del cliente; respeto su división natural por buen ritmo). El CTA link y el alt se conservan.

- **Eyebrow (ANTES):** ~~`EL HOTEL`~~ → **ELIMINADO** (sin eyebrow en esta sección).
- **Título (H2) (ANTES):** ~~`Bienvenido a Aurea Vita`~~
- **Título (H2) (AHORA):** `Descubre Aurea Vita`
- **Párrafo 1 (literal):** `En Aurea Vita creemos que el verdadero lujo es disponer de tiempo para uno mismo. Frente al Pacífico, hemos creado un refugio donde los días transcurren sin prisas y cada experiencia está pensada para reconectar con lo esencial. Aquí no existen itinerarios rígidos ni horarios que seguir. El mar marca el ritmo, la tranquilidad guía cada momento y el bienestar surge de forma natural.`
- **Párrafo 2 (literal):** `Comienza la mañana con una vista infinita al océano, disfruta una gastronomía saludable y llena de sabor, relájate con terapias y masajes diseñados para restaurar cuerpo y mente, o simplemente encuentra un espacio para descansar profundamente mientras la brisa acompaña el día.`
- **Párrafo 3 (literal):** `Aurea Vita es una invitación a vivir despacio, a nutrirse conscientemente y a redescubrir el placer de estar presente. Porque algunas experiencias no se miden por lo que haces, sino por cómo te hacen sentir.`
- **CTA (link):** `Conoce nuestras habitaciones →` *(sin cambios)*
- **Alt foto (`fachadas_05.jpeg`):** `Fachada de Aurea Vita entre vegetación, bañada por la luz de la tarde` *(sin cambios; el brief D9.3 confirma `fachadas_05` en el layout 50/50)*

### 2.2 Grid de 3 tarjetas

> **`[RONDA 15 JUN]`** T1: texto nuevo (eyebrow y título se conservan). T2: título "Gastronomía" → "Alimentación Consciente" (eyebrow "LA MESA" se conserva; texto ajustado para rimar con el rebranding; `to:` sigue `/gastronomia`, D1). T3: título "Spa Vita" → "Experiencia Aurea Vita" (eyebrow "BIENESTAR" se conserva; texto nuevo; `to:` sigue `/spa`).

**Tarjeta 1 — Habitaciones**
- Eyebrow: `DESCANSO` *(sin cambios)*
- Título: `Habitaciones & Suites` *(sin cambios)*
- Texto (ANTES): ~~`Espacios serenos con vista al jardín o al mar, pensados para dormir con la ventana abierta.`~~
- Texto (AHORA): `Amplios espacios para descansar y relajarse con absoluta privacidad.`
- Link: `Descubrir →`
- Alt (`habitaciones_12.jpeg`): `Suite con cama amplia en tonos arena y vista abierta al mar`

**Tarjeta 2 — Alimentación Consciente** *(antes "Gastronomía")*
- Eyebrow: `LA MESA` *(se conserva)*
- Título (ANTES): ~~`Gastronomía`~~
- Título (AHORA): `Alimentación Consciente`
- Texto (ANTES): ~~`Cocina del Pacífico en Origen y atardeceres con coctel en mano en la terraza de Cielo.`~~
- Texto (AHORA): `Cocina saludable y llena de sabor, pensada para nutrir el cuerpo al ritmo del Pacífico.`
- Link: `Descubrir →`
- `to:` `/gastronomia` *(la ruta se conserva, D1)*
- Alt (`restaurante_11.jpeg`): `Mesa servida del restaurante Origen con vista a la bahía al atardecer`

**Tarjeta 3 — Experiencia Aurea Vita** *(antes "Spa Vita")*
- Eyebrow: `BIENESTAR` *(se conserva)*
- Título (ANTES): ~~`Spa Vita`~~
- Título (AHORA): `Experiencia Aurea Vita`
- Texto (ANTES): ~~`Rituales de descanso profundo entre piedra, agua y aromas de la costa.`~~
- Texto (AHORA): `Descubre el descanso profundo a tu propio ritmo.`
- Link: `Descubrir →`
- `to:` `/spa` *(la ruta se conserva, D4)*
- Alt (`spa_01.jpeg`): `Sala de masaje del Spa Vita con camilla sobre piso de mármol`

### 2.3 Sección "El destino — Acapulco" (fondo marino)

> **`[RONDA 15 JUN]`** Eyebrow "EL DESTINO" se conserva. Título nuevo (más fiel al copy del cliente, que abre con "Acapulco Diamante"). Cuerpo reemplazado por el texto literal del cliente (2 párrafos). Los datos 300/27°/12 min SE CONSERVAN (D3); van entre el párrafo 1 y el 2, o como columna lateral —el `ui-engineer` los reacomoda si rompen el encuadre, pero no los elimina—. CTA y alt se conservan.

- **Eyebrow:** `EL DESTINO` *(se conserva)*
- **Título (H2) (ANTES):** ~~`Acapulco, la bahía que enseñó al mundo a mirar el mar`~~
- **Título (H2) (AHORA):** `Acapulco Diamante`
- **Párrafo 1 (literal):** `Acapulco Diamante, una de las zonas más privilegiadas y mejor conservadas del Pacífico mexicano. Aquí, la naturaleza sigue siendo la protagonista. Kilómetros de playa prácticamente ininterrumpida, extensas áreas de vegetación tropical y la presencia constante del océano crean un entorno donde el tiempo parece transcurrir de forma diferente. El sonido de las olas, la brisa marina y los colores del paisaje acompañan cada momento, invitando a reducir el ritmo y reconectar con lo esencial.`
- **Párrafo 2 (literal):** `En Aurea Vita, creemos que el bienestar comienza con el lugar que nos rodea y con la capacidad de detenernos para apreciarlo. Más que un destino, este es un espacio para respirar profundamente, reconectar con uno mismo y dejar que la naturaleza marque el ritmo del día.`
- **Datos en serif grande (SE CONSERVAN — D3):**
  - `300` — `días de sol al año`
  - `27°` — `temperatura media del agua`
  - `12 min` — `de la bahía de Santa Lucía`
- **CTA (link):** `Explora las experiencias →` *(sin cambios)*
- **Alt (`aereas_15.jpeg`):** `Vista aérea de la bahía de Acapulco al atardecer, con el sol bajo sobre el Pacífico` *(sin cambios)*

### 2.4 Strip alberca / terraza — ~~"El agua, a su propio ritmo"~~ **ELIMINADA**

> **`[RONDA 15 JUN]`** Sección ELIMINADA por completo (§9.3). El `ui-engineer` quita el JSX de Home y `momentosFotos` de `home.js`. Copy archivado aquí solo como referencia histórica; no se implementa.

- ~~**Eyebrow:** `MOMENTOS`~~
- ~~**Título (H2):** `El agua, a su propio ritmo`~~
- ~~**Texto breve:** `De la alberca infinita al amanecer a la terraza de Cielo cuando cae la tarde: el día en Aurea Vita transcurre entre dos aguas, la dulce y la del Pacífico.`~~
- ~~Alts del carrusel (alberca_05, alberca_02, alberca_14, alberca_10, terraza_13)~~

### 2.5 CTA final de reserva

> **`[RONDA 15 JUN]`** Se conserva el titular y el eyebrow. El texto de apoyo se reemplaza por la frase literal del cliente, que funciona como subtítulo cálido bajo el titular (resume la promesa del hotel). El botón se conserva (más grande por G2, decisión de implementación).

- **Eyebrow:** `RESERVACIONES` *(sin cambios)*
- **Título (H2):** `El Pacífico no se apura. Tú tampoco deberías.` *(se conserva como titular)*
- **Texto (ANTES):** ~~`Cuéntanos tus fechas y deja el resto en manos de nuestro concierge.`~~
- **Texto (AHORA — literal):** `Un refugio frente al mar para descansar, reconectar y disfrutar al ritmo de las olas.`
- **Botón:** `Reservar mi estancia` *(sin cambios de texto)*
- **Alt (`aereas_09.jpeg`, si se usa foto):** `Costa de Acapulco bajo la luz dorada de la mañana, vista desde el aire` *(sin cambios)*

---

## 3. Habitaciones — `/habitaciones`

### 3.1 Encabezado de página

> **`[RONDA 15 JUN]`** Se REEMPLAZA/EXPANDE `habitacionesHeader.intro` con el copy largo del cliente, estructurado en dos niveles (patrón SectionHeading): un **subtítulo** corto (la línea con guion que dio el cliente, dividida en su parte conceptual) y el **cuerpo editorial** en 4 párrafos. Recomiendo al `ui-engineer` pasar `intro` a un objeto `{ subtitulo, cuerpo: [p1, p2, p3, p4] }` (o `cuerpo` como string con saltos), para soportar los dos niveles. Eyebrow y título H1 se conservan.

- **Eyebrow:** `DESCANSO` *(sin cambios)*
- **Título (H1):** `Habitaciones & Suites` *(sin cambios)*
- **Subtítulo (literal, va bajo el H1):** `Diseñadas para el descanso, inspiradas por el mar.`
- **Cuerpo — Párrafo 1 (literal):** `Cada habitación de Aurea Vita ha sido concebida como un refugio privado donde la tranquilidad y el bienestar se convierten en parte de la experiencia. Las amplias vistas al Pacífico acompañan cada amanecer, los espacios generosos y los detalles cuidadosamente seleccionados invitan a desconectar del ritmo cotidiano y reconectar con uno mismo en armonía.`
- **Cuerpo — Párrafo 2 (literal):** `Todas nuestras habitaciones cuentan con vista al mar, baño con tina, amplio clóset de caoba, estación de té, pantalla de entretenimiento y una cama de masaje integrada a la experiencia wellness de tu propia habitación.`
- **Cuerpo — Párrafo 3 (literal):** `Aquí, cada espacio ha sido diseñado para favorecer el descanso profundo, la relajación y la sensación de bienestar que define la esencia de Aurea Vita. Porque descansar no es solamente dormir. Es balancear los sentidos y sentirse en paz.`
- **Intro (ANTES):** ~~`Tres maneras de habitar la costa: entre jardines, frente al mar o en la suite que da nombre a la casa. Todas comparten lo esencial —silencio, luz y una cama en la que amanece tarde—.`~~
- **Alt hero (`habitaciones_02.jpeg`):** `Interior de suite en Aurea Vita con textiles claros y luz natural` *(sin cambios)*

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

## 4. Alimentación Consciente — `/gastronomia` *(antes "Gastronomía")*

> **`[RONDA 15 JUN]`** REBRANDING (D1). La ruta `/gastronomia` SE CONSERVA. La estructura interna (Origen / Cielo / menú degustación Marea / cartas / horarios / bandas) NO se toca esta ronda. Solo cambian: el **eyebrow** y el **H1** del hero, la **intro** y los **metadatos** (§10), hacia la nueva voz "Alimentación Consciente". El resto de §4.2–§4.4 queda intacto.

### 4.1 Encabezado de página

- **Eyebrow (ANTES):** ~~`LA MESA`~~
- **Eyebrow (AHORA):** `ALIMENTACIÓN CONSCIENTE`
- **Título (H1) (ANTES):** ~~`Gastronomía`~~
- **Título (H1) (AHORA):** `Alimentación Consciente`
- **Intro (ANTES):** ~~`Dos lugares, dos horas del día. Origen cocina lo que el Pacífico entrega cada mañana; Cielo lo celebra cuando el sol empieza a caer.`~~
- **Intro (AHORA):** `Comer bien es parte del descanso. Origen cocina lo que el Pacífico entrega cada mañana —sano, de temporada y con sabor— y Cielo lo acompaña cuando el sol empieza a caer.`
- **Alt hero (`restaurante_11.jpeg`):** `Mesa servida del restaurante Origen frente a la bahía, bajo la luz dorada de la tarde` *(sin cambios)*

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

## 5. Wellness — `/spa` *(antes "Spa Vita" / "Spa & Bienestar")*

> **`[RONDA 15 JUN]`** La ruta sigue siendo `/spa` (D4); solo cambia la etiqueta/título visible a "Wellness". Hero: nuevo título + subtítulo. Texto central nuevo (literal del cliente) que reemplaza la filosofía. Tres bloques EN CONSTRUCCIÓN gateados (§5.3 menú, §5.4 circuito de aguas, §5.5 aromaterapia): NO se borran, se ocultan tras bandera reversible. La página queda: hero + texto central + nota de cierre "próximamente" + banda CTA. Identidad verde (salvia/oliva) se conserva donde queda visible.

### 5.1 Encabezado de página

- **Eyebrow (salvia):** `BIENESTAR` *(se conserva; en salvia)*
- **Título (H1) (ANTES):** ~~`Spa Vita`~~
- **Título (H1) (AHORA):** `Wellness`
- **Subtítulo (literal, más pequeño, bajo el H1):** `Donde el bienestar sucede de forma natural.`
- **Alt hero (`spa_01.jpeg`):** `Camilla de masaje sobre piso de mármol del Wellness de Aurea Vita, en penumbra serena`

### 5.2 Texto central *(reemplaza "Filosofía de bienestar")*

> **`[RONDA 15 JUN]`** El bloque de filosofía (antes "El descanso también se aprende", 2 párrafos) se REEMPLAZA por el texto central literal del cliente. El eyebrow salvia y la línea decorativa se conservan como tratamiento visual del bloque.

- **Eyebrow (salvia):** `NUESTRA FILOSOFÍA` *(se conserva; opción del `ui-engineer` dejarlo o quitarlo — el texto funciona con o sin eyebrow)*
- **Título (H2) (ANTES):** ~~`El descanso también se aprende`~~ *(retirado; el texto central va sin H2, o con uno breve a criterio del `visual-designer`)*
- **Texto central (AHORA — literal):** `Disfruta nuestros masajes, terapias y experiencias que han sido diseñados para ayudarte a desacelerar, liberar tensiones y reconectar contigo mismo. Date el tiempo necesario para descansar y relajarte profundamente, armonizando con el sonido del Pacífico sin horarios y en tranquilidad total.`
- **Párrafos viejos (ARCHIVADOS, no se usan):** ~~`En Spa Vita no prometemos transformaciones...`~~ · ~~`Cada ritual comienza con una conversación breve...`~~

### 5.3 Menú de tratamientos — **EN CONSTRUCCIÓN (gateado, reversible)**

> **`[RONDA 15 JUN]`** Bloque OCULTO tras bandera. NO se borra el JSX ni los datos de `spa.js`. Reactivar = quitar la bandera. Copy intacto abajo para cuando reviva.

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

### 5.4 Bloque "Circuito de aguas" (sección oliva) — **EN CONSTRUCCIÓN (gateado, reversible)**

> **`[RONDA 15 JUN]`** Bloque OCULTO tras bandera. NO se borra. Copy intacto abajo.

- **Eyebrow:** `EL AGUA COMO MEDICINA`
- **Título (H2):** `Frío, calor y nada más`
- **Texto:** `El circuito de aguas alterna temperaturas como lo ha hecho la gente de mar desde siempre: vapor que abre, agua fría que despierta, flotación que suelta. Cuarenta minutos después, el cuerpo opina distinto.`
- **Alts:**
  - `spa_06.jpeg`: `Alberca de inmersión del circuito de aguas en ambiente de penumbra`
  - `spa_03.jpeg`: `Tina de piedra orgánica del Spa Vita junto a un muro de textura natural`

### 5.5 Bloque rituales / aromaterapia — **EN CONSTRUCCIÓN (gateado, reversible)**

> **`[RONDA 15 JUN]`** Bloque OCULTO tras bandera. NO se borra. Copy intacto abajo.

- **Eyebrow:** `LOS DETALLES`
- **Título (H2):** `Aromas de la costa`
- **Texto:** `Todos los aceites y mezclas del Spa Vita se preparan en casa con ingredientes de la región: coco, salvia, cacao, sal de mar. Lo que toca tu piel viene de cerca.`
- **Alts:**
  - `spa_15.jpeg`: `Composición de aceites y sales del Spa Vita en tonos arena`
  - `spa_09.jpeg`: `Vela encendida y difusor de aromaterapia en el Spa Vita`

### 5.6 Nota de cierre "próximamente" *(reemplaza la "Nota práctica" mientras el menú está gateado)*

> **`[RONDA 15 JUN]`** La nota práctica original prometía reservar rituales y describía el menú —que ahora está oculto—, así que dejaría de ser cierta. Se GATEA y, en su lugar, va una nota de cierre sobria en voz de marca, sin disculpas, que da continuidad a la página y guía hacia el concierge. Cuando el menú reviva, vuelve la nota práctica original (archivada abajo).

- **Título pequeño:** `Lo mejor, en camino`
- **Texto (AHORA):** `Estamos afinando cada detalle de nuestro Wellness: el menú de tratamientos, el circuito de aguas y los rituales de la costa llegarán muy pronto. Mientras tanto, nuestro concierge puede contarte qué preparamos y reservar tu lugar para cuando decidas venir.`
- **Nota práctica original (ARCHIVADA, revive con el menú):** ~~`El spa abre todos los días de 9:00 a 20:00. Te sugerimos reservar tus rituales con 24 horas de anticipación con el concierge o desde el formulario de contacto, y llegar 20 minutos antes para comenzar sin prisa. Los tratamientos están disponibles para huéspedes y visitantes con reservación.`~~

### 5.7 Banda CTA de la página

- **Título:** `Tu cuerpo ya sabe lo que necesita.`
- **Texto:** `Agenda tu ritual y nosotros preparamos el silencio.`
- **Botón:** `Agendar mi ritual`

---

## 6. Experiencias — `/experiencias`

> **`[RONDA 15 JUN]`** Página EN CONSTRUCCIÓN. Se gatean los 3 bloques temáticos (§6.2 Alberca infinita, §6.3 Atardeceres en Cielo, §6.4 Descubre Acapulco), reversibles, sin borrar JSX. Como "Experiencias" sigue en el menú, la página NO puede quedar vacía ni ser un callejón sin salida: queda **hero + intro + mensaje "próximamente" (§6.1bis) + banda CTA** (§6.5, sin cambios → `/contacto`). Conserva su hero fotográfico y jerarquía de página interior (no es un placeholder de pantalla completa).

### 6.1 Encabezado de página

- **Eyebrow:** `EXPERIENCIAS` *(se conserva)*
- **Título (H1):** `Maneras de pasar el día` *(se conserva)*
- **Intro (ANTES):** ~~`Dentro de la casa o bahía adentro: aquí nadie programa tu agenda, pero sí la habilitamos.`~~
- **Intro (AHORA):** `Dentro de la casa o bahía adentro: estamos dando forma a las maneras de pasar el día en Aurea Vita.`
- **Alt hero (`alberca_05.jpeg`):** `Alberca infinita de Aurea Vita extendiéndose hacia el horizonte del Pacífico` *(sin cambios)*

### 6.1bis Mensaje "próximamente" *(nuevo — bloque visible entre la intro y la banda CTA)*

> **`[RONDA 15 JUN]`** Bloque NUEVO en voz de marca: sereno, sin disculparse, que promete que vale la pena esperar. Va sobre fondo marfil, máximo ~60ch, con eyebrow opcional.

- **Eyebrow (opcional):** `PRÓXIMAMENTE`
- **Título (H2):** `Estamos afinando los días`
- **Texto:** `La alberca infinita, los atardeceres en la terraza y las salidas para descubrir Acapulco están casi listos. Preferimos contarlos cuando cada detalle esté en su sitio. Vuelve pronto; el mar, mientras tanto, sigue en su lugar.`

### 6.2 Bloque "Alberca infinita" — **EN CONSTRUCCIÓN (gateado, reversible)**

> **`[RONDA 15 JUN]`** Bloque OCULTO tras bandera. NO se borra. Copy intacto abajo.

- **Eyebrow:** `EL AGUA DULCE`
- **Título (H2):** `La alberca infinita`
- **Texto:** `Su borde coincide con el horizonte, así que nadar hacia el final de la alberca es, ópticamente, nadar hacia el mar. Por la mañana es de quienes madrugan a hacer largos; por la tarde, de quienes leen a la sombra; de noche, iluminada y tibia, casi siempre está sola. Casi.`
- **Texto secundario (apoyo `alberca_07`):** `El desayuno puede servirse junto al agua. Solo hay que pedirlo la noche anterior.`
- **Alts:**
  - `alberca_02.jpeg`: `Camastros y palmeras junto a la alberca de Aurea Vita`
  - `alberca_10.jpeg`: `Detalle del agua en calma de la alberca reflejando la luz`
  - `alberca_14.jpeg`: `Alberca iluminada de noche bajo un cielo azul profundo`
  - `alberca_07.jpeg`: `Desayuno servido en una mesa junto a la alberca por la mañana`

### 6.3 Bloque "Atardeceres en Cielo" — **EN CONSTRUCCIÓN (gateado, reversible)**

> **`[RONDA 15 JUN]`** Bloque OCULTO tras bandera. NO se borra. Copy intacto abajo.

- **Eyebrow:** `LA HORA DORADA`
- **Título (H2):** `Atardeceres en Cielo`
- **Texto:** `Cada tarde, a la misma hora, la terraza gira hacia el poniente sin moverse de su sitio. El bar sirve su carta de autor, alguien baja la música, y durante veinte minutos nadie habla demasiado fuerte. Es lo más parecido a un ritual colectivo que tenemos.`
- **CTA (link):** `Conoce la carta de Cielo →`
- **Alts:**
  - `terraza_13.jpeg`: `Atardecer desde la terraza de Cielo con el cielo encendido en tonos cálidos`
  - `terraza_10.jpeg`: `Ambiente nocturno del lounge de Cielo con iluminación tenue`

### 6.4 Bloque "Descubre Acapulco" (sección marino) — **EN CONSTRUCCIÓN (gateado, reversible)**

> **`[RONDA 15 JUN]`** Bloque OCULTO tras bandera. NO se borra. Copy intacto abajo.

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

> **`[RONDA 15 JUN]`** Navegación a 6 entradas (G3). Sale "Gastronomía" del menú (su contenido vive en la tarjeta 2 del Home, "Alimentación Consciente"; la ruta `/gastronomia` sigue accesible). "Spa" se renombra a "Wellness" (el `to:` sigue `/spa`). Mantener idénticos los arrays `NAV_LINKS` de `Navbar.jsx` y `Footer.jsx`.

- Links (ANTES): ~~`Inicio` · `Habitaciones` · `Gastronomía` · `Spa` · `Experiencias` · `Galería` · `Contacto`~~
- Links (AHORA): `Inicio` · `Habitaciones` · `Wellness` *(→ `/spa`)* · `Experiencias` · `Galería` · `Contacto`
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
- **Columna 1 — título:** `Navegación` → repite los **6** links del menú (§9.1, ronda 15 jun): `Inicio · Habitaciones · Wellness · Experiencias · Galería · Contacto`. **`[RONDA 15 JUN]`** ~~antes eran 7 (incluía "Gastronomía" y "Spa")~~.
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
| `/gastronomia` | **`[RONDA 15 JUN]`** ~~`Gastronomía — Origen y Cielo · Aurea Vita Acapulco`~~ → `Alimentación Consciente · Aurea Vita Acapulco` | ~~`Origen, cocina del Pacífico con menú degustación de siete tiempos, y Cielo, bar de terraza con cocteles de autor a la hora del atardecer.`~~ → `Alimentación consciente frente al Pacífico: cocina sana y de temporada en Origen y atardeceres en la terraza de Cielo. Comer bien como parte del descanso.` |
| `/spa` | **`[RONDA 15 JUN]`** ~~`Spa Vita — Spa & Bienestar · Aurea Vita Acapulco`~~ → `Wellness · Aurea Vita Acapulco` | ~~`Rituales de descanso profundo frente al Pacífico: masajes, envolturas, faciales y circuito de aguas. Abierto todos los días de 9:00 a 20:00.`~~ → `Wellness frente al Pacífico: masajes, terapias y experiencias para desacelerar y reconectar contigo mismo, al ritmo del mar. Muy pronto, el menú completo.` |
| `/experiencias` | `Experiencias · Aurea Vita Acapulco` | `Alberca infinita, atardeceres en la terraza de Cielo y salidas por Acapulco: vela en la bahía, La Quebrada, manglares de Coyuca y el viejo puerto.` |
| `/galeria` | `Galería · Aurea Vita Acapulco` | `Un recorrido visual por Aurea Vita: vistas aéreas de la bahía, habitaciones, alberca infinita, gastronomía, spa y atardeceres en terraza.` |
| `/contacto` | `Reservaciones y contacto · Aurea Vita Acapulco` | `Cuéntanos tus fechas y nuestro concierge te responde el mismo día con disponibilidad. Av. Escénica 1200, Acapulco, Guerrero, México.` |

---

## 11. Nota para el ui-engineer

- Los textos con formato `{variable}` en §8.4 se interpolan desde el estado del formulario.
- Los ids de filtros (§7.2) coinciden con los nombres de carpeta de `public/fotos_hotel/` salvo `fachadas` → etiqueta `Arquitectura`.
- Mantener mayúsculas SOLO en eyebrows (vía CSS `uppercase`, no escribir en mayúsculas en los datos, salvo las duraciones del spa que ya van como eyebrow).
- Cualquier copy nuevo que surja durante la implementación debe pasar por el glosario de §0.

---

## 12. Handoff de la ronda 15 jun — copy nuevo por archivo de datos

Resumen para el `ui-engineer`: qué cambia, en qué archivo, con el texto listo para pegar. Las referencias a secciones detalladas están entre paréntesis.

### `src/data/home.js`

**Hero (§1.2)**
- ELIMINAR el eyebrow del hero (antes `AUREA VITA · ACAPULCO`).
- H1 sin cambios: `Santuario frente al Pacífico`.
- Subtítulo nuevo: `Un santuario frente al mar donde no existen los horarios, solo el descanso, el bienestar y el placer de vivir plenamente.`

**Sección "Descubre Aurea Vita" (§2.1)**
- ELIMINAR eyebrow `EL HOTEL`.
- Título: `Bienvenido a Aurea Vita` → `Descubre Aurea Vita`.
- Cuerpo (3 párrafos):
  1. `En Aurea Vita creemos que el verdadero lujo es disponer de tiempo para uno mismo. Frente al Pacífico, hemos creado un refugio donde los días transcurren sin prisas y cada experiencia está pensada para reconectar con lo esencial. Aquí no existen itinerarios rígidos ni horarios que seguir. El mar marca el ritmo, la tranquilidad guía cada momento y el bienestar surge de forma natural.`
  2. `Comienza la mañana con una vista infinita al océano, disfruta una gastronomía saludable y llena de sabor, relájate con terapias y masajes diseñados para restaurar cuerpo y mente, o simplemente encuentra un espacio para descansar profundamente mientras la brisa acompaña el día.`
  3. `Aurea Vita es una invitación a vivir despacio, a nutrirse conscientemente y a redescubrir el placer de estar presente. Porque algunas experiencias no se miden por lo que haces, sino por cómo te hacen sentir.`

**Grid de 3 tarjetas (§2.2)**
- T1 (Habitaciones): texto → `Amplios espacios para descansar y relajarse con absoluta privacidad.`
- T2: título `Gastronomía` → `Alimentación Consciente` (`to:` sigue `/gastronomia`); eyebrow `LA MESA` se conserva; texto → `Cocina saludable y llena de sabor, pensada para nutrir el cuerpo al ritmo del Pacífico.`
- T3: título `Spa Vita` → `Experiencia Aurea Vita` (`to:` sigue `/spa`); eyebrow `BIENESTAR` se conserva; texto → `Descubre el descanso profundo a tu propio ritmo.`

**Sección "El destino — Acapulco" (§2.3)**
- Eyebrow `EL DESTINO` se conserva.
- Título → `Acapulco Diamante`.
- Cuerpo (2 párrafos):
  1. `Acapulco Diamante, una de las zonas más privilegiadas y mejor conservadas del Pacífico mexicano. Aquí, la naturaleza sigue siendo la protagonista. Kilómetros de playa prácticamente ininterrumpida, extensas áreas de vegetación tropical y la presencia constante del océano crean un entorno donde el tiempo parece transcurrir de forma diferente. El sonido de las olas, la brisa marina y los colores del paisaje acompañan cada momento, invitando a reducir el ritmo y reconectar con lo esencial.`
  2. `En Aurea Vita, creemos que el bienestar comienza con el lugar que nos rodea y con la capacidad de detenernos para apreciarlo. Más que un destino, este es un espacio para respirar profundamente, reconectar con uno mismo y dejar que la naturaleza marque el ritmo del día.`
- Datos `300` / `27°` / `12 min` SE CONSERVAN (D3).

**Sección "Momentos" (§2.4)**
- ELIMINAR por completo (JSX en `Home.jsx` + `momentosFotos` en `home.js`).

**Banda CTA final (§2.5)**
- Titular se conserva: `El Pacífico no se apura. Tú tampoco deberías.`
- Texto de apoyo → `Un refugio frente al mar para descansar, reconectar y disfrutar al ritmo de las olas.`
- Botón se conserva: `Reservar mi estancia`.

### `src/data/rooms.js`

**`habitacionesHeader` (§3.1)** — reemplazar/expandir `intro`. Recomendación: `{ subtitulo, cuerpo: [...] }`.
- Subtítulo: `Diseñadas para el descanso, inspiradas por el mar.`
- Cuerpo (3 párrafos):
  1. `Cada habitación de Aurea Vita ha sido concebida como un refugio privado donde la tranquilidad y el bienestar se convierten en parte de la experiencia. Las amplias vistas al Pacífico acompañan cada amanecer, los espacios generosos y los detalles cuidadosamente seleccionados invitan a desconectar del ritmo cotidiano y reconectar con uno mismo en armonía.`
  2. `Todas nuestras habitaciones cuentan con vista al mar, baño con tina, amplio clóset de caoba, estación de té, pantalla de entretenimiento y una cama de masaje integrada a la experiencia wellness de tu propia habitación.`
  3. `Aquí, cada espacio ha sido diseñado para favorecer el descanso profundo, la relajación y la sensación de bienestar que define la esencia de Aurea Vita. Porque descansar no es solamente dormir. Es balancear los sentidos y sentirse en paz.`
- Las 3 categorías de habitación NO cambian.

### `src/data/spa.js` (ruta `/spa`, etiqueta "Wellness")

**Hero (§5.1)**
- Título `Spa Vita` → `Wellness`.
- Subtítulo nuevo (más pequeño): `Donde el bienestar sucede de forma natural.`
- Eyebrow salvia `BIENESTAR` se conserva.

**Texto central (§5.2)** — reemplaza la filosofía:
- `Disfruta nuestros masajes, terapias y experiencias que han sido diseñados para ayudarte a desacelerar, liberar tensiones y reconectar contigo mismo. Date el tiempo necesario para descansar y relajarte profundamente, armonizando con el sonido del Pacífico sin horarios y en tranquilidad total.`

**Gateado (NO borrar):** menú de tratamientos (§5.3), circuito de aguas (§5.4), aromaterapia (§5.5).

**Nota de cierre "próximamente" (§5.6)** — reemplaza la nota práctica mientras el menú esté gateado:
- Título: `Lo mejor, en camino`
- Texto: `Estamos afinando cada detalle de nuestro Wellness: el menú de tratamientos, el circuito de aguas y los rituales de la costa llegarán muy pronto. Mientras tanto, nuestro concierge puede contarte qué preparamos y reservar tu lugar para cuando decidas venir.`

**Banda CTA (§5.7)** — sin cambios; botón `Agendar mi ritual` → `/contacto`.

### `src/data/` de Experiencias (`Experiencias.jsx` / su data)

**Hero (§6.1)** — eyebrow `EXPERIENCIAS` y H1 `Maneras de pasar el día` se conservan.
- Intro nueva: `Dentro de la casa o bahía adentro: estamos dando forma a las maneras de pasar el día en Aurea Vita.`

**Mensaje "próximamente" nuevo (§6.1bis)** — bloque visible entre intro y banda CTA:
- Eyebrow (opcional): `PRÓXIMAMENTE`
- Título: `Estamos afinando los días`
- Texto: `La alberca infinita, los atardeceres en la terraza y las salidas para descubrir Acapulco están casi listos. Preferimos contarlos cuando cada detalle esté en su sitio. Vuelve pronto; el mar, mientras tanto, sigue en su lugar.`

**Gateado (NO borrar):** Alberca infinita (§6.2), Atardeceres en Cielo (§6.3), Descubre Acapulco (§6.4).
**Banda CTA (§6.5)** — sin cambios → `/contacto`.

### Rebranding `/gastronomia` (dining.js / gastronomia.js — solo hero + metadatos, D1)

- Eyebrow del hero: `LA MESA` → `ALIMENTACIÓN CONSCIENTE`.
- H1: `Gastronomía` → `Alimentación Consciente`.
- Intro: `Comer bien es parte del descanso. Origen cocina lo que el Pacífico entrega cada mañana —sano, de temporada y con sabor— y Cielo lo acompaña cuando el sol empieza a caer.`
- Estructura interna (Origen / Cielo / menú Marea / cartas) NO se toca.
- Metadatos (§10): `<title>` → `Alimentación Consciente · Aurea Vita Acapulco`; description → `Alimentación consciente frente al Pacífico: cocina sana y de temporada en Origen y atardeceres en la terraza de Cielo. Comer bien como parte del descanso.`

### Componentes globales (`Navbar.jsx` + `Footer.jsx`)

- `NAV_LINKS` (idénticos en ambos): `Inicio · Habitaciones · Wellness (→ /spa) · Experiencias · Galería · Contacto`. Quitar `Gastronomía`; renombrar label de `/spa` a `Wellness`.
- Metadatos `/spa` (§10): `<title>` → `Wellness · Aurea Vita Acapulco`; description → `Wellness frente al Pacífico: masajes, terapias y experiencias para desacelerar y reconectar contigo mismo, al ritmo del mar. Muy pronto, el menú completo.`

### Verificación de glosario (§0)
Todo el copy nuevo respeta el glosario y palabras vetadas: sin "paraíso", "experiencia inolvidable", "lujo sin igual", etc. Se usa "reservar", "habitación/suite", "huéspedes". El término "wellness" se introduce como nombre de la página por decisión del cliente (D4) y "alimentación consciente" como rebranding de la tarjeta/página de gastronomía (D1). El motivo narrativo del mar/tiempo está presente en cada bloque nuevo.
