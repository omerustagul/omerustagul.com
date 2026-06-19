"use client";

import React, { useState } from "react";
import { AdmCard, Badge, Switch, Field, MkSelect, Drawer } from "@/components/admin/ui";
import { Icon } from "@/components/admin/AdminIcons";

function uid() { return "svc" + Math.random().toString(36).slice(2, 9); }

const INITIAL_SERVICES = [
  { id: "m1", name: "Tasarım", desc: "UI/UX, marka kimliği, grafik", active: true, parent: null },
  { id: "s1", name: "UI/UX Tasarım", desc: "Kullanıcı deneyimi odaklı arayüzler", active: true, parent: "m1" },
  { id: "s2", name: "Marka Kimliği", desc: "Kurumsal kimlik ve logo tasarımı", active: true, parent: "m1" },
  { id: "m2", name: "Geliştirme", desc: "Web, mobil ve backend", active: true, parent: null },
  { id: "s3", name: "Web Geliştirme", desc: "React, Next.js ile modern siteler", active: true, parent: "m2" }
];

function ServiceEditor({ service, mains, onClose, onSave }: any) {
  const [s, setS] = useState({ name: "", desc: "", active: true, parent: null, ...service });
  const set = (k: string, v: any) => setS((p: any) => ({ ...p, [k]: v }));
  const isMain = !s.parent;
  const parentOpts = [{ value: "", label: "— Ana hizmet (üst yok)" }, ...mains.filter((m: any) => m.id !== s.id).map((m: any) => ({ value: m.id, label: m.name }))];

  return (
    <Drawer 
      title={service && service.id ? "Hizmeti düzenle" : (s.parent ? "Yeni alt hizmet" : "Yeni ana hizmet")}
      subtitle={isMain ? "Ana hizmet — altına alt hizmetler eklenebilir" : "Alt hizmet — bir ana hizmete bağlı"}
      onClose={onClose}
      footer={
        <>
          <button className="adm-btn adm-btn--ghost" onClick={onClose}>Vazgeç</button>
          <button className="adm-btn adm-btn--primary" disabled={!s.name.trim()} onClick={() => onSave(s)}>Kaydet</button>
        </>
      }
    >
      <Field label="Üst hizmet">
        <MkSelect value={s.parent || ""} onChange={v => set("parent", v || null)} options={parentOpts} />
      </Field>
      <Field label="Hizmet adı"><input className="adm-input" value={s.name} onChange={e => set("name", e.target.value)} placeholder={isMain ? "örn. Geliştirme" : "örn. Mobil Uygulama"} autoFocus /></Field>
      <Field label="Kısa açıklama"><textarea className="adm-textarea" style={{ minHeight: "6rem" }} value={s.desc} onChange={e => set("desc", e.target.value)} placeholder="Bu hizmette ne sunuyorsunuz?" /></Field>
      <div className="set-row" style={{ alignItems: "center" }}>
        <div><b style={{ fontWeight: 600, fontSize: "var(--fs-sm)" }}>Aktif</b><div style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>Pasif hizmetler projelerde seçilemez</div></div>
        <Switch on={s.active} onChange={(v: boolean) => set("active", v)} />
      </div>
    </Drawer>
  );
}

export function ServicesClient() {
  const [rows, setRows] = useState(INITIAL_SERVICES);
  const [editing, setEditing] = useState<any>(null);

  const save = (svc: any) => {
    const exists = svc.id && rows.some(x => x.id === svc.id);
    const next = exists
      ? rows.map(x => x.id === svc.id ? { ...x, ...svc } : x)
      : [...rows, { ...svc, id: svc.id || uid(), parent: svc.parent || null }];
    setRows(next);
    setEditing(null);
  };

  const remove = (id: string) => {
    setRows(rows.filter(x => x.id !== id && x.parent !== id));
  };

  const mains = rows.filter(s => !s.parent);
  const subsOf = (id: string) => rows.filter(s => s.parent === id);

  const SvcCard = ({ s }: { s: any }) => (
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
      <AdmCard 
        title="Hizmetler" 
        desc={`${mains.length} ana hizmet · ${rows.length - mains.length} alt hizmet`}
        action={
          <button className="adm-btn adm-btn--primary" onClick={() => setEditing({ parent: null })}>
            <Icon name="plus" size={15} /> Yeni Ana Hizmet
          </button>
        }
      >
        <div className="svc-groups">
          {mains.map(m => {
            const subs = subsOf(m.id);
            return (
              <section key={m.id} className="svc-group">
                <header className="svc-group__h">
                  <div className="svc-group__title">
                    <span className={`svc-dot ${m.active ? "on" : ""}`} />
                    <div>
                      <h3>
                        {m.name}
                        <span className="svc-group__count">{subs.length} alt hizmet</span>
                      </h3>
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
                  <div className="svc-grid">
                    {subs.map(s => <SvcCard key={s.id} s={s} />)}
                  </div>
                ) : (
                  <button className="svc-empty" onClick={() => setEditing({ parent: m.id })}>
                    <Icon name="plus" size={14} /> İlk alt hizmeti ekle
                  </button>
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
