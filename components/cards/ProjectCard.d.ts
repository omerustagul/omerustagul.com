import * as React from "react";

export interface ProjectCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string;
  /** Client / team / brand line under the title. */
  client?: string;
  /** Small top tag, defaults to "PROJE". */
  tag?: string;
  category?: string;
  image?: string;
  href?: string;
  ratio?: string;
  hoverLabel?: string;
}

/**
 * Portfolio project card with hover-zoom cover and magnetic cursor label.
 * @startingPoint section="Cards" subtitle="Portfolio project card (hover zoom + cursor label)" viewport="420x420"
 */
export function ProjectCard(props: ProjectCardProps): JSX.Element;
