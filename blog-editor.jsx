/* Comprehensive blog editor — pick a layout template, fill blocks (text +
   images), see a live preview, publish. Real cover + inline + gallery images. */
const { useState: useBState } = React;
const AD = () => window.MK_ADMIN;

const BLOG_TPLS = [
{ id: "standart", label: "Standart Makale", desc: "Kapak, spot, gövde ve araya görsel",
  vis: ["img", "bar", "bar"], blocks: [
  { k: "cover", t: "cover", label: "Kapak görseli" },
  { k: "kicker", t: "kicker", label: "Kategori / üst başlık" },
  { k: "title", t: "title", label: "Başlık" },
  { k: "lead", t: "lead", label: "Spot / giriş" },
  { k: "body", t: "rich", label: "Gövde metni", ai: true },
  { k: "image", t: "image", label: "Araya görsel" },
  { k: "body2", t: "rich", label: "Devam metni" }]
},
{ id: "foto", label: "Foto Hikâye", desc: "Görsel ağırlıklı, galeri düzeni",
  vis: ["img", "row2"], blocks: [
  { k: "cover", t: "cover", label: "Büyük kapak" },
  { k: "title", t: "title", label: "Başlık" },
  { k: "lead", t: "lead", label: "Giriş" },
  { k: "gallery", t: "gallery", label: "Foto galerisi" },
  { k: "body", t: "rich", label: "Kapanış notu", ai: true }]
},
{ id: "roportaj", label: "Röportaj", desc: "Soru–cevap düzeni",
  vis: ["bar", "qa", "qa"], blocks: [
  { k: "cover", t: "cover", label: "Kapak görseli" },
  { k: "kicker", t: "kicker", label: "Konuk" },
  { k: "title", t: "title", label: "Başlık" },
  { k: "lead", t: "lead", label: "Giriş" },
  { k: "qa", t: "qa", label: "Soru & Cevaplar" }]
},
{ id: "rehber", label: "Liste / Rehber", desc: "Numaralı adımlar",
  vis: ["bar", "step", "step"], blocks: [
  { k: "cover", t: "cover", label: "Kapak görseli" },
  { k: "title", t: "title", label: "Başlık" },
  { k: "lead", t: "lead", label: "Giriş" },
  { k: "list", t: "list", label: "Adımlar / maddeler" }]
},
{ id: "minimal", label: "Minimal Deneme", desc: "Yalnızca tipografi, kapaksız",
  vis: ["bar", "bar", "bars"], blocks: [
  { k: "kicker", t: "kicker", label: "Üst başlık" },
  { k: "title", t: "title", label: "Başlık" },
  { k: "body", t: "rich", label: "Metin", ai: true }]
}];


function renderRich(text) {
  if (!text) return null;
  return text.split(/\n{2,}/).map((para, i) => {
    const t = para.trim();
    if (/^##\s+/.test(t)) return <h2 key={i}>{t.replace(/^##\s+/, "")}</h2>;
    if (/^#\s+/.test(t)) return <h2 key={i}>{t.replace(/^#\s+/, "")}</h2>;
    return <p key={i}>{t}</p>;
  });
}

/* ---- repeatable blocks ---- */
function QARepeater({ items = [], onChange }) {
  const add = () => onChange([...items, { id: Date.now() + Math.random(), q: "", a: "" }]);
  const upd = (id, p) => onChange(items.map((x) => x.id === id ? { ...x, ...p } : x));
  return (
    <div>
      {items.map((it, i) =>
      <div className="blk" key={it.id}>
          <button className="blk__x" onClick={() => onChange(items.filter((x) => x.id !== it.id))}><Icon name="close" size={12} /></button>
          <input className="adm-input" placeholder={`Soru ${i + 1}`} value={it.q} onChange={(e) => upd(it.id, { q: e.target.value })} />
          <textarea className="adm-textarea" style={{ minHeight: "4rem" }} placeholder="Cevap" value={it.a} onChange={(e) => upd(it.id, { a: e.target.value })} />
        </div>
      )}
      <button className="adm-btn adm-btn--ghost blk-add" onClick={add}><Icon name="plus" size={14} /> Soru ekle</button>
    </div>);

}

function ListRepeater({ items = [], onChange }) {
  const add = () => onChange([...items, { id: Date.now() + Math.random(), h: "", text: "", img: null }]);
  const upd = (id, p) => onChange(items.map((x) => x.id === id ? { ...x, ...p } : x));
  return (
    <div>
      {items.map((it, i) =>
      <div className="blk" key={it.id}>
          <button className="blk__x" onClick={() => onChange(items.filter((x) => x.id !== it.id))}><Icon name="close" size={12} /></button>
          <input className="adm-input" placeholder={`${i + 1}. başlık`} value={it.h} onChange={(e) => upd(it.id, { h: e.target.value })} />
          <textarea className="adm-textarea" style={{ minHeight: "3.5rem" }} placeholder="Açıklama" value={it.text} onChange={(e) => upd(it.id, { text: e.target.value })} />
          <ImageUpload ratio="16/9" value={it.img} onChange={(v) => upd(it.id, { img: v })} label="Görsel (ops.)" />
        </div>
      )}
      <button className="adm-btn adm-btn--ghost blk-add" onClick={add}><Icon name="plus" size={14} /> Madde ekle</button>
    </div>);

}

/* ---- form + preview per block ---- */
function BlockForm({ block, value, setVal, onAI, aiBusy }) {
  const t = block.t;
  if (t === "cover") return <ImageUpload label={block.label} ratio="21/9" value={value} onChange={setVal} hint="öneri 2000×860" />;
  if (t === "image") return <ImageUpload label={block.label} ratio="16/9" value={value} onChange={setVal} />;
  if (t === "gallery") return <GalleryUpload label={block.label} items={value || []} onChange={setVal} />;
  if (t === "qa") return <Field label={block.label}><QARepeater items={value || []} onChange={setVal} /></Field>;
  if (t === "list") return <Field label={block.label}><ListRepeater items={value || []} onChange={setVal} /></Field>;
  if (t === "title") return <Field label={block.label}><input className="adm-input" style={{ fontSize: "1.1rem", fontWeight: 600 }} value={value || ""} onChange={(e) => setVal(e.target.value)} placeholder="Etkileyici bir başlık…" /></Field>;
  if (t === "kicker") return <Field label={block.label}><input className="adm-input" value={value || ""} onChange={(e) => setVal(e.target.value)} placeholder="örn. Görüş" /></Field>;
  if (t === "lead") return <Field label={block.label}><textarea className="adm-textarea" style={{ minHeight: "4rem" }} value={value || ""} onChange={(e) => setVal(e.target.value)} placeholder="Tek paragraflık çarpıcı giriş…" /></Field>;
  // rich
  return (
    <div className="adm-field">
      <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>{block.label}
        {block.ai && <button className="adm-btn adm-btn--ghost" style={{ padding: ".3rem .7rem", borderRadius: "8px" }} disabled={aiBusy} onClick={onAI}>{aiBusy ? <><span className="ai-spinner" style={{ borderTopColor: "transparent", borderColor: "var(--accent)" }} /> …</> : <><Icon name="ai" size={13} /> AI ile yaz</>}</button>}
      </label>
      <textarea className="adm-textarea" style={{ minHeight: "11rem" }} value={value || ""} onChange={(e) => setVal(e.target.value)} placeholder="Paragrafları boş satırla ayırın. Alt başlık için satır başına ## yazın." />
    </div>);

}

function BlockPreview({ block, value }) {
  const t = block.t;
  if (t === "cover") return <div className="pv__cover">{value ? <img src={value} alt="" /> : <div className="pv__placeholder">KAPAK GÖRSELİ</div>}</div>;
  if (t === "kicker") return value ? <span className="kicker">{value}</span> : null;
  if (t === "title") return <h1>{value || "Yazı başlığı buraya"}</h1>;
  if (t === "lead") return value ? <p className="lead">{value}</p> : null;
  if (t === "rich") return <div style={{ display: "flex", flexDirection: "column", gap: ".9rem" }}>{renderRich(value)}</div>;
  if (t === "image") return <figure>{value ? <img className="inl" src={value} alt="" /> : <div className="pv__placeholder">ARAYA GÖRSEL</div>}</figure>;
  if (t === "gallery") return value && value.length ? <div className="pv__gal">{value.map((g) => <figure key={g.id}><img src={g.src} alt="" />{g.caption && <figcaption>{g.caption}</figcaption>}</figure>)}</div> : <div className="pv__placeholder">FOTO GALERİSİ</div>;
  if (t === "qa") return value && value.length ? <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>{value.map((x) => <div className="pv__qa" key={x.id}><span className="q">{x.q || "Soru?"}</span><span className="a">{x.a || "Cevap…"}</span></div>)}</div> : <div className="pv__placeholder">SORU & CEVAP</div>;
  if (t === "list") return value && value.length ? <div style={{ display: "flex", flexDirection: "column", gap: "1.3rem" }}>{value.map((x, i) => <div className="pv__step" key={x.id}><span className="n">{String(i + 1).padStart(2, "0")}</span><div style={{ flex: 1, display: "flex", flexDirection: "column", gap: ".5rem" }}><h2 style={{ margin: 0 }}>{x.h || "Adım"}</h2>{x.text && <p style={{ margin: 0 }}>{x.text}</p>}{x.img && <img className="inl" src={x.img} alt="" />}</div></div>)}</div> : <div className="pv__placeholder">ADIMLAR</div>;
  return null;
}

function BlogEditor({ post, onClose, onSave }) {
  const init = post && post.fields ? post :
  post && post.title ? { id: post.id, template: "standart", status: post.status || "Taslak", fields: { title: post.title, kicker: post.cat, lead: post.excerpt || "" } } :
  { id: post && post.id, template: null, status: "Taslak", fields: {} };
  const [data, setData] = useBState(init);
  const [aiBusy, setAiBusy] = useBState(false);
  const tpl = BLOG_TPLS.find((t) => t.id === data.template);
  const setField = (k, v) => setData((d) => ({ ...d, fields: { ...d.fields, [k]: v } }));

  const aiWrite = async () => {
    setAiBusy(true);
    const topic = data.fields.title || data.fields.kicker || "kreatif tasarım";
    const out = await AD().ai(`"${topic}" konusunda Türkçe, premium editoryal tonda bir blog gövdesi yaz. Paragrafları boş satırla ayır, alt başlık için "## " kullan. Sonunda yeni satırda "ÖZET:" ve tek cümle ekle.`, () => AD().SIM.blog(topic));
    let body = out,lead = data.fields.lead;
    const m = out.split(/ÖZET\s*:/i);if (m.length > 1) {body = m[0].trim();lead = m[1].trim();}
    const tm = body.match(/^#\s*(.+)$/m);if (tm) body = body.replace(/^#\s*.+$/m, "").trim();
    setData((d) => ({ ...d, fields: { ...d.fields, body, lead: d.fields.lead || lead, title: d.fields.title || (tm ? tm[1] : topic) } }));
    setAiBusy(false);
  };

  const save = (status) => {
    const f = data.fields;
    onSave({ id: data.id, template: data.template, status, fields: f,
      title: f.title || "Başlıksız", cat: f.kicker || "Görüş", cover: f.cover || null,
      date: status === "Yayında" ? new Date().toLocaleDateString("tr-TR", { day: "2-digit", month: "short", year: "numeric" }) : "—",
      author: "Sen", views: "—" });
  };

  // template picker
  if (!tpl) {
    return (
      <AdmCard title="Yeni yazı — şablon seç" desc="Konseptine uygun bir düzenle başla"
      action={<button className="ed-back" onClick={onClose}><Icon name="close" size={15} /> Kapat</button>}>
        <div className="btpl-grid">
          {BLOG_TPLS.map((t) =>
          <button key={t.id} className="btpl" onClick={() => setData((d) => ({ ...d, template: t.id }))}>
              <div className="btpl__vis">
                {t.vis.map((v, i) => v === "img" ? <b key={i} className="img" /> : v === "row2" ? <div key={i} className="row"><b className="img" /><b className="img" /></div> : v === "qa" ? <i key={i} className="bar" style={{ width: "60%" }} /> : v === "step" ? <div key={i} className="row" style={{ flex: "none", alignItems: "center" }}><i className="bar" style={{ width: 18, height: 18, borderRadius: 9 }} /><i className="bar" style={{ flex: 1 }} /></div> : v === "bars" ? <><i key={i} className="bar" /><i className="bar" style={{ width: "80%" }} /></> : <i key={i} className="bar" style={{ width: i ? "70%" : "100%" }} />)}
              </div>
              <div className="btpl__b"><h4>{t.label}</h4><p>{t.desc}</p></div>
            </button>
          )}
        </div>
      </AdmCard>);

  }

  return (
    <div>
      <div className="ed-toolbar">
        <button className="ed-back" onClick={() => setData((d) => ({ ...d, template: null }))}><Icon name="close" size={14} /> Şablonu değiştir</button>
        <span className="adm-badge adm-badge--green" style={{ height: "22px", padding: "4px 6px 3px", fontSize: "9px", letterSpacing: "0.6px", textAlign: "left", fontWeight: "400", borderRadius: "16px" }}>{tpl.label}</span>
        <span className="sp" />
        <MkSelect width="160px" value={data.status} onChange={(v) => setData((d) => ({ ...d, status: v }))} options={["Taslak", "Zamanlandı", "Yayında"]} />
        <button className="adm-btn adm-btn--ghost" onClick={() => save("Taslak")} style={{ height: "38px", borderRadius: "8px" }}>Taslağa kaydet</button>
        <button className="adm-btn adm-btn--primary" onClick={() => save("Yayında")} style={{ height: "38px", borderRadius: "8px" }}><Icon name="eye" size={15} /> Yayınla</button>
      </div>

      <div className="editor">
        <div className="editor__form">
          {tpl.blocks.map((b) => <BlockForm key={b.k} block={b} value={data.fields[b.k]} setVal={(v) => setField(b.k, v)} onAI={aiWrite} aiBusy={aiBusy} />)}
        </div>
        <div className="editor__preview">
          <div className="prev-frame">
            <div className="prev-frame__bar"><span className="adm-preview__dot" /><span className="adm-preview__dot" /><span className="adm-preview__dot" /><span style={{ marginLeft: 8 }}>canlı önizleme — blog yazısı</span></div>
            <div className="prev-scroll"><article className="pv">
              {tpl.blocks.map((b) => <BlockPreview key={b.k} block={b} value={data.fields[b.k]} />)}
            </article></div>
          </div>
        </div>
      </div>
    </div>);

}

function BlogWizard({ onClose, onSave }) {
  const [step, setStep] = useBState(1);
  const [topic, setTopic] = useBState("");
  const [custom, setCustom] = useBState("");
  const [steer, setSteer] = useBState("");
  const [sugs, setSugs] = useBState(["2026'da editoryal tasarım trendleri", "Marka kimliğinde tipografinin rolü", "Web'de mikro etkileşimlerin gücü", "Tasarım sistemleri nasıl ölçeklenir?", "Kreatif ekiplerde süreç yönetimi"]);
  const [data, setData] = useBState(null);
  const [busy, setBusy] = useBState(false);

  const genImg = (hue) => {const c = document.createElement("canvas");c.width = 480;c.height = 360;const x = c.getContext("2d");const h = ((150 + hue) % 360 + 360) % 360;const g = x.createLinearGradient(0, 0, 480, 360);g.addColorStop(0, `hsl(${h} 62% 72%)`);g.addColorStop(1, `hsl(${(h + 40) % 360} 30% 90%)`);x.fillStyle = g;x.fillRect(0, 0, 480, 360);x.fillStyle = "rgba(255,255,255,.45)";x.beginPath();x.arc(360, 110, 64, 0, 7);x.fill();return c.toDataURL("image/png");};

  const suggest = async () => {
    setBusy(true);
    const out = await AD().ai(`"${steer || "kreatif ajans, tasarım, marka"}" temasında bir blog için 5 özgün Türkçe başlık öner. Her satıra bir başlık yaz; numara veya işaret koyma.`, () => sugs.join("\n"));
    const list = out.split("\n").map((s) => s.replace(/^[-•\d.\)\s]+/, "").trim()).filter(Boolean).slice(0, 6);
    if (list.length) setSugs(list);
    setBusy(false);
  };

  const generate = async (tplId) => {
    setStep(3);setBusy(true);setData(null);
    const t = BLOG_TPLS.find((x) => x.id === tplId);
    const out = await AD().ai(`"${topic}" konusunda Türkçe, premium ve editoryal tonda bir blog yazısı yaz. TAM olarak şu formatta yanıt ver:\nKICKER: <tek kelimelik kategori>\nLEAD: <tek cümlelik çarpıcı giriş>\nBODY:\n<gövde metni, paragrafları boş satırla ayır, alt başlık için ## kullan>`, () => `KICKER: Görüş\nLEAD: ${topic} üzerine kısa bir giriş.\nBODY:\n${AD().SIM.blog(topic)}`);
    const kicker = ((out.match(/KICKER\s*:\s*(.+)/i) || [])[1] || "Görüş").trim();
    const lead = ((out.match(/LEAD\s*:\s*(.+)/i) || [])[1] || "").trim();
    const body = (out.split(/BODY\s*:/i)[1] || out).replace(/^#\s*.+$/m, "").trim();
    const f = {};
    t.blocks.forEach((b, i) => {
      if (b.t === "title") f[b.k] = topic;else
      if (b.t === "kicker") f[b.k] = kicker;else
      if (b.t === "lead") f[b.k] = lead;else
      if (b.t === "rich") f[b.k] = body;else
      if (b.t === "cover" || b.t === "image") f[b.k] = genImg(i * 60 + 20);else
      if (b.t === "gallery") f[b.k] = [0, 1, 2, 3].map((g) => ({ id: Date.now() + g + Math.random(), src: genImg(g * 70), caption: "" }));else
      if (b.t === "qa") f[b.k] = [{ id: 1, q: `${topic} nedir?`, a: lead || "…" }, { id: 2, q: "Neden önemli?", a: "Markanın dijitalde fark yaratması için kritik." }];else
      if (b.t === "list") f[b.k] = [{ id: 1, h: "Net bir yön belirleyin", text: lead, img: genImg(30) }, { id: 2, h: "Tutarlı uygulayın", text: "Tek bir vurgu ve ritim.", img: null }];
    });
    setData({ template: tplId, status: "Taslak", fields: f });setBusy(false);
  };

  const save = (status) => {const f = data.fields;onSave({ template: data.template, status, fields: f, title: f.title || topic, cat: f.kicker || "Görüş", cover: f.cover || null, date: status === "Yayında" ? new Date().toLocaleDateString("tr-TR", { day: "2-digit", month: "short", year: "numeric" }) : "—", author: "AI", views: "—" });};

  const Steps = () =>
  <div className="wiz-steps">
      {[["1", "Konu"], ["2", "Şablon"], ["3", "Üret & önizle"]].map(([n, l]) =>
    <div key={n} className={`wiz-step ${+n === step ? "on" : ""} ${+n < step ? "done" : ""}`}><span className="wiz-step__n">{+n < step ? "✓" : n}</span>{l}</div>
    )}
    </div>;


  return (
    <div>
      <div className="ed-toolbar"><button className="ed-back" onClick={onClose}><Icon name="close" size={14} /> Kapat</button><span className="ai-chip"><Icon name="ai" size={12} fill /> AI Yazı Sihirbazı</span><span className="sp" /><Steps /></div>

      {step === 1 &&
      <AdmCard title="Konu seç" desc="AI'ın önerdiği konulardan seç ya da yönlendir">
          <div className="ai-row" style={{ marginBottom: "var(--space-4)" }}>
            <div style={{ flex: 1 }}><Field label="AI'ı yönlendir (tema/anahtar kelime)"><input className="adm-input" value={steer} onChange={(e) => setSteer(e.target.value)} placeholder="örn. motion tasarım, SaaS markalaşma" onKeyDown={(e) => e.key === "Enter" && suggest()} /></Field></div>
            <button className="adm-btn adm-btn--ghost" disabled={busy} onClick={suggest} style={{ marginBottom: 16 }}>{busy ? <><span className="ai-spinner" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} /> …</> : <><Icon name="ai" size={14} /> Konu öner</>}</button>
          </div>
          <div className="wiz-chips">
            {sugs.map((s, i) => <button key={i} className="wiz-chip" onClick={() => {setTopic(s);setStep(2);}}><Icon name="ai" size={13} /> {s}</button>)}
          </div>
          <div className="pick-sep">veya kendi konunu yaz</div>
          <div className="ai-row">
            <div style={{ flex: 1 }}><input className="adm-input" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="Kendi başlık fikrin…" onKeyDown={(e) => e.key === "Enter" && custom.trim() && (setTopic(custom.trim()), setStep(2))} /></div>
            <button className="adm-btn adm-btn--primary" disabled={!custom.trim()} onClick={() => {setTopic(custom.trim());setStep(2);}}>Devam <span className="arr">→</span></button>
          </div>
        </AdmCard>
      }

      {step === 2 &&
      <AdmCard title="Şablon seç" desc={`Konu: “${topic}” · düzene uygun bir şablon seç`}
      action={<button className="ed-back" onClick={() => setStep(1)}>← Konu</button>}>
          <div className="btpl-grid">
            {BLOG_TPLS.map((t) =>
          <button key={t.id} className="btpl" onClick={() => generate(t.id)}>
                <div className="btpl__vis">{t.vis.map((v, i) => v === "img" ? <b key={i} className="img" /> : v === "row2" ? <div key={i} className="row"><b className="img" /><b className="img" /></div> : v === "qa" ? <i key={i} className="bar" style={{ width: "60%" }} /> : v === "step" ? <div key={i} className="row" style={{ flex: "none", alignItems: "center" }}><i className="bar" style={{ width: 18, height: 18, borderRadius: 9 }} /><i className="bar" style={{ flex: 1 }} /></div> : v === "bars" ? <><i key={i} className="bar" /><i className="bar" style={{ width: "80%" }} /></> : <i key={i} className="bar" style={{ width: i ? "70%" : "100%" }} />)}</div>
                <div className="btpl__b"><h4>{t.label}</h4><p>{t.desc}</p></div>
              </button>
          )}
          </div>
        </AdmCard>
      }

      {step === 3 &&
      <div>
          <div className="ed-toolbar">
            <button className="ed-back" onClick={() => setStep(2)}>← Şablon</button>
            <span className="adm-badge adm-badge--green">{(BLOG_TPLS.find((t) => t.id === (data && data.template)) || {}).label || "Üretiliyor"}</span>
            <span className="sp" />
            <button className="adm-btn adm-btn--danger" onClick={onClose}><Icon name="trash" size={14} /> Sil</button>
            <button className="adm-btn adm-btn--ghost" disabled={busy || !data} onClick={() => save("Taslak")}>Taslağa kaydet</button>
            <button className="adm-btn adm-btn--primary" disabled={busy || !data} onClick={() => save("Yayında")}><Icon name="eye" size={15} /> Yayınla</button>
          </div>
          {busy || !data ?
        <div className="adm-empty"><span className="ai-spinner" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} /><h3 style={{ marginTop: 12 }}>AI içerik ve görseller üretiliyor…</h3><p>“{topic}” için metinler ve görsel alanları dolduruluyor.</p></div> :

        <div className="prev-frame">
              <div className="prev-frame__bar"><Icon name="ai" size={13} /> AI önizleme — yayına hazır</div>
              <div className="prev-scroll"><article className="pv">
                {BLOG_TPLS.find((t) => t.id === data.template).blocks.map((b) => <BlockPreview key={b.k} block={b} value={data.fields[b.k]} />)}
              </article></div>
            </div>
        }
        </div>
      }
    </div>);

}

Object.assign(window, { BlogEditor, BlogWizard, BLOG_TPLS, renderRich });