import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatUSD } from "@/lib/format";
import { auth } from "@/auth";
import { Badge, Media, Rating } from "@/components/ui";
import { BuyButton } from "@/components/market/BuyButton";

export const dynamic = "force-dynamic";

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { reviews: { include: { user: { select: { name: true } } }, orderBy: { createdAt: "desc" } } },
  });
  if (!product) notFound();

  const session = await auth();
  let owned = false;
  if (session?.user?.id) {
    const purchase = await prisma.purchase.findFirst({
      where: { userId: session.user.id, kind: "product", refId: product.id },
    });
    owned = !!purchase;
  }

  const avg =
    product.reviews.length > 0
      ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
      : 0;

  return (
    <main className="u-container" style={{ paddingBlock: "clamp(2rem, 6vw, 5rem)" }}>
      <Link href="/market" className="u-label" style={{ display: "inline-block", marginBottom: "2rem" }}>
        ← Market
      </Link>

      <div style={{ display: "grid", gap: "3rem", gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))" }}>
        <Media ratio="4/3" label="ÜRÜN GÖRSELİ" alt={product.title} />

        <div>
          <Badge variant="invert">Dijital Ürün</Badge>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em", marginTop: "1rem" }}>
            {product.title}
          </h1>
          {avg > 0 && (
            <div style={{ marginTop: "1rem" }}>
              <Rating value={avg} count={product.reviews.length} />
            </div>
          )}
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.75rem", fontWeight: 600, marginTop: "1.5rem" }}>
            {formatUSD(product.price)}
          </p>
          <div style={{ marginTop: "1.5rem" }}>
            <BuyButton productId={product.id} slug={product.slug} owned={owned} authed={!!session?.user} />
          </div>
        </div>
      </div>

      {/* reviews */}
      <section style={{ marginTop: "4rem" }}>
        <p className="u-label" style={{ marginBottom: "1.5rem" }}>
          YORUMLAR ({product.reviews.length})
        </p>
        {product.reviews.length === 0 && <p style={{ color: "var(--text-muted)" }}>Henüz yorum yok.</p>}
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {product.reviews.map((r) => (
            <div key={r.id} style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                <strong>{r.user.name}</strong>
                <Rating value={r.rating} showScore={false} />
              </div>
              <p style={{ marginTop: ".5rem", color: "var(--text-muted)" }}>{r.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
