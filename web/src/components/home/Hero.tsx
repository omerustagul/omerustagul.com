import { Button } from "@/components/ui";

export function Hero() {
  return (
    <section
      className="u-container"
      style={{ paddingBlock: "clamp(4rem, 10vw, 9rem) clamp(3rem, 6vw, 6rem)" }}
    >
      <p className="u-label" style={{ marginBottom: "1.5rem" }}>
        KREATİF AJANS · AKADEMİ · MARKET
      </p>
      <h1
        style={{
          fontSize: "clamp(2.75rem, 9vw, 8rem)",
          letterSpacing: "-0.04em",
          lineHeight: 0.95,
          maxWidth: "14ch",
          textWrap: "balance",
        }}
      >
        Markaları geleceğe<span style={{ color: "var(--accent)" }}> taşıyoruz</span>.
      </h1>
      <p
        style={{
          marginTop: "2rem",
          maxWidth: "46ch",
          fontSize: "var(--fs-lead)",
          color: "var(--text-muted)",
        }}
      >
        Editöryel tasarım, premium hareket ve ölçülebilir sonuçlar. Projeni bizimle başlat.
      </p>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2.5rem" }}>
        <Button href="#cta" variant="primary" size="lg">
          Teklif Al
        </Button>
        <Button href="#works" variant="secondary" size="lg" iconRight="→">
          Projeleri İncele
        </Button>
      </div>

      <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap", marginTop: "4rem" }}>
        {[
          ["240+", "tamamlanan proje"],
          ["%32", "ortalama dönüşüm artışı"],
          ["9.2", "müşteri memnuniyeti"],
        ].map(([n, label]) => (
          <div key={label}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight: 600,
              }}
            >
              {n}
            </div>
            <div className="u-label" style={{ marginTop: ".4rem" }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
