import * as React from "react";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLElement> {
  /** Mono uppercase eyebrow with an accent tick, e.g. "SON PROJELER". */
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: string;
  /** Right-aligned link, e.g. "Tümünü Gör". */
  linkText?: string;
  linkHref?: string;
}

/** Standard section header (eyebrow + title + "see all" link). */
export function SectionHeading(props: SectionHeadingProps): JSX.Element;
