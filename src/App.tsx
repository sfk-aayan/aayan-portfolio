import { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Navbar from "./components/UI/Navbar";
import Hero from "./components/Hero/Hero";
import ProjectsSection from "./components/Projects/ProjectsSection";
import PhilosophySection from "./components/Philosophy/PhilosophySection";
import BootSequence from "./components/UI/BootSequence";
import CustomCursor from "./components/UI/CustomCursor";
import SheetTransfer from "./components/UI/SheetTransfer";
import { SOCIAL_LINKS } from "./data";
import { motionConfig } from "./lib/motionConfig";

/**
 * Left-edge scroll ruler: millimeter ticks, a sliding station marker,
 * and a live station readout. Blend-difference so it reads over both
 * the blueprint and the paper.
 */
function ScrollRuler() {
  const { scrollYProgress } = useScroll();
  const markerTop = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const station = useTransform(
    scrollYProgress,
    (v) => `STA 0+${String(Math.round(v * 999)).padStart(3, "0")}`,
  );

  return (
    <div className="fixed left-0 top-0 h-screen w-9 z-30 hidden lg:block pointer-events-none mix-blend-difference">
      {/* Tick strip */}
      <div
        className="absolute left-0 top-0 h-full w-2.5 opacity-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.9) 0 1px, transparent 1px 10px), repeating-linear-gradient(to bottom, rgba(255,255,255,0.9) 0 1px, transparent 1px 50px)",
          backgroundSize: "5px 100%, 10px 100%",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute left-[10px] top-0 h-full w-px bg-white/30" />

      {/* Station marker + readout */}
      <motion.div className="absolute left-0 w-9" style={{ top: markerTop }}>
        <div className="h-px w-5 bg-white" />
        <motion.div className="mt-1.5 origin-top-left rotate-90 font-mono text-[8px] tracking-[0.25em] text-white/80 whitespace-nowrap tabular-nums">
          {station}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [bootDone, setBootDone] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const { scrollY } = useScroll();
  // The blueprint recedes into the table as the paper print covers it
  const heroDim = useTransform(scrollY, [0, 800], [0, 0.55]);

  const handleBootComplete = () => {
    setBootDone(true);
    setTimeout(() => setContentVisible(true), 50);
  };

  return (
    <>
      {bootDone && <CustomCursor />}
      {bootDone && <SheetTransfer />}
      {!bootDone && <BootSequence onComplete={handleBootComplete} />}

      <div
        className="relative min-h-screen bg-print-deep text-ink font-sans antialiased overflow-x-clip"
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: "opacity 800ms ease",
        }}
      >
        <Navbar />
        <ScrollRuler />

        <main className="relative">
          {/* ── Sheet 01: the blueprint, pinned to the drafting table ── */}
          <div className="sticky top-0 h-[100svh] z-0">
            <Hero />
            <motion.div
              className="absolute inset-0 bg-print-deep pointer-events-none"
              style={{ opacity: heroDim }}
            />
          </div>

          {/* ── Sheets 02–06: the paper print slides over the blueprint ── */}
          <div className="relative z-10 bg-paper text-ink shadow-[0_-40px_120px_rgba(4,16,30,0.6)]">
            {/* Sheet tab peeking above the paper edge */}
            <div className="absolute -top-7 left-6 md:left-16 bg-paper border border-rule border-b-0 px-4 py-1.5 font-mono text-[9px] tracking-[0.3em] uppercase text-ink-soft select-none">
              SHEETS 02–06 · PRINTS
            </div>

            {/* Paper ground: millimeter grid + grain */}
            <div className="absolute inset-0 millimeter pointer-events-none" />
            <div className="absolute inset-0 paper-grain pointer-events-none" />

            <div className="relative">
              <ProjectsSection />
              <PhilosophySection />
            </div>

            {/* ── Colophon — revision history ── */}
            <footer className="relative bg-ink text-paper px-6 md:px-16 py-14">
              <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-[1fr_auto] items-end">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-paper/50">
                    REVISION HISTORY
                  </div>
                  <div className="mt-4 space-y-1.5 font-mono text-[10px] tracking-[0.12em] text-paper/40 uppercase">
                    {/* Revisions log themselves in, newest first */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, ease: motionConfig.ease }}
                    >
                      <span className="text-safety/80">REV C</span> — REDRAWN
                      IN FULL · 2026
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.12,
                        duration: 0.45,
                        ease: motionConfig.ease,
                      }}
                    >
                      <span className="text-paper/60">REV B</span> — CONTENT
                      UPDATED
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.24,
                        duration: 0.45,
                        ease: motionConfig.ease,
                      }}
                    >
                      <span className="text-paper/60">REV A</span> — FIRST
                      ISSUE
                    </motion.div>
                  </div>
                </div>

                <div className="flex items-center gap-8 font-mono text-[10px] tracking-[0.3em] uppercase">
                  <a
                    href={SOCIAL_LINKS.GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-paper/60 hover:text-safety transition-colors duration-200 border-b border-paper/20 hover:border-safety pb-px"
                  >
                    GITHUB ↗
                  </a>
                  <a
                    href={SOCIAL_LINKS.LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-paper/60 hover:text-safety transition-colors duration-200 border-b border-paper/20 hover:border-safety pb-px"
                  >
                    LINKEDIN ↗
                  </a>
                </div>
              </div>

              <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-paper/15 flex flex-col sm:flex-row justify-between gap-2 font-mono text-[9px] tracking-[0.3em] uppercase text-paper/35 select-none">
                <span>SFK — DRAWING SET · 6 SHEETS</span>
                <span>DO NOT MEASURE FROM THIS DRAWING</span>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </>
  );
}
