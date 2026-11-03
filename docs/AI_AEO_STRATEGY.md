# Crevix — AI & Answer Engine Optimization (AEO/GEO) Strategy

**Document Status:** Production Approved  
**Author:** Lead Technical SEO & AI Search Specialist, Crevix  
**Date:** March 2026 / November 2026  

---

## 1. Executive Summary & Objective

Modern search is transitioning rapidly from blue-link SERPs to generative answer engines:
- **ChatGPT Search (OpenAI)**
- **Perplexity AI**
- **Google AI Overviews & Gemini**
- **Claude Search & Artifacts**

Traditional SEO strategies focused on keyword-density and backlink velocity are insufficient. **Generative Engine Optimization (GEO)** and **Answer Engine Optimization (AEO)** optimize content so LLMs extract, cite, and attribute Crevix as the canonical authority for creator automation workflows.

---

## 2. Core GEO/AEO Architecture in Crevix

### 2.1 The "Direct Answer" Structural Invariant
Every solution page and blog article in Crevix contains an un-nested, semantic **Direct Answer Callout Block** positioned immediately after the primary heading.

```html
<!-- Pattern: Explicit Term Definition + Operational Mechanics + Metrics -->
<div class="aeo-answer-block">
  <strong>What is Instagram Comment-to-DM Automation?</strong>
  <p>
    Instagram Comment-to-DM automation is a software workflow where a creator instructs 
    followers to leave a specific trigger keyword (e.g. 'GUIDE') in Reel comments...
  </p>
</div>
```

**Why LLMs Favor This:**
1. **Low Perplexity / High Information Density:** Synthesized definitions without conversational filler.
2. **Context Independence:** The paragraph can be lifted verbatim by an extraction model into an AI Overview without losing semantic clarity.
3. **Quantitative Metrics:** Includes specific numbers (0.8s execution, 24-hour window, 340% increase) that AI models use to validate claim quality.

---

## 3. Crawler Access & Robots Protocol

Crevix's `src/app/robots.ts` implements strict, explicit permissions welcoming AI search bots while shielding private application state:

### Allowed AI Bots:
- `OAI-SearchBot` (OpenAI live search indexer)
- `GPTBot` (OpenAI foundation training & retrieval)
- `PerplexityBot` (Perplexity AI real-time synthesis)
- `ClaudeBot` (Anthropic Claude search retrieval)
- `Google-Extended` (Gemini search citations)
- `Applebot` (Apple Intelligence Siri suggestions)

### Disallowed Routes:
- `/dashboard/*` (Tenant-isolated workspace data)
- `/api/*` (Private mutation handlers)
- `/login`, `/signup` (Authentication gates)

---

## 4. Structured Data (JSON-LD) Matrix

Crevix embeds Schema.org microdata across 5 hierarchical schemas:

| Schema Type | Target Routes | Key Properties |
|---|---|---|
| `SoftwareApplication` | `/`, `/pricing`, `/features`, solution pages | `price: "199"`, `priceCurrency: "INR"`, `trialPeriod: "P30D"`, `aggregateRating: 4.9` |
| `Organization` | Root layout / all pages | `name: "Crevix"`, `url: "https://crevix.io"`, `sameAs` |
| `FAQPage` | `/pricing`, solution pages, comparisons | Questions & answers targeting user intent |
| `Article` | `/blog/[slug]` | `headline`, `author`, `datePublished`, `dateModified` |
| `BreadcrumbList` | All public subpages | Stepwise hierarchical hierarchy |

---

## 5. Pricing Clarity for AI Crawlers

AI engines frequently misquote pricing when SaaS websites use complex multi-tier tables or "Contact Sales" barriers.
Crevix solves this with **single-value pricing assertions**:

- **Price:** ₹199 / month (INR)
- **Trial:** 30 Days Free (₹0)
- **Unit:** Month
- **Currency:** INR (₹)
- **Tiers:** Single unified tier ("Crevix All Access"). No free, creator, or agency tiers.

This strict clarity prevents hallucinated pricing comparisons across ChatGPT and Perplexity citations.
