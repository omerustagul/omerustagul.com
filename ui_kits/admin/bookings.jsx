/* Admin "Randevular" — discovery-call bookings list. Reads window.MarkaBookings. */
const { useState: useBkState, useEffect: useBkEffect } = React;
const BK = () => window.MarkaBookings;
const BK_TONE = { "Onaylı": "green", "Bekliyor": "warn", "İptal": "muted" };
function bkDate(d) { try { return new Date(d + "T00:00").toLocaleDateString("tr-TR", { weekday: "short", day: "2-digit", month: "long" }); } catch (e) { return d; } }

function Bookings() {
  const [, force] = useBkState(0);
  useBkEffect(() => { if (!BK()) return; return BK().subscribe(() => force(n => n + 1)); }, []);
  if (!BK()) return null;
  const list = BK().list();
  const upcoming = list.filter(b => b.date >= new Date().toISOString().slice(0, 10) && b.status !== "İptal");
  return (
    <AdmCard title="Randevular" desc={`${upcoming.length} yaklaşan görüşme · ${list.length} toplam`}>
      {!list.length ? <div className="adm-empty"><p>Henüz randevu yok.</p></div> : (
        <table className="adm-table">
          <thead><tr><th>Tarih & Saat</th><th>Kişi</th><th>Konu</th><th>Durum</th><th></th></tr></thead>
          <tbody>
            {list.map(b => (
              <tr key={b.id} className={`bk-row bk-row--${b.status === "Onaylı" ? "ok" : b.status === "İptal" ? "no" : "wait"}`}>
                <td><div className="bk-when"><b>{bkDate(b.date)}</b><span className="mono">{b.slot}</span></div></td>
                <td><div className="bk-who"><span className="ti">{b.name}</span><a href={`mailto:${b.email}`} className="mono">{b.email}</a></div></td>
                <td style={{ color: "var(--text-muted)" }}>{b.topic}</td>
                <td style={{ minWidth: 130 }}><MkSelect width="130px" value={b.status} onChange={v => BK().update(b.id, { status: v })} options={BK().STATUSES} /></td>
                <td><div className="adm-row-actions"><button className="adm-iconbtn" onClick={() => BK().remove(b.id)} aria-label="Sil"><Icon name="trash" size={14} /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdmCard>
  );
}
Object.assign(window, { Bookings });
