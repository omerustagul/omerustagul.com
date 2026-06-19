"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { DAILY_LIMIT } from "@/lib/games-config";

/** Submit a game score (one row per play). Enforces a daily play limit. */
export async function submitScore(game: string, score: number) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Giriş gerekli." as const };
  const userId = session.user.id;

  const since = new Date();
  since.setHours(0, 0, 0, 0);
  const todayCount = await prisma.gameScore.count({
    where: { userId, game, playedAt: { gte: since } },
  });
  if (todayCount >= DAILY_LIMIT) return { error: "Günlük hakkın doldu." as const };

  await prisma.gameScore.create({ data: { userId, game, best: score } });
  return { ok: true as const, remaining: DAILY_LIMIT - todayCount - 1 };
}

export type GameStat = { playedToday: boolean; best: number | null; avg: number | null };
const GAME_LOWER: Record<string, boolean> = { memory: false, sequence: false, reaction: true };

/** Per-game stats for the current user: played-today, all-time best, today's avg. */
export async function getMyGameStats(): Promise<Record<string, GameStat>> {
  const session = await auth();
  if (!session?.user?.id) return {};
  const userId = session.user.id;

  const since = new Date();
  since.setHours(0, 0, 0, 0);
  const rows = await prisma.gameScore.findMany({ where: { userId }, select: { game: true, best: true, playedAt: true } });

  const out: Record<string, GameStat> = {};
  for (const game of Object.keys(GAME_LOWER)) {
    const all = rows.filter((r) => r.game === game);
    const today = all.filter((r) => r.playedAt >= since);
    let best: number | null = null;
    for (const r of all) if (best == null || (GAME_LOWER[game] ? r.best < best : r.best > best)) best = r.best;
    const avg = today.length ? Math.round(today.reduce((a, b) => a + b.best, 0) / today.length) : null;
    out[game] = { playedToday: today.length >= DAILY_LIMIT, best, avg };
  }
  return out;
}

export type LeaderRow = { name: string; best: number; isMe: boolean };

/** Best-score-per-user leaderboard for a game (+ the caller's rank). */
export async function getLeaderboard(game: string, lowerIsBetter: boolean) {
  const session = await auth();
  const myId = session?.user?.id ?? null;

  const scores = await prisma.gameScore.findMany({ where: { game }, select: { userId: true, best: true } });
  const bestByUser = new Map<string, number>();
  for (const s of scores) {
    const cur = bestByUser.get(s.userId);
    if (cur == null || (lowerIsBetter ? s.best < cur : s.best > cur)) bestByUser.set(s.userId, s.best);
  }
  const ids = [...bestByUser.keys()];
  const users = await prisma.user.findMany({ where: { id: { in: ids } }, select: { id: true, name: true } });
  const nameOf = new Map(users.map((u) => [u.id, u.name]));

  const ranked = ids
    .map((id) => ({ id, name: nameOf.get(id) ?? "?", best: bestByUser.get(id)! }))
    .filter((r) => nameOf.has(r.id))
    .sort((a, b) => (lowerIsBetter ? a.best - b.best : b.best - a.best));

  const myRank = myId ? ranked.findIndex((r) => r.id === myId) + 1 : 0;
  const board: LeaderRow[] = ranked.slice(0, 8).map((r) => ({ name: r.name, best: r.best, isMe: r.id === myId }));
  return { board, myRank: myRank || null, total: ranked.length };
}
