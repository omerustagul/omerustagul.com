import "@/styles/admin.css";
import Link from "next/link";
import { auth } from "@/auth";
import { logoutAction } from "@/lib/actions/auth";
import { AdminNav, AdminTop } from "@/components/admin/AdminNav";
import { Icon } from "@/components/admin/AdminIcons";
import { SITE_NAME } from "@/lib/site";
import { MediaPickerGlobal } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth(); // proxy already gates /admin to ADMIN/EDITOR
  const initials = session?.user?.name
    ? session.user.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
    : "AD";

  return (
    <div className="adm">
      <aside className="adm-side">
        <div className="adm-side__brand">
          <span className="brand">
            {SITE_NAME}
            <span className="dot">.</span>
          </span>
          <span className="adm-side__badge">Admin</span>
        </div>
        
        <AdminNav />
        
        <div className="adm-side__user" style={{ flexDirection: "column", alignItems: "stretch", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: ".7rem" }}>
            <span className="av">{initials}</span>
            <div>
              <b>{session?.user?.name || "Yönetici"}</b>
              <span>{session?.user?.role || "ADMIN"}</span>
            </div>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="adm-btn adm-btn--ghost"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Çıkış yap
            </button>
          </form>
        </div>
      </aside>

      <div className="adm-main">
        <div className="adm-mobilebar">
          <button className="adm-iconbtn" aria-label="Menü">
            <Icon name="menu" size={18} />
          </button>
          <span className="brand" style={{ fontWeight: 700 }}>
            {SITE_NAME}
            <span style={{ color: "var(--accent)" }}>.</span>
          </span>
        </div>
        
        <AdminTop />
        
        <main className="adm-body">{children}</main>
        <MediaPickerGlobal />
      </div>
    </div>
  );
}
