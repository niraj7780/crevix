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
 * Verifies inbound Dodo Payments webhook HMAC-SHA256 signature.
 */
export function verifyDodoWebhookSignature(rawBody: string, signatureHeader: string | null): boolean {
  const config = getDodoConfig();
  if (!config.webhookKey || config.webhookKey.includes("sample")) {
    if (process.env.NODE_ENV === "production") {
      return false; // Zero-trust: Fail-closed in production if secret is unconfigured
    }
    return true; // Local development sandbox mode
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
  returnUrl: string;
}

export interface CheckoutSessionResponse {
  checkoutUrl: string;
  sessionId: string;
  isMock: boolean;
  trialDays: number;
  monthlyAmountInr: number;
  firstChargeDate: string;
  currency: "INR";
}

/**
 * Creates a Dodo Payments checkout session for Crevix All Access (30 Days Free Trial, then ₹199/month).
 */
export async function createDodoCheckoutSession(
  options: CheckoutSessionOptions
): Promise<CheckoutSessionResponse> {
  const config = getDodoConfig();

  // Calculate 30-day trial end date / first charge date
  const now = new Date();
  const firstChargeDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

  if (!isDodoConfigured()) {
    // Return explicit mock checkout for development
    return {
      checkoutUrl: `/dashboard/billing?mock_checkout_success=true&plan=all_access`,
      sessionId: `mock_dodo_sess_${crypto.randomUUID()}`,
      isMock: true,
      trialDays: 30,
      monthlyAmountInr: 199,
      firstChargeDate,
      currency: "INR",
    };
  }

  const baseUrl = config.environment === "live_mode" 
    ? "https://live.dodopayments.com" 
    : "https://test.dodopayments.com";

  const productId = process.env.DODO_PRODUCT_ALL_ACCESS_ID || "p_crevix_all_access";

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
      currency: "INR",
      trial_period_days: 30,
      return_url: options.returnUrl,
      metadata: {
        workspace_id: options.workspaceId,
        plan_code: "all_access",
        monthly_price_inr: 199,
        trial_days: 30,
        authorized_by_user: true,
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
    trialDays: 30,
    monthlyAmountInr: 199,
    firstChargeDate,
    currency: "INR",
  };
}
