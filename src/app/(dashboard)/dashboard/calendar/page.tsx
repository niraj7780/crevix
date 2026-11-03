"use client";

import { useState } from "react";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Film, 
  Layers, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  X,
  Sparkles,
  Instagram
} from "lucide-react";

interface ScheduledItem {
  id: string;
  day: number;
  time: string;
  title: string;
  type: "reel" | "carousel" | "image";
  account: string;
  status: "published" | "scheduled" | "draft" | "failed";
  keyword?: string;
}

const INITIAL_SCHEDULE: ScheduledItem[] = [
  {
    id: "1",
    day: 3,
    time: "6:00 PM",
    title: "How to Build a $10k/mo Creator Business",
    type: "reel",
    account: "@elenacreates",
    status: "scheduled",
    keyword: "FLOW",
  },
  {
    id: "2",
    day: 4,
    time: "10:30 AM",
    title: "7 Copywriting Frameworks That Convert DMs",
    type: "carousel",
    account: "@elenacreates",
    status: "scheduled",
    keyword: "PLAYBOOK",
  },
  {
    id: "3",
    day: 1,
    time: "2:15 PM",
    title: "5 AI Tools I Use Daily for Production",
    type: "reel",
    account: "@elenacreates",
    status: "published",
    keyword: "AI",
  },
  {
    id: "4",
    day: 7,
    time: "4:00 PM",
    title: "Instagram Algorithm Secrets 2026",
    type: "reel",
    account: "@elenacreates",
    status: "draft",
    keyword: "SECRETS",
  },
  {
    id: "5",
    day: 10,
    time: "11:00 AM",
    title: "How I Scale Creator Revenue with Crevix",
    type: "carousel",
    account: "@elenacreates",
    status: "scheduled",
    keyword: "GUIDE",
  },
];

export default function ContentCalendarPage() {
  const [viewMode, setViewMode] = useState<"month" | "week" | "day" | "list">("month");
  const [items, setItems] = useState<ScheduledItem[]>(INITIAL_SCHEDULE);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // New post modal form state
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<"reel" | "carousel" | "image">("reel");
  const [newDay, setNewDay] = useState(5);
  const [newTime, setNewTime] = useState("18:00");
  const [newKeyword, setNewKeyword] = useState("FLOW");

  const handleSyncMeta = async () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert("Synced latest publishing statuses with Meta Graph API.");
    }, 1200);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: ScheduledItem = {
      id: crypto.randomUUID(),
      day: Number(newDay),
      time: newTime,
      title: newTitle,
      type: newType,
      account: "@elenacreates",
      status: "scheduled",
      keyword: newKeyword.toUpperCase(),
    };

    setItems([...items, newItem]);
    setIsModalOpen(false);
    setNewTitle("");
  };

  // Calendar matrix calculation for November 2026 (Starts on Sunday Nov 1)
  const daysInMonth = 30;
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-surface-container-high pb-6">
        <div>
          <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-[11px] uppercase tracking-wider font-semibold">
            <span>Workspace</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-container font-bold">Content Engine</span>
          </div>
          <h1 className="font-headline text-3xl font-bold text-on-surface tracking-tight mt-1">
            Content Calendar
          </h1>
          <p className="font-body text-sm text-on-surface-variant mt-1">
            Plan, schedule, and automate your multi-channel publishing across Instagram and YouTube.
          </p>
        </div>

        {/* Top Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleSyncMeta}
            disabled={isSyncing}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-surface-container-high text-on-surface font-label text-xs font-semibold hover:bg-surface-container transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-primary-container ${isSyncing ? "animate-spin" : ""}`} />
            <span>Sync Meta API</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label text-xs font-semibold hover:bg-primary transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule New Post</span>
          </button>
        </div>
      </div>

      {/* Primary Controls Bar: View Modes + Month Nav */}
      <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4 bg-surface-container-lowest p-3 rounded-xl border border-surface-container-high shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          {/* Mode Tabs */}
          <div className="inline-flex p-1 bg-surface-container-low rounded-lg border border-surface-container-high">
            {(["month", "week", "day", "list"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3.5 py-1.5 rounded font-label text-xs transition-colors capitalize ${
                  viewMode === mode
                    ? "bg-surface-container-lowest text-on-surface font-bold shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface font-medium"
                }`}
              >
                {mode === "list" ? "Publishing List" : mode}
              </button>
            ))}
          </div>

          {/* Month Switcher */}
          <div className="flex items-center gap-2">
            <button className="p-1 rounded text-on-surface-variant hover:bg-surface-container-low transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-headline font-bold text-sm text-on-surface">
              November 2026
            </span>
            <button className="p-1 rounded text-on-surface-variant hover:bg-surface-container-low transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Timezone Indicator */}
        <div className="flex items-center gap-2 text-xs font-label text-on-surface-variant">
          <Clock className="w-3.5 h-3.5 text-primary" />
          <span>Publishing Timezone: <span className="font-semibold text-on-surface">America/New_York (EST)</span></span>
        </div>
      </div>

      {/* Calendar Grid (Month View) */}
      {viewMode === "month" && (
        <div className="rounded-2xl bg-surface-container-lowest border border-surface-container-high overflow-hidden shadow-xs">
          {/* Weekday Header */}
          <div className="grid grid-cols-7 border-b border-surface-container-high bg-surface-container-low text-center font-label text-[11px] font-bold text-on-surface-variant py-2.5 uppercase tracking-wider">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-surface-container-high">
            {calendarDays.map((day) => {
              const dayItems = items.filter((item) => item.day === day);
              const isToday = day === 3;

              return (
                <div
                  key={day}
                  onClick={() => {
                    setNewDay(day);
                    setIsModalOpen(true);
                  }}
                  className={`min-h-[120px] p-2 hover:bg-surface-container-low/60 transition-colors cursor-pointer flex flex-col justify-between ${
                    isToday ? "bg-primary-fixed/15" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-label text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                        isToday ? "bg-primary text-on-primary shadow-xs" : "text-on-surface-variant"
                      }`}
                    >
                      {day}
                    </span>
                    {dayItems.length > 0 && (
                      <span className="font-mono text-[10px] text-primary font-semibold">
                        {dayItems.length} post{dayItems.length > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>

                  {/* Scheduled Post Chips */}
                  <div className="space-y-1.5 mt-2 flex-1">
                    {dayItems.map((post) => (
                      <div
                        key={post.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Post: ${post.title}\nStatus: ${post.status}\nKeyword: ${post.keyword}`);
                        }}
                        className="p-1.5 rounded-lg bg-surface-container-lowest border border-surface-container-high shadow-xs hover:border-primary transition-all text-left"
                      >
                        <div className="flex items-center justify-between text-[10px] font-label">
                          <span className="flex items-center gap-1 font-bold text-on-surface truncate">
                            {post.type === "reel" ? <Film className="w-2.5 h-2.5 text-primary" /> : <Layers className="w-2.5 h-2.5 text-tertiary" />}
                            {post.time}
                          </span>
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              post.status === "published"
                                ? "bg-green-500"
                                : post.status === "scheduled"
                                ? "bg-primary"
                                : "bg-neutral-400"
                            }`}
                          ></span>
                        </div>
                        <div className="font-body text-[10px] text-on-surface truncate leading-tight mt-0.5 font-medium">
                          {post.title}
                        </div>
                        {post.keyword && (
                          <div className="font-mono text-[9px] text-primary mt-0.5">
                            Auto: &quot;{post.keyword}&quot;
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-container-high bg-surface-container-low font-label text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                <th className="p-4">Post Title</th>
                <th className="p-4">Format</th>
                <th className="p-4">Scheduled Date</th>
                <th className="p-4">Account</th>
                <th className="p-4">DM Keyword</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high font-body text-xs">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4 font-semibold text-on-surface">{item.title}</td>
                  <td className="p-4 uppercase font-label text-[10px] font-bold text-primary">{item.type}</td>
                  <td className="p-4 font-mono text-on-surface-variant">Nov {item.day}, 2026 at {item.time}</td>
                  <td className="p-4 font-medium">{item.account}</td>
                  <td className="p-4 font-mono font-bold text-primary">{item.keyword || "—"}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-label text-[10px] font-bold uppercase">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Schedule Post Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <h2 className="font-headline text-lg font-bold text-on-surface">
                Schedule Social Publication
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block font-label text-xs font-semibold text-on-surface mb-1">
                  Target Account
                </label>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-container-low border border-surface-container-high text-xs font-label">
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <span className="font-bold text-on-surface">@elenacreates (148k followers)</span>
                </div>
              </div>

              <div>
                <label className="block font-label text-xs font-semibold text-on-surface mb-1">
                  Post Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5 AI Tools I Use Daily"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-surface-container-low border border-surface-container-high text-xs font-body text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label text-xs font-semibold text-on-surface mb-1">
                    Format
                  </label>
                  <select
                    value={newType}
                    onChange={(e: any) => setNewType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-high text-xs font-body text-on-surface focus:outline-none"
                  >
                    <option value="reel">Instagram Reel (9:16)</option>
                    <option value="carousel">Instagram Carousel (4:5)</option>
                    <option value="image">Single Image Post</option>
                  </select>
                </div>

                <div>
                  <label className="block font-label text-xs font-semibold text-on-surface mb-1">
                    Scheduled Day (Nov 2026)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={newDay}
                    onChange={(e) => setNewDay(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-high text-xs font-body text-on-surface focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label text-xs font-semibold text-on-surface mb-1">
                    Publish Time (EST)
                  </label>
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-high text-xs font-body text-on-surface focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-label text-xs font-semibold text-on-surface mb-1">
                    DM Trigger Keyword
                  </label>
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value.toUpperCase())}
                    placeholder="e.g. FLOW"
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-high font-mono text-xs font-bold text-primary uppercase focus:outline-none"
                  />
                </div>
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
                  Confirm & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
