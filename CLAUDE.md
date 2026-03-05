# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tax & accounting service platform for non-US residents who own US LLCs. Marketing site with Stripe checkout, AI chatbot for pre-purchase questions, and email-based post-purchase communication. No user accounts or client portal.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Payments:** Stripe Checkout
- **AI Chat:** Anthropic Claude API
- **Email:** Resend
- **Hosting:** Vercel

## Commands

```bash
# Development
npm run dev

# Build
npm run build

# Lint
npm run lint

# Add shadcn/ui components
npx shadcn@latest add [component-name]
```

## Architecture

### Key Flows

**Payment:** Pricing page → `/api/checkout` → Stripe Checkout → `/success` → Stripe webhook → Resend confirmation email

**Chatbot:** Chat widget → `/api/chat` → Anthropic API with system prompt from `lib/chatbot-prompt.ts`

### Project Structure

```
app/
├── page.tsx                 # Landing page (hero, features, trust signals)
├── pricing/page.tsx         # 3-tier pricing cards
├── faq/page.tsx            # FAQ accordion
├── success/page.tsx        # Post-payment thank you
├── api/
│   ├── checkout/route.ts   # Creates Stripe Checkout session
│   ├── chat/route.ts       # Proxies to Anthropic API with streaming
│   └── webhook/route.ts    # Stripe webhook → triggers email
components/
├── ui/                     # shadcn/ui components
├── layout/                 # Header, Footer
├── sections/               # Hero, HowItWorks, Features, Pricing, Testimonials, About, FAQ
└── chat/                   # ChatWidget, ChatWindow
lib/
├── utils.ts               # shadcn cn() function
├── stripe.ts              # Stripe client
└── chatbot-prompt.ts      # AI system prompt
```

## Design System

### Fonts (non-negotiable)
- **Headings:** DM Serif Display (400)
- **Body:** DM Sans (400, 500, 600, 700)
- Never use Inter, Roboto, Arial, or system fonts

### Colors
- **Primary (dark sections):** `--primary: 217 33% 17%` (slate-800 #1E293B)
- **Accent (CTAs):** `--accent: 160 84% 39%` (emerald-600 #059669)
- **Background:** `--background: 210 40% 98%` (light blue-gray)

### Visual Requirements
- Alternate dark/light section backgrounds
- All sections get Framer Motion scroll reveal (`fadeInUp`)
- Cards get hover lift effect (`whileHover={{ y: -4 }}`)
- Buttons: `whileHover={{ scale: 1.02 }}` `whileTap={{ scale: 0.98 }}`
- Max content width: 1200px (`max-w-7xl mx-auto`)
- Section padding: `py-24` desktop, `py-16` mobile
- Mobile-first responsive design

### Avoid
- Purple gradients, stock photos, emojis on marketing pages
- Tiny cramped buttons (minimum `py-3 px-6`)
- Low-contrast text
- Generic template layouts

## Environment Variables

```
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_TIER1=price_...
STRIPE_PRICE_TIER2=price_...
STRIPE_PRICE_TIER3=price_...
ANTHROPIC_API_KEY=sk-ant-...
RESEND_API_KEY=re_...
NEXT_PUBLIC_SITE_URL=https://...
CONTACT_EMAIL=...
```

## Implementation Notes

- All API keys server-side only
- Stripe webhook must verify signature
- AI chat streams responses back to client
- No database—all post-purchase handled via email
- Three pricing tiers: Annual Tax Return, Monthly Accounting, Bundle
