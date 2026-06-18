import { BRAND_NAME } from "@/lib/brand";

type Props = {
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  showDot?: boolean;
  className?: string;
};

/** Wordmark. Defaults to BRAND_NAME from lib/brand. */
export function Logo({ name = BRAND_NAME, size = "md", href, showDot = true, className = "" }: Props) {
  const cls = ["mk-logo", `mk-logo--${size}`, className].filter(Boolean).join(" ");
  const inner = (
    <>
      <span>{name}</span>
      {showDot && (
        <span className="mk-logo__dot" aria-hidden="true">
          .
        </span>
      )}
    </>
  );
  if (href) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return <span className={cls}>{inner}</span>;
}
