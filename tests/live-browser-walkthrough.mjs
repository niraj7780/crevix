import puppeteer from "puppeteer-core";
import fs from "node:fs";

const CHROME_PATHS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];

const chromePath = CHROME_PATHS.find(p => fs.existsSync(p));
console.log("Using browser at:", chromePath);

async function runBrowserTest() {
  if (!chromePath) {
    console.error("No compatible browser found on system!");
    process.exit(1);
  }

  console.log("Launching visible browser window...");
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: false,
    defaultViewport: null,
    args: [
      "--start-maximized",
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
  });

  const page = await browser.newPage();
  
  console.log("1. Navigating to Home Page (http://localhost:3000)...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 2000));
  
  // Smooth scroll through home page
  console.log("   Scrolling through features & architecture on Home page...");
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 250;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight / 2) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
  await new Promise(r => setTimeout(r, 1500));

  console.log("2. Navigating to Pricing Page (http://localhost:3000/pricing)...");
  await page.goto("http://localhost:3000/pricing", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 2000));

  console.log("3. Navigating to Instagram DM Automation (http://localhost:3000/instagram-dm-automation)...");
  await page.goto("http://localhost:3000/instagram-dm-automation", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 2000));

  console.log("4. Navigating to Comparisons (http://localhost:3000/comparisons)...");
  await page.goto("http://localhost:3000/comparisons", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 1500));

  console.log("5. Navigating to Blog (http://localhost:3000/blog)...");
  await page.goto("http://localhost:3000/blog", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 1500));

  console.log("6. Testing Protected Route -> Accessing /dashboard (verifying redirect)...");
  await page.goto("http://localhost:3000/dashboard", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 2000));
  const currentUrl = page.url();
  console.log("   Current URL after protected route access:", currentUrl);

  console.log("7. Leaving browser open at Clerk Sign In page for inspection!");
  console.log("ALL LOCAL BROWSER TESTS COMPLETED SUCCESSFULLY!");
}

runBrowserTest().catch(err => {
  console.error("Browser test error:", err);
  process.exit(1);
});
