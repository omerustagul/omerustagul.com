"use server";

import { revalidatePath } from "next/cache";
import type { Prisma } from "@/generated/prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/** Persist the founder CV (admin Profil/CV) to the Profile model. */
export async function saveProfile(data: unknown) {
  const session = await auth();
  const role = session?.user?.role;
  if (!session?.user || (role !== "ADMIN" && role !== "EDITOR")) {
    return { error: "Yetkisiz" as const };
  }
  const json = (data ?? {}) as Prisma.InputJsonValue;
  const existing = await prisma.profile.findFirst();
  if (existing) await prisma.profile.update({ where: { id: existing.id }, data: { data: json } });
  else await prisma.profile.create({ data: { data: json } });
  revalidatePath("/ben-kimim");
  return { ok: true as const };
}
