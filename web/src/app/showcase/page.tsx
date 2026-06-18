"use client";

import { useState } from "react";
import {
  Avatar,
  AvatarStack,
  Badge,
  BlogCard,
  Button,
  CourseCard,
  IconButton,
  Input,
  Logo,
  Marquee,
  ProductCard,
  ProjectCard,
  Rating,
  SectionHeading,
  Select,
  Tag,
} from "@/components/ui";
import { ThemeControls } from "@/components/theme/ThemeControls";

const PEOPLE = [
  { name: "Ece K." },
  { name: "Mert S." },
  { name: "Lale Y." },
  { name: "Can A." },
  { name: "Su D." },
  { name: "Ada Y." },
];

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

          <Block label="Avatar & IconButton">
            <div style={{ display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}>
              <Avatar name="Ece Kaya" size="lg" />
              <AvatarStack people={PEOPLE} max={4} size="md" />
              <div style={{ display: "flex", gap: ".6rem" }}>
                <IconButton label="Önceki">←</IconButton>
                <IconButton label="Sonraki" variant="solid">
                  →
                </IconButton>
                <IconButton label="Kapat" variant="ghost">
                  ✕
                </IconButton>
              </div>
            </div>
          </Block>

          <Block label="Marquee — iş ortakları">
            <Marquee speed={24}>
              {["NEXUS", "FORMA", "ATLAS", "VERTO", "KÜRE", "LUMEN", "PRIZMA"].map((n) => (
                <span
                  key={n}
                  className="u-label"
                  style={{ fontSize: "1.25rem", color: "var(--text-muted)" }}
                >
                  {n}
                </span>
              ))}
            </Marquee>
          </Block>

          <Block label="Kartlar — Proje · Kurs · Ürün · Blog">
            <div
              style={{
                display: "grid",
                gap: "2rem",
                gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))",
              }}
            >
              <ProjectCard title="Atlas Rebrand" client="Atlas Teknoloji" category="MARKA" />
              <CourseCard
                title="İleri Motion Design"
                instructor="Mert Soy"
                rating={4.8}
                reviews={64}
                price="₺1.299"
                level="ORTA"
              />
              <ProductCard
                title="Marka UI Kit"
                seller="Marka Studio"
                price="59 USD"
                format="FIGMA + REACT"
              />
              <BlogCard
                title="Editöryel tasarımın gücü"
                excerpt="Beyaz alanı bir araç olarak kullanmak neden işe yarar?"
                category="MAKALE"
                date="12 Haz 2026"
                readTime="6 dk"
              />
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
