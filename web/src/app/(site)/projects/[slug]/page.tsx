import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ScrollProgress } from "@/components/marka/ScrollProgress";

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
  const all = await prisma.project.findMany({ orderBy: { order: "asc" } });
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx < 0) notFound();
  const project = all[idx];
  const next = all[(idx + 1) % all.length];
  const year = new Date(project.createdAt).getFullYear();

  return (
    <>
      <ScrollProgress className="progress" />
      <main className="page">
        <div className="wrap">
          <header className="page__head reveal">
            <span className="eyebrow">Proje — {year}</span>
            <h1>{project.title}</h1>
          </header>
          <div className="detail__hero reveal" data-parallax>
            <div className="ph">
              <div className="ph__in" />
              <span className="ph__tag">KAPAK GÖRSELİ</span>
            </div>
          </div>
          <dl className="detail__meta reveal">
            <div>
              <dt>Müşteri</dt>
              <dd>{project.client ?? "—"}</dd>
            </div>
            <div>
              <dt>Yıl</dt>
              <dd>{year}</dd>
            </div>
            <div>
              <dt>Hizmetler</dt>
              <dd>Markalaşma · Web Sitesi Geliştirme · UI/UX Tasarım</dd>
            </div>
            <div>
              <dt>Süre</dt>
              <dd>14 hafta</dd>
            </div>
            <div>
              <dt>Rol</dt>
              <dd>Strateji & Tasarım</dd>
            </div>
          </dl>
        </div>

        <div className="wrap detail__cols">
          <section className="caseblock reveal">
            <span className="eyebrow">Problem</span>
            <p>
              {project.client ?? "Marka"}, dijitalde güven veren ama hantal bir deneyimle anılıyordu. Yeni nesil
              kullanıcılar için marka fazla kurumsal, akışlar fazla karmaşıktı; dönüşüm sektör ortalamasının altındaydı.
            </p>
          </section>
          <section className="caseblock reveal">
            <span className="eyebrow">Çözüm & Yaklaşım</span>
            <p>
              Markayı sıfırdan kurguladık: sade bir kelime-logo, net bir tipografik hiyerarşi ve tek bir güçlü vurgu
              rengi. Kritik akışları sadeleştirdik, her ekranı tek bir işe odakladık.
            </p>
            <p>Editoryal bir grid ve bol negatif alanla güveni görünür kıldık.</p>
          </section>
        </div>

        <div className="wrap">
          <div className="impact reveal">
            <span className="eyebrow">Etki & Sonuçlar</span>
            <div className="impact__grid">
              <div className="impact__row">
                <span className="impact__lbl">Dönüşüm oranı</span>
                <span className="impact__val">
                  <span className="b">%1,9</span>
                  <span className="ar">→</span>
                  <span className="a">%4,3</span>
                </span>
              </div>
              <div className="impact__row">
                <span className="impact__lbl">Onboarding süresi</span>
                <span className="impact__val">
                  <span className="b">6,2 dk</span>
                  <span className="ar">→</span>
                  <span className="a">2,1 dk</span>
                </span>
              </div>
              <div className="impact__row">
                <span className="impact__lbl">Memnuniyet puanı</span>
                <span className="impact__val">
                  <span className="b">3,4</span>
                  <span className="ar">→</span>
                  <span className="a">4,8</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="wrap">
          <div className="detail__hero reveal">
            <div className="ph" style={{ aspectRatio: "16/9" }}>
              <div className="ph__in" />
              <span className="ph__tag">TAM GENİŞLİK GÖRSEL</span>
            </div>
          </div>
        </div>

        <div className="wrap">
          <blockquote className="casequote reveal">
            <p>&ldquo;Marka, dijital kimliğimizi tamamen yeniden tanımladı. Sonuçlar ilk aydan itibaren konuştu.&rdquo;</p>
            <footer>
              <span className="ph ph--av">
                <span className="ph__in" />
              </span>{" "}
              {project.client ?? "Müşteri"} · Dijital Direktörü
            </footer>
          </blockquote>
        </div>

        <div className="wrap nextproj reveal">
          <span className="eyebrow">Sonraki Proje</span>
          <Link href={`/projects/${next.slug}`} data-cursor="Sonraki →" style={{ marginTop: "var(--space-5)" }}>
            <h3>{next.title}</h3>
            <span className="iconbtn" style={{ width: 64, height: 64 }}>
              →
            </span>
          </Link>
        </div>
      </main>
    </>
  );
}
