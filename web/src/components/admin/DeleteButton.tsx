"use client";

import type { ReactNode } from "react";

/** Delete control: a tiny form posting `id` to a server action, with confirm. */
export function DeleteButton({
  action,
  id,
  label = "Sil",
  className,
  title,
  children,
}: {
  action: (fd: FormData) => Promise<void>;
  id: string;
  label?: string;
  /** When set (e.g. "adm-iconbtn") the button uses that class instead of the inline text style. */
  className?: string;
  title?: string;
  /** Custom button content (e.g. an icon); falls back to `label`. */
  children?: ReactNode;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Silinsin mi? Bu işlem geri alınamaz.")) e.preventDefault();
      }}
      style={{ display: "inline" }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className={className}
        title={title ?? label}
        aria-label={title ?? label}
        style={
          className
            ? undefined
            : {
                background: "transparent",
                border: "none",
                color: "var(--danger, #e5484d)",
                cursor: "pointer",
                font: "inherit",
              }
        }
      >
        {children ?? label}
      </button>
    </form>
  );
}
