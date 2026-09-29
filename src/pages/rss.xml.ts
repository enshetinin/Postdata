import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getEscritos, getTemas, escritoUrl } from '../lib/escritos';

export async function GET(context: APIContext) {
  const [escritos, temas] = await Promise.all([getEscritos(), getTemas()]);
  return rss({
    title: 'Postdata',
    description: 'Blog personal, en español.',
    site: context.site!,
    customData: '<language>es</language>',
    items: escritos.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: escritoUrl(entry),
      categories: [temas.get(entry.data.tema.id)?.data.nombre ?? entry.data.tema.id],
    })),
  });
}
