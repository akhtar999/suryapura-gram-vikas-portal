# Design

## Theme

"Dawn over the fields." A bright, optimistic, daylight surface — soft off-white
washed with the faintest green — carrying deep organic-green structure and a
single warm saffron/sun-gold accent that plays the role of the rising sun.
Light mode only; this is a daytime, outdoor product. Premium and calm, with
warmth carried by photography and language rather than decorative chrome.

Color strategy: **Committed** — deep green carries primary structure (headers,
CTAs, footer), saffron-gold is the single accent (the sun, glows, highlights,
underlines). Pure-white cards lift off the tinted page.

## Color (OKLCH)

| Token            | OKLCH                    | Role |
|------------------|--------------------------|------|
| `--bg`           | `oklch(0.985 0.008 140)` | Page — soft off-white, whisper of green |
| `--surface`      | `oklch(1 0 0)`           | Cards, panels (pure white, lifts off bg) |
| `--surface-sunk` | `oklch(0.962 0.013 145)` | Recessed bands, muted panels |
| `--ink`          | `oklch(0.26 0.026 152)`  | Body text (≈11:1 on bg) |
| `--ink-strong`   | `oklch(0.18 0.030 152)`  | Headings, deep green-black |
| `--muted`        | `oklch(0.46 0.022 150)`  | Secondary text (≥4.5:1) |
| `--primary`      | `oklch(0.43 0.097 151)`  | Deep organic green — CTAs, structure |
| `--primary-deep` | `oklch(0.31 0.072 152)`  | Footer, hover, dark green surfaces |
| `--gold`         | `oklch(0.80 0.150 73)`   | Sun-gold — glows, sun motif, accent rule |
| `--gold-soft`    | `oklch(0.935 0.060 80)`  | Pale saffron badge fill (dark text on it) |
| `--ochre`        | `oklch(0.55 0.130 56)`   | Deep amber — accent text/icons on white |
| `--line`         | `oklch(0.90 0.013 150)`  | Hairline borders |

Text-on-fill: deep-green primary fills carry **white** text. Saffron is used
decoratively (sun, glow, rules); where saffron carries text it is the pale
`--gold-soft` fill with deep-green ink. Never saffron-on-saffron text.

## Typography

Two families on a contrast axis (display grotesque + humanist text), chosen for
voice and for first-class Devanagari — not from the reflex list.

- **Display / headings:** Bricolage Grotesque (variable). Characterful, slightly
  humanist grotesque with optical sizing — warm and confident, not corporate.
- **Body + all Devanagari:** Mukta (EkType). A humanist sans designed in India
  for Devanagari + Latin; warm, highly legible at small sizes on cheap screens.

Scale: fluid `clamp()`, ratio ≥ 1.25. Display H1 max ≤ 5rem. Display tracking
≥ -0.03em (never tighter). `text-wrap: balance` on headings, `pretty` on prose.
Body line length capped ~68ch.

## Components

- **Glass navbar** — `backdrop-blur` + `bg-surface/72`, hairline bottom border.
  The one deliberate glass surface (purposeful: it floats over hero imagery).
- **Cards/panels** — pure white, `rounded-2xl` (16px), single hairline border OR
  one soft shadow (never both), generous padding. Largest feature panels may use
  `rounded-3xl` (24px). No nested cards.
- **Pillars** — a *bento* of differently-sized functional modules (live progress
  bars, mandi prices, notice board), not a uniform icon-card grid.
- **Buttons** — primary = solid green + white text; secondary = white + green
  border; min height 48px, `rounded-full` for the thumb-first quick actions.
- **Sun mark** — saffron sun rising over green field strokes; the logo + a
  recurring motif (hero glow, section accents).

## Motion

One orchestrated hero entrance (staggered fade-rise, exponential ease-out),
CSS-only. Progress bars fill on load (not scroll-gated; content visible by
default). Quick-action buttons have a tactile press/hover. Everything has a
`prefers-reduced-motion: reduce` path (instant/crossfade). No bounce, no elastic,
no fade-on-scroll-per-section reflex.

## Layout

Mobile-first. Fluid `clamp()` spacing that breathes on desktop. Content max-width
~1200px. Asymmetric hero (copy + leader spotlight). Bento pillars collapse to a
single readable column on phones. Generous separation between movements, tight
grouping within them.
