# Design Brief — Aurea Vita
**Santuario frente al Pacífico · Acapulco, Guerrero, México**

- **Autor:** ux-architect
- **Fecha:** 12 de junio de 2026
- **Consumidores de este brief:** `ux-writer` (copy), `ui-engineer` (implementación), `visual-designer` (refinamiento), `motion-engineer` (animación)
- **Fuentes:** `prompt-claude-code-aurea-vita.md` + catálogos fotográficos en `docs/fotos/`

---

## 0. Reglas no negociables (heredadas de la especificación)

1. **Logo:** única fuente válida `public/Logo.svg`. En `public/` existen `AureaVita_logo.jpeg`, `Aurea_Vita_logo.png` y `Aurea_Vita_logo_fondo_blanco.jpeg` — **prohibido usarlos**. Favicon también se deriva del SVG.
2. **Color:** dorado (`#C6A87D`) es el único acento global. Oliva/salvia solo dominan en `/spa`. Nada fuera de los 7 tokens.
3. **Fotos:** solo `public/fotos_hotel/`. Lista negra completa en §4.8 de este brief.
4. **Hero:** `min-h-[100dvh]`, nunca `h-screen`. Hero sin lazy loading; todo lo demás `loading="lazy"`.
5. **Idioma:** es-MX, tono editorial, cero clichés ("paraíso", "experiencia inolvidable", "el lugar de tus sueños" quedan vetados — el `ux-writer` define el vocabulario).

---

## 1. Dirección de arte general

"Lujo sereno costero" se traduce en cinco decisiones concretas:

### 1.1 La foto manda, la interfaz se retira
Como Anantara: el hero y las secciones de imagen son inmersivas, full-bleed, con overlays de degradado marino (`#1F3A44` a 30–45% de opacidad, nunca negro puro) solo donde hay texto encima. La UI nunca compite con la fotografía: sin bordes gruesos, sin sombras duras, sin tarjetas con fondos saturados.

### 1.2 Tipografía protagonista, a la SHA
- Títulos display en **Cormorant Garamond 300–400**, tamaños grandes (clamp de ~2.5rem móvil a ~5rem desktop en H1). El peso ligero a gran tamaño ES el lujo; nunca compensar con bold.
- Cuerpo en **Jost** (preferida sobre Inter por su calidez geométrica), 1rem–1.125rem, line-height 1.7, color `marino` sobre claros y `marfil` sobre marino.
- **Eyebrows** (etiqueta corta sobre cada título de sección): mayúsculas, tracking 0.25em, 0.75rem, color `dorado` sobre fondos claros / `dorado` también sobre marino. Es el hilo conductor visual de todo el sitio. Patrón fijo: `eyebrow → H2 serif → párrafo corto → CTA opcional`. Esto se encapsula en `SectionHeading`.

### 1.3 Espacio como material
Ritmo vertical generoso: secciones con padding ≥ 96px en desktop (py-24/py-32), ≥ 64px en móvil. Máximo de ancho de texto: ~65ch. Entre el hero y la primera sección editorial debe haber "aire" suficiente para que el cambio de inmersión a lectura se sienta como una exhalación.

### 1.4 Alternancia de fondos con propósito
Secuencia rítmica en todas las páginas: `marfil → arena → marfil → marino (contraste) → marfil`. La sección marino es el "momento de profundidad" de cada página (máximo una o dos por página). En `/spa` la sección de contraste puede ser `oliva` en lugar de marino.

### 1.5 El dorado se gana, no se regala
Dorado solo en: eyebrows, botones primarios, líneas decorativas de 1px (separador de 40–60px de ancho bajo títulos), hover de links, y el acento de la Suite Aurea. Si una pantalla tiene más de 3 elementos dorados visibles a la vez, sobra uno.

**Qué tomamos de las referencias (sin copiar):**
- De **anantara.com**: hero fullscreen con barra de reserva integrada al pie del hero, storytelling del destino como sección propia, navegación que desaparece/reaparece con elegancia.
- De **shawellness.com**: estructura editorial de bloques imagen+texto alternados, números/datos presentados con serif gigante (m², huéspedes), menús de tratamientos como lista tipográfica limpia (no cards con foto cada uno).

---

## 2. Arquitectura de navegación

### 2.1 Orden del menú (fijo, desktop e hamburguesa móvil)

```
Inicio · Habitaciones · Gastronomía · Spa · Experiencias · Galería · Contacto    [ Reservar ]
```

- **"Reservar"** es un botón (fondo dorado, texto marino), no un link más; siempre visible en la Navbar, lleva a `/contacto`. Es el único CTA persistente del sitio.
- El logo (Logo.svg) a la izquierda, links centrados o a la derecha, botón Reservar al extremo derecho.
- En móvil: hamburguesa que abre panel fullscreen fondo marino, links en Cormorant grande, botón Reservar al pie del panel. Touch targets ≥ 44px.

### 2.2 Jerarquía y flujo de conversión

El flujo principal es **Inicio → Habitaciones → Contacto/Reserva**. Cada eslabón empuja al siguiente:

1. **Inicio:** la BookingBar del hero NO procesa nada — al enviar, redirige a `/contacto` con las fechas/huéspedes precargados (query params o estado de router). El grid de 3 tarjetas (Habitaciones/Gastronomía/Spa) es la segunda ruta de profundización.
2. **Habitaciones:** cada categoría termina en botón "Reservar" que lleva a `/contacto` con el tipo de habitación preseleccionado en el formulario.
3. **Contacto:** recibe el contexto (fechas, huéspedes, tipo de habitación) y lo refleja en el formulario ya rellenado. El usuario nunca re-teclea lo que ya dijo.

Páginas de soporte (Gastronomía, Spa, Experiencias, Galería) cierran siempre con un CTA de reserva al pie ("banda CTA": fondo marino o foto con overlay + título serif + botón dorado), para que ningún recorrido termine en callejón sin salida.

### 2.3 Footer como mapa
El footer (fondo marino) repite la navegación completa, por lo que el usuario perdido siempre tiene salida al final de cualquier página.

---

## 3. Concepto del hero del home

### 3.1 Los primeros 3 segundos

El usuario llega (típicamente desde un buscador o un link compartido, en móvil más de la mitad de las veces) y debe percibir, en este orden y sin scroll:

1. **Segundo 0–1:** la fotografía. `aereas_11.jpeg` fullscreen (`min-h-[100dvh]`, `object-cover`) — costa turquesa, playa extensa, cielo limpio. La promesa: "esto es el Pacífico, y es enorme y tranquilo".
2. **Segundo 1–2:** la marca. Eyebrow "AUREA VITA · ACAPULCO" (tracking amplio, marfil) + H1 tagline en Cormorant 300 grande ("Santuario frente al Pacífico" o la variante que proponga el `ux-writer`). El bloque de texto se ancla en el **tercio superior/centro-izquierdo**, porque el catálogo confirma que aereas_11 tiene el tercio superior de cielo despejado, ideal para texto blanco.
3. **Segundo 2–3:** la acción. La **BookingBar** anclada al borde inferior del hero (desktop: barra horizontal centrada que "muerde" el borde — mitad sobre la foto, mitad sobre el fondo marfil de la siguiente sección, estilo Anantara). Debajo del texto del hero, un indicador de scroll sutil (línea vertical dorada animada).

### 3.2 Convivencia logo + tagline + BookingBar

- El **logo va en la Navbar** (transparente sobre el hero, versión marfil/blanca del SVG vía `filter` o variante), NO duplicado en el centro del hero. Centro del hero = tagline. Un solo punto focal de marca arriba, un solo mensaje al centro, una sola acción abajo. Tres capas, cero competencia.
- Overlay del hero: degradado vertical `marino/40 → transparent → marino/30` (arriba para la navbar, abajo para la BookingBar). Verificar contraste AA del texto marfil.

### 3.3 Casos extremos del hero

- **Móvil:** la BookingBar horizontal no cabe → colapsa a un botón ancho "Consultar disponibilidad" fijo al pie del hero que abre la BookingBar como sheet/panel desplegable, o que lleva directo a `/contacto`. Nunca apilar 3 selects verticales sobre la foto.
- **CLS:** la foto del hero con `width`/`height` explícitos o `aspect-ratio` + color de fondo `marino` como placeholder mientras carga. Sin lazy loading aquí; considerar `<link rel="preload">`.
- **Pantallas muy anchas (>1920px):** limitar el bloque de texto a un container max-w-7xl; la foto sí va full-bleed.
- **Hero alternativo** si aereas_11 fallara en pruebas visuales: `aereas_09.jpeg` (luz dorada de mañana, también horizontal con espacio para texto).

---

## 4. Brief por página

### 4.1 `/` — Inicio

**Contexto del usuario:** primera visita, evalúa en segundos si el hotel "es para él/ella". Busca confirmación visual de nivel + ubicación + precio implícito. Viene de Google, Instagram o recomendación.

**Estructura (orden y jerarquía):**

| # | Sección | Fondo | Foto(s) | Notas |
|---|---|---|---|---|
| 1 | Hero fullscreen + BookingBar | foto | `aereas_11.jpeg` | Ver §3 |
| 2 | Editorial "Bienvenido a Aurea Vita" | marfil | `fachadas_10.jpeg` | Layout 50/50 texto-izq/foto-der. **Alerta:** recortar/encuadrar con `object-position` para minimizar el letrero "Sacher"; si no es viable, usar `fachadas_05.jpeg` (enredadera, sin marca dominante). |
| 3 | Grid 3 tarjetas: Habitaciones / Gastronomía / Spa | arena | `habitaciones_12.jpeg` / `restaurante_11.jpeg` / `spa_01.jpeg` | Cards altas (ratio 3:4), eyebrow + título serif + link "Descubrir →". Son las 3 fotos estrella de cada sección — coherencia con sus páginas destino. |
| 4 | Contraste "El destino — Acapulco" | marino | `aereas_15.jpeg` | Foto atardecer + texto marfil. Datos del destino en serif grande (ej. "300 días de sol"). Link a /experiencias. |
| 5 | Strip/carrusel alberca-terraza | marfil | `alberca_05.jpeg`, `alberca_02.jpeg`, `alberca_14.jpeg`, `alberca_10.jpeg`, `terraza_13.jpeg` | Carrusel horizontal con drag o strip de 3 visibles. |
| 6 | Banda CTA final de reserva | marino o foto con overlay (`aereas_09.jpeg`) | — | Título serif + botón dorado → /contacto. |
| 7 | Footer | marino | — | Ver §5.5 |

**Casos extremos:** en móvil el grid de 3 tarjetas se apila vertical (orden: Habitaciones, Gastronomía, Spa); el carrusel pasa a scroll-snap horizontal nativo con peek de la siguiente foto.

---

### 4.2 `/habitaciones` — Habitaciones & Suites

**Contexto del usuario:** ya decidió que el hotel le interesa; ahora compara categorías y precios implícitos. Necesita escanear rápido (foto, m², ocupación) y profundizar si algo le gusta.

**Estructura:**
1. **Hero interior** (60–70vh, no fullscreen): `habitaciones_02.jpeg` con overlay y título "Habitaciones & Suites". Las páginas interiores usan hero más bajo para diferenciar jerarquía respecto al Home.
2. **Intro editorial corta** (2–3 líneas del ux-writer, fondo marfil).
3. **Tres bloques de categoría** en orden ascendente de lujo (genera deseo progresivo), cada uno: foto principal grande + mini-galería de 4 thumbnails + specs (m², ocupación, amenidades como lista con iconos lineales) + botón "Reservar" → `/contacto?habitacion=X`:

| Categoría | Acento | Foto principal | Mini-galería |
|---|---|---|---|
| Habitación Vista Jardín | salvia | `habitaciones_13.jpeg` | `habitaciones_11`, `habitaciones_01`, `habitaciones_04`, `habitaciones_14` |
| Suite Vista al Mar | marino | `habitaciones_05.jpeg` | `habitaciones_10`, `habitaciones_03`, `habitaciones_15` |
| Suite Aurea (insignia) | dorado | `habitaciones_12.jpeg` (foto estrella del proyecto) | `habitaciones_02`, `habitaciones_07`, `habitaciones_06` |

El acento de categoría aparece SOLO en: eyebrow, línea decorativa y tag de la categoría. Botones siguen siendo dorados (disciplina de paleta; la Suite Aurea es la única donde acento y CTA coinciden — eso la hace insignia).

4. **Banda CTA final** → /contacto.

**Descartes obligatorios:** `habitaciones_08` y `habitaciones_09` no se usan (calidad insuficiente, dañan la percepción de lujo).

**Casos extremos:** en móvil cada bloque se apila (foto principal → specs → galería en scroll horizontal → CTA); los thumbnails abren la foto ampliada (reutilizar Lightbox). RoomCard con la misma altura de specs aunque el texto varíe (min-height o grid), para que las 3 categorías se sientan comparables.

---

### 4.3 `/gastronomia` — Gastronomía

**Contexto del usuario:** huésped potencial validando que "hay buen restaurante", o huésped ya convencido planeando su estancia. Lectura más pausada, mood-driven.

**Estructura (layout alternado imagen/texto estilo SHA):**
1. **Hero interior:** `restaurante_11.jpeg` (mesa servida + vista al puerto + luz dorada: la narrativa completa de "Origen" en una imagen).
2. **Bloque "Origen"** (restaurante principal, cocina del Pacífico):
   - Slot 1 (texto-der/foto-izq): `restaurante_14.jpeg` — cena con horizonte crepuscular.
   - Slot 2 (alternado): `restaurante_01.jpeg` — arquitectura de redes náuticas (conexión conceptual pescador/Pacífico que el ux-writer debe explotar).
   - Slot 3: `restaurante_12.jpeg` — desayuno/terraza verde.
   - **Menú degustación** como lista tipográfica (sin fotos por plato): nombre del platillo en serif, descripción en sans piedra, sin precios o con precios discretos. Horarios ficticios en tabla mínima.
   - Apoyos opcionales si se necesita más material: `restaurante_03` (cena íntima), `restaurante_09` (chef en cocina).
3. **Bloque "Cielo"** (bar de terraza): fondo arena para diferenciar.
   - Foto principal: `terraza_13.jpeg` (rooftop crepuscular — la mejor del set).
   - Secundarias: `terraza_10.jpeg` (lounge cálido) y `terraza_03.jpeg` (terraza diurna). **Restricción dura: ninguna otra foto del set terraza es utilizable** (contextos europeos/urbanos ajenos a Acapulco).
   - Carta breve de cocteles de autor (lista tipográfica) + horario de atardecer ("golden hour" como momento del bar — ángulo narrativo para el ux-writer).
4. **Banda CTA** ("Reserva tu mesa" → /contacto).

**Descartes:** `restaurante_02`, `restaurante_08`, `restaurante_10` (estilos ajenos al concepto).

**Casos extremos:** el layout alternado colapsa en móvil siempre a foto-arriba/texto-abajo (nunca alternar el orden vertical, marea). Menú degustación: si el nombre del platillo es largo, el precio no se desalinea (usar grid, no flexbox con dots).

---

### 4.4 `/spa` — Spa & Bienestar ("Spa Vita")

**Contexto del usuario:** búsqueda de calma; es la página más "SHA" del sitio. Aquí los verdes (oliva/salvia) sustituyen al dorado como acento dominante. Ritmo de lectura más lento: más espacio en blanco que en ninguna otra página.

**Estructura:**
1. **Hero interior:** `spa_01.jpeg` (masaje sobre mármol, editorial dramática — la mejor foto del set spa). Overlay sutil, título "Spa Vita" + eyebrow en salvia.
2. **Filosofía de bienestar:** bloque editorial solo-texto sobre marfil, máximo 65ch, tipografía protagonista. Sin foto: el silencio visual ES el mensaje.
3. **Menú de tratamientos (5–6):** lista tipográfica vertical estilo SHA — nombre en Cormorant, duración en eyebrow salvia (ej. "90 MIN"), descripción breve en piedra. Separadores de 1px arena. **Sin foto por tratamiento.**
4. **Bloque "Circuito de aguas" / rituales** (sección de contraste en `oliva` con texto marfil): `spa_06.jpeg` (plunge pool meditativa) + `spa_03.jpeg` (tina orgánica).
5. **Bloque rituales/aromaterapia:** `spa_15.jpeg` (still-life paleta arena, perfectamente alineada con la marca) + `spa_09.jpeg` (vela/difusor) como detalle. Apoyos: `spa_02`, `spa_04`, `spa_05`, `spa_10`, `spa_13` (salón panorámico) según necesidad.
6. **Banda CTA** ("Agenda tu ritual" → /contacto) — aquí el botón puede ser oliva en lugar de dorado, única excepción permitida y debe validarla el visual-designer.

**Descartes:** `spa_11` (letrero ajeno), `spa_14` (clínica médica). `spa_07` solo si se menciona manicure/pedicure (opulencia dorada fuera de tono — preferir no usarla).

**Casos extremos:** la lista de tratamientos en móvil mantiene la duración visible sin romper línea (duración arriba del nombre o a la derecha con flex-wrap controlado).

---

### 4.5 `/experiencias` — Experiencias

**Contexto del usuario:** ya casi convencido, busca "qué más hay" — o huésped confirmado planeando días. Página de inspiración, scroll largo y visual.

**Estructura (3 bloques temáticos):**
1. **Hero interior:** `alberca_05.jpeg` (la imagen más aspiracional del set alberca).
2. **Bloque "Alberca infinita":** `alberca_02.jpeg` + detalle `alberca_10.jpeg` + nocturna `alberca_14.jpeg` (momento "la alberca de noche"). Apoyo editorial: `alberca_07.jpeg` (desayuno junto a la alberca — puente narrativo con Gastronomía). `alberca_15.jpeg` (nado en entorno natural) puede tender puente hacia Spa.
3. **Bloque "Atardeceres en Cielo":** `terraza_13.jpeg` + `terraza_10.jpeg` (solo estas dos aquí; terraza_03 reservada a Gastronomía para no repetir las tres en dos páginas). Link cruzado a /gastronomia.
4. **Bloque "Descubre Acapulco"** (sección de contraste marino): 3–4 experiencias del destino como cards horizontales con foto:
   - Costa y bahía: `aereas_02.jpeg`
   - Acantilados/drama costero: `aereas_08.jpeg`
   - Atardecer en la bahía: `aereas_15.jpeg` (reutilizable; si se quiere evitar repetición con Home, usar `aereas_10.jpeg`)
   - Naturaleza/manglares: `aereas_04.jpeg`
5. **Banda CTA final** → /contacto.

**Descartes:** `alberca_03` (parque acuático), `alberca_09` (entorno desértico), `aereas_03` (nieve), `aereas_14` (estacionamiento).

**Casos extremos:** las cards de "Descubre Acapulco" usan fotos de orientaciones mixtas (aereas_04 es vertical) → contenedores con `aspect-ratio` fijo + `object-cover` para uniformar. En móvil, bloques apilados con foto siempre primero.

---

### 4.6 `/galeria` — Galería

**Contexto del usuario:** quiere "verlo todo" antes de decidir — el visitante más escéptico del sitio. También llega gente desde redes. Velocidad de carga y fluidez son la UX aquí.

**Estructura:**
1. Header compacto (no hero con foto: la galería ES la foto). Título + filtros.
2. **Filtros por categoría** (8 + "Todas"): pills con scroll horizontal en móvil. Etiquetas en español: Todas · Vistas aéreas · Alberca · Arquitectura · Habitaciones · Lobby · Restaurante · Spa · Terraza.
3. **Grid masonry** (CSS columns o grid con spans): mezcla deliberada de orientaciones. Cada imagen con `loading="lazy"`, alt descriptivo en español, hover sutil.
4. **Lightbox** al click: navegación con flechas (teclado ← → y Esc), contador "7 / 64", foco atrapado, fondo marino/95.

**Selección curada (no las 120):** publicar solo las aprobadas, ~60 fotos:
- aereas: 01, 02, 04, 05, 06, 08, 09, 10, 11, 12, 15
- alberca: 01, 02, 04, 05, 06, 07, 10, 11, 13, 14, 15
- fachadas: 04, 05, 09, 10, 12, 14, 15 (las de letrero retocable, bien encuadradas)
- habitaciones: 01–07, 10–15 (sin 08 ni 09)
- lobby: 05, 07, 08, 12, 15 — **solo las sin cubrebocas**
- restaurante: 01, 03, 06, 07, 09, 11, 12, 13, 14, 15
- spa: 01–06, 09, 10, 12, 13, 15
- terraza: **solo 13, 10, 03**

**Casos extremos:** estado vacío de filtro no puede ocurrir (toda categoría tiene fotos), pero implementar mensaje de respaldo igualmente. `lobby_13` es `.png` y se descarta; `terraza_09` es `.jpg` y se descarta — con la selección curada no hay excepciones de extensión que manejar, todo es `.jpeg`. Masonry en móvil: 2 columnas; desktop: 3–4. Reservar espacio con `aspect-ratio` por foto para evitar saltos del masonry al cargar.

---

### 4.7 `/contacto` — Contacto / Reserva

**Contexto del usuario:** llega con intención (desde BookingBar, RoomCard o banda CTA) o buscando datos prácticos. Es el cierre del funnel: cero fricción, cero distracción.

**Estructura (layout 2 columnas en desktop):**
- **Columna izquierda — formulario:** nombre, email, fechas (llegada/salida), nº de huéspedes, tipo de habitación (select con las 3 categorías), mensaje opcional. **Precarga** desde query params (`?habitacion=suite-aurea&llegada=...&huespedes=2`).
- **Columna derecha — contexto:** foto `lobby_05.jpeg` (arquitectura monumental, sin cubrebocas) o `fachadas_09.jpeg` (entrada ceremonial), datos placeholder (dirección en Acapulco, Guerrero; teléfono; email), horario de atención.

**Validación y estados (responsabilidad compartida ui-engineer + ux-writer):**
- Validación en cliente al blur y al submit: mensajes específicos por campo en español, junto al campo, color de error accesible derivado de la paleta (no rojo genérico fuera de tokens — coordinarlo con el visual-designer; opción: texto marino con borde dorado/intensidad, o definir un token de error mínimo y documentarlo).
- Fechas: salida posterior a llegada; no fechas pasadas; en móvil usar inputs nativos `type="date"`.
- **Estado vacío al enviar:** marcar todos los campos requeridos con su mensaje, foco al primer campo con error, `aria-describedby` enlazando mensajes.
- **Éxito:** modal o panel de confirmación simulada (sin backend) con resumen de lo solicitado ("Suite Aurea · 14–17 de julio · 2 huéspedes") y aclaración de que un concierge "confirmará disponibilidad" — el ux-writer redacta esto con calidez, dejando claro que no es una reserva confirmada.
- **Doble envío:** botón deshabilitado con estado de carga simulada (~800ms) antes de la confirmación.

**Casos extremos:** en móvil la foto/contexto pasa abajo del formulario (el formulario es lo primero). Sin JavaScript de fechas exóticas: inputs nativos bastan.

---

### 4.8 Lista negra fotográfica global (no usar en ninguna página)

`aereas_03`, `aereas_07` (limitada — solo galería si hiciera falta, mejor no), `aereas_13`, `aereas_14`, `alberca_03`, `alberca_08`, `alberca_09`, `alberca_12`, `fachadas_01/02/03/06/07/08/11/13`, `habitaciones_08`, `habitaciones_09`, `lobby_01/04/09/10/13/14` (cubrebocas o calidad), `lobby_02/03/06/11` (cubrebocas — solo último recurso, nunca en secciones principales), `restaurante_02/08/10`, `spa_11`, `spa_14`, `terraza_01/02/04/05/06/07/08/09/11/12/14/15`.

**Regla terraza:** únicamente `terraza_13.jpeg`, `terraza_10.jpeg`, `terraza_03.jpeg` en todo el sitio.

---

## 5. Sistema de componentes

### 5.1 Navbar
- **Estado A (sobre hero):** fondo transparente, logo y links en marfil, sin borde. Solo en páginas con hero fotográfico, mientras el scroll < altura del hero (o < ~80vh).
- **Estado B (scrolled / páginas sin hero alto):** fondo marfil sólido (o marfil/95 + blur sutil), logo y links en marino, borde inferior 1px arena. Transición de 300ms en background/color, sin saltos de altura (la altura de la navbar es constante: ~72–80px).
- Link activo: subrayado dorado fino (2px, offset). Hover: color dorado.
- Botón "Reservar" persistente (ver §2.1).
- Móvil: hamburguesa → panel fullscreen marino (ver §2.1), bloquear scroll del body al abrir, cerrar con Esc y con click fuera, foco atrapado.
- En `/galeria` y `/contacto` (sin hero fotográfico alto) la navbar inicia directamente en Estado B.

### 5.2 BookingBar
- Desktop: barra horizontal (fondo marfil, sombra muy suave, esquinas levemente redondeadas) con 4 zonas: Llegada · Salida · Huéspedes · botón dorado "Consultar disponibilidad". Labels como eyebrows pequeños arriba de cada valor.
- Solo UI: al enviar redirige a `/contacto` con query params (§2.2). Nunca simular un motor de reservas real.
- Posición: anclada al borde inferior del hero del Home, "mordiendo" la transición foto→marfil. No es sticky en el resto del scroll (el botón Reservar de la navbar ya cumple la persistencia; duplicar sería ruido).
- Móvil: colapsa a botón único (§3.3).
- Accesibilidad: labels reales (`<label>`), inputs de fecha nativos, focus visible dorado.

### 5.3 RoomCard
- Usos: grid del Home (variante simple: foto + eyebrow + título + link) y `/habitaciones` (variante completa: foto principal, mini-galería, specs, amenidades, CTA).
- Foto con contenedor `aspect-ratio` fijo (3:4 en cards del Home, 4:3 en habitaciones) + `object-cover`.
- Hover: zoom de la foto a scale(1.04) con overflow hidden + elevación de sombra sutil; título NO cambia de tamaño (no layout shift).
- Acento de categoría parametrizable (salvia/marino/dorado) aplicado solo a eyebrow y línea decorativa (§4.2).
- Toda la card clickeable con un solo link accesible (no links anidados).

### 5.4 Lightbox
- Overlay marino al 95%, foto centrada max-h-[85vh], contador, flechas laterales (ocultas en móvil: swipe + tap en mitades), botón cerrar arriba-derecha.
- Teclado: ← → navegan, Esc cierra. Foco atrapado dentro; al cerrar, devolver foco al thumbnail de origen.
- `role="dialog"` + `aria-modal`, scroll del body bloqueado.
- Precargar la imagen siguiente/anterior para navegación fluida.

### 5.5 Footer
- Fondo marino, texto marfil/piedra clara. 4 zonas: logo SVG + frase de marca corta / navegación completa / contacto placeholder (Acapulco, Guerrero, México) / newsletter decorativo (input + botón dorado, sin funcionalidad — al enviar, mismo patrón de confirmación simulada o simplemente deshabilitado con nota).
- Línea divisoria 1px marfil/10 antes del copyright.
- Links con hover dorado, contraste AA verificado sobre marino.

### 5.6 SectionHeading
- Encapsula el patrón eyebrow + H2 + párrafo (+ línea decorativa dorada de 48px). Props: alineación (izquierda por defecto, centrada en bandas CTA), tono (claro/oscuro), color de eyebrow (dorado por defecto, salvia/oliva en Spa).

---

## 6. Principios de motion (intensidad 6/10)

Tono: "el sitio respira, no actúa". Todo con `transform` y `opacity` únicamente; `prefers-reduced-motion` desactiva todo lo no esencial (deja solo transiciones de color/opacity instantáneas).

### Dónde SÍ animar
1. **Hero del Home (carga):** fade-in + leve translateY del eyebrow → tagline → BookingBar en secuencia (stagger ~120ms). Una sola vez, < 1.2s total. Indicador de scroll con pulso lento dorado.
2. **Scroll-reveal de secciones:** fade + translateY(24px), duración 600–700ms, easing suave (ease-out), threshold ~20% del viewport, una sola vez (no reaparecer al subir).
3. **Stagger en grupos:** cards del Home, lista de tratamientos, grid de experiencias — 80–100ms entre ítems, máximo 5–6 ítems con stagger (el resto entra junto).
4. **Navbar:** transición Estado A↔B (300ms, background + color).
5. **Hovers:** zoom de foto en cards (scale 1.04, 500ms), links con subrayado dorado que crece de izquierda a derecha, botones con leve oscurecimiento del dorado.
6. **Lightbox:** fade del overlay (250ms) + slide horizontal corto entre fotos (300ms).
7. **BookingBar/formulario:** feedback al seleccionar (borde dorado que aparece suave), confirmación de envío con fade del modal.
8. **Momento de deleite permitido (los "6/10"):** la banda CTA final de cada página puede tener un reveal levemente más expresivo (foto con scale 1.08→1.0 al entrar al viewport) y el hero puede tener un Ken Burns MUY lento (scale 1.0→1.06 en ~20s) — el motion-engineer decide si el rendimiento lo permite; si hay dudas, se descarta primero el Ken Burns.

### Dónde NO animar
- **Texto en lectura:** los párrafos largos no entran por partes; revelan en bloque.
- **Menú degustación y lista de tratamientos:** sin animaciones por línea más allá del stagger inicial; nada de hovers que muevan precios o duraciones.
- **Filtros y masonry de galería:** el cambio de filtro es un crossfade simple del grid (o instantáneo); prohibido re-layout animado tipo FLIP por cada filtro (costoso y mareante con 60 fotos).
- **Formulario de contacto:** sin animaciones de entrada por campo; los mensajes de error aparecen con fade de 150ms máximo. La validación es seria, no juguetona.
- **Footer:** estático.
- **Parallax:** prohibido en general; como máximo, un desplazamiento sutilísimo en la sección "Destino Acapulco" si el motion-engineer lo justifica con rendimiento probado.
- **Nada que se mueva en loop infinito** dentro del viewport de lectura (excepto el indicador de scroll del hero).

---

## 7. Criterios de éxito del diseño

1. En 3 segundos en el Home se entiende: hotel de lujo + Pacífico/Acapulco + cómo reservar.
2. Desde cualquier página se llega a /contacto en ≤ 2 clicks, y el formulario llega precargado cuando hay contexto.
3. Ninguna foto de la lista negra (§4.8) aparece en producción; cero fotos con cubrebocas en secciones principales.
4. El dorado aparece con disciplina (§1.5); los verdes solo dominan en /spa.
5. Mobile-first verificado: BookingBar colapsada usable, masonry a 2 columnas, layouts alternados siempre foto-arriba.
6. AA de contraste en overlays de texto sobre foto; Lightbox y menú móvil navegables 100% por teclado.
7. El sitio no se percibe como plantilla: tipografía serif ligera a gran tamaño, espacio generoso y fotografía full-bleed son los tres rasgos que deben saltar a la vista.

---

## 8. Siguiente paso del pipeline

**Este brief pasa primero al `ux-writer`** — necesita producir: tagline del hero (+2 variantes), copy editorial de las 7 páginas, nombres y descripciones de 3 habitaciones / menú degustación de Origen / carta de Cielo / 5–6 tratamientos de Spa Vita, labels de BookingBar y formulario, mensajes de validación y confirmación simulada, y los textos alt en español de todas las fotos aprobadas.

Después, en paralelo tras el copy: **`ui-engineer`** (setup + componentes §5 + páginas en orden Home → Habitaciones → Gastronomía → Spa → Experiencias → Galería → Contacto) con el **`visual-designer`** validando la dirección de arte (§1) página por página y el **`motion-engineer`** aplicando §6 tras cada implementación.
