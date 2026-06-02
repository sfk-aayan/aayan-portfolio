import React, { useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

// Stable outside component — no recreation on re-render
const SPRING_CONFIG = { damping: 25, stiffness: 250 };

const SpinningNotch = React.memo(() => (
  <div className="w-full h-full border-t-2 border-cyan-400 rounded-full animate-spin [animation-duration:3s]" />
));

export default function CustomCursor({
  isHovered = false,
}: {
  isHovered?: boolean;
}) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const smoothedX = useSpring(cursorX, SPRING_CONFIG);
  const smoothedY = useSpring(cursorY, SPRING_CONFIG);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      style.remove();
    };
  }, []); // Motion Values are stable refs — empty dep array is correct

  return (
    <>
      {/* Core point — follows cursor exactly */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-amber-500 rounded-full z-[9999] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      />

      {/* Lagging HUD ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-amber-500/30 rounded-full z-[9998] pointer-events-none flex items-center justify-center"
        style={{
          x: smoothedX,
          y: smoothedY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
        animate={{
          scale: isHovered ? 2 : 1,
          borderColor: isHovered
            ? "rgba(34, 211, 238, 0.5)"
            : "rgba(245, 158, 11, 0.3)",
        }}
      >
        <SpinningNotch />
      </motion.div>
    </>
  );
}
