/* ========================================================================
   MARKA PROFILE — content store for the founder "Ben Kimim" / CV page.
   The /admin "Profil / CV" module writes here; the live page reads + renders.
   Persisted in localStorage('mk-profile'); changes broadcast across tabs.
   Load as a CLASSIC script in <head> after theme.js.
   ======================================================================== */
(function () {
  const KEY = "mk-profile";
  const subs = new Set();

  const defaults = {
    name: "Deniz Arı",
    role: "Kurucu & Kreatif Direktör",
    tagline: "Markaları dijitalde yeni bir standarda taşıyorum.",
    location: "İstanbul, Türkiye",
    available: true,
    avatar: null,
    cover: null,
    bio: "On yılı aşkın süredir markaların dijital kimliğini kurguluyorum. İşim; karmaşık fikirleri sade, cesur ve ölçülebilir deneyimlere çevirmek.\n\nStratejiden arayüze, hareket tasarımından ekip kültürüne kadar tek bir sistem kurmaya inanıyorum — çünkü iyi tasarım, tutarlılıktan doğar.",
    stats: [
      { num: 240, suffix: "+", label: "Tamamlanan proje" },
      { num: 31, suffix: "", label: "Kazanılan ödül" },
      { num: 12, suffix: "", label: "Yıllık deneyim" },
    ],
    experience: [
      { id: "e1", role: "Kurucu & Kreatif Direktör", company: "Marka", period: "2019 — Bugün", current: true, desc: "Editöryel, performanslı ve ödüllü dijital ürünler üreten bir kreatif stüdyo kurdum." },
      { id: "e2", role: "Tasarım Lideri", company: "Nova Labs", period: "2015 — 2019", current: false, desc: "Fintech ve SaaS ürünleri için tasarım ekibini büyüttüm; 0→1 ürünler çıkardım." },
      { id: "e3", role: "Kıdemli Arayüz Tasarımcısı", company: "Atlas Digital", period: "2012 — 2015", current: false, desc: "Kurumsal markalar için web ve mobil arayüzler tasarladım." },
    ],
    ventures: [
      { id: "v1", name: "Marka", role: "Kurucu", period: "2019", desc: "Kreatif ajans + akademi + market platformu.", url: "" },
      { id: "v2", name: "Grid UI Kit", role: "Yaratıcı", period: "2021", desc: "300+ satışa ulaşan editöryel tasarım sistemi.", url: "" },
    ],
    awards: [
      { id: "a1", title: "Site of the Day", org: "Awwwards", year: "2025" },
      { id: "a2", title: "Yılın Ajansı (Finalist)", org: "Webby", year: "2024" },
      { id: "a3", title: "Developer Award", org: "CSSDA", year: "2023" },
    ],
    skills: ["Marka Stratejisi", "Sanat Yönetimi", "UI/UX Tasarım", "Motion", "Tasarım Sistemleri", "Ekip Liderliği"],
    press: [
      { id: "p1", title: "Türkiye'de tasarımın geleceği", outlet: "Webrazzi", year: "2025", url: "" },
      { id: "p2", title: "Editöryel web'in yükselişi", outlet: "Medium", year: "2024", url: "" },
    ],
    featured: [
      { id: "f1", title: "Atlas Finans yeniden markalaşma", year: "2026", href: "project.html" },
      { id: "f2", title: "Nova Spor Uygulaması", year: "2025", href: "project.html" },
    ],
    contactEmail: "merhaba@marka.studio",
  };

  let current = load();
  function load() {
    try { const s = JSON.parse(localStorage.getItem(KEY) || "{}"); return Object.assign(JSON.parse(JSON.stringify(defaults)), s); }
    catch (e) { return JSON.parse(JSON.stringify(defaults)); }
  }
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(current)); } catch (e) {} }
  function emit() { subs.forEach(fn => { try { fn(current); } catch (e) {} }); }

  window.MarkaProfile = {
    defaults,
    get() { return JSON.parse(JSON.stringify(current)); },
    set(patch) { current = Object.assign({}, current, patch); persist(); emit(); },
    reset() { current = JSON.parse(JSON.stringify(defaults)); persist(); emit(); },
    subscribe(fn) { subs.add(fn); return () => subs.delete(fn); },
  };
  window.addEventListener("storage", (e) => { if (e.key === KEY) { current = load(); emit(); } });
})();
