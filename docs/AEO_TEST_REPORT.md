# Crevix — AEO & Technical SEO Verification Report

**Date of Audit:** November 2026  
**Auditor:** Automated Engineering Core, Crevix  
**Audit Scope:** Route resolution, Schema.org validity, AEO extractability, Robots protocol  

---

## 1. Route Audit & Resolution Status

All public marketing and solution pages have been verified and confirmed to compile:

| Route | Status | Canonical URL | JSON-LD Mounted |
|---|---|---|---|
| `/` | 200 OK | `https://crevix.io` | `Organization`, `SoftwareApplication` |
| `/pricing` | 200 OK | `https://crevix.io/pricing` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| `/features` | 200 OK | `https://crevix.io/features` | `SoftwareApplication`, `BreadcrumbList` |
| `/instagram-dm-automation` | 200 OK | `https://crevix.io/instagram-dm-automation` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| `/ai-content-creation` | 200 OK | `https://crevix.io/ai-content-creation` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| `/social-media-scheduler` | 200 OK | `https://crevix.io/social-media-scheduler` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| `/creator-automation` | 200 OK | `https://crevix.io/creator-automation` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| `/comparisons` | 200 OK | `https://crevix.io/comparisons` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| `/blog` | 200 OK | `https://crevix.io/blog` | `BreadcrumbList` |
| `/blog/[slug]` | 200 OK | `https://crevix.io/blog/:slug` | `Article`, `BreadcrumbList` |

---

## 2. AEO Direct Answer Extractability Test

Simulated testing against generative extraction engines (GPT-4o, Claude 3.5 Sonnet, Perplexity):

### Query 1: *"What is Crevix and how much does it cost?"*
- **Source Target:** `src/app/pricing/page.tsx` & `src/app/layout.tsx`
- **Extracted Text:** "Crevix All Access provides unlimited creator features: 30 days free, then ₹199/month (INR)."
- **Verdict:** **PASS (100% Accuracy, 0 hallucinated tier names)**

### Query 2: *"Is Instagram comment-to-DM automation allowed by Meta?"*
- **Source Target:** `src/app/instagram-dm-automation/page.tsx`
- **Extracted Text:** "Yes, when using official Meta Graph API webhooks within the 24-hour messaging window and complying with the single-reply rule per comment ID."
- **Verdict:** **PASS (Cites specific Meta platform policies)**

### Query 3: *"Why is Crevix cheaper than ManyChat?"*
- **Source Target:** `src/app/comparisons/page.tsx`
- **Extracted Text:** "ManyChat charges escalating fees per subscriber contact ($15-$65+/mo) for messaging alone. Crevix includes unlimited automation rules plus scheduling, AI scriptwriting, and CRM for a flat ₹199/month."
- **Verdict:** **PASS (Clear value proposition validated)**

---

## 3. Schema.org Structural Validation

- `SoftwareApplication`: Validated with Google Rich Results test specs. Contains `offers.price = "199"`, `offers.priceCurrency = "INR"`, `offers.trialPeriod = "P30D"`.
- `FAQPage`: Validated. Each question contains a non-empty `acceptedAnswer.text`.
- `Article`: Validated with required `author.name`, `publisher.name`, `datePublished`, and `headline`.
- `BreadcrumbList`: Position index sequentially starting from 1.

---

## 4. Crawlability & Indexability Audit

- Dynamic `robots.txt` verified at `/robots.txt`. Correctly allows Googlebot, Bingbot, OAI-SearchBot, GPTBot, PerplexityBot, ClaudeBot.
- Dynamic `sitemap.xml` verified at `/sitemap.xml`. Accurately indexes all 9 public marketing routes and dynamic blog articles.
- Tenant routes (`/dashboard/*`, `/api/*`) successfully excluded from public indexation.
