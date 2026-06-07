import { useState, useRef } from "react";
import { Terminal, Cpu, Activity, ArrowRight } from "lucide-react";
import { SystemModule } from "../../types";

export default function ProjectCard({ module }: { module: SystemModule }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    // Calculate mouse position relative to the card for the spotlight effect
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative p-8 mb-12 bg-zinc-950/20 border border-zinc-900 transition-all duration-500 hover:border-cyan-500/40 clip-tech-corners"
    >
      {/* DYNAMIC SPOTLIGHT: Uses mouse tracking for that holographic depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6,182,212,0.06), transparent 40%)`,
        }}
      />

      {/* SCANLINE SWEEP: Utilizing your existing @keyframes scanSweep */}
      <div className="absolute left-0 w-full h-[2px] bg-cyan-500/10 opacity-0 group-hover:opacity-100 group-hover:animate-[scanSweep_2.5s_ease-in-out_infinite] z-20" />

      <div className="relative z-10 flex flex-col lg:flex-row gap-10">
        {/* MODULE IDENTIFIER */}
        <div className="lg:w-1/3 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-zinc-900/50 rounded-sm border border-zinc-800 group-hover:border-amber-500/50 transition-colors">
              <Cpu size={18} className="text-amber-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-zinc-500 tracking-[0.3em] uppercase">
                Module_ID
              </span>
              <span className="text-sm font-mono text-cyan-400 font-bold tracking-widest">
                {module.id}
              </span>
            </div>
          </div>

          <h3 className="text-3xl font-display font-light text-zinc-100 group-hover:text-cyan-400 transition-colors duration-300">
            {module.title}
          </h3>

          <div className="flex flex-wrap gap-2">
            {module.metrics.slice(0, 2).map((metric, i) => (
              <div
                key={i}
                className="px-3 py-1 bg-zinc-900/40 border border-zinc-800 clip-tech-sm"
              >
                <span className="text-[8px] font-mono text-zinc-500 block uppercase">
                  {metric.label}
                </span>
                <span className="text-[10px] font-mono text-zinc-300">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* DATA READOUT */}
        <div className="lg:w-2/3 space-y-6">
          <p className="text-zinc-400 font-sans font-light leading-relaxed max-w-xl">
            {module.description}
          </p>

          {/* TECH EXECUTION LOG: Using your existing monospace variables */}
          <div className="bg-black/40 border border-zinc-900 p-5 clip-tech-sm group-hover:bg-black/60 transition-colors">
            <div className="flex items-center space-x-2 text-[9px] font-mono text-zinc-600 mb-4 tracking-tighter">
              <Terminal size={12} className="text-cyan-500" />
              <span>SYSTEM_EXECUTION_STDOUT</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              {module.technicalBreakdown.map((point, idx) => (
                <li key={idx} className="flex items-start space-x-3 group/item">
                  <span className="text-cyan-500/50 font-mono text-xs group-hover/item:text-cyan-400 transition-colors">
                    0{idx + 1}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400 group-hover/item:text-zinc-200 transition-colors leading-tight">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ACTION FOOTER */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-900/50">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-mono text-emerald-500/80 tracking-widest uppercase">
                  Operational
                </span>
              </div>
              <span className="text-zinc-800 font-mono text-xs">|</span>
              <div className="flex items-center space-x-2">
                <Activity size={12} className="text-zinc-600" />
                <span className="text-[9px] font-mono text-zinc-600 uppercase">
                  Load: 1.02ms
                </span>
              </div>
            </div>

            {module.link ? (
              <a target="_blank" rel="noopener noreferrer" href={module.link}>
                <button className="flex items-center space-x-2 group/btn text-cyan-400 hover:text-white transition-all">
                  <span className="text-[10px] font-mono tracking-widest uppercase">
                    Access_System
                  </span>
                  <ArrowRight
                    size={14}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </a>
            ) : (
              <div className="flex items-center space-x-2 text-gray-500">
                <span className="text-[10px] font-mono tracking-widest uppercase">
                  Restricted
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
