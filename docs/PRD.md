# Product Requirements Document (PRD)

## Product Name
TBD — Tax & Accounting Service Platform for US LLC Owners

## Overview
A professional English-language website that sells tax return and accounting services to non-US residents who own US LLCs. The platform includes tiered pricing with Stripe checkout and a pre-purchase AI chatbot for answering common questions.

## Problem Statement
Non-Americans who own US LLCs (especially Turkish and Middle Eastern entrepreneurs) face confusion around US tax filing requirements. Most don't understand the process, fear IRS penalties, and struggle to find accountants who serve international clients. Existing solutions are either too expensive (big US firms) or feel untrustworthy (cheap freelancers).

## Target Users
- **Primary:** Turkish entrepreneurs with US LLCs
- **Secondary:** Other non-US residents (Europe, Middle East, Asia) who own US LLCs
- **Characteristics:** English-speaking, digitally savvy, price-conscious but willing to pay for trust and reliability

## Core Features

### 1. Landing Page / Marketing Site
- Professional, trustworthy design (clean, modern, "European company" feel)
- Clear value proposition: we handle your US LLC tax filing so you don't have to worry
- **Hero section** with strong headline and single CTA
- **"How It Works" section** — 3-step visual flow: (1) Choose your plan & pay, (2) Send us your documents via email, (3) We file your return — you're done
- **Features/Benefits section** — why choose us (expertise, European company, IRS-compliant, hassle-free)
- **Social proof / trust signals** — European company, years of experience, number of clients served, compliance mentions
- **Testimonials section** — quotes from existing clients (Can to provide, even 2-3 is enough)
- **About section** — brief intro to the team, credentials, and why clients can trust us. This is critical for a financial service — anonymous sites kill trust.
- FAQ section (also available as standalone page)
- Responsive (mobile + desktop)

### 2. Tiered Pricing & Stripe Checkout
- **Tier 1 — Annual Tax Return Filing:** One-time annual service. Client pays, submits their documents, and the team files their US tax return before the April 15th deadline.
- **Tier 2 — Monthly Accounting:** Ongoing monthly bookkeeping and financial oversight for their US LLC.
- **Tier 3 — Annual Tax Return + Monthly Accounting Bundle:** Combined package at a discounted rate.
- Stripe integration for secure online payment
- No price negotiation — fixed pricing displayed on site

### 3. AI Chatbot (Pre-Purchase)
- Embedded on the website
- Answers common questions before purchase, such as:
  - "What documents do I need?"
  - "What happens if I miss the deadline?"
  - "Do I need this service if my LLC had no income?"
  - "What's included in each package?"
- Does NOT replace post-purchase communication (that happens via email)
- Should feel knowledgeable and professional

### 4. Post-Purchase Flow
- After payment, client receives a confirmation email
- All further communication happens via email (not on the website)
- Client submits required documents via email
- The accounting team handles the rest

## Non-Functional Requirements
- **Language:** English only
- **Performance:** Fast load times, optimized for mobile
- **Security:** Stripe handles payment security; no sensitive financial data stored on the site
- **SEO:** Basic SEO optimization for terms like "US LLC tax filing service", "non-resident US tax return"

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **UI Components:** shadcn/ui (built on Radix UI)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Payments:** Stripe Checkout
- **Chatbot:** Anthropic Claude API
- **Hosting:** Vercel
- **Email:** Resend (post-purchase confirmation emails)
- **Design System:** See `design-system.md` for full visual specs

## Out of Scope (for MVP)
- Client dashboard / portal
- Document upload on website
- Multi-language support
- User accounts / login
- CRM integration
- Admin panel for managing clients

## Success Metrics
- Number of purchases through Stripe
- Chatbot engagement (questions asked before purchase)
- Conversion rate (visitors → paying customers)

## Timeline
- **MVP target:** 1 weekend of development
- **Launch deadline:** Before April 15th, 2026 (US tax filing deadline)

## Pricing (To Be Finalized with Can)
- Tier 1 (Annual Tax Return): ~$300–500
- Tier 2 (Monthly Accounting): ~$100–200/month
- Tier 3 (Bundle): Discounted combined rate
- Exact prices to be confirmed by Can before launch

## Open Questions
- [ ] Final brand name and domain
- [ ] Exact pricing for each tier
- [ ] Which company entity to use (Can's Dubai company suggested)
- [ ] Stripe account details (Can has one on his Dubai company)
- [ ] Chatbot knowledge base — what specific questions/answers should it cover?
- [ ] Email address for post-purchase communication
- [ ] Any legal disclaimers needed on the site?
- [ ] Testimonials — Can to provide 2-3 short quotes from existing clients (can be anonymous like "E-commerce founder, Istanbul")
- [ ] Team credentials — what qualifications or experience should be highlighted on the About section?
- [ ] Company registration details to display in the footer (builds trust)
