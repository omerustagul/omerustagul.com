"use client";

import React, { useState } from "react";
import { AdmCard, Badge, Field, Switch, Drawer, Modal, Seg, MkSelect } from "@/components/admin/ui";
import { Icon } from "@/components/admin/AdminIcons";

// Default permission groups based on prototype
const PERM_GROUPS = [
  {
    g: "Sayfalar (panel erişimi)",
    items: [
      { k: "dashboard", l: "Dashboard" },
      { k: "content", l: "Blog & İçerik" },
      { k: "projects", l: "Projeler" },
      { k: "courses", l: "Kurslar" },
      { k: "market", l: "Market" },
      { k: "media", l: "Medya" },
      { k: "appearance", l: "Tema & Görünüm" },
      { k: "seo", l: "SEO & Meta" },
      { k: "users", l: "Kullanıcılar" },
      { k: "settings", l: "Ayarlar" },
    ],
  },
  {
    g: "İşlemler (buton & alan yetkileri)",
    items: [
      { k: "create", l: "Oluştur", d: "Yeni kayıt ekleme butonları" },
      { k: "edit", l: "Düzenle" },
      { k: "delete", l: "Sil", d: "Silme butonları" },
      { k: "publish", l: "Yayınla", d: "Taslağı yayına alma" },
    ],
  },
  {
    g: "Hassas alanlar",
    items: [
      { k: "ai", l: "AI özelliklerini kullan" },
      { k: "apikeys", l: "API anahtarları" },
      { k: "billing", l: "Faturalandırma & bütçe" },
    ],
  },
];
const ALL_PERMS = PERM_GROUPS.flatMap((g) => g.items.map((i) => i.k));

const DEFAULT_ROLES = [
  { id: 1, name: "Yönetici", desc: "Tam yetki", users: 1, perms: [...ALL_PERMS] },
  {
    id: 2,
    name: "Editör",
    desc: "İçerik üretimi & yayın",
    users: 1,
    perms: ["dashboard", "content", "projects", "media", "seo", "create", "edit", "publish", "ai"],
  },
  {
    id: 3,
    name: "Yazar",
    desc: "Yalnızca taslak",
    users: 1,
    perms: ["dashboard", "content", "media", "create", "edit", "ai"],
  },
];

export function UsersClient({ initialUsers }: { initialUsers: any[] }) {
  const [tab, setTab] = useState<"users" | "roles">("users");
  const [users, setUsers] = useState(
    initialUsers.map((u) => ({
      ...u,
      roleName: u.role === "ADMIN" ? "Yönetici" : u.role === "EDITOR" ? "Editör" : "Yazar",
      status: "Aktif",
    }))
  );
  const [roles, setRoles] = useState(DEFAULT_ROLES);
  const [drawer, setDrawer] = useState<any>(null);
  const [roleEdit, setRoleEdit] = useState<any>(null);

  return (
    <div>
      <div className="tabs" style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <button
          className={tab === "users" ? "on" : ""}
          onClick={() => setTab("users")}
          style={{
            background: "none",
            border: "none",
            borderBottom: tab === "users" ? "2px solid var(--accent)" : "2px solid transparent",
            padding: "0.5rem 1rem",
            fontWeight: tab === "users" ? 600 : 400,
            cursor: "pointer",
            color: tab === "users" ? "var(--text)" : "var(--text-muted)",
          }}
        >
          Kullanıcılar
        </button>
        <button
          className={tab === "roles" ? "on" : ""}
          onClick={() => setTab("roles")}
          style={{
            background: "none",
            border: "none",
            borderBottom: tab === "roles" ? "2px solid var(--accent)" : "2px solid transparent",
            padding: "0.5rem 1rem",
            fontWeight: tab === "roles" ? 600 : 400,
            cursor: "pointer",
            color: tab === "roles" ? "var(--text)" : "var(--text-muted)",
          }}
        >
          Roller & Yetkiler
        </button>
      </div>

      {tab === "users" ? (
        <AdmCard
          title="Kullanıcılar"
          desc={`${users.length} kişi`}
          action={
            <button className="adm-btn adm-btn--primary" onClick={() => setDrawer({})}>
              <Icon name="plus" size={15} /> Kullanıcı ekle
            </button>
          }
        >
          <table className="adm-table">
            <thead>
              <tr>
                <th>Ad</th>
                <th>E-posta</th>
                <th>Rol</th>
                <th>Durum</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: "var(--surface-muted)",
                          display: "grid",
                          placeItems: "center",
                          fontWeight: 600,
                          fontSize: "12px",
                        }}
                      >
                        {u.avatar ? (
                          <img
                            src={u.avatar}
                            alt=""
                            style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
                          />
                        ) : (
                          (u.name || "?")
                            .split(" ")
                            .map((w: string) => w[0])
                            .slice(0, 2)
                            .join("")
                        )}
                      </span>
                      <span className="ti">{u.name}</span>
                    </div>
                  </td>
                  <td style={{ color: "var(--text-muted)" }}>{u.email}</td>
                  <td>{u.roleName}</td>
                  <td>
                    <Badge tone={u.status === "Aktif" ? "green" : u.status === "Pasif" ? "muted" : "warn"}>
                      {u.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="adm-row-actions">
                      <button className="adm-iconbtn" onClick={() => setDrawer(u)}>
                        <Icon name="edit" size={14} />
                      </button>
                      <button className="adm-iconbtn" onClick={() => setUsers((p) => p.filter((x) => x.id !== u.id))}>
                        <Icon name="trash" size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdmCard>
      ) : (
        <RolesPanel
          roles={roles}
          onAdd={() => setRoleEdit({ name: "", perms: [] })}
          onEdit={(r: any) => setRoleEdit(r)}
          onSave={(r: any) => {
            setRoles((p) =>
              r.id
                ? p.map((x) => (x.id === r.id ? { ...x, ...r } : x))
                : [...p, { id: Date.now(), users: 0, desc: r.desc || "Özel rol", ...r }]
            );
            setRoleEdit(null);
          }}
          editing={roleEdit}
          onCancel={() => setRoleEdit(null)}
        />
      )}

      {drawer && (
        <UserDrawer
          user={drawer}
          roles={roles}
          onClose={() => setDrawer(null)}
          onSave={(u: any) => {
            setUsers((p) =>
              u.id
                ? p.map((x) => (x.id === u.id ? { ...x, ...u } : x))
                : [...p, { id: Date.now().toString(), status: u.status || "Davet edildi", ...u }]
            );
            setDrawer(null);
          }}
        />
      )}
    </div>
  );
}

function RolesPanel({ roles, onAdd, onEdit, onSave, editing, onCancel }: any) {
  const [r, setR] = useState(editing || { name: "", perms: [] });

  React.useEffect(() => {
    setR(editing || { name: "", perms: [] });
  }, [editing]);

  if (editing) {
    const toggle = (k: string) =>
      setR((x: any) => ({
        ...x,
        perms: x.perms.includes(k) ? x.perms.filter((p: string) => p !== k) : [...x.perms, k],
      }));
    return (
      <AdmCard
        title={editing.id ? "Rolü düzenle" : "Yeni rol"}
        desc="Her sayfa, buton ve alan için yetkiyi aç/kapat"
        action={
          <div style={{ display: "flex", gap: ".5rem" }}>
            <button className="adm-btn adm-btn--ghost" onClick={onCancel}>
              Vazgeç
            </button>
            <button className="adm-btn adm-btn--primary" onClick={() => onSave(r)}>
              Rolü kaydet
            </button>
          </div>
        }
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          <Field label="Rol adı">
            <input
              className="adm-input"
              value={r.name}
              onChange={(e) => setR((x: any) => ({ ...x, name: e.target.value }))}
              placeholder="örn. İçerik Editörü"
            />
          </Field>
          <Field label="Açıklama">
            <input
              className="adm-input"
              value={r.desc || ""}
              onChange={(e) => setR((x: any) => ({ ...x, desc: e.target.value }))}
              placeholder="Kısa açıklama"
            />
          </Field>
        </div>
        {PERM_GROUPS.map((grp) => (
          <div key={grp.g} style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", marginBottom: "1rem", overflow: "hidden" }}>
            <div style={{ background: "var(--surface-muted)", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)" }}>
              <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>{grp.g}</h4>
              <button
                className="adm-btn adm-btn--ghost"
                style={{ padding: ".25rem .7rem" }}
                onClick={() =>
                  setR((x: any) => {
                    const ks = grp.items.map((i) => i.k);
                    const allOn = ks.every((k) => x.perms.includes(k));
                    return {
                      ...x,
                      perms: allOn ? x.perms.filter((p: string) => !ks.includes(p)) : [...new Set([...x.perms, ...ks])],
                    };
                  })
                }
              >
                Tümünü değiştir
              </button>
            </div>
            <div style={{ padding: "0 1rem" }}>
              {grp.items.map((it) => (
                <div key={it.k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0", borderBottom: "1px solid var(--border)" }}>
                  <span>
                    <span style={{ fontWeight: 500 }}>{it.l}</span>
                    {it.d && <span style={{ color: "var(--text-muted)", fontSize: "12px" }}> · {it.d}</span>}
                  </span>
                  <Switch on={r.perms.includes(it.k)} onChange={() => toggle(it.k)} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </AdmCard>
    );
  }

  return (
    <AdmCard
      title="Roller"
      desc={`${roles.length} rol`}
      action={
        <button className="adm-btn adm-btn--primary" onClick={onAdd}>
          <Icon name="plus" size={15} /> Yeni rol
        </button>
      }
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
        {roles.map((role: any) => (
          <div
            key={role.id}
            style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div>
              <b style={{ fontSize: "16px" }}>{role.name}</b>
              <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
                {role.perms.length} yetki · {role.users} kullanıcı · {role.desc}
              </div>
            </div>
            <button className="adm-btn adm-btn--ghost" style={{ alignSelf: "flex-start" }} onClick={() => onEdit(role)}>
              <Icon name="edit" size={14} /> Düzenle
            </button>
          </div>
        ))}
      </div>
    </AdmCard>
  );
}

function UserDrawer({ user, roles, onClose, onSave }: any) {
  const [u, setU] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    roleName: roles[0]?.name,
    status: "Davet edildi",
    ...user,
  });
  const set = (k: string, v: any) => setU((x: any) => ({ ...x, [k]: v }));
  
  return (
    <Drawer
      title={user.id ? "Kullanıcıyı düzenle" : "Yeni kullanıcı"}
      subtitle="Profil, giriş bilgileri ve rol"
      onClose={onClose}
      footer={
        <>
          <button className="adm-btn adm-btn--ghost" onClick={onClose}>
            Vazgeç
          </button>
          <button className="adm-btn adm-btn--primary" onClick={() => onSave(u)}>
            {user.id ? "Kaydet" : "Kullanıcı oluştur"}
          </button>
        </>
      }
    >
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "2rem" }}>
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "var(--radius)",
            background: "var(--surface-muted)",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            overflow: "hidden"
          }}
        >
          {u.avatar ? (
            <img src={u.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ color: "var(--text-muted)", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Icon name="users" size={24} />
            </div>
          )}
        </div>
        <div>
          <b style={{ fontWeight: 600 }}>Profil fotoğrafı</b>
          <br />
          <small style={{ color: "var(--text-muted)", fontSize: "var(--fs-xs)" }}>
            Kare görsel · yakında entegre edilecek
          </small>
        </div>
      </div>

      <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-muted)", marginTop: 4, marginBottom: 12 }}>
        Kişisel bilgiler
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
        <Field label="Ad Soyad">
          <input className="adm-input" value={u.name} onChange={(e) => set("name", e.target.value)} placeholder="Ada Yılmaz" />
        </Field>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <Field label="E-posta">
            <input className="adm-input" value={u.email} onChange={(e) => set("email", e.target.value)} placeholder="ada@marka.studio" />
          </Field>
          <Field label="Telefon">
            <input className="adm-input" value={u.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+90 5xx" />
          </Field>
        </div>
      </div>

      <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-muted)", marginTop: 4, marginBottom: 12 }}>
        Panel giriş bilgileri
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <Field label="Kullanıcı adı">
            <input className="adm-input" value={u.username} onChange={(e) => set("username", e.target.value)} placeholder="ada" />
          </Field>
          <Field label="Geçici şifre">
            <input className="adm-input" type="password" value={u.password} onChange={(e) => set("password", e.target.value)} placeholder="••••••••" />
          </Field>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <Field label="Rol">
            <MkSelect value={u.roleName} onChange={(v) => set("roleName", v)} options={roles.map((r: any) => r.name)} />
          </Field>
          <Field label="Durum">
            <MkSelect value={u.status} onChange={(v) => set("status", v)} options={["Aktif", "Davet edildi", "Pasif"]} />
          </Field>
        </div>
      </div>
    </Drawer>
  );
}
