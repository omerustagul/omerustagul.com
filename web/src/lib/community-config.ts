// Community configuration — games on/off, daily play limit, homepage
// collections. Admin "Topluluk" persists it; the homepage + game actions read it.

export type CollectionCfg = { id: string; title: string; count: number; base: number; hue: number };
export type CommunityConfig = {
  games: { memory: boolean; sequence: boolean; reaction: boolean };
  dailyLimit: number;
  collections: CollectionCfg[];
};

export const DEFAULT_COMMUNITY: CommunityConfig = {
  games: { memory: true, sequence: true, reaction: true },
  dailyLimit: 1,
  collections: [
    { id: "k1", title: "Editöryel Web", count: 18, base: 1240, hue: 0 },
    { id: "k2", title: "Cesur Tipografi", count: 24, base: 980, hue: 40 },
    { id: "k3", title: "Minimal E-ticaret", count: 15, base: 1530, hue: -50 },
    { id: "k4", title: "Hareket & Etkileşim", count: 12, base: 760, hue: 200 },
  ],
};

export function resolveCommunity(data: unknown): CommunityConfig {
  const d = (data && typeof data === "object" ? data : {}) as Partial<CommunityConfig>;
  return {
    games: { ...DEFAULT_COMMUNITY.games, ...(d.games ?? {}) },
    dailyLimit: typeof d.dailyLimit === "number" && d.dailyLimit > 0 ? d.dailyLimit : DEFAULT_COMMUNITY.dailyLimit,
    collections: Array.isArray(d.collections) && d.collections.length ? d.collections : DEFAULT_COMMUNITY.collections,
  };
}
