import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const plan = session.metadata?.plan;
      const customerEmail = session.customer_details?.email;
      const customerId = session.customer;

      console.log(`✅ Payment successful for plan: ${plan}`);
      console.log(`   Customer: ${customerEmail}`);
      console.log(`   Stripe Customer ID: ${customerId}`);
      console.log(`   Session ID: ${session.id}`);

      // TODO: Create/update user in database
      // TODO: Send confirmation email
      // TODO: Grant access to the service
      break;
    }

    case "customer.subscription.created": {
      const subscription = event.data.object;
      console.log(`📦 Subscription created: ${subscription.id}`);
      // TODO: Store subscription ID in database
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object;
      console.log(`🔄 Subscription updated: ${subscription.id}, status: ${subscription.status}`);
      // TODO: Update subscription status in database
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      console.log(`❌ Subscription cancelled: ${subscription.id}`);
      // TODO: Revoke access, update database
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object;
      console.log(`⚠️ Payment failed for invoice: ${invoice.id}`);
      // TODO: Notify customer, handle retry logic
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
