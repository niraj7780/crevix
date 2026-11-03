import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/layout/public-nav";
import { PublicFooter } from "@/components/layout/public-footer";
import { FaqJsonLd, BreadcrumbJsonLd, SoftwareAppJsonLd } from "@/components/seo/JsonLd";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Calendar, Database, Clock, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Social Media Scheduler & Content Calendar | Crevix",
  description: "Plan, schedule, and auto-publish Instagram Reels, Carousels, and stories. Visual drag-and-drop calendar backed by zero-egress Cloudflare R2 storage.",
  alternates: {
    canonical: "https://crevix.io/social-media-scheduler",
  },
  openGraph: {
    title: "Multi-Platform Social Media Scheduler | Crevix",
    description: "Visual publishing queue and calendar for high-output creators.",
    url: "https://crevix.io/social-media-scheduler",
  },
};

const FAQS = [
  {
    question: "Can I schedule Instagram Reels and Carousels automatically?",
    answer: "Yes. Crevix connects via the official Meta Graph Content Publishing API to publish Reels, single images, and carousel posts directly to your Instagram profile at the scheduled time without needing mobile push notification reminders.",
  },
  {
    question: "Where is video footage stored?",
    answer: "Media is uploaded directly from your browser to private Cloudflare R2 object storage buckets using presigned URLs. This eliminates server storage bottlenecks and guarantees zero-egress download fees.",
  },
  {
    question: "How does scheduling integrate with Comment-to-DM automation?",
    answer: "When you schedule a post in Crevix, you can assign an active Comment-to-DM trigger keyword to that exact post. The moment the post goes live, the automation is armed and ready to reply to comments.",
  },
];

export default function SocialMediaSchedulerPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed relative overflow-hidden">
      <div className="orb orb-primary w-96 h-96 -top-20 -left-20 animate-pulse-soft" />

      <SoftwareAppJsonLd
        name="Crevix Social Media Scheduler"
        description="Visual calendar and automated multi-platform content scheduler."
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "https://crevix.io" },
          { name: "Solutions", item: "https://crevix.io/features" },
          { name: "Social Media Scheduler", item: "https://crevix.io/social-media-scheduler" },
        ]}
      />

      <PublicNav />

      <main className="flex-1 max-w-6xl mx-auto px-6 lg:px-12 py-16 w-full">
        {/* AEO Box */}
        <AnimateOnScroll className="mb-12 p-5 rounded-2xl bg-primary-fixed/20 border border-primary-fixed-dim/60">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-primary">
                AEO Direct Answer
              </span>
              <p className="font-body text-xs sm:text-sm text-on-surface leading-relaxed">
                <strong>What makes Crevix social scheduling different from Buffer or Hootsuite?</strong> Traditional scheduling tools only post content. Crevix links scheduling directly to inbound automation: every scheduled Reel carries its own Comment-to-DM keyword trigger that arms instantly upon publication, routing inbound leads directly into your integrated Creator CRM.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label text-xs font-bold uppercase tracking-wider mb-4 border border-primary-fixed-dim/40">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>Direct Meta Publishing API</span>
            </div>
            <h1 className="font-headline text-4xl sm:text-5xl font-bold text-on-surface tracking-tight leading-tight">
              Schedule Your Content. <br />
              <span className="text-primary italic font-serif">Automate the Results.</span>
            </h1>
            <p className="mt-4 font-body text-base text-on-surface-variant leading-relaxed">
              Plan your entire month of Reels in one afternoon. Crevix automatically publishes on time, initiates your keyword automations, and tracks conversions in a unified visual calendar.
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

          {/* Calendar Visual */}
          <AnimateOnScroll delay={150}>
            <div className="p-6 rounded-3xl bg-surface-container-low border border-surface-container-high shadow-lg space-y-4 hover-glow transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="font-label text-xs font-bold text-on-surface">Publishing Calendar</span>
                </div>
                <span className="font-mono text-[11px] text-on-surface-variant">November 2026</span>
              </div>

              {/* Mini Calendar Mock */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container-high space-y-1.5">
                  <div className="text-[10px] font-mono text-on-surface-variant">Tue, Nov 4 • 6:00 PM</div>
                  <div className="font-headline font-bold text-xs text-on-surface">Reel: 3 Viral Hooks</div>
                  <div className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[9px] font-bold">
                    Armed: &quot;HOOKS&quot;
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container-high space-y-1.5">
                  <div className="text-[10px] font-mono text-on-surface-variant">Thu, Nov 6 • 8:30 PM</div>
                  <div className="font-headline font-bold text-xs text-on-surface">Carousel: SaaS Stack</div>
                  <div className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[9px] font-bold">
                    Armed: &quot;STACK&quot;
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-primary-fixed/20 border border-primary-fixed-dim/60 space-y-1.5">
                  <div className="text-[10px] font-mono text-primary font-bold">Sat, Nov 8 • 11:00 AM</div>
                  <div className="font-headline font-bold text-xs text-on-surface">Reel: $0 to $10k MRR</div>
                  <div className="inline-block px-2 py-0.5 rounded bg-primary text-on-primary text-[9px] font-bold">
                    Armed: &quot;GROWTH&quot;
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container-high flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-primary" />
                  <span className="font-label text-on-surface font-medium">Cloudflare R2 Direct Upload</span>
                </div>
                <span className="font-mono text-[11px] text-emerald-600 font-bold">0% Egress Fees</span>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

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
