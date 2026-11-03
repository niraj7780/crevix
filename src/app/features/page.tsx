import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/layout/public-nav";
import { PublicFooter } from "@/components/layout/public-footer";
import { SoftwareAppJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import {
  Sparkles,
  MessageSquare,
  Calendar,
  Layers,
  Database,
  TrendingUp,
  GitBranch,
  Video,
  Zap,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features — The Complete Creator Operating System | Crevix",
  description: "Explore all 12 core capabilities of Crevix: Comment-to-DM automation, AI Reel script generator, multi-account social scheduler, creator CRM, and Cloudflare R2 media library.",
  alternates: {
    canonical: "https://crevix.io/features",
  },
  openGraph: {
    title: "Crevix Features — 12 Tools in One Creator OS",
    description: "Everything you need to research, produce, schedule, and monetize short-form content.",
    url: "https://crevix.io/features",
  },
};

const FEATURES = [
  {
    icon: MessageSquare,
    tag: "Core Growth",
    title: "Instagram Comment-to-DM Automation",
    description: "Automatically reply to Reel comments and send instant private DMs with lead magnets, course links, or Notion templates. 100% Meta Graph API compliant with 24h safety windows.",
    href: "/instagram-dm-automation",
  },
  {
    icon: Sparkles,
    tag: "Content Engine",
    title: "AI Viral Hook & Reel Script Studio",
    description: "Generate 3-second psychological hooks, retention-focused body scripts, and keyword triggers based on analyzed patterns of top 1% performing social videos.",
    href: "/ai-content-creation",
  },
  {
    icon: Calendar,
    tag: "Publishing",
    title: "Multi-Platform Content Scheduler",
    description: "Plan and schedule Reels, carousels, and single images across Instagram, YouTube Shorts, and TikTok with an intuitive drag-and-drop calendar.",
    href: "/social-media-scheduler",
  },
  {
    icon: Users,
    tag: "Monetization",
    title: "Creator CRM & Lead Pipeline",
    description: "Automatically convert Instagram commenters into organized lead records with handle, DM history, conversion tags, and 1-click CSV export.",
    href: "/creator-automation",
  },
  {
    icon: GitBranch,
    tag: "Visual Builder",
    title: "Flow Graph Workflow Canvas",
    description: "Design multi-step messaging logic, conditional keyword routing, and delay branches using a visual node-based interactive flow builder.",
    href: "/creator-automation",
  },
  {
    icon: Video,
    tag: "Production",
    title: "On-Screen Teleprompter Studio",
    description: "Record flawless talking-head videos with an auto-scrolling browser teleprompter calibrated to 130-150 words per minute for natural eye contact.",
    href: "/ai-content-creation",
  },
  {
    icon: Database,
    tag: "Infrastructure",
    title: "Zero-Egress Cloudflare R2 Media Vault",
    description: "Store high-resolution 4K video footage and carousels without unpredictable bandwidth costs or cloud storage overages.",
    href: "/social-media-scheduler",
  },
  {
    icon: TrendingUp,
    tag: "Intelligence",
    title: "Social Reach & Conversion Analytics",
    description: "Track comment engagement velocity, DM open rates, lead conversion percentages, and top-performing keyword triggers in real time.",
    href: "/features",
  },
  {
    icon: Zap,
    tag: "Automation",
    title: "Unlimited Automation Rules",
    description: "Create as many keyword-response pairs as your creator campaigns need. Run simultaneous promotions across multiple Reels without paying extra.",
    href: "/instagram-dm-automation",
  },
  {
    icon: Layers,
    tag: "Asset Prep",
    title: "AI Topic Research & Trend Reports",
    description: "Scan breakout creator niches, analyze competitor content angles, and receive data-backed recommendations on what topics to cover next.",
    href: "/ai-content-creation",
  },
  {
    icon: MessageSquare,
    tag: "Direct Support",
    title: "Unified Direct Message Inbox",
    description: "Manage inbound Instagram DMs, review automated conversations, and step in for high-value manual replies from a single desktop dashboard.",
    href: "/features",
  },
  {
    icon: CheckCircle2,
    tag: "Compliance",
    title: "Safe Meta Webhook Architecture",
    description: "Cryptographically verified HMAC-SHA256 signatures ensure 0% ban risk, exact rate limiting, and zero violation of platform terms of service.",
    href: "/instagram-dm-automation",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed relative overflow-hidden">
      <div className="orb orb-primary w-96 h-96 -top-20 -right-20 animate-pulse-soft" />

      <SoftwareAppJsonLd
        name="Crevix Creator Features"
        description="The complete 12-tool creator operating system."
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "https://crevix.io" },
          { name: "Features", item: "https://crevix.io/features" },
        ]}
      />

      <PublicNav />

      <main className="flex-1 max-w-6xl mx-auto px-6 lg:px-12 py-16 w-full">
        {/* Header */}
        <AnimateOnScroll className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label text-xs font-bold uppercase tracking-wider mb-4 border border-primary-fixed-dim/40">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>The Unified Creator OS</span>
          </div>
          <h1 className="font-headline text-4xl sm:text-5xl font-bold text-on-surface tracking-tight leading-tight">
            12 Essential Creator Tools. <br />
            <span className="text-primary italic font-serif">One connected workspace.</span>
          </h1>
          <p className="mt-4 font-body text-base text-on-surface-variant leading-relaxed">
            Stop paying for separate scheduling apps, DM bots, AI writers, teleprompters, and CRMs. Crevix links every phase of your creator workflow into one continuous pipeline.
          </p>
        </AnimateOnScroll>

        {/* 12-Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {FEATURES.map((feature, i) => (
            <AnimateOnScroll
              key={i}
              delay={i * 50}
              className="p-7 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs hover-lift hover-glow transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-fixed/50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <span className="font-label text-[10px] uppercase tracking-wider font-bold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full border border-surface-container-high">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="font-headline font-bold text-lg text-on-surface group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-2.5 font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-surface-container-high flex items-center justify-between">
                <Link
                  href={feature.href}
                  className="font-label text-xs font-semibold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <AnimateOnScroll delay={200} className="p-10 rounded-3xl bg-surface-container-lowest border-2 border-primary shadow-xl text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="font-headline text-3xl font-bold text-on-surface">
              Ready to replace 5 tools with Crevix?
            </h3>
            <p className="font-body text-sm text-on-surface-variant">
              Get all 12 tools included in one simple subscription. 30 days free, then just ₹199/month.
            </p>
            <div className="pt-2 flex justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-on-primary font-label text-sm font-semibold hover:bg-primary-container transition-all shadow-md hover-lift"
              >
                <span>Start 30-Day Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </AnimateOnScroll>
      </main>

      <PublicFooter />
    </div>
  );
}
