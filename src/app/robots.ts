import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://crevix.io";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/pricing",
          "/features",
          "/instagram-dm-automation",
          "/ai-content-creation",
          "/social-media-scheduler",
          "/creator-automation",
          "/comparisons",
          "/blog",
          "/blog/*",
        ],
        disallow: [
          "/dashboard",
          "/dashboard/*",
          "/api/*",
          "/login",
          "/signup",
        ],
      },
      // Explicit AI search crawlers permissions for AEO & GEO discovery
      {
        userAgent: [
          "OAI-SearchBot",
          "GPTBot",
          "PerplexityBot",
          "ClaudeBot",
          "Google-Extended",
          "Bingbot",
          "Applebot",
        ],
        allow: [
          "/",
          "/pricing",
          "/features",
          "/instagram-dm-automation",
          "/ai-content-creation",
          "/social-media-scheduler",
          "/creator-automation",
          "/comparisons",
          "/blog",
          "/blog/*",
        ],
        disallow: [
          "/dashboard/*",
          "/api/*",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
