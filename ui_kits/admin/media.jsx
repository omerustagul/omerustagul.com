/* Modular media library — nested folders (subfolders), grid/list, drag-drop
   upload, search, detail drawer (rename, move, copy URL, delete). */
const { useState: useMedState, useRef: useMedRef } = React;

const MEDIA_FOLDERS_INIT = [
  { id: "projects", name: "Projeler", parent: null },
  { id: "p-atlas", name: "Atlas Finans", parent: "projects" },
  { id: "p-atlas-web", name: "Web", parent: "p-atlas" },
  { id: "p-nova", name: "Nova", parent: "projects" },
  { id: "blog", name: "Blog", parent: null },
  { id: "logos", name: "Logolar", parent: null },
  { id: "covers", name: "Kapaklar", parent: null },
  { id: "uploads", name: "Yüklemeler", parent: null },
];
const MEDIA_FILES_INIT = [
  { id: "f1", name: "atlas-hero.jpg", folder: "covers", hue: 0, size: "842 KB", type: "JPG", date: "12 Haz" },
  { id: "f2", name: "atlas-grid-01.jpg", folder: "p-atlas-web", hue: 30, size: "1.2 MB", type: "JPG", date: "12 Haz" },
  { id: "f3", name: "atlas-grid-02.jpg", folder: "p-atlas-web", hue: 60, size: "980 KB", type: "JPG", date: "12 Haz" },
  { id: "f4", name: "marka-logo.svg", folder: "logos", hue: 140, size: "12 KB", type: "SVG", date: "01 Haz" },
  { id: "f5", name: "favicon-512.png", folder: "logos", hue: 140, size: "8 KB", type: "PNG", date: "01 Haz" },
  { id: "f6", name: "blog-editorial.jpg", folder: "blog", hue: 200, size: "640 KB", type: "JPG", date: "03 Haz" },
  { id: "f7", name: "nova-cover.jpg", folder: "p-nova", hue: -40, size: "1.1 MB", type: "JPG", date: "28 May" },
  { id: "f8", name: "pera-cover.jpg", folder: "covers", hue: 90, size: "760 KB", type: "JPG", date: "25 May" },
  { id: "f9", name: "venta-cover.jpg", folder: "covers", hue: -80, size: "910 KB", type: "JPG", date: "20 May" },
  { id: "f10", name: "blog-process.jpg", folder: "blog", hue: 250, size: "580 KB", type: "JPG", date: "18 May" },
  { id: "f11", name: "blog-studio.jpg", folder: "blog", hue: 320, size: "700 KB", type: "JPG", date: "10 May" },
  { id: "f12", name: "atlas-brand.jpg", folder: "p-atlas", hue: 170, size: "1.4 MB", size2: "", type: "JPG", date: "08 May" },
];

function Thumb({ f, big }) {
  return (
    <div className="ph" style={{ aspectRatio: big ? "4/3" : "1/1", borderRadius: "var(--radius-sm)" }}>
      {f.src ? <img src={f.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "var(--radius-sm)" }} />
        : <div className="ph__in" style={{ filter: `hue-rotate(${f.hue}deg)` }} />}
      {!f.src && <span className="ph__tag">{f.type}</span>}
    </div>
  );
}

function Media() {
  const [folders, setFolders] = useMedState(MEDIA_FOLDERS_INIT);
  const [files, setFiles] = useMedState(MEDIA_FILES_INIT);
  const [active, setActive] = useMedState("all");
  const [view, setView] = useMedState("grid");
  const [q, setQ] = useMedState("");
  const [sel, setSel] = useMedState(null);
  const [adding, setAdding] = useMedState(false);
  const [newName, setNewName] = useMedState("");
  const [drag, setDrag] = useMedState(false);
  const [expanded, setExpanded] = useMedState(() => new Set(MEDIA_FOLDERS_INIT.map(f => f.id)));
  const inputRef = useMedRef();

  const childrenOf = (pid) => folders.filter(f => (f.parent || null) === (pid === "all" ? null : pid));
  const fileCount = (id) => id === "all" ? files.length : files.filter(f => f.folder === id).length;
  const folderName = (id) => id === "all" ? "Tüm medya" : (folders.find(f => f.id === id) || {}).name || "—";
  const pathOf = (id) => { const out = []; let cur = folders.find(f => f.id === id); while (cur) { out.unshift(cur); cur = cur.parent ? folders.find(f => f.id === cur.parent) : null; } return out; };
  const indentedLabel = (id) => pathOf(id).map(f => f.name).join("  ›  ");

  const subfolders = childrenOf(active);
  const visible = files.filter(f => (active === "all" || f.folder === active) && (!q || f.name.toLowerCase().includes(q.toLowerCase())));

  const addFiles = (list) => {
    [...list].filter(f => f.type.startsWith("image/")).forEach(file => {
      const r = new FileReader();
      r.onload = e => setFiles(p => [{ id: Date.now() + Math.random(), name: file.name, folder: active === "all" ? "uploads" : active, src: e.target.result, size: (file.size / 1024).toFixed(0) + " KB", type: (file.type.split("/")[1] || "img").toUpperCase(), date: "şimdi" }, ...p]);
      r.readAsDataURL(file);
    });
  };
  const addFolder = () => {
    if (!newName.trim()) { setAdding(false); return; }
    const id = "fld" + Date.now();
    setFolders(p => [...p, { id, name: newName.trim(), parent: active === "all" ? null : active }]);
    setExpanded(s => new Set(s).add(active));
    setNewName(""); setAdding(false);
  };
  const toggle = (id) => setExpanded(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  // recursive sidebar tree
  const Tree = ({ pid, depth }) => childrenOf(pid).map(f => {
    const kids = childrenOf(f.id);
    const open = expanded.has(f.id);
    return (
      <div key={f.id}>
        <div className={`media-fld ${active === f.id ? "on" : ""}`} style={{ paddingLeft: 8 + depth * 16 }} onClick={() => setActive(f.id)}>
          {kids.length > 0
            ? <span className="media-fld__tw" onClick={e => { e.stopPropagation(); toggle(f.id); }}>{open ? "▾" : "▸"}</span>
            : <span className="media-fld__tw" style={{ opacity: 0 }}>▸</span>}
          <Icon name="projects" size={15} /> <span className="media-fld__nm">{f.name}</span> <span className="c">{fileCount(f.id)}</span>
        </div>
        {open && kids.length > 0 && <Tree pid={f.id} depth={depth + 1} />}
      </div>
    );
  });

  return (
    <div className="media">
      <aside className="media-side">
        <button className={`media-fld ${active === "all" ? "on" : ""}`} onClick={() => setActive("all")}>
          <span className="media-fld__tw" style={{ opacity: 0 }}>▸</span><Icon name="media" size={16} /> <span className="media-fld__nm">Tüm medya</span> <span className="c">{fileCount("all")}</span>
        </button>
        <div className="media-side__lbl">Klasörler</div>
        <Tree pid="all" depth={0} />
        {adding ? (
          <div className="media-newfld">
            <input className="adm-input" autoFocus placeholder={active === "all" ? "Kök klasör adı" : `${folderName(active)} altına…`} value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key === "Enter" ? addFolder() : e.key === "Escape" ? setAdding(false) : null} />
            <button className="adm-iconbtn" onClick={addFolder}><Icon name="ai" size={14} /></button>
          </div>
        ) : (
          <button className="media-fld media-fld--add" onClick={() => setAdding(true)}><span className="media-fld__tw" style={{ opacity: 0 }}>▸</span><Icon name="plus" size={15} /> {active === "all" ? "Yeni klasör" : "Alt klasör ekle"}</button>
        )}
      </aside>

      <div className="media-main">
        <nav className="media-crumb">
          <button onClick={() => setActive("all")}>Tüm medya</button>
          {pathOf(active).map(f => (<React.Fragment key={f.id}><span className="sep">›</span><button className={f.id === active ? "on" : ""} onClick={() => setActive(f.id)}>{f.name}</button></React.Fragment>))}
        </nav>

        <div className="media-bar">
          <div><b style={{ fontWeight: 600 }}>{folderName(active)}</b> <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)" }}>· {subfolders.length} klasör · {visible.length} dosya</span></div>
          <div className="media-search"><Icon name="search" size={15} /><input placeholder="Dosya ara…" value={q} onChange={e => setQ(e.target.value)} /></div>
          <div className="adm-seg"><button className={view === "grid" ? "on" : ""} onClick={() => setView("grid")}>Izgara</button><button className={view === "list" ? "on" : ""} onClick={() => setView("list")}>Liste</button></div>
          <button className="adm-btn adm-btn--ghost" onClick={() => setAdding(true)}><Icon name="plus" size={15} /> Klasör</button>
          <button className="adm-btn adm-btn--primary" onClick={() => inputRef.current.click()}><Icon name="plus" size={15} /> Yükle</button>
          <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={e => addFiles(e.target.files)} />
        </div>

        <div className={`media-drop ${drag ? "drag" : ""}`}
          onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}>

          {subfolders.length > 0 && !q && (
            <div className="media-grid" style={{ marginBottom: "var(--space-5)" }}>
              {subfolders.map(f => (
                <button key={f.id} className="folder-card" onClick={() => setActive(f.id)} onDoubleClick={() => setActive(f.id)}>
                  <div className="folder-card__ic"><Icon name="projects" size={22} /></div>
                  <div className="file-card__nm">{f.name}</div>
                  <div className="file-card__meta">{childrenOf(f.id).length} klasör · {fileCount(f.id)} dosya</div>
                </button>
              ))}
            </div>
          )}

          {visible.length === 0 && subfolders.length === 0 ? (
            <div className="adm-empty"><h3>Bu klasör boş</h3><p>Alt klasör ekleyin ya da dosyaları buraya sürükleyip bırakın.</p></div>
          ) : view === "grid" ? (
            <div className="media-grid">
              {visible.map(f => (
                <button key={f.id} className="file-card" onClick={() => setSel(f)}>
                  <Thumb f={f} /><div className="file-card__nm">{f.name}</div><div className="file-card__meta">{f.type} · {f.size}</div>
                </button>
              ))}
            </div>
          ) : (
            <table className="adm-table">
              <thead><tr><th></th><th>Dosya</th><th>Klasör</th><th>Tür</th><th>Boyut</th><th>Tarih</th><th></th></tr></thead>
              <tbody>
                {visible.map(f => (
                  <tr key={f.id} onClick={() => setSel(f)} style={{ cursor: "pointer" }}>
                    <td style={{ width: 48 }}><div style={{ width: 38, height: 38 }}><Thumb f={f} /></div></td>
                    <td className="ti">{f.name}</td>
                    <td style={{ color: "var(--text-muted)", fontSize: "var(--fs-xs)" }}>{indentedLabel(f.folder)}</td>
                    <td style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)" }}>{f.type}</td>
                    <td style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)" }}>{f.size}</td>
                    <td style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>{f.date}</td>
                    <td><button className="adm-iconbtn" onClick={e => { e.stopPropagation(); setFiles(p => p.filter(x => x.id !== f.id)); }}><Icon name="trash" size={14} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {sel && <MediaDetail file={sel} folders={folders} pathLabel={indentedLabel} onClose={() => setSel(null)}
        onChange={u => { setFiles(p => p.map(x => x.id === u.id ? u : x)); setSel(u); }}
        onDelete={() => { setFiles(p => p.filter(x => x.id !== sel.id)); setSel(null); }} />}
    </div>
  );
}

function MediaDetail({ file, folders, pathLabel, onClose, onChange, onDelete }) {
  const [copied, setCopied] = useMedState(false);
  return (
    <Drawer title="Dosya detayı" subtitle={file.type + " · " + file.size} onClose={onClose}
      footer={<><button className="adm-btn adm-btn--ghost" onClick={onClose}>Kapat</button><button className="adm-btn adm-btn--danger" onClick={onDelete}><Icon name="trash" size={14} /> Sil</button></>}>
      <div style={{ borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid var(--border)" }}><Thumb f={file} big /></div>
      <Field label="Dosya adı"><input className="adm-input" value={file.name} onChange={e => onChange({ ...file, name: e.target.value })} /></Field>
      <Field label="Klasör (taşı)"><MkSelect value={file.folder} onChange={v => onChange({ ...file, folder: v })} options={folders.map(f => ({ value: f.id, label: pathLabel(f.id) }))} /></Field>
      <div className="set-row">
        <Field label="Tür"><input className="adm-input" value={file.type} readOnly /></Field>
        <Field label="Boyut"><input className="adm-input" value={file.size} readOnly /></Field>
      </div>
      <Field label="Genel URL">
        <div className="key-input">
          <input className="adm-input" readOnly value={`https://cdn.marka.studio/${file.folder}/${file.name}`} />
          <button className="adm-btn adm-btn--ghost" onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }}>{copied ? "Kopyalandı" : "Kopyala"}</button>
        </div>
      </Field>
    </Drawer>
  );
}

Object.assign(window, { Media });
