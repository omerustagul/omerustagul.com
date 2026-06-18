import Link from "next/link";
import { Button, Logo } from "@/components/ui";

const NAV: [string, string][] = [
  ["Projeler", "/projects"],
  ["Hizmetler", "/#services"],
  ["Akademi", "/academy"],
  ["Market", "/market"],
  ["Blog", "/blog"],
  ["Oyunlar", "/oyunlar"],
];

export function SiteHeader() {
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
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
          height: "4.5rem",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <Logo size="sm" />
        </Link>

        <nav style={{ display: "flex", gap: "1.75rem" }}>
          {NAV.map(([label, href]) => (
            <a
              key={label}
              href={href}
              style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", gap: ".75rem", alignItems: "center" }}>
          <Button href="/login" variant="ghost" size="sm">
            Giriş
          </Button>
          <Button href="/iletisim" variant="primary" size="sm">
            Teklif Al
          </Button>
        </div>
      </div>
    </header>
  );
}
