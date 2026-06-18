const TR: Record<string, string> = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u" };

/** Turkish-aware slugify. */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[çğıöşü]/g, (m) => TR[m] || m)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
