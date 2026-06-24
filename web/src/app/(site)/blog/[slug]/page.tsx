import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { ScrollProgress } from "@/components/marka/ScrollProgress";
import { Prose } from "@/components/marka/Prose";

export const dynamic = "force-dynamic";

// Body block order per template (header renders cover/kicker/title/lead separately).
const BODY_BLOCKS: Record<string, [string, string][]> = {
  standart: [["body", "rich"], ["image", "image"], ["body2", "rich"]],
  foto: [["gallery", "gallery"], ["body", "rich"]],
  roportaj: [["qa", "qa"]],
  rehber: [["list", "list"]],
  minimal: [["body", "rich"]],
};

function renderRichText(text: string) {
  return text
    .split(/\n{2,}/)
    .map((para, i) => {
      const t = para.trim();
      if (!t) return null;
      if (/^#{1,2}\s+/.test(t)) return <h2 key={i}>{t.replace(/^#{1,2}\s+/, "")}</h2>;
      return <p key={i}>{t}</p>;
    })
    .filter(Boolean);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Block({ type, value }: { type: string; value: any }) {
  if (type === "rich") return value ? <div className="prose">{renderRichText(String(value))}</div> : null;
  if (type === "image")
    return value ? (
      <figure className="article__cover reveal">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={value} alt="" style={{ width: "100%", borderRadius: "var(--radius)" }} />
      </figure>
    ) : null;
  if (type === "gallery")
    return value?.length ? (
      <div className="pv__gal reveal">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {value.map((g: any) => (
          <figure key={g.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={g.src} alt={g.caption || ""} />
            {g.caption && <figcaption>{g.caption}</figcaption>}
          </figure>
        ))}
      </div>
    ) : null;
  if (type === "qa")
    return value?.length ? (
      <div className="article__qa reveal" style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {value.map((x: any) => (
          <div className="pv__qa" key={x.id}>
            <h3 className="q">{x.q}</h3>
            <p className="a">{x.a}</p>
          </div>
        ))}
      </div>
    ) : null;
  if (type === "list")
    return value?.length ? (
      <div className="article__steps reveal" style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {value.map((x: any, i: number) => (
          <div className="pv__step" key={x.id} style={{ display: "flex", gap: "1rem" }}>
            <span className="n" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-hover)" }}>{String(i + 1).padStart(2, "0")}</span>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: ".5rem" }}>
              <h3 style={{ margin: 0 }}>{x.h}</h3>
              {x.text && <p style={{ margin: 0 }}>{x.text}</p>}
              {x.img && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={x.img} alt="" style={{ width: "100%", borderRadius: "var(--radius)" }} />
              )}
            </div>
          </div>
        ))}
      </div>
    ) : null;
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return {};
  const description = post.excerpt ?? undefined;
  return { title: post.title, description, openGraph: { type: "article", title: post.title, description } };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post || !post.publishedAt) notFound();

  const related = await prisma.blogPost.findMany({
    where: { publishedAt: { not: null }, slug: { not: slug } },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = post.data as any;
  const template: string | null = data?.template ?? null;
  const fields = data?.fields ?? {};
  const bodyBlocks = template ? BODY_BLOCKS[template] : null;
  const cover = fields.cover || post.image;

  return (
    <>
      <ScrollProgress className="reading-progress" />
      <main className="page wrap article-wrap">
        <Link className="course-back" href="/blog" data-cursor="">
          ← Tüm yazılar
        </Link>
        <article className="article">
          <header className="article__head reveal">
            <div className="card__meta mono">
              {post.category && <span style={{ color: "var(--accent-hover)" }}>{post.category}</span>}
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{formatDate(post.publishedAt)}</span>
              {post.readTime && (
                <>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span>{post.readTime}</span>
                </>
              )}
            </div>
            <h1>{post.title}</h1>
            {post.excerpt && <p className="article__lead">{post.excerpt}</p>}
            <div className="article__author">
              <span className="article__ava">MA</span>
              <div>
                <b>Marka Stüdyo</b>
                <span>Kreatif Ekip</span>
              </div>
            </div>
          </header>
          <div className="article__cover reveal">
            {cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cover} alt={post.title} style={{ width: "100%", borderRadius: "var(--radius)" }} />
            ) : (
              <div className="ph" style={{ aspectRatio: "21/9" }}>
                <div className="ph__in" />
                <span className="ph__tag">KAPAK GÖRSELİ</span>
              </div>
            )}
          </div>

          {bodyBlocks ? (
            <div className="article__body reveal" style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
              {bodyBlocks.map(([key, type]) => (
                <Block key={key} type={type} value={fields[key]} />
              ))}
            </div>
          ) : (
            <Prose body={post.body || "Bu yazının tam metni yakında. Editöryel içerik admin panelinden yönetilir."} />
          )}

          {post.category && (
            <div className="article__tags reveal">
              <span className="chip">{post.category}</span>
              <span className="chip">Tasarım</span>
              <span className="chip">Marka</span>
            </div>
          )}
        </article>

        {related.length > 0 && (
          <section className="article__related reveal">
            <h3>İlgili yazılar</h3>
            <div className="grid-3">
              {related.map((r, i) => (
                <Link key={r.id} className="card card--blog card--sm reveal" href={`/blog/${r.slug}`} data-cursor="Oku">
                  <div className="ph">
                    <div className="ph__in" style={{ filter: `hue-rotate(${i * 50}deg)` }} />
                    <span className="ph__tag">YAZI</span>
                  </div>
                  <div className="card__meta mono">
                    {r.category && <span style={{ color: "var(--accent-hover)" }}>{r.category}</span>}
                  </div>
                  <h3 className="card__title">{r.title}</h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
