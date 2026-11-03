"use client";

import { useState } from "react";
import { 
  CreditCard, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  Zap, 
  Calendar, 
  Users, 
  ShieldCheck 
} from "lucide-react";
import { PLAN_LIMITS } from "@/lib/billing/entitlements";

export default function BillingUsagePage() {
  const [currentTier, setCurrentTier] = useState<"free" | "creator" | "pro">("creator");
  const [upgrading, setUpgrading] = useState(false);

  const handleUpgrade = (tier: "creator" | "pro") => {
    setUpgrading(true);
    setTimeout(() => {
      setUpgrading(false);
      alert(`Initiating Dodo Payments secure checkout session for the ${PLAN_LIMITS[tier].name} tier.`);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-surface-container-high pb-6">
        <div>
          <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-[11px] uppercase tracking-wider font-semibold">
            <span>Workspace</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-container font-bold">Billing & Usage</span>
          </div>
          <h1 className="font-headline text-3xl font-bold text-on-surface tracking-tight mt-1">
            Subscription & Entitlements
          </h1>
          <p className="font-body text-sm text-on-surface-variant mt-1">
            Manage your plan tier, monitor resource quotas, and review Dodo Payments invoices.
          </p>
        </div>
      </div>

      {/* Current Quota Consumption Meters */}
      <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary-container"></div>
            <h2 className="font-headline text-lg font-bold text-on-surface">
              Current Billing Cycle Quota (Creator Plan — $29/mo)
            </h2>
          </div>
          <span className="font-mono text-xs text-on-surface-variant">Renews Nov 28, 2026</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Scheduled Posts Meter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-label">
              <span className="font-semibold text-on-surface">Scheduled Posts</span>
              <span className="font-mono text-primary font-bold">28 / 100</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full bg-primary-container rounded-full" style={{ width: "28%" }}></div>
            </div>
            <span className="font-mono text-[10px] text-on-surface-variant">72 posts available</span>
          </div>

          {/* Active Automations Meter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-label">
              <span className="font-semibold text-on-surface">Active DM Automations</span>
              <span className="font-mono text-primary font-bold">3 / 5</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full bg-primary-container rounded-full" style={{ width: "60%" }}></div>
            </div>
            <span className="font-mono text-[10px] text-on-surface-variant">2 rules available</span>
          </div>

          {/* AI Research Reports */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-label">
              <span className="font-semibold text-on-surface">AI Research Reports</span>
              <span className="font-mono text-primary font-bold">12 / 50</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full bg-primary-container rounded-full" style={{ width: "24%" }}></div>
            </div>
            <span className="font-mono text-[10px] text-on-surface-variant">38 reports available</span>
          </div>
        </div>
      </div>

      {/* Plan Tier Upgrade Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Free Plan */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="font-label text-xs font-bold text-on-surface-variant uppercase tracking-wider">Free</div>
            <div className="font-headline text-3xl font-bold text-on-surface">$0</div>
            <div className="space-y-2 font-body text-xs text-on-surface">
              {PLAN_LIMITS.free.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-400" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            disabled
            className="mt-8 py-2 rounded-lg bg-surface-container font-label text-xs font-semibold text-on-surface-variant cursor-not-allowed"
          >
            Included Baseline
          </button>
        </div>

        {/* Creator Plan (Current) */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border-2 border-primary shadow-md flex flex-col justify-between relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-on-primary font-label text-[10px] font-bold uppercase tracking-wider">
            Active Plan
          </span>
          <div className="space-y-4">
            <div className="font-label text-xs font-bold text-primary uppercase tracking-wider">Creator</div>
            <div className="font-headline text-3xl font-bold text-on-surface">
              $29<span className="text-sm font-normal text-on-surface-variant">/mo</span>
            </div>
            <div className="space-y-2 font-body text-xs text-on-surface">
              {PLAN_LIMITS.creator.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            disabled
            className="mt-8 py-2 rounded-lg bg-primary-fixed text-on-primary-fixed font-label text-xs font-semibold cursor-default"
          >
            Current Active Subscription
          </button>
        </div>

        {/* Pro Plan */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="font-label text-xs font-bold text-on-surface-variant uppercase tracking-wider">Pro Agency</div>
            <div className="font-headline text-3xl font-bold text-on-surface">
              $79<span className="text-sm font-normal text-on-surface-variant">/mo</span>
            </div>
            <div className="space-y-2 font-body text-xs text-on-surface">
              {PLAN_LIMITS.pro.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => handleUpgrade("pro")}
            disabled={upgrading}
            className="mt-8 py-2.5 rounded-lg bg-primary text-on-primary font-label text-xs font-semibold hover:bg-primary-container transition-all shadow-sm"
          >
            Upgrade to Pro Agency
          </button>
        </div>
      </div>
    </div>
  );
}
