"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error(`Login failed (${response.status}).`);
      }
      const referrer = typeof document !== "undefined" ? document.referrer : "";
      let nextPath = "/dashboard";
      if (referrer) {
        try {
          const referrerUrl = new URL(referrer);
          if (referrerUrl.origin === window.location.origin && referrerUrl.pathname.startsWith("/dashboard")) {
            nextPath = referrerUrl.pathname + referrerUrl.search + referrerUrl.hash;
          }
        } catch {
          // Ignore invalid referrer.
        }
      }
      router.push(nextPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-base-200 text-base-content">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-16">
        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center gap-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">
              HarborGate Property Management
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Sign in to your resident portal
            </h1>
            <p className="text-base text-base-content/80">
              Check maintenance requests, update your profile, and stay on top of
              your lease details.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="badge badge-primary">Maintenance</span>
              <span className="badge badge-secondary">Payments</span>
              <span className="badge badge-accent">Updates</span>
            </div>
          </div>

          <div className="card bg-base-100 text-base-content shadow-2xl">
            <div className="card-body">
              <h2 className="card-title">Resident login</h2>
              <p className="text-sm text-base-content/70">
                Use any email and password for this demo.
              </p>
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div className="form-control">
                  <label className="label" htmlFor="email">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="password">
                    <span className="label-text">Password</span>
                    <span className="label-text-alt text-base-content/60">
                      Forgot password?
                    </span>
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="••••••••"
                    required
                  />
                </div>
                {error ? (
                  <div className="rounded-box border border-error/30 bg-base-200 p-3 text-sm text-error">
                    {error}
                  </div>
                ) : null}
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-3">
                    <input type="checkbox" className="checkbox" />
                    <span className="label-text">Remember this device</span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={submitting}
                >
                  {submitting ? "Signing in..." : "Sign in"}
                </button>
              </form>
              <div className="divider">Need access?</div>
              <button className="btn btn-outline w-full">Contact leasing</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
