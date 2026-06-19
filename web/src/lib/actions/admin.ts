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
  const data = { title, slug: str(fd, "slug") || slugify(title), price: num(fd, "price") };
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

/* ---------------------------------------------------------------- courses */
export async function saveCourse(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const title = str(fd, "title");
  const data = { title, slug: str(fd, "slug") || slugify(title), price: num(fd, "price") };
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

/* --------------------------------------------------------------- bookings */
export async function setBookingStatus(fd: FormData) {
  await requireAdmin();
  await prisma.booking.update({
    where: { id: str(fd, "id") },
    data: { status: str(fd, "status") || "pending" },
  });
  revalidatePath("/admin/bookings");
}
export async function deleteBooking(fd: FormData) {
  await requireAdmin();
  await prisma.booking.delete({ where: { id: str(fd, "id") } });
  revalidatePath("/admin/bookings");
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
