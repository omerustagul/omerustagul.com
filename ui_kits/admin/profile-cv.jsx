/* Admin "Profil / CV" module — edits the founder "Ben Kimim" page content via
   window.MarkaProfile. Split workspace: live preview (left) + modular form
   (right). Edits broadcast to the live page through the storage event. */
const { useState: useCvState, useRef: useCvRef } = React;
const CVP = () => window.MarkaProfile;

/* generic repeatable list of objects */
function Repeater({ items, onChange, makeNew, addLabel, render }) {
  const list = items || [];
  const set = (id, patch) => onChange(list.map(it => it.id === id ? Object.assign({}, it, patch) : it));
  const add = () => onChange([...list, Object.assign({ id: "r" + Date.now() + Math.random().toString(36).slice(2, 5) }, makeNew)]);
  const del = (id) => onChange(list.filter(it => it.id !== id));
  const move = (id, dir) => { const a = [...list]; const i = a.findIndex(x => x.id === id); const j = i + dir; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; onChange(a); };
  return (
    <div className="cvrep">
      {list.map((it, i) => (
        <div key={it.id} className="cvrep-item">
          <div className="cvrep-item__bar">
            <span className="cvrep-item__n">{String(i + 1).padStart(2, "0")}</span>
            <div className="adm-row-actions">
              <button className="adm-iconbtn" disabled={i === 0} onClick={() => move(it.id, -1)} aria-label="Yukarı" data-tip="Yukarı"><Icon name="chevron" size={13} style={{ transform: "rotate(180deg)" }} /></button>
              <button className="adm-iconbtn" disabled={i === list.length - 1} onClick={() => move(it.id, 1)} aria-label="Aşağı" data-tip="Aşağı"><Icon name="chevron" size={13} /></button>
              <button className="adm-iconbtn" onClick={() => del(it.id)} aria-label="Sil" data-tip="Sil"><Icon name="trash" size={13} /></button>
            </div>
          </div>
          {render(it, (patch) => set(it.id, patch))}
        </div>
      ))}
      <button className="adm-btn adm-btn--ghost" style={{ alignSelf: "flex-start" }} onClick={add}><Icon name="plus" size={14} /> {addLabel}</button>
    </div>
  );
}

function TagEditor({ tags, onChange }) {
  const [val, setVal] = useCvState("");
  const add = () => { const t = val.trim(); if (!t) return; onChange([...(tags || []), t]); setVal(""); };
  return (
    <div>
      <div className="cvtags">{(tags || []).map((t, i) => <span key={i} className="cvtag">{t}<button onClick={() => onChange(tags.filter((_, j) => j !== i))} aria-label="Kaldır"><Icon name="close" size={11} /></button></span>)}</div>
      <div className="ai-row" style={{ marginTop: ".6rem" }}>
        <input className="adm-input" value={val} onChange={e => setVal(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), add())} placeholder="Yetenek ekle ve Enter" />
        <button className="adm-btn adm-btn--ghost" onClick={add}><Icon name="plus" size={14} /></button>
      </div>
    </div>
  );
}

function ProfileCV() {
  const iframeRef = useCvRef(null);
  const [p, setP] = useCvState(CVP().get());
  const upd = (patch) => { const next = Object.assign({}, p, patch); setP(next); CVP().set(patch); };
  const I = ({ k, ph, area }) => area
    ? <textarea className="adm-textarea" style={{ minHeight: "7rem" }} value={p[k] || ""} onChange={e => upd({ [k]: e.target.value })} placeholder={ph} />
    : <input className="adm-input" value={p[k] || ""} onChange={e => upd({ [k]: e.target.value })} placeholder={ph} />;

  return (
    <div className="pw">
      <div className="ed-toolbar">
        <span className="adm-badge adm-badge--green">Ben Kimim — CV</span>
        <span className="sp" />
        <button className="adm-btn adm-btn--ghost" onClick={() => { if (confirm("Tüm CV içeriği varsayılana dönsün mü?")) { CVP().reset(); setP(CVP().get()); } }}>Sıfırla</button>
        <a className="adm-btn adm-btn--ghost" href="../../pages/profile.html" target="_blank" rel="noopener"><Icon name="external" size={15} /> Canlı gör</a>
      </div>

      <div className="pw-split">
        <div className="pw-preview">
          <div className="pw-frame">
            <iframe ref={iframeRef} src="../../pages/profile.html" title="CV önizleme" />
          </div>
        </div>

        <aside className="pw-panel">
          <div className="pw-section">
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
              <label className="swrow"><div className="swrow__txt"><b>Yeni projelere açık</b><span>Profilde rozet gösterir</span></div><Switch on={p.available} onChange={v => upd({ available: v })} /></label>
            </FormSection>

            <FormSection title="Hakkımda">
              <Field label="Biyografi / manifesto">{I({ k: "bio", ph: "Kendini anlat… (boş satırla paragraf)", area: true })}</Field>
            </FormSection>

            <FormSection title="Öne çıkan sayılar" hint="animasyonlu sayaçlar">
              <Repeater items={p.stats} onChange={v => upd({ stats: v })} addLabel="Sayı ekle" makeNew={{ num: 0, suffix: "", label: "" }}
                render={(it, set) => (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 1.4fr", gap: ".5rem" }}>
                    <input className="adm-input" type="number" value={it.num} onChange={e => set({ num: +e.target.value })} placeholder="240" />
                    <input className="adm-input" value={it.suffix} onChange={e => set({ suffix: e.target.value })} placeholder="+" />
                    <input className="adm-input" value={it.label} onChange={e => set({ label: e.target.value })} placeholder="Etiket" />
                  </div>
                )} />
            </FormSection>

            <FormSection title="Deneyim" hint="kariyer zaman tüneli">
              <Repeater items={p.experience} onChange={v => upd({ experience: v })} addLabel="Deneyim ekle" makeNew={{ role: "", company: "", period: "", desc: "", current: false }}
                render={(it, set) => (
                  <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                    <input className="adm-input" value={it.role} onChange={e => set({ role: e.target.value })} placeholder="Rol / unvan" />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".5rem" }}>
                      <input className="adm-input" value={it.company} onChange={e => set({ company: e.target.value })} placeholder="Şirket" />
                      <input className="adm-input" value={it.period} onChange={e => set({ period: e.target.value })} placeholder="2019 — Bugün" />
                    </div>
                    <textarea className="adm-textarea" style={{ minHeight: "3.5rem" }} value={it.desc} onChange={e => set({ desc: e.target.value })} placeholder="Kısa açıklama" />
                    <label className="cvmini-check"><input type="checkbox" checked={!!it.current} onChange={e => set({ current: e.target.checked })} /> Güncel pozisyon</label>
                  </div>
                )} />
            </FormSection>

            <FormSection title="Girişimler">
              <Repeater items={p.ventures} onChange={v => upd({ ventures: v })} addLabel="Girişim ekle" makeNew={{ name: "", role: "", period: "", desc: "", url: "" }}
                render={(it, set) => (
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
              <Repeater items={p.awards} onChange={v => upd({ awards: v })} addLabel="Ödül ekle" makeNew={{ title: "", org: "", year: "" }}
                render={(it, set) => (
                  <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 70px", gap: ".5rem" }}>
                    <input className="adm-input" value={it.title} onChange={e => set({ title: e.target.value })} placeholder="Ödül adı" />
                    <input className="adm-input" value={it.org} onChange={e => set({ org: e.target.value })} placeholder="Kurum" />
                    <input className="adm-input" value={it.year} onChange={e => set({ year: e.target.value })} placeholder="2025" />
                  </div>
                )} />
            </FormSection>

            <FormSection title="Yetenekler">
              <TagEditor tags={p.skills} onChange={v => upd({ skills: v })} />
            </FormSection>

            <FormSection title="Öne çıkan projeler">
              <Repeater items={p.featured} onChange={v => upd({ featured: v })} addLabel="Proje ekle" makeNew={{ title: "", year: "", href: "project.html" }}
                render={(it, set) => (
                  <div style={{ display: "grid", gridTemplateColumns: "1.6fr 70px 1fr", gap: ".5rem" }}>
                    <input className="adm-input" value={it.title} onChange={e => set({ title: e.target.value })} placeholder="Proje adı" />
                    <input className="adm-input" value={it.year} onChange={e => set({ year: e.target.value })} placeholder="2026" />
                    <input className="adm-input" value={it.href} onChange={e => set({ href: e.target.value })} placeholder="bağlantı" />
                  </div>
                )} />
            </FormSection>

            <FormSection title="Basında">
              <Repeater items={p.press} onChange={v => upd({ press: v })} addLabel="Yazı ekle" makeNew={{ title: "", outlet: "", year: "", url: "" }}
                render={(it, set) => (
                  <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                    <input className="adm-input" value={it.title} onChange={e => set({ title: e.target.value })} placeholder="Başlık" />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 1fr", gap: ".5rem" }}>
                      <input className="adm-input" value={it.outlet} onChange={e => set({ outlet: e.target.value })} placeholder="Yayın" />
                      <input className="adm-input" value={it.year} onChange={e => set({ year: e.target.value })} placeholder="2025" />
                      <input className="adm-input" value={it.url} onChange={e => set({ url: e.target.value })} placeholder="bağlantı" />
                    </div>
                  </div>
                )} />
            </FormSection>
          </div>
        </aside>
      </div>
    </div>
  );
}

Object.assign(window, { ProfileCV });
