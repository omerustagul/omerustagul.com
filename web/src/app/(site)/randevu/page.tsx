"use client";

import { useActionState } from "react";
import { createBooking } from "@/lib/actions/bookings";
import { Button, Input } from "@/components/ui";
import { PageHero } from "@/components/site/Section";

export default function BookingPage() {
  const [state, formAction, pending] = useActionState(createBooking, undefined);

  return (
    <main>
      <PageHero eyebrow="RANDEVU" title="Görüşme planla" lead="30 dakikalık ücretsiz keşif görüşmesi için bir zaman seç." />
      <section className="u-container" style={{ paddingBottom: "var(--section-y, 6rem)", maxWidth: "40rem" }}>
        {state?.ok ? (
          <p style={{ fontSize: "var(--fs-lead)" }}>Randevu talebin alındı — onay için e-posta göndereceğiz.</p>
        ) : (
          <form action={formAction} style={{ display: "grid", gap: "1.25rem" }}>
            <Input label="AD SOYAD" name="name" required />
            <Input label="E-POSTA" name="email" type="email" required />
            <Input label="TARİH & SAAT" name="slot" type="datetime-local" required />
            {state?.error && <p style={{ color: "var(--danger, #e5484d)" }}>{state.error}</p>}
            <div>
              <Button type="submit" variant="primary" size="lg" disabled={pending}>
                {pending ? "Gönderiliyor…" : "Randevu Al"}
              </Button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}
