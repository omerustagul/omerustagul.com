"use server";

import { revalidatePath } from "next/cache";
import type { Prisma } from "@/generated/prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import type { HomeLayout } from "@/lib/home-layout";

/** Persist the homepage section order/visibility (admin Sayfalar). */
export async function saveHomeLayout(layout: HomeLayout) {
  const session = await auth();
  const role = session?.user?.role;
  if (!session?.user || (role !== "ADMIN" && role !== "EDITOR")) {
    return { error: "Yetkisiz" as const };
  }
  const data = layout as unknown as Prisma.InputJsonValue;
  await prisma.homeLayout.upsert({ where: { id: 1 }, update: { data }, create: { id: 1, data } });
  revalidatePath("/");
  revalidatePath("/admin/pages");
  return { ok: true as const };
}
