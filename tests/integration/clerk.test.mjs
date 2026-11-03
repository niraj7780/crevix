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

test("Clerk Infrastructure: Environment Variables, Live API & Route Protection", async (t) => {
  const env = loadEnvLocal();
  const publishableKey = env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const secretKey = env.CLERK_SECRET_KEY || process.env.CLERK_SECRET_KEY;

  await t.test("1. Publishable Key format and frontend instance extraction", () => {
    assert.ok(publishableKey, "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY must be present in .env.local");
    assert.ok(
      publishableKey.startsWith("pk_test_") || publishableKey.startsWith("pk_live_"),
      "Publishable key must begin with pk_test_ or pk_live_"
    );
    assert.ok(!publishableKey.includes("sample_key"), "Publishable key must not be a sample placeholder");

    // Decode base64 suffix to extract instance domain
    const b64Part = publishableKey.split("_")[2];
    const decoded = Buffer.from(b64Part, "base64").toString("utf-8");
    assert.ok(
      decoded.includes("clerk.accounts.dev") || decoded.includes("clerk"),
      "Decoded frontend API URL must point to valid Clerk domain"
    );
  });

  await t.test("2. Secret Key completeness & format validation", () => {
    assert.ok(secretKey, "CLERK_SECRET_KEY must be present in .env.local");
    assert.ok(
      !secretKey.includes("…") && !secretKey.includes("..."),
      "CLERK_SECRET_KEY must be completely unmasked without ellipsis"
    );
    assert.ok(
      secretKey.startsWith("sk_test_") || secretKey.startsWith("sk_live_"),
      "CLERK_SECRET_KEY must begin with sk_test_ or sk_live_"
    );
    assert.ok(
      secretKey.length >= 40,
      `Secret key length (${secretKey.length}) is shorter than standard Clerk secret key length`
    );
  });

  await t.test("3. Live Clerk API connection handshake (200 OK)", async () => {
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
    assert.ok(Array.isArray(data), "Clerk API successfully authenticated and returned response array.");
  });

  await t.test("4. Clerk Frontend JWKS endpoint verification", async () => {
    const b64Part = publishableKey.split("_")[2];
    const instanceHost = Buffer.from(b64Part, "base64").toString("utf-8").replace(/\$$/, "");
    const jwksUrl = `https://${instanceHost}/.well-known/jwks.json`;

    const response = await fetch(jwksUrl);
    assert.equal(
      response.status,
      200,
      `Clerk JWKS endpoint ${jwksUrl} returned HTTP ${response.status}`
    );

    const jwks = await response.json();
    assert.ok(Array.isArray(jwks.keys), "JWKS must contain cryptographic public key array for JWT verification.");
    assert.ok(jwks.keys.length > 0, "JWKS must contain at least one public signing key.");
  });

  await t.test("5. Route & Session Configuration Variables", () => {
    assert.equal(env.NEXT_PUBLIC_CLERK_SIGN_IN_URL, "/login", "Sign-in URL must point to catch-all /login");
    assert.equal(env.NEXT_PUBLIC_CLERK_SIGN_UP_URL, "/signup", "Sign-up URL must point to catch-all /signup");
    assert.equal(env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL, "/dashboard", "After sign-in must redirect to /dashboard");
    assert.equal(env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL, "/dashboard", "After sign-up must redirect to /dashboard");
  });

  await t.test("6. Catch-All Route Files Existence", () => {
    const loginCatchAll = path.resolve(process.cwd(), "src/app/login/[[...rest]]/page.tsx");
    const signupCatchAll = path.resolve(process.cwd(), "src/app/signup/[[...rest]]/page.tsx");
    assert.ok(fs.existsSync(loginCatchAll), "src/app/login/[[...rest]]/page.tsx catch-all must exist on disk");
    assert.ok(fs.existsSync(signupCatchAll), "src/app/signup/[[...rest]]/page.tsx catch-all must exist on disk");
  });
});
