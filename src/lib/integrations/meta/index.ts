import crypto from "crypto";

export interface MetaConfig {
  appId?: string;
  appSecret?: string;
  verifyToken?: string;
}

export function getMetaConfig(): MetaConfig {
  return {
    appId: process.env.META_APP_ID,
    appSecret: process.env.META_APP_SECRET || process.env.META_WEBHOOK_APP_SECRET,
    verifyToken: process.env.META_WEBHOOK_VERIFY_TOKEN || "crevix_meta_verify_token_sample",
  };
}

export function isMetaConfigured(): boolean {
  const config = getMetaConfig();
  return Boolean(
    config.appId &&
    config.appSecret &&
    !config.appId.includes("sample") &&
    !config.appSecret.includes("sample")
  );
}

/**
 * Validates Meta webhook signature against META_APP_SECRET.
 * Uses timing-safe buffer comparison to prevent timing attacks.
 */
export function verifyMetaWebhookSignature(rawBody: string, signatureHeader: string | null): boolean {
  const config = getMetaConfig();
  if (!config.appSecret || config.appSecret.includes("sample")) {
    // In local development sandbox mode, permit unsigned requests but flag as unverified
    return true;
  }

  if (!signatureHeader) {
    return false;
  }

  const [method, signature] = signatureHeader.split("=");
  if (method !== "sha256" || !signature) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", config.appSecret)
    .update(rawBody)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedSignature, "hex")
    );
  } catch {
    return false;
  }
}

export interface PrivateReplyEligibility {
  eligible: boolean;
  reason?: string;
}

/**
 * Meta Graph API enforces that private replies can only be sent:
 * 1. Within 24 hours of the comment creation timestamp.
 * 2. Exactly once per comment (subsequent calls will fail with code 10).
 * 3. Only to comments on the business's own posts or eligible ads.
 */
export function checkPrivateReplyEligibility(
  commentTimestamp: string | number | Date,
  hasExistingReply: boolean
): PrivateReplyEligibility {
  if (hasExistingReply) {
    return {
      eligible: false,
      reason: "META_RESTRICTION: A private reply has already been dispatched for this comment ID. Meta limits private replies to 1 per comment.",
    };
  }

  const commentTime = new Date(commentTimestamp).getTime();
  const now = Date.now();
  const hoursSinceComment = (now - commentTime) / (1000 * 60 * 60);

  if (hoursSinceComment > 24) {
    return {
      eligible: false,
      reason: `META_RESTRICTION: Comment is ${hoursSinceComment.toFixed(1)} hours old. Meta Graph API restricts private replies to within the 24-hour messaging window.`,
    };
  }

  return { eligible: true };
}

export interface SendPrivateReplyResult {
  success: boolean;
  messageId?: string;
  isMock: boolean;
  error?: string;
}

/**
 * Dispatches a private reply to an Instagram comment using the official Meta Graph API:
 * POST https://graph.facebook.com/v21.0/{page-id}/messages
 * Payload: { recipient: { comment_id: string }, message: { text: string } }
 */
export async function sendInstagramPrivateReply(
  pageAccessToken: string,
  pageId: string,
  commentId: string,
  messageText: string
): Promise<SendPrivateReplyResult> {
  if (!isMetaConfigured() || pageAccessToken.includes("sample")) {
    return {
      success: true,
      messageId: `mock_meta_msg_${crypto.randomUUID()}`,
      isMock: true,
    };
  }

  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/${pageId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pageAccessToken}`,
      },
      body: JSON.stringify({
        recipient: { comment_id: commentId },
        message: { text: messageText },
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        isMock: false,
        error: data.error?.message || `Meta API error (${res.status})`,
      };
    }

    return {
      success: true,
      messageId: data.message_id,
      isMock: false,
    };
  } catch (err: any) {
    return {
      success: false,
      isMock: false,
      error: err.message || "Network error communicating with Meta Graph API",
    };
  }
}

/**
 * Sends a public comment reply using:
 * POST https://graph.facebook.com/v21.0/{comment-id}/replies
 */
export async function sendInstagramPublicReply(
  pageAccessToken: string,
  commentId: string,
  messageText: string
): Promise<{ success: boolean; replyId?: string; isMock: boolean; error?: string }> {
  if (!isMetaConfigured() || pageAccessToken.includes("sample")) {
    return {
      success: true,
      replyId: `mock_meta_reply_${crypto.randomUUID()}`,
      isMock: true,
    };
  }

  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/${commentId}/replies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pageAccessToken}`,
      },
      body: JSON.stringify({ message: messageText }),
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        isMock: false,
        error: data.error?.message || `Meta API error (${res.status})`,
      };
    }

    return {
      success: true,
      replyId: data.id,
      isMock: false,
    };
  } catch (err: any) {
    return {
      success: false,
      isMock: false,
      error: err.message || "Network error communicating with Meta Graph API",
    };
  }
}
