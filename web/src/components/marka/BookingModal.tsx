"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { createBooking, getBookingConfig, getDayAvailability } from "@/lib/actions/bookings";
import {
  DEFAULT_BOOKING_CONFIG,
  isDayBookable,
  ymd,
  buildMonth,
  type BookingConfigData,
} from "@/lib/booking-config";

const TOPICS = ["Marka & ürün", "Web tasarım", "Geliştirme", "Akademi / eğitim", "Diğer"];
const TYPES = ["Online", "Telefon"];
const STEPS = ["Kişisel bilgiler", "Detaylar", "Tarih & saat"];
const DOW = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const MONTHS = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

const emailOk = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

/** Markaya özel, JS ile render edilen açılır seçim — native <select> değil. */
function Dropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <label className="bookm__field">
      {label}
      <div
        className={`bookm__sel ${open ? "open" : ""}`}
        ref={ref}
        onKeyDown={(e) => {
          if (e.key === "Escape" && open) {
            e.stopPropagation();
            setOpen(false);
          }
        }}
      >
        <button
          type="button"
          className="bookm__sel-btn"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span>{value}</span>
          <span className="bookm__sel-chev" aria-hidden="true">⌄</span>
        </button>
        {open && (
          <div className="bookm__sel-pop" role="listbox">
            {options.map((o) => (
              <button
                key={o}
                type="button"
                role="option"
                aria-selected={o === value}
                className={`bookm__sel-opt ${o === value ? "on" : ""}`}
                onClick={() => {
                  onChange(o);
                  setOpen(false);
                }}
              >
                {o}
              </button>
            ))}
          </div>
        )}
      </div>
    </label>
  );
}

export function BookingModal({ onClose }: { onClose: () => void }) {
  const [config, setConfig] = useState<BookingConfigData>(DEFAULT_BOOKING_CONFIG);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: TOPICS[0],
    type: TYPES[0],
    phone: "",
    message: "",
  });
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<string | null>(null);
  const [avail, setAvail] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ date: string; slot: string; type: string } | null>(null);
  const [pending, start] = useTransition();

  const todayStr = useMemo(() => ymd(new Date()), []);
  const [view, setView] = useState(() => {
    const d = new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  });
  const cells = useMemo(() => buildMonth(view.y, view.m), [view]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    getBookingConfig()
      .then(setConfig)
      .catch(() => {});
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Gün seçilince o günün boş saatlerini çek (senkron sıfırlamalar pickDay'de yapılır).
  useEffect(() => {
    if (!date) return;
    let live = true;
    getDayAvailability(date)
      .then((a) => {
        if (live) {
          setAvail(a);
          setLoadingSlots(false);
        }
      })
      .catch(() => {
        if (live) {
          setAvail([]);
          setLoadingSlots(false);
        }
      });
    return () => {
      live = false;
    };
  }, [date]);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  function pickDay(cell: string) {
    setSlot(null);
    setAvail([]);
    setLoadingSlots(true);
    setDate(cell);
  }

  const step1Ok = form.name.trim().length > 0 && emailOk(form.email.trim());
  const step2Ok = Boolean(form.topic) && Boolean(form.type) && (form.type !== "Telefon" || form.phone.trim().length > 0);

  function next() {
    setError(null);
    if (step === 1 && !step1Ok) {
      setError("Ad ve geçerli bir e-posta gerekli.");
      return;
    }
    if (step === 2 && !step2Ok) {
      setError(
        form.type === "Telefon" && !form.phone.trim()
          ? "Telefon görüşmesi için numara gerekli."
          : "Lütfen konu ve görüşme türü seç."
      );
      return;
    }
    setStep((s) => Math.min(3, s + 1));
  }
  function back() {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  }

  const now = new Date();
  const canPrev = view.y > now.getFullYear() || (view.y === now.getFullYear() && view.m > now.getMonth());
  const shiftMonth = (delta: number) =>
    setView((v) => {
      const d = new Date(v.y, v.m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });

  function submit() {
    setError(null);
    if (!date || !slot) {
      setError("Lütfen bir gün ve saat seç.");
      return;
    }
    start(async () => {
      const fd = new FormData();
      fd.set("name", form.name.trim());
      fd.set("email", form.email.trim());
      fd.set("phone", form.phone.trim());
      fd.set("topic", form.topic);
      fd.set("type", form.type);
      fd.set("message", form.message.trim());
      fd.set("slot", `${date}T${slot}:00`);
      const res = await createBooking(undefined, fd);
      if (res?.error) setError(res.error);
      else setDone({ date, slot, type: form.type });
    });
  }

  return (
    <div className="authm bookm">
      <div className="authm__scrim" onClick={onClose} />
      {done ? (
        <div className="authm__box bookm__box" style={{ textAlign: "center" }} role="dialog" aria-modal="true" aria-label="Görüşme planlandı">
          <div
            aria-hidden="true"
            style={{
              width: 56,
              height: 56,
              margin: "0 auto var(--space-3)",
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              background: "var(--accent)",
              color: "var(--on-accent)",
              fontSize: "1.6rem",
            }}
          >
            ✓
          </div>
          <h3 className="bookm__title">Görüşmen planlandı</h3>
          <p className="bookm__sub">
            {done.date} · {done.slot} · {done.type} — talebini aldık, en kısa sürede seninle iletişime geçeceğiz.
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
          <p className="bookm__sub">30 dakikalık keşif görüşmesi. Üç kısa adımda planla.</p>

          <div className="bookm__steps">
            {STEPS.map((label, i) => {
              const n = i + 1;
              const cls = n === step ? "on" : n < step ? "done" : "";
              return (
                <div key={label} style={{ display: "contents" }}>
                  <div className={`bookm__step ${cls}`}>
                    <span className="n">{n < step ? "✓" : n}</span>
                    <span className="lbl">{label}</span>
                  </div>
                  {n < STEPS.length && <span className="bar" />}
                </div>
              );
            })}
          </div>

          <div className="authm__form">
            {step === 1 && (
              <>
                <label>
                  Ad Soyad
                  <input value={form.name} onChange={(e) => set("name", e.target.value)} autoFocus />
                </label>
                <label>
                  E-posta
                  <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
                </label>
              </>
            )}

            {step === 2 && (
              <>
                <Dropdown label="Konu" value={form.topic} options={TOPICS} onChange={(v) => set("topic", v)} />
                <label>
                  Görüşmeyi nasıl tercih edersiniz?
                  <div className="bookm__seg" role="group" aria-label="Görüşmeyi nasıl tercih edersiniz">
                    {TYPES.map((t) => (
                      <button key={t} type="button" className={form.type === t ? "on" : ""} onClick={() => set("type", t)}>
                        {t}
                      </button>
                    ))}
                  </div>
                </label>
                <label>
                  Telefon{form.type === "Telefon" ? "" : " (opsiyonel)"}
                  <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="05xx xxx xx xx" />
                </label>
                <label>
                  Mesaj (opsiyonel)
                  <textarea value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Kısaca neyi konuşmak istersin?" />
                </label>
              </>
            )}

            {step === 3 && (
              <>
                <div className="bookm__cal">
                  <div className="bookm__cal-head">
                    <b>
                      {MONTHS[view.m]} {view.y}
                    </b>
                    <div className="bookm__cal-nav">
                      <button type="button" onClick={() => shiftMonth(-1)} disabled={!canPrev} aria-label="Önceki ay">
                        ‹
                      </button>
                      <button type="button" onClick={() => shiftMonth(1)} aria-label="Sonraki ay">
                        ›
                      </button>
                    </div>
                  </div>
                  <div className="bookm__cal-grid">
                    {DOW.map((d) => (
                      <div key={d} className="bookm__cal-dow">
                        {d}
                      </div>
                    ))}
                    {cells.map((cell, i) => {
                      if (!cell) return <div key={`e${i}`} className="bookm__day is-empty" />;
                      const bookable = isDayBookable(config, cell, todayStr);
                      const on = date === cell;
                      const dayNum = Number(cell.slice(-2));
                      return (
                        <button
                          key={cell}
                          type="button"
                          disabled={!bookable}
                          className={`bookm__day ${!bookable ? "is-disabled" : ""} ${on ? "is-on" : ""}`}
                          onClick={() => pickDay(cell)}
                        >
                          {dayNum}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {date && (
                  <div>
                    {loadingSlots ? (
                      <p className="bookm__hint">Saatler yükleniyor…</p>
                    ) : avail.length === 0 ? (
                      <p className="bookm__hint">Bu gün için uygun saat yok. Başka bir gün seç.</p>
                    ) : (
                      <div className="bookm__slots">
                        {avail.map((s) => (
                          <button key={s} type="button" className={`bookm__slot ${slot === s ? "on" : ""}`} onClick={() => setSlot(s)}>
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {error && <p className="authm__err">{error}</p>}

            <div className="bookm__nav">
              {step > 1 ? (
                <button type="button" className="btn btn--ghost" onClick={back}>
                  <span className="arr">←</span> Geri
                </button>
              ) : (
                <span />
              )}
              {step < 3 ? (
                <button type="button" className="btn btn--primary" onClick={next}>
                  İleri <span className="arr">→</span>
                </button>
              ) : (
                <button type="button" className="btn btn--primary" onClick={submit} disabled={pending || !date || !slot}>
                  {pending ? "Planlanıyor…" : "Görüşmeyi onayla"} <span className="arr">→</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
