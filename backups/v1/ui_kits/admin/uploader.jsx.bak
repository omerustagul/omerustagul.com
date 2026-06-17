/* Image upload controls — real file → dataURL preview, drag & drop. */
const { useState: useUpState, useRef: useUpRef } = React;

function readImg(file, cb) {
  if (!file || !file.type.startsWith("image/")) return;
  const r = new FileReader();
  r.onload = (e) => cb(e.target.result);
  r.readAsDataURL(file);
}

/* generic file picker — returns { name, size, src? } (src only for small files) */
function FileDrop({ value, onChange, accept, label, hint, icon = "media" }) {
  const ref = useUpRef();
  const [drag, setDrag] = useUpState(false);
  const take = (file) => {
    if (!file) return;
    const meta = { name: file.name, size: (file.size / 1024 / 1024).toFixed(1) + " MB", type: file.type };
    if (file.size < 4 * 1024 * 1024) { const r = new FileReader(); r.onload = (e) => onChange({ ...meta, src: e.target.result }); r.readAsDataURL(file); }
    else onChange(meta);
  };
  return (
    <div className="adm-field">
      {label && <label>{label}{hint && <span style={{ textTransform: "none", letterSpacing: 0, color: "var(--text-subtle)", marginLeft: 6 }}>· {hint}</span>}</label>}
      {value
        ? <div className="file-chip"><span className="file-chip__ic"><Icon name={icon} size={16} /></span><div className="file-chip__meta"><b>{value.name}</b>{value.size && <span>{value.size}</span>}</div><button className="adm-iconbtn" onClick={() => onChange(null)} aria-label="Kaldır"><Icon name="close" size={14} /></button></div>
        : <div className={`file-drop ${drag ? "drag" : ""}`}
            onClick={() => { if (window.openImagePicker) window.openImagePicker((m) => onChange({ name: (m && m.name) || "Medya dosyası", src: (m && m.src) || m })); else ref.current && ref.current.click(); }}
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); take(e.dataTransfer.files[0]); }}>
            <Icon name={icon} size={20} /><span>Dosya yükle veya buraya sürükle</span>
          </div>}
      <input ref={ref} type="file" accept={accept} style={{ display: "none" }} onChange={(e) => take(e.target.files[0])} />
    </div>
  );
}

function ImageUpload({ value, onChange, label, ratio = "16/9", hint }) {
  const ref = useUpRef();
  const [drag, setDrag] = useUpState(false);
  return (
    <div className="adm-field">
      {label && <label>{label}{hint && <span style={{ textTransform: "none", letterSpacing: 0, color: "var(--text-subtle)", marginLeft: 6 }}>· {hint}</span>}</label>}
      <div className={`img-up ${value ? "has" : ""} ${drag ? "drag" : ""}`} style={{ aspectRatio: ratio.replace("/", " / ") }}
        onClick={() => { if (window.openImagePicker) window.openImagePicker(onChange); else ref.current && ref.current.click(); }}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); readImg(e.dataTransfer.files[0], onChange); }}>
        {value
          ? <img src={value} alt="" />
          : <div className="img-up__ph"><Icon name="media" size={26} /><span>Görsel yükle veya buraya sürükle</span></div>}
        {value && <button className="img-up__x" onClick={(e) => { e.stopPropagation(); onChange(null); }} aria-label="Kaldır"><Icon name="close" size={14} /></button>}
        <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => readImg(e.target.files[0], onChange)} />
      </div>
    </div>
  );
}

function GalleryUpload({ items = [], onChange, label = "Galeri görselleri" }) {
  const ref = useUpRef();
  const add = (files) => {
    const list = [...files].filter(f => f.type.startsWith("image/"));
    let pending = list.length, acc = [];
    if (!pending) return;
    list.forEach(f => readImg(f, (src) => { acc.push({ id: Date.now() + Math.random(), src, caption: "" }); if (--pending === 0) onChange([...items, ...acc]); }));
  };
  const update = (id, patch) => onChange(items.map(i => i.id === id ? { ...i, ...patch } : i));
  const remove = (id) => onChange(items.filter(i => i.id !== id));
  return (
    <div className="adm-field">
      <label>{label} <span style={{ textTransform: "none", letterSpacing: 0, color: "var(--text-subtle)" }}>· {items.length} görsel</span></label>
      <div className="gal-grid">
        {items.map(it => (
          <div className="gal-item" key={it.id}>
            <div className="img-up has" style={{ aspectRatio: "1 / 1" }}>
              <img src={it.src} alt="" />
              <button className="img-up__x" onClick={() => remove(it.id)} aria-label="Kaldır"><Icon name="close" size={14} /></button>
            </div>
            <input className="gal-cap" placeholder="Açıklama (ops.)" value={it.caption} onChange={(e) => update(it.id, { caption: e.target.value })} />
          </div>
        ))}
        <button className="img-up" style={{ aspectRatio: "1 / 1" }} onClick={() => { if (window.openImagePicker) window.openImagePicker(src => onChange([...items, { id: Date.now() + Math.random(), src, caption: "" }])); else ref.current && ref.current.click(); }}>
          <div className="img-up__ph"><Icon name="plus" size={22} /><span style={{ fontSize: 12 }}>Ekle</span></div>
        </button>
      </div>
      <input ref={ref} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => add(e.target.files)} />
    </div>
  );
}

Object.assign(window, { ImageUpload, GalleryUpload });
