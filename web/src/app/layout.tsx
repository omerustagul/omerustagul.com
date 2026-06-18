import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export const metadata: Metadata = {
  title: "Marka — Dijitalde yeni standart",
  description:
    "Kreatif ajans + akademi + dijital ürün marketi + topluluk platformu.",
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
