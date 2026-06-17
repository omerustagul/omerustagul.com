/* Comprehensive project / case-study editor — cover + gallery + full narrative
   (problem → solution → impact metrics → testimonial), services multi-select
   pulled from the admin Hizmetler list, with a live project-detail preview. */
const { useState: usePState } = React;
const PD = () => window.MK_ADMIN;

function uid() { return "x" + Math.random().toString(36).slice(2, 9); }

/* small section divider inside the form */
function FormSection({ title, hint, children }) {
  return (
    <div className="ed-section">
      <div className="ed-section__h"><h4>{title}</h4>{hint && <span>{hint}</span>}</div>
      {children}
    </div>
  );
}

/* before → after impact metrics */
function MetricsRepeater({ items = [], onChange }) {
  const set = (id, k, v) => onChange(items.map(m => m.id === id ? { ...m, [k]: v } : m));
  const add = () => onChange([...items, { id: uid(), label: "", before: "", after: "" }]);
  const del = (id) => onChange(items.filter(m => m.id !== id));
  return (
    <div className="metrics">
      <div className="metrics__head"><span>Metrik</span><span>Önce</span><span>Sonra</span><span /></div>
      {items.map(m => (
        <div key={m.id} className="metrics__row">
          <input className="adm-input" value={m.label} onChange={e => set(m.id, "label", e.target.value)} placeholder="örn. Dönüşüm oranı" />
          <input className="adm-input" value={m.before} onChange={e => set(m.id, "before", e.target.value)} placeholder="%1,9" />
          <input className="adm-input" value={m.after} onChange={e => set(m.id, "after", e.target.value)} placeholder="%4,3" />
          <button className="adm-iconbtn" onClick={() => del(m.id)} aria-label="Sil"><Icon name="trash" size={14} /></button>
        </div>
      ))}
      <button className="adm-btn adm-btn--ghost" style={{ alignSelf: "flex-start" }} onClick={add}><Icon name="plus" size={14} /> Metrik ekle</button>
    </div>
  );
}

function ProjectEditor({ project, onClose, onSave }) {
  const allSvc = (PD().services || []);
  const mainName = (id) => (allSvc.find(s => s.id === id) || {}).name;
  // selectable services = active sub-services, grouped under their main service
  const serviceOptions = allSvc
    .filter(s => s.parent && s.active)
    .map(s => ({ value: s.id, label: s.name, group: mainName(s.parent) || "Diğer" }))
    .sort((a, b) => (a.group + a.label).localeCompare(b.group + b.label, "tr"));
  const nameToId = (name) => allSvc.find(s => s.name === name || s.name.toLowerCase() === String(name).toLowerCase());

  const init = project && project.fields ? project : {
    id: project && project.id,
    status: (project && project.status) || "Taslak",
    fields: project ? {
      title: project.title, client: project.client, year: String(project.year || 2026),
      // derive serviceIds from the legacy "cat" string ("Marka · Web") by matching names
      serviceIds: project.cat ? project.cat.split("·").map(t => { const s = nameToId(t.trim()); return s && s.id; }).filter(Boolean) : [],
    } : {},
  };
  const [data, setData] = usePState(init);
  const [aiBusy, setAiBusy] = usePState(false);
  const f = data.fields;
  const set = (k, v) => setData(d => ({ ...d, fields: { ...d.fields, [k]: v } }));

  const serviceIds = f.serviceIds || [];
  const serviceNames = serviceIds.map(id => (allSvc.find(s => s.id === id) || {}).name).filter(Boolean);

  const aiWrite = async () => {
    setAiBusy(true);
    const ctx = `${f.title || "Proje"} — müşteri: ${f.client || "—"}, hizmetler: ${serviceNames.join(", ") || "tasarım"}. Problem: ${f.problem || "—"}`;
    const out = await PD().ai(`Bir kreatif ajans vaka çalışması için "${ctx}" projesinin Türkçe, premium tonda çözüm anlatımını yaz. Kısa, somut, 1–2 paragraf. Markdown alt başlık için "## " kullan.`, () => PD().SIM.blog(f.title || "Proje"));
    set("solution", out.replace(/^#.*$/m, "").replace(/ÖZET[\s\S]*$/i, "").trim());
    setAiBusy(false);
  };

  const save = (status) => {
    onSave({
      id: data.id, status, fields: f,
      title: f.title || "Başlıksız proje", client: f.client || "—",
      cat: serviceNames.join(" · ") || f.category || "Web",
      year: +(f.year || 2026), cover: f.cover || null,
    });
  };

  const metrics = f.metrics || [];

  // existing projects to choose "next project" from (exclude the one being edited)
  const allProjects = (PD().projects || []);
  const otherProjects = allProjects.filter(p => p.id !== data.id);
  // auto-pick: the project created right after this one (ordered by id = creation order), wrapping
  const ordered = [...allProjects].sort((a, b) => a.id - b.id);
  const curIdx = ordered.findIndex(p => p.id === data.id);
  const autoNext = ordered.length > 1 ? ordered[(curIdx >= 0 ? curIdx + 1 : 0) % ordered.length] : null;
  const autoNextTitle = autoNext && autoNext.id !== data.id ? autoNext.title : (ordered.find(p => p.id !== data.id) || {}).title;
  const nextTitle = f.next || autoNextTitle;
  const nextIsAuto = !f.next;

  return (
    <div>
      <div className="ed-toolbar">
        <button className="ed-back" onClick={onClose}><Icon name="close" size={14} /> Projelere dön</button>
        <span className="adm-badge adm-badge--green">Vaka çalışması düzenleyici</span>
        <span className="sp" />
        <MkSelect width="150px" value={data.status} onChange={v => setData(d => ({ ...d, status: v }))} options={["Taslak", "Arşiv", "Yayında"]} />
        <button className="adm-btn adm-btn--ghost" onClick={() => save("Taslak")}>Taslağa kaydet</button>
        <button className="adm-btn adm-btn--primary" onClick={() => save("Yayında")}><Icon name="eye" size={15} /> Yayınla</button>
      </div>

      <div className="editor">
        <div className="editor__form">
          <FormSection title="Künye" hint="hero + temel bilgiler">
            <ImageUpload label="Kapak görseli (hero)" ratio="21/9" value={f.cover} onChange={v => set("cover", v)} hint="öneri 2100×900" />
            <Field label="Kategori / üst etiket"><input className="adm-input" value={f.category || ""} onChange={e => set("category", e.target.value)} placeholder="örn. MARKA · WEB" /></Field>
            <Field label="Proje adı"><input className="adm-input" style={{ fontSize: "1.1rem", fontWeight: 600 }} value={f.title || ""} onChange={e => set("title", e.target.value)} placeholder="Proje adı" /></Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
              <Field label="Müşteri"><input className="adm-input" value={f.client || ""} onChange={e => set("client", e.target.value)} placeholder="Müşteri / marka" /></Field>
              <Field label="Yıl"><input className="adm-input" value={f.year || ""} onChange={e => set("year", e.target.value)} placeholder="2026" /></Field>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
              <Field label="Verilen hizmetler">
                <MkSelect multi searchable value={serviceIds} onChange={v => set("serviceIds", v)} placeholder="Hizmet seçin…"
                  options={serviceOptions} />
              </Field>
              <Field label="Süre"><input className="adm-input" value={f.duration || ""} onChange={e => set("duration", e.target.value)} placeholder="örn. 14 hafta" /></Field>
            </div>
            <Field label="Rolümüz"><input className="adm-input" value={f.role || ""} onChange={e => set("role", e.target.value)} placeholder="Strateji & Tasarım" /></Field>
          </FormSection>

          <FormSection title="Problem" hint="müşteri bize geldiğinde nasıl bir konumdaydı?">
            <textarea className="adm-textarea" value={f.problem || ""} onChange={e => set("problem", e.target.value)} placeholder="Müşterinin karşılaştığı zorluk, başlangıç noktası, kısıtlar…" />
          </FormSection>

          <FormSection title="Çözüm & Yaklaşım" hint="ne tür bir çözüm yolu sunduk?">
            <div className="adm-field">
              <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>Çözüm anlatımı
                <button className="adm-btn adm-btn--ghost" style={{ padding: ".3rem .7rem" }} disabled={aiBusy} onClick={aiWrite}>{aiBusy ? <><span className="ai-spinner" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} /> …</> : <><Icon name="ai" size={13} /> AI ile yaz</>}</button>
              </label>
              <textarea className="adm-textarea" value={f.solution || ""} onChange={e => set("solution", e.target.value)} placeholder="Stratejimiz ve uyguladığımız çözüm…" />
            </div>
            <div className="adm-field">
              <label>Süreç & detay (opsiyonel)</label>
              <textarea className="adm-textarea" style={{ minHeight: "8rem" }} value={f.body || ""} onChange={e => set("body", e.target.value)} placeholder="Daha uzun anlatım. Boş satırla paragraf, ## ile alt başlık." />
            </div>
          </FormSection>

          <FormSection title="Etki & Sonuçlar" hint="hangi oranda büyüme / başarı sağladık?">
            <MetricsRepeater items={metrics} onChange={v => set("metrics", v)} />
          </FormSection>

          <FormSection title="Müşteri yorumu" hint="opsiyonel referans">
            <textarea className="adm-textarea" style={{ minHeight: "5rem" }} value={f.quote || ""} onChange={e => set("quote", e.target.value)} placeholder="“Marka ile çalışmak…”" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
              <Field label="Yorumu yapan"><input className="adm-input" value={f.quoteAuthor || ""} onChange={e => set("quoteAuthor", e.target.value)} placeholder="Ad Soyad" /></Field>
              <Field label="Ünvan / şirket"><input className="adm-input" value={f.quoteRole || ""} onChange={e => set("quoteRole", e.target.value)} placeholder="CEO · Şirket" /></Field>
            </div>
          </FormSection>

          <FormSection title="Görseller & navigasyon">
            <GalleryUpload label="Proje görselleri (tam genişlik)" items={f.gallery || []} onChange={v => set("gallery", v)} />
            <Field label="Sonraki proje">
              <MkSelect searchable value={f.next || ""} onChange={v => set("next", v)} placeholder="Otomatik — tarihe göre sıradaki"
                options={[{ value: "", label: "Otomatik (tarihe göre sıradaki)" }, ...otherProjects.map(p => ({ value: p.title, label: p.title }))]} />
              {nextIsAuto && nextTitle && <span className="set-hint" style={{ display: "block", marginTop: ".4rem", fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>Seçim yapılmadı — sistem otomatik olarak <b>{nextTitle}</b> projesini gösterecek.</span>}
            </Field>
          </FormSection>
        </div>

        <div className="editor__preview">
          <div className="prev-frame">
            <div className="prev-frame__bar"><span className="adm-preview__dot" /><span className="adm-preview__dot" /><span className="adm-preview__dot" /><span style={{ marginLeft: 8 }}>canlı önizleme — proje detayı</span></div>
            <div className="prev-scroll"><article className="pv">
              {f.category && <span className="kicker">{f.category}</span>}
              <h1>{f.title || "Proje adı"}</h1>
              <div className="pv__cover">{f.cover ? <img src={f.cover} alt="" /> : <div className="pv__placeholder">KAPAK GÖRSELİ</div>}</div>
              <dl className="pv__meta">
                <div><dt>Müşteri</dt><dd>{f.client || "—"}</dd></div>
                <div><dt>Yıl</dt><dd>{f.year || "—"}</dd></div>
                <div><dt>Hizmetler</dt><dd>{serviceNames.join(", ") || "—"}</dd></div>
                <div><dt>Süre</dt><dd>{f.duration || "—"}</dd></div>
                <div><dt>Rol</dt><dd>{f.role || "—"}</dd></div>
              </dl>

              {f.problem && <div className="pv__block"><span className="kicker">Problem</span><p>{f.problem}</p></div>}
              {(f.solution || f.body) && (
                <div className="pv__block"><span className="kicker">Çözüm</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: ".9rem" }}>{renderRich([f.solution, f.body].filter(Boolean).join("\n\n"))}</div>
                </div>
              )}

              {metrics.length > 0 && (
                <div className="pv__metrics">
                  {metrics.filter(m => m.label).map(m => (
                    <div key={m.id} className="pv__metric">
                      <span className="pv__metric-lbl">{m.label}</span>
                      <span className="pv__metric-val"><span className="b">{m.before || "—"}</span><span className="ar">→</span><span className="a">{m.after || "—"}</span></span>
                    </div>
                  ))}
                </div>
              )}

              {f.quote && (
                <blockquote className="pv__quote">
                  <p>“{f.quote}”</p>
                  {(f.quoteAuthor || f.quoteRole) && <footer>{f.quoteAuthor}{f.quoteRole ? ` · ${f.quoteRole}` : ""}</footer>}
                </blockquote>
              )}

              {f.gallery && f.gallery.length > 0 && <div style={{ display: "flex", flexDirection: "column", gap: ".8rem" }}>{f.gallery.map(g => <figure key={g.id}><img className="inl" src={g.src} alt="" />{g.caption && <figcaption>{g.caption}</figcaption>}</figure>)}</div>}
              {nextTitle && <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.2rem", marginTop: ".5rem" }}><span className="kicker">Sonraki Proje{nextIsAuto ? " · otomatik" : ""}</span><h2 style={{ marginTop: ".4rem" }}>{nextTitle} →</h2></div>}
            </article></div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ProjectEditor });
