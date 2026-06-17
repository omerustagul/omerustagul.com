/* Admin "Talepler" — lead/quote pipeline. Kanban-style columns by stage with
   per-card stage move + detail drawer. Reads window.MarkaLeads. */
const { useState: useLdState, useEffect: useLdEffect } = React;
const LD = () => window.MarkaLeads;

const PRI_TONE = { "Yüksek": "green", "Orta": "warn", "Düşük": "muted" };
function fmtDate(ts) { return new Date(ts).toLocaleDateString("tr-TR", { day: "2-digit", month: "short" }); }

function LeadDrawer({ lead, onClose }) {
  const [l, setL] = useLdState(lead);
  const set = (k, v) => { const n = Object.assign({}, l, { [k]: v }); setL(n); LD().update(l.id, { [k]: v }); };
  return (
    <Drawer title={l.name} subtitle={l.email} onClose={onClose}
      footer={<><button className="adm-btn adm-btn--danger" onClick={() => { LD().remove(l.id); onClose(); }}><Icon name="trash" size={14} /> Sil</button><button className="adm-btn adm-btn--primary" onClick={onClose}>Bitti</button></>}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
        <Field label="Durum"><MkSelect value={l.status} onChange={v => set("status", v)} options={LD().STAGES} /></Field>
        <Field label="Öncelik"><MkSelect value={l.priority} onChange={v => set("priority", v)} options={["Yüksek", "Orta", "Düşük"]} /></Field>
      </div>
      <Field label="Bütçe"><input className="adm-input" value={l.budget || ""} onChange={e => set("budget", e.target.value)} /></Field>
      <Field label="Kaynak"><input className="adm-input" value={l.source || ""} readOnly /></Field>
      <Field label="Mesaj"><div className="lead-msg">{l.message || "—"}</div></Field>
      <Field label="Notlar"><textarea className="adm-textarea" value={l.notes || ""} onChange={e => set("notes", e.target.value)} placeholder="Dahili notlar…" /></Field>
      <div style={{ display: "flex", gap: ".6rem", marginTop: ".4rem" }}>
        <a className="adm-btn adm-btn--ghost" href={`mailto:${l.email}`}><Icon name="ai" size={14} /> E-posta gönder</a>
      </div>
    </Drawer>
  );
}

function Leads() {
  const [, force] = useLdState(0);
  const [open, setOpen] = useLdState(null);
  const [dragId, setDragId] = useLdState(null);
  useLdEffect(() => { if (!LD()) return; return LD().subscribe(() => force(n => n + 1)); }, []);
  if (!LD()) return null;
  const counts = LD().counts();
  const editing = open && LD().list().find(l => l.id === open);

  const drop = (stage) => { if (dragId) { LD().update(dragId, { status: stage }); setDragId(null); } };

  return (
    <AdmCard title="Talepler / Lead" desc={`${LD().list().length} talep · sürükleyerek aşamayı değiştir`}>
      <div className="pipe">
        {LD().STAGES.map(stage => (
          <div key={stage} className="pipe__col" onDragOver={e => e.preventDefault()} onDrop={() => drop(stage)}>
            <div className="pipe__colh"><span>{stage}</span><b>{counts[stage] || 0}</b></div>
            <div className="pipe__cards">
              {LD().byStage(stage).map(l => (
                <div key={l.id} className="leadcard" draggable onDragStart={() => setDragId(l.id)} onDragEnd={() => setDragId(null)} onClick={() => setOpen(l.id)}>
                  <div className="leadcard__top"><span className="leadcard__name">{l.name}</span><Badge tone={PRI_TONE[l.priority] || "muted"}>{l.priority}</Badge></div>
                  <p className="leadcard__msg">{l.message}</p>
                  <div className="leadcard__foot"><span className="mono">{l.budget}</span><span className="mono">{fmtDate(l.date)}</span></div>
                </div>
              ))}
              {!LD().byStage(stage).length && <div className="pipe__empty">—</div>}
            </div>
          </div>
        ))}
      </div>
      {editing && <LeadDrawer lead={editing} onClose={() => setOpen(null)} />}
    </AdmCard>
  );
}

Object.assign(window, { Leads });
