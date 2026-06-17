/* Comprehensive course (Akademi) editor — cover, meta, pricing, curriculum
   builder (modules → lessons), learning outcomes & requirements, with a live
   course-detail preview. Reuses FormSection/uid/renderRich from sibling files. */
const { useState: useCoState } = React;
const CO = () => window.MK_ADMIN;

const LEVELS = ["Başlangıç", "Orta", "İleri", "Tüm seviyeler"];
const CO_CATS = ["Tasarım", "Geliştirme", "Markalaşma", "Motion", "Strateji"];

/* curriculum: modules, each with lessons */
const LESSON_TYPES = [
  { id: "video", label: "Video", icon: "media" },
  { id: "image", label: "Görsel", icon: "media" },
  { id: "doc", label: "Doküman", icon: "pages" },
  { id: "link", label: "Dış bağlantı", icon: "link" },
  { id: "text", label: "Metin / okuma", icon: "courses" },
];
const lessonTypeMeta = (id) => LESSON_TYPES.find(t => t.id === id) || LESSON_TYPES[0];

function LessonContent({ lesson, onChange }) {
  const t = lesson.type || "video";
  const set = (k, v) => onChange({ ...lesson, [k]: v });
  return (
    <div className="lesson-body">
      <Field label="İçerik türü">
        <div className="seg seg--wrap">
          {LESSON_TYPES.map(opt => (
            <button key={opt.id} className={`seg__btn ${t === opt.id ? "on" : ""}`} onClick={() => set("type", opt.id)}>
              <Icon name={opt.icon} size={13} /> {opt.label}
            </button>
          ))}
        </div>
      </Field>

      {t === "video" && (<>
        <Field label="Video kaynağı" >
          <div className="seg" style={{ marginBottom: ".6rem" }}>
            <button className={`seg__btn ${lesson.vsource !== "url" ? "on" : ""}`} onClick={() => set("vsource", "upload")}>Yükle</button>
            <button className={`seg__btn ${lesson.vsource === "url" ? "on" : ""}`} onClick={() => set("vsource", "url")}>Embed/URL</button>
          </div>
          {lesson.vsource === "url"
            ? <input className="adm-input" value={lesson.videoUrl || ""} onChange={e => set("videoUrl", e.target.value)} placeholder="YouTube / Vimeo / .mp4 bağlantısı" />
            : <FileDrop value={lesson.file} onChange={v => set("file", v)} accept="video/*" hint="mp4, webm" icon="media" />}
        </Field>
        <Field label="Önizleme görseli (poster)"><ImageUpload value={lesson.poster} onChange={v => set("poster", v)} ratio="16/9" /></Field>
      </>)}

      {t === "image" && <Field label="Görsel"><ImageUpload value={lesson.img} onChange={v => set("img", v)} ratio="16/9" hint="ders görseli" /></Field>}

      {t === "doc" && <FileDrop label="Doküman" value={lesson.file} onChange={v => set("file", v)} accept=".pdf,.doc,.docx,.ppt,.pptx,.zip" hint="pdf, docx, zip…" icon="pages" />}

      {t === "link" && (<>
        <Field label="Bağlantı URL'si"><input className="adm-input" value={lesson.url || ""} onChange={e => set("url", e.target.value)} placeholder="https://www.udemy.com/course/..." /></Field>
        <Field label="Bağlantı etiketi"><input className="adm-input" value={lesson.linkLabel || ""} onChange={e => set("linkLabel", e.target.value)} placeholder="örn. Udemy'de izle" /></Field>
      </>)}

      {t === "text" && <Field label="Ders metni"><textarea className="adm-textarea" style={{ minHeight: "7rem" }} value={lesson.body || ""} onChange={e => set("body", e.target.value)} placeholder="Okuma içeriği, notlar, kaynaklar…" /></Field>}

      <Field label="Açıklama (opsiyonel)"><input className="adm-input" value={lesson.note || ""} onChange={e => set("note", e.target.value)} placeholder="Ders hakkında kısa not" /></Field>
      <label className="lesson-free"><Switch on={!!lesson.free} onChange={v => set("free", v)} /> <span>Ücretsiz önizleme (kayıtsız izlenebilir)</span></label>
    </div>
  );
}

function Curriculum({ modules = [], onChange }) {
  const [open, setOpen] = useCoState({});
  const toggle = (id) => setOpen(o => ({ ...o, [id]: !o[id] }));
  const setMod = (id, k, v) => onChange(modules.map(m => m.id === id ? { ...m, [k]: v } : m));
  const addMod = () => onChange([...modules, { id: uid(), title: "", lessons: [] }]);
  const delMod = (id) => onChange(modules.filter(m => m.id !== id));
  const addLesson = (mid) => { const nid = uid(); onChange(modules.map(m => m.id === mid ? { ...m, lessons: [...m.lessons, { id: nid, title: "", dur: "", type: "video" }] } : m)); setOpen(o => ({ ...o, [nid]: true })); };
  const updLesson = (mid, lesson) => onChange(modules.map(m => m.id === mid ? { ...m, lessons: m.lessons.map(l => l.id === lesson.id ? lesson : l) } : m));
  const delLesson = (mid, lid) => onChange(modules.map(m => m.id === mid ? { ...m, lessons: m.lessons.filter(l => l.id !== lid) } : m));
  return (
    <div className="curr">
      {modules.map((m, i) => (
        <div key={m.id} className="curr-mod">
          <div className="curr-mod__h">
            <span className="curr-mod__n">{String(i + 1).padStart(2, "0")}</span>
            <input className="adm-input" value={m.title} onChange={e => setMod(m.id, "title", e.target.value)} placeholder={`Modül ${i + 1} başlığı`} />
            <span className="curr-mod__c">{m.lessons.length} ders</span>
            <button className="adm-iconbtn" onClick={() => delMod(m.id)} aria-label="Modülü sil"><Icon name="trash" size={14} /></button>
          </div>
          <div className="curr-lessons">
            {m.lessons.map(l => {
              const meta = lessonTypeMeta(l.type);
              const isOpen = !!open[l.id];
              return (
                <div key={l.id} className={`curr-lesson-wrap ${isOpen ? "open" : ""}`}>
                  <div className="curr-lesson">
                    <button className="curr-lesson__caret" onClick={() => toggle(l.id)} aria-label="Aç/kapat"><Icon name="chevron" size={14} /></button>
                    <span className="curr-lesson__type" title={meta.label}><Icon name={meta.icon} size={13} /></span>
                    <input className="adm-input" value={l.title} onChange={e => updLesson(m.id, { ...l, title: e.target.value })} placeholder="Ders adı" />
                    <input className="adm-input curr-lesson__dur" value={l.dur} onChange={e => updLesson(m.id, { ...l, dur: e.target.value })} placeholder="08:30" />
                    <button className="adm-iconbtn" onClick={() => delLesson(m.id, l.id)} aria-label="Dersi sil"><Icon name="close" size={13} /></button>
                  </div>
                  {isOpen && <LessonContent lesson={l} onChange={(nl) => updLesson(m.id, nl)} />}
                </div>
              );
            })}
            <button className="curr-addlesson" onClick={() => addLesson(m.id)}><Icon name="plus" size={13} /> Ders ekle</button>
          </div>
        </div>
      ))}
      <button className="adm-btn adm-btn--ghost" style={{ alignSelf: "flex-start" }} onClick={addMod}><Icon name="plus" size={14} /> Modül ekle</button>
    </div>
  );
}

/* simple editable bullet list */
function BulletList({ items = [], onChange, placeholder }) {
  const set = (id, v) => onChange(items.map(it => it.id === id ? { ...it, text: v } : it));
  const add = () => onChange([...items, { id: uid(), text: "" }]);
  const del = (id) => onChange(items.filter(it => it.id !== id));
  return (
    <div className="blist">
      {items.map(it => (
        <div key={it.id} className="blist__row">
          <span className="blist__dot" />
          <input className="adm-input" value={it.text} onChange={e => set(it.id, e.target.value)} placeholder={placeholder} />
          <button className="adm-iconbtn" onClick={() => del(it.id)} aria-label="Sil"><Icon name="close" size={13} /></button>
        </div>
      ))}
      <button className="adm-btn adm-btn--ghost" style={{ alignSelf: "flex-start" }} onClick={add}><Icon name="plus" size={14} /> Madde ekle</button>
    </div>
  );
}

function CourseEditor({ course, onClose, onSave }) {
  const init = course && course.fields ? course : {
    id: course && course.id,
    status: (course && course.status) || "Taslak",
    fields: course ? { title: course.title, instructor: course.instructor, price: course.price, rating: course.rating } : { level: "Başlangıç", currency: "₺" },
  };
  const [data, setData] = useCoState(init);
  const [aiBusy, setAiBusy] = useCoState(false);
  const f = data.fields;
  const set = (k, v) => setData(d => ({ ...d, fields: { ...d.fields, [k]: v } }));

  const modules = f.modules || [];
  const lessonCount = modules.reduce((n, m) => n + m.lessons.length, 0);

  const aiWrite = async () => {
    setAiBusy(true);
    const out = await CO().ai(`"${f.title || "Kurs"}" başlıklı, ${f.level || "tüm seviyeler"} seviyesindeki bir online tasarım/geliştirme kursu için Türkçe, satışa yönelik kısa bir açıklama yaz. 1–2 paragraf, abartısız ve net.`, () => CO().SIM.blog(f.title || "Kurs"));
    set("desc", out.replace(/^#.*$/m, "").replace(/ÖZET[\s\S]*$/i, "").trim());
    setAiBusy(false);
  };

  const save = (status) => {
    onSave({
      id: data.id, status, fields: f,
      title: f.title || "Başlıksız kurs", instructor: f.instructor || "—",
      students: course && course.students ? course.students : 0,
      price: (f.price ? (f.currency || "₺") + f.price : "—"),
      rating: f.rating || 0, cover: f.cover || null,
    });
  };

  return (
    <div>
      <div className="ed-toolbar">
        <button className="ed-back" onClick={onClose}><Icon name="close" size={14} /> Kurslara dön</button>
        <span className="adm-badge adm-badge--green">Kurs düzenleyici</span>
        <span className="sp" />
        <MkSelect width="150px" value={data.status} onChange={v => setData(d => ({ ...d, status: v }))} options={["Taslak", "Arşiv", "Yayında"]} />
        <button className="adm-btn adm-btn--ghost" onClick={() => save("Taslak")}>Taslağa kaydet</button>
        <button className="adm-btn adm-btn--primary" onClick={() => save("Yayında")}><Icon name="eye" size={15} /> Yayınla</button>
      </div>

      <div className="editor">
        <div className="editor__form">
          <FormSection title="Künye" hint="kapak + temel bilgiler">
            <ImageUpload label="Kurs kapağı" ratio="16/9" value={f.cover} onChange={v => set("cover", v)} hint="öneri 1600×900" />
            <Field label="Kurs adı"><input className="adm-input" style={{ fontSize: "1.1rem", fontWeight: 600 }} value={f.title || ""} onChange={e => set("title", e.target.value)} placeholder="örn. Sıfırdan Tasarım Sistemi" /></Field>
            <Field label="Kısa tanıtım (alt başlık)"><input className="adm-input" value={f.tagline || ""} onChange={e => set("tagline", e.target.value)} placeholder="Tek cümlelik vaat" /></Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
              <Field label="Eğitmen"><input className="adm-input" value={f.instructor || ""} onChange={e => set("instructor", e.target.value)} placeholder="Ad Soyad" /></Field>
              <Field label="Kategori"><MkSelect value={f.category || ""} onChange={v => set("category", v)} placeholder="Seçin…" options={CO_CATS} /></Field>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
              <Field label="Seviye"><MkSelect value={f.level || "Başlangıç"} onChange={v => set("level", v)} options={LEVELS} /></Field>
              <Field label="Dil"><input className="adm-input" value={f.lang || "Türkçe"} onChange={e => set("lang", e.target.value)} /></Field>
            </div>
          </FormSection>

          <FormSection title="Fiyatlandırma">
            <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr", gap: "var(--space-4)" }}>
              <Field label="Para"><MkSelect value={f.currency || "₺"} onChange={v => set("currency", v)} options={["₺", "$", "€"]} /></Field>
              <Field label="Fiyat"><input className="adm-input" value={f.price || ""} onChange={e => set("price", e.target.value)} placeholder="1.299" /></Field>
              <Field label="İndirimli fiyat (ops.)"><input className="adm-input" value={f.salePrice || ""} onChange={e => set("salePrice", e.target.value)} placeholder="899" /></Field>
            </div>
          </FormSection>

          <FormSection title="Açıklama" hint="kursun satış metni">
            <div className="adm-field">
              <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>Kurs açıklaması
                <button className="adm-btn adm-btn--ghost" style={{ padding: ".3rem .7rem" }} disabled={aiBusy} onClick={aiWrite}>{aiBusy ? <><span className="ai-spinner" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} /> …</> : <><Icon name="ai" size={13} /> AI ile yaz</>}</button>
              </label>
              <textarea className="adm-textarea" style={{ minHeight: "9rem" }} value={f.desc || ""} onChange={e => set("desc", e.target.value)} placeholder="Bu kursta ne öğretiliyor, kimler için? Boş satırla paragraf, ## ile alt başlık." />
            </div>
          </FormSection>

          <FormSection title="Müfredat" hint={`${modules.length} modül · ${lessonCount} ders`}>
            <Curriculum modules={modules} onChange={v => set("modules", v)} />
          </FormSection>

          <FormSection title="Kazanımlar" hint="kursu bitirince neler yapabilecekler?">
            <BulletList items={f.outcomes || []} onChange={v => set("outcomes", v)} placeholder="örn. Sıfırdan bir tasarım sistemi kurmak" />
          </FormSection>

          <FormSection title="Gereksinimler">
            <BulletList items={f.requirements || []} onChange={v => set("requirements", v)} placeholder="örn. Temel Figma bilgisi" />
          </FormSection>
        </div>

        <div className="editor__preview">
          <div className="prev-frame">
            <div className="prev-frame__bar"><span className="adm-preview__dot" /><span className="adm-preview__dot" /><span className="adm-preview__dot" /><span style={{ marginLeft: 8 }}>canlı önizleme — kurs detayı</span></div>
            <div className="prev-scroll"><article className="pv">
              {f.category && <span className="kicker">{f.category}{f.level ? ` · ${f.level}` : ""}</span>}
              <h1>{f.title || "Kurs adı"}</h1>
              {f.tagline && <p className="lead">{f.tagline}</p>}
              <div className="pv__cover">{f.cover ? <img src={f.cover} alt="" /> : <div className="pv__placeholder">KURS KAPAĞI</div>}</div>
              <div className="pv-course__bar">
                <div className="pv-course__price">{f.salePrice ? <><span className="now">{(f.currency || "₺") + f.salePrice}</span><span className="was">{(f.currency || "₺") + (f.price || "")}</span></> : <span className="now">{f.price ? (f.currency || "₺") + f.price : "Ücretsiz"}</span>}</div>
                <button className="btn btn--primary" style={{ pointerEvents: "none" }}>Kayıt Ol</button>
              </div>
              <dl className="pv__meta">
                <div><dt>Eğitmen</dt><dd>{f.instructor || "—"}</dd></div>
                <div><dt>Seviye</dt><dd>{f.level || "—"}</dd></div>
                <div><dt>Ders</dt><dd>{lessonCount || "—"}</dd></div>
                <div><dt>Puan</dt><dd>{f.rating ? `★ ${f.rating}` : "—"}</dd></div>
              </dl>
              {f.desc && <div style={{ display: "flex", flexDirection: "column", gap: ".9rem" }}>{renderRich(f.desc)}</div>}

              {(f.outcomes || []).filter(o => o.text).length > 0 && (
                <div className="pv__block"><span className="kicker">Kazanımlar</span>
                  <ul className="pv-checklist">{f.outcomes.filter(o => o.text).map(o => <li key={o.id}><span className="ck">✓</span>{o.text}</li>)}</ul>
                </div>
              )}

              {modules.length > 0 && (
                <div className="pv__block"><span className="kicker">Müfredat</span>
                  <div className="pv-curr">{modules.map((m, i) => (
                    <details key={m.id} className="pv-curr__mod" open={i === 0}>
                      <summary><span>{String(i + 1).padStart(2, "0")} · {m.title || "Modül"}</span><span className="c">{m.lessons.length} ders</span></summary>
                      {m.lessons.map(l => { const lm = lessonTypeMeta(l.type); return <div key={l.id} className="pv-curr__lesson"><span><span className="ic"><Icon name={lm.icon} size={12} /></span> {l.title || "Ders"}{l.free && <span className="pv-free">ücretsiz</span>}</span><span className="d">{l.dur}</span></div>; })}
                    </details>
                  ))}</div>
                </div>
              )}

              {(f.requirements || []).filter(r => r.text).length > 0 && (
                <div className="pv__block"><span className="kicker">Gereksinimler</span>
                  <ul className="pv-checklist pv-checklist--plain">{f.requirements.filter(r => r.text).map(r => <li key={r.id}><span className="ck">—</span>{r.text}</li>)}</ul>
                </div>
              )}
            </article></div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CourseEditor });
