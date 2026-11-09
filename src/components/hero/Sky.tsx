"use client";

import type { CSSProperties, RefObject } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/* ──────────────────────────────────────────────────────────────────
 *  SKY
 *  A morning sky: deep blue overhead, warming to a white haze at the
 *  horizon, a low sun, three drifting clouds and three ridges of
 *  mountains that part at different speeds as you scroll (parallax).
 *  All drawn here — no images.
 * ────────────────────────────────────────────────────────────────── */

const clouds = [
  { top: "12%", w: 380, h: 70, drift: "110s", d: "-20s", o: 0.55 },
  { top: "24%", w: 260, h: 50, drift: "80s", d: "-55s", o: 0.4 },
  { top: "6%", w: 520, h: 90, drift: "140s", d: "-90s", o: 0.35 },
];

export function Sky({ target }: { target: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end start"],
  });
  const far = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const mid = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const near = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const sun = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#2a63cf_0%,#4f8be2_22%,#8db6ec_44%,#d4e2f6_62%,#f6f8fc_76%,#ffffff_88%)]" />

      {/* Warm haze where the sun sits */}
      <motion.div
        style={{ y: sun }}
        className="absolute top-[36%] right-[8%] h-[46rem] w-[46rem] translate-x-1/3 rounded-full bg-[radial-gradient(circle,rgba(255,241,222,0.95)_0%,rgba(255,214,170,0.45)_22%,rgba(255,214,170,0)_60%)]"
      />
      {/* The sun */}
      <motion.div
        style={{ y: sun }}
        className="absolute top-[47%] right-[17%] h-24 w-24 rounded-full bg-[radial-gradient(circle,#fffdf8_0%,#fff3e0_55%,rgba(255,243,224,0)_72%)] blur-[1px]"
      />

      {/* Clouds */}
      {clouds.map((c, i) => (
        <div
          key={i}
          className="cloud absolute left-0 rounded-full bg-white blur-2xl"
          style={
            {
              top: c.top,
              width: c.w,
              height: c.h,
              opacity: c.o,
              "--drift": c.drift,
              "--d": c.d,
            } as CSSProperties
          }
        />
      ))}

      {/* Mountains — far, mid, near */}
      <div className="absolute inset-x-0 bottom-0 h-[58%]">
        <motion.svg
          style={{ y: far }}
          viewBox="0 0 1440 400"
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="m-far" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#a9c3ee" />
              <stop offset="1" stopColor="#dfe8f8" />
            </linearGradient>
          </defs>
          <path
            fill="url(#m-far)"
            d="M0 250 L70 222 L130 236 L210 180 L280 214 L350 186 L420 140 L490 196 L560 168 L640 204 L720 150 L800 186 L880 128 L960 176 L1030 146 L1110 192 L1190 156 L1270 196 L1350 170 L1440 190 L1440 400 L0 400 Z"
          />
        </motion.svg>

        <motion.svg
          style={{ y: mid }}
          viewBox="0 0 1440 400"
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="m-mid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#5f8ae0" />
              <stop offset="0.55" stopColor="#9db9ee" />
              <stop offset="1" stopColor="#eef3fc" />
            </linearGradient>
            <linearGradient id="m-mid-snow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            fill="url(#m-mid)"
            d="M0 300 L60 280 L120 292 L190 246 L240 262 L300 196 L338 168 L372 204 L420 186 L470 236 L540 222 L610 262 L690 244 L760 274 L840 232 L910 256 L980 214 L1050 240 L1120 200 L1190 238 L1260 222 L1340 262 L1440 246 L1440 400 L0 400 Z"
          />
          {/* Snow on the tallest peak */}
          <path
            fill="url(#m-mid-snow)"
            d="M300 196 L338 168 L372 204 L356 200 L340 214 L324 202 L310 212 Z"
          />
        </motion.svg>

        <motion.svg
          style={{ y: near }}
          viewBox="0 0 1440 400"
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="m-near" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e7eefb" />
              <stop offset="0.5" stopColor="#f7f9fe" />
              <stop offset="1" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <path
            fill="url(#m-near)"
            d="M0 330 L90 306 L170 322 L260 288 L340 314 L430 298 L520 324 L640 306 L760 330 L880 302 L980 318 L1080 292 L1180 318 L1290 300 L1380 322 L1440 312 L1440 400 L0 400 Z"
          />
        </motion.svg>
      </div>

      {/* Melt the horizon into the white page below */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-white/0 to-white" />
    </div>
  );
}
