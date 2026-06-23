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
