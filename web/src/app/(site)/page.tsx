import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/marka/Hero";
import { LatestWorks, Partners, Academy, Blog, Market, Stats, CTABlocks } from "@/components/marka/Sections";
import { Services } from "@/components/marka/Services";
import { WeeklyWork, Collections } from "@/components/marka/community";
import { GamesSection } from "@/components/marka/games-section";
import { getMyGameStats } from "@/lib/actions/games";
import { getHomeLayout } from "@/lib/home-layout-server";
import { getPageText } from "@/lib/page-text-server";
import { CustomSectionView } from "@/components/marka/CustomSectionView";
import { InlineEditor } from "@/components/marka/InlineEditor";
import { Fragment, type ReactNode } from "react";

export const dynamic = "force-dynamic";

// Homepage — faithful 1:1 reproduction of the prototype (ui_kits/website), with
// the exact section content and order from the Claude-designed prototype.

const PARTNERS = ["ATLAS", "NOVA", "KÖK", "VENTA", "ORBİT", "FORM", "PERA", "LUMA"];

const COURSES = [
  { title: "Sıfırdan Tasarım Sistemi", instructor: "Deniz Arı", rating: 4.9, reviews: 214, price: "₺1.299", level: "Orta", hue: 0, href: "/academy" },
  { title: "Webflow ile Üretim", instructor: "Ece Kaya", rating: 4.8, reviews: 178, price: "₺899", level: "Başlangıç", hue: 30, href: "/academy" },
  { title: "Motion & Etkileşim", instructor: "Mert Su", rating: 5.0, reviews: 96, price: "₺1.499", level: "İleri", hue: -40, href: "/academy" },
  { title: "Marka Stratejisi", instructor: "Lale Yön", rating: 4.7, reviews: 132, price: "₺1.099", level: "Orta", hue: 70, href: "/academy" },
];

const BLOG_FEATURED = {
  title: "2026'da editoryal grid'ler neden geri döndü?",
  excerpt: "Bol negatif alan, ince çizgiler ve büyük tipografi: ödüllü sitelerin ortak dili.",
  category: "Görüş",
  date: "12 Haz 2026",
  readTime: "6 dk okuma",
  hue: 0,
  href: "/blog",
};
const BLOG_REST = [
  { title: "Bir marka kimliğini nasıl kurguluyoruz", category: "Süreç", date: "03 Haz", readTime: "4 dk", hue: 40, href: "/blog" },
  { title: "Smooth scroll ve performans dengesi", category: "Teknik", date: "28 May", readTime: "7 dk", hue: -40, href: "/blog" },
  { title: "Stüdyoda bir hafta", category: "Kültür", date: "19 May", readTime: "3 dk", hue: 70, href: "/blog" },
];

const PRODUCTS = [
  { title: "Grid UI Kit", seller: "Marka Studio", format: "Figma", price: "59 USD", hue: 0, href: "/market" },
  { title: "Portfolyo Şablonu", seller: "Nova Labs", format: "Webflow", price: "39 USD", hue: 40, href: "/market" },
  { title: "Ikon Seti — 240", seller: "Form Co.", format: "SVG", price: "29 USD", hue: -40, href: "/market" },
  { title: "Sunum Sistemi", seller: "Pera", format: "Keynote", price: "49 USD", hue: 70, href: "/market" },
];

export default async function Home() {
  const session = await auth();
  const userId = session?.user?.id ?? null;
  const authed = !!session?.user;

  // Real projects + live vote counts + the caller's vote state.
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { votes: true } } },
  });
  const myVotes = userId
    ? new Set((await prisma.projectVote.findMany({ where: { userId }, select: { projectId: true } })).map((v) => v.projectId))
    : new Set<string>();

  const mapped = projects.map((p, i) => ({
    id: p.id,
    title: p.title,
    client: p.client ?? "",
    category: p.category ?? "WEB",
    slug: p.slug,
    hue: (i * 40) % 360,
    votes: p._count.votes,
    voted: myVotes.has(p.id),
  }));

  const works = mapped.slice(0, 3).map((w) => ({
    id: w.id, title: w.title, client: w.client, category: w.category,
    hue: w.hue, href: `/projects/${w.slug}`, votes: w.votes, voted: w.voted, authed,
  }));
  const weekly = [...mapped]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 4)
    .map((w) => ({ id: w.id, title: w.title, client: w.client, cat: w.category, hue: w.hue, votes: w.votes, voted: w.voted, slug: w.slug }));

  // Collection follow state (DB-backed) + per-collection follower counts.
  const myFollowRows = userId ? await prisma.follow.findMany({ where: { userId }, select: { collectionId: true } }) : [];
  const followingSet = new Set(myFollowRows.map((f) => f.collectionId));
  const followGroups = await prisma.follow.groupBy({ by: ["collectionId"], _count: { _all: true } });
  const following: Record<string, boolean> = {};
  const extra: Record<string, number> = {};
  for (const id of ["k1", "k2", "k3", "k4"]) following[id] = followingSet.has(id);
  for (const g of followGroups) extra[g.collectionId] = g._count._all;
  const follows = { following, extra };

  // Earned badges from real user activity.
  const earnedIds: string[] = [];
  if (userId) {
    earnedIds.push("uye");
    if (myVotes.size > 0) earnedIds.push("oy");
    if ((await prisma.gameScore.count({ where: { userId } })) > 0) earnedIds.push("oyuncu");
    if (followingSet.size > 0) earnedIds.push("koleksiyon");
    const champGames: [string, "asc" | "desc"][] = [["memory", "desc"], ["sequence", "desc"], ["reaction", "asc"]];
    for (const [game, dir] of champGames) {
      const top = await prisma.gameScore.findFirst({ where: { game }, orderBy: { best: dir }, select: { userId: true } });
      if (top && top.userId === userId) {
        earnedIds.push("sampiyon");
        break;
      }
    }
  }

  const gameStats = authed ? await getMyGameStats() : {};
  const [layout, pageText] = await Promise.all([getHomeLayout(), getPageText()]);
  const role = session?.user?.role;
  const canEdit = role === "ADMIN" || role === "EDITOR";

  // Built-in sections keyed by id; the admin Sayfalar layout drives order + visibility.
  const sectionMap: Record<string, ReactNode> = {
    hero: <Hero lines={["Atlas Finans", "yeniden", "markalaşma"]} client="Atlas Bank" service="Marka · Web · Ürün" score="9.2" href="/projects" />,
    works: <LatestWorks works={works} overrides={pageText} />,
    weekly: <WeeklyWork items={weekly} authed={authed} overrides={pageText} />,
    partners: <Partners names={PARTNERS} />,
    services: <Services />,
    academy: <Academy courses={COURSES} overrides={pageText} />,
    collections: <Collections earnedIds={earnedIds} authed={authed} follows={follows} overrides={pageText} />,
    games: <GamesSection authed={authed} stats={gameStats} />,
    blog: <Blog featured={BLOG_FEATURED} rest={BLOG_REST} overrides={pageText} />,
    market: <Market products={PRODUCTS} overrides={pageText} />,
    stats: <Stats />,
    cta: <CTABlocks />,
  };

  const customById = Object.fromEntries(layout.custom.map((c) => [c.id, c]));

  return (
    <main>
      {layout.order
        .filter((id) => !layout.hidden[id])
        .map((id) => {
          if (sectionMap[id]) return <Fragment key={id}>{sectionMap[id]}</Fragment>;
          const c = customById[id];
          return c ? <CustomSectionView key={id} section={c} /> : null;
        })}
      <InlineEditor canEdit={canEdit} />
    </main>
  );
}
