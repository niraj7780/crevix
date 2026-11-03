"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Zap, 
  Plus, 
  MessageSquare, 
  Play, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck,
  Send,
  Users,
  X
} from "lucide-react";

interface AutomationRule {
  id: string;
  name: string;
  keyword: string;
  targetPost: string;
  dmTemplate: string;
  publicReply: string;
  executions: number;
  leads: number;
  isActive: boolean;
}

const INITIAL_RULES: AutomationRule[] = [
  {
    id: "rule_1",
    name: 'Reel "AI" → Notion Guide DM',
    keyword: "AI",
    targetPost: "All Posts on @elenacreates",
    dmTemplate: "Hey {{user.name}}! Thanks for your comment. Here is your Notion Creator Operating System guide: {{resource.url}} 🚀",
    publicReply: "Check your DMs! 🚀 Just sent you the guide.",
    executions: 412,
    leads: 328,
    isActive: true,
  },
  {
    id: "rule_2",
    name: 'Reel "FLOW" → Template Link DM',
    keyword: "FLOW",
    targetPost: "Reel: How I Automate My Creator Studio",
    dmTemplate: "Hey {{user.name}}! Here is the exact template blueprint: {{resource.url}}",
    publicReply: "Sent to your inbox! 📥 Check your direct messages.",
    executions: 286,
    leads: 219,
    isActive: true,
  },
  {
    id: "rule_3",
    name: 'Carousel "PLAYBOOK" → Sales Funnel DM',
    keyword: "PLAYBOOK",
    targetPost: "Carousel: Instagram Growth Playbook",
    dmTemplate: "Hey {{user.name}}! You can access the 2026 Playbook here: {{resource.url}}",
    publicReply: "Playbook sent! Check your DMs 📌",
    executions: 144,
    leads: 95,
    isActive: true,
  },
];

export default function AutomationManagerPage() {
  const [rules, setRules] = useState<AutomationRule[]>(INITIAL_RULES);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New rule state
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("GROWTH");
  const [dmTemplate, setDmTemplate] = useState("Hey {{user.name}}! Thanks for your comment. Here is your link: {{resource.url}}");
  const [publicReply, setPublicReply] = useState("Check your DMs! 🚀 Just sent you the link.");

  // Simulator state
  const [simUsername, setSimUsername] = useState("creator_sarah");
  const [simComment, setSimComment] = useState("This is amazing! Commenting AI for the setup guide.");
  const [simKeyword, setSimKeyword] = useState("AI");
  const [simulating, setSimulating] = useState(false);
  const [simResult, setSimResult] = useState<any>(null);

  const handleToggleActive = (id: string) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)));
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newRule: AutomationRule = {
      id: crypto.randomUUID(),
      name,
      keyword: keyword.toUpperCase(),
      targetPost: "All Posts on @elenacreates",
      dmTemplate,
      publicReply,
      executions: 0,
      leads: 0,
      isActive: true,
    };

    setRules([newRule, ...rules]);
    setIsModalOpen(false);
    setName("");
  };

  const handleRunSimulator = async () => {
    setSimulating(true);
    setSimResult(null);

    try {
      const res = await fetch("/api/automation/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commentText: simComment,
          commenterUsername: simUsername,
          ruleKeyword: simKeyword,
          dmTemplate,
        }),
      });

      const json = await res.json();
      setSimResult(json);
    } finally {
      setSimulating(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-surface-container-high pb-6">
        <div>
          <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-[11px] uppercase tracking-wider font-semibold">
            <span>Workspace</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-container font-bold">Automations</span>
          </div>
          <h1 className="font-headline text-3xl font-bold text-on-surface tracking-tight mt-1">
            Instagram Comment-to-DM Engine
          </h1>
          <p className="font-body text-sm text-on-surface-variant mt-1">
            Convert viral engagement into qualified direct messages and captured leads with official Meta APIs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/automation/builder"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-surface-container-high text-on-surface font-label text-xs font-semibold hover:bg-surface-container transition-colors"
          >
            <span>Visual Workflow Builder</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label text-xs font-semibold hover:bg-primary transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create Automation Rule</span>
          </button>
        </div>
      </div>

      {/* Compliance & Security Banner */}
      <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-high shadow-xs flex items-center justify-between text-xs font-label">
        <div className="flex items-center gap-2 text-on-surface">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>Meta Instagram Graph API Compliant: 24-hour messaging window and private replies enforced.</span>
        </div>
        <span className="font-mono text-[11px] text-green-700 font-semibold">Webhooks Active • 100% Delivery</span>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs hover:border-outline-variant transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-primary bg-primary-fixed/40 px-2 py-0.5 rounded">
                  KEYWORD: &quot;{rule.keyword}&quot;
                </span>
                <button
                  onClick={() => handleToggleActive(rule.id)}
                  className={`px-2 py-0.5 rounded text-[10px] font-label font-bold uppercase transition-colors ${
                    rule.isActive ? "bg-green-100 text-green-800" : "bg-neutral-200 text-neutral-600"
                  }`}
                >
                  {rule.isActive ? "Active" : "Paused"}
                </button>
              </div>

              <h2 className="font-headline text-base font-bold text-on-surface">
                {rule.name}
              </h2>

              <p className="font-body text-[11px] text-on-surface-variant line-clamp-2">
                Target: {rule.targetPost}
              </p>

              <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-high font-body text-xs text-on-surface leading-relaxed">
                <span className="font-bold text-[10px] font-label text-on-surface-variant block mb-1">DM Message:</span>
                &ldquo;{rule.dmTemplate}&rdquo;
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-surface-container-high text-center">
                <div className="p-2 rounded-lg bg-surface-container-low">
                  <div className="font-mono text-sm font-bold text-on-surface">{rule.executions}</div>
                  <div className="font-label text-[10px] text-on-surface-variant">DMs Sent</div>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-low">
                  <div className="font-mono text-sm font-bold text-green-700">{rule.leads}</div>
                  <div className="font-label text-[10px] text-green-700 font-semibold">Leads Captured</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Live Simulator */}
      <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-primary font-headline font-bold text-lg">
            <Play className="w-5 h-5 fill-primary" />
            <span>Interactive Comment-to-DM Simulator</span>
          </div>
          <p className="font-body text-xs text-on-surface-variant mt-1">
            Test your keyword rules and watch the real-time public reply, private DM delivery, and CRM lead capture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-label text-xs font-semibold text-on-surface mb-1">
              Simulated Username
            </label>
            <input
              type="text"
              value={simUsername}
              onChange={(e) => setSimUsername(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-surface-container-low border border-surface-container-high text-xs font-body text-on-surface focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-label text-xs font-semibold text-on-surface mb-1">
              Trigger Keyword to Test
            </label>
            <input
              type="text"
              value={simKeyword}
              onChange={(e) => setSimKeyword(e.target.value.toUpperCase())}
              className="w-full px-3.5 py-2 rounded-lg bg-surface-container-low border border-surface-container-high font-mono text-xs font-bold text-primary uppercase focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-label text-xs font-semibold text-on-surface mb-1">
              Simulated Comment Text
            </label>
            <input
              type="text"
              value={simComment}
              onChange={(e) => setSimComment(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-surface-container-low border border-surface-container-high text-xs font-body text-on-surface focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleRunSimulator}
            disabled={simulating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-on-primary font-label text-xs font-semibold hover:bg-primary-container transition-all shadow-sm disabled:opacity-50"
          >
            <Zap className="w-4 h-4" />
            <span>{simulating ? "Simulating Webhook Event..." : "Run Test Simulation"}</span>
          </button>
        </div>

        {/* Simulation Output Card */}
        {simResult && (
          <div className="p-5 rounded-xl bg-surface-container-low border border-surface-container-high space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <span className="font-label text-xs font-bold text-on-surface flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Simulation Result: {simResult.matched ? "RULE MATCHED & EXECUTED" : "NO MATCH"}</span>
              </span>
              <span className="font-mono text-[10px] text-on-surface-variant">0.4s response latency</span>
            </div>

            {simResult.matched ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-body">
                <div className="p-3 rounded-lg bg-surface-container-lowest border border-surface-container-high">
                  <span className="font-label font-bold text-[11px] text-on-surface-variant block mb-1">
                    Public Comment Reply
                  </span>
                  <p className="text-on-surface italic">&ldquo;{simResult.data.publicReply}&rdquo;</p>
                </div>

                <div className="p-3 rounded-lg bg-primary-fixed/30 border border-primary-fixed-dim/50">
                  <span className="font-label font-bold text-[11px] text-primary block mb-1">
                    Private DM Delivered
                  </span>
                  <p className="text-on-surface font-medium">&ldquo;{simResult.data.sentDirectMessage}&rdquo;</p>
                </div>

                <div className="p-3 rounded-lg bg-surface-container-lowest border border-surface-container-high">
                  <span className="font-label font-bold text-[11px] text-on-surface-variant block mb-1">
                    CRM Lead Captured
                  </span>
                  <div className="font-bold text-on-surface">{simResult.data.leadCreated.handle}</div>
                  <div className="font-mono text-[10px] text-green-700">Stage: Engaged • Verified Contact</div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-on-surface-variant">{simResult.message}</p>
            )}
          </div>
        )}
      </div>

      {/* Create Rule Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <h2 className="font-headline text-lg font-bold text-on-surface">
                New Comment-to-DM Automation Rule
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-4">
              <div>
                <label className="block font-label text-xs font-semibold text-on-surface mb-1">
                  Rule Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Reel 'BLUEPRINT' → Notion Guide DM"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-surface-container-low border border-surface-container-high text-xs font-body text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-label text-xs font-semibold text-on-surface mb-1">
                  Trigger Keyword (Exact or Contains)
                </label>
                <input
                  type="text"
                  required
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2 rounded-lg bg-surface-container-low border border-surface-container-high font-mono text-xs font-bold text-primary uppercase focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-label text-xs font-semibold text-on-surface mb-1">
                  Direct Message Template
                </label>
                <textarea
                  rows={3}
                  required
                  value={dmTemplate}
                  onChange={(e) => setDmTemplate(e.target.value)}
                  className="w-full p-3 rounded-lg bg-surface-container-low border border-surface-container-high text-xs font-body text-on-surface focus:outline-none focus:border-primary"
                />
                <span className="font-mono text-[10px] text-on-surface-variant">
                  Variables: <code>{"{{user.name}}"}</code>, <code>{"{{resource.url}}"}</code>
                </span>
              </div>

              <div>
                <label className="block font-label text-xs font-semibold text-on-surface mb-1">
                  Public Comment Reply
                </label>
                <input
                  type="text"
                  value={publicReply}
                  onChange={(e) => setPublicReply(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-surface-container-low border border-surface-container-high text-xs font-body text-on-surface focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-surface-container-high flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-surface-container-low font-label text-xs font-semibold text-on-surface hover:bg-surface-container"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label text-xs font-semibold hover:bg-primary-container transition-all shadow-sm"
                >
                  Create Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
