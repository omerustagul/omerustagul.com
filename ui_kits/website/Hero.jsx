/* Hero — "Ayın İşi". Three explorable directions (full / split / center) via
   a discreet switcher. Headline uses per-line mask-reveal. */
const { useState: useHState } = React;

function MaskTitle({ lines, id }) {
  return (
    <h1>
      {lines.map((ln, i) => (
        <span className="mask reveal-mask" key={i} style={{ "--rd": `${i * 90}ms` }}>
          <span>{ln}</span>
        </span>
      ))}
    </h1>
  );
}

function Hero({ variant }) {
  return (
    <section className="hero" data-variant={variant} aria-label="Öne çıkan iş">
      <div className="hero__media" data-parallax>
        <div className="ph__in" />
      </div>
      <div className="hero__scrim" />
      <div className="wrap hero__inner">
        <div className="hero__top">
          <span className="eyebrow">Öne Çıkan İş — Haziran 2026</span>
          <span className="hero__score">Awwwards skoru <b>9.2</b> / 10</span>
        </div>

        <MaskTitle lines={["Atlas Finans", "yeniden", "markalaşma"]} />

        <div className="hero__bottom">
          <div className="hero__meta">
            <span>Müşteri / <strong>Atlas Bank</strong></span>
            <span>Hizmet / <strong>Marka · Web · Ürün</strong></span>
          </div>
          <Btn variant="secondary" size="lg" arrow magnetic data-cursor="Projeyi İncele">Projeyi İncele</Btn>
        </div>
      </div>
    </section>
  );
}

function HeroSwitch({ variant, setVariant }) {
  const opts = [["full", "Tam"], ["split", "Bölünmüş"], ["center", "Merkez"]];
  return (
    <div className="heroswitch" role="group" aria-label="Hero varyantı">
      <span>Hero</span>
      {opts.map(([v, label]) => (
        <button key={v} className={variant === v ? "on" : ""} onClick={() => setVariant(v)}>{label}</button>
      ))}
    </div>
  );
}

Object.assign(window, { Hero, HeroSwitch });
