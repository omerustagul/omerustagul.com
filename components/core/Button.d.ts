import * as React from "react";

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual style. primary = filled green; secondary = ink outline with green fill-wipe; ghost = text only. */
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Render as an anchor instead of a button. */
  href?: string;
  iconLeft?: React.ReactNode;
  /** Typically an arrow glyph — animates rightward on hover. */
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  /** Adds data-magnetic="" so the page-level magnetic-cursor JS can attach. */
  magnetic?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

/**
 * Primary call-to-action button with magnetic-hover + fill-wipe animation.
 * @startingPoint section="Core" subtitle="CTA button with fill-wipe + magnetic hover" viewport="360x120"
 */
export function Button(props: ButtonProps): JSX.Element;
