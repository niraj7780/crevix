# Database Architecture & Schema Specification — Omniflow

**Engine:** Neon PostgreSQL (Serverless)  
**ORM:** Drizzle ORM (`drizzle-kit`)  
**Isolation Model:** Shared database, multi-tenant row-level workspace scoping (`workspace_id`).  

---

## 1. Schema Design Principles

1. **Workspace Boundary:** Every resource owned by a workspace contains a `workspace_id` referencing `workspaces.id` with `ON DELETE CASCADE`.
2. **Clerk User Mapping:** Users are keyed by their external Clerk ID (`clerk_user_id`), with an internal UUID for relational integrity.
3. **Auditability:** Every mutable table has `created_at` and `updated_at` timestamps defaulting to `now()`.
4. **Token Encryption:** Tokens stored in `social_tokens` are AES-256-GCM ciphertexts, never plaintext.
5. **Idempotency:** Webhooks and queued jobs have unique deduplication keys to prevent double-processing.

---

## 2. Table Schemas & Relational Matrix

### 2.1 Workspace & Identity Core

#### `users`
Stores creator profile information synchronized from Clerk.
- `id`: `uuid` PRIMARY KEY DEFAULT gen_random_uuid()
- `clerk_user_id`: `varchar(255)` UNIQUE NOT NULL
- `email`: `varchar(255)` NOT NULL
- `full_name`: `varchar(255)`
- `avatar_url`: `text`
- `created_at`: `timestamp with time zone` DEFAULT now() NOT NULL
- `updated_at`: `timestamp with time zone` DEFAULT now() NOT NULL
- *Indexes:* `idx_users_clerk_id` on (`clerk_user_id`)

#### `workspaces`
Top-level organizational tenant boundary.
- `id`: `uuid` PRIMARY KEY DEFAULT gen_random_uuid()
- `name`: `varchar(255)` NOT NULL
- `slug`: `varchar(255)` UNIQUE NOT NULL
- `owner_user_id`: `uuid` REFERENCES users(id) ON DELETE RESTRICT
- `tier`: `varchar(50)` DEFAULT 'free' NOT NULL ('free', 'creator', 'pro')
- `settings`: `jsonb` DEFAULT '{}'::jsonb
- `created_at`: `timestamp with time zone` DEFAULT now() NOT NULL
- `updated_at`: `timestamp with time zone` DEFAULT now() NOT NULL

#### `workspace_members`
Collaborators and permissions within a workspace.
- `id`: `uuid` PRIMARY KEY DEFAULT gen_random_uuid()
- `workspace_id`: `uuid` REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL
- `user_id`: `uuid` REFERENCES users(id) ON DELETE CASCADE NOT NULL
- `role`: `varchar(50)` DEFAULT 'member' NOT NULL ('owner', 'admin', 'member')
- `created_at`: `timestamp with time zone` DEFAULT now() NOT NULL
- *Constraints:* UNIQUE (`workspace_id`, `user_id`)

---

### 2.2 Social Integrations & Token Storage

#### `social_accounts`
Connected social profiles (Instagram Professional, YouTube channel, etc.).
- `id`: `uuid` PRIMARY KEY DEFAULT gen_random_uuid()
- `workspace_id`: `uuid` REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL
- `platform`: `varchar(50)` NOT NULL ('instagram', 'youtube', 'tiktok', 'linkedin')
- `platform_account_id`: `varchar(255)` NOT NULL
- `username`: `varchar(255)` NOT NULL
- `display_name`: `varchar(255)`
- `profile_picture_url`: `text`
- `follower_count`: `integer` DEFAULT 0
- `status`: `varchar(50)` DEFAULT 'active' NOT NULL ('active', 'expired', 'disconnected')
- `created_at`: `timestamp with time zone` DEFAULT now() NOT NULL
- `updated_at`: `timestamp with time zone` DEFAULT now() NOT NULL
- *Constraints:* UNIQUE (`workspace_id`, `platform`, `platform_account_id`)

#### `social_tokens`
Encrypted OAuth access and refresh tokens.
- `id`: `uuid` PRIMARY KEY DEFAULT gen_random_uuid()
- `social_account_id`: `uuid` REFERENCES social_accounts(id) ON DELETE CASCADE NOT NULL
- `access_token_encrypted`: `text` NOT NULL
- `refresh_token_encrypted`: `text`
- `token_iv`: `varchar(64)` NOT NULL
- `token_tag`: `varchar(64)` NOT NULL
- `expires_at`: `timestamp with time zone`
- `scopes`: `text[]` DEFAULT ARRAY[]::text[]
- `created_at`: `timestamp with time zone` DEFAULT now() NOT NULL
- `updated_at`: `timestamp with time zone` DEFAULT now() NOT NULL
- *Constraints:* UNIQUE (`social_account_id`)

---

### 2.3 Content & Media Engine

#### `media_assets`
Cloudflare R2 media files uploaded by creators.
- `id`: `uuid` PRIMARY KEY DEFAULT gen_random_uuid()
- `workspace_id`: `uuid` REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL
- `file_name`: `varchar(255)` NOT NULL
- `file_key`: `text` NOT NULL
- `public_url`: `text` NOT NULL
- `mime_type`: `varchar(100)` NOT NULL
- `file_size_bytes`: `bigint` NOT NULL
- `media_type`: `varchar(50)` NOT NULL ('image', 'video', 'document')
- `metadata`: `jsonb` DEFAULT '{}'::jsonb (width, height, duration)
- `created_at`: `timestamp with time zone` DEFAULT now() NOT NULL
- *Indexes:* `idx_media_workspace` on (`workspace_id`, `created_at`)

#### `content_posts`
Drafted and scheduled content posts.
- `id`: `uuid` PRIMARY KEY DEFAULT gen_random_uuid()
- `workspace_id`: `uuid` REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL
- `social_account_id`: `uuid` REFERENCES social_accounts(id) ON DELETE SET NULL
- `post_type`: `varchar(50)` NOT NULL ('reel', 'carousel', 'single_image', 'story')
- `title`: `varchar(255)`
- `caption`: `text`
- `hashtags`: `text[]` DEFAULT ARRAY[]::text[]
- `media_asset_ids`: `uuid[]` DEFAULT ARRAY[]::uuid[]
- `status`: `varchar(50)` DEFAULT 'draft' NOT NULL ('draft', 'scheduled', 'publishing', 'published', 'failed')
- `scheduled_at`: `timestamp with time zone`
- `published_at`: `timestamp with time zone`
- `external_post_id`: `varchar(255)`
- `external_permalink`: `text`
- `error_message`: `text`
- `created_at`: `timestamp with time zone` DEFAULT now() NOT NULL
- `updated_at`: `timestamp with time zone` DEFAULT now() NOT NULL
- *Indexes:* `idx_posts_workspace_status` on (`workspace_id`, `status`), `idx_posts_scheduled` on (`scheduled_at`)

#### `publishing_jobs`
Asynchronous job queue entries for scheduled social publication.
- `id`: `uuid` PRIMARY KEY DEFAULT gen_random_uuid()
- `workspace_id`: `uuid` REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL
- `content_post_id`: `uuid` REFERENCES content_posts(id) ON DELETE CASCADE NOT NULL
- `idempotency_key`: `varchar(255)` UNIQUE NOT NULL
- `status`: `varchar(50)` DEFAULT 'pending' NOT NULL ('pending', 'processing', 'completed', 'failed')
- `run_at`: `timestamp with time zone` NOT NULL
- `attempts`: `integer` DEFAULT 0 NOT NULL
- `max_attempts`: `integer` DEFAULT 3 NOT NULL
- `last_error`: `text`
- `locked_at`: `timestamp with time zone`
- `completed_at`: `timestamp with time zone`
- `created_at`: `timestamp with time zone` DEFAULT now() NOT NULL
- *Indexes:* `idx_jobs_run` on (`status`, `run_at`)

---

### 2.4 Automation & Workflows

#### `automation_rules`
Comment-to-DM and custom workflow configurations.
- `id`: `uuid` PRIMARY KEY DEFAULT gen_random_uuid()
- `workspace_id`: `uuid` REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL
- `social_account_id`: `uuid` REFERENCES social_accounts(id) ON DELETE CASCADE
- `name`: `varchar(255)` NOT NULL
- `is_active`: `boolean` DEFAULT true NOT NULL
- `trigger_type`: `varchar(50)` NOT NULL ('instagram_comment', 'scheduled_cron', 'new_lead')
- `target_post_id`: `varchar(255)` (null means all posts on account)
- `keywords`: `text[]` DEFAULT ARRAY[]::text[]
- `match_type`: `varchar(50)` DEFAULT 'contains' NOT NULL ('exact', 'contains', 'regex')
- `public_reply_enabled`: `boolean` DEFAULT false NOT NULL
- `public_reply_templates`: `text[]` DEFAULT ARRAY[]::text[]
- `dm_message_template`: `text` NOT NULL
- `flow_graph_json`: `jsonb`
- `total_executions`: `integer` DEFAULT 0 NOT NULL
- `created_at`: `timestamp with time zone` DEFAULT now() NOT NULL
- `updated_at`: `timestamp with time zone` DEFAULT now() NOT NULL

#### `automation_triggers`
Event triggers listening for platform activity.
- `id`: `uuid` PRIMARY KEY DEFAULT gen_random_uuid()
- `automation_rule_id`: `uuid` REFERENCES automation_rules(id) ON DELETE CASCADE NOT NULL
- `event_type`: `varchar(100)` NOT NULL
- `conditions`: `jsonb` DEFAULT '{}'::jsonb NOT NULL
- `created_at`: `timestamp with time zone` DEFAULT now() NOT NULL

#### `automation_executions`
Execution logs and audit trails for triggered automations.
- `id`: `uuid` PRIMARY KEY DEFAULT gen_random_uuid()
- `workspace_id`: `uuid` REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL
- `automation_rule_id`: `uuid` REFERENCES automation_rules(id) ON DELETE CASCADE NOT NULL
- `trigger_event_id`: `varchar(255)` NOT NULL
- `trigger_user_id`: `varchar(255)`
- `trigger_username`: `varchar(255)`
- `trigger_text`: `text`
- `status`: `varchar(50)` NOT NULL ('success', 'failed', 'skipped')
- `action_taken`: `text`
- `error_message`: `text`
- `created_at`: `timestamp with time zone` DEFAULT now() NOT NULL
- *Indexes:* `idx_exec_workspace` on (`workspace_id`, `created_at`)

---

### 2.5 Inbox & CRM

#### `conversations`
Unified conversation threads across platforms.
- `id`: `uuid` PRIMARY KEY DEFAULT gen_random_uuid()
- `workspace_id`: `uuid` REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL
- `social_account_id`: `uuid` REFERENCES social_accounts(id) ON DELETE CASCADE NOT NULL
- `external_thread_id`: `varchar(255)` NOT NULL
- `participant_id`: `varchar(255)` NOT NULL
- `participant_username`: `varchar(255)` NOT NULL
- `participant_avatar`: `text`
- `last_message_text`: `text`
- `last_message_at`: `timestamp with time zone`
- `unread_count`: `integer` DEFAULT 0 NOT NULL
- `created_at`: `timestamp with time zone` DEFAULT now() NOT NULL
- *Constraints:* UNIQUE (`workspace_id`, `social_account_id`, `external_thread_id`)

#### `messages`
Individual messages within a conversation.
- `id`: `uuid` PRIMARY KEY DEFAULT gen_random_uuid()
- `conversation_id`: `uuid` REFERENCES conversations(id) ON DELETE CASCADE NOT NULL
- `sender_type`: `varchar(50)` NOT NULL ('creator', 'contact', 'automation')
- `external_message_id`: `varchar(255)`
- `message_text`: `text` NOT NULL
- `media_urls`: `text[]` DEFAULT ARRAY[]::text[]
- `created_at`: `timestamp with time zone` DEFAULT now() NOT NULL

#### `leads`
Creator CRM capturing contacts generated through content & automations.
- `id`: `uuid` PRIMARY KEY DEFAULT gen_random_uuid()
- `workspace_id`: `uuid` REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL
- `full_name`: `varchar(255)`
- `social_handle`: `varchar(255)`
- `platform`: `varchar(50)` DEFAULT 'instagram' NOT NULL
- `email`: `varchar(255)`
- `phone`: `varchar(50)`
- `stage`: `varchar(50)` DEFAULT 'new' NOT NULL ('new', 'engaged', 'qualified', 'customer', 'churned')
- `source_automation_id`: `uuid` REFERENCES automation_rules(id) ON DELETE SET NULL
- `tags`: `text[]` DEFAULT ARRAY[]::text[]
- `notes`: `text`
- `lifetime_value_cents`: `integer` DEFAULT 0 NOT NULL
- `created_at`: `timestamp with time zone` DEFAULT now() NOT NULL
- `updated_at`: `timestamp with time zone` DEFAULT now() NOT NULL
- *Indexes:* `idx_leads_workspace_stage` on (`workspace_id`, `stage`)

---

### 2.6 Research, Analytics & Operations

#### `research_reports`
Generated AI topic research and content ideas.
- `id`: `uuid` PRIMARY KEY DEFAULT gen_random_uuid()
- `workspace_id`: `uuid` REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL
- `topic`: `varchar(255)` NOT NULL
- `niche`: `varchar(100)` NOT NULL
- `target_audience`: `text`
- `summary`: `text` NOT NULL
- `hooks`: `jsonb` DEFAULT '[]'::jsonb NOT NULL
- `content_angles`: `jsonb` DEFAULT '[]'::jsonb NOT NULL
- `outline`: `text`
- `created_at`: `timestamp with time zone` DEFAULT now() NOT NULL

#### `analytics_snapshots`
Cached metric snapshots for fast dashboard rendering.
- `id`: `uuid` PRIMARY KEY DEFAULT gen_random_uuid()
- `workspace_id`: `uuid` REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL
- `social_account_id`: `uuid` REFERENCES social_accounts(id) ON DELETE CASCADE
- `date`: `date` NOT NULL
- `impressions`: `integer` DEFAULT 0 NOT NULL
- `reach`: `integer` DEFAULT 0 NOT NULL
- `engagement_rate`: `numeric(5,2)` DEFAULT 0.00 NOT NULL
- `followers_count`: `integer` DEFAULT 0 NOT NULL
- `profile_visits`: `integer` DEFAULT 0 NOT NULL
- `created_at`: `timestamp with time zone` DEFAULT now() NOT NULL
- *Constraints:* UNIQUE (`workspace_id`, `social_account_id`, `date`)

#### `subscriptions`
Dodo Payments subscription sync records.
- `id`: `uuid` PRIMARY KEY DEFAULT gen_random_uuid()
- `workspace_id`: `uuid` REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL
- `dodo_subscription_id`: `varchar(255)` UNIQUE NOT NULL
- `dodo_customer_id`: `varchar(255)` NOT NULL
- `plan_tier`: `varchar(50)` NOT NULL ('creator', 'pro')
- `status`: `varchar(50)` NOT NULL ('active', 'past_due', 'cancelled', 'paused')
- `current_period_start`: `timestamp with time zone` NOT NULL
- `current_period_end`: `timestamp with time zone` NOT NULL
- `cancel_at_period_end`: `boolean` DEFAULT false NOT NULL
- `created_at`: `timestamp with time zone` DEFAULT now() NOT NULL
- `updated_at`: `timestamp with time zone` DEFAULT now() NOT NULL

#### `usage_records`
Monthly quota tracking per workspace.
- `id`: `uuid` PRIMARY KEY DEFAULT gen_random_uuid()
- `workspace_id`: `uuid` REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL
- `billing_period`: `varchar(7)` NOT NULL ('YYYY-MM')
- `posts_scheduled_count`: `integer` DEFAULT 0 NOT NULL
- `ai_research_reports_count`: `integer` DEFAULT 0 NOT NULL
- `automation_executions_count`: `integer` DEFAULT 0 NOT NULL
- `created_at`: `timestamp with time zone` DEFAULT now() NOT NULL
- `updated_at`: `timestamp with time zone` DEFAULT now() NOT NULL
- *Constraints:* UNIQUE (`workspace_id`, `billing_period`)

#### `audit_logs`
Security and administrative audit trail.
- `id`: `uuid` PRIMARY KEY DEFAULT gen_random_uuid()
- `workspace_id`: `uuid` REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL
- `user_id`: `uuid` REFERENCES users(id) ON DELETE SET NULL
- `action`: `varchar(100)` NOT NULL
- `entity_type`: `varchar(100)` NOT NULL
- `entity_id`: `varchar(255)`
- `ip_address`: `varchar(50)`
- `details`: `jsonb` DEFAULT '{}'::jsonb
- `created_at`: `timestamp with time zone` DEFAULT now() NOT NULL

#### `webhook_events`
Idempotent logging of inbound webhook events (Meta, Dodo, Clerk).
- `id`: `uuid` PRIMARY KEY DEFAULT gen_random_uuid()
- `provider`: `varchar(50)` NOT NULL ('meta', 'dodo', 'clerk')
- `event_id`: `varchar(255)` NOT NULL
- `event_type`: `varchar(100)` NOT NULL
- `payload`: `jsonb` NOT NULL
- `processed_at`: `timestamp with time zone`
- `status`: `varchar(50)` DEFAULT 'pending' NOT NULL ('pending', 'processed', 'failed')
- `created_at`: `timestamp with time zone` DEFAULT now() NOT NULL
- *Constraints:* UNIQUE (`provider`, `event_id`)
