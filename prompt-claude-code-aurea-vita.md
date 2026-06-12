
**IMPORTANTE — Equipo de agentes:** Este proyecto cuenta con 6 agentes especializados. Úsalos activamente y en el orden correcto durante todo el desarrollo. Cada agente tiene un rol preciso — no los intercambies. El flujo correcto es: `ux-architect` → `ux-writer` → `ui-engineer` → `motion-engineer` → `visual-designer` → `qa-auditor`. No avances a una nueva página sin que la anterior haya pasado por revisión de diseño (`visual-designer`) y auditoría (`qa-auditor`).

## 1. Identidad de marca

- **Nombre:** Aurea Vita
- **Posicionamiento:** "Santuario frente al Pacífico" — lujo sereno, bienestar, elegancia costera. NO es un resort de fiesta; el tono es calma, contemplación y refinamiento.
- **Logotipo:** usa ÚNICA Y EXCLUSIVAMENTE el archivo `public/Logo.svg`. No uses ningún PNG del logo, no generes logos alternativos, no uses texto plano como sustituto del logo. El SVG es la única fuente válida (en navbar, footer, favicon y cualquier otro lugar donde aparezca la marca).
- **Idioma del sitio:** español (México). Todo el copy en español, tono editorial elegante, sin clichés de marketing.

## 2. Paleta de colores (tokens obligatorios)

Define estos tokens en la configuración de Tailwind y derivar TODO el color del sitio de ellos:

| Token | Nombre | RGB | Hex | Uso |
|---|---|---|---|---|
| `marfil` | Marfil | 245, 241, 236 | `#F5F1EC` | Fondo principal |
| `arena` | Arena cálida | 232, 225, 217 | `#E8E1D9` | Secciones alternas, tarjetas |
| `marino` | Azul marino profundo | 31, 58, 68 | `#1F3A44` | Texto principal, header/footer, secciones de contraste |
| `dorado` | Dorado suave | 198, 168, 125 | `#C6A87D` | ÚNICO acento principal: botones, hovers, líneas decorativas |
| `oliva` | Verde oliva suave | 122, 143, 124 | `#7A8F7C` | Acento secundario (sección Spa/Bienestar) |
| `salvia` | Verde salvia | 163, 181, 160 | `#A3B5A0` | Etiquetas, fondos suaves de bienestar |
| `piedra` | Gris piedra | 110, 110, 110 | `#6E6E6E` | Texto secundario |

Regla de disciplina: el dorado es el único color de acento global. Los verdes solo dominan en Spa & Bienestar. Nunca introducir colores fuera de esta paleta.

## 3. Tipografía

- **Display (títulos):** serif elegante — Cormorant Garamond (Google Fonts). Títulos grandes, pesos ligeros (300–500).
- **Cuerpo:** sans limpia — Jost o Inter (Google Fonts).
- **Etiquetas/eyebrows:** mayúsculas con letter-spacing amplio (tracking 0.2em+), tamaño pequeño, en dorado o piedra.

## 4. Referencias de diseño

Inspirarse en (sin copiar):
- **anantara.com** → hero inmersivo a pantalla completa, storytelling del destino, barra de reserva persistente, lujo narrativo. https://www.anantara.com/
- **shawellness.com** → estructura editorial limpia, mucho espacio en blanco, tipografía protagonista, navegación con descripciones. https://shawellness.com/

El resultado debe sentirse premium: espaciado generoso, animaciones sutiles de scroll-reveal, transiciones suaves. Evitar cualquier cosa que se vea como plantilla genérica.

## 5. Fotografías

Todas las fotos son de dominio público y ya están en el proyecto bajo `public/fotos_hotel/`, organizadas en 8 carpetas con 15 fotos cada una (formato `categoria_NN.jpeg`, números 01–15):

- `aereas/` → heros, sección destino Acapulco
- `alberca/` → experiencias, home
- `fachadas/` → sección "Bienvenido", arquitectura
- `habitaciones/` → página y tarjetas de habitaciones
- `lobby/` → llegada/bienvenida (nota: `lobby_13` es `.png`, el resto `.jpeg`)
- `restaurante/` → gastronomía
- `spa/` → spa & bienestar
- `terraza/` → bar de terraza, atardeceres (nota: `terraza_09` es `.jpg`, el resto `.jpeg`)

Reglas:
- Usa exclusivamente estas fotos. No generes imágenes, no uses placeholders externos ni servicios como Unsplash/Picsum.
- Revisa visualmente las fotos disponibles antes de asignarlas, para elegir la más adecuada en cada sección (especialmente el hero del home).
- Todas las imágenes con `loading="lazy"` excepto el hero, `object-cover`, y `alt` descriptivo en español.

## 6. Stack técnico

- **React + Vite + Tailwind CSS + React Router**
- Animaciones: Framer Motion (o IntersectionObserver + CSS si prefieres menos dependencias) — scroll-reveal sutil, nada excesivo.
- Sin backend: el formulario de reserva/contacto solo simula envío (modal o toast de confirmación).
- Contenido ficticio centralizado en `src/data/` (rooms.js, treatments.js, experiences.js, gallery.js) para poder reemplazarlo después con datos reales sin tocar componentes.

Estructura:

```
src/
├── components/   → Navbar, Footer, BookingBar, RoomCard, SectionHeading, GalleryGrid, Lightbox...
├── pages/        → Home, Habitaciones, Gastronomia, Spa, Experiencias, Galeria, Contacto
├── data/         → contenido ficticio centralizado
└── styles/
```

Componentes clave:
- **Navbar:** transparente sobre el hero (logo y links en blanco/marfil), se vuelve sólida (fondo marfil, logo marino) al hacer scroll. Menú hamburguesa en móvil.
- **Footer:** fondo marino, logo SVG, navegación, datos placeholder de contacto, newsletter decorativo.
- **BookingBar:** selector de fechas y huéspedes (estilo Anantara), funcional solo en UI.

## 7. Páginas (7 rutas)

### `/` — Inicio
1. Hero fullscreen con la mejor foto aérea + logo + tagline ("Santuario frente al Pacífico" o mejor propuesta del agente de diseño) + BookingBar.
2. Sección editorial "Bienvenido a Aurea Vita" con foto de `fachadas/`.
3. Grid de 3 tarjetas: Habitaciones / Gastronomía / Spa, con foto, eyebrow y link.
4. Sección de contraste en fondo marino: "El destino — Acapulco" con foto aérea.
5. Strip o carrusel de alberca/terraza.
6. CTA final de reserva + footer.

### `/habitaciones` — Habitaciones & Suites
3 categorías ficticias, cada una con mini-galería (4–5 fotos de `habitaciones/`), m², ocupación, amenidades y botón "Reservar":
- **Habitación Vista Jardín** (acento salvia)
- **Suite Vista al Mar** (acento marino)
- **Suite Aurea** — la insignia (acento dorado)

### `/gastronomia` — Gastronomía
Dos conceptos con layout alternado imagen/texto:
- Restaurante principal **"Origen"** (cocina del Pacífico, fotos `restaurante/`)
- Bar de terraza **"Cielo"** (atardeceres y cocteles, fotos `terraza/`)
Incluir horarios ficticios y un menú degustación de ejemplo.

### `/spa` — Spa & Bienestar
**"Spa Vita"**: aquí los verdes oliva/salvia dominan como acento. Menú de 5–6 tratamientos ficticios con duración y descripción, filosofía de bienestar, fotos `spa/`. Influencia SHA: editorial, sereno, espacioso.

### `/experiencias` — Experiencias
Bloques: alberca infinita (`alberca/`), atardeceres en terraza (`terraza/`), y "Descubre Acapulco" (`aereas/`) con 3–4 experiencias del destino.

### `/galeria` — Galería
Grid masonry con filtros por las 8 categorías de fotos + lightbox con navegación por teclado. Usa una selección amplia de las 120 fotos.

### `/contacto` — Contacto / Reserva
Formulario demo (nombre, email, fechas, tipo de habitación, mensaje) con validación en cliente y confirmación simulada. Datos de contacto placeholder y referencia a Acapulco, Guerrero, México.

## 8. Calidad mínima obligatoria

- Totalmente responsive (móvil primero en pruebas).
- Focus visible en teclado, `prefers-reduced-motion` respetado.
- Lighthouse razonable: lazy loading, sin layout shifts en el hero.
- Metadatos: `<title>` y description por página, favicon a partir de `public/Logo.svg`, idioma `es-MX`.
- Sin lorem ipsum: todo el copy ficticio pero verosímil y bien escrito en español.

## 9. Equipo de agentes y sus roles en este proyecto

### `ux-architect` — Arquitectura de UX antes de escribir código
**Cuándo invocarlo:** Antes de implementar cualquier página o feature nuevo.
**Qué hace en este proyecto:**
- Define la arquitectura de información y flujos de usuario de cada una de las 7 páginas antes de que el `ui-engineer` escriba una línea de código.
- Diseña el discovery del hero y la BookingBar: ¿qué ve el usuario en 3 segundos? ¿cómo navega hacia reservar?
- Produce un design brief por página (contexto del usuario, restricciones, estrategia UX, casos extremos) que sirve de input al `ui-engineer` y `visual-designer`.
- Valida la arquitectura de navegación: orden del menú, jerarquía de páginas, flujo Inicio → Habitaciones → Contacto.
- **Skill principal:** `/shape [página]` para discovery de cada ruta; `/critique` para evaluar diseños existentes con scoring cuantitativo.

### `ux-writer` — Copy editorial en español mexicano
**Cuándo invocarlo:** Inmediatamente después del `ux-architect`, antes de que el `ui-engineer` construya las páginas.
**Qué hace en este proyecto:**
- Escribe todo el copy ficticio del sitio en español de México: tono editorial elegante, sin clichés de marketing ni lorem ipsum.
- Define el tagline del hero (propuesta y variantes de "Santuario frente al Pacífico").
- Redacta las descripciones de las 3 categorías de habitaciones (Vista Jardín, Suite Vista al Mar, Suite Aurea).
- Genera los conceptos narrativos de Restaurante "Origen" y Bar "Cielo": horarios ficticios, menú degustación, descriptores de platos.
- Escribe los 5–6 tratamientos del Spa Vita (nombre, duración, descripción evocadora).
- Crea los CTAs de todas las páginas, labels del BookingBar, placeholders del formulario de contacto y el mensaje de confirmación simulada.
- **Skill principal:** `/clarify` para revisar y mejorar cualquier copy que resulte confuso o fuera de tono.

### `ui-engineer` — Implementación de componentes y páginas
**Cuándo invocarlo:** Cuando existe un design brief del `ux-architect` y el copy del `ux-writer`.
**Qué hace en este proyecto:**
- Configura el proyecto: Vite + React + Tailwind con los tokens de color de la sección 2 definidos como variables CSS.
- Construye todos los componentes base: `Navbar` (transparente → sólida en scroll), `Footer` (fondo marino, Logo.svg), `BookingBar`, `RoomCard`, `SectionHeading`, `GalleryGrid`, `Lightbox`.
- Implementa las 7 páginas completas con las fotos de `public/fotos_hotel/` y el copy del `ux-writer`.
- Centraliza todo el contenido ficticio en `src/data/` (rooms.js, treatments.js, experiences.js, gallery.js).
- **Regla crítica:** Usa `min-h-[100dvh]` en el hero (nunca `h-screen`). Nunca trunca código ni usa placeholders. Siempre verifica `package.json` antes de importar librerías.
- **Skills principales:** `/impeccable craft` para features completos; `/full-output-enforcement` para garantizar código sin truncar.

### `motion-engineer` — Animaciones y micro-interacciones
**Cuándo invocarlo:** Después de que el `ui-engineer` termina una página y antes de pasarla al `visual-designer`.
**Qué hace en este proyecto:**
- Implementa los scroll-reveals de cada sección (Framer Motion o IntersectionObserver + CSS): entradas suaves con stagger para grupos de tarjetas.
- Anima la transición de la Navbar: opacity/background al superar el hero con `transform` y `opacity` únicamente.
- Agrega hover effects a las `RoomCard`, tarjetas de gastronomía y experiencias: elevación sutil, zoom suave en la foto.
- Implementa las transiciones del Lightbox de la galería: entrada/salida fluida, navegación por teclado con animación de slide.
- Animaciones del BookingBar: aparición al cargar, feedback visual al seleccionar fechas.
- **MOTION_INTENSITY para este proyecto: 6** — funcional y con momentos de deleite, acorde al tono de lujo sereno. Nada cinematográfico; nada estático.
- Siempre incluye soporte para `prefers-reduced-motion`.
- **Skills principales:** `/animate` para oportunidades estratégicas; `/delight` para toques de personalidad en el hero y CTA final; `/polish` para consistencia antes de pasar al `visual-designer`.

### `visual-designer` — Refinamiento visual premium
**Cuándo invocarlo:** Cuando una página está implementada y animada — como crítico y refinador final antes del QA.
**Qué hace en este proyecto:**
- Revisa que la paleta de tokens (marfil, arena, marino, dorado, oliva, salvia, piedra) se aplique con disciplina: el dorado como único acento global, los verdes solo en Spa.
- Verifica que Cormorant Garamond se use con pesos ligeros (300–500) en títulos display y que Jost/Inter sea limpia en cuerpo.
- Evalúa el espaciado y el ritmo visual de cada sección: ¿hay suficiente respiro? ¿la jerarquía guía el ojo?
- Asegura que el sitio no se vea como plantilla genérica de IA: aplica decisiones visuales deliberadas inspiradas en anantara.com y shawellness.com.
- Detecta inconsistencias: colores hardcodeados fuera del sistema, tamaños de fuente sin lógica de escala, imágenes mal encuadradas.
- **Skills principales:** `/high-end-visual-design` para revisar cada página completa; `/layout` si el espaciado o grid necesita corrección; `/typeset` si la tipografía pierde jerarquía; `/quieter` si alguna sección se siente visualmente agresiva.

### `qa-auditor` — Auditoría de calidad, accesibilidad y performance
**Cuándo invocarlo:** Como último paso antes de considerar cualquier página lista. También invocarlo en el pase global final.
**Qué hace en este proyecto:**
- Audita accesibilidad (WCAG AA): contraste mínimo 4.5:1 con la paleta definida, `alt` descriptivo en español en todas las fotos, navegación por teclado en Navbar, Lightbox y formulario de contacto.
- Verifica performance: lazy loading en todas las imágenes excepto el hero, sin CLS en el hero fullscreen, animaciones solo con `transform`/`opacity`.
- Confirma responsive mobile-first: Navbar hamburguesa funcional, `RoomCard` en stack vertical en móvil, galería masonry adaptada, touch targets ≥ 44px.
- Valida metadatos por página: `<title>` único, `<meta name="description">`, `lang="es-MX"`, favicon desde `Logo.svg`.
- Detecta anti-patterns: `h-screen` en el hero, emojis en markup, colores fuera de los tokens de diseño.
- Genera reporte con severidad P0–P3 y ofrece corrección concreta para P0 y P1.
- **Skills principales:** `/audit` para reporte sistemático en 5 dimensiones; `/optimize` si hay problemas de performance; `/adapt` si hay problemas responsivos.

---

## 10. Flujo de trabajo con agentes

1. **`ux-architect`** → Produce el design brief del sitio completo: jerarquía de páginas, flujo de reserva, concepto del hero, dirección de arte general.
2. **`ux-writer`** → Con el brief como input, escribe todo el copy del sitio antes de que se construya nada.
3. **Setup técnico** → `ui-engineer` configura Vite + React + Tailwind + tokens + Navbar + Footer.
4. **Por cada página** (en orden: Home → Habitaciones → Gastronomía → Spa → Experiencias → Galería → Contacto):
   a. `ui-engineer` implementa la página completa.
   b. `motion-engineer` agrega animaciones y micro-interacciones.
   c. `visual-designer` revisa y refina visualmente.
   d. `qa-auditor` audita y reporta P0–P1 para corregir antes de avanzar.
5. **Pase global final** → `qa-auditor` audita el sitio completo: responsive, accesibilidad, metadatos, coherencia de tokens. `visual-designer` hace revisión de diseño global.

Al terminar, deja corriendo el servidor de desarrollo e indícame la URL local para revisarlo.
