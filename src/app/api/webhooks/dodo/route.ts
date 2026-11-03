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

    // Handle subscription lifecycles
    switch (eventType) {
      case "subscription.active":
      case "subscription.created":
      case "subscription.renewed":
        // Sync subscription status and update workspace.tier
        break;
      case "subscription.cancelled":
      case "subscription.expired":
        // Downgrade workspace.tier to 'free'
        break;
      default:
        break;
    }

    return NextResponse.json({
      success: true,
      processed: true,
      eventId: payload.id || `dodo_ev_${Date.now()}`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process Dodo webhook" },
      { status: 500 }
    );
  }
}
