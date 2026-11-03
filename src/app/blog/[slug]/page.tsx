import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PublicNav } from "@/components/layout/public-nav";
import { PublicFooter } from "@/components/layout/public-footer";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { BLOG_POSTS, type BlogPost } from "@/lib/blog/posts";
import { Clock, ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found | Crevix" };

  return {
    title: `${post.title} | Crevix`,
    description: post.description,
    alternates: {
      canonical: `https://crevix.io/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt,
      authors: [post.author.name],
      url: `https://crevix.io/blog/${post.slug}`,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-surface flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed relative overflow-hidden">
      <div className="orb orb-primary w-96 h-96 -top-20 -left-20 animate-pulse-soft" />

      <ArticleJsonLd
        headline={post.title}
        description={post.description}
        datePublished={post.publishedAt}
        dateModified={post.modifiedAt}
        authorName={post.author.name}
        url={`https://crevix.io/blog/${post.slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "https://crevix.io" },
          { name: "Blog", item: "https://crevix.io/blog" },
          { name: post.title, item: `https://crevix.io/blog/${post.slug}` },
        ]}
      />

      <PublicNav />

      <main className="flex-1 max-w-4xl mx-auto px-6 lg:px-12 py-16 w-full">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-label font-semibold text-on-surface-variant hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Blog</span>
        </Link>

        {/* Post Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-label">
            <span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-bold uppercase tracking-wider text-[10px]">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-on-surface-variant">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readingTimeMinutes} min read</span>
            </span>
            <span className="text-on-surface-variant font-mono text-[11px]">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-on-surface tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 font-body text-base sm:text-lg text-on-surface-variant leading-relaxed">
            {post.description}
          </p>

          {/* Author Card */}
          <div className="mt-6 pt-6 border-t border-surface-container-high flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary font-headline font-bold text-sm flex items-center justify-center">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <div className="font-headline font-bold text-sm text-on-surface">{post.author.name}</div>
              <div className="font-body text-xs text-on-surface-variant">{post.author.role}</div>
            </div>
          </div>
        </header>

        {/* Direct Answer AEO Callout Box */}
        <section className="mb-12 p-6 rounded-2xl bg-primary-fixed/20 border-2 border-primary-fixed-dim/60 shadow-sm">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div className="space-y-1">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-primary">
                Executive Answer & AEO Summary
              </span>
              <p className="font-body text-sm text-on-surface leading-relaxed">
                {post.directAnswerSummary}
              </p>
            </div>
          </div>
        </section>

        {/* Content Body */}
        <article className="prose prose-slate max-w-none font-body text-sm sm:text-base leading-relaxed text-on-surface space-y-6">
          <div className="whitespace-pre-line leading-relaxed">
            {post.content}
          </div>
        </article>

        {/* Post CTA */}
        <div className="mt-16 p-8 rounded-3xl bg-surface-container-low border border-surface-container-high shadow-md">
          <div className="max-w-xl space-y-3">
            <span className="font-label text-xs font-bold text-primary uppercase tracking-wider">
              Try It in Crevix
            </span>
            <h3 className="font-headline text-2xl font-bold text-on-surface">
              Put this workflow into production today.
            </h3>
            <p className="font-body text-xs sm:text-sm text-on-surface-variant">
              Every tool mentioned in this guide is included in Crevix All Access. Start your 30-day free trial today.
            </p>
            <div className="pt-2">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-label text-xs font-semibold hover:bg-primary-container transition-all shadow-sm hover-lift"
              >
                <span>Start 30-Day Free Trial</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
