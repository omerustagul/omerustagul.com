import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "outline" | "solid" | "ghost";
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "className">;

/** Round icon button — nav arrows, social, theme toggle, close. */
export function IconButton({ children, variant = "outline", size = "md", label, className = "", ...rest }: Props) {
  const cls = ["mk-iconbtn", `mk-iconbtn--${variant}`, `mk-iconbtn--${size}`, className]
    .filter(Boolean)
    .join(" ");
  return (
    <button type="button" className={cls} aria-label={label} {...rest}>
      {children}
    </button>
  );
}
