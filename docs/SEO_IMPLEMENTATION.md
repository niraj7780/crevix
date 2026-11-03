# Crevix — Technical SEO & Site Architecture Implementation

**Document Status:** Complete & Verified  
**Engine:** Next.js 14 App Router  
**Target:** Global Search Engines & Generative AI Indexers  

---

## 1. Technical Site Structure

Crevix implements a modern, semantic Next.js App Router tree:

```
src/app/
├── (dashboard)/                 # Protected tenant routes (noindex, disallowed)
│   └── dashboard/...
├── api/                         # Backend endpoints (noindex, disallowed)
├── blog/
│   ├── page.tsx                 # Blog Index (priority: 0.8)
│   └── [slug]/page.tsx          # Dynamic Article pages (priority: 0.7, generateStaticParams)
├── comparisons/
│   └── page.tsx                 # SaaS comparison matrix (priority: 0.8)
├── features/
│   └── page.tsx                 # 12-Tool Feature directory (priority: 0.9)
├── instagram-dm-automation/
│   └── page.tsx                 # Flagship solution page (priority: 0.9)
├── ai-content-creation/
│   └── page.tsx                 # AI studio solution page (priority: 0.85)
├── social-media-scheduler/
│   └── page.tsx                 # Scheduling solution page (priority: 0.85)
├── creator-automation/
│   └── page.tsx                 # CRM & visual builder solution page (priority: 0.85)
├── pricing/
│   └── page.tsx                 # Crevix All Access pricing (priority: 0.95)
├── layout.tsx                   # Global fonts, metadataBase, Organization/App JSON-LD
├── page.tsx                     # Homepage landing (priority: 1.0)
├── robots.ts                    # Dynamic robots.txt generation
└── sitemap.ts                   # Dynamic sitemap.xml generation
```

---

## 2. Dynamic Sitemap & Metadata Configuration

### 2.1 Dynamic `sitemap.ts`
- Auto-generates URLs for all static pages with accurate `lastModified`, `changeFrequency`, and `priority`.
- Dynamically iterates over `BLOG_POSTS` to include article URLs with their exact `publishedAt` / `modifiedAt` timestamps.

### 2.2 Canonical URLs
Every page specifies an explicit canonical tag matching its absolute URL (`https://crevix.io/...`). This prevents duplicate indexing across staging domains, port variations, or URL query parameters.

### 2.3 Semantic HTML & Accessibility
- Standard semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- Zero empty interactive buttons: All links and toggles contain descriptive `aria-label` or clear text content.
- Strict heading hierarchy (`h1` -> `h2` -> `h3`) on every page.

---

## 3. Performance & Core Web Vitals Optimization

1. **Zero External Font Overhead:** Google Fonts (`Noto Serif`, `Inter`, `Public Sans`, `JetBrains Mono`) are preconnected with `crossOrigin="anonymous"` in `layout.tsx`.
2. **Server-Side Prerendering:** All public marketing pages are 100% Server Components. Zero client bundle bloat for the initial page load.
3. **Optimized Client Island:** The `<AnimateOnScroll />` motion component is a lightweight client boundary utilizing native browser `IntersectionObserver` with zero external animation dependencies.
4. **Cloudflare R2 Direct Uploads:** Media assets bypass the application server entirely, maintaining ultra-low TTFB (Time to First Byte).
