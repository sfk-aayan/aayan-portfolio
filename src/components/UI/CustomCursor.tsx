import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

// Slight lag on the coordinate readout — the label trails the pen
const SPRING_CONFIG = { damping: 30, stiffness: 400 };

export default function CustomCursor({
  isHovered = false,
}: {
  isHovered?: boolean;
}) {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const labelX = useSpring(cursorX, SPRING_CONFIG);
  const labelY = useSpring(cursorY, SPRING_CONFIG);

  // Live station readout, like a digital readout on a drafting machine
  const coords = useTransform(() => {
    const x = Math.max(0, Math.round(cursorX.get()));
    const y = Math.max(0, Math.round(cursorY.get()));
    return `x ${String(x).padStart(4, "0")} · y ${String(y).padStart(4, "0")}`;
  });

  useEffect(() => {
    // Crosshair only makes sense with a precise pointer
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    // The pen lifts over anything interactive
    const senseTarget = (e: MouseEvent) => {
      const target = e.target as Element | null;
      setHovering(Boolean(target?.closest?.("a, button")));
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", senseTarget);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", senseTarget);
    };
  }, []); // Motion Values are stable refs — empty dep array is correct

  if (!enabled) return null;

  return (
    <>
      {/* Full-viewport hairlines — blend-difference so they read on
          both the blueprint and the paper */}
      <motion.div
        className="fixed top-0 left-0 h-screen w-px bg-white/45 mix-blend-difference z-[9997] pointer-events-none"
        style={{ x: cursorX }}
      />
      <motion.div
        className="fixed top-0 left-0 w-screen h-px bg-white/45 mix-blend-difference z-[9997] pointer-events-none"
        style={{ y: cursorY }}
      />

      {/* Pen position — ring + point */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
        animate={{ scale: isHovered || hovering ? 1.7 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 26 }}
      >
        <div className="w-5 h-5 rounded-full border border-white/70 mix-blend-difference" />
        <div className="absolute w-[3px] h-[3px] rounded-full bg-safety" />
      </motion.div>

      {/* Coordinate readout, trailing the pen */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none font-mono text-[9px] tracking-[0.15em] text-white/80 mix-blend-difference whitespace-nowrap tabular-nums"
        style={{
          x: labelX,
          y: labelY,
          translateX: "14px",
          translateY: "16px",
        }}
      >
        <motion.span>{coords}</motion.span>
      </motion.div>
    </>
  );
}
