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

export type PaletteName = "indigo" | "madder" | "mehendi" | "bidri";

export interface ColorPalette {
  name: PaletteName;
  label: string;
  /** Saturated fill colour — used for the picker swatch */
  swatch: string;
  /** The material and its source, shown in the picker. Named rather than
      slang: the palette is a material system, not a mood. */
  note: string;
}

export const palettes: ColorPalette[] = [
  {
    name: "indigo",
    label: "Indigo",
    swatch: "#2B4EFF",
    note: "indigo dye · Ajrakh",
  },
  {
    name: "madder",
    label: "Madder",
    swatch: "#FF4D00",
    note: "madder root · Kalamkari",
  },
  {
    name: "mehendi",
    label: "Mehendi",
    swatch: "#C8F135",
    note: "henna leaf",
  },
  {
    name: "bidri",
    label: "Bidri",
    swatch: "#C9CCD1",
    note: "silver inlay · Bidar",
  },
];

export const DEFAULT_PALETTE: PaletteName = "indigo";
const STORAGE_KEY = "color-theme";

/* These palettes shipped under earlier names. A preference stored on a
   previous visit must keep resolving rather than silently resetting, so old
   keys are mapped forward instead of being treated as invalid. */
const LEGACY_PALETTES: Record<string, PaletteName> = {
  volt: "indigo",
  hazard: "madder",
  signal: "mehendi",
};

const PALETTE_KEYS = palettes.map((palette) => palette.name);

function normalisePalette(value: string | null): PaletteName | null {
  if (!value) return null;
  if (value in LEGACY_PALETTES) return LEGACY_PALETTES[value];
  return PALETTE_KEYS.includes(value as PaletteName)
    ? (value as PaletteName)
    : null;
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
    const stored = normalisePalette(localStorage.getItem(STORAGE_KEY));
    if (stored) {
      setColorThemeState(stored);
      return;
    }
    const attr = normalisePalette(
      document.documentElement.getAttribute("data-palette"),
    );
    if (attr) setColorThemeState(attr);
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
export const paletteInitScript = `(function(){try{var v=['indigo','madder','mehendi','bidri'];var l={volt:'indigo',hazard:'madder',signal:'mehendi'};var s=localStorage.getItem('${STORAGE_KEY}');s=l[s]||s;document.documentElement.setAttribute('data-palette',v.indexOf(s)>-1?s:'${DEFAULT_PALETTE}');}catch(e){document.documentElement.setAttribute('data-palette','${DEFAULT_PALETTE}');}})();`;
