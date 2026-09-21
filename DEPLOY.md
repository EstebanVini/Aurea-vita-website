# Despliegue en Vercel

Este proyecto es una SPA de Vite + React (client-side routing con
`react-router-dom`). El repo ya trae la configuración necesaria para que
Vercel lo compile y sirva correctamente:

- `vercel.json`: build command, output dir, rewrite de SPA (todas las
  rutas caen a `index.html` para que React Router resuelva el path) y
  cache headers largos para `/assets`, `/videos` y `/fotos`.
- `.vercelignore`: excluye `originales/` y `docs/` (material de trabajo,
  no forma parte del sitio) para que el deploy no suba ~1 GB de más.
- `package.json` fija `engines.node = 20.x` para que el build use la
  misma versión de Node que la imagen Docker existente.

## Conectar el repo (una sola vez, desde el dashboard de Vercel)

Esto requiere acceso a tu cuenta de Vercel, así que hazlo tú directamente:

1. Entra a https://vercel.com/new e importa el repositorio
   `EstebanVini/Aurea-vita-website` (o `estebanvini/aurea-vita-website`,
   según cómo lo veas listado).
2. Vercel detecta automáticamente el framework "Vite"; el build command
   (`npm run build`) y el output dir (`dist`) ya quedan fijados por
   `vercel.json`, así que no hace falta tocarlos.
3. No se necesitan variables de entorno (el sitio no consume ninguna hoy).
4. Confirma el deploy. A partir de ahí, cada push a la rama de producción
   (normalmente `main`) dispara un deploy de producción automático, y
   cada Pull Request genera un Preview Deployment con su propia URL.
5. (Opcional) En *Project Settings → Domains* agrega el dominio propio
   (p. ej. `aureavita.consorciorazo.com`) y sigue las instrucciones de DNS
   que te muestre Vercel.

## Relación con el otro pipeline (Docker/VPS)

El repo también tiene `.github/workflows/deploy.yml`, que construye una
imagen Docker y la despliega por SSH a un VPS propio. Ese flujo sigue
existiendo en paralelo y es independiente de Vercel: podés usar ambos, uno
solo, o desactivar el que no necesites. Vercel no depende de ese workflow
ni del `Dockerfile`/`nginx.conf` (por eso están en `.vercelignore`).
