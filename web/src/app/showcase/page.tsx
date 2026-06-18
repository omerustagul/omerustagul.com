"use client";

import { useState } from "react";
import { Badge, Button, Input, Logo, Rating, SectionHeading, Select, Tag } from "@/components/ui";
import { ThemeControls } from "@/components/theme/ThemeControls";

const FILTERS = ["Tümü", "Web", "Marka", "Mobil", "Kampanya"];

export default function ShowcasePage() {
  const [active, setActive] = useState("Tümü");

  return (
    <main className="u-container" style={{ paddingBlock: "clamp(3rem, 6vw, 6rem)" }}>
      <SectionHeading
        eyebrow="TASARIM SİSTEMİ"
        title="Component galerisi"
        subtitle="Prototip primitive'leri TSX olarak. Sağdaki panel canlı temayı (mk-theme) düzenler — vurgu, mod, köşe ve font anında uygulanır."
        linkText="Anasayfa"
        linkHref="/"
      />

      <div
        style={{
          display: "grid",
          gap: "2.5rem",
          gridTemplateColumns: "minmax(0, 1fr) 18rem",
          alignItems: "start",
        }}
      >
        {/* Gallery */}
        <div style={{ display: "grid", gap: "2.5rem" }}>
          <Block label="Logo">
            <div style={{ display: "flex", gap: "2rem", alignItems: "baseline", flexWrap: "wrap" }}>
              <Logo size="sm" />
              <Logo size="md" />
              <Logo size="lg" />
            </div>
          </Block>

          <Block label="Button — variant & size">
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
              <Button variant="primary">Teklif Al</Button>
              <Button variant="secondary" iconRight="→">
                Projeyi İncele
              </Button>
              <Button variant="ghost" iconRight="↗">
                Tümünü Gör
              </Button>
              <Button variant="primary" size="lg">
                Büyük
              </Button>
              <Button variant="primary" size="sm">
                Küçük
              </Button>
              <Button variant="primary" disabled>
                Pasif
              </Button>
            </div>
          </Block>

          <Block label="Badge">
            <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
              <Badge variant="solid">ÖNE ÇIKAN</Badge>
              <Badge variant="outline">PROJE</Badge>
              <Badge variant="muted">DİJİTAL ÜRÜN</Badge>
              <Badge variant="invert" dot>
                CANLI
              </Badge>
            </div>
          </Block>

          <Block label="Tag — filtre çubuğu">
            <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
              {FILTERS.map((f, i) => (
                <Tag key={f} active={active === f} count={i === 0 ? 24 : i * 3} onClick={() => setActive(f)}>
                  {f}
                </Tag>
              ))}
            </div>
          </Block>

          <Block label="Rating">
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              <Rating value={4.9} count={128} />
              <Rating value={3.5} />
              <Rating value={5} showScore={false} />
            </div>
          </Block>

          <Block label="Input & Select">
            <div style={{ display: "grid", gap: "1rem", maxWidth: "28rem" }}>
              <Input label="E-posta" type="email" placeholder="ad@marka.co" hint="Sana buradan döneriz." />
              <Input label="Mesaj" as="textarea" placeholder="Projenden bahset…" />
              <Select label="Bütçe" defaultValue="">
                <option value="" disabled>
                  Seç…
                </option>
                <option>₺50.000 altı</option>
                <option>₺50.000 – ₺150.000</option>
                <option>₺150.000+</option>
              </Select>
            </div>
          </Block>
        </div>

        {/* Live theme panel */}
        <aside style={{ position: "sticky", top: "2rem" }}>
          <p className="mk-field__label" style={{ marginBottom: ".75rem" }}>
            CANLI TEMA
          </p>
          <ThemeControls />
        </aside>
      </div>
    </main>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section style={{ display: "grid", gap: "1rem" }}>
      <h3 className="mk-field__label" style={{ borderBottom: "1px solid var(--border)", paddingBottom: ".6rem" }}>
        {label}
      </h3>
      {children}
    </section>
  );
}
