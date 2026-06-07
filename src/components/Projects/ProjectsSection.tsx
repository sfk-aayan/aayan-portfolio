import {
  BACKEND_PROFILE,
  WORK_EXPERIENCE,
  SYSTEM_MODULES,
  PUBLICATIONS,
  CERTIFICATIONS,
} from "../../data";
import ProjectCard from "./ProjectCard";
import { Layers, ArrowUpRight, Clock } from "lucide-react";
import { useTypewriter } from "../../hooks/useTypewriter";
import ScanReveal from "../UI/ScanReveal";
import { GlitchHeader } from "../UI/GlitchHeader";

export default function ProjectsSection() {
  const {
    displayed: typedBio,
    isDone: bioTyped,
    ref: bioRef,
  } = useTypewriter(BACKEND_PROFILE.bio, { speed: 14, startDelay: 200 });

  return (
    <div className="w-full bg-[#060606] relative z-10">
      {/* SECTION 01: OPERATOR BIO */}
      <section
        id="section-bio"
        className="w-full min-h-[50vh] flex flex-col justify-center border-t border-zinc-900/60 pt-40 pb-16 md:pt-56 md:pb-24 relative px-6"
      >
        <div className="max-w-6xl w-full mx-auto">
          <GlitchHeader
            title="The Operator"
            subtitle="BACKEND ENGINEER // DJANGO · FASTAPI · PYTHON"
            node="NODE_01 // OPERATOR PROFILE"
          />

          <p
            ref={bioRef as React.RefObject<HTMLParagraphElement>}
            className="text-zinc-300 text-sm md:text-base font-light leading-relaxed font-mono bg-zinc-950/30 p-6 border border-zinc-800/40 border-l-2 border-l-cyan-500/50 backdrop-blur-sm rounded-sm min-h-[100px] max-w-4xl mt-6"
          >
            {typedBio}
            {!bioTyped && (
              <span className="inline-block w-[7px] h-[13px] bg-amber-500 ml-1 align-middle animate-pulse" />
            )}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 mt-10 border-t border-zinc-900/70">
            {Object.entries(BACKEND_PROFILE.skills).map(([category, items]) => (
              <div key={category} className="space-y-3">
                <span className="flex items-center space-x-2 text-[9px] tracking-widest font-mono text-zinc-500 uppercase select-none">
                  <Layers size={10} className="text-cyan-500" />
                  <span>{category}</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono text-zinc-400 bg-zinc-950 px-3 py-1.5 border border-zinc-900 hover:border-cyan-500/30 hover:text-cyan-400 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 02: EXPERIENCE */}
      <section
        id="section-experience"
        className="w-full min-h-[60vh] flex flex-col justify-center border-t border-zinc-900/60 py-20 relative px-6 overflow-hidden"
      >
        <div className="max-w-6xl w-full mx-auto">
          <GlitchHeader
            title="Work Experience"
            subtitle="DEC 2022 – PRESENT // 3 ENGAGEMENTS"
            node="NODE_02 // DEPLOYMENT HISTORY"
            color="cyan"
          />

          <div className="relative space-y-8 ml-2 mt-10">
            {/* Central tracking backbone line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-zinc-900 via-zinc-800/40 to-zinc-900/10 pointer-events-none" />

            {WORK_EXPERIENCE.map((exp) => (
              <div
                key={exp.id}
                className="group/exp relative pl-8 pb-4 transition-all duration-500"
              >
                {/* 1. Terminal Node Ping Node Indicator */}
                <div className="absolute left-0 top-1.5 w-4 h-4 bg-[#060606] border border-zinc-800 rounded-sm flex items-center justify-center group-hover/exp:border-cyan-500/70 group-hover/exp:rotate-90 transition-all duration-500 z-10">
                  <div className="w-1 h-1 bg-zinc-700 rounded-sm group-hover/exp:bg-cyan-400 transition-all duration-300" />
                </div>

                {/* 2. Interactive Outer Corner Brackets (Only visible on card hover) */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/0 group-hover/exp:border-cyan-500/40 transition-all duration-300 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/0 group-hover/exp:border-cyan-500/40 transition-all duration-300 pointer-events-none" />

                {/* 3. Card Content Wrapper */}
                <div className="bg-[#070708]/10 group-hover/exp:bg-[#07070c]/40 border border-transparent group-hover/exp:border-zinc-900 p-5 rounded-sm transition-all duration-500">
                  {/* Header Sub-row */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-xl font-display font-light text-zinc-100 group-hover/exp:text-cyan-400 transition-colors duration-300">
                        {exp.company}
                      </h3>
                      <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider select-none">
                        // ENGAGEMENT_LOG
                      </span>
                    </div>

                    <span className="self-start md:self-auto font-mono text-[10px] text-amber-500/80 bg-amber-500/5 px-2 py-1 border border-amber-500/10 uppercase tracking-tighter select-none">
                      {exp.period}
                    </span>
                  </div>

                  {/* Operational Role Identifier */}
                  <div className="text-xs font-mono text-zinc-500 mb-5 flex items-center gap-2 select-none">
                    <span className="inline-block w-1 h-1 bg-zinc-700 rounded-full" />
                    <span>ROLE:</span>
                    <span className="text-zinc-400 italic">{exp.role}</span>
                  </div>

                  {/* 4. Refined Code Comment Achievement Point List */}
                  <ul className="space-y-4">
                    {exp.achievements.map((a, i) => (
                      <li
                        key={i}
                        className="group/item text-[11px] font-mono text-zinc-400 flex items-start gap-3 leading-relaxed transition-all duration-300"
                      >
                        {/* Static Terminal Prompt - Only color shifts on hover */}
                        <span className="text-amber-500/30 group-hover/item:text-amber-500 group-hover/item:translate-x-1 transition-all duration-300 shrink-0 select-none pt-1">
                          &gt;
                        </span>

                        {/* The Achievement Text - Clean, no trailing cursor */}
                        <span className="group-hover/item:text-zinc-100 transition-colors duration-300">
                          {a}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 03: PROJECTS */}
      <section
        id="section-projects"
        className="w-full min-h-[60vh] flex flex-col justify-center border-t border-zinc-900/60 py-20 relative px-6"
      >
        <div className="max-w-6xl w-full mx-auto">
          <GlitchHeader
            title="Technical Contributions"
            subtitle={`FINTECH · AI · MOBILE // ${SYSTEM_MODULES.length} ACTIVE SYSTEMS`}
            node="NODE_03 // PRODUCTION SYSTEMS"
            color="amber"
          />
          <div className="space-y-4 mt-10">
            {SYSTEM_MODULES.map((module, i) => (
              <ScanReveal key={module.id} delay={i * 100} color="amber">
                <ProjectCard module={module} />
              </ScanReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 04: RESEARCH & CREDENTIALS */}
      <section
        id="section-research"
        className="w-full min-h-[60vh] flex flex-col justify-center border-t border-zinc-900/60 py-20 relative px-6"
      >
        <div className="max-w-6xl w-full mx-auto">
          <GlitchHeader
            title="Research & Credentials"
            subtitle={`IEEE PUBLICATION · QUANTUM ML · ${CERTIFICATIONS.length} CERTIFICATIONS`}
            node="NODE_04 // RESEARCH & CREDENTIALS"
            color="cyan"
          />

          <div className="flex flex-col space-y-10 mt-10">
            {/* 1. Publications Section (Full Width / Prominent Stack) */}
            <div className="space-y-4">
              <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase flex items-center gap-2">
                <span className="w-1 h-1 bg-cyan-500 rounded-full" />
                <span>// PEER_REVIEWED_JOURNALS</span>
              </div>

              {PUBLICATIONS.map((pub, i) => (
                <ScanReveal key={pub.id} delay={i * 80} color="amber">
                  <div className="group relative bg-[#070708]/40 border border-zinc-900/80 p-6 rounded-md hover:border-zinc-800 transition-all duration-500 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2 max-w-3xl">
                        <div className="flex items-center gap-3 text-[10px] font-mono">
                          <span className="text-cyan-500 font-semibold">
                            {pub.venue}
                          </span>
                          <span className="text-zinc-700">/</span>
                          <span className="text-zinc-500">{pub.date}</span>
                        </div>
                        <h3 className="text-base font-display text-zinc-100 group-hover:text-amber-500 transition-colors duration-300">
                          {pub.title}
                        </h3>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {pub.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[8px] font-mono text-zinc-500 bg-zinc-950/80 px-2 py-0.5 border border-zinc-900/60 rounded-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center shrink-0">
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-mono text-zinc-400 border border-zinc-900 hover:border-cyan-500/30 hover:text-cyan-400 bg-zinc-950 px-4 py-2 transition-all duration-300 flex items-center gap-1.5 rounded-sm"
                        >
                          READ_SPEC <ArrowUpRight size={11} />
                        </a>
                      </div>
                    </div>
                  </div>
                </ScanReveal>
              ))}
            </div>

            {/* Separator Line */}
            <div className="h-px w-full bg-gradient-to-r from-zinc-900 via-zinc-800/40 to-transparent" />

            {/* 2. Certifications Section (Linear Grid) */}
            <div className="space-y-4">
              <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase flex items-center gap-2">
                <span className="w-1 h-1 bg-amber-500 rounded-full" />
                <span>// VERIFIED_CREDENTIALS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CERTIFICATIONS.map((cert, i) => (
                  <ScanReveal key={cert.id} delay={i * 100} color="cyan">
                    <div className="group relative bg-[#070708]/20 border border-zinc-900/80 p-5 rounded-md hover:border-zinc-800/80 hover:bg-[#07070c]/40 transition-all duration-500 h-30 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[9px] font-mono">
                          <span className="text-amber-500 font-medium tracking-wide">
                            {cert.issuer}
                          </span>
                          <span className="text-zinc-600">{cert.date}</span>
                        </div>
                        <h3 className="text-xs font-mono text-zinc-300 group-hover:text-cyan-400 transition-colors duration-300 leading-snug">
                          {cert.title}
                        </h3>
                      </div>

                      <div className="flex justify-end pt-4 mt-auto border-t border-zinc-900/40">
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[9px] font-mono text-zinc-500 hover:text-amber-400 flex items-center gap-1 transition-colors duration-200"
                        >
                          VIEW_CERT <ArrowUpRight size={10} />
                        </a>
                      </div>
                    </div>
                  </ScanReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
