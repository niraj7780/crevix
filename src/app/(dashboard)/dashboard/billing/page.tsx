"use client";

import { useState } from "react";
import { 
  CreditCard, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  Zap, 
  Calendar, 
  ShieldCheck, 
  ArrowRight,
  AlertCircle
} from "lucide-react";
import { CREVIX_PLAN } from "@/lib/billing/entitlements";

export default function BillingUsagePage() {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<"trialing" | "active">("trialing");
  const [daysRemaining, setDaysRemaining] = useState(24);

  const handleStartSubscription = async () => {
    setIsSubscribing(true);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "all_access" }),
      });
      const data = await res.json();
      if (data.success && data.data?.checkoutUrl) {
        window.location.href = data.data.checkoutUrl;
      } else {
        alert(data.error || "Unable to initiate checkout.");
      }
    } catch {
      alert("Network error creating checkout session.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-surface-container-high pb-6">
        <div>
          <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-[11px] uppercase tracking-wider font-semibold">
            <span>Workspace</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-container font-bold">Billing & Subscription</span>
          </div>
          <h1 className="font-headline text-3xl font-bold text-on-surface tracking-tight mt-1">
            Crevix All Access
          </h1>
          <p className="font-body text-sm text-on-surface-variant mt-1">
            One simple, unified subscription. Every creator tool, workflow, and AI feature included.
          </p>
        </div>
      </div>

      {/* Trial Status Card */}
      <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline text-lg font-bold text-on-surface">
                  {subscriptionStatus === "trialing" ? "30-Day Free Trial Active" : "Active Subscription"}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label text-[10px] font-bold uppercase tracking-wider">
                  All Access
                </span>
              </div>
              <p className="font-body text-xs text-on-surface-variant mt-0.5">
                {subscriptionStatus === "trialing"
                  ? `${daysRemaining} days remaining in your free trial period. No charges until trial completion.`
                  : "Renews monthly on the 28th. ₹199/month."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCancelModal(true)}
              className="px-3.5 py-1.5 rounded-lg border border-surface-container-high text-on-surface-variant hover:text-error hover:border-error/40 text-xs font-label font-semibold transition-colors"
            >
              Cancel Subscription
            </button>
            <button
              onClick={handleStartSubscription}
              disabled={isSubscribing}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-on-primary font-label text-xs font-semibold hover:bg-primary-container transition-all shadow-sm"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>{isSubscribing ? "Opening Checkout..." : "Manage Payment Method"}</span>
            </button>
          </div>
        </div>

        {/* Quota Progress */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-surface-container-high">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-label">
              <span className="font-semibold text-on-surface">Automation Rules</span>
              <span className="text-primary font-mono font-bold">Unlimited</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-primary-container"></div>
            <p className="font-mono text-[10px] text-on-surface-variant">Active on all posts & reels</p>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-label">
              <span className="font-semibold text-on-surface">Monthly Scheduled Posts</span>
              <span className="text-on-surface font-mono font-bold">38 / 500</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full bg-primary-container rounded-full" style={{ width: "8%" }}></div>
            </div>
            <p className="font-mono text-[10px] text-on-surface-variant">462 posts available (fair use)</p>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-label">
              <span className="font-semibold text-on-surface">AI Research & Scripts</span>
              <span className="text-on-surface font-mono font-bold">14 / 100</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full bg-primary-container rounded-full" style={{ width: "14%" }}></div>
            </div>
            <p className="font-mono text-[10px] text-on-surface-variant">86 reports available</p>
          </div>
        </div>
      </div>

      {/* Single Unified Subscription Presentation */}
      <div className="p-8 rounded-3xl bg-surface-container-lowest border-2 border-primary/40 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed/40 border border-primary-fixed-dim/60 text-on-primary-fixed text-xs font-label font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>One Plan. Complete Creator Operating System.</span>
            </div>
            <h2 className="font-headline text-3xl font-bold text-on-surface">
              Crevix All Access
            </h2>
            <div className="flex items-baseline gap-2">
              <span className="font-headline text-4xl font-bold text-on-surface">₹0</span>
              <span className="font-body text-sm text-on-surface-variant">first 30 days, then</span>
              <span className="font-headline text-2xl font-bold text-primary">₹199</span>
              <span className="font-body text-sm text-on-surface-variant">/ month</span>
            </div>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              No tier limits or upsells. Your trial gives full access to our Instagram automation engine, AI script teleprompter, social publishing calendar, and CRM. Billed in Indian Rupees (INR).
            </p>

            <div className="flex items-center gap-3 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="font-body text-xs text-on-surface-variant">
                Cancel with 1-click anytime before day 30. No questions asked.
              </span>
            </div>
          </div>

          <div className="flex-1 max-w-md bg-surface-container-low/60 p-6 rounded-2xl border border-surface-container-high space-y-3">
            <h3 className="font-label text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
              Included in Your Subscription
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-body text-on-surface">
              {CREVIX_PLAN.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="truncate">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cancellation Modal */}
      {cancelModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest p-6 rounded-2xl max-w-md w-full border border-surface-container-high shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-error">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <h3 className="font-headline font-bold text-lg text-on-surface">Cancel Subscription</h3>
            </div>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              Are you sure you want to cancel? If you cancel now, your automations and scheduled posts will remain active until the end of your current 30-day period. You will not be charged ₹199/month.
            </p>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-container-high">
              <button
                onClick={() => setCancelModal(false)}
                className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label text-xs font-semibold hover:bg-surface-container-high transition-colors"
              >
                Keep Subscription
              </button>
              <button
                onClick={() => {
                  setCancelModal(false);
                  alert("Subscription set to cancel at period end. No further charges will occur.");
                }}
                className="px-4 py-2 rounded-lg bg-error text-white font-label text-xs font-semibold hover:bg-error/90 transition-colors"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
