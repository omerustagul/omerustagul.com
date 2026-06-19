"use client";

import React, { useState } from "react";
import { AdmCard, MkSelect } from "@/components/admin/ui";
import { Icon } from "@/components/admin/AdminIcons";

const INITIAL_BOOKINGS = [
  { id: "b1", name: "Ali Veli", email: "ali@example.com", date: "2026-06-25", slot: "14:00 - 14:30", topic: "Proje Ön Görüşmesi", status: "Bekliyor" },
  { id: "b2", name: "Cemil Demir", email: "cemil@example.com", date: "2026-06-20", slot: "10:00 - 11:00", topic: "Marka Kimliği Toplantısı", status: "Onaylı" },
  { id: "b3", name: "Ayşe Kaya", email: "ayse@example.com", date: "2026-06-10", slot: "16:00 - 16:30", topic: "Soru Cevap", status: "İptal" },
];

const STATUSES = ["Onaylı", "Bekliyor", "İptal"];

function bkDate(d: string) { 
  try { return new Date(d + "T00:00").toLocaleDateString("tr-TR", { weekday: "short", day: "2-digit", month: "long" }); } 
  catch (e) { return d; } 
}

export function BookingsClient() {
  const [list, setList] = useState(INITIAL_BOOKINGS);

  const upcoming = list.filter(b => b.date >= new Date().toISOString().slice(0, 10) && b.status !== "İptal");

  const update = (id: string, st: string) => {
    setList(list.map(b => b.id === id ? { ...b, status: st } : b));
  };
  
  const remove = (id: string) => {
    setList(list.filter(b => b.id !== id));
  };

  return (
    <AdmCard title="Randevular" desc={`${upcoming.length} yaklaşan görüşme · ${list.length} toplam`}>
      {!list.length ? <div style={{ padding: "4rem", textAlign: "center", color: "var(--text-muted)" }}><p>Henüz randevu yok.</p></div> : (
        <table className="adm-table" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", textAlign: "left", fontSize: 13, color: "var(--text-muted)" }}>
              <th style={{ padding: "1rem" }}>Tarih & Saat</th>
              <th style={{ padding: "1rem" }}>Kişi</th>
              <th style={{ padding: "1rem" }}>Konu</th>
              <th style={{ padding: "1rem" }}>Durum</th>
              <th style={{ padding: "1rem" }}></th>
            </tr>
          </thead>
          <tbody>
            {list.map(b => (
              <tr key={b.id} style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)", opacity: b.status === "İptal" ? 0.6 : 1 }}>
                <td style={{ padding: "1rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <b style={{ fontSize: 14 }}>{bkDate(b.date)}</b>
                    <span style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{b.slot}</span>
                  </div>
                </td>
                <td style={{ padding: "1rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontWeight: 600 }}>{b.name}</span>
                    <a href={`mailto:${b.email}`} style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none", fontFamily: "var(--font-mono)" }}>{b.email}</a>
                  </div>
                </td>
                <td style={{ padding: "1rem", color: "var(--text-muted)", fontSize: 14 }}>{b.topic}</td>
                <td style={{ padding: "1rem", minWidth: 130 }}>
                  <MkSelect width="130px" value={b.status} onChange={(v: string) => update(b.id, v)} options={STATUSES} />
                </td>
                <td style={{ padding: "1rem", textAlign: "right" }}>
                  <button className="adm-iconbtn" onClick={() => remove(b.id)} aria-label="Sil"><Icon name="trash" size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdmCard>
  );
}
