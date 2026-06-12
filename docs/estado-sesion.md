# Estado de la sesión — Aurea Vita (checkpoint 2026-06-12)

Orquestación según `prompt-claude-code-aurea-vita.md` §10. Flujo por página:
`ui-engineer` → `motion-engineer` → `visual-designer` → `qa-auditor`.

## Artefactos de referencia (ya generados, NO regenerar)

- `docs/fotos/*.md` — catálogo visual de las 120 fotos con picks y **lista negra**
  (terraza: solo terraza_13/10/03; lobby: solo 05/07/08/12/15 sin cubrebocas;
  habitaciones_08/09 descartadas; habitaciones_06 retirada de Suite Aurea por Torre de Tokio;
  fachadas_10 descartada por letreros "Sacher" → se usa fachadas_05 con object-right).
- `docs/brief.md` — design brief completo del ux-architect (§4.8 lista negra, §6 motion, §8 entregables copy).
- `docs/copy.md` — TODO el copy del ux-writer (tagline ganador: "Santuario frente al Pacífico";
  §7.3 alts en español; §10 metadatos por ruta; frase de footer "Donde el día baja la voz").

## Estado por fase

| Fase | Estado |
|---|---|
| Catálogo fotográfico (4 agentes) | ✅ Completo |
| ux-architect (brief) | ✅ Completo |
| ux-writer (copy) | ✅ Completo |
| Setup técnico (Vite 7 + React 19 + Tailwind 4 + Router 7 + Framer Motion 12, tokens, Navbar, Footer) | ✅ Completo, build verde |
| **Home** (ui → motion → visual → qa) | ✅ Completo y auditado (7 P1 corregidos) |
| **Habitaciones** (ui → motion → visual → qa) | ✅ Completo y auditado (3 P1 corregidos) |
| **Gastronomía** | ui ✅ → motion ✅ → visual ✅ → **qa PENDIENTE** ← AQUÍ SE QUEDÓ |
| **Spa** | ⬜ Pendiente todo el ciclo |
| **Experiencias** | ⬜ Pendiente todo el ciclo |
| **Galería** (masonry + filtros + lightbox con teclado) | ⬜ Pendiente todo el ciclo |
| **Contacto** (form validado + confirmación simulada + query params) | ⬜ Pendiente todo el ciclo |
| Pase global final (qa-auditor + visual-designer) + dejar `npm run dev` corriendo | ⬜ Pendiente |

## Infraestructura ya construida (reutilizar, no duplicar)

- Tokens `@theme` en `src/styles/index.css` (marfil/arena/marino/dorado/oliva/salvia/piedra),
  `font-display` (Cormorant Garamond 300–500) / `font-body` (Jost), utilidad `eyebrow`,
  clases `logo-claro`/`logo-marino` (el Logo.svg es PNG embebido → cambio de color por filtros CSS),
  outline global `2px solid currentColor`.
- Componentes: `Navbar` (transparente→sólida, `HERO_ROUTES` — agregar cada ruta nueva con hero),
  `Footer`, `BookingBar` (navega a `/contacto?llegada=&salida=&huespedes=`), `SectionHeading`
  (H2 `lg:text-6xl`), `FeatureCard`, `RoomCard` (galería con thumbnails, `aria-pressed`/`aria-live`),
  `Reveal.jsx` (`Reveal`/`RevealGroup`/`RevealItem`, reduced-motion seguro).
- `src/lib/motion.js`: `EASE_OUT`, `fadeRise()`, `staggerGroup()`, `VIEWPORT_ONCE`, `drawLine()`.
  (Bug de `delay:0` que pisaba `staggerChildren` YA corregido.)
- Datos: `src/data/home.js`, `src/data/rooms.js` (slugs `vista-jardin`/`vista-mar`/`suite-aurea`,
  contrato `formLabel` para el select de /contacto), `src/data/dining.js`.
- Hook `usePageMeta` (title + description por ruta, copy.md §10).

## Reglas duras aprendidas (aplicar en páginas restantes)

1. Hero de cada ruta: eager + `fetchPriority="high"`; todo lo demás `loading="lazy"`. `min-h-[100dvh]` solo Home; interiores 70vh.
2. Contraste AA: eyebrows **marino** sobre fondos claros (dorado/salvia fallan en texto pequeño);
   dorado como texto solo sobre marino. En secciones marino: `focus-visible:outline-marfil` y `text-marfil` en botones.
3. Nunca `focus:outline-none`, nunca `h-screen`, sin emojis en markup, cero colores fuera de tokens,
   solo `/Logo.svg` como marca. Animaciones solo transform/opacity + reduced-motion siempre.
4. Spa: verdes oliva/salvia dominan SOLO ahí (ojo contraste: salvia sobre claros falla AA → usar en líneas/fondos, no texto pequeño).
5. MOTION_INTENSITY 6/10.

## Pendientes acumulados para el PASE GLOBAL final

- `<link rel="preload">` de aereas_11 en `index.html` genera warning/108KB en rutas ≠ Home → condicionar o mover.
- Focus ring de CTAs dorados sobre marino sin override en `Home.jsx:340`, `Navbar` y `BookingBar` (patrón ya resuelto en RoomCard).
- Extraer componente `<Button>` (clases de CTA dorado duplicadas 6×).
- P2 Home: BookingBar móvil no se puede re-colapsar; placeholder newsletter contraste bajo; "Aviso de privacidad"/"Términos" son `<span>`.
- P3: hover scale directo en `<img>` del strip (sticky en touch); fade de 300ms en outline-color del CTA oscuro.

## Cómo retomar

Continuar con: **qa-auditor de /gastronomia** → luego ciclo completo de Spa → Experiencias →
Galería → Contacto (en ese orden, prompt §10) → pase global → dejar `npm run dev` corriendo y reportar URL.
