/* Home page sections: Latest Works, Partners, Services, Academy, Collections,
   Blog, Market, Stats, CTA. Content is brand-appropriate Turkish sample copy. */

function SectionHead({ eyebrow, title, sub, linkText = "Tümünü Gör" }) {
  return (
    <header className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "2rem", flexWrap: "wrap", paddingBottom: "var(--space-6)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "46ch" }}>
        <span className="eyebrow">{eyebrow}</span>
        <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 600, letterSpacing: "var(--ls-heading)" }}>{title}</h2>
        {sub && <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-lead)" }}>{sub}</p>}
      </div>
      {linkText && <a className="btn btn--ghost" href="#" data-cursor>{linkText} <span className="arr" aria-hidden="true">→</span></a>}
    </header>);

}

function LatestWorks() {
  const works = [
  { title: "Nova Spor Uygulaması", client: "Nova · 2026", category: "UI/UX", hue: 0 },
  { title: "Pera Galeri kimliği", client: "Pera Sanat · 2025", category: "MARKA", hue: 40 },
  { title: "Venta e-ticaret", client: "Venta · 2026", category: "E-TİCARET", hue: -50 }];

  return (
    <section className="section wrap" aria-label="Son projeler">
      <SectionHead eyebrow="Son Projeler" title="Yakın zamanda teslim ettiklerimiz" />
      <div className="grid-3">{works.map((w, i) => <ProjectCard key={i} {...w} />)}</div>
    </section>);

}

function Partners() {
  const brands = ["ATLAS", "NOVA", "KÖK", "VENTA", "ORBİT", "FORM", "PERA", "LUMA"];
  return (
    <section className="section" aria-label="İş ortakları">
      <div className="wrap reveal" style={{ marginBottom: "var(--space-7)" }}>
        <span className="eyebrow">Bize Güvenen Markalar</span>
      </div>
      <div className="marquee reveal">
        <div className="marquee__track">
          {[...brands, ...brands].map((b, i) => <span className="marquee__item" key={i}>{b}</span>)}
        </div>
      </div>
    </section>);

}

function Services() {
  const { useState } = React;
  const groups = [
  { n: "01", name: "Geliştirme", desc: "Headless CMS, animasyon ve ölçeklenebilir yazılım.",
    subs: [["Web Sitesi Geliştirme", "Editoryal, performanslı ve erişilebilir web siteleri."], ["Mobil Uygulama", "iOS & Android için native ve cross-platform uygulamalar."], ["Yazılım Aracı", "Panel, dashboard ve özel yazılım araçları."]] },
  { n: "02", name: "Tasarım", desc: "Marka, arayüz ve hareket tasarımı.",
    subs: [["UI/UX Tasarım", "Araştırma, akış kurgusu ve arayüz tasarımı."], ["Markalaşma", "Strateji, isimlendirme ve marka kimlik sistemleri."], ["Motion & Etkileşim", "Hareket tasarımı ve mikro etkileşimler."]] },
  { n: "03", name: "Büyüme & Pazarlama", desc: "Dönüşüm, performans ve görünürlük.",
    subs: [["E-ticaret", "Dönüşüm odaklı mağaza ve ödeme deneyimleri."], ["SEO & Performans", "Teknik SEO, Core Web Vitals ve hız optimizasyonu."]] }];

  const [open, setOpen] = useState(null);
  return (
    <section className="section wrap" aria-label="Hizmetler">
      <SectionHead eyebrow="Hizmetler" title="Ne yapıyoruz" linkText="" />
      <div className="svc reveal">
        {groups.map((g) => {
          const isOpen = open === g.n;
          return (
            <div className={`svc__group ${isOpen ? "is-open" : ""}`} key={g.n}>
              <button className="svc__row" type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : g.n)}>
                <span className="svc__num">{g.n}</span>
                <span className="svc__name">{g.name}</span>
                <span className="svc__desc">{g.desc}</span>
                <span className="svc__toggle" aria-hidden="true"><i></i><i></i></span>
              </button>
              <div className="svc__panel" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                <div className="svc__panel-in">
                  <ul className="svc__subs">
                    {g.subs.map(([name, desc], i) =>
                    <li className="svc__sub" key={i} data-cursor>
                        <span className="svc__sub-name" style={{ width: "556px" }}>{name}</span>
                        <span className="svc__sub-desc" style={{ width: "414px" }}>{desc}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>);

        })}
      </div>
    </section>);

}

function Academy() {
  const courses = [
  { title: "Sıfırdan Tasarım Sistemi", instructor: "Deniz Arı", rating: 4.9, reviews: 214, price: "₺1.299", level: "Orta", hue: 0 },
  { title: "Webflow ile Üretim", instructor: "Ece Kaya", rating: 4.8, reviews: 178, price: "₺899", level: "Başlangıç", hue: 30 },
  { title: "Motion & Etkileşim", instructor: "Mert Su", rating: 5.0, reviews: 96, price: "₺1.499", level: "İleri", hue: -40 },
  { title: "Marka Stratejisi", instructor: "Lale Yön", rating: 4.7, reviews: 132, price: "₺1.099", level: "Orta", hue: 70 }];

  return (
    <section className="section wrap" aria-label="Akademi">
      <SectionHead eyebrow="Akademi" title="En iyilerden öğren" sub="Sektörün önde gelen tasarımcılarından kurslar." linkText="Tüm Kursları Gör" />
      <div className="grid-4">{courses.map((c, i) => <CourseCard key={i} {...c} />)}</div>
    </section>);

}

function Blog() {
  return (
    <section className="section wrap" aria-label="Blog">
      <SectionHead eyebrow="Güncel Yazılar" title="Stüdyodan notlar" linkText="Tüm Yazılar" />
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "var(--space-6)", alignItems: "start" }} className="blog-grid">
        <BlogCard featured category="Görüş" date="12 Haz 2026" readTime="6 dk okuma"
        title="2026'da editoryal grid'ler neden geri döndü?"
        excerpt="Bol negatif alan, ince çizgiler ve büyük tipografi: ödüllü sitelerin ortak dili." hue={0} />
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          <BlogCard category="Süreç" date="03 Haz" readTime="4 dk" title="Bir marka kimliğini nasıl kurguluyoruz" hue={40} />
          <BlogCard category="Teknik" date="28 May" readTime="7 dk" title="Smooth scroll ve performans dengesi" hue={-40} />
          <BlogCard category="Kültür" date="19 May" readTime="3 dk" title="Stüdyoda bir hafta" hue={70} />
        </div>
      </div>
    </section>);

}

function Market() {
  const products = [
  { title: "Grid UI Kit", seller: "Marka Studio", format: "Figma", price: "59 USD", hue: 0 },
  { title: "Portfolyo Şablonu", seller: "Nova Labs", format: "Webflow", price: "39 USD", hue: 40 },
  { title: "Ikon Seti — 240", seller: "Form Co.", format: "SVG", price: "29 USD", hue: -40 },
  { title: "Sunum Sistemi", seller: "Pera", format: "Keynote", price: "49 USD", hue: 70 }];

  return (
    <section className="section wrap" aria-label="Market">
      <SectionHead eyebrow="Şablonlar & Dijital Ürünler" title="Market" linkText="Market'e Git" />
      <div className="grid-4">{products.map((p, i) => <ProductCard key={i} {...p} />)}</div>
    </section>);

}

function Stats() {
  const stats = [["240", "+", "Tamamlanan proje"], ["98", "%", "Mutlu müşteri"], ["31", "", "Kazanılan ödül"]];
  return (
    <section className="section wrap" aria-label="İstatistikler">
      <div className="stats reveal">
        {stats.map(([n, u, label], i) =>
        <div className="stat" key={i}>
            <div className="stat__num" data-count={n}>{n}<span className="u">{u}</span></div>
            <div className="stat__label">{label}</div>
          </div>
        )}
      </div>
    </section>);

}

function CTABlocks() {
  return (
    <section className="section wrap" aria-label="Başla">
      <div className="cta2">
        <a className="cta cta--dark reveal" href="#" data-cursor="Teklif Al">
          <span className="eyebrow" style={{ color: "rgba(255,255,255,.6)" }}>Stüdyo</span>
          <div>
            <h3>Projeni bizimle başlat</h3>
            <span className="btn btn--secondary" style={{ marginTop: "var(--space-5)", "--_fg": "#fff", "--_bd": "rgba(255,255,255,.3)" }}>Teklif Al <span className="arr">→</span></span>
          </div>
          <span className="cta__big" aria-hidden="true">↗</span>
        </a>
        <a className="cta cta--accent reveal" href="#" data-cursor="Üye Ol">
          <span className="eyebrow" style={{ color: "rgba(10,10,10,.55)" }}>Topluluk</span>
          <div>
            <h3>Topluluğa katıl, Pro ol</h3>
            <span className="btn" style={{ marginTop: "var(--space-5)", "--_bg": "var(--ink-900)", "--_fg": "#fff" }}>Üye Ol <span className="arr">→</span></span>
          </div>
          <span className="cta__big" aria-hidden="true">+</span>
        </a>
      </div>
    </section>);

}

Object.assign(window, { LatestWorks, Partners, Services, Academy, Blog, Market, Stats, CTABlocks, SectionHead, CustomSection });

function csVideoEl(s) {
  const isEmbed = s.url && /youtube\.com|youtu\.be|vimeo\.com/.test(s.url);
  if (isEmbed) {
    let src = toEmbed(s.url);
    const ytId = (src.match(/embed\/([^?]+)/) || [])[1];
    const p = [];
    if (s.autoplay) p.push("autoplay=1");
    if (s.muted || s.autoplay) { p.push("mute=1", "muted=1"); }
    if (s.loop) { p.push("loop=1"); if (ytId) p.push("playlist=" + ytId); }
    if (!s.controls) p.push("controls=0");
    if (p.length) src += (src.indexOf("?") >= 0 ? "&" : "?") + p.join("&");
    return <iframe className="cs__embed" src={src} title={s.title || "video"} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>;
  }
  if (s.url) {
    return <video className="cs__video" src={s.url} poster={s.src || undefined}
      controls={!!s.controls} autoPlay={!!s.autoplay} loop={!!s.loop} muted={!!s.muted || !!s.autoplay} playsInline></video>;
  }
  return <div className="cs__ph"><span className="cs__ph-ic" aria-hidden="true">▶</span><span>Video bağlantısı ekleyin</span></div>;
}

function CustomSection({ section }) {
  const s = section || {};
  const full = !!s.full;
  const align = s.align === "center" ? "center" : "left";
  const isVideo = s.type === "video", isImage = s.type === "image", isText = s.type === "text";
  const ratioStyle = (s.ratio && s.ratio !== "auto") ? { aspectRatio: s.ratio.replace("/", " / ") } : undefined;

  /* ---- TEXT section ---- */
  if (isText) {
    return (
      <section className={`section cs-text cs-text--bg-${s.bg || "none"} ${full ? "cs-text--full" : ""}`}>
        <div className="wrap">
          <div className={`cs-text__inner cs-text--w-${s.maxWidth || "narrow"} cs__head--${align} reveal`}>
            {s.title && <h2 className="cs__title">{s.title}</h2>}
            {s.text && <p className={`cs-text__body cs-text--${s.size || "normal"}`}>{s.text}</p>}
          </div>
        </div>
      </section>
    );
  }

  const head = (s.title || s.text) && (
    <header className={`cs__head cs__head--${align}`}>
      {s.title && <h2 className="cs__title">{s.title}</h2>}
      {s.text && <p className="cs__text">{s.text}</p>}
    </header>
  );

  const mediaInner = isVideo ? csVideoEl(s)
    : s.src ? <img src={s.src} alt={s.title || ""} /> : <div className="cs__ph"><span>Görsel ekleyin</span></div>;

  const mediaClass = `cs__media cs__media--${isVideo ? "video" : "image"} ${full ? "cs__media--full" : ""} ${isImage && s.rounded === false ? "cs__media--sharp" : ""} ${isImage && ratioStyle ? "cs__media--cover" : ""}`;
  const media = isImage && s.link
    ? <a className={mediaClass} href={s.link} style={!full ? ratioStyle : undefined} data-cursor="Aç →">{mediaInner}</a>
    : <div className={mediaClass} style={!full ? ratioStyle : undefined}>{mediaInner}</div>;

  /* ---- FULL-BLEED image/video ---- */
  if (full) {
    return (
      <section className="section cs-section cs-section--full" aria-label={s.title || "Bölüm"}>
        {head && <div className="wrap">{head}</div>}
        {media}
        {isImage && s.caption && <div className="wrap"><figcaption className="cs__caption">{s.caption}</figcaption></div>}
      </section>
    );
  }

  /* ---- CONTAINED image/video ---- */
  return (
    <section className="section wrap" aria-label={s.title || "Bölüm"}>
      <div className={`cs cs--${align} reveal`}>
        {head}
        {media}
        {isImage && s.caption && <figcaption className="cs__caption">{s.caption}</figcaption>}
      </div>
    </section>
  );
}

function toEmbed(url) {
  try {
    if (/youtu\.be\//.test(url)) return "https://www.youtube.com/embed/" + url.split("youtu.be/")[1].split(/[?&]/)[0];
    if (/youtube\.com\/watch/.test(url)) { const v = new URL(url).searchParams.get("v"); return "https://www.youtube.com/embed/" + v; }
    if (/vimeo\.com\/(\d+)/.test(url)) return "https://player.vimeo.com/video/" + url.match(/vimeo\.com\/(\d+)/)[1];
  } catch (e) {}
  return url;
}