import { NextRequest, NextResponse } from "next/server";
import { verifyDodoWebhookSignature } from "@/lib/integrations/dodo";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-dodo-signature") || req.headers.get("webhook-signature");

    const isValid = verifyDodoWebhookSignature(rawBody, signature);
    if (!isValid) {
      return NextResponse.json(
        { error: "INVALID_SIGNATURE: Dodo webhook signature mismatch." },
        { status: 401 }
      );
    }

    const payload = JSON.parse(rawBody);
    const eventType = payload.type || payload.event_type;
    const subscriptionId = payload.data?.subscription_id || payload.data?.id;
    const workspaceId = payload.data?.metadata?.workspace_id;

    console.log(`[Dodo Webhook Ingestion] Event: ${eventType}, Subscription: ${subscriptionId}, Workspace: ${workspaceId}`);

    // Handle single unified subscription lifecycles
    switch (eventType) {
      case "subscription.trial_started":
      case "subscription.created":
        // Workspace in 30-day free trial
        console.log(`[Dodo] Workspace ${workspaceId} entered 30-day trial for Crevix All Access.`);
        break;

      case "subscription.active":
      case "subscription.renewed":
        // Workspace successfully converted or renewed at ₹199/month
        console.log(`[Dodo] Workspace ${workspaceId} subscription active (₹199/month).`);
        break;

      case "subscription.cancelled":
      case "subscription.expired":
      case "payment.failed":
        // Subscription cancelled or payment failed
        console.log(`[Dodo] Workspace ${workspaceId} subscription expired or cancelled.`);
        break;

      default:
        console.log(`[Dodo] Unhandled event type: ${eventType}`);
        break;
    }

    return NextResponse.json({
      success: true,
      processed: true,
      plan: "all_access",
      eventId: payload.id || `dodo_ev_${Date.now()}`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process Dodo webhook" },
      { status: 500 }
    );
  }
}
