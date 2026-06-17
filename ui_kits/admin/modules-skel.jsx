/* Admin secondary modules — data-backed tables + lite SEO AI + settings. */
const { useState: useSkState } = React;
const D = () => window.MK_ADMIN;

function TableModule({ cols, rows, render, title, addLabel }) {
  return (
    <AdmCard title={title} desc={`${rows.length} kayıt`}
      action={<button className="adm-btn adm-btn--primary"><Icon name="plus" size={15} /> {addLabel}</button>}>
      <table className="adm-table">
        <thead><tr>{cols.map(c => <th key={c}>{c}</th>)}<th></th></tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {render(r)}
              <td><div className="adm-row-actions"><button className="adm-iconbtn"><Icon name="edit" size={14} /></button><button className="adm-iconbtn"><Icon name="trash" size={14} /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdmCard>
  );
}

function Projects() {
  const [rows, setRows] = useSkState(D().projects);
  const [editing, setEditing] = useSkState(null);
  if (editing !== null) {
    return <ProjectEditor project={editing} onClose={() => setEditing(null)} onSave={(p) => {
      setRows(prev => p.id ? prev.map(x => x.id === p.id ? { ...x, ...p } : x) : [{ id: Date.now(), ...p }, ...prev]);
      setEditing(null);
    }} />;
  }
  return (
    <AdmCard title="Projeler" desc={`${rows.length} proje`}
      action={<button className="adm-btn adm-btn--primary" onClick={() => setEditing({})}><Icon name="plus" size={15} /> Yeni Proje</button>}>
      <table className="adm-table">
        <thead><tr><th></th><th>Proje</th><th>Müşteri</th><th>Kategori</th><th>Yıl</th><th>Durum</th><th></th></tr></thead>
        <tbody>
          {rows.map(p => (
            <tr key={p.id}>
              <td style={{ width: 56 }}><div className="ph" style={{ width: 48, height: 32, borderRadius: 6 }}>{p.cover ? <img src={p.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }} /> : <div className="ph__in" />}</div></td>
              <td className="ti">{p.title}</td>
              <td style={{ color: "var(--text-muted)" }}>{p.client}</td>
              <td>{p.cat}</td>
              <td style={{ fontFamily: "var(--font-mono)" }}>{p.year}</td>
              <td><Badge tone={p.status === "Yayında" ? "green" : p.status === "Taslak" ? "warn" : "muted"}>{p.status}</Badge></td>
              <td><div className="adm-row-actions"><button className="adm-iconbtn" onClick={() => setEditing(p)}><Icon name="edit" size={14} /></button><button className="adm-iconbtn" onClick={() => setRows(prev => prev.filter(x => x.id !== p.id))}><Icon name="trash" size={14} /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdmCard>
  );
}
function Courses() {
  const [rows, setRows] = useSkState(D().courses);
  const [editing, setEditing] = useSkState(null);
  if (editing !== null) {
    return <CourseEditor course={editing} onClose={() => setEditing(null)} onSave={(c) => {
      setRows(prev => c.id ? prev.map(x => x.id === c.id ? { ...x, ...c } : x) : [{ id: Date.now(), ...c }, ...prev]);
      setEditing(null);
    }} />;
  }
  return (
    <AdmCard title="Kurslar" desc={`${rows.length} kurs`}
      action={<button className="adm-btn adm-btn--primary" onClick={() => setEditing({})}><Icon name="plus" size={15} /> Yeni Kurs</button>}>
      <table className="adm-table">
        <thead><tr><th></th><th>Kurs</th><th>Eğitmen</th><th>Öğrenci</th><th>Puan</th><th>Fiyat</th><th>Durum</th><th></th></tr></thead>
        <tbody>
          {rows.map(c => (
            <tr key={c.id}>
              <td style={{ width: 56 }}><div className="ph" style={{ width: 48, height: 32, borderRadius: 6 }}>{c.cover ? <img src={c.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }} /> : <div className="ph__in" />}</div></td>
              <td className="ti">{c.title}</td>
              <td style={{ color: "var(--text-muted)" }}>{c.instructor}</td>
              <td style={{ fontFamily: "var(--font-mono)" }}>{c.students}</td>
              <td style={{ fontFamily: "var(--font-mono)" }}>{c.rating ? `★ ${c.rating}` : "—"}</td>
              <td style={{ fontFamily: "var(--font-mono)" }}>{c.price}</td>
              <td><Badge tone={c.status === "Yayında" ? "green" : c.status === "Taslak" ? "warn" : "muted"}>{c.status || "Yayında"}</Badge></td>
              <td><div className="adm-row-actions"><button className="adm-iconbtn" onClick={() => setEditing(c)}><Icon name="edit" size={14} /></button><button className="adm-iconbtn" onClick={() => setRows(prev => prev.filter(x => x.id !== c.id))}><Icon name="trash" size={14} /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdmCard>
  );
}
function MarketM() {
  const [rows, setRows] = useSkState(D().products);
  const [editing, setEditing] = useSkState(null);
  if (editing !== null) {
    return <ProductEditor product={editing} onClose={() => setEditing(null)} onSave={(p) => {
      setRows(prev => p.id ? prev.map(x => x.id === p.id ? { ...x, ...p } : x) : [{ id: Date.now(), ...p }, ...prev]);
      setEditing(null);
    }} />;
  }
  return (
    <AdmCard title="Market — Ürünler" desc={`${rows.length} ürün`}
      action={<button className="adm-btn adm-btn--primary" onClick={() => setEditing({})}><Icon name="plus" size={15} /> Yeni Ürün</button>}>
      <table className="adm-table">
        <thead><tr><th></th><th>Ürün</th><th>Tür</th><th>Satıcı</th><th>Satış</th><th>Fiyat</th><th>Durum</th><th></th></tr></thead>
        <tbody>
          {rows.map(p => (
            <tr key={p.id}>
              <td style={{ width: 56 }}><div className="ph" style={{ width: 48, height: 32, borderRadius: 6 }}>{p.cover ? <img src={p.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }} /> : <div className="ph__in" />}</div></td>
              <td className="ti">{p.title}</td>
              <td style={{ color: "var(--text-muted)" }}>{p.type || "—"}</td>
              <td style={{ color: "var(--text-muted)" }}>{p.seller}</td>
              <td style={{ fontFamily: "var(--font-mono)" }}>{p.sales}</td>
              <td style={{ fontFamily: "var(--font-mono)" }}>{p.price}</td>
              <td><Badge tone={p.status === "Yayında" ? "green" : p.status === "Taslak" ? "warn" : "muted"}>{p.status || "Yayında"}</Badge></td>
              <td><div className="adm-row-actions"><button className="adm-iconbtn" onClick={() => setEditing(p)}><Icon name="edit" size={14} /></button><button className="adm-iconbtn" onClick={() => setRows(prev => prev.filter(x => x.id !== p.id))}><Icon name="trash" size={14} /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdmCard>
  );
}
/* ---------------- USERS · ROLES · PERMISSIONS ---------------- */
const PERM_GROUPS = [
  { g: "Sayfalar (panel erişimi)", items: [
    { k: "dashboard", l: "Dashboard" }, { k: "content", l: "Blog & İçerik" }, { k: "projects", l: "Projeler" },
    { k: "courses", l: "Kurslar" }, { k: "market", l: "Market" }, { k: "media", l: "Medya" },
    { k: "appearance", l: "Tema & Görünüm" }, { k: "seo", l: "SEO & Meta" }, { k: "users", l: "Kullanıcılar" }, { k: "settings", l: "Ayarlar" },
  ] },
  { g: "İşlemler (buton & alan yetkileri)", items: [
    { k: "create", l: "Oluştur", d: "Yeni kayıt ekleme butonları" }, { k: "edit", l: "Düzenle" },
    { k: "delete", l: "Sil", d: "Silme butonları" }, { k: "publish", l: "Yayınla", d: "Taslağı yayına alma" },
  ] },
  { g: "Hassas alanlar", items: [
    { k: "ai", l: "AI özelliklerini kullan" }, { k: "apikeys", l: "API anahtarları" }, { k: "billing", l: "Faturalandırma & bütçe" },
  ] },
];
const ALL_PERMS = PERM_GROUPS.flatMap(g => g.items.map(i => i.k));
const DEFAULT_ROLES = [
  { id: 1, name: "Yönetici", desc: "Tam yetki", users: 1, perms: [...ALL_PERMS] },
  { id: 2, name: "Editör", desc: "İçerik üretimi & yayın", users: 1, perms: ["dashboard", "content", "projects", "media", "seo", "create", "edit", "publish", "ai"] },
  { id: 3, name: "Yazar", desc: "Yalnızca taslak", users: 1, perms: ["dashboard", "content", "media", "create", "edit", "ai"] },
];

function Users() {
  const [tab, setTab] = useSkState("users");
  const [users, setUsers] = useSkState(D().users);
  const [roles, setRoles] = useSkState(DEFAULT_ROLES);
  const [drawer, setDrawer] = useSkState(null);
  const [roleEdit, setRoleEdit] = useSkState(null);

  return (
    <div>
      <div className="tabs">
        <button className={tab === "users" ? "on" : ""} onClick={() => setTab("users")}>Kullanıcılar</button>
        <button className={tab === "roles" ? "on" : ""} onClick={() => setTab("roles")}>Roller & Yetkiler</button>
      </div>

      {tab === "users" ? (
        <AdmCard title="Kullanıcılar" desc={`${users.length} kişi`}
          action={<button className="adm-btn adm-btn--primary" onClick={() => setDrawer({})}><Icon name="plus" size={15} /> Kullanıcı ekle</button>}>
          <table className="adm-table">
            <thead><tr><th>Ad</th><th>E-posta</th><th>Rol</th><th>Durum</th><th></th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td><div className="avatar-cell"><span className="av">{u.photo ? <img src={u.photo} alt="" /> : (u.name || "?").split(" ").map(w => w[0]).slice(0, 2).join("")}</span><span className="ti">{u.name}</span></div></td>
                  <td style={{ color: "var(--text-muted)" }}>{u.email}</td>
                  <td>{u.role}</td>
                  <td><Badge tone={u.status === "Aktif" ? "green" : u.status === "Pasif" ? "muted" : "warn"}>{u.status}</Badge></td>
                  <td><div className="adm-row-actions"><button className="adm-iconbtn" onClick={() => setDrawer(u)}><Icon name="edit" size={14} /></button><button className="adm-iconbtn" onClick={() => setUsers(p => p.filter(x => x.id !== u.id))}><Icon name="trash" size={14} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdmCard>
      ) : (
        <RolesPanel roles={roles} onAdd={() => setRoleEdit({ name: "", perms: [] })} onEdit={r => setRoleEdit(r)}
          onSave={r => { setRoles(p => r.id ? p.map(x => x.id === r.id ? { ...x, ...r } : x) : [...p, { id: Date.now(), users: 0, desc: r.desc || "Özel rol", ...r }]); setRoleEdit(null); }}
          editing={roleEdit} onCancel={() => setRoleEdit(null)} />
      )}

      {drawer && <UserDrawer user={drawer} roles={roles} onClose={() => setDrawer(null)}
        onSave={u => { setUsers(p => u.id ? p.map(x => x.id === u.id ? { ...x, ...u } : x) : [...p, { id: Date.now(), status: u.status || "Davet edildi", ...u }]); setDrawer(null); }} />}
    </div>
  );
}

function RolesPanel({ roles, onAdd, onEdit, onSave, editing, onCancel }) {
  const [r, setR] = useSkState(editing || { name: "", perms: [] });
  React.useEffect(() => { setR(editing || { name: "", perms: [] }); }, [editing]);
  if (editing) {
    const toggle = (k) => setR(x => ({ ...x, perms: x.perms.includes(k) ? x.perms.filter(p => p !== k) : [...x.perms, k] }));
    return (
      <AdmCard title={editing.id ? "Rolü düzenle" : "Yeni rol"} desc="Her sayfa, buton ve alan için yetkiyi aç/kapat"
        action={<div style={{ display: "flex", gap: ".5rem" }}><button className="adm-btn adm-btn--ghost" onClick={onCancel}>Vazgeç</button><button className="adm-btn adm-btn--primary" onClick={() => onSave(r)}>Rolü kaydet</button></div>}>
        <div className="set-row" style={{ marginBottom: "var(--space-5)" }}>
          <Field label="Rol adı"><input className="adm-input" value={r.name} onChange={e => setR(x => ({ ...x, name: e.target.value }))} placeholder="örn. İçerik Editörü" /></Field>
          <Field label="Açıklama"><input className="adm-input" value={r.desc || ""} onChange={e => setR(x => ({ ...x, desc: e.target.value }))} placeholder="Kısa açıklama" /></Field>
        </div>
        {PERM_GROUPS.map(grp => (
          <div className="perm-group" key={grp.g}>
            <div className="perm-group__h">{grp.g}
              <button className="adm-btn adm-btn--ghost" style={{ padding: ".25rem .7rem" }} onClick={() => setR(x => { const ks = grp.items.map(i => i.k); const allOn = ks.every(k => x.perms.includes(k)); return { ...x, perms: allOn ? x.perms.filter(p => !ks.includes(p)) : [...new Set([...x.perms, ...ks])] }; })}>Tümünü değiştir</button>
            </div>
            {grp.items.map(it => (
              <div className="perm-row" key={it.k}>
                <span><span className="pl">{it.l}</span>{it.d && <span className="pd"> · {it.d}</span>}</span>
                <Switch on={r.perms.includes(it.k)} onChange={() => toggle(it.k)} />
              </div>
            ))}
          </div>
        ))}
      </AdmCard>
    );
  }
  return (
    <AdmCard title="Roller" desc={`${roles.length} rol`}
      action={<button className="adm-btn adm-btn--primary" onClick={onAdd}><Icon name="plus" size={15} /> Yeni rol</button>}>
      {roles.map(role => (
        <div className="role-card" key={role.id}>
          <div><b>{role.name}</b><div className="role-card__meta">{role.perms.length} yetki · {role.users} kullanıcı · {role.desc}</div></div>
          <button className="adm-btn adm-btn--ghost" onClick={() => onEdit(role)}><Icon name="edit" size={14} /> Düzenle</button>
        </div>
      ))}
    </AdmCard>
  );
}

function UserDrawer({ user, roles, onClose, onSave }) {
  const [u, setU] = useSkState({ name: "", email: "", phone: "", username: "", password: "", role: roles[0] && roles[0].name, status: "Davet edildi", ...user });
  const set = (k, v) => setU(x => ({ ...x, [k]: v }));
  const onPhoto = (file) => { if (!file || !file.type.startsWith("image/")) return; const r = new FileReader(); r.onload = e => set("photo", e.target.result); r.readAsDataURL(file); };
  const photoRef = React.useRef();
  return (
    <Drawer title={user.id ? "Kullanıcıyı düzenle" : "Yeni kullanıcı"} subtitle="Profil, giriş bilgileri ve rol"
      onClose={onClose}
      footer={<><button className="adm-btn adm-btn--ghost" onClick={onClose}>Vazgeç</button><button className="adm-btn adm-btn--primary" onClick={() => onSave(u)}>{user.id ? "Kaydet" : "Kullanıcı oluştur"}</button></>}>
      <div className="drawer__avatar">
        <div className="img-up has" style={{ aspectRatio: "1/1" }} onClick={() => { if (window.openImagePicker) window.openImagePicker(src => set("photo", src)); else photoRef.current.click(); }}>
          {u.photo ? <img src={u.photo} alt="" /> : <div className="img-up__ph" style={{ padding: 0 }}><Icon name="users" size={22} /></div>}
          <input ref={photoRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => onPhoto(e.target.files[0])} />
        </div>
        <div><b style={{ fontWeight: 600 }}>Profil fotoğrafı</b><br /><small style={{ color: "var(--text-muted)", fontSize: "var(--fs-xs)" }}>Kare görsel · tıkla ve yükle</small></div>
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-muted)", marginTop: 4 }}>Kişisel bilgiler</div>
      <Field label="Ad Soyad"><input className="adm-input" value={u.name} onChange={e => set("name", e.target.value)} placeholder="Ada Yılmaz" /></Field>
      <div className="set-row">
        <Field label="E-posta"><input className="adm-input" value={u.email} onChange={e => set("email", e.target.value)} placeholder="ada@marka.studio" /></Field>
        <Field label="Telefon"><input className="adm-input" value={u.phone} onChange={e => set("phone", e.target.value)} placeholder="+90 5xx" /></Field>
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-muted)", marginTop: 4 }}>Panel giriş bilgileri</div>
      <div className="set-row">
        <Field label="Kullanıcı adı"><input className="adm-input" value={u.username} onChange={e => set("username", e.target.value)} placeholder="ada" /></Field>
        <Field label="Geçici şifre"><input className="adm-input" type="password" value={u.password} onChange={e => set("password", e.target.value)} placeholder="••••••••" /></Field>
      </div>
      <div className="set-row">
        <Field label="Rol"><MkSelect value={u.role} onChange={v => set("role", v)} options={roles.map(r => r.name)} /></Field>
        <Field label="Durum"><MkSelect value={u.status} onChange={v => set("status", v)} options={["Aktif", "Davet edildi", "Pasif"]} /></Field>
      </div>
    </Drawer>
  );
}

function Media() {
  return null; // replaced by the modular media.jsx (window.Media)
}

/* ---------------- SEO · all pages + per-page meta ---------------- */
const SITE_PAGES = [
  { id: "home", name: "Anasayfa", url: "/", title: "Marka — Dijitalde yeni standart", desc: "Markaları geleceğe taşıyan ödüllü kreatif stüdyo. Strateji, tasarım ve teknoloji.", indexed: true },
  { id: "portfolio", name: "İşler / Portfolyo", url: "/isler", title: "İşler — Ödüllü projeler · Marka", desc: "Web, marka ve dijital ürün projelerimizden seçkiler.", indexed: true },
  { id: "project", name: "Proje Detay", url: "/isler/atlas-finans", title: "Atlas Finans — Vaka çalışması · Marka", desc: "Atlas Bank için uçtan uca marka ve ürün deneyimi.", indexed: true },
  { id: "blog", name: "Blog", url: "/blog", title: "Blog — Stüdyodan notlar · Marka", desc: "Tasarım, süreç ve kültür üzerine yazılar.", indexed: true },
  { id: "academy", name: "Akademi", url: "/akademi", title: "Akademi — En iyilerden öğren · Marka", desc: "Sektörün önde gelen tasarımcılarından kurslar.", indexed: true },
  { id: "market", name: "Market", url: "/market", title: "Market — Şablonlar & dijital ürünler · Marka", desc: "UI kit, şablon ve ikon setleri.", indexed: true },
  { id: "about", name: "Hakkımızda", url: "/hakkimizda", title: "Hakkımızda · Marka", desc: "Ekibimiz, manifestomuz ve rakamlarla biz.", indexed: true },
  { id: "contact", name: "İletişim", url: "/iletisim", title: "İletişim — Birlikte çalışalım · Marka", desc: "Projenizi konuşalım. 48 saat içinde dönüş.", indexed: false },
];

function SEO() {
  const [pages, setPages] = useSkState(SITE_PAGES);
  const [editing, setEditing] = useSkState(null);
  if (editing) return <SeoEditor page={editing} onClose={() => setEditing(null)} onSave={p => { setPages(prev => prev.map(x => x.id === p.id ? p : x)); setEditing(null); }} />;
  return (
    <AdmCard title="SEO & Meta — Site haritası" desc={`${pages.length} sayfa · meta verilerini düzenle`}>
      <table className="adm-table">
        <thead><tr><th>Sayfa</th><th>URL</th><th>Meta başlık</th><th>İndeksleme</th><th></th></tr></thead>
        <tbody>
          {pages.map(p => (
            <tr key={p.id}>
              <td className="ti">{p.name}</td>
              <td style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>{p.url}</td>
              <td style={{ color: "var(--text-muted)", maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</td>
              <td><Badge tone={p.indexed ? "green" : "muted"}>{p.indexed ? "İndeksli" : "Gizli"}</Badge></td>
              <td><div className="adm-row-actions"><button className="adm-iconbtn" onClick={() => setEditing(p)}><Icon name="edit" size={14} /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdmCard>
  );
}

function SeoEditor({ page, onClose, onSave }) {
  const [p, setP] = useSkState({ og: null, ...page });
  const [busy, setBusy] = useSkState(false);
  const set = (k, v) => setP(x => ({ ...x, [k]: v }));
  const ai = async () => {
    setBusy(true);
    const out = await D().ai(`"${p.name}" sayfası için Türkçe SEO üret. Tam olarak şu formatta yanıt ver:\nBAŞLIK: <60 karakteri aşmayan başlık>\nAÇIKLAMA: <155 karakteri aşmayan meta açıklama>`, () => `BAŞLIK: ${p.name} — Marka\nAÇIKLAMA: ${p.name} hakkında premium, editoryal ve net bir özet.`);
    const tm = out.match(/BAŞLIK\s*:\s*(.+)/i), dm = out.match(/AÇIKLAMA\s*:\s*([\s\S]+)/i);
    setP(x => ({ ...x, title: tm ? tm[1].trim() : x.title, desc: dm ? dm[1].trim().split("\n")[0] : x.desc }));
    setBusy(false);
  };
  const onOg = (file) => { if (!file || !file.type.startsWith("image/")) return; const r = new FileReader(); r.onload = e => set("og", e.target.result); r.readAsDataURL(file); };
  const ogRef = React.useRef();
  return (
    <div>
      <div className="ed-toolbar">
        <button className="ed-back" onClick={onClose}><Icon name="close" size={14} /> Tüm sayfalar</button>
        <span className="adm-badge adm-badge--green">{page.name}</span>
        <span className="sp" />
        <button className="adm-btn adm-btn--ghost" disabled={busy} onClick={ai}>{busy ? <><span className="ai-spinner" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} /> …</> : <><Icon name="ai" size={14} /> AI ile öner</>}</button>
        <button className="adm-btn adm-btn--primary" onClick={() => onSave(p)}>Kaydet</button>
      </div>
      <div className="editor">
        <div className="editor__form">
          <Field label="URL / slug"><input className="adm-input" value={p.url} onChange={e => set("url", e.target.value)} /></Field>
          <div className="adm-field">
            <label style={{ display: "flex", justifyContent: "space-between" }}>Meta başlık <span style={{ textTransform: "none", letterSpacing: 0, color: p.title.length > 60 ? "var(--signal-err)" : "var(--text-subtle)" }}>{p.title.length}/60</span></label>
            <input className="adm-input" value={p.title} onChange={e => set("title", e.target.value)} />
          </div>
          <div className="adm-field">
            <label style={{ display: "flex", justifyContent: "space-between" }}>Meta açıklama <span style={{ textTransform: "none", letterSpacing: 0, color: p.desc.length > 155 ? "var(--signal-err)" : "var(--text-subtle)" }}>{p.desc.length}/155</span></label>
            <textarea className="adm-textarea" style={{ minHeight: "5rem" }} value={p.desc} onChange={e => set("desc", e.target.value)} />
          </div>
          <div className="set-logo">
            <label className="adm-field" style={{ marginBottom: 4 }}><span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-label)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-muted)" }}>Sosyal paylaşım görseli (OG · 1200×630)</span></label>
            <div className={`img-up ${p.og ? "has" : ""}`} style={{ aspectRatio: "1200 / 630" }} onClick={() => { if (window.openImagePicker) window.openImagePicker(v => set("og", v)); else ogRef.current.click(); }}>
              {p.og ? <img src={p.og} alt="" /> : <div className="img-up__ph"><Icon name="media" size={22} /><span>Görsel yükle</span></div>}
              <input ref={ogRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => onOg(e.target.files[0])} />
            </div>
          </div>
          <div className="perm-row" style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" }}>
            <span><span className="pl">Arama motorlarında göster</span><span className="pd"> · index / noindex</span></span>
            <Switch on={p.indexed} onChange={v => set("indexed", v)} />
          </div>
        </div>
        <div className="editor__preview">
          <div className="prev-frame">
            <div className="prev-frame__bar"><Icon name="search" size={13} /> Google önizleme</div>
            <div style={{ padding: "var(--space-5)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#202124" }}><span style={{ color: "var(--text-muted)" }}>marka.studio</span> {p.url}</div>
              <div style={{ color: "#1a0dab", fontSize: 19, margin: ".2rem 0", lineHeight: 1.2 }}>{p.title || "Sayfa başlığı"}</div>
              <div style={{ color: "#4d5156", fontSize: 13.5, lineHeight: 1.5 }}>{p.desc || "Meta açıklama burada görünecek."}</div>
              {p.og && <div className="pv__cover" style={{ aspectRatio: "1200 / 630", marginTop: 14 }}><img src={p.og} alt="" /></div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Projects, Courses, MarketM, Users, Media, SEO });
