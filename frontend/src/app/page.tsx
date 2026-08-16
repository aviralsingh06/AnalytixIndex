"use client";

import { AppLayout } from "@/components/layout";
import { DashboardGrid } from "@/components/dashboard";
import { useAuth } from "@/context/AuthContext";

export default function Page() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-violet-500" />

          <p className="text-sm text-slate-400">
            Checking authentication...
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl">
          <h1 className="text-3xl font-bold text-white">
            AI Job Market Intelligence
          </h1>

          <p className="mt-3 text-slate-400">
            Sign in or create an account to access your personalized career
            intelligence dashboard.
          </p>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("open-auth", {
                    detail: { mode: "login" },
                  })
                );
              }}
              className="flex-1 rounded-xl bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-500"
            >
              Login
            </button>

            <button
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("open-auth", {
                    detail: { mode: "register" },
                  })
                );
              }}
              className="flex-1 rounded-xl border border-slate-700 px-4 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Register
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <AppLayout>
      <DashboardGrid />
    </AppLayout>
  );
}