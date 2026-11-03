import { pgTable, uuid, varchar, text, integer, timestamp, uniqueIndex, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { workspaces } from "./users";
import { socialAccounts } from "./social";
import { automationRules } from "./automation";

export const conversations = pgTable(
  "conversations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .references(() => workspaces.id, { onDelete: "cascade" })
      .notNull(),
    socialAccountId: uuid("social_account_id")
      .references(() => socialAccounts.id, { onDelete: "cascade" })
      .notNull(),
    externalThreadId: varchar("external_thread_id", { length: 255 }).notNull(),
    participantId: varchar("participant_id", { length: 255 }).notNull(),
    participantUsername: varchar("participant_username", { length: 255 }).notNull(),
    participantAvatar: text("participant_avatar"),
    lastMessageText: text("last_message_text"),
    lastMessageAt: timestamp("last_message_at", { withTimezone: true }),
    unreadCount: integer("unread_count").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("uq_workspace_thread").on(table.workspaceId, table.socialAccountId, table.externalThreadId),
    index("idx_conversations_workspace").on(table.workspaceId),
  ]
);

export const messages = pgTable(
  "messages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    conversationId: uuid("conversation_id")
      .references(() => conversations.id, { onDelete: "cascade" })
      .notNull(),
    senderType: varchar("sender_type", { length: 50 }).notNull(), // 'creator', 'contact', 'automation'
    externalMessageId: varchar("external_message_id", { length: 255 }),
    messageText: text("message_text").notNull(),
    mediaUrls: text("media_urls").array(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_messages_conversation").on(table.conversationId, table.createdAt),
  ]
);

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .references(() => workspaces.id, { onDelete: "cascade" })
      .notNull(),
    fullName: varchar("full_name", { length: 255 }),
    socialHandle: varchar("social_handle", { length: 255 }),
    platform: varchar("platform", { length: 50 }).default("instagram").notNull(),
    email: varchar("email", { length: 255 }),
    phone: varchar("phone", { length: 50 }),
    stage: varchar("stage", { length: 50 }).default("new").notNull(), // 'new', 'engaged', 'qualified', 'customer', 'churned'
    sourceAutomationId: uuid("source_automation_id")
      .references(() => automationRules.id, { onDelete: "set null" }),
    tags: text("tags").array(),
    notes: text("notes"),
    lifetimeValueCents: integer("lifetime_value_cents").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_leads_workspace_stage").on(table.workspaceId, table.stage),
  ]
);

export const conversationsRelations = relations(conversations, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [conversations.workspaceId],
    references: [workspaces.id],
  }),
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
}));
