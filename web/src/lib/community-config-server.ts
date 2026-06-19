import { prisma } from "@/lib/prisma";
import { resolveCommunity, type CommunityConfig } from "@/lib/community-config";

/** The published community config (CommunityConfig DB row), merged over defaults. */
export async function getCommunityConfig(): Promise<CommunityConfig> {
  try {
    const row = await prisma.communityConfig.findUnique({ where: { id: 1 } });
    return resolveCommunity(row?.data);
  } catch {
    return resolveCommunity(null);
  }
}
