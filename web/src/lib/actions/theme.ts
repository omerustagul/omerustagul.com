"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { DEFAULTS, type ThemeConfig } from "@/lib/theme";

/** Persist the published site theme (admin Görünüm). Global — all visitors. */
export async function saveSiteTheme(theme: Partial<ThemeConfig>) {
  const session = await auth();
  const role = session?.user?.role;
  if (!session?.user || (role !== "ADMIN" && role !== "EDITOR")) {
    return { error: "Yetkisiz" as const };
  }
  const data = { ...DEFAULTS, ...theme };
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: { data },
    create: { id: 1, data },
  });
  revalidatePath("/", "layout");
  return { ok: true as const };
}
