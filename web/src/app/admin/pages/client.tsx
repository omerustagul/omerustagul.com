"use client";

import React, { useMemo, useRef, useState, useTransition } from "react";
import { AdmCard, Badge, Field, Switch, Seg, ImageUpload } from "@/components/admin/ui";
import { Icon } from "@/components/admin/AdminIcons";
import { saveHomeLayout } from "@/lib/actions/home-layout";
import { newCustomSection, type CustomSection, type CustomType, type HomeLayout, type HomeSection } from "@/lib/home-layout";

const DEVICES = [
  { id: "desk", label: "Masaüstü", icon: "monitor", w: "100%" },
  { id: "tab", label: "Tablet", icon: "tablet", w: "820px" },
  { id: "mob", label: "Mobil", icon: "mobile", w: "390px" },
];
const ADD_TYPES: { type: CustomType; label: string; icon: string }[] = [
  { type: "image", label: "Görsel", icon: "media" },
  { type: "video", label: "Video", icon: "media" },
  { type: "text", label: "Metin", icon: "pages" },
];

function CustomEditor({ section, onChange, onClose, onRemove }: { section: CustomSection; onChange: (patch: Partial<CustomSection>) => void; onClose: () => void; onRemove: () => void }) {
  const s = section;
  return (
    <>
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 100 }} onClick={onClose} />
      <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "440px", background: "var(--surface)", zIndex: 101, boxShadow: "-4px 0 24px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ margin: 0, fontSize: "1.05rem" }}>Özel bölüm · {s.type}</h3>
          <button className="adm-iconbtn" onClick={onClose}><Icon name="close" size={16} /></button>
        </div>
        <div style={{ padding: "1.5rem", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <Field label="Başlık"><input className="adm-input" value={s.title || ""} onChange={(e) => onChange({ title: e.target.value })} /></Field>
          <Field label="Metin"><textarea className="adm-textarea" style={{ minHeight: "5rem" }} value={s.text || ""} onChange={(e) => onChange({ text: e.target.value })} /></Field>
          {s.type === "image" && (
            <>
              <ImageUpload label="Görsel" ratio="16/9" value={s.src || null} onChange={(v: string | null) => onChange({ src: v })} hint="opsiyonel" />
              <Field label="Açıklama (caption)"><input className="adm-input" value={s.caption || ""} onChange={(e) => onChange({ caption: e.target.value })} /></Field>
            </>
          )}
          {s.type === "video" && (
            <Field label="Video bağlantısı (YouTube/Vimeo/mp4)"><input className="adm-input" value={s.url || ""} onChange={(e) => onChange({ url: e.target.value })} placeholder="https://youtu.be/..." /></Field>
          )}
          <Field label="Hizalama"><Seg value={s.align || "left"} onChange={(v: string) => onChange({ align: v as "left" | "center" })} options={[{ value: "left", label: "Sol" }, { value: "center", label: "Merkez" }]} /></Field>
          <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--surface-muted)", padding: "1rem", borderRadius: "8px" }}>
            <div><b style={{ fontSize: 14 }}>Tam genişlik</b><br /><span style={{ fontSize: 12, color: "var(--text-muted)" }}>Kenardan kenara (hero gibi)</span></div>
            <Switch on={!!s.full} onChange={(v: boolean) => onChange({ full: v })} />
          </label>
        </div>
        <div style={{ padding: "1.5rem", borderTop: "1px solid var(--border)", display: "flex", gap: "1rem", justifyContent: "space-between" }}>
          <button className="adm-btn adm-btn--danger" onClick={() => { onRemove(); onClose(); }}><Icon name="trash" size={14} /> Sil</button>
          <button className="adm-btn adm-btn--primary" onClick={onClose}>Bitti</button>
        </div>
      </div>
    </>
  );
}

export function PagesClient({ builtins, initialLayout }: { builtins: HomeSection[]; initialLayout: HomeLayout }) {
  const byId = useMemo(() => Object.fromEntries(builtins.map((s) => [s.id, s])), [builtins]);
  const [order, setOrder] = useState<string[]>(initialLayout.order);
  const [hidden, setHidden] = useState<Record<string, boolean>>(initialLayout.hidden);
  const [custom, setCustom] = useState<CustomSection[]>(initialLayout.custom);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const [device, setDevice] = useState("desk");
  const [saved, setSaved] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const previewRef = useRef<HTMLIFrameElement>(null);

  const dev = DEVICES.find((d) => d.id === device) || DEVICES[0];
  const customById = useMemo(() => Object.fromEntries(custom.map((c) => [c.id, c])), [custom]);
  const editing = editId ? customById[editId] : null;

  const onDrop = (toIdx: number) => {
    if (!dragId) return;
    const a = [...order];
    const fromIdx = a.indexOf(dragId);
    if (fromIdx === -1 || fromIdx === toIdx) { setDragId(null); setOverIdx(null); return; }
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

  const addCustom = (type: CustomType) => {
    const sec = newCustomSection(type);
    setCustom((c) => [...c, sec]);
    setOrder((o) => [...o, sec.id]);
    setAddOpen(false);
    setEditId(sec.id);
  };
  const patchCustom = (id: string, patch: Partial<CustomSection>) => setCustom((c) => c.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const removeCustom = (id: string) => {
    setCustom((c) => c.filter((s) => s.id !== id));
    setOrder((o) => o.filter((x) => x !== id));
    setHidden((h) => { const n = { ...h }; delete n[id]; return n; });
  };

  const save = () =>
    start(async () => {
      const res = await saveHomeLayout({ order, hidden, custom });
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
      desc={`${visibleCount}/${order.length} bölüm görünür · sürükle/gizle, özel bölüm ekle`}
      action={
        <>
          {saved && <span className="adm-badge adm-badge--green" style={{ marginRight: ".5rem" }}>Kaydedildi ✓</span>}
          <div style={{ position: "relative", display: "inline-block" }}>
            <button className="adm-btn adm-btn--ghost" onClick={() => setAddOpen((v) => !v)}><Icon name="plus" size={14} /> Ekle</button>
            {addOpen && (
              <div style={{ position: "absolute", top: "110%", right: 0, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 20, minWidth: 160, padding: 6 }}>
                {ADD_TYPES.map((t) => (
                  <button key={t.type} className="adm-btn adm-btn--ghost" style={{ width: "100%", justifyContent: "flex-start" }} onClick={() => addCustom(t.type)}>
                    <Icon name={t.icon} size={14} /> {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>
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
              const b = byId[id];
              const c = customById[id];
              if (!b && !c) return null;
              const isCustom = !!c;
              const label = isCustom ? c.title || "Özel bölüm" : b.label;
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
                  <span className={`seclist__ic ${isCustom ? "is-custom" : ""}`}><Icon name={isCustom ? (c.type === "text" ? "pages" : "media") : "projects"} size={15} /></span>
                  <div className="seclist__meta">
                    <b>{label}</b>
                    <span>{isCustom ? `Özel · ${c.type}` : "Yerleşik"}{b?.locked ? " · sabit" : ""}{isHidden ? " · gizli" : ""}</span>
                  </div>
                  <div className="seclist__actions">
                    <button className="adm-iconbtn" disabled={i === 0} onClick={() => move(id, -1)} aria-label="Yukarı" data-tip="Yukarı"><Icon name="chevron" size={13} style={{ transform: "rotate(180deg)" }} /></button>
                    <button className="adm-iconbtn" disabled={i === order.length - 1} onClick={() => move(id, 1)} aria-label="Aşağı" data-tip="Aşağı"><Icon name="chevron" size={13} /></button>
                    {!b?.locked && (
                      <button className="adm-iconbtn" onClick={() => toggleHidden(id)} aria-label="Gizle/Göster" data-tip={isHidden ? "Göster" : "Gizle"}><Icon name="eye" size={13} /></button>
                    )}
                    {isCustom && <button className="adm-iconbtn" onClick={() => setEditId(id)} aria-label="Düzenle" data-tip="Düzenle"><Icon name="edit" size={13} /></button>}
                    {isCustom && <button className="adm-iconbtn" onClick={() => removeCustom(id)} aria-label="Sil" data-tip="Sil"><Icon name="trash" size={13} /></button>}
                    {b?.locked && <Badge tone="muted">sabit</Badge>}
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="pw-hint" style={{ marginTop: "var(--space-3)" }}>
            <Icon name="grip" size={13} /> Sürükle-bırak ile sırala, gözle gizle, <b>Ekle</b> ile özel bölüm oluştur. <b>Kaydet</b>&apos;e bastığında anasayfaya yansır.
          </p>
        </aside>
      </div>

      {editing && (
        <CustomEditor
          section={editing}
          onChange={(patch) => patchCustom(editing.id, patch)}
          onClose={() => setEditId(null)}
          onRemove={() => removeCustom(editing.id)}
        />
      )}
    </AdmCard>
  );
}
