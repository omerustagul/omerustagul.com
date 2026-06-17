/* Comprehensive, modular Genel Ayarlar — tabbed: Marka & Kimlik, Logolar &
   Favicon, AI & API, SEO & Sosyal, Bölge & Dil, Gelişmiş. */
const { useState: useSetState } = React;

const TIMEZONES = (() => { try { return Intl.supportedValuesOf("timeZone"); } catch (e) { return ["Europe/Istanbul", "Europe/London", "UTC", "America/New_York", "America/Los_Angeles", "Asia/Dubai", "Asia/Tokyo", "Australia/Sydney"]; } })();
const LANG_OPTS = (window.MarkaI18n ? window.MarkaI18n.LANGS.map(l => ({ value: l.id, label: `${l.flag}  ${l.label}` })) : [{ value: "tr", label: "Türkçe" }, { value: "en", label: "English" }]);

const SET_KEY = "mk-settings";
function setDefaults() {
  return {
    brandName: (window.MARKA && window.MARKA.BRAND_NAME) || "Marka",
    slogan: (window.MARKA && window.MARKA.BRAND_SLOGAN) || "Dijitalde yeni standart.",
    email: "merhaba@marka.studio", phone: "+90 212 000 00 00", address: "Bomonti, İstanbul",
    logos: {}, // dataURLs, not persisted
    aiProvider: "anthropic", aiModel: "claude-haiku-4-5", aiMaxTokens: 1024, aiTemp: 0.7, aiBudget: "500",
    metaTitle: "Marka — Dijitalde yeni standart", metaDesc: "Markaları geleceğe taşıyan ödüllü kreatif stüdyo.",
    analytics: "", ogImage: null,
    lang: (window.MarkaI18n ? window.MarkaI18n.get() : "tr"), tz: "Europe/Istanbul", currency: "TRY", dateFmt: "DD MMM YYYY",
    maintenance: false, comments: true, indexing: true,
  };
}
function setLoad() { try { return Object.assign(setDefaults(), JSON.parse(localStorage.getItem(SET_KEY) || "{}")); } catch (e) { return setDefaults(); } }
function setPersist(s) { const { logos, ogImage, apiKey, ...rest } = s; try { localStorage.setItem(SET_KEY, JSON.stringify(rest)); } catch (e) {} }

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

function LogoSlot({ slot, value, onChange }) {
  const ref = React.useRef();
  const onFile = (file) => { if (!file || !file.type.startsWith("image/")) return; const r = new FileReader(); r.onload = e => onChange(e.target.result); r.readAsDataURL(file); };
  return (
    <div className="set-logo">
      <div className={`img-up ${value ? "has" : ""} ${slot.wide ? "wide" : ""}`} style={{ aspectRatio: slot.wide ? "16 / 6" : "1 / 1" }}
        onClick={() => { if (window.openImagePicker) window.openImagePicker(onChange); else ref.current.click(); }} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); onFile(e.dataTransfer.files[0]); }}>
        {value ? <img src={value} alt="" style={{ objectFit: "contain", padding: 8 }} /> : <div className="img-up__ph"><Icon name="media" size={20} /><span style={{ fontSize: 12 }}>Yükle</span></div>}
        {value && <button className="img-up__x" onClick={e => { e.stopPropagation(); onChange(null); }}><Icon name="close" size={13} /></button>}
        <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={e => onFile(e.target.files[0])} />
      </div>
      <div><b style={{ fontSize: "var(--fs-sm)", fontWeight: 600 }}>{slot.label}</b><br /><small>{slot.hint}</small></div>
    </div>
  );
}

function Settings() {
  const [tab, setTab] = useSetState("brand");
  const [s, setS] = useSetState(setLoad());
  const [toast, setToast] = useSetState(false);
  const [showKey, setShowKey] = useSetState(false);
  const [conn, setConn] = useSetState(null); // null|'testing'|'ok'
  const set = (k, v) => setS(x => ({ ...x, [k]: v }));
  const setLogo = (k, v) => setS(x => ({ ...x, logos: { ...x.logos, [k]: v } }));
  const save = () => { setPersist(s); setToast(true); setTimeout(() => setToast(false), 2200); };
  const testConn = () => { setConn("testing"); setTimeout(() => setConn("ok"), 1100); };

  const Brand = (
    <div className="set-stack">
      <AdmCard title="Marka kimliği" desc="brand/brand.js ile senkron — tek noktadan yönetim">
        <div className="set-row">
          <Field label="Marka adı"><input className="adm-input" value={s.brandName} onChange={e => set("brandName", e.target.value)} /></Field>
          <Field label="Slogan"><input className="adm-input" value={s.slogan} onChange={e => set("slogan", e.target.value)} /></Field>
        </div>
        <div className="set-row">
          <Field label="İletişim e-postası"><input className="adm-input" value={s.email} onChange={e => set("email", e.target.value)} /></Field>
          <Field label="Telefon"><input className="adm-input" value={s.phone} onChange={e => set("phone", e.target.value)} /></Field>
        </div>
        <Field label="Adres"><input className="adm-input" value={s.address} onChange={e => set("address", e.target.value)} /></Field>
      </AdmCard>
      <AdmCard title="Sosyal hesaplar">
        <div className="set-row">
          {["Instagram", "LinkedIn", "X", "YouTube", "Dribbble", "Behance"].map(n => (
            <Field key={n} label={n}><input className="adm-input" placeholder={`marka.studio/${n.toLowerCase()}`} defaultValue="" /></Field>
          ))}
        </div>
      </AdmCard>
    </div>
  );

  const Logos = (
    <AdmCard title="Logolar & Favicon" desc="Tüm logo çeşitlerini ve ikonları buradan yönet">
      <div className="set-logos">
        {LOGO_SLOTS.map(slot => <LogoSlot key={slot.k} slot={slot} value={s.logos[slot.k]} onChange={v => setLogo(slot.k, v)} />)}
      </div>
      <span className="adm-skeleton-note"><Icon name="media" size={12} /> Önerilen: vektör (SVG) logo + 512px PNG favicon. Yüklenenler bu oturumda saklanır.</span>
    </AdmCard>
  );

  const AI = (
    <div className="set-stack">
      <AdmCard title="AI Sağlayıcı & API" desc={window.MK_ADMIN.aiAvailable ? "Yerleşik AI aktif — anahtar gerekmeden çalışır" : "Simülasyon modu"}>
        <div className="set-row">
          <Field label="Sağlayıcı"><MkSelect value={s.aiProvider} onChange={v => set("aiProvider", v)} options={[{ value: "anthropic", label: "Anthropic (Claude)" }, { value: "openai", label: "OpenAI" }, { value: "custom", label: "Özel uç nokta" }]} /></Field>
          <Field label="Model"><MkSelect value={s.aiModel} onChange={v => set("aiModel", v)} options={["claude-haiku-4-5", "claude-sonnet-4-5", "gpt-4o-mini"]} /></Field>
        </div>
        <Field label="API anahtarı">
          <div className="key-input">
            <input className="adm-input" type={showKey ? "text" : "password"} placeholder="sk-••••••••••••••••••••" value={s.apiKey || ""} onChange={e => set("apiKey", e.target.value)} />
            <button className="adm-btn adm-btn--ghost" onClick={() => setShowKey(v => !v)}><Icon name="eye" size={15} /></button>
            <button className="adm-btn adm-btn--ghost" onClick={testConn}>{conn === "testing" ? <><span className="ai-spinner" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} /> Test…</> : "Bağlantıyı test et"}</button>
          </div>
        </Field>
        {conn === "ok" && <span className="conn-ok"><Icon name="ai" size={13} fill /> Bağlantı başarılı — model yanıt veriyor</span>}
        <div className="set-row" style={{ marginTop: 12 }}>
          <Field label={`Yaratıcılık (temperature) — ${s.aiTemp}`}>
            <div className="range-row"><input type="range" min="0" max="1" step="0.1" value={s.aiTemp} onChange={e => set("aiTemp", +e.target.value)} style={{ accentColor: "var(--accent)", flex: 1 }} /><output>{s.aiTemp}</output></div>
          </Field>
          <Field label="Maks. token"><input className="adm-input" type="number" value={s.aiMaxTokens} onChange={e => set("aiMaxTokens", +e.target.value)} /></Field>
        </div>
        <Field label="Aylık bütçe (USD)"><input className="adm-input" value={s.aiBudget} onChange={e => set("aiBudget", e.target.value)} /></Field>
      </AdmCard>
      <AdmCard title="AI özellikleri">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[["Blog yazı asistanı", true], ["SEO meta üretimi", true], ["Haftalık raporlar", true], ["Görsel alt-metin (alt text)", false]].map(([l, d]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><span style={{ fontSize: "var(--fs-sm)" }}>{l}</span><Switch on={d} onChange={() => { }} /></div>
          ))}
        </div>
      </AdmCard>
    </div>
  );

  const SEOt = (
    <AdmCard title="SEO & Sosyal varsayılanları">
      <Field label="Varsayılan başlık (title)"><input className="adm-input" value={s.metaTitle} onChange={e => set("metaTitle", e.target.value)} /></Field>
      <Field label="Varsayılan açıklama (meta description)"><textarea className="adm-textarea" style={{ minHeight: "4rem" }} value={s.metaDesc} onChange={e => set("metaDesc", e.target.value)} /></Field>
      <div className="set-row">
        <Field label="Analytics ID"><input className="adm-input" placeholder="G-XXXXXXX" value={s.analytics} onChange={e => set("analytics", e.target.value)} /></Field>
        <Field label="Arama motoru indeksleme"><div style={{ paddingTop: 6 }}><Switch on={s.indexing} onChange={v => set("indexing", v)} /></div></Field>
      </div>
      <LogoSlot slot={{ k: "og", label: "Varsayılan paylaşım görseli (OG)", hint: "1200×630", wide: true }} value={s.ogImage} onChange={v => set("ogImage", v)} />
    </AdmCard>
  );

  const Regional = (
    <AdmCard title="Bölge & Dil">
      <div className="set-row">
        <Field label="Dil"><MkSelect value={s.lang} onChange={v => { set("lang", v); if (window.MarkaI18n) window.MarkaI18n.set(v); }} options={LANG_OPTS} /></Field>
        <Field label="Saat dilimi"><MkSelect value={s.tz} onChange={v => set("tz", v)} options={TIMEZONES} searchable /></Field>
      </div>
      <div className="set-row">
        <Field label="Para birimi"><MkSelect value={s.currency} onChange={v => set("currency", v)} options={[{ value: "TRY", label: "₺ TRY" }, { value: "USD", label: "$ USD" }, { value: "EUR", label: "€ EUR" }]} /></Field>
        <Field label="Tarih formatı"><MkSelect value={s.dateFmt} onChange={v => set("dateFmt", v)} options={["DD MMM YYYY", "DD.MM.YYYY", "YYYY-MM-DD"]} /></Field>
      </div>
    </AdmCard>
  );

  const Advanced = (
    <div className="set-stack">
      <AdmCard title="Sistem">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><div><b style={{ fontWeight: 600, fontSize: "var(--fs-sm)" }}>Bakım modu</b><br /><small style={{ color: "var(--text-muted)", fontSize: "var(--fs-xs)" }}>Ziyaretçilere bakım sayfası gösterilir</small></div><Switch on={s.maintenance} onChange={v => set("maintenance", v)} /></div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><div><b style={{ fontWeight: 600, fontSize: "var(--fs-sm)" }}>Yorumlara izin ver</b><br /><small style={{ color: "var(--text-muted)", fontSize: "var(--fs-xs)" }}>Blog yazılarında yorum bölümü</small></div><Switch on={s.comments} onChange={v => set("comments", v)} /></div>
        </div>
        <div style={{ display: "flex", gap: ".6rem", marginTop: 18 }}>
          <button className="adm-btn adm-btn--ghost">Önbelleği temizle</button>
          <button className="adm-btn adm-btn--ghost">Veriyi dışa aktar (JSON)</button>
        </div>
      </AdmCard>
      <div className="danger">
        <div><h4>Tehlikeli bölge</h4><p>Tüm tema ve ayarları fabrika değerlerine döndürür.</p></div>
        <button className="adm-btn adm-btn--danger" onClick={() => { window.MarkaTheme.reset(); localStorage.removeItem(SET_KEY); setS(setDefaults()); setToast(true); setTimeout(() => setToast(false), 2200); }}>Her şeyi sıfırla</button>
      </div>
    </div>
  );

  const PANES = { brand: Brand, logos: Logos, ai: AI, seo: SEOt, regional: Regional, advanced: Advanced };

  return (
    <div>
      <div className="set">
        <nav className="set-nav">
          {SET_TABS.map(t => (
            <button key={t.id} className={tab === t.id ? "on" : ""} onClick={() => setTab(t.id)}><span className="adm-nav__ic"><Icon name={t.icon} size={17} /></span>{t.label}</button>
          ))}
        </nav>
        <div>
          {PANES[tab]}
          <div className="set-save">
            <span className="hint">Değişiklikler otomatik saklanmaz — kaydetmeyi unutmayın</span>
            <button className="adm-btn adm-btn--ghost" onClick={() => setS(setLoad())}>Geri al</button>
            <button className="adm-btn adm-btn--primary" onClick={save}>Değişiklikleri kaydet</button>
          </div>
        </div>
      </div>
      {toast && <div className="set-toast"><span className="ok"><Icon name="ai" size={14} fill /></span> Ayarlar kaydedildi</div>}
    </div>
  );
}

Object.assign(window, { Settings });
