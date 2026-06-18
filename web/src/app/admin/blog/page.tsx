import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteBlogPost } from "@/lib/actions/admin";
import { AdminHeader, Table } from "@/components/admin/ui";
import { BlogForm } from "@/components/admin/forms";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";
const td = { padding: ".6rem .5rem", borderBottom: "1px solid var(--border)" } as const;

export default async function AdminBlog() {
  const items = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <AdminHeader title="Blog" />
      <Table head={["Başlık", "Kategori", "Durum", ""]}>
        {items.map((p) => (
          <tr key={p.id}>
            <td style={td}>
              <Link href={`/admin/blog/${p.id}`}>{p.title}</Link>
            </td>
            <td style={td}>{p.category}</td>
            <td style={td}>{p.publishedAt ? "Yayında" : "Taslak"}</td>
            <td style={{ ...td, textAlign: "right" }}>
              <Link href={`/admin/blog/${p.id}`}>Düzenle</Link>{" · "}
              <DeleteButton action={deleteBlogPost} id={p.id} />
            </td>
          </tr>
        ))}
      </Table>

      <h2 style={{ margin: "2.5rem 0 1rem", fontSize: "var(--fs-h4)" }}>Yeni yazı</h2>
      <BlogForm />
    </div>
  );
}
