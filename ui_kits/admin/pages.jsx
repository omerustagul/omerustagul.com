/* Admin "Sayfalar" module — every page opens in a split workspace: a LIVE
   preview on the left (click any highlighted text to edit it in place) and a
   side panel on the right. The homepage panel also manages sections (reorder,
   show/hide, add Image/Video/Text blocks). Drives the live site via
   window.MarkaPages + postMessage two-way text sync. */
const { useState: usePgState, useRef: usePgRef, useEffect: usePgEffect } = React;
const PG = () => window.MarkaPages;

function previewURL(meta) {
  return (meta.id === "home" ? "../website/index.html" : "../../pages/" + meta.path) + "?edit=1";
}

function PagesM() {
  const [page, setPage] = usePgState(null);
  if (page) return <PageWorkspace meta={PG().getPage(page)} onBack={() => setPage(null)} />;
  return (
    <AdmCard title="Sayfalar" desc={`${PG().PAGES.length} sayfa · canlı önizleme ile düzenle`}>
      <table className="adm-table">
        <thead><tr><th>Sayfa</th><th>URL</th><th>Düzenleme</th><th></th></tr></thead>
        <tbody>
          {PG().PAGES.map(p => (
            <tr key={p.id}>
              <td className="ti">{p.label}</td>
              <td style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>/{p.path}</td>
              <td><Badge tone={p.editable === "sections" ? "green" : "muted"}>{p.editable === "sections" ? "Bölümler + metin" : "Metin"}</Badge></td>
              <td><div className="adm-row-actions"><button className="adm-btn adm-btn--primary" onClick={() => setPage(p.id)}><Icon name="edit" size={14} /> Tüm bölümleri düzenle</button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdmCard>
  );
}

const DEVICES = [{ id: "desk", label: "Masaüstü", icon: "monitor", w: "100%" }, { id: "tab", label: "Tablet", icon: "tablet", w: "820px" }, { id: "mob", label: "Mobil", icon: "mobile", w: "390px" }];

function PageWorkspace({ meta, onBack }) {
  const iframeRef = usePgRef(null);
  const [fields, setFields] = usePgState([]);
  const [device, setDevice] = usePgState("desk");
  const [tab, setTab] = usePgState(meta.id === "home" ? "sections" : "text");
  const [, force] = usePgState(0);
  const rerender = () => force(n => n + 1);

  usePgEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === "mk-fields" && d.pageId === meta.id) setFields(d.fields);
      else if (d.type === "mk-field-change") setFields(fs => fs.map(f => f.key === d.key ? { ...f, text: d.text } : f));
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [meta.id]);

  const enterEdit = () => {
    const w = iframeRef.current && iframeRef.current.contentWindow;
    if (w) { w.postMessage("mk-edit-on", "*"); w.postMessage({ type: "mk-request-fields" }, "*"); }
  };
  const setField = (key, value) => {
    setFields(fs => fs.map(f => f.key === key ? { ...f, text: value } : f));
    const w = iframeRef.current && iframeRef.current.contentWindow;
    if (w) w.postMessage({ type: "mk-set", key, value }, "*");
  };
  const dev = DEVICES.find(d => d.id === device);

  return (
    <div className="pw">
      <div className="ed-toolbar">
        <button className="ed-back" onClick={onBack}><Icon name="chevron" size={14} style={{ transform: "rotate(90deg)" }} /> Sayfalar</button>
        <span className="adm-badge adm-badge--green">{meta.label}</span>
        <span className="sp" />
        <div className="adm-seg pw-dev">
          {DEVICES.map(d => <button key={d.id} className={device === d.id ? "on" : ""} onClick={() => setDevice(d.id)} data-tip={d.label} aria-label={d.label}><Icon name={d.icon} size={16} /></button>)}
        </div>
        <a className="adm-btn adm-btn--ghost" href={previewURL(meta).replace("?edit=1", "")} target="_blank" rel="noopener"><Icon name="external" size={15} /> Canlı gör</a>
      </div>

      <div className="pw-split">
        <div className="pw-preview">
          <div className="pw-frame" style={{ maxWidth: dev.w }}>
            <iframe ref={iframeRef} src={previewURL(meta)} title="Önizleme" onLoad={enterEdit} />
          </div>
        </div>

        <aside className="pw-panel">
          {meta.id === "home" && (
            <div className="pw-tabs">
              <button className={tab === "sections" ? "on" : ""} onClick={() => setTab("sections")}>Bölümler</button>
              <button className={tab === "text" ? "on" : ""} onClick={() => setTab("text")}>Metinler</button>
            </div>
          )}

          {meta.id === "home" && tab === "sections"
            ? <SectionPanel onChanged={rerender} />
            : <TextPanel meta={meta} fields={fields} onSet={setField} onRefresh={enterEdit} />}
        </aside>
      </div>
    </div>
  );
}

/* ---- text fields panel (all pages) ---- */
function TextPanel({ meta, fields, onSet, onRefresh }) {
  return (
    <div className="pw-section">
      <div className="pw-hint"><Icon name="ai" size={14} /> Önizlemede <b>vurgulanan</b> metne tıklayıp doğrudan yazabilir, ya da aşağıdaki alanlardan düzenleyebilirsin. Değişiklikler canlı sitede anında görünür.</div>
      {fields.length === 0 ? (
        <div className="adm-empty" style={{ padding: "var(--space-6)" }}><p>Önizleme yükleniyor…</p><button className="adm-btn adm-btn--ghost" style={{ marginTop: 10 }} onClick={onRefresh}>Yenile</button></div>
      ) : (
        <div className="pw-fields">
          {fields.map(f => (
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

/* ---- homepage section manager (reorder / hide / add) ---- */
const SECTION_TYPES = [
  { type: "image", label: "Görsel bölümü", icon: "media", desc: "Tam genişlik görsel" },
  { type: "video", label: "Video bölümü", icon: "media", desc: "Yükle veya embed (YouTube/Vimeo)" },
  { type: "text", label: "Metin bölümü", icon: "pages", desc: "Başlık + paragraf" },
];

function SectionPanel({ onChanged }) {
  const [, force] = usePgState(0);
  const [addOpen, setAddOpen] = usePgState(false);
  const [editing, setEditing] = usePgState(null);
  const [dragId, setDragId] = usePgState(null);
  const [overIdx, setOverIdx] = usePgState(null);
  const act = (fn) => { fn(); force(n => n + 1); onChanged && onChanged(); };
  const sections = PG().homeSections();
  const editSec = sections.find(s => s.id === editing && s.kind === "custom");

  const onDrop = (toIdx) => {
    if (dragId == null) return;
    act(() => PG().reorder(dragId, toIdx));
    setDragId(null); setOverIdx(null);
  };

  return (
    <div className="pw-section">
      <div className="pw-section__head">
        <span className="pw-section__title">Bölümler</span>
        <button className="adm-btn adm-btn--primary" style={{ padding: ".4rem .8rem" }} onClick={() => setAddOpen(true)}><Icon name="plus" size={14} /> Ekle</button>
      </div>
      <ul className="seclist" onDragOver={e => e.preventDefault()}>
        {sections.map((s, i) => (
          <li key={s.id}
            className={`seclist__row ${s.hidden ? "is-hidden" : ""} ${dragId === s.id ? "is-dragging" : ""} ${overIdx === i && dragId != null && dragId !== s.id ? "is-over" : ""}`}
            draggable
            onDragStart={e => { setDragId(s.id); e.dataTransfer.effectAllowed = "move"; try { e.dataTransfer.setData("text/plain", s.id); } catch (err) {} }}
            onDragEnter={() => setOverIdx(i)}
            onDragOver={e => { e.preventDefault(); setOverIdx(i); }}
            onDrop={e => { e.preventDefault(); onDrop(i); }}
            onDragEnd={() => { setDragId(null); setOverIdx(null); }}>
            <span className="seclist__handle" aria-label="Sürükle"><Icon name="grip" size={15} /></span>
            <span className="seclist__order">{String(i + 1).padStart(2, "0")}</span>
            <span className={`seclist__ic ${s.kind === "custom" ? "is-custom" : ""}`}><Icon name={s.kind === "custom" ? (s.type === "video" ? "media" : s.type === "text" ? "pages" : "media") : "projects"} size={15} /></span>
            <div className="seclist__meta">
              <b>{s.kind === "custom" ? (s.title || "Özel bölüm") : s.label}</b>
              <span>{s.kind === "custom" ? `Özel · ${s.type === "video" ? "Video" : s.type === "text" ? "Metin" : "Görsel"}` : "Yerleşik"}{s.locked ? " · sabit" : ""}</span>
            </div>
            <div className="seclist__actions">
              <button className="adm-iconbtn" disabled={i === 0} onClick={() => act(() => PG().move(s.id, -1))} aria-label="Yukarı" data-tip="Yukarı"><Icon name="chevron" size={13} style={{ transform: "rotate(180deg)" }} /></button>
              <button className="adm-iconbtn" disabled={i === sections.length - 1} onClick={() => act(() => PG().move(s.id, 1))} aria-label="Aşağı" data-tip="Aşağı"><Icon name="chevron" size={13} /></button>
              {!s.locked && <button className="adm-iconbtn" onClick={() => act(() => PG().toggleHidden(s.id))} aria-label="Gizle/Göster" data-tip={s.hidden ? "Göster" : "Gizle"} style={{ opacity: s.hidden ? .5 : 1 }}><Icon name="eye" size={13} /></button>}
              {s.kind === "custom" && <>
                <button className="adm-iconbtn" onClick={() => setEditing(s.id)} aria-label="Düzenle" data-tip="Düzenle"><Icon name="edit" size={13} /></button>
                <button className="adm-iconbtn" onClick={() => act(() => PG().removeCustom(s.id))} aria-label="Sil" data-tip="Sil"><Icon name="trash" size={13} /></button>
              </>}
            </div>
          </li>
        ))}
      </ul>
      <p className="pw-hint" style={{ marginTop: "var(--space-3)" }}><Icon name="grip" size={13} /> Bölümleri <b>sürükleyip bırakarak</b> sıralayabilir, oklarla da taşıyabilirsin. Metinleri düzenlemek için soldaki önizlemede ilgili yazıya tıkla.</p>

      {addOpen && (
        <Modal title="Bölüm ekle" onClose={() => setAddOpen(false)}>
          <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-sm)", marginBottom: "var(--space-4)" }}>Yeni bölüm sona eklenir; ardından sürükleyerek istediğin yere taşı.</p>
          <div className="addsec-grid">
            {SECTION_TYPES.map(t => (
              <button key={t.type} className="addsec" onClick={() => { const id = PG().addCustom(t.type); setAddOpen(false); setEditing(id); force(n => n + 1); onChanged && onChanged(); }}>
                <span className="addsec__ic"><Icon name={t.icon} size={22} /></span>
                <b>{t.label}</b><span>{t.desc}</span>
              </button>
            ))}
          </div>
        </Modal>
      )}

      {editSec && <CustomSectionEditor section={editSec} onClose={() => setEditing(null)} onChange={(patch) => act(() => PG().updateCustom(editSec.id, patch))} />}
    </div>
  );
}

/* small segmented control for the editor */
function Seg({ value, onChange, options }) {
  return (
    <div className="seg seg--wrap">
      {options.map(o => <button key={o.value} className={`seg__btn ${value === o.value ? "on" : ""}`} onClick={() => onChange(o.value)}>{o.label}</button>)}
    </div>
  );
}
/* labelled on/off switch row */
function SwitchRow({ label, hint, on, onChange }) {
  return (
    <label className="swrow">
      <div className="swrow__txt"><b>{label}</b>{hint && <span>{hint}</span>}</div>
      <Switch on={!!on} onChange={onChange} />
    </label>
  );
}

function CustomSectionEditor({ section, onClose, onChange }) {
  const s = section;
  const isVideo = s.type === "video", isImage = s.type === "image", isText = s.type === "text";
  return (
    <Drawer title="Bölümü düzenle" subtitle={isVideo ? "Video bölümü" : isText ? "Metin bölümü" : "Görsel bölümü"} onClose={onClose}
      footer={<button className="adm-btn adm-btn--primary" onClick={onClose}>Bitti</button>}>

      <FormSection title="İçerik">
        <Field label="Başlık"><input className="adm-input" value={s.title || ""} onChange={e => onChange({ title: e.target.value })} placeholder="Bölüm başlığı (boş bırakılabilir)" /></Field>
        <Field label="Açıklama metni"><textarea className="adm-textarea" style={{ minHeight: isText ? "9rem" : "5rem" }} value={s.text || ""} onChange={e => onChange({ text: e.target.value })} placeholder="Kısa açıklama (opsiyonel)" /></Field>

        {isImage && <>
          <ImageUpload label="Görsel" ratio="16/9" value={s.src} onChange={v => onChange({ src: v })} hint="ana görsel" />
          <Field label="Alt yazı (caption)"><input className="adm-input" value={s.caption || ""} onChange={e => onChange({ caption: e.target.value })} placeholder="Görsel altı küçük not (opsiyonel)" /></Field>
          <Field label="Bağlantı (tıklanınca gider)"><input className="adm-input" value={s.link || ""} onChange={e => onChange({ link: e.target.value })} placeholder="https://… (opsiyonel)" /></Field>
        </>}

        {isVideo && <>
          <Field label="Video bağlantısı (YouTube / Vimeo / .mp4)"><input className="adm-input" value={s.url || ""} onChange={e => onChange({ url: e.target.value })} placeholder="https://youtu.be/…" /></Field>
          <ImageUpload label="Kapak görseli (poster)" ratio="16/9" value={s.src} onChange={v => onChange({ src: v })} />
        </>}
      </FormSection>

      <FormSection title="Yerleşim & görünüm">
        <SwitchRow label="Tam ekranı kapla" hint="Kenardan kenara, hero gibi tam genişlik" on={s.full} onChange={v => onChange({ full: v })} />
        <Field label="Başlık hizalama"><Seg value={s.align || "left"} onChange={v => onChange({ align: v })} options={[{ value: "left", label: "Sola" }, { value: "center", label: "Ortala" }]} /></Field>

        {!s.full && (isVideo || isImage) && (
          <Field label="En-boy oranı"><Seg value={s.ratio || (isVideo ? "16/9" : "auto")} onChange={v => onChange({ ratio: v })}
            options={(isImage ? [{ value: "auto", label: "Orijinal" }] : []).concat([{ value: "16/9", label: "16:9" }, { value: "4/3", label: "4:3" }, { value: "1/1", label: "1:1" }, { value: "21/9", label: "21:9" }])} /></Field>
        )}

        {isImage && <SwitchRow label="Köşeleri yuvarlat" on={s.rounded !== false} onChange={v => onChange({ rounded: v })} />}

        {isText && <>
          <Field label="Metin boyutu"><Seg value={s.size || "normal"} onChange={v => onChange({ size: v })} options={[{ value: "normal", label: "Normal" }, { value: "large", label: "Büyük" }]} /></Field>
          <Field label="Metin genişliği"><Seg value={s.maxWidth || "narrow"} onChange={v => onChange({ maxWidth: v })} options={[{ value: "narrow", label: "Dar" }, { value: "wide", label: "Geniş" }, { value: "full", label: "Tam" }]} /></Field>
          <Field label="Arka plan"><Seg value={s.bg || "none"} onChange={v => onChange({ bg: v })} options={[{ value: "none", label: "Yok" }, { value: "tint", label: "Açık" }, { value: "dark", label: "Koyu" }]} /></Field>
        </>}
      </FormSection>

      {isVideo && (
        <FormSection title="Oynatıcı ayarları">
          <SwitchRow label="Oynatıcıyı göster" hint="Durdur / ses / tam ekran kontrolleri" on={s.controls} onChange={v => onChange({ controls: v })} />
          <SwitchRow label="Otomatik oynatma" hint="Açılışta kendiliğinden başlar" on={s.autoplay} onChange={v => onChange({ autoplay: v, muted: v ? true : s.muted })} />
          <SwitchRow label="Döngü" hint="Bitince baştan tekrar oynar" on={s.loop} onChange={v => onChange({ loop: v })} />
          <SwitchRow label="Sessiz başlat" hint="Otomatik oynatma için gerekli" on={s.muted} onChange={v => onChange({ muted: v })} />
          {s.autoplay && !s.muted && <p className="pw-hint" style={{ marginTop: 0 }}><Icon name="ai" size={13} /> Tarayıcılar sesli videoda otomatik oynatmayı engeller — "Sessiz başlat" açık olmalı.</p>}
        </FormSection>
      )}
    </Drawer>
  );
}

Object.assign(window, { PagesM });
