import { useEffect, useState } from "react";

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  "BIOS_INIT: memory check.................. [64GB OK]",
  "KERNEL: loading modules.................. [OK]",
  "NET: establishing secure tunnel.......... [OK]",
  "SYS: mounting portfolio filesystem....... [OK]",
  "OPERATOR_01: identity verified........... [OK]",
  "RENDER_ENGINE: initializing canvas....... [OK]",
  "VIDEO_CORE: calibrating timeline......... [OK]",
  "ALL SYSTEMS NOMINAL. LAUNCHING INTERFACE.",
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>/\\|[]{}";

function scramble(target: string, progress: number): string {
  return target
    .split("")
    .map((char, i) => {
      if (char === " ") return " ";
      if (i < Math.floor(progress * target.length)) return char;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    })
    .join("");
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [phase, setPhase] = useState<"cursor" | "lines" | "done">("cursor");
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);
  const [opacity, setOpacity] = useState(1);

  // Phase 1: show blinking cursor for 800ms then start lines
  useEffect(() => {
    const t = setTimeout(() => setPhase("lines"), 900);
    return () => clearTimeout(t);
  }, []);

  // Phase 2: render lines one by one with scramble effect
  useEffect(() => {
    if (phase !== "lines") return;
    if (lineIndex >= BOOT_LINES.length) {
      // All lines done — pause then fade out
      const t = setTimeout(() => {
        setOpacity(0);
        setTimeout(onComplete, 600);
      }, 500);
      return () => clearTimeout(t);
    }

    const target = BOOT_LINES[lineIndex];
    let progress = 0;
    let frame: number;

    const animate = () => {
      progress = Math.min(progress + 0.06, 1);
      setCurrentLine(scramble(target, progress));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        // Line resolved — commit it and move to next
        setVisibleLines((prev) => [...prev, target]);
        setCurrentLine("");
        setLineProgress(0);
        setTimeout(() => setLineIndex((i) => i + 1), 80);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [phase, lineIndex]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#020203] flex flex-col items-start justify-center px-8 md:px-16 font-mono"
      style={{
        opacity,
        transition: "opacity 600ms ease",
        pointerEvents: opacity < 0.5 ? "none" : "all",
        cursor: "none",
      }}
    >
      {/* Subtle scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
        }}
      />

      <div className="w-full max-w-2xl space-y-1">
        {/* Header */}
        <div className="text-[10px] text-zinc-600 tracking-[0.4em] uppercase mb-6">
          OPERATOR_SYSTEM // BOOT_SEQUENCE_v4.2
        </div>

        {/* Resolved lines */}
        {visibleLines.map((line, i) => (
          <div
            key={i}
            className="text-[11px] text-zinc-600 tracking-wider leading-relaxed"
          >
            <span className="text-zinc-700 mr-3">{">"}</span>
            {line}
          </div>
        ))}

        {/* Currently animating line */}
        {currentLine && (
          <div className="text-[11px] text-amber-500/80 tracking-wider leading-relaxed">
            <span className="text-amber-600 mr-3">{">"}</span>
            {currentLine}
          </div>
        )}

        {/* Blinking cursor — shown before lines start */}
        {phase === "cursor" && (
          <div className="text-[11px] text-amber-500 tracking-wider">
            <span className="mr-3">{">"}</span>
            <span className="animate-pulse">█</span>
          </div>
        )}

        {/* Final ready state cursor */}
        {visibleLines.length === BOOT_LINES.length && (
          <div className="text-[11px] text-cyan-400 tracking-wider mt-2">
            <span className="mr-3">{">"}</span>
            INTERFACE READY
            <span className="ml-1 animate-pulse">_</span>
          </div>
        )}
      </div>
    </div>
  );
}
