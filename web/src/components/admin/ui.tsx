"use client";

import React, { ReactNode, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Icon } from "./AdminIcons";

// ----------------------------------------------------------------------
// ADMIN HEADER
// ----------------------------------------------------------------------
export function AdminHeader({
  title,
  action,
}: {
  title: string;
  action?: { href: string; label: string };
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "2rem",
      }}
    >
      <h1 style={{ fontSize: "var(--fs-h2)", letterSpacing: "-0.02em" }}>{title}</h1>
      {action && (
        <Link href={action.href} className="adm-btn adm-btn--primary">
          <Icon name="plus" size={15} /> {action.label}
        </Link>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------
// ADM CARD
// ----------------------------------------------------------------------
export function AdmCard({
  title,
  desc,
  action,
  children,
  className = "",
}: {
  title?: string;
  desc?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`adm-card ${className}`}>
      {(title || action) && (
        <div className="adm-card__h">
          <div>
            {title && <h3>{title}</h3>}
            {desc && <p>{desc}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

// ----------------------------------------------------------------------
// STAT CARD
// ----------------------------------------------------------------------
export function StatCard({
  label,
  val,
  delta,
  dir,
}: {
  label: string;
  val: string | number;
  delta?: string;
  dir?: "up" | "down";
}) {
  return (
    <div className="stat-card">
      <span className="stat-card__label">{label}</span>
      <span className="stat-card__val">{val}</span>
      {delta && (
        <span className={`stat-card__delta ${dir}`}>
          {dir === "up" ? "▲" : "▼"} {delta}
        </span>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------
// FORM ATOMS
// ----------------------------------------------------------------------
export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  placeholder,
  children,
}: {
  label: string;
  name?: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
  placeholder?: string;
  children?: ReactNode;
}) {
  return (
    <div className="adm-field">
      <label>{label}</label>
      {children ? (
        children
      ) : (
        <input
          className="adm-input"
          name={name}
          type={type}
          defaultValue={defaultValue ?? undefined}
          required={required}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
}) {
  return (
    <div className="adm-field">
      <label>{label}</label>
      <textarea
        className="adm-textarea"
        name={name}
        defaultValue={defaultValue ?? undefined}
      />
    </div>
  );
}

export function Checkbox({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label
      style={{
        display: "flex",
        gap: ".6rem",
        alignItems: "center",
        fontSize: "var(--fs-sm)",
      }}
    >
      <input type="checkbox" name={name} defaultChecked={defaultChecked} />
      {label}
    </label>
  );
}

export function FormCard({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gap: "1.1rem",
        maxWidth: "40rem",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "1.75rem",
        background: "var(--surface)",
      }}
    >
      {children}
    </div>
  );
}

export function SubmitButton({ children = "Kaydet" }: { children?: ReactNode }) {
  return (
    <button
      type="submit"
      className="adm-btn adm-btn--primary"
      style={{ justifySelf: "start" }}
    >
      {children}
    </button>
  );
}

export function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <table className="adm-table">
      <thead>
        <tr>
          {head.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

// ----------------------------------------------------------------------
// SWITCH / SEG / BADGE
// ----------------------------------------------------------------------
export function Switch({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      className={`adm-switch ${on ? "on" : ""}`}
      aria-pressed={on}
      onClick={() => onChange(!on)}
    />
  );
}

export function Seg({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="adm-seg">
      {options.map((o) => (
        <button
          type="button"
          key={o.value}
          className={value === o.value ? "on" : ""}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Badge({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "green" | "warn" }) {
  return <span className={`adm-badge adm-badge--${tone}`}>{children}</span>;
}

// ----------------------------------------------------------------------
// OVERLAYS (MODAL / DRAWER / SELECT)
// ----------------------------------------------------------------------
export function Modal({
  title,
  onClose,
  children,
  footer,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div
      className="adm-modal__scrim"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="adm-modal" role="dialog" aria-modal="true">
        <div className="adm-modal__h">
          <h3>{title}</h3>
          <button className="adm-iconbtn" onClick={onClose} aria-label="Kapat">
            <Icon name="close" size={16} />
          </button>
        </div>
        <div className="adm-modal__b">{children}</div>
        {footer && <div className="adm-modal__f">{footer}</div>}
      </div>
    </div>
  );
}

export function Drawer({
  title,
  subtitle,
  onClose,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <>
      <div className="drawer-scrim" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true">
        <div className="drawer__h">
          <div>
            <h3>{title}</h3>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button className="adm-iconbtn" onClick={onClose} aria-label="Kapat">
            <Icon name="close" size={16} />
          </button>
        </div>
        <div className="drawer__b">{children}</div>
        {footer && <div className="drawer__f">{footer}</div>}
      </aside>
    </>
  );
}

export function MkSelect({
  value,
  onChange,
  options = [],
  placeholder = "Seçin",
  width,
  searchable,
  multi,
}: {
  value: any;
  onChange: (v: any) => void;
  options: { label: string; value: string; group?: string }[] | string[];
  placeholder?: string;
  width?: string;
  searchable?: boolean;
  multi?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [up, setUp] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const opts = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  const sel = multi ? (Array.isArray(value) ? value : []) : value;
  const cur = multi ? null : opts.find((o) => o.value === value);
  const isOn = (v: string) => (multi ? sel.includes(v) : v === value);

  const btnLabel = multi
    ? sel.length === 0
      ? placeholder
      : sel.length <= 2
      ? opts
          .filter((o) => sel.includes(o.value))
          .map((o) => o.label)
          .join(", ")
      : `${sel.length} hizmet seçili`
    : cur
    ? cur.label
    : placeholder;

  const showSearch = searchable || opts.length > 10;
  const filtered = q ? opts.filter((o) => o.label.toLowerCase().includes(q.toLowerCase())) : opts;

  useEffect(() => {
    if (!open) {
      setQ("");
      return;
    }
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = () => {
    if (!open && ref.current) {
      const r = ref.current.getBoundingClientRect();
      setUp(window.innerHeight - r.bottom < 280);
    }
    setOpen((o) => !o);
  };

  const choose = (v: string) => {
    if (multi) {
      onChange(sel.includes(v) ? sel.filter((x: string) => x !== v) : [...sel, v]);
    } else {
      onChange(v);
      setOpen(false);
    }
  };

  return (
    <div className={`mk-select ${open ? "open" : ""}`} ref={ref} style={width ? { width } : undefined}>
      <button type="button" className="mk-select__btn" onClick={toggle} aria-haspopup="listbox" aria-expanded={open}>
        <span className={`mk-select__val ${(multi ? sel.length : cur) ? "" : "placeholder"}`}>{btnLabel}</span>
        <span className="mk-select__chev" aria-hidden="true">
          ⌄
        </span>
      </button>
      {open && (
        <div className={`mk-select__pop ${up ? "up" : ""}`} role="listbox">
          {showSearch && (
            <input
              className="mk-select__search"
              autoFocus
              placeholder="Ara…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          {filtered.length === 0 && <div className="mk-select__empty">Sonuç yok</div>}
          {filtered.map((o, i) => {
            const header =
              o.group && o.group !== (filtered[i - 1] && filtered[i - 1].group) ? (
                <div key={"g" + o.group} className="mk-select__group">
                  {o.group}
                </div>
              ) : null;
            return (
              <React.Fragment key={o.value}>
                {header}
                <button
                  type="button"
                  role="option"
                  aria-selected={isOn(o.value)}
                  className={`mk-select__opt ${isOn(o.value) ? "on" : ""} ${o.group ? "is-sub" : ""}`}
                  onClick={() => choose(o.value)}
                >
                  {multi && (
                    <span className={`mk-select__box ${isOn(o.value) ? "on" : ""}`}>
                      {isOn(o.value) && <Icon name="ai" size={11} />}
                    </span>
                  )}
                  <span>{o.label}</span>
                  {!multi && isOn(o.value) && (
                    <span className="ck">
                      <Icon name="ai" size={13} />
                    </span>
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------
// UPLOADER (FileDrop, ImageUpload, GalleryUpload)
// ----------------------------------------------------------------------
export function FileDrop({
  value,
  onChange,
  accept,
  label,
  hint,
  icon = "media",
}: {
  value: { name: string; size: string; src?: string } | null;
  onChange: (val: any) => void;
  accept?: string;
  label?: string;
  hint?: string;
  icon?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  const take = (file?: File | null) => {
    if (!file) return;
    const meta = { name: file.name, size: (file.size / 1024 / 1024).toFixed(1) + " MB", type: file.type };
    if (file.size < 4 * 1024 * 1024) {
      const r = new FileReader();
      r.onload = (e) => onChange({ ...meta, src: e.target?.result });
      r.readAsDataURL(file);
    } else {
      onChange(meta);
    }
  };

  return (
    <div className="adm-field">
      {label && (
        <label>
          {label}
          {hint && (
            <span style={{ textTransform: "none", letterSpacing: 0, color: "var(--text-subtle)", marginLeft: 6 }}>
              · {hint}
            </span>
          )}
        </label>
      )}
      {value ? (
        <div className="file-chip">
          <span className="file-chip__ic">
            <Icon name={icon} size={16} />
          </span>
          <div className="file-chip__meta">
            <b>{value.name}</b>
            {value.size && <span>{value.size}</span>}
          </div>
          <button className="adm-iconbtn" onClick={() => onChange(null)} aria-label="Kaldır">
            <Icon name="close" size={14} />
          </button>
        </div>
      ) : (
        <div
          className={`file-drop ${drag ? "drag" : ""}`}
          onClick={() => {
            if ((window as any).openImagePicker) {
              (window as any).openImagePicker((m: any) =>
                onChange({ name: (m && m.name) || "Medya dosyası", src: (m && m.src) || m })
              );
            } else {
              ref.current?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            take(e.dataTransfer.files?.[0]);
          }}
        >
          <Icon name={icon} size={20} />
          <span>Dosya yükle veya buraya sürükle</span>
        </div>
      )}
      <input ref={ref} type="file" accept={accept} style={{ display: "none" }} onChange={(e) => take(e.target.files?.[0])} />
    </div>
  );
}

export function ImageUpload({
  value,
  onChange,
  label,
  ratio = "16/9",
  hint,
}: {
  value: string | null;
  onChange: (src: string | null) => void;
  label?: string;
  ratio?: string;
  hint?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  const readImg = (file: File | undefined | null) => {
    if (!file || !file.type.startsWith("image/")) return;
    const r = new FileReader();
    r.onload = (e) => onChange(e.target?.result as string);
    r.readAsDataURL(file);
  };

  return (
    <div className="adm-field">
      {label && (
        <label>
          {label}
          {hint && (
            <span style={{ textTransform: "none", letterSpacing: 0, color: "var(--text-subtle)", marginLeft: 6 }}>
              · {hint}
            </span>
          )}
        </label>
      )}
      <div
        className={`img-up ${value ? "has" : ""} ${drag ? "drag" : ""}`}
        style={{ aspectRatio: ratio.replace("/", " / ") }}
        onClick={() => {
          if ((window as any).openImagePicker) {
            (window as any).openImagePicker(onChange);
          } else {
            ref.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          readImg(e.dataTransfer.files?.[0]);
        }}
      >
        {value ? (
          <img src={value} alt="" />
        ) : (
          <div className="img-up__ph">
            <Icon name="media" size={26} />
            <span>Görsel yükle veya buraya sürükle</span>
          </div>
        )}
        {value && (
          <button
            className="img-up__x"
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
            }}
            aria-label="Kaldır"
          >
            <Icon name="close" size={14} />
          </button>
        )}
        <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => readImg(e.target.files?.[0])} />
      </div>
    </div>
  );
}

export function GalleryUpload({
  items = [],
  onChange,
  label = "Galeri görselleri",
}: {
  items?: { id: string | number; src: string; caption: string }[];
  onChange: (items: any[]) => void;
  label?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const add = (files: FileList | null) => {
    if (!files) return;
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    let pending = list.length;
    const acc: any[] = [];
    if (!pending) return;

    list.forEach((f) => {
      const r = new FileReader();
      r.onload = (e) => {
        acc.push({ id: Date.now() + Math.random(), src: e.target?.result, caption: "" });
        if (--pending === 0) {
          onChange([...items, ...acc]);
        }
      };
      r.readAsDataURL(f);
    });
  };

  const update = (id: string | number, patch: any) =>
    onChange(items.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  const remove = (id: string | number) => onChange(items.filter((i) => i.id !== id));

  return (
    <div className="adm-field">
      <label>
        {label}{" "}
        <span style={{ textTransform: "none", letterSpacing: 0, color: "var(--text-subtle)" }}>
          · {items.length} görsel
        </span>
      </label>
      <div className="gal-grid">
        {items.map((it) => (
          <div className="gal-item" key={it.id}>
            <div className="img-up has" style={{ aspectRatio: "1 / 1" }}>
              <img src={it.src} alt="" />
              <button className="img-up__x" onClick={() => remove(it.id)} aria-label="Kaldır">
                <Icon name="close" size={14} />
              </button>
            </div>
            <input
              className="gal-cap"
              placeholder="Açıklama (ops.)"
              value={it.caption}
              onChange={(e) => update(it.id, { caption: e.target.value })}
            />
          </div>
        ))}
        <button
          type="button"
          className="img-up"
          style={{ aspectRatio: "1 / 1" }}
          onClick={() => {
            if ((window as any).openImagePicker) {
              (window as any).openImagePicker((src: string) =>
                onChange([...items, { id: Date.now() + Math.random(), src, caption: "" }])
              );
            } else {
              ref.current?.click();
            }
          }}
        >
          <div className="img-up__ph">
            <Icon name="plus" size={22} />
            <span style={{ fontSize: 12 }}>Ekle</span>
          </div>
        </button>
      </div>
      <input ref={ref} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => add(e.target.files)} />
    </div>
  );
}

// ----------------------------------------------------------------------
// MEDIA PICKER POPUP
// ----------------------------------------------------------------------
const PICK_FOLDERS = [
  { id: "projects", name: "Projeler", parent: null },
  { id: "p-atlas", name: "Atlas Finans", parent: "projects" },
  { id: "p-atlas-web", name: "Web", parent: "p-atlas" },
  { id: "p-nova", name: "Nova", parent: "projects" },
  { id: "blog", name: "Blog", parent: null },
  { id: "logos", name: "Logolar", parent: null },
  { id: "covers", name: "Kapaklar", parent: null },
  { id: "uploads", name: "Yüklemeler", parent: null },
];
const PICK_FILES = [
  { id: "f1", name: "atlas-hero.jpg", folder: "covers", hue: 0, type: "JPG" },
  { id: "f2", name: "atlas-grid-01.jpg", folder: "p-atlas-web", hue: 30, type: "JPG" },
  { id: "f3", name: "atlas-grid-02.jpg", folder: "p-atlas-web", hue: 60, type: "JPG" },
  { id: "f4", name: "marka-logo.svg", folder: "logos", hue: 140, type: "SVG" },
  { id: "f5", name: "favicon-512.png", folder: "logos", hue: 140, type: "PNG" },
  { id: "f6", name: "blog-editorial.jpg", folder: "blog", hue: 200, type: "JPG" },
  { id: "f7", name: "nova-cover.jpg", folder: "p-nova", hue: -40, type: "JPG" },
  { id: "f8", name: "pera-cover.jpg", folder: "covers", hue: 90, type: "JPG" },
  { id: "f9", name: "venta-cover.jpg", folder: "covers", hue: -80, type: "JPG" },
  { id: "f10", name: "blog-process.jpg", folder: "blog", hue: 250, type: "JPG" },
  { id: "f11", name: "blog-studio.jpg", folder: "blog", hue: 320, type: "JPG" },
  { id: "f12", name: "team-photo.jpg", folder: "uploads", hue: 170, type: "JPG" },
  { id: "f13", name: "atlas-app-01.jpg", folder: "p-atlas", hue: 15, type: "JPG" },
  { id: "f14", name: "nova-brand.jpg", folder: "p-nova", hue: -20, type: "JPG" },
];

function hueDataURL(hue: number) {
  if (typeof document === 'undefined') return "https://placehold.co/400x300";
  const c = document.createElement("canvas"); c.width = 480; c.height = 360;
  const x = c.getContext("2d");
  if (!x) return "https://placehold.co/400x300";
  const h = ((150 + hue) % 360 + 360) % 360;
  const g = x.createLinearGradient(0, 0, 480, 360);
  g.addColorStop(0, `hsl(${h} 62% 72%)`); g.addColorStop(1, `hsl(${(h + 40) % 360} 30% 90%)`);
  x.fillStyle = g; x.fillRect(0, 0, 480, 360);
  x.fillStyle = "rgba(255,255,255,.5)"; x.beginPath(); x.arc(360, 120, 70, 0, 7 * Math.PI); x.fill();
  return c.toDataURL("image/png");
}

export function MediaPickerGlobal() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cwd, setCwd] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const cbRef = useRef<((src: string) => void) | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (window as any).openImagePicker = (cb: (src: string) => void) => {
      cbRef.current = cb;
      setQ("");
      setCwd(null);
      setOpen(true);
    };
  }, []);

  if (!open) return null;

  const pick = (src: string) => { if (cbRef.current) cbRef.current(src); setOpen(false); };
  const onFile = (file: File | undefined) => { 
    if (!file || !file.type.startsWith("image/")) return; 
    const r = new FileReader(); 
    r.onload = e => pick(e.target?.result as string); 
    r.readAsDataURL(file); 
  };

  const searching = q.trim().length > 0;
  const ql = q.toLowerCase();

  const crumbs: any[] = [];
  let walk = cwd;
  while (walk) { 
    const f = PICK_FOLDERS.find(x => x.id === walk); 
    if (!f) break; 
    crumbs.unshift(f); 
    walk = f.parent; 
  }

  const subfolders = searching ? [] : PICK_FOLDERS.filter(f => f.parent === cwd);
  const files = searching
    ? PICK_FILES.filter(f => f.name.toLowerCase().includes(ql))
    : PICK_FILES.filter(f => f.folder === cwd);
  const folderName = (id: string) => (PICK_FOLDERS.find(f => f.id === id) || {}).name || "Kütüphane";
  
  const countIn = (id: string) => {
    const desc = new Set([id]); 
    let added = true;
    while (added) { 
      added = false; 
      PICK_FOLDERS.forEach(f => { 
        if (f.parent && desc.has(f.parent) && !desc.has(f.id)) { desc.add(f.id); added = true; } 
      }); 
    }
    return PICK_FILES.filter(f => desc.has(f.folder)).length;
  };

  return (
    <Modal title="Görsel ekle" onClose={() => setOpen(false)}>
      <div className={`pick-import ${drag ? "drag" : ""}`}
        style={{ padding: "1.5rem", background: drag ? "var(--accent-muted)" : "var(--surface)", border: "1px dashed var(--border)", borderRadius: "8px", textAlign: "center", cursor: "pointer", transition: "0.2s", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
        onClick={() => fileRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDrag(true); }} 
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); onFile(e.dataTransfer.files[0]); }}>
        <span style={{ color: "var(--accent)", background: "var(--surface-muted)", width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="plus" size={22} /></span>
        <b style={{ marginTop: "0.5rem" }}>Bu bilgisayardan içe aktar</b>
        <small style={{ color: "var(--text-muted)" }}>PNG, JPG, SVG · tıklayın ya da buraya sürükleyin</small>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => onFile(e.target.files?.[0])} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1.5rem 0", color: "var(--text-muted)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }}></div>
        veya medya kütüphanesinden seçin
        <div style={{ flex: 1, height: 1, background: "var(--border)" }}></div>
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "400px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem", borderBottom: "1px solid var(--border)", background: "var(--surface-muted)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: 13, fontWeight: 500 }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: !cwd && !searching ? "var(--accent)" : "var(--text-muted)", fontWeight: !cwd && !searching ? 600 : 500 }} onClick={() => { setCwd(null); setQ(""); }}>Kütüphane</button>
            {!searching && crumbs.map((c, i) => (
              <React.Fragment key={c.id}>
                <span style={{ color: "var(--border)", margin: "0 4px" }}>/</span>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: i === crumbs.length - 1 ? "var(--text)" : "var(--text-muted)", fontWeight: i === crumbs.length - 1 ? 600 : 500 }} onClick={() => setCwd(c.id)}>{c.name}</button>
              </React.Fragment>
            ))}
            {searching && <><span style={{ color: "var(--border)", margin: "0 4px" }}>/</span><span style={{ color: "var(--text)", fontWeight: 600 }}>"{q}" araması</span></>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--surface)", padding: "4px 8px", borderRadius: "6px", border: "1px solid var(--border)", width: 180 }}>
            <Icon name="search" size={14} />
            <input placeholder="Ara…" style={{ background: "transparent", border: "none", outline: "none", flex: 1, fontSize: 13, color: "var(--text)" }} value={q} onChange={e => setQ(e.target.value)} />
          </div>
        </div>

        <div style={{ padding: "1.5rem", overflowY: "auto", flex: 1 }}>
          {subfolders.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: files.length > 0 ? "2rem" : 0 }}>
              {subfolders.map(f => (
                <button key={f.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "var(--surface)", border: "1px solid var(--border)", padding: "0.75rem 1rem", borderRadius: "8px", cursor: "pointer", minWidth: 160 }} onClick={() => setCwd(f.id)}>
                  <span style={{ color: "var(--accent)" }}><Icon name="projects" size={18} /></span>
                  <span style={{ flex: 1, textAlign: "left", fontWeight: 500, fontSize: 14 }}>{f.name}</span>
                  <span style={{ fontSize: 12, color: "var(--text-muted)", background: "var(--surface-muted)", padding: "2px 6px", borderRadius: "4px" }}>{countIn(f.id)}</span>
                </button>
              ))}
            </div>
          )}

          {files.length > 0 && (
            <div className="media-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(124px,1fr))", gap: "1.5rem" }}>
              {files.map(f => (
                <button key={f.id} className="file-card" style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: "0.5rem" }} onClick={() => pick(hueDataURL(f.hue))}>
                  <div style={{ width: "100%", aspectRatio: "1/1", borderRadius: "8px", overflow: "hidden", position: "relative", background: `hsl(${f.hue} 60% 80%)` }}>
                    <span style={{ position: "absolute", bottom: "8px", left: "8px", background: "rgba(0,0,0,0.6)", color: "white", fontSize: 10, padding: "2px 6px", borderRadius: "4px", fontWeight: 600 }}>{f.type}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%" }}>{f.name}</div>
                  {searching && <div style={{ fontSize: 11, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}><Icon name="projects" size={11} /> {folderName(f.folder)}</div>}
                </button>
              ))}
            </div>
          )}

          {subfolders.length === 0 && files.length === 0 && (
            <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
              <p style={{ margin: 0, fontSize: 14 }}>{searching ? "Eşleşen dosya yok" : "Bu klasör boş"}</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
