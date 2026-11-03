import { pgTable, uuid, varchar, text, bigint, timestamp, integer, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { workspaces } from "./users";
import { socialAccounts } from "./social";

export const mediaAssets = pgTable(
  "media_assets",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .references(() => workspaces.id, { onDelete: "cascade" })
      .notNull(),
    fileName: varchar("file_name", { length: 255 }).notNull(),
    fileKey: text("file_key").notNull(),
    publicUrl: text("public_url").notNull(),
    mimeType: varchar("mime_type", { length: 100 }).notNull(),
    fileSizeBytes: bigint("file_size_bytes", { mode: "number" }).notNull(),
    mediaType: varchar("media_type", { length: 50 }).notNull(), // 'image', 'video'
    metadata: text("metadata").default("{}"), // width, height, duration
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_media_assets_workspace").on(table.workspaceId, table.createdAt),
  ]
);

export const contentPosts = pgTable(
  "content_posts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .references(() => workspaces.id, { onDelete: "cascade" })
      .notNull(),
    socialAccountId: uuid("social_account_id")
      .references(() => socialAccounts.id, { onDelete: "set null" }),
    postType: varchar("post_type", { length: 50 }).notNull(), // 'reel', 'carousel', 'single_image', 'story'
    title: varchar("title", { length: 255 }),
    caption: text("caption"),
    hashtags: text("hashtags").array(),
    mediaAssetIds: uuid("media_asset_ids").array(),
    status: varchar("status", { length: 50 }).default("draft").notNull(), // 'draft', 'scheduled', 'publishing', 'published', 'failed'
    scheduledAt: timestamp("scheduled_at", { withTimezone: true }),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    externalPostId: varchar("external_post_id", { length: 255 }),
    externalPermalink: text("external_permalink"),
    errorMessage: text("error_message"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_content_posts_workspace_status").on(table.workspaceId, table.status),
    index("idx_content_posts_scheduled").on(table.scheduledAt),
  ]
);

export const publishingJobs = pgTable(
  "publishing_jobs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .references(() => workspaces.id, { onDelete: "cascade" })
      .notNull(),
    contentPostId: uuid("content_post_id")
      .references(() => contentPosts.id, { onDelete: "cascade" })
      .notNull(),
    idempotencyKey: varchar("idempotency_key", { length: 255 }).notNull().unique(),
    status: varchar("status", { length: 50 }).default("pending").notNull(), // 'pending', 'processing', 'completed', 'failed'
    runAt: timestamp("run_at", { withTimezone: true }).notNull(),
    attempts: integer("attempts").default(0).notNull(),
    maxAttempts: integer("max_attempts").default(3).notNull(),
    lastError: text("last_error"),
    lockedAt: timestamp("locked_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_publishing_jobs_run").on(table.status, table.runAt),
  ]
);

export const contentPostsRelations = relations(contentPosts, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [contentPosts.workspaceId],
    references: [workspaces.id],
  }),
  socialAccount: one(socialAccounts, {
    fields: [contentPosts.socialAccountId],
    references: [socialAccounts.id],
  }),
}));
