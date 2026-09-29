import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Order in temas.json is the order temas appear on the site.
const temas = defineCollection({
  loader: file('./src/content/temas.json'),
  schema: z.object({
    nombre: z.string(),
    descripcion: z.string(),
  }),
});

const escritos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/escritos' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tema: reference('temas'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { temas, escritos };
