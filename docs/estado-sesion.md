# Estado de la sesión — Aurea Vita (checkpoint 2026-06-12)

**Desarrollo COMPLETO.** Las 7 páginas implementadas, animadas, refinadas y
auditadas según el flujo del prompt (§10): `ui-engineer` → `motion-engineer`
→ `visual-designer` → `qa-auditor` por página, más el pase global final.
Build verde. `npm run dev` → http://localhost:5173/

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
| **Contacto** (form validado + precarga query params + confirmación simulada) | ✅ Completo y auditado |
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
