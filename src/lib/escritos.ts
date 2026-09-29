import { getCollection, type CollectionEntry } from 'astro:content';

export type Escrito = CollectionEntry<'escritos'>;

export async function getEscritos(): Promise<Escrito[]> {
  const entries = await getCollection('escritos', ({ data }) => import.meta.env.DEV || !data.draft);
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function groupByYear(entries: Escrito[]): [number, Escrito[]][] {
  const years = new Map<number, Escrito[]>();
  for (const entry of entries) {
    const year = entry.data.date.getFullYear();
    years.set(year, [...(years.get(year) ?? []), entry]);
  }
  return [...years.entries()];
}

const WORDS_PER_MINUTE = 220;

export function readingMinutes(body = ''): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

const dayMonth = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', timeZone: 'UTC' });
const full = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const formatDayMonth = (date: Date) => dayMonth.format(date);
export const formatDate = (date: Date) => full.format(date);
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);
