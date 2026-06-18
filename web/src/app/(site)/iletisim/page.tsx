"use client";

import { useActionState } from "react";
import { createLead } from "@/lib/actions/leads";
import { PageHead } from "@/components/marka/page-parts";

const SOCIAL = [
  ["Instagram", "https://cdn.simpleicons.org/instagram"],
  ["Dribbble", "https://cdn.simpleicons.org/dribbble"],
  ["Behance", "https://cdn.simpleicons.org/behance"],
];

export default function ContactPage() {
  const [state, formAction, pending] = useActionState(createLead, undefined);

  return (
    <main className="page wrap">
      <PageHead eyebrow="İletişim" title="Birlikte çalışalım" sub="Bir fikrin, bir markan ya da bir sorun mu var? Formu doldur, 48 saat içinde dönelim." />

      <section className="section contact">
        {state?.ok ? (
          <p className="lead-ok" style={{ position: "static" }}>
            ✓ Talebin alındı — 48 saat içinde döneceğiz.
          </p>
        ) : (
          <form className="form reveal" action={formAction}>
            <div className="row">
              <div className="field">
                <label htmlFor="ad">Ad Soyad</label>
                <input id="ad" name="name" placeholder="Adınız" required />
              </div>
              <div className="field">
                <label htmlFor="ep">E-posta</label>
                <input id="ep" name="email" type="email" placeholder="siz@ornek.com" required />
              </div>
            </div>
            <div className="field">
              <label htmlFor="bt">Bütçe</label>
              <select id="bt" name="budget">
                <option>₺50.000 altı</option>
                <option>₺50.000 – 150.000</option>
                <option>₺150.000 – 400.000</option>
                <option>₺400.000+</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="ms">Mesaj</label>
              <textarea id="ms" name="message" placeholder="Projenizden bahsedin…" />
            </div>
            {state?.error && <p style={{ color: "var(--danger, #e5484d)" }}>{state.error}</p>}
            <button type="submit" className="btn btn--primary btn--lg" data-magnetic="" disabled={pending} style={{ alignSelf: "flex-start", marginTop: "var(--space-3)" }}>
              {pending ? "Gönderiliyor…" : "Gönder"} <span className="arr">→</span>
            </button>
          </form>
        )}

        <aside className="office reveal">
          <div className="ph">
            <div className="ph__in" />
            <span className="ph__tag">OFİS / HARİTA</span>
          </div>
          <dl>
            <dt>Adres</dt>
            <dd>Bomonti, İstanbul</dd>
            <dt>E-posta</dt>
            <dd>merhaba@marka.studio</dd>
            <dt>Telefon</dt>
            <dd>+90 212 000 00 00</dd>
          </dl>
          <div className="ftr__social" style={{ display: "flex", gap: "var(--space-3)" }}>
            {SOCIAL.map(([label, u]) => (
              <a key={label} className="soc" href="#" aria-label={label} title={label} data-cursor="">
                <span className="soc__i" style={{ WebkitMaskImage: `url(${u})`, maskImage: `url(${u})` }} />
              </a>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
