import React from "react";
import { Media } from "../media/Media.jsx";
import { Rating } from "../core/Rating.jsx";
import { ensureCardBase } from "./cardBase.js";

/** Academy course card — cover + title + instructor + ⭐ rating + price. */
export function CourseCard({
  title, instructor, rating = 0, reviews, price, level, image, href = "#",
  ratio = "16/10", className = "", ...rest
}) {
  ensureCardBase();
  return (
    <a className={["mk-card", className].filter(Boolean).join(" ")} href={href} {...rest}>
      <div className="mk-card__media">
        <Media src={image} ratio={ratio} label="KURS" alt={title} />
        {level && <span className="mk-card__cursorlabel" style={{ left: "1rem", right: "auto", background: "var(--text)", color: "var(--text-invert)", opacity: 1, transform: "none" }}>{level}</span>}
      </div>
      <div className="mk-card__body">
        <h3 className="mk-card__title" style={{ fontSize: "var(--fs-h4)" }}>{title}</h3>
        {instructor && <span className="mk-card__meta">{instructor}</span>}
        <div className="mk-card__toprow" style={{ marginTop: ".35rem" }}>
          <Rating value={rating} count={reviews} />
          {price != null && <span className="mk-card__price">{price}</span>}
        </div>
      </div>
    </a>
  );
}
