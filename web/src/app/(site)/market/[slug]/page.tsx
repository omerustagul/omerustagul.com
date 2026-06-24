import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatUSD } from "@/lib/format";
import { auth } from "@/auth";
import { BuyButton } from "@/components/market/BuyButton";
import { ProductGallery } from "@/components/market/ProductGallery";
import { ReviewForm } from "@/components/marka/ReviewForm";

export const dynamic = "force-dynamic";

type ProductData = {
  tagline?: string;
  currency?: string;
  priceLabel?: string;
  license?: string;
  desc?: string;
  includes?: { id: string; text: string }[];
  specs?: { id: string; k: string; v: string }[];
  gallery?: { id: string; src: string; caption?: string }[];
  cover?: string;
};

function stars(n: number) {
  const r = Math.round(n);
  return "★★★★★".slice(0, r) + "☆☆☆☆☆".slice(0, 5 - r);
}

function renderRich(text: string) {
  return text
    .split(/\n{2,}/)
    .map((para, i) => {
      const t = para.trim();
      if (!t) return null;
      if (/^#{1,2}\s+/.test(t)) return <h3 key={i}>{t.replace(/^#{1,2}\s+/, "")}</h3>;
      return <p key={i}>{t}</p>;
    })
    .filter(Boolean);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return {};
  return { title: product.title, openGraph: { title: product.title } };
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { reviews: { include: { user: { select: { name: true } } }, orderBy: { createdAt: "desc" } } },
  });
  if (!product) notFound();

  const d = (product.data ?? {}) as ProductData;

  const session = await auth();
  let owned = false;
  if (session?.user?.id) {
    const purchase = await prisma.purchase.findFirst({ where: { userId: session.user.id, kind: "product", refId: product.id } });
    owned = !!purchase;
  }

  const avg = product.reviews.length ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length : 0;
  const seller = product.seller ?? "Marka Studio";
  const format = product.format ?? "Figma";
  const type = product.type ?? "Dijital Ürün";
  const tagline = d.tagline || "Hazır, premium ve eksiksiz — projeni hızlandır.";
  const priceLabel = d.priceLabel || formatUSD(product.price);
  const includes = (d.includes || []).filter((i) => i.text).map((i) => i.text);
  const fallbackIncludes = ["Kaynak dosyalar", "Dokümantasyon", "Ömür boyu güncelleme", "Ticari lisans"];
  const includeList = includes.length ? includes : fallbackIncludes;
  const customSpecs = (d.specs || []).filter((s) => s.k);
  const specs: [string, string][] = customSpecs.length
    ? customSpecs.map((s) => [s.k, s.v] as [string, string])
    : [
        ["Format", format],
        ["Sürüm", "1.0"],
        ["Lisans", d.license || "Ticari"],
      ];

  return (
    <main className="page wrap">
      <Link className="course-back" href="/market" data-cursor="">
        ← Market
      </Link>
      <div className="prod">
        <ProductGallery count={4} />

        <div className="prod__info reveal">
          <span className="eyebrow">{type}{format ? ` · ${format}` : ""}</span>
          <h1>{product.title}</h1>
          <p className="prod__tagline">{tagline}</p>
          <div className="prod__rating">
            {avg > 0 ? (
              <>
                <span className="stars">{stars(avg)}</span> <b>{avg.toFixed(1)}</b>{" "}
                <span className="card__meta">({product.reviews.length} yorum)</span>
              </>
            ) : (
              <span className="card__meta">Henüz yorum yok</span>
            )}
          </div>
          <div className="prod__buybox">
            <div className="prod__price">{priceLabel}</div>
            <BuyButton productId={product.id} slug={product.slug} owned={owned} authed={!!session?.user} />
            <span className="prod__seller">
              Satıcı: <b>{seller}</b> · {d.license || "Ticari"} lisans
            </span>
          </div>
          <div className="prod__block">
            <span className="eyebrow">Pakette</span>
            <ul className="pv-checklist">
              {includeList.map((i) => (
                <li key={i}>
                  <span className="ck">✓</span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <dl className="prod__specs">
            {specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {d.desc && (
        <section className="prod__desc reveal" style={{ maxWidth: "62ch", display: "flex", flexDirection: "column", gap: ".9rem" }}>
          {renderRich(d.desc)}
        </section>
      )}

      <section className="prod__reviews reveal">
        <h2>
          Yorumlar {avg > 0 ? `· ${stars(avg)} ${avg.toFixed(1)}` : ""}
        </h2>
        {session?.user ? (
          <ReviewForm productId={product.id} slug={product.slug} />
        ) : (
          <p className="card__meta">
            Yorum yapmak için <Link href={`/login?callbackUrl=/market/${product.slug}`}>giriş yap</Link>.
          </p>
        )}
        <div className="review-list">
          {product.reviews.length ? (
            product.reviews.map((r) => (
              <div className="review" key={r.id}>
                <div className="review__top">
                  <span className="review__ava">{(r.user.name || "?")[0]}</span>
                  <span className="review__name">{r.user.name}</span>
                  <span className="review__stars">{stars(r.rating)}</span>
                </div>
                <p className="review__text">{r.body}</p>
              </div>
            ))
          ) : (
            <p className="card__meta">İlk yorumu sen yaz.</p>
          )}
        </div>
      </section>
    </main>
  );
}
