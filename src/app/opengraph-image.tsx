import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

/* The three faces the card actually sets type in, bundled rather than
   fetched: Satori has no access to next/font, and a route that reaches out
   to a CDN at build time is a route that fails when the CDN does.
   Mukta carries शुभम; without it the Devanagari half of the name would
   render as tofu. */
type FontSpec = { name: string; file: string; weight: 400 | 600 | 700 | 800 };

const FONTS: FontSpec[] = [
  { name: "Space Grotesk", file: "space-grotesk-700.ttf", weight: 700 },
  { name: "Plus Jakarta Sans", file: "plus-jakarta-sans-400.ttf", weight: 400 },
  { name: "Plus Jakarta Sans", file: "plus-jakarta-sans-600.ttf", weight: 600 },
  { name: "Space Mono", file: "space-mono-400.ttf", weight: 400 },
  { name: "Mukta", file: "mukta-800.ttf", weight: 800 },
];

let cached: Array<{ name: string; data: Buffer; weight: 400 | 600 | 700 | 800; style: "normal" }> | null =
  null;

async function getFonts() {
  if (!cached) {
    cached = await Promise.all(
      FONTS.map(async (f) => ({
        name: f.name,
        data: await readFile(path.join(process.cwd(), "src/app/_fonts", f.file)),
        weight: f.weight,
        style: "normal" as const,
      })),
    );
  }
  return cached;
}

export const alt = "Shubham Gupta — AI-focused Backend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Kept in step with the dark theme tokens in globals.css, so the card
   preview matches the page it links to. */
const INK = "#10131B";
const SURFACE = "#181C23";
const SURFACE_HIGH = "#31353D";
const ON_SURFACE = "#DFE2ED";
const MUTED = "#DBC1B4";
const OUTLINE = "#A38C80";
const PRIMARY = "#FFB68C";
const GOLD = "#E9C349";

const metrics = [
  { value: "३+", label: "Years shipping" },
  { value: "१००K+", label: "Concurrent users" },
  { value: "५०%", label: "Latency cut" },
  { value: "१०K", label: "Events / sec" },
];

const mono = "Space Mono";
const display = "Space Grotesk";
const body = "Plus Jakarta Sans";

export default async function Image() {
  const fonts = await getFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: INK,
          color: ON_SURFACE,
          padding: "44px",
          position: "relative",
          fontFamily: body,
        }}
      >
        {/* Ambient specular, as on the page. Drawn as radial gradients rather
            than as blurred discs: satori does not implement `filter: blur`, so
            a `blur()` circle renders as a hard-edged shape — which is exactly
            what the first pass of this card shipped. Gradients it does
            support, and they are what "blur" is approximating anyway. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle at 22% -10%, rgba(217,119,54,0.28) 0%, rgba(217,119,54,0) 52%), radial-gradient(circle at 92% 112%, rgba(233,195,73,0.18) 0%, rgba(233,195,73,0) 48%)",
          }}
        />

        {/* ── The terminal card ── */}
        <div
          style={{
            position: "relative",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: SURFACE,
            border: `1px solid #554339`,
            borderRadius: 12,
            padding: "44px 48px",
          }}
        >
          {/* ── No corner inscriptions here ──
              The site's cards carry bracket-and-inscription marks in all four
              corners; this one deliberately does not. Satori has no font
              fallback chain, so the box-drawing brackets rendered as tofu, and
              an absolutely positioned inscription shares a band with whichever
              line of body text lands at that height — the shipped draft
              printed संरचना straight through the type credits. The fix is a
              drawn-border bracket laid out in flow, which is a layout change
              this card has not been re-rendered against. Leaving them off
              rather than shipping a mark that collides or a glyph that
              cannot resolve. */}

          {/* ── Header row ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: "#1C2027",
                  border: `1px solid #554339`,
                  fontFamily: display,
                  fontWeight: 700,
                  fontSize: 17,
                  color: GOLD,
                }}
              >
                SG
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: mono, fontSize: 14, letterSpacing: 2, color: GOLD, display: "flex" }}>
                  DIRECT TRANSMISSION · संवाद
                </div>
                <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: 2, color: OUTLINE, marginTop: 6, display: "flex" }}>
                  PORTFOLIO / 2026
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                borderRadius: 4,
                border: `1px solid rgba(233,195,73,0.4)`,
                padding: "9px 14px",
                fontFamily: mono,
                fontSize: 13,
                letterSpacing: 2,
                color: GOLD,
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: 9999, background: GOLD, display: "flex" }} />
              OPEN TO NEW ROLES
            </div>
          </div>

          {/* ── The name, in both scripts ── */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: display,
                fontWeight: 700,
                fontSize: 96,
                letterSpacing: -3,
                lineHeight: 1,
                color: ON_SURFACE,
                display: "flex",
              }}
            >
              SHUBHAM GUPTA
            </div>
            <div
              style={{
                fontFamily: "Mukta",
                fontWeight: 800,
                fontSize: 60,
                lineHeight: 1.25,
                color: PRIMARY,
                marginTop: 4,
                display: "flex",
              }}
            >
              शुभम गुप्ता
            </div>
            <div
              style={{
                marginTop: 16,
                fontSize: 30,
                color: MUTED,
                fontFamily: body,
                display: "flex",
              }}
            >
              AI-focused Backend Engineer
            </div>
            <div
              style={{
                marginTop: 10,
                fontFamily: mono,
                fontSize: 16,
                letterSpacing: 1,
                color: OUTLINE,
                display: "flex",
              }}
            >
              MULTI-AGENT SYSTEMS · LLM PRODUCT FEATURES · NODE.JS / AWS
            </div>
          </div>

          {/* ── Telemetry ── */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                gap: 48,
                borderTop: `1px solid #554339`,
                paddingTop: 20,
              }}
            >
              {metrics.map((metric) => (
                <div key={metric.label} style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      fontFamily: display,
                      fontWeight: 700,
                      fontSize: 38,
                      color: PRIMARY,
                      display: "flex",
                    }}
                  >
                    {metric.value}
                  </div>
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: 13,
                      letterSpacing: 2,
                      color: OUTLINE,
                      marginTop: 6,
                      display: "flex",
                    }}
                  >
                    {metric.label.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>

            {/* Graduated scale — ticks as real elements rather than a CSS
                gradient, because satori's gradient support is partial. Every
                fourth tick is long, so it reads as an instrument. */}
            <div
              style={{
                marginTop: 22,
                width: "100%",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                height: 14,
              }}
            >
              {Array.from({ length: 84 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    width: 2,
                    height: i % 4 === 0 ? 14 : 7,
                    background: i % 4 === 0 ? GOLD : SURFACE_HIGH,
                  }}
                />
              ))}
            </div>

            <div
              style={{
                marginTop: 12,
                display: "flex",
                justifyContent: "space-between",
                fontFamily: mono,
                fontSize: 13,
                letterSpacing: 2,
                color: OUTLINE,
              }}
            >
              <div style={{ display: "flex" }}>
                SPACE GROTESK · PLUS JAKARTA SANS · SPACE MONO · MUKTA
              </div>
              <div style={{ display: "flex" }}>INDIA · IST · UTC+५:३०</div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
