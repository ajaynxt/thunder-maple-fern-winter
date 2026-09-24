const KEY = "typenxt-history";
const BEST_KEY = "typenxt-best";

export type HistoryRow = {
  t: number;
  wpm: number;
  accuracy: number;
  errors: number;
  mode: string;
  lang: string;
  duration: number;
  passed?: boolean;
};

export function loadHistory(): HistoryRow[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as HistoryRow[];
    return Array.isArray(parsed) ? parsed.slice(-80) : [];
  } catch {
    return [];
  }
}

export function pushHistory(row: HistoryRow): HistoryRow[] {
  const next = [...loadHistory(), row].slice(-80);
  localStorage.setItem(KEY, JSON.stringify(next));
  const best = Math.max(loadBest(), row.wpm);
  localStorage.setItem(BEST_KEY, String(best));
  return next;
}

export function loadBest(): number {
  try {
    return Number(localStorage.getItem(BEST_KEY) || 0) || 0;
  } catch {
    return 0;
  }
}
