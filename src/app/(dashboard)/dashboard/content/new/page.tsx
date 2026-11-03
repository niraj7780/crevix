"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Film, 
  Layers, 
  Image as ImageIcon, 
  Send, 
  Calendar, 
  Save, 
  Instagram, 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share2, 
  ChevronRight,
  Check
} from "lucide-react";
import { generateContentScript, GeneratedContentResult } from "@/lib/ai";

export default function ContentStudioNewPage() {
  const [postType, setPostType] = useState<"reel" | "carousel" | "single_image">("reel");
  const [topic, setTopic] = useState("How to Automate 90% of Your Creator Funnel");
  const [niche, setNiche] = useState("Tech");
  const [tone, setTone] = useState<"authoritative" | "casual" | "storyteller" | "high_energy">("authoritative");
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Script & Caption State
  const [title, setTitle] = useState("Viral Reel: 5 AI Automation Tools");
  const [hook, setHook] = useState("Most creators spend 4 hours making content. I automated 90% of it with this single setup.");
  const [bodyScript, setBodyScript] = useState(
    `[0:00 - 0:03 HOOK]: "Most creators spend 4 hours making content. I automated 90% of it with this single setup."\n\n[0:03 - 0:15 PROBLEM]: "Here is why: when you post without an automated lead funnel, 98% of people who like your video never visit your profile or buy your product."\n\n[0:15 - 0:40 THE SOLUTION]: "Instead, build a simple comment-to-DM workflow. When someone comments a single keyword, your system instantly sends them the resource link in their DMs while they are still watching."\n\n[0:40 - 1:00 CTA]: "Comment 'FLOW' below and I'll send you the entire workflow setup right now."`
  );
  const [caption, setCaption] = useState(
    `Stop leaving 80% of your creator revenue on the table 📌\n\nWhen someone watches your Reel, you have a 30-second window to capture them as a qualified lead.\n\n👇 Comment "FLOW" below and I'll immediately send you the complete Notion Guide + Automation Blueprint in your DMs!\n\n#creatorbusiness #automation #reeltips #crevix`
  );
  const [ctaKeyword, setCtaKeyword] = useState("FLOW");

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const generated = await generateContentScript({
        topic,
        niche,
        postType,
        tone,
        targetAudience: "Creators & entrepreneurs",
      });

      setTitle(generated.title);
      setHook(generated.hook);
      setBodyScript(generated.bodyScript);
      setCaption(generated.caption);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveDraft = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

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
            New Content Draft
          </h1>
          <p className="font-body text-sm text-on-surface-variant mt-1">
            Script high-retention Reels, craft carousels, and configure comment keyword triggers.
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-lowest border border-surface-container-high text-on-surface font-label text-xs font-semibold hover:bg-surface-container transition-colors"
          >
            {savedSuccess ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Save className="w-3.5 h-3.5" />}
            <span>{savedSuccess ? "Draft Saved!" : "Save as Draft"}</span>
          </button>
          <Link
            href="/dashboard/calendar"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label text-xs font-semibold hover:bg-primary transition-all shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule Publication</span>
          </Link>
        </div>
      </div>

      {/* Main Studio Editor: Left Editor, Right Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Script & Post Generator (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Format Selector Pills */}
          <div className="inline-flex p-1 bg-surface-container-low rounded-xl border border-surface-container-high text-xs font-label">
            <button
              onClick={() => setPostType("reel")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                postType === "reel" ? "bg-surface-container-lowest text-on-surface shadow-xs" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Film className="w-3.5 h-3.5 text-primary" />
              <span>Instagram Reel (9:16)</span>
            </button>
            <button
              onClick={() => setPostType("carousel")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                postType === "carousel" ? "bg-surface-container-lowest text-on-surface shadow-xs" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-tertiary" />
              <span>Carousel (4:5)</span>
            </button>
            <button
              onClick={() => setPostType("single_image")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                postType === "single_image" ? "bg-surface-container-lowest text-on-surface shadow-xs" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-on-surface-variant" />
              <span>Single Image</span>
            </button>
          </div>

          {/* AI Generator Control Bar */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block font-label text-[11px] font-semibold text-on-surface mb-1">
                  Topic Prompt
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-surface-container-high text-xs font-body text-on-surface focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-label text-[11px] font-semibold text-on-surface mb-1">
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e: any) => setTone(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-surface-container-high text-xs font-body text-on-surface focus:outline-none"
                >
                  <option value="authoritative">Authoritative</option>
                  <option value="casual">Casual & Conversational</option>
                  <option value="storyteller">Storyteller</option>
                  <option value="high_energy">High Energy</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-on-primary font-label text-xs font-semibold hover:bg-primary-container transition-all shadow-xs disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isGenerating ? "Drafting with AI..." : "Regenerate Script & Caption"}</span>
              </button>
            </div>
          </div>

          {/* Title & Hook */}
          <div className="space-y-4">
            <div>
              <label className="block font-label text-xs font-semibold text-on-surface mb-1.5">
                Post Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-surface-container-high text-xs font-body text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block font-label text-xs font-semibold text-on-surface mb-1.5">
                First 3-Second Hook
              </label>
              <input
                type="text"
                value={hook}
                onChange={(e) => setHook(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-surface-container-high text-xs font-body text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Full Reel Script / Slides */}
          <div>
            <label className="block font-label text-xs font-semibold text-on-surface mb-1.5">
              Video Teleprompter / Script
            </label>
            <textarea
              rows={6}
              value={bodyScript}
              onChange={(e) => setBodyScript(e.target.value)}
              className="w-full p-3.5 rounded-lg bg-surface-container-lowest border border-surface-container-high font-mono text-xs text-on-surface focus:outline-none focus:border-primary leading-relaxed"
            />
          </div>

          {/* Caption & Keyword CTA */}
          <div className="space-y-4">
            <div>
              <label className="block font-label text-xs font-semibold text-on-surface mb-1.5">
                Instagram Caption
              </label>
              <textarea
                rows={5}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full p-3.5 rounded-lg bg-surface-container-lowest border border-surface-container-high font-body text-xs text-on-surface focus:outline-none focus:border-primary leading-relaxed"
              />
            </div>

            <div className="p-4 rounded-xl bg-primary-fixed/20 border border-primary-fixed-dim/40 space-y-2">
              <label className="block font-label text-xs font-bold text-on-primary-fixed">
                Comment-to-DM Trigger Keyword
              </label>
              <p className="font-body text-[11px] text-on-surface-variant">
                When a viewer comments this keyword on your Reel, Crevix automatically DMs them your resource link.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={ctaKeyword}
                  onChange={(e) => setCtaKeyword(e.target.value.toUpperCase())}
                  className="w-48 px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-surface-container-high font-mono text-xs font-bold text-primary uppercase focus:outline-none"
                />
                <span className="font-label text-xs text-on-surface-variant">
                  Linked to: <span className="font-semibold text-on-surface">Notion Creator OS Guide</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Instagram Mobile Preview Mockup (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-[360px] rounded-3xl bg-surface-container-lowest border-4 border-surface-container-high shadow-xl overflow-hidden">
            {/* Phone Mockup Top Bar */}
            <div className="px-5 py-3 border-b border-surface-container-high flex items-center justify-between text-xs font-label">
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-600" />
                <span className="font-bold text-on-surface">elenacreates</span>
              </div>
              <span className="font-mono text-[10px] text-on-surface-variant">Instagram Preview</span>
            </div>

            {/* Media Canvas Mockup */}
            <div className="relative aspect-[9/16] bg-neutral-900 overflow-hidden flex flex-col justify-between p-4 text-white">
              <img
                src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
                alt="Reel background"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />

              {/* Top Reel tag */}
              <div className="relative z-10 flex justify-between items-center text-xs">
                <span className="px-2 py-0.5 rounded bg-black/50 backdrop-blur-md font-mono text-[10px]">Reels</span>
              </div>

              {/* Floating Hook Overlay */}
              <div className="relative z-10 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/20 text-center">
                <span className="font-headline font-bold text-xs leading-snug drop-shadow">
                  &ldquo;{hook}&rdquo;
                </span>
              </div>

              {/* Bottom Creator Info & Caption Snippet */}
              <div className="relative z-10 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary-container ring-1 ring-white overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80"
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-label font-bold text-xs drop-shadow">@elenacreates</span>
                  <button className="px-2 py-0.5 rounded-full border border-white/80 font-label text-[10px] font-semibold">
                    Follow
                  </button>
                </div>

                <p className="font-body text-xs line-clamp-2 text-white/90 leading-tight drop-shadow">
                  {caption}
                </p>

                {/* Comment CTA Highlight */}
                <div className="px-2.5 py-1 rounded bg-primary text-on-primary font-mono text-[10px] font-bold text-center shadow-md">
                  Comment &quot;{ctaKeyword}&quot; for instant DM delivery ⚡
                </div>
              </div>
            </div>

            {/* Social Engagement Actions Mockup */}
            <div className="p-3 border-t border-surface-container-high flex items-center justify-between text-on-surface">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                <MessageCircle className="w-5 h-5" />
                <Share2 className="w-5 h-5" />
              </div>
              <Bookmark className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
