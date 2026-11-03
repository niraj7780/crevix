"use client";

import { useState } from "react";
import { 
  Instagram, 
  Youtube, 
  Link2, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  ChevronRight, 
  ShieldCheck,
  RefreshCw
} from "lucide-react";

export default function ConnectedAccountsPage() {
  const [connecting, setConnecting] = useState(false);

  const handleConnectInstagram = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      alert("Redirecting to Meta Business Login OAuth flow for official permission granting.");
    }, 800);
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-surface-container-high pb-6">
        <div>
          <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-[11px] uppercase tracking-wider font-semibold">
            <span>Workspace</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-container font-bold">Connections</span>
          </div>
          <h1 className="font-headline text-3xl font-bold text-on-surface tracking-tight mt-1">
            Connected Social Accounts
          </h1>
          <p className="font-body text-sm text-on-surface-variant mt-1">
            Connect official platform APIs to enable automated publishing and comment-to-DM funnels.
          </p>
        </div>
      </div>

      {/* Security Architecture Note */}
      <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-high shadow-xs flex items-center justify-between text-xs font-label">
        <div className="flex items-center gap-2 text-on-surface">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>AES-256-GCM Encrypted: Tokens are cryptographically sealed at rest in Neon PostgreSQL.</span>
        </div>
        <span className="font-mono text-[11px] text-green-700 font-semibold">Zero password scraping</span>
      </div>

      {/* Account Connection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Instagram Card (Connected) */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border-2 border-primary-container/40 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-headline font-bold text-base text-on-surface">Instagram Professional</h2>
                <span className="font-mono text-xs text-primary font-semibold">@elenacreates</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded bg-green-100 text-green-800 font-label text-[10px] font-bold uppercase flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Connected
            </span>
          </div>

          <p className="font-body text-xs text-on-surface-variant leading-relaxed">
            Connected via Meta Graph API with permissions for direct message dispatch, comment webhooks, and media publishing.
          </p>

          <div className="pt-3 border-t border-surface-container-high flex items-center justify-between text-xs font-label">
            <span className="text-on-surface-variant">Token Expires:</span>
            <span className="font-mono text-green-700 font-bold">In 58 days (Auto-refreshed)</span>
          </div>
        </div>

        {/* YouTube Card (Connectable) */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <Youtube className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-headline font-bold text-base text-on-surface">YouTube Studio</h2>
                <span className="font-mono text-xs text-on-surface-variant">Not connected</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded bg-surface-container text-on-surface-variant font-label text-[10px] font-bold uppercase">
              Available
            </span>
          </div>

          <p className="font-body text-xs text-on-surface-variant leading-relaxed">
            Schedule Shorts, video releases, and sync community engagement directly through the official YouTube Data API.
          </p>

          <div className="pt-3 border-t border-surface-container-high flex justify-end">
            <button
              onClick={() => alert("YouTube OAuth connection flow")}
              className="px-3.5 py-1.5 rounded-lg bg-surface-container-low border border-surface-container-high font-label text-xs font-semibold hover:bg-surface-container transition-colors"
            >
              Connect YouTube Channel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
