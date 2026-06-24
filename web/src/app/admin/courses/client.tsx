"use client";

import React, { useState } from "react";
import { AdmCard, Field, ImageUpload, FileDrop, Switch, MkSelect, Badge } from "@/components/admin/ui";
import { Icon } from "@/components/admin/AdminIcons";

// --- MOCK DATA ---
const LEVELS = ["Başlangıç", "Orta", "İleri", "Tüm seviyeler"];
const CO_CATS = ["Tasarım", "Geliştirme", "Markalaşma", "Motion", "Strateji"];

const LESSON_TYPES = [
  { id: "video", label: "Video", icon: "media" },
  { id: "image", label: "Görsel", icon: "media" },
  { id: "doc", label: "Doküman", icon: "pages" },
  { id: "link", label: "Dış bağlantı", icon: "link" },
  { id: "text", label: "Metin / okuma", icon: "courses" },
];
const lessonTypeMeta = (id: string) => LESSON_TYPES.find(t => t.id === id) || LESSON_TYPES[0];

const MOCK_COURSES = [
  { id: 1, title: "Sıfırdan Tasarım Sistemi", instructor: "Ahmet", category: "Tasarım", status: "Yayında", price: "₺1299", rating: 4.8 },
  { id: 2, title: "İleri Seviye Next.js", instructor: "Mehmet", category: "Geliştirme", status: "Taslak", price: "₺1899", rating: 0 },
];

// --- UTILS ---
function uid() { return "x" + Math.random().toString(36).slice(2, 9); }

function renderRich(text: string) {
  if (!text) return null;
  return text.split(/\n{2,}/).map((para, i) => {
    const t = para.trim();
    if (/^##\s+/.test(t)) return <h2 key={i}>{t.replace(/^##\s+/, "")}</h2>;
    if (/^#\s+/.test(t)) return <h2 key={i}>{t.replace(/^#\s+/, "")}</h2>;
    return <p key={i}>{t}</p>;
  });
}

function FormSection({ title, hint, children }: any) {
  return (
    <div className="ed-section">
      <div className="ed-section__h">
        <h4>{title}</h4>
        {hint && <span>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

// --- COMPONENTS ---
function LessonContent({ lesson, onChange }: any) {
  const t = lesson.type || "video";
  const set = (k: string, v: any) => onChange({ ...lesson, [k]: v });
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

      {t === "video" && (
        <>
          <Field label="Video kaynağı">
            <div className="seg" style={{ marginBottom: ".6rem" }}>
              <button className={`seg__btn ${lesson.vsource !== "url" ? "on" : ""}`} onClick={() => set("vsource", "upload")}>Yükle</button>
              <button className={`seg__btn ${lesson.vsource === "url" ? "on" : ""}`} onClick={() => set("vsource", "url")}>Embed/URL</button>
            </div>
            {lesson.vsource === "url"
              ? <input className="adm-input" value={lesson.videoUrl || ""} onChange={e => set("videoUrl", e.target.value)} placeholder="YouTube / Vimeo / .mp4 bağlantısı" />
              : <FileDrop value={lesson.file} onChange={v => set("file", v)} accept="video/*" hint="mp4, webm" icon="media" />}
          </Field>
          <Field label="Önizleme görseli (poster)"><ImageUpload value={lesson.poster} onChange={v => set("poster", v)} ratio="16/9" /></Field>
        </>
      )}

      {t === "image" && <Field label="Görsel"><ImageUpload value={lesson.img} onChange={v => set("img", v)} ratio="16/9" hint="ders görseli" /></Field>}

      {t === "doc" && <FileDrop label="Doküman" value={lesson.file} onChange={v => set("file", v)} accept=".pdf,.doc,.docx,.ppt,.pptx,.zip" hint="pdf, docx, zip…" icon="pages" />}

      {t === "link" && (
        <>
          <Field label="Bağlantı URL'si"><input className="adm-input" value={lesson.url || ""} onChange={e => set("url", e.target.value)} placeholder="https://www.udemy.com/course/..." /></Field>
          <Field label="Bağlantı etiketi"><input className="adm-input" value={lesson.linkLabel || ""} onChange={e => set("linkLabel", e.target.value)} placeholder="örn. Udemy'de izle" /></Field>
        </>
      )}

      {t === "text" && <Field label="Ders metni"><textarea className="adm-textarea" style={{ minHeight: "7rem" }} value={lesson.body || ""} onChange={e => set("body", e.target.value)} placeholder="Okuma içeriği, notlar, kaynaklar…" /></Field>}

      <Field label="Açıklama (opsiyonel)"><input className="adm-input" value={lesson.note || ""} onChange={e => set("note", e.target.value)} placeholder="Ders hakkında kısa not" /></Field>
      <label className="lesson-free"><Switch on={!!lesson.free} onChange={(v: boolean) => set("free", v)} /> <span>Ücretsiz önizleme (kayıtsız izlenebilir)</span></label>
    </div>
  );
}

function Curriculum({ modules = [], onChange }: any) {
  const [open, setOpen] = useState<any>({});
  const toggle = (id: string) => setOpen((o: any) => ({ ...o, [id]: !o[id] }));
  const setMod = (id: string, k: string, v: any) => onChange(modules.map((m: any) => m.id === id ? { ...m, [k]: v } : m));
  const addMod = () => onChange([...modules, { id: uid(), title: "", lessons: [] }]);
  const delMod = (id: string) => onChange(modules.filter((m: any) => m.id !== id));
  const addLesson = (mid: string) => { const nid = uid(); onChange(modules.map((m: any) => m.id === mid ? { ...m, lessons: [...m.lessons, { id: nid, title: "", dur: "", type: "video" }] } : m)); setOpen((o: any) => ({ ...o, [nid]: true })); };
  const updLesson = (mid: string, lesson: any) => onChange(modules.map((m: any) => m.id === mid ? { ...m, lessons: m.lessons.map((l: any) => l.id === lesson.id ? lesson : l) } : m));
  const delLesson = (mid: string, lid: string) => onChange(modules.map((m: any) => m.id === mid ? { ...m, lessons: m.lessons.filter((l: any) => l.id !== lid) } : m));
  
  return (
    <div className="curr">
      {modules.map((m: any, i: number) => (
        <div key={m.id} className="curr-mod">
          <div className="curr-mod__h">
            <span className="curr-mod__n">{String(i + 1).padStart(2, "0")}</span>
            <input className="adm-input" value={m.title} onChange={e => setMod(m.id, "title", e.target.value)} placeholder={`Modül ${i + 1} başlığı`} />
            <span className="curr-mod__c">{m.lessons.length} ders</span>
            <button className="adm-iconbtn" onClick={() => delMod(m.id)} aria-label="Modülü sil"><Icon name="trash" size={14} /></button>
          </div>
          <div className="curr-lessons">
            {m.lessons.map((l: any) => {
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
                  {isOpen && <LessonContent lesson={l} onChange={(nl: any) => updLesson(m.id, nl)} />}
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

function BulletList({ items = [], onChange, placeholder }: any) {
  const set = (id: string, v: string) => onChange(items.map((it: any) => it.id === id ? { ...it, text: v } : it));
  const add = () => onChange([...items, { id: uid(), text: "" }]);
  const del = (id: string) => onChange(items.filter((it: any) => it.id !== id));
  return (
    <div className="blist">
      {items.map((it: any) => (
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

function CourseEditor({ course, onClose, onSave }: any) {
  const init = course && course.fields ? course : {
    id: course && course.id,
    status: (course && course.status) || "Taslak",
    fields: course ? { title: course.title, instructor: course.instructor, price: course.price, rating: course.rating, category: course.category } : { level: "Başlangıç", currency: "₺" },
  };
  const [data, setData] = useState<any>(init);
  const [aiBusy, setAiBusy] = useState(false);
  const f = data.fields;
  const update = (k: string, v: any) => setData((d: any) => ({ ...d, fields: { ...d.fields, [k]: v } }));

  const modules = f.modules || [];
  const lessonCount = modules.reduce((n: number, m: any) => n + m.lessons.length, 0);

  const aiWrite = async () => {
    setAiBusy(true);
    await new Promise(r => setTimeout(r, 1500));
    update("desc", "Bu kurs, dijital ürün tasarımı ve kullanıcı deneyimi konularında derinlemesine bilgi sağlamak üzere tasarlanmıştır. Başlangıç seviyesinden ileri tekniklere kadar her konuyu içerir.");
    setAiBusy(false);
  };

  const save = (status: string) => {
    onSave({
      id: data.id, status, fields: f,
      title: f.title || "Başlıksız kurs", instructor: f.instructor || "—", category: f.category || "Genel",
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
        <span className="sp" style={{ flex: 1 }} />
        <MkSelect width="150px" value={data.status} onChange={v => setData((d: any) => ({ ...d, status: v }))} options={["Taslak", "Arşiv", "Yayında"]} />
        <button className="adm-btn adm-btn--ghost" onClick={() => save("Taslak")}>Taslağa kaydet</button>
        <button className="adm-btn adm-btn--primary" onClick={() => save("Yayında")}><Icon name="eye" size={15} /> Yayınla</button>
      </div>

      <div className="editor">
        <div className="editor__form">
          <FormSection title="Künye" hint="kapak + temel bilgiler">
            <ImageUpload label="Kurs kapağı" ratio="16/9" value={f.cover} onChange={v => update("cover", v)} hint="öneri 1600×900" />
            <Field label="Kurs adı"><input className="adm-input" style={{ fontSize: "1.1rem", fontWeight: 600 }} value={f.title || ""} onChange={e => update("title", e.target.value)} placeholder="örn. Sıfırdan Tasarım Sistemi" /></Field>
            <Field label="Kısa tanıtım (alt başlık)"><input className="adm-input" value={f.tagline || ""} onChange={e => update("tagline", e.target.value)} placeholder="Tek cümlelik vaat" /></Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
              <Field label="Eğitmen"><input className="adm-input" value={f.instructor || ""} onChange={e => update("instructor", e.target.value)} placeholder="Ad Soyad" /></Field>
              <Field label="Kategori"><MkSelect value={f.category || ""} onChange={v => update("category", v)} placeholder="Seçin…" options={CO_CATS} /></Field>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
              <Field label="Seviye"><MkSelect value={f.level || "Başlangıç"} onChange={v => update("level", v)} options={LEVELS} /></Field>
              <Field label="Dil"><input className="adm-input" value={f.lang || "Türkçe"} onChange={e => update("lang", e.target.value)} /></Field>
            </div>
          </FormSection>

          <FormSection title="Fiyatlandırma">
            <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr", gap: "var(--space-4)" }}>
              <Field label="Para"><MkSelect value={f.currency || "₺"} onChange={v => update("currency", v)} options={["₺", "$", "€"]} /></Field>
              <Field label="Fiyat"><input className="adm-input" value={f.price || ""} onChange={e => update("price", e.target.value)} placeholder="1.299" /></Field>
              <Field label="İndirimli fiyat (ops.)"><input className="adm-input" value={f.salePrice || ""} onChange={e => update("salePrice", e.target.value)} placeholder="899" /></Field>
            </div>
          </FormSection>

          <FormSection title="Açıklama" hint="kursun satış metni">
            <div className="adm-field">
              <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>Kurs açıklaması
                <button className="adm-btn adm-btn--ghost" style={{ padding: ".3rem .7rem" }} disabled={aiBusy} onClick={aiWrite}>{aiBusy ? "..." : <><Icon name="ai" size={13} /> AI ile yaz</>}</button>
              </label>
              <textarea className="adm-textarea" style={{ minHeight: "9rem" }} value={f.desc || ""} onChange={e => update("desc", e.target.value)} placeholder="Bu kursta ne öğretiliyor, kimler için? Boş satırla paragraf, ## ile alt başlık." />
            </div>
          </FormSection>

          <FormSection title="Müfredat" hint={`${modules.length} modül · ${lessonCount} ders`}>
            <Curriculum modules={modules} onChange={(v: any) => update("modules", v)} />
          </FormSection>

          <FormSection title="Kazanımlar" hint="kursu bitirince neler yapabilecekler?">
            <BulletList items={f.outcomes || []} onChange={(v: any) => update("outcomes", v)} placeholder="örn. Sıfırdan bir tasarım sistemi kurmak" />
          </FormSection>

          <FormSection title="Gereksinimler">
            <BulletList items={f.requirements || []} onChange={(v: any) => update("requirements", v)} placeholder="örn. Temel Figma bilgisi" />
          </FormSection>
        </div>

        <div className="editor__preview">
          <div className="prev-frame">
            <div className="prev-frame__bar">
              <span className="adm-preview__dot" />
              <span className="adm-preview__dot" />
              <span className="adm-preview__dot" />
              <span style={{ marginLeft: 8 }}>canlı önizleme — kurs detayı</span>
            </div>
            <div className="prev-scroll">
              <article className="pv">
                {f.category && <span className="kicker">{f.category}{f.level ? ` · ${f.level}` : ""}</span>}
                <h1>{f.title || "Kurs adı"}</h1>
                {f.tagline && <p className="lead">{f.tagline}</p>}
                
                <div className="pv__cover">
                  {f.cover ? <img src={f.cover} alt="" /> : <div className="pv__placeholder">KURS KAPAĞI</div>}
                </div>
                
                <div className="pv-course__bar">
                  <div className="pv-course__price">
                    {f.salePrice ? (
                      <>
                        <span className="now">{(f.currency || "₺") + f.salePrice}</span>
                        <span className="was">{(f.currency || "₺") + (f.price || "")}</span>
                      </>
                    ) : (
                      <span className="now">{f.price ? (f.currency || "₺") + f.price : "Ücretsiz"}</span>
                    )}
                  </div>
                  <button className="btn btn--primary" style={{ pointerEvents: "none" }}>Kayıt Ol</button>
                </div>

                <dl className="pv__meta">
                  <div><dt>Eğitmen</dt><dd>{f.instructor || "—"}</dd></div>
                  <div><dt>Seviye</dt><dd>{f.level || "—"}</dd></div>
                  <div><dt>Ders</dt><dd>{lessonCount || "—"}</dd></div>
                  <div><dt>Puan</dt><dd>{f.rating ? `★ ${f.rating}` : "—"}</dd></div>
                </dl>

                {f.desc && <div style={{ display: "flex", flexDirection: "column", gap: ".9rem" }}>{renderRich(f.desc)}</div>}

                {(f.outcomes || []).filter((o: any) => o.text).length > 0 && (
                  <div className="pv__block">
                    <span className="kicker">Kazanımlar</span>
                    <ul className="pv-checklist">
                      {f.outcomes.filter((o: any) => o.text).map((o: any) => (
                        <li key={o.id}>
                          <span className="ck">✓</span>
                          {o.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {modules.length > 0 && (
                  <div className="pv__block">
                    <span className="kicker">Müfredat</span>
                    <div className="pv-curr">
                      {modules.map((m: any, i: number) => (
                        <details key={m.id} className="pv-curr__mod" open={i === 0}>
                          <summary style={{ display: "flex", justifyContent: "space-between", listStyle: "none" }}>
                            <span>{String(i + 1).padStart(2, "0")} · {m.title || "Modül"}</span>
                            <span className="c">{m.lessons.length} ders</span>
                          </summary>
                          {m.lessons.map((l: any) => { 
                            const lm = lessonTypeMeta(l.type); 
                            return (
                              <div key={l.id} className="pv-curr__lesson">
                                <span>
                                  <span className="ic"><Icon name={lm.icon} size={12} /></span> 
                                  {l.title || "Ders"}
                                  {l.free && <span className="pv-free">ücretsiz</span>}
                                </span>
                                <span className="d">{l.dur}</span>
                              </div>
                            ); 
                          })}
                        </details>
                      ))}
                    </div>
                  </div>
                )}

                {(f.requirements || []).filter((r: any) => r.text).length > 0 && (
                  <div className="pv__block">
                    <span className="kicker">Gereksinimler</span>
                    <ul className="pv-checklist pv-checklist--plain">
                      {f.requirements.filter((r: any) => r.text).map((r: any) => (
                        <li key={r.id}>
                          <span className="ck">—</span>
                          {r.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- PAGE LIST ---
export function CoursesClient() {
  const [courses, setCourses] = useState<any[]>(MOCK_COURSES);
  const [editing, setEditing] = useState<any>(null);

  if (editing) {
    return (
      <CourseEditor 
        course={editing} 
        onClose={() => setEditing(null)} 
        onSave={(p: any) => { 
          if (courses.find(x => x.id === p.id)) {
            setCourses(courses.map(x => x.id === p.id ? p : x));
          } else {
            setCourses([{ id: Date.now(), ...p }, ...courses]);
          }
          setEditing(null); 
        }} 
      />
    );
  }

  return (
    <AdmCard 
      title="Akademi & Kurslar" 
      desc={`${courses.length} kurs`}
      action={
        <button className="adm-btn adm-btn--primary" onClick={() => setEditing({ id: Date.now() })}>
          <Icon name="plus" size={14} /> Kurs Ekle
        </button>
      }
    >
      <table className="adm-table">
        <thead>
          <tr>
            <th></th>
            <th>Kurs Adı</th>
            <th>Kategori</th>
            <th>Eğitmen</th>
            <th>Fiyat</th>
            <th>Durum</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {courses.map(c => (
            <tr key={c.id}>
              <td style={{ width: 56 }}>
                <div className="ph" style={{ width: 48, height: 32, borderRadius: 6 }}>
                  {c.cover ? <img src={c.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }} /> : <div className="ph__in" />}
                </div>
              </td>
              <td className="ti">{c.title}</td>
              <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>{c.category}</td>
              <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>{c.instructor}</td>
              <td style={{ color: "var(--text-muted)", fontSize: "13px", fontFamily: "var(--font-mono)" }}>{c.price}</td>
              <td><Badge tone={c.status === "Yayında" ? "green" : "muted"}>{c.status}</Badge></td>
              <td>
                <div className="adm-row-actions">
                  <button className="adm-iconbtn" onClick={() => setEditing(c)} aria-label="Düzenle">
                    <Icon name="edit" size={14} />
                  </button>
                  <button className="adm-iconbtn" onClick={() => setCourses(courses.filter(x => x.id !== c.id))} aria-label="Sil">
                    <Icon name="trash" size={14} />
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
