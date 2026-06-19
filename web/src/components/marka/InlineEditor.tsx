"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { savePageText } from "@/lib/actions/page-text";

/* Inline text editing. When the homepage is loaded with ?edit=1 inside the admin
   preview (and the viewer is an admin), every [data-mk-key] element becomes
   contenteditable and saves on blur via the savePageText server action — the
   preview iframe is the same Next app, so no cross-frame bridge is needed. */
export function InlineEditor({ canEdit }: { canEdit: boolean }) {
  const params = useSearchParams();
  const editing = canEdit && params.get("edit") === "1";

  useEffect(() => {
    if (!editing) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-mk-key]"));
    const orig = new Map<HTMLElement, string>();
    els.forEach((el) => {
      orig.set(el, el.textContent ?? "");
      el.setAttribute("contenteditable", "true");
      el.style.outline = "1px dashed var(--accent)";
      el.style.outlineOffset = "4px";
      el.style.borderRadius = "3px";
      el.style.cursor = "text";
    });

    function onBlur(e: FocusEvent) {
      const el = e.target as HTMLElement;
      const key = el?.dataset?.mkKey;
      if (!key) return;
      const value = (el.textContent ?? "").trim();
      if (value === (orig.get(el) ?? "")) return;
      orig.set(el, value);
      savePageText(key, value);
    }
    function onKey(e: KeyboardEvent) {
      const el = e.target as HTMLElement;
      if (el?.dataset?.mkKey && e.key === "Enter") {
        e.preventDefault();
        el.blur();
      }
    }
    document.addEventListener("blur", onBlur, true);
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("blur", onBlur, true);
      document.removeEventListener("keydown", onKey, true);
      els.forEach((el) => {
        el.removeAttribute("contenteditable");
        el.style.outline = "";
        el.style.cursor = "";
        el.style.borderRadius = "";
      });
    };
  }, [editing]);

  if (!editing) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        background: "var(--accent)",
        color: "var(--on-accent)",
        padding: "8px 16px",
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
      }}
    >
      Düzenleme modu — başlığa tıklayıp yaz, Enter ile kaydet
    </div>
  );
}
