import { motion } from "motion/react";
import { BACKEND_PROFILE } from "../../data";
import CinematicVideo from "./CinematicVideo";
import { motionConfig } from "../../lib/motionConfig";

const VIDEO_URL = import.meta.env.BASE_URL + "videos/hero.mp4";

/** A corner registration cross, as printed on every plotted sheet. */
function RegMark({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`absolute w-4 h-4 text-chalk/50 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <line x1="8" y1="0" x2="8" y2="16" />
      <line x1="0" y1="8" x2="16" y2="8" />
    </svg>
  );
}

export default function Hero() {
  const [firstName, lastName] = BACKEND_PROFILE.name.split(" // ");

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 36 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay,
      duration: motionConfig.duration.slow,
      ease: motionConfig.ease,
    },
  });

  return (
    <section
      id="section-hero"
      className="relative w-full h-full bg-print-deep text-chalk overflow-hidden select-none"
    >
      <div className="absolute inset-0 millimeter-chalk" />

      {/* Double sheet frame */}
      <div className="absolute inset-3 md:inset-5 border border-chalk/25 pointer-events-none" />
      <div className="absolute inset-5 md:inset-8 border border-chalk/10 pointer-events-none" />

      {/* Corner registration crosses */}
      <RegMark className="top-7 left-7 md:top-10 md:left-10" />
      <RegMark className="top-7 right-7 md:top-10 md:right-10" />
      <RegMark className="bottom-7 left-7 md:bottom-10 md:left-10" />
      <RegMark className="bottom-7 right-7 md:bottom-10 md:right-10" />

      {/* Slow protractor ornament, lower-left */}
      <svg
        viewBox="0 0 200 200"
        className="absolute -bottom-16 -left-16 w-64 h-64 text-chalk/[0.07] protractor-spin pointer-events-none"
        fill="none"
        stroke="currentColor"
      >
        <circle cx="100" cy="100" r="96" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="70" strokeWidth="0.5" />
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (i * 10 * Math.PI) / 180;
          const r1 = i % 9 === 0 ? 82 : 90;
          return (
            <line
              key={i}
              x1={100 + r1 * Math.cos(a)}
              y1={100 + r1 * Math.sin(a)}
              x2={100 + 96 * Math.cos(a)}
              y2={100 + 96 * Math.sin(a)}
              strokeWidth="0.5"
            />
          );
        })}
      </svg>

      {/* ── Sheet content ── */}
      <div className="relative h-full max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center gap-8 lg:gap-14 pt-20 pb-16 lg:py-0">
        {/* Left — drawing title */}
        <div>
          <motion.div
            {...rise(0.15)}
            className="font-mono text-[9px] md:text-[10px] tracking-[0.45em] uppercase text-chalk-soft"
          >
            DWG № SFK-2026 — ISSUED FOR CONSTRUCTION
          </motion.div>

          <motion.h1
            {...rise(0.3)}
            className="mt-6 font-display font-light leading-[0.95] tracking-tight text-5xl md:text-7xl xl:text-8xl"
          >
            {firstName}
            <br />
            <span className="italic text-chalk-soft">{lastName}</span>
          </motion.h1>

          {/* Dimension line measuring the title — label is the role */}
          <motion.div {...rise(0.55)} className="mt-10 max-w-md">
            <div className="relative h-px bg-chalk/60">
              <span className="absolute left-0 -top-[5px] h-[11px] w-px bg-chalk/80 rotate-45" />
              <span className="absolute right-0 -top-[5px] h-[11px] w-px bg-chalk/80 rotate-45" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-print-deep px-3 font-mono text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-safety whitespace-nowrap">
                {BACKEND_PROFILE.title}
              </span>
            </div>
            <div className="mt-2 flex justify-between font-mono text-[8px] tracking-[0.2em] text-chalk-faint uppercase">
              <span>STA 0+00</span>
              <span>TYP.</span>
            </div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-14 lg:mt-20 flex items-center gap-4"
          >
            <div className="relative h-14 w-px bg-chalk/25 overflow-hidden">
              <span className="tick-travel absolute top-0 left-0 w-px h-3 bg-safety" />
            </div>
            <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-chalk-soft">
              SCROLL — SHEET 02 FOLLOWS
            </span>
          </motion.div>
        </div>

        {/* Right — Figure 00, the ambient feed in cyanotype */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.1, ease: motionConfig.ease }}
          className="w-full"
        >
          <div className="relative h-[30vh] md:h-[36vh] lg:h-[52vh]">
            <CinematicVideo
              videoUrl={VIDEO_URL}
              onLoadedMetadata={() => {}}
              onError={(err) => console.warn("Video error:", err)}
            />
          </div>
          <figcaption className="mt-3 flex items-center justify-between font-mono text-[9px] tracking-[0.3em] uppercase text-chalk-soft">
            <span>FIG. 00 — AMBIENT FEED</span>
            <span className="text-chalk-faint">SCALE 1:1</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
