"use client";

import React, { useState, useRef, useTransition } from "react";
import { ImageUpload, Field, Switch } from "@/components/admin/ui";
import { Icon } from "@/components/admin/AdminIcons";
import { saveProfile } from "@/lib/actions/profile";

function FormSection({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="pw-section">
      <div className="pw-section__head" style={{ marginBottom: "1.5rem" }}>
        <h4 style={{ margin: 0, fontSize: "var(--fs-base)", fontWeight: 600 }}>{title}</h4>
        {hint && <small style={{ color: "var(--text-muted)", marginLeft: "0.5rem" }}>{hint}</small>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {children}
      </div>
    </div>
  );
}

function TagEditor({ tags, onChange }: any) {
  const [val, setVal] = useState("");
  const add = () => { 
    const t = val.trim(); 
    if (!t) return; 
    onChange([...(tags || []), t]); 
    setVal(""); 
  };
  return (
    <div>
      <div className="cvtags">
        {(tags || []).map((t: string, i: number) => (
          <span key={i} className="cvtag">
            {t}
            <button onClick={() => onChange(tags.filter((_: any, j: number) => j !== i))} aria-label="Kaldır">
              <Icon name="close" size={11} />
            </button>
          </span>
        ))}
      </div>
      <div className="ai-row" style={{ marginTop: ".6rem", display: "flex", gap: ".5rem" }}>
        <input 
          className="adm-input" 
          value={val} 
          onChange={e => setVal(e.target.value)} 
          onKeyDown={e => e.key === "Enter" && (e.preventDefault(), add())} 
          placeholder="Yetenek ekle ve Enter" 
        />
        <button className="adm-btn adm-btn--ghost" onClick={add}><Icon name="plus" size={14} /></button>
      </div>
    </div>
  );
}

function Repeater({ items, onChange, makeNew, addLabel, render }: any) {
  const list = items || [];
  const set = (id: string, patch: any) => onChange(list.map((it: any) => it.id === id ? { ...it, ...patch } : it));
  const add = () => onChange([...list, { id: "r" + Date.now(), ...makeNew }]);
  const del = (id: string) => onChange(list.filter((it: any) => it.id !== id));
  const move = (id: string, dir: number) => { 
    const a = [...list]; 
    const i = a.findIndex(x => x.id === id); 
    const j = i + dir; 
    if (j < 0 || j >= a.length) return; 
    [a[i], a[j]] = [a[j], a[i]]; 
    onChange(a); 
  };

  return (
    <div className="cvrep">
      {list.map((it: any, i: number) => (
        <div key={it.id} className="cvrep-item">
          <div className="cvrep-item__bar">
            <span className="cvrep-item__n">{String(i + 1).padStart(2, "0")}</span>
            <div className="adm-row-actions">
              <button className="adm-iconbtn" disabled={i === 0} onClick={() => move(it.id, -1)} aria-label="Yukarı" data-tip="Yukarı">
                <Icon name="chevron" size={13} style={{ transform: "rotate(180deg)" }} />
              </button>
              <button className="adm-iconbtn" disabled={i === list.length - 1} onClick={() => move(it.id, 1)} aria-label="Aşağı" data-tip="Aşağı">
                <Icon name="chevron" size={13} />
              </button>
              <button className="adm-iconbtn" onClick={() => del(it.id)} aria-label="Sil" data-tip="Sil">
                <Icon name="trash" size={13} />
              </button>
            </div>
          </div>
          {render(it, (patch: any) => set(it.id, patch))}
        </div>
      ))}
      <button className="adm-btn adm-btn--ghost" style={{ alignSelf: "flex-start", marginTop: "0.5rem" }} onClick={add}>
        <Icon name="plus" size={14} /> {addLabel}
      </button>
    </div>
  );
}

const DEFAULT_PROFILE = {
  name: "Ömer Usta",
  role: "Kurucu & Kreatif Direktör",
  tagline: "Markaları dijitalde yeni bir standarda taşıyoruz.",
  location: "İstanbul, Türkiye",
  contactEmail: "hello@stepofstep.com",
  available: true,
  bio: "Kendini anlat...",
  stats: [
    { id: "s1", num: 240, suffix: "+", label: "Tamamlanan Proje" }
  ],
  experience: [
    { id: "e1", role: "Kurucu", company: "Step of Step", period: "2019 — Bugün", desc: "Ajans yönetimi...", current: true }
  ],
  ventures: [],
  awards: [],
  skills: ["React", "UI/UX", "Brand Identity"],
  featured: []
};

// Repeater items need a stable id; persisted data may lack them.
function withIds(arr: any, prefix: string) {
  return (Array.isArray(arr) ? arr : []).map((it: any, i: number) => (it && it.id ? it : { ...it, id: prefix + (i + 1) }));
}
function normalize(data: any) {
  const d = data && typeof data === "object" ? data : {};
  return {
    ...DEFAULT_PROFILE,
    ...d,
    stats: withIds(d.stats ?? DEFAULT_PROFILE.stats, "s"),
    experience: withIds(d.experience ?? DEFAULT_PROFILE.experience, "e"),
    ventures: withIds(d.ventures ?? DEFAULT_PROFILE.ventures, "v"),
    awards: withIds(d.awards ?? DEFAULT_PROFILE.awards, "a"),
    featured: withIds(d.featured ?? DEFAULT_PROFILE.featured, "f"),
    skills: Array.isArray(d.skills) ? d.skills : DEFAULT_PROFILE.skills,
  };
}

export function ProfileCVClient({ initial }: { initial?: any }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [p, setP] = useState<any>(() => (initial ? normalize(initial) : DEFAULT_PROFILE));
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);

  const upd = (patch: any) => setP({ ...p, ...patch });

  const save = () =>
    start(async () => {
      const res = await saveProfile(p);
      if (!res?.error) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        if (iframeRef.current) iframeRef.current.src = "/ben-kimim";
      }
    });

  const I = ({ k, ph, area }: any) => area
    ? <textarea className="adm-textarea" style={{ minHeight: "7rem" }} value={p[k] || ""} onChange={e => upd({ [k]: e.target.value })} placeholder={ph} />
    : <input className="adm-input" value={p[k] || ""} onChange={e => upd({ [k]: e.target.value })} placeholder={ph} />;

  return (
    <div className="pw">
      <div className="ed-toolbar">
        <span className="adm-badge adm-badge--green">Ben Kimim — CV</span>
        <span className="sp" />
        <button className="adm-btn adm-btn--ghost" onClick={() => { if (confirm("Tüm CV içeriği varsayılana dönsün mü?")) setP(DEFAULT_PROFILE); }}>Sıfırla</button>
        <a className="adm-btn adm-btn--ghost" href="/ben-kimim" target="_blank" rel="noopener"><Icon name="external" size={15} /> Canlı gör</a>
        {saved && <span className="adm-badge adm-badge--green" style={{ marginRight: ".5rem" }}>Kaydedildi ✓</span>}
        <button className="adm-btn adm-btn--primary" onClick={save} disabled={pending}>{pending ? "Kaydediliyor…" : "Kaydet"}</button>
      </div>

      <div className="pw-split">
        <div className="pw-preview">
          <div className="pw-frame">
            <iframe ref={iframeRef} src="/ben-kimim" title="CV önizleme" />
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", zIndex: -1 }}>
              <div style={{ textAlign: "center" }}>
                <Icon name="projects" size={32} />
                <div style={{ marginTop: "1rem" }}>Profil önizlemesi — Kaydet&apos;e bastıkça güncellenir</div>
              </div>
            </div>
          </div>
        </div>

        <aside className="pw-panel">
          <FormSection title="Künye" hint="fotoğraf + temel bilgiler">
            <ImageUpload label="Profil fotoğrafı" ratio="1/1" value={p.avatar} onChange={v => upd({ avatar: v })} hint="kare öneri" />
            <ImageUpload label="Kapak görseli" ratio="21/9" value={p.cover} onChange={v => upd({ cover: v })} hint="opsiyonel" />
            <Field label="Ad Soyad">{I({ k: "name", ph: "Adınız" })}</Field>
            <Field label="Unvan / Rol">{I({ k: "role", ph: "örn. Kurucu & Kreatif Direktör" })}</Field>
            <Field label="Slogan">{I({ k: "tagline", ph: "Tek cümlelik vaat" })}</Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
              <Field label="Konum">{I({ k: "location", ph: "İstanbul, Türkiye" })}</Field>
              <Field label="İletişim e-postası">{I({ k: "contactEmail", ph: "ad@marka.studio" })}</Field>
            </div>
            <label className="swrow" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--surface-muted)", padding: "1rem", borderRadius: "8px" }}>
              <div className="swrow__txt">
                <b style={{ fontSize: 14 }}>Yeni projelere açık</b><br/>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Profilde rozet gösterir</span>
              </div>
              <Switch on={p.available} onChange={v => upd({ available: v })} />
            </label>
          </FormSection>

          <FormSection title="Hakkımda">
            <Field label="Biyografi / manifesto">{I({ k: "bio", ph: "Kendini anlat… (boş satırla paragraf)", area: true })}</Field>
          </FormSection>

          <FormSection title="Öne çıkan sayılar" hint="animasyonlu sayaçlar">
            <Repeater items={p.stats} onChange={(v: any) => upd({ stats: v })} addLabel="Sayı ekle" makeNew={{ num: 0, suffix: "", label: "" }}
              render={(it: any, set: any) => (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 1.4fr", gap: ".5rem" }}>
                  <input className="adm-input" type="number" value={it.num} onChange={e => set({ num: +e.target.value })} placeholder="240" />
                  <input className="adm-input" value={it.suffix} onChange={e => set({ suffix: e.target.value })} placeholder="+" />
                  <input className="adm-input" value={it.label} onChange={e => set({ label: e.target.value })} placeholder="Etiket" />
                </div>
              )} />
          </FormSection>

          <FormSection title="Deneyim" hint="kariyer zaman tüneli">
            <Repeater items={p.experience} onChange={(v: any) => upd({ experience: v })} addLabel="Deneyim ekle" makeNew={{ role: "", company: "", period: "", desc: "", current: false }}
              render={(it: any, set: any) => (
                <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                  <input className="adm-input" value={it.role} onChange={e => set({ role: e.target.value })} placeholder="Rol / unvan" />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".5rem" }}>
                    <input className="adm-input" value={it.company} onChange={e => set({ company: e.target.value })} placeholder="Şirket" />
                    <input className="adm-input" value={it.period} onChange={e => set({ period: e.target.value })} placeholder="2019 — Bugün" />
                  </div>
                  <textarea className="adm-textarea" style={{ minHeight: "3.5rem" }} value={it.desc} onChange={e => set({ desc: e.target.value })} placeholder="Kısa açıklama" />
                  <label className="cvmini-check" style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                    <input type="checkbox" checked={!!it.current} onChange={e => set({ current: e.target.checked })} /> Güncel pozisyon
                  </label>
                </div>
              )} />
          </FormSection>

          <FormSection title="Girişimler">
            <Repeater items={p.ventures} onChange={(v: any) => upd({ ventures: v })} addLabel="Girişim ekle" makeNew={{ name: "", role: "", period: "", desc: "", url: "" }}
              render={(it: any, set: any) => (
                <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: ".5rem" }}>
                    <input className="adm-input" value={it.name} onChange={e => set({ name: e.target.value })} placeholder="İsim" />
                    <input className="adm-input" value={it.role} onChange={e => set({ role: e.target.value })} placeholder="Rol" />
                    <input className="adm-input" value={it.period} onChange={e => set({ period: e.target.value })} placeholder="Yıl" />
                  </div>
                  <textarea className="adm-textarea" style={{ minHeight: "3rem" }} value={it.desc} onChange={e => set({ desc: e.target.value })} placeholder="Açıklama" />
                  <input className="adm-input" value={it.url} onChange={e => set({ url: e.target.value })} placeholder="Bağlantı (opsiyonel)" />
                </div>
              )} />
          </FormSection>

          <FormSection title="Ödüller & başarılar">
            <Repeater items={p.awards} onChange={(v: any) => upd({ awards: v })} addLabel="Ödül ekle" makeNew={{ title: "", org: "", year: "" }}
              render={(it: any, set: any) => (
                <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 70px", gap: ".5rem" }}>
                  <input className="adm-input" value={it.title} onChange={e => set({ title: e.target.value })} placeholder="Ödül adı" />
                  <input className="adm-input" value={it.org} onChange={e => set({ org: e.target.value })} placeholder="Kurum" />
                  <input className="adm-input" value={it.year} onChange={e => set({ year: e.target.value })} placeholder="2025" />
                </div>
              )} />
          </FormSection>

          <FormSection title="Yetenekler">
            <TagEditor tags={p.skills} onChange={(v: any) => upd({ skills: v })} />
          </FormSection>

          <FormSection title="Öne çıkan projeler">
            <Repeater items={p.featured} onChange={(v: any) => upd({ featured: v })} addLabel="Proje ekle" makeNew={{ title: "", year: "", href: "project.html" }}
              render={(it: any, set: any) => (
                <div style={{ display: "grid", gridTemplateColumns: "1.6fr 70px 1fr", gap: ".5rem" }}>
                  <input className="adm-input" value={it.title} onChange={e => set({ title: e.target.value })} placeholder="Proje Adı" />
                  <input className="adm-input" value={it.year} onChange={e => set({ year: e.target.value })} placeholder="Yıl" />
                  <input className="adm-input" value={it.href} onChange={e => set({ href: e.target.value })} placeholder="URL (örn: projem)" />
                </div>
              )} />
          </FormSection>

        </aside>
      </div>
    </div>
  );
}
