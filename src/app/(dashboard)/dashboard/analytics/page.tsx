"use client";

import { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Bookmark, 
  Share2, 
  Calendar, 
  ChevronRight, 
  CheckCircle2,
  Film
} from "lucide-react";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");

  const postPerformances = [
    {
      title: "5 AI Tools I Use Daily to Automate My Creator Studio",
      type: "Reel",
      views: "64,200",
      reach: "58,100",
      engagement: "5.4%",
      dmsSent: 412,
      leads: 328,
    },
    {
      title: "How I Automate My Creator Studio (Behind the Scenes)",
      type: "Reel",
      views: "42,800",
      reach: "38,400",
      engagement: "4.8%",
      dmsSent: 286,
      leads: 219,
    },
    {
      title: "Instagram Growth Playbook 2026: The 7 Slide Framework",
      type: "Carousel",
      views: "28,100",
      reach: "26,900",
      engagement: "6.2%",
      dmsSent: 144,
      leads: 95,
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
            <span className="text-primary-container font-bold">Analytics</span>
          </div>
          <h1 className="font-headline text-3xl font-bold text-on-surface tracking-tight mt-1">
            Performance & Conversion Insights
          </h1>
          <p className="font-body text-sm text-on-surface-variant mt-1">
            Real-time reach, engagement rates, and comment-to-DM attribution.
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="inline-flex p-1 bg-surface-container-low rounded-lg border border-surface-container-high text-xs font-label">
          {(["7d", "30d", "90d"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3.5 py-1.5 rounded transition-colors uppercase ${
                timeRange === range
                  ? "bg-surface-container-lowest text-on-surface font-bold shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface font-medium"
              }`}
            >
              Last {range}
            </button>
          ))}
        </div>
      </div>

      {/* Live Data Integrity Status Banner */}
      <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-high shadow-xs flex items-center justify-between text-xs font-label">
        <div className="flex items-center gap-2 text-on-surface">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span>Meta Graph API Connected: Data synced every 6 hours via webhook snapshots.</span>
        </div>
        <span className="font-mono text-[11px] text-green-700 font-semibold">Account: @elenacreates (148.2k)</span>
      </div>

      {/* Key Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Reach", value: "148,200", change: "+14.2%", icon: Users },
          { title: "Video Views", value: "249,500", change: "+22.8%", icon: Eye },
          { title: "Engagement Rate", value: "4.82%", change: "+0.8%", icon: TrendingUp },
          { title: "Saves & Shares", value: "12,480", change: "+34.1%", icon: Bookmark },
        ].map((m, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs">
            <div className="flex items-center justify-between text-on-surface-variant mb-2">
              <span className="font-label text-xs">{m.title}</span>
              <m.icon className="w-4 h-4 text-primary" />
            </div>
            <div className="font-headline text-2xl font-bold text-on-surface">{m.value}</div>
            <div className="font-label text-[11px] text-green-700 font-bold mt-1">{m.change} vs prior period</div>
          </div>
        ))}
      </div>

      {/* Visual Reach & Lead Attribution Matrix */}
      <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline text-lg font-bold text-on-surface">
              Reach & DM Conversion Velocity
            </h2>
            <p className="font-body text-xs text-on-surface-variant mt-0.5">
              Daily distribution of Reel impressions and subsequent private message conversions.
            </p>
          </div>
          <span className="font-mono text-xs font-bold text-primary">30-Day Aggregate</span>
        </div>

        {/* Visual Bar Graph */}
        <div className="h-48 flex items-end gap-3 pt-6 px-2 border-b border-surface-container-high">
          {[42, 65, 88, 54, 72, 95, 80, 60, 85, 92, 100, 78, 86, 94].map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
              <div
                style={{ height: `${val}%` }}
                className="w-full rounded-t bg-primary-container group-hover:bg-primary transition-colors relative"
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-surface-container-high font-mono text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">
                  {val * 120}
                </div>
              </div>
              <span className="font-mono text-[9px] text-on-surface-variant">D{idx + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performing Posts & Lead Conversion Table */}
      <div className="rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs overflow-hidden">
        <div className="p-5 border-b border-surface-container-high">
          <h2 className="font-headline text-base font-bold text-on-surface">
            Top Performing Publications (By Lead Conversion)
          </h2>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-surface-container-high bg-surface-container-low font-label text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
              <th className="p-4">Post Title</th>
              <th className="p-4">Type</th>
              <th className="p-4">Views</th>
              <th className="p-4">Reach</th>
              <th className="p-4">Engagement</th>
              <th className="p-4">Automated DMs</th>
              <th className="p-4">Leads Captured</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-high font-body text-xs">
            {postPerformances.map((post, idx) => (
              <tr key={idx} className="hover:bg-surface-container-low/50 transition-colors">
                <td className="p-4 font-semibold text-on-surface max-w-xs truncate">{post.title}</td>
                <td className="p-4 font-label text-[10px] font-bold uppercase text-primary">{post.type}</td>
                <td className="p-4 font-mono">{post.views}</td>
                <td className="p-4 font-mono">{post.reach}</td>
                <td className="p-4 font-mono text-green-700 font-bold">{post.engagement}</td>
                <td className="p-4 font-mono font-bold">{post.dmsSent}</td>
                <td className="p-4 font-mono font-bold text-primary">{post.leads}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
