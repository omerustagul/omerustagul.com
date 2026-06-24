"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AdmCard, Field, ImageUpload, GalleryUpload, MkSelect, Badge } from "@/components/admin/ui";
import { Icon } from "@/components/admin/AdminIcons";
import { upsertProduct, deleteProductById, type ProductInput } from "@/lib/actions/admin";

type DbProduct = {
  id: string;
  title: string;
  slug: string;
  price: number;
  type: string | null;
  format: string | null;
  seller: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

const PR_TYPES = ["UI Kit", "Şablon", "İkon Seti", "Font", "Eklenti", "Mockup"];
const PR_FORMATS = ["Figma", "Sketch", "HTML/CSS", "React", "PNG/SVG", "PSD"];
const PR_LICENSES = ["Kişisel", "Ticari", "Genişletilmiş"];

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
function SpecRows({ items = [], onChange }: any) {
  const set = (id: string, k: string, v: string) => onChange(items.map((s: any) => s.id === id ? { ...s, [k]: v } : s)); // eslint-disable-line @typescript-eslint/no-explicit-any
  const add = () => onChange([...items, { id: uid(), k: "", v: "" }]);
  const del = (id: string) => onChange(items.filter((s: any) => s.id !== id)); // eslint-disable-line @typescript-eslint/no-explicit-any
  return (
    <div className="specs">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {items.map((s: any) => (
        <div key={s.id} className="specs__row">
          <input className="adm-input" value={s.k} onChange={e => set(s.id, "k", e.target.value)} placeholder="Özellik (örn. Bileşen)" />
          <input className="adm-input" value={s.v} onChange={e => set(s.id, "v", e.target.value)} placeholder="Değer (örn. 240+)" />
          <button className="adm-iconbtn" onClick={() => del(s.id)} aria-label="Sil"><Icon name="close" size={13} /></button>
        </div>
      ))}
      <button className="adm-btn adm-btn--ghost" style={{ alignSelf: "flex-start" }} onClick={add}><Icon name="plus" size={14} /> Özellik ekle</button>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BulletList({ items = [], onChange, placeholder }: any) {
  const set = (id: string, v: string) => onChange(items.map((it: any) => it.id === id ? { ...it, text: v } : it)); // eslint-disable-line @typescript-eslint/no-explicit-any
  const add = () => onChange([...items, { id: uid(), text: "" }]);
  const del = (id: string) => onChange(items.filter((it: any) => it.id !== id)); // eslint-disable-line @typescript-eslint/no-explicit-any
  return (
    <div className="blist">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {items.map((it: any) => (
        <div key={it.id} className="blist__row">
          <span className="blist__dot" />
          <input className="adm-input" value={it.text} onChange={e => set(it.id, e.target.value)} placeholder={placeholder} />
          <button className="adm-iconbtn" onClick={() => del(it.id)} aria-label="Sil"><Icon name="close" size={13} /></button>
        </div>
      ))}
      <button className="adm-btn adm-btn--ghost" style={{ alignSelf: "flex-start" }} onClick={add}>
        <Icon name="plus" size={14} /> Madde ekle
      </button>
    </div>
  );
}

function ProductEditor({
  product,
  onClose,
  onSave,
}: {
  product: DbProduct | null;
  onClose: () => void;
  onSave: (input: ProductInput) => Promise<void>;
}) {
  const rich = (product && product.data) || {};
  const init = {
    id: product?.id,
    status: rich.status || "Taslak",
    fields: {
      title: product?.title || "",
      seller: product?.seller || "",
      type: product?.type || "UI Kit",
      format: product?.format || "",
      price: product ? String(product.price || "") : "",
      currency: rich.currency || "$",
      tagline: rich.tagline || "",
      license: rich.license || "Ticari",
      desc: rich.desc || "",
      includes: rich.includes || [],
      specs: rich.specs || [],
      gallery: rich.gallery || [],
      cover: rich.cover || "",
    },
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(init);
  const [aiBusy, setAiBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const f = data.fields;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const update = (k: string, v: any) => setData((d: any) => ({ ...d, fields: { ...d.fields, [k]: v } }));

  const aiWrite = async () => {
    setAiBusy(true);
    await new Promise(r => setTimeout(r, 1500));
    update("desc", "Bu premium ürün, profesyonel tasarımcılar ve geliştiriciler için iş akışını hızlandırmak amacıyla hazırlanmıştır.");
    setAiBusy(false);
  };

  const save = async (status: string) => {
    if (saving) return;
    setSaving(true);
    try {
      await onSave({
        id: data.id,
        title: f.title || "Başlıksız ürün",
        price: parseInt(String(f.price).replace(/[^\d]/g, ""), 10) || 0,
        type: f.type || null,
        format: f.format || null,
        seller: f.seller || null,
        data: {
          status,
          tagline: f.tagline || "",
          currency: f.currency || "$",
          priceLabel: f.price ? (f.currency || "$") + " " + f.price : "",
          license: f.license || "",
          desc: f.desc || "",
          includes: f.includes || [],
          specs: f.specs || [],
          gallery: f.gallery || [],
          cover: f.cover || "",
        },
      });
    } finally {
      setSaving(false);
    }
  };

  const incl = f.includes || [];

  return (
    <div>
      <div className="ed-toolbar">
        <button className="ed-back" onClick={onClose}><Icon name="close" size={14} /> Market'e dön</button>
        <span className="adm-badge adm-badge--green">Ürün düzenleyici</span>
        <span className="sp" style={{ flex: 1 }} />
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <MkSelect width="150px" value={data.status} onChange={v => setData((d: any) => ({ ...d, status: v }))} options={["Taslak", "Arşiv", "Yayında"]} />
        <button className="adm-btn adm-btn--ghost" disabled={saving} onClick={() => save(data.status === "Yayında" ? "Yayında" : "Taslak")}>Taslağa kaydet</button>
        <button className="adm-btn adm-btn--primary" disabled={saving} onClick={() => save("Yayında")}><Icon name="eye" size={15} /> {saving ? "Kaydediliyor…" : "Yayınla"}</button>
      </div>

      <div className="editor">
        <div className="editor__form">
          <FormSection title="Künye" hint="kapak + temel bilgiler">
            <ImageUpload label="Ürün kapağı" ratio="4/3" value={f.cover} onChange={v => update("cover", v)} hint="öneri 1600×1200" />
            <Field label="Ürün adı"><input className="adm-input" style={{ fontSize: "1.1rem", fontWeight: 600 }} value={f.title || ""} onChange={e => update("title", e.target.value)} placeholder="örn. Grid UI Kit" /></Field>
            <Field label="Kısa tanıtım"><input className="adm-input" value={f.tagline || ""} onChange={e => update("tagline", e.target.value)} placeholder="Tek cümlelik vaat" /></Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
              <Field label="Tür"><MkSelect value={f.type || "UI Kit"} onChange={v => update("type", v)} options={PR_TYPES} /></Field>
              <Field label="Satıcı"><input className="adm-input" value={f.seller || ""} onChange={e => update("seller", e.target.value)} placeholder="Satıcı / stüdyo" /></Field>
            </div>
            <Field label="Format"><MkSelect value={f.format || ""} onChange={v => update("format", v)} placeholder="Seçin…" options={PR_FORMATS} /></Field>
          </FormSection>

          <FormSection title="Fiyatlandırma & lisans">
            <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr", gap: "var(--space-4)" }}>
              <Field label="Para"><MkSelect value={f.currency || "$"} onChange={v => update("currency", v)} options={["$", "₺", "€"]} /></Field>
              <Field label="Fiyat"><input className="adm-input" value={f.price || ""} onChange={e => update("price", e.target.value)} placeholder="59" /></Field>
              <Field label="Lisans"><MkSelect value={f.license || "Ticari"} onChange={v => update("license", v)} options={PR_LICENSES} /></Field>
            </div>
          </FormSection>

          <FormSection title="Açıklama" hint="ürünün satış metni">
            <div className="adm-field">
              <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>Ürün açıklaması
                <button className="adm-btn adm-btn--ghost" style={{ padding: ".3rem .7rem" }} disabled={aiBusy} onClick={aiWrite}>{aiBusy ? "..." : <><Icon name="ai" size={13} /> AI ile yaz</>}</button>
              </label>
              <textarea className="adm-textarea" style={{ minHeight: "9rem" }} value={f.desc || ""} onChange={e => update("desc", e.target.value)} placeholder="Ürün ne işe yarar, kimler için? Boş satırla paragraf, ## ile alt başlık." />
            </div>
          </FormSection>

          <FormSection title="Pakette neler var?" hint="ürünle birlikte gelenler">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <BulletList items={incl} onChange={(v: any) => update("includes", v)} placeholder="örn. 48 hazır bileşen" />
          </FormSection>

          <FormSection title="Teknik özellikler">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <SpecRows items={f.specs || []} onChange={(v: any) => update("specs", v)} />
          </FormSection>

          <FormSection title="Galeri">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <GalleryUpload label="Önizleme görselleri" items={f.gallery || []} onChange={(v: any) => update("gallery", v)} />
          </FormSection>
        </div>

        <div className="editor__preview">
          <div className="prev-frame">
            <div className="prev-frame__bar">
              <span className="adm-preview__dot" />
              <span className="adm-preview__dot" />
              <span className="adm-preview__dot" />
              <span style={{ marginLeft: 8 }}>canlı önizleme — ürün detayı</span>
            </div>
            <div className="prev-scroll">
              <article className="pv">
                <span className="kicker">{f.type || "Dijital Ürün"}{f.format ? ` · ${f.format}` : ""}</span>
                <h1>{f.title || "Ürün adı"}</h1>
                {f.tagline && <p className="lead">{f.tagline}</p>}

                <div className="pv__cover" style={{ aspectRatio: "4/3" }}>
                  {f.cover ? <img src={f.cover} alt="" /> : <div className="pv__placeholder">ÜRÜN KAPAĞI</div>}
                </div>

                <div className="pv-course__bar">
                  <div className="pv-course__price">
                    <span className="now">{f.price ? (f.currency || "$") + " " + f.price : "Ücretsiz"}</span>
                  </div>
                  <button className="btn btn--primary" style={{ pointerEvents: "none" }}>Satın Al</button>
                </div>

                <dl className="pv__meta">
                  <div><dt>Satıcı</dt><dd>{f.seller || "—"}</dd></div>
                  <div><dt>Format</dt><dd>{f.format || "—"}</dd></div>
                  <div><dt>Lisans</dt><dd>{f.license || "—"}</dd></div>
                  <div><dt>Tür</dt><dd>{f.type || "—"}</dd></div>
                </dl>

                {f.desc && <div style={{ display: "flex", flexDirection: "column", gap: ".9rem" }}>{renderRich(f.desc)}</div>}

                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {incl.filter((i: any) => i.text).length > 0 && (
                  <div className="pv__block">
                    <span className="kicker">Pakette</span>
                    <ul className="pv-checklist">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {incl.filter((i: any) => i.text).map((i: any) => (
                        <li key={i.id}>
                          <span className="ck">✓</span>
                          {i.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(f.specs || []).filter((s: any) => s.k).length > 0 && (
                  <div className="pv__block">
                    <span className="kicker">Özellikler</span>
                    <dl className="pv-specs">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {f.specs.filter((s: any) => s.k).map((s: any) => (
                        <div key={s.id}>
                          <dt>{s.k}</dt>
                          <dd>{s.v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {f.gallery && f.gallery.length > 0 && (
                  <div className="pv__gal">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {f.gallery.map((g: any) => <img key={g.id} src={g.src} alt="" />)}
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
export function ProductsClient({ initial }: { initial: DbProduct[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<DbProduct | "new" | null>(null);

  const handleSave = async (input: ProductInput) => {
    await upsertProduct(input);
    setEditing(null);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu ürün silinsin mi? Bu işlem geri alınamaz.")) return;
    await deleteProductById(id);
    router.refresh();
  };

  if (editing) {
    return (
      <ProductEditor
        product={editing === "new" ? null : editing}
        onClose={() => setEditing(null)}
        onSave={handleSave}
      />
    );
  }

  return (
    <AdmCard
      title="Dijital Ürünler (Market)"
      desc={`${initial.length} ürün`}
      action={
        <button className="adm-btn adm-btn--primary" onClick={() => setEditing("new")}>
          <Icon name="plus" size={14} /> Ürün Ekle
        </button>
      }
    >
      <table className="adm-table">
        <thead>
          <tr>
            <th></th>
            <th>Ürün Adı</th>
            <th>Satıcı</th>
            <th>Tür & Format</th>
            <th>Fiyat</th>
            <th>Durum</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {initial.map(p => {
            const status: string = p.data?.status || "Yayında";
            const priceLabel = p.data?.priceLabel || (p.price ? "$" + p.price : "—");
            const cover = p.data?.cover;
            return (
              <tr key={p.id}>
                <td style={{ width: 56 }}>
                  <div className="ph" style={{ width: 48, height: 32, borderRadius: 6 }}>
                    {cover ? <img src={cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }} /> : <div className="ph__in" />}
                  </div>
                </td>
                <td className="ti">{p.title}</td>
                <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>{p.seller || "—"}</td>
                <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>{[p.type, p.format].filter(Boolean).join(" · ") || "—"}</td>
                <td style={{ color: "var(--text-muted)", fontSize: "13px", fontFamily: "var(--font-mono)" }}>{priceLabel}</td>
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
