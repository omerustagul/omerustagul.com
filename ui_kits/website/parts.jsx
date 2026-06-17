/* Shared primitives for the website UI kit (placeholder media, button,
   badge, rating, and the four card types). Exposed on window. */

function Ph({ ratio = "4/3", tag, className = "", style, children, hue = 0 }) {
  return (
    <div className={`ph ${className}`} style={{ aspectRatio: ratio.replace("/", " / "), ...style }}>
      <div className="ph__in" style={hue ? { filter: `hue-rotate(${hue}deg)` } : undefined} />
      {tag && <span className="ph__tag">{tag}</span>}
      {children}
    </div>
  );
}

function Btn({ children, variant = "primary", size = "", href = "#", arrow, magnetic, ...rest }) {
  const cls = `btn btn--${variant} ${size ? "btn--" + size : ""}`;
  return (
    <a href={href} className={cls} data-magnetic={magnetic ? "" : undefined} {...rest}>
      {children}{arrow && <span className="arr" aria-hidden="true">→</span>}
    </a>
  );
}

function Badge({ children, variant = "outline", style }) {
  return <span className={`badge badge--${variant}`} style={style}>{children}</span>;
}

function Rating({ value = 4.9, count }) {
  return (
    <span className="rating">
      <span className="stars" aria-hidden="true">★★★★★</span>
      <b>{value.toFixed(1)}</b>{count != null && <span style={{ color: "var(--text-muted)" }}>({count})</span>}
    </span>
  );
}

function VoteButton({ id, label = "Vote" }) {
  const { useState: uVS, useEffect: uVE } = React;
  const [, force] = uVS(0);
  uVE(() => { if (!window.MarkaVotes) return; return window.MarkaVotes.subscribe(() => force(n => n + 1)); }, []);
  if (!window.MarkaVotes) return null;
  const voted = window.MarkaVotes.hasVoted(id);
  const count = window.MarkaVotes.count(id);
  return (
    <button type="button" className={`vote ${voted ? "is-voted" : ""}`} aria-pressed={voted} aria-label={label}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.MarkaVotes.toggle(id); }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill={voted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7.5-4.6-10-9.2C.4 8.5 2 5 5.5 5 7.7 5 9.2 6.3 12 9c2.8-2.7 4.3-4 6.5-4C22 5 23.6 8.5 22 11.8 19.5 16.4 12 21 12 21z"/></svg>
      <span className="vote__n">{count}</span>
    </button>
  );
}

function ProjectCard({ title, client, category = "WEB", tag = "PROJE", hue }) {
  const id = window.MarkaVotes ? window.MarkaVotes.slug(title) : "";
  return (
    <a className="card reveal" href="#" data-cursor="Projeyi Gör">
      <div style={{ position: "relative" }}>
        <Ph ratio="4/3" tag="PROJE GÖRSELİ" hue={hue} />
        <span className="cardlabel">Projeyi Gör →</span>
        <VoteButton id={id} />
      </div>
      <div className="card__top">
        <Badge>{tag}</Badge>
        <span className="card__meta mono">{category}</span>
      </div>
      <h3 className="card__title">{title}</h3>
      <span className="card__meta">{client}</span>
    </a>
  );
}

function CourseCard({ title, instructor, rating, reviews, price, level, hue }) {
  return (
    <a className="card card--course card--sm reveal" href="#" data-cursor="Kursu Aç">
      <div style={{ position: "relative" }}>
        <Ph ratio="16/10" tag="KURS" hue={hue} />
        {level && <span className="badge badge--invert" style={{ position: "absolute", top: 12, left: 12 }}>{level}</span>}
      </div>
      <h3 className="card__title">{title}</h3>
      <span className="card__meta">{instructor}</span>
      <div className="card__top" style={{ marginTop: ".2rem" }}>
        <Rating value={rating} count={reviews} />
        <span className="card__price">{price}</span>
      </div>
    </a>
  );
}

function BlogCard({ title, excerpt, category, date, readTime, featured, hue }) {
  return (
    <a className={`card card--blog ${featured ? "" : "card--sm"} reveal`} href="#" data-cursor="Oku">
      <Ph ratio="16/9" tag="YAZI" hue={hue} />
      <div className="card__meta mono">
        <span style={{ color: "var(--accent-hover)" }}>{category}</span>
        <span style={{ opacity: .4 }}>·</span><span>{date}</span>
        <span style={{ opacity: .4 }}>·</span><span>{readTime}</span>
      </div>
      <h3 className="card__title" style={featured ? { fontSize: "var(--fs-h2)" } : undefined}>{title}</h3>
      {excerpt && <p className="card__excerpt">{excerpt}</p>}
    </a>
  );
}

function ProductCard({ title, seller, price, format, hue }) {
  return (
    <a className="card card--sm reveal" href="#" data-cursor="Ürünü Gör">
      <div style={{ position: "relative" }}>
        <Ph ratio="4/3" tag="ÜRÜN GÖRSELİ" hue={hue} />
        <span className="badge badge--invert" style={{ position: "absolute", top: 12, left: 12 }}>Dijital Ürün</span>
      </div>
      <h3 className="card__title">{title}</h3>
      <span className="card__meta">{seller}</span>
      <div className="card__top" style={{ marginTop: ".2rem" }}>
        <span className="card__meta mono">{format}</span>
        <span className="card__price">{price}<small>'den</small></span>
      </div>
    </a>
  );
}

Object.assign(window, { Ph, Btn, Badge, Rating, ProjectCard, CourseCard, BlogCard, ProductCard });
