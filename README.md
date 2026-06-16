# Suryapura Gram Vikas Portal · सूर्यपुरा ग्राम विकास पोर्टल

A premium, mobile-first, bilingual (Devanagari + Latin) landing page for a
fictional rural-development portal — *"प्रगति का नया सवेरा, परंपरा के संग."*

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**,
**shadcn/ui** (Base UI primitives), **next-themes**, and **lucide-react** —
crafted against the [`impeccable`](.agents/skills/impeccable) design skill.

## Two crafted themes

- **Light · "Mitti & Dawn"** — warm clay/cream (`#FAF8F5`), never blinding white.
- **Dark · "आंखों की सुरक्षा / Visual Comfort"** — midnight-forest green
  (`#0B1A12`) with warm, non-glare saffron/amber text, built to rest eyes after
  fieldwork and save battery. Toggle via the **Eye Care** button (with an
  emotional tooltip). Both palettes share one set of per-theme CSS variables, so
  every component adapts with no per-element `dark:` classes.

## Stand-out features

- **Eye Care theme toggle** — `next-themes`, shadcn Tooltip, warm transition.
- **Premium Hindi testimonials** (*ग्रामीणों के विचार*) — dual-row infinite
  marquee of glassmorphic cards with hover tilt + ambient radial glow (CSS-only).
- **Digital Chaupal** — a warm, live community notice board (*गाँव की ताज़ा हलचल*).
- **Re-imagined pillars** — shadcn Cards with Lucide gradient icons: किसान समृद्धि,
  विद्या दीप, विकास की रफ़्तार (live timeline), पंचायत बही-खाता, डिजिटल पहचान.
- **Hero** — glowing-ring Ambassador avatar, italic vision blockquote, prominent
  pulsing voice-search mic.
- **Sticky Quick Contact** — scroll-revealed WhatsApp + Emergency (112) FAB.

## Conventions

- **Components**: arrow-function syntax throughout.
- **`"use client"`** only where needed — `Header`, `ThemeToggle`, `VoiceSearch`,
  `QuickContact`, `theme-provider`. Hero, Pillars, Chaupal, Testimonials,
  ActionBand, Footer stay Server Components.
- **Tokens**: OKLCH; shadcn (`--background`, `--card`, `--primary` …) and app
  (`--color-surface`, `--color-ink`, `--color-band` …) names resolve from the
  same per-theme variables in [`src/app/globals.css`](src/app/globals.css).
- **Type**: Bricolage Grotesque (display) + Mukta (body + Devanagari).
- **Motion**: orchestrated entrance, marquee, progress fills, pulse — all with a
  `prefers-reduced-motion` path. Imagery via `next/image` (verified Unsplash).

> All data in [`src/lib/content.ts`](src/lib/content.ts) is illustrative demo
> content.

## Run

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint
```
