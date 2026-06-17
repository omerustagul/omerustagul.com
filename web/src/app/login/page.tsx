"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions/auth";

export default function LoginPage() {
  const [error, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <main
      className="u-container"
      style={{ paddingBlock: "var(--section-y, 6rem)", maxWidth: "32rem" }}
    >
      <p className="u-label" style={{ marginBottom: "0.75rem" }}>
        HESAP
      </p>
      <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em", marginBottom: "2rem" }}>
        Giriş yap
      </h1>

      <form action={formAction} style={{ display: "grid", gap: "1rem" }}>
        <label style={{ display: "grid", gap: "0.4rem" }}>
          <span className="u-label">E-POSTA</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            style={inputStyle}
          />
        </label>
        <label style={{ display: "grid", gap: "0.4rem" }}>
          <span className="u-label">ŞİFRE</span>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            style={inputStyle}
          />
        </label>

        {error && (
          <p style={{ color: "var(--danger, #e5484d)", fontSize: "0.9rem" }}>{error}</p>
        )}

        <button type="submit" disabled={pending} style={buttonStyle}>
          {pending ? "Giriş yapılıyor…" : "Giriş yap"}
        </button>
      </form>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "0.75rem 1rem",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius)",
  background: "var(--surface, var(--bg))",
  color: "var(--text)",
  font: "inherit",
};

const buttonStyle: React.CSSProperties = {
  padding: "0.85rem 1.25rem",
  border: "none",
  borderRadius: "var(--radius-pill, 999px)",
  background: "var(--accent)",
  color: "var(--on-accent)",
  font: "inherit",
  fontWeight: 600,
  cursor: "pointer",
};
