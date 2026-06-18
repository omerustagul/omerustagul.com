import { prisma } from "@/lib/prisma";
import { formatUSD } from "@/lib/format";
import { PageHero, Section, CardGrid } from "@/components/site/Section";
import { ProductCard } from "@/components/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Market — Marka" };

export default async function MarketPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <main>
      <PageHero eyebrow="DİJİTAL ÜRÜN" title="Market" lead="Hazır UI kitleri, şablonlar ve dijital ürünler." />
      <Section>
        <CardGrid>
          {products.map((p) => (
            <ProductCard key={p.id} title={p.title} price={formatUSD(p.price)} href={`/market/${p.slug}`} />
          ))}
        </CardGrid>
      </Section>
    </main>
  );
}
