import { cookies } from "next/headers";
import { LOCALE_COOKIE, LOCALES, type Locale } from "@/lib/i18n";

/** Read the visitor's locale from the cookie (server components only). */
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const v = store.get(LOCALE_COOKIE)?.value as Locale | undefined;
  return v && LOCALES.includes(v) ? v : "tr";
}
