# ARCHITECTURE — CanTax

## 1. Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SSR for SEO, API routes, full-stack in one repo |
| Language | **TypeScript** | Type safety across frontend and backend |
| Styling | **Tailwind CSS** | Rapid UI development, matches Cranston aesthetic |
| Database | **MongoDB Atlas** | Flexible schema for evolving data models, free tier to start |
| ODM | **Mongoose** | Schema validation, middleware, clean MongoDB interface |
| Auth | **NextAuth.js v5 (Auth.js)** | Built-in Google OAuth, email/password, session management |
| Payments | **Stripe** | Checkout sessions, webhooks, receipts |
| File Storage | **AWS S3** (or **Cloudflare R2**) | Secure document storage, presigned URLs for upload/download |
| Email | **Resend** (or **SendGrid**) | Transactional emails (notifications, password reset) |
| Hosting | **Vercel** | Zero-config Next.js deployment, edge functions, preview deploys |
| Validation | **Zod** | Runtime validation for API inputs and form data |
| UI Components | **shadcn/ui** | Pre-built accessible components, Tailwind-native |

---

## 2. Project Structure

```
/
├── .env.local                    # Environment variables (never committed)
├── .env.example                  # Template for env vars
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
│
├── prisma/                       # (Optional, if switching to Prisma later)
│
├── public/
│   ├── images/                   # Static images, icons, logos
│   └── fonts/                    # Custom fonts if any
│
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout (fonts, metadata, providers)
│   │   ├── page.tsx              # Landing page (/)
│   │   ├── globals.css           # Tailwind base + custom styles
│   │   │
│   │   ├── (marketing)/          # Route group for public pages
│   │   │   ├── pricing/page.tsx
│   │   │   ├── about/page.tsx
│   │   │   ├── faq/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── privacy/page.tsx
│   │   │   └── terms/page.tsx
│   │   │
│   │   ├── qualify/              # Qualification wizard
│   │   │   └── page.tsx
│   │   │
│   │   ├── (auth)/               # Auth route group
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── forgot-password/page.tsx
│   │   │
│   │   ├── dashboard/            # Client dashboard (protected)
│   │   │   ├── layout.tsx        # Dashboard shell (sidebar, nav)
│   │   │   ├── page.tsx          # Overview
│   │   │   ├── documents/page.tsx
│   │   │   ├── returns/page.tsx
│   │   │   ├── messages/page.tsx
│   │   │   └── settings/page.tsx
│   │   │
│   │   ├── admin/                # Admin dashboard (protected, role-gated)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx          # Overview / stats
│   │   │   ├── clients/page.tsx
│   │   │   ├── clients/[id]/page.tsx
│   │   │   └── settings/page.tsx
│   │   │
│   │   └── api/                  # API routes
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── qualify/route.ts
│   │       ├── documents/
│   │       │   ├── upload/route.ts
│   │       │   └── [id]/route.ts
│   │       ├── returns/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── payments/
│   │       │   ├── create-session/route.ts
│   │       │   └── webhook/route.ts
│   │       ├── messages/route.ts
│   │       └── admin/
│   │           ├── clients/route.ts
│   │           └── stats/route.ts
│   │
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── landing/              # Landing page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── ExpertReview.tsx
│   │   │   ├── Benefits.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── FinalCTA.tsx
│   │   │   └── Stats.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── DashboardSidebar.tsx
│   │   │   └── AdminSidebar.tsx
│   │   ├── forms/
│   │   │   ├── QualifyForm.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── ContactForm.tsx
│   │   ├── dashboard/
│   │   │   ├── DocumentUploader.tsx
│   │   │   ├── DocumentChecklist.tsx
│   │   │   ├── ReturnViewer.tsx
│   │   │   ├── StatusTracker.tsx
│   │   │   └── MessageThread.tsx
│   │   └── admin/
│   │       ├── ClientTable.tsx
│   │       ├── ClientDetail.tsx
│   │       ├── StatusUpdater.tsx
│   │       └── RevenueChart.tsx
│   │
│   ├── lib/
│   │   ├── db.ts                 # MongoDB connection singleton
│   │   ├── auth.ts               # NextAuth config
│   │   ├── stripe.ts             # Stripe client init
│   │   ├── s3.ts                 # S3/R2 client and helpers
│   │   ├── email.ts              # Email sending helper
│   │   └── utils.ts              # General utilities
│   │
│   ├── models/                   # Mongoose models
│   │   ├── User.ts
│   │   ├── Filing.ts
│   │   ├── Document.ts
│   │   ├── Message.ts
│   │   └── Payment.ts
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useFiling.ts
│   │   └── useDocuments.ts
│   │
│   ├── types/                    # TypeScript type definitions
│   │   ├── index.ts
│   │   ├── filing.ts
│   │   └── api.ts
│   │
│   └── constants/                # App-wide constants
│       ├── pricing.ts
│       ├── forms.ts
│       └── status.ts
│
└── scripts/                      # Utility scripts
    └── seed.ts                   # DB seed for development
```

---

## 3. Data Models (MongoDB/Mongoose)

### User
```typescript
{
  _id: ObjectId,
  email: string,                  // unique
  name: string,
  passwordHash?: string,          // null for OAuth users
  provider: 'credentials' | 'google',
  role: 'client' | 'admin',
  phone?: string,
  createdAt: Date,
  updatedAt: Date,
}
```

### Filing
```typescript
{
  _id: ObjectId,
  userId: ObjectId,               // ref: User
  status: 'qualification' | 'documents_pending' | 'documents_received' |
          'in_progress' | 'review_ready' | 'revision_requested' |
          'approved' | 'paid' | 'completed',
  taxYear: number,
  llcType: 'single_member' | 'multi_member',
  ownerResidency: 'us' | 'foreign',
  stateOfFormation: string,
  businessType: string,
  revenueRange: string,
  quotedPrice: number,            // in cents
  paidAmount?: number,
  stripePaymentId?: string,
  returnFileKey?: string,         // S3 key for completed return PDF
  notes?: string,                 // admin notes
  createdAt: Date,
  updatedAt: Date,
}
```

### Document
```typescript
{
  _id: ObjectId,
  filingId: ObjectId,             // ref: Filing
  userId: ObjectId,               // ref: User
  type: 'pl_statement' | 'balance_sheet' | 'bank_statement' |
        'prior_return' | 'id_document' | 'other',
  fileName: string,
  fileKey: string,                // S3 key
  fileSize: number,
  mimeType: string,
  uploadedAt: Date,
}
```

### Message
```typescript
{
  _id: ObjectId,
  filingId: ObjectId,             // ref: Filing
  senderId: ObjectId,             // ref: User
  senderRole: 'client' | 'admin',
  content: string,
  readAt?: Date,
  createdAt: Date,
}
```

### Payment
```typescript
{
  _id: ObjectId,
  filingId: ObjectId,             // ref: Filing
  userId: ObjectId,               // ref: User
  stripeSessionId: string,
  stripePaymentIntentId?: string,
  amount: number,                 // in cents
  currency: 'usd',
  status: 'pending' | 'succeeded' | 'failed' | 'refunded',
  createdAt: Date,
  updatedAt: Date,
}
```

---

## 4. Authentication Flow

```
NextAuth.js v5 (Auth.js)
├── Providers
│   ├── Google OAuth
│   └── Credentials (email + bcrypt password)
├── Session strategy: JWT (stateless, no DB sessions needed)
├── Callbacks
│   ├── jwt → attach userId and role to token
│   └── session → expose userId and role to client
└── Middleware
    ├── /dashboard/* → requires authenticated user
    ├── /admin/* → requires role === 'admin'
    └── /api/admin/* → requires role === 'admin'
```

---

## 5. File Upload Flow

```
Client Browser
  │
  ├─ 1. POST /api/documents/upload (file metadata)
  │     → Server generates presigned S3 PUT URL
  │     → Returns { uploadUrl, fileKey }
  │
  ├─ 2. PUT [presigned S3 URL] (direct upload from browser)
  │     → File goes directly to S3, bypasses server
  │
  └─ 3. POST /api/documents/confirm (fileKey)
        → Server creates Document record in MongoDB
        → Updates Filing document checklist status
```

This keeps large files off the Next.js server and leverages S3's infrastructure.

---

## 6. Payment Flow (Stripe)

```
Client clicks "Pay Now"
  │
  ├─ 1. POST /api/payments/create-session
  │     → Server creates Stripe Checkout Session
  │     → Returns session URL
  │
  ├─ 2. Redirect to Stripe Checkout
  │     → Client pays on Stripe-hosted page
  │
  ├─ 3. Stripe webhook → POST /api/payments/webhook
  │     → Verify signature
  │     → Update Payment status to 'succeeded'
  │     → Update Filing status to 'paid'
  │     → Send confirmation email
  │
  └─ 4. Redirect back to /dashboard with success message
```

---

## 7. Email Notifications

Using Resend (or SendGrid) with React Email templates:

| Trigger | Recipient | Email |
|---|---|---|
| Account created | Client | Welcome + next steps |
| Documents uploaded | Admin | New submission alert |
| Return ready | Client | Review your return |
| Revision requested | Admin | Client wants changes |
| Payment succeeded | Client | Receipt + final return |
| New message | Client/Admin | Message notification |

---

## 8. Environment Variables

```env
# Database
MONGODB_URI=mongodb+srv://...

# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Stripe
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# File Storage (S3 or R2)
S3_BUCKET=...
S3_REGION=...
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
S3_ENDPOINT=...          # For R2 or compatible providers

# Email
RESEND_API_KEY=...
EMAIL_FROM=noreply@yourdomain.com

# App
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

---

## 9. Deployment Architecture

```
Vercel (Frontend + API)
  ├── Edge: Middleware (auth checks, redirects)
  ├── Serverless: API routes
  └── Static: Landing page (ISR/SSG)

MongoDB Atlas (Database)
  └── Free tier M0 → M10 as needed

AWS S3 / Cloudflare R2 (File Storage)
  └── Private bucket, presigned URLs only

Stripe (Payments)
  └── Webhook → Vercel serverless function

Resend (Email)
  └── API calls from serverless functions
```

---

## 10. Security Considerations

- **Files**: Never publicly accessible. All access via short-lived presigned URLs.
- **Auth**: Passwords hashed with bcrypt (12 rounds). JWT tokens httpOnly.
- **API**: All mutating endpoints validate session + role. Zod validation on all inputs.
- **Stripe**: Webhook signature verification on every event.
- **Rate limiting**: Auth endpoints rate-limited (use Vercel's built-in or upstash/ratelimit).
- **CORS**: Restricted to app domain only.
- **CSP**: Content Security Policy headers via next.config.js.
