// Homepage section layout — ported from the prototype's theme/pages.js. The
// built-in sections are fixed components but reorderable + hideable; the admin
// "Sayfalar" module persists the order/visibility + custom sections, and the
// homepage respects them.

export type HomeSection = { id: string; comp: string; label: string; locked?: boolean };

export const HOME_BUILTINS: HomeSection[] = [
  { id: "hero", comp: "Hero", label: "Hero — Öne çıkan iş", locked: true },
  { id: "works", comp: "LatestWorks", label: "Son Projeler" },
  { id: "weekly", comp: "WeeklyWork", label: "Haftanın İşi" },
  { id: "partners", comp: "Partners", label: "İş Ortakları" },
  { id: "services", comp: "Services", label: "Hizmetler" },
  { id: "academy", comp: "Academy", label: "Akademi" },
  { id: "collections", comp: "Collections", label: "Koleksiyonlar" },
  { id: "games", comp: "Games", label: "Zihin Oyunları" },
  { id: "blog", comp: "Blog", label: "Blog" },
  { id: "market", comp: "Market", label: "Market" },
  { id: "stats", comp: "Stats", label: "İstatistikler" },
  { id: "cta", comp: "CTABlocks", label: "Alt CTA" },
];

export type CustomType = "image" | "video" | "text";
export type CustomSection = {
  id: string;
  type: CustomType;
  title?: string;
  text?: string;
  src?: string | null; // image
  url?: string; // video
  caption?: string;
  align?: "left" | "center";
  full?: boolean;
};

export type HomeLayout = { order: string[]; hidden: Record<string, boolean>; custom: CustomSection[] };
export const DEFAULT_LAYOUT: HomeLayout = { order: HOME_BUILTINS.map((s) => s.id), hidden: {}, custom: [] };

export function newCustomSection(type: CustomType): CustomSection {
  return {
    id: "cs" + Math.random().toString(36).slice(2, 9),
    type,
    title: type === "video" ? "Video başlığı" : type === "image" ? "Görsel başlığı" : "Yeni bölüm",
    text: type === "text" ? "Bu bölümün açıklama metnini buradan düzenleyin." : "",
    src: null,
    url: "",
    caption: "",
    align: "left",
    full: false,
  };
}

/** Merge persisted layout over defaults; reconcile so builtins/customs stay valid. */
export function resolveHomeLayout(data: unknown): HomeLayout {
  const d = (data && typeof data === "object" ? data : {}) as { order?: unknown; hidden?: unknown; custom?: unknown };
  const defIds = HOME_BUILTINS.map((s) => s.id);
  const custom: CustomSection[] = Array.isArray(d.custom)
    ? (d.custom as CustomSection[]).filter((c) => c && typeof c.id === "string" && typeof c.type === "string")
    : [];
  const customIds = custom.map((c) => c.id);
  const valid = (id: string) => defIds.includes(id) || customIds.includes(id);
  const order: string[] = Array.isArray(d.order) ? (d.order as string[]).filter(valid) : [];
  // insert any builtin missing from the saved order right after its neighbour
  defIds.forEach((id, i) => {
    if (order.includes(id)) return;
    let pos = order.length;
    for (let k = i - 1; k >= 0; k--) {
      const idx = order.indexOf(defIds[k]);
      if (idx >= 0) {
        pos = idx + 1;
        break;
      }
    }
    order.splice(pos, 0, id);
  });
  // append any custom not yet in the order
  customIds.forEach((id) => {
    if (!order.includes(id)) order.push(id);
  });
  const hidden = (d.hidden && typeof d.hidden === "object" ? d.hidden : {}) as Record<string, boolean>;
  return { order, hidden, custom };
}
