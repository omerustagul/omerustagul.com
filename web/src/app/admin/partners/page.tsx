import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePartner } from "@/lib/actions/admin";
import { AdmCard, Badge } from "@/components/admin/ui";
import { PartnerForm } from "@/components/admin/forms";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { Icon } from "@/components/admin/AdminIcons";

export const dynamic = "force-dynamic";

export default async function AdminPartners() {
  const items = await prisma.partner.findMany({ orderBy: { order: "asc" } });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <AdmCard title="İş Ortakları" desc={`${items.length} partner`}>
        <table className="adm-table">
          <thead>
            <tr>
              <th>Ad</th>
              <th>Sıra</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id}>
                <td>
                  <Link href={`/admin/partners/${p.id}`}>{p.name}</Link>
                </td>
                <td>
                  <Badge tone="muted">{p.order}</Badge>
                </td>
                <td>
                  <div className="adm-row-actions">
                    <Link
                      href={`/admin/partners/${p.id}`}
                      className="adm-iconbtn"
                      aria-label="Düzenle"
                      title="Düzenle"
                    >
                      <Icon name="edit" size={14} />
                    </Link>
                    <DeleteButton action={deletePartner} id={p.id} className="adm-iconbtn" title="Sil">
                      <Icon name="trash" size={14} />
                    </DeleteButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdmCard>

      <div>
        <h2 style={{ margin: "0 0 var(--space-4)", fontSize: "var(--fs-h4)", fontWeight: 600 }}>
          Yeni partner
        </h2>
        <PartnerForm />
      </div>
    </div>
  );
}
