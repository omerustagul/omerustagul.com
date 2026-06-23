"use server";

import { revalidatePath } from "next/cache";
import type { Prisma, Booking } from "@/generated/prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { clientId, rateLimit } from "@/lib/rate-limit";
import {
  normalizeBookingConfig,
  isDayBookable,
  ymd,
  type BookingConfigData,
} from "@/lib/booking-config";

type State = { ok?: boolean; error?: string };

async function requireStaff(): Promise<boolean> {
  const session = await auth();
  const role = session?.user?.role;
  return Boolean(session?.user) && (role === "ADMIN" || role === "EDITOR");
}

/** Randevu uygunluk config'i (yoksa varsayılan). Modal ve admin ortak kullanır. */
export async function getBookingConfig(): Promise<BookingConfigData> {
  const row = await prisma.bookingConfig.findUnique({ where: { id: 1 } });
  return row ? normalizeBookingConfig(row.data) : normalizeBookingConfig(null);
}

/** Çalışma günleri/saatleri + kapalı günleri kaydeder (admin). */
export async function saveBookingConfig(data: BookingConfigData): Promise<State> {
  if (!(await requireStaff())) return { error: "Yetkisiz." };
  const clean = normalizeBookingConfig(data) as unknown as Prisma.InputJsonValue;
  await prisma.bookingConfig.upsert({
    where: { id: 1 },
    update: { data: clean },
    create: { id: 1, data: clean },
  });
  revalidatePath("/admin/bookings");
  return { ok: true };
}

const hhmm = (d: Date) =>
  `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

/** Verilen YYYY-MM-DD için BOŞ başlangıç saatleri: config saatleri − dolu saatler.
 *  Gün kapalıysa (haftagünü kapalı / kapalı gün / geçmiş) boş dizi döner. */
export async function getDayAvailability(date: string): Promise<string[]> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return [];
  const config = await getBookingConfig();
  if (!isDayBookable(config, date, ymd(new Date()))) return [];
  const start = new Date(`${date}T00:00:00`);
  const end = new Date(`${date}T23:59:59.999`);
  const rows = await prisma.booking.findMany({
    where: { slot: { gte: start, lte: end }, status: { not: "cancelled" } },
    select: { slot: true },
  });
  const taken = new Set(rows.map((r) => hhmm(r.slot)));
  return config.slots.filter((s) => !taken.has(s));
}

/** Public booking form → creates a Booking (admin manages in F5/F6). */
export async function createBooking(_prev: State | undefined, formData: FormData): Promise<State> {
  if (!rateLimit(`booking:${await clientId()}`, 5, 60_000))
    return { error: "Çok fazla deneme. Lütfen biraz sonra tekrar dene." };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const topic = String(formData.get("topic") ?? "").trim() || null;
  const type = String(formData.get("type") ?? "").trim() || null;
  const message = String(formData.get("message") ?? "").trim() || null;
  const slotRaw = String(formData.get("slot") ?? "").trim();

  if (!name || !email || !slotRaw) return { error: "Ad, e-posta ve tarih gerekli." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Geçerli bir e-posta gir." };
  const slot = new Date(slotRaw);
  if (Number.isNaN(slot.getTime())) return { error: "Geçersiz tarih." };

  // Sunucu tarafı uygunluk doğrulaması (savunma derinliği).
  const free = await getDayAvailability(ymd(slot));
  if (!free.includes(hhmm(slot))) {
    return { error: "Bu zaman artık uygun değil. Lütfen başka bir saat seç." };
  }

  await prisma.booking.create({ data: { name, email, phone, topic, type, message, slot } });
  revalidatePath("/admin/bookings");
  return { ok: true };
}

/** Admin randevu listesi — slot artan. */
export async function listBookings(): Promise<Booking[]> {
  if (!(await requireStaff())) return [];
  return prisma.booking.findMany({ orderBy: { slot: "asc" } });
}

/** Randevu durumunu değiştir: pending | confirmed | cancelled. */
export async function setBookingStatus(id: string, status: string): Promise<State> {
  if (!(await requireStaff())) return { error: "Yetkisiz." };
  if (!["pending", "confirmed", "cancelled"].includes(status)) return { error: "Geçersiz durum." };
  await prisma.booking.update({ where: { id }, data: { status } });
  revalidatePath("/admin/bookings");
  return { ok: true };
}

/** Randevuyu sil. */
export async function deleteBooking(id: string): Promise<State> {
  if (!(await requireStaff())) return { error: "Yetkisiz." };
  await prisma.booking.delete({ where: { id } });
  revalidatePath("/admin/bookings");
  return { ok: true };
}
