"use client";

import React, { useState } from "react";
import { AdmCard, Field, ImageUpload, GalleryUpload, MkSelect, Badge } from "@/components/admin/ui";
import { Icon } from "@/components/admin/AdminIcons";

// --- MOCK DATA & CONSTANTS ---
const BLOG_TPLS = [
  { id: "standart", label: "Standart Makale", desc: "Kapak, spot, gövde ve araya görsel", vis: ["img", "bar", "bar"], blocks: [ { k: "cover", t: "cover", label: "Kapak görseli" }, { k: "kicker", t: "kicker", label: "Kategori / üst başlık" }, { k: "title", t: "title", label: "Başlık" }, { k: "lead", t: "lead", label: "Spot / giriş" }, { k: "body", t: "rich", label: "Gövde metni", ai: true }, { k: "image", t: "image", label: "Araya görsel" }, { k: "body2", t: "rich", label: "Devam metni" } ] },
  { id: "foto", label: "Foto Hikâye", desc: "Görsel ağırlıklı, galeri düzeni", vis: ["img", "row2"], blocks: [ { k: "cover", t: "cover", label: "Büyük kapak" }, { k: "title", t: "title", label: "Başlık" }, { k: "lead", t: "lead", label: "Giriş" }, { k: "gallery", t: "gallery", label: "Foto galerisi" }, { k: "body", t: "rich", label: "Kapanış notu", ai: true } ] },
  { id: "roportaj", label: "Röportaj", desc: "Soru–cevap düzeni", vis: ["bar", "qa", "qa"], blocks: [ { k: "cover", t: "cover", label: "Kapak görseli" }, { k: "kicker", t: "kicker", label: "Konuk" }, { k: "title", t: "title", label: "Başlık" }, { k: "lead", t: "lead", label: "Giriş" }, { k: "qa", t: "qa", label: "Soru & Cevaplar" } ] },
  { id: "rehber", label: "Liste / Rehber", desc: "Numaralı adımlar", vis: ["bar", "step", "step"], blocks: [ { k: "cover", t: "cover", label: "Kapak görseli" }, { k: "title", t: "title", label: "Başlık" }, { k: "lead", t: "lead", label: "Giriş" }, { k: "list", t: "list", label: "Adımlar / maddeler" } ] },
  { id: "minimal", label: "Minimal Deneme", desc: "Yalnızca tipografi, kapaksız", vis: ["bar", "bar", "bars"], blocks: [ { k: "kicker", t: "kicker", label: "Üst başlık" }, { k: "title", t: "title", label: "Başlık" }, { k: "body", t: "rich", label: "Metin", ai: true } ] },
];

const MOCK_POSTS = [
  { id: 1, title: "Tasarım Sistemlerinin Evrimi", cat: "Süreç", status: "Yayında", views: "1.2k", date: "15 Haz 2026", cover: "" },
  { id: 2, title: "Mikro Etkileşimler Neden Önemli?", cat: "Görüş", status: "Taslak", views: "—", date: "—", cover: "" },
];

// --- UTILS ---
function renderRich(text: string) {
  if (!text) return null;
  return text.split(/\n{2,}/).map((para, i) => {
    const t = para.trim();
    if (/^##\s+/.test(t)) return <h2 key={i}>{t.replace(/^##\s+/, "")}</h2>;
    if (/^#\s+/.test(t)) return <h2 key={i}>{t.replace(/^#\s+/, "")}</h2>;
    return <p key={i}>{t}</p>;
  });
}

function genImg(hue: number) { 
  const c = document.createElement("canvas"); c.width = 480; c.height = 360; 
  const x = c.getContext("2d"); if (!x) return "";
  const h = ((150 + hue) % 360 + 360) % 360; 
  const g = x.createLinearGradient(0, 0, 480, 360); 
  g.addColorStop(0, `hsl(${h} 62% 72%)`); g.addColorStop(1, `hsl(${(h + 40) % 360} 30% 90%)`); 
  x.fillStyle = g; x.fillRect(0, 0, 480, 360); 
  x.fillStyle = "rgba(255,255,255,.45)"; x.beginPath(); x.arc(360, 110, 64, 0, 7); x.fill(); 
  return c.toDataURL("image/png"); 
}

// --- REPEATERS ---
function QARepeater({ items = [], onChange }: any) {
  const add = () => onChange([...items, { id: Date.now() + Math.random(), q: "", a: "" }]);
  const upd = (id: any, p: any) => onChange(items.map((x: any) => x.id === id ? { ...x, ...p } : x));
  return (
    <div>
      {items.map((it: any, i: number) => (
        <div className="blk" key={it.id}>
          <button className="blk__x" onClick={() => onChange(items.filter((x: any) => x.id !== it.id))}><Icon name="close" size={12} /></button>
          <input className="adm-input" placeholder={`Soru ${i + 1}`} value={it.q} onChange={e => upd(it.id, { q: e.target.value })} />
          <textarea className="adm-textarea" style={{ minHeight: "4rem" }} placeholder="Cevap" value={it.a} onChange={e => upd(it.id, { a: e.target.value })} />
        </div>
      ))}
      <button className="adm-btn adm-btn--ghost blk-add" onClick={add}><Icon name="plus" size={14} /> Soru ekle</button>
    </div>
  );
}

function ListRepeater({ items = [], onChange }: any) {
  const add = () => onChange([...items, { id: Date.now() + Math.random(), h: "", text: "", img: null }]);
  const upd = (id: any, p: any) => onChange(items.map((x: any) => x.id === id ? { ...x, ...p } : x));
  return (
    <div>
      {items.map((it: any, i: number) => (
        <div className="blk" key={it.id}>
          <button className="blk__x" onClick={() => onChange(items.filter((x: any) => x.id !== it.id))}><Icon name="close" size={12} /></button>
          <input className="adm-input" placeholder={`${i + 1}. başlık`} value={it.h} onChange={e => upd(it.id, { h: e.target.value })} />
          <textarea className="adm-textarea" style={{ minHeight: "3.5rem" }} placeholder="Açıklama" value={it.text} onChange={e => upd(it.id, { text: e.target.value })} />
          <ImageUpload ratio="16/9" value={it.img} onChange={v => upd(it.id, { img: v })} label="Görsel (ops.)" />
        </div>
      ))}
      <button className="adm-btn adm-btn--ghost blk-add" onClick={add}><Icon name="plus" size={14} /> Madde ekle</button>
    </div>
  );
}

// --- BLOCK COMPONENTS ---
function BlockForm({ block, value, setVal, onAI, aiBusy }: any) {
  const t = block.t;
  if (t === "cover") return <ImageUpload label={block.label} ratio="21/9" value={value} onChange={setVal} hint="öneri 2000×860" />;
  if (t === "image") return <ImageUpload label={block.label} ratio="16/9" value={value} onChange={setVal} />;
  if (t === "gallery") return <GalleryUpload label={block.label} items={value || []} onChange={setVal} />;
  if (t === "qa") return <Field label={block.label}><QARepeater items={value || []} onChange={setVal} /></Field>;
  if (t === "list") return <Field label={block.label}><ListRepeater items={value || []} onChange={setVal} /></Field>;
  if (t === "title") return <Field label={block.label}><input className="adm-input" style={{ fontSize: "1.1rem", fontWeight: 600 }} value={value || ""} onChange={e => setVal(e.target.value)} placeholder="Etkileyici bir başlık…" /></Field>;
  if (t === "kicker") return <Field label={block.label}><input className="adm-input" value={value || ""} onChange={e => setVal(e.target.value)} placeholder="örn. Görüş" /></Field>;
  if (t === "lead") return <Field label={block.label}><textarea className="adm-textarea" style={{ minHeight: "4rem" }} value={value || ""} onChange={e => setVal(e.target.value)} placeholder="Tek paragraflık çarpıcı giriş…" /></Field>;
  
  return (
    <div className="adm-field">
      <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>{block.label}
        {block.ai && (
          <button className="adm-btn adm-btn--ghost" style={{ padding: ".3rem .7rem" }} disabled={aiBusy} onClick={onAI}>
            {aiBusy ? "..." : <><Icon name="ai" size={13} /> AI ile yaz</>}
          </button>
        )}
      </label>
      <textarea className="adm-textarea" style={{ minHeight: "11rem" }} value={value || ""} onChange={e => setVal(e.target.value)} placeholder="Paragrafları boş satırla ayırın. Alt başlık için satır başına ## yazın." />
    </div>
  );
}

function BlockPreview({ block, value }: any) {
  const t = block.t;
  if (t === "cover") return <div className="pv__cover">{value ? <img src={value} alt="" /> : <div className="pv__placeholder">KAPAK GÖRSELİ</div>}</div>;
  if (t === "kicker") return value ? <span className="kicker">{value}</span> : null;
  if (t === "title") return <h1>{value || "Yazı başlığı buraya"}</h1>;
  if (t === "lead") return value ? <p className="lead">{value}</p> : null;
  if (t === "rich") return <div style={{ display: "flex", flexDirection: "column", gap: ".9rem" }}>{renderRich(value)}</div>;
  if (t === "image") return <figure>{value ? <img className="inl" src={value} alt="" /> : <div className="pv__placeholder">ARAYA GÖRSEL</div>}</figure>;
  if (t === "gallery") return (value && value.length) ? <div className="pv__gal">{value.map((g: any) => <figure key={g.id}><img src={g.src} alt="" />{g.caption && <figcaption>{g.caption}</figcaption>}</figure>)}</div> : <div className="pv__placeholder">FOTO GALERİSİ</div>;
  if (t === "qa") return (value && value.length) ? <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>{value.map((x: any) => <div className="pv__qa" key={x.id}><span className="q">{x.q || "Soru?"}</span><span className="a">{x.a || "Cevap…"}</span></div>)}</div> : <div className="pv__placeholder">SORU & CEVAP</div>;
  if (t === "list") return (value && value.length) ? <div style={{ display: "flex", flexDirection: "column", gap: "1.3rem" }}>{value.map((x: any, i: number) => <div className="pv__step" key={x.id}><span className="n">{String(i + 1).padStart(2, "0")}</span><div style={{ flex: 1, display: "flex", flexDirection: "column", gap: ".5rem" }}><h2 style={{ margin: 0 }}>{x.h || "Adım"}</h2>{x.text && <p style={{ margin: 0 }}>{x.text}</p>}{x.img && <img className="inl" src={x.img} alt="" />}</div></div>)}</div> : <div className="pv__placeholder">ADIMLAR</div>;
  return null;
}

// --- WIZARD ---
function BlogWizard({ onClose, onSave }: any) {
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState("");
  const [custom, setCustom] = useState("");
  const [steer, setSteer] = useState("");
  const [sugs, setSugs] = useState(["2026'da editoryal tasarım trendleri", "Marka kimliğinde tipografinin rolü", "Web'de mikro etkileşimlerin gücü", "Tasarım sistemleri nasıl ölçeklenir?", "Kreatif ekiplerde süreç yönetimi"]);
  const [data, setData] = useState<any>(null);
  const [busy, setBusy] = useState(false);

  const suggest = async () => {
    setBusy(true);
    await new Promise(r => setTimeout(r, 1000));
    setSugs([...sugs].reverse()); // mock AI
    setBusy(false);
  };

  const generate = async (tplId: string) => {
    setStep(3); setBusy(true); setData(null);
    await new Promise(r => setTimeout(r, 1500));
    const t = BLOG_TPLS.find(x => x.id === tplId)!;
    const f: any = {};
    t.blocks.forEach((b: any, i: number) => {
      if (b.t === "title") f[b.k] = topic;
      else if (b.t === "kicker") f[b.k] = "Görüş";
      else if (b.t === "lead") f[b.k] = `${topic} üzerine kısa bir giriş.`;
      else if (b.t === "rich") f[b.k] = "Örnek gövde metni.\n\nBir paragraf daha.";
      else if (b.t === "cover" || b.t === "image") f[b.k] = genImg(i * 60 + 20);
      else if (b.t === "gallery") f[b.k] = [0, 1, 2, 3].map(g => ({ id: Date.now() + g, src: genImg(g * 70), caption: "" }));
      else if (b.t === "qa") f[b.k] = [{ id: 1, q: `${topic} nedir?`, a: "Örnek cevap." }];
      else if (b.t === "list") f[b.k] = [{ id: 1, h: "Net bir yön belirleyin", text: "Açıklama", img: genImg(30) }];
    });
    setData({ template: tplId, status: "Taslak", fields: f }); setBusy(false);
  };

  const save = (status: string) => {
    const f = data.fields;
    onSave({ template: data.template, status, fields: f, title: f.title || topic, cat: f.kicker || "Görüş", cover: f.cover || null, date: status === "Yayında" ? new Date().toLocaleDateString("tr-TR") : "—", author: "AI", views: "—" });
  };

  return (
    <div style={{ background: "var(--surface)", position: "absolute", inset: 0, zIndex: 100, display: "flex", flexDirection: "column" }}>
      <div className="ed-toolbar" style={{ flexShrink: 0 }}>
        <button className="ed-back" onClick={onClose}><Icon name="close" size={14} /> Kapat</button>
        <span className="ai-chip" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--accent)", color: "#fff", padding: "4px 10px", borderRadius: 16, fontSize: 12, fontWeight: 600 }}>
          <Icon name="ai" size={12} fill /> AI Yazı Sihirbazı
        </span>
        <span className="sp" style={{ flex: 1 }} />
        <div className="wiz-steps" style={{ display: "flex", gap: "1rem", fontSize: 13, fontWeight: 600, color: "var(--text-muted)" }}>
          {[["1", "Konu"], ["2", "Şablon"], ["3", "Üret & önizle"]].map(([n, l]) => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 6, color: +n <= step ? "var(--accent)" : "var(--text-muted)" }}>
              <span style={{ width: 20, height: 20, borderRadius: "50%", background: +n <= step ? "var(--accent)" : "var(--border)", color: +n <= step ? "#fff" : "inherit", display: "grid", placeItems: "center", fontSize: 11 }}>{+n < step ? "✓" : n}</span>
              {l}
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "2rem", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "800px" }}>
          {step === 1 && (
            <AdmCard title="Konu seç" desc="AI'ın önerdiği konulardan seç ya da yönlendir">
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end", marginBottom: "1.5rem" }}>
                <div style={{ flex: 1 }}>
                  <Field label="AI'ı yönlendir (tema/anahtar kelime)">
                    <input className="adm-input" value={steer} onChange={e => setSteer(e.target.value)} placeholder="örn. motion tasarım, SaaS markalaşma" onKeyDown={e => e.key === "Enter" && suggest()} />
                  </Field>
                </div>
                <button className="adm-btn adm-btn--ghost" disabled={busy} onClick={suggest} style={{ marginBottom: "2px" }}>
                  {busy ? "..." : <><Icon name="ai" size={14} /> Konu öner</>}
                </button>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
                {sugs.map((s, i) => (
                  <button key={i} style={{ background: "var(--surface-muted)", border: "1px solid var(--border)", padding: "0.5rem 1rem", borderRadius: "20px", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }} onClick={() => { setTopic(s); setStep(2); }}>
                    <Icon name="ai" size={13} /> {s}
                  </button>
                ))}
              </div>
              <div style={{ textAlign: "center", fontSize: 13, color: "var(--text-muted)", marginBottom: "1rem" }}>veya kendi konunu yaz</div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <div style={{ flex: 1 }}><input className="adm-input" value={custom} onChange={e => setCustom(e.target.value)} placeholder="Kendi başlık fikrin…" onKeyDown={e => e.key === "Enter" && custom.trim() && (setTopic(custom.trim()), setStep(2))} /></div>
                <button className="adm-btn adm-btn--primary" disabled={!custom.trim()} onClick={() => { setTopic(custom.trim()); setStep(2); }}>Devam →</button>
              </div>
            </AdmCard>
          )}

          {step === 2 && (
            <AdmCard title="Şablon seç" desc={`Konu: “${topic}” · düzene uygun bir şablon seç`} action={<button className="adm-btn adm-btn--ghost" onClick={() => setStep(1)}>← Konu</button>}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
                {BLOG_TPLS.map(t => (
                  <button key={t.id} style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1.5rem", border: "1px solid var(--border)", borderRadius: "8px", background: "var(--surface)", textAlign: "left", cursor: "pointer" }} onClick={() => generate(t.id)}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, height: 60, background: "var(--surface-muted)", padding: "0.5rem", borderRadius: "6px" }}>
                       {t.vis.map((v, i) => v === "img" ? <b key={i} style={{ flex: 1, background: "var(--ink-200)", borderRadius: 4 }} /> : v === "qa" ? <i key={i} style={{ width: "60%", height: 6, background: "var(--text)", borderRadius: 3 }} /> : <i key={i} style={{ width: i ? "70%" : "100%", height: 6, background: "var(--text)", borderRadius: 3 }} />)}
                    </div>
                    <div>
                      <h4 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 4px" }}>{t.label}</h4>
                      <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0 }}>{t.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </AdmCard>
          )}

          {step === 3 && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <button className="adm-btn adm-btn--ghost" onClick={() => setStep(2)}>← Şablon</button>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button className="adm-btn adm-btn--danger" onClick={onClose}><Icon name="trash" size={14} /> Sil</button>
                  <button className="adm-btn adm-btn--ghost" disabled={busy || !data} onClick={() => save("Taslak")}>Taslağa kaydet</button>
                  <button className="adm-btn adm-btn--primary" disabled={busy || !data} onClick={() => save("Yayında")}><Icon name="eye" size={15} /> Yayınla</button>
                </div>
              </div>
              {busy || !data ? (
                <div style={{ padding: "4rem", textAlign: "center", background: "var(--surface)", border: "1px dashed var(--border)", borderRadius: "8px" }}>
                  <span className="ai-spinner" style={{ borderColor: "var(--accent)", borderTopColor: "transparent", width: 32, height: 32, borderWidth: 3, display: "inline-block", marginBottom: "1rem" }} />
                  <h3 style={{ fontSize: "18px", fontWeight: 600 }}>AI içerik üretiliyor…</h3>
                  <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>“{topic}” için metinler ve görsel alanları dolduruluyor.</p>
                </div>
              ) : (
                <div style={{ background: "#fff", padding: "2rem 4rem", borderRadius: "8px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "var(--accent)", marginBottom: "2rem", borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}>
                    <Icon name="ai" size={15} /> AI önizleme — yayına hazır
                  </div>
                  {BLOG_TPLS.find(t => t.id === data.template)!.blocks.map((b: any) => <BlockPreview key={b.k} block={b} value={data.fields[b.k]} />)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- EDITOR ---
function BlogEditor({ post, onClose, onSave }: any) {
  const init = post && post.fields ? post
    : (post && post.title) ? { id: post.id, template: "standart", status: post.status || "Taslak", fields: { title: post.title, kicker: post.cat, lead: post.excerpt || "" } }
    : { id: post && post.id, template: null, status: "Taslak", fields: {} };
    
  const [data, setData] = useState<any>(init);
  const [aiBusy, setAiBusy] = useState(false);
  const tpl = BLOG_TPLS.find(t => t.id === data.template);
  
  const setField = (k: string, v: any) => setData((d: any) => ({ ...d, fields: { ...d.fields, [k]: v } }));

  const aiWrite = async () => {
    setAiBusy(true);
    await new Promise(r => setTimeout(r, 1000));
    setField("body", "AI tarafından üretilmiş yeni gövde metni.\n\nDevamı...");
    setAiBusy(false);
  };

  const save = (status: string) => {
    const f = data.fields;
    onSave({ id: data.id, template: data.template, status, fields: f, title: f.title || "Başlıksız", cat: f.kicker || "Görüş", cover: f.cover || null, date: status === "Yayında" ? new Date().toLocaleDateString("tr-TR") : "—", author: "Sen", views: "—" });
  };

  if (!tpl) {
    return (
      <div style={{ background: "var(--surface)", position: "absolute", inset: 0, zIndex: 100, display: "flex", flexDirection: "column" }}>
        <div className="ed-toolbar">
          <button className="ed-back" onClick={onClose}><Icon name="close" size={15} /> Kapat</button>
        </div>
        <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", width: "100%" }}>
          <AdmCard title="Yeni yazı — şablon seç" desc="Konseptine uygun bir düzenle başla">
            <div className="btpl-grid">
              {BLOG_TPLS.map(t => (
                <button key={t.id} className="btpl" onClick={() => setData((d: any) => ({ ...d, template: t.id }))}>
                  <div className="btpl__vis">
                     {t.vis.map((v, i) => v === "img" ? <b key={i} className="img" /> : v === "qa" ? <i key={i} className="bar" style={{ width: "60%" }} /> : <i key={i} className="bar" style={{ width: i ? "70%" : "100%" }} />)}
                  </div>
                  <div className="btpl__b">
                    <h4>{t.label}</h4>
                    <p>{t.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </AdmCard>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="ed-toolbar">
        <button className="ed-back" onClick={() => setData((d: any) => ({ ...d, template: null }))}><Icon name="close" size={14} /> Şablonu değiştir</button>
        <span className="adm-badge adm-badge--green">{tpl.label}</span>
        <span className="sp" />
        <MkSelect width="160px" value={data.status} onChange={v => setData((d: any) => ({ ...d, status: v }))} options={["Taslak", "Zamanlandı", "Yayında"]} />
        <button className="adm-btn adm-btn--ghost" onClick={() => save("Taslak")}>Taslağa kaydet</button>
        <button className="adm-btn adm-btn--primary" onClick={() => save("Yayında")}><Icon name="eye" size={15} /> Yayınla</button>
      </div>

      <div className="editor">
        <div className="editor__form">
          {tpl.blocks.map(b => <BlockForm key={b.k} block={b} value={data.fields[b.k]} setVal={(v: any) => setField(b.k, v)} onAI={aiWrite} aiBusy={aiBusy} />)}
        </div>
        <div className="editor__preview">
          <div className="prev-frame">
            <div className="prev-frame__bar">
              <span className="adm-preview__dot" />
              <span className="adm-preview__dot" />
              <span className="adm-preview__dot" />
              <span style={{ marginLeft: 8 }}>canlı önizleme — blog yazısı</span>
            </div>
            <div className="prev-scroll">
              <article className="pv">
                {tpl.blocks.map(b => <BlockPreview key={b.k} block={b} value={data.fields[b.k]} />)}
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- PAGE LIST ---
export function BlogClient() {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [editing, setEditing] = useState<any>(null);
  const [wizard, setWizard] = useState(false);

  if (wizard) {
    return (
      <BlogWizard 
        onClose={() => setWizard(false)} 
        onSave={(p: any) => { setPosts([{ id: Date.now(), ...p }, ...posts]); setWizard(false); }} 
      />
    );
  }

  if (editing) {
    return (
      <BlogEditor 
        post={editing} 
        onClose={() => setEditing(null)} 
        onSave={(p: any) => { setPosts(posts.map(x => x.id === p.id ? p : x)); setEditing(null); }} 
      />
    );
  }

  return (
    <AdmCard 
      title="Blog Yazıları" 
      desc={`${posts.length} yazı`}
      action={
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button className="adm-btn adm-btn--primary" onClick={() => setEditing({ id: Date.now() })}>
            <Icon name="plus" size={14} /> Yazı Ekle
          </button>
          <button className="adm-btn adm-btn--ghost" onClick={() => setWizard(true)}>
            <Icon name="ai" size={14} /> AI Sihirbazı
          </button>
        </div>
      }
    >
      <table className="adm-table">
        <thead>
          <tr>
            <th></th>
            <th>Başlık</th>
            <th>Kategori</th>
            <th>Durum</th>
            <th>Tarih</th>
            <th>Görünüm</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {posts.map(p => (
            <tr key={p.id}>
              <td style={{ width: 56 }}>
                <div className="ph" style={{ width: 48, height: 32, borderRadius: 6 }}>
                  {p.cover ? <img src={p.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }} /> : <div className="ph__in" />}
                </div>
              </td>
              <td className="ti">{p.title}</td>
              <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>{p.cat}</td>
              <td><Badge tone={p.status === "Yayında" ? "green" : "muted"}>{p.status}</Badge></td>
              <td style={{ color: "var(--text-muted)", fontSize: "13px", fontFamily: "var(--font-mono)" }}>{p.date}</td>
              <td style={{ color: "var(--text-muted)", fontSize: "13px", fontFamily: "var(--font-mono)" }}>{p.views}</td>
              <td>
                <div className="adm-row-actions">
                  <button className="adm-iconbtn" onClick={() => setEditing(p)} aria-label="Düzenle">
                    <Icon name="edit" size={14} />
                  </button>
                  <button className="adm-iconbtn" onClick={() => setPosts(posts.filter(x => x.id !== p.id))} aria-label="Sil">
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
