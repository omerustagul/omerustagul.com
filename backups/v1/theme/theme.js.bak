/* ========================================================================
   MARKA THEME RUNTIME — single source of truth for live appearance.
   The /admin Görünüm module writes here; every site page reads + applies it.
   Persisted in localStorage('mk-theme'); changes broadcast across tabs.
   Load this as a CLASSIC script in <head> on every page (before chrome).
   ======================================================================== */
(function () {
  const KEY = "mk-theme";

  // --- Option catalogs (the admin renders pickers from these) ---
  const ACCENTS = [
    { id: "green",  label: "Elektrik Yeşili", value: "#16D17F" },
    { id: "violet", label: "Gece Moru",       value: "#6C5CE7" },
    { id: "orange", label: "Sıcak Turuncu",   value: "#FF5C35" },
    { id: "blue",   label: "Okyanus Mavisi",  value: "#2A6FDB" },
    { id: "ink",    label: "Monokrom",        value: "#0A0A0A" },
  ];
  const FONTS = [
    { id: "general", label: "General Sans", family: '"General Sans", sans-serif',
      link: "https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" },
    { id: "space", label: "Space Grotesk", family: '"Space Grotesk", sans-serif',
      link: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" },
    { id: "schibsted", label: "Schibsted Grotesk", family: '"Schibsted Grotesk", sans-serif',
      link: "https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700&display=swap" },
    { id: "hanken", label: "Hanken Grotesk", family: '"Hanken Grotesk", sans-serif',
      link: "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&display=swap" },
  ];
  const HEADER_TEMPLATES = [
    { id: "classic",  label: "Klasik",      desc: "Logo sol, menü, sosyal + CTA sağ" },
    { id: "centered", label: "Ortalanmış",  desc: "Logo ortada, menü altta" },
    { id: "minimal",  label: "Minimal",     desc: "Sadece logo + CTA + menü düğmesi" },
    { id: "split",    label: "Bölünmüş",    desc: "Logo sol, menü sağa hizalı, CTA en sağda" },
  ];
  const FOOTER_TEMPLATES = [
    { id: "columns", label: "Sütunlu",  desc: "Çok sütun + dev kelime-logo" },
    { id: "compact", label: "Kompakt",  desc: "Tek satır, sade" },
  ];
  const HERO_VARIANTS = [
    { id: "full",   label: "Tam",       desc: "Tam ekran kapak + büyük başlık" },
    { id: "split",  label: "Bölünmüş",  desc: "Sol metin, sağ görsel" },
    { id: "center", label: "Merkez",    desc: "Ortalanmış editoryal" },
  ];

  const defaults = {
    headerTemplate: "classic",
    footerTemplate: "columns",
    heroVariant: "full",
    accent: "#16D17F",
    mode: "light",
    font: "general",
    radius: 10,
    popup: { enabled: false, delaySec: 5, title: "Yeni sezon kampanyası", text: "Tüm dijital ürünlerde bu haftaya özel %20 indirim.", image: null, ctaText: "Keşfet", ctaUrl: "market.html", freqOncePerSession: true },
  };

  const subs = new Set();
  let current = load();

  function load() {
    try { return Object.assign({}, defaults, JSON.parse(localStorage.getItem(KEY) || "{}")); }
    catch (e) { return Object.assign({}, defaults); }
  }

  // luminance → choose readable text color on the accent
  function onAccent(hex) {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    const L = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return L > 0.62 ? "#0A0A0A" : "#FFFFFF";
  }

  function fontById(id) { return FONTS.find(f => f.id === id) || FONTS[0]; }

  function ensureFontLink(font) {
    const id = "mk-font-" + font.id;
    if (document.getElementById(id)) return;
    const l = document.createElement("link");
    l.id = id; l.rel = "stylesheet"; l.href = font.link;
    document.head.appendChild(l);
  }

  function apply(cfg) {
    cfg = cfg || current;
    const root = document.documentElement;
    // accent + derived
    root.style.setProperty("--accent", cfg.accent);
    root.style.setProperty("--accent-hover", `color-mix(in srgb, ${cfg.accent} 82%, #000)`);
    root.style.setProperty("--accent-tint", `color-mix(in srgb, ${cfg.accent} 14%, transparent)`);
    root.style.setProperty("--on-accent", onAccent(cfg.accent));
    root.style.setProperty("--focus-ring", cfg.accent);
    // re-map the whole accent ramp so every --green-* reference follows the theme
    root.style.setProperty("--green-500", cfg.accent);
    root.style.setProperty("--green-600", `color-mix(in srgb, ${cfg.accent} 82%, #000)`);
    root.style.setProperty("--green-700", `color-mix(in srgb, ${cfg.accent} 60%, #000)`);
    root.style.setProperty("--green-400", `color-mix(in srgb, ${cfg.accent} 72%, #fff)`);
    root.style.setProperty("--green-200", `color-mix(in srgb, ${cfg.accent} 34%, #fff)`);
    root.style.setProperty("--green-100", `color-mix(in srgb, ${cfg.accent} 14%, #fff)`);
    // font
    const font = fontById(cfg.font);
    ensureFontLink(font);
    root.style.setProperty("--font-sans", font.family);
    // radius — derive the WHOLE scale from the base so every token responds
    if (cfg.radius != null) {
      const r = Math.max(0, cfg.radius);
      root.style.setProperty("--radius-xs", Math.max(0, r - 4) + "px");
      root.style.setProperty("--radius-sm", Math.max(0, r - 2) + "px");
      root.style.setProperty("--radius", r + "px");
      root.style.setProperty("--radius-lg", (r + 2) + "px");
      root.style.setProperty("--radius-xl", (r + 6) + "px");
      // pill-shaped controls (search, segmented toggles, badges, switches):
      // scale with the slider, snapping to a true pill only near the top of the range
      root.style.setProperty("--radius-pill", (r >= 16 ? 999 : r * 2) + "px");
    }
    // theme mode
    root.setAttribute("data-theme", cfg.mode === "dark" ? "dark" : "light");
    // template hooks (chrome reads these)
    root.setAttribute("data-header-tpl", cfg.headerTemplate);
    root.setAttribute("data-footer-tpl", cfg.footerTemplate);
  }

  const MarkaTheme = {
    ACCENTS, FONTS, HEADER_TEMPLATES, FOOTER_TEMPLATES, HERO_VARIANTS, defaults,
    get() { return Object.assign({}, current); },
    set(patch) {
      current = Object.assign({}, current, patch);
      try { localStorage.setItem(KEY, JSON.stringify(current)); } catch (e) {}
      apply(current);
      subs.forEach(fn => { try { fn(current); } catch (e) {} });
    },
    reset() { this.set(Object.assign({}, defaults)); },
    apply,
    subscribe(fn) { subs.add(fn); return () => subs.delete(fn); },
  };

  // cross-tab: admin in one tab updates the live site in another
  window.addEventListener("storage", (e) => {
    if (e.key !== KEY) return;
    current = load();
    apply(current);
    subs.forEach(fn => { try { fn(current); } catch (e) {} });
  });

  window.MarkaTheme = MarkaTheme;
  // apply immediately to avoid flash of default theme
  apply(current);
})();
