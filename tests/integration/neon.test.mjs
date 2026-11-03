import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { neon } from "@neondatabase/serverless";

function loadEnvLocal() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, "utf-8");
  const env = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      env[key] = val;
    }
  }
  return env;
}

test("Neon PostgreSQL: Connection String & Database Connectivity", async (t) => {
  const env = loadEnvLocal();
  const dbUrl = env.DATABASE_URL || process.env.DATABASE_URL;

  await t.test("1. DATABASE_URL format and presence check", () => {
    assert.ok(dbUrl, "DATABASE_URL must be configured in .env.local");
    assert.ok(
      dbUrl.startsWith("postgres://") || dbUrl.startsWith("postgresql://"),
      "DATABASE_URL must begin with postgres:// or postgresql://"
    );
    assert.ok(
      !dbUrl.includes("sample-pooler") && !dbUrl.includes("localhost"),
      "DATABASE_URL must not be a sample or localhost placeholder"
    );
    assert.ok(
      dbUrl.includes(".neon.tech"),
      "DATABASE_URL must be a live Neon PostgreSQL connection string (*.neon.tech)"
    );
  });

  const sql = neon(dbUrl);

  // Helper with retries for cold-start serverless compute resumes
  async function queryWithRetry(fn, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await fn();
      } catch (err) {
        if (attempt === retries) throw err;
        await new Promise((r) => setTimeout(r, 1500));
      }
    }
  }

  await t.test("2. Live Neon PostgreSQL handshake (SELECT 1)", async () => {
    const result = await queryWithRetry(() => sql`SELECT 1 as connected, NOW() as server_time;`);

    assert.ok(Array.isArray(result) && result.length > 0, "Database must return query results array");
    assert.equal(result[0].connected, 1, "Handshake query SELECT 1 must return 1");
    assert.ok(result[0].server_time, "Database must return valid server_time");
  });

  await t.test("3. Schema tables introspection check", async () => {
    const tables = await queryWithRetry(() => sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    assert.ok(Array.isArray(tables), "Must return tables list from information_schema");
    assert.ok(tables.length >= 20, `Expected at least 20 application tables, found ${tables.length}`);
  });
});
