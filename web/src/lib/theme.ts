// Theme runtime — ported from the prototype's theme/theme.js.
// Single source of truth for live appearance: accent, mode, font, radius,
// header/footer templates, hero variant. Persisted in localStorage('mk-theme'),
// applied as CSS custom properties on :root, synced across tabs.

export const THEME_KEY = "mk-theme";

export type ThemeConfig = {
  headerTemplate: string;
  footerTemplate: string;
  heroVariant: string;
  accent: string;
  mode: "light" | "dark";
  font: string;
  radius: number;
  popup?: {
    enabled: boolean;
    delaySec: number;
    title: string;
    text: string;
    image: string | null;
    ctaText: string;
    ctaUrl: string;
    freqOncePerSession: boolean;
  };
};

export const DEFAULTS: ThemeConfig = {
  headerTemplate: "classic",
  footerTemplate: "columns",
  heroVariant: "full",
  accent: "#16D17F",
  mode: "light",
  font: "general",
  radius: 10,
  popup: {
    enabled: false,
    delaySec: 5,
    title: "Yeni sezon kampanyası",
    text: "Tüm dijital ürünlerde bu haftaya özel %20 indirim.",
    image: null,
    ctaText: "Keşfet",
    ctaUrl: "market",
    freqOncePerSession: true,
  },
};

export const ACCENTS = [
  { id: "green", label: "Elektrik Yeşili", value: "#16D17F" },
  { id: "violet", label: "Gece Moru", value: "#6C5CE7" },
  { id: "orange", label: "Sıcak Turuncu", value: "#FF5C35" },
  { id: "blue", label: "Okyanus Mavisi", value: "#2A6FDB" },
  { id: "ink", label: "Monokrom", value: "#0A0A0A" },
];

export const FONTS = [
  { id: "general", label: "General Sans", family: '"General Sans", sans-serif', link: "" },
  {
    id: "space",
    label: "Space Grotesk",
    family: '"Space Grotesk", sans-serif',
    link: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
  },
  {
    id: "schibsted",
    label: "Schibsted Grotesk",
    family: '"Schibsted Grotesk", sans-serif',
    link: "https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700&display=swap",
  },
  {
    id: "hanken",
    label: "Hanken Grotesk",
    family: '"Hanken Grotesk", sans-serif',
    link: "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&display=swap",
  },
];

export function fontById(id: string) {
  return FONTS.find((f) => f.id === id) || FONTS[0];
}

// Server-rendered theme variables (no-FOUC). Mirrors applyTheme() as a CSS
// string injected into <head> so the published theme paints before hydration.
export function themeVarsCss(cfg: ThemeConfig): string {
  const a = cfg.accent;
  const mix = (p: number, w: string) => `color-mix(in srgb, ${a} ${p}%, ${w})`;
  const font = fontById(cfg.font);
  const r = Math.max(0, cfg.radius ?? 10);
  const decls = [
    `--accent:${a}`,
    `--accent-hover:${mix(82, "#000")}`,
    `--accent-tint:${mix(14, "transparent")}`,
    `--on-accent:${onAccent(a)}`,
    `--focus-ring:${a}`,
    `--green-500:${a}`,
    `--green-600:${mix(82, "#000")}`,
    `--green-700:${mix(60, "#000")}`,
    `--green-400:${mix(72, "#fff")}`,
    `--green-200:${mix(34, "#fff")}`,
    `--green-100:${mix(14, "#fff")}`,
    `--font-sans:${font.family}`,
    `--radius-xs:${Math.max(0, r - 4)}px`,
    `--radius-sm:${Math.max(0, r - 2)}px`,
    `--radius:${r}px`,
    `--radius-lg:${r + 2}px`,
    `--radius-xl:${r + 6}px`,
    `--radius-pill:${r >= 16 ? 999 : r * 2}px`,
  ];
  return `:root{${decls.join(";")}}`;
}

export function loadTheme(): ThemeConfig {
  if (typeof window === "undefined") return { ...DEFAULTS };
  try {
    return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(THEME_KEY) || "{}") };
  } catch {
    return { ...DEFAULTS };
  }
}

export function saveTheme(cfg: ThemeConfig) {
  try {
    localStorage.setItem(THEME_KEY, JSON.stringify(cfg));
  } catch {
    /* ignore quota errors */
  }
}

// NOTE: keep this in sync with THEME_INIT_SCRIPT below (which mirrors it as a
// plain-JS string so the theme applies before first paint — no FOUC).
export function applyTheme(cfg: ThemeConfig) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  root.style.setProperty("--accent", cfg.accent);
  root.style.setProperty("--accent-hover", `color-mix(in srgb, ${cfg.accent} 82%, #000)`);
  root.style.setProperty("--accent-tint", `color-mix(in srgb, ${cfg.accent} 14%, transparent)`);
  root.style.setProperty("--on-accent", onAccent(cfg.accent));
  root.style.setProperty("--focus-ring", cfg.accent);
  root.style.setProperty("--green-500", cfg.accent);
  root.style.setProperty("--green-600", `color-mix(in srgb, ${cfg.accent} 82%, #000)`);
  root.style.setProperty("--green-700", `color-mix(in srgb, ${cfg.accent} 60%, #000)`);
  root.style.setProperty("--green-400", `color-mix(in srgb, ${cfg.accent} 72%, #fff)`);
  root.style.setProperty("--green-200", `color-mix(in srgb, ${cfg.accent} 34%, #fff)`);
  root.style.setProperty("--green-100", `color-mix(in srgb, ${cfg.accent} 14%, #fff)`);

  const font = fontById(cfg.font);
  if (font.link) ensureFontLink(font.id, font.link);
  root.style.setProperty("--font-sans", font.family);

  if (cfg.radius != null) {
    const r = Math.max(0, cfg.radius);
    root.style.setProperty("--radius-xs", Math.max(0, r - 4) + "px");
    root.style.setProperty("--radius-sm", Math.max(0, r - 2) + "px");
    root.style.setProperty("--radius", r + "px");
    root.style.setProperty("--radius-lg", r + 2 + "px");
    root.style.setProperty("--radius-xl", r + 6 + "px");
    root.style.setProperty("--radius-pill", (r >= 16 ? 999 : r * 2) + "px");
  }

  root.setAttribute("data-theme", cfg.mode === "dark" ? "dark" : "light");
  root.setAttribute("data-header-tpl", cfg.headerTemplate);
  root.setAttribute("data-footer-tpl", cfg.footerTemplate);
}

function onAccent(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const L = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return L > 0.62 ? "#0A0A0A" : "#FFFFFF";
}

function ensureFontLink(id: string, href: string) {
  const elId = "mk-font-" + id;
  if (document.getElementById(elId)) return;
  const l = document.createElement("link");
  l.id = elId;
  l.rel = "stylesheet";
  l.href = href;
  document.head.appendChild(l);
}

// No-FOUC: the saved theme is applied before paint by /public/theme-init.js
// (a render-blocking <script src> in the root layout). Keep that file in sync
// with applyTheme() above.
