import { Fragment } from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { resolveProfile } from "@/lib/profile";

/* Ben Kimim — founder CV. Faithful port of pages/profile.html, rendered from the
   Profile model (Json) merged over the defaults. The admin Profil/CV module
   writes that row (persistence wired in D7). */
export const dynamic = "force-dynamic";
export const metadata = { title: "Ben Kimim" };

function Bio({ text }: { text: string }) {
  const paras = text.split(/\n{2,}/);
  return (
    <div className="cv-bio">
      {paras.map((para, i) => (
        <p key={i}>
          {para.split("\n").map((line, j, arr) => (
            <Fragment key={j}>
              {line}
              {j < arr.length - 1 && <br />}
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  );
}

function initials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0] ?? "").join("").toUpperCase();
}

export default async function BenKimimPage() {
  const row = await prisma.profile.findFirst();
  const p = resolveProfile(row?.data);

  return (
    <main>
      <section className="cv-hero">
        <div className="cv-hero__cover" data-parallax>
          {p.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.cover} alt="" />
          ) : (
            <div className="cv-hero__grad" />
          )}
        </div>
        <div className="wrap cv-hero__inner">
          <div className="cv-ava reveal">
            {p.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.avatar} alt={p.name} />
            ) : (
              <span className="cv-ava__initials">{initials(p.name)}</span>
            )}
          </div>
          <div className="cv-hero__body">
            <span className="eyebrow reveal">Ben Kimim</span>
            <h1 className="cv-name reveal">{p.name}</h1>
            <p className="cv-role reveal">{p.role}</p>
            <p className="cv-tagline reveal">{p.tagline}</p>
            <div className="cv-meta reveal">
              {p.location && <span className="cv-chip">{p.location}</span>}
              {p.available && (
                <span className="cv-chip cv-chip--avail">
                  <i /> Yeni projelere açık
                </span>
              )}
            </div>
            <div className="cv-hero__cta reveal">
              <Link className="btn btn--primary" href="/iletisim" data-magnetic="" data-cursor="İletişim">
                İletişime geç <span className="arr">→</span>
              </Link>
              {p.contactEmail && (
                <a className="btn btn--ghost" href={`mailto:${p.contactEmail}`}>
                  {p.contactEmail}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section wrap cv-grid">
        <div className="cv-about reveal">
          <span className="eyebrow">Hakkımda</span>
          <Bio text={p.bio} />
          {p.skills.length > 0 && (
            <div className="cv-skills">
              {p.skills.map((s) => (
                <span className="cv-skill" key={s}>
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
        <aside className="cv-stats reveal">
          {p.stats.map((s, i) => (
            <div className="cv-stat" key={i}>
              <div className="cv-stat__num" data-count={s.num}>
                {s.num}
                <span className="u">{s.suffix ?? ""}</span>
              </div>
              <div className="cv-stat__label">{s.label}</div>
            </div>
          ))}
        </aside>
      </section>

      {p.experience.length > 0 && (
        <section className="section wrap">
          <header className="cv-head reveal">
            <span className="eyebrow">Kariyer</span>
            <h2>Deneyim</h2>
          </header>
          <div className="cv-timeline">
            {p.experience.map((e) => (
              <div className="cv-tl reveal" key={e.id}>
                <div className={`cv-tl__dot ${e.current ? "is-current" : ""}`} />
                <div className="cv-tl__period">{e.period}</div>
                <div className="cv-tl__body">
                  <h3>
                    {e.role} {e.current && <span className="cv-badge">Güncel</span>}
                  </h3>
                  <div className="cv-tl__co">{e.company}</div>
                  {e.desc && <p>{e.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {p.ventures.length > 0 && (
        <section className="section wrap">
          <header className="cv-head reveal">
            <span className="eyebrow">Girişimler</span>
            <h2>Kurduğum işler</h2>
          </header>
          <div className="grid-3 cv-ventures">
            {p.ventures.map((v) =>
              v.url ? (
                <a className="cv-venture reveal" key={v.id} href={v.url} target="_blank" rel="noopener" data-cursor="Aç →">
                  <div className="cv-venture__top">
                    <h4>{v.name}</h4>
                    <span>{v.period}</span>
                  </div>
                  <div className="cv-venture__role">{v.role}</div>
                  {v.desc && <p>{v.desc}</p>}
                </a>
              ) : (
                <div className="cv-venture reveal" key={v.id}>
                  <div className="cv-venture__top">
                    <h4>{v.name}</h4>
                    <span>{v.period}</span>
                  </div>
                  <div className="cv-venture__role">{v.role}</div>
                  {v.desc && <p>{v.desc}</p>}
                </div>
              ),
            )}
          </div>
        </section>
      )}

      {p.awards.length > 0 && (
        <section className="section wrap">
          <header className="cv-head reveal">
            <span className="eyebrow">Tanınırlık</span>
            <h2>Ödüller & başarılar</h2>
          </header>
          <ul className="cv-awards">
            {p.awards.map((a) => (
              <li className="cv-award reveal" key={a.id}>
                <span className="cv-award__yr">{a.year}</span>
                <span className="cv-award__title">{a.title}</span>
                <span className="cv-award__org">{a.org}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {p.featured.length > 0 && (
        <section className="section wrap">
          <header className="cv-head reveal">
            <span className="eyebrow">Seçili işler</span>
            <h2>Öne çıkan projeler</h2>
          </header>
          <div className="cv-featured">
            {p.featured.map((f) => (
              <Link className="cv-feat reveal" key={f.id} href={f.href || "/projects"} data-cursor="Gör →">
                <div className="cv-feat__media ph">
                  <div className="ph__in" />
                </div>
                <div className="cv-feat__meta">
                  <h3>{f.title}</h3>
                  <span>{f.year}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {p.press.length > 0 && (
        <section className="section wrap">
          <header className="cv-head reveal">
            <span className="eyebrow">Basında</span>
            <h2>Yazılar & söyleşiler</h2>
          </header>
          <ul className="cv-press">
            {p.press.map((pr) => (
              <li className="reveal" key={pr.id}>
                {pr.url ? (
                  <a href={pr.url} target="_blank" rel="noopener" data-cursor="">
                    <span className="cv-press__title">{pr.title}</span>
                    <span className="cv-press__meta">
                      {pr.outlet} · {pr.year}
                    </span>
                  </a>
                ) : (
                  <span>
                    <span className="cv-press__title">{pr.title}</span>
                    <span className="cv-press__meta">
                      {pr.outlet} · {pr.year}
                    </span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="section wrap">
        <div className="cv-cta reveal">
          <h2>Birlikte çalışalım.</h2>
          <Link className="btn btn--primary btn--lg" href="/iletisim" data-magnetic="" data-cursor="İletişim">
            Görüşme yap <span className="arr">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
