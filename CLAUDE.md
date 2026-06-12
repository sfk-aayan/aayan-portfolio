# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server on port 3000
npm run build     # Production build (outputs to dist/)
npm run preview   # Preview the production build locally
npm run lint      # Type-check with tsc --noEmit (no test suite)
npm run deploy    # Build and push to GitHub Pages (gh-pages -d dist)
```

## Architecture

This is a single-page React/TypeScript portfolio deployed to GitHub Pages at base path `/aayan-portfolio/`. The entire site is one scrollable page with three content sections.

**Content lives in `src/data.ts`** — all text, projects, experience, skills, publications, and certifications are exported constants from this file. `src/types.ts` defines the interfaces. To update portfolio content, only `src/data.ts` needs editing.

**Layered z-index system in `src/App.tsx`:**
- z-0: Fullscreen background video (`CinematicVideo`)
- z-1/2: Dark overlay + vignette
- z-3: Parallax cyber-grid (scrolls at 4% of scroll position)
- z-10: Fixed HUD decorations + scanline bar (non-interactive)
- z-20+: Navbar and main content sections

**App startup sequence:** `BootSequence` (terminal animation) runs first at z-100, then fades out and triggers `App` to reveal content via opacity transition.

**Component structure:**
- `src/components/UI/` — shared primitives: `GlitchHeader`, `ScanReveal`, `Navbar`, `BootSequence`, `CustomCursor`
- `src/components/Hero/` — hero with typewriter text and video
- `src/components/Projects/` — project cards from `SYSTEM_MODULES` data
- `src/components/Philosophy/` — philosophy nodes from `PHILOSOPHY_NODES` data
- `src/hooks/` — custom hooks for scroll-based section detection, text scramble/typewriter effects, UTC clock, and desktop detection
- `src/lib/motionConfig.ts` — shared easing curve and duration constants for Framer Motion animations

## Styling

Tailwind CSS v4 is used via the `@tailwindcss/vite` plugin (not PostCSS). Custom CSS in `src/index.css` defines:
- `.cyber-grid` / `.cyber-grid-cyan` — background grid patterns
- `.glow-amber`, `.glow-cyan`, `.glow-text-*` — neon glow effects
- `.scanlines`, `.scanline-bar` — CRT scanline effects
- `.clip-tech-corners`, `.clip-tech-sm` — angular clip-path borders
- `.glitch-layer-cyan/amber`, `.glitch-header-track` — glitch animation layers used by `GlitchHeader`
- `.terminal-cursor` — blinking block cursor pseudo-element

The color palette is **amber** (primary accent) and **cyan** (secondary accent) on near-black (`#060606`). Fonts: Inter (sans), JetBrains Mono (mono), Space Grotesk (display).

System cursor is globally hidden (`cursor: none`) — `CustomCursor` renders a custom cursor element.

## Static Assets

Public assets (video, images) go in `public/` and must be referenced via `import.meta.env.BASE_URL` prefix (not hardcoded paths) to work correctly with the GitHub Pages base path. See `DEFAULT_VIDEO_URL` in `App.tsx` for the pattern.
