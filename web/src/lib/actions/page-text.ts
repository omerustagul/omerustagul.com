"use server";

import { revalidatePath } from "next/cache";
import type { Prisma } from "@/generated/prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { resolvePageText } from "@/lib/page-text";

/** Save a single inline text override (admin, from the live-edit preview). */
export async function savePageText(key: string, value: string) {
  const session = await auth();
  const role = session?.user?.role;
  if (!session?.user || (role !== "ADMIN" && role !== "EDITOR")) {
    return { error: "Yetkisiz" as const };
  }
  if (!key) return { error: "Geçersiz anahtar" as const };

  const row = await prisma.pageText.findUnique({ where: { id: 1 } });
  const current = resolvePageText(row?.data);
  current[key] = value;
  const data = current as unknown as Prisma.InputJsonValue;
  await prisma.pageText.upsert({ where: { id: 1 }, update: { data }, create: { id: 1, data } });
  revalidatePath("/");
  return { ok: true as const };
}
