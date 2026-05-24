/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/UI/Navbar";
import Hero from "./components/Hero/Hero";
import ProjectsSection from "./components/Projects/ProjectsSection";
import PhilosophySection from "./components/Philosophy/PhilosophySection";
import CinematicVideo from "./components/Hero/CinematicVideo";
import ScrollVideoController from "./components/Hero/ScrollVideoController";
import BootSequence from "./components/UI/BootSequence";

const DEFAULT_VIDEO_URL = "/videos/hero.mp4";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#<>/\\[]";

type SectionKey =
  | "hero"
  | "bio"
  | "experience"
  | "projects"
  | "research"
  | "philosophy";

// Scrambles a string then resolves to target over ~400ms
function useScrambleText(target: string): string {
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
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return display;
}

export default function App() {
  const [bootDone, setBootDone] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const [videoUrl] = useState(DEFAULT_VIDEO_URL);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(
    null,
  );
  const [currentTimeText, setCurrentTimeText] = useState("0.00s");
  const [progressPercent, setProgressPercent] = useState("0%");
  const [activeSection, setActiveSection] = useState<SectionKey>("hero");
  const [isDesktop, setIsDesktop] = useState(false);

  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  // HUD node label with scramble effect on section change
  const hudLabel = useScrambleText(`[${activeSection.toUpperCase()}_NODE]`);

  const handleVideoRef = (el: HTMLVideoElement | null) => setVideoElement(el);

  // Fade content in after boot completes
  const handleBootComplete = () => {
    setBootDone(true);
    setTimeout(() => setContentVisible(true), 50);
  };

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const sectionMap: { id: string; name: SectionKey }[] = [
      { id: "section-hero", name: "hero" },
      { id: "section-bio", name: "bio" },
      { id: "section-experience", name: "experience" },
      { id: "section-projects", name: "projects" },
      { id: "section-research", name: "research" },
      { id: "section-philosophy", name: "philosophy" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sectionMap.find((s) => s.id === entry.target.id);
            if (match) setActiveSection(match.name);
          }
        });
      },
      { root: null, rootMargin: "-30% 0px -40% 0px", threshold: 0 },
    );

    sectionMap.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!videoElement) return;
    const update = () => {
      const current = videoElement.currentTime || 0;
      const duration = videoElement.duration || 1;
      setCurrentTimeText(`${current.toFixed(2)}s`);
      setProgressPercent(`${Math.round((current / duration) * 100)}%`);
    };
    videoElement.addEventListener("timeupdate", update);
    return () => videoElement.removeEventListener("timeupdate", update);
  }, [videoElement]);

  const getDockingStyle = (section: SectionKey): React.CSSProperties => {
    const TRANSITION =
      "left 1.2s cubic-bezier(0.25, 1, 0.3, 1), " +
      "top 1.2s cubic-bezier(0.25, 1, 0.3, 1), " +
      "width 1.2s cubic-bezier(0.25, 1, 0.3, 1), " +
      "transform 1.2s cubic-bezier(0.25, 1, 0.3, 1), " +
      "opacity 0.6s ease";

    if (!isDesktop) {
      return {
        position: "fixed",
        top: "72px",
        left: "calc(100vw - 38vw - 12px)",
        right: "auto",
        transform: "none",
        width: "38vw",
        maxWidth: "220px",
        zIndex: 50,
        transition: TRANSITION,
      };
    }

    switch (section) {
      case "hero":
        return {
          position: "fixed",
          top: "50%",
          left: "50%",
          right: "auto",
          transform: "translate(-50%, -50%)",
          width: "46vw",
          maxWidth: "780px",
          zIndex: 40,
          transition: TRANSITION,
        };
      case "bio":
      case "projects":
      case "philosophy":
        return {
          position: "fixed",
          top: "50%",
          left: "calc(100vw - 36vw - 3vw)",
          right: "auto",
          transform: "translateY(-50%)",
          width: "36vw",
          maxWidth: "500px",
          zIndex: 40,
          transition: TRANSITION,
        };
      case "experience":
      case "research":
        return {
          position: "fixed",
          top: "50%",
          left: "3vw",
          right: "auto",
          transform: "translateY(-50%)",
          width: "36vw",
          maxWidth: "500px",
          zIndex: 40,
          transition: TRANSITION,
        };
      default:
        return {};
    }
  };

  const dockingStyle = getDockingStyle(activeSection);

  return (
    <>
      {/* Boot sequence — unmounts itself via opacity then onComplete fires */}
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

        {/* Global floating video panel */}
        <div
          ref={videoContainerRef}
          className="aspect-video border border-zinc-800/70 bg-zinc-950/50 backdrop-blur-sm shadow-[0_0_60px_rgba(245,158,11,0.04)] rounded overflow-hidden scanlines select-none pointer-events-none"
          style={dockingStyle}
          aria-hidden="true"
        >
          <div className="absolute top-2 left-3 z-20 flex items-center space-x-1.5 text-[8px] tracking-widest font-mono text-zinc-500 select-none pointer-events-none">
            <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
            <span>SYS_STREAM // LIVE</span>
          </div>

          {/* HUD node label — scrambles on section change */}
          <div className="absolute top-2 right-3 z-20 text-[8px] tracking-widest font-mono text-cyan-400/80 select-none pointer-events-none font-medium">
            {hudLabel}
          </div>

          <div className="absolute bottom-2 left-3 z-20 text-[8px] tracking-widest font-mono text-zinc-600 select-none pointer-events-none">
            T: {currentTimeText}
          </div>
          <div className="absolute bottom-2 right-3 z-20 text-[8px] tracking-widest font-mono text-zinc-600 select-none pointer-events-none">
            {progressPercent}
          </div>

          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-amber-500/50 z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-amber-500/50 z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-amber-500/50 z-20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-amber-500/50 z-20 pointer-events-none" />
          <div className="scanline-bar" />

          <CinematicVideo
            ref={handleVideoRef}
            videoUrl={videoUrl}
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
            <span>OPERATOR_01 // ALL LOGS SECURED</span>
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
