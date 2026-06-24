import { prisma } from "@/lib/prisma";
import { BlogClient } from "./client";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      body: true,
      category: true,
      image: true,
      readTime: true,
      featured: true,
      publishedAt: true,
      data: true,
    },
  });
  return <BlogClient initial={posts} />;
}
