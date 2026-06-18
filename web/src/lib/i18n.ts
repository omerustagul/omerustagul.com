// Client-safe i18n (no next/headers). Server-side getLocale() lives in i18n-server.ts.
export type Locale = "tr" | "en";
export const LOCALES: Locale[] = ["tr", "en"]; // de/ar extendable: add dict entries
export const LOCALE_COOKIE = "mk-lang";

const dict = {
  tr: {
    projects: "Projeler",
    services: "Hizmetler",
    academy: "Akademi",
    market: "Market",
    blog: "Blog",
    games: "Oyunlar",
    login: "Giriş",
    quote: "Teklif Al",
    slogan: "Dijitalde yeni standart.",
  },
  en: {
    projects: "Projects",
    services: "Services",
    academy: "Academy",
    market: "Market",
    blog: "Blog",
    games: "Games",
    login: "Sign in",
    quote: "Get a Quote",
    slogan: "The new standard in digital.",
  },
} as const;

export type MsgKey = keyof (typeof dict)["tr"];

export function t(locale: Locale, key: MsgKey): string {
  return dict[locale][key] ?? dict.tr[key];
}
