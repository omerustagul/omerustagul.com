# Randevu Sistemi Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Public randevu popup'ını markanın tasarım dilinde 3 adımlı bir wizard'a dönüştürmek; admin'den çalışma günleri/saatleri ve kapalı günleri yönetmek; tüm randevu alanlarını veritabanına kaydetmek.

**Architecture:** Veri katmanı Prisma (`Booking`'e alanlar + `BookingConfig` JSON singleton). İş kuralları saf bir `lib/booking-config.ts` modülünde (tip + varsayılan + saf yardımcılar), `"use server"` action'lar yalnızca async fonksiyonlar içerir. Admin server-component veriyi çeker → client'a prop; mutasyonlar server action + `router.refresh()`. Public modal config'i ve gün uygunluğunu server action'larla çeker, takvim/saatleri saf yardımcılarla hesaplar.

**Tech Stack:** Next.js 16 (App Router) + React 19 + TypeScript, Prisma 7 + PostgreSQL (`@prisma/adapter-pg`), token CSS (Tailwind yok), NextAuth v5 rol koruması.

**Test yaklaşımı:** Projede birim test koşucusu yok (yalnızca `npm run lint` + `npm run build` + manuel doğrulama). AGENTS.md desenine sadık kalıyoruz — yeni test altyapısı **eklemiyoruz**. İş mantığı saf fonksiyonlara taşınarak gözden geçirilebilir/öngörülebilir tutulur; doğrulama lint + build + tarayıcıda elle kontrol ile yapılır.

---

## File Structure

| Dosya | Sorumluluk | İşlem |
|---|---|---|
| `web/prisma/schema.prisma` | `Booking` alanları + `BookingConfig` modeli | Modify |
| `web/src/lib/booking-config.ts` | Tipler, varsayılan config, saf yardımcılar (normalize, gün uygunluğu, takvim ızgarası) | **Create** |
| `web/src/lib/actions/bookings.ts` | Server action'lar: config get/save, gün uygunluğu, genişletilmiş createBooking, admin liste/durum/sil | Modify |
| `web/src/app/admin/bookings/page.tsx` | Async server component — veri çekip client'a prop | Modify |
| `web/src/app/admin/bookings/client.tsx` | Sekmeli admin UI: gerçek randevu listesi + çalışma günleri editörü | Modify (rewrite) |
| `web/src/components/marka/BookingModal.tsx` | 3 adımlı public wizard | Modify (rewrite) |
| `web/src/styles/site.css` | Wizard / takvim / stepper / segmented stilleri | Modify |

**Önemli kısıt:** `"use server"` dosyaları (`bookings.ts`) yalnızca **async fonksiyon** export edebilir. Bu yüzden tüm tipler, sabitler ve saf yardımcılar `lib/booking-config.ts` içinde (normal modül) durur; hem server action'lar hem de client modal oradan import eder.

---

## Phase 1 — Veri katmanı & server action'lar

### Task 1: Prisma şeması — Booking alanları + BookingConfig

**Files:**
- Modify: `web/prisma/schema.prisma` (Booking modeli ~237-244; dosya sonuna yeni model)

- [ ] **Step 1: `Booking` modeline opsiyonel alanları ekle**

`web/prisma/schema.prisma` içinde mevcut `Booking` modelini şununla değiştir:

```prisma
model Booking {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  topic     String?
  type      String?
  message   String?
  slot      DateTime
  status    String   @default("pending")
  createdAt DateTime @default(now())
}
```

- [ ] **Step 2: `BookingConfig` singleton modelini ekle**

Aynı dosyada, `Booking` modelinden hemen sonra ekle:

```prisma
model BookingConfig {
  id   Int  @id @default(1)
  data Json
}
```

- [ ] **Step 3: Migration oluştur ve client'ı üret**

Önce Postgres'in çalıştığından ve `web/.env` içinde `DATABASE_URL`'in tanımlı olduğundan emin ol. Sonra `web/` dizininde:

Run: `npx prisma migrate dev --name booking-fields-and-config`
Expected: Yeni migration oluşturulur, uygulanır; "Your database is now in sync with your schema" benzeri çıktı.

Run: `npx prisma generate`
Expected: `src/generated/prisma` istemcisi yeniden üretilir, hata yok.

- [ ] **Step 4: Commit**

```bash
git add web/prisma/schema.prisma web/prisma/migrations
git commit -m "feat(booking): Booking alanları + BookingConfig modeli"
```

---

### Task 2: Saf config modülü — `lib/booking-config.ts`

**Files:**
- Create: `web/src/lib/booking-config.ts`

- [ ] **Step 1: Modülü oluştur (tipler + varsayılan + saf yardımcılar)**

`web/src/lib/booking-config.ts`:

```ts
// Randevu uygunluk kuralları — saf modül (server & client ortak).
// "use server" YOK: tipler, sabitler ve saf fonksiyonlar burada durur.

export type Weekday = "0" | "1" | "2" | "3" | "4" | "5" | "6"; // 0=Pazar .. 6=Cumartesi (JS getDay)

export type BookingConfigData = {
  weekly: Record<Weekday, boolean>; // haftagünü açık mı
  slots: string[];                  // ortak çalışma saatleri ("HH:MM")
  closedDates: string[];            // tek tek kapatılan günler ("YYYY-MM-DD")
};

export const DEFAULT_BOOKING_CONFIG: BookingConfigData = {
  weekly: { "0": false, "1": true, "2": true, "3": true, "4": true, "5": true, "6": false },
  slots: ["10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
  closedDates: [],
};

const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const WEEKDAY_KEYS: Weekday[] = ["0", "1", "2", "3", "4", "5", "6"];

/** Bilinmeyen bir JSON blob'unu varsayılanlara göre temizler/birleştirir. */
export function normalizeBookingConfig(raw: unknown): BookingConfigData {
  const d = DEFAULT_BOOKING_CONFIG;
  if (!raw || typeof raw !== "object") {
    return { weekly: { ...d.weekly }, slots: [...d.slots], closedDates: [] };
  }
  const r = raw as Record<string, unknown>;
  const rawWeekly = (r.weekly ?? {}) as Record<string, unknown>;
  const weekly = {} as Record<Weekday, boolean>;
  for (const k of WEEKDAY_KEYS) {
    weekly[k] = typeof rawWeekly[k] === "boolean" ? (rawWeekly[k] as boolean) : d.weekly[k];
  }
  const slots = Array.isArray(r.slots)
    ? Array.from(new Set((r.slots as unknown[]).filter((s): s is string => typeof s === "string" && TIME_RE.test(s)))).sort()
    : [...d.slots];
  const closedDates = Array.isArray(r.closedDates)
    ? Array.from(new Set((r.closedDates as unknown[]).filter((s): s is string => typeof s === "string" && DATE_RE.test(s)))).sort()
    : [];
  return { weekly, slots, closedDates };
}

/** Bir Date için yerel YYYY-MM-DD (UTC kayması olmadan). */
export function ymd(dt: Date): string {
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** YYYY-MM-DD için haftagünü anahtarı (yerel öğlen ile DST/UTC kenar durumlarından kaçınır). */
export function weekdayOf(dateStr: string): Weekday {
  const [y, m, d] = dateStr.split("-").map(Number);
  return String(new Date(y, m - 1, d, 12, 0, 0).getDay()) as Weekday;
}

/** date (YYYY-MM-DD) randevuya açık mı? today (YYYY-MM-DD) referansıyla. */
export function isDayBookable(config: BookingConfigData, dateStr: string, todayStr: string): boolean {
  if (!DATE_RE.test(dateStr)) return false;
  if (dateStr < todayStr) return false;                    // geçmiş
  if (config.closedDates.includes(dateStr)) return false;  // elle kapatılmış
  return config.weekly[weekdayOf(dateStr)] === true;       // haftagünü açık
}

/** Bir ay için Pazartesi-başlangıçlı hücre dizisi; boş hücreler null. */
export function buildMonth(year: number, month: number): (string | null)[] {
  const first = new Date(year, month, 1);
  const lead = (first.getDay() + 6) % 7; // Pazartesi=0 olacak şekilde öne boşluk
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (string | null)[] = [];
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(`${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`);
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
```

- [ ] **Step 2: Lint/type kontrolü**

Run (web/): `npx tsc --noEmit`
Expected: Hata yok.

- [ ] **Step 3: Commit**

```bash
git add web/src/lib/booking-config.ts
git commit -m "feat(booking): saf config modülü (tipler + uygunluk yardımcıları)"
```

---

### Task 3: Server action'lar — config get/save

**Files:**
- Modify: `web/src/lib/actions/bookings.ts`

- [ ] **Step 1: Import'ları ve yetki yardımcısını ekle**

`web/src/lib/actions/bookings.ts` dosyasının en üstündeki import bloğunu şununla değiştir:

```ts
"use server";

import { revalidatePath } from "next/cache";
import type { Prisma, Booking } from "@/generated/prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { clientId, rateLimit } from "@/lib/rate-limit";
import {
  DEFAULT_BOOKING_CONFIG,
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
```

- [ ] **Step 2: `getBookingConfig` ve `saveBookingConfig` ekle**

Aynı dosyada, mevcut `createBooking`'ten **önce** ekle:

```ts
/** Randevu uygunluk config'i (yoksa varsayılan). Modal ve admin ortak kullanır. */
export async function getBookingConfig(): Promise<BookingConfigData> {
  const row = await prisma.bookingConfig.findUnique({ where: { id: 1 } });
  return row ? normalizeBookingConfig(row.data) : DEFAULT_BOOKING_CONFIG;
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
```

- [ ] **Step 3: Type kontrolü**

Run (web/): `npx tsc --noEmit`
Expected: Hata yok (`prisma.bookingConfig` Task 1'den sonra mevcut).

- [ ] **Step 4: Commit**

```bash
git add web/src/lib/actions/bookings.ts
git commit -m "feat(booking): getBookingConfig + saveBookingConfig action'ları"
```

---

### Task 4: Server action'lar — gün uygunluğu + genişletilmiş createBooking + admin mutasyonları

**Files:**
- Modify: `web/src/lib/actions/bookings.ts`

- [ ] **Step 1: `getTakenSlots`'u `getDayAvailability` ile değiştir**

`web/src/lib/actions/bookings.ts` sonundaki `getTakenSlots` fonksiyonunu **tamamen kaldır** ve yerine şunu koy:

```ts
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
```

- [ ] **Step 2: `createBooking`'i yeni alanlar + sunucu doğrulamasıyla genişlet**

Mevcut `createBooking` fonksiyonunun **gövdesini** şununla değiştir (imza aynı kalır):

```ts
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
```

- [ ] **Step 3: Admin liste/durum/sil action'larını ekle**

Dosyanın sonuna ekle:

```ts
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
```

- [ ] **Step 4: Lint + type kontrolü**

Run (web/): `npx tsc --noEmit && npm run lint`
Expected: Hata yok. (Eski `getTakenSlots` kaldırıldı; tek tüketicisi olan modal Faz 3'te yeniden yazılacak — bu noktada `BookingModal.tsx` hâlâ eski `getTakenSlots`'u import ettiği için type/lint hatası verebilir; bu beklenen, Task 8'de düzelecek. Yine de devam etmeden önce hatanın yalnızca `BookingModal.tsx`'in `getTakenSlots` import'undan kaynaklandığını doğrula.)

> Not: Bu hatayı bu task'ta çözmek istersen, `BookingModal.tsx` içindeki `getTakenSlots` import'unu ve `useEffect` kullanımını geçici olarak `getDayAvailability`'e çevirebilirsin; ancak modal Task 8'de tamamen yeniden yazılacağı için bu zorunlu değil.

- [ ] **Step 5: Commit**

```bash
git add web/src/lib/actions/bookings.ts
git commit -m "feat(booking): gün uygunluğu + alanlı createBooking + admin mutasyonları"
```

---

## Phase 2 — Admin

### Task 5: `bookings/page.tsx` — async server component

**Files:**
- Modify: `web/src/app/admin/bookings/page.tsx`

- [ ] **Step 1: Veriyi çekip client'a serileştirilmiş prop geç**

`web/src/app/admin/bookings/page.tsx` içeriğini tamamen şununla değiştir:

```tsx
import { listBookings, getBookingConfig } from "@/lib/actions/bookings";
import { BookingsClient } from "./client";

export default async function BookingsPage() {
  const [bookings, config] = await Promise.all([listBookings(), getBookingConfig()]);
  const rows = bookings.map((b) => ({
    id: b.id,
    name: b.name,
    email: b.email,
    phone: b.phone,
    topic: b.topic,
    type: b.type,
    message: b.message,
    slot: b.slot.toISOString(),
    status: b.status,
  }));
  return <BookingsClient initialBookings={rows} initialConfig={config} />;
}
```

- [ ] **Step 2: Commit** (client Task 6'da güncellenecek; bu adımda type hatası olabilir — beraber commit'lemek için Task 6 sonunda commit edilecektir. Bu task'ı ayrı commit'lemeyip Task 6 ile birlikte commit et.)

> Bu task ile Task 6 aynı commit'te birleşir (page + client birlikte derlenir).

---

### Task 6: `bookings/client.tsx` — sekmeli admin UI (rewrite)

**Files:**
- Modify: `web/src/app/admin/bookings/client.tsx` (tam yeniden yazım)

- [ ] **Step 1: Client'ı baştan yaz**

`web/src/app/admin/bookings/client.tsx` içeriğini tamamen şununla değiştir:

```tsx
"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AdmCard, Seg, Switch, MkSelect } from "@/components/admin/ui";
import { Icon } from "@/components/admin/AdminIcons";
import { setBookingStatus, deleteBooking, saveBookingConfig } from "@/lib/actions/bookings";
import type { BookingConfigData, Weekday } from "@/lib/booking-config";

type Row = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  topic: string | null;
  type: string | null;
  message: string | null;
  slot: string; // ISO
  status: string;
};

const STATUS_OPTS = [
  { value: "pending", label: "Bekliyor" },
  { value: "confirmed", label: "Onaylı" },
  { value: "cancelled", label: "İptal" },
];

const WEEKDAYS: { key: Weekday; label: string }[] = [
  { key: "1", label: "Pazartesi" },
  { key: "2", label: "Salı" },
  { key: "3", label: "Çarşamba" },
  { key: "4", label: "Perşembe" },
  { key: "5", label: "Cuma" },
  { key: "6", label: "Cumartesi" },
  { key: "0", label: "Pazar" },
];

const SLOT_PALETTE = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

function fmtDateTime(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("tr-TR", { weekday: "short", day: "2-digit", month: "long" }),
    time: d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
  };
}

export function BookingsClient({
  initialBookings,
  initialConfig,
}: {
  initialBookings: Row[];
  initialConfig: BookingConfigData;
}) {
  const [tab, setTab] = useState("list");
  return (
    <>
      <div style={{ marginBottom: "1.5rem", maxWidth: 360 }}>
        <Seg
          value={tab}
          onChange={setTab}
          options={[
            { label: "Randevular", value: "list" },
            { label: "Çalışma günleri", value: "config" },
          ]}
        />
      </div>
      {tab === "list" ? <BookingList rows={initialBookings} /> : <WorkingDays config={initialConfig} />}
    </>
  );
}

function BookingList({ rows }: { rows: Row[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const now = new Date();
  const upcoming = rows.filter((b) => b.status !== "cancelled" && new Date(b.slot) >= now);

  const changeStatus = (id: string, status: string) =>
    start(async () => {
      await setBookingStatus(id, status);
      router.refresh();
    });
  const remove = (id: string) =>
    start(async () => {
      await deleteBooking(id);
      router.refresh();
    });

  return (
    <AdmCard title="Randevular" desc={`${upcoming.length} yaklaşan · ${rows.length} toplam`}>
      {!rows.length ? (
        <div style={{ padding: "4rem", textAlign: "center", color: "var(--text-muted)" }}>
          <p>Henüz randevu yok.</p>
        </div>
      ) : (
        <table className="adm-table" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", textAlign: "left", fontSize: 13, color: "var(--text-muted)" }}>
              <th style={{ padding: "1rem" }}>Tarih & Saat</th>
              <th style={{ padding: "1rem" }}>Kişi</th>
              <th style={{ padding: "1rem" }}>Konu / Tür</th>
              <th style={{ padding: "1rem" }}>Durum</th>
              <th style={{ padding: "1rem" }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => {
              const { date, time } = fmtDateTime(b.slot);
              return (
                <tr key={b.id} style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)", opacity: b.status === "cancelled" ? 0.6 : 1 }}>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <b style={{ fontSize: 14 }}>{date}</b>
                      <span style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{time}</span>
                    </div>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <span style={{ fontWeight: 600 }}>{b.name}</span>
                      <a href={`mailto:${b.email}`} style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none", fontFamily: "var(--font-mono)" }}>{b.email}</a>
                      {b.phone && (
                        <a href={`tel:${b.phone}`} style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none", fontFamily: "var(--font-mono)" }}>{b.phone}</a>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: "1rem", color: "var(--text-muted)", fontSize: 14 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <span>{b.topic || "—"}</span>
                      {b.type && <span style={{ fontSize: 12 }}>{b.type}</span>}
                      {b.message && <span style={{ fontSize: 12, fontStyle: "italic" }}>{b.message}</span>}
                    </div>
                  </td>
                  <td style={{ padding: "1rem", minWidth: 140 }}>
                    <MkSelect width="140px" value={b.status} onChange={(v: string) => changeStatus(b.id, v)} options={STATUS_OPTS} />
                  </td>
                  <td style={{ padding: "1rem", textAlign: "right" }}>
                    <button className="adm-iconbtn" disabled={pending} onClick={() => remove(b.id)} aria-label="Sil">
                      <Icon name="trash" size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </AdmCard>
  );
}

function WorkingDays({ config }: { config: BookingConfigData }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [weekly, setWeekly] = useState<Record<Weekday, boolean>>(config.weekly);
  const [slots, setSlots] = useState<string[]>(config.slots);
  const [closed, setClosed] = useState<string[]>(config.closedDates);
  const [newDate, setNewDate] = useState("");
  const [saved, setSaved] = useState(false);

  const todayStr = new Date().toISOString().slice(0, 10);
  const toggleSlot = (s: string) =>
    setSlots((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s].sort()));
  const addClosed = () => {
    if (newDate && !closed.includes(newDate)) setClosed((c) => [...c, newDate].sort());
    setNewDate("");
  };
  const removeClosed = (d: string) => setClosed((c) => c.filter((x) => x !== d));

  const save = () =>
    start(async () => {
      await saveBookingConfig({ weekly, slots, closedDates: closed });
      router.refresh();
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2000);
    });

  const chip = (active: boolean): React.CSSProperties => ({
    padding: ".5rem .9rem",
    borderRadius: "var(--radius-pill)",
    cursor: "pointer",
    fontFamily: "var(--font-mono)",
    fontSize: 13,
    border: "1px solid " + (active ? "var(--accent)" : "var(--border)"),
    background: active ? "var(--accent)" : "var(--surface)",
    color: active ? "var(--on-accent)" : "var(--text)",
  });

  return (
    <div style={{ display: "grid", gap: "1.5rem", maxWidth: "44rem" }}>
      <AdmCard title="Çalışma günleri" desc="Randevuya açık haftagünleri">
        <div style={{ padding: "0 1rem 1rem" }}>
          {WEEKDAYS.map((d) => (
            <div key={d.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: ".7rem 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontWeight: 500 }}>{d.label}</span>
              <Switch on={weekly[d.key]} onChange={(v) => setWeekly((w) => ({ ...w, [d.key]: v }))} />
            </div>
          ))}
        </div>
      </AdmCard>

      <AdmCard title="Çalışma saatleri" desc="Randevuya açık başlangıç saatleri">
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", padding: "0 1rem 1rem" }}>
          {SLOT_PALETTE.map((s) => (
            <button key={s} type="button" aria-pressed={slots.includes(s)} onClick={() => toggleSlot(s)} style={chip(slots.includes(s))}>
              {s}
            </button>
          ))}
        </div>
      </AdmCard>

      <AdmCard title="Kapalı günler" desc="Resmi tatil / izin — takvimde kapalı görünür">
        <div style={{ display: "flex", gap: ".5rem", padding: "0 1rem 1rem", alignItems: "center" }}>
          <input type="date" className="adm-input" value={newDate} min={todayStr} onChange={(e) => setNewDate(e.target.value)} style={{ maxWidth: 200 }} />
          <button type="button" className="adm-btn adm-btn--ghost" onClick={addClosed} disabled={!newDate}>
            Ekle
          </button>
        </div>
        {closed.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", padding: "0 1rem 1rem" }}>
            {closed.map((d) => (
              <span key={d} style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", padding: ".4rem .7rem", borderRadius: "var(--radius-pill)", border: "1px solid var(--border)", fontFamily: "var(--font-mono)", fontSize: 13 }}>
                {d}
                <button type="button" onClick={() => removeClosed(d)} aria-label="Kaldır" style={{ border: 0, background: "none", cursor: "pointer", color: "var(--text-muted)", display: "inline-flex" }}>
                  <Icon name="close" size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </AdmCard>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <button className="adm-btn adm-btn--primary" disabled={pending} onClick={save}>
          {pending ? "Kaydediliyor…" : "Kaydet"}
        </button>
        {saved && <span style={{ color: "var(--accent)", fontSize: 13 }}>Kaydedildi ✓</span>}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Lint + type kontrolü**

Run (web/): `npx tsc --noEmit && npm run lint`
Expected: Hata yok. (`page.tsx` ve `client.tsx` artık uyumlu.)

- [ ] **Step 3: Commit**

```bash
git add web/src/app/admin/bookings/page.tsx web/src/app/admin/bookings/client.tsx
git commit -m "feat(admin): sekmeli randevular — gerçek DB listesi + çalışma günleri editörü"
```

---

## Phase 3 — Public 3 adımlı wizard

### Task 7: CSS — stepper / segmented / takvim / nav

**Files:**
- Modify: `web/src/styles/site.css` (mevcut `.bookm__*` bloklarının hemen ardına, satır ~554 civarı `.bookm__slot:disabled` kuralından sonra)

- [ ] **Step 1: Wizard stillerini ekle**

`web/src/styles/site.css` içinde `.bookm__slot:disabled { ... }` kuralından **sonra** şunu ekle:

```css
/* --- Booking wizard: adım göstergesi --- */
.bookm__steps {
  display: flex;
  align-items: center;
  gap: .4rem;
  margin: var(--space-4) 0 var(--space-5);
}
.bookm__step {
  display: flex;
  align-items: center;
  gap: .45rem;
  color: var(--text-muted);
}
.bookm__step .n {
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--surface);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
}
.bookm__step.on .n { border-color: var(--accent); color: var(--accent); }
.bookm__step.done .n { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
.bookm__step .lbl {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: var(--ls-label);
  text-transform: uppercase;
  white-space: nowrap;
}
.bookm__step.on .lbl,
.bookm__step.done .lbl { color: var(--text); }
.bookm__steps .bar {
  flex: 1;
  height: 1px;
  min-width: 6px;
  background: var(--border);
}

/* --- segmented (görüşme türü) --- */
.bookm__seg {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 2px;
  padding: 3px;
  background: var(--surface-muted);
  border-radius: var(--radius-pill);
}
.bookm__seg button {
  padding: .5rem .4rem;
  border: 0;
  background: none;
  border-radius: var(--radius-pill);
  font-family: inherit;
  font-size: var(--fs-sm);
  color: var(--text-muted);
  cursor: pointer;
  transition: background var(--dur-fast), color var(--dur-fast);
}
.bookm__seg button.on {
  background: var(--bg);
  color: var(--text);
  box-shadow: var(--shadow-1);
}

/* --- select & textarea (form ile uyumlu) --- */
.authm__form select,
.authm__form textarea {
  font-family: var(--font-sans);
  font-size: var(--fs-body);
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: .7rem .8rem;
  transition: border-color var(--dur-fast);
}
.authm__form select { cursor: pointer; }
.authm__form textarea { min-height: 5rem; resize: vertical; }
.authm__form select:focus,
.authm__form textarea:focus { outline: none; border-color: var(--accent); }

/* --- takvim --- */
.bookm__cal {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--space-3);
}
.bookm__cal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-3);
}
.bookm__cal-head b {
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
}
.bookm__cal-nav { display: flex; gap: .25rem; }
.bookm__cal-nav button {
  width: 30px;
  height: 30px;
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: var(--radius-sm);
  color: var(--text);
  cursor: pointer;
}
.bookm__cal-nav button:disabled { opacity: .35; cursor: not-allowed; }
.bookm__cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}
.bookm__cal-dow {
  text-align: center;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--text-muted);
  padding-bottom: 4px;
}
.bookm__day {
  aspect-ratio: 1 / 1;
  display: grid;
  place-items: center;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  background: var(--surface-muted);
  color: var(--text);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  cursor: pointer;
  transition: border-color var(--dur-fast), background var(--dur-fast), color var(--dur-fast);
}
.bookm__day:hover:not(.is-disabled) { border-color: var(--accent); }
.bookm__day.is-disabled { opacity: .3; cursor: not-allowed; background: transparent; }
.bookm__day.is-on { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
.bookm__day.is-empty { visibility: hidden; }

/* --- adım navigasyonu --- */
.bookm__nav {
  display: flex;
  justify-content: space-between;
  gap: var(--space-3);
  margin-top: var(--space-5);
}
.bookm__hint {
  font-size: var(--fs-xs);
  color: var(--text-muted);
  margin: 0;
}
```

- [ ] **Step 2: Aynı değişikliği UI kit kopyasına uygula (varsa eşitlenmesi gerekiyorsa)**

Not: `ui_kits/website/site.css` prototip referansıdır; production build'i etkilemez. Bu işte yalnızca `web/src/styles/site.css` gereklidir; UI kit'i güncellemek **gerekmez** (kapsam dışı).

- [ ] **Step 3: Commit**

```bash
git add web/src/styles/site.css
git commit -m "feat(booking): wizard/takvim/stepper stilleri"
```

---

### Task 8: `BookingModal.tsx` — 3 adımlı wizard (rewrite)

**Files:**
- Modify: `web/src/components/marka/BookingModal.tsx` (tam yeniden yazım)

- [ ] **Step 1: Modal'ı baştan yaz**

`web/src/components/marka/BookingModal.tsx` içeriğini tamamen şununla değiştir:

```tsx
"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { createBooking, getBookingConfig, getDayAvailability } from "@/lib/actions/bookings";
import {
  DEFAULT_BOOKING_CONFIG,
  isDayBookable,
  ymd,
  buildMonth,
  type BookingConfigData,
} from "@/lib/booking-config";

const TOPICS = ["Marka & ürün", "Web tasarım", "Geliştirme", "Akademi / eğitim", "Diğer"];
const TYPES = ["Online", "Yüz yüze", "Telefon"];
const STEPS = ["Kişisel bilgiler", "Detaylar", "Tarih & saat"];
const DOW = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const MONTHS = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

const emailOk = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export function BookingModal({ onClose }: { onClose: () => void }) {
  const [config, setConfig] = useState<BookingConfigData>(DEFAULT_BOOKING_CONFIG);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: TOPICS[0],
    type: TYPES[0],
    phone: "",
    message: "",
  });
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<string | null>(null);
  const [avail, setAvail] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ date: string; slot: string; type: string } | null>(null);
  const [pending, start] = useTransition();

  const todayStr = useMemo(() => ymd(new Date()), []);
  const [view, setView] = useState(() => {
    const d = new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  });
  const cells = useMemo(() => buildMonth(view.y, view.m), [view]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    getBookingConfig()
      .then(setConfig)
      .catch(() => {});
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Gün seçilince o günün boş saatlerini çek.
  useEffect(() => {
    if (!date) {
      setAvail([]);
      return;
    }
    let live = true;
    setLoadingSlots(true);
    setSlot(null);
    getDayAvailability(date).then((a) => {
      if (live) {
        setAvail(a);
        setLoadingSlots(false);
      }
    });
    return () => {
      live = false;
    };
  }, [date]);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const step1Ok = form.name.trim().length > 0 && emailOk(form.email.trim());
  const step2Ok = Boolean(form.topic) && Boolean(form.type) && (form.type !== "Telefon" || form.phone.trim().length > 0);

  function next() {
    setError(null);
    if (step === 1 && !step1Ok) {
      setError("Ad ve geçerli bir e-posta gerekli.");
      return;
    }
    if (step === 2 && !step2Ok) {
      setError("Telefon görüşmesi için numara gerekli.");
      return;
    }
    setStep((s) => Math.min(3, s + 1));
  }
  function back() {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  }

  // Ay gezinme — geçerli aydan öncesine izin verme.
  const now = new Date();
  const canPrev = view.y > now.getFullYear() || (view.y === now.getFullYear() && view.m > now.getMonth());
  const shiftMonth = (delta: number) =>
    setView((v) => {
      const d = new Date(v.y, v.m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });

  function submit() {
    setError(null);
    if (!date || !slot) {
      setError("Lütfen bir gün ve saat seç.");
      return;
    }
    start(async () => {
      const fd = new FormData();
      fd.set("name", form.name.trim());
      fd.set("email", form.email.trim());
      fd.set("phone", form.phone.trim());
      fd.set("topic", form.topic);
      fd.set("type", form.type);
      fd.set("message", form.message.trim());
      fd.set("slot", `${date}T${slot}:00`);
      const res = await createBooking(undefined, fd);
      if (res?.error) setError(res.error);
      else setDone({ date, slot, type: form.type });
    });
  }

  return (
    <div className="authm bookm">
      <div className="authm__scrim" onClick={onClose} />
      {done ? (
        <div className="authm__box bookm__box" style={{ textAlign: "center" }} role="dialog" aria-modal="true">
          <div
            aria-hidden="true"
            style={{
              width: 56,
              height: 56,
              margin: "0 auto var(--space-3)",
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              background: "var(--accent)",
              color: "var(--on-accent)",
              fontSize: "1.6rem",
            }}
          >
            ✓
          </div>
          <h3 className="bookm__title">Görüşmen planlandı</h3>
          <p className="bookm__sub">
            {done.date} · {done.slot} · {done.type} — onay e-postası gönderilecek.
          </p>
          <button className="btn btn--primary" onClick={onClose} style={{ marginTop: "var(--space-4)" }}>
            Tamam
          </button>
        </div>
      ) : (
        <div className="authm__box bookm__box" role="dialog" aria-modal="true" aria-label="Görüşme planla">
          <button className="authm__x" onClick={onClose} aria-label="Kapat">
            ✕
          </button>
          <span className="eyebrow">Ücretsiz Tanışma</span>
          <h3 className="bookm__title">Görüşme planla</h3>
          <p className="bookm__sub">30 dakikalık keşif görüşmesi. Üç kısa adımda planla.</p>

          {/* adım göstergesi */}
          <div className="bookm__steps">
            {STEPS.map((label, i) => {
              const n = i + 1;
              const cls = n === step ? "on" : n < step ? "done" : "";
              return (
                <div key={label} style={{ display: "contents" }}>
                  <div className={`bookm__step ${cls}`}>
                    <span className="n">{n < step ? "✓" : n}</span>
                    <span className="lbl">{label}</span>
                  </div>
                  {n < STEPS.length && <span className="bar" />}
                </div>
              );
            })}
          </div>

          <div className="authm__form">
            {step === 1 && (
              <>
                <label>
                  Ad Soyad
                  <input value={form.name} onChange={(e) => set("name", e.target.value)} autoFocus />
                </label>
                <label>
                  E-posta
                  <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
                </label>
              </>
            )}

            {step === 2 && (
              <>
                <label>
                  Konu
                  <select value={form.topic} onChange={(e) => set("topic", e.target.value)}>
                    {TOPICS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Görüşme türü
                  <div className="bookm__seg" role="group" aria-label="Görüşme türü">
                    {TYPES.map((t) => (
                      <button key={t} type="button" className={form.type === t ? "on" : ""} onClick={() => set("type", t)}>
                        {t}
                      </button>
                    ))}
                  </div>
                </label>
                <label>
                  Telefon{form.type === "Telefon" ? "" : " (opsiyonel)"}
                  <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="05xx xxx xx xx" />
                </label>
                <label>
                  Mesaj (opsiyonel)
                  <textarea value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Kısaca neyi konuşmak istersin?" />
                </label>
              </>
            )}

            {step === 3 && (
              <>
                <div className="bookm__cal">
                  <div className="bookm__cal-head">
                    <b>
                      {MONTHS[view.m]} {view.y}
                    </b>
                    <div className="bookm__cal-nav">
                      <button type="button" onClick={() => shiftMonth(-1)} disabled={!canPrev} aria-label="Önceki ay">
                        ‹
                      </button>
                      <button type="button" onClick={() => shiftMonth(1)} aria-label="Sonraki ay">
                        ›
                      </button>
                    </div>
                  </div>
                  <div className="bookm__cal-grid">
                    {DOW.map((d) => (
                      <div key={d} className="bookm__cal-dow">
                        {d}
                      </div>
                    ))}
                    {cells.map((cell, i) => {
                      if (!cell) return <div key={`e${i}`} className="bookm__day is-empty" />;
                      const bookable = isDayBookable(config, cell, todayStr);
                      const on = date === cell;
                      const dayNum = Number(cell.slice(-2));
                      return (
                        <button
                          key={cell}
                          type="button"
                          disabled={!bookable}
                          className={`bookm__day ${!bookable ? "is-disabled" : ""} ${on ? "is-on" : ""}`}
                          onClick={() => setDate(cell)}
                        >
                          {dayNum}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {date && (
                  <div>
                    {loadingSlots ? (
                      <p className="bookm__hint">Saatler yükleniyor…</p>
                    ) : avail.length === 0 ? (
                      <p className="bookm__hint">Bu gün için uygun saat yok. Başka bir gün seç.</p>
                    ) : (
                      <div className="bookm__slots">
                        {avail.map((s) => (
                          <button key={s} type="button" className={`bookm__slot ${slot === s ? "on" : ""}`} onClick={() => setSlot(s)}>
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {error && <p className="authm__err">{error}</p>}

            <div className="bookm__nav">
              {step > 1 ? (
                <button type="button" className="btn btn--ghost" onClick={back}>
                  <span className="arr">←</span> Geri
                </button>
              ) : (
                <span />
              )}
              {step < 3 ? (
                <button type="button" className="btn btn--primary" onClick={next}>
                  İleri <span className="arr">→</span>
                </button>
              ) : (
                <button type="button" className="btn btn--primary" onClick={submit} disabled={pending || !date || !slot}>
                  {pending ? "Planlanıyor…" : "Görüşmeyi onayla"} <span className="arr">→</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

> Not: Kullanılan sınıflar (`.btn`, `.btn--primary`, `.btn--ghost`, `.arr`, `.eyebrow`) `web/src/styles/site.css` içinde mevcuttur — doğrulandı.

- [ ] **Step 2: Lint + type kontrolü**

Run (web/): `npx tsc --noEmit && npm run lint`
Expected: Hata yok. Artık `getTakenSlots`'a referans kalmadı.

- [ ] **Step 3: Commit**

```bash
git add web/src/components/marka/BookingModal.tsx
git commit -m "feat(booking): 3 adımlı public wizard modal"
```

---

### Task 9: Bütünsel doğrulama (build + manuel)

**Files:** (yok — yalnızca doğrulama)

- [ ] **Step 1: Production build**

Run (web/): `npm run build`
Expected: Build başarılı, type/lint hatası yok.

- [ ] **Step 2: Dev sunucu + manuel akış**

Run (web/): `npm run dev`, sonra `http://localhost:3000`.

Doğrula:
- [ ] Header'dan "Görüşme planla" → modal açılır; **adım göstergesi 1·2·3** görünür, marka çizgisinde.
- [ ] Adım 1: ad boş / e-posta geçersizken "İleri" hata verir; geçerli olunca adım 2'ye geçer.
- [ ] Adım 2: tür "Telefon" iken telefon boşsa "İleri" hata; "Online/Yüz yüze" iken telefon opsiyonel.
- [ ] Adım 3: takvim açık; **geçmiş günler, hafta sonu (varsayılan kapalı), kapalı günler gri/pasif**; açık gün seçilince saat çipleri gelir; geçmiş aya "‹" pasif.
- [ ] Gün+saat seç → "Görüşmeyi onayla" → başarı ekranı (tarih · saat · tür, accent ✓, emoji yok).

- [ ] **Step 3: Admin doğrulama**

`http://localhost:3000/admin/bookings` (ADMIN/EDITOR ile giriş):
- [ ] "Randevular" sekmesi yeni oluşturulan randevuyu **gerçek veriyle** gösterir (tür/telefon dahil); durum değiştir + sil çalışır.
- [ ] "Çalışma günleri" sekmesi: bir haftagününü kapat + bir saat çıkar + bir tarih kapat → "Kaydet".
- [ ] Modal'a dön: kapatılan haftagünü ve kapatılan tarih **pasif**; çıkarılan saat **görünmüyor**.

- [ ] **Step 4: Sunucu doğrulaması (savunma) — opsiyonel hızlı kontrol**

Bir gün için tüm saatleri dolu/kapalı yapıp modal'da o güne ait eski bir slot ile gönderim denenirse `createBooking` "Bu zaman artık uygun değil." döndürmeli (normal akışta UI zaten engeller; bu yalnızca sunucu guard'ının çalıştığını teyit eder).

- [ ] **Step 5: Doğrulama tamam** — branch hazır.

---

## Self-Review

**1. Spec coverage:**
- Booking yeni alanları + migration → Task 1 ✓
- `BookingConfig` singleton → Task 1 ✓
- Saf config/uygunluk modülü → Task 2 ✓
- `getBookingConfig`/`saveBookingConfig` → Task 3 ✓
- `getDayAvailability` + genişletilmiş `createBooking` (sunucu doğrulaması) → Task 4 ✓
- `listBookings`/`setBookingStatus`/`deleteBooking` → Task 4 ✓
- Admin liste gerçek DB'ye + yeni alanlar görünür → Task 5+6 ✓
- Admin "Çalışma günleri" editörü (haftagünü toggle + saat çipleri + kapalı günler) → Task 6 ✓
- 3 adımlı wizard (stepper, adım1 kişisel, adım2 detay, adım3 özel takvim + slotlar) → Task 7+8 ✓
- Başarı ekranı, emoji temizliği → Task 8 ✓
- CSS token tabanlı, dark-mode uyumlu → Task 7 ✓
- Rol koruması → Task 3/4 (`requireStaff`) ✓
- Rate limit korunur → Task 4 ✓

**2. Placeholder scan:** Tüm adımlarda tam kod var; "TBD/TODO" yok. `btn--ghost` için açık fallback talimatı verildi.

**3. Type consistency:** `BookingConfigData`/`Weekday` tek kaynaktan (`lib/booking-config.ts`), hem action'lar hem client aynı tipi kullanıyor. `getDayAvailability(date: string): Promise<string[]>` imzası modal kullanımıyla eşleşiyor. `Row` tipi `page.tsx`'in ürettiği prop şekliyle (slot ISO string) birebir uyumlu. `saveBookingConfig(data: BookingConfigData)` çağrısı client'taki `{ weekly, slots, closedDates }` ile eşleşiyor.

## Kapsam dışı (sonraya)

- Güne-özel farklı saatler (şimdilik ortak saat listesi).
- `/randevu` standalone sayfasının modal'la hizalanması.
- E-posta onayı / .ics / online görüşme linki.
- Birim test altyapısı kurulumu.
