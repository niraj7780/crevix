import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  Zap, 
  ShieldCheck 
} from "lucide-react";
import { PublicNav } from "@/components/layout/public-nav";
import { PublicFooter } from "@/components/layout/public-footer";
import { SoftwareAppJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed relative overflow-hidden">
      {/* Background Animated Motion Orbs */}
      <div className="orb orb-primary w-96 h-96 -top-20 -left-20 animate-pulse-soft" />
      <div className="orb orb-accent w-[500px] h-[500px] top-1/3 -right-32 animate-float" />
      <div className="orb orb-primary w-80 h-80 bottom-1/4 -left-24 animate-pulse-soft" />

      {/* Structured SEO Data */}
      <OrganizationJsonLd />
      <SoftwareAppJsonLd
        name="Crevix All Access"
        price="199"
        priceCurrency="INR"
        trialPeriodDays={30}
      />

      {/* Shared Public Navigation */}
      <PublicNav />

      {/* Hero Section */}
      <section className="relative px-6 lg:px-12 pt-20 pb-16 max-w-6xl mx-auto flex flex-col items-center text-center">
        <AnimateOnScroll className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label text-xs font-semibold mb-6 shadow-xs border border-primary-fixed-dim/40 hover-lift">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>The Next Generation Creator Operating System</span>
        </AnimateOnScroll>

        <AnimateOnScroll delay={100}>
          <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface max-w-4xl leading-[1.15]">
            Your entire creator workflow.{" "}
            <span className="text-primary italic font-serif">One flow.</span>
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll delay={200}>
          <p className="mt-6 font-body text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Eliminate the chaos of 6 fragmented tools. Research viral ideas, generate scripts, schedule multi-platform posts, and turn Reel comments into paying DM leads automatically.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300} className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/signup"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-on-primary font-label text-sm font-semibold hover:bg-primary-container transition-all shadow-md hover-lift"
          >
            <span>Start 30-Day Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#automation"
            className="px-6 py-3.5 rounded-xl bg-surface-container-lowest border border-surface-container-high text-on-surface font-label text-sm font-semibold hover:bg-surface-container transition-colors shadow-xs hover-glow"
          >
            See Comment-to-DM Live
          </a>
        </AnimateOnScroll>

        {/* Hero Visual Preview: 7-Stage Flow with Stagger Animation */}
        <AnimateOnScroll delay={400} className="mt-16 w-full p-4 sm:p-6 rounded-3xl bg-surface-container-lowest/80 backdrop-blur-md border border-surface-container-high shadow-xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-left">
            {[
              { step: "01", name: "Research", icon: Sparkles, desc: "AI viral hooks & niches" },
              { step: "02", name: "Create", icon: Layers, desc: "Reel & carousel studio" },
              { step: "03", name: "Schedule", icon: Calendar, desc: "Visual time-zone calendar" },
              { step: "04", name: "Publish", icon: Zap, desc: "Automated queue dispatch" },
              { step: "05", name: "Automate", icon: MessageSquare, desc: "Comment-to-DM engine" },
              { step: "06", name: "Capture", icon: Users, desc: "Creator CRM lead pipeline" },
              { step: "07", name: "Analyze", icon: TrendingUp, desc: "Conversion & reach data" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-surface-container-low/70 border border-surface-container-high hover:border-primary hover-lift transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] font-bold text-on-surface-variant group-hover:text-primary">
                    {item.step}
                  </span>
                  <item.icon className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
                </div>
                <div className="font-headline font-bold text-sm text-on-surface">{item.name}</div>
                <div className="font-body text-[11px] text-on-surface-variant mt-1 leading-snug">{item.desc}</div>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </section>

      {/* Feature Deep Dive: Instagram Comment-to-DM */}
      <section id="automation" className="py-20 px-6 lg:px-12 bg-surface-container-lowest/90 border-y border-surface-container-high relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label text-xs font-bold uppercase tracking-wider mb-4 border border-primary-fixed-dim/40">
              Core Growth Engine
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl font-bold text-on-surface tracking-tight leading-snug">
              Turn viral Reel comments into qualified leads in 5 seconds.
            </h2>
            <p className="mt-4 font-body text-sm sm:text-base text-on-surface-variant leading-relaxed">
              When a Reel blows up with 1,000 comments, manual copy-pasting gets your account flagged. Crevix connects directly with official Meta APIs to automatically deliver links and capture CRM contacts compliant with Instagram policies.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "100% Official Meta Graph API (Zero scraping, zero ban risk)",
                "Instant public comment response to boost the algorithm",
                "Personalized private DM delivery with your resource link",
                "Auto-tagging and contact export into Creator CRM",
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-body text-sm text-on-surface font-medium">{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/instagram-dm-automation"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-label text-xs font-semibold hover:bg-primary-container transition-all shadow-md hover-lift"
              >
                <span>Explore Comment-to-DM</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimateOnScroll>

          {/* Interactive Simulation Graphic */}
          <AnimateOnScroll delay={150}>
            <div className="p-6 rounded-3xl bg-surface-container-low border border-surface-container-high shadow-lg space-y-4 hover-glow transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-label text-xs font-bold text-on-surface">Live Automation Active</span>
                </div>
                <span className="font-mono text-[11px] text-on-surface-variant">Trigger: &quot;AI&quot;</span>
              </div>

              {/* Comment Event */}
              <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-surface-container-high">
                <div className="flex items-center justify-between text-xs font-label">
                  <span className="font-bold text-on-surface">@growth_sarah</span>
                  <span className="text-on-surface-variant text-[10px]">Just now on Reel #84</span>
                </div>
                <p className="mt-1 font-body text-xs text-on-surface-variant">
                  &ldquo;Love this workflow! Commenting <span className="font-bold text-primary">AI</span> for the template guide!&rdquo;
                </p>
              </div>

              {/* Downward Arrow */}
              <div className="flex justify-center text-primary">
                <ArrowRight className="w-4 h-4 rotate-90" />
              </div>

              {/* Automated DM Sent */}
              <div className="p-3.5 rounded-xl bg-primary-fixed/30 border border-primary-fixed-dim/60">
                <div className="flex items-center justify-between text-xs font-label mb-1">
                  <span className="font-bold text-primary">Crevix Automated DM</span>
                  <span className="text-[10px] text-primary font-mono">0.8s execution</span>
                </div>
                <p className="font-body text-xs text-on-surface leading-relaxed">
                  &ldquo;Hey Sarah! Thanks for your comment. Here is your Notion Creator Operating System template: <span className="underline font-mono text-primary">https://crevix.io/r/guide</span> 🚀&rdquo;
                </p>
              </div>

              {/* CRM Lead Created */}
              <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container-high flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-tertiary" />
                  <span className="font-label text-xs font-semibold text-on-surface">Lead Created in CRM</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-[10px] text-on-surface-variant">
                  Stage: Engaged
                </span>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 lg:px-12 max-w-4xl mx-auto w-full">
        <AnimateOnScroll className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed/40 border border-primary-fixed-dim/60 text-on-primary-fixed text-xs font-label font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>One Unified Plan. Zero Upsells.</span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-on-surface tracking-tight">
            Try Crevix All Access Free for 30 Days
          </h2>
          <p className="mt-3 font-body text-sm text-on-surface-variant max-w-xl mx-auto">
            Experience our entire creator suite with full capabilities. No tier restrictions, no separate tool add-ons.
          </p>
        </AnimateOnScroll>

        {/* Single Premium Pricing Card */}
        <AnimateOnScroll delay={150}>
          <div className="p-8 sm:p-10 rounded-3xl bg-surface-container-lowest border-2 border-primary shadow-2xl relative overflow-hidden hover-glow transition-all">
            <div className="absolute top-0 right-0 bg-primary text-on-primary font-label text-[11px] font-bold uppercase tracking-wider py-1.5 px-6 rounded-bl-2xl shadow-sm">
              30 Days Free
            </div>

            <div className="max-w-2xl">
              <div className="font-label text-xs font-bold text-primary uppercase tracking-wider">
                Complete Creator Operating System
              </div>
              <h3 className="mt-2 font-headline text-3xl font-bold text-on-surface">
                Crevix All Access
              </h3>

              {/* Price Presentation */}
              <div className="mt-4 flex flex-wrap items-baseline gap-2">
                <span className="font-headline text-5xl font-bold text-on-surface">₹0</span>
                <span className="font-body text-sm font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  First 30 days free
                </span>
                <span className="font-body text-sm text-on-surface-variant">
                  then <strong className="text-on-surface font-headline text-2xl">₹199</strong>/month
                </span>
              </div>

              <p className="mt-3 font-body text-xs text-on-surface-variant leading-relaxed">
                Full access to every Instagram automation, AI content generator, publishing queue, teleprompter, and CRM lead capture tool. Cancel online anytime before day 30 with zero charges.
              </p>

              {/* Included Features Grid */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-body text-on-surface">
                {[
                  "Instagram Comment-to-DM Automation",
                  "Unlimited Automation Rules",
                  "AI Viral Hook & Reel Script Generator",
                  "AI Topic Research & Trend Reports",
                  "Multi-Platform Content Scheduler",
                  "Visual Drag-and-Drop Calendar",
                  "Zero-Egress Media Storage Library",
                  "Creator CRM & CSV Lead Export",
                  "Real-Time Reach & Engagement Analytics",
                  "Unified Direct Message Inbox",
                  "Visual Workflow Node Builder",
                  "On-Screen Teleprompter Studio",
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-8 pt-6 border-t border-surface-container-high flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/signup"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-on-primary font-label text-sm font-semibold hover:bg-primary-container transition-all shadow-md hover-lift"
                >
                  <span>Start 30-Day Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex items-center gap-2 text-xs font-body text-on-surface-variant">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>No charges today. Cancel with 1-click before trial ends.</span>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Shared Public Footer */}
      <PublicFooter />
    </div>
  );
}
