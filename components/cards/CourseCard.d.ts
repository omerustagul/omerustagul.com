import * as React from "react";

export interface CourseCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string;
  instructor?: string;
  rating?: number;
  reviews?: number;
  /** Pre-formatted price string, e.g. "₺899" or "Ücretsiz". */
  price?: string;
  /** Level chip overlaid on the cover, e.g. "Orta". */
  level?: string;
  image?: string;
  href?: string;
  ratio?: string;
}

/** Academy course card (cover + instructor + rating + price). */
export function CourseCard(props: CourseCardProps): JSX.Element;
