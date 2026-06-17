import * as React from "react";

export interface MediaProps extends React.HTMLAttributes<HTMLElement> {
  src?: string;
  alt?: string;
  /** Aspect ratio, e.g. "4/3", "16/9", "1/1". */
  ratio?: string;
  /** Placeholder caption shown when no src (e.g. "GÖRSEL"). */
  label?: string;
  rounded?: boolean;
  children?: React.ReactNode;
}

/** Media frame with hover-zoom inner + neutral placeholder fallback. */
export function Media(props: MediaProps): JSX.Element;
