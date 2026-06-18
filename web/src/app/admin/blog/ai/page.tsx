"use client";

import { useActionState } from "react";
import Link from "next/link";
import { generateDraftAction } from "@/lib/actions/ai";
import { AdminHeader, FormCard } from "@/components/admin/ui";

export default function AiBlogPage() {
  const [error, formAction, pending] = useActionState(generateDraftAction, undefined);

  return (
    <div>
      <Link href="/admin/blog" className="u-label" style={{ display: "inline-block", marginBottom: "1.5rem" }}>
        ← Blog
      </Link>
      <AdminHeader title="AI ile Taslak Üret" />
      <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-sm)", marginBottom: "1.5rem", maxWidth: "48ch" }}>
        Bir konu gir; sunucu tarafında Claude bir blog taslağı üretip düzenleyiciyi açar.
        ANTHROPIC_API_KEY tanımlı değilse zarif bir simülasyon kullanılır.
      </p>
      <form action={formAction}>
        <FormCard>
          <label className="mk-field">
            <span className="mk-field__label">KONU</span>
            <input className="mk-input" name="topic" required placeholder="örn. Editöryel tasarımın gücü" />
          </label>
          {error && <p style={{ color: "var(--danger, #e5484d)" }}>{error}</p>}
          <button type="submit" className="mk-btn mk-btn--primary mk-btn--md" disabled={pending} style={{ justifySelf: "start" }}>
            {pending ? "Üretiliyor…" : "Taslak Üret"}
          </button>
        </FormCard>
      </form>
    </div>
  );
}
