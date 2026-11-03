import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/layout/public-nav";
import { PublicFooter } from "@/components/layout/public-footer";
import { SoftwareAppJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — Crevix All Access (₹199/month with 30-Day Free Trial)",
  description: "One simple creator plan. ₹0 for your first 30 days, then ₹199/month. Full access to Instagram Comment-to-DM automation, AI script generators, scheduler, CRM, and cloud storage.",
  alternates: {
    canonical: "https://crevix.io/pricing",
  },
  openGraph: {
    title: "Crevix Pricing — ₹199/month All Access",
    description: "Try every creator tool free for 30 days. No tier limits, no surprise fees.",
    url: "https://crevix.io/pricing",
    type: "website",
  },
};

const FAQS = [
  {
    question: "What is included in the 30-day free trial?",
    answer: "Every single feature of Crevix is unlocked during your 30-day free trial: Instagram comment-to-DM automation, AI viral hook and script generation, multi-platform post scheduling, visual calendar, zero-egress media storage, creator CRM, and social analytics. There are no tier restrictions or hidden limits.",
  },
  {
    question: "How much does Crevix cost after the 30-day trial?",
    answer: "Crevix All Access costs exactly ₹199/month (approximately $2.40 USD). There are no higher tiers, no add-ons to purchase, and no per-user surcharges.",
  },
  {
    question: "Can I cancel before being charged?",
    answer: "Yes. You can cancel your subscription with one click directly inside your dashboard settings at any point during your 30-day free trial. If you cancel before day 30, your card will never be charged.",
  },
  {
    question: "Does Crevix follow Instagram and Meta platform policies?",
    answer: "Yes, 100%. Crevix uses the official Meta Graph API webhooks and complies strictly with the 24-hour messaging window and the single-reply rule. We never scrape or use unauthorized browser automations that risk your account.",
  },
  {
    question: "Why does Crevix have only one subscription plan?",
    answer: "We believe creators shouldn't have to juggle multiple software subscriptions or calculate tier usage caps. One subscription gives you an entire creator OS that replaces 5 separate tools totaling over $150/month.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed relative overflow-hidden">
      {/* Background Motion Orbs */}
      <div className="orb orb-primary w-96 h-96 -top-20 -left-20 animate-pulse-soft" />
      <div className="orb orb-accent w-96 h-96 top-1/3 -right-20 animate-float" />

      {/* JSON-LD Schemas */}
      <SoftwareAppJsonLd
        name="Crevix All Access"
        price="199"
        priceCurrency="INR"
        trialPeriodDays={30}
        description="One unified subscription for creators: 30 days free, then ₹199/month. Full access to Instagram Comment-to-DM, AI script generation, scheduling, and CRM."
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "https://crevix.io" },
          { name: "Pricing", item: "https://crevix.io/pricing" },
        ]}
      />

      <PublicNav />

      <main className="flex-1 max-w-5xl mx-auto px-6 lg:px-12 py-16 w-full">
        {/* Header */}
        <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label text-xs font-bold uppercase tracking-wider mb-4 border border-primary-fixed-dim/40">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Single Transparent Pricing</span>
          </div>
          <h1 className="font-headline text-4xl sm:text-5xl font-bold text-on-surface tracking-tight leading-tight">
            One subscription. <span className="text-primary italic font-serif">Every feature.</span>
          </h1>
          <p className="mt-4 font-body text-base text-on-surface-variant leading-relaxed">
            Eliminate 5 disconnected subscriptions. Start your 30-day free trial today, then pay just ₹199/month.
          </p>
        </AnimateOnScroll>

        {/* Unified Pricing Card */}
        <AnimateOnScroll delay={100} className="relative mb-20">
          <div className="p-8 sm:p-12 rounded-3xl bg-surface-container-lowest border-2 border-primary shadow-2xl relative overflow-hidden hover-glow transition-all">
            {/* Top Ribbon */}
            <div className="absolute top-0 right-0 bg-primary text-on-primary font-label text-xs font-bold uppercase tracking-wider py-1.5 px-6 rounded-bl-2xl shadow-sm">
              30 Days 100% Free
            </div>

            <div className="max-w-3xl">
              <span className="font-label text-xs font-bold text-primary uppercase tracking-wider">
                Unlimited Creator Operating System
              </span>
              <h2 className="mt-2 font-headline text-3xl sm:text-4xl font-bold text-on-surface">
                Crevix All Access
              </h2>

              {/* Price Callout */}
              <div className="mt-6 flex flex-wrap items-baseline gap-3">
                <span className="font-headline text-6xl font-bold text-on-surface tracking-tight">₹0</span>
                <span className="font-label text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  First 30 days free
                </span>
                <span className="font-body text-base text-on-surface-variant">
                  then <strong className="text-on-surface font-headline text-3xl">₹199</strong>/month
                </span>
              </div>

              <p className="mt-4 font-body text-sm text-on-surface-variant leading-relaxed max-w-xl">
                Full unrestricted access to every automation tool, AI model, scheduler, and creator pipeline. No setup fees, no contracts, cancel in seconds.
              </p>

              {/* Feature Checklist */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-body text-on-surface">
                {[
                  "Instagram Comment-to-DM Automation",
                  "Unlimited Automation Rules & Triggers",
                  "AI Viral Hook & Reel Script Generator",
                  "AI Topic Research & Trend Reports",
                  "Multi-Platform Social Media Scheduler",
                  "Interactive Drag-and-Drop Calendar",
                  "Zero-Egress Cloudflare R2 Media Storage",
                  "Creator CRM with Dynamic Lead Pipeline",
                  "1-Click CSV Lead & Contact Export",
                  "Real-Time Social Analytics & Reach Tracking",
                  "Unified Direct Message Inbox",
                  "Visual Flow Graph Workflow Builder",
                  "On-Screen Teleprompter Studio",
                  "100% Official Meta Graph API Compliance",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-xs sm:text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA & Guarantee */}
              <div className="mt-10 pt-8 border-t border-surface-container-high flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/signup"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-on-primary font-label text-sm font-semibold hover:bg-primary-container transition-all shadow-md hover-lift"
                >
                  <span>Start 30-Day Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex items-center gap-2 text-xs font-body text-on-surface-variant">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>No upfront payment today. Cancel before day 30 with zero charges.</span>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Value Comparison Table */}
        <AnimateOnScroll delay={200} className="mb-20">
          <div className="text-center mb-8">
            <h3 className="font-headline text-2xl font-bold text-on-surface">
              Why Crevix Replaces ₹12,000/Month in Software
            </h3>
            <p className="mt-2 font-body text-sm text-on-surface-variant">
              Here is how Crevix compares to paying for individual creator tools:
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-surface-container-high bg-surface-container-lowest shadow-sm">
            <table className="w-full text-left text-xs font-body">
              <thead className="bg-surface-container-low border-b border-surface-container-high font-label uppercase tracking-wider text-on-surface-variant text-[11px]">
                <tr>
                  <th className="py-4 px-6">Capability</th>
                  <th className="py-4 px-6">Separate SaaS Stack</th>
                  <th className="py-4 px-6 text-primary font-bold">Crevix All Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high">
                <tr>
                  <td className="py-3.5 px-6 font-semibold text-on-surface">Instagram DM Automation</td>
                  <td className="py-3.5 px-6 text-on-surface-variant">ManyChat Pro ($15 - $45/mo)</td>
                  <td className="py-3.5 px-6 text-primary font-semibold">Included (₹199/mo)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-semibold text-on-surface">Social Media Scheduling</td>
                  <td className="py-3.5 px-6 text-on-surface-variant">Buffer / Later ($18 - $30/mo)</td>
                  <td className="py-3.5 px-6 text-primary font-semibold">Included (₹199/mo)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-semibold text-on-surface">AI Script & Hook Generation</td>
                  <td className="py-3.5 px-6 text-on-surface-variant">Jasper / Copy.ai ($39/mo)</td>
                  <td className="py-3.5 px-6 text-primary font-semibold">Included (₹199/mo)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-semibold text-on-surface">Creator CRM & Lead Tracking</td>
                  <td className="py-3.5 px-6 text-on-surface-variant">Airtable / Notion Pro ($20/mo)</td>
                  <td className="py-3.5 px-6 text-primary font-semibold">Included (₹199/mo)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-semibold text-on-surface">Cloud Media Asset Storage</td>
                  <td className="py-3.5 px-6 text-on-surface-variant">Dropbox / Google One ($10/mo)</td>
                  <td className="py-3.5 px-6 text-primary font-semibold">Included (₹199/mo)</td>
                </tr>
                <tr className="bg-primary-fixed/20 font-bold">
                  <td className="py-4 px-6 text-on-surface">Total Monthly Cost</td>
                  <td className="py-4 px-6 text-error">~$102 - $144/mo (~₹8,500 - ₹12,000)</td>
                  <td className="py-4 px-6 text-primary text-sm">₹199/month (~$2.40 USD)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </AnimateOnScroll>

        {/* FAQ Section */}
        <AnimateOnScroll delay={300} className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container border border-surface-container-high text-on-surface-variant text-xs font-label font-bold uppercase tracking-wider mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-primary" />
              <span>Questions & Answers</span>
            </div>
            <h3 className="font-headline text-3xl font-bold text-on-surface">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs hover-glow transition-all"
              >
                <h4 className="font-headline font-bold text-base text-on-surface">
                  {faq.question}
                </h4>
                <p className="mt-2 font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </main>

      <PublicFooter />
    </div>
  );
}
