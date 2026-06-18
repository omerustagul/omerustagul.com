import Link from "next/link";
import { BlogCard, CourseCard, ProductCard, ProjectCard } from "@/components/marka/parts";

/* Faithful port of ui_kits/website/Sections.jsx. Data-driven sections take props
   (wired to the DB in the page); Services/Stats/CTA keep the brand sample copy. */

export function SectionHead({
  eyebrow,
  title,
  sub,
  linkText = "Tümünü Gör",
  linkHref = "#",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  linkText?: string;
  linkHref?: string;
}) {
  return (
    <header
      className="reveal"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: "2rem",
        flexWrap: "wrap",
        paddingBottom: "var(--space-6)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "46ch" }}>
        <span className="eyebrow">{eyebrow}</span>
        <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 600, letterSpacing: "var(--ls-heading)" }}>{title}</h2>
        {sub && <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-lead)" }}>{sub}</p>}
      </div>
      {linkText && (
        <Link className="btn btn--ghost" href={linkHref} data-cursor="">
          {linkText} <span className="arr" aria-hidden="true">→</span>
        </Link>
      )}
    </header>
  );
}

type Work = { title: string; client?: string; category?: string; hue?: number; href: string; votes?: number };

export function LatestWorks({ works }: { works: Work[] }) {
  return (
    <section className="section wrap" aria-label="Son projeler">
      <SectionHead eyebrow="Son Projeler" title="Yakın zamanda teslim ettiklerimiz" linkHref="/projects" />
      <div className="grid-3">
        {works.map((w, i) => (
          <ProjectCard key={i} {...w} />
        ))}
      </div>
    </section>
  );
}

export function Partners({ names }: { names: string[] }) {
  return (
    <section className="section" aria-label="İş ortakları">
      <div className="wrap reveal" style={{ marginBottom: "var(--space-7)" }}>
        <span className="eyebrow">Bize Güvenen Markalar</span>
      </div>
      <div className="marquee reveal">
        <div className="marquee__track">
          {[...names, ...names].map((b, i) => (
            <span className="marquee__item" key={i}>
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

type Course = { title: string; instructor?: string; rating?: number; reviews?: number; price?: string; level?: string; hue?: number; href: string };

export function Academy({ courses }: { courses: Course[] }) {
  return (
    <section className="section wrap" aria-label="Akademi">
      <SectionHead
        eyebrow="Akademi"
        title="En iyilerden öğren"
        sub="Sektörün önde gelen tasarımcılarından kurslar."
        linkText="Tüm Kursları Gör"
        linkHref="/academy"
      />
      <div className="grid-4">
        {courses.map((c, i) => (
          <CourseCard key={i} {...c} />
        ))}
      </div>
    </section>
  );
}

type Post = { title: string; excerpt?: string; category?: string; date?: string; readTime?: string; hue?: number; href: string };

export function Blog({ featured, rest }: { featured?: Post; rest: Post[] }) {
  return (
    <section className="section wrap" aria-label="Blog">
      <SectionHead eyebrow="Güncel Yazılar" title="Stüdyodan notlar" linkText="Tüm Yazılar" linkHref="/blog" />
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "var(--space-6)", alignItems: "start" }} className="blog-grid">
        {featured && <BlogCard featured {...featured} />}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          {rest.map((p, i) => (
            <BlogCard key={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Product = { title: string; seller?: string; price?: string; format?: string; hue?: number; href: string };

export function Market({ products }: { products: Product[] }) {
  return (
    <section className="section wrap" aria-label="Market">
      <SectionHead eyebrow="Şablonlar & Dijital Ürünler" title="Market" linkText="Market'e Git" linkHref="/market" />
      <div className="grid-4">
        {products.map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>
    </section>
  );
}

export function Stats() {
  const stats: [string, string, string][] = [
    ["240", "+", "Tamamlanan proje"],
    ["98", "%", "Mutlu müşteri"],
    ["31", "", "Kazanılan ödül"],
  ];
  return (
    <section className="section wrap" aria-label="İstatistikler">
      <div className="stats reveal">
        {stats.map(([n, u, label], i) => (
          <div className="stat" key={i}>
            <div className="stat__num" data-count={n}>
              {n}
              <span className="u">{u}</span>
            </div>
            <div className="stat__label">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CTABlocks() {
  return (
    <section className="section wrap" aria-label="Başla">
      <div className="cta2">
        <Link className="cta cta--dark reveal" href="/iletisim" data-cursor="Teklif Al">
          <span className="eyebrow" style={{ color: "rgba(255,255,255,.6)" }}>
            Stüdyo
          </span>
          <div>
            <h3>Projeni bizimle başlat</h3>
            <span className="btn btn--secondary" style={{ marginTop: "var(--space-5)", ["--_fg" as string]: "#fff", ["--_bd" as string]: "rgba(255,255,255,.3)" }}>
              Teklif Al <span className="arr">→</span>
            </span>
          </div>
          <span className="cta__big" aria-hidden="true">
            ↗
          </span>
        </Link>
        <Link className="cta cta--accent reveal" href="/login" data-cursor="Üye Ol">
          <span className="eyebrow" style={{ color: "rgba(10,10,10,.55)" }}>
            Topluluk
          </span>
          <div>
            <h3>Topluluğa katıl, Pro ol</h3>
            <span className="btn" style={{ marginTop: "var(--space-5)", ["--_bg" as string]: "var(--ink-900)", ["--_fg" as string]: "#fff" }}>
              Üye Ol <span className="arr">→</span>
            </span>
          </div>
          <span className="cta__big" aria-hidden="true">
            +
          </span>
        </Link>
      </div>
    </section>
  );
}
