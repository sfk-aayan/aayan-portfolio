import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);

  // Use Motion Values for hardware acceleration
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Add spring physics for that "smooth/heavy" feel
  const springConfig = { damping: 25, stiffness: 250 };
  const smoothedX = useSpring(cursorX, springConfig);
  const smoothedY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      {/* The Core Point */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-amber-500 rounded-full z-[9999] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* The Lagging HUD Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-amber-500/30 rounded-full z-[9998] pointer-events-none flex items-center justify-center"
        style={{
          x: smoothedX,
          y: smoothedY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 2 : 1,
          borderColor: isHovered
            ? "rgba(34, 211, 238, 0.5)"
            : "rgba(245, 158, 11, 0.3)",
        }}
      >
        {/* Optional: Add a tiny rotating notch */}
        <div className="w-full h-full border-t-2 border-cyan-400 rounded-full animate-spin [animation-duration:3s]" />
      </motion.div>
    </>
  );
}
