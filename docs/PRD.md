# Product Requirements Document (PRD) — Omniflow

**Version:** 1.0.0  
**Product:** Omniflow  
**Tagline:** "Your entire creator workflow. One flow."  
**Category:** AI-powered Creator Automation SaaS  
**Author:** Founding Engineering Team  

---

## 1. Executive Summary & Vision

Omniflow is an all-in-one automation operating system designed for modern digital creators, influencers, YouTubers, Instagram creators, and boutique creative agencies. Modern creators operate across fragmented tools: Notion for ideas, ChatGPT for copy, Google Drive or Dropbox for media, Buffer/Later for scheduling, ManyChat for DM automation, and spreadsheets for CRM and analytics.

Omniflow unifies this fragmented lifecycle into a single cohesive pipeline:
**RESEARCH → CREATE → SCHEDULE → PUBLISH → AUTOMATE → CAPTURE LEADS → ANALYZE**

### Target Audience
1. **Instagram Creators & Influencers:** Needing rapid Reel ideation, hashtag research, and automated Comment-to-DM conversion.
2. **YouTubers & Video Creators:** Seeking high-retention hooks, multi-platform script repurposing, and scheduling.
3. **Social Media Managers & Agencies:** Managing multiple creator profiles, workspace isolation, asset libraries, and publishing pipelines.
4. **Solopreneurs & Digital Product Sellers:** Leveraging social reach to capture direct leads and build automated sales funnels.

---

## 2. Core Value Propositions

- **Zero Context Switching:** From discovering a trending hook to scheduling a Reel and configuring automated DM fulfillment, creators remain in one workspace.
- **Official & Compliant Automations:** 100% official Meta Graph API integration. No scraping, no password sharing, zero ban risks.
- **Cost-Conscious Architecture:** Bring-Your-Own-Key (BYOK) AI models and efficient serverless storage keep platform overhead minimal while maintaining enterprise reliability.
- **Multi-Tenant Workspaces:** Strict organizational boundaries allowing team collaboration, role-based access, and secure account delegation.

---

## 3. Product Modules & Functional Specifications

### Module 1: Unified Dashboard & Cockpit
- **Role:** High-level executive overview of creator performance and pending tasks.
- **Features:**
  - Connected social profile cards with status indicators (Active, Token Expiring, Disconnected).
  - Aggregate metrics: Total Audience Reach, Net Engagement Rate, Posts Published this Month, Active DM Automations.
  - Interactive performance charts (Recharts) visualizing engagement over 7d/30d/90d.
  - Quick action bar: "New AI Script", "Schedule Post", "Create Automation", "Upload Media".
  - Live activity feed showing published posts, triggered automations, and newly captured leads.
  - Clear visual indicator distinguishing live connected account data from demo/unconnected states.

### Module 2: AI Content Research Lab
- **Role:** Data-driven ideation and angle discovery.
- **Features:**
  - Topic exploration by niche (e.g., Tech, Fitness, Finance, Lifestyle, SaaS).
  - Target audience persona configuration and tone specification.
  - Output formats: Viral Hook Options, Content Angles, Controversy/Contrast Prompts, Competitor Frameworks.
  - One-click action: "Send to Content Studio" to immediately generate full scripts from selected ideas.
  - BYOK (Bring Your Own Key) support for OpenAI, Anthropic, and Google Gemini with graceful fallback.
  - History & archive of research reports stored in PostgreSQL.

### Module 3: Content Studio & Multi-Format Generator
- **Role:** High-velocity scriptwriting and caption crafting.
- **Features:**
  - Dedicated generators for: Instagram Reels, Carousels (slide-by-slide), Single Images, and Stories.
  - Integrated components: Hook Generator (first 3 seconds), Value Body, Call to Action (CTA), and Hashtag Clusters.
  - Tone modifiers (Casual, Authoritative, Storyteller, High Energy, Minimalist).
  - Rich draft editor with live social media card preview (mobile Instagram feed simulation).
  - Save as Draft, Export, or "Schedule Post" direct routing.

### Module 4: Cloudflare R2 Media Library
- **Role:** Centralized media asset management with zero-egress fee architecture.
- **Features:**
  - Presigned S3-compatible uploads direct to Cloudflare R2 from browser (avoiding server payload bottlenecks).
  - Support for high-res images (JPEG, PNG, WebP) and video formats (MP4, MOV).
  - Client-side pre-validation: file size limit (100MB video, 10MB image), MIME checking.
  - Media gallery with thumbnail generation, asset search, tag filters, and asset deletion.
  - Workspace-level ownership enforcement on every asset read/write.

### Module 5: Interactive Content Calendar
- **Role:** Visual publication schedule and content pipeline management.
- **Features:**
  - Month, Week, Day, and List views.
  - Drag-and-drop rescheduling with automatic timezone normalization.
  - Post status badges: `DRAFT`, `SCHEDULED`, `PUBLISHING`, `PUBLISHED`, `FAILED`.
  - Content drawer for inline post previews, asset swapping, and caption updates.
  - Platform filtering (Instagram, YouTube, Multi-platform).

### Module 6: Reliable Publishing Engine
- **Role:** Automated dispatch and verification of social media publications.
- **Features:**
  - Asynchronous background worker queue execution.
  - Pre-flight validation: active token checks, media dimension/aspect ratio compliance (e.g., 9:16 for Reels, 1:1 or 4:5 for feed).
  - Idempotent job execution with distributed locking to prevent duplicate postings.
  - Exponential backoff retry policies for transient network or API errors.
  - Execution log tracking external platform IDs, status codes, and error traces.
  - Development / Mock Mode for local verification without live Meta production approval.

### Module 7: Instagram Comment-to-DM Automation Engine
- **Role:** Core growth engine converting public post engagement into private leads.
- **Features:**
  - Real-time Meta Webhook receiver for `comments` and `mentions`.
  - Rule-based keyword matching (exact match, contains, phrase, wildcard regex).
  - Permitted public comment reply (e.g., "Check your DMs! 🚀") to boost post algorithm reach.
  - Instant private reply dispatch within the 24-hour Meta messaging window.
  - Dynamic template variables (`{{user.name}}`, `{{post.title}}`, `{{resource.url}}`).
  - Execution audit trail linking the trigger comment, sent message, and created lead.

### Module 8: Visual Workflow Automation Builder
- **Role:** Visual node-based workflow orchestration (React Flow).
- **Features:**
  - Canvas interface with draggable Nodes and reactive Edges.
  - Node Categories:
    - **Triggers:** Instagram Comment Received, Form Submitted, Tag Added, Schedule Cron.
    - **Conditions:** Keyword Filter, Follower Count Threshold, Lead Status Check, Time Delay.
    - **Actions:** Send DM, Add Tag, Create Lead in CRM, Send Email Alert (Resend), Webhook POST.
  - Serialization to JSON graph schema and execution engine runner.

### Module 9: Unified Social Inbox
- **Role:** Centralized two-way direct message management.
- **Features:**
  - Real-time conversation thread view.
  - Unread indicators, message filtering, and search.
  - Contact metadata sidebar (lead stage, source post, tags, interaction history).
  - Quick canned responses / saved templates for recurring questions.
  - Manual reply capability via Meta Graph Send API.

### Module 10: Creator CRM & Lead Pipeline
- **Role:** Monetization engine converting social contacts into qualified buyers.
- **Features:**
  - Automatic lead creation from successful DM automation triggers.
  - Contact profiles: Full Name, Instagram Handle, Email, Phone, Lifetime Value, Stage.
  - Pipeline stages: `NEW`, `ENGAGED`, `QUALIFIED`, `CUSTOMER`, `CHURNED`.
  - Custom tag assignment and activity timeline.
  - One-click CSV export and workspace-scoped data isolation.

### Module 11: Creator Analytics & Performance Insights
- **Role:** Actionable intelligence on content reach and automation conversion.
- **Features:**
  - Aggregated social insights: Impressions, Reach, Follower Growth, Video Views, Saves, Shares.
  - Automation ROI tracking: Comments Processed, DMs Delivered, DM Open/Click Rate, Leads Captured.
  - Top performing posts matrix (sortable by reach, engagement, or leads generated).
  - Distinct tagging for Live Platform Data vs. Development Demo Mode.

### Module 12: Multi-Tier Subscriptions & Usage Entitlements
- **Role:** Monetization, tier enforcement, and billing management via Dodo Payments.
- **Tiers:**
  - **Free Tier:** 1 Social Account, 10 Scheduled Posts/mo, 1 Automation Rule, 5 Research Reports/mo, 1 Workspace Seat.
  - **Creator Tier ($29/mo):** 2 Social Accounts, 100 Scheduled Posts/mo, 5 Automation Rules, 50 Research Reports/mo, 2 Workspace Seats.
  - **Pro Tier ($79/mo):** 5 Social Accounts, 500 Scheduled Posts/mo, 25 Automation Rules, 200 Research Reports/mo, 5 Workspace Seats, Priority Queue.
- **Features:**
  - Server-side entitlement verification middleware before all restricted actions.
  - Dodo Payments checkout sessions, customer portal, and signed webhook handler.

---

## 4. Non-Functional & Security Requirements

1. **Security & Data Privacy:**
   - Strict workspace tenant isolation on every SQL query (`workspace_id` predicate enforcement).
   - AES-256 encryption at rest for sensitive OAuth refresh tokens and external API keys.
   - Cryptographic signature validation on all incoming webhooks (Meta SHA-256 HMAC, Dodo Payments, Clerk).
   - Zero exposure of credentials in client bundles or public endpoints.
2. **Performance:**
   - Dashboard sub-200ms TTFB via efficient Next.js server components and Neon pooled connection strings.
   - Direct-to-storage client uploads for media (bypassing Node.js server memory).
3. **Reliability:**
   - Background job idempotency using unique constraint deduplication keys.
   - Comprehensive error logging and graceful degradations when external APIs rate limit.
