import { motion } from "motion/react";
import { SystemModule } from "../../types";

/**
 * A figure plate: ghost numeral and data table in the margin,
 * leader-line callouts for the technical breakdown, and the status
 * applied as a rubber stamp.
 */
export default function ProjectCard({
  module,
  index = 0,
}: {
  module: SystemModule;
  index?: number;
}) {
  const figNo = String(index + 1).padStart(2, "0");

  return (
    <article className="group grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-12 border-t border-ink/15 py-14 md:py-16 first-of-type:border-t-0">
      {/* ── Margin column ── */}
      <aside className="flex flex-row lg:flex-col flex-wrap items-start gap-x-10 gap-y-6">
        <div>
          <div className="ghost-numeral font-display font-light text-[72px] leading-none select-none">
            {figNo}
          </div>
          <div className="mt-3 font-mono text-[9px] tracking-[0.3em] uppercase text-ink-soft">
            FIG. {figNo} — DETAIL {figNo}
          </div>
          <div className="mt-1.5 font-mono text-[9px] tracking-[0.2em] uppercase text-draft">
            {module.category}
          </div>
        </div>

        {/* Metrics table */}
        <dl className="border border-ink/25 min-w-[170px]">
          {module.metrics.map((metric, i) => (
            <div
              key={i}
              className="px-3 py-2 border-b border-ink/15 last:border-b-0"
            >
              <dt className="font-mono text-[8px] tracking-[0.2em] uppercase text-ink-faint">
                {metric.label}
              </dt>
              <dd className="font-mono text-[11px] text-ink mt-0.5">
                {metric.value}
              </dd>
            </div>
          ))}
          <div className="px-3 py-2 border-t border-ink/15">
            <dt className="font-mono text-[8px] tracking-[0.2em] uppercase text-ink-faint">
              Version
            </dt>
            <dd className="font-mono text-[11px] text-ink mt-0.5">
              {module.version}
            </dd>
          </div>
        </dl>

        {/* Status, stamped on the sheet — the stamp lands when scrolled into view */}
        <motion.div
          initial={{ opacity: 0, scale: 1.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="stamp -rotate-6 group-hover:-rotate-3 transition-transform duration-500">
            {module.status}
          </div>
        </motion.div>
      </aside>

      {/* ── Figure body ── */}
      <div>
        <h3 className="font-display font-light text-[26px] md:text-4xl leading-tight text-ink group-hover:text-draft transition-colors duration-500 max-w-2xl">
          {module.title}
        </h3>

        <p className="mt-5 text-[14px] md:text-[15px] leading-relaxed text-ink-soft max-w-2xl">
          {module.description}
        </p>

        {/* Numbered callouts with leader lines */}
        <ul className="mt-10 space-y-5 max-w-2xl">
          {module.technicalBreakdown.map((point, idx) => (
            <li
              key={idx}
              className="grid grid-cols-[52px_1fr] gap-4 items-start group/callout"
            >
              <span className="flex items-center mt-[2px]">
                <span className="w-[22px] h-[22px] shrink-0 rounded-full border border-ink/40 flex items-center justify-center font-mono text-[9px] text-ink group-hover/callout:border-safety group-hover/callout:text-safety transition-colors duration-200 tabular-nums">
                  {idx + 1}
                </span>
                <span className="h-px flex-1 bg-ink/25 group-hover/callout:bg-safety/50 transition-colors duration-200" />
              </span>
              <span className="text-[13px] leading-relaxed text-ink-soft group-hover/callout:text-ink transition-colors duration-200">
                {point}
              </span>
            </li>
          ))}
        </ul>

        {/* Plate footer */}
        <div className="mt-10 pt-5 border-t border-ink/15 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] uppercase">
          <span className="text-ink-faint">
            DETAIL {figNo} / SCALE NTS
          </span>
          {module.link ? (
            <a
              href={module.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/see text-draft border-b border-draft/40 hover:border-draft pb-px transition-colors"
            >
              SEE DRAWING{" "}
              <span className="inline-block transition-transform duration-200 group-hover/see:translate-x-0.5 group-hover/see:-translate-y-0.5">
                ↗
              </span>
            </a>
          ) : (
            <span className="text-ink-faint">RESTRICTED — INTERNAL</span>
          )}
        </div>
      </div>
    </article>
  );
}
