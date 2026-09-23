import { ImageResponse } from "next/og";

export const alt = "Shubham Gupta — AI-focused Backend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Kept in step with the dark theme tokens in globals.css so the card
   preview matches the page it links to. */
const INK = "#131316";
const PAPER = "#E0DAD2";
const INDIGO = "#7B93FF";
const MEHENDI = "#C8F135";
const MUTED = "#A8A29A";

const metrics = [
  { value: "3+", label: "Years shipping" },
  { value: "100K+", label: "Concurrent users" },
  { value: "50%", label: "Delivery latency cut" },
];

export default function Image() {
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
                background: MEHENDI,
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
              fontSize: 104,
              fontWeight: 800,
              letterSpacing: -4,
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
              color: INDIGO,
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
                    fontSize: 44,
                    fontWeight: 800,
                    color: MEHENDI,
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
                  background: i % 4 === 0 ? MEHENDI : MUTED,
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
            PADA GRID · VASTU PURUSHA MANDALA · 8×8
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
