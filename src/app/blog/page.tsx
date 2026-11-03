import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/layout/public-nav";
import { PublicFooter } from "@/components/layout/public-footer";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { BLOG_POSTS } from "@/lib/blog/posts";
import { Clock, ArrowRight, Sparkles, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Creator Growth Blog — Guides, Algorithms & Strategy | Crevix",
  description: "Read actionable playbooks on Instagram Comment-to-DM funnels, short-form video retention psychology, AI scripting frameworks, and creator SaaS economics.",
  alternates: {
    canonical: "https://crevix.io/blog",
  },
  openGraph: {
    title: "Crevix Creator Growth Blog",
    description: "Actionable engineering playbooks and growth breakdowns for digital creators.",
    url: "https://crevix.io/blog",
  },
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed relative overflow-hidden">
      <div className="orb orb-primary w-96 h-96 -top-20 -right-20 animate-pulse-soft" />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "https://crevix.io" },
          { name: "Blog", item: "https://crevix.io/blog" },
        ]}
      />

      <PublicNav />

      <main className="flex-1 max-w-5xl mx-auto px-6 lg:px-12 py-16 w-full">
        {/* Header */}
        <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label text-xs font-bold uppercase tracking-wider mb-4 border border-primary-fixed-dim/40">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <span>Engineering & Creator Playbooks</span>
          </div>
          <h1 className="font-headline text-4xl sm:text-5xl font-bold text-on-surface tracking-tight leading-tight">
            The Creator Growth <span className="text-primary italic font-serif">Journal.</span>
          </h1>
          <p className="mt-4 font-body text-base text-on-surface-variant leading-relaxed">
            Data-backed breakdowns on short-form algorithms, Meta API compliance, viral script architectures, and SaaS tool consolidation.
          </p>
        </AnimateOnScroll>

        {/* Blog Post List */}
        <div className="space-y-8 mb-20">
          {BLOG_POSTS.map((post, i) => (
            <AnimateOnScroll
              key={post.slug}
              delay={i * 80}
              className="p-8 rounded-3xl bg-surface-container-lowest border border-surface-container-high shadow-xs hover-glow hover-lift transition-all group"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3 text-xs font-label">
                <span className="px-3 py-1 rounded-full bg-primary-fixed/40 text-primary font-bold border border-primary-fixed-dim/40 uppercase tracking-wider text-[10px]">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-on-surface-variant">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readingTimeMinutes} min read</span>
                </span>
                <span className="text-on-surface-variant font-mono text-[11px]">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <Link href={`/blog/${post.slug}`}>
                <h2 className="font-headline font-bold text-2xl text-on-surface group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h2>
              </Link>

              <p className="mt-3 font-body text-sm text-on-surface-variant leading-relaxed">
                {post.description}
              </p>

              {/* Direct Answer snippet */}
              <div className="mt-4 p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs font-body text-on-surface-variant">
                <strong className="text-on-surface font-label uppercase text-[10px] tracking-wider block mb-1">
                  Key Takeaway
                </strong>
                {post.directAnswerSummary}
              </div>

              <div className="mt-6 pt-5 border-t border-surface-container-high flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Author */}
                  <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary font-headline font-bold text-xs flex items-center justify-center">
                    {post.author.name.charAt(0)}
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-on-surface block leading-none">{post.author.name}</span>
                    <span className="text-[11px] text-on-surface-variant">{post.author.role}</span>
                  </div>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="font-label text-xs font-bold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  <span>Read full guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
