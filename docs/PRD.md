# PRD — CanTax (Working Title)

## 1. Overview

A professional website offering affordable LLC tax filing services, primarily targeting foreign-owned US LLCs. The service handles tax return preparation (Form 1120, Form 5472, state filings) at a flat, competitive price with fast turnaround and human review.

The site is a **lead-generation and service-delivery platform** — not a SaaS tool. Clients upload documents, pay via Stripe, and receive their completed tax returns.

---

## 2. Problem

Foreign entrepreneurs who form US LLCs face confusing tax obligations. CPAs charge $1,000–$2,500+ for straightforward LLC returns. Many first-time filers don't know what forms they need, miss deadlines, and overpay for simple filings. There is no affordable, streamlined, niche service that speaks directly to this audience.

---

## 3. Target Audience

### Primary
- **Foreign-owned single-member LLCs** (non-resident aliens with US LLCs)
  - E-commerce sellers, digital service providers, consultants
  - Typically need: Form 5472, Form 1120, pro-forma balance sheet
  - Often first-time filers, intimidated by US tax system

### Secondary
- **US-based single-member and multi-member LLCs**
  - Small business owners looking for affordable tax prep
  - Freelancers, consultants, small agencies

---

## 4. Core Service Offering

### Primary Service: LLC Tax Return Filing
- **Flat fee pricing** (e.g., $149 for first return, regular price ~$349–$499)
- Includes: Form preparation, review by tax professional, e-filing or delivery of completed return
- Supported forms: Form 1120, Form 5472, Schedule C/K-1 as applicable, state returns
- Turnaround: 48–72 hours after document submission
- Unlimited revisions until client is satisfied

### Secondary Services (Phase 2 — listed but not the focus)
- LLC Formation assistance
- EIN / ITIN obtainment
- Registered Agent service
- Annual bookkeeping packages

---

## 5. User Journey

### 5.1 Landing Page → Qualification
1. User lands on homepage / landing page
2. Sees hero section: flat price, value proposition, CTA
3. Clicks "Start Your Return" or "Get Started"
4. Short qualification form (5–7 questions):
   - LLC type (single-member / multi-member)
   - Owner residency (US / foreign)
   - State of formation
   - Business activity type
   - Annual revenue range
   - Tax year
5. Receives instant quote (flat fee based on answers)

### 5.2 Onboarding → Document Upload
6. Creates account (email + password, or Google OAuth)
7. Dashboard shows checklist of required documents
8. Uploads documents (P&L, balance sheet, bank statements, prior returns if any)
9. System validates uploads and flags missing items

### 5.3 Processing → Delivery
10. Admin/team receives notification of new submission
11. Tax return is prepared
12. Client notified: "Your return is ready for review"
13. Client reviews return PDF in dashboard
14. Client requests revisions OR approves

### 5.4 Payment → Filing
15. Client pays via Stripe (only after reviewing return)
16. Completed return delivered as final PDF
17. Filing instructions provided (or e-filed on behalf if applicable)

---

## 6. Pages & Sections

### 6.1 Landing Page (Homepage)
Modeled after Cranston.ai landing page structure:

- **Sticky header**: Logo, nav links, CTA button
- **Hero section**: Headline, subheadline, price callout, primary CTA, trust stats (files completed, savings, etc.)
- **How It Works**: 3-step process with icons
- **Expert Review section**: Image + bullet points about human review
- **Benefits cards**: Save money, no experience needed, human-reviewed
- **Social proof**: Testimonials with photos, names, titles
- **Final CTA banner**: Repeat the value prop and CTA
- **Footer**: Links, copyright, legal

### 6.2 Qualification Page (`/qualify`)
- Multi-step form (wizard style)
- Progress indicator
- Instant quote at the end
- CTA to create account and proceed

### 6.3 Auth Pages
- `/login` — Email/password + Google OAuth
- `/register` — Account creation
- `/forgot-password` — Password reset flow

### 6.4 Client Dashboard (`/dashboard`)
- Overview: Current filing status, next steps
- Document upload area with checklist
- Return review & download
- Payment status
- Message thread with support/admin

### 6.5 Admin Dashboard (`/admin`)
- List of all clients and their filing status
- View/download uploaded documents
- Upload completed returns for client review
- Mark status (received, in progress, review ready, paid, completed)
- Revenue overview

### 6.6 Additional Pages
- `/pricing` — Pricing breakdown and comparison
- `/about` — About the team, credentials, trust signals
- `/faq` — Common questions about LLC tax filing
- `/contact` — Contact form + email
- `/privacy` — Privacy policy
- `/terms` — Terms of service

---

## 7. Functional Requirements

### Authentication
- Email/password registration and login
- Google OAuth
- Password reset via email
- Session management with JWT or NextAuth sessions

### Document Management
- File upload (PDF, PNG, JPG, CSV) with drag-and-drop
- Max file size: 25MB per file
- Upload progress indicator
- Document checklist with status (uploaded / missing / under review)
- Secure storage (files stored in cloud storage, references in MongoDB)

### Payment (Stripe)
- One-time payments (not subscriptions, for now)
- Payment only after return is ready for review
- Stripe Checkout or embedded payment form
- Webhook handling for payment confirmation
- Receipts via Stripe

### Notifications
- Email notifications at key stages:
  - Account created
  - Documents received
  - Return ready for review
  - Payment confirmed
  - Return finalized
- Optional: In-app notification bell

### Admin Features
- Protected admin routes (role-based)
- Client management table with search/filter
- Status workflow: `new → documents_received → in_progress → review_ready → revision_requested → paid → completed`
- Upload completed return for client
- View client messages

### Messaging
- Simple message thread per client (client ↔ admin)
- Stored in MongoDB
- Email notification on new message

---

## 8. Non-Functional Requirements

- **Performance**: Landing page < 2s LCP, all pages < 3s
- **SEO**: Landing page server-rendered, meta tags, Open Graph, structured data
- **Mobile**: Fully responsive, mobile-first design
- **Security**: HTTPS, secure file storage, input validation, CSRF protection, rate limiting on auth routes
- **Accessibility**: WCAG 2.1 AA basics (contrast, keyboard nav, alt text)

---

## 9. Design Direction

### Aesthetic (copied from Cranston.ai LP)
- **Clean, modern, minimal** — lots of whitespace
- **Dark navy / charcoal background sections** alternating with white
- **Accent color**: Bright green or teal for CTAs and highlights
- **Typography**: Large, bold headlines (sans-serif); clean body text
- **Trust signals**: Stats with large numbers, verified badges on testimonials
- **Imagery**: Professional stock photos of business people / tax documents
- **Layout**: Single-column flow, centered content, generous padding

### Tone of Voice
- Professional but approachable
- Confident and direct (not salesy or pushy)
- "We handle the hard part so you don't have to"
- **No mention of AI** — position as a professional human service

---

## 10. Branding (TBD)

- Business name: TBD (Can will decide)
- Domain: TBD
- Logo: Simple wordmark initially
- Colors: Dark navy (#0a1628), white, green accent (#22c55e or similar)
- Fonts: Inter or similar clean sans-serif

---

## 11. Success Metrics

- Conversion rate: Landing page visit → qualification form started (target: 15%+)
- Qualification → account created (target: 40%+)
- Account → documents uploaded (target: 60%+)
- Documents → paid (target: 80%+)
- Average time to return delivery: < 72 hours
- Client satisfaction: Revision rate < 20%

---

## 12. Phase Plan

### Phase 1 (MVP — Launch)
- Landing page
- Qualification form with instant quote
- Auth (email + Google)
- Client dashboard with document upload
- Admin dashboard
- Stripe payment
- Email notifications
- Basic messaging

### Phase 2 (Growth)
- SEO content pages (blog, guides)
- Referral program
- Additional services (LLC formation, EIN, bookkeeping)
- Automated document validation
- Client portal improvements (history, multi-year)

### Phase 3 (Scale)
- Multi-language support (especially for foreign LLC owners)
- API integrations (QuickBooks, Xero for bookkeeping clients)
- Recurring subscription plans for ongoing services
- Team member roles and permissions
