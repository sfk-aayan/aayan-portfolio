import { motion } from "motion/react";
import {
  BACKEND_PROFILE,
  EDUCATION,
  WORK_EXPERIENCE,
  SYSTEM_MODULES,
  PUBLICATIONS,
  CERTIFICATIONS,
} from "../../data";
import ProjectCard from "./ProjectCard";
import ScanReveal from "../UI/ScanReveal";
import { GlitchHeader } from "../UI/GlitchHeader";

/** Horizontal dimension line with 45° architectural end ticks. */
function DimLine({ label }: { label: string }) {
  return (
    <div className="relative h-px bg-ink/50 my-3">
      <span className="absolute left-0 -top-[5px] h-[11px] w-px bg-ink/70 rotate-45" />
      <span className="absolute right-0 -top-[5px] h-[11px] w-px bg-ink/70 rotate-45" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-paper px-2 font-mono text-[9px] tracking-[0.18em] uppercase text-ink-soft whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

/** Small sheet-margin label for annotation columns. */
function MarginLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[9px] tracking-[0.35em] uppercase text-ink-faint leading-loose">
      {children}
    </div>
  );
}

export default function ProjectsSection() {
  const bioWords = BACKEND_PROFILE.bio.split(" ");

  return (
    <div className="w-full relative">
      {/* ════ SHEET 02 — OPERATOR PROFILE ════ */}
      <section
        id="section-bio"
        className="px-6 md:px-16 pt-28 md:pt-36 pb-20 md:pb-28 border-b border-rule"
      >
        <div className="max-w-6xl mx-auto">
          <GlitchHeader
            title="The Operator"
            subtitle="SOFTWARE ENGINEER — DJANGO · FASTAPI · PYTHON"
            node="SHEET 02 · OPERATOR PROFILE"
            color="amber"
          />

          {/* General description — set large, inked in word by word */}
          <div className="grid lg:grid-cols-[180px_1fr] gap-6 lg:gap-10">
            <MarginLabel>
              GENERAL
              <br />
              DESCRIPTION
            </MarginLabel>
            <p className="font-display font-light text-xl md:text-[28px] leading-[1.45] text-ink max-w-3xl">
              {bioWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.28em]"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: 0.1 + i * 0.014, duration: 0.4 }}
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </div>

          {/* Bill of materials — capabilities */}
          <div className="mt-20">
            <div className="flex items-baseline justify-between mb-4">
              <MarginLabel>BILL OF MATERIALS — CAPABILITIES</MarginLabel>
              <span className="font-mono text-[9px] tracking-[0.2em] text-ink-faint uppercase hidden sm:inline">
                QTY AS NOTED
              </span>
            </div>

            <div className="border-t-2 border-ink">
              {Object.entries(BACKEND_PROFILE.skills).map(
                ([category, items], i) => (
                  <div
                    key={category}
                    className="grid grid-cols-[56px_1fr] md:grid-cols-[72px_230px_1fr] gap-x-6 gap-y-3 py-5 px-3 -mx-3 border-b border-ink/15 group hover:bg-vellum/50 transition-colors duration-300"
                  >
                    <span className="font-mono text-[10px] text-safety pt-[2px]">
                      S-{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-soft pt-[2px]">
                      {category}
                    </span>
                    <div className="col-span-2 md:col-span-1 flex flex-wrap gap-x-6 gap-y-2.5">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="font-mono text-[12px] text-ink border-b border-ink/25 pb-px hover:border-safety hover:text-safety transition-colors duration-200"
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

          {/* Training record */}
          <div className="mt-16">
            <MarginLabel>TRAINING</MarginLabel>
            <div className="mt-4 border-t border-ink/40">
              {EDUCATION.map((edu, i) => (
                <div
                  key={edu.id}
                  className="grid grid-cols-1 md:grid-cols-[72px_1fr_auto] gap-x-6 gap-y-2 py-5 border-b border-ink/15 items-baseline"
                >
                  <span className="font-mono text-[10px] text-safety">
                    T-{String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="font-display text-lg md:text-xl text-ink">
                      {edu.institution}
                    </span>
                    <div className="mt-1 font-mono text-[10px] tracking-[0.12em] uppercase text-ink-soft">
                      {edu.degree} — CGPA {edu.cgpa}
                    </div>
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-faint text-left md:text-right">
                    {edu.period}
                    <br className="hidden md:block" />
                    <span className="md:mt-1 inline-block">
                      {edu.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════ SHEET 03 — DEPLOYMENT HISTORY ════ */}
      <section
        id="section-experience"
        className="px-6 md:px-16 pt-24 md:pt-32 pb-20 md:pb-28 border-b border-rule"
      >
        <div className="max-w-6xl mx-auto">
          <GlitchHeader
            title="Work Experience"
            subtitle="DEC 2022 – PRESENT — 3 ENGAGEMENTS"
            node="SHEET 03 · DEPLOYMENT HISTORY"
            color="cyan"
          />

          {WORK_EXPERIENCE.map((exp, idx) => (
            <ScanReveal key={exp.id} color="cyan" delay={idx * 80}>
              <article className="grid lg:grid-cols-[180px_1fr] gap-6 lg:gap-10 border-t border-ink/15 py-12 md:py-14 first-of-type:border-t-0">
                {/* Margin column — detail letter, location, period dimension */}
                <aside>
                  <div className="font-mono text-[11px] tracking-[0.3em] text-safety uppercase">
                    DETAIL {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="mt-2 font-mono text-[9px] tracking-[0.18em] uppercase text-ink-faint">
                    {exp.location}
                  </div>
                  <div className="mt-6 max-w-[160px]">
                    <DimLine label={exp.period} />
                  </div>
                </aside>

                <div>
                  <h3 className="font-display font-light text-3xl md:text-4xl text-ink leading-tight">
                    {exp.company}
                  </h3>
                  <div className="mt-2 font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-ink-soft">
                    {exp.role}
                  </div>

                  <ol className="mt-9 grid md:grid-cols-2 gap-x-12 gap-y-4">
                    {exp.achievements.map((a, i) => (
                      <li
                        key={i}
                        className="grid grid-cols-[30px_1fr] gap-3 group/item"
                      >
                        <span className="font-mono text-[10px] text-safety/70 group-hover/item:text-safety transition-colors pt-[3px] tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[13px] leading-relaxed text-ink-soft group-hover/item:text-ink transition-colors duration-200">
                          {a}
                        </span>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-9 font-mono text-[10px] tracking-[0.15em] uppercase text-ink-faint">
                    <span className="text-ink-soft">MATERIALS —</span>{" "}
                    {exp.technologies.join(" / ")}
                  </div>
                </div>
              </article>
            </ScanReveal>
          ))}
        </div>
      </section>

      {/* ════ SHEET 04 — PRODUCTION SYSTEMS ════ */}
      <section
        id="section-projects"
        className="px-6 md:px-16 pt-24 md:pt-32 pb-20 md:pb-28 border-b border-rule"
      >
        <div className="max-w-6xl mx-auto">
          <GlitchHeader
            title="Technical Contributions"
            subtitle={`FINTECH · AI · MOBILE — ${SYSTEM_MODULES.length} ACTIVE SYSTEMS`}
            node="SHEET 04 · PRODUCTION SYSTEMS"
            color="amber"
          />

          {SYSTEM_MODULES.map((module, i) => (
            <ScanReveal key={module.id} delay={i * 80} color="amber">
              <ProjectCard module={module} index={i} />
            </ScanReveal>
          ))}
        </div>
      </section>

      {/* ════ SHEET 05 — REFERENCES ════ */}
      <section
        id="section-research"
        className="px-6 md:px-16 pt-24 md:pt-32 pb-20 md:pb-28 border-b border-rule"
      >
        <div className="max-w-6xl mx-auto">
          <GlitchHeader
            title="Research & Credentials"
            subtitle={`IEEE PUBLICATION · QUANTUM ML — ${CERTIFICATIONS.length} CERTIFICATIONS`}
            node="SHEET 05 · REFERENCES"
            color="cyan"
          />

          {/* Peer-reviewed publication — index card */}
          <MarginLabel>PEER-REVIEWED</MarginLabel>
          <div className="mt-4 space-y-6">
            {PUBLICATIONS.map((pub) => (
              <ScanReveal key={pub.id} color="cyan">
                <article className="relative border border-ink/30 bg-vellum/50 p-7 md:p-10">
                  {/* Corner ticks */}
                  <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-ink/60" />
                  <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-ink/60" />
                  <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-ink/60" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-ink/60" />

                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-[9px] md:text-[10px] tracking-[0.18em] uppercase">
                    <span className="text-draft">{pub.venue}</span>
                    <span className="text-ink-faint">{pub.date}</span>
                  </div>

                  <h3 className="mt-4 font-display font-light text-2xl md:text-[32px] leading-snug text-ink max-w-3xl">
                    {pub.title}
                  </h3>

                  <p className="mt-4 font-mono text-[10px] leading-relaxed text-ink-soft max-w-3xl">
                    {pub.authors}
                  </p>
                  <p className="mt-1 font-mono text-[9px] text-ink-faint italic">
                    {pub.authorNote}
                  </p>

                  <p className="mt-5 text-[13px] leading-relaxed text-ink-soft max-w-3xl">
                    {pub.summary}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-ink/15">
                    <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-ink-faint">
                      {pub.tags.join(" · ")}
                    </div>
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/see font-mono text-[10px] tracking-[0.25em] uppercase text-draft border-b border-draft/40 hover:border-draft pb-px transition-colors"
                    >
                      SEE PUBLICATION{" "}
                      <span className="inline-block transition-transform duration-200 group-hover/see:translate-x-0.5 group-hover/see:-translate-y-0.5">
                        ↗
                      </span>
                    </a>
                  </div>
                </article>
              </ScanReveal>
            ))}
          </div>

          {/* Verified credentials — catalog rows */}
          <div className="mt-20">
            <MarginLabel>VERIFIED CREDENTIALS</MarginLabel>
            <div className="mt-4 border-t border-ink/40">
              {CERTIFICATIONS.map((cert, i) => (
                <a
                  key={cert.id}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid grid-cols-[48px_1fr_auto] md:grid-cols-[72px_210px_1fr_auto] items-baseline gap-x-6 gap-y-2 border-b border-ink/15 py-6 group hover:bg-vellum/60 transition-colors duration-300"
                >
                  <span className="font-mono text-[10px] text-safety">
                    C-{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="hidden md:block font-mono text-[10px] tracking-[0.15em] uppercase text-ink-soft">
                    {cert.issuer} — {cert.date}
                  </span>
                  <span className="min-w-0">
                    <span className="font-display text-lg md:text-xl text-ink group-hover:text-draft transition-colors duration-300 leading-snug block">
                      {cert.title}
                    </span>
                    <span className="md:hidden mt-1 font-mono text-[9px] tracking-[0.12em] uppercase text-ink-faint block">
                      {cert.issuer} — {cert.date}
                    </span>
                    <span className="hidden md:block mt-2 text-[12px] leading-relaxed text-ink-faint max-w-xl">
                      {cert.summary}
                    </span>
                    <span className="mt-2 font-mono text-[9px] tracking-[0.15em] uppercase text-ink-faint block">
                      {cert.tags.join(" · ")}
                    </span>
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-draft opacity-60 group-hover:opacity-100 transition-opacity">
                    VERIFY{" "}
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
