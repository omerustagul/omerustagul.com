import { Button } from "@/components/ui";
import { Logo } from "@/components/ui";

// F0/F3 landing — proves the token system + ported components render, and links
// to the showcase / auth. Real homepage sections come in F4.
export default function Home() {
  return (
    <main className="u-container" style={{ paddingBlock: "var(--section-y, 6rem)" }}>
      <Logo size="md" />
      <p className="u-label" style={{ margin: "2.5rem 0 1rem" }}>
        F3 · TASARIM SİSTEMİ
      </p>
      <h1
        style={{
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          letterSpacing: "-0.03em",
          lineHeight: 1.0,
          maxWidth: "16ch",
        }}
      >
        Marka<span style={{ color: "var(--accent)" }}>.</span> Dijitalde yeni standart.
      </h1>
      <p style={{ marginTop: "1.5rem", color: "var(--text-muted)", maxWidth: "52ch" }}>
        Next.js 16 + Prisma + NextAuth iskeleti hazır; tasarım token sistemi ve component
        primitive'leri TSX olarak taşındı. Component galerisini ve canlı temayı keşfet.
      </p>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2.5rem" }}>
        <Button href="/showcase" variant="primary" iconRight="→">
          Component Galerisi
        </Button>
        <Button href="/login" variant="secondary">
          Giriş Yap
        </Button>
        <Button href="/admin" variant="ghost" iconRight="↗">
          Admin
        </Button>
      </div>
    </main>
  );
}
