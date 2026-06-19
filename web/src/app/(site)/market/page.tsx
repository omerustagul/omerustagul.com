import { prisma } from "@/lib/prisma";
import { formatUSD } from "@/lib/format";
import { PageHead } from "@/components/marka/page-parts";
import { MarketGrid } from "@/components/marka/grids";

export const dynamic = "force-dynamic";
export const metadata = { title: "Market" };

const FORMATS = ["Figma", "React", "SVG", "Keynote"];
const TYPES = ["UI Kit", "Şablon", "İkon Seti", "Sunum"];

export default async function MarketPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  const items = products.map((p, i) => ({
    title: p.title,
    seller: p.seller ?? "Marka Studio",
    format: p.format ?? FORMATS[i % FORMATS.length],
    type: p.type ?? TYPES[i % TYPES.length],
    price: formatUSD(p.price),
    slug: p.slug,
    hue: i * 32,
  }));
  return (
    <main className="page wrap">
      <PageHead eyebrow="Şablonlar & Dijital Ürünler" title="Market" sub="Stüdyonun ve topluluğun ürettiği şablonlar, UI kit'ler, ikon setleri ve daha fazlası." />
      <MarketGrid items={items} />
    </main>
  );
}
