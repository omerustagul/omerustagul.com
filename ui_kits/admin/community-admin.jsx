/* Admin "Oyunlar & Topluluk" — toggle homepage games on/off, set daily play
   limit, and manage collections. Reads window.MarkaCommunity. */
const { useState: useCmaState, useEffect: useCmaEffect } = React;
const CMA = () => window.MarkaCommunity;
const GAME_LABELS = { memory: "Hafıza Eşleştirme", sequence: "Sıralı Dikkat", reaction: "Refleks" };

function CommunityAdmin() {
  const [cfg, setCfg] = useCmaState(CMA() ? CMA().get() : null);
  useCmaEffect(() => { if (!CMA()) return; return CMA().subscribe(() => setCfg(CMA().get())); }, []);
  if (!cfg) return null;
  const save = (patch) => { CMA().set(patch); setCfg(CMA().get()); };
  const setGame = (id, on) => save({ games: Object.assign({}, cfg.games, { [id]: on }) });
  const setColl = (id, patch) => save({ collections: cfg.collections.map(c => c.id === id ? Object.assign({}, c, patch) : c) });
  const addColl = () => save({ collections: cfg.collections.concat([{ id: "k" + Date.now(), title: "Yeni Koleksiyon", count: 0, hue: 0, base: 0 }]) });
  const delColl = (id) => save({ collections: cfg.collections.filter(c => c.id !== id) });

  return (
    <div className="adm-stack" style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
      <AdmCard title="Zihin Oyunları" desc="Anasayfadaki oyunları yönet">
        <div style={{ display: "flex", flexDirection: "column" }}>
          {Object.keys(GAME_LABELS).map(id => (
            <label key={id} className="swrow"><div className="swrow__txt"><b>{GAME_LABELS[id]}</b><span>Anasayfada göster</span></div><Switch on={cfg.games[id] !== false} onChange={v => setGame(id, v)} /></label>
          ))}
        </div>
        <Field label={`Günlük oynama hakkı: ${cfg.dailyLimit}`}>
          <div className="seg seg--wrap">
            {[1, 2, 3, 5].map(n => <button key={n} className={`seg__btn ${cfg.dailyLimit === n ? "on" : ""}`} onClick={() => save({ dailyLimit: n })}>{n}/gün</button>)}
          </div>
        </Field>
      </AdmCard>

      <AdmCard title="Koleksiyonlar" desc={`${cfg.collections.length} koleksiyon`}
        action={<button className="adm-btn adm-btn--primary" onClick={addColl}><Icon name="plus" size={14} /> Ekle</button>}>
        <div className="cvrep">
          {cfg.collections.map(c => (
            <div key={c.id} className="cvrep-item">
              <div className="cvrep-item__bar"><span className="cvrep-item__n">#{c.id}</span><button className="adm-iconbtn" onClick={() => delColl(c.id)} aria-label="Sil"><Icon name="trash" size={13} /></button></div>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 90px 90px 100px", gap: ".5rem" }}>
                <input className="adm-input" value={c.title} onChange={e => setColl(c.id, { title: e.target.value })} placeholder="Başlık" />
                <input className="adm-input" type="number" value={c.count} onChange={e => setColl(c.id, { count: +e.target.value })} placeholder="Proje" />
                <input className="adm-input" type="number" value={c.base} onChange={e => setColl(c.id, { base: +e.target.value })} placeholder="Takipçi" />
                <input className="adm-input" type="number" value={c.hue} onChange={e => setColl(c.id, { hue: +e.target.value })} placeholder="Renk" />
              </div>
            </div>
          ))}
        </div>
      </AdmCard>
    </div>
  );
}
Object.assign(window, { CommunityAdmin });
