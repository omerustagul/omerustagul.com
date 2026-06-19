"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Ph } from "@/components/marka/parts";
import { VoteButton } from "@/components/marka/VoteButton";
import { SectionHead } from "@/components/marka/Sections";
import { toggleFollow } from "@/lib/actions/follow";
import type { PageTextMap } from "@/lib/page-text";

/* Faithful port of ui_kits/website/Community.jsx — Haftanın İşi (live voting +
   vote-driven ranking), Koleksiyonlar (DB-backed follow) + Rozetler (earned). */

export type WeeklyItem = {
  id: string;
  title: string;
  client: string;
  cat: string;
  hue: number;
  votes: number;
  voted: boolean;
  slug: string;
};

export function WeeklyWork({ items, authed, overrides }: { items: WeeklyItem[]; authed: boolean; overrides?: PageTextMap }) {
  if (!items.length) return null;
  const top = items[0];
  const rest = items.slice(1);
  return (
    <section className="section wrap weekly" aria-label="Haftanın işi">
      <SectionHead eyebrow="Topluluk" title="Haftanın İşi" sub="Topluluğun oylarıyla öne çıkan projeler. Sen de beğen, sıralamayı belirle." linkText="" kb="weekly" overrides={overrides} />
      <div className="weekly__grid">
        <Link className="weekly__hero reveal" href={`/projects/${top.slug}`} data-cursor="Projeyi Gör">
          <div className="weekly__cover">
            <Ph ratio="16/10" tag="PROJE GÖRSELİ" hue={top.hue} />
            <span className="weekly__crown">🏆 Haftanın İşi</span>
            <span className="weekly__votes">
              <VoteButton projectId={top.id} count={top.votes} voted={top.voted} authed={authed} />
            </span>
          </div>
          <div className="weekly__meta">
            <span className="card__meta mono">{top.cat}</span>
            <h3>{top.title}</h3>
            <span className="card__meta">{top.client}</span>
          </div>
        </Link>
        <ol className="weekly__list">
          {rest.map((r, i) => (
            <li key={r.id} className="weekly__row reveal" style={{ transitionDelay: `${i * 70}ms` }}>
              <span className="weekly__rank">{i + 2}</span>
              <div className="weekly__rowMedia">
                <Ph ratio="1/1" hue={r.hue} />
              </div>
              <div className="weekly__rowMeta">
                <h4>{r.title}</h4>
                <span className="card__meta mono">{r.cat}</span>
              </div>
              <VoteButton projectId={r.id} count={r.votes} voted={r.voted} authed={authed} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const BADGE_ICONS: Record<string, string> = {
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0",
  play: "M8 5v14l11-7z",
  heart: "M12 21s-7.5-4.6-10-9.2C.4 8.5 2 5 5.5 5 7.7 5 9.2 6.3 12 9c2.8-2.7 4.3-4 6.5-4C22 5 23.6 8.5 22 11.8 19.5 16.4 12 21 12 21z",
  bookmark: "M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z",
  trophy: "M7 4h10v3a5 5 0 01-10 0zM7 5H4v2a3 3 0 003 3M17 5h3v2a3 3 0 01-3 3M9 14h6l-1 4h-4z",
};

function Badges({ earnedIds }: { earnedIds: string[] }) {
  const has = (id: string) => earnedIds.includes(id);
  const list = [
    { id: "uye", name: "Üye", desc: "Hesap oluştur", icon: "user" },
    { id: "oyuncu", name: "Oyuncu", desc: "Bir oyun oyna", icon: "play" },
    { id: "oy", name: "Oy Verdi", desc: "Bir projeye oy ver", icon: "heart" },
    { id: "koleksiyon", name: "Koleksiyoncu", desc: "Bir koleksiyon takip et", icon: "bookmark" },
    { id: "sampiyon", name: "Şampiyon", desc: "Bir oyunda 1. ol", icon: "trophy" },
  ];
  const earned = list.filter((b) => has(b.id)).length;
  return (
    <div className="badges reveal" id="rozetler">
      <div className="badges__head">
        <span className="eyebrow">Rozetlerin</span>
        <span className="badges__count">
          {earned}/{list.length}
        </span>
      </div>
      <div className="badges__row">
        {list.map((b) => (
          <div key={b.id} className={`badge3 ${has(b.id) ? "is-earned" : ""}`} title={b.desc}>
            <span className="badge3__ic">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d={BADGE_ICONS[b.icon]} />
              </svg>
            </span>
            <span className="badge3__nm">{b.name}</span>
            <span className="badge3__desc">{has(b.id) ? "Kazanıldı" : b.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const COLLECTIONS = [
  { id: "k1", title: "Editöryel Web", count: 18, hue: 0, base: 1240 },
  { id: "k2", title: "Cesur Tipografi", count: 24, hue: 40, base: 980 },
  { id: "k3", title: "Minimal E-ticaret", count: 15, hue: -50, base: 1530 },
  { id: "k4", title: "Hareket & Etkileşim", count: 12, hue: 200, base: 760 },
];

export type FollowState = { following: Record<string, boolean>; extra: Record<string, number> };

function CollectionCard({
  c,
  authed,
  initialFollowing,
  initialExtra,
}: {
  c: (typeof COLLECTIONS)[number];
  authed: boolean;
  initialFollowing: boolean;
  initialExtra: number;
}) {
  const router = useRouter();
  const [on, setOn] = useState(initialFollowing);
  const [extra, setExtra] = useState(initialExtra);
  const [, start] = useTransition();

  function toggle() {
    if (!authed) {
      router.push("/login?callbackUrl=/");
      return;
    }
    const prevOn = on;
    const prevExtra = extra;
    setOn(!prevOn);
    setExtra(prevExtra + (prevOn ? -1 : 1));
    start(async () => {
      const r = await toggleFollow(c.id);
      if ("error" in r) {
        setOn(prevOn);
        setExtra(prevExtra);
      } else {
        setOn(r.following);
        setExtra(r.count);
      }
    });
  }

  return (
    <div className="collcard reveal">
      <div className="collcard__cover">
        <Ph ratio="16/10" tag="KOLEKSİYON" hue={c.hue} />
        <span className="collcard__count">{c.count} proje</span>
      </div>
      <div className="collcard__b">
        <h3 className="collcard__title">{c.title}</h3>
        <div className="collcard__foot">
          <div className="collcard__people">
            <div className="avstack">
              {["E", "M", "L"].map((a, i) => (
                <span key={i} className="avstack__a">
                  {a}
                </span>
              ))}
            </div>
            <span className="collcard__followers">{(c.base + extra).toLocaleString("tr-TR")} takipçi</span>
          </div>
          <button type="button" className={`followbtn ${on ? "is-on" : ""}`} onClick={toggle}>
            {on ? "Takiptesin" : "Takip Et"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Collections({
  earnedIds = [],
  authed = false,
  follows = { following: {}, extra: {} },
  overrides,
}: {
  earnedIds?: string[];
  authed?: boolean;
  follows?: FollowState;
  overrides?: PageTextMap;
}) {
  return (
    <section className="section wrap collections" aria-label="Koleksiyonlar">
      <SectionHead eyebrow="İlham" title="Koleksiyonlar" sub="Küratörlü proje koleksiyonlarını takip et, ilham akışını kişiselleştir." linkText="Tümünü Gör" linkHref="/blog" kb="collections" overrides={overrides} />
      <Badges earnedIds={earnedIds} />
      <div className="grid-4 collections__grid">
        {COLLECTIONS.map((c) => (
          <CollectionCard
            key={c.id}
            c={c}
            authed={authed}
            initialFollowing={!!follows.following[c.id]}
            initialExtra={follows.extra[c.id] ?? 0}
          />
        ))}
      </div>
    </section>
  );
}
