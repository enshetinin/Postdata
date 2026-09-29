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
- Cada escrito tiene exactamente un `tema`, que debe existir en `src/content/temas.json` (el build falla si no). El orden de ese JSON es el orden de los temas en el sitio. Los temas sin textos no se muestran ni generan página.

## Navegación y búsqueda

- Cabecera: Temas, Archivo, Sobre mí, RSS y el botón Buscar. Un tema cuenta como sección de Temas (`aria-current="true"`); la página exacta es `page`.
- La búsqueda es Pagefind: `npm run build` ejecuta `pagefind --site dist` después de Astro. Solo se indexa lo marcado con `data-pagefind-body` (el artículo); `tema` y `fecha` van como `data-pagefind-meta`.
- En dev, la integración `devLikeBuild` de `astro.config.mjs` sirve en `/pagefind/` el último índice de `dist/` y deja cachear las fuentes (sin eso, cada navegación en dev pinta primero la fuente de sistema: parpadeo). `npm run dev` hace un build antes para que exista; si cambias escritos con el servidor en marcha, el índice no se actualiza hasta el siguiente `npm run build`.
- El diálogo sigue el contrato `dialog` de yev-design (`<dialog>` nativo con `showModal()`, Esc, foco de vuelta al botón, bloqueo de scroll por CSS). Se abre con el botón o con ⌘K / Ctrl K; nada de atajos de una sola tecla (WCAG 2.1.4). `/buscar/?q=` es la versión enlazable.
- `vite.build.assetsInlineLimit: 0` es necesario: si Astro incrusta el script, el `import()` de Pagefind se rompe (`__VITE_PRELOAD__`).

## Técnico

- Resaltado de sintaxis desactivado a propósito (`astro.config.mjs`): los bloques de código usan los colores del sitio. No activar Shiki sin un tema hecho con los tokens.
- Fuentes vía Fontsource (`@fontsource-variable/*`), importadas en `global.css`. No cargar Google Fonts. `Base.astro` precarga las dos caras principales (Atkinson Next y Newsreader, latin normal); si cambian, cambiar también esos `?url`.
- Sin JavaScript de cliente salvo que sea imprescindible; preferir CSS y HTML nativo.
- Antes de dar un cambio por terminado: `npm run build` y `npm run check` sin errores.

## Pendiente

- `site` en `astro.config.mjs` es un marcador (`https://postdata.example`): hay que poner el dominio real (lo usan RSS y las URLs canónicas).
- La página de artículo es funcional pero aún no ha tenido su pasada de diseño.
- Los escritos, los temas, la frase de la portada y el texto de "Sobre mí" son de muestra; el autor los sustituirá.
