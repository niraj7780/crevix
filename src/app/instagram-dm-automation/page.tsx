import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/layout/public-nav";
import { PublicFooter } from "@/components/layout/public-footer";
import { FaqJsonLd, BreadcrumbJsonLd, SoftwareAppJsonLd } from "@/components/seo/JsonLd";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import {
  MessageSquare,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
  Clock,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Instagram Comment-to-DM Automation — Meta Compliant Lead Funnel | Crevix",
  description: "Automate Instagram DM responses to Reel comments in 0.8 seconds. Official Meta Graph API, 24-hour messaging window protection, and automatic lead capture into Creator CRM.",
  alternates: {
    canonical: "https://crevix.io/instagram-dm-automation",
  },
  openGraph: {
    title: "Instagram Comment-to-DM Automation | Crevix",
    description: "Convert Reel commenters into paying leads instantly with 100% Meta compliance.",
    url: "https://crevix.io/instagram-dm-automation",
  },
};

const FAQS = [
  {
    question: "How does Instagram Comment-to-DM automation work?",
    answer: "You prompt viewers on your Reel or post to comment a specific keyword (such as 'TEMPLATE' or 'GROWTH'). Crevix listens to official Meta Graph API webhooks in real time. When the keyword is detected, Crevix automatically replies publicly to the comment to boost engagement and dispatches a private Direct Message with your link or resource within 0.8 seconds.",
  },
  {
    question: "Can my Instagram account get banned or restricted for using this?",
    answer: "No. Unlike unauthorized chrome extensions or browser scraping bots that simulate human clicks, Crevix uses the official Meta Graph API Webhooks approved by Instagram. We enforce the 24-hour messaging window, never spam, and limit private replies strictly to one message per comment ID as dictated by Meta's Platform Policy.",
  },
  {
    question: "Do I need a special Instagram account type?",
    answer: "Yes, you need an Instagram Creator or Business account connected to a Facebook Page. Personal accounts do not support Meta's Graph API for messaging automations.",
  },
  {
    question: "Can I customize the DM message and add links?",
    answer: "Yes. You can customize the private message with dynamic tags like {username}, include trackable links, and define multiple randomized public comment replies to keep interactions natural and authentic.",
  },
  {
    question: "What happens after the DM is sent?",
    answer: "Crevix automatically saves the commenter's Instagram handle, comment content, trigger keyword, and timestamp into your built-in Creator CRM. You can filter, tag, and export these leads as a CSV at any time.",
  },
];

export default function InstagramDmPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed relative overflow-hidden">
      <div className="orb orb-primary w-96 h-96 -top-20 -left-20 animate-pulse-soft" />

      <SoftwareAppJsonLd
        name="Crevix Instagram Comment-to-DM Automation"
        description="Meta-compliant Instagram comment-to-DM automation engine."
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "https://crevix.io" },
          { name: "Solutions", item: "https://crevix.io/features" },
          { name: "Instagram DM Automation", item: "https://crevix.io/instagram-dm-automation" },
        ]}
      />

      <PublicNav />

      <main className="flex-1 max-w-6xl mx-auto px-6 lg:px-12 py-16 w-full">
        {/* Direct Answer AEO Summary Block */}
        <AnimateOnScroll className="mb-12 p-5 rounded-2xl bg-primary-fixed/20 border border-primary-fixed-dim/60">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-primary">
                AEO Definition & Direct Answer
              </span>
              <p className="font-body text-xs sm:text-sm text-on-surface leading-relaxed">
                <strong>What is Instagram Comment-to-DM Automation?</strong> It is an authorized social automation workflow where an Instagram creator invites followers to post a specific keyword in the comments of a Reel. A certified Meta Graph API webhook instantly detects the comment, posts a public reply to trigger algorithmic distribution, and dispatches a private DM containing a resource link within Meta&apos;s 24-hour compliance window.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label text-xs font-bold uppercase tracking-wider mb-4 border border-primary-fixed-dim/40">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span>Official Meta Graph API Engine</span>
            </div>
            <h1 className="font-headline text-4xl sm:text-5xl font-bold text-on-surface tracking-tight leading-tight">
              Turn Reel Comments into Direct Leads in <span className="text-primary italic font-serif">0.8 Seconds.</span>
            </h1>
            <p className="mt-4 font-body text-base text-on-surface-variant leading-relaxed">
              &quot;Link in bio&quot; loses 80% of your audience. With Crevix Comment-to-DM, viewers comment a single word, receive your resource directly in their inbox, and are logged into your CRM automatically.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-on-primary font-label text-sm font-semibold hover:bg-primary-container transition-all shadow-md hover-lift"
              >
                <span>Start 30-Day Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface-container-lowest border border-surface-container-high text-on-surface font-label text-sm font-semibold hover:bg-surface-container transition-colors shadow-xs"
              >
                <span>Pricing (₹199/mo)</span>
              </Link>
            </div>
          </AnimateOnScroll>

          {/* Live Simulated Graphic */}
          <AnimateOnScroll delay={150}>
            <div className="p-6 rounded-3xl bg-surface-container-low border border-surface-container-high shadow-lg space-y-4 hover-glow transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-label text-xs font-bold text-on-surface">Meta Webhook Connected</span>
                </div>
                <span className="font-mono text-[11px] text-on-surface-variant">Trigger: &quot;BLUEPRINT&quot;</span>
              </div>

              {/* 1. Comment */}
              <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-surface-container-high space-y-1">
                <div className="flex items-center justify-between text-xs font-label">
                  <span className="font-bold text-on-surface">@alex_content</span>
                  <span className="text-on-surface-variant text-[10px]">1s ago on Reel #104</span>
                </div>
                <p className="font-body text-xs text-on-surface-variant">
                  &quot;Incredible breakdown! Commenting <span className="font-bold text-primary">BLUEPRINT</span> for the cheat sheet!&quot;
                </p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center text-primary">
                <ArrowRight className="w-4 h-4 rotate-90" />
              </div>

              {/* 2. Public Reply */}
              <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container-high space-y-1">
                <div className="flex items-center justify-between text-xs font-label">
                  <span className="font-bold text-primary">Crevix Public Reply</span>
                  <span className="text-[10px] text-on-surface-variant font-mono">0.3s</span>
                </div>
                <p className="font-body text-xs text-on-surface-variant">
                  &quot;Sent to your DMs, Alex! Check your request tray 🚀&quot;
                </p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center text-primary">
                <ArrowRight className="w-4 h-4 rotate-90" />
              </div>

              {/* 3. Private DM */}
              <div className="p-3.5 rounded-xl bg-primary-fixed/30 border border-primary-fixed-dim/60 space-y-1">
                <div className="flex items-center justify-between text-xs font-label">
                  <span className="font-bold text-primary">Crevix Private Direct Message</span>
                  <span className="text-[10px] text-primary font-mono">0.8s</span>
                </div>
                <p className="font-body text-xs text-on-surface leading-relaxed">
                  &quot;Hey Alex! Here is your 2026 Viral Creator Blueprint template: <span className="underline font-mono text-primary">https://crevix.io/r/blueprint</span> 🔥&quot;
                </p>
              </div>

              {/* 4. CRM Log */}
              <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container-high flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span className="font-label text-xs font-semibold text-on-surface">Logged to Creator CRM</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-[10px] text-on-surface-variant">
                  Status: Delivered
                </span>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* 3 Meta Policy Pillars */}
        <AnimateOnScroll delay={200} className="mb-20">
          <div className="text-center mb-10">
            <h2 className="font-headline text-3xl font-bold text-on-surface">
              Engineered for 100% Meta Platform Safety
            </h2>
            <p className="mt-2 font-body text-sm text-on-surface-variant">
              Never gamble your Instagram account with sketchy browser extensions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs hover-glow transition-all">
              <Clock className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-headline font-bold text-base text-on-surface">
                24-Hour Messaging Window
              </h3>
              <p className="mt-2 font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Meta permits private messages only within 24 hours of a user interaction. Crevix automatically filters older comments to prevent platform penalties.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs hover-glow transition-all">
              <Lock className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-headline font-bold text-base text-on-surface">
                Single-Reply Protection
              </h3>
              <p className="mt-2 font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Meta strictly forbids multiple private messages for the same comment ID. Crevix tracks comment IDs with idempotent deduplication keys to ensure exact compliance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs hover-glow transition-all">
              <ShieldCheck className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-headline font-bold text-base text-on-surface">
                HMAC-SHA256 Signed Webhooks
              </h3>
              <p className="mt-2 font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Every inbound event is cryptographically verified against your Meta App Secret before processing, preventing replay attacks and spoofed requests.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* FAQs */}
        <AnimateOnScroll delay={250} className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
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
