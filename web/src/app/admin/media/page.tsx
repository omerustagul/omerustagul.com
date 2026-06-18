"use client";

import { useActionState } from "react";
import { uploadImage } from "@/lib/actions/media";
import { AdminHeader, FormCard } from "@/components/admin/ui";

export default function AdminMedia() {
  const [state, formAction, pending] = useActionState(uploadImage, undefined);

  return (
    <div>
      <AdminHeader title="Medya" />
      <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-sm)", marginBottom: "1.5rem", maxWidth: "52ch" }}>
        Görsel yükle; dönen URL&apos;i proje/blog/ürün formlarındaki &quot;GÖRSEL URL&quot; alanına yapıştır.
        (Yerel geliştirme için <code>public/uploads</code>; üretimde Vercel Blob / S3 önerilir.)
      </p>

      <form action={formAction}>
        <FormCard>
          <label className="mk-field">
            <span className="mk-field__label">GÖRSEL</span>
            <input className="mk-input" type="file" name="file" accept="image/*" required />
          </label>
          {state?.error && <p style={{ color: "var(--danger, #e5484d)" }}>{state.error}</p>}
          <button type="submit" className="mk-btn mk-btn--primary mk-btn--md" disabled={pending} style={{ justifySelf: "start" }}>
            {pending ? "Yükleniyor…" : "Yükle"}
          </button>
        </FormCard>
      </form>

      {state?.url && (
        <div style={{ marginTop: "1.5rem", display: "grid", gap: ".75rem", maxWidth: "40rem" }}>
          <p className="u-label">YÜKLENDİ — URL</p>
          <input className="mk-input" readOnly value={state.url} onFocus={(e) => e.currentTarget.select()} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={state.url} alt="önizleme" style={{ maxWidth: "20rem", borderRadius: "var(--radius)" }} />
        </div>
      )}
    </div>
  );
}
