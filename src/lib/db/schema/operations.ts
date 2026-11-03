import { pgTable, uuid, varchar, text, integer, timestamp, date, numeric, boolean, uniqueIndex, index } from "drizzle-orm/pg-core";
import { workspaces, users } from "./users";
import { socialAccounts } from "./social";

export const researchReports = pgTable(
  "research_reports",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .references(() => workspaces.id, { onDelete: "cascade" })
      .notNull(),
    topic: varchar("topic", { length: 255 }).notNull(),
    niche: varchar("niche", { length: 100 }).notNull(),
    targetAudience: text("target_audience"),
    summary: text("summary").notNull(),
    hooks: text("hooks").default("[]").notNull(), // JSON stringified array of hooks
    contentAngles: text("content_angles").default("[]").notNull(), // JSON stringified array
    outline: text("outline"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_research_workspace").on(table.workspaceId, table.createdAt),
  ]
);

export const analyticsSnapshots = pgTable(
  "analytics_snapshots",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .references(() => workspaces.id, { onDelete: "cascade" })
      .notNull(),
    socialAccountId: uuid("social_account_id")
      .references(() => socialAccounts.id, { onDelete: "cascade" }),
    date: date("date").notNull(),
    impressions: integer("impressions").default(0).notNull(),
    reach: integer("reach").default(0).notNull(),
    engagementRate: numeric("engagement_rate", { precision: 5, scale: 2 }).default("0.00").notNull(),
    followersCount: integer("followers_count").default(0).notNull(),
    profileVisits: integer("profile_visits").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("uq_analytics_snapshot").on(table.workspaceId, table.socialAccountId, table.date),
  ]
);

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .references(() => workspaces.id, { onDelete: "cascade" })
      .notNull(),
    dodoSubscriptionId: varchar("dodo_subscription_id", { length: 255 }).notNull().unique(),
    dodoCustomerId: varchar("dodo_customer_id", { length: 255 }).notNull(),
    planTier: varchar("plan_tier", { length: 50 }).notNull(), // 'creator', 'pro'
    status: varchar("status", { length: 50 }).notNull(), // 'active', 'past_due', 'cancelled'
    currentPeriodStart: timestamp("current_period_start", { withTimezone: true }).notNull(),
    currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }).notNull(),
    cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  }
);

export const usageRecords = pgTable(
  "usage_records",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .references(() => workspaces.id, { onDelete: "cascade" })
      .notNull(),
    billingPeriod: varchar("billing_period", { length: 7 }).notNull(), // 'YYYY-MM'
    postsScheduledCount: integer("posts_scheduled_count").default(0).notNull(),
    aiResearchReportsCount: integer("ai_research_reports_count").default(0).notNull(),
    automationExecutionsCount: integer("automation_executions_count").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("uq_workspace_billing_period").on(table.workspaceId, table.billingPeriod),
  ]
);

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .references(() => workspaces.id, { onDelete: "cascade" })
      .notNull(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    action: varchar("action", { length: 100 }).notNull(),
    entityType: varchar("entity_type", { length: 100 }).notNull(),
    entityId: varchar("entity_id", { length: 255 }),
    ipAddress: varchar("ip_address", { length: 50 }),
    details: text("details").default("{}"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  }
);

export const webhookEvents = pgTable(
  "webhook_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    provider: varchar("provider", { length: 50 }).notNull(), // 'meta', 'dodo', 'clerk'
    eventId: varchar("event_id", { length: 255 }).notNull(),
    eventType: varchar("event_type", { length: 100 }).notNull(),
    payload: text("payload").notNull(),
    status: varchar("status", { length: 50 }).default("pending").notNull(), // 'pending', 'processed', 'failed'
    processedAt: timestamp("processed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("uq_provider_event").on(table.provider, table.eventId),
  ]
);
