# PLAN — CanTax Implementation Plan

> This is the step-by-step build plan for Claude Code. Each step is a self-contained prompt you can give to Claude Code. Complete them in order. Test after each step before moving on.

---

## Phase 1: Project Setup

### Step 1 — Initialize Project
```
Create a new Next.js 14 project with App Router, TypeScript, Tailwind CSS, and ESLint.
Install dependencies: mongoose, next-auth@beta, stripe, @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, resend, zod, bcryptjs, lucide-react.
Install dev deps: @types/bcryptjs.
Set up shadcn/ui with the "new-york" style and slate base color.
Create .env.example with all required environment variables (see ARCHITECTURE.md).
Create src/lib/db.ts with MongoDB connection singleton using mongoose.
Create tailwind config with custom colors: navy (#0a1628), accent green (#22c55e), and gray scale.
```

### Step 2 — Auth Setup
```
Set up NextAuth.js v5 (Auth.js) in src/lib/auth.ts.
Configure two providers: Google OAuth and Credentials (email + password with bcrypt).
Create the Mongoose User model in src/models/User.ts matching the schema in ARCHITECTURE.md.
Create the auth API route at src/app/api/auth/[...nextauth]/route.ts.
Add middleware.ts at root to protect /dashboard and /admin routes.
JWT callbacks should attach userId and role ('client' | 'admin') to the session.
Admin role check: /admin/* routes require role === 'admin'.
```

### Step 3 — Auth Pages
```
Create auth pages with forms:
- /login — email + password form, Google OAuth button, link to register
- /register — name, email, password, confirm password, Google OAuth button
- /forgot-password — email input, sends reset email (placeholder for now)

Use shadcn/ui form components, Card, Input, Button, Label.
Style to match the site aesthetic: dark navy backgrounds or clean white cards.
Add Zod validation on both client and server side.
After login, redirect to /dashboard. After register, auto-login and redirect.
```

---

## Phase 2: Landing Page

### Step 4 — Layout Shell
```
Create the root layout with:
- Inter font from Google Fonts
- Global metadata (title, description, OG tags)
- A SessionProvider wrapper

Create Header component (src/components/layout/Header.tsx):
- Logo (text wordmark for now) on the left
- Nav links: How It Works, Pricing, About, FAQ
- "Get Started" CTA button on the right (green accent)
- Sticky on scroll, semi-transparent backdrop blur on dark sections
- Mobile hamburger menu

Create Footer component (src/components/layout/Footer.tsx):
- Company name, copyright
- Links: Privacy Policy, Terms of Service, Contact
- Minimal, clean design
```

### Step 5 — Landing Page Hero
```
Build the landing page at src/app/page.tsx, modeled closely after the Cranston.ai LP.

Hero section:
- Dark navy background (#0a1628)
- Small badge/tag at top: "$149 FLAT FEE" in green
- Large headline: "LLC Tax Return? Just $149." (white, bold, ~48-56px)
- Subheadline: "Stop overpaying your CPA. We file your LLC tax return for a flat $149. Professional review. Done in 48 hours." (gray text)
- Primary CTA button: "Start Your Return" (green, large, with arrow icon)
- Three stat boxes below CTA:
  - "$149" / "Your return"
  - "$1,200+" / "Avg savings"
  - "500+" / "Returns filed"
- Clean, centered layout with generous padding
```

### Step 6 — Landing Page Sections
```
Build remaining landing page sections, in order, below the hero.
Match the Cranston.ai LP structure closely:

1. HOW IT WORKS section:
   - Section label: "HOW IT WORKS"
   - Headline: "Your return in three steps"
   - Three numbered steps with icons:
     Step 1: "Answer a few questions" — "Tell us about your LLC. Takes 2 minutes."
     Step 2: "Upload your documents" — "Drop in your financials. We'll tell you if anything's missing."
     Step 3: "Review and pay" — "Check your return. Pay only if satisfied."
   - CTA button at bottom

2. EXPERT REVIEW section:
   - Split layout: text left, image placeholder right
   - Headline: "Every return reviewed by tax professionals"
   - Body text about human review process
   - Bullet points: Professional accuracy, Error detection, Unlimited revisions
   - Use a professional stock photo placeholder

3. BENEFITS section (3 cards):
   - "Save $1,200+" — CPAs charge $1,500+ for LLC returns
   - "No Experience Needed" — We guide you through everything
   - "Human-Reviewed" — Tax professionals check every line

4. SOCIAL PROOF section:
   - Headline: "Trusted by LLC owners worldwide"
   - 3 testimonial cards with:
     - Verified badge
     - Quote text
     - Avatar placeholder, name, title
   - (Use placeholder testimonials for now — Can will provide real ones)

5. FINAL CTA section:
   - Dark background
   - Headline: "Ready to file? Save $1,200."
   - Price comparison: "$149 vs $1,500"
   - CTA button
   - "No credit card required to start" note

All sections should use alternating dark/light backgrounds like the Cranston LP.
Typography: large bold headlines, clean body text, lots of whitespace.
Animations: subtle fade-in-up on scroll using CSS (no heavy libraries).
```

---

## Phase 3: Qualification Flow

### Step 7 — Qualification Form
```
Create /qualify page with a multi-step wizard form.

Steps:
1. LLC Type: "Is your LLC single-member or multi-member?" (radio buttons)
2. Owner Residency: "Are you a US resident or foreign national?" (radio buttons)
3. State: "Which state is your LLC registered in?" (dropdown of US states)
4. Business Type: "What does your business do?" (dropdown: E-commerce, Consulting, Software/SaaS, Freelance, Real Estate, Other + text input)
5. Revenue: "What was your approximate annual revenue?" (radio: $0, Under $50k, $50k-$200k, $200k-$500k, $500k+)
6. Tax Year: "Which tax year are you filing for?" (dropdown: current year and previous 2)

After completing:
- Show instant quote: "$149 flat fee" (or adjusted based on complexity signals)
- CTA: "Continue — Create Your Account" → redirects to /register with qualification data in session/query

Use a progress bar at the top. Smooth transitions between steps.
Save qualification data in sessionStorage until account is created.
After account creation, POST /api/qualify to create a Filing record.

Create the Filing Mongoose model (src/models/Filing.ts) matching ARCHITECTURE.md.
Create POST /api/qualify endpoint that creates a Filing with status 'documents_pending'.
```

---

## Phase 4: Client Dashboard

### Step 8 — Dashboard Layout & Overview
```
Create dashboard layout at src/app/dashboard/layout.tsx:
- Left sidebar with nav: Overview, Documents, My Return, Messages, Settings
- Use lucide-react icons for nav items
- Mobile: collapsible sidebar or bottom nav
- Header with user name/email and logout button
- Clean white background, subtle gray borders

Dashboard overview page (src/app/dashboard/page.tsx):
- Status tracker at top showing current filing stage (visual stepper)
- "Next Steps" card telling the user what to do
- Quick stats: Filing status, documents uploaded, messages
- If no filing exists yet, show "Start a new filing" CTA → /qualify
```

### Step 9 — Document Upload
```
Create document upload page at src/app/dashboard/documents/page.tsx.

Document checklist showing required items:
- Profit & Loss Statement (P&L)
- Balance Sheet
- Bank Statements (if available)
- Prior Year Return (if applicable)
- Government ID (for foreign owners)
Each with status: Required / Uploaded / Under Review

File uploader component (src/components/dashboard/DocumentUploader.tsx):
- Drag-and-drop zone + click to browse
- Accept PDF, PNG, JPG, CSV (max 25MB)
- Upload progress bar
- Uses presigned S3 URLs (see ARCHITECTURE.md flow)

Create API routes:
- POST /api/documents/upload — generates presigned URL, returns { uploadUrl, fileKey }
- POST /api/documents/confirm — creates Document record in MongoDB
- GET /api/documents — list documents for current user's active filing
- DELETE /api/documents/[id] — remove a document

Create Document Mongoose model (src/models/Document.ts).
Create S3 helper in src/lib/s3.ts with presigned URL generation.

When all required documents are uploaded, auto-update Filing status to 'documents_received'.
```

### Step 10 — Return Review & Messages
```
Create return review page at src/app/dashboard/returns/page.tsx:
- If status < 'review_ready': Show "We're working on your return" with status info
- If status === 'review_ready': Show PDF viewer/download for the completed return
  - "Approve" button → updates status to 'approved', shows payment
  - "Request Revision" button → opens text input for revision notes, updates status
- If status === 'paid' or 'completed': Show final return with download button

Create messages page at src/app/dashboard/messages/page.tsx:
- Chat-style message thread (client ↔ admin)
- Text input at bottom, send button
- Messages sorted by date, newest at bottom
- Auto-scroll to bottom on new messages

Create Message Mongoose model (src/models/Message.ts).
Create API routes:
- GET /api/messages?filingId=... — get messages for a filing
- POST /api/messages — send a message

Create API routes for returns:
- GET /api/returns/[filingId] — get return status and file URL
- POST /api/returns/[filingId]/approve — approve return
- POST /api/returns/[filingId]/revision — request revision with notes
```

---

## Phase 5: Payment

### Step 11 — Stripe Integration
```
Set up Stripe integration.

Create src/lib/stripe.ts with Stripe client initialization.

Create POST /api/payments/create-session:
- Takes filingId
- Verifies filing belongs to current user and status is 'approved'
- Creates Stripe Checkout Session with:
  - line_items: [{ price_data: { unit_amount: filing.quotedPrice, currency: 'usd' }, quantity: 1 }]
  - mode: 'payment'
  - success_url: /dashboard?payment=success
  - cancel_url: /dashboard?payment=cancelled
  - metadata: { filingId, userId }
- Returns session URL

Create POST /api/payments/webhook:
- Verify Stripe webhook signature
- On 'checkout.session.completed':
  - Create Payment record
  - Update Filing status to 'paid'
  - Send confirmation email
- Handle 'payment_intent.payment_failed' gracefully

Create Payment Mongoose model (src/models/Payment.ts).

Add "Pay Now" button on the dashboard when filing status is 'approved'.
Show payment success/failure messages based on URL params.
```

---

## Phase 6: Admin Dashboard

### Step 12 — Admin Overview & Client List
```
Create admin layout at src/app/admin/layout.tsx:
- Sidebar: Overview, Clients, Settings
- Only accessible if user role === 'admin'
- Redirect non-admins to /dashboard

Admin overview page (src/app/admin/page.tsx):
- Stats cards: Total clients, Active filings, Revenue this month, Pending reviews
- Recent activity list

Admin clients page (src/app/admin/clients/page.tsx):
- Table with columns: Client name, Email, Filing status, Tax year, Amount, Date
- Search bar, filter by status dropdown
- Click row → go to client detail page

Create API routes:
- GET /api/admin/clients — list all filings with user data (admin only)
- GET /api/admin/stats — aggregate stats (admin only)
```

### Step 13 — Admin Client Detail
```
Create admin client detail page at src/app/admin/clients/[id]/page.tsx.

Shows everything about one filing:
- Client info (name, email, phone)
- Qualification answers
- Document list with download links (presigned S3 URLs)
- Status updater: dropdown to change filing status + save button
- Upload completed return: file upload that saves to S3 and links to filing
- Message thread: same as client-side but from admin perspective
- Payment info if paid

Create API routes:
- GET /api/admin/clients/[id] — full filing detail with documents and messages
- PATCH /api/admin/clients/[id]/status — update filing status
- POST /api/admin/clients/[id]/return — upload completed return
```

---

## Phase 7: Email Notifications

### Step 14 — Email System
```
Set up Resend for transactional emails.

Create src/lib/email.ts with helper functions:
- sendWelcomeEmail(to, name)
- sendDocumentsReceivedEmail(adminEmail, clientName)
- sendReturnReadyEmail(to, name)
- sendPaymentConfirmationEmail(to, name, amount)
- sendNewMessageEmail(to, name)

Create simple HTML email templates (inline CSS, mobile-friendly).
Keep them clean and professional — same color scheme as the website.

Integrate email sending into existing flows:
- After registration → sendWelcomeEmail
- After all required docs uploaded → sendDocumentsReceivedEmail to admin
- After admin sets status to 'review_ready' → sendReturnReadyEmail
- After Stripe webhook confirms payment → sendPaymentConfirmationEmail
- After new message created → sendNewMessageEmail to the other party
```

---

## Phase 8: Polish & Launch

### Step 15 — Static Pages
```
Create remaining static pages:

/pricing:
- Pricing table comparing: DIY (free, risky), CPA ($1,500+, slow), CanTax ($149, fast, professional)
- FAQ section specific to pricing
- CTA at bottom

/about:
- Brief story about the service
- Trust signals: experience, number of filings
- Professional and approachable tone
- Photo placeholders for team

/faq:
- Accordion-style FAQ with common questions:
  - What forms do you file?
  - What if my LLC had no activity?
  - Do I need to file Form 5472?
  - How long does it take?
  - What if I need a revision?
  - Is my data secure?
  - Can you help with state taxes?
  - What payment methods do you accept?

/contact:
- Contact form (name, email, subject, message)
- Email address displayed
- POST /api/contact endpoint that sends email to admin

/privacy and /terms:
- Standard legal pages (placeholder text, Can to fill in with real content)
```

### Step 16 — SEO & Performance
```
Add SEO optimizations:
- Metadata on every page (title, description, OG image)
- Structured data (JSON-LD) on landing page: LocalBusiness or ProfessionalService schema
- Sitemap generation (next-sitemap)
- robots.txt
- Canonical URLs

Performance:
- Optimize images with next/image
- Landing page should be SSG (static) for fastest load
- Lazy load below-fold sections
- Minimize client-side JavaScript on landing page

Analytics:
- Add Google Analytics 4 (gtag.js) or Plausible
- Stripe conversion tracking pixel if running ads later
```

### Step 17 — Final QA & Deploy
```
Final checks before launch:
- Test full flow: landing → qualify → register → upload docs → (admin uploads return) → review → pay → complete
- Test mobile responsiveness on all pages
- Test auth: login, register, Google OAuth, protected routes, admin access
- Test Stripe: successful payment, failed payment, webhook processing
- Verify emails send correctly at each stage
- Check all links work
- Lighthouse score: aim for 90+ on Performance, Accessibility, SEO
- Set up MongoDB Atlas production cluster
- Set up S3 bucket with proper CORS config
- Configure Stripe webhook endpoint for production URL
- Set all environment variables in Vercel
- Deploy to Vercel, test on production domain
- Set up custom domain when Can is ready
```

---

## Additional Services Needed (Summary)

| Service | Purpose | Cost |
|---|---|---|
| **Vercel** | Hosting | Free (Hobby) or $20/mo (Pro) |
| **MongoDB Atlas** | Database | Free tier (M0) to start |
| **Stripe** | Payments | 2.9% + $0.30 per transaction |
| **AWS S3** or **Cloudflare R2** | File storage | R2: free egress, ~$0.015/GB stored |
| **Resend** | Transactional email | Free tier (100 emails/day) |
| **Google Cloud Console** | OAuth credentials | Free |
| **Domain** | Custom domain | ~$10-15/year |
| **Vercel Analytics** (optional) | Web analytics | Free tier available |

**Total monthly cost at launch: ~$0–$20/mo** (before any customers pay)

---

## Notes for Claude Code

- Always check that MongoDB connection uses the singleton pattern (don't create multiple connections in dev).
- Use `"use server"` directives for server actions where appropriate.
- Use `"use client"` only on components that need interactivity.
- Keep the landing page as static as possible for performance.
- All API routes should validate the session and return 401 if unauthenticated.
- Admin routes should check `session.user.role === 'admin'` and return 403 otherwise.
- Use Zod schemas that match Mongoose schemas for input validation.
- All prices stored in cents (e.g., $149 = 14900).
- File keys in S3 should follow pattern: `documents/{userId}/{filingId}/{uuid}_{filename}`.
- Never expose S3 keys or internal IDs in client-facing URLs unnecessarily.
