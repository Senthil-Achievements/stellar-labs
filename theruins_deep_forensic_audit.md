# THERUINS — COMPLETE SYSTEM ARCHITECTURE & CODEBASE AUDIT

This document provides a complete, non-invasive architectural audit of the **THERUINS** codebase (Stellar Labs repository: `https://github.com/Senthil-Achievements/stellar-labs`).

---

## 1. PROJECT STRUCTURE

### Full Directory Tree (`src/`)

```
src/
├── components/
│   ├── CoverflowCarousel.tsx   # Shared 3D Coverflow desktop + single-track mobile touch carousel
│   ├── GlitterWrap.tsx         # WebGL/Canvas glitter particle background effect
│   ├── Portfolio.tsx           # Main page UI composition & section components
│   ├── RisingLines.tsx         # Animated background lines
│   ├── ShaderBackground.tsx    # Three.js / ShaderGradient background canvas
│   ├── SmoothScroll.tsx        # Lenis smooth scroll wrapper (desktop only)
│   ├── ThemeToggle.tsx         # Dark/Light mode theme toggle button
│   ├── VaporizeTextCycle.tsx   # Hero text cycling effect
│   └── WelcomeLoader.tsx       # Initial splash loader component
├── hooks/
│   └── use-mobile.tsx          # Responsive hooks (useIsMobile, usePrefersReducedMotion)
├── lib/
│   ├── lovable-error-reporting.ts # Error boundary reporting helper
│   └── utils.ts                # Class merging utility (clsx + tailwind-merge)
├── routes/
│   ├── __root.tsx              # TanStack Router root shell, meta tags, fonts, stylesheets
│   ├── index.tsx               # Home route wrapper
│   ├── about.tsx               # About route wrapper
│   ├── contact.tsx             # Contact route wrapper
│   ├── process.tsx             # Process route wrapper
│   ├── services.tsx            # Services route wrapper
│   └── work.tsx                # Work route wrapper
├── routeTree.gen.ts            # Auto-generated TanStack router tree
├── router.tsx                  # TanStack router creation
├── server.ts                   # TanStack Start server entry point
├── start.ts                    # TanStack Start entry point
└── styles.css                  # Tailwind v4 base styles, CSS variables, utility tokens, mobile overrides
```

### Framework & Rendering Mode

- **Framework:** React 19.2.0 + TanStack Router (`@tanstack/react-router`) + TanStack Start (`@tanstack/react-start`) + Vite 8.2.0 + Nitro (`nitro: "3.0.260603-beta"`).
- **Rendering Architecture:** Server-Side Rendering (SSR) with client-side hydration. Pre-built for Vercel deployment using Nitro's `vercel` preset (`functions/__server.func` serverless/edge functions).

---

## 2. CAROUSEL/SLIDER COMPONENT AUDIT

### Shared Carousel Component

- **Component File:** [src/components/CoverflowCarousel.tsx](file:///c:/Users/senth/OneDrive/Documents/Stellar%20Labs/src/components/CoverflowCarousel.tsx)
- **Shared vs Multiple:** There is **ONE shared, reusable `CoverflowCarousel` component** powering all 5 major feature carousels in the application.

### All Page Sections & Carousels

| Section Title                    | Location in Code      | Component Name                     | Mobile Responsive Logic                                                                                                                                          | Animation Library                      | Styling Approach                                              |
| :------------------------------- | :-------------------- | :--------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------- | :------------------------------------------------------------ |
| **What We Build** (Services)     | `Portfolio.tsx:L670`  | `Services` → `CoverflowCarousel`   | Switches to `MobileAnimatedCarousel` at `<768px` via `useIsMobile()`                                                                                             | Framer Motion 12                       | Tailwind CSS + `.carousel-card-*` CSS classes in `styles.css` |
| **How We Work** (Process)        | `Portfolio.tsx:L748`  | `Process` → `CoverflowCarousel`    | Switches to `MobileAnimatedCarousel` at `<768px` via `useIsMobile()`                                                                                             | Framer Motion 12                       | Tailwind CSS + `.carousel-card-*` CSS classes in `styles.css` |
| **Why THERUINS** (Outcomes)      | `Portfolio.tsx:L1020` | `WhyUs` → `CoverflowCarousel`      | Switches to `MobileAnimatedCarousel` at `<768px` via `useIsMobile()`                                                                                             | Framer Motion 12                       | Tailwind CSS + `.carousel-card-*` CSS classes in `styles.css` |
| **Technology Stack** (Toolchain) | `Portfolio.tsx:L1074` | `TechStack` → `CoverflowCarousel`  | Switches to `MobileAnimatedCarousel` at `<768px` via `useIsMobile()`                                                                                             | Framer Motion 12                       | Tailwind CSS + `.carousel-card-*` CSS classes in `styles.css` |
| **Industries** (Sectors)         | `Portfolio.tsx:L1125` | `Industries` → `CoverflowCarousel` | Switches to `MobileAnimatedCarousel` at `<768px` via `useIsMobile()`                                                                                             | Framer Motion 12                       | Tailwind CSS + `.carousel-card-*` CSS classes in `styles.css` |
| **Featured Work** (Case Studies) | `Portfolio.tsx:L915`  | `Work` (Projects)                  | Desktop (`≥768px`): Sticky pin scroll (`useScroll`, `useTransform`). Mobile (`<768px`): Native horizontal snap scroll (`snap-x snap-mandatory overflow-x-auto`). | Framer Motion 12                       | Tailwind CSS utility classes                                  |
| **Testimonials** (Quotes)        | `Portfolio.tsx:L1164` | `Testimonials`                     | Centered glass card quote box with dot pagination; mobile uses scaled quote typography (`1rem`).                                                                 | Framer Motion 12 (`motion.blockquote`) | Tailwind CSS + `.glass-card` in `styles.css`                  |
| **Marquee** (Client/Tech Ticker) | `Portfolio.tsx:L1449` | `Marquee`                          | Infinite CSS hardware-accelerated horizontal scroll (`@keyframes marquee`).                                                                                      | Pure CSS Animation                     | Tailwind CSS + `.marquee-word` in `styles.css`                |

---

## 3. VIEWPORT & RESPONSIVE SETUP

### Meta Viewport Tag

Defined in `src/routes/__root.tsx` (line 79):

```tsx
{ name: "viewport", content: "width=device-width, initial-scale=1" }
```

### Media Query Breakpoints Defined

- Primary Breakpoint: **`768px`** (`min-width: 768px` / `max-width: 767px`).
- Managed in:
  - `src/hooks/use-mobile.tsx` (`MOBILE_BREAKPOINT = 768`).
  - `src/components/SmoothScroll.tsx` (`if (window.innerWidth < 768) return;`).
  - `src/styles.css` (Mobile overrides block at `@media (max-width: 767px)`).
- Tailwind CSS v4 default breakpoints (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`).

### Global Responsive Hook

- Hook File: [src/hooks/use-mobile.tsx](file:///c:/Users/senth/OneDrive/Documents/Stellar%20Labs/src/hooks/use-mobile.tsx)
- Provides `useIsMobile()`, which uses `window.matchMedia("(max-width: 767px)")` to dynamically track screen resize events.

---

## 4. STYLING APPROACH

### CSS Methodology

- **Framework:** Tailwind CSS v4 (`@import "tailwindcss" source(none); @source "../src"; @import "tw-animate-css";`).
- **Theming Architecture:** Dual-theme system using CSS custom variables (`:root` for Dark Mode default, `:root.light` / `html.light` for Light Mode).
- **Utility Tokens:** Tailwind `@utility` directives defined in `styles.css` (`glass-card`, `glow-gold`, `grid-bg`, `noise`, `hairline`, `text-gradient-accent`).

### Global Styles File

- File Path: [src/styles.css](file:///c:/Users/senth/OneDrive/Documents/Stellar%20Labs/src/styles.css) (imported in `src/routes/__root.tsx` line 12 as `appCss`).

### Overrides & Important Directives

In `src/styles.css` lines 1103–1303, an explicit mobile overrides block uses `!important` rules to enforce mobile typography and section padding:

- `section#top { min-height: auto !important; padding-top: 5rem !important; }`
- `section { padding-top: 2.5rem !important; padding-bottom: 2.5rem !important; }`
- `h1 { font-size: 2rem !important; line-height: 1.1 !important; }`
- `h2 { font-size: 1.5rem !important; line-height: 1.15 !important; }`
- `.backdrop-blur-xl { backdrop-filter: blur(12px) !important; }`
- `.scroll-hint { display: none !important; }`

---

## 5. BUILD & DEPLOYMENT

- **Host & Deployment Target:** Vercel via Nitro `preset: "vercel"` configured in `vite.config.ts`.
- **Output Structure:** Builds into `.vercel/output/` containing static assets (`.vercel/output/static/assets/`) and Vercel serverless/edge function bundles (`.vercel/output/functions/__server.func/`).
- **Cache Invalidation:** Static assets use content-hashed filenames generated by Vite (e.g. `Portfolio-BMj6mJyQ.js`, `styles-DT_erJHu.css`), ensuring instant cache busting on production deploys.

---

## 6. LIST ALL SECTIONS WITH SIMILAR UI PATTERNS

Besides `CoverflowCarousel`, the project contains the following repeating UI patterns:

1. **Glass Cards (`.glass-card`, `.case-card`):**
   - Locations: Hero console, Services, Process, Case Studies (`Work`), WhyUs, TechStack, Industries, Testimonials, FAQ, Final CTA.
   - Mechanism: Translucent background + `backdrop-filter: blur(...)` + subtle border.
2. **FAQ Accordion (`FaqSection` in `Portfolio.tsx`):**
   - Location: `Portfolio.tsx:L1210`
   - Mechanism: `AnimatePresence` + `motion.div` height and opacity transitions.
3. **3D Tilt Cards (`ServiceCard`, `ProjectCard` in `Portfolio.tsx`):**
   - Location: `Portfolio.tsx:L708`, `L793`
   - Mechanism: Mouse tracking `onMouseMove` calculates tilt coordinates applying CSS `perspective(1000px) rotateX(...) rotateY(...)`.
4. **Sticky Horizontal Scroll Pin (`Work` in `Portfolio.tsx`):**
   - Location: `Portfolio.tsx:L957`
   - Mechanism: Sticky `100vh` viewport container inside a tall `300vh` wrapper, animating track `x` translation via Framer Motion `useScroll` + `useTransform`.
