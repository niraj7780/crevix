import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

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

test("Clerk Infrastructure: Environment Variables & Backend API Connectivity", async (t) => {
  const env = loadEnvLocal();
  const publishableKey = env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const secretKey = env.CLERK_SECRET_KEY || process.env.CLERK_SECRET_KEY;

  await t.test("1. Publishable Key format validation", () => {
    assert.ok(publishableKey, "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY must be present in .env.local");
    assert.ok(
      publishableKey.startsWith("pk_test_") || publishableKey.startsWith("pk_live_"),
      "Publishable key must begin with pk_test_ or pk_live_"
    );
    assert.ok(
      !publishableKey.includes("sample_key"),
      "Publishable key must not be a sample placeholder"
    );
  });

  await t.test("2. Secret Key completeness & mask detection", () => {
    assert.ok(secretKey, "CLERK_SECRET_KEY must be present in .env.local");
    assert.ok(
      !secretKey.includes("…") && !secretKey.includes("..."),
      "CLERK_SECRET_KEY is currently masked with ellipsis (sk_test_W…zZ60). A complete, unmasked key from '+ Insert a new secret key' is required."
    );
    assert.ok(
      secretKey.startsWith("sk_test_") || secretKey.startsWith("sk_live_"),
      "CLERK_SECRET_KEY must begin with sk_test_ or sk_live_"
    );
  });

  await t.test("3. Live Clerk API connection handshake", async () => {
    if (!secretKey || secretKey.includes("…") || secretKey.includes("...")) {
      assert.fail("Skipping live API handshake because secret key is masked.");
    }

    const response = await fetch("https://api.clerk.com/v1/users?limit=1", {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
    });

    assert.equal(
      response.status,
      200,
      `Clerk API rejected secret key with HTTP ${response.status}. Key is invalid or expired.`
    );

    const data = await response.json();
    assert.ok(Array.isArray(data), "Clerk API successfully authenticated and returned user array.");
  });
});
