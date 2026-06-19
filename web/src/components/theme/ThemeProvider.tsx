"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { applyTheme, DEFAULTS, type ThemeConfig } from "@/lib/theme";

type ThemeContextValue = {
  theme: ThemeConfig;
  set: (patch: Partial<ThemeConfig>) => void;
  reset: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme?: ThemeConfig;
}) {
  // The published theme is rendered server-side (SiteSettings DB → <html> + an
  // inline <style>), so there is no flash. State is seeded from that same value.
  const [theme, setTheme] = useState<ThemeConfig>(initialTheme ?? DEFAULTS);

  // Ensure the client CSS vars match the (server-rendered) theme after hydration.
  useEffect(() => {
    applyTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Live preview: the admin Appearance iframe posts theme changes instantly.
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type === "mk-theme-preview" && e.data.theme) {
        const t = e.data.theme as ThemeConfig;
        setTheme(t);
        applyTheme(t);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // In-session updates (admin live editing + visitor mode toggle). Admin edits
  // are persisted to the DB by the Appearance screen; the global default lives
  // in SiteSettings, so this is intentionally not written to localStorage.
  const set = useCallback((patch: Partial<ThemeConfig>) => {
    setTheme((prev) => {
      const next = { ...prev, ...patch };
      applyTheme(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    applyTheme(DEFAULTS);
    setTheme(DEFAULTS);
  }, []);

  return <ThemeContext.Provider value={{ theme, set, reset }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
