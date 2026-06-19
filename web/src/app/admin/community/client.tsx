"use client";

import React, { useState, useTransition } from "react";
import { AdmCard, Switch, Field } from "@/components/admin/ui";
import { Icon } from "@/components/admin/AdminIcons";
import { saveCommunityConfig } from "@/lib/actions/community-config";
import type { CommunityConfig } from "@/lib/community-config";

const GAME_LABELS: any = { memory: "Hafıza Eşleştirme", sequence: "Sıralı Dikkat", reaction: "Refleks" };

export function CommunityClient({ initial }: { initial: CommunityConfig }) {
  const [cfg, setCfg] = useState<CommunityConfig>(initial);
  const [saved, setSaved] = useState(false);
  const [pending, start] = useTransition();

  const save = () =>
    start(async () => {
      const res = await saveCommunityConfig(cfg);
      if (!res?.error) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    });

  const setGame = (id: string, on: boolean) => setCfg(c => ({ ...c, games: { ...c.games, [id]: on } }));
  const setColl = (id: string, patch: any) => setCfg(c => ({ ...c, collections: c.collections.map(col => col.id === id ? { ...col, ...patch } : col) }));
  const addColl = () => setCfg(c => ({ ...c, collections: [...c.collections, { id: "k" + Date.now(), title: "Yeni Koleksiyon", count: 0, base: 0, hue: 0 }] }));
  const delColl = (id: string) => setCfg(c => ({ ...c, collections: c.collections.filter(col => col.id !== id) }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div className="ed-toolbar">
        <span className="adm-badge adm-badge--green">Oyunlar & Topluluk</span>
        <span className="sp" />
        {saved && <span className="adm-badge adm-badge--green" style={{ marginRight: ".5rem" }}>Kaydedildi ✓</span>}
        <button className="adm-btn adm-btn--primary" onClick={save} disabled={pending}>{pending ? "Kaydediliyor…" : "Kaydet"}</button>
      </div>

      <AdmCard title="Zihin Oyunları" desc="Anasayfadaki etkileşimli oyunları yönet">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
          {Object.keys(GAME_LABELS).map(id => (
            <div key={id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem", background: "var(--surface-muted)", borderRadius: "8px" }}>
              <div>
                <b style={{ fontWeight: 600, fontSize: 14 }}>{GAME_LABELS[id]}</b>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>Anasayfada göster</div>
              </div>
              <Switch on={(cfg.games as any)[id] !== false} onChange={(v: boolean) => setGame(id, v)} />
            </div>
          ))}
        </div>
        <Field label={`Günlük oynama hakkı: ${cfg.dailyLimit}`}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[1, 2, 3, 5].map(n => (
              <button 
                key={n} 
                style={{ padding: "0.5rem 1rem", borderRadius: "20px", border: "1px solid var(--border)", background: cfg.dailyLimit === n ? "var(--text)" : "var(--surface)", color: cfg.dailyLimit === n ? "var(--surface)" : "var(--text)", fontWeight: 600, cursor: "pointer", transition: "0.2s" }} 
                onClick={() => setCfg(c => ({ ...c, dailyLimit: n }))}
              >
                {n}/gün
              </button>
            ))}
          </div>
        </Field>
      </AdmCard>

      <AdmCard 
        title="Koleksiyonlar" 
        desc={`${cfg.collections.length} koleksiyon`}
        action={
          <button className="adm-btn adm-btn--primary" onClick={addColl}>
            <Icon name="plus" size={14} /> Ekle
          </button>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {cfg.collections.map((c: any, i: number) => (
            <div key={c.id} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid var(--surface-muted)" }}>
                <span style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: 14, fontFamily: "var(--font-mono)" }}>#{c.id}</span>
                <button className="adm-iconbtn" onClick={() => delColl(c.id)} aria-label="Sil"><Icon name="trash" size={14} /></button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "1rem" }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase" }}>Başlık</div>
                  <input className="adm-input" value={c.title} onChange={e => setColl(c.id, { title: e.target.value })} placeholder="Koleksiyon başlığı" />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase" }}>Proje Sayısı</div>
                  <input className="adm-input" type="number" value={c.count} onChange={e => setColl(c.id, { count: +e.target.value })} />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase" }}>Takipçi</div>
                  <input className="adm-input" type="number" value={c.base} onChange={e => setColl(c.id, { base: +e.target.value })} />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase" }}>Renk Derecesi</div>
                  <input className="adm-input" type="number" value={c.hue} onChange={e => setColl(c.id, { hue: +e.target.value })} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </AdmCard>
    </div>
  );
}
