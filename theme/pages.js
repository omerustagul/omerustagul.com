/* ========================================================================
   MARKA PAGES RUNTIME — per-page section layout & content overrides.
   The /admin "Sayfalar" module writes here; the live site reads + renders.
   Persisted in localStorage('mk-pages'); changes broadcast across tabs.
   Load as a CLASSIC script in <head> after theme.js, before app scripts.
   ======================================================================== */
(function () {
  const KEY = "mk-pages";

  // Homepage built-in sections (fixed components, but reorderable + hideable).
  const HOME_BUILTINS = [
    { id: "hero",     kind: "builtin", comp: "Hero",        label: "Hero — Öne çıkan iş", locked: true },
    { id: "works",    kind: "builtin", comp: "LatestWorks", label: "Son Projeler" },
    { id: "weekly",   kind: "builtin", comp: "WeeklyWork",  label: "Haftanın İşi" },
    { id: "partners", kind: "builtin", comp: "Partners",    label: "İş Ortakları" },
    { id: "services", kind: "builtin", comp: "Services",    label: "Hizmetler" },
    { id: "academy",  kind: "builtin", comp: "Academy",     label: "Akademi" },
    { id: "collections", kind: "builtin", comp: "Collections", label: "Koleksiyonlar" },
    { id: "games",    kind: "builtin", comp: "Games",       label: "Zihin Oyunları" },
    { id: "blog",     kind: "builtin", comp: "Blog",        label: "Blog" },
    { id: "market",   kind: "builtin", comp: "Market",      label: "Market" },
    { id: "stats",    kind: "builtin", comp: "Stats",       label: "İstatistikler" },
    { id: "cta",      kind: "builtin", comp: "CTABlocks",   label: "Alt CTA" },
  ];

  // The site pages catalog (shown in the admin list).
  const PAGES = [
    { id: "home",      label: "Anasayfa",       path: "index.html",     editable: "sections" },
    { id: "portfolio", label: "İşler / Portfolyo", path: "portfolio.html", editable: "text" },
    { id: "about",     label: "Hakkımızda",     path: "about.html",     editable: "text" },
    { id: "academy",   label: "Akademi",        path: "academy.html",   editable: "text" },
    { id: "blog",      label: "Blog",           path: "blog.html",      editable: "text" },
    { id: "market",    label: "Market",         path: "market.html",    editable: "text" },
    { id: "contact",   label: "İletişim",       path: "contact.html",   editable: "text" },
  ];

  const defaults = {
    home: { order: HOME_BUILTINS.map(s => s.id), hidden: {}, custom: [] },
    // text pages store simple { key: value } overrides keyed by field id
    text: {},
  };

  const subs = new Set();
  let current = load();

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
      const merged = Object.assign({}, defaults, saved);
      merged.home = Object.assign({}, defaults.home, saved.home);
      reconcileOrder(merged.home);
      return merged;
    } catch (e) { return JSON.parse(JSON.stringify(defaults)); }
  }
  // ensure any builtin added after the user's order was saved still appears,
  // inserted right after its default-neighbour (and drop ids that no longer exist)
  function reconcileOrder(home) {
    const defOrder = HOME_BUILTINS.map(s => s.id);
    const customIds = (home.custom || []).map(c => c.id);
    const valid = (id) => defOrder.includes(id) || customIds.includes(id);
    let order = (home.order || []).filter(valid);
    defOrder.forEach((id, i) => {
      if (order.includes(id)) return;
      let pos = order.length;
      for (let k = i - 1; k >= 0; k--) { const idx = order.indexOf(defOrder[k]); if (idx >= 0) { pos = idx + 1; break; } }
      order.splice(pos, 0, id);
    });
    home.order = order;
  }
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(current)); } catch (e) {} }
  function emit() { subs.forEach(fn => { try { fn(current); } catch (e) {} }); }

  const MarkaPages = {
    PAGES, HOME_BUILTINS,
    get() { return JSON.parse(JSON.stringify(current)); },
    getPage(id) { return PAGES.find(p => p.id === id); },

    /* Resolved, ordered list of visible home sections (builtins + customs). */
    homeLayout() {
      const h = current.home;
      const byId = {};
      HOME_BUILTINS.forEach(s => byId[s.id] = s);
      (h.custom || []).forEach(c => byId[c.id] = Object.assign({ kind: "custom" }, c));
      return (h.order || []).map(id => byId[id]).filter(Boolean).filter(s => !h.hidden[s.id]);
    },
    /* Full ordered list incl. hidden (for the admin manager). */
    homeSections() {
      const h = current.home;
      const byId = {};
      HOME_BUILTINS.forEach(s => byId[s.id] = Object.assign({}, s));
      (h.custom || []).forEach(c => byId[c.id] = Object.assign({ kind: "custom" }, c));
      return (h.order || []).map(id => byId[id]).filter(Boolean).map(s => Object.assign({}, s, { hidden: !!h.hidden[s.id] }));
    },

    setHome(patch) { current.home = Object.assign({}, current.home, patch); persist(); emit(); },
    move(id, dir) {
      const order = current.home.order.slice();
      const i = order.indexOf(id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= order.length) return;
      [order[i], order[j]] = [order[j], order[i]];
      this.setHome({ order });
    },
    /* Drag-drop: move `id` so it sits at visual position `toIndex`. */
    reorder(id, toIndex) {
      const order = current.home.order.slice();
      const from = order.indexOf(id);
      if (from < 0) return;
      order.splice(from, 1);
      const clamped = Math.max(0, Math.min(toIndex, order.length));
      order.splice(clamped, 0, id);
      this.setHome({ order });
    },
    toggleHidden(id) {
      const hidden = Object.assign({}, current.home.hidden);
      hidden[id] = !hidden[id];
      this.setHome({ hidden });
    },
    addCustom(type, afterId) {
      const id = "cs" + Date.now();
      const base = {
        id, type, // "image" | "video" | "text"
        title: type === "video" ? "Video başlığı" : type === "image" ? "Görsel başlığı" : "Yeni bölüm",
        text: "Bu bölümün açıklama metnini buradan düzenleyin.",
        src: null, url: "", visible: true,
        full: false,            // full-bleed (edge-to-edge, hero-like)
        align: "left",          // header text alignment: left | center
      };
      const perType = type === "video"
        ? { controls: true, autoplay: false, loop: false, muted: false, ratio: "16/9" }
        : type === "image"
        ? { rounded: true, ratio: "auto", height: "", link: "", caption: "" }
        : { size: "normal", bg: "none", maxWidth: "narrow" }; // text
      const custom = (current.home.custom || []).concat([Object.assign(base, perType)]);
      const order = current.home.order.slice();
      const at = afterId ? order.indexOf(afterId) + 1 : order.length;
      order.splice(at, 0, id);
      this.setHome({ custom, order });
      return id;
    },
    updateCustom(id, patch) {
      const custom = (current.home.custom || []).map(c => c.id === id ? Object.assign({}, c, patch) : c);
      this.setHome({ custom });
    },
    removeCustom(id) {
      const custom = (current.home.custom || []).filter(c => c.id !== id);
      const order = current.home.order.filter(o => o !== id);
      const hidden = Object.assign({}, current.home.hidden); delete hidden[id];
      this.setHome({ custom, order, hidden });
    },

    /* text-page overrides */
    getText(pageId, key, fallback) {
      const t = (current.text[pageId] || {});
      return t[key] != null ? t[key] : fallback;
    },
    setText(pageId, key, value) {
      const t = Object.assign({}, current.text[pageId] || {});
      t[key] = value;
      current.text = Object.assign({}, current.text, { [pageId]: t });
      persist(); emit();
    },

    reset() { current = JSON.parse(JSON.stringify(defaults)); persist(); emit(); },
    subscribe(fn) { subs.add(fn); return () => subs.delete(fn); },
  };

  window.MarkaPages = MarkaPages;

  window.addEventListener("storage", (e) => {
    if (e.key !== KEY) return;
    current = load();
    emit();
  });
})();
