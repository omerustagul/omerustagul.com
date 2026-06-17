/* ========================================================================
   MARKA COURSES — shared course catalog the site reads and the academy
   player uses. Seeded with full curricula; persisted in localStorage('mk-courses').
   Load as a CLASSIC script after theme.js on academy + course pages (and admin).
   ======================================================================== */
(function () {
  const KEY = "mk-courses";
  const subs = new Set();

  const SEED = [
    {
      id: "c1", title: "Sıfırdan Tasarım Sistemi", instructor: "Deniz Arı", category: "Tasarım", level: "Orta",
      price: "₺1.299", salePrice: "₺899", currency: "₺", rating: 4.9, students: 214, hue: 0,
      tagline: "Ölçeklenebilir bir tasarım sistemini adım adım kur.",
      desc: "Token'lardan bileşenlere, dokümantasyondan devir teslime kadar gerçek bir tasarım sistemi kurmayı öğreten uygulamalı kurs.",
      outcomes: ["Sıfırdan bir tasarım sistemi kurmak", "Token ve değişken mimarisi tasarlamak", "Takımca ölçeklenebilir bileşenler üretmek"],
      modules: [
        { id: "m1", title: "Temeller", lessons: [
          { id: "l1", title: "Tasarım sistemi nedir?", dur: "08:30", type: "video", free: true, body: "Bu derste tasarım sistemlerinin neden gerekli olduğunu ve bir ürün ekibine nasıl değer kattığını konuşuyoruz." },
          { id: "l2", title: "Token mimarisi", dur: "12:10", type: "video", body: "Renk, tipografi ve boşluk token'larının katmanlı mimarisi." },
        ]},
        { id: "m2", title: "Bileşenler", lessons: [
          { id: "l3", title: "Buton anatomisi", dur: "10:45", type: "video", body: "Varyant, durum ve boyut eksenleriyle sağlam bir buton." },
          { id: "l4", title: "Kaynak dosyalar (Figma)", dur: "—", type: "link", url: "https://figma.com", linkLabel: "Figma'da aç", body: "Derste kullanılan kaynak dosyalara eriş." },
          { id: "l5", title: "Varyant yönetimi", dur: "09:55", type: "doc", body: "Bileşen varyantlarını ölçeklenebilir tutmanın yolları." },
        ]},
        { id: "m3", title: "Devir teslim", lessons: [
          { id: "l6", title: "Dokümantasyon", dur: "11:00", type: "text", body: "İyi bir dokümantasyon; her bileşen için ne zaman/nasıl/neden sorularını yanıtlar. Kullanım örnekleri, do/don't kuralları ve erişilebilirlik notları ekle." },
        ]},
      ],
    },
    { id: "c2", title: "Webflow ile Üretim", instructor: "Ece Kaya", category: "Geliştirme", level: "Başlangıç", price: "₺899", currency: "₺", rating: 4.8, students: 178, hue: 40, tagline: "Kod yazmadan üretim kalitesinde siteler.", desc: "Webflow ile tasarımdan yayına eksiksiz bir akış.", outcomes: ["Webflow'da responsive site kurmak", "CMS koleksiyonları yönetmek"], modules: [{ id: "wm1", title: "Başlangıç", lessons: [{ id: "wl1", title: "Arayüz turu", dur: "07:20", type: "video", free: true, body: "Webflow arayüzüne hızlı bir bakış." }] }] },
    { id: "c3", title: "Motion & Etkileşim", instructor: "Mert Su", category: "Motion", level: "İleri", price: "₺1.499", currency: "₺", rating: 5.0, students: 96, hue: 200, tagline: "Premium hareket tasarımı prensipleri.", desc: "Mikro etkileşimlerden sayfa geçişlerine motion sistemi.", outcomes: ["Easing ve zamanlama", "Performanslı animasyon"], modules: [{ id: "mm1", title: "Prensipler", lessons: [{ id: "ml1", title: "Easing temelleri", dur: "09:00", type: "video", free: true, body: "Doğal hareketin arkasındaki easing eğrileri." }] }] },
    { id: "c4", title: "Marka Stratejisi", instructor: "Lale Yön", category: "Strateji", level: "Tüm seviyeler", price: "₺1.099", currency: "₺", rating: 4.7, students: 132, hue: -40, tagline: "Konumlandırmadan kimliğe.", desc: "Markayı bir sistem olarak kurgulamak.", outcomes: ["Konumlandırma", "Marka sesi"], modules: [{ id: "bm1", title: "Strateji", lessons: [{ id: "bl1", title: "Konumlandırma", dur: "11:30", type: "video", free: true, body: "Rakipler arasında net bir yer edinmek." }] }] },
  ];

  function load() { try { const s = JSON.parse(localStorage.getItem(KEY) || "null"); return Array.isArray(s) && s.length ? s : SEED.slice(); } catch (e) { return SEED.slice(); } }
  let list = load();
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} emit(); }
  function emit() { subs.forEach(fn => { try { fn(list); } catch (e) {} }); }

  window.MarkaCourses = {
    list() { return list.slice(); },
    get(id) { return list.find(c => c.id === id) || null; },
    lessonCount(c) { return (c.modules || []).reduce((n, m) => n + (m.lessons || []).length, 0); },
    allLessons(c) { return (c.modules || []).flatMap(m => m.lessons || []); },
    set(next) { list = next; persist(); },
    subscribe(fn) { subs.add(fn); return () => subs.delete(fn); },
  };
  window.addEventListener("storage", (e) => { if (e.key === KEY) { list = load(); emit(); } });
})();
