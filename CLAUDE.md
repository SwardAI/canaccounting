# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CanTax is an LLC tax filing service platform for foreign-owned US LLCs. It's a lead-generation and service-delivery platform (not a SaaS tool) where clients upload documents, pay via Stripe, and receive completed tax returns.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui (new-york style, slate base)
- **Database**: MongoDB Atlas with Mongoose ODM
- **Auth**: NextAuth.js v5 (Auth.js) - Google OAuth + Credentials
- **Payments**: Stripe (Checkout sessions + webhooks)
- **File Storage**: AWS S3 or Cloudflare R2 (presigned URLs)
- **Email**: Resend
- **Validation**: Zod
- **Hosting**: Vercel

## Build & Development Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Architecture

### Route Groups
- `(marketing)/` - Public pages (pricing, about, faq, contact, privacy, terms)
- `(auth)/` - Auth pages (login, register, forgot-password)
- `dashboard/` - Client dashboard (protected)
- `admin/` - Admin dashboard (protected, role-gated)

### Key Data Models (MongoDB/Mongoose)
- **User**: email, name, provider (credentials/google), role (client/admin)
- **Filing**: userId, status, taxYear, llcType, ownerResidency, quotedPrice, etc.
- **Document**: filingId, userId, type, fileKey (S3), fileName
- **Message**: filingId, senderId, senderRole, content
- **Payment**: filingId, userId, stripeSessionId, amount, status

### Filing Status Flow
`qualification → documents_pending → documents_received → in_progress → review_ready → revision_requested → approved → paid → completed`

### File Upload Flow (Presigned URLs)
1. POST /api/documents/upload → returns presigned S3 PUT URL + fileKey
2. Client uploads directly to S3
3. POST /api/documents/confirm → creates Document record

### Payment Flow
1. POST /api/payments/create-session → Stripe Checkout session URL
2. Redirect to Stripe
3. Webhook at /api/payments/webhook → update Payment + Filing status

## Code Conventions

- Use `"use server"` directives for server actions
- Use `"use client"` only on components needing interactivity
- All prices stored in cents (e.g., $149 = 14900)
- S3 file keys: `documents/{userId}/{filingId}/{uuid}_{filename}`
- MongoDB connection must use singleton pattern (src/lib/db.ts)
- All API routes validate session, return 401 if unauthenticated
- Admin routes check `session.user.role === 'admin'`, return 403 otherwise
- Zod schemas should match Mongoose schemas for validation

## Design System

- **Colors**: Dark navy (#0a1628), accent green (#22c55e), white, gray scale
- **Font**: Inter (sans-serif)
- **Aesthetic**: Clean, modern, minimal with lots of whitespace
- **Layout**: Single-column flow, centered content, generous padding
- **Tone**: Professional but approachable, no mention of AI

## Protected Routes

Middleware protects:
- `/dashboard/*` → requires authenticated user
- `/admin/*` → requires role === 'admin'
- `/api/admin/*` → requires role === 'admin'
