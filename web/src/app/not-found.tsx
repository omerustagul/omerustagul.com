import Link from "next/link";

export default function NotFound() {
  return (
    <main className="u-container" style={{ paddingBlock: "clamp(5rem, 14vw, 10rem)", textAlign: "center" }}>
      <p className="u-label" style={{ marginBottom: "1rem" }}>
        404
      </p>
      <h1 style={{ fontSize: "clamp(2.5rem, 9vw, 6rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}>
        Sayfa bulunamadı
      </h1>
      <p style={{ color: "var(--text-muted)", marginTop: "1.25rem" }}>
        Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.
      </p>
      <div style={{ marginTop: "2.5rem" }}>
        <Link href="/" className="mk-btn mk-btn--primary mk-btn--md" style={{ display: "inline-flex" }}>
          Ana sayfaya dön
        </Link>
      </div>
    </main>
  );
}
