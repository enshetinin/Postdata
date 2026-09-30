// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

/**
 * Fonts in `astro dev`: Vite serves them with `no-cache`, so every navigation revalidates
 * them and the first frame paints the fallback face (a visible flicker). Let the browser
 * cache them, as it does on the built site.
 */
function cacheFontsInDev() {
  return /** @type {import('astro').AstroIntegration} */ ({
    name: 'cache-fonts-in-dev',
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
      },
    },
  });
}

export default defineConfig({
  // RSS and canonical URLs depend on it.
  site: 'https://www.postdata.site',
  // Built URLs end in a slash (directory output). 'always' would also make `astro dev`
  // answer URLs without one with Astro's generic 404 instead of src/pages/404.astro.
  trailingSlash: 'ignore',
  integrations: [cacheFontsInDev()],
  // Load a page when its link is hovered or focused, so the click finds it ready.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
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
