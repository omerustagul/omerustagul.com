# Handoff: Marka — Kreatif Ajans + Topluluk Platformu

## Overview
**Marka**, bir kreatif ajansın kurumsal web sitesi + akademi + dijital ürün marketi + topluluk platformudur; **kendi içeriğini yöneten tam bir admin paneli** ile gelir. Awwwards ruhunda, premium/editöryel bir tasarım dilinde inşa edildi. Bu paket, tasarımın **prototip (HTML) referansını** ve gerçek bir kod tabanında yeniden inşa edilmesi için gereken tüm mimari/davranış dökümantasyonunu içerir.

## About the Design Files
Bu paketteki dosyalar **HTML ile oluşturulmuş tasarım referanslarıdır** — amaçlanan görünümü ve davranışı gösteren prototipler; doğrudan kopyalanacak üretim kodu DEĞİL. Görev, bu tasarımları hedef kod tabanının ortamında (Next.js/React + bir veritabanı öneriliyor) **yeniden inşa etmek** ve prototipteki `localStorage` veri katmanlarını **gerçek bir backend + API**'ye bağlamaktır. Henüz bir ortam yoksa: **Next.js (App Router) + TypeScript + Postgres (Prisma) + Tailwind** veya tercih edilen eşdeğer stack önerilir.

## Fidelity
**High-fidelity (hifi).** Tüm renkler, tipografi, boşluk, köşe yarıçapı, animasyon ve etkileşimler nihai haldedir. UI piksel düzeyinde bu referanslara sadık kalınarak, hedef kod tabanının kütüphane/desenleriyle yeniden üretilmelidir. Tek istisna: tüm görseller **placeholder**'dır (gerçek logo/foto/kapak görselleri müşteriden gelecek).

---

## Mimari (en kritik bölüm)

Prototip, **çerçevesiz vanilla JS + React (inline Babel)** karışımıyla, **tarayıcı `localStorage`'ı bir sahte-backend gibi** kullanan veri katmanları üzerine kuruludur. Her katman `get/list/subscribe` arayüzü sunar ve sekmeler/iframe'ler arası `storage` event'i ile senkronlanır. **Backend'e geçişte yapılacak iş: bu katmanların `load/save`'ini gerçek API çağrılarıyla değiştirmek.** Katmanlar (`theme/` klasörü):

| Modül (window global) | Sorumluluk | localStorage anahtarı | Backend tablosu önerisi |
|---|---|---|---|
| `MarkaTheme` | Tema/görünüm: header/footer şablonu, renk paleti, font, köşe yarıçapı, dark mode, hero varyantı, açılış pop-up'ı | `mk-theme` | `site_settings` |
| `MarkaPages` | Anasayfa bölüm düzeni (sıra/gizle/sürükle), özel section'lar (görsel/video/metin), sayfa metin override'ları | `mk-pages` | `pages`, `sections` |
| `MarkaProfile` | "Ben Kimim" CV içeriği | `mk-profile` | `profile` |
| `MarkaMembers` | Üyelik/kimlik: kayıt/giriş/oturum, satın alınan kurs/ürün, oyun skorları, kurs ilerlemesi | `mk-members`, `mk-session` | `users`, `enrollments`, `game_scores`, `lesson_progress` |
| `MarkaLeads` | Teklif/iletişim talepleri (pipeline) | `mk-leads` | `leads` |
| `MarkaBookings` | Görüşme randevuları | `mk-bookings` | `bookings` |
| `MarkaCourses` | Kurs kataloğu + müfredat + ders içerikleri | `mk-courses` | `courses`, `modules`, `lessons` |
| `MarkaProducts` | Market ürünleri + yorumlar | `mk-products`, `mk-reviews` | `products`, `reviews` |
| `MarkaVotes` | Proje oylama (Vote) | `mk-votes` | `project_votes` |
| `MarkaCommunity` | Oyun aç/kapat + günlük hak, koleksiyonlar | `mk-community` | `community_config`, `collections` |
| `MarkaI18n` | Çoklu dil (tr/en/de/ar), `t()` çevirisi | `mk-lang` | i18n dosyaları |

**Önemli:** Admin paneli bu katmanlara YAZAR, site OKUR; ikisi aynı origin'de `localStorage` + `storage` event ile canlı senkronlanır. Backend'de bu, **admin mutasyonları → DB → site fetch/revalidate** akışına dönüşmeli. Yetki: admin uçları **rol/izin korumalı** olmalı (prototipte `MarkaMembers` rolleri var).

**Kimlik doğrulama:** Prototipte şifreler düz metin (sahte). Üretimde **gerçek auth** (hash'li şifre / OAuth / magic link) ŞART.

**AI özellikleri:** AI blog üretimi ve AI raporlar prototipte `window.claude.complete` veya simülasyon kullanır. Üretimde **sunucu tarafı LLM API** (key'ler env'de) ile değiştirilmeli.

---

## Surfaces (Ekranlar / Görünümler)

### Site (müşteri tarafı) — `ui_kits/website/` + `pages/`
- **Anasayfa** (`ui_kits/website/index.html`): Hero (3 varyant) · Son Projeler (Vote'lu kartlar) · Haftanın İşi (oylama sıralaması) · İş Ortakları (marquee) · Hizmetler (akordeon, ana/alt) · Akademi · Koleksiyonlar + Rozetler · Zihin Oyunları · Blog · Market · İstatistik · Alt CTA. Bölüm sırası/görünürlüğü admin'den yönetilir.
- **Ben Kimim / CV** (`pages/profile.html`): hero, bio, deneyim zaman tüneli, girişimler, ödüller, öne çıkan projeler, basında.
- **Portfolyo** (`pages/portfolio.html`), **Proje Detay** (`pages/project.html`): künye, problem/çözüm, önce→sonra metrikler, müşteri yorumu, sonraki proje.
- **Akademi** (`pages/academy.html`) → **Kurs Oynatıcı** (`pages/course.html`): müfredat, ders oynatıcı (video/doküman/link/metin), ilerleme çubuğu, %100'de sertifika, kayıt/satın alma.
- **Market** (`pages/market.html`) → **Ürün Detay** (`pages/product.html`): galeri, satın alma, paket/özellik, yıldızlı yorumlar.
- **Blog** (`pages/blog.html`) → **Blog Detay** (`pages/blog-post.html`): okuma ilerleme çubuğu, editöryel tipografi, ilgili yazılar.
- **Hakkımızda** (`pages/about.html`), **İletişim** (`pages/contact.html` — lead formu).
- **Zihin Oyunları** (anasayfa bölümü, `ui_kits/website/Games.jsx`): 3 oyun (Hafıza Eşleştirme, Sıralı Dikkat trail, Refleks), yukarı kayan oyun sahnesi, günde N hak, kademeli sonuç ekranı + liderlik tablosu (diğer kullanıcılar bulanık).
- **Paylaşılan chrome** (`theme/site-chrome.js`): header (4 şablon: default/minimal/centered/split), footer (2 şablon), mobil overlay menü, dil seçici, hesap menüsü, giriş/kayıt modalı, görüşme randevu modalı, açılış pop-up'ı. Her sayfada aynı.

### Admin Paneli — `ui_kits/admin/index.html`
Sol sidebar + modül routing. Modüller: Dashboard · AI Raporlar · Blog (AI sihirbazı) · **Talepler** (lead pipeline) · **Randevular** · Projeler · Ben Kimim/CV · **Oyunlar & Topluluk** · Hizmetler · Kurslar · Market · Medya Kütüphanesi · Tema & Görünüm (canlı önizleme) · Sayfalar (sürükle-bırak section) · Kullanıcılar & Roller · SEO & Meta · Genel Ayarlar.

---

## Design Tokens
Tek kaynak: **`styles.css`** (`@import` ile `tokens/*.css`'i toplar). Dark mode `:root[data-theme="dark"]` scope'unda.
- **Renkler:** Arka plan kırık beyaz `#FAFAFA` / saf siyah `#0A0A0A`; yüzey `#FFFFFF` / `#141414` (dark); vurgu **canlı yeşil** (varsayılan, Tema'dan değişir); nötr griler. Tam token listesi `tokens/colors.css`.
- **Tipografi:** Başlık + gövde **General Sans** (grotesk, Fontshare CDN); etiket/sayı **monospace**. Akışkan `clamp()` ölçeği — `tokens/typography.css`.
- **Boşluk/şekil:** `--space-*`, köşe yarıçapı `--radius*` (8–12px, admin'den ayarlanır), gölgeler `--shadow-*` — `tokens/spacing.css`.
- **Hareket:** 300–600ms, expo-out easing, `prefers-reduced-motion` saygılı — `tokens/motion.css`.

## Interactions & Behavior
- Smooth/scroll-reveal (stagger), parallax, özel imleç (magnetik, "Vote/Gör" etiketli), kart hover zoom, başlık mask-reveal, magnetik butonlar, sayfa overlay geçişleri. `ui_kits/website/motion.js` + `theme/inline-edit.js`.
- Tema/dil/içerik değişiklikleri **canlı** yayılır (subscribe pattern). Responsive: mobilde tek/iki kolon, mega-menü → tam ekran overlay, sekmeler yatay-scroll.

## Assets
- **Sosyal ikonlar:** Simple Icons CDN (`cdn.simpleicons.org`) + self-host `assets/social/linkedin.svg`. **Substitution flag:** LinkedIn Simple Icons'tan kaldırıldığı için yerel barındırılıyor.
- **Font:** General Sans — Fontshare CDN (gerçek font; üretimde self-host önerilir).
- **Görseller:** Tümü placeholder (`.ph` bileşeni). Müşteri gerçek görselleri sağlayacak.

## Files
- `styles.css`, `tokens/` — tasarım token'ları (tek kaynak).
- `theme/` — tüm veri katmanları + chrome + i18n + motion (yukarıdaki tablo).
- `ui_kits/website/` — anasayfa + bileşenler (Hero, Sections, Games, Community, parts, app).
- `pages/` — ikincil sayfalar + `pages.css`.
- `ui_kits/admin/` — admin paneli (modüller + editörler + `admin.css`).
- `components/` — yeniden kullanılabilir React primitive'leri (Button, Badge, Card, Avatar…).
- `readme.md` (kök) — marka/içerik/görsel rehberi.

> Geliştiriciye not: Önce `readme.md` (kök) ve bu dosyayı oku; sonra `theme/` veri katmanlarının arayüzlerini incele — backend modellemesi doğrudan bunlardan çıkar.
