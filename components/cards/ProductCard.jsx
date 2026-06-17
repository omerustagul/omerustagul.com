import React from "react";
import { Media } from "../media/Media.jsx";
import { Badge } from "../core/Badge.jsx";
import { ensureCardBase } from "./cardBase.js";

/** Market product card — cover + "Dijital Ürün" tag + title + seller + price. */
export function ProductCard({
  title, seller, price, priceNote = "'den", tag = "Dijital Ürün", format,
  image, href = "#", ratio = "4/3", className = "", ...rest
}) {
  ensureCardBase();
  return (
    <a className={["mk-card", className].filter(Boolean).join(" ")} href={href} {...rest}>
      <div className="mk-card__media">
        <Media src={image} ratio={ratio} label="ÜRÜN GÖRSELİ" alt={title}>
          <div className="mk-media__overlay" />
        </Media>
        <span style={{ position: "absolute", top: "1rem", left: "1rem", zIndex: 2 }}>
          <Badge variant="invert">{tag}</Badge>
        </span>
      </div>
      <div className="mk-card__body">
        <div className="mk-card__toprow">
          <h3 className="mk-card__title" style={{ fontSize: "var(--fs-h4)" }}>{title}</h3>
        </div>
        {seller && <span className="mk-card__meta">{seller}</span>}
        <div className="mk-card__toprow" style={{ marginTop: ".35rem" }}>
          {format && <span className="mk-card__meta mk-card__meta--mono">{format}</span>}
          {price != null && <span className="mk-card__price">{price}<small>{priceNote}</small></span>}
        </div>
      </div>
    </a>
  );
}
