"use client";

import React, { useState, useRef, useEffect } from "react";
import { AdmCard, Badge, Switch, Field } from "@/components/admin/ui";
import { Icon } from "@/components/admin/AdminIcons";

const MOCK_PAGES = [
  { id: "home", label: "Anasayfa", path: "", editable: "sections" },
  { id: "about", label: "Hakkımızda", path: "about", editable: "text" },
  { id: "contact", label: "İletişim", path: "contact", editable: "text" }
];

const DEVICES = [
  { id: "desk", label: "Masaüstü", icon: "monitor", w: "100%" }, 
  { id: "tab", label: "Tablet", icon: "tablet", w: "820px" }, 
  { id: "mob", label: "Mobil", icon: "mobile", w: "390px" }
];

const MOCK_SECTIONS = [
  { id: "s1", type: "image", kind: "builtin", label: "Hero Banner", locked: true },
  { id: "s2", type: "text", kind: "custom", title: "Hizmetlerimiz Özeti", text: "Kısaca neler yapıyoruz..." },
  { id: "s3", type: "video", kind: "custom", title: "Tanıtım Videosu", url: "https://youtube.com/..." }
];

function SectionPanel() {
  const [sections, setSections] = useState(MOCK_SECTIONS);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);

  const onDrop = (toIdx: number) => {
    if (!dragId) return;
    const a = [...sections];
    const fromIdx = a.findIndex(s => s.id === dragId);
    if (fromIdx === -1 || fromIdx === toIdx) return;
    const [moved] = a.splice(fromIdx, 1);
    a.splice(toIdx, 0, moved);
    setSections(a);
    setDragId(null);
    setOverIdx(null);
  };

  const move = (id: string, dir: number) => {
    const a = [...sections];
    const i = a.findIndex(s => s.id === id);
    const j = i + dir;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    setSections(a);
  };

  return (
    <div className="pw-section">
      <div className="pw-section__head">
        <span className="pw-section__title">Bölümler</span>
        <button className="adm-btn adm-btn--primary" style={{ padding: ".4rem .8rem" }}>
          <Icon name="plus" size={14} /> Ekle
        </button>
      </div>
      <ul className="seclist" onDragOver={e => e.preventDefault()}>
        {sections.map((s, i) => (
          <li 
            key={s.id}
            className={`seclist__row ${dragId === s.id ? "is-dragging" : ""} ${overIdx === i && dragId != null && dragId !== s.id ? "is-over" : ""}`}
            draggable
            onDragStart={e => { 
              setDragId(s.id); 
              e.dataTransfer.effectAllowed = "move"; 
              try { e.dataTransfer.setData("text/plain", s.id); } catch (err) {} 
            }}
            onDragEnter={() => setOverIdx(i)}
            onDragOver={e => { e.preventDefault(); setOverIdx(i); }}
            onDrop={e => { e.preventDefault(); onDrop(i); }}
            onDragEnd={() => { setDragId(null); setOverIdx(null); }}
          >
            <span className="seclist__handle" aria-label="Sürükle"><Icon name="grip" size={15} /></span>
            <span className="seclist__order">{String(i + 1).padStart(2, "0")}</span>
            <span className={`seclist__ic ${s.kind === "custom" ? "is-custom" : ""}`}>
              <Icon name={s.kind === "custom" ? (s.type === "video" ? "media" : s.type === "text" ? "pages" : "media") : "projects"} size={15} />
            </span>
            <div className="seclist__meta">
              <b>{s.kind === "custom" ? s.title : s.label}</b>
              <span>{s.kind === "custom" ? `Özel · ${s.type}` : "Yerleşik"}{s.locked ? " · sabit" : ""}</span>
            </div>
            <div className="seclist__actions">
               <button className="adm-iconbtn" disabled={i === 0} onClick={() => move(s.id, -1)} aria-label="Yukarı" data-tip="Yukarı"><Icon name="chevron" size={13} style={{ transform: "rotate(180deg)" }} /></button>
               <button className="adm-iconbtn" disabled={i === sections.length - 1} onClick={() => move(s.id, 1)} aria-label="Aşağı" data-tip="Aşağı"><Icon name="chevron" size={13} /></button>
               {!s.locked && <button className="adm-iconbtn" aria-label="Gizle/Göster" data-tip="Gizle"><Icon name="eye" size={13} /></button>}
               {s.kind === "custom" && <>
                 <button className="adm-iconbtn" aria-label="Düzenle" data-tip="Düzenle"><Icon name="edit" size={13} /></button>
                 <button className="adm-iconbtn" aria-label="Sil" data-tip="Sil"><Icon name="trash" size={13} /></button>
               </>}
            </div>
          </li>
        ))}
      </ul>
      <p className="pw-hint" style={{ marginTop: "var(--space-3)" }}>
        <Icon name="grip" size={13} /> Bölümleri <b>sürükleyip bırakarak</b> sıralayabilir, oklarla da taşıyabilirsin. Metinleri düzenlemek için soldaki önizlemede ilgili yazıya tıkla.
      </p>
    </div>
  );
}

function TextPanel({ meta, fields, onSet, onRefresh }: any) {
  return (
    <div className="pw-section">
      <div className="pw-hint">
        <Icon name="ai" size={14} /> Önizlemede <b>vurgulanan</b> metne tıklayıp doğrudan yazabilir, ya da aşağıdaki alanlardan düzenleyebilirsin. Değişiklikler canlı sitede anında görünür.
      </div>
      {fields.length === 0 ? (
        <div className="adm-empty" style={{ padding: "var(--space-6)" }}>
          <p>Önizleme iframe olarak yükleniyor… (mock mode)</p>
          <button className="adm-btn adm-btn--ghost" style={{ marginTop: 10 }} onClick={onRefresh}>Yenile</button>
        </div>
      ) : (
        <div className="pw-fields">
          {fields.map((f: any) => (
            <Field key={f.key} label={f.label}>
              {f.text.length > 60
                ? <textarea className="adm-input" style={{ minHeight: "4.5rem", resize: "vertical" }} value={f.text} onChange={e => onSet(f.key, e.target.value)} />
                : <input className="adm-input" value={f.text} onChange={e => onSet(f.key, e.target.value)} />}
            </Field>
          ))}
        </div>
      )}
    </div>
  );
}

function PageWorkspace({ meta, onBack }: any) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [fields, setFields] = useState<any[]>([]);
  const [device, setDevice] = useState("desk");
  const [tab, setTab] = useState(meta.id === "home" ? "sections" : "text");
  
  const dev = DEVICES.find(d => d.id === device) || DEVICES[0];

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const d = e.data || {};
      if (d.type === "mk-fields" && d.pageId === meta.id) setFields(d.fields);
      else if (d.type === "mk-field-change") setFields(fs => fs.map(f => f.key === d.key ? { ...f, text: d.text } : f));
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [meta.id]);

  const enterEdit = () => {
    const w = iframeRef.current?.contentWindow;
    if (w) { 
      w.postMessage("mk-edit-on", "*"); 
      w.postMessage({ type: "mk-request-fields" }, "*"); 
    }
    // Mock fields for the prototype UI
    if (fields.length === 0) {
      setTimeout(() => {
        setFields([
          { key: "h1", label: "Hero Başlık", text: meta.label + " Sayfası" },
          { key: "p1", label: "Giriş Metni", text: "Örnek bir içerik cümlesi." }
        ]);
      }, 800);
    }
  };

  const setField = (key: string, value: string) => {
    setFields(fs => fs.map(f => f.key === key ? { ...f, text: value } : f));
    const w = iframeRef.current?.contentWindow;
    if (w) w.postMessage({ type: "mk-set", key, value }, "*");
  };

  return (
    <div className="pw">
      <div className="ed-toolbar">
        <button className="ed-back" onClick={onBack}>
          <Icon name="chevron" size={14} style={{ transform: "rotate(90deg)" }} /> Sayfalar
        </button>
        <span className="adm-badge adm-badge--green">{meta.label}</span>
        <span className="sp" />
        <div className="adm-seg pw-dev">
          {DEVICES.map(d => (
            <button 
              key={d.id} 
              className={device === d.id ? "on" : ""} 
              onClick={() => setDevice(d.id)} 
              data-tip={d.label} 
              aria-label={d.label}
            >
              <Icon name={d.icon} size={16} />
            </button>
          ))}
        </div>
        <a className="adm-btn adm-btn--ghost" href="#" target="_blank" rel="noopener">
          <Icon name="external" size={15} /> Canlı gör
        </a>
      </div>

      <div className="pw-split">
        <div className="pw-preview">
          <div className="pw-frame" style={{ maxWidth: dev.w }}>
            <iframe 
              ref={iframeRef} 
              src="about:blank" 
              title="Önizleme" 
              onLoad={enterEdit} 
            />
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", zIndex: -1 }}>
              <div style={{ textAlign: "center" }}>
                <Icon name="pages" size={32} />
                <div style={{ marginTop: "1rem" }}>{meta.label} Canlı Önizleme ({dev.label})</div>
              </div>
            </div>
          </div>
        </div>

        <aside className="pw-panel">
          {meta.id === "home" && (
            <div className="pw-tabs">
              <button className={tab === "sections" ? "on" : ""} onClick={() => setTab("sections")}>Bölümler</button>
              <button className={tab === "text" ? "on" : ""} onClick={() => setTab("text")}>Metinler</button>
            </div>
          )}

          {meta.id === "home" && tab === "sections" ? (
            <SectionPanel />
          ) : (
            <TextPanel meta={meta} fields={fields} onSet={setField} onRefresh={enterEdit} />
          )}
        </aside>
      </div>
    </div>
  );
}

export function PagesClient() {
  const [activePage, setActivePage] = useState<string | null>(null);

  if (activePage) {
    const meta = MOCK_PAGES.find(p => p.id === activePage);
    return <PageWorkspace meta={meta} onBack={() => setActivePage(null)} />;
  }

  return (
    <AdmCard title="Sayfalar" desc={`${MOCK_PAGES.length} sayfa · canlı önizleme ile düzenle`}>
      <table className="adm-table">
        <thead>
          <tr>
            <th>Sayfa</th>
            <th>URL</th>
            <th>Düzenleme</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {MOCK_PAGES.map(p => (
            <tr key={p.id}>
              <td className="ti" style={{ fontWeight: 600 }}>{p.label}</td>
              <td style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)", fontSize: 13 }}>/{p.path}</td>
              <td>
                <Badge tone={p.editable === "sections" ? "green" : "muted"}>
                  {p.editable === "sections" ? "Bölümler + metin" : "Metin"}
                </Badge>
              </td>
              <td style={{ textAlign: "right" }}>
                <button className="adm-btn adm-btn--primary" onClick={() => setActivePage(p.id)}>
                  <Icon name="edit" size={14} /> Tüm bölümleri düzenle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdmCard>
  );
}
