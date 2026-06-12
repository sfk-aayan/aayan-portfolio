import React from "react";
import { useScanReveal } from "../../hooks/useScanReveal";
import type { ScanRevealProps } from "../../types";

/**
 * Plot reveal — a pen hairline sweeps left to right and the content
 * inks in behind it, the way a plotter lays down a figure.
 */
export default function ScanReveal({
  children,
  className = "",
  delay = 0,
  color = "cyan",
}: ScanRevealProps) {
  const { ref, hasRevealed } = useScanReveal({ threshold: 0.15, delay });

  // Pen colors: "amber" → safety orange, "cyan" → drafting blue
  const penColor = color === "amber" ? "bg-safety" : "bg-draft";

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative ${className}`}
    >
      {/* Content inks in from the left edge */}
      <div
        style={{
          clipPath: hasRevealed ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          transition: "clip-path 950ms cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        {children}
      </div>

      {/* The pen — a vertical hairline crossing the figure once */}
      {hasRevealed && (
        <div
          className={`absolute top-0 bottom-0 w-px ${penColor} pointer-events-none z-20`}
          style={{
            animation: "plot-sweep 950ms cubic-bezier(0.65, 0, 0.35, 1) forwards",
          }}
        />
      )}
    </div>
  );
}
