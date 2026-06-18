import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProject } from "@/lib/actions/admin";
import { AdminHeader, Table } from "@/components/admin/ui";
import { ProjectForm } from "@/components/admin/forms";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";
const td = { padding: ".6rem .5rem", borderBottom: "1px solid var(--border)" } as const;

export default async function AdminProjects() {
  const items = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <AdminHeader title="Projeler" />
      <Table head={["Başlık", "Kategori", "Sıra", ""]}>
        {items.map((p) => (
          <tr key={p.id}>
            <td style={td}>
              <Link href={`/admin/projects/${p.id}`}>{p.title}</Link>
            </td>
            <td style={td}>{p.category}</td>
            <td style={td}>{p.order}</td>
            <td style={{ ...td, textAlign: "right" }}>
              <Link href={`/admin/projects/${p.id}`}>Düzenle</Link>{" · "}
              <DeleteButton action={deleteProject} id={p.id} />
            </td>
          </tr>
        ))}
      </Table>

      <h2 style={{ margin: "2.5rem 0 1rem", fontSize: "var(--fs-h4)" }}>Yeni proje</h2>
      <ProjectForm />
    </div>
  );
}
