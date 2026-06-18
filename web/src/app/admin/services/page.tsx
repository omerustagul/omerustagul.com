import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteService } from "@/lib/actions/admin";
import { AdminHeader, Table } from "@/components/admin/ui";
import { ServiceForm } from "@/components/admin/forms";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";
const td = { padding: ".6rem .5rem", borderBottom: "1px solid var(--border)" } as const;

export default async function AdminServices() {
  const items = await prisma.service.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <AdminHeader title="Hizmetler" />
      <Table head={["Başlık", "Sıra", ""]}>
        {items.map((s) => (
          <tr key={s.id}>
            <td style={td}>
              <Link href={`/admin/services/${s.id}`}>{s.title}</Link>
            </td>
            <td style={td}>{s.order}</td>
            <td style={{ ...td, textAlign: "right" }}>
              <Link href={`/admin/services/${s.id}`}>Düzenle</Link>{" · "}
              <DeleteButton action={deleteService} id={s.id} />
            </td>
          </tr>
        ))}
      </Table>
      <h2 style={{ margin: "2.5rem 0 1rem", fontSize: "var(--fs-h4)" }}>Yeni hizmet</h2>
      <ServiceForm />
    </div>
  );
}
