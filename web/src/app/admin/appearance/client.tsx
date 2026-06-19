"use client";

import React, { useRef } from "react";
import { AdmCard, Field, Switch, Seg, ImageUpload } from "@/components/admin/ui";
import { Icon } from "@/components/admin/AdminIcons";
import { useTheme } from "@/components/theme/ThemeProvider";
import { ACCENTS, FONTS } from "@/lib/theme";

const THEME_OPTIONS = {
  HEADER_TEMPLATES: [
    { id: "classic", label: "Klasik", desc: "Logo sol, menü, sosyal + CTA sağ" },
    { id: "centered", label: "Ortalanmış", desc: "Logo ortada, menü altta" },
    { id: "minimal", label: "Minimal", desc: "Sadece logo + CTA + menü düğmesi" },
    { id: "split", label: "Bölünmüş", desc: "Logo sol, menü sağa hizalı, CTA en sağda" },
  ],
  FOOTER_TEMPLATES: [
    { id: "columns", label: "Sütunlu", desc: "Çok sütun + dev kelime-logo" },
    { id: "compact", label: "Kompakt", desc: "Tek satır, sade" },
  ],
  HERO_VARIANTS: [
    { id: "full", label: "Tam", desc: "Tam ekran kapak + büyük başlık" },
    { id: "split", label: "Bölünmüş", desc: "Sol metin, sağ görsel" },
    { id: "center", label: "Merkez", desc: "Ortalanmış editoryal" },
  ],
  ACCENTS,
  FONTS,
};

function MiniHeader({ id }: { id: string }) {
  const logo = <span style={{ width: 30, height: 10, background: "var(--accent)", borderRadius: 2 }} />;
  const nav = <span style={{ display: "flex", gap: 4 }}>{[0, 1, 2].map((i) => <i key={i} style={{ width: 12, height: 4, background: "var(--ink-200)", borderRadius: 2 }} />)}</span>;
  const cta = <span style={{ width: 20, height: 10, background: "var(--text)", borderRadius: 2 }} />;

  if (id === "centered") return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: 8, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 6 }}><div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>{cta}{logo}{cta}</div><div>{nav}</div></div>;
  if (id === "minimal") return <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 8, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 6 }}>{logo}{cta}</div>;
  if (id === "split") return <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 8, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 6 }}>{nav}{logo}{nav}</div>;
  
  // default
  return <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 8, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 6 }}>{logo}{nav}{cta}</div>;
}

export function AppearanceClient() {
  const { theme: cfg, set: update, reset } = useTheme();
  const previewRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="adm-grid adm-grid--2" style={{ alignItems: "start", gridTemplateColumns: "1fr 1fr", gap: "2rem", display: "grid" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <AdmCard title="Header şablonu" desc="Tüm sayfalarda anında geçerli olur">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {THEME_OPTIONS.HEADER_TEMPLATES.map((t) => (
              <button
                key={t.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  padding: "1rem",
                  border: cfg.headerTemplate === t.id ? "2px solid var(--accent)" : "1px solid var(--border)",
                  borderRadius: "8px",
                  background: "var(--surface)",
                  cursor: "pointer",
                  textAlign: "left"
                }}
                onClick={() => update({ headerTemplate: t.id })}
              >
                <MiniHeader id={t.id} />
                <div style={{ fontWeight: 600, fontSize: "14px", marginTop: "0.5rem" }}>
                  {t.label} {cfg.headerTemplate === t.id && <span style={{ color: "var(--accent)" }}>●</span>}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t.desc}</div>
              </button>
            ))}
          </div>
        </AdmCard>

        <AdmCard title="Footer şablonu">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {THEME_OPTIONS.FOOTER_TEMPLATES.map((t) => (
              <button
                key={t.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  padding: "1rem",
                  border: cfg.footerTemplate === t.id ? "2px solid var(--accent)" : "1px solid var(--border)",
                  borderRadius: "8px",
                  background: "var(--surface)",
                  cursor: "pointer",
                  textAlign: "left"
                }}
                onClick={() => update({ footerTemplate: t.id })}
              >
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4, padding: 8, background: "var(--surface-muted)", borderRadius: 6, height: 40 }}>
                  {[0, 1, 2].map((i) => <span key={i} style={{ flex: 1, height: t.id === "compact" ? 8 : 22, background: "var(--ink-200)", borderRadius: 3 }} />)}
                </div>
                <div style={{ fontWeight: 600, fontSize: "14px", marginTop: "0.5rem" }}>{t.label}</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t.desc}</div>
              </button>
            ))}
          </div>
        </AdmCard>

        <AdmCard title="Hero düzeni" desc="Anasayfa kahraman alanının görünümü">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {THEME_OPTIONS.HERO_VARIANTS.map((t) => (
              <button
                key={t.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  padding: "1rem",
                  border: cfg.heroVariant === t.id ? "2px solid var(--accent)" : "1px solid var(--border)",
                  borderRadius: "8px",
                  background: "var(--surface)",
                  cursor: "pointer",
                  textAlign: "left"
                }}
                onClick={() => update({ heroVariant: t.id })}
              >
                <div style={{ 
                  display: "flex", 
                  padding: 8, 
                  background: "var(--surface-muted)", 
                  borderRadius: 6, 
                  height: 60,
                  flexDirection: t.id === "center" ? "column" : t.id === "split" ? "row" : "column",
                  alignItems: t.id === "center" ? "center" : "flex-start",
                  justifyContent: t.id === "center" ? "center" : "flex-start",
                  gap: 4
                }}>
                  {t.id === "split" ? (
                    <><span style={{ flex: 1, height: "100%", background: "var(--ink-200)", borderRadius: 4 }} /><span style={{ flex: 1, height: "100%", background: "var(--accent)", opacity: 0.5, borderRadius: 4 }} /></>
                  ) : t.id === "center" ? (
                    <><i style={{ width: "70%", height: 7, borderRadius: 2, background: "var(--text)" }} /><i style={{ width: "45%", height: 5, borderRadius: 2, background: "var(--ink-300)" }} /></>
                  ) : (
                    <><i style={{ width: "85%", height: 9, borderRadius: 2, background: "var(--text)" }} /><i style={{ width: "55%", height: 5, borderRadius: 2, background: "var(--ink-300)" }} /></>
                  )}
                </div>
                <div style={{ fontWeight: 600, fontSize: "14px", marginTop: "0.5rem" }}>
                  {t.label} {cfg.heroVariant === t.id && <span style={{ color: "var(--accent)" }}>●</span>}
                </div>
              </button>
            ))}
          </div>
        </AdmCard>

        <AdmCard title="Renk paleti & font">
          <Field label="Vurgu rengi">
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              {THEME_OPTIONS.ACCENTS.map((a) => (
                <button
                  key={a.id}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: a.value,
                    border: cfg.accent === a.value ? "2px solid var(--text)" : "2px solid transparent",
                    cursor: "pointer",
                    boxShadow: cfg.accent === a.value ? "0 0 0 2px var(--surface)" : "none",
                  }}
                  title={a.label}
                  onClick={() => update({ accent: a.value })}
                />
              ))}
              <label style={{
                width: 32, height: 32, borderRadius: "50%", background: "conic-gradient(red,orange,yellow,lime,cyan,blue,magenta,red)",
                display: "grid", placeItems: "center", cursor: "pointer"
              }} title="Özel renk">
                <input type="color" value={cfg.accent} onChange={(e) => update({ accent: e.target.value })} style={{ opacity: 0, width: 1, height: 1, position: "absolute" }} />
                <span style={{ color: "#fff", mixBlendMode: "difference", fontSize: 16, fontWeight: "bold" }}>＋</span>
              </label>
            </div>
          </Field>

          <Field label="Font ailesi">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1.5rem" }}>
              {THEME_OPTIONS.FONTS.map((f) => (
                <button
                  key={f.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.8rem",
                    border: cfg.font === f.id ? "1px solid var(--accent)" : "1px solid var(--border)",
                    background: cfg.font === f.id ? "var(--surface-muted)" : "var(--surface)",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontFamily: f.family
                  }}
                  onClick={() => update({ font: f.id })}
                >
                  <span style={{ fontWeight: 600 }}>{f.label}</span>
                  <span style={{ color: "var(--text-muted)" }}>Aa Bb 123</span>
                </button>
              ))}
            </div>
          </Field>

          <div style={{ display: "flex", gap: "2rem", marginTop: 4, flexWrap: "wrap" }}>
            <Field label="Tema modu">
              <Seg value={cfg.mode} onChange={(v: string) => update({ mode: v as "light" | "dark" })} options={[{ value: "light", label: "Açık" }, { value: "dark", label: "Koyu" }]} />
            </Field>
            <Field label={`Köşe yuvarlaklığı — ${cfg.radius}px`}>
              <div style={{ display: "flex", alignItems: "center", height: "36px" }}>
                <input type="range" min="0" max="20" step="1" value={cfg.radius} onChange={(e) => update({ radius: +e.target.value })} style={{ accentColor: "var(--accent)", width: 180 }} />
              </div>
            </Field>
          </div>

          <button className="adm-btn adm-btn--ghost" style={{ marginTop: 20 }} onClick={reset}>
            Varsayılana sıfırla
          </button>
        </AdmCard>

        <AdmCard
          title="Açılış pop-up'ı"
          desc="Siteye giren ziyaretçiye gösterilecek kampanya penceresi"
          action={<Switch on={!!cfg.popup?.enabled} onChange={(v: boolean) => update({ popup: { ...cfg.popup!, enabled: v } })} />}
        >
          {cfg.popup?.enabled ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <ImageUpload label="Görsel" ratio="16/9" value={cfg.popup.image || null} onChange={(v: string | null) => update({ popup: { ...cfg.popup!, image: v } })} hint="opsiyonel" />
              <Field label="Başlık">
                <input className="adm-input" value={cfg.popup.title} onChange={(e) => update({ popup: { ...cfg.popup!, title: e.target.value } })} />
              </Field>
              <Field label="Metin">
                <textarea className="adm-textarea" style={{ minHeight: "5rem" }} value={cfg.popup.text} onChange={(e) => update({ popup: { ...cfg.popup!, text: e.target.value } })} />
              </Field>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <Field label="Buton metni">
                  <input className="adm-input" value={cfg.popup.ctaText} onChange={(e) => update({ popup: { ...cfg.popup!, ctaText: e.target.value } })} />
                </Field>
                <Field label="Buton bağlantısı">
                  <input className="adm-input" value={cfg.popup.ctaUrl} onChange={(e) => update({ popup: { ...cfg.popup!, ctaUrl: e.target.value } })} placeholder="/" />
                </Field>
              </div>
              <Field label={`Açılma gecikmesi — ${cfg.popup.delaySec}sn`}>
                <input type="range" min="0" max="20" step="1" value={cfg.popup.delaySec} onChange={(e) => update({ popup: { ...cfg.popup!, delaySec: +e.target.value } })} style={{ accentColor: "var(--accent)", width: "100%" }} />
              </Field>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "14px" }}>
                <Switch on={cfg.popup.freqOncePerSession} onChange={(v: boolean) => update({ popup: { ...cfg.popup!, freqOncePerSession: v } })} />
                <span>Oturum başına yalnızca bir kez göster</span>
              </label>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px", marginTop: "1rem" }}>
                <Icon name="ai" size={13} /> Önizlemede pop-up {cfg.popup.delaySec} saniye sonra açılır.
              </p>
            </div>
          ) : (
            <p style={{ color: "var(--text-muted)", fontSize: "14px", padding: "1rem", background: "var(--surface-muted)", borderRadius: "8px" }}>
              Pop-up kapalı. Açmak için sağdaki anahtarı kullanın.
            </p>
          )}
        </AdmCard>
      </div>

      <div style={{ position: "sticky", top: "1rem" }}>
        <AdmCard
          title="Canlı önizleme"
          desc="Değişiklikler gerçek siteye anında yansır"
          action={
            <a className="adm-btn adm-btn--ghost" href="/" target="_blank" rel="noopener noreferrer">
              <Icon name="external" size={15} /> Sekmede aç
            </a>
          }
        >
          <div className="adm-preview" style={{ background: "var(--surface-muted)", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border)" }}>
            <div className="adm-preview__bar" style={{ display: "flex", alignItems: "center", padding: "10px", background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56", marginRight: 6 }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e", marginRight: 6 }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f", marginRight: 12 }} />
              <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>marka.studio</span>
              <button
                className="adm-iconbtn"
                style={{ marginLeft: "auto" }}
                aria-label="Yenile"
                onClick={() => { if (previewRef.current) previewRef.current.src = previewRef.current.src; }}
              >
                ⟳
              </button>
            </div>
            <iframe ref={previewRef} src="/" title="Önizleme" style={{ width: "100%", height: "600px", border: 0, display: "block", background: "#fff" }} />
          </div>
        </AdmCard>
      </div>
    </div>
  );
}
