import Link from "next/link";
import { Button, Logo } from "@/components/ui";
import { t, type MsgKey } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";

const NAV: [MsgKey, string][] = [
  ["projects", "/projects"],
  ["services", "/#services"],
  ["academy", "/academy"],
  ["market", "/market"],
  ["blog", "/blog"],
  ["games", "/oyunlar"],
];

export async function SiteHeader() {
  const locale = await getLocale();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid var(--border)",
        background: "color-mix(in srgb, var(--bg) 80%, transparent)",
        backdropFilter: "blur(14px)",
      }}
    >
      <div
        className="u-container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem", height: "4.5rem" }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <Logo size="sm" />
        </Link>

        <nav style={{ display: "flex", gap: "1.75rem" }}>
          {NAV.map(([key, href]) => (
            <a key={key} href={href} style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>
              {t(locale, key)}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", gap: ".9rem", alignItems: "center" }}>
          <LanguageSwitcher current={locale} />
          <Button href="/login" variant="ghost" size="sm">
            {t(locale, "login")}
          </Button>
          <Button href="/iletisim" variant="primary" size="sm">
            {t(locale, "quote")}
          </Button>
        </div>
      </div>
    </header>
  );
}
