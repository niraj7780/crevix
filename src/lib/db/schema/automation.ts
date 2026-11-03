import { pgTable, uuid, varchar, text, boolean, integer, timestamp, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { workspaces } from "./users";
import { socialAccounts } from "./social";

export const automationRules = pgTable(
  "automation_rules",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .references(() => workspaces.id, { onDelete: "cascade" })
      .notNull(),
    socialAccountId: uuid("social_account_id")
      .references(() => socialAccounts.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    triggerType: varchar("trigger_type", { length: 50 }).notNull(), // 'instagram_comment', 'scheduled_cron', 'new_lead'
    targetPostId: varchar("target_post_id", { length: 255 }), // null = all posts
    keywords: text("keywords").array(),
    matchType: varchar("match_type", { length: 50 }).default("contains").notNull(), // 'exact', 'contains', 'regex'
    publicReplyEnabled: boolean("public_reply_enabled").default(false).notNull(),
    publicReplyTemplates: text("public_reply_templates").array(),
    dmMessageTemplate: text("dm_message_template").notNull(),
    flowGraphJson: text("flow_graph_json"),
    totalExecutions: integer("total_executions").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_automation_rules_workspace").on(table.workspaceId),
  ]
);

export const automationTriggers = pgTable("automation_triggers", {
  id: uuid("id").defaultRandom().primaryKey(),
  automationRuleId: uuid("automation_rule_id")
    .references(() => automationRules.id, { onDelete: "cascade" })
    .notNull(),
  eventType: varchar("event_type", { length: 100 }).notNull(),
  conditions: text("conditions").default("{}").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const automationExecutions = pgTable(
  "automation_executions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .references(() => workspaces.id, { onDelete: "cascade" })
      .notNull(),
    automationRuleId: uuid("automation_rule_id")
      .references(() => automationRules.id, { onDelete: "cascade" })
      .notNull(),
    triggerEventId: varchar("trigger_event_id", { length: 255 }).notNull(),
    triggerUserId: varchar("trigger_user_id", { length: 255 }),
    triggerUsername: varchar("trigger_username", { length: 255 }),
    triggerText: text("trigger_text"),
    status: varchar("status", { length: 50 }).notNull(), // 'success', 'failed', 'skipped'
    actionTaken: text("action_taken"),
    errorMessage: text("error_message"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_automation_executions_workspace").on(table.workspaceId, table.createdAt),
  ]
);

export const automationRulesRelations = relations(automationRules, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [automationRules.workspaceId],
    references: [workspaces.id],
  }),
  executions: many(automationExecutions),
}));
