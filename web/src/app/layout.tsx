import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SITE_DESC, SITE_NAME, SITE_URL } from "@/lib/site";
import { getLocale } from "@/lib/i18n-server";
import { langMeta } from "@/lib/i18n";
import { getSiteTheme } from "@/lib/theme-server";
import { fontById, themeVarsCss } from "@/lib/theme";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — Dijitalde yeni standart`, template: `%s — ${SITE_NAME}` },
  description: SITE_DESC,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Dijitalde yeni standart`,
    description: SITE_DESC,
    locale: "tr_TR",
  },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: SITE_DESC },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The published theme (SiteSettings DB row) is the single source of truth.
  // It's rendered server-side onto <html> + an inline <style> so it paints
  // before hydration (no FOUC) and is global for every visitor.
  const [locale, theme] = await Promise.all([getLocale(), getSiteTheme()]);
  const meta = langMeta(locale);
  const font = fontById(theme.font);
  return (
    <html
      lang={locale}
      dir={meta.rtl ? "rtl" : "ltr"}
      data-theme={theme.mode === "dark" ? "dark" : "light"}
      data-header-tpl={theme.headerTemplate}
      data-footer-tpl={theme.footerTemplate}
      suppressHydrationWarning
    >
      <head>
        <style id="mk-theme-vars" dangerouslySetInnerHTML={{ __html: themeVarsCss(theme) }} />
        {font.link ? <link rel="stylesheet" href={font.link} /> : null}
      </head>
      <body>
        <a href="#content" className="mk-skip">
          İçeriğe atla
        </a>
        <ThemeProvider initialTheme={theme}>
          <div id="content">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
