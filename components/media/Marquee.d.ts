import * as React from "react";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Items are duplicated automatically for a seamless loop. */
  children?: React.ReactNode;
  /** Seconds per full loop. */
  speed?: number;
  gap?: string;
  pauseOnHover?: boolean;
}

/** Seamless infinite marquee — partner logos / ticker. */
export function Marquee(props: MarqueeProps): JSX.Element;
