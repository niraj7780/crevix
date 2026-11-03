import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { OrganizationJsonLd, SoftwareAppJsonLd } from "@/components/seo/JsonLd";

export const viewport: Viewport = {
  themeColor: "#094cb2",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://crevix.io"),
  title: {
    default: "Crevix — The Complete AI Creator Operating System",
    template: "%s | Crevix",
  },
  description: "All-in-one creator OS. Automate Instagram comment-to-DM funnels, research viral scripts, schedule posts, and capture leads in one unified dashboard.",
  keywords: [
    "Instagram Comment to DM Automation",
    "Creator Operating System",
    "AI Reel Scripts",
    "Social Media Scheduler",
    "Creator CRM",
    "Meta Graph API Automation",
    "Short Form Video Retention",
    "Crevix",
  ],
  authors: [{ name: "Crevix Inc." }],
  creator: "Crevix",
  publisher: "Crevix",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://crevix.io",
    siteName: "Crevix",
    title: "Crevix — The Complete AI Creator Operating System",
    description: "Automate Instagram comment-to-DM, AI scriptwriting, scheduling, and CRM for ₹199/month with a 30-day free trial.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crevix — The Complete AI Creator Operating System",
    description: "Automate Instagram comment-to-DM, AI scriptwriting, scheduling, and CRM for ₹199/month.",
    creator: "@crevix",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const isClerkActive = clerkKey && !clerkKey.includes("sample_key") && clerkKey.startsWith("pk_");

  const content = (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600&family=Public+Sans:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <OrganizationJsonLd />
        <SoftwareAppJsonLd
          name="Crevix All Access"
          price="199"
          priceCurrency="INR"
          trialPeriodDays={30}
        />
      </head>
      <body className="bg-surface text-on-surface antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
        {children}
      </body>
    </html>
  );

  if (isClerkActive) {
    return <ClerkProvider>{content}</ClerkProvider>;
  }

  return content;
}
