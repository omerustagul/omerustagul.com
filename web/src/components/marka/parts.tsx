import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { VoteButton } from "@/components/marka/VoteButton";

/* Faithful port of the prototype's website primitives (ui_kits/website/parts.jsx),
   using the prototype's site.css classes (.ph, .btn, .badge, .card, ...). */

export function Ph({
  ratio = "4/3",
  tag,
  className = "",
  hue = 0,
  children,
}: {
  ratio?: string;
  tag?: string;
  className?: string;
  hue?: number;
  children?: ReactNode;
}) {
  return (
    <div className={`ph ${className}`} style={{ aspectRatio: ratio.replace("/", " / ") }} data-parallax>
      <div className="ph__in" style={hue ? { filter: `hue-rotate(${hue}deg)` } : undefined} />
      {tag && <span className="ph__tag">{tag}</span>}
      {children}
    </div>
  );
}

export function Btn({
  children,
  variant = "primary",
  size = "",
  href = "#",
  arrow,
  magnetic,
  dataCursor,
  style,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "" | "lg" | "sm";
  href?: string;
  arrow?: boolean;
  magnetic?: boolean;
  dataCursor?: string;
  style?: CSSProperties;
}) {
  const cls = `btn btn--${variant} ${size ? "btn--" + size : ""}`;
  return (
    <Link href={href} className={cls} data-magnetic={magnetic ? "" : undefined} data-cursor={dataCursor} style={style}>
      {children}
      {arrow && (
        <span className="arr" aria-hidden="true">
          →
        </span>
      )}
    </Link>
  );
}

export function Badge({ children, variant = "outline", style }: { children: ReactNode; variant?: string; style?: CSSProperties }) {
  return (
    <span className={`badge badge--${variant}`} style={style}>
      {children}
    </span>
  );
}

export function Rating({ value = 4.9, count }: { value?: number; count?: number }) {
  return (
    <span className="rating">
      <span className="stars" aria-hidden="true">
        ★★★★★
      </span>
      <b>{value.toFixed(1)}</b>
      {count != null && <span style={{ color: "var(--text-muted)" }}>({count})</span>}
    </span>
  );
}

function VoteBadge({ count }: { count: number }) {
  return (
    <span className="vote" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7.5-4.6-10-9.2C.4 8.5 2 5 5.5 5 7.7 5 9.2 6.3 12 9c2.8-2.7 4.3-4 6.5-4C22 5 23.6 8.5 22 11.8 19.5 16.4 12 21 12 21z" />
      </svg>
      <span className="vote__n">{count}</span>
    </span>
  );
}

export function ProjectCard({
  id,
  title,
  client,
  category = "WEB",
  tag = "PROJE",
  hue,
  href = "#",
  votes = 0,
  voted = false,
  authed = false,
}: {
  id?: string;
  title: string;
  client?: string;
  category?: string;
  tag?: string;
  hue?: number;
  href?: string;
  votes?: number;
  voted?: boolean;
  authed?: boolean;
}) {
  return (
    <Link className="card reveal" href={href} data-cursor="Projeyi Gör">
      <div style={{ position: "relative" }}>
        <Ph ratio="4/3" tag="PROJE GÖRSELİ" hue={hue} />
        <span className="cardlabel">Projeyi Gör →</span>
        {id ? <VoteButton projectId={id} count={votes} voted={voted} authed={authed} /> : <VoteBadge count={votes} />}
      </div>
      <div className="card__top">
        <Badge>{tag}</Badge>
        <span className="card__meta mono">{category}</span>
      </div>
      <h3 className="card__title">{title}</h3>
      {client && <span className="card__meta">{client}</span>}
    </Link>
  );
}

export function CourseCard({
  title,
  instructor,
  rating = 4.9,
  reviews,
  price,
  level,
  hue,
  href = "#",
}: {
  title: string;
  instructor?: string;
  rating?: number;
  reviews?: number;
  price?: string;
  level?: string;
  hue?: number;
  href?: string;
}) {
  return (
    <Link className="card card--course card--sm reveal" href={href} data-cursor="Kursu Aç">
      <div style={{ position: "relative" }}>
        <Ph ratio="16/10" tag="KURS" hue={hue} />
        {level && (
          <span className="badge badge--invert" style={{ position: "absolute", top: 12, left: 12 }}>
            {level}
          </span>
        )}
      </div>
      <h3 className="card__title">{title}</h3>
      {instructor && <span className="card__meta">{instructor}</span>}
      <div className="card__top" style={{ marginTop: ".2rem" }}>
        <Rating value={rating} count={reviews} />
        {price && <span className="card__price">{price}</span>}
      </div>
    </Link>
  );
}

export function BlogCard({
  title,
  excerpt,
  category,
  date,
  readTime,
  featured,
  hue,
  href = "#",
}: {
  title: string;
  excerpt?: string;
  category?: string;
  date?: string;
  readTime?: string;
  featured?: boolean;
  hue?: number;
  href?: string;
}) {
  return (
    <Link className={`card card--blog ${featured ? "" : "card--sm"} reveal`} href={href} data-cursor="Oku">
      <Ph ratio="16/9" tag="YAZI" hue={hue} />
      <div className="card__meta mono">
        {category && <span style={{ color: "var(--accent-hover)" }}>{category}</span>}
        {date && (
          <>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{date}</span>
          </>
        )}
        {readTime && (
          <>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{readTime}</span>
          </>
        )}
      </div>
      <h3 className="card__title" style={featured ? { fontSize: "var(--fs-h2)" } : undefined}>
        {title}
      </h3>
      {excerpt && <p className="card__excerpt">{excerpt}</p>}
    </Link>
  );
}

export function ProductCard({
  title,
  seller,
  price,
  format,
  hue,
  href = "#",
}: {
  title: string;
  seller?: string;
  price?: string;
  format?: string;
  hue?: number;
  href?: string;
}) {
  return (
    <Link className="card card--sm reveal" href={href} data-cursor="Ürünü Gör">
      <div style={{ position: "relative" }}>
        <Ph ratio="4/3" tag="ÜRÜN GÖRSELİ" hue={hue} />
        <span className="badge badge--invert" style={{ position: "absolute", top: 12, left: 12 }}>
          Dijital Ürün
        </span>
      </div>
      <h3 className="card__title">{title}</h3>
      {seller && <span className="card__meta">{seller}</span>}
      <div className="card__top" style={{ marginTop: ".2rem" }}>
        {format && <span className="card__meta mono">{format}</span>}
        {price && (
          <span className="card__price">
            {price}
            <small>&apos;den</small>
          </span>
        )}
      </div>
    </Link>
  );
}
