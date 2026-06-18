"use client";

import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n";

export function LanguageSwitcher({ current }: { current: Locale }) {
  const router = useRouter();

  function set(locale: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000`;
    router.refresh();
  }

  return (
    <div style={{ display: "flex", gap: ".25rem" }} className="u-label">
      {(["tr", "en"] as Locale[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => set(l)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            font: "inherit",
            color: l === current ? "var(--accent)" : "var(--text-subtle)",
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
