import { BRAND_SLOGAN, BRAND_SOCIAL } from "@/lib/brand";
import { Logo } from "@/components/ui";

export function SiteFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", marginTop: "var(--section-y, 6rem)" }}>
      <div className="u-container" style={{ paddingBlock: "4rem 2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap",
            marginBottom: "3rem",
          }}
        >
          <div style={{ maxWidth: "28ch" }}>
            <Logo size="md" />
            <p style={{ marginTop: "1rem", color: "var(--text-muted)" }}>{BRAND_SLOGAN}</p>
          </div>
          <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", alignItems: "flex-start" }}>
            {BRAND_SOCIAL.map((s) => (
              <a key={s.label} href={s.href} className="u-label" style={{ display: "inline" }}>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* oversized wordmark */}
        <Logo size="xl" />

        <p style={{ marginTop: "2rem", color: "var(--text-subtle)", fontSize: "var(--fs-sm)" }}>
          © 2026 Marka. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
