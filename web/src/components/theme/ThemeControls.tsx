"use client";

import { ACCENTS, FONTS } from "@/lib/theme";
import { useTheme } from "./ThemeProvider";
import { Select } from "@/components/ui";

/** Live theme panel — edits the same mk-theme the prototype admin writes. */
export function ThemeControls() {
  const { theme, set, reset } = useTheme();

  return (
    <div
      style={{
        display: "grid",
        gap: "1.25rem",
        padding: "1.5rem",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        background: "var(--surface)",
      }}
    >
      {/* Accent */}
      <div style={{ display: "grid", gap: ".6rem" }}>
        <span className="mk-field__label">VURGU</span>
        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
          {ACCENTS.map((a) => (
            <button
              key={a.id}
              type="button"
              title={a.label}
              onClick={() => set({ accent: a.value })}
              aria-pressed={theme.accent === a.value}
              style={{
                width: 30,
                height: 30,
                borderRadius: "var(--radius-pill)",
                background: a.value,
                border:
                  theme.accent === a.value
                    ? "2px solid var(--text)"
                    : "2px solid var(--border)",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      {/* Mode */}
      <div style={{ display: "grid", gap: ".6rem" }}>
        <span className="mk-field__label">MOD</span>
        <div style={{ display: "flex", gap: ".5rem" }}>
          {(["light", "dark"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => set({ mode: m })}
              aria-pressed={theme.mode === m}
              style={{
                padding: ".5rem 1rem",
                borderRadius: "var(--radius-pill)",
                border: "1px solid var(--border)",
                background: theme.mode === m ? "var(--text)" : "transparent",
                color: theme.mode === m ? "var(--text-invert)" : "var(--text)",
                font: "inherit",
                cursor: "pointer",
              }}
            >
              {m === "light" ? "Açık" : "Koyu"}
            </button>
          ))}
        </div>
      </div>

      {/* Radius */}
      <label style={{ display: "grid", gap: ".6rem" }}>
        <span className="mk-field__label">KÖŞE — {theme.radius}px</span>
        <input
          type="range"
          min={0}
          max={20}
          value={theme.radius}
          onChange={(e) => set({ radius: Number(e.target.value) })}
          style={{ accentColor: "var(--accent)" }}
        />
      </label>

      {/* Font */}
      <Select
        label="FONT"
        value={theme.font}
        onChange={(e) => set({ font: e.target.value })}
      >
        {FONTS.map((f) => (
          <option key={f.id} value={f.id}>
            {f.label}
          </option>
        ))}
      </Select>

      <button
        type="button"
        onClick={reset}
        className="mk-btn mk-btn--ghost mk-btn--sm"
        style={{ justifySelf: "start" }}
      >
        Sıfırla
      </button>
    </div>
  );
}
