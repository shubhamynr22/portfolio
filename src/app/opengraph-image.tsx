import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

/* Fonts are bundled rather than fetched: Satori has no access to next/font,
   and a build-time CDN fetch is a build that fails when the CDN does. */
type FontSpec = { name: string; file: string; weight: 400 | 500 };

const FONTS: FontSpec[] = [
  { name: "EB Garamond", file: "eb-garamond-500.ttf", weight: 500 },
  { name: "Geist", file: "geist-400.ttf", weight: 400 },
  { name: "Geist", file: "geist-500.ttf", weight: 500 },
];

async function getFonts() {
  return Promise.all(
    FONTS.map(async (f) => ({
      name: f.name,
      data: await readFile(path.join(process.cwd(), "src/app/_fonts", f.file)),
      weight: f.weight,
      style: "normal" as const,
    })),
  );
}

export const alt = "Shubham Gupta — AI-focused Backend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const metrics = [
  { value: "3+", label: "Years shipping" },
  { value: "100K+", label: "Concurrent users" },
  { value: "50%", label: "Latency cut" },
  { value: "10K", label: "Events / sec" },
];

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
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Geist",
          backgroundImage:
            "linear-gradient(180deg, #2a63cf 0%, #4f8be2 30%, #8db6ec 58%, #d4e2f6 80%, #ffffff 100%)",
          position: "relative",
        }}
      >
        {/* Low sun and haze */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle at 82% 78%, rgba(255,246,232,0.95) 0%, rgba(255,214,170,0.45) 14%, rgba(255,214,170,0) 40%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 18px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.45)",
            color: "#ffffff",
            fontSize: 22,
            fontWeight: 500,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#7dffb0",
              display: "flex",
            }}
          />
          Open to new roles
        </div>

        <div
          style={{
            marginTop: 26,
            fontFamily: "EB Garamond",
            fontSize: 124,
            fontWeight: 500,
            color: "#ffffff",
            letterSpacing: -2,
            lineHeight: 1,
            display: "flex",
          }}
        >
          Shubham Gupta
        </div>

        <div
          style={{
            marginTop: 22,
            fontSize: 30,
            color: "rgba(255,255,255,0.92)",
            display: "flex",
          }}
        >
          Backend AI engineer · multi-agent systems · event-driven infra
        </div>

        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 14,
          }}
        >
          {metrics.map((m) => (
            <div
              key={m.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 200,
                padding: "16px 0",
                borderRadius: 18,
                background: "rgba(255,255,255,0.82)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 18px 40px -18px rgba(30,60,170,0.45)",
              }}
            >
              <div
                style={{
                  fontSize: 38,
                  fontWeight: 500,
                  color: "#111318",
                  letterSpacing: -1,
                  display: "flex",
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  marginTop: 2,
                  fontSize: 18,
                  color: "#646976",
                  display: "flex",
                }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
