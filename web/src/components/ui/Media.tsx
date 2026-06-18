import type { CSSProperties, ReactNode } from "react";

type Props = {
  src?: string;
  alt?: string;
  ratio?: string; // e.g. "4/3", "16/9"
  label?: string;
  rounded?: boolean;
  children?: ReactNode;
  className?: string;
};

/**
 * Media frame with hover-zoom inner + neutral placeholder fallback (no fake
 * imagery). Pass `ratio` like "16/9". Without `src`, renders a placeholder
 * with an optional mono `label`.
 */
export function Media({ src, alt = "", ratio = "4/3", label, rounded = true, children, className = "" }: Props) {
  const cls = ["mk-media", !src ? "mk-media--empty" : "", className].filter(Boolean).join(" ");
  const style: CSSProperties = {
    aspectRatio: ratio.replace("/", " / "),
    borderRadius: rounded ? undefined : 0,
  };
  return (
    <figure className={cls} style={style}>
      <div
        className="mk-media__inner"
        style={src ? { backgroundImage: `url(${src})` } : undefined}
        role="img"
        aria-label={alt}
      />
      {!src && label && <span className="mk-media__ph">{label}</span>}
      {children}
    </figure>
  );
}
