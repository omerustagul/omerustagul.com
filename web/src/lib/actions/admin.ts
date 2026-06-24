"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

async function requireAdmin() {
  const session = await auth();
  const role = session?.user?.role;
  if (!session?.user || (role !== "ADMIN" && role !== "EDITOR")) {
    throw new Error("Yetkisiz");
  }
  return session;
}

function str(fd: FormData, k: string) {
  return String(fd.get(k) ?? "").trim();
}
function bool(fd: FormData, k: string) {
  return fd.get(k) === "on" || fd.get(k) === "true";
}
function num(fd: FormData, k: string) {
  return Number(fd.get(k) ?? 0) || 0;
}

function refreshSite(extra: string[] = []) {
  revalidatePath("/");
  for (const p of extra) revalidatePath(p);
}

/* --------------------------------------------------------------- projects */
export async function saveProject(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const title = str(fd, "title");
  const data = {
    title,
    slug: str(fd, "slug") || slugify(title),
    client: str(fd, "client") || null,
    category: str(fd, "category") || null,
    tag: str(fd, "tag") || "PROJE",
    image: str(fd, "image") || null,
    featured: bool(fd, "featured"),
    order: num(fd, "order"),
  };
  if (id) await prisma.project.update({ where: { id }, data });
  else await prisma.project.create({ data });
  refreshSite(["/projects", "/admin/projects"]);
  redirect("/admin/projects");
}
export async function deleteProject(fd: FormData) {
  await requireAdmin();
  await prisma.project.delete({ where: { id: str(fd, "id") } });
  refreshSite(["/projects", "/admin/projects"]);
}

// Rich case-study payload stored in Project.data (JSON). All fields are
// JSON-compatible so the typed object satisfies Prisma's Json input directly.
export type ProjectMetric = { id: string; label: string; before: string; after: string };
export type ProjectGalleryItem = { id: string; src: string; caption?: string };
export type ProjectData = {
  status?: string;
  year?: string;
  serviceIds?: string[];
  serviceNames?: string[];
  duration?: string;
  role?: string;
  problem?: string;
  solution?: string;
  body?: string;
  metrics?: ProjectMetric[];
  quote?: string;
  quoteAuthor?: string;
  quoteRole?: string;
  gallery?: ProjectGalleryItem[];
  next?: string;
};

export type ProjectInput = {
  id?: string;
  title: string;
  client?: string | null;
  category?: string | null;
  image?: string | null;
  data?: ProjectData;
};

/** Object-arg upsert used by the rich case-study editor. Returns the row id.
    On update the slug is preserved so public /projects/[slug] URLs stay stable. */
export async function upsertProject(input: ProjectInput): Promise<string> {
  await requireAdmin();
  const title = input.title.trim() || "Başlıksız proje";
  const common = {
    title,
    client: input.client?.trim() || null,
    category: input.category?.trim() || null,
    image: input.image || null,
    data: input.data ?? {},
  };
  let id = input.id;
  if (id) {
    await prisma.project.update({ where: { id }, data: common });
  } else {
    const max = await prisma.project.aggregate({ _max: { order: true } });
    const created = await prisma.project.create({
      data: { ...common, slug: slugify(title), order: (max._max.order ?? 0) + 1 },
    });
    id = created.id;
  }
  const row = await prisma.project.findUnique({ where: { id }, select: { slug: true } });
  refreshSite(["/projects", "/admin/projects", row ? `/projects/${row.slug}` : "/projects"]);
  return id;
}

export async function deleteProjectById(id: string): Promise<void> {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  refreshSite(["/projects", "/admin/projects"]);
}

/* ------------------------------------------------------------------- blog */
export async function saveBlogPost(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const title = str(fd, "title");
  const published = bool(fd, "published");
  const data = {
    title,
    slug: str(fd, "slug") || slugify(title),
    excerpt: str(fd, "excerpt") || null,
    body: str(fd, "body") || null,
    category: str(fd, "category") || null,
    readTime: str(fd, "readTime") || null,
    image: str(fd, "image") || null,
    featured: bool(fd, "featured"),
    publishedAt: published ? new Date() : null,
  };
  if (id) {
    // keep original publishedAt if already published and still published
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (published && existing?.publishedAt) data.publishedAt = existing.publishedAt;
    await prisma.blogPost.update({ where: { id }, data });
  } else {
    await prisma.blogPost.create({ data });
  }
  refreshSite(["/blog", "/admin/blog"]);
  redirect("/admin/blog");
}
export async function deleteBlogPost(fd: FormData) {
  await requireAdmin();
  await prisma.blogPost.delete({ where: { id: str(fd, "id") } });
  refreshSite(["/blog", "/admin/blog"]);
}

/* --------------------------------------------------------------- products */
export async function saveProduct(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const title = str(fd, "title");
  const data = {
    title,
    slug: str(fd, "slug") || slugify(title),
    price: num(fd, "price"),
    type: str(fd, "type") || null,
    format: str(fd, "format") || null,
    seller: str(fd, "seller") || null,
  };
  if (id) await prisma.product.update({ where: { id }, data });
  else await prisma.product.create({ data });
  refreshSite(["/market", "/admin/products"]);
  redirect("/admin/products");
}
export async function deleteProduct(fd: FormData) {
  await requireAdmin();
  await prisma.product.delete({ where: { id: str(fd, "id") } });
  refreshSite(["/market", "/admin/products"]);
}

export type ProductData = {
  status?: string;
  tagline?: string;
  currency?: string;
  priceLabel?: string;
  license?: string;
  desc?: string;
  includes?: { id: string; text: string }[];
  specs?: { id: string; k: string; v: string }[];
  gallery?: { id: string; src: string; caption?: string }[];
  cover?: string;
};
export type ProductInput = {
  id?: string;
  title: string;
  price?: number;
  type?: string | null;
  format?: string | null;
  seller?: string | null;
  data?: ProductData;
};
export async function upsertProduct(input: ProductInput): Promise<string> {
  await requireAdmin();
  const title = input.title.trim() || "Başlıksız ürün";
  const common = {
    title,
    price: input.price ?? 0,
    type: input.type?.trim() || null,
    format: input.format?.trim() || null,
    seller: input.seller?.trim() || null,
    data: input.data ?? {},
  };
  let id = input.id;
  if (id) {
    await prisma.product.update({ where: { id }, data: common });
  } else {
    const created = await prisma.product.create({ data: { ...common, slug: slugify(title) } });
    id = created.id;
  }
  const row = await prisma.product.findUnique({ where: { id }, select: { slug: true } });
  refreshSite(["/market", "/admin/products", row ? `/market/${row.slug}` : "/market"]);
  return id;
}
export async function deleteProductById(id: string): Promise<void> {
  await requireAdmin();
  await prisma.product.delete({ where: { id } });
  refreshSite(["/market", "/admin/products"]);
}

/* ---------------------------------------------------------------- courses */
export async function saveCourse(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const title = str(fd, "title");
  const data = {
    title,
    slug: str(fd, "slug") || slugify(title),
    price: num(fd, "price"),
    level: str(fd, "level") || null,
    topic: str(fd, "topic") || null,
    instructor: str(fd, "instructor") || null,
  };
  if (id) await prisma.course.update({ where: { id }, data });
  else await prisma.course.create({ data });
  refreshSite(["/academy", "/admin/courses"]);
  redirect("/admin/courses");
}
export async function deleteCourse(fd: FormData) {
  await requireAdmin();
  await prisma.course.delete({ where: { id: str(fd, "id") } });
  refreshSite(["/academy", "/admin/courses"]);
}

/* --------------------------------------------------------------- services */
export async function saveService(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const title = str(fd, "title");
  const data = {
    title,
    slug: str(fd, "slug") || slugify(title),
    description: str(fd, "description") || null,
    order: num(fd, "order"),
  };
  if (id) await prisma.service.update({ where: { id }, data });
  else await prisma.service.create({ data });
  refreshSite(["/admin/services"]);
  redirect("/admin/services");
}
export async function deleteService(fd: FormData) {
  await requireAdmin();
  await prisma.service.delete({ where: { id: str(fd, "id") } });
  refreshSite(["/admin/services"]);
}

/* --------------------------------------------------------------- partners */
export async function savePartner(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const data = { name: str(fd, "name"), order: num(fd, "order") };
  if (id) await prisma.partner.update({ where: { id }, data });
  else await prisma.partner.create({ data });
  refreshSite(["/admin/partners"]);
  redirect("/admin/partners");
}
export async function deletePartner(fd: FormData) {
  await requireAdmin();
  await prisma.partner.delete({ where: { id: str(fd, "id") } });
  refreshSite(["/admin/partners"]);
}

/* ------------------------------------------------------------------ leads */
export async function setLeadStatus(fd: FormData) {
  await requireAdmin();
  await prisma.lead.update({
    where: { id: str(fd, "id") },
    data: { status: str(fd, "status") || "new" },
  });
  revalidatePath("/admin/leads");
}
export async function deleteLead(fd: FormData) {
  await requireAdmin();
  await prisma.lead.delete({ where: { id: str(fd, "id") } });
  revalidatePath("/admin/leads");
}

// object-arg variants for the Kanban board (drag-drop + drawer)
export async function moveLeadStage(id: string, status: string) {
  await requireAdmin();
  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/admin/leads");
}
export async function updateLeadFields(
  id: string,
  patch: { status?: string; priority?: string | null; budget?: string | null; notes?: string | null },
) {
  await requireAdmin();
  await prisma.lead.update({ where: { id }, data: patch });
  revalidatePath("/admin/leads");
}
export async function removeLead(id: string) {
  await requireAdmin();
  await prisma.lead.delete({ where: { id } });
  revalidatePath("/admin/leads");
}

/* --------------------------------------------------------------- settings */
export async function saveSettings(fd: FormData) {
  await requireAdmin();
  const data = {
    accent: str(fd, "accent") || "#16D17F",
    mode: str(fd, "mode") || "light",
    font: str(fd, "font") || "general",
    radius: num(fd, "radius") || 10,
    headerTemplate: str(fd, "headerTemplate") || "classic",
    footerTemplate: str(fd, "footerTemplate") || "columns",
  };
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: { data },
    create: { id: 1, data },
  });
  refreshSite(["/admin/settings"]);
  redirect("/admin/settings");
}
