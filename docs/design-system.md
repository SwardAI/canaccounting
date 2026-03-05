# Design System & Visual Direction

## READ THIS FIRST
This file defines the exact visual language and tech choices for the site. Every component, page, and element should follow these guidelines. The goal is a site that looks like it was designed by a premium agency for a financial services company — clean, modern, professional, trustworthy.

---

## Frontend Stack

| Tool | Purpose | Why |
|------|---------|-----|
| **Next.js 15** (App Router) | Framework | SEO, SSR, fast, industry standard |
| **TypeScript** | Language | Type safety, better DX with Claude Code |
| **shadcn/ui** | Component library | Beautiful, accessible, fully customizable components. You own the code. |
| **Tailwind CSS v4** | Styling | Utility-first, pairs perfectly with shadcn/ui |
| **Radix UI** | Primitives | Powers shadcn/ui under the hood — accessibility built-in |
| **Framer Motion** (`motion`) | Animations | Production-grade React animations, scroll reveals, hover effects, page transitions |
| **Lucide React** | Icons | Clean, consistent icon set, recommended by shadcn/ui |
| **next-themes** | Dark/light mode | Optional but easy to add later if needed |

### shadcn/ui Components to Install
Install these components as needed during development:
```bash
npx shadcn@latest add button card badge separator accordion dialog sheet navigation-menu
```

Key components you'll use:
- **Button** — CTAs, nav actions
- **Card** — Pricing tiers, feature cards, testimonials
- **Badge** — Trust labels, tier highlights ("Most Popular")
- **Accordion** — FAQ section
- **Sheet** — Mobile navigation drawer
- **Navigation Menu** — Desktop nav
- **Separator** — Section dividers
- **Dialog** — Chat widget window (or custom)

### Project Structure (shadcn/ui standard)
```
project-root/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── pricing/page.tsx
│   ├── faq/page.tsx
│   ├── success/page.tsx
│   ├── api/
│   │   ├── checkout/route.ts
│   │   ├── chat/route.ts
│   │   └── webhook/route.ts
│   └── globals.css
├── components/
│   ├── ui/                    # shadcn/ui components (auto-generated)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── ...
│   ├── layout/                # Layout components
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── sections/              # Page sections
│   │   ├── hero.tsx
│   │   ├── how-it-works.tsx
│   │   ├── features.tsx
│   │   ├── pricing-cards.tsx
│   │   ├── testimonials.tsx
│   │   ├── about.tsx
│   │   ├── trust-signals.tsx
│   │   └── faq-section.tsx
│   └── chat/                  # Chatbot components
│       ├── chat-widget.tsx
│       └── chat-window.tsx
├── lib/
│   ├── utils.ts               # shadcn/ui utility (cn function)
│   ├── stripe.ts
│   └── chatbot-prompt.ts
├── components.json            # shadcn/ui config
├── tailwind.config.ts
└── next.config.ts
```

---

## Aesthetic Direction

**Clean, modern, professional.** The kind of site that makes someone think "these people are serious" within 3 seconds.

Reference sites for the vibe:
- **Mercury** (mercury.com) — clean financial services, lots of whitespace
- **Wise** (wise.com) — trustworthy, clear, modern
- **Ramp** (ramp.com) — bold but professional
- **Linear** (linear.app) — beautiful minimal dark sections
- **Stripe** (stripe.com) — the gold standard of professional tech design

We're not copying any of these — but the feeling should be in the same family. Clean, confident, spacious.

---

## Color System

Use shadcn/ui's CSS variable system in `globals.css`. This keeps everything consistent and makes theming easy.

```css
@layer base {
  :root {
    /* Base */
    --background: 210 40% 98%;        /* Very light blue-gray */
    --foreground: 222 47% 11%;        /* Near black for text */
    
    /* Card surfaces */
    --card: 0 0% 100%;                /* White */
    --card-foreground: 222 47% 11%;
    
    /* Primary — Deep navy (headers, dark sections) */
    --primary: 217 33% 17%;           /* #1E293B — slate-800 */
    --primary-foreground: 210 40% 98%;
    
    /* Accent — Emerald green (CTAs, highlights) */
    --accent: 160 84% 39%;            /* #059669 — emerald-600 */
    --accent-foreground: 0 0% 100%;
    
    /* Secondary — Soft gray for secondary elements */
    --secondary: 210 40% 96%;
    --secondary-foreground: 222 47% 11%;
    
    /* Muted text and backgrounds */
    --muted: 210 40% 96%;
    --muted-foreground: 215 16% 47%;
    
    /* Borders */
    --border: 214 32% 91%;
    --ring: 160 84% 39%;              /* Focus rings match accent */
    
    /* Radius — slightly rounded, modern feel */
    --radius: 0.625rem;               /* 10px — not too sharp, not too bubbly */
  }
}
```

### Color Usage Rules
- **Dark sections** (hero, CTA bands, footer): Use `--primary` as background, white text
- **Light sections** (features, how it works): Use `--background` or white
- **CTA buttons**: Always `--accent` (emerald) — this is the action color
- **Trust/highlight badges**: Emerald with low opacity background
- **Body text**: `--foreground` on light, white on dark
- **Secondary text**: `--muted-foreground`
- **Alternate sections**: Alternate between dark and light backgrounds for visual rhythm

---

## Typography

Use Google Fonts. Import in `app/layout.tsx` using `next/font/google`:

```typescript
import { DM_Sans, DM_Serif_Display } from 'next/font/google'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-sans'
})

const dmSerif = DM_Serif_Display({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif'
})
```

| Element | Font | Weight | Size (desktop) | Size (mobile) |
|---------|------|--------|----------------|---------------|
| H1 (Hero headline) | DM Serif Display | 400 | 56–64px | 36–40px |
| H2 (Section titles) | DM Serif Display | 400 | 40–48px | 28–32px |
| H3 (Card titles) | DM Sans | 700 | 24px | 20px |
| Body text | DM Sans | 400 | 16–18px | 16px |
| Small / captions | DM Sans | 500 | 14px | 13px |
| Buttons | DM Sans | 600 | 16px | 16px |
| Nav links | DM Sans | 500 | 15px | 15px |

**Why this pairing:** DM Serif Display gives headings authority and elegance (perfect for financial services). DM Sans is its natural companion — clean and highly readable. Together they feel premium without being stuffy.

**Rule:** NEVER use Inter, Roboto, Arial, or system fonts. These make any site look like a generic template.

---

## Spacing & Layout

- **Max content width:** 1200px (use `max-w-7xl mx-auto` in Tailwind)
- **Section padding:** `py-24` on desktop (96px), `py-16` on mobile (64px)
- **Section horizontal padding:** `px-6` on mobile, `px-8` on tablet+
- **Card padding:** `p-8` to `p-10` — generous internal space
- **Grid gaps:** `gap-8` between cards (32px), `gap-6` on mobile
- **Hero:** Asymmetric layout — text ~55% on left, visual on right. Stack on mobile.
- **Section rhythm:** Alternate dark/light backgrounds. Never have two same-colored sections in a row.

---

## Component Patterns

### Buttons (extend shadcn/ui Button)
```
Primary CTA:    bg-emerald-600, white text, hover:bg-emerald-700, 
                px-8 py-4, rounded-lg, font-semibold
                Add subtle scale on hover: whileHover={{ scale: 1.02 }}

Secondary:      bg-transparent, border border-white (on dark) or border-slate-300 (on light)
                hover: fill with low-opacity white/slate

Ghost:          No border, text only, underline on hover
```
Buttons should always feel generous — never small or cramped. Minimum `py-3 px-6`.

### Cards (use shadcn/ui Card)
- On dark sections: `bg-slate-800/50 border-slate-700` with `backdrop-blur-sm`
- On light sections: `bg-white shadow-lg border-slate-100`
- `rounded-xl` (16px radius)
- Hover: subtle lift with Framer Motion — `whileHover={{ y: -4 }}` + shadow increase
- Transition: `transition={{ duration: 0.2 }}`

### Pricing Cards
- Use shadcn Card as base
- "Most Popular" tier: highlighted with emerald border + Badge at top
- Include checkmark icons (Lucide `Check`) for feature lists
- CTA button at bottom of each card
- Price should be the largest text in the card

### Trust Signal Row
- Horizontal row of 4-5 items
- Each: Lucide icon (Shield, CheckCircle, Globe, Lock) + short text
- Muted color on dark backgrounds, subtle on light
- `flex items-center gap-3` for each item, `flex-wrap justify-center gap-8` for the row

### Testimonials
- Use shadcn Card
- Large italic quote text (18-20px)
- Client name in bold, role + location in muted text
- Decorative quotation mark (large, low opacity, positioned absolutely)
- Layout: 2-3 cards in a row, stack on mobile

### FAQ (use shadcn/ui Accordion)
- Clean, minimal accordion
- Generous padding in each item
- Smooth open/close animation (built into shadcn Accordion)
- Plus/minus or chevron icon for toggle

### How It Works
- 3 steps in a horizontal row (vertical on mobile)
- Each step: large number (01, 02, 03) or Lucide icon, title, short description
- Connected by a subtle line or arrow between steps
- Numbers/icons in emerald accent color

---

## Animations (Framer Motion)

Import as needed in client components:
```typescript
"use client"
import { motion } from "framer-motion"
```

### Scroll Reveal (use on every section)
```typescript
const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.5, ease: "easeOut" }
}

// Usage: <motion.div {...fadeInUp}>
```

### Staggered Children (for card grids, feature lists)
```typescript
const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
}
```

### Hover Effects
- Cards: `whileHover={{ y: -4 }}` with shadow change via CSS
- Buttons: `whileHover={{ scale: 1.02 }}` `whileTap={{ scale: 0.98 }}`
- Links: CSS underline animation (slide in from left)

### Hero
- Content fades in on page load (not scroll-triggered)
- Stagger: headline → subheadline → CTA button (100ms delays)
- Optional: subtle floating animation on the visual element

### Rules
- Keep all animations subtle and professional. This is a financial services site, not a portfolio.
- Duration: 0.3–0.6s maximum for most things
- Ease: "easeOut" for reveals, spring for interactive (hover/tap)
- `viewport: { once: true }` — never replay animations on scroll back up

---

## Visual Polish Details

### Subtle Background Textures
On dark sections, add a very faint dot grid or noise pattern:
```css
.dark-section {
  background-image: radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

### Gradient Glow
Behind the hero CTA area, add a soft radial gradient:
```css
.hero-glow {
  background: radial-gradient(ellipse at center, rgba(5, 150, 105, 0.08) 0%, transparent 70%);
}
```

### Stripe Badge
Near the pricing section, include "Secured by Stripe" with the Stripe logo or a lock icon. This is a strong trust signal for payments.

---

## What to AVOID

- Purple gradients (screams "AI-generated template")
- Inter, Roboto, Arial, system fonts
- Evenly distributed rainbow palettes
- Stock photos of people in suits
- Tiny cramped buttons
- Low-contrast gray-on-gray text
- Cookie-cutter Bootstrap/template layouts
- Emojis on marketing pages
- Excessive drop shadows
- Too many competing colors
- Rounded-full on cards (keep rounded-xl)
- Cluttered sections — when in doubt, remove elements

---

## Mobile Requirements

- Hero text readable and impactful at 36px+
- CTA buttons full-width on mobile, min height 48px (touch-friendly)
- Cards stack vertically with consistent spacing
- Navigation collapses to a Sheet (shadcn/ui) hamburger menu
- Testimonials single column
- Every section should look intentional on mobile — not just "squeezed down desktop"
- Test the pricing cards carefully on mobile — they need to be clear and scannable

---

## Summary for Claude Code

When building, always remember:
1. **shadcn/ui first** — use its components as the foundation, customize from there
2. **Framer Motion for life** — every section gets a scroll reveal, cards get hover effects
3. **DM Serif Display + DM Sans** — this font pairing is non-negotiable
4. **Emerald accent on dark navy** — the core visual identity
5. **Generous spacing** — when in doubt, add more whitespace
6. **Details matter** — subtle textures, smooth animations, consistent borders. These are what make a site feel professional vs. amateur
