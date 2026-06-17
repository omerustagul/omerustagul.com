/* ========================================================================
   MARKA PRODUCTS — shared market catalog + reviews. Site reads this; the
   product page handles buy + reviews. Persisted in localStorage('mk-products').
   Load as a CLASSIC script after members.js on market + product pages (and admin).
   ======================================================================== */
(function () {
  const KEY = "mk-products", RKEY = "mk-reviews";
  const subs = new Set();

  const SEED = [
    { id: "p1", title: "Grid UI Kit", seller: "Marka Studio", type: "UI Kit", format: "Figma", license: "Ticari", price: 59, currency: "$", hue: 0,
      tagline: "Editöryel projeler için eksiksiz bir arayüz kiti.",
      desc: "240+ bileşen, 60 hazır ekran ve tam token sistemiyle gelen, editöryel projeler için tasarlanmış bir UI kit.",
      includes: ["240+ bileşen", "60 hazır ekran", "Karanlık & aydınlık tema", "Ücretsiz güncellemeler"],
      specs: [["Bileşen", "240+"], ["Ekran", "60"], ["Format", "Figma"]], gallery: 3 },
    { id: "p2", title: "Portfolyo Şablonu", seller: "Nova Labs", type: "Şablon", format: "Webflow", license: "Kişisel", price: 39, currency: "$", hue: 40, tagline: "Yaratıcılar için editöryel portfolyo.", desc: "Hızlı kurulan, CMS destekli portfolyo şablonu.", includes: ["5 sayfa", "CMS koleksiyonları", "Responsive"], specs: [["Sayfa", "5"], ["Format", "Webflow"]], gallery: 2 },
    { id: "p3", title: "İkon Seti — 240", seller: "Form Co.", type: "İkon Seti", format: "SVG", license: "Ticari", price: 29, currency: "$", hue: -50, tagline: "Tutarlı çizgi ikon ailesi.", desc: "240 ikon, 3 ağırlık, SVG + font.", includes: ["240 ikon", "3 ağırlık", "SVG & font"], specs: [["İkon", "240"], ["Ağırlık", "3"]], gallery: 4 },
    { id: "p4", title: "Sunum Şablonu", seller: "Pera Studio", type: "Şablon", format: "Figma", license: "Ticari", price: 49, currency: "$", hue: 200, tagline: "Yatırımcı sunumları için.", desc: "40 slayt, editöryel düzen.", includes: ["40 slayt", "Grafik kütüphanesi"], specs: [["Slayt", "40"]], gallery: 2 },
  ];
  const RSEED = {
    p1: [
      { id: "r1", user: "Ece K.", rating: 5, text: "Token mimarisi muhteşem, projeye hemen adapte ettim.", date: "2026-05-12" },
      { id: "r2", user: "Mert S.", rating: 5, text: "60 ekran gerçekten zaman kazandırıyor.", date: "2026-04-28" },
      { id: "r3", user: "Can A.", rating: 4, text: "Çok iyi ama birkaç bileşen daha olabilirdi.", date: "2026-04-03" },
    ],
    p3: [{ id: "r4", user: "Su D.", rating: 5, text: "Çizgi tutarlılığı harika.", date: "2026-05-20" }],
  };

  function load(k, d) { try { const s = JSON.parse(localStorage.getItem(k) || "null"); return s || d; } catch (e) { return d; } }
  let list = (function () { const s = load(KEY, null); return Array.isArray(s) && s.length ? s : SEED.slice(); })();
  let reviews = load(RKEY, null) || JSON.parse(JSON.stringify(RSEED));
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(list)); localStorage.setItem(RKEY, JSON.stringify(reviews)); } catch (e) {} emit(); }
  function emit() { subs.forEach(fn => { try { fn(); } catch (e) {} }); }

  window.MarkaProducts = {
    list() { return list.slice(); },
    get(id) { return list.find(p => p.id === id) || null; },
    priceStr(p) { return (p.currency || "$") + " " + p.price; },
    reviews(id) { return (reviews[id] || []).slice().sort((a, b) => (b.date || "").localeCompare(a.date || "")); },
    rating(id) { const r = reviews[id] || []; return r.length ? Math.round(r.reduce((a, x) => a + x.rating, 0) / r.length * 10) / 10 : null; },
    addReview(id, rating, text) {
      const u = window.MarkaMembers && window.MarkaMembers.current(); if (!u) return false;
      reviews[id] = (reviews[id] || []).filter(x => x.user !== u.name).concat([{ id: "r" + Date.now(), user: u.name, rating, text, date: new Date().toISOString().slice(0, 10) }]);
      persist(); return true;
    },
    subscribe(fn) { subs.add(fn); return () => subs.delete(fn); },
  };
  window.addEventListener("storage", (e) => { if (e.key === KEY || e.key === RKEY) { list = load(KEY, SEED.slice()); reviews = load(RKEY, {}); emit(); } });
})();
