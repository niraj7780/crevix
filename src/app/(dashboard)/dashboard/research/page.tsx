"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  Lightbulb, 
  TrendingUp, 
  Target, 
  ChevronRight,
  BookOpen
} from "lucide-react";
import { conductTopicResearch, TopicResearchResult } from "@/lib/ai";

export default function AiResearchPage() {
  const [topic, setTopic] = useState("Automating Instagram DM Funnels for Creators");
  const [niche, setNiche] = useState("Tech");
  const [targetAudience, setTargetAudience] = useState("Full-time content creators & social media managers");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TopicResearchResult | null>(null);
  const [copiedHook, setCopiedHook] = useState<number | null>(null);

  const handleResearch = async () => {
    setIsLoading(true);
    try {
      const data = await conductTopicResearch(topic, niche, targetAudience);
      setResult(data);
    } finally {
      setIsLoading(false);
    }
  };

  const copyHook = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedHook(index);
    setTimeout(() => setCopiedHook(null), 2000);
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-surface-container-high pb-6">
        <div>
          <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-[11px] uppercase tracking-wider font-semibold">
            <span>Workspace</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-container font-bold">Research</span>
          </div>
          <h1 className="font-headline text-3xl font-bold text-on-surface tracking-tight mt-1">
            AI Content Research Lab
          </h1>
          <p className="font-body text-sm text-on-surface-variant mt-1">
            Identify viral hooks, audience angles, and high-retention frameworks before scripting.
          </p>
        </div>
      </div>

      {/* Input Form Card */}
      <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Topic */}
          <div className="md:col-span-2">
            <label className="block font-label text-xs font-semibold text-on-surface mb-2">
              Topic or Keyword
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. 5 AI workflows to save 10 hours a week"
              className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-surface-container-high text-xs font-body text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          {/* Niche */}
          <div>
            <label className="block font-label text-xs font-semibold text-on-surface mb-2">
              Industry / Niche
            </label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low border border-surface-container-high text-xs font-body text-on-surface focus:outline-none focus:border-primary"
            >
              <option value="Tech">Tech & Software</option>
              <option value="Fitness">Fitness & Health</option>
              <option value="Finance">Personal Finance & Investing</option>
              <option value="Marketing">Growth Marketing</option>
              <option value="Lifestyle">Creator Lifestyle</option>
            </select>
          </div>

          {/* Target Audience */}
          <div className="md:col-span-3">
            <label className="block font-label text-xs font-semibold text-on-surface mb-2">
              Target Audience Persona
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Solo creators who want to automate lead generation"
              className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-surface-container-high text-xs font-body text-on-surface focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleResearch}
            disabled={isLoading || !topic.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-on-primary font-label text-xs font-semibold hover:bg-primary-container transition-all shadow-sm disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isLoading ? "Analyzing viral patterns..." : "Conduct Deep Research"}</span>
          </button>
        </div>
      </div>

      {/* Generated Report View */}
      {result && (
        <div className="space-y-6">
          {/* Summary Banner */}
          <div className="p-6 rounded-2xl bg-surface-container-low border border-surface-container-high shadow-xs">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <BookOpen className="w-4 h-4" />
              <h2 className="font-label text-xs font-bold uppercase tracking-wider">
                Audience Intelligence Report
              </h2>
            </div>
            <p className="font-body text-sm text-on-surface leading-relaxed">
              {result.summary}
            </p>
          </div>

          {/* Hooks & Angles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Viral Hooks */}
            <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-on-surface font-headline font-bold text-base">
                <Lightbulb className="w-4 h-4 text-tertiary" />
                <span>High-Retention Hooks (First 3 Seconds)</span>
              </div>
              <p className="font-body text-xs text-on-surface-variant">
                Scroll-stopping opening lines tested for 70%+ retention past second 3.
              </p>

              <div className="space-y-3">
                {result.viralHooks.map((hook, index) => (
                  <div
                    key={index}
                    className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high flex items-start justify-between gap-3 group"
                  >
                    <span className="font-body text-xs text-on-surface italic leading-relaxed">
                      &ldquo;{hook}&rdquo;
                    </span>
                    <button
                      onClick={() => copyHook(hook, index)}
                      className="p-1.5 rounded text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors flex-shrink-0"
                      title="Copy hook"
                    >
                      {copiedHook === index ? (
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Angles & Recommendation */}
            <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-on-surface font-headline font-bold text-base">
                  <Target className="w-4 h-4 text-primary" />
                  <span>Recommended Content Angles</span>
                </div>

                <div className="space-y-3">
                  {result.contentAngles.map((angle, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high font-body text-xs text-on-surface"
                    >
                      {angle}
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Route to Studio */}
              <div className="pt-4 border-t border-surface-container-high flex items-center justify-between">
                <span className="font-mono text-xs text-on-surface-variant">
                  Ready to draft script?
                </span>
                <Link
                  href={`/dashboard/content/new?topic=${encodeURIComponent(result.topic)}&niche=${encodeURIComponent(result.niche)}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label text-xs font-semibold hover:bg-primary transition-all shadow-sm"
                >
                  <span>Open in Content Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
