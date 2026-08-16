"use client";

import {
  Briefcase,
  IndianRupee,
  FileText,
  Target,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

import StatsCard from "./StatsCard";
import { SalaryChart } from "./SalaryChart";
import { HiringTrendChart } from "./HiringTrendChart";
import { SkillsChart } from "./SkillsChart";
import RecentActivity from "./RecentActivity";
import QuickActions from "./QuickActions";
import HeroBanner from "./HeroBanner";

export default function DashboardGrid() {
  const { user, isLoading } = useAuth();

  // Prevent the dashboard from rendering with fake/default data
  // while authentication is being checked.
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-violet-500" />
          <p className="text-sm text-slate-400">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // User should normally never be null here because the dashboard
  // will be protected by page.tsx.
  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8">

      {/* Personalized Welcome */}
      <HeroBanner userName={user.full_name} />

      {/* Stats */}
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <StatsCard
          title="ATS Score"
          value="--"
          subtitle="Upload a resume to analyze"
          icon={<Target className="h-7 w-7" />}
          trend=""
        />

        <StatsCard
          title="Job Matches"
          value="0"
          subtitle="Upload a resume to get matches"
          icon={<Briefcase className="h-7 w-7" />}
          trend=""
        />

        <StatsCard
          title="Average Salary"
          value="--"
          subtitle="Select a target role"
          icon={<IndianRupee className="h-7 w-7" />}
          trend=""
        />

        <StatsCard
          title="Resume Analyses"
          value="0"
          subtitle="No resume analysis yet"
          icon={<FileText className="h-7 w-7" />}
          trend=""
        />

      </section>

      {/* Charts */}
      <section className="grid gap-6 lg:grid-cols-2">
        <SalaryChart />
        <HiringTrendChart />
      </section>

      {/* Analytics */}
      <section className="grid gap-6 lg:grid-cols-2">
        <SkillsChart />
        <RecentActivity />
      </section>

      {/* Actions */}
      <QuickActions />

    </div>
  );
}