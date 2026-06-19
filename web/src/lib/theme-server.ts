import { prisma } from "@/lib/prisma";
import { DEFAULTS, type ThemeConfig } from "@/lib/theme";

/** The published site theme (SiteSettings row id=1), merged over defaults. */
export async function getSiteTheme(): Promise<ThemeConfig> {
  try {
    const row = await prisma.siteSettings.findUnique({ where: { id: 1 } });
    if (row?.data && typeof row.data === "object") {
      return { ...DEFAULTS, ...(row.data as Partial<ThemeConfig>) };
    }
  } catch {
    /* DB unavailable → defaults */
  }
  return { ...DEFAULTS };
}
