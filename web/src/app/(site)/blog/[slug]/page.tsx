import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { Media } from "@/components/ui";
import { ReadingProgress } from "@/components/blog/ReadingProgress";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post || !post.publishedAt) notFound();

  return (
    <>
      <ReadingProgress />
      <main className="u-container" style={{ paddingBlock: "clamp(2rem, 6vw, 5rem)", maxWidth: "44rem" }}>
        <Link href="/blog" className="u-label" style={{ display: "inline-block", marginBottom: "2rem" }}>
          ← Blog
        </Link>

        <div className="mk-card__meta mk-card__meta--mono" style={{ marginBottom: "1rem" }}>
          {post.category && <span style={{ color: "var(--accent-hover)" }}>{post.category}</span>}
          {post.category && <span className="mk-card__dot" />}
          <span>{formatDate(post.publishedAt)}</span>
          {post.readTime && (
            <>
              <span className="mk-card__dot" />
              <span>{post.readTime}</span>
            </>
          )}
        </div>

        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
          {post.title}
        </h1>

        <div style={{ margin: "2.5rem 0" }}>
          <Media ratio="16/9" label="YAZI" alt={post.title} />
        </div>

        <article style={{ fontSize: "var(--fs-lead)", lineHeight: 1.7, color: "var(--text)" }}>
          {post.excerpt && (
            <p style={{ fontWeight: 500, marginBottom: "1.5rem" }}>{post.excerpt}</p>
          )}
          {post.body ? (
            post.body.split("\n\n").map((para, i) => (
              <p key={i} style={{ marginBottom: "1.25rem", color: "var(--text-muted)" }}>
                {para}
              </p>
            ))
          ) : (
            <p style={{ color: "var(--text-muted)" }}>
              Bu yazının tam metni yakında. Editöryel içerik admin panelinden (F5) yönetilecek.
            </p>
          )}
        </article>
      </main>
    </>
  );
}
