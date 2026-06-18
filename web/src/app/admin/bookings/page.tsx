import { prisma } from "@/lib/prisma";
import { deleteBooking, setBookingStatus } from "@/lib/actions/admin";
import { AdminHeader, Table } from "@/components/admin/ui";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";
const td = { padding: ".6rem .5rem", borderBottom: "1px solid var(--border)" } as const;
const STATUSES = ["pending", "confirmed", "done", "cancelled"];
const fmt = new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short" });

export default async function AdminBookings() {
  const items = await prisma.booking.findMany({ orderBy: { slot: "asc" } });
  return (
    <div>
      <AdminHeader title="Randevular" />
      <Table head={["Ad / E-posta", "Zaman", "Durum", ""]}>
        {items.map((b) => (
          <tr key={b.id}>
            <td style={td}>
              <strong>{b.name}</strong>
              <br />
              <span style={{ color: "var(--text-muted)" }}>{b.email}</span>
            </td>
            <td style={td}>{fmt.format(b.slot)}</td>
            <td style={td}>
              <form action={setBookingStatus} style={{ display: "flex", gap: ".4rem" }}>
                <input type="hidden" name="id" value={b.id} />
                <select name="status" defaultValue={b.status} className="mk-select" style={{ padding: ".3rem .5rem" }}>
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
            <td style={{ ...td, textAlign: "right" }}>
              <DeleteButton action={deleteBooking} id={b.id} />
            </td>
          </tr>
        ))}
      </Table>
      {items.length === 0 && <p style={{ color: "var(--text-muted)", marginTop: "1rem" }}>Henüz randevu yok.</p>}
    </div>
  );
}
