"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import { generateBlogDraft } from "@/lib/ai";

/** Generate a blog draft with AI and create it (unpublished), then open its editor. */
export async function generateDraftAction(_prev: string | undefined, formData: FormData) {
  const session = await auth();
  const role = session?.user?.role;
  if (role !== "ADMIN" && role !== "EDITOR") return "Yetkisiz.";

  const topic = String(formData.get("topic") ?? "").trim();
  if (!topic) return "Bir konu gir.";

  const draft = await generateBlogDraft(topic);
  const created = await prisma.blogPost.create({
    data: {
      title: draft.title,
      slug: slugify(draft.title) || `taslak-${Date.now()}`,
      excerpt: draft.excerpt,
      body: draft.body,
      category: draft.category,
      readTime: draft.readTime,
      publishedAt: null, // draft — review then publish
    },
  });

  redirect(`/admin/blog/${created.id}`);
}
