# Arquitectura del Proyecto — Aurea Vita Hotel Boutique

> Documento de referencia para agentes de ejecución. Versión: 1.0 | Fecha: 2026-06-03

---

## 1. Justificación de CSS Modules vs styled-components

Se elige **CSS Modules** sobre styled-components por las siguientes razones:

| Criterio | CSS Modules | styled-components |
|---|---|---|
| Bundle size | Sin overhead en runtime | ~12-15 kB adicionales en runtime |
| Vite compatibility | Soporte nativo, cero configuración | Requiere plugin o configuración extra |
| Colocación | Archivo `.module.css` junto al componente | Estilos embebidos en el archivo `.jsx` |
| Performance | Clases generadas en build time | Inyección dinámica de estilos en runtime |
| Variables CSS | Acceso directo a custom properties globales | Necesita `ThemeProvider` o `createGlobalStyle` |
| Curva de aprendizaje | CSS estándar, sin API nueva | API propia con template literals |

**Conclusión:** CSS Modules ofrece la misma encapsulación de estilos que styled-components sin añadir dependencias de runtime, funciona de forma nativa con Vite, y mantiene la separación clara entre lógica (`.jsx`) y presentación (`.module.css`).

---

## 2. Estructura de carpetas

Árbol completo del proyecto con todos los archivos que se crearán:

```
aurea-vita/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── (imágenes y fuentes estáticas)
│   ├── components/
│   │   ├── common/
│   │   │   ├── ImagePlaceholder.jsx
│   │   │   ├── ImagePlaceholder.module.css
│   │   │   ├── ScrollReveal.jsx
│   │   │   └── ScrollReveal.module.css
│   │   ├── layout/
│   │   │   ├── Layout.jsx
│   │   │   ├── Layout.module.css
│   │   │   ├── Header.jsx
│   │   │   ├── Header.module.css
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.module.css
│   │   └── sections/
│   │       ├── Hero.jsx
│   │       ├── Hero.module.css
│   │       ├── Rooms.jsx
│   │       ├── Rooms.module.css
│   │       ├── RoomCard.jsx
│   │       ├── RoomCard.module.css
│   │       ├── Experiences.jsx
│   │       ├── Experiences.module.css
│   │       ├── ExperienceCard.jsx
│   │       ├── ExperienceCard.module.css
│   │       ├── About.jsx
│   │       ├── About.module.css
│   │       ├── Contact.jsx
│   │       └── Contact.module.css
│   ├── hooks/
│   │   └── useScrollReveal.js
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LandingPage.module.css
│   │   ├── ReservarPage.jsx
│   │   └── ReservarPage.module.css
│   ├── styles/
│   │   ├── global.css         (reset, variables CSS, tipografía base)
│   │   └── variables.css      (custom properties: colores, espaciado, fuentes)
│   ├── App.jsx
│   └── main.jsx
├── docs/
│   └── arquitectura.md
├── index.html
├── vite.config.js
├── package.json
└── .gitignore
```

---

## 3. Árbol de componentes con props

### `<App />`

```
Archivo: src/App.jsx
CSS: ninguno (solo lógica de routing)
```

- **Responsabilidad:** Raíz de la aplicación. Configura `BrowserRouter` y define el árbol de rutas con `Routes` y `Route`. No tiene props externas.
- **Props:** ninguna
- **Renderiza:** `<BrowserRouter>` → `<Routes>` con dos rutas

---

### `<Layout />`

```
Archivo: src/components/layout/Layout.jsx
CSS: src/components/layout/Layout.module.css
```

- **Responsabilidad:** Wrapper de página que envuelve el contenido con `<Header />` arriba y `<Footer />` abajo. Usa `<Outlet />` de React Router para renderizar la página activa.
- **Props:** ninguna (el contenido llega via `<Outlet />`)

```jsx
// Estructura interna
<div className={styles.layout}>
  <Header />
  <main className={styles.main}>
    <Outlet />
  </main>
  <Footer />
</div>
```

---

### `<Header />`

```
Archivo: src/components/layout/Header.jsx
CSS: src/components/layout/Header.module.css
```

- **Responsabilidad:** Barra de navegación fija en la parte superior. Contiene el logo de Aurea Vita, enlaces de anclaje a las secciones de la landing (`#rooms`, `#experiences`, `#about`, `#contact`) y un botón CTA que navega a `/reservar`.
- **Props:** ninguna (es completamente autónomo)
- **Comportamiento:** Aplica una clase CSS adicional al hacer scroll para cambiar el fondo (efecto de transparencia a sólido).

```jsx
// Elementos internos
<header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
  <a href="/" className={styles.logo}>
    <img src={logo} alt="Aurea Vita" />
  </a>
  <nav className={styles.nav}>
    <a href="#rooms">Habitaciones</a>
    <a href="#experiences">Experiencias</a>
    <a href="#about">Nosotros</a>
    <a href="#contact">Contacto</a>
  </nav>
  <Link to="/reservar" className={styles.ctaButton}>Reservar</Link>
</header>
```

---

### `<Footer />`

```
Archivo: src/components/layout/Footer.jsx
CSS: src/components/layout/Footer.module.css
```

- **Responsabilidad:** Pie de página con datos de contacto del hotel (dirección, teléfono, email), links de navegación secundarios y aviso de derechos reservados.
- **Props:** ninguna

---

### `<ImagePlaceholder />`

```
Archivo: src/components/common/ImagePlaceholder.jsx
CSS: src/components/common/ImagePlaceholder.module.css
```

- **Responsabilidad:** Bloque visual reutilizable que ocupa el lugar de una imagen real. Muestra un fondo con gradiente y un texto descriptivo centrado. Se usa en todas las tarjetas y secciones mientras no haya fotografías reales.
- **Props:**

| Prop | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `description` | `string` | `''` | Texto descriptivo que se muestra dentro del placeholder |
| `className` | `string` | `''` | Clase CSS adicional para controlar dimensiones desde el padre |

```jsx
// Firma del componente
function ImagePlaceholder({ description = '', className = '' }) {}
```

```jsx
// Uso típico
<ImagePlaceholder
  description="Vista de la suite principal con terraza"
  className={styles.roomImage}
/>
```

---

### `<ScrollReveal />`

```
Archivo: src/components/common/ScrollReveal.jsx
CSS: src/components/common/ScrollReveal.module.css
```

- **Responsabilidad:** Wrapper de animación de entrada. Usa el hook `useScrollReveal` para detectar cuando el elemento entra en el viewport y aplica una clase CSS que activa la animación. Soporta diferentes tipos de animación y delay.
- **Props:**

| Prop | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `animation` | `string` | `'fadeUp'` | Tipo de animación: `'fadeUp'`, `'fadeIn'`, `'fadeLeft'`, `'fadeRight'` |
| `delay` | `number` | `0` | Delay en milisegundos antes de que inicie la animación |
| `children` | `ReactNode` | requerido | Contenido a animar |
| `threshold` | `number` | `0.1` | Porcentaje del elemento visible para disparar la animación |

```jsx
// Firma del componente
function ScrollReveal({ animation = 'fadeUp', delay = 0, threshold = 0.1, children }) {}
```

```jsx
// Uso típico
<ScrollReveal animation="fadeUp" delay={200}>
  <RoomCard ... />
</ScrollReveal>
```

```jsx
// Lógica interna
const [ref, isVisible] = useScrollReveal({ threshold });

return (
  <div
    ref={ref}
    className={`${styles.scrollReveal} ${styles[animation]} ${isVisible ? styles.visible : ''}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {children}
  </div>
);
```

---

### `<Hero />`

```
Archivo: src/components/sections/Hero.jsx
CSS: src/components/sections/Hero.module.css
```

- **Responsabilidad:** Sección hero de pantalla completa (100vh) que es lo primero que ve el usuario. Contiene un `<ImagePlaceholder>` como fondo, el nombre del hotel, un tagline y un botón CTA que lleva a `/reservar`.
- **Props:** ninguna

---

### `<Rooms />`

```
Archivo: src/components/sections/Rooms.jsx
CSS: src/components/sections/Rooms.module.css
```

- **Responsabilidad:** Sección de habitaciones con id `#rooms`. Renderiza un encabezado de sección y un grid de tres `<RoomCard>` envueltas en `<ScrollReveal>`.
- **Props:** ninguna
- **Datos:** Las tres habitaciones se definen como constante interna (array de objetos).

```js
// Datos internos
const rooms = [
  { id: 1, title: 'Suite Jardín', price: 280, description: '...', imageDesc: '...' },
  { id: 2, title: 'Suite Vista Mar', price: 380, description: '...', imageDesc: '...' },
  { id: 3, title: 'Villa Privada', price: 580, description: '...', imageDesc: '...' },
];
```

---

### `<RoomCard />`

```
Archivo: src/components/sections/RoomCard.jsx
CSS: src/components/sections/RoomCard.module.css
```

- **Responsabilidad:** Tarjeta individual de habitación. Muestra un `<ImagePlaceholder>`, el título, precio por noche, descripción breve y un botón "Ver más" que lleva a `/reservar`.
- **Props:**

| Prop | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `title` | `string` | requerido | Nombre de la habitación |
| `price` | `number` | requerido | Precio por noche en USD |
| `description` | `string` | requerido | Descripción breve de la habitación |
| `imageDesc` | `string` | `''` | Texto descriptivo para el `<ImagePlaceholder>` |

```jsx
// Firma del componente
function RoomCard({ title, price, description, imageDesc = '' }) {}
```

---

### `<Experiences />`

```
Archivo: src/components/sections/Experiences.jsx
CSS: src/components/sections/Experiences.module.css
```

- **Responsabilidad:** Sección de experiencias y amenidades con id `#experiences`. Renderiza un encabezado y un grid de cuatro `<ExperienceCard>` envueltas en `<ScrollReveal>` con delays escalonados.
- **Props:** ninguna
- **Datos:** Las cuatro experiencias se definen como constante interna.

```js
// Datos internos
const experiences = [
  { id: 1, icon: '🌿', title: 'Spa & Bienestar', description: '...', imageDesc: '...' },
  { id: 2, icon: '🍽️', title: 'Gastronomía', description: '...', imageDesc: '...' },
  { id: 3, icon: '🏊', title: 'Piscina Infinita', description: '...', imageDesc: '...' },
  { id: 4, icon: '🧘', title: 'Yoga & Meditación', description: '...', imageDesc: '...' },
];
```

---

### `<ExperienceCard />`

```
Archivo: src/components/sections/ExperienceCard.jsx
CSS: src/components/sections/ExperienceCard.module.css
```

- **Responsabilidad:** Tarjeta de amenidad o experiencia. Muestra un icono (emoji o SVG), un `<ImagePlaceholder>`, título y descripción.
- **Props:**

| Prop | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `icon` | `string` | `''` | Emoji o carácter que representa la experiencia |
| `title` | `string` | requerido | Nombre de la experiencia |
| `description` | `string` | requerido | Descripción breve |
| `imageDesc` | `string` | `''` | Texto descriptivo para el `<ImagePlaceholder>` |

```jsx
// Firma del componente
function ExperienceCard({ icon = '', title, description, imageDesc = '' }) {}
```

---

### `<About />`

```
Archivo: src/components/sections/About.jsx
CSS: src/components/sections/About.module.css
```

- **Responsabilidad:** Sección "Nosotros" con id `#about`. Presenta la historia y filosofía del hotel en un layout de dos columnas: texto a la izquierda e `<ImagePlaceholder>` a la derecha.
- **Props:** ninguna

---

### `<Contact />`

```
Archivo: src/components/sections/Contact.jsx
CSS: src/components/sections/Contact.module.css
```

- **Responsabilidad:** Sección de contacto con id `#contact`. Muestra dirección, teléfono, email, horarios, y un `<ImagePlaceholder>` que simula un mapa de ubicación. Incluye links `mailto:` y `tel:`.
- **Props:** ninguna

---

### `<ReservarPage />`

```
Archivo: src/pages/ReservarPage.jsx
CSS: src/pages/ReservarPage.module.css
```

- **Responsabilidad:** Página standalone accesible en la ruta `/reservar`. Muestra un mensaje de "Página en construcción" con el logo del hotel y un botón para volver al inicio. No usa el sistema de secciones.
- **Props:** ninguna

---

### `<LandingPage />`

```
Archivo: src/pages/LandingPage.jsx
CSS: src/pages/LandingPage.module.css (puede estar vacío)
```

- **Responsabilidad:** Página principal que compone todas las secciones en orden. Es un componente orquestador sin lógica propia.
- **Props:** ninguna

```jsx
// Estructura interna
function LandingPage() {
  return (
    <>
      <Hero />
      <Rooms />
      <Experiences />
      <About />
      <Contact />
    </>
  );
}
```

---

## 4. Configuración de React Router

### `src/main.jsx`

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/variables.css';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

### `src/App.jsx`

```jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import LandingPage from './pages/LandingPage.jsx';
import ReservarPage from './pages/ReservarPage.jsx';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/reservar" element={<ReservarPage />} />
      </Route>
    </Routes>
  );
}

export default App;
```

**Notas sobre la configuración de rutas:**

- `<Layout />` actúa como ruta padre con `element={<Layout />}` y no tiene `path`, por lo que envuelve a todas las rutas hijas.
- `<Outlet />` dentro de `<Layout />` es donde React Router inyecta `<LandingPage />` o `<ReservarPage />`.
- Ambas rutas comparten el mismo `<Header />` y `<Footer />`.

---

## 5. Hook `useScrollReveal`

### Ubicación

```
src/hooks/useScrollReveal.js
```

### Firma

```js
useScrollReveal({ threshold, rootMargin, once })
```

### Retorno

```js
[ref, isVisible]
// ref     → React ref para asignar al elemento DOM a observar
// isVisible → boolean que indica si el elemento está en el viewport
```

### Parámetros

| Parámetro | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `threshold` | `number` | `0.1` | Porcentaje (0-1) del elemento que debe estar visible |
| `rootMargin` | `string` | `'0px'` | Margen del viewport para adelantar/retrasar el trigger |
| `once` | `boolean` | `true` | Si es `true`, la animación solo se dispara una vez |

### Implementación

```js
import { useRef, useState, useEffect } from 'react';

function useScrollReveal({ threshold = 0.1, rootMargin = '0px', once = true } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Soporte de prefers-reduced-motion:
    // Si el usuario tiene activada la preferencia de movimiento reducido,
    // se marca como visible inmediatamente sin esperar al IntersectionObserver.
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Si once=true, dejamos de observar tras la primera intersección
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          // Si once=false, permite re-ocultar el elemento al salir del viewport
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
}

export default useScrollReveal;
```

### Notas de implementación

- El hook se usa exclusivamente dentro del componente `<ScrollReveal />`. Los demás componentes no lo consumen directamente.
- `once: true` es el comportamiento por defecto ya que para un sitio de presentación las animaciones de entrada son suficientes y más performativas.
- El soporte de `prefers-reduced-motion` garantiza accesibilidad: los usuarios con vestibular disorders o configuraciones de accesibilidad no ven animaciones.

---

## 6. Convenciones de código

### Naming conventions

| Elemento | Convención | Ejemplo |
|---|---|---|
| Componentes React | PascalCase | `RoomCard`, `ScrollReveal`, `Header` |
| Archivos de componentes | PascalCase + extensión | `RoomCard.jsx`, `Header.jsx` |
| Archivos CSS Modules | PascalCase + `.module.css` | `RoomCard.module.css`, `Header.module.css` |
| Hooks personalizados | camelCase con prefijo `use` | `useScrollReveal` |
| Archivos de hooks | camelCase + extensión | `useScrollReveal.js` |
| Archivos CSS globales | kebab-case | `global.css`, `variables.css` |
| Variables CSS | kebab-case con prefijo `--` | `--color-primary`, `--font-heading` |
| Clases CSS en módulos | camelCase | `.roomCard`, `.heroTitle`, `.ctaButton` |
| Constantes de datos | camelCase | `const rooms = [...]` |

### Patrón de importación de estilos

```jsx
// En cada componente, el CSS Module se importa como 'styles'
import styles from './Header.module.css';

// Las clases se acceden como propiedades del objeto
<header className={styles.header}>
<nav className={styles.nav}>
<a className={styles.ctaButton}>

// Para clases condicionales se usa template literals o clsx (sin instalación extra):
<header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>

// Para múltiples clases:
<div className={[styles.card, styles.featured].join(' ')}>
```

### Variables CSS globales dentro de CSS Modules

Las variables CSS globales definidas en `src/styles/variables.css` están disponibles en cualquier archivo `.module.css` porque se importan en `main.jsx` antes del árbol de componentes. No se necesita ninguna configuración adicional.

```css
/* src/styles/variables.css */
:root {
  /* Paleta de colores */
  --color-primary: #c9a96e;       /* dorado */
  --color-primary-dark: #a07d4f;
  --color-bg: #fafaf8;            /* blanco cálido */
  --color-text: #2c2c2c;
  --color-text-light: #6b6b6b;
  --color-accent: #1a1a1a;

  /* Tipografía */
  --font-heading: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Lato', 'Helvetica Neue', sans-serif;
  --font-size-base: 16px;

  /* Espaciado */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;
  --spacing-xl: 8rem;

  /* Layout */
  --container-max-width: 1200px;
  --header-height: 80px;

  /* Bordes y sombras */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.08);
  --shadow-hover: 0 8px 30px rgba(0, 0, 0, 0.15);

  /* Transiciones */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 600ms ease;
}
```

```css
/* Uso dentro de cualquier archivo .module.css */
.hero {
  background-color: var(--color-bg);
  font-family: var(--font-heading);
  padding: var(--spacing-xl) var(--spacing-md);
  max-width: var(--container-max-width);
}

.ctaButton {
  background-color: var(--color-primary);
  border-radius: var(--border-radius-sm);
  transition: background-color var(--transition-base);
}

.ctaButton:hover {
  background-color: var(--color-primary-dark);
}
```

### Patrón de animaciones CSS con ScrollReveal

Las animaciones se definen en `ScrollReveal.module.css` como estados inicial y final. La clase `.visible` se aplica cuando `isVisible === true`.

```css
/* src/components/common/ScrollReveal.module.css */

.scrollReveal {
  /* Estado inicial — elemento invisible */
  opacity: 0;
  transition:
    opacity var(--transition-slow),
    transform var(--transition-slow);
}

/* Animación hacia arriba */
.fadeUp {
  transform: translateY(40px);
}

/* Animación desde la izquierda */
.fadeLeft {
  transform: translateX(-40px);
}

/* Animación desde la derecha */
.fadeRight {
  transform: translateX(40px);
}

/* Solo opacidad */
.fadeIn {
  transform: none;
}

/* Estado final — elemento visible */
.visible {
  opacity: 1;
  transform: translate(0, 0);
}

/* Cuando prefers-reduced-motion está activo, isVisible = true desde el inicio,
   por lo que este bloque solo es un fallback de seguridad */
@media (prefers-reduced-motion: reduce) {
  .scrollReveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

### Orden de imports en archivos `.jsx`

```jsx
// 1. React y hooks de React
import { useState, useEffect } from 'react';

// 2. Librerías de terceros (React Router, etc.)
import { Link, useNavigate } from 'react-router-dom';

// 3. Hooks personalizados
import useScrollReveal from '../../hooks/useScrollReveal.js';

// 4. Componentes propios
import ImagePlaceholder from '../common/ImagePlaceholder.jsx';
import ScrollReveal from '../common/ScrollReveal.jsx';

// 5. Estilos (siempre al final)
import styles from './RoomCard.module.css';
```
