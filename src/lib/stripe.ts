import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
  typescript: true,
});

// Price IDs — create these in Stripe Dashboard or via the seed script
// For test mode, you can use the /api/stripe/setup endpoint to create them
export const PLANS = {
  tax_return: {
    name: "Tax Return Only",
    mode: "payment" as const,
    price: 60000, // $600 in cents
  },
  monthly_accounting: {
    name: "Monthly Accounting",
    mode: "subscription" as const,
    price: 20000, // $200 in cents
    interval: "month" as const,
  },
  annual_accounting: {
    name: "Annual Accounting",
    mode: "subscription" as const,
    price: 150000, // $1,500 in cents
    interval: "year" as const,
    originalPrice: 240000,
  },
  annual_accounting_tax: {
    name: "Accounting + Tax Return",
    mode: "subscription" as const,
    price: 170000, // $1,700 in cents
    interval: "year" as const,
    originalPrice: 290000,
  },
} as const;

export type PlanKey = keyof typeof PLANS;
