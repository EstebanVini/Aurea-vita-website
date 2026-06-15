# Estado de la sesión — Aurea Vita (checkpoint 2026-06-15)

**Ronda de cambios del cliente COMPLETA.** Flujo seguido en orden estricto:
`ux-architect` (brief + D1–D4) → `ux-writer` (copy es-MX) → `ui-engineer`
(implementación) → `motion-engineer` (reajuste de motion) → `visual-designer`
(validación + correcciones) → `qa-auditor` (auditoría AA + fix P0/P1).
Build verde. `npm run dev` → http://localhost:5173/

## Ronda 15 jun 2026 — cambios del cliente

**Decisiones abiertas resueltas (ux-architect, ver `docs/brief.md` §9):**
- **D1** — `/gastronomia` se CONSERVA, sale del menú y se rebrandea a
  "Alimentación Consciente" (tarjeta Home + hero + h1 + intro + metadatos).
- **D2** — "En construcción" = bandera reversible por bloque (no borrar, no
  placeholder de página completa), mismo espíritu que `/contacto`.
- **D3** — Datos del destino (300 / 27° / 12 min) se CONSERVAN.
- **D4** — Solo se renombra la etiqueta visible "Spa"→"Wellness"; la ruta
  sigue siendo `/spa`.

**Globales:**
- G1 — Logo más grande: navbar `h-24`→`h-28` (112px), logo `h-20`→`h-24 w-24`
  (96px), altura constante A↔B (transición solo color → **sin CLS**). Cascada
  propagada: Galería `sticky top-28` + `pt-32/lg:pt-40`; panel móvil `pt-32`;
  heros interiores `pt-44` libran. Footer logo `h-24`.
  **Ajuste final (mismo día): punto intermedio elegido por el cliente** — logo
  **`h-[120px] w-[120px]`** (120px, más grande que el original de 96px pero sin
  que la barra coma pantalla) en header **`h-32`** (128px). Cascada repropagada:
  Galería `sticky top-32` + `pt-36/lg:pt-44`; panel móvil `pt-36`; heros
  interiores `pt-44` (vuelven a su valor original); hero Home piso
  `pt-[max(20vh,9rem)]` (144px). Footer logo sin cambio (`h-24`). Iteración:
  se probó 144px/`h-44` (176px, muy alta) y 144px/`h-40` (160px, aún alta) antes
  de fijar 120px/`h-32`.
- G2 — Botón "Reservar" `min-h-[48px] px-8` (touch ≥44px, anillo marfil en A).
- G3 — Menú a 6 entradas (Navbar + Footer): Inicio · Habitaciones · Wellness
  (→/spa) · Experiencias · Galería · Contacto. Fuera "Gastronomía".

**Por página:**
- **Home** — hero sin eyebrow + subtítulo nuevo; BookingBar subida
  (`-mt-3/md:-mt-5`, ya no se corta); "Bienvenido"→"Descubre Aurea Vita" + 3
  párrafos; grid FeatureCard `aspect-[3/4]`→`aspect-[4/3]` (composición entra
  completa); "El destino" reencuadrado (`lg:items-start` + foto sticky acotada
  en alto, sin recortes en viewports medianos) con datos conservados; sección
  **"Momentos" ELIMINADA** (JSX + `momentosFotos`); banda CTA con texto nuevo.
- **Habitaciones** — `intro` → `{ subtitulo, cuerpo:[3] }` con copy largo.
- **Wellness (`/spa`)** — hero "Wellness" + subtítulo; texto central nuevo.
  Gateadas tras `SECCIONES_EN_CONSTRUCCION` (reversible): menú de tratamientos,
  circuito de aguas, aromaterapia. Queda hero + texto + nota "Lo mejor, en
  camino" + banda CTA. Datos viejos archivados (`spaFilosofiaArchivada`/
  `spaNotaArchivada`). "Agendar mi ritual" → `/contacto`.
- **Experiencias** — bloques temáticos gateados; queda hero + intro + "Estamos
  afinando los días" + banda CTA. No es callejón sin salida.
- **Gastronomía** — rebranding a "Alimentación Consciente"; estructura interna
  (Origen/Cielo/Marea) intacta.

**Mejora futura documentada:** botón "Agendar mi ritual" de Wellness podría
llevar a un calendario (móvil/Odoo) para controlar tiempos de la terapeuta.
Excede el sitio estático actual (requiere backend/integración). Evaluar en
ronda aparte con `odoo-development-skill` / `n8n-workflow-generator`. NO
implementado en esta ronda; por ahora apunta a `/contacto`.

**Auditoría QA (qa-auditor): sin P0.** P1 corregidos: contraste AA de subtítulo
del hero Home, banda CTA Home y hero Wellness sobre foto (refuerzo de overlay +
`text-shadow` marino); recorte del sticky de "El destino" en viewports medianos
(`lg:h-[calc(100dvh-9rem)] lg:max-h-[34rem]`). **Deuda P2/P3 para ronda futura:**
- P2-1: metadatos de Experiencias describen contenido gateado → meta provisional
  mientras dure el gateo.
- P2-2: alts de `spa.js`/`gallery.js`/`rooms.js` aún dicen "Spa Vita" (D4 solo
  renombró etiqueta visible) → unificar al definir nombre interno.
- P3-1: ~~logo navbar `h-24` en `h-28` se ve algo apretado~~ **RESUELTO**: con
  el logo +50% el header subió a `h-44` y el relleno bajó a ~82% (con aire).
- P3-2: `/contacto` usa `min-h-[100dvh]` (página completa "en construcción").

---

## Checkpoint anterior (2026-06-12)

**Desarrollo COMPLETO.** Las 7 páginas implementadas, animadas, refinadas y
auditadas según el flujo del prompt (§10): `ui-engineer` → `motion-engineer`
→ `visual-designer` → `qa-auditor` por página, más el pase global final.
Build verde.

## Artefactos de referencia (ya generados, NO regenerar)

- `docs/fotos/*.md` — catálogo visual de las 120 fotos con picks y **lista negra**.
- `docs/brief.md` — design brief completo del ux-architect.
- `docs/copy.md` — TODO el copy del ux-writer (metadatos §10).

## Estado por fase

| Fase | Estado |
|---|---|
| Catálogo fotográfico, brief, copy | ✅ Completo |
| Setup técnico (Vite 7 + React 19 + Tailwind 4 + Router 7 + Framer Motion 12) | ✅ Completo |
| **Home** (ui → motion → visual → qa) | ✅ Completo y auditado |
| **Habitaciones** | ✅ Completo y auditado |
| **Gastronomía** | ✅ Completo y auditado (QA: sin P0/P1; P3 alt corregido) |
| **Spa** | ✅ Completo y auditado |
| **Experiencias** | ✅ Completo y auditado |
| **Galería** (masonry + filtros + Lightbox con teclado) | ✅ Completo y auditado |
| **/contacto** | ⚙️ Cambiado por petición: ya NO es formulario de reserva, ahora es página **"Aún en construcción"** (todos los CTAs de Reservar apuntan aquí). El formulario validado vive en el historial de git si se necesita restaurar. |
| Pase global final (qa-auditor + visual-designer) | ✅ Completo |

## Decisiones relevantes del cierre

- **Spa · bloque "Circuito de aguas"**: el fondo plano `oliva` (#7A8F7C) NO alcanza
  AA con ningún token para texto pequeño (marfil sobre oliva = 3.09:1). Se rehízo
  como **banda inmersiva de foto** (spa_06 a sangre completa + overlay marino
  degradado izq→der), texto marfil ≥4.5:1; eyebrow salvia + línea oliva conservan
  la identidad verde. Se retiró **spa_03** (azulejo turquesa + grifo cromado-dorado,
  fuera de paleta).
- **Spa · botón CTA**: el brief permitía botón oliva (única excepción); se RECHAZA
  porque oliva no da AA en el label de 12px (3.09:1). CTA dorado + eyebrow salvia.
- **Contacto · estado de error**: sin rojo (fuera de paleta). Borde `marino` 2px +
  fondo `arena/40` + ícono dorado; semántica vía `role="alert"`/`aria-invalid`.
- **Preload del LCP (aereas_11)**: movido del HTML estático a un `useEffect` en Home
  (ya no penaliza las rutas interiores con ~108KB).
- **Navbar `HERO_ROUTES`**: incluye `/spa` y `/experiencias` (tienen hero fotográfico).
- Footer: "Aviso de privacidad"/"Términos" se dejan como `<span>` decorativos
  (rutas inexistentes en un hotel ficticio; no aparentan links rotos).

## Deuda menor aceptada (no bloqueante)

- Clases de CTA dorado duplicadas ~6× → candidato a extraer `<Button>` (se omitió
  para no arriesgar regresiones al cierre).
- `guestOptions` (contact.js) y `GUEST_OPTIONS` (BookingBar.jsx) duplicados; idem
  `FieldUnderline` (Contacto/BookingBar) → candidatos a compartir.

## Infraestructura (reutilizar, no duplicar)

- Tokens `@theme` en `src/styles/index.css` (7 colores + tipografía), utilidad
  `eyebrow`, `logo-claro`/`logo-marino`, foco global `2px currentColor`.
- Componentes: `Navbar`, `Footer`, `BookingBar`, `SectionHeading`, `FeatureCard`,
  `RoomCard`, `Lightbox`, `Reveal`/`RevealGroup`/`RevealItem`.
- `src/lib/motion.js`: `EASE_OUT`, `fadeRise()`, `staggerGroup()`, `drawLine()`.
- Datos por página en `src/data/`: home, rooms, dining, spa, experiences, gallery,
  contact. Hook `usePageMeta`.

## Reglas duras (mantener en cualquier cambio futuro)

1. Hero de cada ruta: eager + `fetchPriority="high"`; todo lo demás `loading="lazy"`.
   `min-h-[100dvh]` solo Home; interiores `min-h-[70vh]`. Nunca `h-screen`.
2. Contraste AA: eyebrows **marino** sobre fondos claros (dorado/salvia/oliva fallan
   en texto pequeño); dorado como texto solo sobre marino; salvia sobre marino sí pasa
   (5.54:1). CTAs dorados sobre fondo oscuro/foto → `focus-visible:outline-marfil`.
3. Solo los 7 tokens, sin emojis en markup, solo `/Logo.svg`, animaciones solo
   transform/opacity + `prefers-reduced-motion` siempre.
4. Verdes oliva/salvia dominan SOLO en /spa.
5. MOTION_INTENSITY 6/10.
