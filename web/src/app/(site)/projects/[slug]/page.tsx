import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/site/Section";
import { Badge, Button, Media } from "@/components/ui";
import { VoteButton } from "@/components/projects/VoteButton";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return {};
  const description = project.client ? `${project.client} · ${project.category ?? ""}`.trim() : undefined;
  return { title: project.title, description, openGraph: { title: project.title, description } };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
    include: { _count: { select: { votes: true } } },
  });
  if (!project) notFound();

  const session = await auth();
  let voted = false;
  if (session?.user?.id) {
    const v = await prisma.projectVote.findUnique({
      where: { projectId_userId: { projectId: project.id, userId: session.user.id } },
    });
    voted = !!v;
  }

  return (
    <main className="u-container" style={{ paddingBlock: "clamp(2rem, 6vw, 5rem)" }}>
      <Link href="/projects" className="u-label" style={{ display: "inline-block", marginBottom: "2rem" }}>
        ← Projeler
      </Link>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.5rem" }}>
        <Badge variant="solid">{project.tag}</Badge>
        {project.category && <span className="u-label">{project.category}</span>}
      </div>

      <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", letterSpacing: "-0.04em", lineHeight: 0.97 }}>
        {project.title}
      </h1>
      {project.client && (
        <p style={{ marginTop: "1rem", color: "var(--text-muted)", fontSize: "var(--fs-lead)" }}>
          {project.client}
        </p>
      )}

      <div style={{ marginTop: "2.5rem" }}>
        <Media src={project.image ?? undefined} ratio="16/9" label="PROJE GÖRSELİ" alt={project.title} />
      </div>

      {/* problem / solution placeholder editorial copy */}
      <Section>
        <div style={{ display: "grid", gap: "3rem", gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))" }}>
          <div>
            <p className="u-label" style={{ marginBottom: ".75rem" }}>
              PROBLEM
            </p>
            <p style={{ color: "var(--text-muted)", maxWidth: "44ch" }}>
              Markanın dijital varlığı dağınıktı ve dönüşüm hedeflerinin gerisinde kalıyordu.
            </p>
          </div>
          <div>
            <p className="u-label" style={{ marginBottom: ".75rem" }}>
              ÇÖZÜM
            </p>
            <p style={{ color: "var(--text-muted)", maxWidth: "44ch" }}>
              Editöryel bir tasarım dili, net bilgi mimarisi ve performans odaklı bir yeniden inşa.
            </p>
          </div>
        </div>
      </Section>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
        <VoteButton
          projectId={project.id}
          initialCount={project._count.votes}
          initialVoted={voted}
          authed={!!session?.user}
        />
        <Button href="/iletisim" variant="secondary">
          Benzer Proje Başlat
        </Button>
      </div>
    </main>
  );
}
