import { pgTable, uuid, varchar, text, integer, timestamp, uniqueIndex, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { workspaces } from "./users";

export const socialAccounts = pgTable(
  "social_accounts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .references(() => workspaces.id, { onDelete: "cascade" })
      .notNull(),
    platform: varchar("platform", { length: 50 }).notNull(), // 'instagram', 'youtube', 'tiktok'
    platformAccountId: varchar("platform_account_id", { length: 255 }).notNull(),
    username: varchar("username", { length: 255 }).notNull(),
    displayName: varchar("display_name", { length: 255 }),
    profilePictureUrl: text("profile_picture_url"),
    followerCount: integer("follower_count").default(0).notNull(),
    status: varchar("status", { length: 50 }).default("active").notNull(), // 'active', 'expired', 'disconnected'
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("uq_workspace_platform_account").on(table.workspaceId, table.platform, table.platformAccountId),
    index("idx_social_accounts_workspace").on(table.workspaceId),
  ]
);

export const socialTokens = pgTable(
  "social_tokens",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    socialAccountId: uuid("social_account_id")
      .references(() => socialAccounts.id, { onDelete: "cascade" })
      .notNull()
      .unique(),
    accessTokenEncrypted: text("access_token_encrypted").notNull(),
    refreshTokenEncrypted: text("refresh_token_encrypted"),
    tokenIv: varchar("token_iv", { length: 64 }).notNull(),
    tokenTag: varchar("token_tag", { length: 64 }).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    scopes: text("scopes").array(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  }
);

export const socialAccountsRelations = relations(socialAccounts, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [socialAccounts.workspaceId],
    references: [workspaces.id],
  }),
  tokens: one(socialTokens, {
    fields: [socialAccounts.id],
    references: [socialTokens.socialAccountId],
  }),
}));
