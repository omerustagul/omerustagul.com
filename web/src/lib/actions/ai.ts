"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import { generateBlogDraft, generateReport, suggestSeo, type SeoSuggestion } from "@/lib/ai";

async function requireAdminRole() {
  const session = await auth();
  const role = session?.user?.role;
  return role === "ADMIN" || role === "EDITOR";
}

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

/** AI weekly report (admin Raporlar). */
export async function generateReportAction(context: string): Promise<{ date: string; narrative: string } | { error: string }> {
  if (!(await requireAdminRole())) return { error: "Yetkisiz." };
  const narrative = await generateReport(context || "trafik, içerik ve dönüşüm metrikleri");
  return { date: new Date().toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" }), narrative };
}

/** AI SEO meta suggestion (admin SEO). */
export async function suggestSeoAction(pageName: string): Promise<SeoSuggestion | { error: string }> {
  if (!(await requireAdminRole())) return { error: "Yetkisiz." };
  return suggestSeo(pageName);
}
