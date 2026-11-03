export type PlanTier = "free" | "creator" | "pro";

export interface PlanLimits {
  name: string;
  maxSocialAccounts: number;
  maxPostsPerMonth: number;
  maxAutomationRules: number;
  maxResearchReportsPerMonth: number;
  maxWorkspaceMembers: number;
  pricePerMonthUsd: number;
  features: string[];
}

export const PLAN_LIMITS: Record<PlanTier, PlanLimits> = {
  free: {
    name: "Free",
    maxSocialAccounts: 1,
    maxPostsPerMonth: 10,
    maxAutomationRules: 1,
    maxResearchReportsPerMonth: 5,
    maxWorkspaceMembers: 1,
    pricePerMonthUsd: 0,
    features: [
      "1 Connected Social Account",
      "10 Scheduled Posts / month",
      "1 Active DM Automation Rule",
      "5 AI Topic Research Reports / month",
      "Standard Community Support",
    ],
  },
  creator: {
    name: "Creator",
    maxSocialAccounts: 2,
    maxPostsPerMonth: 100,
    maxAutomationRules: 5,
    maxResearchReportsPerMonth: 50,
    maxWorkspaceMembers: 2,
    pricePerMonthUsd: 29,
    features: [
      "2 Connected Social Accounts",
      "100 Scheduled Posts / month",
      "5 Active DM Automation Rules",
      "50 AI Topic Research Reports / month",
      "Instagram Lead Capture CRM",
      "Priority Queue Dispatch",
    ],
  },
  pro: {
    name: "Pro Agency",
    maxSocialAccounts: 5,
    maxPostsPerMonth: 500,
    maxAutomationRules: 25,
    maxResearchReportsPerMonth: 200,
    maxWorkspaceMembers: 5,
    pricePerMonthUsd: 79,
    features: [
      "5 Connected Social Accounts",
      "500 Scheduled Posts / month",
      "25 Active DM Automation Rules",
      "200 AI Topic Research Reports / month",
      "Visual Flow Graph Automation",
      "Unified Direct Message Inbox",
      "5 Team Member Seats",
      "VIP Dedicated Support",
    ],
  },
};

export interface UsageCheckResult {
  allowed: boolean;
  currentUsage: number;
  maxAllowed: number;
  reason?: string;
}

/**
 * Checks if a workspace can schedule another post in this billing period.
 */
export function checkPostSchedulingEntitlement(tier: PlanTier, currentMonthlyPosts: number): UsageCheckResult {
  const limit = PLAN_LIMITS[tier] || PLAN_LIMITS.free;
  if (currentMonthlyPosts >= limit.maxPostsPerMonth) {
    return {
      allowed: false,
      currentUsage: currentMonthlyPosts,
      maxAllowed: limit.maxPostsPerMonth,
      reason: `You have reached your limit of ${limit.maxPostsPerMonth} posts for this month on the ${limit.name} tier. Upgrade to publish more.`,
    };
  }
  return {
    allowed: true,
    currentUsage: currentMonthlyPosts,
    maxAllowed: limit.maxPostsPerMonth,
  };
}

/**
 * Checks if a workspace can create another automation rule.
 */
export function checkAutomationRuleEntitlement(tier: PlanTier, currentActiveRules: number): UsageCheckResult {
  const limit = PLAN_LIMITS[tier] || PLAN_LIMITS.free;
  if (currentActiveRules >= limit.maxAutomationRules) {
    return {
      allowed: false,
      currentUsage: currentActiveRules,
      maxAllowed: limit.maxAutomationRules,
      reason: `You have reached the maximum of ${limit.maxAutomationRules} active automation rules on the ${limit.name} tier. Upgrade for more workflows.`,
    };
  }
  return {
    allowed: true,
    currentUsage: currentActiveRules,
    maxAllowed: limit.maxAutomationRules,
  };
}

/**
 * Checks if a workspace can generate another AI research report.
 */
export function checkAiResearchEntitlement(tier: PlanTier, currentMonthlyReports: number): UsageCheckResult {
  const limit = PLAN_LIMITS[tier] || PLAN_LIMITS.free;
  if (currentMonthlyReports >= limit.maxResearchReportsPerMonth) {
    return {
      allowed: false,
      currentUsage: currentMonthlyReports,
      maxAllowed: limit.maxResearchReportsPerMonth,
      reason: `You have used all ${limit.maxResearchReportsPerMonth} AI research reports for this month on the ${limit.name} tier. Upgrade to explore more topics.`,
    };
  }
  return {
    allowed: true,
    currentUsage: currentMonthlyReports,
    maxAllowed: limit.maxResearchReportsPerMonth,
  };
}
