"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

type State = { ok?: boolean; error?: string };

/** Public booking form → creates a Booking (admin manages in F5/F6). */
export async function createBooking(_prev: State | undefined, formData: FormData): Promise<State> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const slotRaw = String(formData.get("slot") ?? "").trim();

  if (!name || !email || !slotRaw) return { error: "Ad, e-posta ve tarih gerekli." };
  const slot = new Date(slotRaw);
  if (Number.isNaN(slot.getTime())) return { error: "Geçersiz tarih." };

  await prisma.booking.create({ data: { name, email, slot } });
  revalidatePath("/admin/bookings");
  return { ok: true };
}
