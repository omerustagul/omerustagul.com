import { prisma } from "@/lib/prisma";
import { resolveHomeLayout, type HomeLayout } from "@/lib/home-layout";

/** The published homepage layout (HomeLayout DB row), reconciled over defaults. */
export async function getHomeLayout(): Promise<HomeLayout> {
  try {
    const row = await prisma.homeLayout.findUnique({ where: { id: 1 } });
    return resolveHomeLayout(row?.data);
  } catch {
    return resolveHomeLayout(null);
  }
}
