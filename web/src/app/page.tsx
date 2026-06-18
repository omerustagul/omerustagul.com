import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/home/Hero";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  BlogCard,
  Button,
  CourseCard,
  Marquee,
  ProductCard,
  ProjectCard,
  SectionHeading,
} from "@/components/ui";

export const dynamic = "force-dynamic"; // always read fresh from the DB (F5 admin writes)

const dateFmt = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short", year: "numeric" });

export default async function Home() {
  const [projects, courses, products, posts, partners, services] = await Promise.all([
    prisma.project.findMany({ orderBy: { order: "asc" }, take: 6 }),
    prisma.course.findMany({ orderBy: { createdAt: "desc" }, take: 3 }),
    prisma.product.findMany({ orderBy: { createdAt: "desc" }, take: 4 }),
    prisma.blogPost.findMany({
      where: { publishedAt: { not: null } },
      orderBy: { publishedAt: "desc" },
      take: 4,
    }),
    prisma.partner.findMany({ orderBy: { order: "asc" } }),
    prisma.service.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />

        {/* Partners marquee */}
        {partners.length > 0 && (
          <div style={{ borderBlock: "1px solid var(--border)", paddingBlock: "2rem" }}>
            <Marquee speed={28}>
              {partners.map((p) => (
                <span
                  key={p.id}
                  className="u-label"
                  style={{ fontSize: "1.25rem", color: "var(--text-muted)" }}
                >
                  {p.name}
                </span>
              ))}
            </Marquee>
          </div>
        )}

        {/* Latest works */}
        <Section id="works">
          <SectionHeading
            eyebrow="SON PROJELER"
            title="Öne çıkan işler"
            linkText="Tümünü Gör"
            linkHref="#"
          />
          <CardGrid>
            {projects.map((p) => (
              <ProjectCard
                key={p.id}
                title={p.title}
                client={p.client ?? undefined}
                category={p.category ?? undefined}
                tag={p.tag}
                image={p.image ?? undefined}
              />
            ))}
          </CardGrid>
        </Section>

        {/* Services */}
        <Section id="services">
          <SectionHeading eyebrow="HİZMETLER" title="Ne yapıyoruz" />
          <div>
            {services.map((s) => (
              <div
                key={s.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "2rem",
                  alignItems: "baseline",
                  padding: "1.5rem 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <h3 style={{ fontSize: "var(--fs-h3)", letterSpacing: "var(--ls-heading)" }}>
                  {s.title}
                </h3>
                {s.description && (
                  <p style={{ color: "var(--text-muted)", maxWidth: "38ch", textAlign: "right" }}>
                    {s.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* Academy */}
        {courses.length > 0 && (
          <Section id="academy">
            <SectionHeading
              eyebrow="AKADEMİ"
              title="Kurslarla derinleş"
              linkText="Akademi'ye Git"
              linkHref="#"
            />
            <CardGrid>
              {courses.map((c) => (
                <CourseCard
                  key={c.id}
                  title={c.title}
                  price={`₺${c.price.toLocaleString("tr-TR")}`}
                />
              ))}
            </CardGrid>
          </Section>
        )}

        {/* Market */}
        {products.length > 0 && (
          <Section id="market">
            <SectionHeading
              eyebrow="DİJİTAL ÜRÜN"
              title="Market"
              linkText="Market'e Git"
              linkHref="#"
            />
            <CardGrid>
              {products.map((p) => (
                <ProductCard key={p.id} title={p.title} price={`${p.price} USD`} />
              ))}
            </CardGrid>
          </Section>
        )}

        {/* Blog */}
        {posts.length > 0 && (
          <Section id="blog">
            <SectionHeading
              eyebrow="GÜNCEL YAZILAR"
              title="Blog"
              linkText="Tümünü Gör"
              linkHref="#"
            />
            <CardGrid>
              {posts.map((p) => (
                <BlogCard
                  key={p.id}
                  title={p.title}
                  excerpt={p.excerpt ?? undefined}
                  category={p.category ?? undefined}
                  readTime={p.readTime ?? undefined}
                  date={p.publishedAt ? dateFmt.format(p.publishedAt) : undefined}
                />
              ))}
            </CardGrid>
          </Section>
        )}

        {/* CTA */}
        <section id="cta" className="u-container" style={{ paddingBlock: "var(--section-y, 6rem)" }}>
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)",
              padding: "clamp(2.5rem, 6vw, 5rem)",
              textAlign: "center",
            }}
          >
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em", maxWidth: "18ch", margin: "0 auto" }}>
              Projeni bizimle başlat.
            </h2>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2rem", flexWrap: "wrap" }}>
              <Button href="/login" variant="primary" size="lg">
                Teklif Al
              </Button>
              <Button href="/showcase" variant="ghost" size="lg" iconRight="↗">
                Tasarım Sistemi
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="u-container" style={{ paddingBlock: "clamp(3rem, 7vw, 6rem)" }}>
      {children}
    </section>
  );
}

function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gap: "2rem",
        gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))",
      }}
    >
      {children}
    </div>
  );
}
