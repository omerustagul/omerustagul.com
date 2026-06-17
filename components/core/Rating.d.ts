import * as React from "react";

export interface RatingProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 0–max, rendered to one decimal (e.g. 4.9). */
  value?: number;
  max?: number;
  /** Optional review count shown in parentheses. */
  count?: number;
  showScore?: boolean;
}

/** Star rating with mono numeric score — course & product cards. */
export function Rating(props: RatingProps): JSX.Element;
