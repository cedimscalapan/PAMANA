import { setStored } from './storage';

export type RotatingFact = { id: string; category: string; topic: string };
export type FactRotation = { version: 1; day: string; dailyId: string; currentId: string; seen: string[]; history: string[] };
const key = 'pamana.culturalFacts.rotation.v1';
const empty = (): FactRotation => ({ version: 1, day: '', dailyId: '', currentId: '', seen: [], history: [] });
export function localDay(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function readFactRotation(): FactRotation {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? 'null') as FactRotation | null;
    if (!parsed || parsed.version !== 1 || typeof parsed.day !== 'string' || typeof parsed.currentId !== 'string' || !Array.isArray(parsed.seen) || !Array.isArray(parsed.history)) return empty();
    return { ...parsed, seen: parsed.seen.filter(id => typeof id === 'string'), history: parsed.history.filter(id => typeof id === 'string') };
  } catch { return empty(); }
}

/** Exhaust the distinct fact IDs before recycling; avoid recent topics and categories whenever the remaining pool allows it. */
export function selectFact<T extends RotatingFact>(pool: T[], previous: FactRotation, day: string, another = false, random = Math.random): FactRotation {
  if (!pool.length) throw new Error('The cultural fact library is unavailable.');
  const byId = new Map(pool.map(fact => [fact.id, fact]));
  if (!another && previous.day === day && byId.has(previous.currentId)) return previous;
  const history = previous.history.filter(id => byId.has(id));
  let seen = previous.seen.filter(id => byId.has(id));
  let candidates = pool.filter(fact => !seen.includes(fact.id));
  if (!candidates.length) { seen = []; candidates = pool; }
  const withoutCurrent = candidates.filter(fact => fact.id !== previous.currentId);
  if (withoutCurrent.length) candidates = withoutCurrent;
  const recentIds = history.slice(-Math.min(20, Math.max(0, pool.length - 1)));
  const fresh = candidates.filter(fact => !recentIds.includes(fact.id));
  if (fresh.length) candidates = fresh;
  const recentTopics = history.slice(-12).map(id => byId.get(id)?.topic);
  const differentTopics = candidates.filter(fact => !recentTopics.includes(fact.topic));
  if (differentTopics.length) candidates = differentTopics;
  const lastCategories = history.slice(-3).map(id => byId.get(id)?.category);
  const differentCategories = candidates.filter(fact => !lastCategories.includes(fact.category));
  if (differentCategories.length) candidates = differentCategories;
  else {
    const differentLast = candidates.filter(fact => fact.category !== lastCategories[lastCategories.length - 1]);
    if (differentLast.length) candidates = differentLast;
  }
  const index = Math.min(candidates.length - 1, Math.max(0, Math.floor(random() * candidates.length)));
  const chosen = candidates[index];
  return { version: 1, day, dailyId: previous.day === day && previous.dailyId ? previous.dailyId : chosen.id, currentId: chosen.id, seen: [...new Set([...seen, chosen.id])], history: [...history, chosen.id].slice(-500) };
}

let queue: Promise<unknown> = Promise.resolve();
export function getCulturalFact<T extends RotatingFact>(pool: T[], another = false, date = new Date()): Promise<T> {
  const operation = queue.then(async () => {
    const previous = readFactRotation();
    const next = selectFact(pool, previous, localDay(date), another);
    if (next !== previous) await setStored(key, JSON.stringify(next));
    return pool.find(fact => fact.id === next.currentId)!;
  });
  queue = operation.catch(() => undefined);
  return operation;
}
