// Inline text overrides for the homepage — { key: value } applied to elements
// carrying a data-mk-key. Ported from the prototype's MarkaPages text store.

export type PageTextMap = Record<string, string>;

export function resolvePageText(data: unknown): PageTextMap {
  if (data && typeof data === "object") {
    const out: PageTextMap = {};
    for (const [k, v] of Object.entries(data as Record<string, unknown>)) {
      if (typeof v === "string") out[k] = v;
    }
    return out;
  }
  return {};
}

/** Override a default with the saved text for `key`, if present. */
export function txt(overrides: PageTextMap | undefined, key: string, fallback: string): string {
  const v = overrides?.[key];
  return v != null && v !== "" ? v : fallback;
}
