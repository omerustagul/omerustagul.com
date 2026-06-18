import { Media } from "../Media";
import { Rating } from "../Rating";

type Props = {
  title: string;
  instructor?: string;
  rating?: number;
  reviews?: number;
  price?: string | number;
  level?: string;
  image?: string;
  href?: string;
  ratio?: string;
  className?: string;
};

/** Academy course card — cover + title + instructor + ⭐ rating + price. */
export function CourseCard({
  title,
  instructor,
  rating = 0,
  reviews,
  price,
  level,
  image,
  href = "#",
  ratio = "16/10",
  className = "",
}: Props) {
  return (
    <a className={["mk-card", className].filter(Boolean).join(" ")} href={href}>
      <div className="mk-card__media">
        <Media src={image} ratio={ratio} label="KURS" alt={title} />
        {level && (
          <span
            className="mk-card__cursorlabel"
            style={{
              left: "1rem",
              right: "auto",
              background: "var(--text)",
              color: "var(--text-invert)",
              opacity: 1,
              transform: "none",
            }}
          >
            {level}
          </span>
        )}
      </div>
      <div className="mk-card__body">
        <h3 className="mk-card__title" style={{ fontSize: "var(--fs-h4)" }}>
          {title}
        </h3>
        {instructor && <span className="mk-card__meta">{instructor}</span>}
        <div className="mk-card__toprow" style={{ marginTop: ".35rem" }}>
          {rating > 0 ? <Rating value={rating} count={reviews} /> : <span />}
          {price != null && <span className="mk-card__price">{price}</span>}
        </div>
      </div>
    </a>
  );
}
