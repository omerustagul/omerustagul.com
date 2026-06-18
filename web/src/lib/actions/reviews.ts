"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/** Add a review to a product (logged-in users). */
export async function addReview(productId: string, slug: string, rating: number, body: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Giriş gerekli." };
  const text = body.trim();
  if (!text) return { error: "Lütfen bir yorum yaz." };
  const r = Math.min(5, Math.max(1, Math.round(rating)));

  await prisma.review.create({
    data: { productId, userId: session.user.id, rating: r, body: text },
  });
  revalidatePath(`/market/${slug}`);
  return { ok: true };
}
