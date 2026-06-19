"use client";

import React, { useState } from "react";
import { AdmCard, Badge, Field, MkSelect } from "@/components/admin/ui";
import { Icon } from "@/components/admin/AdminIcons";

const STAGES = ["Yeni", "Görüşülüyor", "Teklif", "Kazanıldı", "Kaybedildi"];
const PRI_TONE: any = { "Yüksek": "green", "Orta": "warn", "Düşük": "muted" };

const INITIAL_LEADS = [
  { id: "L1", name: "Ahmet Yılmaz", email: "ahmet@example.com", status: "Yeni", priority: "Yüksek", budget: "₺50,000", date: "2026-06-18T10:00:00Z", message: "E-ticaret sitemiz için yenileme çalışması istiyoruz.", source: "Web Sitesi Formu", notes: "" },
  { id: "L2", name: "Zeynep Demir", email: "zeynep@example.com", status: "Görüşülüyor", priority: "Orta", budget: "₺20,000", date: "2026-06-15T14:30:00Z", message: "Kurumsal kimlik çalışması fiyat bilgisi alabilir miyim?", source: "Instagram", notes: "Perşembe günü arandı." },
  { id: "L3", name: "Can Tech", email: "info@cantech.io", status: "Teklif", priority: "Yüksek", budget: "$5,000", date: "2026-06-10T09:15:00Z", message: "SaaS projesi arayüz tasarımı (Figma).", source: "Referans", notes: "Teklif iletildi, dönüş bekleniyor." }
];

function fmtDate(ts: string) { return new Date(ts).toLocaleDateString("tr-TR", { day: "2-digit", month: "short" }); }

function Drawer({ title, subtitle, onClose, footer, children }: any) {
  return (
    <>
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 100 }} onClick={onClose} />
      <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "450px", background: "var(--surface)", zIndex: 101, boxShadow: "-4px 0 24px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{title}</h3>
            {subtitle && <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 4 }}>{subtitle}</div>}
          </div>
          <button className="adm-iconbtn" onClick={onClose}><Icon name="close" size={16} /></button>
        </div>
        <div style={{ padding: "1.5rem", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {children}
        </div>
        {footer && <div style={{ padding: "1.5rem", borderTop: "1px solid var(--border)", display: "flex", gap: "1rem", justifyContent: "flex-end" }}>{footer}</div>}
      </div>
    </>
  );
}

function LeadDrawer({ lead, onClose, onUpdate, onRemove }: any) {
  const [l, setL] = useState(lead);
  const update = (k: string, v: any) => { const next = { ...l, [k]: v }; setL(next); onUpdate(next); };
  
  return (
    <Drawer 
      title={l.name} 
      subtitle={l.email} 
      onClose={onClose}
      footer={
        <>
          <button className="adm-btn adm-btn--danger" onClick={() => { onRemove(l.id); onClose(); }}><Icon name="trash" size={14} /> Sil</button>
          <button className="adm-btn adm-btn--primary" onClick={onClose}>Bitti</button>
        </>
      }
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <Field label="Durum"><MkSelect value={l.status} onChange={v => update("status", v)} options={STAGES} /></Field>
        <Field label="Öncelik"><MkSelect value={l.priority} onChange={v => update("priority", v)} options={["Yüksek", "Orta", "Düşük"]} /></Field>
      </div>
      <Field label="Bütçe"><input className="adm-input" value={l.budget || ""} onChange={e => update("budget", e.target.value)} /></Field>
      <Field label="Kaynak"><input className="adm-input" value={l.source || ""} readOnly /></Field>
      <Field label="Mesaj"><div style={{ background: "var(--surface-muted)", padding: "1rem", borderRadius: "8px", fontSize: 13, lineHeight: 1.6 }}>{l.message || "—"}</div></Field>
      <Field label="Notlar"><textarea className="adm-textarea" style={{ minHeight: "6rem" }} value={l.notes || ""} onChange={e => update("notes", e.target.value)} placeholder="Dahili notlar…" /></Field>
      <div style={{ display: "flex", gap: ".6rem", marginTop: ".4rem" }}>
        <a className="adm-btn adm-btn--ghost" href={`mailto:${l.email}`}><Icon name="ai" size={14} /> E-posta gönder</a>
      </div>
    </Drawer>
  );
}

export function LeadsClient() {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [openId, setOpenId] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);

  const editing = openId ? leads.find(l => l.id === openId) : null;

  const updateLead = (lead: any) => {
    setLeads(leads.map(l => l.id === lead.id ? lead : l));
  };
  
  const removeLead = (id: string) => {
    setLeads(leads.filter(l => l.id !== id));
  };

  const drop = (stage: string) => { 
    if (dragId) { 
      setLeads(leads.map(l => l.id === dragId ? { ...l, status: stage } : l));
      setDragId(null); 
    } 
  };

  return (
    <AdmCard title="Talepler / Lead" desc={`${leads.length} talep · sürükleyerek aşamayı değiştir`}>
      <div style={{ display: "flex", gap: "1rem", overflowX: "auto", paddingBottom: "1rem", minHeight: "70vh" }}>
        {STAGES.map(stage => {
          const colLeads = leads.filter(l => l.status === stage);
          return (
            <div 
              key={stage} 
              style={{ width: "300px", flexShrink: 0, display: "flex", flexDirection: "column", background: "var(--surface-muted)", borderRadius: "12px", padding: "0.5rem" }}
              onDragOver={e => e.preventDefault()} 
              onDrop={() => drop(stage)}
            >
              <div style={{ padding: "1rem 0.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: 1, color: "var(--text-subtle)" }}>
                <span>{stage}</span>
                <b style={{ background: "var(--surface)", padding: "2px 8px", borderRadius: 10 }}>{colLeads.length}</b>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
                {colLeads.map(l => (
                  <div 
                    key={l.id} 
                    draggable 
                    onDragStart={() => setDragId(l.id)} 
                    onDragEnd={() => setDragId(null)} 
                    onClick={() => setOpenId(l.id)}
                    style={{ background: "#fff", padding: "1rem", borderRadius: "8px", border: "1px solid var(--border)", boxShadow: "0 2px 4px rgba(0,0,0,0.02)", cursor: "grab" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{l.name}</span>
                      <Badge tone={PRI_TONE[l.priority] || "muted"}>{l.priority}</Badge>
                    </div>
                    <p style={{ margin: "0 0 1rem 0", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{l.message}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "var(--text-subtle)", fontFamily: "var(--font-mono)" }}>
                      <span>{l.budget}</span>
                      <span>{fmtDate(l.date)}</span>
                    </div>
                  </div>
                ))}
                {!colLeads.length && <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)", fontSize: 13 }}>—</div>}
              </div>
            </div>
          );
        })}
      </div>
      {editing && <LeadDrawer lead={editing} onClose={() => setOpenId(null)} onUpdate={updateLead} onRemove={removeLead} />}
    </AdmCard>
  );
}
