import React, { useEffect, useState } from "react";
import { BACKEND_PROFILE } from "../../data";
import { Terminal, Shield, Cpu, ChevronDown } from "lucide-react";

export default function Hero() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);

  // Simulate terminal boot sequence on mount
  const BOOT_LOG = [
    "> initializing FastAPI application server... [OK]",
    "> binding DRF API gateway interfaces... [OK]",
    "> loading Cloud Infrastructure Services... [OK]",
    "> n8n workflow orchestrator: online... [ACTIVE]",
    "> user@sfk:~$ _",
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LOG.length) {
        setBootLines((prev) => [...prev, BOOT_LOG[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 320);
    return () => clearInterval(interval);
  }, []);

  // Occasional glitch flicker on the name
  useEffect(() => {
    const trigger = () => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
    };
    const id = setInterval(trigger, 6000 + Math.random() * 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="section-hero"
      className="relative w-full min-h-screen flex flex-col justify-between px-6 py-0 md:px-12 select-none bg-transparent overflow-hidden"
    >
      {/* ── Top Header ── */}
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row md:items-start justify-between gap-6 pt-24 lg:pt-28 relative z-30">
        {/* Name + Title Block */}
        <div className="flex flex-col space-y-3 max-w-lg">
          <span className="flex items-center space-x-2 text-[10px] tracking-[0.45em] font-mono text-zinc-500 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span>SYS_LOC // PORT_3000 // ACTIVE</span>
          </span>

          {/* Main Name — large, bold, glitch effect */}
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight font-display leading-none ${
              glitchActive ? "hover-glitch text-amber-400" : "text-zinc-100"
            } transition-colors duration-150`}
          >
            {BACKEND_PROFILE.name.split(" // ")[0]}
          </h1>

          {/* Sub-label from name after // */}
          {BACKEND_PROFILE.name.includes(" // ") && (
            <div className="text-[11px] font-mono text-amber-500/70 tracking-[0.35em] uppercase font-medium">
              {BACKEND_PROFILE.name.split(" // ")[1]}
            </div>
          )}

          <h2 className="text-sm md:text-base font-mono text-cyan-400 uppercase tracking-widest font-normal pt-1">
            {BACKEND_PROFILE.title}
          </h2>
        </div>

        {/* System Status Widget */}
        <div className="flex items-center gap-4 text-[9px] tracking-widest font-mono text-zinc-500 border border-zinc-800/50 bg-zinc-950/60 backdrop-blur-sm hover:border-amber-500/20 transition-colors duration-500 p-3 rounded clip-tech-sm self-start mt-1">
          <div className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors duration-200 cursor-default">
            <Cpu size={9} className="text-amber-500" />
            <span>CORE: ACTIVE</span>
          </div>
          <span className="text-zinc-800">|</span>
          <div className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors duration-200 cursor-default">
            <Shield size={9} className="text-emerald-500" />
            <span>SYS: SECURE</span>
          </div>
          <span className="text-zinc-800">|</span>
          <div className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors duration-200 cursor-default">
            <span className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" />
            <span>UPTIME: 99.98%</span>
          </div>
        </div>
      </div>

      {/* ── Bottom: Terminal Boot Log + Scroll Prompt ── */}
      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-end justify-between gap-6 pb-10 relative z-30">
        {/* Terminal Boot Log */}
        <div className="w-full lg:w-auto bg-[#030304]/90 border border-zinc-900 p-4 rounded-md font-mono text-[9px] text-zinc-500 max-w-sm relative overflow-hidden">
          <style>{`
            @keyframes scan-sweep {
              0% { top: -40%; }
              100% { top: 100%; }
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}</style>
          <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent h-[40%] animate-[scan-sweep_3s_ease-in-out_infinite]" />
          <div className="flex items-center space-x-2 text-zinc-400 tracking-wider mb-2.5 uppercase font-semibold border-b border-zinc-900 pb-2">
            <Terminal size={10} className="text-amber-500" />
            <span>WORKSPACE // INIT_LOG</span>
          </div>
          <div className="space-y-1 leading-relaxed">
            {bootLines.map((line, i) => (
              <div
                key={i}
                className={`opacity-0 animate-[fadeIn_200ms_ease-out_forwards] ${
                  i === bootLines.length - 1
                    ? "text-amber-500/80 font-semibold terminal-cursor"
                    : "text-zinc-600"
                }`}
              >
                {line}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Prompt */}
        <div className="flex flex-col items-center space-y-2 select-none pointer-events-none">
          <p className="text-[9px] tracking-[0.4em] font-mono text-zinc-500 uppercase">
            SCROLL TO INITIATE JOURNAL
          </p>
          <div className="relative w-px h-8 bg-gradient-to-b from-zinc-700 to-transparent mx-auto">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-500/50 animate-bounce" />
          </div>
          <ChevronDown size={12} className="text-zinc-700 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
