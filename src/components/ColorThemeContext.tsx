"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

/* ── Palette definitions ── */
export interface ColorPalette {
  name: string;
  label: string;
  /** Preview swatch colour (used in the picker UI) */
  swatch: string;
  light: Record<string, string>;
  dark: Record<string, string>;
}

export const palettes: ColorPalette[] = [
  {
    name: "indigo",
    label: "Indigo",
    swatch: "#6366F1",
    light: {
      "--primary": "#4F46E5",
      "--primary-foreground": "#FFFFFF",
      "--ring": "#4F46E5",
      "--chart-1": "#4F46E5",
      "--chart-2": "#6366F1",
      "--chart-3": "#818CF8",
      "--chart-4": "#A5B4FC",
      "--chart-5": "#C7D2FE",
    },
    dark: {
      "--primary": "#6366F1",
      "--primary-foreground": "#FFFFFF",
      "--ring": "#6366F1",
      "--chart-1": "#6366F1",
      "--chart-2": "#818CF8",
      "--chart-3": "#A5B4FC",
      "--chart-4": "#C7D2FE",
      "--chart-5": "#E0E7FF",
    },
  },
  {
    name: "emerald",
    label: "Emerald",
    swatch: "#34D399",
    light: {
      "--primary": "#059669",
      "--primary-foreground": "#FFFFFF",
      "--ring": "#059669",
      "--chart-1": "#059669",
      "--chart-2": "#10B981",
      "--chart-3": "#34D399",
      "--chart-4": "#6EE7B7",
      "--chart-5": "#A7F3D0",
    },
    dark: {
      "--primary": "#34D399",
      "--primary-foreground": "#064E3B",
      "--ring": "#34D399",
      "--chart-1": "#34D399",
      "--chart-2": "#6EE7B7",
      "--chart-3": "#A7F3D0",
      "--chart-4": "#D1FAE5",
      "--chart-5": "#ECFDF5",
    },
  },
  {
    name: "rose",
    label: "Rose",
    swatch: "#FB7185",
    light: {
      "--primary": "#E11D48",
      "--primary-foreground": "#FFFFFF",
      "--ring": "#E11D48",
      "--chart-1": "#E11D48",
      "--chart-2": "#F43F5E",
      "--chart-3": "#FB7185",
      "--chart-4": "#FDA4AF",
      "--chart-5": "#FFE4E6",
    },
    dark: {
      "--primary": "#FB7185",
      "--primary-foreground": "#881337",
      "--ring": "#FB7185",
      "--chart-1": "#FB7185",
      "--chart-2": "#FDA4AF",
      "--chart-3": "#FFE4E6",
      "--chart-4": "#FFF1F2",
      "--chart-5": "#FFF5F5",
    },
  },
  {
    name: "amber",
    label: "Amber",
    swatch: "#FBBF24",
    light: {
      "--primary": "#D97706",
      "--primary-foreground": "#FFFFFF",
      "--ring": "#D97706",
      "--chart-1": "#D97706",
      "--chart-2": "#F59E0B",
      "--chart-3": "#FBBF24",
      "--chart-4": "#FCD34D",
      "--chart-5": "#FDE68A",
    },
    dark: {
      "--primary": "#FBBF24",
      "--primary-foreground": "#78350F",
      "--ring": "#FBBF24",
      "--chart-1": "#FBBF24",
      "--chart-2": "#FCD34D",
      "--chart-3": "#FDE68A",
      "--chart-4": "#FEF3C7",
      "--chart-5": "#FFFBEB",
    },
  },
  {
    name: "cyan",
    label: "Cyan",
    swatch: "#22D3EE",
    light: {
      "--primary": "#0891B2",
      "--primary-foreground": "#FFFFFF",
      "--ring": "#0891B2",
      "--chart-1": "#0891B2",
      "--chart-2": "#06B6D4",
      "--chart-3": "#22D3EE",
      "--chart-4": "#67E8F9",
      "--chart-5": "#A5F3FC",
    },
    dark: {
      "--primary": "#22D3EE",
      "--primary-foreground": "#164E63",
      "--ring": "#22D3EE",
      "--chart-1": "#22D3EE",
      "--chart-2": "#67E8F9",
      "--chart-3": "#A5F3FC",
      "--chart-4": "#CFFAFE",
      "--chart-5": "#ECFEFF",
    },
  },
  {
    name: "violet",
    label: "Violet",
    swatch: "#A78BFA",
    light: {
      "--primary": "#7C3AED",
      "--primary-foreground": "#FFFFFF",
      "--ring": "#7C3AED",
      "--chart-1": "#7C3AED",
      "--chart-2": "#8B5CF6",
      "--chart-3": "#A78BFA",
      "--chart-4": "#C4B5FD",
      "--chart-5": "#DDD6FE",
    },
    dark: {
      "--primary": "#A78BFA",
      "--primary-foreground": "#2E1065",
      "--ring": "#A78BFA",
      "--chart-1": "#A78BFA",
      "--chart-2": "#C4B5FD",
      "--chart-3": "#DDD6FE",
      "--chart-4": "#EDE9FE",
      "--chart-5": "#F5F3FF",
    },
  },
];

/* ── Context ── */
interface ColorThemeCtx {
  colorTheme: string;
  setColorTheme: (name: string) => void;
  themes: ColorPalette[];
}

const ColorThemeContext = createContext<ColorThemeCtx>({
  colorTheme: "indigo",
  setColorTheme: () => {},
  themes: palettes,
});

export const useColorTheme = () => useContext(ColorThemeContext);

/* ── Provider ── */
export function ColorThemeProvider({ children }: { children: ReactNode }) {
  const [colorTheme, setColorThemeState] = useState("indigo");
  const [mounted, setMounted] = useState(false);

  /** Apply CSS custom properties for the given palette + current dark/light mode */
  const applyPalette = useCallback((name: string) => {
    const palette = palettes.find((p) => p.name === name);
    if (!palette) return;

    const isDark = document.documentElement.classList.contains("dark");
    const vars = isDark ? palette.dark : palette.light;

    Object.entries(vars).forEach(([prop, value]) => {
      document.documentElement.style.setProperty(prop, value);
    });
  }, []);

  /** Watch for dark/light class changes and re-apply */
  useEffect(() => {
    const stored = localStorage.getItem("color-theme") ?? "indigo";
    setColorThemeState(stored);
    applyPalette(stored);
    setMounted(true);

    // MutationObserver to re-apply palette when next-themes toggles .dark
    const observer = new MutationObserver(() => {
      const current = localStorage.getItem("color-theme") ?? "indigo";
      applyPalette(current);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [applyPalette]);

  const setColorTheme = useCallback(
    (name: string) => {
      setColorThemeState(name);
      localStorage.setItem("color-theme", name);
      applyPalette(name);
    },
    [applyPalette],
  );

  // Avoid flash of incorrect palette
  if (!mounted) return null;

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme, themes: palettes }}>
      {children}
    </ColorThemeContext.Provider>
  );
}
