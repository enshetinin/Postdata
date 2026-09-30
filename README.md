# Postdata

Mi blog personal. Hecho con [Astro](https://astro.build).

## Desarrollo

```sh
npm install
npm run dev      # servidor de desarrollo en http://localhost:4321
npm run build    # genera el sitio en dist/
npm run preview  # sirve dist/ tal como se publicará
npm run check    # comprobación de tipos
```

## Estructura

```text
src/
  content/escritos/   textos en Markdown (title, description, date, draft)
  content.config.ts   esquema de la colección
  layouts/Base.astro  documento base (lang="es", fuentes, skip link, pie)
  components/         cabecera, pie, listas de escritos
  lib/escritos.ts     consultas, fechas en español, tiempo de lectura
  pages/              inicio, sobre mí, escritos, RSS, 404
  styles/tokens.css   fundamentos: color, tipo, espacio, rejilla
  styles/global.css   estilos base y rejilla de 12 columnas
```

## Escribir un texto

Cada escrito es un archivo Markdown en `src/content/escritos/`. El nombre del archivo es su URL: `mi-primer-texto.md` se publica en `/escritos/mi-primer-texto/`. Usa minúsculas, sin tildes y con guiones.

El archivo empieza con este frontmatter:

```markdown
---
title: Mi primer texto
description: Una frase que resume el texto.
date: 2026-10-01
draft: true
---

El texto empieza aquí.
```

| Campo         | Obligatorio | Qué es                                                                                             |
| ------------- | ----------- | -------------------------------------------------------------------------------------------------- |
| `title`       | sí          | Título del texto. Sale como encabezado, en la portada, en la pestaña del navegador y en el RSS.    |
| `description` | sí          | Una o dos frases. Sale bajo el título, en la portada, en el RSS y como descripción para buscadores. |
| `date`        | sí          | Fecha de publicación, en formato `AAAA-MM-DD`. Ordena los textos y los agrupa por año.             |
| `draft`       | no          | `true` para un borrador: solo se ve con `npm run dev`. Si no se pone, es `false` y se publica.      |

Si falta un campo obligatorio o tiene un formato incorrecto, `npm run build` falla y dice qué archivo y qué campo.

En el cuerpo, los títulos de sección empiezan en `##` (el `#` es el título del texto). Para una nota al pie, escribe `texto[^1]` y, al final del archivo, `[^1]: La nota.`

## Despliegue

En [Render](https://render.com) como sitio estático, con la configuración de `render.yaml`. Cada push a `main` despliega cuando el CI de GitHub Actions pasa.
