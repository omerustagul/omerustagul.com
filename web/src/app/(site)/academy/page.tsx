import { prisma } from "@/lib/prisma";
import { formatTRY } from "@/lib/format";
import { PageHead } from "@/components/marka/page-parts";
import { AcademyGrid } from "@/components/marka/grids";

export const dynamic = "force-dynamic";
export const metadata = { title: "Akademi" };

const LEVELS = ["Başlangıç", "Orta", "İleri", "Orta"];
const TOPICS = ["Tasarım", "Geliştirme", "Motion", "Strateji"];

export default async function AcademyPage() {
  const courses = await prisma.course.findMany({ orderBy: { createdAt: "desc" } });
  const items = courses.map((c, i) => ({
    title: c.title,
    instructor: c.instructor ?? "Marka Akademi",
    rating: 4.7 + ((i % 3) * 0.1),
    students: 96 + i * 26,
    price: formatTRY(c.price),
    level: c.level ?? LEVELS[i % LEVELS.length],
    topic: c.topic ?? TOPICS[i % TOPICS.length],
    slug: c.slug,
    hue: i * 22,
  }));
  return (
    <main className="page wrap">
      <PageHead eyebrow="Akademi" title="En iyilerden öğren" sub="Sektörün önde gelen tasarımcı ve geliştiricilerinden, projeye dönüşen kurslar." />
      <AcademyGrid items={items} />
    </main>
  );
}
