import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ScrollProgress } from "@/components/marka/ScrollProgress";

export const dynamic = "force-dynamic";

type Metric = { id: string; label: string; before: string; after: string };
type GalleryItem = { id: string; src: string; caption?: string };
type ProjectData = {
  year?: string;
  serviceNames?: string[];
  duration?: string;
  role?: string;
  problem?: string;
  solution?: string;
  body?: string;
  metrics?: Metric[];
  quote?: string;
  quoteAuthor?: string;
  quoteRole?: string;
  gallery?: GalleryItem[];
  next?: string;
};

function renderBody(text: string) {
  return text
    .split(/\n{2,}/)
    .map((para, i) => {
      const t = para.trim();
      if (!t) return null;
      if (/^#{1,2}\s+/.test(t)) return <h3 key={i}>{t.replace(/^#{1,2}\s+/, "")}</h3>;
      return <p key={i}>{t}</p>;
    })
    .filter(Boolean);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return {};
  const description = project.client ? `${project.client} · ${project.category ?? ""}`.trim() : undefined;
  return { title: project.title, description, openGraph: { title: project.title, description } };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const all = await prisma.project.findMany({ orderBy: { order: "asc" } });
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx < 0) notFound();
  const project = all[idx];
  const d = (project.data ?? {}) as ProjectData;

  // Next project: honour an explicit choice, else the next one by order.
  let next = all[(idx + 1) % all.length];
  if (d.next) {
    const chosen = all.find((p) => p.title === d.next);
    if (chosen) next = chosen;
  }

  const year = d.year || String(new Date(project.createdAt).getFullYear());
  const services = (d.serviceNames || []).join(" · ");
  const metrics = (d.metrics || []).filter((m) => m.label);
  const gallery = d.gallery || [];
  const solutionBody = [d.solution, d.body].filter(Boolean).join("\n\n");

  return (
    <>
      <ScrollProgress className="progress" />
      <main className="page">
        <div className="wrap">
          <header className="page__head reveal">
            <span className="eyebrow">{project.category || "Proje"} — {year}</span>
            <h1>{project.title}</h1>
          </header>
          <div className="detail__hero reveal" data-parallax>
            <div className="ph">
              {project.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <>
                  <div className="ph__in" />
                  <span className="ph__tag">KAPAK GÖRSELİ</span>
                </>
              )}
            </div>
          </div>
          <dl className="detail__meta reveal">
            <div>
              <dt>Müşteri</dt>
              <dd>{project.client ?? "—"}</dd>
            </div>
            <div>
              <dt>Yıl</dt>
              <dd>{year}</dd>
            </div>
            <div>
              <dt>Hizmetler</dt>
              <dd>{services || "—"}</dd>
            </div>
            <div>
              <dt>Süre</dt>
              <dd>{d.duration || "—"}</dd>
            </div>
            <div>
              <dt>Rol</dt>
              <dd>{d.role || "—"}</dd>
            </div>
          </dl>
        </div>

        {(d.problem || solutionBody) && (
          <div className="wrap detail__cols">
            {d.problem && (
              <section className="caseblock reveal">
                <span className="eyebrow">Problem</span>
                <p>{d.problem}</p>
              </section>
            )}
            {solutionBody && (
              <section className="caseblock reveal">
                <span className="eyebrow">Çözüm & Yaklaşım</span>
                {renderBody(solutionBody)}
              </section>
            )}
          </div>
        )}

        {metrics.length > 0 && (
          <div className="wrap">
            <div className="impact reveal">
              <span className="eyebrow">Etki & Sonuçlar</span>
              <div className="impact__grid">
                {metrics.map((m) => (
                  <div className="impact__row" key={m.id}>
                    <span className="impact__lbl">{m.label}</span>
                    <span className="impact__val">
                      <span className="b">{m.before || "—"}</span>
                      <span className="ar">→</span>
                      <span className="a">{m.after || "—"}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {gallery.length > 0 && (
          <div className="wrap">
            {gallery.map((g) => (
              <figure className="detail__hero reveal" key={g.id} style={{ marginTop: "var(--space-5)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.src} alt={g.caption || ""} style={{ width: "100%", borderRadius: "var(--radius)" }} />
                {g.caption && <figcaption className="u-label" style={{ marginTop: ".6rem" }}>{g.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}

        {d.quote && (
          <div className="wrap">
            <blockquote className="casequote reveal">
              <p>&ldquo;{d.quote}&rdquo;</p>
              <footer>
                <span className="ph ph--av">
                  <span className="ph__in" />
                </span>{" "}
                {[d.quoteAuthor, d.quoteRole].filter(Boolean).join(" · ") || project.client || "Müşteri"}
              </footer>
            </blockquote>
          </div>
        )}

        <div className="wrap nextproj reveal">
          <span className="eyebrow">Sonraki Proje</span>
          <Link href={`/projects/${next.slug}`} data-cursor="Sonraki →" style={{ marginTop: "var(--space-5)" }}>
            <h3>{next.title}</h3>
            <span className="iconbtn" style={{ width: 64, height: 64 }}>
              →
            </span>
          </Link>
        </div>
      </main>
    </>
  );
}
