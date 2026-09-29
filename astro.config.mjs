// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  markdown: {
    // Code blocks are styled by global.css; a Shiki theme would bring its own palette.
    syntaxHighlight: false,
  },
});
