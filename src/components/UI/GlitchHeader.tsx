import { motion } from "motion/react";
import { motionConfig } from "../../lib/motionConfig";
import type { GlitchHeaderProps } from "../../types";

/**
 * Plate header — every sheet in the drawing set opens with one.
 * (File keeps its historical name; the glitch era is over.)
 *
 * `node` is expected in the form "SHEET 0X · LABEL"; the sheet number
 * is echoed as a giant outline numeral in the margin.
 */
export const GlitchHeader = ({
  title,
  subtitle,
  node,
  color = "amber",
}: GlitchHeaderProps) => {
  const accent =
    color === "amber"
      ? "text-safety"
      : color === "cyan"
        ? "text-draft"
        : "text-ink";

  const sheetNo = node.match(/(\d+)/)?.[1] ?? "";

  return (
    <header className="relative mb-14 md:mb-16 select-none">
      {/* Ghost sheet numeral in the margin */}
      {sheetNo && (
        <motion.span
          aria-hidden="true"
          className="ghost-numeral absolute -top-8 right-0 font-display font-light text-[110px] md:text-[150px] leading-none pointer-events-none"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: motionConfig.ease }}
        >
          {sheetNo.padStart(2, "0")}
        </motion.span>
      )}

      <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.4em] uppercase text-ink-faint">
        <span className={`inline-block w-8 h-px bg-current ${accent}`} />
        <span>{node}</span>
      </div>

      <h2 className="relative z-10 mt-4 font-display font-light tracking-tight text-ink text-4xl md:text-6xl leading-[1.02]">
        {title}
      </h2>

      {/* The rule draws itself across the sheet, with end ticks */}
      <div className="relative mt-6 h-px">
        <motion.div
          className="absolute inset-y-0 left-0 w-full bg-ink/70 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: motionConfig.drawEase }}
        />
        <span className="absolute left-0 -top-[4px] h-[9px] w-px bg-ink/70 rotate-45" />
        <motion.span
          className="absolute right-0 -top-[4px] h-[9px] w-px bg-ink/70 rotate-45"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.9, duration: 0.2 }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between font-mono text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-ink-soft">
        <span>{subtitle}</span>
        <span className={`hidden sm:inline ${accent}`}>REV C</span>
      </div>
    </header>
  );
};
