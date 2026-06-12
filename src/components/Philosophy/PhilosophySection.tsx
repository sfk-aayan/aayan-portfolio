import { PHILOSOPHY_NODES } from "../../data";
import { useLiveUTC } from "../../hooks/useLiveUTC";
import { GlitchHeader } from "../UI/GlitchHeader";
import ScanReveal from "../UI/ScanReveal";

/**
 * Sheet 06 — General Notes. Every drawing set closes with them:
 * numbered notes, terse references, time of issue.
 */
export default function PhilosophySection() {
  const liveUTC = useLiveUTC(500);

  return (
    <section
      id="section-philosophy"
      className="px-6 md:px-16 pt-24 md:pt-32 pb-24 md:pb-32 relative"
    >
      <div className="max-w-6xl mx-auto">
        <GlitchHeader
          title="Core Principles"
          subtitle="HOW I BUILD — WHAT I VALUE"
          node="SHEET 06 · GENERAL NOTES"
          color="emerald"
        />

        <ScanReveal color="amber">
          <div className="grid md:grid-cols-3 gap-px bg-ink/20 border border-ink/20">
            {PHILOSOPHY_NODES.map((node, index) => (
              <div
                key={index}
                className="relative bg-paper p-8 md:p-10 flex flex-col group hover:bg-vellum/70 transition-colors duration-500"
              >
                {/* Corner brackets register the note under inspection */}
                <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-safety opacity-0 scale-50 origin-top-left group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none" />
                <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-safety opacity-0 scale-50 origin-bottom-right group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none" />

                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-safety">
                  N{index + 1} — {node.title}
                </div>

                <h3 className="mt-5 font-display font-light italic text-2xl md:text-[26px] leading-snug text-ink">
                  {node.principle}
                </h3>

                <p className="mt-5 text-[13px] leading-relaxed text-ink-soft flex-1">
                  {node.description}
                </p>

                <div className="mt-9 pt-4 border-t border-ink/15 font-mono text-[9px] tracking-[0.18em] uppercase text-ink-faint group-hover:text-ink-soft transition-colors duration-300">
                  REF — {node.metric}
                </div>
              </div>
            ))}
          </div>
        </ScanReveal>

        {/* Time of issue */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between gap-3 font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-ink-faint">
          <span className="tabular-nums">
            TIME OF ISSUE — <span className="text-ink-soft">{liveUTC}</span>
          </span>
          <span>NO DECORATIVE CYCLES ALLOWED</span>
        </div>
      </div>
    </section>
  );
}
