/**
 * CREVIX — SINGLE UNIFIED SUBSCRIPTION MODEL
 * 
 * Product: Crevix All Access
 * - First 30 days: FREE
 * - After first 30 days: ₹199/month (INR)
 * - All features included for every active subscriber or trial user.
 */

export type SubscriptionStatus = "trialing" | "active" | "cancelled" | "past_due" | "expired";

export interface PlanConfig {
  name: string;
  code: "all_access";
  trialDays: number;
  pricePerMonthInr: number;
  features: string[];
}

export const CREVIX_PLAN: PlanConfig = {
  name: "Crevix All Access",
  code: "all_access",
  trialDays: 30,
  pricePerMonthInr: 199,
  features: [
    "Instagram Comment-to-DM Automation",
    "Unlimited Automation Rules",
    "AI Viral Hook & Reel Script Generator",
    "AI Topic Research & Trend Analysis",
    "Multi-Account Content Scheduling & Publishing",
    "Interactive Visual Content Calendar",
    "Zero-Egress Cloudflare R2 Media Library",
    "Creator CRM & Dynamic Lead Pipeline (CSV Export)",
    "Real-Time Social Analytics & Reach Tracking",
    "Unified Direct Message Inbox",
    "Visual Flow Graph Workflow Builder",
    "On-Screen Teleprompter Studio",
  ],
};

export interface SubscriptionState {
  plan: "all_access";
  status: SubscriptionStatus;
  trialStartDate: Date;
  trialEndDate: Date;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

export interface UsageCheckResult {
  allowed: boolean;
  reason?: string;
  status: SubscriptionStatus;
  daysRemainingInTrial?: number;
}

/**
 * Checks if a workspace has active access to Crevix features.
 * Access is granted if the workspace is in an active 30-day trial OR has an active paid subscription.
 */
export function checkWorkspaceAccess(
  status: SubscriptionStatus = "trialing",
  trialEndDate?: Date | string
): UsageCheckResult {
  const now = new Date();
  const trialEnd = trialEndDate ? new Date(trialEndDate) : new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const daysRemaining = Math.max(0, Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  if (status === "active") {
    return {
      allowed: true,
      status: "active",
    };
  }

  if (status === "trialing") {
    if (now > trialEnd) {
      return {
        allowed: false,
        status: "expired",
        daysRemainingInTrial: 0,
        reason: "Your 30-day free trial has concluded. Activate Crevix All Access for ₹199/month to continue automating your workflow.",
      };
    }
    return {
      allowed: true,
      status: "trialing",
      daysRemainingInTrial: daysRemaining,
    };
  }

  if (status === "cancelled" || status === "expired" || status === "past_due") {
    return {
      allowed: false,
      status,
      reason: "Your subscription is inactive. Please renew Crevix All Access (₹199/month) to restore full automation capabilities.",
    };
  }

  return {
    allowed: true,
    status: "trialing",
    daysRemainingInTrial: daysRemaining,
  };
}

/**
 * Validates post scheduling under the single unified plan.
 * Fair-use policy: Up to 500 posts/month to prevent automated API abuse.
 */
export function checkPostSchedulingEntitlement(
  status: SubscriptionStatus = "trialing",
  currentMonthlyPosts: number = 0,
  trialEndDate?: Date | string
): UsageCheckResult {
  const access = checkWorkspaceAccess(status, trialEndDate);
  if (!access.allowed) return access;

  const FAIR_USE_POST_LIMIT = 500;
  if (currentMonthlyPosts >= FAIR_USE_POST_LIMIT) {
    return {
      allowed: false,
      status: access.status,
      reason: `Fair-use limit of ${FAIR_USE_POST_LIMIT} posts reached for this monthly billing cycle. Contact support for high-volume enterprise quotas.`,
    };
  }

  return access;
}

/**
 * Validates automation rule creation under the single unified plan.
 * Unlimited rules are included with Crevix All Access.
 */
export function checkAutomationRuleEntitlement(
  status: SubscriptionStatus = "trialing",
  currentActiveRules: number = 0,
  trialEndDate?: Date | string
): UsageCheckResult {
  const access = checkWorkspaceAccess(status, trialEndDate);
  if (!access.allowed) return access;

  // Unlimited automation rules in Crevix All Access (fair-use safety cap at 100 active rules per workspace)
  const FAIR_USE_RULE_LIMIT = 100;
  if (currentActiveRules >= FAIR_USE_RULE_LIMIT) {
    return {
      allowed: false,
      status: access.status,
      reason: `Workspace limit of ${FAIR_USE_RULE_LIMIT} active automation rules reached. Contact support to raise this ceiling.`,
    };
  }

  return access;
}

/**
 * Validates AI research reports under the single unified plan.
 * Crevix All Access includes generous monthly research allowance (100 reports/mo).
 */
export function checkAiResearchEntitlement(
  status: SubscriptionStatus = "trialing",
  currentMonthlyReports: number = 0,
  trialEndDate?: Date | string
): UsageCheckResult {
  const access = checkWorkspaceAccess(status, trialEndDate);
  if (!access.allowed) return access;

  const FAIR_USE_AI_LIMIT = 100;
  if (currentMonthlyReports >= FAIR_USE_AI_LIMIT) {
    return {
      allowed: false,
      status: access.status,
      reason: `Monthly AI research quota (${FAIR_USE_AI_LIMIT} reports) reached for this cycle. Quota resets on your next monthly billing date.`,
    };
  }

  return access;
}
