import { Media } from "../Media";

type Props = {
  title: string;
  excerpt?: string;
  category?: string;
  readTime?: string;
  date?: string;
  image?: string;
  href?: string;
  featured?: boolean;
  ratio?: string;
  className?: string;
};

/** Blog card — cover + title + excerpt + reading time / date meta. */
export function BlogCard({
  title,
  excerpt,
  category,
  readTime,
  date,
  image,
  href = "#",
  featured = false,
  ratio = "16/9",
  className = "",
}: Props) {
  return (
    <a
      className={["mk-card", featured ? "mk-card--featured" : "", className].filter(Boolean).join(" ")}
      href={href}
    >
      <div className="mk-card__media">
        <Media src={image} ratio={featured ? "16/9" : ratio} label="YAZI" alt={title} />
      </div>
      <div className="mk-card__body">
        <div className="mk-card__meta mk-card__meta--mono">
          {category && <span style={{ color: "var(--accent-hover)" }}>{category}</span>}
          {category && (date || readTime) && <span className="mk-card__dot" />}
          {date && <span>{date}</span>}
          {date && readTime && <span className="mk-card__dot" />}
          {readTime && <span>{readTime}</span>}
        </div>
        <h3
          className="mk-card__title"
          style={featured ? { fontSize: "var(--fs-h2)" } : { fontSize: "var(--fs-h4)" }}
        >
          {title}
        </h3>
        {excerpt && <p className="mk-card__excerpt">{excerpt}</p>}
      </div>
    </a>
  );
}
