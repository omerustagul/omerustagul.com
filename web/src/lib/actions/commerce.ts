"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/** Enroll the current user in a course (records an enrollment + purchase). */
export async function enrollCourse(courseId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Giriş gerekli." };

  await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: session.user.id, courseId } },
    update: {},
    create: { userId: session.user.id, courseId },
  });
  await prisma.purchase.create({
    data: { userId: session.user.id, kind: "course", refId: courseId },
  });

  revalidatePath("/academy");
  return { ok: true };
}

/** Record a product purchase for the current user. */
export async function buyProduct(productId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Giriş gerekli." };

  await prisma.purchase.create({
    data: { userId: session.user.id, kind: "product", refId: productId },
  });

  revalidatePath("/market");
  return { ok: true };
}
