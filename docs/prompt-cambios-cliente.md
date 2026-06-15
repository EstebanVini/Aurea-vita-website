# Prompt — Cambios solicitados por el cliente (Cambios_página_WEB1.pdf)

> Pásale este prompt a Claude Code dentro del repo. Cada cambio está mapeado al
> archivo y línea aproximada del código actual. El copy nuevo está transcrito
> literal del PDF (respetando su ortografía; corrige acentos/typos evidentes al
> aplicarlo). Al final hay una sección de **decisiones a confirmar** con el
> cliente antes de ejecutar los puntos ambiguos.

## Contexto del proyecto

Sitio del hotel **Aurea Vita** (Acapulco) en React + Vite + Tailwind + Framer
Motion. El copy vive en `src/data/*.js`; la maquetación en `src/pages/*.jsx` y
`src/components/*.jsx`. Respeta el sistema de diseño existente (paleta marino /
marfil / arena / dorado, eyebrows en mayúsculas vía la utilidad `.eyebrow`,
motion 6/10, accesibilidad AA, `prefers-reduced-motion`). No metas el copy en
mayúsculas a mano: las mayúsculas de los eyebrows las pone el CSS.

---

## Cambios globales (afectan a todo el sitio)

### G1 · Logo más grande
Aparece pedido en casi todas las páginas del PDF → es un solo cambio global.
- `src/components/Navbar.jsx` (~líneas 146-155): el `<img src="/Logo.svg">` está
  en `h-20 w-20` dentro de una nav de `h-24`. Súbelo (p. ej. `h-24 w-24` y
  agranda la altura de la nav a `h-28`, o `h-28 w-28`), cuidando que no rompa el
  alto del header ni el layout móvil. Ajusta también `width/height` del `<img>`.
- Verifica el logo del footer (`src/components/Footer.jsx` ~línea 41) por
  consistencia visual, aunque el PDF no lo pide explícitamente.

### G2 · Menú de navegación
PDF p.1 pide este orden y nombres en el banner superior:
`Inicio · Habitaciones · Wellness · Experiencias · Galería · Contacto`
- `src/components/Navbar.jsx` (`NAV_LINKS`, ~líneas 5-13):
  - Renombrar **Spa → Wellness** (la ruta sigue siendo `/spa`).
  - **Gastronomía NO aparece** en la lista del cliente → ver decisión **D1**
    antes de quitarla del nav.
- Si se renombra Spa→Wellness, actualiza también `HERO_ROUTES` no hace falta
  (usa rutas, no labels), pero sí revisa cualquier label "Spa" visible.

### G3 · Letrero/botón de "Reservaciones" más grande
Pedido en p.6, p.7 y p.8 ("hacer más grande el letrero de reservaciones"). Ver
decisión **D2** (si se refiere al botón `Reservar` del navbar — global — o a la
banda "Reservaciones" de cada página). Lo más probable: agrandar el botón
`Reservar` del navbar (`Navbar.jsx` ~líneas 165-177).

---

## Página de Inicio (`src/pages/Home.jsx`)

### Hero (PDF p.1) — sección 1, ~líneas 77-133
1. **Quitar** el eyebrow `Aurea Vita · Acapulco` (líneas 107-109).
2. **Mantener** el H1 `Santuario frente al Pacífico` (línea 114).
3. **Reemplazar** el subtítulo actual ("Un refugio de calma sobre la bahía de
   Acapulco, donde el tiempo se mide en mareas.", líneas 116-122) por:
   > Un santuario frente al mar donde no existen los horarios, solo el descanso,
   > el bienestar y el placer de vivir plenamente.
4. **Subir el cintillo de reservar** (la `BookingBar`) para que se lea completo.
   La BookingBar muerde el hero con `-mt-7 md:-mt-11` (líneas 137-144). Reduce
   ese solapamiento (o sube su posición) para que no se corte.

### Sección "Bienvenido a Aurea Vita" (PDF p.2) — sección 3, ~líneas 147-191
1. **Quitar** el eyebrow `El hotel` (prop `eyebrow` del `SectionHeading`, línea 150).
2. **Cambiar el título** `Bienvenido a Aurea Vita` → **`Descubre Aurea Vita`**.
3. **Reemplazar los párrafos** (líneas 151-164) por este texto:
   > En Aurea Vita creemos que el verdadero lujo es disponer de tiempo para uno
   > mismo.
   >
   > Frente al Pacífico, hemos creado un refugio donde los días transcurren sin
   > prisas y cada experiencia está pensada para reconectar con lo esencial. Aquí
   > no existen itinerarios rígidos ni horarios que seguir. El mar marca el ritmo,
   > la tranquilidad guía cada momento y el bienestar surge de forma natural.
   >
   > Comienza la mañana con una vista infinita al océano, disfruta una gastronomía
   > saludable y llena de sabor, relájate con terapias y masajes diseñados para
   > restaurar cuerpo y mente, o simplemente encuentra un espacio para descansar
   > profundamente mientras la brisa acompaña el día.
   >
   > Aurea Vita es una invitación a vivir despacio, a nutrirse conscientemente y a
   > redescubrir el placer de estar presente.
   >
   > Porque algunas experiencias no se miden por lo que haces, sino por cómo te
   > hacen sentir.

### Grid de 3 tarjetas (PDF p.3) — datos en `src/data/home.js` (`homeCards`)
1. **Fotos más pequeñas** para que el encuadre de la página se vea completo. En
   `Home.jsx` sección 4 (~líneas 195-209) y/o `FeatureCard.jsx`: reduce el alto/
   aspect-ratio de las imágenes de las cards para que la sección entre completa
   en pantalla.
2. **Card 1 — Habitaciones** (`home.js` ~líneas 9-21): mantener el título
   `Habitaciones & Suites`; cambiar el `text` por:
   > Amplios espacios para descansar y relajarse con absoluta privacidad.
3. **Card 2 — Gastronomía** (`home.js` ~líneas 22-31): mantener el eyebrow
   `La mesa`; cambiar el `title` `Gastronomía` → **`Alimentación Consciente`**.
4. **Card 3 — Spa** (`home.js` ~líneas 32-41): mantener el eyebrow `Bienestar`;
   cambiar el `title` `Spa Vita` → **`Experiencia Aurea Vita`** y el `text` por:
   > Descubre el descanso profundo a tu propio ritmo.

### Sección "El destino — Acapulco" (PDF p.4) — sección 5, ~líneas 213-267
1. **Ajustar el encuadre** de la sección para que se vea completa (hoy se corta
   el título "El Destino" arriba o el texto de abajo): revisa paddings
   verticales / alto de la columna de imagen para que entre todo.
2. Mantener el fondo y la tipografía (al cliente le gustan). **Reemplazar el
   párrafo** (líneas 223-229) por:
   > Acapulco Diamante, una de las zonas más privilegiadas y mejor conservadas
   > del Pacífico mexicano, donde la naturaleza sigue siendo la protagonista.
   > Kilómetros de playa prácticamente ininterrumpida, extensas áreas de
   > vegetación tropical y la presencia constante del océano crean un entorno
   > donde el tiempo parece transcurrir de forma diferente. El sonido de las olas,
   > la brisa marina y los colores del paisaje acompañan cada momento, invitando a
   > reducir el ritmo y reconectar con lo esencial.
   >
   > En Aurea Vita, creemos que el bienestar comienza con el lugar que nos rodea y
   > con la capacidad de detenernos para apreciarlo.
   >
   > Más que un destino, este es un espacio para respirar profundamente,
   > reconectar con uno mismo y dejar que la naturaleza marque el ritmo del día.
3. Las cifras (`300 días`, `27°`, `12 min`) del bloque `destinoStats` no se
   mencionan en el PDF → ver decisión **D3** (mantener o quitar).

### ELIMINAR sección "Momentos / El agua, a su propio ritmo" (PDF p.5)
- **Eliminar por completo** la sección 6 del Home (`Home.jsx` ~líneas 269-318,
  el strip scroll-snap de fotos de alberca/terraza). El PDF la marca como
  "ELIMINAR".
- Limpia los imports/datos que queden sin uso: `momentosFotos` en
  `src/data/home.js` (~líneas 57-78) y su import en `Home.jsx` (línea 10).

### Banda CTA final de reserva (PDF p.6) — sección 7, ~líneas 320-365
1. Hacer **más grande el letrero de reservaciones** (ver G3 / decisión **D2**).
2. **Reemplazar el texto central**. El título actual
   `El Pacífico no se apura. Tú tampoco deberías.` (línea 346) →
   > Un refugio frente al mar para descansar, reconectar y disfrutar al ritmo de
   > las olas.
   (Confirmar en **D4** si reemplaza el título, el párrafo de abajo, o ambos.)

---

## Página Habitaciones (PDF p.7) — `src/pages/Habitaciones.jsx` + `src/data/rooms.js`
1. Logo (G1) y letrero de reservaciones (G3).
2. **Reemplazar el copy** del encabezado e intro. Hoy en `rooms.js`
   (`habitacionesHeader`, ~líneas 154-163) está `titulo: 'Habitaciones & Suites'`
   + un `intro` corto. El cliente entrega copy más extenso:
   - **Título:** `Habitaciones & Suites`
   - **Subtítulo/eyebrow editorial:** `Diseñadas para el descanso, inspiradas por el mar.`
   - **Cuerpo** (puede ir en la intro editorial, `Habitaciones.jsx` ~líneas 79-88;
     hoy es un solo párrafo grande — habrá que ampliar el bloque para varios
     párrafos):
     > Cada habitación de Aurea Vita ha sido concebida como un refugio privado
     > donde la tranquilidad y el bienestar se convierten en parte de la
     > experiencia.
     >
     > Las amplias vistas al Pacífico acompañan cada amanecer, los espacios
     > generosos y los detalles cuidadosamente seleccionados invitan a desconectar
     > del ritmo cotidiano y reconectar con uno mismo en armonía.
     >
     > Todas nuestras habitaciones cuentan con vista al mar, baño con tina, amplio
     > clóset de caoba, estación de té, pantalla de entretenimiento y una cama de
     > masaje integrada a la experiencia wellness de tu propia habitación.
     >
     > Aquí, cada espacio ha sido diseñado para favorecer el descanso profundo, la
     > relajación y la sensación de bienestar que define la esencia de Aurea Vita.
     >
     > Porque descansar no es solamente dormir. Es balancear los sentidos y
     > sentirse en paz.

---

## Página Spa → "Wellness" (PDF p.8) — `src/pages/Spa.jsx` + `src/data/spa.js`
1. Logo (G1) y letrero de reservaciones (G3).
2. **Encabezado** (`spa.js` `spaHeader`, ~líneas 25-32): cambiar el título
   `Spa Vita` → **`Wellness`**, y agregar **debajo un subtítulo más pequeño**:
   > Donde el bienestar sucede de forma natural.
   (Hoy `spaHeader` solo tiene `eyebrow` + `titulo`; añade un campo `subtitulo`
   y renderízalo en el hero de `Spa.jsx`.)
3. **Texto central** (filosofía / intro — `spa.js` `spaFilosofia` o el bloque de
   texto principal): usar:
   > Disfruta nuestros masajes, terapias y experiencias que han sido diseñados
   > para ayudarte a desacelerar, liberar tensiones y reconectar contigo mismo.
   >
   > Date el tiempo necesario para descansar y relajarte profundamente,
   > armonizando con el sonido del Pacífico, sin horarios y en tranquilidad total.
4. Coherencia: revisa otros lugares donde aparezca "Spa Vita" (meta title en
   `Spa.jsx` ~líneas 48-51, etc.) y alinéalos con la nueva marca "Wellness".

### Botón "Agendar mi ritual" → calendario / Odoo (PDF p.10)
- En `spa.js` `spaCta` (~línea 133) el botón es `Agendar mi ritual` y en
  `Spa.jsx` (~líneas 354-368) hoy navega a `/contacto`.
- El cliente quiere que **lleve a un calendario de citas (Odoo o equivalente)**
  para controlar los tiempos de la terapeuta y evitar empalmes.
- Cambiar el `Link` interno por un enlace externo (`<a href={url} target="_blank"
  rel="noopener">`) a la URL de agendamiento. **Falta la URL** → ver decisión **D5**.

---

## Página Experiencias (PDF p.9) — `src/pages/Experiencias.jsx`
- El cliente marca esta sección como **"Por el momento nada aquí, vamos a
  trabajarla todavía"**.
- Convertir `/experiencias` en una página placeholder **"Aún en construcción"**,
  igual que ya se hizo con `/contacto` (ver commits recientes
  `feat: ... página "Aún en construcción"`). Reutiliza ese patrón/componente.
- Revisa los links internos que apuntan a `/experiencias` (p. ej. el CTA
  "Explora las experiencias" del Home, `Home.jsx` ~línea 249) — decidir si se
  mantienen o se ocultan mientras la página esté en construcción (**D6**).

---

## Decisiones a confirmar con el cliente (antes de ejecutar)

- **D1 — ¿Quitar "Gastronomía" del menú?** La lista del PDF (p.1) tiene 6 ítems y
  omite Gastronomía, pero el contenido gastronómico se conserva (card "La mesa /
  Alimentación Consciente"). ¿Se elimina del nav, se renombra, o fue un olvido?
- **D2 — "Letrero de reservaciones más grande":** ¿se refiere al botón `Reservar`
  del navbar (global) o a la banda/eyebrow "Reservaciones" de cada página?
- **D3 — Cifras del destino** (`300 días`, `27°`, `12 min`): el copy nuevo de
  Acapulco no las incluye. ¿Se mantienen o se quitan?
- **D4 — CTA final del Home:** el texto nuevo ("Un refugio frente al mar…")
  ¿reemplaza el título, el párrafo, o ambos?
- **D5 — URL de agendamiento del Spa** (Odoo / calendario): se necesita el enlace
  real para conectar el botón "Agendar mi ritual".
- **D6 — Experiencias en construcción:** ¿se ocultan del menú y de los links
  internos mientras tanto, o se dejan apuntando al placeholder?

---

### Resumen de archivos a tocar
- `src/components/Navbar.jsx` — logo, menú (Spa→Wellness), botón Reservar.
- `src/components/Footer.jsx` — logo (consistencia).
- `src/pages/Home.jsx` — hero, bienvenida, grid, destino, ELIMINAR momentos, CTA.
- `src/data/home.js` — copy de las 3 cards, quitar `momentosFotos`.
- `src/pages/Habitaciones.jsx` + `src/data/rooms.js` — copy nuevo.
- `src/pages/Spa.jsx` + `src/data/spa.js` — Wellness, subtítulo, texto, botón Odoo.
- `src/pages/Experiencias.jsx` — placeholder "Aún en construcción".
