import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function SignUpPage() {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const isClerkActive = clerkKey && !clerkKey.includes("sample_key") && clerkKey.startsWith("pk_");

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-6 selection:bg-primary-fixed selection:text-on-primary-fixed">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center text-on-primary font-headline font-bold text-xl shadow-sm">
              O
            </div>
            <span className="font-headline font-bold text-2xl text-on-surface tracking-tight">Omniflow</span>
          </Link>
          <h1 className="font-headline text-2xl font-bold text-on-surface">Create your workspace</h1>
          <p className="font-body text-xs text-on-surface-variant mt-1">
            Automate your creator workflow from day one.
          </p>
        </div>

        {isClerkActive ? (
          <div className="flex justify-center">
            <SignUp routing="path" path="/signup" signInUrl="/login" />
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-md space-y-6">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-primary-fixed/40 border border-primary-fixed-dim/50 text-on-primary-fixed text-xs font-label">
              <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Development Sandbox Active</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-label text-xs font-semibold text-on-surface mb-1.5">
                  Workspace Name
                </label>
                <input
                  type="text"
                  defaultValue="Acme Studio"
                  readOnly
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low border border-surface-container-high text-xs font-body text-on-surface focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-label text-xs font-semibold text-on-surface mb-1.5">
                  Creator Name
                </label>
                <input
                  type="text"
                  defaultValue="Elena Rostova"
                  readOnly
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low border border-surface-container-high text-xs font-body text-on-surface focus:outline-none"
                />
              </div>

              <Link
                href="/dashboard"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-on-primary font-label text-xs font-semibold hover:bg-primary-container transition-all shadow-sm"
              >
                <span>Launch Acme Studio Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-xs font-label text-on-surface-variant">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
