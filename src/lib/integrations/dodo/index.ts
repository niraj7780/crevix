import crypto from "crypto";

export interface DodoConfig {
  apiKey?: string;
  webhookKey?: string;
  environment: "test_mode" | "live_mode";
}

export function getDodoConfig(): DodoConfig {
  return {
    apiKey: process.env.DODO_PAYMENTS_API_KEY,
    webhookKey: process.env.DODO_WEBHOOK_KEY,
    environment: (process.env.DODO_ENVIRONMENT as "live_mode") || "test_mode",
  };
}

export function isDodoConfigured(): boolean {
  const config = getDodoConfig();
  return Boolean(
    config.apiKey &&
    !config.apiKey.includes("sample")
  );
}

/**
 * Verifies inbound Dodo Payments webhook HMAC signature.
 */
export function verifyDodoWebhookSignature(rawBody: string, signatureHeader: string | null): boolean {
  const config = getDodoConfig();
  if (!config.webhookKey || config.webhookKey.includes("sample")) {
    return true; // Local development bypass
  }

  if (!signatureHeader) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", config.webhookKey)
    .update(rawBody)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signatureHeader, "hex"),
      Buffer.from(expectedSignature, "hex")
    );
  } catch {
    return false;
  }
}

export interface CheckoutSessionOptions {
  workspaceId: string;
  customerEmail: string;
  tier: "creator" | "pro";
  returnUrl: string;
}

export interface CheckoutSessionResponse {
  checkoutUrl: string;
  sessionId: string;
  isMock: boolean;
}

/**
 * Creates a Dodo Payments checkout session for subscription purchasing.
 */
export async function createDodoCheckoutSession(
  options: CheckoutSessionOptions
): Promise<CheckoutSessionResponse> {
  const config = getDodoConfig();

  if (!isDodoConfigured()) {
    // Return explicit mock checkout for development
    return {
      checkoutUrl: `/dashboard/billing?mock_checkout_success=true&tier=${options.tier}`,
      sessionId: `mock_dodo_sess_${crypto.randomUUID()}`,
      isMock: true,
    };
  }

  const baseUrl = config.environment === "live_mode" 
    ? "https://live.dodopayments.com" 
    : "https://test.dodopayments.com";

  const productId = options.tier === "pro" 
    ? process.env.DODO_PRODUCT_PRO_ID || "p_pro" 
    : process.env.DODO_PRODUCT_CREATOR_ID || "p_creator";

  const response = await fetch(`${baseUrl}/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      billing: {
        email: options.customerEmail,
      },
      product_id: productId,
      return_url: options.returnUrl,
      metadata: {
        workspace_id: options.workspaceId,
      },
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `Dodo Payments API error (${response.status})`);
  }

  return {
    checkoutUrl: data.payment_link,
    sessionId: data.subscription_id,
    isMock: false,
  };
}
