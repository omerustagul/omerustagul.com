import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
  active?: boolean;
  count?: number;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "className">;

/** Filter pill / chip — portfolio + market + blog filter bars. */
export function Tag({ children, active = false, count, className = "", ...rest }: Props) {
  const cls = ["mk-tag", className].filter(Boolean).join(" ");
  return (
    <button type="button" className={cls} data-active={active} {...rest}>
      {children}
      {count != null && <span className="mk-tag__count">{count}</span>}
    </button>
  );
}
