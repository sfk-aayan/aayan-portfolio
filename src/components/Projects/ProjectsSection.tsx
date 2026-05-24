import {
  BACKEND_PROFILE,
  WORK_EXPERIENCE,
  SYSTEM_MODULES,
  PUBLICATIONS,
  CERTIFICATIONS,
} from "../../data";
import ProjectCard from "./ProjectCard";
import {
  Terminal,
  Cpu,
  Layers,
  GitCommit,
  GitBranch,
  ArrowUpRight,
  BookOpen,
  Clock,
} from "lucide-react";

export default function ProjectsSection() {
  return (
    <div className="w-full bg-[#060606] relative z-10">
      {/* =========================================================================
          SECTION 01: OPERATOR BIO & SKILLS (Docks Video to the Right)
          ========================================================================= */}
      <section
        id="section-bio"
        className="w-full min-h-screen lg:min-h-screen flex items-center justify-start border-t border-zinc-900/60 py-16 relative"
      >
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-6">
          {/* Content Block (Left Column) */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            <div className="flex flex-col space-y-3">
              <span className="flex items-center space-x-2 text-[10px] tracking-[0.5em] font-mono text-amber-500/80 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>NODE_01 // BIO DEFINITION</span>
              </span>
              <h2 className="text-3xl font-light tracking-tight text-zinc-100 font-display">
                The Operator
              </h2>
              <div className="font-mono text-[9px] text-zinc-600 tracking-wider uppercase select-none">
                SYSTEM INTERFACE INTROSPECT LOG
              </div>
            </div>

            <p className="text-zinc-300 text-sm md:text-base font-light leading-relaxed font-mono bg-zinc-950/40 p-4 border border-zinc-900 rounded-md">
              {BACKEND_PROFILE.bio}
            </p>

            {/* Core Capability Array Matrix */}
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

          {/* Docking Space Slot (Right Column) */}
          <div className="hidden lg:block lg:col-span-5" />
        </div>
      </section>

      {/* =========================================================================
          SECTION 02: WORK EXPERIENCE (Docks Video to the Left)
          ========================================================================= */}
      <section
        id="section-experience"
        className="w-full min-h-screen lg:min-h-screen flex items-center justify-start border-t border-zinc-900/60 py-16 relative"
      >
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-6">
          {/* Docking Space Slot (Left Column) */}
          <div className="hidden lg:block lg:col-span-5" />

          {/* Content Block (Right Column) */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left lg:pl-6">
            <div className="flex flex-col space-y-3">
              <span className="flex items-center space-x-2 text-[10px] tracking-[0.5em] font-mono text-cyan-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                <span>NODE_02 // SYSTEM HISTORIC LOG</span>
              </span>
              <h2 className="text-3xl font-light tracking-tight text-zinc-100 font-display">
                Work Experience
              </h2>
              <div className="text-xs font-mono text-zinc-600 tracking-wider uppercase select-none">
                VERIFIED ARCHITECTURE COORDINATE CHRONOLOGY
              </div>
            </div>

            {/* Vertical timeline box */}
            <div className="relative flex flex-col space-y-8 pl-6 md:pl-8 mt-4">
              <div className="absolute left-[3px] top-4 bottom-4 w-px bg-gradient-to-b from-cyan-500/40 via-zinc-800 to-amber-500/40" />

              {WORK_EXPERIENCE.map((exp) => (
                <div
                  key={exp.id}
                  className="group relative flex flex-col space-y-2.5"
                >
                  {/* Timeline target point */}
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
          SECTION 03: TECHNICAL CONTRIBUTION & PROJECTS (Docks Video to the Right)
          ========================================================================= */}
      <section
        id="section-projects"
        className="w-full min-h-screen lg:min-h-screen flex items-center justify-start border-t border-zinc-900/60 py-16 relative"
      >
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-6">
          {/* Content Block (Left Column) */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            <div className="flex flex-col space-y-3">
              <span className="flex items-center space-x-2 text-[10px] tracking-[0.5em] font-mono text-zinc-500 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>NODE_03 // CORE TECHNICAL PILLARS</span>
              </span>
              <h2 className="text-3xl font-light tracking-tight text-zinc-100 font-display">
                Technical Contributions
              </h2>
              <div className="text-xs font-mono text-zinc-600 tracking-wider uppercase select-none">
                DENSE COMPLIANCE STACK & PERFORMANCE SPECS
              </div>
            </div>

            <div className="flex flex-col mt-4">
              {SYSTEM_MODULES.map((module) => (
                <ProjectCard key={module.id} module={module} />
              ))}
            </div>
          </div>

          {/* Docking Space Slot (Right Column) */}
          <div className="hidden lg:block lg:col-span-5" />
        </div>
      </section>

      {/* =========================================================================
          SECTION 04: RESEARCH & DEEP-TECH PUBLICATIONS (Docks Video to the Left)
          ========================================================================= */}
      <section
        id="section-research"
        className="w-full min-h-screen lg:min-h-screen flex items-center justify-start border-t border-zinc-900/60 py-16 relative"
      >
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-6">
          {/* Docking Space Slot (Left Column) */}
          <div className="hidden lg:block lg:col-span-5" />

          {/* Content Block (Right Column) */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left lg:pl-6">
            <div className="flex flex-col space-y-3">
              <span className="flex items-center space-x-2 text-[10px] tracking-[0.5em] font-mono text-cyan-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                <span>NODE_04 // DEEP TECH LABS</span>
              </span>
              <h2 className="text-3xl font-light tracking-tight text-zinc-100 font-display">
                Publications & Certifications
              </h2>
              <div className="text-xs font-mono text-zinc-600 tracking-wider uppercase select-none">
                SPECULATIVE ALGORITHMS & SYSTEMS PERFORMANCE DATA
              </div>
            </div>

            {/* Research Paper Cards */}
            <div className="space-y-6 mt-4">
              {PUBLICATIONS.map((pub) => (
                <div
                  key={pub.id}
                  className="group relative bg-[#070708]/30 border border-zinc-900/80 p-5 rounded-md clip-tech-corners hover:border-zinc-800 transition-all duration-300 hover:bg-[#07070a]/60"
                >
                  {/* Decorative glowing lines */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-zinc-800 group-hover:border-cyan-500/60 transition-colors duration-300" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-zinc-800 group-hover:border-cyan-500/60 transition-colors duration-300" />

                  <div className="flex flex-col space-y-2">
                    {/* Header: ID, Publication & Date */}
                    <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-zinc-500 gap-2 select-none">
                      <span className="text-cyan-500 font-semibold">
                        {pub.id} // {pub.venue}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} className="text-zinc-600" />
                        {pub.date}
                      </span>
                    </div>

                    {/* Paper Title */}
                    <h3 className="text-base font-normal tracking-tight text-zinc-200 font-display group-hover:text-amber-500 transition-colors duration-300 pt-1">
                      {pub.title}
                    </h3>

                    {/* Paper Summary */}
                    <p className="text-xs font-mono text-zinc-400 leading-relaxed font-light py-2">
                      {pub.summary}
                    </p>

                    {/* Footer tags and read anchor */}
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
              ))}
            </div>

            {/* Certifications Cards */}
            <div className="space-y-6 mt-4">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.id}
                  className="group relative bg-[#070708]/30 border border-zinc-900/80 p-5 rounded-md clip-tech-corners hover:border-zinc-800 transition-all duration-300 hover:bg-[#07070a]/60"
                >
                  {/* Top-left connector */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-zinc-800 group-hover:border-amber-500/60 transition-colors duration-300" />
                  {/* Bottom-right connector */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-zinc-800 group-hover:border-cyan-500/60 transition-colors duration-300" />

                  <div className="flex flex-col space-y-2">
                    {/* Header: ID, Issuer & Date */}
                    <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-zinc-500 gap-2 select-none">
                      <span className="text-amber-500 font-semibold">
                        {cert.id} // {cert.issuer}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} className="text-zinc-600" />
                        {cert.date}
                      </span>
                    </div>

                    {/* Certification Title */}
                    <h3 className="text-base font-normal tracking-tight text-zinc-200 font-display group-hover:text-cyan-400 transition-colors duration-300 pt-1">
                      {cert.title}
                    </h3>

                    {/* Certification Summary */}
                    <p className="text-xs font-mono text-zinc-400 leading-relaxed font-light py-2">
                      {cert.summary}
                    </p>

                    {/* Footer tags and credential link */}
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
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
