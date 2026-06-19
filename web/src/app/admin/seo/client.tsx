"use client";

import React, { useState, useRef } from "react";
import { AdmCard, Badge, Field, Switch } from "@/components/admin/ui";
import { Icon } from "@/components/admin/AdminIcons";
import { suggestSeoAction } from "@/lib/actions/ai";

const SITE_PAGES = [
  { id: "home", name: "Anasayfa", url: "/", title: "Marka — Dijitalde yeni standart", desc: "Markaları geleceğe taşıyan ödüllü kreatif stüdyo. Strateji, tasarım ve teknoloji.", indexed: true },
  { id: "portfolio", name: "İşler / Portfolyo", url: "/isler", title: "İşler — Ödüllü projeler · Marka", desc: "Web, marka ve dijital ürün projelerimizden seçkiler.", indexed: true },
  { id: "project", name: "Proje Detay", url: "/isler/atlas-finans", title: "Atlas Finans — Vaka çalışması · Marka", desc: "Atlas Bank için uçtan uca marka ve ürün deneyimi.", indexed: true },
  { id: "blog", name: "Blog", url: "/blog", title: "Blog — Stüdyodan notlar · Marka", desc: "Tasarım, süreç ve kültür üzerine yazılar.", indexed: true },
  { id: "academy", name: "Akademi", url: "/akademi", title: "Akademi — En iyilerden öğren · Marka", desc: "Sektörün önde gelen tasarımcılarından kurslar.", indexed: true },
  { id: "market", name: "Market", url: "/market", title: "Market — Şablonlar & dijital ürünler · Marka", desc: "UI kit, şablon ve ikon setleri.", indexed: true },
  { id: "about", name: "Hakkımızda", url: "/hakkimizda", title: "Hakkımızda · Marka", desc: "Ekibimiz, manifestomuz ve rakamlarla biz.", indexed: true },
  { id: "contact", name: "İletişim", url: "/iletisim", title: "İletişim — Birlikte çalışalım · Marka", desc: "Projenizi konuşalım. 48 saat içinde dönüş.", indexed: false },
];

export function SEOClient() {
  const [pages, setPages] = useState(SITE_PAGES);
  const [editing, setEditing] = useState<any>(null);

  if (editing) {
    return (
      <SeoEditor
        page={editing}
        onClose={() => setEditing(null)}
        onSave={(p: any) => {
          setPages((prev) => prev.map((x) => (x.id === p.id ? p : x)));
          setEditing(null);
        }}
      />
    );
  }

  return (
    <AdmCard title="SEO & Meta — Site haritası" desc={`${pages.length} sayfa · meta verilerini düzenle`}>
      <table className="adm-table">
        <thead>
          <tr>
            <th>Sayfa</th>
            <th>URL</th>
            <th>Meta başlık</th>
            <th>İndeksleme</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pages.map((p) => (
            <tr key={p.id}>
              <td className="ti">{p.name}</td>
              <td style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>{p.url}</td>
              <td style={{ color: "var(--text-muted)", maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {p.title}
              </td>
              <td>
                <Badge tone={p.indexed ? "green" : "muted"}>{p.indexed ? "İndeksli" : "Gizli"}</Badge>
              </td>
              <td>
                <div className="adm-row-actions">
                  <button className="adm-iconbtn" onClick={() => setEditing(p)}>
                    <Icon name="edit" size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdmCard>
  );
}

function SeoEditor({ page, onClose, onSave }: any) {
  const [p, setP] = useState({ og: null, ...page });
  const [busy, setBusy] = useState(false);
  const ogRef = useRef<HTMLInputElement>(null);

  const set = (k: string, v: any) => setP((x: any) => ({ ...x, [k]: v }));

  const ai = async () => {
    setBusy(true);
    const res = await suggestSeoAction(p.name);
    if (!("error" in res)) setP((x: any) => ({ ...x, title: res.title, desc: res.description }));
    setBusy(false);
  };

  const onOg = (file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    const r = new FileReader();
    r.onload = (e) => set("og", e.target?.result);
    r.readAsDataURL(file);
  };

  return (
    <div>
      <div className="ed-toolbar">
        <button className="ed-back" onClick={onClose}>
          <Icon name="close" size={14} /> Tüm sayfalar
        </button>
        <span className="adm-badge adm-badge--green">{page.name}</span>
        <span className="sp" />
        <button className="adm-btn adm-btn--ghost" disabled={busy} onClick={ai}>
          {busy ? (
            <>
              <span className="ai-spinner" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} /> …
            </>
          ) : (
            <>
              <Icon name="ai" size={14} /> AI ile öner
            </>
          )}
        </button>
        <button className="adm-btn adm-btn--primary" onClick={() => onSave(p)}>
          Kaydet
        </button>
      </div>

      <div className="editor">
        <div className="editor__form">
          <Field label="URL / slug">
            <input className="adm-input" value={p.url} onChange={(e) => set("url", e.target.value)} />
          </Field>
          
          <div className="adm-field">
            <label style={{ display: "flex", justifyContent: "space-between" }}>
              Meta başlık{" "}
              <span style={{ textTransform: "none", letterSpacing: 0, color: p.title.length > 60 ? "var(--signal-err)" : "var(--text-subtle)" }}>
                {p.title.length}/60
              </span>
            </label>
            <input className="adm-input" value={p.title} onChange={(e) => set("title", e.target.value)} />
          </div>

          <div className="adm-field">
            <label style={{ display: "flex", justifyContent: "space-between" }}>
              Meta açıklama{" "}
              <span style={{ textTransform: "none", letterSpacing: 0, color: p.desc.length > 155 ? "var(--signal-err)" : "var(--text-subtle)" }}>
                {p.desc.length}/155
              </span>
            </label>
            <textarea className="adm-textarea" style={{ minHeight: "5rem" }} value={p.desc} onChange={(e) => set("desc", e.target.value)} />
          </div>

          <div className="set-logo">
            <label className="adm-field" style={{ marginBottom: 4 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-label)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                Sosyal paylaşım görseli (OG · 1200×630)
              </span>
            </label>
            <div
              className={`img-up ${p.og ? "has" : ""}`}
              style={{ aspectRatio: "1200 / 630" }}
              onClick={() => ogRef.current?.click()}
            >
              {p.og ? (
                <img src={p.og} alt="" />
              ) : (
                <div className="img-up__ph">
                  <Icon name="media" size={22} />
                  <span>Görsel yükle</span>
                </div>
              )}
              <input ref={ogRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => onOg(e.target.files?.[0])} />
            </div>
          </div>

          <div className="perm-row" style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "1rem", marginTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>
              <span style={{ fontWeight: 600 }}>Arama motorlarında göster</span>
              <span style={{ color: "var(--text-muted)", fontSize: "12px" }}> · index / noindex</span>
            </span>
            <Switch on={p.indexed} onChange={(v: boolean) => set("indexed", v)} />
          </div>
        </div>

        <div className="editor__preview">
          <div className="prev-frame">
            <div className="prev-frame__bar">
              <Icon name="search" size={13} /> Google önizleme
            </div>
            <div style={{ padding: "var(--space-5)", background: "#fff", borderBottomLeftRadius: "var(--radius)", borderBottomRightRadius: "var(--radius)" }}>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "#202124" }}>
                <span style={{ color: "var(--text-muted)" }}>marka.studio</span> {p.url}
              </div>
              <div style={{ color: "#1a0dab", fontSize: 19, margin: ".2rem 0", lineHeight: 1.2, fontFamily: "Arial, sans-serif" }}>
                {p.title || "Sayfa başlığı"}
              </div>
              <div style={{ color: "#4d5156", fontSize: 13.5, lineHeight: 1.5, fontFamily: "Arial, sans-serif" }}>
                {p.desc || "Meta açıklama burada görünecek."}
              </div>
              {p.og && (
                <div className="pv__cover" style={{ aspectRatio: "1200 / 630", marginTop: 14, overflow: "hidden", borderRadius: "8px" }}>
                  <img src={p.og} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
