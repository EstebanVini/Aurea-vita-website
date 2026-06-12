# Documentación del proyecto — Aurea Vita

**Sitio web de hotel de lujo · Santuario frente al Pacífico · Acapulco, Guerrero, México**

> Documento técnico integral: identidad, arquitectura, sistema de diseño, sistema de
> animación, componentes, páginas, accesibilidad, performance y decisiones de diseño.
> Última actualización: 2026-06-12.

---

## 1. Resumen ejecutivo

Aurea Vita es un sitio de marketing para un hotel de lujo ficticio en Acapulco. El
objetivo de producto es transmitir, en los primeros segundos, tres ideas —**hotel de
lujo + Pacífico/Acapulco + cómo reservar**— y conducir al visitante hacia la
conversión con el mínimo de fricción.

Es una **SPA (Single Page Application)** de 7 rutas construida con React 19, Vite 7,
Tailwind CSS 4 y React Router 7, con animaciones en Framer Motion 12. No hay backend:
todo el contenido es ficticio pero verosímil, centralizado en `src/data/` para poder
sustituirlo por datos reales sin tocar componentes.

La dirección de arte es **"lujo sereno costero"**, inspirada (sin copiar) en
anantara.com (hero inmersivo, storytelling del destino, barra de reserva) y
shawellness.com / SHA (estructura editorial, tipografía protagonista, mucho espacio en
blanco). Tres rasgos deben saltar a la vista: tipografía serif ligera a gran tamaño,
espacio generoso y fotografía a sangre completa.

**Estado actual:** las 7 páginas están completas y auditadas (accesibilidad WCAG AA,
performance, responsive). Por petición posterior del cliente, `/contacto` dejó de ser
el formulario de reserva y ahora es una página **"Aún en construcción"** a la que
apuntan todos los CTAs de reservar.

---

## 2. Identidad de marca y concepto

- **Nombre:** Aurea Vita.
- **Posicionamiento:** "Santuario frente al Pacífico". Lujo sereno, bienestar,
  elegancia costera. NO es un resort de fiesta: el tono es calma, contemplación y
  refinamiento.
- **Idioma:** español de México, registro editorial elegante, sin clichés de marketing
  ("paraíso", "experiencia inolvidable", "el lugar de tus sueños" están vetados).
- **Voz:** segunda persona (tú), voz activa, presente, frases cortas. Tres motivos
  narrativos recurrentes: **el mar, la luz y el tiempo**.
- **Logotipo:** única fuente válida `public/Logo.svg` (también es el favicon). El SVG
  contiene un raster dorado; su color se controla por **filtros CSS**, nunca por `fill`.
- **Frase de marca (footer):** "Donde el día baja la voz."

El copy completo y los textos alternativos de todas las fotos viven en `docs/copy.md`
(autoría del rol *ux-writer*); la dirección de arte y la curaduría fotográfica en
`docs/brief.md` (rol *ux-architect*).

---

## 3. Stack técnico y arquitectura

### 3.1 Dependencias

| Paquete | Versión | Rol |
|---|---|---|
| `react` / `react-dom` | ^19 | UI |
| `react-router-dom` | ^7 | Enrutado SPA |
| `framer-motion` | ^12 | Animaciones (solo transform/opacity) |
| `vite` | ^7 | Bundler / dev server |
| `tailwindcss` + `@tailwindcss/vite` | ^4 | Estilos (CSS-first, sin `tailwind.config.js`) |
| `@vitejs/plugin-react` | ^5 | JSX / Fast Refresh |

### 3.2 Scripts (`package.json`)

- `npm run dev` → `vite --host` (servidor de desarrollo, expuesto a la red; por defecto
  en `http://localhost:5173/`).
- `npm run build` → build de producción a `dist/`.
- `npm run preview` → sirve el build de producción.

`vite.config.js` registra los plugins de React y Tailwind y declara `allowedHosts` para
los dominios de desarrollo (`dev-aureavita.*`).

### 3.3 Punto de entrada y enrutado

- `src/main.jsx` monta `<App/>` dentro de `<BrowserRouter>` y `<StrictMode>`, e importa
  la hoja de estilos global `src/styles/index.css`.
- `src/App.jsx` define el cascarón persistente: un **skip-link** ("Saltar al
  contenido"), `<ScrollToTop/>`, `<Navbar/>`, el `<main id="contenido">` con las
  `<Routes>` y `<Footer/>`. Navbar y Footer son persistentes en todas las rutas.

### 3.4 Estructura de carpetas

```
public/
├── Logo.svg                  → única marca válida (favicon incluido)
└── fotos_hotel/<categoria>/  → 8 carpetas × 15 fotos (aereas, alberca, fachadas,
                                habitaciones, lobby, restaurante, spa, terraza)
src/
├── main.jsx                  → bootstrap (Router + StrictMode)
├── App.jsx                   → layout + rutas + skip-link
├── components/               → Navbar, Footer, BookingBar, RoomCard, FeatureCard,
│                               SectionHeading, Reveal, Lightbox, ScrollToTop
├── pages/                    → Home, Habitaciones, Gastronomia, Spa, Experiencias,
│                               Galeria, Contacto
├── data/                     → home, rooms, dining, spa, experiences, gallery
├── hooks/                    → usePageMeta
├── lib/                      → motion (primitivas de animación)
└── styles/                   → index.css (tokens @theme + utilidades)
docs/                         → brief.md, copy.md, fotos/, estado-sesion.md,
                                documentacion-proyecto.md (este archivo)
index.html                    → lang="es-MX", favicon, preconnect/preload de fuentes
```

### 3.5 Rutas

| Ruta | Página | Hero fotográfico | Navbar inicial |
|---|---|---|---|
| `/` | Inicio | Sí (fullscreen) | Transparente |
| `/habitaciones` | Habitaciones & Suites | Sí (70vh) | Transparente |
| `/gastronomia` | Gastronomía (Origen + Cielo) | Sí (70vh) | Transparente |
| `/spa` | Spa Vita | Sí (70vh) | Transparente |
| `/experiencias` | Experiencias | Sí (70vh) | Transparente |
| `/galeria` | Galería | No | Sólida |
| `/contacto` | "Aún en construcción" | No | Sólida |

---

## 4. Sistema de diseño

Toda la apariencia deriva de un puñado de tokens definidos en `src/styles/index.css`
con la directiva `@theme` de Tailwind 4 (no existe `tailwind.config.js`; los tokens son
variables CSS que Tailwind expone como clases utilitarias).

### 4.1 Paleta — 7 tokens, regla de disciplina estricta

| Token | Hex | RGB | Uso |
|---|---|---|---|
| `marfil` | `#F5F1EC` | 245,241,236 | Fondo principal |
| `arena` | `#E8E1D9` | 232,225,217 | Secciones alternas, tarjetas |
| `marino` | `#1F3A44` | 31,58,68 | Texto principal, header/footer, contraste |
| `dorado` | `#C6A87D` | 198,168,125 | **Único acento global** |
| `oliva` | `#7A8F7C` | 122,143,124 | Acento secundario (solo /spa) |
| `salvia` | `#A3B5A0` | 163,181,160 | Etiquetas, fondos suaves de bienestar |
| `piedra` | `#6E6E6E` | 110,110,110 | Texto secundario |

**Reglas de disciplina de color:**

1. **El dorado es el único acento global** y "se gana, no se regala": aparece solo en
   eyebrows (sobre marino), botones primarios, líneas decorativas de 1px, hover de
   links y el acento de la Suite Aurea. Si en una pantalla hay más de ~3 elementos
   dorados visibles a la vez, sobra uno.
2. **Los verdes (oliva/salvia) dominan SOLO en /spa.**
3. **Nunca se introduce color fuera de estos 7 tokens** (ni un rojo de error genérico;
   ver §11.3).

### 4.2 Tipografía

- **Display (títulos):** `Cormorant Garamond` (serif), pesos 300–500. El peso ligero a
  gran tamaño *es* el lujo; nunca se compensa con negritas. Escala de H1/H2 generosa
  (`clamp(2.5rem … 5rem)` en heroes; `text-4xl sm:text-5xl lg:text-6xl` en secciones).
- **Cuerpo:** `Jost` (sans geométrica cálida), 1rem–1.125rem, `line-height` 1.7, máximo
  ~65ch de ancho de lectura.
- **Eyebrows:** utilidad CSS `.eyebrow` — mayúsculas (vía `text-transform`), peso 500,
  `letter-spacing: 0.25em`, 0.75rem. Es el hilo conductor visual de todo el sitio. El
  color se asigna aparte (marino sobre fondos claros, dorado/salvia sobre marino).
- Las fuentes se cargan desde Google Fonts con `preconnect` + `display=swap` en
  `index.html`.

**Patrón fijo de encabezado** (encapsulado en `SectionHeading`):
`eyebrow → H2 serif → línea dorada de 48px → párrafo(s) → CTA opcional`.

### 4.3 Espaciado y ritmo

- "El espacio como material": secciones con `py` ≥ 96px en desktop (`py-24`/`py-32`),
  ≥ 64px en móvil. Contenedor maestro `max-w-[1400px]`.
- **Alternancia de fondos con propósito** a lo largo de cada página:
  `marfil → arena → marfil → marino (contraste) → marfil`. La sección **marino** es el
  "momento de profundidad" (máximo una o dos por página). En /spa el contraste se da
  con una banda inmersiva de foto.

### 4.4 Otras decisiones de base (en `index.css`)

- `body`: fondo marfil, texto marino, fuente Jost peso 300, `line-height` 1.7,
  antialiasing.
- `::selection`: fondo dorado, texto marino.
- **Anillo de foco global** (`:focus-visible`): `outline: 2px solid currentColor` con
  `outline-offset: 3px`. Se usa `currentColor` (no dorado) porque el dorado da 1.86:1
  sobre marfil — por debajo del 3:1 que exige WCAG 1.4.11 para indicadores. Con
  `currentColor` el anillo hereda el color del texto (marino sobre claros, marfil sobre
  marino) y siempre cumple. En botones dorados sobre fondo oscuro/foto se fuerza
  `focus-visible:outline-marfil` (porque ahí `currentColor` = marino, invisible).
- **`prefers-reduced-motion`**: un bloque `@media` reduce todas las animaciones y
  transiciones a ~0ms y `scroll-behavior` a `auto`.
- **Utilidades de logo** (el `Logo.svg` es raster, su color se controla con `filter`):
  `.logo-claro` (invierte a blanco/marfil) y `.logo-marino` (matiz hacia marino).

---

## 5. Sistema de animación (motion)

**Intensidad declarada: 6/10.** Lema: *"el sitio respira, no actúa"*. Reglas globales:

- **Solo `transform` y `opacity`** (nunca se anima layout: ni `width`, ni `height`, ni
  re-flow). Esto garantiza 60fps y evita reflows costosos.
- **`prefers-reduced-motion` siempre respetado**: con movimiento reducido el contenido
  se renderiza directamente en su estado final, nunca invisible.
- Reveals de scroll **una sola vez** (no reaparecen al subir).

### 5.1 Primitivas — `src/lib/motion.js`

- `EASE_OUT = [0.22, 1, 0.36, 1]` — easing editorial: arranque decidido, aterrizaje muy
  suave.
- `fadeRise({ y, duration, delay })` — variants de fade + leve `translateY`. (Detalle
  fino: el `delay` solo se incluye si es > 0, porque un `delay: 0` explícito en el hijo
  pisa el `staggerChildren` del padre en Framer Motion.)
- `staggerGroup({ stagger, delayChildren })` — variants de contenedor que orquesta a sus
  hijos con stagger (80–100ms entre ítems).
- `drawLine({ duration, delay })` — línea decorativa que se "dibuja" de izquierda a
  derecha (`scaleX` + opacity). Momento de deleite puntual; el elemento necesita
  `origin-left`.
- Constantes: `REVEAL_DISTANCE = 24px`, `REVEAL_DURATION = 0.65s`,
  `VIEWPORT_ONCE = { once: true, amount: 0.2 }`.

### 5.2 Componente reutilizable — `src/components/Reveal.jsx`

Tres piezas que envuelven a Framer Motion y manejan reduced-motion vía
`initial={reduceMotion ? false : 'hidden'}`:

- `<Reveal>` — bloque individual: fade + `translateY` al entrar al viewport, una vez.
- `<RevealGroup>` — contenedor que orquesta a sus `<RevealItem>` hijos con stagger.
- `<RevealItem>` — hijo que hereda el disparo del grupo.

El prop `as` permite renderizar cualquier etiqueta (`div`, `ul`, `li`, `p`…), de modo
que los reveals respetan la semántica del HTML.

### 5.3 Animaciones por contexto

- **Hero del Home (carga):** secuencia con stagger ~120ms: eyebrow → tagline →
  subtítulo → indicador de scroll, y la BookingBar cierra la secuencia (< 1.2s total).
- **Ken Burns del hero:** zoom casi imperceptible (`scale 1 → 1.06` en ~22s), keyframe
  `--animate-kenburns`, solo `motion-safe`.
- **Indicador de scroll:** línea dorada vertical que se dibuja y desvanece en loop lento
  (`--animate-scroll-pulse`). Es el **único loop infinito permitido** en el sitio.
- **Scroll-reveal de secciones:** fade + `translateY(24px)`, 600–700ms, una vez,
  umbral ~20% del viewport.
- **Stagger en grupos:** cards del Home, lista de tratamientos, cards de experiencias —
  80–100ms entre ítems, máximo 5–6 con stagger.
- **Navbar:** transición Estado A↔B (background + color, 300ms).
- **Hovers:** zoom de foto en cards (`scale 1.04`, 500ms); subrayado dorado de links que
  crece de izquierda a derecha (`scale-x`, transform); botones con leve oscurecimiento
  del dorado; elevación sutil de la card (`translateY`).
- **`drawLine` (deleite puntual):** solo en la Suite Aurea (línea dorada), el menú
  "Marea" de Gastronomía (regla dorada) y el menú de tratamientos de Spa (línea salvia).
- **Banda CTA final:** la foto asienta de `scale 1.08 → 1.0` al entrar al viewport (una
  vez) — el reveal más expresivo permitido.
- **Lightbox:** fade del overlay (~250ms) + crossfade-slide horizontal corto (~300ms);
  ver §7.6.
- **Galería (filtros):** crossfade simple del grid (~220ms) — **prohibido** el re-layout
  animado tipo FLIP por foto (costoso y mareante con 60 fotos).
- **BookingBar / formularios:** subrayado dorado que aparece al enfocar; despliegue del
  panel móvil (`--animate-fade-rise`).

### 5.4 Dónde NO se anima (deliberadamente)

Texto en lectura (revela en bloque, no por línea); menús degustación / tratamientos
(sin hovers que muevan precios o duraciones); filtros y masonry (sin FLIP); footer
(estático); parallax (prohibido en general); nada en loop dentro del viewport de lectura
(excepto el indicador de scroll del hero).

---

## 6. Componentes

### 6.1 `Navbar.jsx`

Barra fija superior (`h-24` = 96px, altura constante) con dos estados:

- **Estado A (transparente):** solo sobre rutas con hero fotográfico y mientras el
  scroll < 70% del viewport. Logo y links en marfil, sin fondo.
- **Estado B (sólida):** fondo `marfil/95` + `backdrop-blur`, borde inferior arena,
  logo y links en marino. Es el estado inicial en `/galeria` y `/contacto` (no están en
  `HERO_ROUTES`). La transición A↔B anima solo background y color (300ms), sin salto de
  altura.

Otras características:

- **Logo** grande (`h-20 w-20`) a la izquierda, enlaza a `/`. Al hacer clic, además de
  navegar, ejecuta `window.scrollTo(0,0)` para subir al tope incluso si ya estás en la
  home (donde no hay cambio de ruta que dispare `ScrollToTop`).
- **Links** centrados/derecha con subrayado dorado activo (animado con `scale-x`).
- **Botón "Reservar"** persistente (fondo dorado, texto marino) — único CTA fijo del
  sitio; lleva a `/contacto`. En Estado A fuerza `focus-visible:outline-marfil`.
- **Menú móvil:** hamburguesa → panel fullscreen marino con los links en Cormorant
  grande. Bloquea el scroll del body, se cierra con Esc (devolviendo el foco al toggle),
  cierra al navegar y **atrapa el foco** dentro del panel (Tab/Shift+Tab ciclan). Touch
  targets ≥44px.

`HERO_ROUTES = ['/', '/habitaciones', '/gastronomia', '/spa', '/experiencias']`.

### 6.2 `Footer.jsx`

Fondo marino, cuatro zonas: (1) logo SVG + frase de marca "Donde el día baja la voz.";
(2) navegación completa (7 links, hover dorado); (3) datos de contacto placeholder
(dirección de Acapulco, teléfono `tel:`, email `mailto:`); (4) **newsletter decorativo**
("Cartas desde la costa") con validación de email en cliente y confirmación/erro
simulados (`aria-live`). Línea divisoria 1px antes del aviso legal. Los textos sobre
marino cumplen AA (los legales en `marfil/60` = 4.5:1; el placeholder del input en
`marfil/60`). Los links legales ("Aviso de privacidad" / "Términos de estancia") son
`<span>` decorativos (no existen rutas reales en un hotel ficticio; se estilizan para
que no parezcan links rotos).

### 6.3 `BookingBar.jsx`

Barra de consulta de disponibilidad (solo UI, sin motor de reservas). Cuatro zonas:
Llegada · Salida · Huéspedes · botón "Consultar disponibilidad". Al enviar, **navega a
`/contacto` con query params** (`?llegada=&salida=&huespedes=`). Características:

- Inputs de fecha **nativos** (`type="date"`), `min` = hoy (llegada) / llegada-u-hoy
  (salida), calculados con `hoyISO()` en hora local.
- Cada campo es `group relative` con un **subrayado dorado** (`FieldUnderline`) que crece
  al enfocar y queda tenue cuando el campo tiene valor elegido (disciplina del dorado).
- **Desktop:** barra horizontal de 4 zonas sobre marfil, sombra muy suave, divisores
  arena. **Móvil:** colapsa a un botón único "Consultar disponibilidad" que despliega los
  campos como panel (con un control "Cerrar" para re-colapsar, que devuelve el foco al
  disparador). Nunca apila 3 selects verticales sobre la foto.
- En el Home, la barra "muerde" la transición foto→marfil del hero (`-mt-7 md:-mt-11`).

### 6.4 `RoomCard.jsx`

Bloque de categoría de `/habitaciones` (variante completa): mini-galería + specs +
amenidades + CTA. Detalles:

- **Mini-galería:** foto principal 4:3 + thumbnails selectores. El cambio de foto es un
  **crossfade** vía `AnimatePresence`: la entrante hace fade-in encima y la saliente se
  retira al terminar (sin "dip" al fondo). Las fotos viven en posición absoluta dentro de
  un contenedor con `aspect-ratio` fijo → cero layout shift. Los thumbnails son
  `<button>` con `aria-pressed`; un `aria-live` anuncia el cambio de foto.
- **Acento de categoría** (`salvia`/`marino`/`dorado`) solo en decorativos: línea bajo el
  título, borde del thumbnail activo y filete de specs. Los botones siempre son dorados;
  en la Suite Aurea acento y CTA coinciden a propósito ("eso la hace insignia").
- **Specs** en serif gigante (m², huéspedes), patrón de datos estilo SHA.
- La Suite Aurea (`tone="dark"`, sobre marino) "dibuja" su línea dorada con `drawLine`.
- El CTA navega a `/contacto?habitacion=<slug>`.

### 6.5 `FeatureCard.jsx`

Tarjeta simple del grid del Home: foto 3:4 + eyebrow + título serif + texto +
"Descubrir →". Toda la card es un único link accesible. Hover: zoom de foto a
`scale(1.04)` (dentro de `overflow-hidden`) + elevación de la card (`translateY`) con
sombra suave + flecha que avanza. El eyebrow va en `marino/80` (no dorado: tres cards
doradas romperían la regla de ≤3 dorados, y el dorado sobre arena falla AA).

### 6.6 `SectionHeading.jsx`

Encapsula el patrón `eyebrow → título → línea dorada 48px → párrafos`. Props: `as`
(`h1`/`h2`), `align` (`left`/`center`), `tone` (`light`/`dark`), `eyebrowClassName`
(color del eyebrow, con defaults seguros por contraste). Centraliza la escala
tipográfica y las reglas de contraste de los encabezados en todo el sitio.

### 6.7 `Lightbox.jsx`

Ver §7.6 (es el corazón técnico de la Galería).

### 6.8 `Reveal.jsx` y `ScrollToTop.jsx`

`Reveal` (ver §5.2). `ScrollToTop` devuelve la ventana al inicio en cada cambio de ruta
con salto **instantáneo** (cambiar de página no es un scroll, es una página nueva).

### 6.9 `usePageMeta.js` (hook)

Actualiza `document.title` y `<meta name="description">` por página, sin dependencias
externas. Cada página lo invoca con sus metadatos (definidos en `docs/copy.md` §10).

---

## 7. Páginas

Todas usan `usePageMeta` con su `<title>`/description únicos y siguen el sistema de
diseño y motion. Las páginas con hero interior comparten exactamente la misma anatomía
(`min-h-[70vh]`, overlay marino degradado, misma secuencia de entrada del título).

### 7.1 `/` — Inicio (`Home.jsx`)

Hero **fullscreen** (`min-h-[100dvh]`, `aereas_11.jpeg`, Ken Burns) con eyebrow + tagline
"Santuario frente al Pacífico" + subtítulo + indicador de scroll dorado. La foto es el
LCP (eager + `fetchPriority="high"`; el preload se inyecta desde el componente, ver
§9). Overlays: degradado vertical + scrim lateral solo bajo el bloque de texto para
asegurar AA del marfil sobre el agua turquesa.

Secciones: **BookingBar** (mordiendo el borde foto→marfil) → editorial "Bienvenido a
Aurea Vita" (50/50 texto/foto, `fachadas_05` con `object-right` para evitar el letrero)
→ **grid de 3 FeatureCards** (Habitaciones/Gastronomía/Spa, fondo arena, stagger) →
contraste **"El destino — Acapulco"** (fondo marino, `aereas_15`, datos en serif gigante:
300 días de sol, 27°, 12 min) → **strip de momentos** (alberca/terraza, scroll-snap
nativo) → **banda CTA final** (foto `aereas_09` con overlay marino, la foto asienta de
`scale 1.08→1.0`).

### 7.2 `/habitaciones` (`Habitaciones.jsx` + `RoomCard`)

Hero interior (`habitaciones_02`) → intro editorial → tres `RoomCard` en **orden
ascendente de lujo** con fondos alternados (marfil → arena → marino): **Vista Jardín**
(acento salvia), **Suite Vista al Mar** (acento marino) y **Suite Aurea** (insignia,
acento dorado, sobre marino — el momento de profundidad) → banda CTA. Cada categoría
lleva su mini-galería, specs, amenidades y CTA a `/contacto?habitacion=<slug>`. Slugs:
`vista-jardin`, `suite-vista-al-mar`, `suite-aurea`.

### 7.3 `/gastronomia` (`Gastronomia.jsx`)

Layout alternado imagen/texto estilo SHA. Hero (`restaurante_11`) → intro → **Origen**
(restaurante del Pacífico): dos slots alternados (`restaurante_14`/`restaurante_01`) +
foto panorámica de la terraza verde (`restaurante_12`) + tabla mínima de horarios →
**menú degustación "Marea"** (7 tiempos, fondo marino, lista tipográfica con números
dorados, la regla superior se dibuja con `drawLine`) → **Cielo** (bar de terraza, fondo
arena, `terraza_13` + collage `terraza_10`/`terraza_03`, carta de cocteles de autor) →
banda CTA. Regla dura: del set *terraza* solo son utilizables `terraza_13/10/03` en todo
el sitio.

### 7.4 `/spa` (`Spa.jsx`) — la página más "SHA"

Hero (`spa_01`) → **filosofía de bienestar** (marfil, solo texto, 65ch, el silencio
visual es el mensaje) → **menú de tratamientos** (6 rituales, lista tipográfica con
duración como eyebrow, separadores 1px, línea salvia con `drawLine`) → **"Circuito de
aguas"** (banda inmersiva de foto, `spa_06` a sangre completa + overlay marino, texto
marfil, eyebrow salvia, línea oliva; ver §11.1) → **aromaterapia** (`spa_15` + `spa_09`,
collage) → nota práctica → banda CTA. Los **verdes oliva/salvia** dominan solo aquí,
expresados en líneas decorativas, fondos y el agua de la propia alberca — nunca como
texto pequeño sobre fondos claros (fallan AA).

### 7.5 `/experiencias` (`Experiencias.jsx`)

Hero (`alberca_05`) → intro → **"Alberca infinita"** (imagen/texto + strip scroll-snap
con `alberca_02/10/14/07`) → **"Atardeceres en Cielo"** (collage `terraza_13`/`terraza_10`
+ link cruzado a `/gastronomia`) → **"Descubre Acapulco"** (sección de contraste marino,
4 cards horizontales con ordinal dorado y línea, fotos `aereas_02/08/04/10`, contenedores
`aspect-ratio` fijo para uniformar orientaciones mixtas) → banda CTA.

### 7.6 `/galeria` (`Galeria.jsx` + `Lightbox.jsx`) — la más técnica

Header compacto (sin hero) → **fila de filtros** sticky (8 categorías + "Todas", pills
con scroll horizontal en móvil, `aria-pressed`, filete dorado al hover) → **grid masonry**
→ **Lightbox**.

- **Masonry sin librería:** CSS `columns` (2 móvil → 3 tablet → 4 desktop). Cada foto es
  un `<button>` con su `aspect-ratio` **real** reservado desde los datos (`gallery.js →
  ratio`) y `break-inside: avoid` → **cero CLS** al cargar. El array mezcla orientaciones
  deliberadamente.
- **Cambio de filtro = crossfade** del grid (re-montaje con `key={filtro}` + fade de
  opacity ~220ms). Sin FLIP. Con reduced-motion, instantáneo.
- **Selección curada** de ~61 fotos (no las 120): solo las aprobadas por categoría;
  todas `.jpeg` (se excluyen `lobby_13.png` y `terraza_09.jpg`).
- **Lightbox** (`Lightbox.jsx`), controlado por el padre (`index` contra la lista
  **filtrada** visible, `null` = cerrado):
  - `role="dialog"` + `aria-modal` + `aria-label="Visor de fotografías"`.
  - Teclado: ← → navegan (circular, por módulo), Esc cierra. **Foco atrapado** dentro del
    diálogo. Al abrir, foco al botón cerrar; al cerrar, **devuelve el foco al thumbnail de
    origen** (`triggerRef`, con guarda `document.contains` por si cambió el filtro).
  - Overlay `marino/95`; foto centrada `max-h-[85vh]`; contador "N de Total" (la cifra
    activa en dorado); leyenda con el `alt` de la foto; ayuda de teclado `sr-only`.
  - Motion: fade del overlay (250ms) + **crossfade-slide** horizontal (300ms,
    `AnimatePresence` en modo sync para que entrante y saliente se crucen sin "hueco");
    reduced-motion → instantáneo. **Precarga** de la foto siguiente y anterior.
  - **Móvil:** flechas laterales ocultas; se navega con **zonas de tap** en las mitades
    izquierda/derecha; botón cerrar siempre visible; clic en el fondo cierra.

### 7.7 `/contacto` (`Contacto.jsx`) — "Aún en construcción"

Originalmente era el **formulario de reserva** (validación en cliente, precarga desde
query params, modal de confirmación simulada). Por petición del cliente se reemplazó por
una página **"Aún en construcción"** en voz de marca: fondo marino casi a pantalla
completa, logo, eyebrow salvia, título serif, mensaje sereno, datos de contacto reales
como salida (teléfono/email) y botón "Volver al inicio". Como **todos** los CTAs de
reservar del sitio apuntan a `/contacto`, este único cambio dejó todo el flujo coherente.
El formulario original queda en el historial de git por si se necesita restaurar (ver
§11 y §12).

---

## 8. Accesibilidad (transversal, objetivo WCAG AA)

- **Contraste AA (≥4.5:1) en todo texto.** Reglas aprendidas y aplicadas: el dorado a
  tamaño pequeño falla sobre claros (1.86:1) → los eyebrows sobre marfil/arena van en
  **marino**; el dorado como texto solo se usa sobre marino (5.3–5.8:1). El verde
  **salvia sobre marino** sí cumple (5.54:1) y se usa para eyebrows en secciones oscuras
  de /spa. `piedra` sobre arena falla (3.93:1) → se sustituyó por `marino/75` (4.8:1).
- **Foco visible siempre.** Nunca `focus:outline-none`. Anillo global `currentColor`;
  override `outline-marfil` en botones dorados sobre fondo oscuro/foto (Home CTA final,
  Navbar Reservar en estado transparente, RoomCard Suite Aurea, Lightbox, /contacto).
- **Navegación por teclado completa** en los tres puntos críticos: menú móvil del Navbar,
  Lightbox y (cuando existía) formulario — todos con foco atrapado, Esc, retorno de foco
  y bloqueo de scroll del body.
- **Texto alternativo en español** descriptivo en todas las fotos. En thumbnails que ya
  describe el `aria-label` del botón contenedor, el `<img>` lleva `alt=""` para no
  duplicar el anuncio.
- **Semántica:** un solo `<h1>` por página, jerarquía de headings lógica, `role="list"`
  explícito donde el reset de Tailwind silencia las listas, `aria-live` para cambios
  dinámicos (foto activa, estados de formulario/newsletter), `aria-pressed` en pills y
  thumbnails.
- **`prefers-reduced-motion`** respetado en todo el sitio (primitivas `Reveal`, todos los
  `motion.*` directos y la regla CSS global).
- **Skip-link** "Saltar al contenido" como primer elemento enfocable.
- **Touch targets ≥44px** en navegación, pills, controles del Lightbox, inputs (≥48px).
- `lang="es-MX"` en `index.html`.

---

## 9. Performance

- **Imágenes:** el hero de cada ruta carga **eager** con `fetchPriority="high"`; todo lo
  demás con `loading="lazy"` (+ `decoding="async"` en la galería). `object-cover` y
  `object-position` por foto para encuadrar al sujeto y dejar fuera elementos ajenos a la
  paleta.
- **Sin CLS:** los heroes y todas las fotos tienen dimensiones/`aspect-ratio` reservados;
  el masonry reserva el alto exacto desde el `ratio` real de cada foto; el crossfade del
  RoomCard usa posiciones absolutas.
- **LCP del Home:** en una SPA el `<img>` del hero se descubre tarde (tras parsear el
  bundle). Antes se usaba un `<link rel="preload">` estático de `aereas_11` en
  `index.html`, pero penalizaba ~108KB en las 6 rutas interiores. **Solución actual:** el
  preload se inyecta vía `useEffect` al montar `Home` y se retira al desmontar, de modo
  que solo la landing paga ese head-start.
- **Animaciones solo `transform`/`opacity`** (sin reflow); reveals una sola vez.
- **Fuentes:** `preconnect` a Google Fonts + `display=swap` para evitar bloqueo de
  render.
- **Build:** ~444 KB JS (≈138 KB gzip), ~52 KB CSS (≈9 KB gzip).

---

## 10. Datos y contenido

Todo el contenido ficticio está centralizado en `src/data/` para poder sustituirlo por
datos reales sin tocar componentes:

- `home.js` — grid de 3 tarjetas, datos del destino, strip de momentos.
- `rooms.js` — 3 categorías (slug, accent, eyebrow, descripción, stats, amenidades, CTA,
  fotos con `pos`); contrato con `/contacto` vía `slug`/`formLabel`.
- `dining.js` — Origen (concepto, horarios, fotos), menú "Marea" (7 tiempos), Cielo
  (concepto, horarios, fotos), cocteles, CTA.
- `spa.js` — header, filosofía, 6 tratamientos, circuito de aguas, aromaterapia, nota,
  CTA.
- `experiences.js` — header, alberca infinita, atardeceres, 4 experiencias de Acapulco,
  CTA.
- `gallery.js` — ~61 fotos `{ src, alt, category, ratio }` + filtros + mensaje de
  respaldo.

Convenciones: las mayúsculas de los eyebrows las pone el CSS (no se escriben en
mayúsculas en los datos); sin precios en menús (las cartas son tipográficas, no
transaccionales); cada foto incluye su `alt` en español.

**Fotografía.** 120 fotos de dominio público en `public/fotos_hotel/` (8 categorías × 15).
Hay una **lista negra** documentada en `docs/brief.md` §4.8 (fotos con cubrebocas,
letreros ajenos, calidad insuficiente o contextos no-Acapulco). Reglas notables: del set
*terraza* solo `terraza_13/10/03`; `habitaciones_08/09` descartadas; `fachadas_10`
evitada por el letrero "Sacher".

---

## 11. Decisiones de diseño destacadas (los casos difíciles)

### 11.1 El bloque "Circuito de aguas" de /spa

El brief permitía una sección de contraste con fondo **oliva**. En la auditoría se
detectó que el oliva (`#7A8F7C`) **no alcanza AA con ningún token para texto pequeño**
(marfil sobre oliva = 3.09:1; ni marino lo resuelve). Como cambiar el valor del token
contradiría la especificación y afectaría sus usos decorativos, la sección se rehízo como
**banda inmersiva de foto**: `spa_06` (la alberca de inmersión en patio de arena, la más
serena del set) a sangre completa + overlay marino degradado, con el texto marfil sobre
el scrim (AA holgado). La identidad verde se conserva en el agua de la propia alberca, el
eyebrow salvia y la línea oliva. Se retiró `spa_03` (azulejo turquesa + grifo
cromado-dorado, fuera de paleta).

### 11.2 El botón CTA de /spa

El brief permitía, como única excepción del sitio, un botón **oliva** en /spa. Se
**rechazó**: el label usa la utilidad `eyebrow` (12px, texto pequeño, exige 4.5:1) y
sobre oliva da 3.09:1 (marfil) / 3.46:1 (marino), ambos fallan. El botón se mantiene
dorado (marino sobre dorado = 5.32:1) y el cierre verde se logra con el eyebrow salvia.

### 11.3 El estado de error del formulario (cuando existía /contacto como form)

El brief pedía un color de error accesible **derivado de la paleta**, sin rojo genérico.
La solución fue borde `marino` de 2px + fondo `arena/40` + ícono dorado, con la semántica
sostenida por `role="alert"` + `aria-invalid` (WCAG 1.4.1, no solo color). Se descartó
usar dorado para el error porque el dorado es el acento *positivo* de la marca (foco,
CTA) y crearía ambigüedad. (Vive en el historial de git.)

### 11.4 El anillo de foco con `currentColor`

En lugar de un color de foco fijo, el sitio usa `outline: 2px solid currentColor`, de
modo que el anillo siempre hereda el color del texto del elemento y cumple contraste en
cualquier fondo — con el override `outline-marfil` solo donde el texto del botón es
marino sobre fondo oscuro.

---

## 12. Cambios solicitados después de la primera entrega

1. **Logo más grande:** en el Navbar pasó de `h-14` (56px) a `h-20` (80px) y la barra de
   `h-20` a `h-24` (96px) para que respire; se ajustó el sticky de los filtros de Galería
   (`top-20` → `top-24`).
2. **Click en el logo → al inicio:** además de navegar a `/`, sube al tope de la página
   (cubre el caso de estar ya en la home).
3. **Sin página de reserva:** `/contacto` pasó de formulario a página **"Aún en
   construcción"**; todos los CTAs de reservar (Navbar, BookingBar, RoomCard y las bandas
   de cada página) ya apuntaban ahí, así que el flujo quedó coherente con un solo cambio.
   Se eliminó `src/data/contact.js`.

---

## 13. Cómo correr el proyecto

```bash
npm install        # instalar dependencias
npm run dev        # desarrollo  → http://localhost:5173/
npm run build      # build de producción → dist/
npm run preview    # servir el build de producción
```

El proyecto usa control de versiones git; el historial documenta cada cambio por rol
(`feat`/`motion`/`visual`/`qa`/`perf`/`fix`/`docs`).

---

## 14. Deuda técnica conocida (no bloqueante)

- Las clases de los **CTA dorados** se repiten ~6× → candidato a extraer un componente
  `<Button>` (se omitió al cierre para no arriesgar regresiones).
- `GUEST_OPTIONS` vivía duplicado entre `BookingBar.jsx` y el desaparecido
  `contact.js`; si se restaura el formulario, conviene una sola fuente.
- `FieldUnderline` estaba duplicado entre `BookingBar.jsx` y el formulario de
  `/contacto` → candidato a componente compartido si vuelve el formulario.
- El formulario de reserva validado (precarga por query params + modal de confirmación)
  existe en el historial de git por si se decide reactivar `/contacto` como reserva.

---

## 15. Pipeline de producción (cómo se construyó)

El sitio se desarrolló con un equipo de roles especializados en orden estricto, por
página: **ux-architect** (brief de arquitectura/UX) → **ux-writer** (copy es-MX) →
**ui-engineer** (implementación) → **motion-engineer** (animación) → **visual-designer**
(refinamiento visual) → **qa-auditor** (auditoría WCAG/performance/responsive, reporte
P0–P3). Ninguna página avanzó sin pasar por revisión visual y auditoría, y al final hubo
un pase global de coherencia (visual) y un pase global de auditoría (qa). Los artefactos
de referencia (`docs/brief.md`, `docs/copy.md`, `docs/fotos/`, `docs/estado-sesion.md`)
son la fuente de verdad del diseño y el contenido.
