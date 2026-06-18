import { Btn } from "@/components/marka/parts";

/* Faithful port of ui_kits/website/Hero.jsx — featured-work editorial hero
   with per-line mask-reveal headline. */

function MaskTitle({ lines }: { lines: string[] }) {
  return (
    <h1>
      {lines.map((ln, i) => (
        <span className="mask reveal-mask" key={i} style={{ "--rd": `${i * 90}ms` } as React.CSSProperties}>
          <span>{ln}</span>
        </span>
      ))}
    </h1>
  );
}

export function Hero({
  lines = ["Atlas Finans", "yeniden", "markalaşma"],
  client = "Atlas Bank",
  service = "Marka · Web · Ürün",
  score = "9.2",
  href = "#",
}: {
  lines?: string[];
  client?: string;
  service?: string;
  score?: string;
  href?: string;
}) {
  return (
    <section className="hero" data-variant="full" aria-label="Öne çıkan iş">
      <div className="hero__media" data-parallax>
        <div className="ph__in" />
      </div>
      <div className="hero__scrim" />
      <div className="wrap hero__inner">
        <div className="hero__top">
          <span className="eyebrow">Öne Çıkan İş — Haziran 2026</span>
          <span className="hero__score">
            Awwwards skoru <b>{score}</b> / 10
          </span>
        </div>

        <MaskTitle lines={lines} />

        <div className="hero__bottom">
          <div className="hero__meta">
            <span>
              Müşteri / <strong>{client}</strong>
            </span>
            <span>
              Hizmet / <strong>{service}</strong>
            </span>
          </div>
          <Btn variant="secondary" size="lg" arrow magnetic href={href} dataCursor="Projeyi İncele">
            Projeyi İncele
          </Btn>
        </div>
      </div>
    </section>
  );
}
