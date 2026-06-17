import * as React from "react";

export interface LogoProps extends React.HTMLAttributes<HTMLElement> {
  /** Override the wordmark text. Defaults to BRAND_NAME from brand/brand.js. */
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  /** Show the accent-green trailing dot. */
  showDot?: boolean;
}

/** The Marka wordmark — single source of truth for the brand name. */
export function Logo(props: LogoProps): JSX.Element;
