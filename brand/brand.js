/* ========================================================================
   BRAND CONFIG — single source of truth for the wordmark + tagline.
   Change BRAND_NAME here and it propagates to every component and UI kit
   that reads it (Logo, Footer, CTA blocks, meta copy).
   Works both as an ES module (import) and as a global (window.MarkaBrand).
   ======================================================================== */
export const BRAND_NAME = "Marka";
export const BRAND_SLOGAN = "Dijitalde yeni standart.";
export const BRAND_SOCIAL = [
  { label: "Instagram", href: "#", short: "IG" },
  { label: "LinkedIn", href: "#", short: "LI" },
  { label: "X", href: "#", short: "X" },
  { label: "YouTube", href: "#", short: "YT" },
  { label: "Dribbble", href: "#", short: "DR" },
  { label: "Behance", href: "#", short: "BE" },
];

/* Also expose globally for non-module scripts (UI kits via <script src>). */
if (typeof window !== "undefined") {
  window.MarkaBrand = { BRAND_NAME, BRAND_SLOGAN, BRAND_SOCIAL };
}
