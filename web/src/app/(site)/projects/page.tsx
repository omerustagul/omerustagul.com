import { prisma } from "@/lib/prisma";
import { PageHead } from "@/components/marka/page-parts";
import { ProjectsGrid } from "@/components/marka/grids";

export const dynamic = "force-dynamic";
export const metadata = { title: "İşler" };

const RATIOS = ["21/13", "4/5", "4/3", "4/4", "4/5", "4/3"];

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
  const items = projects.map((p, i) => ({
    title: p.title,
    client: p.client ?? "",
    category: p.category ?? "WEB",
    slug: p.slug,
    hue: i * 35,
    ratio: RATIOS[i % RATIOS.length],
  }));
  return (
    <main className="page wrap">
      <PageHead eyebrow="Portfolyo" title="Ödüllü işlerin arşivi" sub="Marka, ürün ve dijital deneyimler. Kategoriye, teknolojiye ve yıla göre keşfedin." />
      <ProjectsGrid items={items} />
    </main>
  );
}
