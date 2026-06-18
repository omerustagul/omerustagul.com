import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  children?: ReactNode;
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  className?: string;
};

// Anchor when `href` is set, otherwise a button.
type ButtonProps = BaseProps &
  ({ href: string } & Omit<ComponentPropsWithoutRef<"a">, "className">
    | ({ href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className">));

export function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  fullWidth = false,
  className = "",
  ...rest
}: ButtonProps) {
  const cls = [
    "mk-btn",
    `mk-btn--${variant}`,
    `mk-btn--${size}`,
    fullWidth ? "mk-btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      {iconLeft && <span className="mk-btn__icon">{iconLeft}</span>}
      {children && <span>{children}</span>}
      {iconRight && <span className="mk-btn__icon mk-btn__icon--arrow">{iconRight}</span>}
    </>
  );

  if ("href" in rest && rest.href) {
    return (
      <a className={cls} {...(rest as ComponentPropsWithoutRef<"a">)}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {inner}
    </button>
  );
}
