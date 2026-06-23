"use client";

import React, { useState, useTransition } from "react";
import { AdmCard, Seg, Switch, MkSelect } from "@/components/admin/ui";
import { Icon } from "@/components/admin/AdminIcons";
import { setBookingStatus, deleteBooking, saveBookingConfig } from "@/lib/actions/bookings";
import type { BookingConfigData, Weekday } from "@/lib/booking-config";

type Row = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  topic: string | null;
  type: string | null;
  message: string | null;
  slot: string; // ISO
  status: string;
};

const STATUS_OPTS = [
  { value: "pending", label: "Bekliyor" },
  { value: "confirmed", label: "Onaylı" },
  { value: "cancelled", label: "İptal" },
];

const WEEKDAYS: { key: Weekday; label: string }[] = [
  { key: "1", label: "Pazartesi" },
  { key: "2", label: "Salı" },
  { key: "3", label: "Çarşamba" },
  { key: "4", label: "Perşembe" },
  { key: "5", label: "Cuma" },
  { key: "6", label: "Cumartesi" },
  { key: "0", label: "Pazar" },
];

const SLOT_PALETTE = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

function fmtDateTime(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("tr-TR", { weekday: "short", day: "2-digit", month: "long" }),
    time: d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
  };
}

export function BookingsClient({
  initialBookings,
  initialConfig,
}: {
  initialBookings: Row[];
  initialConfig: BookingConfigData;
}) {
  const [tab, setTab] = useState("list");
  return (
    <>
      <div style={{ marginBottom: "1.5rem", maxWidth: 360 }}>
        <Seg
          value={tab}
          onChange={setTab}
          options={[
            { label: "Randevular", value: "list" },
            { label: "Çalışma günleri", value: "config" },
          ]}
        />
      </div>
      {tab === "list" ? <BookingList initial={initialBookings} /> : <WorkingDays config={initialConfig} />}
    </>
  );
}

function BookingList({ initial }: { initial: Row[] }) {
  const [rows, setRows] = useState(initial);
  const [pending, start] = useTransition();
  const [err, setErr] = useState<string | null>(null);
  const now = new Date();
  const upcoming = rows.filter((b) => b.status !== "cancelled" && new Date(b.slot) >= now);

  const changeStatus = (id: string, status: string) =>
    start(async () => {
      setErr(null);
      const res = await setBookingStatus(id, status);
      if (res?.error) {
        setErr(res.error);
        return;
      }
      setRows((cur) => cur.map((b) => (b.id === id ? { ...b, status } : b)));
    });
  const remove = (id: string) =>
    start(async () => {
      setErr(null);
      const res = await deleteBooking(id);
      if (res?.error) {
        setErr(res.error);
        return;
      }
      setRows((cur) => cur.filter((b) => b.id !== id));
    });

  return (
    <AdmCard title="Randevular" desc={`${upcoming.length} yaklaşan · ${rows.length} toplam`}>
      {err && <p style={{ color: "var(--signal-err)", fontSize: 13, padding: "0 1rem" }}>{err}</p>}
      {!rows.length ? (
        <div style={{ padding: "4rem", textAlign: "center", color: "var(--text-muted)" }}>
          <p>Henüz randevu yok.</p>
        </div>
      ) : (
        <table className="adm-table" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", textAlign: "left", fontSize: 13, color: "var(--text-muted)" }}>
              <th style={{ padding: "1rem" }}>Tarih & Saat</th>
              <th style={{ padding: "1rem" }}>Kişi</th>
              <th style={{ padding: "1rem" }}>Konu / Tür</th>
              <th style={{ padding: "1rem" }}>Durum</th>
              <th style={{ padding: "1rem" }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => {
              const { date, time } = fmtDateTime(b.slot);
              return (
                <tr key={b.id} style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)", opacity: b.status === "cancelled" ? 0.6 : 1 }}>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <b style={{ fontSize: 14 }}>{date}</b>
                      <span style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{time}</span>
                    </div>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <span style={{ fontWeight: 600 }}>{b.name}</span>
                      <a href={`mailto:${b.email}`} style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none", fontFamily: "var(--font-mono)" }}>{b.email}</a>
                      {b.phone && (
                        <a href={`tel:${b.phone}`} style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none", fontFamily: "var(--font-mono)" }}>{b.phone}</a>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: "1rem", color: "var(--text-muted)", fontSize: 14 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <span>{b.topic || "—"}</span>
                      {b.type && <span style={{ fontSize: 12 }}>{b.type}</span>}
                      {b.message && <span style={{ fontSize: 12, fontStyle: "italic" }}>{b.message}</span>}
                    </div>
                  </td>
                  <td style={{ padding: "1rem", minWidth: 140, pointerEvents: pending ? "none" : undefined, opacity: pending ? 0.6 : 1 }}>
                    <MkSelect width="140px" value={b.status} onChange={(v: string) => changeStatus(b.id, v)} options={STATUS_OPTS} />
                  </td>
                  <td style={{ padding: "1rem", textAlign: "right" }}>
                    <button className="adm-iconbtn" disabled={pending} onClick={() => remove(b.id)} aria-label="Sil">
                      <Icon name="trash" size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </AdmCard>
  );
}

function WorkingDays({ config }: { config: BookingConfigData }) {
  const [pending, start] = useTransition();
  const [weekly, setWeekly] = useState<Record<Weekday, boolean>>(config.weekly);
  const [slots, setSlots] = useState<string[]>(config.slots);
  const [closed, setClosed] = useState<string[]>(config.closedDates);
  const [newDate, setNewDate] = useState("");
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const todayStr = new Date().toISOString().slice(0, 10);
  const toggleSlot = (s: string) =>
    setSlots((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s].sort()));
  const addClosed = () => {
    if (newDate && !closed.includes(newDate)) setClosed((c) => [...c, newDate].sort());
    setNewDate("");
  };
  const removeClosed = (d: string) => setClosed((c) => c.filter((x) => x !== d));

  const save = () =>
    start(async () => {
      setErr(null);
      const res = await saveBookingConfig({ weekly, slots, closedDates: closed });
      if (res?.error) {
        setErr(res.error);
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });

  const chip = (active: boolean): React.CSSProperties => ({
    padding: ".5rem .9rem",
    borderRadius: "var(--radius-pill)",
    cursor: "pointer",
    fontFamily: "var(--font-mono)",
    fontSize: 13,
    border: "1px solid " + (active ? "var(--accent)" : "var(--border)"),
    background: active ? "var(--accent)" : "var(--surface)",
    color: active ? "var(--on-accent)" : "var(--text)",
  });

  return (
    <div style={{ display: "grid", gap: "1.5rem", maxWidth: "44rem" }}>
      <AdmCard title="Çalışma günleri" desc="Randevuya açık haftagünleri">
        <div style={{ padding: "0 1rem 1rem" }}>
          {WEEKDAYS.map((d) => (
            <div key={d.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: ".7rem 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontWeight: 500 }}>{d.label}</span>
              <Switch on={weekly[d.key]} onChange={(v) => setWeekly((w) => ({ ...w, [d.key]: v }))} />
            </div>
          ))}
        </div>
      </AdmCard>

      <AdmCard title="Çalışma saatleri" desc="Randevuya açık başlangıç saatleri">
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", padding: "0 1rem 1rem" }}>
          {SLOT_PALETTE.map((s) => (
            <button key={s} type="button" aria-pressed={slots.includes(s)} onClick={() => toggleSlot(s)} style={chip(slots.includes(s))}>
              {s}
            </button>
          ))}
        </div>
      </AdmCard>

      <AdmCard title="Kapalı günler" desc="Resmi tatil / izin — takvimde kapalı görünür">
        <div style={{ display: "flex", gap: ".5rem", padding: "0 1rem 1rem", alignItems: "center" }}>
          <input type="date" className="adm-input" value={newDate} min={todayStr} onChange={(e) => setNewDate(e.target.value)} style={{ maxWidth: 200 }} />
          <button type="button" className="adm-btn adm-btn--ghost" onClick={addClosed} disabled={!newDate}>
            Ekle
          </button>
        </div>
        {closed.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", padding: "0 1rem 1rem" }}>
            {closed.map((d) => (
              <span key={d} style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", padding: ".4rem .7rem", borderRadius: "var(--radius-pill)", border: "1px solid var(--border)", fontFamily: "var(--font-mono)", fontSize: 13 }}>
                {d}
                <button type="button" onClick={() => removeClosed(d)} aria-label="Kaldır" style={{ border: 0, background: "none", cursor: "pointer", color: "var(--text-muted)", display: "inline-flex" }}>
                  <Icon name="close" size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </AdmCard>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <button className="adm-btn adm-btn--primary" disabled={pending} onClick={save}>
          {pending ? "Kaydediliyor…" : "Kaydet"}
        </button>
        {saved && <span style={{ color: "var(--accent)", fontSize: 13 }}>Kaydedildi ✓</span>}
        {err && <span style={{ color: "var(--signal-err)", fontSize: 13 }}>{err}</span>}
      </div>
    </div>
  );
}
