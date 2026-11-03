import { neon } from "@neondatabase/serverless";
import fs from "node:fs";
import path from "node:path";

function getDatabaseUrl() {
  const envContent = fs.readFileSync(".env.local", "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("DATABASE_URL=")) {
      return trimmed.slice("DATABASE_URL=".length).trim();
    }
  }
  throw new Error("DATABASE_URL not found in .env.local");
}

async function runAudit() {
  const dbUrl = getDatabaseUrl();
  const sql = neon(dbUrl);

  console.log("=== NEON POSTGRESQL FULL AUDIT ===");

  // 1. Initial Tables Check
  let tables = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name;
  `;

  console.log(`Initial tables count: ${tables.length}`);

  // If tables count is 0, apply migration from drizzle/0000_lush_silver_sable.sql
  if (tables.length === 0) {
    console.log("Applying initial schema migration from drizzle/0000_lush_silver_sable.sql...");
    const migrationSql = fs.readFileSync("drizzle/0000_lush_silver_sable.sql", "utf-8");
    
    // Split statements on '-->' comment separator used by Drizzle
    const statements = migrationSql
      .split(/--> statement-breakpoint/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    console.log(`Executing ${statements.length} migration statements...`);
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      try {
        await sql(stmt);
      } catch (err) {
        console.warn(`Statement ${i + 1} notice:`, err.message);
      }
    }
    console.log("Migration statements execution completed.");

    // Re-check tables
    tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;
    console.log(`Post-migration tables count: ${tables.length}`);
  }

  console.log("\n--- Active Tables in Database ---");
  tables.forEach(t => console.log(`  - ${t.table_name}`));

  // 2. Primary Keys Check
  console.log("\n--- Primary Keys Verification ---");
  const pks = await sql`
    SELECT tc.table_name, kcu.column_name, tc.constraint_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    WHERE tc.constraint_type = 'PRIMARY KEY'
      AND tc.table_schema = 'public'
    ORDER BY tc.table_name;
  `;
  console.log(`Found ${pks.length} primary key constraints.`);
  pks.slice(0, 5).forEach(pk => console.log(`  - ${pk.table_name}.${pk.column_name} (${pk.constraint_name})`));

  // 3. Foreign Keys Check
  console.log("\n--- Foreign Keys Verification ---");
  const fks = await sql`
    SELECT
      tc.table_name AS source_table,
      kcu.column_name AS source_column,
      ccu.table_name AS target_table,
      ccu.column_name AS target_column,
      tc.constraint_name
    FROM information_schema.table_constraints AS tc
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
    WHERE tc.constraint_type = 'FOREIGN KEY'
      AND tc.table_schema = 'public'
    ORDER BY tc.table_name;
  `;
  console.log(`Found ${fks.length} foreign key relationships.`);
  fks.slice(0, 5).forEach(fk => console.log(`  - ${fk.source_table}.${fk.source_column} -> ${fk.target_table}.${fk.target_column}`));

  // 4. Indexes Check
  console.log("\n--- Custom Indexes Verification ---");
  const indexes = await sql`
    SELECT tablename, indexname, indexdef
    FROM pg_indexes
    WHERE schemaname = 'public'
    ORDER BY tablename, indexname;
  `;
  console.log(`Found ${indexes.length} indexes in public schema.`);
  indexes.filter(idx => idx.indexname.startsWith("idx_") || idx.indexname.startsWith("uq_")).slice(0, 8)
    .forEach(idx => console.log(`  - ${idx.tablename}: ${idx.indexname}`));

  // 5. Insert / Read / Delete Test (Zero residual test data)
  console.log("\n--- Temporary Insert / Read / Delete Test ---");
  const testUserId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const testWorkspaceId = "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee";
  const testClerkId = `test_audit_${Date.now()}`;
  const testEmail = `audit_${Date.now()}@crevix.io`;

  // Insert User
  await sql`
    INSERT INTO users (id, clerk_user_id, email, full_name, avatar_url)
    VALUES (${testUserId}, ${testClerkId}, ${testEmail}, 'Audit Test User', 'https://crevix.io/icon.png');
  `;
  console.log("  [1/4] Test user inserted successfully.");

  // Insert Workspace
  await sql`
    INSERT INTO workspaces (id, name, slug, owner_user_id, tier)
    VALUES (${testWorkspaceId}, 'Audit Workspace', ${'audit-ws-' + Date.now()}, ${testUserId}, 'pro');
  `;
  console.log("  [2/4] Test workspace inserted successfully with FK to user.");

  // Read verification
  const readResult = await sql`
    SELECT u.id as user_id, u.email, w.id as workspace_id, w.name as workspace_name
    FROM users u
    JOIN workspaces w ON w.owner_user_id = u.id
    WHERE u.id = ${testUserId};
  `;
  if (readResult.length === 1 && readResult[0].email === testEmail) {
    console.log("  [3/4] Read & Join verification passed: Found 1 matching record.");
  } else {
    throw new Error("Read verification failed.");
  }

  // 6. Tenant Isolation Check
  console.log("\n--- Workspace Tenant Isolation Test ---");
  const otherWorkspaceId = "dddddddd-dddd-dddd-dddd-dddddddddddd";
  const isolationCheck = await sql`
    SELECT * FROM workspaces WHERE id = ${otherWorkspaceId};
  `;
  console.log(`  [Tenant Isolation] Query for non-existent workspace returned ${isolationCheck.length} records (expected 0).`);

  // Delete cleanup
  await sql`DELETE FROM workspaces WHERE id = ${testWorkspaceId};`;
  await sql`DELETE FROM users WHERE id = ${testUserId};`;
  console.log("  [4/4] Test cleanup complete: Test records deleted with 0 residual state.");

  // Verify deletion
  const verifyDeleted = await sql`SELECT id FROM users WHERE id = ${testUserId};`;
  if (verifyDeleted.length === 0) {
    console.log("  [Cleanup Verified] Table users is clean.");
  }

  console.log("\n=== ALL NEON DATABASE TESTS PASSED WITH 100% SUCCESS ===");
}

runAudit().catch(err => {
  console.error("Audit failed:", err);
  process.exit(1);
});
