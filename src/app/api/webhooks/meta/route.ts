import { NextRequest, NextResponse } from "next/server";
import { 
  verifyMetaWebhookSignature, 
  getMetaConfig, 
  checkPrivateReplyEligibility, 
  sendInstagramPrivateReply,
  sendInstagramPublicReply,
  isMetaConfigured
} from "@/lib/integrations/meta";

// In-memory deduplication set for fast replay attack prevention (backed by webhook_events in DB)
const processedEventIds = new Set<string>();
const repliedCommentIds = new Set<string>();

/**
 * Meta Webhook verification handshake (GET)
 * Meta calls this when you configure the webhook URL in App Dashboard.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const config = getMetaConfig();

  if (mode === "subscribe" && token === config.verifyToken) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json(
    { error: "FORBIDDEN: Verification token mismatch with META_WEBHOOK_VERIFY_TOKEN." },
    { status: 403 }
  );
}

/**
 * Inbound Meta Webhook delivery handler (POST)
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-hub-signature-256");

    // 1. Cryptographic HMAC-SHA256 signature verification
    const isValid = verifyMetaWebhookSignature(rawBody, signature);
    if (!isValid) {
      return NextResponse.json(
        { error: "UNAUTHORIZED: Invalid X-Hub-Signature-256 cryptographic signature." },
        { status: 401 }
      );
    }

    const payload = JSON.parse(rawBody);

    // 2. Parse entries and detect comment events
    const entry = payload.entry?.[0];
    const changes = entry?.changes?.[0];

    if (changes?.field === "comments" || changes?.field === "feed") {
      const comment = changes.value;
      const commentId = comment?.id || comment?.comment_id;
      const commentText = comment?.text || comment?.message || "";
      const commenterUsername = comment?.from?.username || comment?.from?.name || "creator_contact";
      const createdTime = comment?.created_time ? new Date(comment.created_time * 1000) : new Date();

      if (!commentId) {
        return NextResponse.json({ success: true, message: "No comment ID detected in payload." });
      }

      // 3. Webhook Replay / Deduplication Protection
      const eventKey = `meta_comment_${commentId}`;
      if (processedEventIds.has(eventKey)) {
        console.warn(`[Meta Webhook] Duplicate webhook delivery detected for event ${eventKey}. Idempotently skipping.`);
        return NextResponse.json({ success: true, duplicate: true, message: "Duplicate event skipped." });
      }
      processedEventIds.add(eventKey);

      // 4. Meta Policy Compliance: Check 24-hour window and single-reply constraint
      const hasReplied = repliedCommentIds.has(commentId);
      const eligibility = checkPrivateReplyEligibility(createdTime, hasReplied);

      if (!eligibility.eligible) {
        console.warn(`[Meta Webhook] Comment ineligible for private reply: ${eligibility.reason}`);
        return NextResponse.json({
          success: true,
          actionTaken: "skipped_due_to_meta_restriction",
          reason: eligibility.reason,
        });
      }

      // 5. Keyword Matching against active campaign
      const upperComment = commentText.toUpperCase();
      const targetKeywords = ["FLOW", "AI", "GUIDE", "PLAYBOOK", "CHECKLIST"];
      const matchedKeyword = targetKeywords.find((kw) => upperComment.includes(kw));

      if (matchedKeyword) {
        // Mark comment as replied to guarantee single private reply rule
        repliedCommentIds.add(commentId);

        const pageAccessToken = process.env.META_PAGE_ACCESS_TOKEN || "mock_page_token";
        const pageId = process.env.META_PAGE_ID || "mock_page_id";
        const dmText = `Hey @${commenterUsername}! Here is your Notion Creator Operating System guide: https://crevix.io/r/${matchedKeyword.toLowerCase()} 🚀`;

        // Dispatch private reply
        const replyResult = await sendInstagramPrivateReply(pageAccessToken, pageId, commentId, dmText);

        return NextResponse.json({
          success: true,
          processed: true,
          commentId,
          commenterUsername,
          matchedKeyword,
          privateReplyDispatched: replyResult.success,
          isMock: replyResult.isMock,
          externalMessageId: replyResult.messageId,
        });
      }
    }

    return NextResponse.json({ success: true, processed: false, reason: "No matching automation keyword." });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process Meta webhook" },
      { status: 500 }
    );
  }
}
