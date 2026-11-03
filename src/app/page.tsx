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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-surface-container-high px-6 lg:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary font-headline font-bold text-lg shadow-sm">
            C
          </div>
          <div className="flex flex-col">
            <span className="font-headline font-bold text-lg tracking-tight text-on-surface leading-none">
              Crevix
            </span>
            <span className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant font-semibold">
              Creator OS
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 font-label text-xs font-semibold text-on-surface-variant">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#pipeline" className="hover:text-primary transition-colors">The Pipeline</a>
          <a href="#automation" className="hover:text-primary transition-colors">Instagram DM Automation</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-xs font-label font-semibold text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-on-primary font-label text-xs font-semibold hover:bg-primary-container transition-all shadow-sm"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-12 pt-20 pb-16 max-w-6xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label text-xs font-semibold mb-6 shadow-xs border border-primary-fixed-dim/40">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>The Next Generation Creator Operating System</span>
        </div>

        <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface max-w-4xl leading-[1.15]">
          Your entire creator workflow.{" "}
          <span className="text-primary italic font-serif">One flow.</span>
        </h1>

        <p className="mt-6 font-body text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Eliminate the chaos of 6 fragmented tools. Research viral ideas, generate scripts, schedule multi-platform posts, and turn Reel comments into paying DM leads automatically.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-label text-sm font-semibold hover:bg-primary-container transition-all shadow-md hover:shadow-lg"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#automation"
            className="px-6 py-3 rounded-xl bg-surface-container-lowest border border-surface-container-high text-on-surface font-label text-sm font-semibold hover:bg-surface-container transition-colors shadow-xs"
          >
            See Comment-to-DM Live
          </a>
        </div>

        {/* Hero Visual Preview: 7-Stage Flow */}
        <div className="mt-16 w-full p-4 sm:p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-lg">
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
                className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high hover:border-primary-container transition-all group"
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
        </div>
      </section>

      {/* Feature Deep Dive: Instagram Comment-to-DM */}
      <section id="automation" className="py-20 px-6 lg:px-12 bg-surface-container-lowest border-y border-surface-container-high">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label text-xs font-bold uppercase tracking-wider mb-4">
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

            <div className="mt-8">
              <Link
                href="/dashboard/automation"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-on-primary font-label text-xs font-semibold hover:bg-primary-container transition-all"
              >
                <span>Test Automation Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Interactive Simulation Graphic */}
          <div className="p-6 rounded-2xl bg-surface-container-low border border-surface-container-high shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="font-label text-xs font-bold text-on-surface">Live Automation Active</span>
              </div>
              <span className="font-mono text-[11px] text-on-surface-variant">Trigger: &quot;AI&quot;</span>
            </div>

            {/* Comment Event */}
            <div className="p-3 rounded-lg bg-surface-container-lowest border border-surface-container-high">
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
            <div className="p-3.5 rounded-lg bg-primary-fixed/30 border border-primary-fixed-dim/60">
              <div className="flex items-center justify-between text-xs font-label mb-1">
                <span className="font-bold text-primary">Crevix Automated DM</span>
                <span className="text-[10px] text-primary font-mono">0.8s execution</span>
              </div>
              <p className="font-body text-xs text-on-surface leading-relaxed">
                &ldquo;Hey Sarah! Thanks for your comment. Here is your Notion Creator Operating System template: <span className="underline font-mono text-primary">https://crevix.io/r/guide</span> 🚀&rdquo;
              </p>
            </div>

            {/* CRM Lead Created */}
            <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container-high flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-tertiary" />
                <span className="font-label text-xs font-semibold text-on-surface">Lead Created in CRM</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-[10px] text-on-surface-variant">
                Stage: Engaged
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 lg:px-12 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-on-surface tracking-tight">
            Transparent plans for creators of all stages
          </h2>
          <p className="mt-3 font-body text-sm text-on-surface-variant">
            Start free, scale as your social audience and lead volume grows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Tier */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high flex flex-col justify-between shadow-xs">
            <div>
              <div className="font-label text-xs font-bold text-on-surface-variant uppercase tracking-wider">Free</div>
              <div className="mt-3 font-headline text-3xl font-bold text-on-surface">$0</div>
              <p className="mt-2 font-body text-xs text-on-surface-variant">For new creators testing automations.</p>
              <div className="mt-6 space-y-2.5 font-body text-xs text-on-surface">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> 1 Connected Account</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> 10 Scheduled Posts/mo</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> 1 Active DM Automation</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> 5 AI Research Reports/mo</div>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="mt-8 block text-center py-2.5 rounded-lg bg-surface-container-low border border-surface-container-high font-label text-xs font-semibold hover:bg-surface-container transition-colors"
            >
              Get Started Free
            </Link>
          </div>

          {/* Creator Tier */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border-2 border-primary flex flex-col justify-between shadow-md relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-on-primary font-label text-[10px] font-bold uppercase tracking-wider">
              Most Popular
            </span>
            <div>
              <div className="font-label text-xs font-bold text-primary uppercase tracking-wider">Creator</div>
              <div className="mt-3 font-headline text-3xl font-bold text-on-surface">$29<span className="text-sm font-normal text-on-surface-variant">/mo</span></div>
              <p className="mt-2 font-body text-xs text-on-surface-variant">For active creators scaling their pipeline.</p>
              <div className="mt-6 space-y-2.5 font-body text-xs text-on-surface">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> 2 Connected Accounts</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> 100 Scheduled Posts/mo</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> 5 Active DM Automations</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> 50 AI Research Reports/mo</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Creator CRM Lead Capture</div>
              </div>
            </div>
            <Link
              href="/dashboard/billing"
              className="mt-8 block text-center py-2.5 rounded-lg bg-primary text-on-primary font-label text-xs font-semibold hover:bg-primary-container transition-all shadow-sm"
            >
              Start 14-Day Trial
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high flex flex-col justify-between shadow-xs">
            <div>
              <div className="font-label text-xs font-bold text-on-surface-variant uppercase tracking-wider">Pro Agency</div>
              <div className="mt-3 font-headline text-3xl font-bold text-on-surface">$79<span className="text-sm font-normal text-on-surface-variant">/mo</span></div>
              <p className="mt-2 font-body text-xs text-on-surface-variant">For multi-account agencies and power teams.</p>
              <div className="mt-6 space-y-2.5 font-body text-xs text-on-surface">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> 5 Connected Accounts</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> 500 Scheduled Posts/mo</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> 25 Active DM Automations</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> 200 AI Research Reports/mo</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Visual Workflow Builder</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> 5 Workspace Team Seats</div>
              </div>
            </div>
            <Link
              href="/dashboard/billing"
              className="mt-8 block text-center py-2.5 rounded-lg bg-surface-container-low border border-surface-container-high font-label text-xs font-semibold hover:bg-surface-container transition-colors"
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-surface-container-high bg-surface-container-lowest px-6 lg:px-12 py-8 text-center sm:text-left">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary-container text-on-primary font-headline font-bold text-xs flex items-center justify-center">
              C
            </div>
            <span className="font-headline font-bold text-sm text-on-surface">Crevix</span>
            <span className="text-on-surface-variant text-xs ml-2">© 2026 Crevix Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 font-label text-xs text-on-surface-variant">
            <Link href="/privacy" className="hover:text-on-surface">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-on-surface">Terms of Service</Link>
            <Link href="/dashboard" className="text-primary font-semibold">Enter Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
