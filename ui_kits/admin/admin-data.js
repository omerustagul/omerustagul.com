/* Admin mock data + AI helper. Classic script → window.MK_ADMIN.
   ai() uses the live Claude helper when available, else a graceful simulation
   so the panel works in any environment (downloaded, offline, etc.). */
(function () {
  const stats = [
    { label: "Ziyaretçi (30g)", val: "48.2K", delta: "+12.4%", dir: "up" },
    { label: "Aktif Proje", val: "24", delta: "+3", dir: "up" },
    { label: "Kurs Satışı", val: "₺182K", delta: "+8.1%", dir: "up" },
    { label: "Dönüşüm", val: "3.8%", delta: "-0.3%", dir: "down" },
  ];

  const posts = [
    { id: 1, title: "2026'da editoryal grid'ler neden geri döndü?", cat: "Görüş", status: "Yayında", date: "12 Haz 2026", author: "Deniz Arı", views: "4.2K" },
    { id: 2, title: "Bir marka kimliğini nasıl kurguluyoruz", cat: "Süreç", status: "Yayında", date: "03 Haz 2026", author: "Ece Kaya", views: "2.8K" },
    { id: 3, title: "Smooth scroll ve performans dengesi", cat: "Teknik", status: "Taslak", date: "—", author: "Mert Su", views: "—" },
    { id: 4, title: "Stüdyoda bir hafta", cat: "Kültür", status: "Zamanlandı", date: "20 Haz 2026", author: "Su Demir", views: "—" },
  ];

  const services = [
    // ── Ana hizmetler (parent: null) ──
    { id: "dev", name: "Geliştirme", desc: "Headless CMS, animasyon ve ölçeklenebilir yazılım.", active: true, parent: null },
    { id: "design", name: "Tasarım", desc: "Marka, arayüz ve hareket tasarımı.", active: true, parent: null },
    { id: "growth", name: "Büyüme & Pazarlama", desc: "Dönüşüm, performans ve görünürlük.", active: true, parent: null },
    // ── Geliştirme alt hizmetleri ──
    { id: "web", name: "Web Sitesi Geliştirme", desc: "Editoryal, performanslı ve erişilebilir web siteleri.", active: true, parent: "dev" },
    { id: "mobile", name: "Mobil Uygulama", desc: "iOS & Android için native ve cross-platform uygulamalar.", active: true, parent: "dev" },
    { id: "tool", name: "Yazılım Aracı", desc: "Panel, dashboard ve özel yazılım araçları.", active: true, parent: "dev" },
    // ── Tasarım alt hizmetleri ──
    { id: "uiux", name: "UI/UX Tasarım", desc: "Araştırma, akış kurgusu ve arayüz tasarımı.", active: true, parent: "design" },
    { id: "brand", name: "Markalaşma", desc: "Strateji, isimlendirme ve marka kimlik sistemleri.", active: true, parent: "design" },
    { id: "motion", name: "Motion & Etkileşim", desc: "Hareket tasarımı ve mikro etkileşimler.", active: true, parent: "design" },
    // ── Büyüme alt hizmetleri ──
    { id: "ecom", name: "E-ticaret", desc: "Dönüşüm odaklı mağaza ve ödeme deneyimleri.", active: true, parent: "growth" },
    { id: "seo", name: "SEO & Performans", desc: "Teknik SEO, Core Web Vitals ve hız optimizasyonu.", active: false, parent: "growth" },
  ];

  const projects = [
    { id: 1, title: "Atlas Finans", client: "Atlas Bank", cat: "Marka · Web", year: 2026, status: "Yayında",
      fields: {
        category: "MARKA · WEB", title: "Atlas Finans", client: "Atlas Bank", year: "2026",
        serviceIds: ["brand", "web", "uiux"], role: "Strateji & Tasarım", duration: "14 hafta",
        problem: "Atlas Bank, dijital bankacılığa geçişte güven veren ama hantal bir arayüzle anılıyordu. Yeni nesil kullanıcılar için marka fazla kurumsal, akışlar fazla karmaşıktı; mobil dönüşüm sektör ortalamasının altındaydı.",
        solution: "Markayı sıfırdan kurguladık: sade bir kelime-logo, net bir tipografik hiyerarşi ve tek bir güçlü vurgu rengi. Açılış akışını 11 adımdan 4 adıma indirdik, kritik işlemleri tek ekranda topladık.",
        body: "## Yaklaşım\nEditoryal bir grid ve bol negatif alanla güveni görünür kıldık. Her ekran tek bir işe odaklandı.\n\n## Sonuç\nLansman sonrası ilk çeyrekte mobil dönüşüm iki katına çıktı, destek talepleri belirgin biçimde azaldı.",
        metrics: [
          { id: "m1", label: "Mobil dönüşüm", before: "%1,9", after: "%4,3" },
          { id: "m2", label: "Onboarding süresi", before: "6,2 dk", after: "2,1 dk" },
          { id: "m3", label: "App Store puanı", before: "3,4", after: "4,8" },
        ],
        quote: "Marka, dijital kimliğimizi tamamen yeniden tanımladı. Sonuçlar ilk aydan itibaren konuştu.",
        quoteAuthor: "Selin Demir", quoteRole: "Atlas Bank · Dijital Direktörü",
      } },
    { id: 2, title: "Nova Spor Uygulaması", client: "Nova", cat: "UI/UX", year: 2026, status: "Yayında" },
    { id: 3, title: "Pera Galeri", client: "Pera Sanat", cat: "Web", year: 2025, status: "Arşiv" },
    { id: 4, title: "Venta E-ticaret", client: "Venta", cat: "E-ticaret", year: 2026, status: "Taslak" },
  ];

  const courses = [
    { id: 1, title: "Sıfırdan Tasarım Sistemi", instructor: "Deniz Arı", students: 214, price: "₺1.299", rating: 4.9, status: "Yayında",
      fields: {
        title: "Sıfırdan Tasarım Sistemi", tagline: "Ölçeklenebilir bir tasarım sistemini adım adım kurun.",
        instructor: "Deniz Arı", category: "Tasarım", level: "Orta", lang: "Türkçe",
        currency: "₺", price: "1.299", salePrice: "899", rating: 4.9,
        desc: "Token'lardan bileşenlere, dokümantasyondan devir teslime kadar gerçek bir tasarım sistemi kurmayı öğreten uygulamalı kurs.\n\n## Kimler için?\nArayüz tasarımcıları ve front-end geliştiriciler için.",
        modules: [
          { id: "cm1", title: "Temeller", lessons: [ { id: "l1", title: "Tasarım sistemi nedir?", dur: "08:30", type: "video", vsource: "url", videoUrl: "https://vimeo.com/000", free: true }, { id: "l2", title: "Token mimarisi", dur: "12:10", type: "video" } ] },
          { id: "cm2", title: "Bileşenler", lessons: [ { id: "l3", title: "Buton anatomisi", dur: "10:45", type: "video" }, { id: "l4", title: "Kaynak dosyalar (Figma)", dur: "—", type: "link", url: "https://figma.com", linkLabel: "Figma'da aç" }, { id: "l5", title: "Varyant yönetimi", dur: "09:55", type: "doc" } ] },
          { id: "cm3", title: "Devir teslim", lessons: [ { id: "l6", title: "Dokümantasyon", dur: "11:00", type: "text" } ] },
        ],
        outcomes: [ { id: "o1", text: "Sıfırdan bir tasarım sistemi kurmak" }, { id: "o2", text: "Token ve değişken mimarisi tasarlamak" }, { id: "o3", text: "Takımca ölçeklenebilir bileşenler üretmek" } ],
        requirements: [ { id: "r1", text: "Temel Figma bilgisi" }, { id: "r2", text: "Arayüz tasarımına ilgi" } ],
      } },
    { id: 2, title: "Webflow ile Üretim", instructor: "Ece Kaya", students: 178, price: "₺899", rating: 4.8, status: "Yayında" },
    { id: 3, title: "Motion & Etkileşim", instructor: "Mert Su", students: 96, price: "₺1.499", rating: 5.0, status: "Taslak" },
  ];

  const products = [
    { id: 1, title: "Grid UI Kit", seller: "Marka Studio", sales: 312, price: "$ 59", type: "UI Kit", status: "Yayında",
      fields: {
        title: "Grid UI Kit", tagline: "Editoryal projeler için eksiksiz bir arayüz kiti.",
        type: "UI Kit", seller: "Marka Studio", format: "Figma", currency: "$", price: "59", license: "Ticari",
        desc: "240+ bileşen, 60 hazır ekran ve tam token sistemiyle gelen, editoryal projeler için tasarlanmış bir UI kit.",
        includes: [ { id: "i1", text: "240+ bileşen" }, { id: "i2", text: "60 hazır ekran" }, { id: "i3", text: "Karanlık & aydınlık tema" }, { id: "i4", text: "Ücretsiz güncellemeler" } ],
        specs: [ { id: "s1", k: "Bileşen", v: "240+" }, { id: "s2", k: "Ekran", v: "60" }, { id: "s3", k: "Format", v: "Figma" } ],
      } },
    { id: 2, title: "Portfolyo Şablonu", seller: "Nova Labs", sales: 188, price: "$ 39", type: "Şablon", status: "Yayında" },
    { id: 3, title: "İkon Seti — 240", seller: "Form Co.", sales: 521, price: "$ 29", type: "İkon Seti", status: "Yayında" },
  ];

  const users = [
    { id: 1, name: "Deniz Arı", email: "deniz@marka.studio", role: "Yönetici", status: "Aktif" },
    { id: 2, name: "Ece Kaya", email: "ece@marka.studio", role: "Editör", status: "Aktif" },
    { id: 3, name: "Mert Su", email: "mert@marka.studio", role: "Yazar", status: "Davet edildi" },
  ];

  const activity = [
    { who: "Ece Kaya", what: "‘Bir marka kimliği…’ yazısını yayınladı", when: "2 saat önce" },
    { who: "Deniz Arı", what: "Atlas Finans projesini güncelledi", when: "5 saat önce" },
    { who: "Sistem", what: "Haftalık AI raporu hazır", when: "Dün" },
    { who: "Mert Su", what: "Yeni kurs taslağı oluşturdu", when: "2 gün önce" },
  ];

  // ---- AI ----
  const SIM = {
    blog: (topic) =>
`# ${topic || "Başlıksız"}: editoryal bir bakış

Dijitalde fark yaratan markalar, sadelikten korkmayanlardır. ${topic || "Bu konu"} özelinde, bol negatif alan ve net bir tipografik hiyerarşi, mesajın önüne geçmeden onu güçlendirir.

## Neden önemli?
Kullanıcı ilk üç saniyede karar verir. Net bir başlık, tek bir çağrı ve ölçülü hareket; güven inşa eder.

## Pratik öneriler
— Tek bir vurgu rengi belirleyin ve tutarlı kullanın.
— Başlıkları kısa ve iddialı tutun.
— Her bölüme nefes alanı bırakın.

Sonuç olarak ${topic || "bu yaklaşım"}, markanızı kalabalıktan ayıran sessiz ama kararlı bir güven duygusu yaratır.`,
    report: () =>
`Haftalık Performans Özeti

Ziyaretçi trafiği geçen haftaya göre %12,4 arttı; en güçlü kanal organik arama (toplam oturumların %46'sı). Akademi gelirleri %8,1 yükselirken, dönüşüm oranındaki 0,3 puanlık düşüş, ödeme adımındaki sürtünmeye işaret ediyor.

Öne çıkanlar:
• "Sıfırdan Tasarım Sistemi" kursu, kayıtların %38'ini tek başına getirdi.
• Blog trafiği, "editoryal grid" yazısıyla zirve yaptı.

Öneri: Ödeme akışını 2 adıma indirin ve en çok okunan blog yazısının sonuna kurs CTA'sı ekleyin. Tahmini etki: dönüşümde +0,6 puan.`,
    seo: (t) => `Önerilen başlık: ${t || "Sayfa"} — Marka\nMeta açıklama: ${t || "Bu sayfa"} hakkında net, editoryal ve premium bir özet. 155 karakteri aşmayın.\nAnahtar kelimeler: kreatif ajans, marka tasarımı, ${(t||"dijital").toLowerCase()}.`,
  };

  async function ai(prompt, sim) {
    const fallback = typeof sim === "function" ? sim() : (sim || SIM.report());
    try {
      if (window.claude && typeof window.claude.complete === "function") {
        const text = await window.claude.complete(prompt);
        return (text && text.trim()) ? text.trim() : fallback;
      }
    } catch (e) { /* fall through to simulation */ }
    // simulate latency
    await new Promise(r => setTimeout(r, 900));
    return fallback;
  }

  window.MK_ADMIN = { stats, posts, projects, services, courses, products, users, activity, ai, SIM,
    aiAvailable: !!(window.claude && window.claude.complete) };
})();
