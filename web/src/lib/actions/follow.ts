"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/** Toggle the current user's follow on a homepage collection. */
export async function toggleFollow(collectionId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Giriş gerekli." as const };
  const userId = session.user.id;

  const existing = await prisma.follow.findUnique({
    where: { userId_collectionId: { userId, collectionId } },
  });
  if (existing) await prisma.follow.delete({ where: { id: existing.id } });
  else await prisma.follow.create({ data: { userId, collectionId } });

  const count = await prisma.follow.count({ where: { collectionId } });
  return { ok: true as const, following: !existing, count };
}
