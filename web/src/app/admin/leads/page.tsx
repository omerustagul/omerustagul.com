import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { deleteLead, setLeadStatus } from "@/lib/actions/admin";
import { AdminHeader, Table } from "@/components/admin/ui";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";
const td = { padding: ".6rem .5rem", borderBottom: "1px solid var(--border)", verticalAlign: "top" } as const;
const STATUSES = ["new", "contacted", "won", "lost"];

export default async function AdminLeads() {
  const items = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <AdminHeader title="Talepler" />
      <Table head={["Ad / E-posta", "Mesaj", "Durum", "Tarih", ""]}>
        {items.map((l) => (
          <tr key={l.id}>
            <td style={td}>
              <strong>{l.name}</strong>
              <br />
              <span style={{ color: "var(--text-muted)" }}>{l.email}</span>
            </td>
            <td style={{ ...td, maxWidth: "20rem", color: "var(--text-muted)" }}>{l.message}</td>
            <td style={td}>
              <form action={setLeadStatus} style={{ display: "flex", gap: ".4rem" }}>
                <input type="hidden" name="id" value={l.id} />
                <select name="status" defaultValue={l.status} className="mk-select" style={{ padding: ".3rem .5rem" }}>
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button type="submit" className="mk-btn mk-btn--ghost mk-btn--sm">
                  ✓
                </button>
              </form>
            </td>
            <td style={td}>{formatDate(l.createdAt)}</td>
            <td style={{ ...td, textAlign: "right" }}>
              <DeleteButton action={deleteLead} id={l.id} />
            </td>
          </tr>
        ))}
      </Table>
      {items.length === 0 && <p style={{ color: "var(--text-muted)", marginTop: "1rem" }}>Henüz talep yok.</p>}
    </div>
  );
}
