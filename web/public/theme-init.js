/* No-FOUC theme init — applies the saved mk-theme to :root before first paint.
   Loaded as a render-blocking <script src> at the top of <body>.
   Mirror of applyTheme() in src/lib/theme.ts — keep both in sync. */
(function () {
  try {
    var KEY = "mk-theme";
    var D = {
      headerTemplate: "classic",
      footerTemplate: "columns",
      heroVariant: "full",
      accent: "#16D17F",
      mode: "light",
      font: "general",
      radius: 10,
    };
    var saved = {};
    try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) {}
    var c = Object.assign({}, D, saved);
    var root = document.documentElement, s = root.style, a = c.accent;
    function mix(p, w) { return "color-mix(in srgb, " + a + " " + p + "%, " + w + ")"; }
    s.setProperty("--accent", a);
    s.setProperty("--accent-hover", mix(82, "#000"));
    s.setProperty("--accent-tint", mix(14, "transparent"));
    var h = a.replace("#", ""),
      r = parseInt(h.slice(0, 2), 16),
      g = parseInt(h.slice(2, 4), 16),
      b = parseInt(h.slice(4, 6), 16);
    var L = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    s.setProperty("--on-accent", L > 0.62 ? "#0A0A0A" : "#FFFFFF");
    s.setProperty("--focus-ring", a);
    s.setProperty("--green-500", a);
    s.setProperty("--green-600", mix(82, "#000"));
    s.setProperty("--green-700", mix(60, "#000"));
    s.setProperty("--green-400", mix(72, "#fff"));
    s.setProperty("--green-200", mix(34, "#fff"));
    s.setProperty("--green-100", mix(14, "#fff"));
    var rad = Math.max(0, c.radius);
    s.setProperty("--radius-xs", Math.max(0, rad - 4) + "px");
    s.setProperty("--radius-sm", Math.max(0, rad - 2) + "px");
    s.setProperty("--radius", rad + "px");
    s.setProperty("--radius-lg", rad + 2 + "px");
    s.setProperty("--radius-xl", rad + 6 + "px");
    s.setProperty("--radius-pill", (rad >= 16 ? 999 : rad * 2) + "px");
    root.setAttribute("data-theme", c.mode === "dark" ? "dark" : "light");
    root.setAttribute("data-header-tpl", c.headerTemplate);
    root.setAttribute("data-footer-tpl", c.footerTemplate);
  } catch (e) {}
})();
