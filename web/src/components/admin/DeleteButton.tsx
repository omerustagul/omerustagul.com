"use client";

/** Delete control: a tiny form posting `id` to a server action, with confirm. */
export function DeleteButton({
  action,
  id,
  label = "Sil",
}: {
  action: (fd: FormData) => Promise<void>;
  id: string;
  label?: string;
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
        style={{
          background: "transparent",
          border: "none",
          color: "var(--danger, #e5484d)",
          cursor: "pointer",
          font: "inherit",
        }}
      >
        {label}
      </button>
    </form>
  );
}
