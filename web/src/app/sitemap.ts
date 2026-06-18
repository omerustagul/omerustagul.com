import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, courses, products, posts] = await Promise.all([
    prisma.project.findMany({ select: { slug: true } }),
    prisma.course.findMany({ select: { slug: true } }),
    prisma.product.findMany({ select: { slug: true } }),
    prisma.blogPost.findMany({ where: { publishedAt: { not: null } }, select: { slug: true } }),
  ]);

  const staticRoutes = ["", "/projects", "/academy", "/market", "/blog", "/oyunlar", "/iletisim", "/randevu"];

  const urls: MetadataRoute.Sitemap = [
    ...staticRoutes.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: "weekly" as const })),
    ...projects.map((x) => ({ url: `${SITE_URL}/projects/${x.slug}` })),
    ...courses.map((x) => ({ url: `${SITE_URL}/academy/${x.slug}` })),
    ...products.map((x) => ({ url: `${SITE_URL}/market/${x.slug}` })),
    ...posts.map((x) => ({ url: `${SITE_URL}/blog/${x.slug}` })),
  ];
  return urls;
}
