import type { Metadata } from "next";
import "./globals.css";

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
  // data-theme is read by the Marka token system (light/dark). Fonts and resets
  // come from globals.css → src/styles/marka.css, not next/font.
  return (
    <html lang="tr" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
