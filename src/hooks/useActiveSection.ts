import { useState, useEffect } from "react";

export type SectionKey =
  | "hero"
  | "bio"
  | "experience"
  | "projects"
  | "research"
  | "philosophy";

const SECTION_MAP: { id: string; name: SectionKey }[] = [
  { id: "section-hero", name: "hero" },
  { id: "section-bio", name: "bio" },
  { id: "section-experience", name: "experience" },
  { id: "section-projects", name: "projects" },
  { id: "section-research", name: "research" },
  { id: "section-philosophy", name: "philosophy" },
];

export function useActiveSection(
  initialSection: SectionKey = "hero",
): SectionKey {
  const [activeSection, setActiveSection] =
    useState<SectionKey>(initialSection);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = SECTION_MAP.find((s) => s.id === entry.target.id);
            if (match) setActiveSection(match.name);
          }
        });
      },
      { root: null, rootMargin: "-30% 0px -40% 0px", threshold: 0 },
    );

    SECTION_MAP.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
