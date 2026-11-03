import Link from "next/link";
import { 
  Plus, 
  Film, 
  Layers, 
  Calendar, 
  Clock, 
  ChevronRight,
  FileText
} from "lucide-react";

export default function ContentStudioListPage() {
  const drafts = [
    {
      id: "1",
      title: "Viral Reel: 5 AI Automation Tools",
      type: "reel",
      updatedAt: "10 mins ago",
      hook: "Most creators spend 4 hours making content. I automated 90% of it.",
      keyword: "FLOW",
      status: "draft",
    },
    {
      id: "2",
      title: "Carousel: Instagram Growth Playbook 2026",
      type: "carousel",
      updatedAt: "Yesterday",
      hook: "The 7 slide framework that converts casual viewers into paying clients.",
      keyword: "PLAYBOOK",
      status: "ready_to_schedule",
    },
    {
      id: "3",
      title: "Behind the Scenes of My DM Automation Engine",
      type: "reel",
      updatedAt: "2 days ago",
      hook: "Stop copying and pasting links in your DMs. Meta will flag your account.",
      keyword: "SYSTEM",
      status: "draft",
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-surface-container-high pb-6">
        <div>
          <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-[11px] uppercase tracking-wider font-semibold">
            <span>Workspace</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-container font-bold">Content Studio</span>
          </div>
          <h1 className="font-headline text-3xl font-bold text-on-surface tracking-tight mt-1">
            Content Drafts & Scripts
          </h1>
          <p className="font-body text-sm text-on-surface-variant mt-1">
            Manage your teleprompter scripts, carousels, and unpublished drafts.
          </p>
        </div>

        <Link
          href="/dashboard/content/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary font-label text-xs font-semibold hover:bg-primary-container transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Script / Draft</span>
        </Link>
      </div>

      {/* Drafts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drafts.map((draft) => (
          <div
            key={draft.id}
            className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs hover:border-outline-variant transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-surface-container-low font-label text-[10px] font-bold uppercase text-on-surface flex items-center gap-1">
                  {draft.type === "reel" ? <Film className="w-3 h-3 text-primary" /> : <Layers className="w-3 h-3 text-tertiary" />}
                  {draft.type}
                </span>
                <span className="font-mono text-[10px] text-on-surface-variant">{draft.updatedAt}</span>
              </div>

              <h2 className="font-headline text-base font-bold text-on-surface leading-snug">
                {draft.title}
              </h2>

              <p className="font-body text-xs text-on-surface-variant italic line-clamp-2">
                &ldquo;{draft.hook}&rdquo;
              </p>

              <div className="flex items-center gap-2 pt-2 border-t border-surface-container-high text-xs font-label">
                <span className="text-on-surface-variant">Trigger:</span>
                <span className="font-mono font-bold text-primary bg-primary-fixed/30 px-1.5 py-0.5 rounded">
                  {draft.keyword}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-surface-container-high">
              <Link
                href="/dashboard/content/new"
                className="font-label text-xs font-semibold text-primary hover:underline"
              >
                Edit Script
              </Link>
              <Link
                href="/dashboard/calendar"
                className="flex items-center gap-1 font-label text-xs font-semibold text-on-surface hover:text-primary transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
