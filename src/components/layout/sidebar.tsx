"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Sparkles, 
  PenTool, 
  Image as ImageIcon, 
  Calendar as CalendarIcon, 
  MessageSquare, 
  GitFork, 
  ListOrdered, 
  Inbox, 
  Users, 
  BarChart3, 
  Link2, 
  CreditCard, 
  Settings, 
  ChevronRight,
  ChevronsUpDown,
  HelpCircle,
  MoreVertical
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Create",
    items: [
      { name: "AI Research", href: "/dashboard/research", icon: Sparkles },
      { name: "Content Studio", href: "/dashboard/content", icon: PenTool },
      { name: "Media Library", href: "/dashboard/media", icon: ImageIcon },
      { name: "Content Calendar", href: "/dashboard/calendar", icon: CalendarIcon },
    ],
  },
  {
    title: "Automate",
    items: [
      { name: "DM Automation", href: "/dashboard/automation", icon: MessageSquare },
      { name: "Workflow Builder", href: "/dashboard/automation/builder", icon: GitFork },
      { name: "Publishing Queue", href: "/dashboard/publishing", icon: ListOrdered },
    ],
  },
  {
    title: "Manage",
    items: [
      { name: "Unified Inbox", href: "/dashboard/inbox", icon: Inbox },
      { name: "Leads / CRM", href: "/dashboard/leads", icon: Users },
      { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Settings",
    items: [
      { name: "Connected Accounts", href: "/dashboard/accounts", icon: Link2 },
      { name: "Billing & Usage", href: "/dashboard/billing", icon: CreditCard },
      { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest border-r border-surface-container-high z-50 flex flex-col justify-between select-none">
      <div className="flex flex-col min-h-0 flex-1">
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-surface-container-high bg-surface-container-lowest">
          <Link href="/dashboard" className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-primary-container text-on-primary font-headline font-bold text-sm flex items-center justify-center shadow-xs">
              O
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-headline font-semibold text-base text-on-surface tracking-normal truncate leading-none">
                Omniflow
              </span>
              <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">
                Automate
              </span>
            </div>
          </Link>
        </div>

        {/* Workspace Switcher */}
        <div className="px-3 py-2.5">
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-high hover:bg-surface-container transition-colors cursor-pointer">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-primary-container flex-shrink-0"></span>
              <span className="font-label text-xs text-on-surface font-semibold truncate">
                Acme Studio
              </span>
              <span className="px-1.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label text-[10px] font-bold leading-none">
                PRO
              </span>
            </div>
            <ChevronsUpDown className="w-3.5 h-3.5 text-on-surface-variant flex-shrink-0" />
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="overflow-y-auto px-2 py-1 space-y-4 flex-1 scrollbar-none">
          {NAV_SECTIONS.map((section) => (
            <nav key={section.title} className="space-y-0.5">
              <div className="px-2.5 py-1 font-label text-[10px] text-on-surface-variant font-bold tracking-widest uppercase">
                {section.title}
              </div>
              {section.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-1.5 rounded-lg font-body text-xs transition-colors",
                      isActive
                        ? "bg-primary-container text-on-primary font-medium shadow-sm"
                        : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                    )}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          ))}
        </div>
      </div>

      {/* Sidebar Footer: Tier & Profile */}
      <div className="p-3 space-y-2 bg-surface-container-low border-t border-surface-container-high">
        {/* Tier status indicator */}
        <div className="flex items-center justify-between px-2.5 py-1.5 bg-surface-container-lowest rounded-lg border border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-container"></span>
            <span className="font-label text-xs text-on-surface font-semibold">Pro Active</span>
          </div>
          <span className="font-mono text-[11px] text-on-surface-variant">92% used</span>
        </div>

        {/* User profile row */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2 min-w-0">
            {/* Elena Rostova avatar from Stitch design */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-surface-container-high flex-shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-label text-xs text-on-surface font-medium truncate leading-tight">
                Elena Rostova
              </span>
              <span className="font-label text-[10px] text-on-surface-variant truncate leading-none">
                @elenacreates
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Help">
              <HelpCircle className="w-4 h-4" />
            </button>
            <button className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Menu">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
