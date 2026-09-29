# Postdata

Mi blog personal. Hecho con [Astro](https://astro.build).

## Desarrollo

```sh
npm install
npm run dev      # genera el índice y arranca el servidor en http://localhost:4321
npm run build    # genera el sitio en dist/ y el índice de búsqueda (Pagefind)
npm run preview  # sirve dist/ tal como se publicará
npm run check    # comprobación de tipos
```

## Estructura

```text
src/
  content/escritos/   textos en Markdown (title, description, date, tema, draft)
  content/temas.json  temas, en el orden en que aparecen
  content.config.ts   esquema de las colecciones
  layouts/Base.astro  documento base (lang="es", fuentes, skip link, pie)
  components/         cabecera, listas, búsqueda y diálogo
  scripts/search.ts   cliente de Pagefind
  lib/escritos.ts     consultas, fechas en español, tiempo de lectura
  pages/              inicio, temas, archivo, sobre mí, buscar, escritos, RSS, 404
  styles/tokens.css   fundamentos: color, tipo, espacio, rejilla
  styles/global.css   estilos base y rejilla de 12 columnas
```

Para publicar un texto, añade un `.md` en `src/content/escritos/` con un `tema` de `temas.json`. Con `draft: true` solo aparece en desarrollo.
