import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

function createDbClient() {
  if (!connectionString || connectionString.includes("sample-pooler") || connectionString.includes("localhost")) {
    // Development or mock database placeholder if DATABASE_URL is not yet provisioned
    try {
      const sql = neon(connectionString || "postgresql://mock:mock@localhost:5432/mock");
      return drizzle(sql, { schema });
    } catch {
      // In-memory/fallback mode for zero-config offline start
      const sql = neon("postgresql://mock:mock@localhost:5432/mock");
      return drizzle(sql, { schema });
    }
  }

  const sql = neon(connectionString);
  return drizzle(sql, { schema });
}

export const db = createDbClient();
export type Database = typeof db;
