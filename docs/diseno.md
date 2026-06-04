# Aurea Vita — Documento de Diseño UI/UX
**Fuente de verdad para la implementación de estilos**
Versión: 1.0 | Fecha: 2026-06-03

---

## 1. Variables CSS (`:root`)

```css
:root {
  /* ─── COLORES ─── */

  /* Fondos */
  --color-background-primary:   rgb(245, 241, 236); /* Marfil */
  --color-background-secondary: rgb(232, 225, 217); /* Arena cálida */

  /* Acentos / Marca */
  --color-accent:        rgb(198, 168, 125); /* Dorado suave — CTA, logo, líneas decorativas */
  --color-accent-hover:  rgb(213, 186, 147); /* Dorado más claro para hover */
  --color-accent-muted:  rgb(163, 181, 160); /* Verde salvia — elementos secundarios, tarjetas */
  --color-accent-strong: rgb(122, 143, 124); /* Verde oliva suave — hovers, detalles */

  /* Texto */
  --color-text-main:      rgb(31, 58, 68);  /* Azul marino profundo */
  --color-text-secondary: rgb(110, 110, 110); /* Gris piedra */
  --color-text-on-dark:   rgb(245, 241, 236); /* Marfil sobre fondos oscuros */
  --color-text-accent:    rgb(198, 168, 125); /* Dorado sobre fondos oscuros */

  /* Componentes */
  --color-navy:        rgb(31, 58, 68);   /* Header, footer, elementos oscuros */
  --color-navy-90:     rgba(31, 58, 68, 0.90); /* Header scrolled con ligera transparencia */
  --color-navy-70:     rgba(31, 58, 68, 0.70); /* Overlay sobre imágenes */
  --color-card-bg:     rgb(232, 225, 217); /* Fondo tarjetas sobre secciones marfil */
  --color-border:      rgba(198, 168, 125, 0.30); /* Borde sutil dorado */
  --color-border-muted: rgba(110, 110, 110, 0.20); /* Borde gris muy sutil */

  /* ─── TIPOGRAFÍA ─── */

  /* Familias */
  --font-heading: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  --font-body:    'Inter', system-ui, -apple-system, sans-serif;

  /* Escala (base 16px) */
  --font-size-xs:      0.75rem;   /* 12px */
  --font-size-sm:      0.875rem;  /* 14px */
  --font-size-base:    1rem;      /* 16px */
  --font-size-md:      1.125rem;  /* 18px */
  --font-size-lg:      1.25rem;   /* 20px */
  --font-size-xl:      1.5rem;    /* 24px */
  --font-size-2xl:     1.875rem;  /* 30px */
  --font-size-3xl:     2.25rem;   /* 36px */
  --font-size-4xl:     3rem;      /* 48px */
  --font-size-5xl:     3.75rem;   /* 60px */
  --font-size-display: 5rem;      /* 80px — H1 del hero */

  /* Pesos */
  --font-weight-light:   300;
  --font-weight-regular: 400;
  --font-weight-medium:  500;
  --font-weight-semibold: 600;
  --font-weight-bold:    700;

  /* Interlineado */
  --line-height-tight:   1.1;
  --line-height-snug:    1.25;
  --line-height-normal:  1.5;
  --line-height-relaxed: 1.75;

  /* Espaciado entre letras */
  --letter-spacing-tight:  -0.02em;
  --letter-spacing-normal:  0;
  --letter-spacing-wide:    0.05em;
  --letter-spacing-wider:   0.1em;
  --letter-spacing-widest:  0.15em;

  /* ─── ESPACIADOS (base 4px) ─── */
  --spacing-1:  0.25rem;   /*  4px */
  --spacing-2:  0.5rem;    /*  8px */
  --spacing-3:  0.75rem;   /* 12px */
  --spacing-4:  1rem;      /* 16px */
  --spacing-5:  1.25rem;   /* 20px */
  --spacing-6:  1.5rem;    /* 24px */
  --spacing-8:  2rem;      /* 32px */
  --spacing-10: 2.5rem;    /* 40px */
  --spacing-12: 3rem;      /* 48px */
  --spacing-14: 3.5rem;    /* 56px */
  --spacing-16: 4rem;      /* 64px */
  --spacing-20: 5rem;      /* 80px */
  --spacing-24: 6rem;      /* 96px */
  --spacing-32: 8rem;      /* 128px */

  /* ─── RADIOS DE BORDE ─── */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-full: 9999px;

  /* ─── SOMBRAS ─── */
  --shadow-sm:   0 1px 3px rgba(31, 58, 68, 0.08), 0 1px 2px rgba(31, 58, 68, 0.04);
  --shadow-md:   0 4px 12px rgba(31, 58, 68, 0.10), 0 2px 6px rgba(31, 58, 68, 0.06);
  --shadow-lg:   0 10px 30px rgba(31, 58, 68, 0.14), 0 4px 12px rgba(31, 58, 68, 0.08);
  --shadow-card: 0 2px 8px rgba(31, 58, 68, 0.08), 0 0 0 1px rgba(198, 168, 125, 0.12);
  --shadow-glow: 0 0 20px rgba(198, 168, 125, 0.25); /* Hover dorado */

  /* ─── TRANSICIONES ─── */
  --transition-fast:   150ms ease-out;
  --transition-base:   300ms ease-out;
  --transition-slow:   600ms ease-out;
  --transition-spring: 400ms cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ─── LAYOUT ─── */
  --container-max:   1280px;
  --container-prose: 720px;
  --header-height:   72px;
  --section-padding-y: var(--spacing-24);
}
```

---

## 2. Importación de Google Fonts

```css
/* Colocar al inicio del archivo CSS global, antes de cualquier otra regla */

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');
```

**Alternativa con preconnect en el `<head>` de HTML (recomendada para performance):**

```html
<!-- En el <head>, antes del stylesheet principal -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
  href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap"
  rel="stylesheet"
>
```

---

## 3. Wireframes Textuales por Sección

### 3.1 Header (Sticky) — Orden: 1

**Comportamiento:** Posición `fixed`, `z-index: 1000`. Inicialmente transparente sobre el Hero. Al hacer scroll >80px, añade clase `.scrolled` que aplica `background: var(--color-navy-90)` con `backdrop-filter: blur(8px)`.

```
DESKTOP (≥1024px):
┌────────────────────────────────────────────────────────────────────────────────┐
│  [Logo: "Aurea Vita"]        Habitaciones · Experiencias · Nosotros · Contacto  [Reservar habitación]  │
│  Cormorant Garamond          Inter 13px, uppercase, letter-spacing: 0.1em       Btn dorado              │
└────────────────────────────────────────────────────────────────────────────────┘
Altura: 72px | Padding horizontal: 40px | Fondo: transparente → navy-90 al scroll

TABLET (768px–1023px):
┌─────────────────────────────────────────────────┐
│  [Aurea Vita]       Hab. · Exp. · Nos.  [Reservar] │
└─────────────────────────────────────────────────┘
Links abreviados | Botón "Reservar" sin "habitación"

MÓVIL (<768px):
┌──────────────────────────────┐
│  [Aurea Vita]             ☰  │
└──────────────────────────────┘
☰ abre menú fullscreen overlay navy-90:
┌──────────────────────────────┐
│  [Aurea Vita]             ✕  │
│                              │
│      Habitaciones            │
│      Experiencias            │
│      Nosotros                │
│      Contacto                │
│                              │
│   [Reservar habitación]      │
└──────────────────────────────┘
```

**Fondo:** `transparent` inicial → `var(--color-navy-90)` con `.scrolled`

---

### 3.2 Hero (100vh) — Orden: 2

**Descripción:** Sección de pantalla completa con imagen de fondo (ImagePlaceholder que cubre todo), overlay oscuro, y texto centrado.

```
DESKTOP (≥1024px):
┌────────────────────────────────────────────────────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░  [ImagePlaceholder: Vista panorámica del hotel — 100vw × 100vh]   ░░│
│░░                                                                    ░░│
│░░              ──── Aurea Vita ────                                  ░░│
│░░         (línea dorada decorativa, 60px, centrada)                  ░░│
│░░                                                                    ░░│
│░░    "Donde la naturaleza abraza el lujo"                            ░░│
│░░    (H1 display, Cormorant Garamond, 5rem, marfil)                  ░░│
│░░                                                                    ░░│
│░░    "Un retiro boutique diseñado para quienes buscan               ░░│
│░░     la excelencia en cada detalle."                                ░░│
│░░    (Párrafo, Inter 1.125rem, color-text-on-dark, max-w 560px)     ░░│
│░░                                                                    ░░│
│░░    [Descubrir experiencias]    [Ver habitaciones]                  ░░│
│░░    (CTA dorado, 52px alto)     (outline marfil)                   ░░│
│░░                                                                    ░░│
│░░                    ↓ scroll indicator animado                      ░░│
└────────────────────────────────────────────────────────────────────────┘
Layout: flex, align-items: center, justify-content: center, flex-direction: column
Contenido: text-align center, max-width 800px, padding: 0 var(--spacing-8)
Overlay: ::before con background navy-70

MÓVIL (<768px):
┌──────────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░ [ImagePlaceholder 100vh] ░░│
│░░                           ░░│
│░░   ─ Aurea Vita ─          ░░│
│░░                           ░░│
│░░  "Donde la naturaleza     ░░│
│░░   abraza el lujo"         ░░│
│░░  (H1: 2.5rem)             ░░│
│░░                           ░░│
│░░  "Un retiro boutique..."  ░░│
│░░  (0.9375rem)              ░░│
│░░                           ░░│
│░░  [Descubrir experiencias] ░░│
│░░  [Ver habitaciones]       ░░│
│░░  (botones full-width)     ░░│
└──────────────────────────────┘
```

**Fondo de sección:** `var(--color-navy)` (la ImagePlaceholder cubre todo)

---

### 3.3 Rooms — Habitaciones (Orden: 3)

**Descripción:** 3 tarjetas de habitaciones en grid. Incluye imagen, nombre, descripción breve, precio y botón.

```
DESKTOP (≥1024px):
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│              Nuestras Habitaciones                                     │
│         ────────────────────────                                       │
│    "Cada espacio diseñado para tu máximo confort"                      │
│                                                                        │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐    │
│  │ [ImgPlaceholder] │  │ [ImgPlaceholder] │  │ [ImgPlaceholder] │    │
│  │ 3:2 aspect ratio │  │ 3:2 aspect ratio │  │ 3:2 aspect ratio │    │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤    │
│  │  Suite Jardin    │  │  Suite Bosque    │  │  Villa Privada   │    │
│  │  ─────────────   │  │  ─────────────   │  │  ─────────────   │    │
│  │  Descripción de  │  │  Descripción de  │  │  Descripción de  │    │
│  │  la habitación   │  │  la habitación   │  │  la habitación   │    │
│  │  en 2–3 líneas.  │  │  en 2–3 líneas.  │  │  en 2–3 líneas.  │    │
│  │                  │  │                  │  │                  │    │
│  │  DESDE           │  │  DESDE           │  │  DESDE           │    │
│  │  $2,800 / noche  │  │  $3,500 / noche  │  │  $6,200 / noche  │    │
│  │                  │  │                  │  │                  │    │
│  │  [Ver detalles]  │  │  [Ver detalles]  │  │  [Ver detalles]  │    │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘    │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
Grid: grid-template-columns: repeat(3, 1fr), gap: var(--spacing-8)
Padding sección: var(--spacing-24) var(--spacing-8)

TABLET (768px–1023px):
Grid: repeat(2, 1fr) — la tercera tarjeta centrada en fila propia
  ┌──────────┐  ┌──────────┐
  │  Card 1  │  │  Card 2  │
  └──────────┘  └──────────┘
      ┌──────────────────┐
      │      Card 3      │
      └──────────────────┘

MÓVIL (<768px):
┌──────────────────────────────┐
│  Nuestras Habitaciones       │
│  ─────────────────           │
│  "Cada espacio..."           │
│                              │
│  ┌────────────────────────┐  │
│  │    [ImgPlaceholder]    │  │
│  │    Suite Jardin        │  │
│  │    Descripción...      │  │
│  │    DESDE $2,800/noche  │  │
│  │    [Ver detalles]      │  │
│  └────────────────────────┘  │
│  (scroll → Card 2, Card 3)   │
└──────────────────────────────┘
Grid: 1 columna | Cards en scroll vertical
```

**Fondo de sección:** `var(--color-background-primary)` (Marfil)

---

### 3.4 Experiences — Amenidades (Orden: 4)

**Descripción:** 4 amenidades/experiencias en grid 2×2. Cada tarjeta tiene imagen cuadrada 1:1, ícono, título y descripción corta.

```
DESKTOP (≥1024px):
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│                  Experiencias Aurea Vita                               │
│              ────────────────────────────                              │
│         "Vive momentos únicos diseñados para ti"                       │
│                                                                        │
│  ┌──────────────────────────┐   ┌──────────────────────────┐          │
│  │  [ImgPlaceholder 1:1]   │   │  [ImgPlaceholder 1:1]   │          │
│  │  ✦ Spa & Bienestar       │   │  ✦ Gastronomía de Autor  │          │
│  │  Relájate con nuestros   │   │  Sabores únicos creados  │          │
│  │  tratamientos exclusivos │   │  por nuestro chef.       │          │
│  └──────────────────────────┘   └──────────────────────────┘          │
│                                                                        │
│  ┌──────────────────────────┐   ┌──────────────────────────┐          │
│  │  [ImgPlaceholder 1:1]   │   │  [ImgPlaceholder 1:1]   │          │
│  │  ✦ Senderismo Natural    │   │  ✦ Yoga & Meditación     │          │
│  │  Explora senderos con    │   │  Clases guiadas en       │          │
│  │  guías especializados.   │   │  entornos naturales.     │          │
│  └──────────────────────────┘   └──────────────────────────┘          │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
Grid: repeat(2, 1fr), gap: var(--spacing-6)
Tarjeta: overflow hidden, imagen cubre la mitad superior, texto en la mitad inferior

MÓVIL (<768px):
┌──────────────────────────────┐
│   Experiencias Aurea Vita    │
│   ────────────────────       │
│                              │
│  ┌────────────────────────┐  │
│  │  [ImgPlaceholder 1:1]  │  │
│  │  ✦ Spa & Bienestar     │  │
│  │  Descripción...        │  │
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │  [ImgPlaceholder 1:1]  │  │
│  │  ✦ Gastronomía...      │  │
│  └────────────────────────┘  │
│  ... (4 tarjetas apiladas)   │
└──────────────────────────────┘
Grid: 1 columna en mobile, 2 columnas en tablet
```

**Fondo de sección:** `var(--color-background-secondary)` (Arena cálida)

---

### 3.5 About — Nosotros (Orden: 5)

**Descripción:** Layout de 2 columnas — texto a la izquierda, imagen a la derecha (o invertido en alternancia).

```
DESKTOP (≥1024px):
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  ┌────────────────────────────┐   ┌────────────────────────────────┐  │
│  │                            │   │                                │  │
│  │  Nuestra Historia          │   │  [ImagePlaceholder             │  │
│  │  ───────────────           │   │   4:3 aspect ratio             │  │
│  │                            │   │   "Interior del hotel          │  │
│  │  Aurea Vita nació de la    │   │    lobby principal"]           │  │
│  │  visión de crear un        │   │                                │  │
│  │  refugio donde el          │   │                                │  │
│  │  diseño contemporáneo      │   │                                │  │
│  │  dialoga con la            │   │                                │  │
│  │  naturaleza...             │   │                                │  │
│  │                            │   └────────────────────────────────┘  │
│  │  [Conoce más →]            │                                        │
│  │  (link dorado con flecha)  │                                        │
│  │                            │                                        │
│  └────────────────────────────┘                                        │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
Grid: 50% texto + 50% imagen, gap: var(--spacing-16), align-items: center

MÓVIL (<768px):
┌──────────────────────────────┐
│  [ImagePlaceholder 4:3]      │
│  (imagen primero en móvil)   │
│                              │
│  Nuestra Historia            │
│  ─────────────────           │
│  Aurea Vita nació de...      │
│                              │
│  [Conoce más →]              │
└──────────────────────────────┘
Imagen arriba, texto abajo | Imagen: border-radius var(--radius-lg)
```

**Fondo de sección:** `var(--color-background-primary)` (Marfil)

---

### 3.6 Contact — Contacto (Orden: 6)

**Descripción:** Datos de contacto a la izquierda, mapa placeholder a la derecha. Fondo oscuro para contraste.

```
DESKTOP (≥1024px):
┌────────────────────────────────────────────────────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░  (Fondo: var(--color-navy))                                        ░░│
│░░                                                                    ░░│
│░░  ┌──────────────────────────────┐  ┌────────────────────────────┐ ░░│
│░░  │ Encuéntranos                 │  │ [MapPlaceholder            │ ░░│
│░░  │ ─────────────                │  │  arena cálida + texto      │ ░░│
│░░  │                              │  │  "Ubicación del hotel"     │ ░░│
│░░  │ 📍 Carretera Escénica km 28  │  │  400px alto               │ ░░│
│░░  │    Sierra Norte, Oaxaca      │  │  border-radius: --radius-lg│ ░░│
│░░  │                              │  │  border: 1px --color-border│ ░░│
│░░  │ 📞 +52 (951) 234-5678        │  └────────────────────────────┘ ░░│
│░░  │                              │                                  ░░│
│░░  │ ✉  hola@aureavita.mx         │                                  ░░│
│░░  │                              │                                  ░░│
│░░  │ 🕐 Check-in: 15:00           │                                  ░░│
│░░  │    Check-out: 12:00          │                                  ░░│
│░░  │                              │                                  ░░│
│░░  │  [Reservar ahora]            │                                  ░░│
│░░  │  (CTA dorado, full-width)    │                                  ░░│
│░░  └──────────────────────────────┘                                  ░░│
│░░                                                                    ░░│
└────────────────────────────────────────────────────────────────────────┘
Grid: 45% datos + 55% mapa, gap: var(--spacing-12)
Colores de texto: var(--color-text-on-dark) y var(--color-text-accent)

MÓVIL (<768px):
┌──────────────────────────────┐
│  (Fondo navy)                │
│                              │
│  Encuéntranos                │
│  ─────────────               │
│                              │
│  📍 Carretera Escénica...    │
│  📞 +52 (951) 234-5678       │
│  ✉  hola@aureavita.mx        │
│  🕐 Check-in: 15:00          │
│                              │
│  [Reservar ahora]            │
│                              │
│  [MapPlaceholder 250px alto] │
│  (mapa debajo de los datos)  │
└──────────────────────────────┘
```

**Fondo de sección:** `var(--color-navy)`

---

### 3.7 Footer (Orden: 7)

**Descripción:** Footer completo con logo, links, redes sociales y copyright.

```
DESKTOP (≥1024px):
┌────────────────────────────────────────────────────────────────────────┐
│  (Fondo: #0d1f25 — navy más oscuro, o var(--color-navy))              │
│                                                                        │
│  ┌──────────────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  Aurea Vita      │  │ Hotel    │  │ Legal    │  │ Síguenos     │  │
│  │  (logo+tagline)  │  │          │  │          │  │              │  │
│  │                  │  │Habitacio │  │ Privacid.│  │  [IG] [FB]   │  │
│  │  "Un refugio     │  │Experienc.│  │ Términos │  │  [TW] [YT]   │  │
│  │   diseñado para  │  │Nosotros  │  │ Cookies  │  │              │  │
│  │   tu descanso."  │  │Contacto  │  │          │  │  Newsletter: │  │
│  │                  │  │          │  │          │  │  [Email___]  │  │
│  │                  │  │          │  │          │  │  [Suscribir] │  │
│  └──────────────────┘  └──────────┘  └──────────┘  └──────────────┘  │
│                                                                        │
│  ─────────────────────────────────────────────────────────────────── │
│  © 2026 Aurea Vita. Todos los derechos reservados.    Hecho con ♥    │
└────────────────────────────────────────────────────────────────────────┘
Grid: 2fr 1fr 1fr 1.5fr | gap: var(--spacing-10)

MÓVIL (<768px):
┌──────────────────────────────┐
│  Aurea Vita                  │
│  "Un refugio diseñado..."    │
│                              │
│  Hotel                       │
│  Habitaciones · Experiencias │
│  Nosotros · Contacto         │
│                              │
│  [IG]  [FB]  [TW]  [YT]     │
│                              │
│  [Email_____________] [→]    │
│                              │
│  ──────────────────────────  │
│  © 2026 Aurea Vita           │
└──────────────────────────────┘
Stack vertical | Alineado a la izquierda
```

**Fondo de sección:** `rgb(20, 38, 46)` (navy más oscuro que el header)

---

### 3.8 Página `/reservar` — En Construcción (Orden: Página independiente)

**Descripción:** Página separada accesible desde el botón "Reservar habitación". Muestra estado "en construcción" con elegancia.

```
DESKTOP (≥1024px):
┌────────────────────────────────────────────────────────────────────────┐
│  [Header igual al principal, en modo scrolled desde el inicio]        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░  (Fondo: var(--color-background-secondary), min-height: 80vh)     ░░│
│░░                                                                    ░░│
│░░           ✦                                                        ░░│
│░░    (ícono decorativo dorado, 48px)                                 ░░│
│░░                                                                    ░░│
│░░          Reservaciones                                             ░░│
│░░         ───────────────                                            ░░│
│░░    (H1: Cormorant Garamond, 3rem, navy)                           ░░│
│░░                                                                    ░░│
│░░    "Estamos preparando algo extraordinario."                       ░░│
│░░    (Inter, 1.125rem, gris piedra, max-width: 480px, centrado)     ░░│
│░░                                                                    ░░│
│░░    "Nuestra plataforma de reservas estará disponible pronto.       ░░│
│░░     Mientras tanto, contáctanos directamente."                     ░░│
│░░                                                                    ░░│
│░░    ┌─────────────────────────────────────────────────────────┐    ░░│
│░░    │  📞 +52 (951) 234-5678     ✉ hola@aureavita.mx          │    ░░│
│░░    │  (tarjeta con fondo marfil, border dorado, padding 24px) │    ░░│
│░░    └─────────────────────────────────────────────────────────┘    ░░│
│░░                                                                    ░░│
│░░    [← Volver al inicio]                                           ░░│
│░░    (link outline navy)                                             ░░│
│░░                                                                    ░░│
└────────────────────────────────────────────────────────────────────────┘

MÓVIL (<768px):
┌──────────────────────────────┐
│  [Header]                    │
│                              │
│  ✦                           │
│                              │
│  Reservaciones               │
│  ──────────────              │
│                              │
│  "Estamos preparando algo    │
│  extraordinario."            │
│                              │
│  "Nuestra plataforma..."     │
│                              │
│  ┌──────────────────────┐    │
│  │ 📞 +52 (951) 234-5678│    │
│  │ ✉ hola@aureavita.mx  │    │
│  └──────────────────────┘    │
│                              │
│  [← Volver al inicio]        │
└──────────────────────────────┘
```

**Fondo de sección:** `var(--color-background-secondary)` (Arena cálida)

---

## 4. Especificaciones de Animaciones

### 4.1 Animaciones de Scroll (IntersectionObserver)

```css
/* ─── CLASES BASE DE REVEAL ─── */

/* Estado inicial (antes de ser visible) */
.reveal {
  opacity: 0;
  will-change: opacity, transform;
}

/* Estado visible (clase añadida por JS con IntersectionObserver) */
.reveal.visible {
  opacity: 1;
}

/* ─── VARIANTE: fade-up (por defecto) ─── */
.reveal {
  transform: translateY(30px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
}
.reveal.visible {
  transform: translateY(0);
}

/* ─── VARIANTE: fade-in (solo opacidad) ─── */
.reveal.fade-in {
  transform: none;
  transition: opacity 0.5s ease-out;
}
.reveal.fade-in.visible {
  opacity: 1;
}

/* ─── VARIANTE: slide-in-left ─── */
.reveal.slide-in-left {
  transform: translateX(-40px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
}
.reveal.slide-in-left.visible {
  transform: translateX(0);
}

/* ─── VARIANTE: slide-in-right ─── */
.reveal.slide-in-right {
  transform: translateX(40px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
}
.reveal.slide-in-right.visible {
  transform: translateX(0);
}

/* ─── DELAYS ESCALONADOS (para grids con múltiples items) ─── */
.reveal:nth-child(1) { transition-delay: 0ms;   }
.reveal:nth-child(2) { transition-delay: 100ms; }
.reveal:nth-child(3) { transition-delay: 200ms; }
.reveal:nth-child(4) { transition-delay: 300ms; }
```

**Implementación JavaScript con IntersectionObserver:**

```javascript
// Configuración del observer
const observerOptions = {
  threshold: 0.15,        // Se activa cuando el 15% del elemento es visible
  rootMargin: '0px 0px -50px 0px' // Margen inferior negativo para activar antes del borde
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Solo anima una vez
    }
  });
}, observerOptions);

// Observar todos los elementos con clase .reveal
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

---

### 4.2 Scroll Suave

```css
/* En el selector global */
html {
  scroll-behavior: smooth;
}

/* Compensar el header sticky en anclas internas */
:target {
  scroll-margin-top: calc(var(--header-height) + var(--spacing-4));
}
```

**Estructura de anclas en el HTML:**
```html
<!-- Header nav -->
<a href="#habitaciones">Habitaciones</a>
<a href="#experiencias">Experiencias</a>
<a href="#nosotros">Nosotros</a>
<a href="#contacto">Contacto</a>

<!-- Secciones -->
<section id="habitaciones">...</section>
<section id="experiencias">...</section>
<section id="nosotros">...</section>
<section id="contacto">...</section>
```

---

### 4.3 Micro-interacciones Hover

```css
/* ─── BOTÓN CTA DORADO ─── */
.btn-primary {
  background-color: var(--color-accent);           /* rgb(198, 168, 125) */
  color: var(--color-navy);
  padding: 0 var(--spacing-8);
  height: 52px;
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-wider);
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition:
    background-color var(--transition-base),
    transform var(--transition-fast),
    box-shadow var(--transition-base);
}

.btn-primary:hover {
  background-color: var(--color-accent-hover);     /* Dorado más claro */
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);                  /* 0 0 20px rgba(198, 168, 125, 0.25) */
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: none;
}

/* ─── BOTÓN SECUNDARIO OUTLINE ─── */
.btn-secondary {
  background-color: transparent;
  color: var(--color-text-on-dark);                /* Marfil */
  padding: 0 var(--spacing-8);
  height: 52px;
  border-radius: var(--radius-sm);
  border: 1.5px solid rgba(245, 241, 236, 0.6);   /* Marfil semitransparente */
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-wider);
  text-transform: uppercase;
  cursor: pointer;
  transition:
    border-color var(--transition-base),
    background-color var(--transition-base),
    transform var(--transition-fast);
}

.btn-secondary:hover {
  border-color: var(--color-text-on-dark);         /* Marfil opaco */
  background-color: rgba(245, 241, 236, 0.08);
  transform: translateY(-2px);
}

/* ─── ROOM CARD ─── */
.room-card {
  background-color: var(--color-card-bg);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base);
}

.room-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}

/* ─── EXPERIENCE CARD ─── */
.experience-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base);
}

.experience-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

/* ─── LINKS DE NAVEGACIÓN (underline animado con ::after) ─── */
.nav-link {
  position: relative;
  font-family: var(--font-body);
  font-size: var(--font-size-xs);            /* 12px */
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-widest);
  text-transform: uppercase;
  color: var(--color-text-on-dark);
  text-decoration: none;
  padding-bottom: var(--spacing-1);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 1px;
  background-color: var(--color-accent);
  transition: width var(--transition-base);
}

.nav-link:hover::after {
  width: 100%;
}

/* ─── IMAGE PLACEHOLDER HOVER ─── */
.image-placeholder {
  position: relative;
  overflow: hidden;
}

.image-placeholder::after {
  content: '';
  position: absolute;
  inset: 0;
  background-color: var(--color-navy-70);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.image-placeholder:hover::after {
  opacity: 0.25;                            /* Overlay sutil al hover */
}

/* Zoom sutil en la imagen de fondo al hover */
.image-placeholder .img-inner {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.8s ease-out;
}

.image-placeholder:hover .img-inner {
  transform: scale(1.04);
}
```

---

### 4.4 `prefers-reduced-motion`

```css
/* Bloque que elimina o reduce animaciones para usuarios con esa preferencia */
@media (prefers-reduced-motion: reduce) {
  /* Eliminar scroll suave */
  html {
    scroll-behavior: auto;
  }

  /* Eliminar transiciones en reveal */
  .reveal,
  .reveal.fade-in,
  .reveal.slide-in-left,
  .reveal.slide-in-right {
    opacity: 1;
    transform: none;
    transition: none;
  }

  /* Eliminar transiciones en componentes interactivos */
  .btn-primary,
  .btn-secondary,
  .room-card,
  .experience-card,
  .nav-link::after,
  .image-placeholder::after,
  .image-placeholder .img-inner {
    transition: none;
    animation: none;
  }

  /* Eliminar transform en hover (mantener feedback visual solo con color) */
  .btn-primary:hover,
  .btn-secondary:hover,
  .room-card:hover,
  .experience-card:hover {
    transform: none;
    box-shadow: var(--shadow-md); /* Solo sombra, sin movimiento */
  }

  /* Eliminar zoom en imágenes */
  .image-placeholder:hover .img-inner {
    transform: none;
  }
}
```

---

## 5. Diseño del Componente `ImagePlaceholder`

### 5.1 Especificaciones por Contexto

| Contexto           | Dimensiones / Aspect Ratio     | Gradiente de fondo                                                 |
|--------------------|--------------------------------|--------------------------------------------------------------------|
| Hero               | `width: 100vw; height: 100vh`  | `linear-gradient(135deg, rgb(31, 58, 68) 0%, rgb(122, 143, 124) 100%)` |
| Room Card          | `aspect-ratio: 3/2`            | `linear-gradient(145deg, rgb(232, 225, 217) 0%, rgb(163, 181, 160) 100%)` |
| Experience Card    | `aspect-ratio: 1/1`            | `linear-gradient(145deg, rgb(163, 181, 160) 0%, rgb(122, 143, 124) 100%)` |
| About (texto+img)  | `aspect-ratio: 4/3`            | `linear-gradient(135deg, rgb(232, 225, 217) 0%, rgb(198, 168, 125) 70%)` |
| Footer/background  | `width: 100%; height: 300px`   | `linear-gradient(180deg, rgb(31, 58, 68) 0%, rgb(20, 38, 46) 100%)` |
| Map Placeholder    | `width: 100%; height: 400px`   | `linear-gradient(145deg, rgb(232, 225, 217) 0%, rgb(163, 181, 160) 100%)` |

### 5.2 CSS del Componente

```css
.image-placeholder {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);           /* rgba(198, 168, 125, 0.30) */
  background: linear-gradient(
    145deg,
    var(--color-background-secondary) 0%,
    var(--color-accent-muted) 100%
  );
}

/* Variante Hero — sin border-radius, sin border */
.image-placeholder--hero {
  border: none;
  border-radius: 0;
  width: 100%;
  height: 100%;
}

/* Variante Room Card */
.image-placeholder--room {
  aspect-ratio: 3 / 2;
  background: linear-gradient(
    145deg,
    rgb(232, 225, 217) 0%,
    rgb(163, 181, 160) 100%
  );
}

/* Variante Experience Card */
.image-placeholder--experience {
  aspect-ratio: 1 / 1;
  background: linear-gradient(
    145deg,
    rgb(163, 181, 160) 0%,
    rgb(122, 143, 124) 100%
  );
}

/* Variante About */
.image-placeholder--about {
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-lg);
  background: linear-gradient(
    135deg,
    rgb(232, 225, 217) 0%,
    rgb(198, 168, 125) 70%
  );
}

/* Variante Map */
.image-placeholder--map {
  width: 100%;
  height: 400px;
  border-radius: var(--radius-lg);
  background: linear-gradient(
    145deg,
    rgb(232, 225, 217) 0%,
    rgb(163, 181, 160) 100%
  );
}

/* ─── CONTENIDO INTERNO ─── */
.image-placeholder__content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-3);
  padding: var(--spacing-4);
}

/* Ícono de cámara */
.image-placeholder__icon {
  font-size: 2rem;                          /* 32px */
  opacity: 0.35;
  color: var(--color-navy);
  line-height: 1;
}

/* Texto descriptivo */
.image-placeholder__label {
  font-family: var(--font-body);
  font-size: var(--font-size-xs);           /* 12px */
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-wider);
  text-transform: uppercase;
  color: var(--color-text-main);
  opacity: 0.45;
  text-align: center;
  max-width: 200px;
  line-height: var(--line-height-normal);
}

/* En hero, texto en marfil */
.image-placeholder--hero .image-placeholder__label,
.image-placeholder--hero .image-placeholder__icon {
  color: var(--color-text-on-dark);
  opacity: 0.50;
}
```

### 5.3 Comportamiento Responsive

```css
/* Room cards en tablet: mantiene aspect-ratio, ajusta tamaño automáticamente */
@media (max-width: 1023px) {
  .image-placeholder--room {
    aspect-ratio: 3 / 2; /* Se mantiene */
    width: 100%;
  }
}

/* Map placeholder en móvil: altura reducida */
@media (max-width: 767px) {
  .image-placeholder--map {
    height: 250px;
  }

  .image-placeholder--about {
    aspect-ratio: 16 / 9; /* Más apaisado en móvil para no dominar */
    border-radius: var(--radius-md);
  }
}
```

---

## 6. Diseño del Header

### 6.1 Especificaciones Completas

```css
/* ─── HEADER BASE ─── */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: var(--header-height);              /* 72px */
  padding: 0 var(--spacing-10);              /* 0 40px */
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  transition:
    background-color var(--transition-slow),
    backdrop-filter var(--transition-slow);
}

/* Estado al hacer scroll */
.header.scrolled {
  background-color: var(--color-navy-90);    /* rgba(31, 58, 68, 0.90) */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 1px 0 rgba(198, 168, 125, 0.15);
}

/* ─── LOGO ─── */
.header__logo {
  font-family: var(--font-heading);
  font-size: 1.8rem;                         /* ~29px */
  font-weight: var(--font-weight-light);     /* 300 — elegante y refinado */
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-accent);               /* Dorado suave */
  text-decoration: none;
  line-height: 1;
  /* Separador decorativo entre palabras: "Aurea · Vita" es opcional */
}

/* ─── NAVEGACIÓN ─── */
.header__nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);                     /* 32px entre links */
}

.header__nav-link {
  font-family: var(--font-body);
  font-size: 0.6875rem;                      /* 11px — muy pequeño y elegante */
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-on-dark);          /* Marfil */
  text-decoration: none;
  position: relative;
  padding-bottom: 2px;
  opacity: 0.85;
  transition: opacity var(--transition-fast);
}

.header__nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 1px;
  background-color: var(--color-accent);
  transition: width var(--transition-base);
}

.header__nav-link:hover {
  opacity: 1;
}

.header__nav-link:hover::after {
  width: 100%;
}

/* ─── BOTÓN RESERVAR ─── */
.header__cta {
  background-color: var(--color-accent);    /* Dorado suave */
  color: var(--color-navy);                 /* Azul marino sobre dorado */
  height: 42px;
  padding: 0 var(--spacing-6);
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 0.6875rem;                     /* 11px */
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition:
    background-color var(--transition-base),
    box-shadow var(--transition-base),
    transform var(--transition-fast);
}

.header__cta:hover {
  background-color: var(--color-accent-hover);
  box-shadow: 0 0 16px rgba(198, 168, 125, 0.40);
  transform: translateY(-1px);
}

/* ─── HAMBURGER (Mobile) ─── */
.header__hamburger {
  display: none;                            /* Visible solo en mobile */
  flex-direction: column;
  gap: 5px;
  width: 28px;
  cursor: pointer;
  padding: var(--spacing-2);
  background: none;
  border: none;
}

.header__hamburger span {
  display: block;
  height: 1.5px;
  background-color: var(--color-text-on-dark);
  transition:
    transform var(--transition-base),
    opacity var(--transition-fast);
}

/* Hamburger → X cuando menú está abierto */
.header__hamburger.open span:nth-child(1) {
  transform: translateY(6.5px) rotate(45deg);
}
.header__hamburger.open span:nth-child(2) {
  opacity: 0;
}
.header__hamburger.open span:nth-child(3) {
  transform: translateY(-6.5px) rotate(-45deg);
}

/* ─── MENÚ MOBILE ─── */
@media (max-width: 767px) {
  .header {
    padding: 0 var(--spacing-6);            /* 0 24px en mobile */
  }

  .header__nav {
    display: none;                          /* Se muestra con JS añadiendo .open */
    position: fixed;
    inset: 0;
    background-color: var(--color-navy-90);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-8);
    z-index: 999;
  }

  .header__nav.open {
    display: flex;
  }

  .header__nav-link {
    font-size: var(--font-size-xl);         /* 24px — links grandes en overlay */
    letter-spacing: 0.08em;
    opacity: 1;
  }

  .header__cta {
    margin-top: var(--spacing-4);
    height: 52px;
    padding: 0 var(--spacing-10);
  }

  .header__hamburger {
    display: flex;
    z-index: 1001;                          /* Por encima del overlay */
  }
}
```

---

## 7. Tipografía Aplicada por Sección

### 7.1 H1 del Hero

```css
.hero__title {
  font-family: var(--font-heading);
  font-size: var(--font-size-display);      /* 5rem = 80px */
  font-weight: var(--font-weight-light);    /* 300 — elegancia serif */
  line-height: var(--line-height-tight);    /* 1.1 */
  letter-spacing: var(--letter-spacing-tight); /* -0.02em */
  color: var(--color-text-on-dark);         /* Marfil */
  text-align: center;
  max-width: 820px;
}

/* Tablet */
@media (max-width: 1023px) {
  .hero__title {
    font-size: var(--font-size-4xl);        /* 3rem = 48px */
  }
}

/* Mobile */
@media (max-width: 767px) {
  .hero__title {
    font-size: var(--font-size-3xl);        /* 2.25rem = 36px */
    letter-spacing: -0.01em;
  }
}
```

### 7.2 H2 de Sección (Títulos de Secciones)

```css
.section__title {
  font-family: var(--font-heading);
  font-size: var(--font-size-4xl);          /* 3rem = 48px */
  font-weight: var(--font-weight-regular);  /* 400 */
  line-height: var(--line-height-snug);     /* 1.25 */
  letter-spacing: var(--letter-spacing-tight); /* -0.02em */
  color: var(--color-text-main);            /* Azul marino */
  text-align: center;
  margin-bottom: var(--spacing-3);
}

/* En sección de fondo navy (Contact) — texto marfil */
.section--dark .section__title {
  color: var(--color-text-on-dark);
}

/* Línea decorativa bajo el título */
.section__title-underline {
  display: block;
  width: 48px;
  height: 1px;
  background-color: var(--color-accent);
  margin: var(--spacing-4) auto;
}

/* Subtítulo de sección */
.section__subtitle {
  font-family: var(--font-body);
  font-size: var(--font-size-md);           /* 1.125rem = 18px */
  font-weight: var(--font-weight-regular);  /* 400 */
  line-height: var(--line-height-relaxed);  /* 1.75 */
  color: var(--color-text-secondary);       /* Gris piedra */
  text-align: center;
  max-width: 520px;
  margin: 0 auto var(--spacing-12);
}

/* Mobile */
@media (max-width: 767px) {
  .section__title {
    font-size: var(--font-size-3xl);        /* 2.25rem = 36px */
  }
  .section__subtitle {
    font-size: var(--font-size-base);       /* 1rem = 16px */
    margin-bottom: var(--spacing-8);
  }
}
```

### 7.3 H3 de Tarjetas

```css
.card__title {
  font-family: var(--font-heading);
  font-size: var(--font-size-xl);           /* 1.5rem = 24px */
  font-weight: var(--font-weight-medium);   /* 500 */
  line-height: var(--line-height-snug);     /* 1.25 */
  letter-spacing: -0.01em;
  color: var(--color-text-main);
  margin-bottom: var(--spacing-2);
}

/* Línea decorativa bajo el título de la tarjeta */
.card__title-line {
  display: block;
  width: 32px;
  height: 1px;
  background-color: var(--color-accent);
  margin: var(--spacing-2) 0 var(--spacing-3);
}
```

### 7.4 Precio de Habitación

```css
.room-card__price-label {
  font-family: var(--font-body);
  font-size: var(--font-size-xs);           /* 0.75rem = 12px */
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-widest); /* 0.15em */
  text-transform: uppercase;
  color: var(--color-text-secondary);       /* Gris piedra */
  display: block;
  margin-bottom: var(--spacing-1);
}

.room-card__price-amount {
  font-family: var(--font-heading);
  font-size: var(--font-size-2xl);          /* 1.875rem = 30px */
  font-weight: var(--font-weight-semibold); /* 600 */
  line-height: 1;
  color: var(--color-text-main);
}

.room-card__price-period {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);           /* 0.875rem = 14px */
  font-weight: var(--font-weight-regular);
  color: var(--color-text-secondary);
  margin-left: var(--spacing-1);
}
```

### 7.5 Párrafos de Cuerpo

```css
/* Párrafo estándar */
.body-text {
  font-family: var(--font-body);
  font-size: var(--font-size-base);         /* 1rem = 16px */
  font-weight: var(--font-weight-regular);  /* 400 */
  line-height: var(--line-height-relaxed);  /* 1.75 */
  color: var(--color-text-secondary);       /* Gris piedra */
}

/* Párrafo en tarjeta (ligeramente más pequeño) */
.card-text {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);           /* 0.875rem = 14px */
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);   /* 1.5 */
  color: var(--color-text-secondary);
}

/* Párrafo sobre fondo oscuro */
.body-text--light {
  font-family: var(--font-body);
  font-size: var(--font-size-md);           /* 1.125rem = 18px */
  font-weight: var(--font-weight-light);    /* 300 */
  line-height: var(--line-height-relaxed);  /* 1.75 */
  color: rgba(245, 241, 236, 0.80);         /* Marfil al 80% */
}

/* Párrafo intro del hero */
.hero__subtitle {
  font-family: var(--font-body);
  font-size: var(--font-size-md);           /* 1.125rem = 18px */
  font-weight: var(--font-weight-light);    /* 300 */
  line-height: var(--line-height-relaxed);  /* 1.75 */
  color: rgba(245, 241, 236, 0.75);
  text-align: center;
  max-width: 560px;
  margin: var(--spacing-6) auto var(--spacing-8);
}

/* Mobile */
@media (max-width: 767px) {
  .hero__subtitle {
    font-size: var(--font-size-base);       /* 1rem = 16px */
  }
}
```

### 7.6 Labels y Caps

```css
/* Labels pequeños en uppercase — categorías, "DESDE", etc. */
.label-caps {
  font-family: var(--font-body);
  font-size: var(--font-size-xs);           /* 0.75rem = 12px */
  font-weight: var(--font-weight-semibold); /* 600 */
  letter-spacing: var(--letter-spacing-widest); /* 0.15em */
  text-transform: uppercase;
  color: var(--color-accent);              /* Dorado suave */
  line-height: var(--line-height-normal);
}

/* Etiqueta de sección (pre-título) — ej: "— Bienvenidos a" */
.section__eyebrow {
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-wider);
  text-transform: uppercase;
  color: var(--color-accent-strong);       /* Verde oliva suave */
  display: block;
  margin-bottom: var(--spacing-3);
  text-align: center;
}

/* Links en footer */
.footer__link {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);          /* 0.875rem = 14px */
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-relaxed);
  color: rgba(245, 241, 236, 0.60);        /* Marfil semitransparente */
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer__link:hover {
  color: var(--color-accent);              /* Dorado al hover */
}

/* Headings de columna en footer */
.footer__heading {
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-widest);
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--spacing-4);
}

/* Copyright */
.footer__copyright {
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
  color: rgba(245, 241, 236, 0.35);
  letter-spacing: 0.03em;
}
```

---

## Resumen de Valores Clave

| Token                        | Valor                      |
|------------------------------|----------------------------|
| `--color-background-primary` | `rgb(245, 241, 236)`       |
| `--color-background-secondary`| `rgb(232, 225, 217)`      |
| `--color-accent`             | `rgb(198, 168, 125)`       |
| `--color-navy`               | `rgb(31, 58, 68)`          |
| `--color-text-main`          | `rgb(31, 58, 68)`          |
| `--color-text-secondary`     | `rgb(110, 110, 110)`       |
| `--font-heading`             | `'Cormorant Garamond'`     |
| `--font-body`                | `'Inter'`                  |
| `--font-size-display`        | `5rem` (80px)              |
| `--header-height`            | `72px`                     |
| `--spacing-4`                | `1rem` (16px)              |
| `--radius-lg`                | `16px`                     |
| `--transition-base`          | `300ms ease-out`           |
| `--shadow-card`              | `0 2px 8px rgba(31,58,68,0.08), 0 0 0 1px rgba(198,168,125,0.12)` |
