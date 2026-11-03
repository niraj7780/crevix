# gstack Engineering Review & Plan Validation — Omniflow

**Framework:** [gstack by Garry Tan](https://github.com/garrytan/gstack.git)  
**Evaluator Personas:** CEO (Office Hours), Eng Lead (Plan-Eng-Review), Design Lead (Plan-Design-Review), Security Officer (CSO), QA Lead (QA)  
**Date:** November 2026  

---

## 1. /office-hours (CEO & Founder Challenge)

### The Premise Challenge
- **Weak Assumption:** "Creators just need another dashboard to see their metrics and write AI captions."
- **CEO Pushback:** Dashboards don't sell; automated conversion pipelines do. Creators do not suffer from a lack of analytics; they suffer from **lead leakage**. When a Reel gets 50,000 views and 800 comments asking for a link, replying manually takes 14 hours and Instagram bans the creator for rapid copy-paste actions.
- **The Core Value Loop:** 
  The single most critical path in Omniflow is:
  **Reel Published → Audience Comments Keyword → Automated DM Sent within 5s with Resource Link → Lead Captured in CRM → Conversion Follow-up.**
- **Verdict:** Prioritize Phase 4 & 5 (Calendar, Publishing, and Comment-to-DM Engine). The AI generators are table stakes; the **DM Automation Engine** is the enterprise conversion moat.

---

## 2. /plan-design-review (Design Lead & Stitch Fidelity)

### Anti-Slop Audit & Token Adherence
- **Reference:** Google Stitch extracted design (`stitch_design/code.html`, `DESIGN.md`).
- **Principles Checked:**
  1. **Surface Tonal Hierarchy:** Eliminating generic 1px gray borders in favor of background tier shifts (`surface-container-lowest` `#ffffff` → `surface-container-low` `#f5f3f4` → `surface-container` `#efedee` → `surface-container-high` `#e9e8e9`).
  2. **Typography Restraint:** Strict font pairings:
     - Noto Serif for headlines (editorial authority, creator elegance).
     - Inter for body and dense tables.
     - Public Sans for badges, labels, and metadata chips.
     - JetBrains Mono for metrics and timestamps.
  3. **Branding Contrast:** Deep royal blue primary (`#094cb2`) and vibrant accent (`#3366cc`) with warm tertiary accents (`#6d5e00` archival gold).
- **Verdict:** Approved. Design system must match Stitch sidebar, workspace switcher, and calendar view exactly.

---

## 3. /plan-eng-review (Engineering Manager Architectural Review)

### Architecture Checklist & Risk Mitigations
1. **Multi-Tenant Workspace Isolation:**
   - *Risk:* Cross-workspace data leakage if queries omit tenant filters.
   - *Mitigation:* Centralized server-side guard `requireWorkspaceAuth(req)` binds every query to `workspace_id`. All Drizzle schema tables have foreign keys with cascades to `workspaces.id`.
2. **Database Performance on Neon Serverless:**
   - *Risk:* Connection starvation or cold-start latency.
   - *Mitigation:* Neon HTTP/WebSocket connection pooling (`@neondatabase/serverless`) prevents pool exhaustion on serverless lambdas.
3. **Large File Uploads & Zero-Egress Storage:**
   - *Risk:* 100MB 4K video uploads timing out or running out of memory on Next.js serverless functions.
   - *Mitigation:* Client-side direct presigned S3 PUT uploads directly to Cloudflare R2. Server only mints short-lived signed URLs.
4. **Publishing Race Conditions & Duplication:**
   - *Risk:* Double-posting social media content on retry.
   - *Mitigation:* `publishing_jobs` table enforces unique `idempotency_key` and row-level locks (`FOR UPDATE SKIP LOCKED`) during worker pickup.
- **Verdict:** Approved without reservation. Modular monolith with decoupled queue execution is the optimal architecture.

---

## 4. /cso (Chief Security Officer Threat Model — STRIDE & OWASP)

### Security Safeguards
1. **Token Cryptography:** Long-lived Meta access tokens must never be plaintext. Stored in `social_tokens` using AES-256-GCM with unique initialization vectors (`token_iv`) and authentication tags (`token_tag`).
2. **Webhook Cryptographic Integrity:** All incoming `/api/webhooks/meta` requests must verify `X-Hub-Signature-256` SHA-256 HMAC against `META_APP_SECRET`. Unsigned or mismatched webhooks are rejected with 401.
3. **BYOK Secret Storage:** Workspace-level AI API keys are masked on the frontend (`sk-ant...9x`) and encrypted at rest.
4. **Direct Object Reference (IDOR) Defense:** All URLs referencing posts, assets, or automations verify both `id` AND `workspace_id` of the active authenticated session.
- **Verdict:** High-assurance security model established.

---

## 5. /qa (QA Test Strategy & Criteria)

### Verification Suite
- [ ] Schema validation and migration checks.
- [ ] Auth guard tests (unauthenticated redirect, cross-workspace block).
- [ ] Direct R2 presign URL issuance and payload validation.
- [ ] Publish runner idempotency test (duplicate executions fail safely).
- [ ] Comment-to-DM keyword matching test (exact match, contains, phrase).
- [ ] Tier limit entitlement validation (free tier 10 posts vs pro tier 500).
