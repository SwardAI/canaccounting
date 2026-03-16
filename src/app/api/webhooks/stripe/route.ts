import { NextRequest, NextResponse } from "next/server";
import { stripe, PLANS, type PlanKey } from "@/lib/stripe";
import {
  sendPurchaseConfirmation,
  sendAdminNotification,
} from "@/lib/email";

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

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const planKey = session.metadata?.plan as PlanKey | undefined;
      const customerEmail = session.customer_details?.email;

      const planName = planKey && PLANS[planKey] ? PLANS[planKey].name : "Tax Return";
      const amount = session.amount_total
        ? `$${(session.amount_total / 100).toFixed(2)}`
        : "N/A";

      console.log(`Payment successful: ${planName} — ${customerEmail}`);

      // Send confirmation email to customer
      if (customerEmail) {
        try {
          await sendPurchaseConfirmation(customerEmail, planName, amount);
          console.log(`Confirmation email sent to ${customerEmail}`);
        } catch (err) {
          console.error("Failed to send confirmation email:", err);
        }
      }

      // Notify admin
      try {
        await sendAdminNotification(
          customerEmail || "unknown",
          planName,
          amount
        );
        console.log("Admin notification sent");
      } catch (err) {
        console.error("Failed to send admin notification:", err);
      }

      break;
    }

    case "customer.subscription.created": {
      const subscription = event.data.object;
      console.log(`Subscription created: ${subscription.id}`);
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object;
      console.log(
        `Subscription updated: ${subscription.id}, status: ${subscription.status}`
      );
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      console.log(`Subscription cancelled: ${subscription.id}`);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object;
      console.log(`Payment failed for invoice: ${invoice.id}`);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
