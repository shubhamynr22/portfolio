"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

/* ──────────────────────────────────────────────────────────────────
 *  PALETTE CONTEXT
 *
 *  The palette *values* live in CSS (`[data-palette="…"]` in globals.css).
 *  This context only owns the picker state and writes the attribute.
 *
 *  Critically it never returns `null` while un-mounted: the previous
 *  implementation did, which meant the whole app rendered as an empty
 *  <body> on the server and was invisible to crawlers and link previews.
 * ────────────────────────────────────────────────────────────────── */

export type PaletteName = "volt" | "hazard" | "signal";

export interface ColorPalette {
  name: PaletteName;
  label: string;
  /** Saturated fill colour — used for the picker swatch */
  swatch: string;
  /** What the palette is for, shown in the picker */
  note: string;
}

export const palettes: ColorPalette[] = [
  {
    name: "volt",
    label: "Volt",
    swatch: "#2B4EFF",
    note: "electric blue",
  },
  {
    name: "hazard",
    label: "Hazard",
    swatch: "#FF4D00",
    note: "signal orange",
  },
  {
    name: "signal",
    label: "Signal",
    swatch: "#C8F135",
    note: "acid lime",
  },
];

export const DEFAULT_PALETTE: PaletteName = "volt";
const STORAGE_KEY = "color-theme";

function isPalette(value: string | null): value is PaletteName {
  return value === "volt" || value === "hazard" || value === "signal";
}

interface ColorThemeCtx {
  colorTheme: PaletteName;
  setColorTheme: (name: PaletteName) => void;
  themes: ColorPalette[];
}

const ColorThemeContext = createContext<ColorThemeCtx>({
  colorTheme: DEFAULT_PALETTE,
  setColorTheme: () => {},
  themes: palettes,
});

export const useColorTheme = () => useContext(ColorThemeContext);

export function ColorThemeProvider({ children }: { children: ReactNode }) {
  const [colorTheme, setColorThemeState] = useState<PaletteName>(DEFAULT_PALETTE);

  /* Sync React state with whatever the pre-paint inline script already set,
     so the picker's selected state matches the rendered palette. */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isPalette(stored)) {
      setColorThemeState(stored);
      return;
    }
    const attr = document.documentElement.getAttribute("data-palette");
    if (isPalette(attr)) setColorThemeState(attr);
  }, []);

  const setColorTheme = useCallback((name: PaletteName) => {
    setColorThemeState(name);
    document.documentElement.setAttribute("data-palette", name);
    try {
      localStorage.setItem(STORAGE_KEY, name);
    } catch {
      /* private mode — palette still applies for this session */
    }
  }, []);

  return (
    <ColorThemeContext.Provider
      value={{ colorTheme, setColorTheme, themes: palettes }}
    >
      {children}
    </ColorThemeContext.Provider>
  );
}

/**
 * Runs before first paint to apply the stored palette without a flash.
 * Rendered as the first element in <body>.
 */
export const paletteInitScript = `(function(){try{var v=['volt','hazard','signal'];var s=localStorage.getItem('${STORAGE_KEY}');document.documentElement.setAttribute('data-palette',v.indexOf(s)>-1?s:'${DEFAULT_PALETTE}');}catch(e){document.documentElement.setAttribute('data-palette','${DEFAULT_PALETTE}');}})();`;
