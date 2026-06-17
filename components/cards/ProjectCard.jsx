import React from "react";
import { Media } from "../media/Media.jsx";
import { Badge } from "../core/Badge.jsx";
import { ensureCardBase } from "./cardBase.js";

/**
 * Portfolio project card — cover (hover-zoom) + "PROJE" tag + title +
 * client/team + a hover "Projeyi Gör" cursor label.
 */
export function ProjectCard({
  title, client, tag = "PROJE", category, image, href = "#",
  ratio = "4/3", hoverLabel = "Projeyi Gör →", className = "", ...rest
}) {
  ensureCardBase();
  return (
    <a className={["mk-card", className].filter(Boolean).join(" ")} href={href} {...rest}>
      <div className="mk-card__media">
        <Media src={image} ratio={ratio} label="PROJE GÖRSELİ" alt={title} />
        <span className="mk-card__cursorlabel">{hoverLabel}</span>
      </div>
      <div className="mk-card__body">
        <div className="mk-card__toprow">
          <Badge variant="outline">{tag}</Badge>
          {category && <span className="mk-card__meta mk-card__meta--mono">{category}</span>}
        </div>
        <h3 className="mk-card__title">{title}</h3>
        {client && <span className="mk-card__meta">{client}</span>}
      </div>
    </a>
  );
}
