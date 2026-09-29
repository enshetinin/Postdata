import { getCollection, type CollectionEntry } from 'astro:content';
import temasJson from '../content/temas.json';

export type Escrito = CollectionEntry<'escritos'>;
export type Tema = CollectionEntry<'temas'>;

export interface Grupo {
  tema: Tema;
  escritos: Escrito[];
}

export async function getEscritos(): Promise<Escrito[]> {
  const entries = await getCollection('escritos', ({ data }) => import.meta.env.DEV || !data.draft);
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// The collection comes back sorted by id; the site uses the order of temas.json.
const temaOrder = temasJson.map((tema) => tema.id);

export async function getTemas(): Promise<Map<string, Tema>> {
  const temas = await getCollection('temas');
  temas.sort((a, b) => temaOrder.indexOf(a.id) - temaOrder.indexOf(b.id));
  return new Map(temas.map((tema) => [tema.id, tema]));
}

/** Temas in the order of temas.json, each with its escritos, newest first. Empty temas are left out. */
export async function getGrupos(): Promise<Grupo[]> {
  const [temas, escritos] = await Promise.all([getTemas(), getEscritos()]);
  return [...temas.values()]
    .map((tema) => ({ tema, escritos: escritos.filter((e) => e.data.tema.id === tema.id) }))
    .filter((grupo) => grupo.escritos.length > 0);
}

export function groupByYear(entries: Escrito[]): [number, Escrito[]][] {
  const years = new Map<number, Escrito[]>();
  for (const entry of entries) {
    const year = entry.data.date.getUTCFullYear();
    years.set(year, [...(years.get(year) ?? []), entry]);
  }
  return [...years.entries()];
}

export const escritoUrl = (entry: Escrito) => `/escritos/${entry.id}/`;
export const temaUrl = (id: string) => `/temas/${id}/`;

export const countLabel = (n: number) => (n === 1 ? '1 texto' : `${n} textos`);

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
