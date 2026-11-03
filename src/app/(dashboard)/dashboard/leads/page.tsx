"use client";

import { useState } from "react";
import { 
  Users, 
  Download, 
  Search, 
  Filter, 
  Tag, 
  ChevronRight, 
  CheckCircle2, 
  ExternalLink,
  DollarSign
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  handle: string;
  email: string;
  stage: "New" | "Engaged" | "Qualified" | "Customer";
  sourceRule: string;
  tags: string[];
  createdAt: string;
  ltv: number;
}

const INITIAL_LEADS: Lead[] = [
  {
    id: "l1",
    name: "Sarah Jenkins",
    handle: "@sarahcreates",
    email: "sarah@jenkinscreative.com",
    stage: "Qualified",
    sourceRule: 'Keyword "AI"',
    tags: ["Notion Guide", "High Intent"],
    createdAt: "Nov 3, 2026",
    ltv: 120,
  },
  {
    id: "l2",
    name: "David Kim",
    handle: "@david_k_visuals",
    email: "david@kimmusic.co",
    stage: "Engaged",
    sourceRule: 'Keyword "FLOW"',
    tags: ["Agency", "Creator OS"],
    createdAt: "Nov 2, 2026",
    ltv: 0,
  },
  {
    id: "l3",
    name: "Jessica Taylor",
    handle: "@jessica_t",
    email: "jess@tayloragency.io",
    stage: "Customer",
    sourceRule: 'Keyword "CHECKLIST"',
    tags: ["Pro Subscriber"],
    createdAt: "Nov 1, 2026",
    ltv: 290,
  },
  {
    id: "l4",
    name: "Marcus Rivera",
    handle: "@marcus_growth",
    email: "marcus@rivera.design",
    stage: "New",
    sourceRule: 'Keyword "AI"',
    tags: ["Reel Lead"],
    createdAt: "Oct 31, 2026",
    ltv: 0,
  },
];

export default function CreatorCrmPage() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [stageFilter, setStageFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLeads = leads.filter((lead) => {
    const matchesStage = stageFilter === "All" || lead.stage === stageFilter;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  const exportCsv = () => {
    const headers = "Name,Instagram Handle,Email,Stage,Source Rule,LTV USD,Created At\n";
    const rows = filteredLeads
      .map(
        (l) =>
          `"${l.name}","${l.handle}","${l.email}","${l.stage}","${l.sourceRule}",${l.ltv},"${l.createdAt}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `omniflow_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-surface-container-high pb-6">
        <div>
          <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-[11px] uppercase tracking-wider font-semibold">
            <span>Workspace</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-container font-bold">CRM</span>
          </div>
          <h1 className="font-headline text-3xl font-bold text-on-surface tracking-tight mt-1">
            Creator CRM & Leads
          </h1>
          <p className="font-body text-sm text-on-surface-variant mt-1">
            Every comment-to-DM conversion captured into a pipeline with lifetime value tracking.
          </p>
        </div>

        <button
          onClick={exportCsv}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-lowest border border-surface-container-high text-on-surface font-label text-xs font-semibold hover:bg-surface-container transition-colors shadow-xs"
        >
          <Download className="w-4 h-4 text-primary" />
          <span>Export Leads (CSV)</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-surface-container-lowest border border-surface-container-high shadow-xs">
          <div className="font-label text-xs text-on-surface-variant mb-1">Total Leads Captured</div>
          <div className="font-headline text-2xl font-bold text-on-surface">842 Contacts</div>
          <div className="font-label text-[11px] text-green-700 font-bold mt-1">+28.4% this month</div>
        </div>

        <div className="p-5 rounded-xl bg-surface-container-lowest border border-surface-container-high shadow-xs">
          <div className="font-label text-xs text-on-surface-variant mb-1">Comment-to-Lead Conversion</div>
          <div className="font-headline text-2xl font-bold text-primary">18.2%</div>
          <div className="font-label text-[11px] text-on-surface-variant mt-1">Above industry benchmark (4.5%)</div>
        </div>

        <div className="p-5 rounded-xl bg-surface-container-lowest border border-surface-container-high shadow-xs">
          <div className="font-label text-xs text-on-surface-variant mb-1">Pipeline Attributed Revenue</div>
          <div className="font-headline text-2xl font-bold text-on-surface">$4,120</div>
          <div className="font-label text-[11px] text-on-surface-variant mt-1">Generated via automated DMs</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-surface-container-lowest p-3 rounded-xl border border-surface-container-high shadow-xs">
        {/* Stage Filter */}
        <div className="inline-flex p-1 bg-surface-container-low rounded-lg border border-surface-container-high text-xs font-label">
          {["All", "New", "Engaged", "Qualified", "Customer"].map((stage) => (
            <button
              key={stage}
              onClick={() => setStageFilter(stage)}
              className={`px-3 py-1.5 rounded transition-colors ${
                stageFilter === stage
                  ? "bg-surface-container-lowest text-on-surface font-bold shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface font-medium"
              }`}
            >
              {stage}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low border border-surface-container-high w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-on-surface-variant" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none text-xs font-body text-on-surface focus:outline-none"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-surface-container-high bg-surface-container-low font-label text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
              <th className="p-4">Contact</th>
              <th className="p-4">Instagram Handle</th>
              <th className="p-4">Source Automation</th>
              <th className="p-4">Tags</th>
              <th className="p-4">Stage</th>
              <th className="p-4">Value</th>
              <th className="p-4">Captured</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-high font-body text-xs">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-surface-container-low/50 transition-colors">
                <td className="p-4">
                  <div className="font-semibold text-on-surface">{lead.name}</div>
                  <div className="font-mono text-[10px] text-on-surface-variant">{lead.email}</div>
                </td>
                <td className="p-4 font-mono font-bold text-primary">{lead.handle}</td>
                <td className="p-4 text-on-surface-variant font-medium">{lead.sourceRule}</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {lead.tags.map((t, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded bg-surface-container text-[10px] font-mono text-on-surface">
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 rounded font-label text-[10px] font-bold uppercase ${
                      lead.stage === "Customer"
                        ? "bg-green-100 text-green-800"
                        : lead.stage === "Qualified"
                        ? "bg-primary-fixed text-on-primary-fixed"
                        : "bg-surface-container text-on-surface"
                    }`}
                  >
                    {lead.stage}
                  </span>
                </td>
                <td className="p-4 font-mono font-semibold">${lead.ltv}</td>
                <td className="p-4 font-mono text-on-surface-variant">{lead.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
