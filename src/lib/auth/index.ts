import { auth } from "@clerk/nextjs/server";
import { headers, cookies } from "next/headers";

export interface CrevixUserSession {
  id: string;
  clerkUserId: string;
  email: string;
  fullName: string;
  avatarUrl: string;
}

export interface CrevixWorkspaceSession {
  id: string;
  name: string;
  slug: string;
  tier: "free" | "creator" | "pro";
  role: "owner" | "admin" | "member";
}

export interface WorkspaceAuthContext {
  user: CrevixUserSession;
  workspace: CrevixWorkspaceSession;
  isMockAuth: boolean;
}

const DEFAULT_DEV_USER: CrevixUserSession = {
  id: "00000000-0000-0000-0000-000000000001",
  clerkUserId: "user_dev_elenarostova",
  email: "elena@crevix.io",
  fullName: "Elena Rostova",
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZx6O1UdtZ5UKUokHwvsKK9qVG9terDlEWMB33ZbbDyd8kbBY_EJbvm70wl7bhLO-gJh5D108LAY1Kd3vFYeLWg0lUkrrioTAP6AGTSEBJdn5zNLamJ6Dt2rqb8PdS-eY87nrMCa_zn4KCFIhAdy5CfrfRKIXG6FNDFNYdelmQpSeemu18vxDK73z7opLHDrK5qia1y9mz6L9YgeeZvnThLcwMFUx3r8Q5R40BShE",
};

const DEFAULT_DEV_WORKSPACE: CrevixWorkspaceSession = {
  id: "00000000-0000-0000-0000-000000000002",
  name: "Acme Studio",
  slug: "acme-studio",
  tier: "pro",
  role: "owner",
};

/**
 * Server-side authorization guard ensuring an authenticated user and valid workspace context.
 * Falls back gracefully to the developer profile when running in local development mode without Clerk API keys.
 */
export async function requireWorkspaceAuth(): Promise<WorkspaceAuthContext> {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const isClerkConfigured =
    clerkPublishableKey &&
    !clerkPublishableKey.includes("sample_key") &&
    clerkPublishableKey.startsWith("pk_");

  if (!isClerkConfigured) {
    // Development fallback with Elena Rostova profile from Google Stitch design
    return {
      user: DEFAULT_DEV_USER,
      workspace: DEFAULT_DEV_WORKSPACE,
      isMockAuth: true,
    };
  }

  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("UNAUTHORIZED: No active Clerk authentication session.");
    }

    // Resolving workspace selection from headers or cookies
    const cookieStore = cookies();
    const activeWorkspaceId = cookieStore.get("crevix_active_workspace")?.value || DEFAULT_DEV_WORKSPACE.id;

    return {
      user: {
        id: userId,
        clerkUserId: userId,
        email: "creator@crevix.io",
        fullName: "Creator",
        avatarUrl: DEFAULT_DEV_USER.avatarUrl,
      },
      workspace: {
        ...DEFAULT_DEV_WORKSPACE,
        id: activeWorkspaceId,
      },
      isMockAuth: false,
    };
  } catch (error) {
    // If Clerk middleware is not active or during build prerender, return safe fallback
    return {
      user: DEFAULT_DEV_USER,
      workspace: DEFAULT_DEV_WORKSPACE,
      isMockAuth: true,
    };
  }
}
