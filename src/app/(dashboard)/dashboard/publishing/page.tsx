"use client";

import { useState } from "react";
import { 
  ListOrdered, 
  Play, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ChevronRight,
  ShieldCheck,
  RefreshCw
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  idempotencyKey: string;
  runAt: string;
  attempts: number;
  status: "pending" | "processing" | "completed" | "failed";
  platform: string;
}

const INITIAL_JOBS: Job[] = [
  {
    id: "job_01",
    title: "How to Build a $10k/mo Creator Business with Zero Ads",
    idempotencyKey: "pub_ws_001_post_991",
    runAt: "Today at 6:00 PM EST",
    attempts: 0,
    status: "pending",
    platform: "Instagram",
  },
  {
    id: "job_02",
    title: "7 Copywriting Frameworks That Convert DM Inquiries into Clients",
    idempotencyKey: "pub_ws_001_post_992",
    runAt: "Tomorrow at 10:30 AM EST",
    attempts: 0,
    status: "pending",
    platform: "Instagram",
  },
  {
    id: "job_03",
    title: "5 AI Tools I Use Daily for Production",
    idempotencyKey: "pub_ws_001_post_990",
    runAt: "Nov 1, 2026 at 2:15 PM EST",
    attempts: 1,
    status: "completed",
    platform: "Instagram",
  },
];

export default function PublishingQueuePage() {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [isRunning, setIsRunning] = useState(false);
  const [lastRunMessage, setLastRunMessage] = useState<string | null>(null);

  const handleDrainQueue = async () => {
    setIsRunning(true);
    setLastRunMessage(null);
    try {
      const res = await fetch("/api/publishing/run", { method: "POST" });
      const json = await res.json();
      if (json.success) {
        setLastRunMessage(`Queue worker finished: ${json.data.jobsProcessedCount} jobs evaluated and verified.`);
      }
    } catch (e: any) {
      setLastRunMessage("Worker execution failed: " + e.message);
    } finally {
      setIsRunning(false);
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
            <span className="text-primary-container font-bold">Publishing Queue</span>
          </div>
          <h1 className="font-headline text-3xl font-bold text-on-surface tracking-tight mt-1">
            Publishing Queue & Worker
          </h1>
          <p className="font-body text-sm text-on-surface-variant mt-1">
            Database-backed queue with idempotency locks (`SKIP LOCKED`) and Cloudflare Workers execution.
          </p>
        </div>

        {/* Worker Trigger */}
        <button
          onClick={handleDrainQueue}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-container text-on-primary font-label text-xs font-semibold hover:bg-primary transition-all shadow-sm disabled:opacity-50"
        >
          <Play className={`w-4 h-4 ${isRunning ? "animate-spin" : ""}`} />
          <span>{isRunning ? "Draining Worker Queue..." : "Run Publishing Worker"}</span>
        </button>
      </div>

      {lastRunMessage && (
        <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-900 font-label text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
          <span>{lastRunMessage}</span>
        </div>
      )}

      {/* Queue Security & Invariant Note */}
      <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-high flex items-center justify-between text-xs font-label text-on-surface-variant shadow-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>Idempotency Protected: Unique SHA deduplication prevents duplicate social publications.</span>
        </div>
        <span className="font-mono text-[11px] text-green-700 font-semibold">Queue Healthy • 0 retries pending</span>
      </div>

      {/* Jobs Table */}
      <div className="rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-surface-container-high bg-surface-container-low font-label text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
              <th className="p-4">Post Title</th>
              <th className="p-4">Platform</th>
              <th className="p-4">Idempotency Key</th>
              <th className="p-4">Scheduled Execution</th>
              <th className="p-4">Attempts</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-high font-body text-xs">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-surface-container-low/50 transition-colors">
                <td className="p-4 font-semibold text-on-surface">{job.title}</td>
                <td className="p-4 font-medium">{job.platform}</td>
                <td className="p-4 font-mono text-[11px] text-on-surface-variant">{job.idempotencyKey}</td>
                <td className="p-4 font-mono text-on-surface-variant">{job.runAt}</td>
                <td className="p-4 font-mono">{job.attempts} / 3</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 rounded font-label text-[10px] font-bold uppercase inline-flex items-center gap-1 ${
                      job.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : job.status === "pending"
                        ? "bg-primary-fixed text-on-primary-fixed"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
