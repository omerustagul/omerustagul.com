import { prisma } from "@/lib/prisma";
import { formatDate, formatTRY, formatUSD } from "@/lib/format";
import { Hero } from "@/components/marka/Hero";
import { LatestWorks, Partners, Academy, Blog, Market, Stats, CTABlocks } from "@/components/marka/Sections";
import { Services } from "@/components/marka/Services";

export const dynamic = "force-dynamic";

const HUES = [0, 40, -50, 70, -40, 30];

export default async function Home() {
  const [projects, courses, products, posts, partners] = await Promise.all([
    prisma.project.findMany({ orderBy: { order: "asc" }, include: { _count: { select: { votes: true } } } }),
    prisma.course.findMany({ orderBy: { createdAt: "desc" }, take: 4 }),
    prisma.product.findMany({ orderBy: { createdAt: "desc" }, take: 4 }),
    prisma.blogPost.findMany({ where: { publishedAt: { not: null } }, orderBy: { publishedAt: "desc" }, take: 4 }),
    prisma.partner.findMany({ orderBy: { order: "asc" } }),
  ]);

  const featured = projects.find((p) => p.featured) ?? projects[0];
  const heroLines = featured ? featured.title.split(" ") : ["Atlas Finans", "yeniden", "markalaşma"];

  const works = projects.slice(0, 3).map((p, i) => ({
    title: p.title,
    client: p.client ?? undefined,
    category: p.category ?? "WEB",
    hue: HUES[i % HUES.length],
    href: `/projects/${p.slug}`,
    votes: p._count.votes,
  }));

  const courseCards = courses.map((c, i) => ({
    title: c.title,
    instructor: "Marka Akademi",
    rating: 4.9,
    reviews: 120 + i * 18,
    price: formatTRY(c.price),
    level: ["Başlangıç", "Orta", "İleri", "Orta"][i % 4],
    hue: HUES[i % HUES.length],
    href: `/academy/${c.slug}`,
  }));

  const productCards = products.map((p, i) => ({
    title: p.title,
    seller: "Marka Studio",
    format: ["Figma", "React", "SVG", "Keynote"][i % 4],
    price: formatUSD(p.price),
    hue: HUES[i % HUES.length],
    href: `/market/${p.slug}`,
  }));

  const blogFeatured = posts[0]
    ? {
        title: posts[0].title,
        excerpt: posts[0].excerpt ?? undefined,
        category: posts[0].category ?? undefined,
        date: formatDate(posts[0].publishedAt),
        readTime: posts[0].readTime ?? undefined,
        hue: 0,
        href: `/blog/${posts[0].slug}`,
      }
    : undefined;
  const blogRest = posts.slice(1, 4).map((p, i) => ({
    title: p.title,
    category: p.category ?? undefined,
    date: formatDate(p.publishedAt),
    readTime: p.readTime ?? undefined,
    hue: HUES[(i + 1) % HUES.length],
    href: `/blog/${p.slug}`,
  }));

  const partnerNames = partners.length ? partners.map((p) => p.name) : ["ATLAS", "NOVA", "KÖK", "VENTA", "ORBİT", "FORM", "PERA", "LUMA"];

  return (
    <main id="content-main">
      <Hero
        lines={heroLines}
        client={featured?.client ?? "Atlas Bank"}
        service={featured?.category ?? "Marka · Web · Ürün"}
        href={featured ? `/projects/${featured.slug}` : "#"}
      />
      {works.length > 0 && <LatestWorks works={works} />}
      <Partners names={partnerNames} />
      <Services />
      {courseCards.length > 0 && <Academy courses={courseCards} />}
      {blogFeatured && <Blog featured={blogFeatured} rest={blogRest} />}
      {productCards.length > 0 && <Market products={productCards} />}
      <Stats />
      <CTABlocks />
    </main>
  );
}
