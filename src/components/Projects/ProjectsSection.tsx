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

export default function ProjectsSection() {
  const {
    displayed: typedBio,
    isDone: bioTyped,
    ref: bioRef,
  } = useTypewriter(BACKEND_PROFILE.bio, { speed: 14, startDelay: 200 });
  return (
    <div className="w-full bg-[#060606] relative z-10">
      {/* =========================================================================
          SECTION 01: OPERATOR PROFILE (Docks Video to the Right)
          ========================================================================= */}
      <section
        id="section-bio"
        className="w-full min-h-screen lg:min-h-screen flex items-center justify-start border-t border-zinc-900/60 py-16 relative"
      >
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-6">
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            <div className="flex flex-col space-y-3">
              <span className="flex items-center space-x-2 text-[10px] tracking-[0.5em] font-mono text-amber-500/80 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>NODE_01 // OPERATOR PROFILE</span>
              </span>
              <h2 className="text-3xl font-light tracking-tight text-zinc-100 font-display">
                The Operator
              </h2>
              <div className="font-mono text-[9px] text-zinc-600 tracking-wider uppercase select-none">
                BACKEND ENGINEER // DJANGO · FASTAPI · PYTHON
              </div>
            </div>

            <p
              ref={bioRef as React.RefObject<HTMLParagraphElement>}
              className="text-zinc-300 text-sm md:text-base font-light leading-relaxed font-mono bg-zinc-950/40 p-4 border border-zinc-900 rounded-md min-h-[80px]"
            >
              {typedBio}
              {/* Blinking cursor — disappears when typing is done */}
              {!bioTyped && (
                <span className="inline-block w-[7px] h-[13px] bg-amber-500 ml-0.5 align-middle animate-pulse" />
              )}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-900/70">
              {Object.entries(BACKEND_PROFILE.skills).map(
                ([category, items]) => (
                  <div key={category} className="flex flex-col space-y-2">
                    <span className="flex items-center space-x-2 text-[9px] tracking-widest font-mono text-zinc-500 uppercase select-none">
                      <Layers size={10} className="text-cyan-500" />
                      <span>{category}</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-mono text-zinc-400 bg-zinc-950/80 px-2.5 py-1.5 rounded border border-zinc-900 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors duration-250 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Docking Space Slot */}
          <div className="hidden lg:block lg:col-span-5" />
        </div>
      </section>

      {/* =========================================================================
          SECTION 02: DEPLOYMENT HISTORY (Docks Video to the Left)
          ========================================================================= */}
      <section
        id="section-experience"
        className="w-full min-h-screen lg:min-h-screen flex items-center justify-start border-t border-zinc-900/60 py-16 relative"
      >
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-6">
          {/* Docking Space Slot */}
          <div className="hidden lg:block lg:col-span-5" />

          <div className="lg:col-span-7 flex flex-col space-y-6 text-left lg:pl-6">
            <div className="flex flex-col space-y-3">
              <span className="flex items-center space-x-2 text-[10px] tracking-[0.5em] font-mono text-cyan-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                <span>NODE_02 // DEPLOYMENT HISTORY</span>
              </span>
              <h2 className="text-3xl font-light tracking-tight text-zinc-100 font-display">
                Work Experience
              </h2>
              <div className="text-xs font-mono text-zinc-600 tracking-wider uppercase select-none">
                DEC 2022 – PRESENT // 3 ENGAGEMENTS
              </div>
            </div>

            <div className="relative flex flex-col space-y-8 pl-6 md:pl-8 mt-4">
              <div className="absolute left-[3px] top-4 bottom-4 w-px bg-gradient-to-b from-cyan-500/40 via-zinc-800 to-amber-500/40" />

              {WORK_EXPERIENCE.map((exp) => (
                <div
                  key={exp.id}
                  className="group relative flex flex-col space-y-2.5"
                >
                  <div className="absolute -left-[27px] md:-left-[35px] top-1.5 w-3 h-3 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center group-hover:border-cyan-500 transition-colors duration-300">
                    <span className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-cyan-500 transition-colors duration-300" />
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5">
                    <h3 className="text-lg font-normal text-zinc-100 font-display group-hover:text-cyan-400 transition-colors duration-300">
                      {exp.company}
                    </h3>
                    <span className="text-[10px] font-mono text-amber-500/80 font-semibold tracking-wider bg-amber-500/5 px-2 py-0.5 border border-amber-500/10 rounded">
                      {exp.period}
                    </span>
                  </div>

                  <div className="text-xs md:text-sm text-zinc-400 font-mono italic">
                    {exp.role}
                  </div>

                  <ul className="space-y-2 font-mono text-[11px] text-zinc-400 pl-1 leading-relaxed">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-zinc-700 shrink-0 select-none">
                          &gt;
                        </span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-mono text-zinc-500 bg-[#070708] px-2 py-0.5 rounded border border-zinc-900/60 clip-tech-sm hover:border-zinc-800 hover:text-zinc-400 transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 03: PRODUCTION SYSTEMS (Docks Video to the Right)
          ========================================================================= */}
      <section
        id="section-projects"
        className="w-full min-h-screen lg:min-h-screen flex items-center justify-start border-t border-zinc-900/60 py-16 relative"
      >
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-6">
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            <div className="flex flex-col space-y-3">
              <span className="flex items-center space-x-2 text-[10px] tracking-[0.5em] font-mono text-zinc-500 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>NODE_03 // PRODUCTION SYSTEMS</span>
              </span>
              <h2 className="text-3xl font-light tracking-tight text-zinc-100 font-display">
                Technical Contributions
              </h2>
              <div className="text-xs font-mono text-zinc-600 tracking-wider uppercase select-none">
                FINTECH · AI · MOBILE // {SYSTEM_MODULES.length} ACTIVE SYSTEMS
              </div>
            </div>

            <div className="flex flex-col mt-4">
              {SYSTEM_MODULES.map((module, i) => (
                <ScanReveal key={module.id} delay={i * 80} color="amber">
                  <ProjectCard module={module} />
                </ScanReveal>
              ))}
            </div>
          </div>

          {/* Docking Space Slot */}
          <div className="hidden lg:block lg:col-span-5" />
        </div>
      </section>

      {/* =========================================================================
          SECTION 04: RESEARCH & CREDENTIALS (Docks Video to the Left)
          ========================================================================= */}
      <section
        id="section-research"
        className="w-full min-h-screen lg:min-h-screen flex items-center justify-start border-t border-zinc-900/60 py-16 relative"
      >
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-6">
          {/* Docking Space Slot */}
          <div className="hidden lg:block lg:col-span-5" />

          <div className="lg:col-span-7 flex flex-col space-y-6 text-left lg:pl-6">
            <div className="flex flex-col space-y-3">
              <span className="flex items-center space-x-2 text-[10px] tracking-[0.5em] font-mono text-cyan-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                <span>NODE_04 // RESEARCH & CREDENTIALS</span>
              </span>
              <h2 className="text-3xl font-light tracking-tight text-zinc-100 font-display">
                Publications & Certifications
              </h2>
              <div className="text-xs font-mono text-zinc-600 tracking-wider uppercase select-none">
                IEEE PUBLICATION · QUANTUM ML · {CERTIFICATIONS.length}{" "}
                CERTIFICATIONS
              </div>
            </div>

            {/* Publications */}
            <div className="space-y-6 mt-4">
              {PUBLICATIONS.map((pub, i) => (
                <ScanReveal key={pub.id} delay={i * 80} color="amber">
                  <div className="group relative bg-[#070708]/30 border border-zinc-900/80 p-5 rounded-md clip-tech-corners hover:border-zinc-800 transition-all duration-300 hover:bg-[#07070a]/60">
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-zinc-800 group-hover:border-cyan-500/60 transition-colors duration-300" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-zinc-800 group-hover:border-cyan-500/60 transition-colors duration-300" />

                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-zinc-500 gap-2 select-none">
                        <span className="text-cyan-500 font-semibold">
                          {pub.id} // {pub.venue}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} className="text-zinc-600" />
                          {pub.date}
                        </span>
                      </div>

                      <h3 className="text-base font-normal tracking-tight text-zinc-200 font-display group-hover:text-amber-500 transition-colors duration-300 pt-1">
                        {pub.title}
                      </h3>

                      <p className="text-xs font-mono text-zinc-400 leading-relaxed font-light py-2">
                        {pub.summary}
                      </p>

                      <div className="flex items-center justify-between gap-4 pt-2 border-t border-zinc-900/60">
                        <div className="flex flex-wrap gap-1">
                          {pub.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[8px] font-mono text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <a
                          href={pub.link}
                          className="flex items-center space-x-1 text-[9px] font-mono text-zinc-400 group-hover:text-cyan-400 transition-colors duration-200 font-medium"
                        >
                          <span>READ_SPEC</span>
                          <ArrowUpRight size={10} />
                        </a>
                      </div>
                    </div>
                  </div>
                </ScanReveal>
              ))}
            </div>

            {/* Certifications */}
            <div className="space-y-6 mt-4">
              {CERTIFICATIONS.map((cert, i) => (
                <ScanReveal>
                  <div
                    key={cert.id}
                    className="group relative bg-[#070708]/30 border border-zinc-900/80 p-5 rounded-md clip-tech-corners hover:border-zinc-800 transition-all duration-300 hover:bg-[#07070a]/60"
                  >
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-zinc-800 group-hover:border-amber-500/60 transition-colors duration-300" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-zinc-800 group-hover:border-cyan-500/60 transition-colors duration-300" />

                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-zinc-500 gap-2 select-none">
                        <span className="text-amber-500 font-semibold">
                          {cert.id} // {cert.issuer}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} className="text-zinc-600" />
                          {cert.date}
                        </span>
                      </div>

                      <h3 className="text-base font-normal tracking-tight text-zinc-200 font-display group-hover:text-cyan-400 transition-colors duration-300 pt-1">
                        {cert.title}
                      </h3>

                      <p className="text-xs font-mono text-zinc-400 leading-relaxed font-light py-2">
                        {cert.summary}
                      </p>

                      <div className="flex items-center justify-between gap-4 pt-2 border-t border-zinc-900/60">
                        <div className="flex flex-wrap gap-1">
                          {cert.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[8px] font-mono text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <a
                          href={cert.link}
                          className="flex items-center space-x-1 text-[9px] font-mono text-zinc-400 group-hover:text-amber-400 transition-colors duration-200 font-medium"
                        >
                          <span>VIEW_CREDENTIAL</span>
                          <ArrowUpRight size={10} />
                        </a>
                      </div>
                    </div>
                  </div>
                </ScanReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
