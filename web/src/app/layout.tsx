import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SITE_DESC, SITE_NAME, SITE_URL } from "@/lib/site";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // data-theme is read by the Marka token system. Fonts/resets come from
  // globals.css → src/styles/marka.css, not next/font.
  return (
    <html lang="tr" data-theme="light" suppressHydrationWarning>
      <body>
        {/* Apply the saved theme before first paint (no flash). Static asset
            in /public — render-blocking, runs before hydration. */}
        <Script src="/theme-init.js" strategy="beforeInteractive" />
        <a href="#content" className="mk-skip">
          İçeriğe atla
        </a>
        <ThemeProvider>
          <div id="content">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
