"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions/auth";
import { SITE_NAME } from "@/lib/site";

export default function LoginPage() {
  const [error, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "var(--space-5)",
        background: "var(--surface-muted)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "400px",
          background: "var(--bg)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          padding: "2rem",
          boxShadow: "var(--shadow-pop)",
          animation: "authpop 0.3s var(--ease-out) forwards",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: "1.4rem", letterSpacing: "-0.04em", marginBottom: "1.5rem" }}>
          {SITE_NAME}
          <span style={{ color: "var(--accent)" }}>.</span>
        </div>

        <div
          style={{
            display: "flex",
            gap: "2px",
            padding: "3px",
            background: "var(--surface-muted)",
            borderRadius: "var(--radius-sm)",
            marginBottom: "1.5rem",
          }}
        >
          <button
            style={{
              flex: 1,
              padding: ".55rem",
              border: 0,
              background: "var(--bg)",
              borderRadius: "var(--radius-sm)",
              fontFamily: "inherit",
              fontSize: "var(--fs-sm)",
              fontWeight: 500,
              color: "var(--text)",
              boxShadow: "var(--shadow-1)",
              cursor: "pointer",
            }}
          >
            Giriş yap
          </button>
          <button
            style={{
              flex: 1,
              padding: ".55rem",
              border: 0,
              background: "none",
              borderRadius: "var(--radius-pill)",
              fontFamily: "inherit",
              fontSize: "var(--fs-sm)",
              fontWeight: 500,
              color: "var(--text-muted)",
              cursor: "not-allowed",
              opacity: 0.5,
            }}
            disabled
          >
            Kayıt ol
          </button>
        </div>

        <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ".4rem",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-label)",
              letterSpacing: "var(--ls-label)",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            E-POSTA
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              style={inputStyle}
            />
          </label>
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ".4rem",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-label)",
              letterSpacing: "var(--ls-label)",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            ŞİFRE
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              style={inputStyle}
            />
          </label>

          {error && <p style={{ color: "var(--signal-err)", fontSize: "var(--fs-sm)", margin: 0 }}>{error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="mk-btn mk-btn--primary"
            style={{ marginTop: ".4rem", justifyContent: "center" }}
          >
            {pending ? "Giriş yapılıyor…" : "Giriş yap"}
          </button>

          <p style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", textAlign: "center", margin: ".5rem 0 0" }}>
            Demo için e-posta: <b>admin@marka.test</b>, şifre: <b>admin1234</b>
          </p>
        </form>
      </div>

      <style>{`
        @keyframes authpop {
          from { opacity: 0; transform: translateY(14px) scale(0.98); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "var(--fs-body)",
  color: "var(--text)",
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius)",
  padding: ".7rem .8rem",
  transition: "border-color var(--dur-fast)",
  outline: "none",
};
