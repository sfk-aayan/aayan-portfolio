# Shaikh Faiyaz Karim's Engineering Portfolio

A single-page portfolio designed as a six-sheet engineering drawing set, featuring a dark blueprint hero that scrolls beneath a light paper overlay. Built with React, TypeScript, and Tailwind CSS.

## 🎨 Design Concept

The portfolio embodies an "Issued for Construction" engineering aesthetic:
- **Sheet 01 (Hero):** Cyanotype blueprint backdrop with cinematic video
- **Sheets 02–06:** Technical drawing paper overlay with projects, experience, research, and philosophy
- Scroll-linked parallax creates depth as the paper stack slides over the blueprint
- Custom crosshair cursor and vintage scroll ruler enhance the drafting experience

## 🚀 Quick Start

**Prerequisites:** Node.js 16+

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Type-check
npm run lint

# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## 📦 Tech Stack

- **Framework:** React 18 + TypeScript
- **Styling:** Tailwind CSS v4 (via @tailwindcss/vite)
- **Animations:** Motion v12 (motion/react)
- **Fonts:** Google Fonts (Fraunces, Inter, IBM Plex Mono)
- **Deployment:** GitHub Pages

## 📋 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Hero.tsx         # Blueprint hero with video
│   ├── Navbar.tsx       # Navigation and sheet tracking
│   ├── ProjectsSection/ # Project cards and grid
│   ├── ExperienceSection/
│   ├── PhilosophySection/
│   └── ...other sections
├── data.ts              # All content (text, projects, experience, skills)
├── types.ts             # TypeScript interfaces
├── App.tsx              # Main layout and scroll logic
├── index.css            # Design tokens and custom utilities
└── lib/
    └── motionConfig.ts  # Shared animation constants

public/
├── images/
│   └── favicon.svg
└── videos/              # Hero video

dist/                    # Production build (gitignored)
```

## ✏️ Editing Content

All portfolio content lives in **`src/data.ts`** and is exported as constants:
- `projects` – Featured work and case studies
- `experience` – Professional background
- `skills` – Technical and domain expertise
- `publications` – Articles and research
- `certifications` – Credentials and awards

Each item has an `id` field (legacy key) and is rendered with auto-generated reference codes (`FIG. 01`, `DETAIL A`, etc.) by their respective components.

**Do not edit design or styling** to match content changes—update `src/data.ts` and the components will adapt.

## 🎯 Key Components

### `Hero` (Sheet 01)
Sticky blueprint background with cinematic video fade-on-loop. Uses `grayscale` + `mix-blend-luminosity` for the cyanotype effect.

### `Navbar`
Displays active sheet number and label. Section tracking via `useActiveSection` hook that watches element IDs:
- `section-hero`, `section-bio`, `section-experience`, `section-projects`, `section-research`, `section-philosophy`

### `SheetTransfer`
Custom transition overlay that wipes across the viewport when jumping between sections, hiding the instant scroll beneath.

### `CustomCursor`
Full-viewport crosshair rendered with `mix-blend-difference` to remain visible over both blueprint and paper zones.

## 🎨 Styling & Theming

All design tokens are Tailwind `@theme` variables in `src/index.css`:

**Paper World:**
- `paper` – Off-white background
- `vellum` – Aged paper tone
- `ink` – Text color
- `rule` – Grid lines

**Blueprint World:**
- `print` – Blueprint background
- `chalk` – Annotation white
- `draft` – Drafting blue accent

**Accents:**
- `safety` – International orange
- `stamp` – Rubber-stamp red

Custom utilities include:
- `.millimeter` – Graph grid pattern
- `.paper-grain` – Texture overlay
- `.ghost-numeral` – Outline margin numbers
- `.plot-sweep` – Keyframes for reveal animations

## 🌐 Deployment

The site is deployed to GitHub Pages at `/aayan-portfolio/`. The build automatically handles the base path via `import.meta.env.BASE_URL`.

**To deploy:**
```bash
npm run deploy
```

This builds the project and pushes to the `gh-pages` branch.

## ⚙️ Configuration

Key files for customization:
- **Content:** `src/data.ts`
- **Layout:** `src/App.tsx`
- **Styling:** `src/index.css` (theme variables)
- **Motion:** `src/lib/motionConfig.ts` (animations)
- **Favicon:** `public/images/favicon.svg`
- **Hero video:** `public/videos/` (update `VIDEO_URL` in `Hero.tsx`)

## 🎬 Animation Library

Uses **Motion v12** — always import from `"motion/react"`, not `"framer-motion"` (which is only a transitive dependency).

Shared easing and duration constants are defined in `src/lib/motionConfig.ts` for consistency.

## ♿ Accessibility

- Respects `prefers-reduced-motion` (section transitions become instant jumps)
- Custom cursor is disabled on touch devices
- Semantic HTML structure with proper heading hierarchy

## 📝 License

Personal portfolio project.

---

**Questions?** Check the `CLAUDE.md` file for detailed architecture notes and development guidelines.
