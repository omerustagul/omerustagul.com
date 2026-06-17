import * as React from "react";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "solid" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Accessible label (aria-label) since the button is icon-only. */
  label?: string;
  children?: React.ReactNode;
}

/** Icon-only round button — nav arrows, social links, theme toggle, close. */
export function IconButton(props: IconButtonProps): JSX.Element;
