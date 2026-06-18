import { prisma } from "@/lib/prisma";
import { PageHero, Section, CardGrid } from "@/components/site/Section";
import { ProjectCard } from "@/components/ui";

export const dynamic = "force-dynamic";

export const metadata = { title: "Projeler — Marka" };

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return (
    <main>
      <PageHero eyebrow="PORTFOLYO" title="Projeler" lead="Markaları geleceğe taşıyan seçili işlerimiz." />
      <Section>
        <CardGrid>
          {projects.map((p) => (
            <ProjectCard
              key={p.id}
              title={p.title}
              client={p.client ?? undefined}
              category={p.category ?? undefined}
              tag={p.tag}
              image={p.image ?? undefined}
              href={`/projects/${p.slug}`}
            />
          ))}
        </CardGrid>
      </Section>
    </main>
  );
}
