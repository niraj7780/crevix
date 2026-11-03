"use client";

import { useState } from "react";
import { 
  Inbox, 
  Search, 
  Send, 
  Instagram, 
  CheckCheck, 
  User, 
  ChevronRight, 
  Sparkles,
  Paperclip
} from "lucide-react";

interface Conversation {
  id: string;
  handle: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  stage: string;
  messages: { sender: "creator" | "contact"; text: string; time: string }[];
}

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    handle: "@sarahcreates",
    name: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80",
    lastMessage: "Thanks so much! Just downloaded the Notion template.",
    time: "10m ago",
    unread: true,
    stage: "Qualified",
    messages: [
      { sender: "contact", text: "AI", time: "12m ago" },
      { sender: "creator", text: "Hey Sarah! Thanks for your comment. Here is your Notion Creator Operating System guide: https://omniflow.io/r/guide 🚀", time: "11m ago" },
      { sender: "contact", text: "Thanks so much! Just downloaded the Notion template.", time: "10m ago" },
    ],
  },
  {
    id: "c2",
    handle: "@david_k_visuals",
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80",
    lastMessage: "Do you have an agency tier for multiple client accounts?",
    time: "45m ago",
    unread: false,
    stage: "Engaged",
    messages: [
      { sender: "contact", text: "FLOW", time: "1h ago" },
      { sender: "creator", text: "Hey David! Here is the blueprint guide: https://omniflow.io/r/flow", time: "55m ago" },
      { sender: "contact", text: "Do you have an agency tier for multiple client accounts?", time: "45m ago" },
    ],
  },
  {
    id: "c3",
    handle: "@jessica_t",
    name: "Jessica Taylor",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&h=80&q=80",
    lastMessage: "Awesome workflow, implemented it on my latest Reel!",
    time: "2h ago",
    unread: false,
    stage: "Customer",
    messages: [
      { sender: "contact", text: "CHECKLIST", time: "3h ago" },
      { sender: "creator", text: "Hey Jessica! Here is your checklist: https://omniflow.io/r/checklist", time: "3h ago" },
      { sender: "contact", text: "Awesome workflow, implemented it on my latest Reel!", time: "2h ago" },
    ],
  },
];

export default function UnifiedInboxPage() {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeId, setActiveId] = useState<string>("c1");
  const [replyText, setReplyText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const activeConv = conversations.find((c) => c.id === activeId) || conversations[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMessage = {
      sender: "creator" as const,
      text: replyText,
      time: "Just now",
    };

    setConversations(
      conversations.map((c) =>
        c.id === activeId
          ? { ...c, messages: [...c.messages, newMessage], lastMessage: replyText, unread: false }
          : c
      )
    );

    setReplyText("");
  };

  const handleQuickTemplate = (template: string) => {
    setReplyText(template);
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-surface-container-high pb-6">
        <div>
          <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-[11px] uppercase tracking-wider font-semibold">
            <span>Workspace</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-container font-bold">Conversations</span>
          </div>
          <h1 className="font-headline text-3xl font-bold text-on-surface tracking-tight mt-1">
            Unified Direct Message Inbox
          </h1>
          <p className="font-body text-sm text-on-surface-variant mt-1">
            Manage Instagram direct messages, track lead stages, and dispatch quick replies in real time.
          </p>
        </div>
      </div>

      {/* Split Inbox Layout: Threads List + Active Conversation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs overflow-hidden min-h-[600px]">
        {/* Left Column: Threads (4 cols) */}
        <div className="lg:col-span-4 border-r border-surface-container-high flex flex-col">
          {/* Search bar */}
          <div className="p-3 border-b border-surface-container-high">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low border border-surface-container-high">
              <Search className="w-3.5 h-3.5 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-xs font-body text-on-surface focus:outline-none"
              />
            </div>
          </div>

          {/* Threads list */}
          <div className="divide-y divide-surface-container-high overflow-y-auto flex-1">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setActiveId(conv.id)}
                className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                  activeId === conv.id ? "bg-surface-container-low" : "hover:bg-surface-container-low/50"
                }`}
              >
                <img
                  src={conv.avatar}
                  alt={conv.name}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-surface-container-high flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between text-xs font-label">
                    <span className="font-bold text-on-surface truncate">{conv.name}</span>
                    <span className="font-mono text-[10px] text-on-surface-variant">{conv.time}</span>
                  </div>
                  <div className="font-mono text-[10px] text-primary">{conv.handle}</div>
                  <p className="font-body text-xs text-on-surface-variant truncate mt-1">
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unread && (
                  <span className="w-2 h-2 rounded-full bg-primary-container mt-1.5 flex-shrink-0"></span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Chat History & Composer (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          {/* Chat Header */}
          <div className="p-4 border-b border-surface-container-high flex items-center justify-between bg-surface-container-lowest">
            <div className="flex items-center gap-3">
              <img
                src={activeConv.avatar}
                alt={activeConv.name}
                className="w-9 h-9 rounded-full object-cover ring-1 ring-surface-container-high"
              />
              <div>
                <div className="flex items-center gap-1.5 font-label text-xs font-bold text-on-surface">
                  <Instagram className="w-3.5 h-3.5 text-pink-600" />
                  <span>{activeConv.name} ({activeConv.handle})</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-[10px] text-on-surface-variant">
                  CRM Stage: {activeConv.stage}
                </span>
              </div>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="p-6 space-y-4 overflow-y-auto flex-1 bg-surface">
            {activeConv.messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.sender === "creator" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[75%] p-3.5 rounded-2xl text-xs font-body leading-relaxed ${
                    msg.sender === "creator"
                      ? "bg-primary text-on-primary rounded-br-xs shadow-xs"
                      : "bg-surface-container-lowest border border-surface-container-high text-on-surface rounded-bl-xs shadow-xs"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="font-mono text-[10px] text-on-surface-variant mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Saved Replies & Composer */}
          <div className="p-4 border-t border-surface-container-high bg-surface-container-lowest space-y-3">
            {/* Canned reply shortcuts */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-label text-[10px] font-bold text-on-surface-variant uppercase">Quick Replies:</span>
              {[
                "Here is the link to the guide! 🚀",
                "Yes! We offer a full Pro tier for agencies.",
                "Glad it helped! Let me know if you have questions.",
              ].map((canned, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickTemplate(canned)}
                  className="px-2.5 py-1 rounded bg-surface-container-low border border-surface-container-high text-[11px] font-body text-on-surface hover:bg-surface-container"
                >
                  {canned}
                </button>
              ))}
            </div>

            {/* Input Composer */}
            <form onSubmit={handleSendReply} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a manual direct message reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs font-body text-on-surface focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="flex items-center justify-center p-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-all shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
