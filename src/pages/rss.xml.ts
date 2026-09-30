import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getEscritos, escritoUrl } from '../lib/escritos';

export async function GET(context: APIContext) {
  const escritos = await getEscritos();
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
    })),
  });
}
