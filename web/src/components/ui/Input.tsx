import type { ComponentPropsWithoutRef, ReactNode } from "react";

function fieldId(label?: string, id?: string) {
  return id || (label ? `f-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
}

type InputProps = {
  label?: string;
  hint?: string;
  variant?: "box" | "underline";
  as?: "input" | "textarea";
  className?: string;
} & Omit<ComponentPropsWithoutRef<"input"> & ComponentPropsWithoutRef<"textarea">, "className">;

/** Labelled text input. variant="underline" for the editorial contact form. */
export function Input({ label, hint, variant = "box", as = "input", className = "", id, ...rest }: InputProps) {
  const fid = fieldId(label, id);
  return (
    <label
      className={["mk-field", variant === "underline" ? "mk-field--underline" : "", className]
        .filter(Boolean)
        .join(" ")}
      htmlFor={fid}
    >
      {label && <span className="mk-field__label">{label}</span>}
      {as === "textarea" ? (
        <textarea id={fid} className="mk-textarea" {...(rest as ComponentPropsWithoutRef<"textarea">)} />
      ) : (
        <input id={fid} className="mk-input" {...(rest as ComponentPropsWithoutRef<"input">)} />
      )}
      {hint && <span className="mk-field__hint">{hint}</span>}
    </label>
  );
}

type SelectProps = {
  label?: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"select">, "className">;

/** Native select with custom chevron. */
export function Select({ label, children, className = "", id, ...rest }: SelectProps) {
  const fid = fieldId(label, id);
  return (
    <label className={["mk-field", className].filter(Boolean).join(" ")} htmlFor={fid}>
      {label && <span className="mk-field__label">{label}</span>}
      <span className="mk-select-wrap">
        <select id={fid} className="mk-select" {...rest}>
          {children}
        </select>
      </span>
    </label>
  );
}
