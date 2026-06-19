"use client";

import React, { useState } from "react";
import { AdmCard, Field, Switch, MkSelect } from "@/components/admin/ui";
import { Icon } from "@/components/admin/AdminIcons";

const TIMEZONES = ["Europe/Istanbul", "Europe/London", "UTC", "America/New_York", "Asia/Dubai"];
const LANG_OPTS = [{ value: "tr", label: "Türkçe" }, { value: "en", label: "English" }];

const SET_TABS = [
  { id: "brand", label: "Marka & Kimlik", icon: "settings" },
  { id: "logos", label: "Logolar & Favicon", icon: "media" },
  { id: "ai", label: "AI & API", icon: "ai" },
  { id: "seo", label: "SEO & Sosyal", icon: "seo" },
  { id: "regional", label: "Bölge & Dil", icon: "dashboard" },
  { id: "advanced", label: "Gelişmiş", icon: "settings" },
];

const LOGO_SLOTS = [
  { k: "wordmark", label: "Ana logo", hint: "Yatay wordmark · SVG/PNG", wide: true },
  { k: "dark", label: "Koyu zemin logosu", hint: "Açık renkli sürüm", wide: true },
  { k: "light", label: "Açık zemin logosu", hint: "Koyu renkli sürüm", wide: true },
  { k: "favicon", label: "Favicon", hint: "32×32 / 64×64", wide: false },
  { k: "appicon", label: "Uygulama ikonu", hint: "512×512 (PWA)", wide: false },
  { k: "og", label: "Sosyal paylaşım (OG)", hint: "1200×630", wide: true },
];

function LogoSlot({ slot, value, onChange }: any) {
  const ref = React.useRef<HTMLInputElement>(null);
  const onFile = (file: File | undefined) => { 
    if (!file || !file.type.startsWith("image/")) return; 
    const r = new FileReader(); 
    r.onload = e => onChange(e.target?.result); 
    r.readAsDataURL(file); 
  };
  return (
    <div className="set-logo">
      <div className={`img-up ${value ? "has" : ""} ${slot.wide ? "wide" : ""}`} style={{ aspectRatio: slot.wide ? "16 / 6" : "1 / 1" }}
        onClick={() => ref.current?.click()} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); onFile(e.dataTransfer.files?.[0]); }}>
        {value ? <img src={value} alt="" style={{ objectFit: "contain", padding: 8, width: "100%", height: "100%" }} /> : <div className="img-up__ph"><Icon name="media" size={20} /><span>Yükle</span></div>}
        {value && <button className="img-up__x" onClick={e => { e.stopPropagation(); onChange(null); }}><Icon name="close" size={13} /></button>}
        <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={e => onFile(e.target.files?.[0])} />
      </div>
      <div><b style={{ fontSize: "var(--fs-sm)", fontWeight: 600 }}>{slot.label}</b><br /><small>{slot.hint}</small></div>
    </div>
  );
}

function setDefaults() {
  return {
    name: "Marka Studio",
    tagline: "Dijital mükemmellik",
    email: "merhaba@marka.test",
    phone: "+90 555 123 4567",
    address: "Kolektif House, Levent, İstanbul",
    
    logos: {},
    
    openai: "",
    anthropic: "",
    gemini: "",
    autoTag: true,
    autoSEO: true,
    autoTrans: false,
    
    seoTitle: "Marka Studio | Dijital Ajans",
    seoDesc: "Markaları dijitalde yeni bir standarda taşıyoruz.",
    twitterUrl: "https://twitter.com/marka",
    igUrl: "https://instagram.com/marka",
    linkedinUrl: "https://linkedin.com/company/marka",
    
    lang: "tr",
    tz: "Europe/Istanbul",
    currency: "TRY",
    dateFmt: "DD MMM YYYY",
    
    maintenance: false,
    comments: false
  };
}

export function SettingsClient() {
  const [tab, setTab] = useState("brand");
  const [s, setS] = useState(setDefaults);
  const [toast, setToast] = useState(false);

  const set = (k: string, v: any) => setS({ ...s, [k]: v });
  const save = () => { setToast(true); setTimeout(() => setToast(false), 3000); };

  const Brand = (
    <AdmCard title="Marka & Kimlik" desc="Uygulama genelinde kullanılacak temel bilgiler">
      <div className="set-row">
        <Field label="Proje / Marka Adı"><input className="adm-input" value={s.name} onChange={e => set("name", e.target.value)} /></Field>
        <Field label="Slogan"><input className="adm-input" value={s.tagline} onChange={e => set("tagline", e.target.value)} /></Field>
      </div>
      <div className="set-row">
        <Field label="Genel E-posta"><input className="adm-input" value={s.email} onChange={e => set("email", e.target.value)} /></Field>
        <Field label="Telefon"><input className="adm-input" value={s.phone} onChange={e => set("phone", e.target.value)} /></Field>
      </div>
      <Field label="Açık Adres">
        <textarea className="adm-textarea" value={s.address} onChange={e => set("address", e.target.value)} />
      </Field>
    </AdmCard>
  );

  const Logos = (
    <AdmCard title="Logolar & İkonlar" desc="Site başlıkları, favicon ve sosyal paylaşımlar">
      <div className="set-box" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {LOGO_SLOTS.map(slot => (
          <LogoSlot 
            key={slot.k} 
            slot={slot} 
            value={s.logos[slot.k as keyof typeof s.logos]} 
            onChange={(v: any) => set("logos", { ...s.logos, [slot.k]: v })} 
          />
        ))}
      </div>
    </AdmCard>
  );

  const AI = (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <AdmCard title="API Anahtarları">
        <Field label="OpenAI API Key"><input className="adm-input" type="password" placeholder="sk-..." value={s.openai} onChange={e => set("openai", e.target.value)} /></Field>
        <Field label="Anthropic API Key"><input className="adm-input" type="password" placeholder="sk-ant-..." value={s.anthropic} onChange={e => set("anthropic", e.target.value)} /></Field>
        <Field label="Gemini API Key"><input className="adm-input" type="password" placeholder="AIzaSy..." value={s.gemini} onChange={e => set("gemini", e.target.value)} /></Field>
      </AdmCard>
      
      <AdmCard title="Otomasyon İzinleri">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <label className="swrow">
            <div className="swrow__txt"><b>Otomatik Etiketleme</b><span>Görsel yüklendiğinde AI ile etiket üret</span></div>
            <Switch on={s.autoTag} onChange={(v: boolean) => set("autoTag", v)} />
          </label>
          <label className="swrow">
            <div className="swrow__txt"><b>SEO Meta Üretimi</b><span>İçerik kaydedilirken boş meta alanlarını doldur</span></div>
            <Switch on={s.autoSEO} onChange={(v: boolean) => set("autoSEO", v)} />
          </label>
          <label className="swrow">
            <div className="swrow__txt"><b>Otomatik Çeviri</b><span>Yeni diller eklendiğinde içeriği taslak olarak çevir</span></div>
            <Switch on={s.autoTrans} onChange={(v: boolean) => set("autoTrans", v)} />
          </label>
        </div>
      </AdmCard>
    </div>
  );

  const SEOt = (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <AdmCard title="Varsayılan SEO">
        <Field label="Site Başlığı (Title)"><input className="adm-input" value={s.seoTitle} onChange={e => set("seoTitle", e.target.value)} /></Field>
        <Field label="Açıklama (Description)"><textarea className="adm-textarea" value={s.seoDesc} onChange={e => set("seoDesc", e.target.value)} /></Field>
      </AdmCard>
      <AdmCard title="Sosyal Medya Linkleri">
        <div className="set-row">
          <Field label="Twitter / X"><input className="adm-input" value={s.twitterUrl} onChange={e => set("twitterUrl", e.target.value)} /></Field>
          <Field label="Instagram"><input className="adm-input" value={s.igUrl} onChange={e => set("igUrl", e.target.value)} /></Field>
        </div>
        <div className="set-row">
          <Field label="LinkedIn"><input className="adm-input" value={s.linkedinUrl} onChange={e => set("linkedinUrl", e.target.value)} /></Field>
        </div>
      </AdmCard>
    </div>
  );

  const Regional = (
    <AdmCard title="Bölgesel Ayarlar">
      <div className="set-row">
        <Field label="Varsayılan Dil"><MkSelect value={s.lang} onChange={(v: string) => set("lang", v)} options={LANG_OPTS} /></Field>
        <Field label="Saat dilimi"><MkSelect value={s.tz} onChange={(v: string) => set("tz", v)} options={TIMEZONES.map(x => ({ value: x, label: x }))} /></Field>
      </div>
      <div className="set-row">
        <Field label="Para birimi"><MkSelect value={s.currency} onChange={(v: string) => set("currency", v)} options={[{ value: "TRY", label: "₺ TRY" }, { value: "USD", label: "$ USD" }, { value: "EUR", label: "€ EUR" }]} /></Field>
        <Field label="Tarih formatı"><MkSelect value={s.dateFmt} onChange={(v: string) => set("dateFmt", v)} options={["DD MMM YYYY", "DD.MM.YYYY", "YYYY-MM-DD"]} /></Field>
      </div>
    </AdmCard>
  );

  const Advanced = (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <AdmCard title="Sistem">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <label className="swrow">
            <div className="swrow__txt"><b>Bakım modu</b><span>Ziyaretçilere bakım sayfası gösterilir</span></div>
            <Switch on={s.maintenance} onChange={(v: boolean) => set("maintenance", v)} />
          </label>
          <label className="swrow">
            <div className="swrow__txt"><b>Yorumlara izin ver</b><span>Blog yazılarında yorum bölümü</span></div>
            <Switch on={s.comments} onChange={(v: boolean) => set("comments", v)} />
          </label>
        </div>
      </AdmCard>
      
      <div style={{ border: "1px solid #ff5f56", borderRadius: "12px", padding: "2rem", background: "rgba(255, 95, 86, 0.05)" }}>
        <h4 style={{ margin: "0 0 0.5rem 0", color: "#ff5f56", fontSize: "1.2rem" }}>Tehlikeli bölge</h4>
        <p style={{ margin: "0 0 1.5rem 0", color: "var(--text-subtle)" }}>Tüm tema ve ayarları fabrika değerlerine döndürür.</p>
        <button className="adm-btn adm-btn--danger" onClick={() => { setS(setDefaults()); save(); }}>Her şeyi sıfırla</button>
      </div>
    </div>
  );

  const PANES: any = { brand: Brand, logos: Logos, ai: AI, seo: SEOt, regional: Regional, advanced: Advanced };

  return (
    <div>
      <div className="set-main">
        <nav className="set-nav">
          {SET_TABS.map(t => (
            <button 
              key={t.id} 
              className={tab === t.id ? "on" : ""}
              onClick={() => setTab(t.id)}
            >
              <Icon name={t.icon} size={17} />
              {t.label}
            </button>
          ))}
        </nav>
        <div style={{ flex: 1, minWidth: 0 }}>
          {PANES[tab]}
          <div className="set-foot">
            <span>Değişiklikler otomatik saklanmaz — kaydetmeyi unutmayın</span>
            <button className="adm-btn adm-btn--ghost" onClick={() => setS(setDefaults())}>Geri al</button>
            <button className="adm-btn adm-btn--primary" onClick={save}>Değişiklikleri kaydet</button>
          </div>
        </div>
      </div>
      {toast && (
        <div style={{ position: "fixed", bottom: "2rem", right: "2rem", background: "#111", color: "#fff", padding: "1rem 1.5rem", borderRadius: "8px", display: "flex", alignItems: "center", gap: "0.5rem", boxShadow: "0 10px 30px rgba(0,0,0,0.2)", zIndex: 9999 }}>
          <span style={{ color: "var(--accent)" }}><Icon name="ai" size={16} fill /></span> Ayarlar kaydedildi
        </div>
      )}
    </div>
  );
}
