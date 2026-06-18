"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  applyTheme,
  DEFAULTS,
  loadTheme,
  saveTheme,
  THEME_KEY,
  type ThemeConfig,
} from "@/lib/theme";

type ThemeContextValue = {
  theme: ThemeConfig;
  set: (patch: Partial<ThemeConfig>) => void;
  reset: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // SSR + first render use DEFAULTS; the no-FOUC head script already applied the
  // saved theme to :root, so there's no visual flash. We hydrate state on mount.
  const [theme, setTheme] = useState<ThemeConfig>(DEFAULTS);

  useEffect(() => {
    const t = loadTheme();
    setTheme(t);
    applyTheme(t);
  }, []);

  // cross-tab: admin in one tab updates the live site in another
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== THEME_KEY) return;
      const t = loadTheme();
      setTheme(t);
      applyTheme(t);
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const set = useCallback((patch: Partial<ThemeConfig>) => {
    setTheme((prev) => {
      const next = { ...prev, ...patch };
      saveTheme(next);
      applyTheme(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    saveTheme(DEFAULTS);
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
