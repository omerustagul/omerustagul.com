import { headers } from "next/headers";

// In-memory fixed-window limiter. NOTE: per-instance only — for multi-instance
// production use Upstash/Redis. Good enough to throttle abuse on a single node.
type Entry = { count: number; reset: number };
const store = new Map<string, Entry>();

export function rateLimit(key: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const e = store.get(key);
  if (!e || e.reset < now) {
    store.set(key, { count: 1, reset: now + windowMs });
    return true;
  }
  if (e.count >= limit) return false;
  e.count++;
  return true;
}

/** Best-effort client identifier from proxy headers (server actions). */
export async function clientId(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "local"
  );
}
