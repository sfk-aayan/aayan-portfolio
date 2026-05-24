import { useState, useEffect } from "react";
import { Shield, Cpu } from "lucide-react";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [systemTime, setSystemTime] = useState("");

  useEffect(() => {
    function handleScroll() {
      // Hide the navbar rapidly when user scrolls past 60px to clear viewport space
      if (window.scrollY > 60) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }

    // Dynamic digital clock update simulating microsecond clock syncing
    const timer = setInterval(() => {
      const d = new Date();
      const timeStr = d.toISOString().replace("T", " ").substring(0, 19) + "Z";
      setSystemTime(timeStr);
    }, 1000);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, []);

  return (
    <nav
      id="sys-nav"
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 pointer-events-none select-none transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto bg-[#070708]/75 backdrop-blur-md border border-zinc-800/60 px-5 py-3 rounded clip-tech-sm glow-cyan">
        {/* Structural Logo/System Label */}
        <div className="flex items-center space-x-3 text-[10px] tracking-[0.25em] font-mono text-zinc-500">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </div>
          <span className="text-zinc-200 font-semibold tracking-widest font-display">
            FOUNDER_OPERATOR
          </span>
          <span className="hidden sm:inline-block text-zinc-700 border-l border-zinc-800 pl-3 font-mono">
            SYS_BUILD_v4.2
          </span>
        </div>

        {/* Technical coordinate indicators */}
        <div className="flex items-center space-x-6 md:space-x-8 text-[9px] tracking-[0.25em] font-mono text-zinc-400">
          <div className="hidden md:flex items-center space-x-1.5">
            <Cpu size={10} className="text-amber-500" />
            <span>
              LATENCY:{" "}
              <span className="text-amber-500 font-semibold">140μs</span>
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <Shield size={10} className="text-emerald-500" />
            <span>
              STABILITY:{" "}
              <span className="text-emerald-500 font-semibold">99.98%</span>
            </span>
          </div>

          <div className="hidden lg:block text-zinc-500">
            SYNC_TIME:{" "}
            <span className="text-zinc-400">
              {systemTime || "2026-05-24 20:03:52Z"}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
