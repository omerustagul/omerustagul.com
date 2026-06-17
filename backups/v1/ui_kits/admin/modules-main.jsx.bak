/* Admin core modules: Dashboard, Appearance, Content (AI blog), Reports (AI). */
const { useState: useMState, useEffect: useMEffect, useRef: useMRef } = React;
const A = () => window.MK_ADMIN;

/* ----------------------------- DASHBOARD ----------------------------- */
function Dashboard({ go }) {
  const week = [42, 55, 48, 63, 71, 58, 80];
  return (
    <>
      <div className="adm-grid adm-grid--4">
        {A().stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>
      <div className="adm-grid adm-grid--3">
        <AdmCard title="Haftalık trafik" desc="Son 7 gün" className="" >
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 140, paddingTop: 10 }}>
            {week.map((h, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ width: "100%", height: h * 1.5, background: "var(--accent)", borderRadius: "6px 6px 0 0", opacity: .35 + i * 0.09 }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)" }}>{["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"][i]}</span>
              </div>
            ))}
          </div>
        </AdmCard>
        <AdmCard title="Hızlı AI işlemleri">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button className="adm-btn adm-btn--primary" onClick={() => go("reports")}><Icon name="ai" size={16} /> Haftalık rapor oluştur</button>
            <button className="adm-btn adm-btn--ghost" onClick={() => go("content")}><Icon name="blog" size={16} /> AI ile blog yazısı yaz</button>
            <button className="adm-btn adm-btn--ghost" onClick={() => go("appearance")}><Icon name="appearance" size={16} /> Görünümü düzenle</button>
          </div>
          <p style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", marginTop: 14 }}>
            AI {A().aiAvailable ? "bağlı — gerçek üretim aktif." : "bağlı değil — simülasyon modu."}
          </p>
        </AdmCard>
        <AdmCard title="Son hareketler">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {A().activity.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontSize: "var(--fs-sm)" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", marginTop: 6, flex: "none" }} />
                <div><b style={{ fontWeight: 600 }}>{a.who}</b> <span style={{ color: "var(--text-muted)" }}>{a.what}</span><br /><span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-subtle)" }}>{a.when}</span></div>
              </div>
            ))}
          </div>
        </AdmCard>
      </div>
    </>
  );
}

/* ----------------------------- APPEARANCE ---------------------------- */
function MiniHeader({ id }) {
  const logo = <span className="m-logo" />;
  const nav = <span className="m-nav">{[0, 1, 2].map(i => <i key={i} />)}</span>;
  const cta = <span className="m-cta" />;
  if (id === "centered") return <div className="tpl-mini center"><div className="m-row">{cta}{logo}{cta}</div><div className="m-row">{[0, 1, 2, 3].map(i => <i key={i} style={{ width: 14, height: 4, borderRadius: 2, background: "var(--ink-300)" }} />)}</div></div>;
  if (id === "minimal") return <div className="tpl-mini">{logo}<span style={{ flex: 1 }} />{cta}</div>;
  if (id === "split") return <div className="tpl-mini">{logo}<span style={{ flex: 1 }} />{nav}{cta}</div>;
  return <div className="tpl-mini">{logo}{nav}{cta}</div>;
}

function Appearance() {
  const [cfg, setCfg] = useMState(window.MarkaTheme.get());
  const T = window.MarkaTheme;
  const previewRef = useMRef(null);
  const update = (patch) => { T.set(patch); setCfg(T.get()); };

  return (
    <div className="adm-grid adm-grid--2" style={{ alignItems: "start", gridTemplateColumns: "1fr 1fr" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <AdmCard title="Header şablonu" desc="Tüm sayfalarda anında geçerli olur">
          <div className="tpl-grid">
            {T.HEADER_TEMPLATES.map(t => (
              <button key={t.id} className={`tpl-card ${cfg.headerTemplate === t.id ? "on" : ""}`} onClick={() => update({ headerTemplate: t.id })}>
                <MiniHeader id={t.id} />
                <div className="tpl-card__name">{t.label} {cfg.headerTemplate === t.id && <span style={{ color: "var(--accent)" }}>●</span>}</div>
                <div className="tpl-card__desc">{t.desc}</div>
              </button>
            ))}
          </div>
        </AdmCard>

        <AdmCard title="Footer şablonu">
          <div className="tpl-grid">
            {T.FOOTER_TEMPLATES.map(t => (
              <button key={t.id} className={`tpl-card ${cfg.footerTemplate === t.id ? "on" : ""}`} onClick={() => update({ footerTemplate: t.id })}>
                <div className="tpl-mini" style={{ alignItems: "flex-end" }}>{[0, 1, 2].map(i => <span key={i} style={{ flex: 1, height: t.id === "compact" ? 8 : 22, background: "var(--ink-200)", borderRadius: 3 }} />)}</div>
                <div className="tpl-card__name">{t.label}</div>
                <div className="tpl-card__desc">{t.desc}</div>
              </button>
            ))}
          </div>
        </AdmCard>

        <AdmCard title="Hero düzeni" desc="Anasayfa kahraman alanının görünümü (müşteriye switcher görünmez)">
          <div className="tpl-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
            {T.HERO_VARIANTS.map(t => (
              <button key={t.id} className={`tpl-card ${cfg.heroVariant === t.id ? "on" : ""}`} onClick={() => update({ heroVariant: t.id })}>
                <div className="tpl-mini" style={t.id === "center" ? { flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 } : t.id === "split" ? {} : { flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                  {t.id === "split"
                    ? <><span style={{ flex: 1, height: 30, background: "var(--ink-200)", borderRadius: 4 }} /><span style={{ flex: 1, height: 30, background: "var(--accent)", opacity: .5, borderRadius: 4 }} /></>
                    : t.id === "center"
                      ? <><i style={{ width: "70%", height: 7, borderRadius: 2, background: "var(--text)" }} /><i style={{ width: "45%", height: 5, borderRadius: 2, background: "var(--ink-300)" }} /></>
                      : <><i style={{ width: "85%", height: 9, borderRadius: 2, background: "var(--text)" }} /><i style={{ width: "55%", height: 5, borderRadius: 2, background: "var(--ink-300)" }} /></>}
                </div>
                <div className="tpl-card__name">{t.label} {cfg.heroVariant === t.id && <span style={{ color: "var(--accent)" }}>●</span>}</div>
                <div className="tpl-card__desc">{t.desc}</div>
              </button>
            ))}
          </div>
        </AdmCard>

        <AdmCard title="Renk paleti & font">
          <Field label="Vurgu rengi">
            <div className="swatches">
              {T.ACCENTS.map(a => <button key={a.id} className={`swatch ${cfg.accent === a.value ? "on" : ""}`} style={{ background: a.value }} title={a.label} onClick={() => update({ accent: a.value })} />)}
              <label className="swatch" style={{ background: "conic-gradient(red,orange,yellow,lime,cyan,blue,magenta,red)", display: "grid", placeItems: "center" }} title="Özel renk">
                <input type="color" value={cfg.accent} onChange={e => update({ accent: e.target.value })} style={{ opacity: 0, width: 1, height: 1 }} />
                <span style={{ color: "#fff", mixBlendMode: "difference", fontSize: 12 }}>＋</span>
              </label>
            </div>
          </Field>
          <Field label="Font ailesi">
            <div className="font-list">
              {T.FONTS.map(f => (
                <button key={f.id} className={`font-opt ${cfg.font === f.id ? "on" : ""}`} onClick={() => update({ font: f.id })}>
                  <span className="nm" style={{ fontFamily: f.family }}>{f.label}</span>
                  <span style={{ fontFamily: f.family, color: "var(--text-muted)" }}>Aa Bb 123</span>
                </button>
              ))}
            </div>
          </Field>
          <div style={{ display: "flex", gap: "var(--space-6)", marginTop: 4, flexWrap: "wrap" }}>
            <Field label="Tema modu">
              <Seg value={cfg.mode} onChange={v => update({ mode: v })} options={[{ value: "light", label: "Açık" }, { value: "dark", label: "Koyu" }]} />
            </Field>
            <Field label={`Köşe yuvarlaklığı — ${cfg.radius}px`}>
              <input type="range" min="0" max="20" step="1" value={cfg.radius} onChange={e => update({ radius: +e.target.value })} style={{ accentColor: "var(--accent)", width: 180 }} />
            </Field>
          </div>
          <button className="adm-btn adm-btn--ghost" style={{ marginTop: 10 }} onClick={() => { T.reset(); setCfg(T.get()); }}>Varsayılana sıfırla</button>
        </AdmCard>

        <AdmCard title="Açılış pop-up'ı" desc="Siteye giren ziyaretçiye gösterilecek kampanya penceresi"
          action={<Switch on={!!(cfg.popup && cfg.popup.enabled)} onChange={v => update({ popup: Object.assign({}, cfg.popup, { enabled: v }) })} />}>
          {cfg.popup && cfg.popup.enabled ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <ImageUpload label="Görsel" ratio="16/9" value={cfg.popup.image} onChange={v => update({ popup: Object.assign({}, cfg.popup, { image: v }) })} hint="opsiyonel" />
              <Field label="Başlık"><input className="adm-input" value={cfg.popup.title || ""} onChange={e => update({ popup: Object.assign({}, cfg.popup, { title: e.target.value }) })} /></Field>
              <Field label="Metin"><textarea className="adm-textarea" style={{ minHeight: "5rem" }} value={cfg.popup.text || ""} onChange={e => update({ popup: Object.assign({}, cfg.popup, { text: e.target.value }) })} /></Field>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
                <Field label="Buton metni"><input className="adm-input" value={cfg.popup.ctaText || ""} onChange={e => update({ popup: Object.assign({}, cfg.popup, { ctaText: e.target.value }) })} /></Field>
                <Field label="Buton bağlantısı"><input className="adm-input" value={cfg.popup.ctaUrl || ""} onChange={e => update({ popup: Object.assign({}, cfg.popup, { ctaUrl: e.target.value }) })} placeholder="market.html" /></Field>
              </div>
              <Field label={`Açılma gecikmesi — ${cfg.popup.delaySec}sn`}>
                <input type="range" min="0" max="20" step="1" value={cfg.popup.delaySec} onChange={e => update({ popup: Object.assign({}, cfg.popup, { delaySec: +e.target.value }) })} style={{ accentColor: "var(--accent)", width: "100%" }} />
              </Field>
              <label className="lesson-free"><Switch on={cfg.popup.freqOncePerSession !== false} onChange={v => update({ popup: Object.assign({}, cfg.popup, { freqOncePerSession: v }) })} /> <span>Oturum başına yalnızca bir kez göster</span></label>
              <p className="seclist__hint"><Icon name="ai" size={13} /> Önizlemede pop-up {cfg.popup.delaySec} saniye sonra açılır. Test için önizlemeyi yenileyin.</p>
            </div>
          ) : (
            <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-sm)" }}>Pop-up kapalı. Açmak için sağdaki anahtarı kullanın; kampanya görseli, metni, butonu ve açılma süresini buradan ayarlayın.</p>
          )}
        </AdmCard>
      </div>

      <AdmCard className="appr-preview" title="Canlı önizleme" desc="Değişiklikler gerçek siteye anında yansır"
        action={<a className="adm-btn adm-btn--ghost" href="../website/index.html" target="_blank" rel="noopener"><Icon name="external" size={15} /> Sekmede aç</a>}>
        <div className="adm-preview">
          <div className="adm-preview__bar"><span className="adm-preview__dot" /><span className="adm-preview__dot" /><span className="adm-preview__dot" /><span style={{ marginLeft: 8 }}>marka.studio</span>
            <button className="adm-iconbtn" style={{ marginLeft: "auto" }} onClick={() => { if (previewRef.current) previewRef.current.src = previewRef.current.src; }} aria-label="Yenile">⟳</button>
          </div>
          <iframe ref={previewRef} src="../website/index.html" title="Önizleme" />
        </div>
      </AdmCard>
    </div>
  );
}

/* ------------------------------ CONTENT ------------------------------ */
function Content() {
  const [posts, setPosts] = useMState(A().posts);
  const [editing, setEditing] = useMState(null); // null=list, {}=new, post=edit
  const [wizard, setWizard] = useMState(false);

  const addPost = (p) => setPosts(prev => p.id ? prev.map(x => x.id === p.id ? { ...x, ...p } : x) : [{ id: Date.now(), views: "—", ...p }, ...prev]);

  if (wizard) return <BlogWizard onClose={() => setWizard(false)} onSave={(p) => { addPost(p); setWizard(false); }} />;
  if (editing !== null) {
    return <BlogEditor post={editing} onClose={() => setEditing(null)} onSave={(p) => { addPost(p); setEditing(null); }} />;
  }

  return (
    <AdmCard title="Blog yazıları" desc={`${posts.length} yazı`}
      action={<div style={{ display: "flex", gap: ".6rem" }}><button className="adm-btn adm-btn--ghost" style={{ borderRadius: "8px", height: "38px" }} onClick={() => setWizard(true)}><Icon name="ai" size={15} /> AI ile Üret</button><button className="adm-btn adm-btn--primary" style={{ borderRadius: "8px" }} onClick={() => setEditing({})}><Icon name="plus" size={15} /> Yeni Yazı</button></div>}>
      <table className="adm-table">
        <thead><tr><th></th><th>Başlık</th><th>Kategori</th><th>Durum</th><th>Tarih</th><th>Görüntülenme</th><th></th></tr></thead>
        <tbody>
          {posts.map(p => (
            <tr key={p.id}>
              <td style={{ width: 56 }}><div className="ph" style={{ width: 48, height: 32, borderRadius: 6 }}>{p.cover ? <img src={p.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }} /> : <div className="ph__in" />}</div></td>
              <td className="ti">{p.title}{p.template && <span style={{ marginLeft: 8, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-subtle)" }}>· {p.template}</span>}</td>
              <td style={{ color: "var(--text-muted)" }}>{p.cat}</td>
              <td><Badge tone={p.status === "Yayında" ? "green" : p.status === "Taslak" ? "muted" : "warn"}>{p.status}</Badge></td>
              <td style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>{p.date}</td>
              <td style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)" }}>{p.views}</td>
              <td><div className="adm-row-actions"><button className="adm-iconbtn" onClick={() => setEditing(p)}><Icon name="edit" size={14} /></button><button className="adm-iconbtn" onClick={() => setPosts(prev => prev.filter(x => x.id !== p.id))}><Icon name="trash" size={14} /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdmCard>
  );
}

/* ------------------------------ REPORTS ------------------------------ */
/* ------------------------------ REPORTS ------------------------------ */
function repInlineBold(s) { return s.split(/\*\*(.+?)\*\*/g).map((p, i) => i % 2 ? <strong key={i}>{p}</strong> : p); }
function repRenderMD(text) {
  const lines = (text || "").split("\n"); const out = []; let bul = [];
  const flush = () => { if (bul.length) { out.push(<ul key={"u" + out.length} className="rep-ul">{bul.map((b, i) => <li key={i}>{repInlineBold(b)}</li>)}</ul>); bul = []; } };
  lines.forEach((ln, idx) => {
    const t = ln.trim();
    if (!t || /^---+$/.test(t)) { flush(); return; }
    if (/^#{1,3}\s+/.test(t)) { flush(); out.push(<h4 key={idx} className="rep-h">{repInlineBold(t.replace(/^#{1,3}\s+/, ""))}</h4>); return; }
    if (/^[-•*]\s+/.test(t)) { bul.push(t.replace(/^[-•*]\s+/, "")); return; }
    flush(); out.push(<p key={idx} className="rep-p">{repInlineBold(t)}</p>);
  });
  flush(); return out;
}

function Reports() {
  const [report, setReport] = useMState(null);
  const [busy, setBusy] = useMState(false);
  const week = [42, 55, 48, 63, 71, 58, 80];
  const channels = [["Organik arama", 46], ["Sosyal medya", 24], ["Doğrudan", 18], ["Referans", 12]];
  const days = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];
  const maxW = Math.max(...week);

  const run = async () => {
    setBusy(true);
    const data = A().stats.map(s => `${s.label}: ${s.val} (${s.delta})`).join(", ");
    const text = await A().ai(`Bir kreatif ajansın yönetim paneli için, şu metriklere dayanarak Türkçe, SADE ve eyleme dönük kısa bir haftalık performans yorumu yaz: ${data}. "## Yönetici özeti" ve "## Öneriler" başlıklarını kullan, maddeler ekle. Markdown başlık ve madde işareti kullan, emoji kullanma.`, () => A().SIM.report());
    setBusy(false);
    setReport({ date: new Date().toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" }), narrative: text });
  };

  if (!report && !busy) {
    return (
      <AdmCard title="AI İçgörü & Raporlar" desc={A().aiAvailable ? "Gerçek zamanlı AI analizi" : "Simülasyon modu"}>
        <div className="ai-panel">
          <span className="ai-chip"><Icon name="ai" size={12} fill /> Marka AI Analist</span>
          <p style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)", margin: "10px 0 14px" }}>Güncel metriklerden grafiklerle zenginleştirilmiş, sade dilli bir haftalık rapor üret.</p>
          <button className="adm-btn adm-btn--primary" onClick={run}><Icon name="ai" size={15} /> Haftalık rapor oluştur</button>
        </div>
      </AdmCard>
    );
  }

  return (
    <div className="rep">
      <div className="rep-head">
        <div><div className="rep-kicker"><Icon name="ai" size={13} fill /> Marka AI · Haftalık Rapor</div><h2 className="rep-title">Performans özeti</h2><div className="rep-date">{report ? report.date : "…"}</div></div>
        <button className="adm-btn adm-btn--ghost" disabled={busy} onClick={run}>{busy ? <><span className="ai-spinner" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} /> Yenileniyor…</> : <><Icon name="ai" size={15} /> Yeniden oluştur</>}</button>
      </div>

      <div className="adm-grid adm-grid--4">{A().stats.map((s, i) => <StatCard key={i} {...s} />)}</div>

      <div className="adm-grid adm-grid--2" style={{ gridTemplateColumns: "1.3fr 1fr" }}>
        <AdmCard title="Haftalık trafik" desc="Son 7 gün · oturum">
          <div className="rep-chart">
            {week.map((h, i) => (
              <div key={i} className="rep-bar-col">
                <span className="rep-bar-val">{h}</span>
                <div className="rep-bar" style={{ height: `${(h / maxW) * 130}px`, opacity: .45 + i * 0.08 }} />
                <span className="rep-bar-day">{days[i]}</span>
              </div>
            ))}
          </div>
        </AdmCard>
        <AdmCard title="Trafik kaynakları" desc="Kanala göre dağılım">
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 4 }}>
            {channels.map(([name, pct]) => (
              <div key={name} className="chan-row">
                <div className="chan-top"><span>{name}</span><b>{pct}%</b></div>
                <div className="chan-track"><div className="chan-fill" style={{ width: pct + "%" }} /></div>
              </div>
            ))}
          </div>
        </AdmCard>
      </div>

      <AdmCard title="" desc="">
        <div className="rep-doc">
          {busy && !report ? <div style={{ color: "var(--text-muted)" }}><span className="ai-spinner" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} /> AI analiz ediyor…</div> : repRenderMD(report && report.narrative)}
        </div>
      </AdmCard>
    </div>
  );
}

Object.assign(window, { Dashboard, Appearance, Content, Reports });
