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
