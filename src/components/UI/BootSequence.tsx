import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { motionConfig } from "../../lib/motionConfig";

interface BootSequenceProps {
  onComplete: () => void;
}

const PLOT_LINES = [
  "REGISTRATION ............ ALIGNED",
  "PEN 01 — 0.18 mm ........ LOADED",
  "PEN 02 — 0.35 mm ........ LOADED",
  "MEDIA — VELLUM A1 ....... FEEDING",
  "ORIGIN SET — 0,0 ........ LOCKED",
];

const PLOT_DURATION = 2400; // ms until the sheet is "plotted"

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [percent, setPercent] = useState(0);
  const [opacity, setOpacity] = useState(1);

  // Calibration lines appear one by one
  useEffect(() => {
    if (visibleLines >= PLOT_LINES.length) return;
    const t = setTimeout(() => setVisibleLines((n) => n + 1), 320);
    return () => clearTimeout(t);
  }, [visibleLines]);

  // Plot percentage counts up, then the sheet fades out
  useEffect(() => {
    const start = performance.now();
    let frame: number;

    const step = (now: number) => {
      const p = Math.min((now - start) / PLOT_DURATION, 1);
      // ease the counter so it lands softly, like a plotter finishing a pass
      setPercent(Math.round((1 - Math.pow(1 - p, 2)) * 100));
      if (p < 1) {
        frame = requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setOpacity(0);
          setTimeout(onComplete, 650);
        }, 450);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  const draw = (delay: number, duration = 0.9) => ({
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { delay, duration, ease: motionConfig.drawEase },
  });

  return (
    <div
      className="fixed inset-0 z-[100] bg-print-deep font-mono text-chalk"
      style={{
        opacity,
        transition: "opacity 650ms ease",
        pointerEvents: opacity < 0.5 ? "none" : "all",
        cursor: "none",
      }}
    >
      <div className="absolute inset-0 millimeter-chalk" />

      {/* Sheet header */}
      <div className="absolute top-6 left-6 md:top-8 md:left-10 text-[9px] tracking-[0.45em] uppercase text-chalk-soft">
        SFK — DRAWING SET // PLOTTER ONLINE
      </div>
      <div className="absolute top-6 right-6 md:top-8 md:right-10 text-[10px] tracking-[0.3em] uppercase text-safety tabular-nums">
        PLOT {String(percent).padStart(3, "0")}%
      </div>

      {/* The plotter draws the title block of Sheet 01 */}
      <div className="absolute inset-0 flex items-center justify-center px-8">
        <motion.svg
          viewBox="0 0 520 340"
          className="w-full max-w-[520px] text-chalk"
          fill="none"
          stroke="currentColor"
        >
          {/* Outer frame */}
          <motion.rect
            x="10"
            y="10"
            width="500"
            height="320"
            strokeWidth="1.5"
            {...draw(0.1, 1.1)}
          />
          {/* Inner margin */}
          <motion.rect
            x="26"
            y="26"
            width="468"
            height="288"
            strokeWidth="0.5"
            strokeOpacity="0.5"
            {...draw(0.5, 1.0)}
          />
          {/* Crosshair */}
          <motion.line
            x1="260"
            y1="80"
            x2="260"
            y2="260"
            strokeWidth="0.5"
            strokeOpacity="0.6"
            {...draw(1.0, 0.7)}
          />
          <motion.line
            x1="150"
            y1="170"
            x2="370"
            y2="170"
            strokeWidth="0.5"
            strokeOpacity="0.6"
            {...draw(1.2, 0.7)}
          />
          {/* Registration circle */}
          <motion.circle
            cx="260"
            cy="170"
            r="46"
            strokeWidth="1"
            {...draw(1.4, 0.9)}
          />
          <motion.circle
            cx="260"
            cy="170"
            r="3"
            strokeWidth="1"
            stroke="var(--color-safety)"
            {...draw(2.0, 0.3)}
          />
          {/* Title block strip, bottom-right — like a real sheet */}
          <motion.path
            d="M 330 280 H 494 M 330 280 V 314 M 330 297 H 494 M 412 280 V 314"
            strokeWidth="0.75"
            strokeOpacity="0.8"
            {...draw(1.7, 0.8)}
          />
        </motion.svg>
      </div>

      {/* Calibration log */}
      <div className="absolute bottom-8 left-6 md:bottom-10 md:left-10 space-y-1.5">
        {PLOT_LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className="text-[10px] tracking-[0.18em] text-chalk-soft"
          >
            {line}
          </div>
        ))}
        <div className="text-[10px] tracking-[0.18em] text-chalk caret pt-1">
          PLOTTING SHEET 01 OF 06
        </div>
      </div>

      <div className="absolute bottom-8 right-6 md:bottom-10 md:right-10 text-[9px] tracking-[0.3em] uppercase text-chalk-faint">
        ISSUED FOR CONSTRUCTION
      </div>
    </div>
  );
}
