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

## Navegación

- Páginas: portada (todos los escritos por año), un escrito por página, Sobre mí, RSS y 404. Temas, archivo y búsqueda (Pagefind) se quitaron a propósito para la primera versión; están en el historial de git si vuelven.
- Cabecera: el nombre (enlace a la portada), Sobre mí y RSS. La página exacta lleva `aria-current="page"`.
- En dev, la integración `cacheFontsInDev` de `astro.config.mjs` deja cachear las fuentes; sin eso, cada navegación pinta primero la fuente de sistema (parpadeo).

## Técnico

- Markdown con Sätteri (`@astrojs/markdown-satteri`, el procesador por defecto de Astro 7). Las notas al pie GFM (`[^id]`) salen en español por su config en `astro.config.mjs`; sus estilos, junto con el resto de la prosa, están en `.prose` de `global.css`. `markdown.remarkRehype` ya no aplica.
- Resaltado de sintaxis desactivado a propósito (`astro.config.mjs`): los bloques de código usan los colores del sitio. No activar Shiki sin un tema hecho con los tokens.
- Fuentes vía Fontsource (`@fontsource-variable/*`), importadas en `global.css`. No cargar Google Fonts. `Base.astro` precarga las dos caras principales (Atkinson Next y Newsreader, latin normal); si cambian, cambiar también esos `?url`.
- Sin JavaScript de cliente salvo que sea imprescindible; preferir CSS y HTML nativo.
- Antes de dar un cambio por terminado: `npm run build` y `npm run check` sin errores.

## Despliegue

- Render, sitio estático, definido en `render.yaml` (Blueprint): despliega `main` con `npm ci && npm run build` y publica `dist/`. Node sale de `.node-version`.
- `autoDeployTrigger: checksPass`: Render solo despliega si pasa el CI (`.github/workflows/ci.yml`, que ejecuta `check` y `build` en `main`, `develop` y PRs).

## Pendiente

- Aún no hay escritos (`src/content/escritos/` solo tiene un `.gitkeep`); el autor los irá creando. El aviso `No files found` del glob loader en el build es esperable hasta entonces.
- La frase de la portada y el texto de "Sobre mí" son de muestra; el autor los sustituirá.
