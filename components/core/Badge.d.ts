import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "solid" | "outline" | "muted" | "invert";
  /** Leading status dot. */
  dot?: boolean;
  children?: React.ReactNode;
}

/** Mono-cased eyebrow/label badge ("PROJE", "DİJİTAL ÜRÜN", status). */
export function Badge(props: BadgeProps): JSX.Element;
