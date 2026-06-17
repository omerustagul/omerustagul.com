import * as React from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  /** Used for the title + initials fallback. */
  name?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

export interface AvatarStackProps {
  people: { src?: string; name?: string }[];
  max?: number;
  size?: "xs" | "sm" | "md" | "lg";
}

/** Round avatar with image or initials fallback. */
export function Avatar(props: AvatarProps): JSX.Element;
/** Overlapping avatar stack with +N overflow chip. */
export function AvatarStack(props: AvatarStackProps): JSX.Element;
