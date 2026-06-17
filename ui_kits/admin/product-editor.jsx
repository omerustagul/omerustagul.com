/* Comprehensive market product editor — cover + gallery, type/format, pricing,
   description, "what's included" list, specs (format/compatibility/license),
   with a live product-detail preview. Reuses FormSection/uid/renderRich. */
const { useState: usePrState } = React;
const PR = () => window.MK_ADMIN;

const PR_TYPES = ["UI Kit", "Şablon", "İkon Seti", "Font", "Eklenti", "Mockup"];
const PR_FORMATS = ["Figma", "Sketch", "HTML/CSS", "React", "PNG/SVG", "PSD"];
const PR_LICENSES = ["Kişisel", "Ticari", "Genişletilmiş"];

/* key → value spec rows */
function SpecRows({ items = [], onChange }) {
  const set = (id, k, v) => onChange(items.map(s => s.id === id ? { ...s, [k]: v } : s));
  const add = () => onChange([...items, { id: uid(), k: "", v: "" }]);
  const del = (id) => onChange(items.filter(s => s.id !== id));
  return (
    <div className="specs">
      {items.map(s => (
        <div key={s.id} className="specs__row">
          <input className="adm-input" value={s.k} onChange={e => set(s.id, "k", e.target.value)} placeholder="Özellik (örn. Bileşen)" />
          <input className="adm-input" value={s.v} onChange={e => set(s.id, "v", e.target.value)} placeholder="Değer (örn. 240+)" />
          <button className="adm-iconbtn" onClick={() => del(s.id)} aria-label="Sil"><Icon name="close" size={13} /></button>
        </div>
      ))}
      <button className="adm-btn adm-btn--ghost" style={{ alignSelf: "flex-start" }} onClick={add}><Icon name="plus" size={14} /> Özellik ekle</button>
    </div>
  );
}

function ProductEditor({ product, onClose, onSave }) {
  const init = product && product.fields ? product : {
    id: product && product.id,
    status: (product && product.status) || "Taslak",
    fields: product ? { title: product.title, seller: product.seller, price: product.price } : { currency: "$", type: "UI Kit" },
  };
  const [data, setData] = usePrState(init);
  const [aiBusy, setAiBusy] = usePrState(false);
  const f = data.fields;
  const set = (k, v) => setData(d => ({ ...d, fields: { ...d.fields, [k]: v } }));

  const aiWrite = async () => {
    setAiBusy(true);
    const out = await PR().ai(`"${f.title || "Dijital ürün"}" adlı bir ${f.type || "dijital ürün"} için Türkçe, satışa yönelik kısa bir ürün açıklaması yaz. 1–2 paragraf, net ve abartısız.`, () => PR().SIM.blog(f.title || "Ürün"));
    set("desc", out.replace(/^#.*$/m, "").replace(/ÖZET[\s\S]*$/i, "").trim());
    setAiBusy(false);
  };

  const save = (status) => {
    onSave({
      id: data.id, status, fields: f,
      title: f.title || "Başlıksız ürün", seller: f.seller || "—",
      sales: product && product.sales ? product.sales : 0,
      price: (f.price ? (f.currency || "$") + " " + f.price : "—"),
      type: f.type || "Dijital Ürün", cover: f.cover || null,
    });
  };

  const incl = f.includes || [];
  return (
    <div>
      <div className="ed-toolbar">
        <button className="ed-back" onClick={onClose}><Icon name="close" size={14} /> Market'e dön</button>
        <span className="adm-badge adm-badge--green">Ürün düzenleyici</span>
        <span className="sp" />
        <MkSelect width="150px" value={data.status} onChange={v => setData(d => ({ ...d, status: v }))} options={["Taslak", "Arşiv", "Yayında"]} />
        <button className="adm-btn adm-btn--ghost" onClick={() => save("Taslak")}>Taslağa kaydet</button>
        <button className="adm-btn adm-btn--primary" onClick={() => save("Yayında")}><Icon name="eye" size={15} /> Yayınla</button>
      </div>

      <div className="editor">
        <div className="editor__form">
          <FormSection title="Künye" hint="kapak + temel bilgiler">
            <ImageUpload label="Ürün kapağı" ratio="4/3" value={f.cover} onChange={v => set("cover", v)} hint="öneri 1600×1200" />
            <Field label="Ürün adı"><input className="adm-input" style={{ fontSize: "1.1rem", fontWeight: 600 }} value={f.title || ""} onChange={e => set("title", e.target.value)} placeholder="örn. Grid UI Kit" /></Field>
            <Field label="Kısa tanıtım"><input className="adm-input" value={f.tagline || ""} onChange={e => set("tagline", e.target.value)} placeholder="Tek cümlelik vaat" /></Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
              <Field label="Tür"><MkSelect value={f.type || "UI Kit"} onChange={v => set("type", v)} options={PR_TYPES} /></Field>
              <Field label="Satıcı"><input className="adm-input" value={f.seller || ""} onChange={e => set("seller", e.target.value)} placeholder="Satıcı / stüdyo" /></Field>
            </div>
            <Field label="Format"><MkSelect value={f.format || ""} onChange={v => set("format", v)} placeholder="Seçin…" options={PR_FORMATS} /></Field>
          </FormSection>

          <FormSection title="Fiyatlandırma & lisans">
            <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr", gap: "var(--space-4)" }}>
              <Field label="Para"><MkSelect value={f.currency || "$"} onChange={v => set("currency", v)} options={["$", "₺", "€"]} /></Field>
              <Field label="Fiyat"><input className="adm-input" value={f.price || ""} onChange={e => set("price", e.target.value)} placeholder="59" /></Field>
              <Field label="Lisans"><MkSelect value={f.license || "Ticari"} onChange={v => set("license", v)} options={PR_LICENSES} /></Field>
            </div>
          </FormSection>

          <FormSection title="Açıklama" hint="ürünün satış metni">
            <div className="adm-field">
              <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>Ürün açıklaması
                <button className="adm-btn adm-btn--ghost" style={{ padding: ".3rem .7rem" }} disabled={aiBusy} onClick={aiWrite}>{aiBusy ? <><span className="ai-spinner" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} /> …</> : <><Icon name="ai" size={13} /> AI ile yaz</>}</button>
              </label>
              <textarea className="adm-textarea" style={{ minHeight: "9rem" }} value={f.desc || ""} onChange={e => set("desc", e.target.value)} placeholder="Ürün ne işe yarar, kimler için? Boş satırla paragraf, ## ile alt başlık." />
            </div>
          </FormSection>

          <FormSection title="Pakette neler var?" hint="ürünle birlikte gelenler">
            <BulletList items={incl} onChange={v => set("includes", v)} placeholder="örn. 48 hazır bileşen" />
          </FormSection>

          <FormSection title="Teknik özellikler">
            <SpecRows items={f.specs || []} onChange={v => set("specs", v)} />
          </FormSection>

          <FormSection title="Galeri">
            <GalleryUpload label="Önizleme görselleri" items={f.gallery || []} onChange={v => set("gallery", v)} />
          </FormSection>
        </div>

        <div className="editor__preview">
          <div className="prev-frame">
            <div className="prev-frame__bar"><span className="adm-preview__dot" /><span className="adm-preview__dot" /><span className="adm-preview__dot" /><span style={{ marginLeft: 8 }}>canlı önizleme — ürün detayı</span></div>
            <div className="prev-scroll"><article className="pv">
              <span className="kicker">{f.type || "Dijital Ürün"}{f.format ? ` · ${f.format}` : ""}</span>
              <h1>{f.title || "Ürün adı"}</h1>
              {f.tagline && <p className="lead">{f.tagline}</p>}
              <div className="pv__cover" style={{ aspectRatio: "4/3" }}>{f.cover ? <img src={f.cover} alt="" /> : <div className="pv__placeholder">ÜRÜN KAPAĞI</div>}</div>
              <div className="pv-course__bar">
                <div className="pv-course__price"><span className="now">{f.price ? (f.currency || "$") + " " + f.price : "Ücretsiz"}</span></div>
                <button className="btn btn--primary" style={{ pointerEvents: "none" }}>Satın Al</button>
              </div>
              <dl className="pv__meta">
                <div><dt>Satıcı</dt><dd>{f.seller || "—"}</dd></div>
                <div><dt>Format</dt><dd>{f.format || "—"}</dd></div>
                <div><dt>Lisans</dt><dd>{f.license || "—"}</dd></div>
                <div><dt>Tür</dt><dd>{f.type || "—"}</dd></div>
              </dl>
              {f.desc && <div style={{ display: "flex", flexDirection: "column", gap: ".9rem" }}>{renderRich(f.desc)}</div>}

              {incl.filter(i => i.text).length > 0 && (
                <div className="pv__block"><span className="kicker">Pakette</span>
                  <ul className="pv-checklist">{incl.filter(i => i.text).map(i => <li key={i.id}><span className="ck">✓</span>{i.text}</li>)}</ul>
                </div>
              )}

              {(f.specs || []).filter(s => s.k).length > 0 && (
                <div className="pv__block"><span className="kicker">Özellikler</span>
                  <dl className="pv-specs">{f.specs.filter(s => s.k).map(s => <div key={s.id}><dt>{s.k}</dt><dd>{s.v}</dd></div>)}</dl>
                </div>
              )}

              {f.gallery && f.gallery.length > 0 && <div className="pv__gal">{f.gallery.map(g => <img key={g.id} src={g.src} alt="" />)}</div>}
            </article></div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ProductEditor });
