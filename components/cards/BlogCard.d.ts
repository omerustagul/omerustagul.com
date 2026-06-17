import * as React from "react";

export interface BlogCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string;
  excerpt?: string;
  category?: string;
  /** e.g. "5 dk okuma". */
  readTime?: string;
  /** e.g. "12 Haz 2026". */
  date?: string;
  image?: string;
  href?: string;
  /** Larger layout for the lead post in the 1+3 blog grid. */
  featured?: boolean;
  ratio?: string;
}

/** Blog/news card with category + date + reading-time meta. */
export function BlogCard(props: BlogCardProps): JSX.Element;
