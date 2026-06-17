# Taşıma Planı — Marka Prototipi → Üretim Stack'i

> Bu belge, mevcut **vanilla JS + React (CDN/Babel) + localStorage** prototipini
> gerçek bir **Next.js + Prisma + PostgreSQL + Auth** uygulamasına taşımak için yol haritasıdır.
> Kaynak: [`design_handoff_marka_platform/README.md`](design_handoff_marka_platform/README.md) +
> [`theme/`](theme/) veri katmanlarının fiili arayüzleri.

## 1. Hedef Stack

| Katman | Seçim | Not |
|---|---|---|
| Framework | **Next.js 15 (App Router) + TypeScript** | SSR/SSG, RSC, route handlers |
| ORM / DB | **Prisma + PostgreSQL** | Handoff'un önerdiği stack |
| Auth | **Auth.js (NextAuth v5)** | Credentials (hash'li) + opsiyonel OAuth/magic-link |
| Stil | **Tailwind** veya mevcut token CSS'in korunması | Aşağıdaki "Tasarım" notuna bakın |
| Görsel/Upload | **S3 / Vercel Blob / UploadThing** | `uploads/` yerine object storage |
| AI | **Sunucu tarafı LLM API** (key'ler env'de) | `window.claude.complete` yerine |
| Dağıtım | **Vercel** (öneri) | Postgres = Neon/Supabase/Vercel Postgres |

### Tasarımı koruma stratejisi
Prototipteki [`styles.css`](styles.css) + [`tokens/`](tokens/) **CSS custom-property token sistemi olduğu gibi taşınabilir** — Tailwind'e zorlamadan, token'ları `globals.css`'e import edip component'leri React/TSX olarak yeniden yazmak en hızlı yol. [`theme/theme.js`](theme/theme.js)'in `:root` üzerine yazdığı runtime override mantığı bir `ThemeProvider`'a dönüşür.

## 2. Mimari İlke (en kritik)

Prototipte: **admin `localStorage`'a YAZAR → site OKUR**, sekmeler `storage` event'iyle senkronlanır.

Üretimde bu şuna dönüşür:

```
Admin mutasyonu → Server Action / API route → Prisma → Postgres
                                                   ↓
Site → Server Component fetch (veya revalidateTag) → güncel içerik
```

- Her `theme/*.js` modülünün `get/list/subscribe` arayüzü → **bir API katmanı** (route handler veya server action) olur.
- `subscribe()` canlı senkron → üretimde `revalidatePath`/`revalidateTag` + (opsiyonel) gerçek-zamanlı için SSE/WebSocket.
- **Tüm admin uçları rol korumalı** olmalı (prototipteki `MarkaMembers` rolleri).

## 3. Veri Katmanı → Prisma Şeması Eşlemesi

Handoff tablosu + fiili kod alanlarından çıkarılan başlangıç şeması:

| Prototip modülü | localStorage anahtarı | Prisma model(ler)i |
|---|---|---|
| `MarkaTheme` | `mk-theme` | `SiteSettings` |
| `MarkaPages` | `mk-pages` | `Page`, `Section` |
| `MarkaProfile` | `mk-profile` | `Profile` |
| `MarkaMembers` | `mk-members`, `mk-session` | `User`, `Enrollment`, `Purchase`, `LessonProgress`, `GameScore` |
| `MarkaLeads` | `mk-leads` | `Lead` |
| `MarkaBookings` | `mk-bookings` | `Booking` |
| `MarkaCourses` | `mk-courses` | `Course`, `Module`, `Lesson` |
| `MarkaProducts` | `mk-products`, `mk-reviews` | `Product`, `Review` |
| `MarkaVotes` | `mk-votes` | `ProjectVote` |
| `MarkaCommunity` | `mk-community` | `CommunityConfig`, `Collection` |
| `MarkaI18n` | `mk-lang` | `Translation` (veya dosya tabanlı i18n) |

### Başlangıç `schema.prisma` taslağı

```prisma
// Kimlik & üyelik (theme/members.js alanlarından birebir)
model User {
  id           String   @id @default(cuid())
  name         String
  email        String   @unique
  passwordHash String?               // ARTIK düz metin DEĞİL (bcrypt/argon2)
  role         Role     @default(MEMBER)
  avatar       String?
  bio          String?
  createdAt    DateTime @default(now())
  purchases    Purchase[]
  enrollments  Enrollment[]
  progress     LessonProgress[]
  gameScores   GameScore[]
  votes        ProjectVote[]
  reviews      Review[]
}

enum Role { ADMIN EDITOR MEMBER }

model Course {
  id       String   @id @default(cuid())
  title    String
  slug     String   @unique
  price    Int
  modules  Module[]
  enrollments Enrollment[]
}
model Module { id String @id @default(cuid()) courseId String course Course @relation(fields:[courseId],references:[id]) title String order Int lessons Lesson[] }
model Lesson { id String @id @default(cuid()) moduleId String module Module @relation(fields:[moduleId],references:[id]) title String kind String content String? order Int progress LessonProgress[] }

model Enrollment    { id String @id @default(cuid()) userId String courseId String user User @relation(fields:[userId],references:[id]) course Course @relation(fields:[courseId],references:[id]) createdAt DateTime @default(now()) @@unique([userId, courseId]) }
model LessonProgress{ id String @id @default(cuid()) userId String lessonId String courseId String completedAt DateTime @default(now()) user User @relation(fields:[userId],references:[id]) lesson Lesson @relation(fields:[lessonId],references:[id]) @@unique([userId, lessonId]) }

model Product { id String @id @default(cuid()) title String slug String @unique price Int reviews Review[] purchases Purchase[] }
model Review  { id String @id @default(cuid()) productId String userId String rating Int body String createdAt DateTime @default(now()) product Product @relation(fields:[productId],references:[id]) user User @relation(fields:[userId],references:[id]) }
model Purchase{ id String @id @default(cuid()) userId String kind String refId String createdAt DateTime @default(now()) user User @relation(fields:[userId],references:[id]) }

// Oyunlar: memory/sequence (higher-better), reaction (lower-better, ms)
model GameScore { id String @id @default(cuid()) userId String game String best Int playedAt DateTime @default(now()) user User @relation(fields:[userId],references:[id]) @@index([game, best]) }

model Lead     { id String @id @default(cuid()) name String email String message String? status String @default("new") createdAt DateTime @default(now()) }
model Booking  { id String @id @default(cuid()) name String email String slot DateTime status String @default("pending") createdAt DateTime @default(now()) }
model ProjectVote { id String @id @default(cuid()) projectId String userId String createdAt DateTime @default(now()) user User @relation(fields:[userId],references:[id]) @@unique([projectId, userId]) }

model Page    { id String @id @default(cuid()) slug String @unique title String? sections Section[] }
model Section { id String @id @default(cuid()) pageId String page Page @relation(fields:[pageId],references:[id]) kind String comp String? order Int data Json? }
model Profile { id String @id @default(cuid()) data Json }           // "Ben Kimim"/CV
model SiteSettings { id Int @id @default(1) data Json }              // mk-theme JSON'u
model CommunityConfig { id Int @id @default(1) data Json }
model Collection { id String @id @default(cuid()) title String data Json }
model Translation { id String @id @default(cuid()) lang String key String value String @@unique([lang, key]) }
```

> Not: `Section`/`Profile`/`SiteSettings` gibi serbest-biçimli yapılar başlangıçta `Json` kolonu olarak taşınabilir; ilişkiler netleştikçe normalize edilir.

## 4. Kimlik Doğrulama (auth)

- **Auth.js (NextAuth v5)** Credentials provider; şifreler **bcrypt/argon2** ile hash.
- `theme/members.js`'teki `register/login/logout/current` → Auth.js akışlarına map'lenir.
- **Roller:** `ADMIN | EDITOR | MEMBER`. Admin route'ları middleware ile korunur (`/admin/**`).
- Seed: prototipteki demo kullanıcılar (`Ece K.`, `Mert S.`...) bir `prisma/seed.ts` ile aktarılır ki liderlik tabloları boş olmasın.

## 5. AI Özellikleri

- Blog sihirbazı & AI raporlar prototipte `window.claude.complete`/simülasyon kullanıyor.
- Üretimde: **sunucu tarafı route handler** (`/api/ai/...`) → LLM API (key `.env`'de), istemciye asla key sızmaz.
- Claude API entegrasyonu için en güncel model id'leri ve SDK kullanımı taşıma sırasında doğrulanmalı.

## 6. Görseller & Asset

- `uploads/` (pasted-*.png) ve admin medya kütüphanesi → **object storage** (S3/Vercel Blob).
- Fontlar (General Sans/Fontshare CDN) → üretimde **self-host** (`next/font/local`).
- Sosyal ikonlar: Simple Icons CDN korunabilir; LinkedIn zaten `assets/social/linkedin.svg` self-host.

## 7. Faz Faz Yol Haritası

- [x] **F0 — Scaffold:** ✅ `web/` altında Next.js 16 (TS, App Router, Tailwind'siz) kuruldu; token sistemi `web/src/styles/`'e taşınıp `globals.css`'e bağlandı; Prisma 7 + `schema.prisma` (tüm modeller) + `@prisma/adapter-pg` singleton (`web/src/lib/prisma.ts`); `.env.example` + Postgres datasource (`prisma.config.ts`). `next build` yeşil. _Stil kararı: token CSS korundu (Tailwind kurulmadı)._
  > Not: Prisma 7 **driver adapter** kullanıyor (`new PrismaClient({ adapter })`), schema'da `url` yok — bağlantı `prisma.config.ts` (CLI) + adapter (runtime) üzerinden. CLI'da migration için `web/.env`'e gerçek `DATABASE_URL` yazın.
- [x] **F1 — Şema & DB:** ✅ `schema.prisma` (18 model) + ilk migration `20260617125136_init` Vercel/Prisma Postgres'e uygulandı; `seed.ts` çalıştı (9 kullanıcı, 1 kurs, 2 ürün, 24 oyun skoru). Komutlar: `npm run db:migrate | db:seed | db:reset | db:studio`.
  > ⚠️ **Önemli kayıt:** Verilen DB (`db.prisma.io`) **boş değildi** — başka/önceki bir backend'in 20 tablosunu (portfolio/services/blog/appointments/contact/roles/permissions/audit/api_keys…) içeriyordu. Kullanıcının açık talimatıyla `public` şeması **tamamen silinip** sıfırdan kuruldu (veri kalıcı olarak kayboldu). `pg_dump` yoktu, yedek alınamadı.
- [ ] **F2 — Auth:** Auth.js + hash + roller + `/admin` middleware koruması.
- [ ] **F3 — Tasarım sistemi:** token'lar + component primitive'leri ([`components/`](components/)) TSX'e; `ThemeProvider` (mk-theme runtime → context).
- [ ] **F4 — Site (okuma):** anasayfa + `pages/*` Server Component'ler olarak; veri Prisma'dan fetch.
- [ ] **F5 — Admin (yazma):** modüller → Server Actions/API; `revalidateTag` ile canlı yansıma.
- [ ] **F6 — Domain özellikleri:** kurs oynatıcı + ilerleme, market + satın alma, oyunlar + liderlik, lead/booking, vote.
- [ ] **F7 — AI + i18n + medya:** sunucu tarafı AI, çoklu dil, upload → object storage.
- [ ] **F8 — Sertleştirme:** ödeme entegrasyonu (gerçekse), rate-limit, SEO/meta, erişilebilirlik QA, performans.

## 8. Açık Sorular (taşımaya başlamadan netleşmeli)

1. **Tasarım katmanı:** mevcut token CSS korunsun mu, yoksa Tailwind'e mi geçilsin?
2. **Ödeme:** kurs/ürün satın alma gerçek mi (Stripe/iyzico) yoksa şimdilik mock mu?
3. **Dağıtım hedefi:** Vercel + Neon/Supabase mı, başka bir ortam mı?
4. **Marka adı:** "Marka" placeholder'ı gerçek isimle değişecek mi (`brand/brand.js`)?
5. **i18n kapsamı:** tr/en/de/ar hepsi lansmanda mı, yoksa önce tr mi?
