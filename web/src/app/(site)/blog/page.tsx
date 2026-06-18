import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { PageHead } from "@/components/marka/page-parts";
import { BlogGrid } from "@/components/marka/grids";

export const dynamic = "force-dynamic";
export const metadata = { title: "Blog" };

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { publishedAt: { not: null } },
    orderBy: { publishedAt: "desc" },
  });
  const featured = posts[0];
  const rest = posts.slice(1).map((p, i) => ({
    title: p.title,
    excerpt: p.excerpt ?? undefined,
    category: p.category ?? "Yazı",
    date: formatDate(p.publishedAt),
    readTime: p.readTime ?? undefined,
    slug: p.slug,
    hue: i * 40,
  }));

  return (
    <main className="page wrap">
      <PageHead eyebrow="Güncel Yazılar" title="Stüdyodan notlar" sub="Tasarım, süreç ve kültür üzerine düşünceler." />

      {featured && (
        <Link className="card card--blog reveal" href={`/blog/${featured.slug}`} data-cursor="Oku" style={{ marginBottom: "var(--space-8)" }}>
          <div className="ph" style={{ aspectRatio: "21/9" }}>
            <div className="ph__in" />
            <span className="ph__tag">ÖNE ÇIKAN</span>
          </div>
          <div className="card__meta mono">
            <span style={{ color: "var(--accent-hover)" }}>{featured.category}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{formatDate(featured.publishedAt)}</span>
            {featured.readTime && (
              <>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>{featured.readTime}</span>
              </>
            )}
          </div>
          <h3 className="card__title" style={{ fontSize: "var(--fs-h1)" }}>
            {featured.title}
          </h3>
          {featured.excerpt && (
            <p className="card__excerpt" style={{ fontSize: "var(--fs-lead)", maxWidth: "60ch" }}>
              {featured.excerpt}
            </p>
          )}
        </Link>
      )}

      <BlogGrid items={rest} />
    </main>
  );
}
