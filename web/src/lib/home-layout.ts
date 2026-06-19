// Homepage section layout — ported from the prototype's theme/pages.js. The
// built-in sections are fixed components but reorderable + hideable; the admin
// "Sayfalar" module persists the order/visibility and the homepage respects it.

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

export type HomeLayout = { order: string[]; hidden: Record<string, boolean> };
export const DEFAULT_LAYOUT: HomeLayout = { order: HOME_BUILTINS.map((s) => s.id), hidden: {} };

/** Merge persisted layout over defaults; reconcile so new builtins still appear. */
export function resolveHomeLayout(data: unknown): HomeLayout {
  const d = (data && typeof data === "object" ? data : {}) as { order?: unknown; hidden?: unknown };
  const defIds = HOME_BUILTINS.map((s) => s.id);
  const order: string[] = Array.isArray(d.order) ? (d.order as string[]).filter((id) => defIds.includes(id)) : [];
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
  const hidden = (d.hidden && typeof d.hidden === "object" ? d.hidden : {}) as Record<string, boolean>;
  return { order, hidden };
}
