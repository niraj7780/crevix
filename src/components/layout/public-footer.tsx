import Link from "next/link";
import { Sparkles, ShieldCheck, ArrowRight } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="mt-auto border-t border-surface-container-high bg-surface-container-lowest/80 backdrop-blur-md px-6 lg:px-12 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
        {/* Brand Column */}
        <div className="col-span-2 space-y-4">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary font-headline font-bold text-base flex items-center justify-center shadow-sm">
              C
            </div>
            <span className="font-headline font-bold text-xl text-on-surface">Crevix</span>
          </Link>
          <p className="font-body text-xs text-on-surface-variant max-w-sm leading-relaxed">
            The next-generation AI Creator Operating System. Turn Reel comments into paying leads, generate retention-focused video scripts, schedule across platforms, and manage creator relationships in one unified workspace.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container text-xs font-label text-on-surface-variant border border-surface-container-high">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Meta Official Graph API Compliant</span>
          </div>
          <div className="text-[11px] font-mono text-on-surface-variant">
            Crevix All Access: 30 days free, then ₹199/month.
          </div>
        </div>

        {/* Solutions Column */}
        <div className="space-y-3">
          <h4 className="font-label text-xs font-bold text-on-surface uppercase tracking-wider">Solutions</h4>
          <ul className="space-y-2 text-xs font-body text-on-surface-variant">
            <li><Link href="/instagram-dm-automation" className="hover:text-primary transition-colors">Instagram DM Automation</Link></li>
            <li><Link href="/ai-content-creation" className="hover:text-primary transition-colors">AI Content Studio</Link></li>
            <li><Link href="/social-media-scheduler" className="hover:text-primary transition-colors">Multi-Platform Scheduler</Link></li>
            <li><Link href="/creator-automation" className="hover:text-primary transition-colors">Creator CRM & Workflows</Link></li>
          </ul>
        </div>

        {/* Platform Column */}
        <div className="space-y-3">
          <h4 className="font-label text-xs font-bold text-on-surface uppercase tracking-wider">Platform</h4>
          <ul className="space-y-2 text-xs font-body text-on-surface-variant">
            <li><Link href="/features" className="hover:text-primary transition-colors">All Features</Link></li>
            <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing (₹199/mo)</Link></li>
            <li><Link href="/comparisons" className="hover:text-primary transition-colors">Comparisons</Link></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors">Creator Growth Blog</Link></li>
          </ul>
        </div>

        {/* Access Column */}
        <div className="space-y-3">
          <h4 className="font-label text-xs font-bold text-on-surface uppercase tracking-wider">Access</h4>
          <ul className="space-y-2 text-xs font-body text-on-surface-variant">
            <li><Link href="/login" className="hover:text-primary transition-colors">Sign In</Link></li>
            <li><Link href="/signup" className="hover:text-primary transition-colors">Start 30-Day Free Trial</Link></li>
            <li><Link href="/dashboard" className="text-primary font-semibold hover:underline">Dashboard</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-on-surface-variant">
        <div>© 2026 Crevix Inc. All rights reserved. Zero-egress Cloudflare R2 & Neon PostgreSQL architecture.</div>
        <div className="flex items-center gap-6">
          <Link href="/pricing" className="hover:text-on-surface">30-Day Free Trial</Link>
          <Link href="/features" className="hover:text-on-surface">Features</Link>
          <Link href="/blog" className="hover:text-on-surface">Blog</Link>
        </div>
      </div>
    </footer>
  );
}
