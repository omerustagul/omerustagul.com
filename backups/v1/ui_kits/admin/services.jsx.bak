/* Admin Hizmetler (Services) module — main services with nested sub-services.
   Each main service (parent: null) groups its sub-services. Projects pull from
   this list (grouped). Create/edit via a right slide-in drawer. */
const { useState: useSvState } = React;
const SV = () => window.MK_ADMIN;

function ServicesM() {
  const [rows, setRows] = useSvState(SV().services);
  const [editing, setEditing] = useSvState(null); // null | {parent?} (new) | service

  const sync = (next) => { setRows(next); SV().services = next; };
  const save = (svc) => {
    const exists = svc.id && rows.some(x => x.id === svc.id);
    const next = exists
      ? rows.map(x => x.id === svc.id ? { ...x, ...svc } : x)
      : [...rows, { ...svc, id: svc.id || ("svc" + Date.now()), parent: svc.parent || null }];
    sync(next);
    setEditing(null);
  };
  const remove = (id) => {
    // removing a main service also removes its children
    sync(rows.filter(x => x.id !== id && x.parent !== id));
  };

  const mains = rows.filter(s => !s.parent);
  const subsOf = (id) => rows.filter(s => s.parent === id);

  const SvcCard = ({ s }) => (
    <div className="svc-card">
      <div className="svc-card__top">
        <span className={`svc-dot ${s.active ? "on" : ""}`} />
        <h4>{s.name}</h4>
        <div className="adm-row-actions">
          <button className="adm-iconbtn" onClick={() => setEditing(s)} aria-label="Düzenle"><Icon name="edit" size={14} /></button>
          <button className="adm-iconbtn" onClick={() => remove(s.id)} aria-label="Sil"><Icon name="trash" size={14} /></button>
        </div>
      </div>
      <p>{s.desc}</p>
      <Badge tone={s.active ? "green" : "muted"}>{s.active ? "Aktif" : "Pasif"}</Badge>
    </div>
  );

  return (
    <>
      <AdmCard title="Hizmetler" desc={`${mains.length} ana hizmet · ${rows.length - mains.length} alt hizmet`}
        action={<button className="adm-btn adm-btn--primary" onClick={() => setEditing({ parent: null })}><Icon name="plus" size={15} /> Yeni Ana Hizmet</button>}>
        <div className="svc-groups">
          {mains.map(m => {
            const subs = subsOf(m.id);
            return (
              <section key={m.id} className="svc-group">
                <header className="svc-group__h">
                  <div className="svc-group__title">
                    <span className={`svc-dot ${m.active ? "on" : ""}`} />
                    <div>
                      <h3>{m.name} <span className="svc-group__count">{subs.length} alt hizmet</span></h3>
                      {m.desc && <p>{m.desc}</p>}
                    </div>
                  </div>
                  <div className="svc-group__actions">
                    <button className="adm-btn adm-btn--ghost" onClick={() => setEditing({ parent: m.id })}><Icon name="plus" size={14} /> Alt hizmet</button>
                    <button className="adm-iconbtn" onClick={() => setEditing(m)} aria-label="Ana hizmeti düzenle"><Icon name="edit" size={14} /></button>
                    <button className="adm-iconbtn" onClick={() => remove(m.id)} aria-label="Sil"><Icon name="trash" size={14} /></button>
                  </div>
                </header>
                {subs.length > 0 ? (
                  <div className="svc-grid">{subs.map(s => <SvcCard key={s.id} s={s} />)}</div>
                ) : (
                  <button className="svc-empty" onClick={() => setEditing({ parent: m.id })}><Icon name="plus" size={14} /> İlk alt hizmeti ekle</button>
                )}
              </section>
            );
          })}
        </div>
      </AdmCard>
      {editing !== null && <ServiceEditor service={editing} mains={mains} onClose={() => setEditing(null)} onSave={save} />}
    </>
  );
}

function ServiceEditor({ service, mains, onClose, onSave }) {
  const [s, setS] = useSvState({ name: "", desc: "", active: true, parent: null, ...service });
  const set = (k, v) => setS(p => ({ ...p, [k]: v }));
  const isMain = !s.parent;
  // can't reparent a main service that itself has children into another (keep one level)
  const parentOpts = [{ value: "", label: "— Ana hizmet (üst yok)" }, ...mains.filter(m => m.id !== s.id).map(m => ({ value: m.id, label: m.name }))];
  return (
    <Drawer title={service && service.id ? "Hizmeti düzenle" : (s.parent ? "Yeni alt hizmet" : "Yeni ana hizmet")}
      subtitle={isMain ? "Ana hizmet — altına alt hizmetler eklenebilir" : "Alt hizmet — bir ana hizmete bağlı"}
      onClose={onClose}
      footer={<><button className="adm-btn adm-btn--ghost" onClick={onClose}>Vazgeç</button><button className="adm-btn adm-btn--primary" disabled={!s.name.trim()} onClick={() => onSave(s)}>Kaydet</button></>}>
      <Field label="Üst hizmet">
        <MkSelect value={s.parent || ""} onChange={v => set("parent", v || null)} options={parentOpts} />
      </Field>
      <Field label="Hizmet adı"><input className="adm-input" value={s.name} onChange={e => set("name", e.target.value)} placeholder={isMain ? "örn. Geliştirme" : "örn. Mobil Uygulama"} autoFocus /></Field>
      <Field label="Kısa açıklama"><textarea className="adm-textarea" style={{ minHeight: "6rem" }} value={s.desc} onChange={e => set("desc", e.target.value)} placeholder="Bu hizmette ne sunuyorsunuz?" /></Field>
      <div className="set-row" style={{ alignItems: "center" }}>
        <div><b style={{ fontWeight: 600, fontSize: "var(--fs-sm)" }}>Aktif</b><div style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>Pasif hizmetler projelerde seçilemez</div></div>
        <Switch on={s.active} onChange={v => set("active", v)} />
      </div>
    </Drawer>
  );
}

Object.assign(window, { ServicesM });
