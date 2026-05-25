import { useState, useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#<>/\\[]";

export function useScrambleText(target: string): string {
  const [display, setDisplay] = useState(target);
  const targetRef = useRef(target);

  useEffect(() => {
    if (target === targetRef.current) return;
    targetRef.current = target;

    let frame: number;
    let progress = 0;

    const animate = () => {
      progress = Math.min(progress + 0.07, 1);
      const scrambled = target
        .split("")
        .map((char, i) => {
          if (char === "_" || char === "[" || char === "]" || char === " ")
            return char;
          if (i < Math.floor(progress * target.length)) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setDisplay(scrambled);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return display;
}
