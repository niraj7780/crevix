import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware((auth, req) => {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const secretKey = process.env.CLERK_SECRET_KEY;
  const isClerkActive =
    clerkKey &&
    !clerkKey.includes("sample_key") &&
    clerkKey.startsWith("pk_") &&
    secretKey &&
    !secretKey.includes("sample_key") &&
    secretKey.startsWith("sk_");

  if (isProtectedRoute(req)) {
    if (process.env.NODE_ENV === "production" && !isClerkActive) {
      // In production, unconfigured authentication must redirect to login with no bypass
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    if (isClerkActive) {
      auth().protect();
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
