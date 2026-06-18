import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { PageHero, Section, CardGrid } from "@/components/site/Section";
import { BlogCard } from "@/components/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Blog — Marka" };

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { publishedAt: { not: null } },
    orderBy: { publishedAt: "desc" },
  });
  return (
    <main>
      <PageHero eyebrow="GÜNCEL YAZILAR" title="Blog" lead="Tasarım, marka ve dijital üzerine notlar." />
      <Section>
        <CardGrid min="18rem">
          {posts.map((p, i) => (
            <BlogCard
              key={p.id}
              title={p.title}
              excerpt={p.excerpt ?? undefined}
              category={p.category ?? undefined}
              readTime={p.readTime ?? undefined}
              date={formatDate(p.publishedAt)}
              featured={i === 0}
              href={`/blog/${p.slug}`}
            />
          ))}
        </CardGrid>
      </Section>
    </main>
  );
}
