import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/layout/public-nav";
import { PublicFooter } from "@/components/layout/public-footer";
import { FaqJsonLd, BreadcrumbJsonLd, SoftwareAppJsonLd } from "@/components/seo/JsonLd";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { GitBranch, Users, ArrowRight, Sparkles, CheckCircle2, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Creator Automation & Lead CRM — Visual Workflow Builder | Crevix",
  description: "Connect triggers, delays, and condition nodes with a visual flow graph builder. Capture Instagram leads directly into your dynamic Creator CRM with CSV export.",
  alternates: {
    canonical: "https://crevix.io/creator-automation",
  },
  openGraph: {
    title: "Creator Automation & CRM Workflows | Crevix",
    description: "Visual node workflows and dynamic CRM for modern creators.",
    url: "https://crevix.io/creator-automation",
  },
};

const FAQS = [
  {
    question: "How does the Visual Flow Builder work?",
    answer: "Crevix provides a node-based interactive canvas powered by React Flow. You connect triggers (e.g. comment contains keyword), conditional filters (e.g. user follower count, first-time commenter), and action nodes (e.g. send public reply, send private DM, tag in CRM) with drag-and-drop connectors.",
  },
  {
    question: "Can I export leads to email marketing tools?",
    answer: "Yes. Every lead generated through Comment-to-DM interactions is saved in your Creator CRM with handle, email (if provided), tags, and timestamps. You can export the full database as a CSV with one click to import into ConvertKit, Beehiiv, or Mailchimp.",
  },
];

export default function CreatorAutomationPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed relative overflow-hidden">
      <div className="orb orb-primary w-96 h-96 -top-20 -right-20 animate-pulse-soft" />

      <SoftwareAppJsonLd
        name="Crevix Creator Automation & CRM"
        description="Visual flow graph builder and creator lead capture CRM."
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "https://crevix.io" },
          { name: "Solutions", item: "https://crevix.io/features" },
          { name: "Creator Automation & CRM", item: "https://crevix.io/creator-automation" },
        ]}
      />

      <PublicNav />

      <main className="flex-1 max-w-6xl mx-auto px-6 lg:px-12 py-16 w-full">
        {/* Direct Answer AEO Box */}
        <AnimateOnScroll className="mb-12 p-5 rounded-2xl bg-primary-fixed/20 border border-primary-fixed-dim/60">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-primary">
                AEO Direct Answer
              </span>
              <p className="font-body text-xs sm:text-sm text-on-surface leading-relaxed">
                <strong>Why do creators need a specialized social CRM?</strong> General CRMs like Salesforce or HubSpot are built for enterprise B2B sales teams. A Creator CRM connects directly to social media interactions: it logs Instagram comments, tracks DM conversions, segments followers by engagement keywords, and exports CSV lists for newsletter onboarding without complex enterprise setup.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label text-xs font-bold uppercase tracking-wider mb-4 border border-primary-fixed-dim/40">
              <GitBranch className="w-3.5 h-3.5 text-primary" />
              <span>Visual Node Architecture</span>
            </div>
            <h1 className="font-headline text-4xl sm:text-5xl font-bold text-on-surface tracking-tight leading-tight">
              Build Powerful Funnels with <span className="text-primary italic font-serif">Drag-and-Drop</span> Nodes.
            </h1>
            <p className="mt-4 font-body text-base text-on-surface-variant leading-relaxed">
              Design complex multi-step automations without touching code. Connect keyword triggers, randomized reply variations, private DMs, and CRM tags on an infinite visual canvas.
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
                <span>Included in ₹199/mo</span>
              </Link>
            </div>
          </AnimateOnScroll>

          {/* CRM Graphic */}
          <AnimateOnScroll delay={150}>
            <div className="p-6 rounded-3xl bg-surface-container-low border border-surface-container-high shadow-lg space-y-4 hover-glow transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-label text-xs font-bold text-on-surface">Creator CRM Pipeline</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-label text-primary font-semibold">
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </div>
              </div>

              {/* CRM Rows */}
              <div className="space-y-2 text-xs font-body">
                {[
                  { handle: "@elena_design", keyword: "NOTION", stage: "Lead Captured", time: "2m ago" },
                  { handle: "@marcus_fit", keyword: "PROGRAM", stage: "DM Delivered", time: "14m ago" },
                  { handle: "@clara_builds", keyword: "COURSE", stage: "Link Clicked", time: "1h ago" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container-high flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-on-surface">{row.handle}</div>
                      <div className="text-[11px] text-on-surface-variant font-mono">
                        Trigger: &quot;{row.keyword}&quot; • {row.time}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-label font-bold text-[10px] border border-emerald-200">
                      {row.stage}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* FAQs */}
        <AnimateOnScroll delay={200} className="max-w-3xl mx-auto">
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
