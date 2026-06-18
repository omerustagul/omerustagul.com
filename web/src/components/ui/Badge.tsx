import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "solid" | "outline" | "muted" | "invert";
  dot?: boolean;
  className?: string;
};

/** Small mono-cased label — "PROJE", "DİJİTAL ÜRÜN", scores, status. */
export function Badge({ children, variant = "outline", dot = false, className = "" }: Props) {
  const cls = ["mk-badge", `mk-badge--${variant}`, className].filter(Boolean).join(" ");
  return (
    <span className={cls}>
      {dot && <span className="mk-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
