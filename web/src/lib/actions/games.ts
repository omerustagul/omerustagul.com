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
