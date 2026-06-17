import * as React from "react";

export interface TagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  /** Optional trailing count, e.g. number of items in that category. */
  count?: number;
  children?: React.ReactNode;
}

/** Filter pill used in portfolio / market / blog filter bars. */
export function Tag(props: TagProps): JSX.Element;
