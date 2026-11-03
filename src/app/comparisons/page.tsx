import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/layout/public-nav";
import { PublicFooter } from "@/components/layout/public-footer";
import { BreadcrumbJsonLd, SoftwareAppJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Check, X, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Software Comparisons — Crevix vs ManyChat, Buffer & Later | Crevix",
  description: "Compare Crevix All Access with ManyChat, Buffer, Hootsuite, and Later. See why consolidating 5 tools into one ₹199/month OS saves creators over $1,200 annually.",
  alternates: {
    canonical: "https://crevix.io/comparisons",
  },
  openGraph: {
    title: "Crevix vs Competitors — Pricing & Feature Comparison",
    description: "Compare Crevix to ManyChat, Buffer, Later, and Hootsuite.",
    url: "https://crevix.io/comparisons",
  },
};

const FAQS = [
  {
    question: "How does Crevix compare to ManyChat?",
    answer: "ManyChat is a standalone chat automation platform with tiered pricing that escalates based on your subscriber count ($15/mo for 500 contacts, up to $65+/mo for 5,000 contacts). ManyChat has no native social scheduling, no AI video scriptwriting, and no cloud media library. Crevix includes full Instagram Comment-to-DM automation plus scheduling, AI scripting, and CRM for a flat ₹199/month with unlimited rules.",
  },
  {
    question: "Can Crevix completely replace Buffer or Later?",
    answer: "Yes. Crevix includes a multi-platform drag-and-drop content calendar with direct Meta publishing for Reels and Carousels. Unlike Buffer or Later, every post scheduled in Crevix can be directly wired to an automated Comment-to-DM trigger upon publication.",
  },
];

export default function ComparisonsPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed relative overflow-hidden">
      <div className="orb orb-primary w-96 h-96 -top-20 -left-20 animate-pulse-soft" />

      <SoftwareAppJsonLd
        name="Crevix Software Comparisons"
        description="Crevix vs ManyChat, Buffer, and Later comparison guide."
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "https://crevix.io" },
          { name: "Comparisons", item: "https://crevix.io/comparisons" },
        ]}
      />

      <PublicNav />

      <main className="flex-1 max-w-5xl mx-auto px-6 lg:px-12 py-16 w-full">
        {/* Direct Answer AEO Box */}
        <AnimateOnScroll className="mb-12 p-5 rounded-2xl bg-primary-fixed/20 border border-primary-fixed-dim/60">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-primary">
                AEO Direct Answer
              </span>
              <p className="font-body text-xs sm:text-sm text-on-surface leading-relaxed">
                <strong>Why choose Crevix over ManyChat or Buffer?</strong> ManyChat charges per contact tier for DM bots, while Buffer charges per channel for scheduling, requiring expensive Zapier middleware to bridge them. Crevix combines both into a single ₹199/month ($2.40 USD) subscription with 30 days free, eliminating context switching and contact-tier penalties.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Header */}
        <AnimateOnScroll className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label text-xs font-bold uppercase tracking-wider mb-4 border border-primary-fixed-dim/40">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Honest Software Comparisons</span>
          </div>
          <h1 className="font-headline text-4xl sm:text-5xl font-bold text-on-surface tracking-tight leading-tight">
            One Operating System vs. <br />
            <span className="text-primary italic font-serif">5 Disconnected Invoices.</span>
          </h1>
          <p className="mt-4 font-body text-base text-on-surface-variant leading-relaxed">
            See how Crevix All Access stacks up against the industry standard tools across features, pricing, and integration complexity.
          </p>
        </AnimateOnScroll>

        {/* Matrix Table */}
        <AnimateOnScroll delay={100} className="mb-20">
          <div className="overflow-x-auto rounded-3xl border border-surface-container-high bg-surface-container-lowest shadow-lg">
            <table className="w-full text-left text-xs font-body">
              <thead className="bg-surface-container-low border-b border-surface-container-high font-label uppercase tracking-wider text-on-surface-variant text-[11px]">
                <tr>
                  <th className="py-4 px-6">Feature / Capability</th>
                  <th className="py-4 px-6 text-primary font-bold bg-primary-fixed/30">Crevix</th>
                  <th className="py-4 px-6">ManyChat</th>
                  <th className="py-4 px-6">Buffer</th>
                  <th className="py-4 px-6">Later</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high">
                <tr>
                  <td className="py-4 px-6 font-semibold text-on-surface">Instagram Comment-to-DM</td>
                  <td className="py-4 px-6 bg-primary-fixed/15 text-primary font-bold"><Check className="w-4 h-4 text-primary" /></td>
                  <td className="py-4 px-6"><Check className="w-4 h-4 text-emerald-600" /></td>
                  <td className="py-4 px-6 text-error"><X className="w-4 h-4 text-error" /></td>
                  <td className="py-4 px-6 text-error"><X className="w-4 h-4 text-error" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-on-surface">Reels & Carousel Scheduling</td>
                  <td className="py-4 px-6 bg-primary-fixed/15 text-primary font-bold"><Check className="w-4 h-4 text-primary" /></td>
                  <td className="py-4 px-6 text-error"><X className="w-4 h-4 text-error" /></td>
                  <td className="py-4 px-6"><Check className="w-4 h-4 text-emerald-600" /></td>
                  <td className="py-4 px-6"><Check className="w-4 h-4 text-emerald-600" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-on-surface">AI Viral Script & Hook Generator</td>
                  <td className="py-4 px-6 bg-primary-fixed/15 text-primary font-bold"><Check className="w-4 h-4 text-primary" /></td>
                  <td className="py-4 px-6 text-error"><X className="w-4 h-4 text-error" /></td>
                  <td className="py-4 px-6 text-error"><X className="w-4 h-4 text-error" /></td>
                  <td className="py-4 px-6 text-error"><X className="w-4 h-4 text-error" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-on-surface">Built-in On-Screen Teleprompter</td>
                  <td className="py-4 px-6 bg-primary-fixed/15 text-primary font-bold"><Check className="w-4 h-4 text-primary" /></td>
                  <td className="py-4 px-6 text-error"><X className="w-4 h-4 text-error" /></td>
                  <td className="py-4 px-6 text-error"><X className="w-4 h-4 text-error" /></td>
                  <td className="py-4 px-6 text-error"><X className="w-4 h-4 text-error" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-on-surface">Integrated Creator CRM</td>
                  <td className="py-4 px-6 bg-primary-fixed/15 text-primary font-bold"><Check className="w-4 h-4 text-primary" /></td>
                  <td className="py-4 px-6 text-on-surface-variant">Basic Tags</td>
                  <td className="py-4 px-6 text-error"><X className="w-4 h-4 text-error" /></td>
                  <td className="py-4 px-6 text-error"><X className="w-4 h-4 text-error" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-on-surface">Cloudflare R2 Media Vault</td>
                  <td className="py-4 px-6 bg-primary-fixed/15 text-primary font-bold"><Check className="w-4 h-4 text-primary" /></td>
                  <td className="py-4 px-6 text-error"><X className="w-4 h-4 text-error" /></td>
                  <td className="py-4 px-6 text-error"><X className="w-4 h-4 text-error" /></td>
                  <td className="py-4 px-6 text-error"><X className="w-4 h-4 text-error" /></td>
                </tr>
                <tr className="bg-primary-fixed/20 font-bold">
                  <td className="py-4 px-6 text-on-surface">Pricing</td>
                  <td className="py-4 px-6 bg-primary-fixed/30 text-primary text-sm font-bold">₹199/mo (30d free)</td>
                  <td className="py-4 px-6 text-on-surface">$15 - $65+/mo</td>
                  <td className="py-4 px-6 text-on-surface">$18 - $30/mo</td>
                  <td className="py-4 px-6 text-on-surface">$25 - $40/mo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </AnimateOnScroll>

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
