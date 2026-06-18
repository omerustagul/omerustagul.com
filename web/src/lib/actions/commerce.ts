"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { charge } from "@/lib/payment";

/** Enroll the current user in a course (records an enrollment + purchase). */
export async function enrollCourse(courseId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Giriş gerekli." };

  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course) return { error: "Kurs bulunamadı." };
  if (course.price > 0) {
    const pay = await charge({ amount: course.price, currency: "TRY", description: course.title });
    if (!pay.ok) return { error: pay.error };
  }

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

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return { error: "Ürün bulunamadı." };
  if (product.price > 0) {
    const pay = await charge({ amount: product.price, currency: "USD", description: product.title });
    if (!pay.ok) return { error: pay.error };
  }

  await prisma.purchase.create({
    data: { userId: session.user.id, kind: "product", refId: productId },
  });

  revalidatePath("/market");
  return { ok: true };
}
