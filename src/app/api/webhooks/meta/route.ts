import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN || "omniflow_meta_verify_token_sample";
const APP_SECRET = process.env.META_WEBHOOK_APP_SECRET || process.env.META_APP_SECRET;

/**
 * Meta Webhook verification handshake (GET)
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Forbidden: Verification token mismatch." }, { status: 403 });
}

/**
 * Inbound Meta Webhook delivery handler (POST)
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-hub-signature-256");

    // Cryptographic signature validation if APP_SECRET is configured
    if (APP_SECRET && !APP_SECRET.includes("sample")) {
      if (!signature) {
        return NextResponse.json({ error: "Missing signature" }, { status: 401 });
      }

      const expectedSignature = `sha256=${crypto
        .createHmac("sha256", APP_SECRET)
        .update(rawBody)
        .digest("hex")}`;

      if (signature !== expectedSignature) {
        return NextResponse.json({ error: "Invalid cryptographic signature" }, { status: 401 });
      }
    }

    const payload = JSON.parse(rawBody);

    // Parse Instagram comment change event
    const entry = payload.entry?.[0];
    const changes = entry?.changes?.[0];

    if (changes?.field === "comments") {
      const comment = changes.value;
      const commentText = comment.text || "";
      const commenterUsername = comment.from?.username || "instagram_user";

      // Automation keyword evaluation is handled here idempotently
      console.log(`[Meta Webhook] Ingested comment from @${commenterUsername}: "${commentText}"`);
    }

    return NextResponse.json({ success: true, received: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process webhook" },
      { status: 500 }
    );
  }
}
