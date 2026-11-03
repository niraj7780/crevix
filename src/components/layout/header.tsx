"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ChevronRight, 
  Search, 
  Bell, 
  Plus, 
  Instagram 
} from "lucide-react";

export function Header() {
  const pathname = usePathname();

  // Compute readable page title from route
  const getPageTitle = (path: string) => {
    const parts = path.split("/").filter(Boolean);
    if (parts.length <= 1) return "Executive Dashboard";
    const last = parts[parts.length - 1];
    return last
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface/90 backdrop-blur-md border-b border-surface-container-high z-40 flex items-center justify-between px-8">
      {/* Breadcrumb & Social Status */}
      <div className="flex items-center gap-4 min-w-0">
        <nav className="flex items-center gap-1.5 font-label text-xs">
          <Link href="/dashboard" className="text-on-surface-variant hover:text-on-surface transition-colors">
            Omniflow
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-outline-variant" />
          <span className="text-on-surface font-semibold truncate font-headline italic">
            {getPageTitle(pathname)}
          </span>
        </nav>

        {/* Connected Social Indicator from Stitch */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label text-xs border border-surface-container-high">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
          <span>IG Connected: @elenacreates (148k)</span>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3">
        {/* Quick Search */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer w-64">
          <Search className="w-3.5 h-3.5 text-on-surface-variant" />
          <span className="font-body text-xs flex-1 text-on-surface-variant">Quick Search...</span>
          <kbd className="px-1.5 py-0.5 bg-surface-container-lowest rounded font-mono text-[10px] text-outline border border-surface-container-high">
            ⌘K
          </kbd>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            className="flex items-center justify-center p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-container"></span>
        </div>

        {/* Primary New Post Action */}
        <Link
          href="/dashboard/content/new"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary-container text-on-primary font-label text-xs font-semibold hover:bg-primary transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Post</span>
        </Link>

        {/* Profile Avatar */}
        <div className="flex items-center pl-1">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover ring-1 ring-surface-container-high"
          />
        </div>
      </div>
    </header>
  );
}
