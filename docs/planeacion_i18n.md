# Planeación — Internacionalización ES/EN (ronda 31 ago 2026)

Origen del pedido: `.claude/docs/cambios.txt` — traducir la página según
`docs/traduccion_ingles.md`, agregar un botón para cambiar de idioma y
recordar la preferencia del usuario.

## 1. Decisiones técnicas

- **Persistencia: `localStorage`** (clave `aurea-vita-lang`), no cookie.
  El sitio es una SPA estática sin backend: nadie lee cookies del lado
  servidor, y `localStorage` no viaja en cada request ni requiere aviso
  de cookies. El pedido autoriza explícitamente "el mecanismo que sea
  mejor".
- **Primera visita sin preferencia guardada**: se detecta
  `navigator.language` — si empieza con `en` se arranca en inglés; en
  cualquier otro caso, español (idioma principal del sitio). La elección
  manual del usuario siempre gana y se persiste.
- **Sin dependencias nuevas**: nada de i18next. Se construye un
  `LanguageContext` propio en `src/i18n/` (el proyecto ya evita
  dependencias — ver `usePageMeta`).
- **Arquitectura de contenido**:
  - Cada archivo de `src/data/*.js` pasa a exportar sus objetos por
    idioma: `export const heroHome = { es: {...}, en: {...} }`. Las
    páginas seleccionan con el hook `useLang()`.
  - Strings de UI compartidos (navbar, footer, CTAs, formularios,
    aria-labels, skip-link) viven en un diccionario
    `src/i18n/ui.js` con la misma forma `{ es, en }`, consumido vía
    `useT()`.
- **Fuente canónica del inglés**: `docs/traduccion_ingles.md` (copy del
  cliente) — se usa **verbatim**, sin re-redactar. Lo que ese documento
  no cubre (Galería, Contacto, chrome de UI, menús de Gastronomía,
  microcopy de formularios y accesibilidad) lo produce el UX Writer en
  `docs/traduccion_ui_faltante.md` respetando el tono del cliente.
- **Metadatos y accesibilidad**: `usePageMeta` recibe título/description
  del idioma activo; el toggle actualiza `document.documentElement.lang`
  ("es"/"en") para lectores de pantalla. El contenido oculto marcado en
  el doc como "ready for future activation" solo se traduce si su
  contraparte en español existe en el código; no se activa nada nuevo.
- **Toggle de idioma**: en la Navbar (desktop y panel móvil), estilo
  sobrio "ES / EN" coherente con la utilidad `eyebrow` y los dos estados
  A/B de la barra (transparente sobre hero / sólida); touch target
  ≥44px; `aria-pressed`/`aria-label` correctos. No se agrega un segundo
  dorado: el CTA "Reservar" sigue siendo el único botón dorado.

## 2. Tareas por agente

| # | Agente | Tarea | Entregable |
|---|--------|-------|------------|
| 1 | **ux-writer** | Inventariar todo el copy visible y de accesibilidad que `docs/traduccion_ingles.md` NO cubre (Navbar, Footer + newsletter, BookingBar, RoomCard, Lightbox, Galería, Contacto, menús/da­tos de `dining.js`, `spa.js`, `experiences.js`, `rooms.js`, `gallery.js` no cubiertos, skip-link, mensajes de error) y traducirlo al inglés con el mismo tono del cliente. | `docs/traduccion_ui_faltante.md` |
| 2 | **ui-engineer** | Construir `src/i18n/` (contexto + `useLang` + `useT` + persistencia + detección), refactorizar `src/data/*.js` al formato `{es, en}` usando el doc del cliente verbatim + el doc del ux-writer, cablear las 7 páginas y todos los componentes, agregar el toggle a la Navbar, y hacer reactivo `usePageMeta` + `<html lang>`. Verificar con `npm run build`. | Código funcionando en ambos idiomas |
| 3 | **qa-auditor** | Auditar: ninguna cadena sin traducir en ninguna ruta/idioma, persistencia y detección correctas, accesibilidad del toggle (foco, contraste en estados A/B, `lang`), sin regresiones de layout por textos más largos, build limpio. | Reporte P0–P3 |

Orden: 1 → 2 → 3 (el ui-engineer necesita las traducciones del
ux-writer; el qa-auditor audita el resultado). Hallazgos P0/P1 del QA se
corrigen antes de dar por cerrada la ronda. No se requieren
motion-engineer ni visual-designer: el toggle reutiliza las
transiciones y la paleta existentes.
