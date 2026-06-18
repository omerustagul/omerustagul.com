import type { ReactNode } from "react";

type Props = {
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  linkText?: ReactNode;
  linkHref?: string;
  className?: string;
};

/** Section header: mono eyebrow + big title + optional "Tümünü Gör" link. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  linkText,
  linkHref = "#",
  className = "",
}: Props) {
  return (
    <header className={["mk-secthead", className].filter(Boolean).join(" ")}>
      <div className="mk-secthead__main">
        {eyebrow && <span className="mk-secthead__eyebrow">{eyebrow}</span>}
        {title && <h2 className="mk-secthead__title">{title}</h2>}
        {subtitle && <p className="mk-secthead__sub">{subtitle}</p>}
      </div>
      {linkText && (
        <a className="mk-secthead__link" href={linkHref}>
          {linkText}
          <span aria-hidden="true">→</span>
        </a>
      )}
    </header>
  );
}
