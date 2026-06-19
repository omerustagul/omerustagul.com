"use server";

import { revalidatePath } from "next/cache";
import type { Prisma } from "@/generated/prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { resolveCommunity, type CommunityConfig } from "@/lib/community-config";

/** Persist the community config (admin Topluluk). */
export async function saveCommunityConfig(cfg: CommunityConfig) {
  const session = await auth();
  const role = session?.user?.role;
  if (!session?.user || (role !== "ADMIN" && role !== "EDITOR")) {
    return { error: "Yetkisiz" as const };
  }
  const data = resolveCommunity(cfg) as unknown as Prisma.InputJsonValue;
  await prisma.communityConfig.upsert({ where: { id: 1 }, update: { data }, create: { id: 1, data } });
  revalidatePath("/");
  return { ok: true as const };
}
