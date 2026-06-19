"use client";

import { useState } from "react";
import Link from "next/link";

function Chips({
  cats,
  active,
  onPick,
  count,
}: {
  cats: string[];
  active: string;
  onPick: (c: string) => void;
  count: string;
}) {
  return (
    <div className="filterbar reveal">
      {cats.map((c) => (
        <button key={c} type="button" className="chip" aria-pressed={active === c} onClick={() => onPick(c)}>
          {c}
        </button>
      ))}
      <span className="count">{count}</span>
    </div>
  );
}

type ProjectItem = { title: string; client: string; category: string; slug: string; hue: number; ratio: string };

export function ProjectsGrid({ items }: { items: ProjectItem[] }) {
  const cats = ["Tümü", ...Array.from(new Set(items.map((i) => i.category)))];
  const [active, setActive] = useState("Tümü");
  const rows = active === "Tümü" ? items : items.filter((i) => i.category === active);
  return (
    <>
      <Chips cats={cats} active={active} onPick={setActive} count={`Toplam ${items.length} proje`} />
      <div className="grid-masonry">
        {rows.map((w, i) => (
          <Link key={w.slug} className="card reveal" href={`/projects/${w.slug}`} data-cursor="Projeyi Gör">
            <div style={{ position: "relative" }}>
              <div className="ph" style={{ aspectRatio: w.ratio.replace("/", " / ") }}>
                <div className="ph__in" style={{ filter: `hue-rotate(${w.hue + i * 12}deg)` }} />
                <span className="ph__tag">PROJE GÖRSELİ</span>
              </div>
              <span className="cardlabel">Projeyi Gör →</span>
            </div>
            <div className="card__top">
              <span className="badge badge--outline">PROJE</span>
              <span className="card__meta mono">{w.category}</span>
            </div>
            <h3 className="card__title">{w.title}</h3>
            <span className="card__meta">{w.client}</span>
          </Link>
        ))}
      </div>
    </>
  );
}

type BlogItem = { title: string; excerpt?: string; category: string; date?: string; readTime?: string; slug: string; hue: number };

export function BlogGrid({ items }: { items: BlogItem[] }) {
  const cats = ["Tümü", ...Array.from(new Set(items.map((i) => i.category)))];
  const [active, setActive] = useState("Tümü");
  const rows = active === "Tümü" ? items : items.filter((i) => i.category === active);
  return (
    <>
      <Chips cats={cats} active={active} onPick={setActive} count={`${items.length} yazı`} />
      <div className="grid-3">
        {rows.map((p, i) => (
          <Link key={p.slug} className="card card--blog card--sm reveal" href={`/blog/${p.slug}`} data-cursor="Oku">
            <div className="ph">
              <div className="ph__in" style={{ filter: `hue-rotate(${p.hue + i * 40}deg)` }} />
              <span className="ph__tag">YAZI</span>
            </div>
            <div className="card__meta mono">
              <span style={{ color: "var(--accent-hover)" }}>{p.category}</span>
              {p.date && (
                <>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span>{p.date}</span>
                </>
              )}
              {p.readTime && (
                <>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span>{p.readTime}</span>
                </>
              )}
            </div>
            <h3 className="card__title">{p.title}</h3>
          </Link>
        ))}
      </div>
    </>
  );
}

type CourseItem = { title: string; instructor: string; rating: number; students: number; price: string; level: string; topic: string; slug: string; hue: number };

export function AcademyGrid({ items }: { items: CourseItem[] }) {
  const cats = ["Tüm Konular", ...Array.from(new Set(items.map((i) => i.topic)))];
  const [active, setActive] = useState("Tüm Konular");
  const rows = active === "Tüm Konular" ? items : items.filter((i) => i.topic === active);
  return (
    <>
      <Chips cats={cats} active={active} onPick={setActive} count={`${items.length} kurs`} />
      <div className="grid-4">
        {rows.map((c, i) => (
          <Link key={c.slug} className="card card--course card--sm reveal" href={`/academy/${c.slug}`} data-cursor="Kursu Aç">
            <div style={{ position: "relative" }}>
              <div className="ph" style={{ aspectRatio: "16 / 10" }}>
                <div className="ph__in" style={{ filter: `hue-rotate(${c.hue + i * 20}deg)` }} />
                <span className="ph__tag">KURS</span>
              </div>
              <span className="badge badge--invert" style={{ position: "absolute", top: 12, left: 12 }}>
                {c.level}
              </span>
            </div>
            <h3 className="card__title">{c.title}</h3>
            <span className="card__meta">{c.instructor}</span>
            <div className="card__top" style={{ marginTop: ".2rem" }}>
              <span className="rating">
                <span className="stars">★★★★★</span>
                <b>{c.rating}</b>
                <span style={{ color: "var(--text-muted)" }}>({c.students})</span>
              </span>
              <span className="card__price">{c.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

type ProductItem = { title: string; seller: string; format: string; type: string; price: string; slug: string; hue: number };

export function MarketGrid({ items }: { items: ProductItem[] }) {
  const cats = ["Tümü", ...Array.from(new Set(items.map((i) => i.type)))];
  const [active, setActive] = useState("Tümü");
  const rows = active === "Tümü" ? items : items.filter((i) => i.type === active);
  return (
    <>
      <Chips cats={cats} active={active} onPick={setActive} count={`${items.length} ürün`} />
      <div className="grid-4">
        {rows.map((p, i) => (
          <Link key={p.slug} className="card card--sm reveal" href={`/market/${p.slug}`} data-cursor="Ürünü Gör">
            <div style={{ position: "relative" }}>
              <div className="ph">
                <div className="ph__in" style={{ filter: `hue-rotate(${p.hue + i * 32}deg)` }} />
                <span className="ph__tag">ÜRÜN GÖRSELİ</span>
              </div>
              <span className="badge badge--invert" style={{ position: "absolute", top: 12, left: 12 }}>
                {p.type}
              </span>
            </div>
            <h3 className="card__title">{p.title}</h3>
            <span className="card__meta">{p.seller}</span>
            <div className="card__top" style={{ marginTop: ".2rem" }}>
              <span className="card__meta mono">{p.format}</span>
              <span className="card__price">{p.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
