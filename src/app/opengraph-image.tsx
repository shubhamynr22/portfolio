import { ImageResponse } from "next/og";

export const alt = "Shubham Gupta — AI-focused Backend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0B0B0C";
const PAPER = "#F4F1ED";
const VOLT = "#7B93FF";
const SIGNAL = "#C8F135";

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
            color: "#A39D94",
          }}
        >
          <div style={{ display: "flex" }}>PORTFOLIO / 2026</div>
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
                background: SIGNAL,
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
              color: VOLT,
              display: "flex",
            }}
          >
            AI-focused Backend Engineer
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 24,
              color: "#A39D94",
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
                    color: SIGNAL,
                    display: "flex",
                  }}
                >
                  {metric.value}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    color: "#A39D94",
                    letterSpacing: 2,
                    display: "flex",
                  }}
                >
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 28,
              height: 12,
              width: "100%",
              background: SIGNAL,
              display: "flex",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
