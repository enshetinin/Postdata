# Postdata

Blog personal en Astro 7, sitio estático. Comandos y estructura: ver `README.md`.

## Diseño

- Cualquier cambio visual o de maquetación sigue el skill `yev-design`. Cárgalo antes de tocar estilos, componentes o páginas.
- Dialecto: lectura / conocimiento. La portada tiene un único momento de identidad (el título "Postdata" en Newsreader grande); el resto es tranquilo.
- Rejilla de 12 columnas en `src/styles/global.css`: `col-context` (4) a la izquierda para metadatos y años, `col-content` (7) / `col-wide` (8) como eje de lectura. Por debajo de 56rem, una sola columna.
- Agrupar con espacio en blanco: sin tarjetas, sombras ni líneas separadoras.
- Yev Signal (`--signal`) es tinta, no color de acción: hoy solo aparece en el marcador de "Escritos", el favicon y `::selection`. No añadir más sin motivo.
- Todo color, tipo y espacio sale de los tokens de `src/styles/tokens.css`. Nada de valores sueltos nuevos ni de Tailwind.
- Los enlaces siempre subrayados. La "página actual" se marca con `aria-current` y se estiliza desde el atributo, nunca con una clase.
- Contraste mínimo WCAG 2.2 AA; el texto de lectura está en AAA y debe seguir así.

## Contenido

- Todo en español: `lang="es"`, fechas con `es-ES` (helpers en `src/lib/escritos.ts`), textos de interfaz en español.
- Los escritos son Markdown en `src/content/escritos/`, con el esquema de `src/content.config.ts`. `draft: true` solo se ve en `npm run dev`.

## Técnico

- Resaltado de sintaxis desactivado a propósito (`astro.config.mjs`): los bloques de código usan los colores del sitio. No activar Shiki sin un tema hecho con los tokens.
- Fuentes vía Fontsource (`@fontsource-variable/*`), importadas en `global.css`. No cargar Google Fonts.
- Sin JavaScript de cliente salvo que sea imprescindible; preferir CSS y HTML nativo.
- Antes de dar un cambio por terminado: `npm run build` y `npm run check` sin errores.

## Pendiente

- `src/pages/escritos/[...slug].astro` es provisional: la página de artículo necesita su propio diseño.
- Los tres escritos de ejemplo y la frase de introducción de la portada son de muestra; el autor los sustituirá.
- Aún no hay navegación, página "Sobre mí" ni RSS.
