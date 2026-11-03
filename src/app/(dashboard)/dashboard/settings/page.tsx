"use client";

import { useState } from "react";
import { 
  Settings as SettingsIcon, 
  Key, 
  Building2, 
  User, 
  Save, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Sparkles
} from "lucide-react";

export default function WorkspaceSettingsPage() {
  const [wsName, setWsName] = useState("Acme Studio");
  const [creatorName, setCreatorName] = useState("Elena Rostova");
  const [creatorEmail, setCreatorEmail] = useState("elena@crevix.io");
  const [aiProvider, setAiProvider] = useState("gemini");
  const [byokKey, setByokKey] = useState("AIzaSyD-sample-encrypted-key-928");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-surface-container-high pb-6">
        <div>
          <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-[11px] uppercase tracking-wider font-semibold">
            <span>Workspace</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-container font-bold">Configuration</span>
          </div>
          <h1 className="font-headline text-3xl font-bold text-on-surface tracking-tight mt-1">
            Workspace & BYOK Settings
          </h1>
          <p className="font-body text-sm text-on-surface-variant mt-1">
            Configure tenant parameters, creator details, and Bring-Your-Own-Key AI engines.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-on-primary font-label text-xs font-semibold hover:bg-primary-container transition-all shadow-sm"
        >
          {savedSuccess ? <CheckCircle2 className="w-4 h-4 text-green-300" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? "Saved!" : "Save Changes"}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Workspace Identity */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-headline font-bold text-base text-on-surface">
            <Building2 className="w-4 h-4 text-primary" />
            <span>Workspace Identity</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-label text-xs font-semibold text-on-surface mb-1.5">
                Workspace Name
              </label>
              <input
                type="text"
                value={wsName}
                onChange={(e) => setWsName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low border border-surface-container-high text-xs font-body text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block font-label text-xs font-semibold text-on-surface mb-1.5">
                Workspace Slug
              </label>
              <input
                type="text"
                defaultValue="acme-studio"
                readOnly
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low border border-surface-container-high text-xs font-mono text-on-surface-variant focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Creator Profile */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-headline font-bold text-base text-on-surface">
            <User className="w-4 h-4 text-primary" />
            <span>Creator Profile</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-label text-xs font-semibold text-on-surface mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low border border-surface-container-high text-xs font-body text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block font-label text-xs font-semibold text-on-surface mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={creatorEmail}
                onChange={(e) => setCreatorEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low border border-surface-container-high text-xs font-body text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Bring Your Own Key (BYOK) AI Provider */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-headline font-bold text-base text-on-surface">
              <Key className="w-4 h-4 text-primary" />
              <span>Bring Your Own Key (BYOK) AI Provider</span>
            </div>
            <span className="font-mono text-[10px] text-green-700 bg-green-50 px-2 py-0.5 rounded font-bold">
              Zero platform markup
            </span>
          </div>

          <p className="font-body text-xs text-on-surface-variant leading-relaxed">
            Provide your personal OpenAI, Google Gemini, or Anthropic API key to unlock unlimited, unthrottled AI scripting and topic research with zero platform markup.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-label text-xs font-semibold text-on-surface mb-1.5">
                AI Engine
              </label>
              <select
                value={aiProvider}
                onChange={(e) => setAiProvider(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-surface-container-low border border-surface-container-high text-xs font-body text-on-surface focus:outline-none"
              >
                <option value="gemini">Google Gemini 1.5 Flash</option>
                <option value="openai">OpenAI GPT-4o Mini</option>
                <option value="anthropic">Anthropic Claude 3.5 Sonnet</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-label text-xs font-semibold text-on-surface mb-1.5">
                API Key (AES-256 Encrypted)
              </label>
              <input
                type="password"
                value={byokKey}
                onChange={(e) => setByokKey(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low border border-surface-container-high text-xs font-mono text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
