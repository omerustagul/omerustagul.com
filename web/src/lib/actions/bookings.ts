"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { clientId, rateLimit } from "@/lib/rate-limit";

type State = { ok?: boolean; error?: string };

/** Public booking form → creates a Booking (admin manages in F5/F6). */
export async function createBooking(_prev: State | undefined, formData: FormData): Promise<State> {
  if (!rateLimit(`booking:${await clientId()}`, 5, 60_000))
    return { error: "Çok fazla deneme. Lütfen biraz sonra tekrar dene." };

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

/** Slots already booked for a given YYYY-MM-DD (so the modal can disable them). */
export async function getTakenSlots(date: string): Promise<string[]> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return [];
  const start = new Date(`${date}T00:00:00`);
  const end = new Date(`${date}T23:59:59.999`);
  if (Number.isNaN(start.getTime())) return [];
  const rows = await prisma.booking.findMany({
    where: { slot: { gte: start, lte: end } },
    select: { slot: true },
  });
  const hhmm = (d: Date) => `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  return rows.map((r) => hhmm(r.slot));
}
