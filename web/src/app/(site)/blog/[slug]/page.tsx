import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { ScrollProgress } from "@/components/marka/ScrollProgress";

export const dynamic = "force-dynamic";

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

  const paras = post.body
    ? post.body.split("\n\n")
    : ["Bu yazının tam metni yakında. Editöryel içerik admin panelinden yönetilir."];

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
            <div className="ph" style={{ aspectRatio: "21/9" }}>
              <div className="ph__in" />
              <span className="ph__tag">KAPAK GÖRSELİ</span>
            </div>
          </div>
          <div className="prose article__body reveal">
            {paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
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
