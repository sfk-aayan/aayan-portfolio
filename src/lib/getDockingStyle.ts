import React from "react";
import { SectionKey } from "../hooks/useActiveSection";

const TRANSITION =
  "left 1.2s cubic-bezier(0.25, 1, 0.3, 1), " +
  "top 1.2s cubic-bezier(0.25, 1, 0.3, 1), " +
  "width 1.2s cubic-bezier(0.25, 1, 0.3, 1), " +
  "transform 1.2s cubic-bezier(0.25, 1, 0.3, 1), " +
  "opacity 0.6s ease";

const MOBILE_EXPAND_TRANSITION =
  TRANSITION +
  ", width 0.4s cubic-bezier(0.25, 1, 0.3, 1)" +
  ", height 0.4s cubic-bezier(0.25, 1, 0.3, 1)" +
  ", max-width 0.4s cubic-bezier(0.25, 1, 0.3, 1)";

const DESKTOP_POSITIONS: Record<SectionKey, React.CSSProperties> = {
  hero: {
    position: "fixed",
    top: "50%",
    left: "50%",
    right: "auto",
    transform: "translate(-50%, -50%)",
    width: "46vw",
    maxWidth: "780px",
    zIndex: 40,
  },
  bio: {
    position: "fixed",
    top: "50%",
    left: "calc(100vw - 36vw - 3vw)",
    right: "auto",
    transform: "translateY(-50%)",
    width: "36vw",
    maxWidth: "500px",
    zIndex: 40,
  },
  experience: {
    position: "fixed",
    top: "50%",
    left: "3vw",
    right: "auto",
    transform: "translateY(-50%)",
    width: "36vw",
    maxWidth: "500px",
    zIndex: 40,
  },
  projects: {
    position: "fixed",
    top: "50%",
    left: "calc(100vw - 36vw - 3vw)",
    right: "auto",
    transform: "translateY(-50%)",
    width: "36vw",
    maxWidth: "500px",
    zIndex: 40,
  },
  research: {
    position: "fixed",
    top: "50%",
    left: "3vw",
    right: "auto",
    transform: "translateY(-50%)",
    width: "36vw",
    maxWidth: "500px",
    zIndex: 40,
  },
  philosophy: {
    position: "fixed",
    top: "50%",
    left: "calc(100vw - 36vw - 3vw)",
    right: "auto",
    transform: "translateY(-50%)",
    width: "36vw",
    maxWidth: "500px",
    zIndex: 40,
  },
};

export function getDockingStyle(
  section: SectionKey,
  isDesktop: boolean,
  pipExpanded: boolean,
): React.CSSProperties {
  if (!isDesktop) {
    return {
      position: "fixed",
      top: "76px",
      right: "12px",
      left: "auto",
      transform: "none",
      width: pipExpanded ? "42vw" : "48px",
      maxWidth: pipExpanded ? "200px" : "48px",
      height: pipExpanded ? "auto" : "32px",
      zIndex: 50,
      transition: MOBILE_EXPAND_TRANSITION,
      overflow: "hidden",
      cursor: "pointer",
      borderRadius: "4px",
      boxShadow: pipExpanded
        ? "0 0 0 1px rgba(245,158,11,0.2), 0 8px 32px rgba(0,0,0,0.7)"
        : "0 0 0 1px rgba(245,158,11,0.12)",
    };
  }

  return {
    ...DESKTOP_POSITIONS[section],
    transition: TRANSITION,
  };
}
