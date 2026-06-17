export const MIN_WINDOW = 30; // 30 seconds
export const MAX_WINDOW = 3 * 60 * 60; // 3 hours

export const windowPresets: { label: string; emoji: string; seconds: number }[] = [
  { label: "30 sec", emoji: "⚡", seconds: 30 },
  { label: "15 min", emoji: "🛵", seconds: 15 * 60 },
  { label: "1 hour", emoji: "🕐", seconds: 60 * 60 },
  { label: "3 hours", emoji: "🌙", seconds: MAX_WINDOW },
];

/** Human delivery-window label, e.g. "2h 14m", "15m", "30s". */
export function formatWindow(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return m > 0 ? `${h}h ${m}m` : `${h}h`;
  if (m > 0) return sec > 0 && m < 5 ? `${m}m ${sec}s` : `${m}m`;
  return `${sec}s`;
}

/** Longer countdown ETA, e.g. "2h 13m 40s", "4m 12s", "28s". */
export function formatEta(totalSeconds: number): string {
  const s = Math.max(0, Math.ceil(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const parts: string[] = [];
  if (h > 0) parts.push(`${h}h`);
  if (h > 0 || m > 0) parts.push(`${m}m`);
  parts.push(`${sec}s`);
  return parts.join(" ");
}

/**
 * Real on-screen animation length for a chosen delivery window. Short windows play
 * out in real time (a 30s pick really takes ~30s); longer ones are compressed so
 * nobody actually waits 3 hours — the displayed ETA just counts down faster.
 */
export function realDurationFor(windowSeconds: number): number {
  if (windowSeconds <= 45) return windowSeconds;
  return 26;
}

// Rolling "limited drop" countdown: each limited product counts down to its own
// end inside a repeating 6-hour window, so it always shows a plausible timer and
// quietly resets (because — wink — it always comes back, and it's free).
const DROP_WINDOW_MS = 6 * 60 * 60 * 1000;

export function limitedEndsAt(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const offset = h % DROP_WINDOW_MS;
  const now = Date.now();
  return Math.ceil((now + offset) / DROP_WINDOW_MS) * DROP_WINDOW_MS - offset;
}

/** A random window between the min and max, rounded to a tidy value. */
export function randomWindow(rand: number): number {
  const raw = MIN_WINDOW + rand * (MAX_WINDOW - MIN_WINDOW);
  if (raw < 120) return Math.round(raw / 5) * 5; // nearest 5s
  if (raw < 3600) return Math.round(raw / 60) * 60; // nearest minute
  return Math.round(raw / 300) * 300; // nearest 5 min
}
