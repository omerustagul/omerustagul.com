import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatUSD } from "@/lib/format";
import { auth } from "@/auth";
import { BuyButton } from "@/components/market/BuyButton";
import { ReviewForm } from "@/components/marka/ReviewForm";

export const dynamic = "force-dynamic";

function stars(n: number) {
  const r = Math.round(n);
  return "★★★★★".slice(0, r) + "☆☆☆☆☆".slice(0, 5 - r);
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

  const session = await auth();
  let owned = false;
  if (session?.user?.id) {
    const purchase = await prisma.purchase.findFirst({ where: { userId: session.user.id, kind: "product", refId: product.id } });
    owned = !!purchase;
  }

  const avg = product.reviews.length ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length : 0;
  const includes = ["Kaynak dosyalar", "Dokümantasyon", "Ömür boyu güncelleme", "Ticari lisans"];
  const specs: [string, string][] = [
    ["Format", "Figma + React"],
    ["Sürüm", "1.0"],
    ["Lisans", "Ticari"],
  ];

  return (
    <main className="page wrap">
      <Link className="course-back" href="/market" data-cursor="">
        ← Market
      </Link>
      <div className="prod">
        <div className="prod__media reveal">
          <div className="prod__main">
            <div className="ph" style={{ aspectRatio: "4/3" }}>
              <div className="ph__in" />
              <span className="ph__tag">ÖNİZLEME 1</span>
            </div>
          </div>
          <div className="prod__thumbs">
            {[0, 1, 2].map((i) => (
              <button key={i} className={`prod__thumb ${i === 0 ? "on" : ""}`} type="button">
                <div className="ph">
                  <div className="ph__in" style={{ filter: `hue-rotate(${i * 30}deg)` }} />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="prod__info reveal">
          <span className="eyebrow">Dijital Ürün · Figma</span>
          <h1>{product.title}</h1>
          <p className="prod__tagline">Hazır, premium ve eksiksiz — projeni hızlandır.</p>
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
            <div className="prod__price">{formatUSD(product.price)}</div>
            <BuyButton productId={product.id} slug={product.slug} owned={owned} authed={!!session?.user} />
            <span className="prod__seller">
              Satıcı: <b>Marka Studio</b> · Ticari lisans
            </span>
          </div>
          <div className="prod__block">
            <span className="eyebrow">Pakette</span>
            <ul className="pv-checklist">
              {includes.map((i) => (
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
