/* Admin shared atoms — Icon set, Card, StatCard, Field, Switch, Seg, Badge,
   Modal. Exposed on window for the module files. */

const ICONS = {
  dashboard: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  ai: "M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8zM18 14l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9z",
  blog: "M5 3h10l4 4v14H5zM14 3v5h5M8 12h8M8 16h8",
  projects: "M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  courses: "M22 9L12 5 2 9l10 4 10-4zM6 11v5c0 1 3 2 6 2s6-1 6-2v-5",
  market: "M6 7h12l1 13H5zM9 7a3 3 0 016 0",
  media: "M3 5h18v14H3zM3 15l5-5 4 4 3-3 6 6",
  appearance: "M12 3a9 9 0 100 18c1.1 0 2-.9 2-2 0-1.5 1-2 2-2h1a4 4 0 004-4c0-5-4-8-9-8zM7.5 12a1 1 0 100-2 1 1 0 000 2zM12 8a1 1 0 100-2 1 1 0 000 2zM16.5 12a1 1 0 100-2 1 1 0 000 2z",
  users: "M9 11a4 4 0 100-8 4 4 0 000 8zM2 21c0-3.9 3.1-7 7-7s7 3.1 7 7M17 11a4 4 0 000-8M22 21c0-2.7-1.5-5-3.7-6.2",
  seo: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3",
  settings: "M12 9a3 3 0 100 6 3 3 0 000-6zM19.4 13l1.5 2.6-2 3.4-2.9-.8a7 7 0 01-1.7 1l-.6 3H10.3l-.6-3a7 7 0 01-1.7-1l-2.9.8-2-3.4L4.6 13a7 7 0 010-2L3.1 8.4l2-3.4 2.9.8a7 7 0 011.7-1l.6-3h3.4l.6 3a7 7 0 011.7 1l2.9-.8 2 3.4L19.4 11a7 7 0 010 2z",
  menu: "M3 6h18M3 12h18M3 18h18",
  close: "M6 6l12 12M18 6L6 18",
  search: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3",
  plus: "M12 5v14M5 12h14",
  edit: "M4 20h4L19 9l-4-4L4 16zM14 6l4 4",
  trash: "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z",
  external: "M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h5"
};

function Icon({ name, size = 20, stroke = 1.8, fill = false }) {
  const d = ICONS[name] || "";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"}
    stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>);

}

function AdmCard({ title, desc, action, children, className = "" }) {
  return (
    <section className={`adm-card ${className}`}>
      {(title || action) &&
      <div className="adm-card__h">
          <div>{title && <h3>{title}</h3>}{desc && <p>{desc}</p>}</div>
          {action}
        </div>
      }
      {children}
    </section>);

}

function StatCard({ label, val, delta, dir }) {
  return (
    <div className="stat-card">
      <span className="stat-card__label">{label}</span>
      <span className="stat-card__val">{val}</span>
      {delta && <span className={`stat-card__delta ${dir}`}>{dir === "up" ? "▲" : "▼"} {delta}</span>}
    </div>);

}

function Field({ label, children }) {
  return <div className="adm-field"><label>{label}</label>{children}</div>;
}

function Switch({ on, onChange }) {
  return <button type="button" className={`adm-switch ${on ? "on" : ""}`} aria-pressed={on} onClick={() => onChange(!on)} />;
}

function Seg({ options, value, onChange }) {
  return (
    <div className="adm-seg">
      {options.map((o) => <button key={o.value} className={value === o.value ? "on" : ""} onClick={() => onChange(o.value)}>{o.label}</button>)}
    </div>);

}

function Badge({ children, tone = "muted" }) {
  return <span className={`adm-badge adm-badge--${tone}`}>{children}</span>;
}

function Modal({ title, onClose, children, footer }) {
  return (
    <div className="adm-modal__scrim" onClick={(e) => {if (e.target === e.currentTarget) onClose();}}>
      <div className="adm-modal" role="dialog" aria-modal="true">
        <div className="adm-modal__h"><h3>{title}</h3><button className="adm-iconbtn" onClick={onClose} aria-label="Kapat"><Icon name="close" size={16} /></button></div>
        <div className="adm-modal__b">{children}</div>
        {footer && <div className="adm-modal__f">{footer}</div>}
      </div>
    </div>);

}

/* Custom select popup — design-system styled, replaces native <select>. */
function MkSelect({ value, onChange, options = [], placeholder = "Seçin", width, searchable }) {
  const [open, setOpen] = React.useState(false);
  const [up, setUp] = React.useState(false);
  const [q, setQ] = React.useState("");
  const ref = React.useRef();
  const opts = options.map((o) => typeof o === "string" ? { value: o, label: o } : o);
  const cur = opts.find((o) => o.value === value);
  const showSearch = searchable || opts.length > 10;
  const filtered = q ? opts.filter((o) => o.label.toLowerCase().includes(q.toLowerCase())) : opts;
  React.useEffect(() => {
    if (!open) {setQ("");return;}
    const onDoc = (e) => {if (ref.current && !ref.current.contains(e.target)) setOpen(false);};
    const onKey = (e) => {if (e.key === "Escape") setOpen(false);};
    document.addEventListener("mousedown", onDoc);document.addEventListener("keydown", onKey);
    return () => {document.removeEventListener("mousedown", onDoc);document.removeEventListener("keydown", onKey);};
  }, [open]);
  const toggle = () => {
    if (!open && ref.current) {const r = ref.current.getBoundingClientRect();setUp(window.innerHeight - r.bottom < 280);}
    setOpen((o) => !o);
  };
  return (
    <div className={`mk-select ${open ? "open" : ""}`} ref={ref} style={width ? { width } : null}>
      <button type="button" className="mk-select__btn" onClick={toggle} aria-haspopup="listbox" aria-expanded={open} style={{ height: "38px", fontWeight: "400", borderRadius: "8px" }}>
        <span className={`mk-select__val ${cur ? "" : "placeholder"}`}>{cur ? cur.label : placeholder}</span>
        <span className="mk-select__chev" aria-hidden="true">⌄</span>
      </button>
      {open &&
      <div className={`mk-select__pop ${up ? "up" : ""}`} role="listbox">
          {showSearch && <input className="mk-select__search" autoFocus placeholder="Ara…" value={q} onChange={(e) => setQ(e.target.value)} onClick={(e) => e.stopPropagation()} />}
          {filtered.length === 0 && <div className="mk-select__empty">Sonuç yok</div>}
          {filtered.map((o) =>
        <button key={o.value} type="button" role="option" aria-selected={o.value === value}
        className={`mk-select__opt ${o.value === value ? "on" : ""}`}
        onClick={() => {onChange(o.value);setOpen(false);}}>
              <span>{o.label}</span>{o.value === value && <span className="ck"><Icon name="ai" size={13} /></span>}
            </button>
        )}
        </div>
      }
    </div>);

}

/* Right-side slide-in drawer. */
function Drawer({ title, subtitle, onClose, children, footer }) {
  return (
    <>
      <div className="drawer-scrim" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true">
        <div className="drawer__h">
          <div><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div>
          <button className="adm-iconbtn" onClick={onClose} aria-label="Kapat"><Icon name="close" size={16} /></button>
        </div>
        <div className="drawer__b">{children}</div>
        {footer && <div className="drawer__f">{footer}</div>}
      </aside>
    </>);

}

Object.assign(window, { Icon, AdmCard, StatCard, Field, Switch, Seg, Badge, Modal, MkSelect, Drawer });