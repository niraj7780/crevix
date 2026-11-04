// Comprehensive Route-by-Route Browser & Endpoint Audit for Crevix
import http from "node:http";

const BASE_URL = "http://localhost:3000";

const routesToTest = [
  // 1. Core Public Marketing Pages (Must return HTTP 200 with matching brand content)
  { path: "/", expectedStatus: [200], name: "Home Landing Page", match: "Crevix" },
  { path: "/features", expectedStatus: [200], name: "Features Overview", match: "Features" },
  { path: "/pricing", expectedStatus: [200], name: "Pricing Page", match: "199" },
  { path: "/comparisons", expectedStatus: [200], name: "SaaS Comparisons", match: "Crevix" },
  { path: "/ai-content-creation", expectedStatus: [200], name: "AI Content Studio", match: "Content" },
  { path: "/instagram-dm-automation", expectedStatus: [200], name: "Instagram DM Automation", match: "Instagram" },
  { path: "/social-media-scheduler", expectedStatus: [200], name: "Social Media Scheduler", match: "Scheduler" },
  { path: "/creator-automation", expectedStatus: [200], name: "Creator Automation", match: "Automation" },
  
  // 2. SEO & Editorial (Must return HTTP 200 with article content)
  { path: "/blog", expectedStatus: [200], name: "Blog Index", match: "Blog" },
  { path: "/blog/instagram-comment-to-dm-automation-guide-2026", expectedStatus: [200], name: "Blog Post: Instagram Comment to DM", match: "Instagram" },
  { path: "/blog/ai-reel-scriptwriting-viral-hooks", expectedStatus: [200], name: "Blog Post: Viral Hooks", match: "Hooks" },
  { path: "/blog/why-unified-creator-os-beats-multiple-saas-subscriptions", expectedStatus: [200], name: "Blog Post: Unified OS", match: "Crevix" },
  { path: "/robots.txt", expectedStatus: [200], name: "Robots.txt", match: "User-agent" },
  { path: "/sitemap.xml", expectedStatus: [200], name: "Sitemap XML", match: "xml" },

  // 3. Authentication (Must return HTTP 200 rendering Clerk Auth UI)
  { path: "/login", expectedStatus: [200], name: "Clerk Sign In Page", match: "clerk" },
  { path: "/signup", expectedStatus: [200], name: "Clerk Sign Up Page", match: "clerk" },

  // 4. Protected Dashboard Routes (Zero-Trust: Unauthenticated requests MUST return 307 redirecting to /login)
  { path: "/dashboard", expectedStatus: [307], expectedLocation: "/login?redirect_url=%2Fdashboard", name: "Dashboard Overview" },
  { path: "/dashboard/content", expectedStatus: [307], expectedLocation: "/login?redirect_url=%2Fdashboard%2Fcontent", name: "Content Studio" },
  { path: "/dashboard/content/new", expectedStatus: [307], expectedLocation: "/login?redirect_url=%2Fdashboard%2Fcontent%2Fnew", name: "Content Script Creator" },
  { path: "/dashboard/automation", expectedStatus: [307], expectedLocation: "/login?redirect_url=%2Fdashboard%2Fautomation", name: "Automation Center" },
  { path: "/dashboard/automation/builder", expectedStatus: [307], expectedLocation: "/login?redirect_url=%2Fdashboard%2Fautomation%2Fbuilder", name: "Visual Flow Builder" },
  { path: "/dashboard/calendar", expectedStatus: [307], expectedLocation: "/login?redirect_url=%2Fdashboard%2Fcalendar", name: "Content Calendar" },
  { path: "/dashboard/inbox", expectedStatus: [307], expectedLocation: "/login?redirect_url=%2Fdashboard%2Finbox", name: "Unified Inbox" },
  { path: "/dashboard/leads", expectedStatus: [307], expectedLocation: "/login?redirect_url=%2Fdashboard%2Fleads", name: "Leads CRM" },
  { path: "/dashboard/media", expectedStatus: [307], expectedLocation: "/login?redirect_url=%2Fdashboard%2Fmedia", name: "Media Assets Library" },
  { path: "/dashboard/publishing", expectedStatus: [307], expectedLocation: "/login?redirect_url=%2Fdashboard%2Fpublishing", name: "Publishing Queue" },
  { path: "/dashboard/research", expectedStatus: [307], expectedLocation: "/login?redirect_url=%2Fdashboard%2Fresearch", name: "Research & Trends" },
  { path: "/dashboard/analytics", expectedStatus: [307], expectedLocation: "/login?redirect_url=%2Fdashboard%2Fanalytics", name: "Analytics Dashboard" },
  { path: "/dashboard/accounts", expectedStatus: [307], expectedLocation: "/login?redirect_url=%2Fdashboard%2Faccounts", name: "Connected Accounts" },
  { path: "/dashboard/billing", expectedStatus: [307], expectedLocation: "/login?redirect_url=%2Fdashboard%2Fbilling", name: "Billing & Subscription" },
  { path: "/dashboard/settings", expectedStatus: [307], expectedLocation: "/login?redirect_url=%2Fdashboard%2Fsettings", name: "Workspace Settings" },

  // 5. API Endpoints
  { 
    path: "/api/webhooks/meta?hub.mode=subscribe&hub.verify_token=crevix_meta_verify_token_sample&hub.challenge=test_challenge_code", 
    expectedStatus: [200, 403], 
    name: "Meta Webhook Verification Handshake" 
  },
  { 
    path: "/api/publishing/run", 
    expectedStatus: [200, 401, 405], 
    name: "Publishing Worker Dispatch API (POST required)" 
  },
];

async function fetchRoute(route) {
  const start = Date.now();
  return new Promise((resolve) => {
    http.get(`${BASE_URL}${route.path}`, (res) => {
      let body = "";
      res.on("data", chunk => body += chunk);
      res.on("end", () => {
        const duration = Date.now() - start;
        const statusMatch = route.expectedStatus.includes(res.statusCode);
        const contentMatch = !route.match || body.toLowerCase().includes(route.match.toLowerCase());
        const locationMatch = !route.expectedLocation || res.headers.location === route.expectedLocation;
        const passed = statusMatch && contentMatch && locationMatch;
        resolve({
          name: route.name,
          path: route.path,
          statusCode: res.statusCode,
          location: res.headers.location,
          duration,
          passed,
          contentMatch,
          locationMatch,
        });
      });
    }).on("error", (err) => {
      resolve({
        name: route.name,
        path: route.path,
        statusCode: 0,
        duration: Date.now() - start,
        passed: false,
        error: err.message
      });
    });
  });
}

async function runAudit() {
  console.log("======================================================================");
  console.log("   CREVIX — LIVE ROUTE-BY-ROUTE VERIFICATION AUDIT");
  console.log("   Server: " + BASE_URL);
  console.log("======================================================================");

  let passedCount = 0;
  let failedCount = 0;

  for (const route of routesToTest) {
    const result = await fetchRoute(route);
    if (result.passed) {
      passedCount++;
      const detail = result.location ? `-> ${result.location}` : "";
      console.log(`[PASS] ${result.statusCode} | ${result.duration.toString().padStart(4, " ")}ms | ${result.name} ${detail}`);
    } else {
      failedCount++;
      console.log(`[FAIL] ${result.statusCode} | ${result.duration.toString().padStart(4, " ")}ms | ${result.name} (${result.path})`);
      if (result.error) console.log(`       Error: ${result.error}`);
      if (!result.contentMatch) console.log(`       Content mismatch: Expected substring "${route.match}"`);
      if (!result.locationMatch) console.log(`       Location mismatch: Expected "${route.expectedLocation}", got "${result.location}"`);
    }
  }

  console.log("======================================================================");
  console.log(`AUDIT RESULT: ${passedCount} PASSED / ${failedCount} FAILED (${routesToTest.length} total routes audited)`);
  console.log("======================================================================");

  if (failedCount > 0) {
    process.exit(1);
  }
}

runAudit();
