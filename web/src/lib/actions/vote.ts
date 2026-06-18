"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/** Toggle the current user's vote on a project. Returns the new count + state. */
export async function toggleVote(projectId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Giriş gerekli." as const };
  const userId = session.user.id;

  const existing = await prisma.projectVote.findUnique({
    where: { projectId_userId: { projectId, userId } },
  });
  if (existing) await prisma.projectVote.delete({ where: { id: existing.id } });
  else await prisma.projectVote.create({ data: { projectId, userId } });

  const count = await prisma.projectVote.count({ where: { projectId } });
  return { ok: true as const, count, voted: !existing };
}
