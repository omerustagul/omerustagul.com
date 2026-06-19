"use client";

import React, { useMemo, useRef, useState, useTransition } from "react";
import { AdmCard, Badge } from "@/components/admin/ui";
import { Icon } from "@/components/admin/AdminIcons";
import { saveHomeLayout } from "@/lib/actions/home-layout";
import type { HomeLayout, HomeSection } from "@/lib/home-layout";

const DEVICES = [
  { id: "desk", label: "Masaüstü", icon: "monitor", w: "100%" },
  { id: "tab", label: "Tablet", icon: "tablet", w: "820px" },
  { id: "mob", label: "Mobil", icon: "mobile", w: "390px" },
];

export function PagesClient({ builtins, initialLayout }: { builtins: HomeSection[]; initialLayout: HomeLayout }) {
  const byId = useMemo(() => Object.fromEntries(builtins.map((s) => [s.id, s])), [builtins]);
  const [order, setOrder] = useState<string[]>(initialLayout.order);
  const [hidden, setHidden] = useState<Record<string, boolean>>(initialLayout.hidden);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const [device, setDevice] = useState("desk");
  const [saved, setSaved] = useState(false);
  const [pending, start] = useTransition();
  const previewRef = useRef<HTMLIFrameElement>(null);

  const dev = DEVICES.find((d) => d.id === device) || DEVICES[0];

  const onDrop = (toIdx: number) => {
    if (!dragId) return;
    const a = [...order];
    const fromIdx = a.indexOf(dragId);
    if (fromIdx === -1 || fromIdx === toIdx) {
      setDragId(null);
      setOverIdx(null);
      return;
    }
    a.splice(fromIdx, 1);
    a.splice(toIdx, 0, dragId);
    setOrder(a);
    setDragId(null);
    setOverIdx(null);
  };

  const move = (id: string, dir: number) => {
    const a = [...order];
    const i = a.indexOf(id);
    const j = i + dir;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    setOrder(a);
  };

  const toggleHidden = (id: string) => setHidden((h) => ({ ...h, [id]: !h[id] }));

  const save = () =>
    start(async () => {
      const res = await saveHomeLayout({ order, hidden });
      if (!res?.error) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        if (previewRef.current) previewRef.current.src = "/";
      }
    });

  const visibleCount = order.filter((id) => !hidden[id]).length;

  return (
    <AdmCard
      title="Anasayfa bölümleri"
      desc={`${visibleCount}/${order.length} bölüm görünür · sürükleyerek sırala, gözle gizle`}
      action={
        <>
          {saved && <span className="adm-badge adm-badge--green" style={{ marginRight: ".5rem" }}>Kaydedildi ✓</span>}
          <a className="adm-btn adm-btn--ghost" href="/" target="_blank" rel="noopener"><Icon name="external" size={15} /> Canlı gör</a>
          <button className="adm-btn adm-btn--primary" onClick={save} disabled={pending}>{pending ? "Kaydediliyor…" : "Kaydet"}</button>
        </>
      }
    >
      <div className="pw-split">
        <div className="pw-preview">
          <div className="adm-seg pw-dev" style={{ marginBottom: ".75rem" }}>
            {DEVICES.map((d) => (
              <button key={d.id} className={device === d.id ? "on" : ""} onClick={() => setDevice(d.id)} data-tip={d.label} aria-label={d.label}>
                <Icon name={d.icon} size={16} />
              </button>
            ))}
          </div>
          <div className="pw-frame" style={{ maxWidth: dev.w }}>
            <iframe ref={previewRef} src="/" title="Anasayfa önizleme" />
          </div>
        </div>

        <aside className="pw-panel">
          <ul className="seclist" onDragOver={(e) => e.preventDefault()}>
            {order.map((id, i) => {
              const s = byId[id];
              if (!s) return null;
              const isHidden = !!hidden[id];
              return (
                <li
                  key={id}
                  className={`seclist__row ${dragId === id ? "is-dragging" : ""} ${overIdx === i && dragId != null && dragId !== id ? "is-over" : ""}`}
                  draggable
                  style={isHidden ? { opacity: 0.5 } : undefined}
                  onDragStart={(e) => { setDragId(id); e.dataTransfer.effectAllowed = "move"; try { e.dataTransfer.setData("text/plain", id); } catch {} }}
                  onDragEnter={() => setOverIdx(i)}
                  onDragOver={(e) => { e.preventDefault(); setOverIdx(i); }}
                  onDrop={(e) => { e.preventDefault(); onDrop(i); }}
                  onDragEnd={() => { setDragId(null); setOverIdx(null); }}
                >
                  <span className="seclist__handle" aria-label="Sürükle"><Icon name="grip" size={15} /></span>
                  <span className="seclist__order">{String(i + 1).padStart(2, "0")}</span>
                  <span className="seclist__ic"><Icon name="projects" size={15} /></span>
                  <div className="seclist__meta">
                    <b>{s.label}</b>
                    <span>Yerleşik{s.locked ? " · sabit" : ""}{isHidden ? " · gizli" : ""}</span>
                  </div>
                  <div className="seclist__actions">
                    <button className="adm-iconbtn" disabled={i === 0} onClick={() => move(id, -1)} aria-label="Yukarı" data-tip="Yukarı"><Icon name="chevron" size={13} style={{ transform: "rotate(180deg)" }} /></button>
                    <button className="adm-iconbtn" disabled={i === order.length - 1} onClick={() => move(id, 1)} aria-label="Aşağı" data-tip="Aşağı"><Icon name="chevron" size={13} /></button>
                    {!s.locked && (
                      <button className="adm-iconbtn" onClick={() => toggleHidden(id)} aria-label="Gizle/Göster" data-tip={isHidden ? "Göster" : "Gizle"}>
                        <Icon name="eye" size={13} />
                      </button>
                    )}
                    {s.locked && <Badge tone="muted">sabit</Badge>}
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="pw-hint" style={{ marginTop: "var(--space-3)" }}>
            <Icon name="grip" size={13} /> Bölümleri <b>sürükleyip bırakarak</b> sırala, oklarla taşı, gözle gizle. <b>Kaydet</b>&apos;e bastığında anasayfaya yansır.
          </p>
        </aside>
      </div>
    </AdmCard>
  );
}
