"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AdmCard, Field, ImageUpload, GalleryUpload, MkSelect, Badge } from "@/components/admin/ui";
import { Icon } from "@/components/admin/AdminIcons";
import { upsertProject, deleteProjectById, type ProjectInput } from "@/lib/actions/admin";

// Project rows come from the DB (Prisma). Rich case-study fields live in `data`.
type DbProject = {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  category: string | null;
  tag: string;
  image: string | null;
  featured: boolean;
  order: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

// Service picker options. (The Services module manages these; kept inline until
// the picker is wired to that module — names are resolved and stored in data.)
const MOCK_SERVICES = [
  { id: "s1", name: "Marka", parent: null, active: true },
  { id: "s1_1", name: "Kurumsal Kimlik", parent: "s1", active: true },
  { id: "s1_2", name: "Logo", parent: "s1", active: true },
  { id: "s2", name: "Web", parent: null, active: true },
  { id: "s2_1", name: "UI/UX Tasarım", parent: "s2", active: true },
  { id: "s2_2", name: "Yazılım Geliştirme", parent: "s2", active: true },
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MetricsRepeater({ items = [], onChange }: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const set = (id: string, k: string, v: string) => onChange(items.map((m: any) => m.id === id ? { ...m, [k]: v } : m));
  const add = () => onChange([...items, { id: uid(), label: "", before: "", after: "" }]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const del = (id: string) => onChange(items.filter((m: any) => m.id !== id));

  return (
    <div className="metrics">
      <div className="metrics__head">
        <span>Metrik</span><span>Önce</span><span>Sonra</span><span />
      </div>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {items.map((m: any) => (
        <div key={m.id} className="metrics__row">
          <input className="adm-input" value={m.label} onChange={e => set(m.id, "label", e.target.value)} placeholder="örn. Dönüşüm oranı" />
          <input className="adm-input" value={m.before} onChange={e => set(m.id, "before", e.target.value)} placeholder="%1,9" />
          <input className="adm-input" value={m.after} onChange={e => set(m.id, "after", e.target.value)} placeholder="%4,3" />
          <button className="adm-iconbtn" onClick={() => del(m.id)} aria-label="Sil"><Icon name="trash" size={14} /></button>
        </div>
      ))}
      <button className="adm-btn adm-btn--ghost" style={{ alignSelf: "flex-start" }} onClick={add}>
        <Icon name="plus" size={14} /> Metrik ekle
      </button>
    </div>
  );
}

function ProjectEditor({
  project,
  allProjects,
  onClose,
  onSave,
}: {
  project: DbProject | null;
  allProjects: DbProject[];
  onClose: () => void;
  onSave: (input: ProjectInput) => Promise<void>;
}) {
  const allSvc = MOCK_SERVICES;
  const mainName = (id: string) => (allSvc.find(s => s.id === id) || {}).name;
  const serviceOptions = allSvc
    .filter(s => s.parent && s.active)
    .map(s => ({ value: s.id, label: s.name, group: mainName(s.parent!) || "Diğer" }))
    .sort((a, b) => (a.group + a.label).localeCompare(b.group + b.label, "tr"));

  const rich = (project && project.data) || {};
  const init = {
    id: project?.id,
    status: rich.status || "Taslak",
    fields: {
      title: project?.title || "",
      client: project?.client || "",
      category: project?.category || "",
      cover: project?.image || "",
      year: rich.year || String(new Date().getFullYear()),
      serviceIds: rich.serviceIds || [],
      duration: rich.duration || "",
      role: rich.role || "",
      problem: rich.problem || "",
      solution: rich.solution || "",
      body: rich.body || "",
      metrics: rich.metrics || [],
      quote: rich.quote || "",
      quoteAuthor: rich.quoteAuthor || "",
      quoteRole: rich.quoteRole || "",
      gallery: rich.gallery || [],
      next: rich.next || "",
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(init);
  const [aiBusy, setAiBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const f = data.fields;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const update = (k: string, v: any) => setData((d: any) => ({ ...d, fields: { ...d.fields, [k]: v } }));

  const serviceIds: string[] = f.serviceIds || [];
  const serviceNames = serviceIds.map((id) => (allSvc.find(s => s.id === id) || {}).name).filter(Boolean) as string[];

  const aiWrite = async () => {
    setAiBusy(true);
    await new Promise(r => setTimeout(r, 1500));
    update("solution", "Müşterinin hedef kitlesine yönelik modern, minimalist ve erişilebilir bir deneyim tasarladık. Yeni marka kimliği, dijital varlıkların tümüne tutarlı bir şekilde uygulandı.");
    setAiBusy(false);
  };

  const save = async (status: string) => {
    if (saving) return;
    setSaving(true);
    try {
      await onSave({
        id: data.id,
        title: f.title || "Başlıksız proje",
        client: f.client || null,
        category: f.category || null,
        image: f.cover || null,
        data: {
          status,
          year: f.year || "",
          serviceIds,
          serviceNames,
          duration: f.duration || "",
          role: f.role || "",
          problem: f.problem || "",
          solution: f.solution || "",
          body: f.body || "",
          metrics: f.metrics || [],
          quote: f.quote || "",
          quoteAuthor: f.quoteAuthor || "",
          quoteRole: f.quoteRole || "",
          gallery: f.gallery || [],
          next: f.next || "",
        },
      });
    } finally {
      setSaving(false);
    }
  };

  const metrics = f.metrics || [];
  const otherProjects = allProjects.filter(p => p.id !== data.id);
  const nextTitle = f.next || (otherProjects[0] && otherProjects[0].title);
  const nextIsAuto = !f.next;

  return (
    <div>
      <div className="ed-toolbar">
        <button className="ed-back" onClick={onClose}><Icon name="close" size={14} /> Projelere dön</button>
        <span className="adm-badge adm-badge--green">Vaka çalışması düzenleyici</span>
        <span className="sp" style={{ flex: 1 }} />
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <MkSelect width="150px" value={data.status} onChange={v => setData((d: any) => ({ ...d, status: v }))} options={["Taslak", "Arşiv", "Yayında"]} />
        <button className="adm-btn adm-btn--ghost" disabled={saving} onClick={() => save(data.status === "Yayında" ? "Yayında" : "Taslak")}>Taslağa kaydet</button>
        <button className="adm-btn adm-btn--primary" disabled={saving} onClick={() => save("Yayında")}><Icon name="eye" size={15} /> {saving ? "Kaydediliyor…" : "Yayınla"}</button>
      </div>

      <div className="editor">
        <div className="editor__form">
          <FormSection title="Künye" hint="hero + temel bilgiler">
            <ImageUpload label="Kapak görseli (hero)" ratio="21/9" value={f.cover} onChange={v => update("cover", v)} hint="öneri 2100×900" />
            <Field label="Kategori / üst etiket"><input className="adm-input" value={f.category || ""} onChange={e => update("category", e.target.value)} placeholder="örn. MARKA · WEB" /></Field>
            <Field label="Proje adı"><input className="adm-input" style={{ fontSize: "1.1rem", fontWeight: 600 }} value={f.title || ""} onChange={e => update("title", e.target.value)} placeholder="Proje adı" /></Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
              <Field label="Müşteri"><input className="adm-input" value={f.client || ""} onChange={e => update("client", e.target.value)} placeholder="Müşteri / marka" /></Field>
              <Field label="Yıl"><input className="adm-input" value={f.year || ""} onChange={e => update("year", e.target.value)} placeholder="2026" /></Field>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
              <Field label="Verilen hizmetler">
                <MkSelect multi searchable value={serviceIds} onChange={v => update("serviceIds", v)} placeholder="Hizmet seçin…" options={serviceOptions} />
              </Field>
              <Field label="Süre"><input className="adm-input" value={f.duration || ""} onChange={e => update("duration", e.target.value)} placeholder="örn. 14 hafta" /></Field>
            </div>
            <Field label="Rolümüz"><input className="adm-input" value={f.role || ""} onChange={e => update("role", e.target.value)} placeholder="Strateji & Tasarım" /></Field>
          </FormSection>

          <FormSection title="Problem" hint="müşteri bize geldiğinde nasıl bir konumdaydı?">
            <textarea className="adm-textarea" value={f.problem || ""} onChange={e => update("problem", e.target.value)} placeholder="Müşterinin karşılaştığı zorluk, başlangıç noktası, kısıtlar…" />
          </FormSection>

          <FormSection title="Çözüm & Yaklaşım" hint="ne tür bir çözüm yolu sunduk?">
            <div className="adm-field">
              <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                Çözüm anlatımı
                <button className="adm-btn adm-btn--ghost" style={{ padding: ".3rem .7rem" }} disabled={aiBusy} onClick={aiWrite}>
                  {aiBusy ? "..." : <><Icon name="ai" size={13} /> AI ile yaz</>}
                </button>
              </label>
              <textarea className="adm-textarea" value={f.solution || ""} onChange={e => update("solution", e.target.value)} placeholder="Stratejimiz ve uyguladığımız çözüm…" />
            </div>
            <div className="adm-field">
              <label>Süreç & detay (opsiyonel)</label>
              <textarea className="adm-textarea" style={{ minHeight: "8rem" }} value={f.body || ""} onChange={e => update("body", e.target.value)} placeholder="Daha uzun anlatım. Boş satırla paragraf, ## ile alt başlık." />
            </div>
          </FormSection>

          <FormSection title="Etki & Sonuçlar" hint="hangi oranda büyüme / başarı sağladık?">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <MetricsRepeater items={metrics} onChange={(v: any) => update("metrics", v)} />
          </FormSection>

          <FormSection title="Müşteri yorumu" hint="opsiyonel referans">
            <textarea className="adm-textarea" style={{ minHeight: "5rem" }} value={f.quote || ""} onChange={e => update("quote", e.target.value)} placeholder="“Marka ile çalışmak…”" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
              <Field label="Yorumu yapan"><input className="adm-input" value={f.quoteAuthor || ""} onChange={e => update("quoteAuthor", e.target.value)} placeholder="Ad Soyad" /></Field>
              <Field label="Ünvan / şirket"><input className="adm-input" value={f.quoteRole || ""} onChange={e => update("quoteRole", e.target.value)} placeholder="CEO · Şirket" /></Field>
            </div>
          </FormSection>

          <FormSection title="Görseller & navigasyon">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <GalleryUpload label="Proje görselleri (tam genişlik)" items={f.gallery || []} onChange={(v: any) => update("gallery", v)} />
            <Field label="Sonraki proje">
              <MkSelect searchable value={f.next || ""} onChange={v => update("next", v)} placeholder="Otomatik — tarihe göre sıradaki"
                options={[{ value: "", label: "Otomatik (tarihe göre sıradaki)" }, ...otherProjects.map(p => ({ value: p.title, label: p.title }))]} />
              {nextIsAuto && nextTitle && <span className="set-hint" style={{ display: "block", marginTop: ".4rem", fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>Seçim yapılmadı — sistem otomatik olarak <b>{nextTitle}</b> projesini gösterecek.</span>}
            </Field>
          </FormSection>
        </div>

        <div className="editor__preview">
          <div className="prev-frame">
            <div className="prev-frame__bar">
              <span className="adm-preview__dot" />
              <span className="adm-preview__dot" />
              <span className="adm-preview__dot" />
              <span style={{ marginLeft: 8 }}>canlı önizleme — proje detayı</span>
            </div>
            <div className="prev-scroll">
              <article className="pv">
                {f.category && <span className="kicker">{f.category}</span>}
                <h1>{f.title || "Proje adı"}</h1>

                <div className="pv__cover">
                  {f.cover ? <img src={f.cover} alt="" /> : <div className="pv__placeholder">KAPAK GÖRSELİ</div>}
                </div>

                <dl className="pv__meta">
                  <div><dt>Müşteri</dt><dd>{f.client || "—"}</dd></div>
                  <div><dt>Yıl</dt><dd>{f.year || "—"}</dd></div>
                  <div><dt>Hizmetler</dt><dd>{serviceNames.join(", ") || "—"}</dd></div>
                  <div><dt>Süre</dt><dd>{f.duration || "—"}</dd></div>
                  <div><dt>Rol</dt><dd>{f.role || "—"}</dd></div>
                </dl>

                {f.problem && (
                  <div className="pv__block">
                    <span className="kicker">Problem</span>
                    <p>{f.problem}</p>
                  </div>
                )}

                {(f.solution || f.body) && (
                  <div className="pv__block">
                    <span className="kicker">Çözüm</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: ".9rem" }}>
                      {renderRich([f.solution, f.body].filter(Boolean).join("\n\n"))}
                    </div>
                  </div>
                )}

                {metrics.length > 0 && (
                  <div className="pv__metrics">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {metrics.filter((m: any) => m.label).map((m: any) => (
                      <div key={m.id} className="pv__metric">
                        <span className="pv__metric-lbl">{m.label}</span>
                        <div className="pv__metric-val">
                          <span className="b">{m.before || "—"}</span>
                          <span className="ar">→</span>
                          <span className="a">{m.after || "—"}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {f.quote && (
                  <blockquote className="pv__quote">
                    <p>“{f.quote}”</p>
                    {(f.quoteAuthor || f.quoteRole) && (
                      <footer>
                        {f.quoteAuthor}{f.quoteRole ? ` · ${f.quoteRole}` : ""}
                      </footer>
                    )}
                  </blockquote>
                )}

                {f.gallery && f.gallery.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: ".8rem" }}>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {f.gallery.map((g: any) => (
                      <figure key={g.id}>
                        <img className="inl" src={g.src} alt="" />
                        {g.caption && <figcaption>{g.caption}</figcaption>}
                      </figure>
                    ))}
                  </div>
                )}

                {nextTitle && (
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.2rem", marginTop: ".5rem" }}>
                    <span className="kicker">Sonraki Proje{nextIsAuto ? " · otomatik" : ""}</span>
                    <h2 style={{ marginTop: ".4rem" }}>{nextTitle} →</h2>
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
export function ProjectsClient({ initial }: { initial: DbProject[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<DbProject | "new" | null>(null);

  const handleSave = async (input: ProjectInput) => {
    await upsertProject(input);
    setEditing(null);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu proje silinsin mi? Bu işlem geri alınamaz.")) return;
    await deleteProjectById(id);
    router.refresh();
  };

  if (editing) {
    return (
      <ProjectEditor
        project={editing === "new" ? null : editing}
        allProjects={initial}
        onClose={() => setEditing(null)}
        onSave={handleSave}
      />
    );
  }

  return (
    <AdmCard
      title="Projeler (Vaka Çalışmaları)"
      desc={`${initial.length} proje`}
      action={
        <button className="adm-btn adm-btn--primary" onClick={() => setEditing("new")}>
          <Icon name="plus" size={14} /> Proje Ekle
        </button>
      }
    >
      <table className="adm-table">
        <thead>
          <tr>
            <th></th>
            <th>Proje Adı</th>
            <th>Müşteri</th>
            <th>Kategori</th>
            <th>Durum</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {initial.map(p => {
            const status: string = p.data?.status || "Yayında";
            const cat = p.category || (p.data?.serviceNames || []).join(" · ") || "—";
            return (
              <tr key={p.id}>
                <td style={{ width: 56 }}>
                  <div className="ph" style={{ width: 48, height: 32, borderRadius: 6 }}>
                    {p.image ? <img src={p.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }} /> : <div className="ph__in" />}
                  </div>
                </td>
                <td className="ti">{p.title}</td>
                <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>{p.client || "—"}</td>
                <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>{cat}</td>
                <td><Badge tone={status === "Yayında" ? "green" : "muted"}>{status}</Badge></td>
                <td>
                  <div className="adm-row-actions">
                    <button className="adm-iconbtn" onClick={() => setEditing(p)} aria-label="Düzenle">
                      <Icon name="edit" size={14} />
                    </button>
                    <button className="adm-iconbtn" onClick={() => handleDelete(p.id)} aria-label="Sil">
                      <Icon name="trash" size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </AdmCard>
  );
}
