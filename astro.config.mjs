// @ts-check
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, resolve, sep } from 'node:path';
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

const PAGEFIND_DIR = resolve('dist/pagefind');
const PAGEFIND_TYPES = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.wasm': 'application/wasm' };

/**
 * Makes `astro dev` behave like the built site in two places:
 * - Search: Pagefind builds its index into dist/ after `astro build`; serve the last one at /pagefind/.
 * - Fonts: Vite serves them with `no-cache`, so every navigation revalidates them and the
 *   first frame paints the fallback face (a visible flicker). Let the browser cache them.
 */
function devLikeBuild() {
  return /** @type {import('astro').AstroIntegration} */ ({
    name: 'dev-like-build',
    hooks: {
      'astro:server:setup': ({ server }) => {
        server.middlewares.use((req, res, next) => {
          if (/\.woff2(\?|$)/.test(req.url ?? '')) {
            const setHeader = res.setHeader.bind(res);
            res.setHeader = (name, value) =>
              setHeader(name, name.toLowerCase() === 'cache-control' ? 'max-age=3600' : value);
            res.setHeader('Cache-Control', 'max-age=3600');
          }
          next();
        });

        server.middlewares.use('/pagefind', (req, res, next) => {
          const file = join(PAGEFIND_DIR, decodeURIComponent((req.url ?? '').split('?')[0]));
          if (!file.startsWith(PAGEFIND_DIR + sep) || !existsSync(file) || !statSync(file).isFile()) return next();
          res.setHeader('Content-Type', PAGEFIND_TYPES[/** @type {keyof typeof PAGEFIND_TYPES} */ (extname(file))] ?? 'application/octet-stream');
          createReadStream(file).pipe(res);
        });
      },
    },
  });
}

export default defineConfig({
  // Placeholder: replace with the real domain. RSS and canonical URLs depend on it.
  site: 'https://postdata.example',
  // Built URLs end in a slash (directory output). 'always' would also make `astro dev`
  // answer URLs without one with Astro's generic 404 instead of src/pages/404.astro.
  trailingSlash: 'ignore',
  integrations: [devLikeBuild()],
  // Load a page when its link is hovered or focused, so the click finds it ready.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  vite: {
    build: {
      // Keep scripts as files: when Astro inlines them, Vite's preload wrapper around
      // the runtime import of /pagefind/pagefind.js is left undefined (__VITE_PRELOAD__).
      // As files they are also cached across pages.
      assetsInlineLimit: 0,
    },
  },
  markdown: {
    // Code blocks are styled by global.css; a Shiki theme would bring its own palette.
    syntaxHighlight: false,
    processor: satteri({
      features: {
        gfm: {
          footnotes: {
            label: 'Notas',
            // U+FE0E keeps the arrow as text; without it iOS draws an emoji.
            backContent: '↩\uFE0E',
            backLabel: 'Volver a la referencia {reference}',
          },
        },
      },
    }),
  },
});
