import { Media } from "../Media";
import { Badge } from "../Badge";

type Props = {
  title: string;
  client?: string;
  tag?: string;
  category?: string;
  image?: string;
  href?: string;
  ratio?: string;
  hoverLabel?: string;
  className?: string;
};

/** Portfolio project card — cover (hover-zoom) + tag + title + client. */
export function ProjectCard({
  title,
  client,
  tag = "PROJE",
  category,
  image,
  href = "#",
  ratio = "4/3",
  hoverLabel = "Projeyi Gör →",
  className = "",
}: Props) {
  return (
    <a className={["mk-card", className].filter(Boolean).join(" ")} href={href}>
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
