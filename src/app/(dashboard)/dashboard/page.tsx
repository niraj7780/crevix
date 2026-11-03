import Link from "next/link";
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  MessageSquare, 
  Plus, 
  Sparkles, 
  ArrowUpRight, 
  Instagram, 
  CheckCircle2, 
  Clock, 
  FileVideo, 
  ChevronRight,
  Zap
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-8">
      {/* Welcome & Context Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-surface-container-high pb-6">
        <div>
          <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-[11px] uppercase tracking-wider font-semibold">
            <span>Workspace</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-container font-bold">Acme Studio</span>
          </div>
          <h1 className="font-headline text-3xl font-bold text-on-surface tracking-tight mt-1">
            Welcome back, Elena.
          </h1>
          <p className="font-body text-sm text-on-surface-variant mt-1">
            Here is your creator performance summary and automation pipeline for today.
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/dashboard/research"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-surface-container-high text-on-surface font-label text-xs font-semibold hover:bg-surface-container transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary-container" />
            <span>AI Research Lab</span>
          </Link>
          <Link
            href="/dashboard/content/new"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label text-xs font-semibold hover:bg-primary transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Post</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Audience Reach",
            value: "148,200",
            change: "+14.2%",
            isPositive: true,
            icon: Users,
            desc: "across connected profiles",
          },
          {
            title: "Engagement Rate",
            value: "4.82%",
            change: "+0.8%",
            isPositive: true,
            icon: TrendingUp,
            desc: "average per Reel",
          },
          {
            title: "Posts Published",
            value: "28 / 100",
            change: "Current billing cycle",
            isPositive: null,
            icon: Calendar,
            desc: "72 slots remaining",
          },
          {
            title: "DM Leads Captured",
            value: "842",
            change: "+28.4%",
            isPositive: true,
            icon: MessageSquare,
            desc: "via comment triggers",
          },
        ].map((metric, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-surface-container-lowest border border-surface-container-high shadow-xs hover:border-outline-variant transition-colors"
          >
            <div className="flex items-center justify-between text-on-surface-variant mb-3">
              <span className="font-label text-xs font-medium">{metric.title}</span>
              <metric.icon className="w-4 h-4 text-primary-container" />
            </div>
            <div className="font-headline text-2xl font-bold text-on-surface">
              {metric.value}
            </div>
            <div className="mt-2 flex items-center gap-1.5 font-label text-[11px]">
              {metric.isPositive !== null && (
                <span className="inline-flex items-center text-green-700 font-bold bg-green-50 px-1.5 py-0.5 rounded">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  {metric.change}
                </span>
              )}
              <span className="text-on-surface-variant">{metric.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Connected Accounts & Recent Automation Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Connected Accounts & Active Automations (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Automations Card */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <h2 className="font-headline text-lg font-bold text-on-surface">
                  Active Instagram Automations
                </h2>
              </div>
              <Link
                href="/dashboard/automation"
                className="font-label text-xs text-primary font-semibold hover:underline"
              >
                View all rules →
              </Link>
            </div>

            <div className="space-y-3">
              {[
                {
                  rule: 'Reel Comment "AI" → Notion Guide DM',
                  status: "Active",
                  trigger: 'Keyword: "AI", "GUIDE"',
                  executions: "412 sent",
                  leads: "328 leads",
                  post: "Reel: 5 AI Tools I Use Daily",
                },
                {
                  rule: 'Reel Comment "FLOW" → Template Link DM',
                  status: "Active",
                  trigger: 'Keyword: "FLOW"',
                  executions: "286 sent",
                  leads: "219 leads",
                  post: "Reel: How I Automate My Creator Studio",
                },
                {
                  rule: 'Carousel Comment "CHECKLIST" → Resource DM',
                  status: "Active",
                  trigger: 'Keyword: "CHECKLIST"',
                  executions: "144 sent",
                  leads: "95 leads",
                  post: "Carousel: Instagram Growth Playbook 2026",
                },
              ].map((auto, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="font-label text-xs font-bold text-on-surface">
                        {auto.rule}
                      </span>
                    </div>
                    <p className="font-body text-[11px] text-on-surface-variant">
                      Target: {auto.post} • <span className="font-mono text-primary font-medium">{auto.trigger}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="font-mono text-xs font-bold text-on-surface">{auto.executions}</div>
                      <div className="font-label text-[10px] text-green-700 font-semibold">{auto.leads}</div>
                    </div>
                    <Link
                      href="/dashboard/automation"
                      className="px-2.5 py-1 rounded bg-surface-container-lowest border border-surface-container-high text-[11px] font-label font-semibold text-on-surface hover:bg-surface-container"
                    >
                      Test Rule
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Scheduled Posts */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <h2 className="font-headline text-lg font-bold text-on-surface">
                  Upcoming Scheduled Publications
                </h2>
              </div>
              <Link
                href="/dashboard/calendar"
                className="font-label text-xs text-primary font-semibold hover:underline"
              >
                Open Calendar →
              </Link>
            </div>

            <div className="space-y-3">
              {[
                {
                  type: "Instagram Reel",
                  title: "How to Build a $10k/mo Creator Business with Zero Ads",
                  scheduledTime: "Today at 6:00 PM EST",
                  account: "@elenacreates",
                  status: "Ready to Publish",
                },
                {
                  type: "Instagram Carousel",
                  title: "7 Copywriting Frameworks That Convert DM Inquiries into Clients",
                  scheduledTime: "Tomorrow at 10:30 AM EST",
                  account: "@elenacreates",
                  status: "Scheduled",
                },
                {
                  type: "Instagram Reel",
                  title: "Behind the Scenes of My Automated DM Funnel",
                  scheduledTime: "Nov 5, 2026 at 2:00 PM EST",
                  account: "@elenacreates",
                  status: "Scheduled",
                },
              ].map((post, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container flex-shrink-0">
                      <FileVideo className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-label text-xs font-bold text-on-surface truncate">
                        {post.title}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-on-surface-variant mt-0.5">
                        <span className="font-semibold text-primary">{post.type}</span>
                        <span>•</span>
                        <span>{post.account}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-mono text-[10px]">
                          <Clock className="w-3 h-3" />
                          {post.scheduledTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-primary-fixed text-on-primary-fixed font-label text-[10px] font-bold uppercase whitespace-nowrap">
                    {post.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Account Status & Recent Leads (1 col) */}
        <div className="space-y-6">
          {/* Connected Instagram Profile */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs">
            <h3 className="font-label text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">
              Connected Profile
            </h3>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-surface-container-high">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80"
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-container"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5 text-pink-600" />
                  <span className="font-label text-xs font-bold text-on-surface truncate">
                    @elenacreates
                  </span>
                </div>
                <div className="font-body text-[11px] text-on-surface-variant">
                  Elena Rostova • 148.2k Followers
                </div>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-green-700 font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Meta Graph API Connected</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-surface-container-high flex items-center justify-between text-xs font-label">
              <span className="text-on-surface-variant">Token Status</span>
              <span className="font-mono text-green-700 font-semibold">Valid (Expires in 58d)</span>
            </div>
          </div>

          {/* Newly Captured Leads (CRM Snippet) */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-label text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Recent CRM Leads
              </h3>
              <Link
                href="/dashboard/leads"
                className="font-label text-[11px] text-primary font-semibold hover:underline"
              >
                CRM →
              </Link>
            </div>

            <div className="space-y-2.5">
              {[
                { name: "Sarah Jenkins", handle: "@sarahcreates", source: 'Keyword "AI"', time: "12m ago" },
                { name: "David Kim", handle: "@david_k_visuals", source: 'Keyword "FLOW"', time: "34m ago" },
                { name: "Jessica Taylor", handle: "@jessica_t", source: 'Keyword "AI"', time: "1h ago" },
                { name: "Marcus Rivera", handle: "@marcus_marketing", source: 'Keyword "CHECKLIST"', time: "2h ago" },
              ].map((lead, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container-high flex items-center justify-between"
                >
                  <div className="min-w-0">
                    <div className="font-label text-xs font-bold text-on-surface truncate">
                      {lead.name}
                    </div>
                    <div className="font-mono text-[10px] text-on-surface-variant">
                      {lead.handle} • {lead.source}
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-outline-variant">{lead.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
