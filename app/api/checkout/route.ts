import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const priceIds: Record<string, string | undefined> = {
  STRIPE_PRICE_TIER1: process.env.STRIPE_PRICE_TIER1,
  STRIPE_PRICE_TIER2: process.env.STRIPE_PRICE_TIER2,
  STRIPE_PRICE_TIER3: process.env.STRIPE_PRICE_TIER3,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { priceId } = body;

    if (!priceId || !priceIds[priceId]) {
      return NextResponse.json(
        { error: "Invalid price ID" },
        { status: 400 }
      );
    }

    const stripePriceId = priceIds[priceId];

    if (!stripePriceId) {
      return NextResponse.json(
        { error: "Price not configured" },
        { status: 500 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Determine if this is a subscription or one-time payment
    const isSubscription = priceId === "STRIPE_PRICE_TIER2";

    const session = await stripe.checkout.sessions.create({
      mode: isSubscription ? "subscription" : "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pricing`,
      billing_address_collection: "required",
      customer_email: undefined, // Let Stripe collect the email
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
