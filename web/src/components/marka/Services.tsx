"use client";

import { useState } from "react";
import { SectionHead } from "@/components/marka/Sections";

const GROUPS = [
  {
    n: "01",
    name: "Geliştirme",
    desc: "Headless CMS, animasyon ve ölçeklenebilir yazılım.",
    subs: [
      ["Web Sitesi Geliştirme", "Editoryal, performanslı ve erişilebilir web siteleri."],
      ["Mobil Uygulama", "iOS & Android için native ve cross-platform uygulamalar."],
      ["Yazılım Aracı", "Panel, dashboard ve özel yazılım araçları."],
    ],
  },
  {
    n: "02",
    name: "Tasarım",
    desc: "Marka, arayüz ve hareket tasarımı.",
    subs: [
      ["UI/UX Tasarım", "Araştırma, akış kurgusu ve arayüz tasarımı."],
      ["Markalaşma", "Strateji, isimlendirme ve marka kimlik sistemleri."],
      ["Motion & Etkileşim", "Hareket tasarımı ve mikro etkileşimler."],
    ],
  },
  {
    n: "03",
    name: "Büyüme & Pazarlama",
    desc: "Dönüşüm, performans ve görünürlük.",
    subs: [
      ["E-ticaret", "Dönüşüm odaklı mağaza ve ödeme deneyimleri."],
      ["SEO & Performans", "Teknik SEO, Core Web Vitals ve hız optimizasyonu."],
    ],
  },
];

export function Services() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="section wrap" aria-label="Hizmetler">
      <SectionHead eyebrow="Hizmetler" title="Ne yapıyoruz" linkText="" />
      <div className="svc reveal">
        {GROUPS.map((g) => {
          const isOpen = open === g.n;
          return (
            <div className={`svc__group ${isOpen ? "is-open" : ""}`} key={g.n}>
              <button className="svc__row" type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : g.n)}>
                <span className="svc__num">{g.n}</span>
                <span className="svc__name">{g.name}</span>
                <span className="svc__desc">{g.desc}</span>
                <span className="svc__toggle" aria-hidden="true">
                  <i></i>
                  <i></i>
                </span>
              </button>
              <div className="svc__panel" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                <div className="svc__panel-in">
                  <ul className="svc__subs">
                    {g.subs.map(([name, desc], i) => (
                      <li className="svc__sub" key={i} data-cursor="">
                        <span className="svc__sub-name" style={{ width: "556px" }}>
                          {name}
                        </span>
                        <span className="svc__sub-desc" style={{ width: "414px" }}>
                          {desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
