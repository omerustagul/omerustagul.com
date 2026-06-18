import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { DAILY_LIMIT } from "@/lib/games-config";
import { PageHero, Section } from "@/components/site/Section";
import { ReactionGame } from "@/components/games/ReactionGame";
import { Avatar } from "@/components/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Zihin Oyunları — Marka" };

export default async function GamesPage() {
  const session = await auth();

  // reaction leaderboard: best (lowest ms) per user
  const grouped = await prisma.gameScore.groupBy({
    by: ["userId"],
    where: { game: "reaction" },
    _min: { best: true },
  });
  const users = await prisma.user.findMany({
    where: { id: { in: grouped.map((g) => g.userId) } },
    select: { id: true, name: true, avatar: true },
  });
  const nameOf = new Map(users.map((u) => [u.id, u]));
  const board = grouped
    .map((g) => ({ user: nameOf.get(g.userId), best: g._min.best ?? 0 }))
    .filter((r) => r.user)
    .sort((a, b) => a.best - b.best)
    .slice(0, 10);

  // remaining plays today
  let remaining = DAILY_LIMIT;
  if (session?.user?.id) {
    const since = new Date();
    since.setHours(0, 0, 0, 0);
    const used = await prisma.gameScore.count({
      where: { userId: session.user.id, game: "reaction", playedAt: { gte: since } },
    });
    remaining = Math.max(0, DAILY_LIMIT - used);
  }

  return (
    <main>
      <PageHero eyebrow="ZİHİN OYUNLARI" title="Refleks" lead="Yeşili gördüğün an tıkla — en hızlı refleks liderlik tablosunda." />
      <Section>
        <div style={{ display: "grid", gap: "3rem", gridTemplateColumns: "minmax(0,1fr) 20rem" }}>
          <ReactionGame authed={!!session?.user} remaining={remaining} />

          <aside>
            <p className="u-label" style={{ marginBottom: "1rem" }}>
              LİDERLİK TABLOSU
            </p>
            {board.length === 0 ? (
              <p style={{ color: "var(--text-muted)" }}>Henüz skor yok — ilk sen ol!</p>
            ) : (
              <ol style={{ listStyle: "none", display: "grid", gap: ".75rem" }}>
                {board.map((r, i) => (
                  <li key={r.user!.id} style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
                    <span className="u-label" style={{ width: "1.5rem" }}>
                      {i + 1}
                    </span>
                    <Avatar name={r.user!.name} src={r.user!.avatar ?? undefined} size="sm" />
                    <span style={{ flex: 1, fontSize: "var(--fs-sm)" }}>{r.user!.name}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)" }}>{r.best} ms</span>
                  </li>
                ))}
              </ol>
            )}
          </aside>
        </div>
      </Section>
    </main>
  );
}
