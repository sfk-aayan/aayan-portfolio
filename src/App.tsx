import { useState, useRef } from "react";
import { Github, Linkedin } from "lucide-react";
import Navbar from "./components/UI/Navbar";
import Hero from "./components/Hero/Hero";
import ProjectsSection from "./components/Projects/ProjectsSection";
import PhilosophySection from "./components/Philosophy/PhilosophySection";
import CinematicVideo from "./components/Hero/CinematicVideo";
import ScrollVideoController from "./components/Hero/ScrollVideoController";
import BootSequence from "./components/UI/BootSequence";
import CustomCursor from "./components/UI/CustomCursor";
import { useScrambleText } from "./hooks/useScrambleText";
import { useIsDesktop } from "./hooks/useIsDesktop";
import { useActiveSection } from "./hooks/useActiveSection";
import { useVideoHUD } from "./hooks/useVideoHUD";
import { getDockingStyle } from "./lib/getDockingStyle";
import { SOCIAL_LINKS } from "./data";

const DEFAULT_VIDEO_URL = "/videos/hero.mp4";

export default function App() {
  const [bootDone, setBootDone] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [pipExpanded, setPipExpanded] = useState(false);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(
    null,
  );

  const gridRef = useRef<HTMLDivElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  const isDesktop = useIsDesktop();
  const activeSection = useActiveSection();
  const { currentTimeText, progressPercent } = useVideoHUD(videoElement);
  const hudLabel = useScrambleText(`[${activeSection.toUpperCase()}_NODE]`);
  const dockingStyle = getDockingStyle(activeSection, isDesktop, pipExpanded);

  const handleBootComplete = () => {
    setBootDone(true);
    setTimeout(() => setContentVisible(true), 50);
  };

  const showHUD = isDesktop || pipExpanded;

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

        <div
          ref={gridRef}
          className="fixed inset-0 cyber-grid cyber-grid-cyan z-0 pointer-events-none opacity-25"
        />

        {/* Floating video panel */}
        <div
          ref={videoContainerRef}
          className="aspect-video border border-zinc-800/70 bg-zinc-950/50 backdrop-blur-sm shadow-[0_0_60px_rgba(245,158,11,0.04)] rounded overflow-hidden scanlines select-none"
          style={dockingStyle}
          aria-hidden={!isDesktop && !pipExpanded}
          onClick={() => {
            if (!isDesktop) setPipExpanded((p) => !p);
          }}
        >
          {/* Collapsed tap hint — mobile only */}
          {!isDesktop && !pipExpanded && (
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <span
                className="text-[7px] tracking-widest font-mono text-amber-500/80 animate-pulse"
                style={{ animationDuration: "2s" }}
              >
                ▶ FEED
              </span>
            </div>
          )}

          {/* HUD overlays */}
          {showHUD && (
            <>
              <div className="absolute top-2 left-3 z-20 flex items-center space-x-1.5 text-[8px] tracking-widest font-mono text-zinc-500 select-none pointer-events-none">
                <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
                <span>SYS_STREAM // LIVE</span>
              </div>
              <div className="absolute top-2 right-3 z-20 text-[8px] tracking-widest font-mono text-cyan-400/80 select-none pointer-events-none font-medium">
                {hudLabel}
              </div>
              <div className="absolute bottom-2 left-3 z-20 text-[8px] tracking-widest font-mono text-zinc-600 select-none pointer-events-none">
                T: {currentTimeText}
              </div>
              <div className="absolute bottom-2 right-3 z-20 text-[8px] tracking-widest font-mono text-zinc-600 select-none pointer-events-none">
                {progressPercent}
              </div>
            </>
          )}

          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-amber-500/50 z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-amber-500/50 z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-amber-500/50 z-20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-amber-500/50 z-20 pointer-events-none" />
          <div className="scanline-bar" />

          <CinematicVideo
            ref={setVideoElement}
            videoUrl={DEFAULT_VIDEO_URL}
            onLoadedMetadata={(e) => setVideoElement(e.currentTarget)}
            onError={(err) => console.warn("Video error:", err)}
          />
        </div>

        <main className="relative z-10">
          <Hero />
          <ProjectsSection />
          <PhilosophySection />
        </main>

        <footer className="relative z-10 w-full px-6 py-10 md:px-12 bg-[#050506] border-t border-zinc-950">
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
                className="text-zinc-600 hover:text-amber-500 transition-colors duration-200"
              >
                <Linkedin size={14} />
              </a>
            </div>
          </div>
        </footer>

        <ScrollVideoController
          videoElement={videoElement}
          gridElement={gridRef.current}
          damping={0.07}
        />
      </div>
    </>
  );
}
