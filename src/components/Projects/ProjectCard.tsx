import { SystemModule } from "../../types";
import { Terminal, Cpu, Activity } from "lucide-react";

interface ProjectCardProps {
  module: SystemModule;
}

export default function ProjectCard({ module }: ProjectCardProps) {
  const isHealthy =
    module.status === "ACTIVE" || module.status === "OPERATIONAL";

  return (
    <div
      id={`module-node-${module.id.toLowerCase()}`}
      className="group relative border-t border-zinc-900/70 py-12 md:py-16 transition-all duration-500 hover:bg-[#070708]/30 hover:border-zinc-800 px-4 md:px-6 rounded"
    >
      {/* Subtle hover background accent lines */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/0 via-zinc-950/5 to-amber-950/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute top-0 right-0 w-px h-0 bg-gradient-to-b from-cyan-500 to-transparent group-hover:h-full transition-all duration-700 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-px h-0 bg-gradient-to-t from-amber-500 to-transparent group-hover:h-full transition-all duration-700 pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
        {/* Core Metadata Segment */}
        <div className="lg:w-1/3 flex flex-col space-y-4">
          {/* Module Identifier Code */}
          <div className="flex items-center space-x-2 text-[10px] tracking-[0.3em] font-mono text-zinc-500 select-none">
            <span className="text-cyan-500 font-semibold">[{module.id}]</span>
            <span className="text-zinc-700">//</span>
            <span>{module.category}</span>
          </div>

          {/* Module Title */}
          <h3 className="text-xl md:text-2xl font-light tracking-tight text-zinc-100 font-display group-hover:text-amber-500 transition-colors duration-300">
            {module.title}
          </h3>

          {/* Module Health Check Status Lines */}
          <div className="flex items-center space-x-4 text-[10px] tracking-widest font-mono text-zinc-500">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isHealthy ? "bg-emerald-500" : "bg-rose-500"} opacity-75`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${isHealthy ? "bg-emerald-500" : "bg-rose-500"}`}
                ></span>
              </span>
              <span
                className={`uppercase font-semibold ${isHealthy ? "text-emerald-500" : "text-rose-500"}`}
              >
                {module.status}
              </span>
            </div>
            <span className="text-zinc-800">|</span>
            <div className="flex items-center space-x-1.5">
              <Cpu size={10} className="text-cyan-500" />
              <span>
                REV:{" "}
                <span className="text-cyan-400 font-semibold">
                  {module.version}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Detailed System Specifications */}
        <div className="lg:w-2/3 flex flex-col space-y-6">
          {/* Functional system summary */}
          <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed max-w-[600px] font-sans">
            {module.description}
          </p>

          {/* System breakdown schematics */}
          <div className="space-y-4 pt-5 border-t border-zinc-900 w-full max-w-[600px]">
            <div className="flex items-center space-x-2 text-[10px] tracking-widest font-mono text-zinc-500 uppercase select-none">
              <Terminal size={11} className="text-amber-500" />
              <span>TECHNICAL_EXECUTION_LOG // SH_STDOUT</span>
            </div>

            <div className="bg-[#040405] border border-zinc-900/80 p-4 rounded clip-tech-corners font-mono text-xs text-zinc-400 space-y-3.5 group-hover:border-zinc-800 transition-colors duration-300">
              <ul className="space-y-3.5 leading-relaxed">
                {module.technicalBreakdown.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-amber-500/80 font-semibold shrink-0 select-none">
                      $ [{index + 1}]
                    </span>
                    <span className="text-zinc-300 font-light group-hover:text-zinc-200 transition-colors duration-200">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Micro telemetry performance metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-[600px]">
            {module.metrics.map((metric, index) => (
              <div
                key={index}
                className="border-l-2 border-cyan-500/80 pl-4 py-2.5 flex flex-col space-y-1.5 bg-[#070708]/40 border-y border-r border-zinc-900/60 rounded-r clip-tech-sm transition-all duration-300 group-hover:border-zinc-800/80 hover:bg-[#070709]/80"
              >
                <div className="flex items-center space-x-1.5 text-[9px] tracking-widest font-mono text-zinc-500 uppercase select-none">
                  <Activity size={10} className="text-zinc-600" />
                  <span>{metric.label}</span>
                </div>
                <span className="text-zinc-200 font-mono text-sm font-semibold tracking-wider glow-text-cyan">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
