# Implementation Plan

## Overview
Step-by-step plan for building the MVP in a weekend using Claude Code. Each phase is designed to be completed in sequence — finish one before moving to the next.

---

## Phase 1: Project Setup (~15 min)

- [ ] Initialize Next.js 15 project with TypeScript and Tailwind CSS v4
- [ ] Run `npx shadcn@latest init` to set up shadcn/ui (configure components.json)
- [ ] Install shadcn/ui components: `npx shadcn@latest add button card badge separator accordion sheet navigation-menu`
- [ ] Install additional dependencies: `stripe`, `@anthropic-ai/sdk`, `resend`, `framer-motion`
- [ ] Set up Google Fonts (DM Serif Display + DM Sans) in `app/layout.tsx` using `next/font/google`
- [ ] Configure CSS variables in `globals.css` as defined in `design-system.md`
- [ ] Set up project folder structure: `components/ui/`, `components/layout/`, `components/sections/`, `components/chat/`, `lib/`
- [ ] Create `.env.local` with placeholder values for all API keys
- [ ] Verify dev server runs cleanly

**Claude Code prompt idea:**
> "Read PRD.md, architecture.md, and design-system.md. Set up a new Next.js 15 project with TypeScript, Tailwind CSS v4, and App Router. Initialize shadcn/ui and add these components: button, card, badge, separator, accordion, sheet, navigation-menu. Install stripe, @anthropic-ai/sdk, resend, and framer-motion. Set up DM Serif Display + DM Sans fonts via next/font/google. Configure the CSS variables from design-system.md in globals.css. Create the folder structure from architecture.md."

---

## Phase 2: Landing Page (~1-2 hours)

- [ ] Build root layout with professional fonts and metadata
- [ ] **Header** — Clean nav with logo/brand name, links to Pricing, About, and FAQ
- [ ] **Hero section** — Headline, subheadline, CTA button ("View Pricing" or "Get Started")
- [ ] **"How It Works" section** — 3 steps with icons: Choose Plan → Send Documents → We File For You
- [ ] **Features/Benefits section** — Why choose us (expertise, European company, hassle-free)
- [ ] **Trust signals** — Professional badges, "trusted by X clients", compliance mentions
- [ ] **Testimonials section** — 2-3 client quotes (placeholder text until Can provides real ones)
- [ ] **About section** — Team intro, credentials, why we're trustworthy (placeholder until Can provides details)
- [ ] **Footer** — Contact email, legal disclaimer, company registration, copyright
- [ ] Make fully responsive (mobile-first)

**Design direction (IMPORTANT — read this to Claude Code):**
- **Aesthetic:** Refined, luxury-minimal fintech. Think Wise, Mercury, or Brex — not a generic Bootstrap template.
- **Color palette:** Deep navy (#0F1B2D or similar) as primary dark, crisp white for contrast, and a warm gold or emerald green accent for CTAs and highlights. Avoid purple gradients or anything that looks "AI-generated."
- **Typography:** Use distinctive, premium Google Fonts. Something like "DM Serif Display" or "Playfair Display" for headings (conveys authority/trust), paired with "DM Sans" or "Outfit" for body text. NEVER use Inter, Roboto, or Arial.
- **Layout:** Generous whitespace, asymmetric hero layout (text left, graphic/illustration right), full-width sections with alternating backgrounds. No cramped "template" feel.
- **Visual details:** Subtle grain/noise texture on dark backgrounds, soft shadows on cards, smooth scroll animations (fade-in on scroll), hover effects on buttons and cards. These small details separate "professional" from "weekend project."
- **Icons:** Use Lucide icons consistently. No emojis on the marketing pages.
- **Trust cues:** Small shield/checkmark icons next to trust claims, a "Secured by Stripe" badge near pricing, company registration info in footer.
- **No stock photos.** Use abstract geometric shapes, clean icons, or subtle SVG illustrations instead.
- **Mobile:** Must look great on mobile first — most of Can's target audience will find the site on their phones.

**Claude Code prompt idea:**
> "Build the landing page based on PRD.md, architecture.md, and design-system.md. Follow the design system exactly — colors, fonts, spacing, component patterns, animations. Include: hero, how it works (3 steps), features, trust signals, testimonials (placeholder), about section (placeholder), and footer. Mobile-first responsive with Tailwind. This must look like a real, premium financial services company — not a template."

---

## Phase 3: Pricing Page (~1 hour)

- [ ] Create pricing page with 3 tier cards
- [ ] **Tier 1 — Annual Tax Return:** One-time payment, list what's included
- [ ] **Tier 2 — Monthly Accounting:** Monthly subscription, list what's included
- [ ] **Tier 3 — Bundle:** Combined at discount, highlight as "Best Value"
- [ ] Each card has a "Buy Now" / "Get Started" button
- [ ] Buttons link to Stripe Checkout (wired up in Phase 4)
- [ ] Use placeholder prices until Can confirms final pricing

**Claude Code prompt idea:**
> "Build the pricing page with 3 tier cards based on PRD.md. Each card should have a Buy Now button. Use placeholder prices. Professional design consistent with the landing page."

---

## Phase 4: Stripe Integration (~1 hour)

- [ ] Create `lib/stripe.ts` — initialize Stripe with secret key
- [ ] Create `POST /api/checkout/route.ts`:
  - Accepts tier selection
  - Creates Stripe Checkout Session with correct price ID
  - Returns checkout URL
- [ ] Create `GET /success/page.tsx` — thank you page after payment
- [ ] Create `POST /api/webhook/route.ts`:
  - Verifies Stripe webhook signature
  - On `checkout.session.completed`, triggers confirmation email
- [ ] Wire up pricing page buttons to call checkout API
- [ ] Test with Stripe test mode

**Claude Code prompt idea:**
> "Implement Stripe Checkout integration. Create the checkout API route, success page, and webhook handler. Wire up the pricing page buttons. Use Stripe test mode keys. Follow architecture.md."

---

## Phase 5: AI Chatbot (~1-2 hours)

- [ ] Create `lib/chatbot-prompt.ts` — system prompt with:
  - Service description and pricing info
  - Common Q&A (documents needed, deadlines, what's included)
  - Tone: professional, helpful, concise
  - Boundaries: direct complex questions to email, don't give specific tax advice
- [ ] Create `POST /api/chat/route.ts`:
  - Receives user message + conversation history
  - Forwards to Anthropic API with system prompt
  - Streams response back
- [ ] Build `ChatWidget.tsx` — floating button (bottom-right corner)
- [ ] Build `ChatWindow.tsx` — chat UI with message bubbles, input field
- [ ] Add chat widget to root layout (appears on all pages)
- [ ] Test with various common questions

**Claude Code prompt idea:**
> "Build the AI chatbot. Create the system prompt, API route with streaming, and chat UI components (floating widget + chat window). The bot answers pre-purchase questions about US LLC tax filing services. Follow architecture.md."

---

## Phase 6: Email Integration (~30 min)

- [ ] Set up Resend with API key
- [ ] Create email template for post-purchase confirmation:
  - Thank them for their purchase
  - List next steps (what documents to send)
  - Provide contact email for communication
- [ ] Integrate email sending into Stripe webhook handler
- [ ] Test end-to-end: purchase → webhook → email

**Claude Code prompt idea:**
> "Add Resend email integration. Create a professional confirmation email template. Wire it into the Stripe webhook so clients automatically receive next steps after payment."

---

## Phase 7: FAQ Page (~30 min)

- [ ] Create FAQ page with accordion-style Q&A
- [ ] Questions to include:
  - What is a US tax return and why do I need to file?
  - What documents do I need to provide?
  - What happens if I miss the April 15th deadline?
  - Do I need to file if my LLC had no income?
  - How long does the process take?
  - Is my data secure?
  - What's included in each package?
  - How do I communicate with you after purchase?
- [ ] Can should review and refine the answers before launch

**Claude Code prompt idea:**
> "Build an FAQ page with accordion components. Include common questions about US LLC tax filing. Professional design matching the rest of the site."

---

## Phase 8: Polish & Review (~1 hour)

- [ ] Review all pages on mobile and desktop
- [ ] Check all links and navigation work
- [ ] Verify Stripe test checkout flow end-to-end
- [ ] Test chatbot with edge-case questions
- [ ] Add meta tags for SEO (title, description, Open Graph)
- [ ] Add a simple favicon
- [ ] Legal disclaimer in footer ("This service provides accounting assistance, not legal advice")
- [ ] Final design pass — spacing, typography, consistency

---

## Phase 9: Deploy (~30 min)

- [ ] Push to GitHub
- [ ] Connect repo to Vercel
- [ ] Set all environment variables in Vercel dashboard
- [ ] Deploy and verify on production URL
- [ ] Set up custom domain (once Can confirms)
- [ ] Switch Stripe to live mode with real price IDs
- [ ] Set Stripe webhook to production URL
- [ ] Final smoke test on live site

---

## Before Launch Checklist (Needs Input from Can)

- [ ] Final brand name and domain
- [ ] Exact pricing for each tier
- [ ] Stripe account credentials (from Can's Dubai company)
- [ ] Contact email for post-purchase communication
- [ ] Review chatbot answers for accuracy
- [ ] Review FAQ answers for accuracy
- [ ] Any legal disclaimers specific to the service
- [ ] Logo or brand assets (if any)

---

## Estimated Total Time: ~6-8 hours

With Claude Code doing the heavy lifting, this is very achievable in a single weekend.
