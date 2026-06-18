"use client";

import { useActionState } from "react";
import { createLead } from "@/lib/actions/leads";
import { Button, Input } from "@/components/ui";
import { PageHero } from "@/components/site/Section";

export default function ContactPage() {
  const [state, formAction, pending] = useActionState(createLead, undefined);

  return (
    <main>
      <PageHero eyebrow="İLETİŞİM" title="Projeni başlat" lead="Bize biraz projenden bahset, 1 iş günü içinde dönelim." />
      <section className="u-container" style={{ paddingBottom: "var(--section-y, 6rem)", maxWidth: "40rem" }}>
        {state?.ok ? (
          <p style={{ fontSize: "var(--fs-lead)" }}>
            Teşekkürler — talebin alındı. En kısa sürede dönüş yapacağız.
          </p>
        ) : (
          <form action={formAction} style={{ display: "grid", gap: "1.25rem" }}>
            <Input label="AD SOYAD" name="name" required />
            <Input label="E-POSTA" name="email" type="email" required />
            <Input label="MESAJ" name="message" as="textarea" />
            {state?.error && <p style={{ color: "var(--danger, #e5484d)" }}>{state.error}</p>}
            <div>
              <Button type="submit" variant="primary" size="lg" disabled={pending}>
                {pending ? "Gönderiliyor…" : "Gönder"}
              </Button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}
