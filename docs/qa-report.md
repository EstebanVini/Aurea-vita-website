# QA Report — Aurea Vita
Fecha: 2026-06-03 | Agente: QA-8

---

## Resultado General

**APROBADO** — El proyecto compila sin errores, todos los archivos requeridos existen, la paleta de colores usa variables CSS correctamente, las animaciones y el responsive están implementados conforme a los criterios de aceptación. Se identificaron observaciones menores documentadas abajo.

---

## Verificaciones

### Build

- `npm run build`: **PASSED** — sin errores ni warnings
- Módulos transformados: **53**
- Bundle: **253.38 kB JS** (80.92 kB gzip) + **30.52 kB CSS** (5.24 kB gzip)
- Tiempo de build: 431 ms

---

### Estructura de Archivos

Todos los 32 archivos requeridos existen:

- `src/styles/variables.css` — presente
- `src/styles/global.css` — presente
- `src/hooks/useScrollReveal.js` — presente
- `src/components/common/ImagePlaceholder.jsx` — presente
- `src/components/common/ImagePlaceholder.module.css` — presente
- `src/components/common/ScrollReveal.jsx` — presente
- `src/components/common/ScrollReveal.module.css` — presente
- `src/components/layout/Layout.jsx` — presente
- `src/components/layout/Layout.module.css` — presente
- `src/components/layout/Header.jsx` — presente
- `src/components/layout/Header.module.css` — presente
- `src/components/layout/Footer.jsx` — presente
- `src/components/layout/Footer.module.css` — presente
- `src/components/sections/Hero.jsx` — presente
- `src/components/sections/Hero.module.css` — presente
- `src/components/sections/Rooms.jsx` — presente
- `src/components/sections/Rooms.module.css` — presente
- `src/components/sections/RoomCard.jsx` — presente
- `src/components/sections/RoomCard.module.css` — presente
- `src/components/sections/Experiences.jsx` — presente
- `src/components/sections/Experiences.module.css` — presente
- `src/components/sections/ExperienceCard.jsx` — presente
- `src/components/sections/ExperienceCard.module.css` — presente
- `src/components/sections/About.jsx` — presente
- `src/components/sections/About.module.css` — presente
- `src/components/sections/Contact.jsx` — presente
- `src/components/sections/Contact.module.css` — presente
- `src/pages/LandingPage.jsx` — presente
- `src/pages/ReservarPage.jsx` — presente
- `src/App.jsx` — presente
- `src/main.jsx` — presente
- `index.html` — presente

---

### Paleta de Colores

**Sin colores hex hardcodeados.** El grep de colores hex en archivos `.css` no arrojó resultados.

Los únicos valores `rgba()` directos encontrados son derivaciones con opacidad de colores de la paleta (permitidos según criterios):
- `rgba(245, 241, 236, 0.75)` — `--color-text-on-dark` con 75% opacidad (Hero.module.css)
- `rgba(245, 241, 236, 0.08)` — `--color-text-on-dark` con 8% opacidad (Hero.module.css, Footer.module.css)
- `rgba(245, 241, 236, 0.5)` — borde del botón secundario (Hero.module.css)
- `rgba(245, 241, 236, 0.60 / 0.55 / 0.30 / 0.15)` — textos/bordes de Footer (Footer.module.css)
- `rgba(245, 241, 236, 0.65)` — subtítulo de Contact (Contact.module.css)
- `rgba(198, 168, 125, 0.15 / 0.40 / 0.06)` — sombras y fondos decorativos (Header.module.css, ReservarPage.module.css)

Todos son usos legítimos de opacidad sobre colores de la paleta oficial.

**Las 7 variables de paleta originales están presentes en `variables.css`:**
- `rgb(232, 225, 217)` — Arena cálida → `--color-background-secondary`
- `rgb(245, 241, 236)` — Marfil → `--color-background-primary`, `--color-text-on-dark`
- `rgb(122, 143, 124)` — Verde oliva suave → `--color-accent-strong`
- `rgb(163, 181, 160)` — Verde salvia → `--color-accent-muted`
- `rgb(31, 58, 68)` — Azul marino profundo → `--color-text-main`, `--color-navy`
- `rgb(110, 110, 110)` — Gris piedra → `--color-text-secondary`
- `rgb(198, 168, 125)` — Dorado suave → `--color-accent`, `--color-text-accent`

---

### Placeholders de Fotos

Se encontraron 5 usos de `<ImagePlaceholder>`, todos con `description` no vacío y comentario `{/* REEMPLAZAR FOTO: ... */}`:

1. **Hero.jsx** — `description="Vista panorámica del hotel al amanecer entre vegetación densa, luz dorada"` — comentario presente
2. **RoomCard.jsx** — `description={imageDesc}` — los 3 `imageDesc` en `Rooms.jsx` son descriptivos: "Interior de habitación estándar...", "Suite junior con sala de estar...", "Terraza privada de la suite aurea..." — comentario presente
3. **ExperienceCard.jsx** — `description={imageDesc}` — los 4 `imageDesc` en `Experiences.jsx` son descriptivos (spa, restaurante, jardines, servicio) — comentario presente
4. **About.jsx** — `description="Fundador o equipo del hotel en los jardines, luz natural, actitud relajada y genuina"` — comentario presente
5. **Contact.jsx** — `description="Mapa de ubicación del hotel — Camino del Laurel 47, Col. Jardines del Pedregal, CDMX"` — comentario presente

---

### Variables CSS

`src/styles/variables.css` contiene todas las secciones requeridas:

- **Colores** — incluye `--color-footer-bg: rgb(20, 38, 46)`
- **Tipografía** — `--font-heading`, `--font-body`
- **Escala de fuentes** — `--font-size-xs` hasta `--font-size-display`
- **Espaciados** — `--spacing-1` hasta `--spacing-32`
- **Radios** — `--radius-sm` hasta `--radius-full`
- **Sombras** — `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-card`, `--shadow-glow`
- **Transiciones** — `--transition-fast`, `--transition-base`, `--transition-slow` (más `--transition-spring`)
- **Layout** — `--container-max`, `--header-height`

---

### Animaciones

**ScrollReveal.module.css:**
- `.fadeUp` — presente (`transform: translateY(30px)`)
- `.fadeIn` — presente (`transform: none`)
- `.slideInLeft` — presente (`transform: translateX(-40px)`)
- `.slideInRight` — presente (`transform: translateX(40px)`)
- `@media (prefers-reduced-motion: reduce)` — presente, desactiva opacidad inicial y transiciones

**useScrollReveal.js:**
- Comprueba `window.matchMedia('(prefers-reduced-motion: reduce)').matches`
- Si es `true`, llama `setIsVisible(true)` de inmediato y hace `return` sin registrar el `IntersectionObserver`

---

### React Router

**App.jsx:**
- `<Route element={<Layout />}>` wrappea ambas rutas — correcto
- Ruta `/` → `<LandingPage />` — correcto
- Ruta `/reservar` → `<ReservarPage />` — correcto

**Header.jsx:**
- 5 links de navegación en `navLinks`: Inicio, Habitaciones, Experiencias, Nosotros, Contacto
- El link a `/reservar` (CTA "Reservar ahora") usa `<Link to="/reservar">` de React Router
- Los links de ancla dentro de la landing usan `<a href="/#habitaciones">` etc. — comportamiento correcto para SPA con anclas
- Detecta scroll (`window.scrollY > 80`) para añadir clase `.scrolled`
- Detecta ruta `/reservar` (`location.pathname === '/reservar'`) para modo scrolled permanente

**Observación menor:** Los 5 links del array `navLinks` se renderizan con `<a>` (no `<Link>`) porque son anclas hash. El criterio pedía que el link a `/reservar` use `<Link>` — lo hace correctamente. Los de ancla son correctos con `<a>`.

---

### Google Fonts

`index.html` contiene:
- `<link rel="preconnect" href="https://fonts.googleapis.com">` — presente
- `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` — presente
- `<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@...&family=Inter:wght@...&display=swap" rel="stylesheet">` — presente

**Nota:** Las fuentes también se importan en `variables.css` con `@import url(...)`. El import en `index.html` es redundante pero no produce errores, y en producción el import de `<link>` tiene prioridad como es esperado.

---

### Scroll Suave y Anclas

**global.css:**
- `scroll-behavior: smooth` en `html` — presente (línea 8)
- `scroll-margin-top` definido — presente: `:target { scroll-margin-top: calc(var(--header-height) + 1rem) }` y `section { scroll-margin-top: var(--header-height) }`

**IDs de sección:**
- Hero: `id="inicio"` — presente
- Rooms: `id="habitaciones"` — presente
- Experiences: `id="experiencias"` — presente
- About: `id="nosotros"` — presente
- Contact: `id="contacto"` — presente

**Header links:** usan `href="/#habitaciones"`, `href="/#experiencias"`, `href="/#nosotros"`, `href="/#contacto"` — en español, correctos.

---

### Responsive

**Hero.module.css:**
- `@media (max-width: 1023px)` — `font-size` del H1 reducido: `--font-size-4xl`
- `@media (max-width: 767px)` — H1 a `--font-size-3xl`, subtitle a `--font-size-base`, CTAs en columna full-width

**Rooms.module.css:**
- `@media (max-width: 1023px)` — grid: 3 columnas → 2 columnas
- `@media (max-width: 767px)` — grid: 2 → 1 columna

**Experiences.module.css:**
- `@media (max-width: 767px)` — grid: 2 columnas → 1 columna (no tablet separado, pero el colapso a mobile está correcto)

**About.module.css:**
- `@media (max-width: 1023px)` — grid 2 columnas → 1 columna (imagen al top via `order: -1`)
- `@media (max-width: 767px)` — ajustes adicionales de padding y tipografía

**Contact.module.css:**
- `@media (max-width: 1023px)` — grid 2 columnas → 1 columna
- `@media (max-width: 767px)` — ajustes adicionales de padding, CTA full-width

**Header.module.css:**
- `@media (max-width: 767px)` — hamburger visible (`display: flex`), nav oculto por defecto (`display: none`), `.nav.open { display: flex }` para el menú móvil

---

## Correcciones Realizadas Durante QA

Ninguna corrección fue necesaria. El código estaba completo y correcto en todos los criterios verificados.

---

## Pendientes

- **Fuente duplicada en variables.css e index.html:** Las fuentes Google Fonts se cargan dos veces (`@import` en `variables.css` y `<link>` en `index.html`). Ambas apuntan a la misma URL. No produce error pero es redundante. Se recomienda eliminar el `@import` de `variables.css` y conservar solo el `<link>` en `index.html` (más performante para el preconnect).
- **Fotos reales:** Todos los `<ImagePlaceholder>` deben reemplazarse por `<img>` con fotografías reales antes del lanzamiento. Los comentarios `{/* REEMPLAZAR FOTO: ... */}` y las props `description` están listos para facilitar esta tarea.
- **Links legales en Footer:** Los links de Aviso de Privacidad, Términos y Condiciones, Política de Cancelación y Accesibilidad apuntan a `href="#"` — pendiente de páginas o secciones reales.
- **Copyright año:** Footer muestra "© 2025 Aurea Vita" — actualizar a 2026 antes del lanzamiento.

---

## Instrucciones para Correr el Proyecto

```bash
npm install
npm run dev    # → http://localhost:5173
```

Rutas: `/` (landing page completa) | `/reservar` (página "próximamente")

Build de producción:

```bash
npm run build
npm run preview  # → http://localhost:4173
```
