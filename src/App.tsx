import { useState, useRef, useEffect } from "react";
import { Github, Linkedin } from "lucide-react";
import Navbar from "./components/UI/Navbar";
import Hero from "./components/Hero/Hero";
import ProjectsSection from "./components/Projects/ProjectsSection";
import PhilosophySection from "./components/Philosophy/PhilosophySection";
import CinematicVideo from "./components/Hero/CinematicVideo";
import BootSequence from "./components/UI/BootSequence";
import CustomCursor from "./components/UI/CustomCursor";
import { SOCIAL_LINKS } from "./data";

const DEFAULT_VIDEO_URL = "/videos/hero.mp4";

export default function App() {
  const [bootDone, setBootDone] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(
    null,
  );

  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (gridRef.current) {
        gridRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.04}px, 0)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBootComplete = () => {
    setBootDone(true);
    setTimeout(() => setContentVisible(true), 50);
  };

  return (
    <>
      {bootDone && <CustomCursor />}
      {!bootDone && <BootSequence onComplete={handleBootComplete} />}

      <div
        className="relative min-h-screen bg-[#060606] text-zinc-100 font-sans selection:bg-amber-500/20 selection:text-amber-200 antialiased overflow-x-hidden"
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: "opacity 800ms ease",
        }}
      >
        <Navbar />

        {/* Layer 1 — Fullscreen video (z-0) */}
        <div className="fixed inset-0 z-0 flex items-center justify-center">
          <CinematicVideo
            ref={setVideoElement}
            videoUrl={DEFAULT_VIDEO_URL}
            onLoadedMetadata={(e) => setVideoElement(e.currentTarget)}
            onError={(err) => console.warn("Video error:", err)}
          />
        </div>

        {/* Layer 2 — Dark base overlay (z-1) */}
        <div className="fixed inset-0 bg-black/55 pointer-events-none z-[1]" />

        {/* Layer 3 — Vignette overlay (z-2) */}
        <div
          className="fixed inset-0 pointer-events-none z-[2]"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.75) 100%)",
          }}
        />

        {/* Layer 4 — Cyber grid (z-3) */}
        <div
          ref={gridRef}
          className="fixed inset-0 cyber-grid cyber-grid-cyan opacity-25 pointer-events-none z-[3]"
        />

        {/* Layer 5 — Fullscreen HUD overlays (z-10) */}
        <div className="fixed inset-0 pointer-events-none z-10 select-none">
          {/* Top-left corner */}
          <div className="absolute top-4 left-5 flex items-center space-x-1.5 text-[9px] tracking-widest font-mono text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>SYS_STREAM // LIVE</span>
          </div>

          {/* Top-right corner */}
          <div className="absolute top-4 right-5 text-[9px] tracking-widest font-mono text-cyan-400/70">
            [AMBIENT_FEED]
          </div>

          {/* Corner brackets */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-amber-500/40" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-amber-500/40" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-amber-500/40" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-amber-500/40" />

          {/* scanline-bar */}
          <div className="scanline-bar" />
        </div>

        {/* Layer 6 — Navbar and main content (z-20 and above) */}
        <main className="relative z-20">
          <Hero />
          <ProjectsSection />
          <PhilosophySection />
        </main>

        <footer className="relative z-20 w-full px-6 py-10 md:px-12 bg-[#050506] border-t border-zinc-950">
          <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between text-[10px] tracking-widest font-mono text-zinc-700 gap-4">
            <span>PORTFOLIO_SYSTEM_STATUS: SECURE_STATIC</span>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <span className="text-zinc-700">CONTACT_ENDPOINTS //</span>
              <a
                href={SOCIAL_LINKS.GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-zinc-600 hover:text-amber-500 transition-colors duration-200"
              >
                <Github size={14} />
              </a>
              <a
                href={SOCIAL_LINKS.LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-zinc-600 hover:text-cyan-400 transition-colors duration-200"
              >
                <Linkedin size={14} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
