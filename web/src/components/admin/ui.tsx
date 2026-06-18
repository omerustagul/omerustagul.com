import type { ReactNode } from "react";
import Link from "next/link";

export function AdminHeader({
  title,
  action,
}: {
  title: string;
  action?: { href: string; label: string };
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "2rem",
      }}
    >
      <h1 style={{ fontSize: "var(--fs-h2)", letterSpacing: "-0.02em" }}>{title}</h1>
      {action && (
        <Link href={action.href} className="mk-btn mk-btn--primary mk-btn--sm">
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="mk-field">
      <span className="mk-field__label">{label}</span>
      <input
        className="mk-input"
        name={name}
        type={type}
        defaultValue={defaultValue ?? undefined}
        required={required}
        placeholder={placeholder}
      />
    </label>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
}) {
  return (
    <label className="mk-field">
      <span className="mk-field__label">{label}</span>
      <textarea className="mk-textarea" name={name} defaultValue={defaultValue ?? undefined} />
    </label>
  );
}

export function Checkbox({ label, name, defaultChecked }: { label: string; name: string; defaultChecked?: boolean }) {
  return (
    <label style={{ display: "flex", gap: ".6rem", alignItems: "center", fontSize: "var(--fs-sm)" }}>
      <input type="checkbox" name={name} defaultChecked={defaultChecked} />
      {label}
    </label>
  );
}

export function FormCard({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gap: "1.1rem",
        maxWidth: "40rem",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "1.75rem",
      }}
    >
      {children}
    </div>
  );
}

export function SubmitButton({ children = "Kaydet" }: { children?: ReactNode }) {
  return (
    <button type="submit" className="mk-btn mk-btn--primary mk-btn--md" style={{ justifySelf: "start" }}>
      {children}
    </button>
  );
}

/** Simple table shell. */
export function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--fs-sm)" }}>
      <thead>
        <tr>
          {head.map((h) => (
            <th
              key={h}
              className="u-label"
              style={{ textAlign: "left", padding: ".6rem .5rem", borderBottom: "1px solid var(--border)" }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
