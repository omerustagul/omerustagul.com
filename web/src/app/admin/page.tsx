// Protected admin landing — middleware already gates /admin to ADMIN/EDITOR.
// We also read the session here to render the current user.
import { auth } from "@/auth";
import { logoutAction } from "@/lib/actions/auth";

export default async function AdminPage() {
  const session = await auth();

  return (
    <main className="u-container" style={{ paddingBlock: "var(--section-y, 6rem)" }}>
      <p className="u-label" style={{ marginBottom: "0.75rem" }}>
        ADMIN
      </p>
      <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}>
        Kontrol paneli
      </h1>
      <p style={{ marginTop: "1rem", color: "var(--text-muted)" }}>
        Giriş yapan: <strong>{session?.user?.name}</strong> ({session?.user?.email})
        {" · "}
        <span className="u-label" style={{ display: "inline" }}>
          {session?.user?.role}
        </span>
      </p>

      <form action={logoutAction} style={{ marginTop: "2rem" }}>
        <button
          type="submit"
          style={{
            padding: "0.6rem 1.1rem",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-pill, 999px)",
            background: "transparent",
            color: "var(--text)",
            font: "inherit",
            cursor: "pointer",
          }}
        >
          Çıkış yap
        </button>
      </form>
    </main>
  );
}
