"use client";

import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  DollarSign,
  Sparkles,
  TrendingUp,
} from "lucide-react";

interface HeroBannerProps {
  userName: string;
}

export default function HeroBanner({
  userName,
}: HeroBannerProps) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 17
        ? "Good afternoon"
        : "Good evening";

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-violet-950/70 via-slate-950 to-cyan-950/50 p-8 shadow-2xl">
      {/* Background glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
        {/* Left content */}
        <div>
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
            <Sparkles className="h-4 w-4" />
            AI-Powered Career Intelligence
          </div>

          {/* Greeting */}
          <h2 className="text-xl font-medium text-slate-300">
            {greeting},{" "}
            <span className="font-semibold text-white">
              {userName}
            </span>{" "}
            👋
          </h2>

          {/* Main heading */}
          <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Your career intelligence workspace is ready.
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Upload your resume to unlock personalized ATS scoring,
            job matching, skill-gap analysis, and AI-powered career
            recommendations.
          </p>

          {/* CTA */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href="/resume"
              className="group inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-200 hover:bg-violet-500 hover:shadow-violet-500/30"
            >
              <BrainCircuit className="h-5 w-5" />

              Upload Resume

              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/market-intelligence"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-6 py-3.5 font-semibold text-slate-200 transition hover:border-violet-500/50 hover:bg-slate-800"
            >
              Explore Market
            </Link>
          </div>

          {/* Small reassurance */}
          <p className="mt-4 text-xs text-slate-500">
            PDF and DOCX resumes supported
          </p>
        </div>

        {/* Right-side intelligence panel */}
        <div className="hidden lg:block">
          <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 p-5 backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15">
                <BrainCircuit className="h-5 w-5 text-violet-400" />
              </div>

              <div>
                <p className="font-semibold text-white">
                  Unlock your insights
                </p>
                <p className="text-xs text-slate-400">
                  Start with your resume
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <InsightItem
                icon={<TrendingUp className="h-4 w-4" />}
                title="ATS Score"
                description="Resume compatibility"
              />

              <InsightItem
                icon={<BriefcaseBusiness className="h-4 w-4" />}
                title="Job Matches"
                description="Roles that fit your profile"
              />

              <InsightItem
                icon={<DollarSign className="h-4 w-4" />}
                title="Salary Intelligence"
                description="Market-based salary insights"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InsightItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-200">
          {title}
        </p>

        <p className="truncate text-xs text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}