/* Shared image picker popup. Any upload zone calls window.openImagePicker(cb);
   the user imports from computer OR browses the organized media library
   (nested folders + breadcrumb, mirroring the Media page); cb(dataURL) fires
   with the chosen image. Mounted once by AdminShell. */
const { useState: usePickState, useRef: usePickRef, useEffect: usePickEffect } = React;

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

// render a library placeholder to a real dataURL so the chosen value previews everywhere
function hueDataURL(hue) {
  const c = document.createElement("canvas"); c.width = 480; c.height = 360;
  const x = c.getContext("2d");
  const h = ((150 + hue) % 360 + 360) % 360;
  const g = x.createLinearGradient(0, 0, 480, 360);
  g.addColorStop(0, `hsl(${h} 62% 72%)`); g.addColorStop(1, `hsl(${(h + 40) % 360} 30% 90%)`);
  x.fillStyle = g; x.fillRect(0, 0, 480, 360);
  x.fillStyle = "rgba(255,255,255,.5)"; x.beginPath(); x.arc(360, 120, 70, 0, 7); x.fill();
  return c.toDataURL("image/png");
}

function MediaPicker() {
  const [open, setOpen] = usePickState(false);
  const [q, setQ] = usePickState("");
  const [cwd, setCwd] = usePickState(null); // current folder id, null = root
  const [drag, setDrag] = usePickState(false);
  const cbRef = usePickRef(null);
  const fileRef = usePickRef(null);

  usePickEffect(() => { window.openImagePicker = (cb) => { cbRef.current = cb; setQ(""); setCwd(null); setOpen(true); }; }, []);

  const pick = (src) => { if (cbRef.current) cbRef.current(src); setOpen(false); };
  const onFile = (file) => { if (!file || !file.type.startsWith("image/")) return; const r = new FileReader(); r.onload = e => pick(e.target.result); r.readAsDataURL(file); };
  if (!open) return null;

  const searching = q.trim().length > 0;
  const ql = q.toLowerCase();

  // breadcrumb chain for cwd
  const crumbs = [];
  let walk = cwd;
  while (walk) { const f = PICK_FOLDERS.find(x => x.id === walk); if (!f) break; crumbs.unshift(f); walk = f.parent; }

  const subfolders = searching ? [] : PICK_FOLDERS.filter(f => f.parent === cwd);
  const files = searching
    ? PICK_FILES.filter(f => f.name.toLowerCase().includes(ql))
    : PICK_FILES.filter(f => f.folder === cwd);
  const folderName = (id) => (PICK_FOLDERS.find(f => f.id === id) || {}).name || "Kütüphane";
  const countIn = (id) => {
    // direct files + files in any descendant folder
    const desc = new Set([id]); let added = true;
    while (added) { added = false; PICK_FOLDERS.forEach(f => { if (f.parent && desc.has(f.parent) && !desc.has(f.id)) { desc.add(f.id); added = true; } }); }
    return PICK_FILES.filter(f => desc.has(f.folder)).length;
  };

  return (
    <Modal title="Görsel ekle" onClose={() => setOpen(false)}>
      <div className={`pick-import ${drag ? "drag" : ""}`}
        onClick={() => fileRef.current.click()}
        onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); onFile(e.dataTransfer.files[0]); }}>
        <span className="pi-ic"><Icon name="plus" size={22} /></span>
        <b>Bu bilgisayardan içe aktar</b>
        <small>PNG, JPG, SVG · tıklayın ya da buraya sürükleyin</small>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => onFile(e.target.files[0])} />
      </div>

      <div className="pick-sep">veya medya kütüphanesinden seçin</div>

      <div className="pick-lib">
        <div className="pick-lib__bar">
          <div className="media-crumb">
            <button className={!cwd && !searching ? "on" : ""} onClick={() => { setCwd(null); setQ(""); }}>Kütüphane</button>
            {!searching && crumbs.map((c, i) => (
              <React.Fragment key={c.id}>
                <span className="sep">/</span>
                <button className={i === crumbs.length - 1 ? "on" : ""} onClick={() => setCwd(c.id)}>{c.name}</button>
              </React.Fragment>
            ))}
            {searching && <><span className="sep">/</span><button className="on">“{q}” araması</button></>}
          </div>
          <div className="pick-search"><Icon name="search" size={15} /><input placeholder="Tüm kütüphanede ara…" value={q} onChange={e => setQ(e.target.value)} /></div>
        </div>

        <div className="pick-scroll">
          {subfolders.length > 0 && (
            <div className="pick-folders">
              {subfolders.map(f => (
                <button key={f.id} className="pick-folder" onClick={() => setCwd(f.id)}>
                  <span className="pick-folder__ic"><Icon name="projects" size={18} /></span>
                  <span className="pick-folder__nm">{f.name}</span>
                  <span className="pick-folder__ct">{countIn(f.id)}</span>
                </button>
              ))}
            </div>
          )}

          {files.length > 0 && (
            <div className="media-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(124px,1fr))" }}>
              {files.map(f => (
                <button key={f.id} className="file-card" onClick={() => pick(hueDataURL(f.hue))}>
                  <div className="ph" style={{ aspectRatio: "1/1", borderRadius: "var(--radius-sm)" }}><div className="ph__in" style={{ filter: `hue-rotate(${f.hue}deg)` }} /><span className="ph__tag">{f.type}</span></div>
                  <div className="file-card__nm">{f.name}</div>
                  {searching && <div className="file-card__loc"><Icon name="projects" size={11} /> {folderName(f.folder)}</div>}
                </button>
              ))}
            </div>
          )}

          {subfolders.length === 0 && files.length === 0 && (
            <div className="adm-empty"><p>{searching ? "Eşleşen dosya yok" : "Bu klasör boş"}</p></div>
          )}
        </div>
      </div>
    </Modal>
  );
}

Object.assign(window, { MediaPicker });
