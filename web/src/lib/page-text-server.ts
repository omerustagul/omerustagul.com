import { prisma } from "@/lib/prisma";
import { resolvePageText, type PageTextMap } from "@/lib/page-text";

/** Saved homepage text overrides (PageText DB row). */
export async function getPageText(): Promise<PageTextMap> {
  try {
    const row = await prisma.pageText.findUnique({ where: { id: 1 } });
    return resolvePageText(row?.data);
  } catch {
    return {};
  }
}
