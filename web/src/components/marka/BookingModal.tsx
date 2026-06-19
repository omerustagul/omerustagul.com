"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { createBooking } from "@/lib/actions/bookings";

/* Faithful port of the prototype's booking modal (theme/site-chrome.js).
   Wired to the createBooking server action. */
const SLOTS = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];
const TOPICS = ["Marka & ürün", "Web tasarım", "Geliştirme", "Akademi / eğitim", "Diğer"];

export function BookingModal({ onClose }: { onClose: () => void }) {
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ date: string; slot: string } | null>(null);
  const [pending, start] = useTransition();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const d = new Date();
    d.setDate(d.getDate() + 1);
    setDate(d.toISOString().slice(0, 10));
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    if (!name || !email || !date) {
      setError("Ad, e-posta ve tarih gerekli.");
      return;
    }
    if (!slot) {
      setError("Lütfen bir saat seç.");
      return;
    }
    start(async () => {
      const fd = new FormData();
      fd.set("name", name);
      fd.set("email", email);
      fd.set("slot", `${date}T${slot}:00`);
      const res = await createBooking(undefined, fd);
      if (res?.error) setError(res.error);
      else setDone({ date, slot });
    });
  }

  return (
    <div className="authm bookm">
      <div className="authm__scrim" onClick={onClose} />
      {done ? (
        <div className="authm__box bookm__box" style={{ textAlign: "center" }} role="dialog" aria-modal="true">
          <div className="gres__emoji">✓</div>
          <h3 className="bookm__title">Görüşmen planlandı!</h3>
          <p className="bookm__sub">
            {done.date} · {done.slot} — onay e-postası gönderilecek.
          </p>
          <button className="btn btn--primary" onClick={onClose} style={{ marginTop: "var(--space-4)" }}>
            Tamam
          </button>
        </div>
      ) : (
        <div className="authm__box bookm__box" role="dialog" aria-modal="true" aria-label="Görüşme planla">
          <button className="authm__x" onClick={onClose} aria-label="Kapat">
            ✕
          </button>
          <span className="eyebrow">Ücretsiz Tanışma</span>
          <h3 className="bookm__title">Görüşme planla</h3>
          <p className="bookm__sub">30 dakikalık keşif görüşmesi. Sana en uygun günü ve saati seç.</p>
          <form className="authm__form" onSubmit={submit} style={{ marginTop: "var(--space-4)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
              <label>
                Ad Soyad
                <input name="name" required />
              </label>
              <label>
                E-posta
                <input name="email" type="email" required />
              </label>
            </div>
            <label>
              Konu
              <select name="topic">
                {TOPICS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label>
              Tarih
              <input type="date" value={date} min={minDate} onChange={(e) => setDate(e.target.value)} />
            </label>
            <div className="bookm__slots">
              {SLOTS.map((s) => (
                <button key={s} type="button" className={`bookm__slot ${slot === s ? "on" : ""}`} onClick={() => setSlot(s)}>
                  {s}
                </button>
              ))}
            </div>
            {error && <p className="authm__err">{error}</p>}
            <button className="btn btn--primary" type="submit" disabled={pending}>
              {pending ? "Planlanıyor…" : "Görüşmeyi onayla"} <span className="arr">→</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
