import { prisma } from "@/lib/prisma";
import { formatTRY } from "@/lib/format";
import { PageHero, Section, CardGrid } from "@/components/site/Section";
import { CourseCard } from "@/components/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Akademi — Marka" };

export default async function AcademyPage() {
  const courses = await prisma.course.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <main>
      <PageHero eyebrow="AKADEMİ" title="Kurslar" lead="Editöryel tasarım, hareket ve marka stratejisinde derinleş." />
      <Section>
        <CardGrid>
          {courses.map((c) => (
            <CourseCard key={c.id} title={c.title} price={formatTRY(c.price)} href={`/academy/${c.slug}`} />
          ))}
        </CardGrid>
      </Section>
    </main>
  );
}
