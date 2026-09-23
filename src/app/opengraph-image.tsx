import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

/* The site's display voice, loaded explicitly. Satori has no access to
   next/font, so without this the card renders in a fallback grotesque and
   is the one public surface that does not match the site. Bundled rather
   than fetched so the route stays fully static and offline-buildable. */
let displayFont: Buffer | null = null;
async function getDisplayFont() {
  if (!displayFont) {
    displayFont = await readFile(
      path.join(process.cwd(), "src/app/_fonts/mukta-800.ttf"),
    );
  }
  return displayFont;
}

export const alt = "Shubham Gupta — AI-focused Backend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Kept in step with the dark theme tokens in globals.css so the card
   preview matches the page it links to. */
const INK = "#1B1F14";
const PAPER = "#EDE9DC";
const ACCENT = "#A8BE6B";
const MUTED = "#A9AD96";

const metrics = [
  { value: "3+", label: "Years shipping" },
  { value: "100K+", label: "Concurrent users" },
  { value: "50%", label: "Delivery latency cut" },
];

export default async function Image() {
  const mukta = await getDisplayFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          color: PAPER,
          padding: "64px",
          position: "relative",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 3,
            color: MUTED,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* Indus seal mark — square body, inner ring. Same geometry as the
                favicon and the plate stamps, so the card is recognisably the
                same object as the site. */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 26,
                height: 26,
                border: `2px solid ${PAPER}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 10,
                  height: 10,
                  border: `1px solid ${PAPER}`,
                }}
              />
            </div>
            <div style={{ display: "flex" }}>PORTFOLIO / 2026</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: `2px solid ${PAPER}`,
              padding: "8px 16px",
              color: PAPER,
              fontSize: 18,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                background: ACCENT,
                display: "flex",
              }}
            />
            OPEN TO WORK
          </div>
        </div>

        {/* Name */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Mukta",
              fontSize: 104,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1,
              display: "flex",
            }}
          >
            SHUBHAM GUPTA
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 36,
              color: ACCENT,
              display: "flex",
            }}
          >
            AI-focused Backend Engineer
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 24,
              color: MUTED,
              display: "flex",
            }}
          >
            Multi-agent systems · LLM product features · Node.js / AWS
          </div>
        </div>

        {/* Metrics + accent */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              gap: 56,
              borderTop: `2px solid ${PAPER}`,
              paddingTop: 24,
            }}
          >
            {metrics.map((metric) => (
              <div
                key={metric.label}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div
                  style={{
                    fontFamily: "Mukta",
                    fontSize: 44,
                    fontWeight: 800,
                    color: ACCENT,
                    display: "flex",
                  }}
                >
                  {metric.value}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    color: MUTED,
                    letterSpacing: 2,
                    display: "flex",
                  }}
                >
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Graduated scale — Jantar Mantar's divided quadrant, replacing the
              flat accent bar. Ticks are real elements rather than a CSS
              gradient because satori's gradient support is partial; every
              fourth tick is long, so it reads as a measuring instrument
              rather than as a dashed rule. */}
          <div
            style={{
              marginTop: 26,
              width: "100%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              height: 16,
            }}
          >
            {Array.from({ length: 96 }).map((_, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  width: 2,
                  height: i % 4 === 0 ? 16 : 8,
                  background: i % 4 === 0 ? ACCENT : MUTED,
                }}
              />
            ))}
          </div>

          <div
            style={{
              marginTop: 12,
              fontSize: 15,
              letterSpacing: 2,
              color: MUTED,
              display: "flex",
            }}
          >
            POTHI · PALM-LEAF FOLIO · VASTU PADA GRID
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Mukta", data: mukta, style: "normal", weight: 400 },
      ],
    },
  );
}
