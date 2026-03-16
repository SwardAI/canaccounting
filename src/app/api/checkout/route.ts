import { NextRequest, NextResponse } from "next/server";
import { stripe, PLANS, type PlanKey } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { plan, email } = (await req.json()) as {
      plan: string;
      email?: string;
    };

    // Validate plan
    if (!plan || !(plan in PLANS)) {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 }
      );
    }

    const selectedPlan = PLANS[plan as PlanKey];
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    if (selectedPlan.mode === "payment") {
      // One-time payment (Tax Return Only)
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        customer_email: email || undefined,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: selectedPlan.name,
                description: "Complete LLC tax return filing",
              },
              unit_amount: selectedPlan.price,
            },
            quantity: 1,
          },
        ],
        metadata: {
          plan,
        },
        success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/checkout/cancel`,
      });

      return NextResponse.json({ url: session.url });
    } else {
      // Subscription (Monthly, Annual, Annual + Tax)
      const interval =
        "interval" in selectedPlan ? selectedPlan.interval : "month";

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: email || undefined,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: selectedPlan.name,
              },
              unit_amount: selectedPlan.price,
              recurring: {
                interval,
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          plan,
        },
        success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/checkout/cancel`,
      });

      return NextResponse.json({ url: session.url });
    }
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
