import type { GlitchHeaderProps } from "../../types";

export const GlitchHeader = ({
  title,
  subtitle,
  node,
  color = "amber",
}: GlitchHeaderProps) => {
  const glowColor =
    color === "amber" ? "#f59e0b" : color === "cyan" ? "#06b6d4" : "#10b981";

  return (
    <div className="flex flex-col space-y-3 group/header mb-8 glitch-header-track">
      {/* Node tag with pulsing hardware status LED */}
      <span className="flex items-center space-x-2 text-[10px] tracking-[0.5em] font-mono text-zinc-500 uppercase select-none">
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{
            backgroundColor: glowColor,
            boxShadow: `0 0 8px ${glowColor}`,
          }}
        />
        <span>{node}</span>
      </span>

      <div className="relative inline-block cursor-default select-none">
        {/* Main Text: Higher z-index to stay legible during distortion */}
        <h2 className="text-3xl font-light tracking-tight text-zinc-200 font-display relative z-10 group-hover/header:text-white transition-colors duration-300">
          {title}
        </h2>

        {/* Glitch Layers: 
            These reference the .glitch-layer-cyan and .glitch-layer-amber 
            classes in your global CSS.
        */}
        <span
          className="glitch-layer-cyan absolute top-0 left-0 text-3xl font-light font-display blur-[0.5px] z-0 opacity-0 pointer-events-none"
          aria-hidden="true"
        >
          {title}
        </span>
        <span
          className="glitch-layer-amber absolute top-0 left-0 text-3xl font-light font-display blur-[0.5px] z-0 opacity-0 pointer-events-none"
          aria-hidden="true"
        >
          {title}
        </span>
      </div>

      {/* Subtitle/Sub-header data */}
      <div className="font-mono text-[9px] text-zinc-600 tracking-[0.2em] uppercase select-none group-hover/header:text-zinc-300 transition-colors duration-500">
        {subtitle}
      </div>
    </div>
  );
};
