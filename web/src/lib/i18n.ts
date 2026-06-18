// Client-safe i18n (no next/headers). Server-side getLocale() lives in i18n-server.ts.
export type Locale = "tr" | "en";
export const LOCALES: Locale[] = ["tr", "en"]; // de/ar extendable: add dict entries
export const LOCALE_COOKIE = "mk-lang";

const dict = {
  tr: {
    discover: "Keşfet",
    partners: "İş Ortakları",
    projects: "Projeler",
    services: "Hizmetler",
    academy: "Akademi",
    market: "Market",
    blog: "Blog",
    games: "Oyunlar",
    login: "Giriş Yap",
    quote: "Görüşme Yap",
    slogan: "Dijitalde yeni standart.",
  },
  en: {
    discover: "Explore",
    partners: "Partners",
    projects: "Projects",
    services: "Services",
    academy: "Academy",
    market: "Market",
    blog: "Blog",
    games: "Games",
    login: "Sign in",
    quote: "Book a call",
    slogan: "The new standard in digital.",
  },
} as const;

export type MsgKey = keyof (typeof dict)["tr"];

export function t(locale: Locale, key: MsgKey): string {
  return dict[locale][key] ?? dict.tr[key];
}
