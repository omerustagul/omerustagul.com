import Link from "next/link";
import { auth } from "@/auth";
import { logoutAction } from "@/lib/actions/auth";
import { AdminNav } from "@/components/admin/AdminNav";
import { Logo } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth(); // proxy already gates /admin to ADMIN/EDITOR

  return (
    <div style={{ display: "grid", gridTemplateColumns: "16rem 1fr", minHeight: "100vh" }}>
      <aside
        style={{
          borderRight: "1px solid var(--border)",
          padding: "1.5rem 1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <Link href="/admin" style={{ paddingInline: ".85rem" }}>
          <Logo size="sm" />
        </Link>
        <AdminNav />
        <div style={{ marginTop: "auto", display: "grid", gap: ".5rem", paddingInline: ".85rem" }}>
          <Link href="/" className="u-label" style={{ display: "inline" }}>
            ← Siteyi Gör
          </Link>
          <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-subtle)" }}>
            {session?.user?.name} · {session?.user?.role}
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              style={{
                fontSize: "var(--fs-sm)",
                color: "var(--text-muted)",
                background: "transparent",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                padding: ".4rem .7rem",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Çıkış yap
            </button>
          </form>
        </div>
      </aside>

      <main style={{ padding: "2.5rem clamp(1.5rem, 4vw, 3.5rem)", maxWidth: "72rem" }}>{children}</main>
    </div>
  );
}
