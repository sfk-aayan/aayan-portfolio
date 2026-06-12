import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { motionConfig } from "../../lib/motionConfig";

export interface SheetTransferDetail {
  targetId: string;
  sheetNo: string;
  label: string;
}

const TRANSFER_EVENT = "sheet-transfer";

// How long the destination sits covered before the carrier moves off
const HOLD_MS = 240;

/**
 * Navigate by changing sheets, not by scrolling: a blueprint carrier
 * sweeps across the table, the set is flipped underneath it, and the
 * carrier continues off the other side. One continuous left-to-right
 * pass, led and trailed by the pen.
 */
export function requestSheetTransfer(detail: SheetTransferDetail) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    jumpToSheet(detail.targetId);
    return;
  }
  window.dispatchEvent(
    new CustomEvent<SheetTransferDetail>(TRANSFER_EVENT, { detail }),
  );
}

function jumpToSheet(targetId: string) {
  // The hero is sticky-pinned, so its rect reads as "here" at any
  // scroll position — sheet 01 always means the top of the set.
  if (targetId === "section-hero") {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    return;
  }
  const el = document.getElementById(targetId);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
}

export default function SheetTransfer() {
  const [job, setJob] = useState<SheetTransferDetail | null>(null);
  const [phase, setPhase] = useState<"cover" | "reveal">("cover");
  const busy = useRef(false);

  useEffect(() => {
    const onRequest = (e: Event) => {
      if (busy.current) return;
      busy.current = true;
      setPhase("cover");
      setJob((e as CustomEvent<SheetTransferDetail>).detail);
    };
    window.addEventListener(TRANSFER_EVENT, onRequest);
    return () => window.removeEventListener(TRANSFER_EVENT, onRequest);
  }, []);

  if (!job) return null;

  const sweep = {
    duration: phase === "cover" ? 0.42 : 0.5,
    ease: motionConfig.drawEase,
  };

  return (
    <div className="fixed inset-0 z-[8000] pointer-events-none" aria-hidden>
      {/* The carrier — clip wipes in from the left, then off to the right */}
      <motion.div
        className="absolute inset-0 bg-print text-chalk overflow-hidden"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={
          phase === "cover"
            ? { clipPath: "inset(0 0% 0 0%)" }
            : { clipPath: "inset(0 0% 0 100%)" }
        }
        transition={sweep}
        onAnimationComplete={() => {
          if (phase === "cover") {
            jumpToSheet(job.targetId);
            window.setTimeout(() => setPhase("reveal"), HOLD_MS);
          } else {
            busy.current = false;
            setJob(null);
          }
        }}
      >
        <div className="absolute inset-0 millimeter-chalk" />
        <div className="absolute inset-4 md:inset-6 border border-chalk/20" />

        {/* Corner registration crosses */}
        {[
          "top-6 left-6 md:top-9 md:left-9",
          "top-6 right-6 md:top-9 md:right-9",
          "bottom-6 left-6 md:bottom-9 md:left-9",
          "bottom-6 right-6 md:bottom-9 md:right-9",
        ].map((pos) => (
          <svg
            key={pos}
            viewBox="0 0 16 16"
            className={`absolute w-4 h-4 text-chalk/40 ${pos}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <line x1="8" y1="0" x2="8" y2="16" />
            <line x1="0" y1="8" x2="16" y2="8" />
          </svg>
        ))}

        {/* Destination plate */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 select-none">
          <div className="font-mono text-[9px] tracking-[0.5em] uppercase text-chalk-faint">
            DRAWING SET — TRANSFER
          </div>
          <div className="ghost-numeral-chalk font-display font-light text-[110px] md:text-[150px] leading-none">
            {job.sheetNo}
          </div>
          <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.35em] uppercase text-chalk-soft whitespace-nowrap">
            <span className="inline-block w-7 h-px bg-safety" />
            <span>
              SHEET {job.sheetNo} · {job.label}
            </span>
            <span className="inline-block w-7 h-px bg-safety" />
          </div>
        </div>
      </motion.div>

      {/* The pen — leads the cover sweep, trails the reveal sweep */}
      <motion.div
        key={phase}
        className="absolute top-0 bottom-0 w-[2px] bg-safety"
        initial={{ left: "-1%" }}
        animate={{ left: "100%" }}
        transition={sweep}
      />
    </div>
  );
}
