"use client";

import type { ReactNode } from "react";

import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  DollarSign,
  Globe2,
  MapPin,
  TrendingUp,
  Wifi,
  Zap,
  Database,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface MarketData {
  total_jobs: number;
  market_growth: string;
  remote_jobs: number;
  onsite_jobs: number;
  hybrid_jobs: number;
  top_skills: Array<{
  skill: string;
  job_count: number;
  }>;
  top_companies: Array<{
    company: string;
    openings: number;
  }>;
  top_locations: Array<{
    location: string;
    openings: number;
  }>;
  salary_insights: Array<{
    role: string;
    average_salary: string;
  }>;
  overall_average_salary: string;
}

const PIE_COLORS = ["#8b5cf6", "#06b6d4", "#10b981"];

function StatCard({
  icon,
  label,
  value,
  description,
  accent,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
  description: string;
  accent: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900">
      <div
        className={`absolute right-0 top-0 h-24 w-24 rounded-full blur-3xl opacity-10 ${accent}`}
      />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700/70 bg-slate-800/70">
            {icon}
          </div>

          <span className="rounded-full border border-slate-700/60 bg-slate-800/50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">
            Market
          </span>
        </div>

        <p className="text-sm text-slate-400">{label}</p>

        <p className="mt-2 text-3xl font-bold tracking-tight text-white">
          {value}
        </p>

        <p className="mt-2 text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/70">
        {icon}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-950/30">
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  );
}

export default function MarketDashboard({
  data,
}: {
  data: MarketData;
}) {
  const totalJobs = Number(data?.total_jobs ?? 0);

  const remoteJobs = Number(data?.remote_jobs ?? 0);
  const onsiteJobs = Number(data?.onsite_jobs ?? 0);
  const hybridJobs = Number(data?.hybrid_jobs ?? 0);

  const totalWorkTypeJobs = remoteJobs + onsiteJobs + hybridJobs;

  const remotePercentage =
    totalWorkTypeJobs > 0
      ? Math.round((remoteJobs / totalWorkTypeJobs) * 100)
      : 0;

  const onsitePercentage =
    totalWorkTypeJobs > 0
      ? Math.round((onsiteJobs / totalWorkTypeJobs) * 100)
      : 0;

  const hybridPercentage =
    totalWorkTypeJobs > 0
      ? Math.round((hybridJobs / totalWorkTypeJobs) * 100)
      : 0;

  const topSkillsData = (data?.top_skills ?? [])
  .map((item: any) => ({
    skill: item?.skill ?? "Unknown Skill",
    count: Number(item?.job_count ?? 0),
  }))
  .filter((item: any) => item.count > 0)
  .sort((a: any, b: any) => b.count - a.count)
  .slice(0, 8);

const topCompaniesData = (data?.top_companies ?? [])
  .map((item: any) => ({
    company: item?.company ?? "Unknown Company",
    count: Number(item?.openings ?? 0),
  }))
  .filter((item: any) => item.company !== "Unknown Company" && item.count > 0)
  .sort((a: any, b: any) => b.count - a.count)
  .slice(0, 6);

const topLocationsData = (data?.top_locations ?? [])
  .slice(0, 6)
  .map((item: any) => ({
    location: item?.location ?? "Unknown Location",
    count: Number(item?.openings ?? 0),
  }));

const salaryData = (data?.salary_insights ?? [])
  .slice(0, 8)
  .map((item: any) => ({
    role: item?.role ?? "Unknown Role",
    average_salary: item?.average_salary ?? "N/A",
  }));

  const topSkill = topSkillsData[0];

  const validLocations = topLocationsData.filter(
    (item) => item.count > 0
  );

  const topLocation = validLocations[0] ?? null;

  const workTypeData = [
    {
      name: "Remote",
      value: remoteJobs,
    },
    {
      name: "Hybrid",
      value: hybridJobs,
    },
    {
      name: "On-site",
      value: onsiteJobs,
    },
  ].filter((item) => item.value > 0);

  const maxCompanyCount = Math.max(
    ...(topCompaniesData.map((item) => item.count) || [1]),
    1
  );

  const maxLocationCount = Math.max(
    ...(validLocations.map((item) => item.count) || [1]),
    1
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) {
      return null;
    }

    return (
      <div className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 shadow-2xl">
        <p className="text-sm font-medium text-white">{label}</p>

        <p className="mt-1 text-xs text-violet-400">
          {Number(payload[0].value).toLocaleString()} jobs
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950/20 p-6">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5">
              <BarChart3 className="h-3.5 w-3.5 text-violet-400" />

              <span className="text-xs font-medium text-violet-300">
                Market Snapshot
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white">
              Data Science Job Market
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              A current snapshot of job demand, hiring locations, work
              preferences, skills, and compensation represented in the
              platform dataset.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Database className="h-4 w-4" />
            <span>{totalJobs.toLocaleString()} job records analyzed</span>
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={
            <BriefcaseBusiness className="h-5 w-5 text-violet-400" />
          }
          label="Jobs Analyzed"
          value={totalJobs.toLocaleString()}
          description="Job records currently available"
          accent="bg-violet-500"
        />

        <StatCard
          icon={<TrendingUp className="h-5 w-5 text-emerald-400" />}
          label="Market Growth"
          value={data?.market_growth || "N/A"}
          description="Reported market growth"
          accent="bg-emerald-500"
        />

        <StatCard
          icon={<DollarSign className="h-5 w-5 text-cyan-400" />}
          label="Average Salary"
          value={data?.overall_average_salary || "N/A"}
          description="Across available market roles"
          accent="bg-cyan-500"
        />

        <StatCard
          icon={<Globe2 className="h-5 w-5 text-amber-400" />}
          label="Remote Share"
          value={`${remotePercentage}%`}
          description={`${remoteJobs.toLocaleString()} remote positions`}
          accent="bg-amber-500"
        />
      </section>

      {/* Key Market Signals */}
      <section className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Most demanded skill
          </p>

          <p className="mt-3 text-xl font-bold text-white">
            {topSkill?.skill || "No data"}
          </p>

          {topSkill && (
            <p className="mt-1 text-xs text-slate-500">
              Appears in {Number(topSkill.count ?? 0).toLocaleString()} job records
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Leading hiring location
          </p>

          <p className="mt-3 flex items-center gap-2 text-xl font-bold text-white">
            <MapPin className="h-5 w-5 text-emerald-400" />
            {topLocation?.location ?? "No data"}
          </p>

          {topLocation && (
            <p className="mt-1 text-xs text-slate-500">
              {Number(topLocation.count ?? 0).toLocaleString()} job records
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Work model
          </p>

          <p className="mt-3 text-xl font-bold text-white">
            {remotePercentage >= hybridPercentage &&
            remotePercentage >= onsitePercentage
              ? "Remote-led"
              : hybridPercentage >= onsitePercentage
              ? "Hybrid-led"
              : "On-site-led"}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Based on available work-type records
          </p>
        </div>
      </section>

      {/* Work Type + Skills */}
      <section className="grid min-w-0 gap-6 lg:grid-cols-2">
        {/* Work Type */}
        <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <SectionHeader
            icon={<Wifi className="h-4 w-4 text-violet-400" />}
            title="Work Model Distribution"
            description="How available jobs are distributed by workplace model"
          />

          {workTypeData.length > 0 ? (
            <>
              <div className="h-[260px] w-full min-w-0">
                <ResponsiveContainer
                  width="100%"
                  height={260}
                  minWidth={0}
                  minHeight={260}
                >
                  <PieChart>
                    <Pie
                      data={workTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={62}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {workTypeData.map((_, index) => (
                        <Cell
                          key={index}
                          fill={
                            PIE_COLORS[index % PIE_COLORS.length]
                          }
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#020617",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                      }}
                    />

                    <Legend
                      verticalAlign="bottom"
                      formatter={(value) => (
                        <span className="text-xs text-slate-400">
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-slate-800 pt-4">
                <div>
                  <p className="text-xs text-slate-500">Remote</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {remotePercentage}%
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Hybrid</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {hybridPercentage}%
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">On-site</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {onsitePercentage}%
                  </p>
                </div>
              </div>
            </>
          ) : (
            <EmptyState message="No workplace model data available." />
          )}
        </div>

        {/* Skills */}
        <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <SectionHeader
            icon={<Zap className="h-4 w-4 text-amber-400" />}
            title="Most Demanded Skills"
            description="Skills appearing most frequently across job records"
          />

          {topSkillsData.length > 0 ? (
            <div className="h-[320px] w-full min-w-0">
              <ResponsiveContainer
                width="100%"
                height={320}
                minWidth={0}
                minHeight={320}
              >
                <BarChart
                  data={topSkillsData}
                  layout="vertical"
                  margin={{
                    top: 0,
                    right: 20,
                    left: 5,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e293b"
                    horizontal={false}
                  />

                  <XAxis
                    type="number"
                    tick={{
                      fill: "#64748b",
                      fontSize: 11,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    type="category"
                    dataKey="skill"
                    width={90}
                    tick={{
                      fill: "#cbd5e1",
                      fontSize: 11,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip content={<CustomTooltip />} />

                  <Bar
                    dataKey="count"
                    fill="#8b5cf6"
                    radius={[0, 6, 6, 0]}
                    barSize={18}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyState message="No skill demand data available." />
          )}
        </div>
      </section>

      {/* Companies + Locations */}
      <section className="grid min-w-0 gap-6 lg:grid-cols-2">
        {/* Companies */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <SectionHeader
            icon={<Building2 className="h-4 w-4 text-cyan-400" />}
            title="Leading Hiring Companies"
            description="Organizations with the highest number of represented openings"
          />

          {topCompaniesData.length > 0 ? (
            <div className="space-y-4">
              {topCompaniesData.map(({ company, count }, index) => {
                const percentage = Math.round(
                  (count / maxCompanyCount) * 100
                );

                return (
                  <div key={`${company}-${index}`}>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs font-semibold text-slate-400">
                          {index + 1}
                        </span>

                        <span className="truncate text-sm font-medium text-slate-200">
                          {company}
                        </span>
                      </div>

                      <span className="shrink-0 text-xs text-slate-500">
                        {Number(count ?? 0).toLocaleString()} jobs
                      </span>
                    </div>

                    <div className="ml-10 h-1.5 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState message="No company hiring data available." />
          )}
        </div>

        {/* Locations */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <SectionHeader
            icon={<MapPin className="h-4 w-4 text-emerald-400" />}
            title="Leading Hiring Locations"
            description="Locations with the strongest concentration of job openings"
          />

          {validLocations.length > 0 ? (
            <div className="space-y-4">
              {validLocations.map(({ location, count }, index) => {
                const percentage = Math.round(
                  (count / maxLocationCount) * 100
                );

                return (
                  <div key={`${location}-${index}`}>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs font-semibold text-slate-400">
                          {index + 1}
                        </span>

                        <span className="truncate text-sm font-medium text-slate-200">
                          {location}
                        </span>
                      </div>

                      <span className="shrink-0 text-xs text-slate-500">
                        {Number(count ?? 0).toLocaleString()} jobs
                      </span>
                    </div>

                    <div className="ml-10 h-1.5 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState message="No location data available." />
          )}
        </div>
      </section>

      {/* Salary Insights */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <SectionHeader
          icon={<DollarSign className="h-4 w-4 text-yellow-400" />}
          title="Salary Insights"
          description="Average compensation represented across available roles"
        />

        {salaryData.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {salaryData.map(({ role, average_salary }, index) => (
              <div
                key={`${role}-${index}`}
                className="group rounded-xl border border-slate-800 bg-slate-950/40 p-4 transition-all hover:border-slate-700 hover:bg-slate-950/70"
              >
                <p className="truncate text-xs font-medium uppercase tracking-wide text-slate-500">
                  {role}
                </p>

                <p className="mt-3 text-xl font-bold text-white">
                  {average_salary}
                </p>

                <div className="mt-4 h-1 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-70 transition-all group-hover:w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState message="No salary information available." />
        )}
      </section>

      {/* Data Context */}
      <section className="flex flex-col gap-3 rounded-2xl border border-slate-800/70 bg-slate-950/40 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Database className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />

          <div>
            <p className="text-sm font-medium text-slate-300">
              Dataset coverage
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Insights are calculated from the job records currently
              available to the platform.
            </p>
          </div>
        </div>

        <span className="text-xs font-medium text-slate-500">
          {totalJobs.toLocaleString()} records
        </span>
      </section>
    </div>
  );
}