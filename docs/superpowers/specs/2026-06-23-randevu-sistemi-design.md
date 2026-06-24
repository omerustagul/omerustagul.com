# Randevu Sistemi — Tasarım Spec'i

**Tarih:** 2026-06-23
**Durum:** Onaylandı (uygulama planı bekleniyor)
**Kapsam:** Public randevu popup'ının 3 adımlı wizard'a dönüştürülmesi + admin'de
çalışma günleri yönetimi + randevuların gerçek veritabanına bağlanması.

## Amaç

Mevcut tek adımlı, native `<input type="date">` + sabit saat butonlu randevu modal'ı,
markanın tasarım diline tam sadık **3 adımlı bir wizard**a dönüştürülecek. Randevu
uygunluğu artık admin panelinden tanımlanan **çalışma günleri/saatleri**ne ve tek tek
**kapatılan günlere** göre belirlenecek. Toplanan tüm bilgiler veritabanına kaydedilecek.

## Mevcut durum (başlangıç noktası)

- `web/src/components/marka/BookingModal.tsx` — tek adımlı form (ad/e-posta + konu +
  native tarih input + sabit `SLOTS = ["10:00".."17:00"]`).
- `web/src/lib/actions/bookings.ts` — `createBooking` yalnızca `name/email/slot`
  kaydeder; `getTakenSlots(date)` o günün dolu saatlerini döndürür.
- `web/prisma/schema.prisma` — `Booking { id, name, email, slot, status, createdAt }`.
- `web/src/app/admin/bookings/client.tsx` — **mock data** (`INITIAL_BOOKINGS`),
  DB'ye bağlı değil.
- Tasarım sistemi: token CSS (`--accent` elektrik yeşili, `--font-mono`, `--radius`,
  `--shadow-pop` vb.), Tailwind yok. Marka kuralı: Türkçe, editoryal, **emoji yok**
  (→ ↗ glyph'leri), mono etiketler BÜYÜK harf, sayılar/tarihler mono.
- Singleton config deseni mevcut: `SiteSettings`, `CommunityConfig`, `AppSettings`
  hepsi `id Int @default(1) + data Json`.
- Admin UI primitifleri (`web/src/components/admin/ui.tsx`): `AdmCard`, `Switch`,
  `Seg`, `Badge`, `MkSelect` (multi destekli), `Field`, `Modal`, `Table`, `SubmitButton`.

## Onaylanan kararlar

1. **2. adım alanları:** Hepsi — konu + görüşme türü + telefon + mesaj.
2. **Takvim uygunluğu:** Admin'de tanımlanan çalışma günleri/saatleri + tek tek
   kapatılabilen günler. Modal yalnızca açık gün/saatleri gösterir.
3. **Persistans:** Yeni alanlar `Booking` modeline eklenir (migration). Admin'de görünür.
4. **Saat granülaritesi:** Tüm çalışma günleri için **ortak** saat listesi (güne-özel
   saatler ileride bir genişletme; şimdilik YAGNI).
5. **Admin listesi:** Şu an mock olan liste **bu işin parçası olarak** gerçek DB'ye
   bağlanır (yeni alanların görünmesi için gerekli).
6. **Kapsam dışı:** Ayrı `/randevu` sayfası (basit tek-form) bu işte değişmez.

---

## 1. Veri katmanı (Prisma + migration)

### `Booking` modeline eklenen alanlar (hepsi opsiyonel — eski kayıtları bozmaz)

```prisma
model Booking {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?   // YENİ
  topic     String?   // YENİ  — "Marka & ürün" | "Web tasarım" | ...
  type      String?   // YENİ  — "Online" | "Yüz yüze" | "Telefon"
  message   String?   // YENİ
  slot      DateTime
  status    String   @default("pending")
  createdAt DateTime @default(now())
}
```

### Yeni singleton config

```prisma
model BookingConfig {
  id   Int  @id @default(1)
  data Json
}
```

`data` şekli (TypeScript tipi olarak `lib/actions/bookings.ts` içinde tanımlanır):

```ts
type BookingConfigData = {
  // Haftanın günü → açık mı? Anahtar JS getDay() ile uyumlu: 0=Pazar .. 6=Cumartesi
  weekly: Record<"0"|"1"|"2"|"3"|"4"|"5"|"6", boolean>;
  // Tüm açık günler için ortak randevu saatleri (başlangıç saatleri, "HH:MM")
  slots: string[];
  // Tek tek kapatılan günler (resmi tatil/izin) — "YYYY-MM-DD"
  closedDates: string[];
};
```

**Varsayılan config** (config yoksa `getBookingConfig` bunu döndürür):
```ts
{
  weekly: { "0": false, "1": true, "2": true, "3": true, "4": true, "5": true, "6": false },
  slots: ["10:00","11:00","13:00","14:00","15:00","16:00","17:00"],
  closedDates: [],
}
```

Migration: `npx prisma migrate dev --name booking-fields-and-config`, ardından
`npx prisma generate`.

---

## 2. Server action'lar (`web/src/lib/actions/bookings.ts`)

Mevcut `createBooking` ve `getTakenSlots` korunur/genişletilir; yenileri eklenir.

### Public

- **`getBookingConfig(): Promise<BookingConfigData>`**
  Singleton'ı okur; yoksa varsayılanı döndürür. Modal ve admin ortak kullanır.

- **`getDayAvailability(date: string): Promise<string[]>`**
  `date` (YYYY-MM-DD) için **boş** saatleri döndürür:
  config saatleri − o gün dolu saatler (`Booking` sorgusu). Gün kapalıysa
  (haftagünü kapalı / `closedDates`'te / geçmiş) boş dizi döner.
  > `getTakenSlots` mantığı buraya taşınır; geriye dönük uyum için `getTakenSlots`
  > kalabilir ama modal artık `getDayAvailability` kullanır.

- **`createBooking(_prev, formData)`** — genişletilir:
  - Yeni form alanlarını okur: `phone`, `topic`, `type`, `message`.
  - **Sunucu tarafı doğrulama (savunma):** seçilen slot'un günü `weekly`'de açık mı,
    `closedDates`'te değil mi, geçmişte değil mi, saat config `slots` içinde mi ve
    halen boş mu? Değilse `{ error: "Bu zaman artık uygun değil." }`.
  - Geçerliyse `Booking.create` ile tüm alanları kaydeder.

### Admin (rol korumalı — `ADMIN`/`EDITOR`)

- **`saveBookingConfig(data: BookingConfigData): Promise<State>`**
  Singleton upsert (`id: 1`). Girdi sanitize edilir (geçerli "HH:MM" slot'lar,
  geçerli tarih formatları). `revalidatePath("/admin/bookings")`.

- **`listBookings(): Promise<Booking[]>`** — admin liste için, `slot` artan.

- **`setBookingStatus(id, status): Promise<State>`** — `pending|confirmed|cancelled`
  (UI'da Bekliyor/Onaylı/İptal). `revalidatePath`.

- **`deleteBooking(id): Promise<State>`** — siler. `revalidatePath`.

Tüm admin action'lar oturum + rol kontrolünden geçer (mevcut auth deseni).

---

## 3. Admin — `/admin/bookings` (sekmeli)

`BookingsClient` yeniden yazılır. Üstte `Seg` ile iki sekme:

### Sekme A — "Randevular"
- Mock `INITIAL_BOOKINGS` kaldırılır; veri `listBookings()` ile **gerçek DB'den**.
- Sunucu bileşeni veriyi çeker (`page.tsx` server component → client'a prop), veya
  client `useEffect` + action. Tercih: `page.tsx`'i async server component yapıp
  `listBookings()` sonucunu `BookingsClient`'a prop geçmek.
- Tablo sütunları: Tarih & Saat · Kişi (ad + e-posta) · Konu/Tür · Telefon · Durum · Sil.
- Tür ve telefon yeni; mesaj satır altında/detayda gösterilebilir.
- Durum değiştir → `setBookingStatus`; sil → `deleteBooking`.
- Boş durum: "Henüz randevu yok."

### Sekme B — "Çalışma günleri"
- **Haftalık çalışma günleri:** 7 satır (Pzt..Paz), her birinde `Switch`
  (Çalışıyor / Kapalı). State `weekly`'yi günceller.
- **Çalışma saatleri:** Saat çipleri (multi-select). Önerilen palet: `09:00`–`18:00`
  saat başı; seçili olanlar `slots`. (Çipler `MkSelect multi` veya özel chip grid.)
- **Kapalı günler:** `<input type="date">` + "Ekle" → `closedDates`'e push; her
  kapalı gün bir çip, tıkla-kaldır. Geçmiş tarihler eklenmez/temizlenir.
- **"Kaydet"** → `saveBookingConfig(data)`; başarı/animasyon geri bildirimi.
- Tüm bölümler `AdmCard`/`FormCard` içinde, token tabanlı.

---

## 4. Public modal — 3 adımlı wizard (`BookingModal.tsx` yeniden yazımı)

### Genel yapı
- `step` state: `1 | 2 | 3` (+ `done`).
- Açılışta `getBookingConfig()` çekilir (takvim için).
- Üstte **adım göstergesi** `.bookm__steps`: 3 nokta/rakam (mono), aktif & tamamlanan
  accent, aralarında bağlantı çizgisi. Etiketler: "Kişisel bilgiler" · "Detaylar" ·
  "Tarih & saat".
- Alt **navigasyon** `.bookm__nav`: solda "← Geri" (1. adımda gizli), sağda
  "İleri →" / son adımda "Görüşmeyi onayla →".
- Her adımda **inline doğrulama**; geçersizse ilerleme engellenir, hata `.authm__err`.

### Adım 1 — Kişisel bilgiler
- Ad Soyad (`name`, zorunlu), E-posta (`email`, zorunlu + format).
- Geçerli değilse "İleri" pasif/uyarılı.

### Adım 2 — Görüşme detayları
- Konu (`topic`) — dropdown (`TOPICS` listesi, marka çizgisinde select).
- Görüşme türü (`type`) — segmented kontrol: **Online / Yüz yüze / Telefon**.
- Telefon (`phone`) — `type="tel"`. ("Telefon" türü seçiliyse zorunlu; aksi halde ops.)
- Mesaj (`message`) — textarea, opsiyonel.

### Adım 3 — Tarih & saat
- **Özel ay takvimi** (`.bookm__cal`), marka çizgisinde:
  - Başlık: ay/yıl (mono) + `←` `→` ay gezinme.
  - 7 sütunlu gün ızgarası (Pzt başlangıç). Hücreler:
    - **Pasif/gri:** geçmiş günler, `weekly` kapalı haftagünleri, `closedDates`.
    - **Seçilebilir:** açık günler.
    - **Seçili:** accent dolgu.
  - Geçmiş aya geçiş, bugünden önceye izin vermez.
- Gün seçilince `getDayAvailability(date)` ile **boş saat çipleri** (`.bookm__slot`
  yeniden kullanılır). Dolu saatler pasif.
- Gün + saat seçili olunca "Görüşmeyi onayla" aktif.

### Gönderim & başarı
- Submit → `createBooking` (tüm alanlar `FormData`).
- Hata: `.authm__err`'de gösterilir (örn. sunucu "artık uygun değil" derse 3. adımda kalır).
- Başarı ekranı `done`: marka çizgisinde özet — **tarih · saat · tür** (mono), accent
  ✓ (SVG veya glyph — **emoji değil**), "Tamam" butonu. Mevcut `gres__emoji` emoji
  kullanımı kaldırılır.

### CSS (`web/src/styles/site.css`)
Mevcut `.authm__*` / `.bookm__*` korunur; eklenenler:
- `.bookm__steps`, `.bookm__step`, `.bookm__step.on/.done`, bağlantı çizgisi.
- `.bookm__cal`, `.bookm__cal-head`, `.bookm__cal-grid`, `.bookm__day`
  (`.is-disabled`, `.is-on`, `.is-today`).
- `.bookm__nav` (footer buton satırı).
- `.bookm__seg` (görüşme türü) — admin `Seg`'e benzer ama public token'larla.
Hepsi CSS değişkenleriyle, `data-theme="dark"` uyumlu.

---

## Hata yönetimi & doğrulama

- **İstemci:** adım bazlı zorunlu alan + e-posta/telefon format kontrolü; ilerleme kilidi.
- **Sunucu:** `createBooking` slot uygunluğunu yeniden doğrular (gün açık, kapalı değil,
  geçmiş değil, saat config'de ve boş). Çift kayıt/yarış durumunda son boşluk kontrolü.
- **Rate limit:** mevcut `rateLimit("booking:...")` korunur.
- **Rol koruması:** admin action'ları oturum + `ADMIN/EDITOR` kontrolü.

## Test / doğrulama yaklaşımı

- `npm run build` ve `npm run lint` temiz geçmeli (işi bitirmeden önce).
- Manuel akış (localhost:3000): modal 3 adım → kayıt → admin'de görünür.
- Admin: çalışma günü kapat → modal'da o haftagünü pasif; gün kapat → o gün pasif;
  saat çıkar → modal'da görünmez.
- Geçmiş gün/dolu saat seçilemez; sunucu doğrulaması bypass'i reddeder.

## Uygulama fazları

- **Faz 1 — Veri & action'lar:** schema alanları + `BookingConfig` + migration +
  `getBookingConfig`/`saveBookingConfig`/`getDayAvailability` + `createBooking`
  genişletme + `listBookings`/`setBookingStatus`/`deleteBooking`.
- **Faz 2 — Admin:** `/admin/bookings` sekmeleri; "Çalışma günleri" editörü; listeyi
  DB'ye bağlama.
- **Faz 3 — Public wizard:** `BookingModal.tsx` 3 adımlı yeniden yazım + `site.css`
  stilleri + başarı ekranı (emoji temizliği).

## Dokunulan dosyalar (tahmini)

- `web/prisma/schema.prisma` (+ migration)
- `web/src/lib/actions/bookings.ts`
- `web/src/app/admin/bookings/page.tsx`, `client.tsx`
- `web/src/components/marka/BookingModal.tsx`
- `web/src/styles/site.css`

## Kapsam dışı (sonraya)

- Güne-özel farklı saatler (şimdilik ortak saat listesi).
- `/randevu` standalone sayfasının modal'la hizalanması.
- E-posta onay gönderimi (mevcut "onay e-postası gönderilecek" metni placeholder).
- Takvime ekle (.ics) / online görüşme linki üretimi.
