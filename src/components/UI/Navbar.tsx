import { motion } from "motion/react";
import { Github, Linkedin } from "lucide-react";
import { SOCIAL_LINKS } from "../../data";
import { useActiveSection, SectionKey } from "../../hooks/useActiveSection";
import { useLiveUTC } from "../../hooks/useLiveUTC";
import { requestSheetTransfer } from "./SheetTransfer";
import { motionConfig } from "../../lib/motionConfig";

const PLATES: { id: string; section: SectionKey; n: string; label: string }[] =
  [
    { id: "section-bio", section: "bio", n: "02", label: "OPERATOR" },
    { id: "section-experience", section: "experience", n: "03", label: "HISTORY" },
    { id: "section-projects", section: "projects", n: "04", label: "SYSTEMS" },
    { id: "section-research", section: "research", n: "05", label: "REFERENCES" },
    { id: "section-philosophy", section: "philosophy", n: "06", label: "NOTES" },
  ];

const SHEET_OF: Record<SectionKey, string> = {
  hero: "01",
  bio: "02",
  experience: "03",
  projects: "04",
  research: "05",
  philosophy: "06",
};

export default function Navbar() {
  const active = useActiveSection();
  const utc = useLiveUTC(1000);

  const transfer = (
    e: React.MouseEvent,
    targetId: string,
    sheetNo: string,
    label: string,
  ) => {
    e.preventDefault();
    requestSheetTransfer({ targetId, sheetNo, label });
  };

  return (
    <>
      {/* ── Drafting-tape nav chip ── */}
      <nav
        id="sys-nav"
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 rotate-[-0.4deg] select-none"
      >
        <div className="flex items-center gap-4 md:gap-6 bg-paper/95 backdrop-blur-sm border border-rule shadow-[0_2px_14px_rgba(9,30,53,0.25)] px-4 md:px-6 py-2.5">
          <a
            href="#section-hero"
            onClick={(e) => transfer(e, "section-hero", "01", "TITLE")}
            className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-ink whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 bg-safety" />
            <span className="font-semibold">S. FAIYAZ KARIM</span>
          </a>

          <span className="hidden md:block w-px h-3.5 bg-rule" />

          <div className="hidden md:flex items-center gap-5">
            {PLATES.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                onClick={(e) => transfer(e, p.id, p.n, p.label)}
                className={`relative font-mono text-[9px] tracking-[0.2em] transition-colors duration-200 whitespace-nowrap ${
                  active === p.section
                    ? "text-safety"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                <span className="opacity-60 mr-1">{p.n}</span>
                {p.label}
                {/* Active tick slides between plates like a drafting stop */}
                {active === p.section && (
                  <motion.span
                    layoutId="plate-tick"
                    className="absolute -bottom-[7px] left-0 right-0 h-[2px] bg-safety"
                    transition={{ duration: 0.35, ease: motionConfig.ease }}
                  />
                )}
              </a>
            ))}
          </div>

          <span className="w-px h-3.5 bg-rule" />

          <div className="flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-ink-soft hover:text-safety transition-colors duration-200"
            >
              <Github size={12} />
            </a>
            <a
              href={SOCIAL_LINKS.LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-ink-soft hover:text-draft transition-colors duration-200"
            >
              <Linkedin size={12} />
            </a>
          </div>
        </div>
      </nav>

      {/* ── Title block — bottom-right, like a real drawing sheet ── */}
      <aside className="fixed bottom-6 right-6 z-40 hidden lg:block pointer-events-none select-none">
        <div className="bg-paper/95 border border-ink/40 font-mono text-[9px] tracking-[0.12em] text-ink w-[230px] shadow-[0_2px_14px_rgba(9,30,53,0.2)]">
          <div className="grid grid-cols-[80px_1fr] border-b border-ink/25">
            <span className="px-2.5 py-1.5 text-ink-faint uppercase border-r border-ink/25">
              Drawn by
            </span>
            <span className="px-2.5 py-1.5">S. FAIYAZ KARIM</span>
          </div>
          <div className="grid grid-cols-[80px_1fr] border-b border-ink/25">
            <span className="px-2.5 py-1.5 text-ink-faint uppercase border-r border-ink/25">
              Sheet
            </span>
            <span className="px-2.5 py-1.5 tabular-nums">
              {/* New digit rolls in whenever the active sheet changes */}
              <motion.span
                key={SHEET_OF[active]}
                initial={{ y: 7, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: motionConfig.ease }}
                className="text-safety inline-block"
              >
                {SHEET_OF[active]}
              </motion.span>
              <span className="text-ink-faint"> · 06</span>
            </span>
          </div>
          <div className="grid grid-cols-[80px_1fr] border-b border-ink/25">
            <span className="px-2.5 py-1.5 text-ink-faint uppercase border-r border-ink/25">
              Scale
            </span>
            <span className="px-2.5 py-1.5">
              1:1 <span className="text-ink-faint">— REV C</span>
            </span>
          </div>
          <div className="grid grid-cols-[80px_1fr]">
            <span className="px-2.5 py-1.5 text-ink-faint uppercase border-r border-ink/25">
              Issued
            </span>
            <span className="px-2.5 py-1.5 tabular-nums">
              {utc.replace("T", " ").substring(0, 19)}Z
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
