# Plan Maestro — Aurea Vita Hotel Boutique
**Documento de integración y aprobación antes de la Fase 2 — Ejecución**
Versión: 1.0 | Fecha: 2026-06-03

---

## Resumen Ejecutivo

Este plan consolida los entregables de los Agentes 1 (Arquitectura), 2 (Diseño UI/UX) y 3 (Contenido). Cubre el desarrollo completo de una landing page y una página /reservar para el hotel boutique **Aurea Vita**, usando React 18 + Vite + CSS Modules + React Router.

**Decisiones de arquitectura ya tomadas:**
| Decisión | Elegido | Razón |
|---|---|---|
| Sistema de estilos | **CSS Modules** | Soporte nativo en Vite, cero overhead de runtime, separación clara de lógica y estilos |
| Tipografía (títulos) | **Cormorant Garamond** | Elegancia serif, rangos de peso 300–700, soporte de itálicas |
| Tipografía (cuerpo) | **Inter** | Legibilidad óptima en pantalla, variable font, weights 300–600 |
| Animaciones de scroll | **IntersectionObserver** vía `useScrollReveal` | Nativo del browser, sin dependencias, soporte `prefers-reduced-motion` |

---

## Sección 1 — Arquitectura de Software

> **Fuente:** `/docs/arquitectura.md` (Agente 1 — Arquitecto de Software)

### 1.1 Estructura de Carpetas

```
aurea-vita/                          ← raíz del proyecto Vite
├── public/
│   └── vite.svg
├── src/
│   ├── assets/                      ← imágenes y fuentes estáticas futuras
│   ├── components/
│   │   ├── common/
│   │   │   ├── ImagePlaceholder.jsx  ← bloque placeholder reutilizable
│   │   │   ├── ImagePlaceholder.module.css
│   │   │   ├── ScrollReveal.jsx      ← wrapper de animación
│   │   │   └── ScrollReveal.module.css
│   │   ├── layout/
│   │   │   ├── Layout.jsx            ← wrapper Header + Outlet + Footer
│   │   │   ├── Layout.module.css
│   │   │   ├── Header.jsx            ← nav fijo, logo, CTA "Reservar"
│   │   │   ├── Header.module.css
│   │   │   ├── Footer.jsx            ← fondo navy, datos de contacto
│   │   │   └── Footer.module.css
│   │   └── sections/
│   │       ├── Hero.jsx / Hero.module.css
│   │       ├── Rooms.jsx / Rooms.module.css
│   │       ├── RoomCard.jsx / RoomCard.module.css
│   │       ├── Experiences.jsx / Experiences.module.css
│   │       ├── ExperienceCard.jsx / ExperienceCard.module.css
│   │       ├── About.jsx / About.module.css
│   │       ├── Contact.jsx / Contact.module.css
│   ├── hooks/
│   │   └── useScrollReveal.js        ← IntersectionObserver + prefers-reduced-motion
│   ├── pages/
│   │   ├── LandingPage.jsx           ← orquesta todas las secciones
│   │   ├── LandingPage.module.css
│   │   ├── ReservarPage.jsx          ← página en construcción
│   │   └── ReservarPage.module.css
│   ├── styles/
│   │   ├── global.css                ← reset, tipografía base, scroll-behavior
│   │   └── variables.css             ← :root con todas las custom properties
│   ├── App.jsx                       ← configuración de rutas
│   └── main.jsx                      ← entrypoint, importa variables.css y global.css
├── index.html                        ← incluye preconnect a Google Fonts
├── vite.config.js
└── package.json
```

### 1.2 Árbol de Componentes (Resumen)

| Componente | Props clave | Responsabilidad |
|---|---|---|
| `<App />` | — | BrowserRouter + Routes |
| `<Layout />` | — | Header + Outlet + Footer |
| `<Header />` | — | Nav fija, logo "Aurea Vita", botón Reservar, estado .scrolled |
| `<Footer />` | — | Datos de contacto, links legales, copyright |
| `<ImagePlaceholder />` | `description`, `className` | Bloque visual con gradiente y texto de foto |
| `<ScrollReveal />` | `animation`, `delay`, `threshold`, `children` | Wrapper que anima hijos al entrar en viewport |
| `<LandingPage />` | — | Orquesta: Hero → Rooms → Experiences → About → Contact |
| `<Hero />` | — | Sección 100vh, H1, tagline, 2 CTAs, placeholder de fondo |
| `<Rooms />` | — | Sección con título + 3 `<RoomCard>` en grid |
| `<RoomCard />` | `title`, `price`, `description`, `imageDesc` | Tarjeta individual de habitación |
| `<Experiences />` | — | Sección con título + 4 `<ExperienceCard>` en grid 2×2 |
| `<ExperienceCard />` | `icon`, `title`, `description`, `imageDesc` | Tarjeta de amenidad |
| `<About />` | — | Layout 2 columnas: texto + ImagePlaceholder |
| `<Contact />` | — | Datos de contacto + MapPlaceholder, fondo navy |
| `<ReservarPage />` | — | Página en construcción con CTA de contacto |

### 1.3 Configuración de React Router

```jsx
// src/App.jsx — rutas definitivas
<Routes>
  <Route element={<Layout />}>           {/* Layout compartido, sin path */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/reservar" element={<ReservarPage />} />
  </Route>
</Routes>
```

IDs de sección para anclas del Header:
- `#inicio` → `<Hero id="inicio" />`
- `#habitaciones` → `<Rooms id="habitaciones" />`
- `#experiencias` → `<Experiences id="experiencias" />`
- `#nosotros` → `<About id="nosotros" />`
- `#contacto` → `<Contact id="contacto" />`

### 1.4 Hook `useScrollReveal`

```js
// Firma: src/hooks/useScrollReveal.js
useScrollReveal({ threshold = 0.1, rootMargin = '0px', once = true })
// Retorna: [ref, isVisible]
// Si prefers-reduced-motion: isVisible = true inmediatamente (sin observer)
```

---

## Sección 2 — Sistema de Diseño UI/UX

> **Fuente:** `/docs/diseno.md` (Agente 2 — Diseñador UI/UX)

### 2.1 Paleta de Colores (variables CSS en :root)

| Variable CSS | Valor RGB | Nombre | Uso |
|---|---|---|---|
| `--color-background-primary` | `rgb(245, 241, 236)` | Marfil | Fondo principal |
| `--color-background-secondary` | `rgb(232, 225, 217)` | Arena cálida | Fondos alternos |
| `--color-accent` | `rgb(198, 168, 125)` | Dorado suave | CTAs, logo, líneas decorativas |
| `--color-accent-hover` | `rgb(213, 186, 147)` | Dorado claro | Hover en CTAs |
| `--color-accent-muted` | `rgb(163, 181, 160)` | Verde salvia | Tarjetas, elementos secundarios |
| `--color-accent-strong` | `rgb(122, 143, 124)` | Verde oliva | Hovers, detalles |
| `--color-text-main` | `rgb(31, 58, 68)` | Azul marino | Texto principal, header, footer |
| `--color-text-secondary` | `rgb(110, 110, 110)` | Gris piedra | Texto secundario |
| `--color-text-on-dark` | `rgb(245, 241, 236)` | Marfil | Texto sobre fondos oscuros |
| `--color-navy` | `rgb(31, 58, 68)` | Azul marino | Header, footer, Contact |
| `--color-navy-90` | `rgba(31, 58, 68, 0.90)` | Navy transparente | Header scrolled |

> **Regla de oro:** Ningún color hardcodeado en CSS. Todos deben venir de variables definidas en `:root` de `variables.css`.

### 2.2 Tipografía

| Variable | Valor | Uso |
|---|---|---|
| `--font-heading` | `'Cormorant Garamond', Georgia, serif` | H1–H3, logo, precios |
| `--font-body` | `'Inter', system-ui, sans-serif` | Párrafos, labels, navegación |
| `--font-size-display` | `5rem` (80px) | H1 del Hero |
| `--font-size-4xl` | `3rem` (48px) | H2 de secciones |
| `--font-size-xl` | `1.5rem` (24px) | H3 de tarjetas |
| `--font-size-base` | `1rem` (16px) | Cuerpo de texto |
| `--font-size-sm` | `0.875rem` (14px) | Labels, captions |
| `--font-size-xs` | `0.75rem` (12px) | Nav links, caps |

**Carga de fuentes:** Vía `<link rel="preconnect">` en `index.html` (mejor performance que @import).

### 2.3 Wireframes — Orden de Secciones y Fondos

| # | Sección | Fondo | Layout Desktop | Layout Móvil |
|---|---|---|---|---|
| 1 | Header (sticky) | Transparente → `--color-navy-90` al scroll | Logo + Nav + CTA | Logo + ☰ hamburger |
| 2 | Hero | `--color-navy` (imagen de fondo) | Pantalla completa, texto centrado | Ídem, fuente reducida |
| 3 | Rooms | `--color-background-primary` | Grid 3 columnas | 1 columna |
| 4 | Experiences | `--color-background-secondary` | Grid 2×2 | 1 columna |
| 5 | About | `--color-background-primary` | 2 col: texto + imagen | Imagen arriba, texto abajo |
| 6 | Contact | `--color-navy` | 2 col: datos + mapa | 1 columna, mapa abajo |
| 7 | Footer | `rgb(20, 38, 46)` (navy oscuro) | 4 columnas | Stack vertical |

### 2.4 Breakpoints

| Nombre | Valor |
|---|---|
| Móvil | `< 768px` |
| Tablet | `768px – 1023px` |
| Desktop | `≥ 1024px` |
| Max container | `1280px` |

### 2.5 Animaciones

**Scroll Reveal (IntersectionObserver, threshold: 15%):**
- `fadeUp` — `translateY(30px) → 0` + `opacity 0 → 1`, 0.6s ease-out *(por defecto)*
- `fadeIn` — solo `opacity 0 → 1`, 0.5s ease-out
- `slideInLeft` — `translateX(-40px) → 0`, 0.6s ease-out
- `slideInRight` — `translateX(40px) → 0`, 0.6s ease-out
- Delays escalonados en grids: 0ms, 100ms, 200ms, 300ms

**Micro-interacciones hover:**
- Botón CTA dorado: `translateY(-2px)` + `box-shadow` glow dorado
- RoomCard / ExperienceCard: `translateY(-6px)` + sombra más profunda
- Nav links: underline animado por `::after` que se expande de 0% a 100%

**prefers-reduced-motion:** Bloque CSS que elimina todos los `transform` y `transition` — visible inmediatamente sin animación.

**Scroll suave:** `html { scroll-behavior: smooth; }` + `scroll-margin-top` en secciones para compensar el header fijo.

### 2.6 Componente ImagePlaceholder

Gradientes de fondo por contexto:

| Contexto | Aspect Ratio / Alto | Gradiente |
|---|---|---|
| Hero | `100vw × 100vh` | navy → verde oliva |
| Room Card | `3/2` | arena cálida → verde salvia |
| Experience Card | `1/1` | verde salvia → verde oliva |
| About | `4/3` | arena cálida → dorado suave |
| Map Placeholder | `100% × 400px` | arena cálida → verde salvia |

Contenido interno: ícono de cámara (opacity 0.35) + texto descriptivo uppercase en 12px (opacity 0.45).

---

## Sección 3 — Contenido en Español

> **Fuente:** `/docs/contenido.md` (Agente 3 — Redactor de Contenido)

### 3.1 Identidad

| | Texto |
|---|---|
| **Tagline principal** | *"Donde la vida florece en oro."* |
| **H1 del Hero** | *"Bienvenido a tu vida dorada."* |
| **Subtítulo del Hero** | *"Aurea Vita es un refugio donde el tiempo se detiene con elegancia. Entre jardines, aromas naturales y una atención que anticipa cada deseo, descubrirás lo que significa descansar de verdad."* |
| **CTA principal** | *"Descubre el hotel"* |
| **CTA secundario** | *"Ver habitaciones"* |

### 3.2 Habitaciones

| Habitación | Nombre Completo | Precio |
|---|---|---|
| Estándar | Nido del Bosque | Desde $2,800 MXN / noche |
| Suite Junior | Brisa Verde | Desde $4,500 MXN / noche |
| Suite Aurea | Cielo Dorado | Desde $8,200 MXN / noche |

### 3.3 Experiencias

| # | Título | Descripción breve |
|---|---|---|
| 1 | Spa Aurea — Ritual para el cuerpo y la mente | Tratamientos ancestrales y contemporáneos |
| 2 | Restaurante Aurea — Cocina de raíz con visión contemporánea | Ingredientes locales de temporada |
| 3 | Jardines Vivos — El corazón verde del hotel | Caminos, meditación, contemplación |
| 4 | Atención sin guión — tu estancia, a tu manera | Servicio personalizado, sin manual |

### 3.4 Placeholders de Fotos (resumen)

| Sección | Descripción para el diseñador |
|---|---|
| Hero | Vista panorámica al atardecer, fachada integrada entre vegetación, luz dorada, sin personas |
| Habitación Estándar | Interior con luz natural, cama king en lino blanco, tonos tierra, plantas |
| Suite Junior | Sala de estar, ventanal al jardín, sofá lino, copa de vino, orquídea |
| Suite Aurea | Terraza con alberca al atardecer, luz dorada, copa de champán en piedra |
| Spa | Interior tenue, mesa de masajes, pétalos, piedras calientes, vapor |
| Restaurante | Mesa montada al aire libre, vajilla artesanal, platillo gourmet |
| Jardines | Camino de piedra entre helechos y flores, luz filtrada por follaje |
| Servicio | Empleado sirviendo copa, expresión cálida, jardín desenfocado |
| Nosotros | Fundador/equipo en jardines, actitud relajada y genuina |

### 3.5 Contacto

```
Dirección: Camino del Laurel 47, Col. Jardines del Pedregal, CDMX, CP 01900
Teléfono:  +52 (55) 1234-5678
Email:     reservas@aureavita.mx
Horario:   Lunes a Domingo, 8:00 am – 10:00 pm
```

### 3.6 Página /reservar

- **Título:** *"Tu reserva, muy pronto aquí."*
- **Subtítulo:** Explica que el sistema estará disponible pronto
- **Contacto alternativo:** Email + teléfono en tarjeta con borde dorado
- **Botón:** *"Volver al inicio"*
- **Mensaje de expectativa:** *"Próximamente podrás reservar directamente aquí…"*

---

## Sección 4 — Plan de Ejecución (Fase 2)

### Agentes y Secuencia

```
┌─────────────────────────────────────────┐
│  AGENTE 4 — Setup e infraestructura     │  ← Primero, solo
│  Inputs: arquitectura.md + diseno.md    │
│  Outputs: proyecto Vite inicializado,   │
│           estructura de carpetas,       │
│           variables.css, global.css,    │
│           App.jsx, main.jsx, index.html │
└────────────────────┬────────────────────┘
                     │ (esperar a que termine)
                     ▼
┌─────────────────────────────────────────┐
│  AGENTE 5 — Componentes de estructura  │  ← Segundo, solo
│  Inputs: arquitectura.md + diseno.md   │
│  Outputs: Header.jsx/.module.css       │
│           Footer.jsx/.module.css       │
│           Layout.jsx/.module.css       │
│           ImagePlaceholder.jsx/.css    │
│           ScrollReveal.jsx/.css        │
│           useScrollReveal.js           │
└───────────┬─────────────────┬───────────┘
            │ (esperar)       │
            ▼                 ▼
┌──────────────────┐  ┌──────────────────────────┐
│  AGENTE 6A       │  │  AGENTE 6B / AGENTE 7    │
│  Secciones 1-3   │  │  Secciones 4-6 +         │
│  (Hero, Rooms,   │  │  Página /reservar         │
│   Experiences)   │  │  (paralelos)              │
└──────────────────┘  └──────────────────────────┘
            │                 │
            └────────┬────────┘
                     │ (esperar a ambos)
                     ▼
┌─────────────────────────────────────────┐
│  AGENTE 8 — QA y revisión final        │  ← Último, solo
│  Verifica build, responsive, paleta,   │
│  anclas, animaciones, placeholders     │
│  Entrega: /docs/qa-report.md           │
└─────────────────────────────────────────┘
```

### Criterios de Aceptación por Agente

#### Agente 4 — Setup
- [ ] `npm create vite@latest` ejecutado con plantilla `react`
- [ ] `react-router-dom` instalado
- [ ] Estructura de carpetas del plan creada
- [ ] `src/styles/variables.css` con **todas** las custom properties de la paleta (incluyendo las 7 variables de color originales + variantes)
- [ ] `src/styles/global.css` con reset CSS, `scroll-behavior: smooth`, `scroll-margin-top`, importación de fuentes
- [ ] `index.html` con `<link rel="preconnect">` a Google Fonts
- [ ] `App.jsx` con rutas `/` y `/reservar` compartiendo `<Layout />`
- [ ] App corriendo en `npm run dev` sin errores

#### Agente 5 — Estructura
- [ ] `<Header />` fijo, logo "Aurea Vita" en Cormorant Garamond dorado, 5 links de nav con anclas en español (#habitaciones, etc.), botón "Reservar ahora" en dorado → `/reservar`, estado `.scrolled` al scroll >80px
- [ ] `<Footer />` en `rgb(20, 38, 46)`, textos en marfil, links legales, copyright
- [ ] `<ImagePlaceholder />` con prop `description`, gradientes por variante, texto centrado
- [ ] `<ScrollReveal />` con 4 variantes de animación + delay prop
- [ ] `useScrollReveal.js` con IntersectionObserver y soporte `prefers-reduced-motion`

#### Agente 6 — Secciones Landing
- [ ] `<Hero />` — 100vh, placeholder de fondo con overlay navy-70, H1, subtítulo, 2 CTAs
- [ ] `<Rooms />` — grid 3 col desktop / 1 col móvil, 3 `<RoomCard>` con datos de contenido.md
- [ ] `<Experiences />` — grid 2×2 desktop / 1 col móvil, 4 tarjetas con datos de contenido.md
- [ ] `<About />` — 2 columnas desktop, texto de contenido.md, cita del fundador, estadísticas
- [ ] `<Contact />` — fondo navy, datos de contacto de contenido.md, MapPlaceholder
- [ ] Animaciones de scroll aplicadas a cada sección con variantes apropiadas

#### Agente 7 — Página /reservar
- [ ] Misma paleta y Header (en modo .scrolled permanente)
- [ ] Contenido de contenido.md (sección 9 — En Construcción)
- [ ] Tarjeta de contacto con borde dorado y datos de email + teléfono
- [ ] Botón "Volver al inicio" que navega a `/`
- [ ] Responsive (móvil y desktop)

#### Agente 8 — QA
- [ ] `npm run build` sin errores
- [ ] `npm run dev` sin warnings en consola
- [ ] Responsive verificado en 3 breakpoints: 375px, 768px, 1280px
- [ ] Anclas del Header navegan a las secciones correctas
- [ ] Link /reservar funciona desde el Header
- [ ] Todos los colores provienen de variables CSS (ningún color hardcodeado)
- [ ] Cada `<ImagePlaceholder />` tiene su `description` de contenido.md
- [ ] Comentario `// REEMPLAZAR FOTO:` presente en cada uso de ImagePlaceholder
- [ ] `prefers-reduced-motion` verificado (animaciones desactivadas)
- [ ] Reporte en `/docs/qa-report.md`

---

## Sección 5 — Coherencia Entre Agentes

### Decisiones Unificadas
Los tres agentes coinciden en los puntos clave. Se identificaron estas armonizaciones:

1. **IDs de sección en español** — El contenido y diseño usan términos en español (`#habitaciones`, `#experiencias`, `#nosotros`, `#contacto`). Los agentes de ejecución deben usar estos IDs exactos.

2. **5 links de navegación** — Agente 3 definió: Inicio, Habitaciones, Experiencias, Nosotros, Contacto. "Inicio" navega a `href="/"` (o scroll al top). Los otros 4 son anclas internas.

3. **Botón del Header** — Texto: **"Reservar ahora"** (Agente 3). No "Reservar" ni "Reservar habitación".

4. **Precios en MXN** — Los datos de habitaciones de Agente 3 son la fuente de verdad: $2,800 / $4,500 / $8,200 MXN.

5. **Íconos de experiencias** — Se usará texto/emoji: 🌿 Spa, 🍽️ Gastronomía, 🌱 Jardines, ✨ Servicio.

6. **Footer fondo** — `rgb(20, 38, 46)` (navy más oscuro, especificado por Agente 2). No es igual al `--color-navy`.

7. **ImagePlaceholder en hero** — Sin `border-radius` ni `border`, cubre todo el viewport. Variante `--hero`.

---

## Sección 6 — Cómo Correr el Proyecto (Post-Ejecución)

```bash
# 1. Instalar dependencias
npm install

# 2. Servidor de desarrollo
npm run dev
# → http://localhost:5173

# 3. Build de producción
npm run build

# 4. Preview del build
npm run preview
# → http://localhost:4173
```

**Páginas disponibles:**
- `http://localhost:5173/` → Landing page completa
- `http://localhost:5173/reservar` → Página en construcción

---

## Sección 7 — Reemplazar Fotos a Futuro

Cuando se tengan fotografías reales, el proceso es simple:

1. Buscar todos los usos de `<ImagePlaceholder />` (un componente único → búsqueda fácil)
2. Cada uso tiene el comentario `{/* REEMPLAZAR FOTO: descripción */}`
3. Reemplazar `<ImagePlaceholder description="..." />` con `<img src="..." alt="..." />`
4. Aplicar el mismo `className` para mantener las dimensiones y aspect-ratios

No se requiere tocar variables CSS ni restructurar componentes.

---

*Este plan maestro está listo para aprobación. Una vez aprobado, se lanzan los Agentes 4–8 en secuencia.*
