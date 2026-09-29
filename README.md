# Postdata

Mi blog personal. Hecho con [Astro](https://astro.build).

## Desarrollo

```sh
npm install
npm run dev      # servidor local en http://localhost:4321
npm run build    # genera el sitio estático en dist/
npm run check    # comprobación de tipos
```

## Estructura

```text
src/
  content/escritos/   textos en Markdown (title, description, date, draft)
  content.config.ts   esquema de la colección
  layouts/Base.astro  documento base (lang="es", fuentes, skip link, pie)
  components/         cabecera y pie
  lib/escritos.ts     consultas, fechas en español, tiempo de lectura
  pages/index.astro   página de inicio
  pages/escritos/     página de cada texto (provisional)
  styles/tokens.css   fundamentos: color, tipo, espacio, rejilla
  styles/global.css   estilos base y rejilla de 12 columnas
```

Para publicar un texto, añade un `.md` en `src/content/escritos/`. Con `draft: true` solo aparece en desarrollo.
