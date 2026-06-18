import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePartner } from "@/lib/actions/admin";
import { AdminHeader, Table } from "@/components/admin/ui";
import { PartnerForm } from "@/components/admin/forms";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";
const td = { padding: ".6rem .5rem", borderBottom: "1px solid var(--border)" } as const;

export default async function AdminPartners() {
  const items = await prisma.partner.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <AdminHeader title="Partnerler" />
      <Table head={["Ad", "Sıra", ""]}>
        {items.map((p) => (
          <tr key={p.id}>
            <td style={td}>
              <Link href={`/admin/partners/${p.id}`}>{p.name}</Link>
            </td>
            <td style={td}>{p.order}</td>
            <td style={{ ...td, textAlign: "right" }}>
              <Link href={`/admin/partners/${p.id}`}>Düzenle</Link>{" · "}
              <DeleteButton action={deletePartner} id={p.id} />
            </td>
          </tr>
        ))}
      </Table>
      <h2 style={{ margin: "2.5rem 0 1rem", fontSize: "var(--fs-h4)" }}>Yeni partner</h2>
      <PartnerForm />
    </div>
  );
}
