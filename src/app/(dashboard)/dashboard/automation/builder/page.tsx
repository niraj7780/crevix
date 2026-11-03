"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  GitFork, 
  Play, 
  Save, 
  ArrowRight, 
  ChevronRight, 
  Plus, 
  Sparkles, 
  MessageSquare, 
  Users, 
  CheckCircle2,
  Trash2,
  HelpCircle
} from "lucide-react";

interface WorkflowNode {
  id: string;
  type: "trigger" | "condition" | "action";
  title: string;
  subtitle: string;
  icon: string;
  config: Record<string, string>;
}

const DEFAULT_NODES: WorkflowNode[] = [
  {
    id: "node_1",
    type: "trigger",
    title: "Instagram Comment Received",
    subtitle: "Listens for any comment on Reel or Carousel",
    icon: "comment",
    config: { platform: "Instagram", post: "All Posts" },
  },
  {
    id: "node_2",
    type: "condition",
    title: "Keyword Contains 'FLOW' or 'AI'",
    subtitle: "Filters comments matching viral campaign keyword",
    icon: "filter",
    config: { keywords: "FLOW, AI", match: "contains" },
  },
  {
    id: "node_3",
    type: "action",
    title: "Send Instant Private Direct Message",
    subtitle: "Delivers Notion Creator Guide directly to inbox",
    icon: "dm",
    config: { template: "Hey {{user.name}}! Here is your link: {{resource.url}}" },
  },
  {
    id: "node_4",
    type: "action",
    title: "Create Qualified Lead in Creator CRM",
    subtitle: "Tags contact as 'AI Funnel Lead' in Pipeline",
    icon: "crm",
    config: { stage: "Engaged", tag: "AI Lead" },
  },
];

export default function VisualWorkflowBuilderPage() {
  const [nodes, setNodes] = useState<WorkflowNode[]>(DEFAULT_NODES);
  const [workflowName, setWorkflowName] = useState("Viral Reel Lead Capture Funnel");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-surface-container-high pb-6">
        <div>
          <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-[11px] uppercase tracking-wider font-semibold">
            <span>Workspace</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-container font-bold">Workflow Builder</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <input
              type="text"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              className="font-headline text-2xl sm:text-3xl font-bold text-on-surface tracking-tight bg-transparent border-b border-transparent hover:border-surface-container-high focus:border-primary focus:outline-none"
            />
          </div>
          <p className="font-body text-sm text-on-surface-variant mt-1">
            Visual graph orchestrating triggers, condition branches, and multi-step creator automations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/automation"
            className="px-4 py-2 rounded-lg bg-surface-container-lowest border border-surface-container-high text-on-surface font-label text-xs font-semibold hover:bg-surface-container transition-colors"
          >
            Back to Automations
          </Link>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label text-xs font-semibold hover:bg-primary transition-all shadow-sm"
          >
            {savedSuccess ? <CheckCircle2 className="w-4 h-4 text-green-300" /> : <Save className="w-4 h-4" />}
            <span>{savedSuccess ? "Workflow Saved!" : "Save & Activate Workflow"}</span>
          </button>
        </div>
      </div>

      {/* Canvas Workspace */}
      <div className="p-8 rounded-2xl bg-surface-container-low border border-surface-container-high shadow-inner min-h-[550px] flex flex-col items-center justify-start space-y-4 relative">
        <div className="absolute top-4 left-4 font-mono text-[11px] text-on-surface-variant flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span>Engine Status: Graph Validated • Zero Broken Edges</span>
        </div>

        {/* Nodes Sequence */}
        <div className="w-full max-w-lg space-y-4 pt-4">
          {nodes.map((node, index) => (
            <div key={node.id} className="flex flex-col items-center">
              {/* Node Card */}
              <div className="w-full p-4 rounded-2xl bg-surface-container-lowest border-2 border-surface-container-high shadow-sm hover:border-primary-container transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2 py-0.5 rounded font-label text-[10px] font-bold uppercase ${
                      node.type === "trigger"
                        ? "bg-purple-100 text-purple-800"
                        : node.type === "condition"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {node.type}
                  </span>
                  <span className="font-mono text-[10px] text-on-surface-variant">Step 0{index + 1}</span>
                </div>

                <div className="font-headline font-bold text-sm text-on-surface">
                  {node.title}
                </div>
                <div className="font-body text-xs text-on-surface-variant mt-0.5">
                  {node.subtitle}
                </div>

                {/* Node Parameters */}
                <div className="mt-3 pt-3 border-t border-surface-container-high flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                  {Object.entries(node.config).map(([k, v]) => (
                    <span key={k}>
                      {k}: <strong className="text-on-surface">{v}</strong>
                    </span>
                  ))}
                </div>
              </div>

              {/* Connecting Connector */}
              {index < nodes.length - 1 && (
                <div className="flex flex-col items-center my-1 text-primary">
                  <div className="w-0.5 h-6 bg-surface-container-high"></div>
                  <ArrowRight className="w-3.5 h-3.5 rotate-90 text-on-surface-variant" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
