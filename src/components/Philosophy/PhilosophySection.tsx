/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PHILOSOPHY_NODES } from '../../data';
import { Shield, Hammer, Compass, GitBranch, ShieldAlert } from 'lucide-react';

export default function PhilosophySection() {
  const [liveUTC, setLiveUTC] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveUTC(new Date().toISOString());
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const getIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'api first':
        return <Shield size={12} className="text-cyan-500" />;
      case 'automation bias':
        return <Hammer size={12} className="text-amber-500" />;
      case 'production mindset':
        return <Compass size={12} className="text-emerald-500" />;
      default:
        return <GitBranch size={12} className="text-zinc-500" />;
    }
  };

  return (
    <section
      id="section-philosophy"
      className="relative w-full bg-[#060606] px-6 py-20 md:px-12 md:py-32 border-t border-zinc-900/60 min-h-screen lg:min-h-screen flex items-center justify-start"
    >
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Content Block (Left Column) */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2 text-[10px] tracking-[0.5em] font-mono text-zinc-500 uppercase select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span>NODE_05 // ENGINEERING PRINCIPLES</span>
            </div>
            <h2 className="text-3xl font-light tracking-tight text-zinc-100 font-display">
              Core Principles
            </h2>
            <p className="text-xs font-mono text-zinc-600 tracking-wider uppercase">
              HOW I BUILD // WHAT I VALUE
            </p>
          </div>

          {/* Philosophy Columns - Stacked vertically to make room for video dock on the right */}
          <div className="flex flex-col border border-zinc-900/80 rounded bg-[#070708]/30 overflow-hidden clip-tech-corners shadow-[0_0_30px_rgba(245,158,11,0.01)] hover:border-zinc-800 transition-colors duration-500 divide-y divide-zinc-900/80">
            {PHILOSOPHY_NODES.map((node, index) => (
              <div
                key={index}
                className="flex flex-col space-y-4 p-5 md:p-6 hover:bg-[#070709]/60 transition-colors duration-300 group"
              >
                <div className="flex items-center justify-between text-[10px] tracking-widest font-mono text-zinc-500 select-none">
                  <div className="flex items-center space-x-2">
                    <span className="text-cyan-500 font-semibold">0{index + 1}</span>
                    <span className="text-zinc-700">/</span>
                    <span>{node.title}</span>
                  </div>
                  {getIcon(node.title)}
                </div>

                <h3 className="text-lg font-normal tracking-tight text-zinc-200 font-display group-hover:text-amber-500 transition-colors duration-300">
                  {node.principle}
                </h3>

                <p className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed font-mono">
                  {node.description}
                </p>

                <div className="pt-2">
                  <span className="text-[9px] tracking-wider font-mono text-zinc-400 border border-zinc-900/60 px-3 py-1.5 rounded bg-zinc-950/80 clip-tech-sm group-hover:border-cyan-500/20 group-hover:text-cyan-400 transition-all duration-300">
                    METRIC: {node.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* UTC Clock and info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[9px] tracking-[0.2em] font-mono text-zinc-600 pt-8 mt-6 border-t border-zinc-900/80 w-full select-none gap-4">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>UTC_SYNCHRONICITY: <span className="text-zinc-400">{liveUTC || '2026-05-24T20:03:52.421Z'}</span></span>
            </div>
            <div>NO DECORATIVE CYCLES ALLOWED</div>
          </div>

        </div>

        {/* Docking Space Slot (Right Column) */}
        <div className="hidden lg:block lg:col-span-5" />

      </div>
    </section>
  );
}
