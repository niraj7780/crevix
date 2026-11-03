import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/layout/public-nav";
import { PublicFooter } from "@/components/layout/public-footer";
import { FaqJsonLd, BreadcrumbJsonLd, SoftwareAppJsonLd } from "@/components/seo/JsonLd";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Sparkles, Video, CheckCircle2, ArrowRight, Play, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Content Creation & Script Studio — Viral Reel Hooks | Crevix",
  description: "Generate high-retention 60-second video scripts, 3-second psychological hooks, and record with an on-screen browser teleprompter in one creator workflow.",
  alternates: {
    canonical: "https://crevix.io/ai-content-creation",
  },
  openGraph: {
    title: "AI Content Creation & Reel Script Studio | Crevix",
    description: "Write viral scripts in seconds and deliver them naturally with our built-in teleprompter.",
    url: "https://crevix.io/ai-content-creation",
  },
};

const FAQS = [
  {
    question: "How does the AI script generator formulate viral hooks?",
    answer: "Crevix utilizes a 5-step retention architecture modeled on top-performing short-form videos: a 3-second contrarian hook, 12 seconds of problem agitation, 25 seconds of actionable breakdown, social proof, and a single-keyword Comment-to-DM trigger.",
  },
  {
    question: "Does Crevix include a teleprompter?",
    answer: "Yes. Crevix features an in-browser teleprompter studio with adjustable auto-scroll speeds (120-160 WPM), font size scaling, and mirrored display mode for eye-level camera alignment.",
  },
  {
    question: "Can I generate carousel content and captions as well?",
    answer: "Yes. Along with video scripts, Crevix generates multi-slide carousel outlines, persuasive captions, and relevant hashtag sets tailored to your specific creator niche.",
  },
];

export default function AiContentCreationPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed relative overflow-hidden">
      <div className="orb orb-primary w-96 h-96 -top-20 -right-20 animate-pulse-soft" />

      <SoftwareAppJsonLd
        name="Crevix AI Script & Content Studio"
        description="AI viral hook generator and browser teleprompter studio."
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "https://crevix.io" },
          { name: "Solutions", item: "https://crevix.io/features" },
          { name: "AI Content Creation", item: "https://crevix.io/ai-content-creation" },
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
                <strong>How does AI optimize short-form video retention?</strong> AI analyzes viewer drop-off points in 60-second video algorithms (Reels, TikTok, Shorts). By placing psychological pattern-interrupt hooks in the first 3 seconds, removing conversational filler, and pairing delivery with an auto-paced teleprompter at 140 WPM, creators maintain over 65% completion rates, triggering recommendation distribution.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label text-xs font-bold uppercase tracking-wider mb-4 border border-primary-fixed-dim/40">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Retention-First AI Engine</span>
            </div>
            <h1 className="font-headline text-4xl sm:text-5xl font-bold text-on-surface tracking-tight leading-tight">
              Turn Creative Blocks into <span className="text-primary italic font-serif">Viral Scripts</span> in 30 Seconds.
            </h1>
            <p className="mt-4 font-body text-base text-on-surface-variant leading-relaxed">
              Stop staring at a blank screen. Crevix writes 3-second psychological hooks, timestamped Reel scripts, and feeds them directly into an on-screen teleprompter for effortless recording.
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

          {/* Teleprompter Studio Graphic */}
          <AnimateOnScroll delay={150}>
            <div className="p-6 rounded-3xl bg-surface-container-low border border-surface-container-high shadow-lg space-y-4 hover-glow transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-primary" />
                  <span className="font-label text-xs font-bold text-on-surface">Teleprompter Studio Live</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[11px] text-on-surface-variant">140 WPM • 0:48 / 1:00</span>
                </div>
              </div>

              {/* Script Body Preview */}
              <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-high space-y-3 font-body text-xs">
                <div className="p-2 rounded bg-primary-fixed/20 border border-primary-fixed-dim/40 text-primary font-bold">
                  [0:00 - 0:03] HOOK: &quot;I stopped posting 7 days a week, and my reach tripled. Here is the math.&quot;
                </div>
                <div className="text-on-surface-variant leading-relaxed">
                  [0:03 - 0:15] Most creators burn out creating low-value volume. The algorithm doesn&apos;t reward frequency—it rewards average watch time.
                </div>
                <div className="text-on-surface leading-relaxed font-semibold">
                  [0:15 - 0:38] When you focus on single-topic, high-retention Reels with a built-in comment trigger, your engagement velocity explodes.
                </div>
                <div className="p-2 rounded bg-surface-container text-on-surface-variant text-[11px]">
                  [0:38 - 0:45] Comment &quot;REACH&quot; below and I will DM you my 5-step retention checklist right now.
                </div>
              </div>

              {/* Controls */}
              <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container-high flex items-center justify-between text-xs font-label">
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <Play className="w-4 h-4 text-primary" />
                  <span>Auto-scroll Active</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <Eye className="w-4 h-4 text-tertiary" />
                  <span>Camera Eye-Line Guide On</span>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Feature Grid */}
        <AnimateOnScroll delay={200} className="mb-20">
          <div className="text-center mb-10">
            <h2 className="font-headline text-3xl font-bold text-on-surface">
              Engineered for High-Retention Short-Form Formats
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs hover-glow transition-all">
              <h3 className="font-headline font-bold text-base text-on-surface mb-2">
                Psychological 3-Second Hooks
              </h3>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Generate 10 contrarian hook variations per script. Tested across thousands of viral formats to minimize the critical 3-second swipe-away rate.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs hover-glow transition-all">
              <h3 className="font-headline font-bold text-base text-on-surface mb-2">
                Paced Browser Teleprompter
              </h3>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Position your script directly beneath your laptop camera lens. Eliminate memorization stress and record natural, high-confidence takes on take #1.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs hover-glow transition-all">
              <h3 className="font-headline font-bold text-base text-on-surface mb-2">
                Seamless Comment-to-DM Pairing
              </h3>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Your AI script is created with the exact keyword trigger matched to your automated DM response, keeping your whole pipeline synchronized.
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
