import React from "react";
import { useScanReveal } from "../../hooks/useScanReveal";
import type { ScanRevealProps } from "../../types";

export default function ScanReveal({
  children,
  className = "",
  delay = 0,
  color = "cyan",
}: ScanRevealProps) {
  const { ref, hasRevealed } = useScanReveal({ threshold: 0.15, delay });

  const scanColor =
    color === "amber"
      ? "from-transparent via-amber-500/60 to-transparent"
      : "from-transparent via-cyan-500/60 to-transparent";

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Content — fades in as scan passes */}
      <div
        className="transition-opacity duration-300"
        style={{ opacity: hasRevealed ? 1 : 0 }}
      >
        {children}
      </div>

      {/* Scan line — sweeps top to bottom then disappears */}
      {hasRevealed && (
        <div
          className={`absolute inset-x-0 h-[2px] bg-gradient-to-r ${scanColor} pointer-events-none z-30`}
          style={{
            animation: "scanSweep 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards",
          }}
        />
      )}

      {/* Pre-reveal dim overlay — peels away with scan */}
      <div
        className="absolute inset-0 bg-zinc-950/80 pointer-events-none z-20 transition-opacity duration-100"
        style={{
          opacity: hasRevealed ? 0 : 1,
          transitionDelay: hasRevealed ? "500ms" : "0ms",
        }}
      />
    </div>
  );
}
