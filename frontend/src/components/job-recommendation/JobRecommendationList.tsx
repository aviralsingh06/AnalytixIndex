"use client";

import { useState } from "react";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Job {
  title: string;
  company: string;
  location: string;
  employment_type: string;
  experience: string;
  salary: string;
  match_percentage: number;
  matched_skills: string[];
  missing_skills: string[];
}

interface JobRecommendationData {
  resume_id: number;
  target_role: string;
  total_recommendations: number;
  recommended_jobs: Job[];
}

function MatchBadge({ pct }: { pct: number }) {
  const color =
    pct >= 80 ? "from-emerald-500 to-green-400" :
    pct >= 60 ? "from-cyan-500 to-blue-400" :
    pct >= 40 ? "from-yellow-500 to-orange-400" :
    "from-red-500 to-rose-400";
  return (
    <div className={cn("rounded-full bg-gradient-to-r px-3 py-1 text-sm font-bold text-white", color)}>
      {pct}% Match
    </div>
  );
}

function JobCard({ job }: { job: Job }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all hover:border-violet-500/30">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 text-white font-bold text-lg">
              {job.company[0]}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{job.title}</h3>
              <p className="text-violet-400 font-medium">{job.company}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" /> {job.employment_type}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {job.experience}
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <DollarSign className="h-4 w-4" /> {job.salary}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <MatchBadge pct={job.match_percentage} />
          <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500"
              style={{ width: `${job.match_percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Toggle */}
      <button
        onClick={() => setExpanded((p) => !p)}
        className="mt-4 flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 transition"
      >
        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        {expanded ? "Hide Skills" : "Show Skills"}
      </button>

      {expanded && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 border-t border-slate-800 pt-4">
          {/* Matched */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-400">Matched Skills</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {job.matched_skills.map((s) => (
                <span key={s} className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-xs text-emerald-300">{s}</span>
              ))}
              {job.matched_skills.length === 0 && <span className="text-xs text-slate-500">None</span>}
            </div>
          </div>
          {/* Missing */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <span className="text-sm font-semibold text-red-400">Missing Skills</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {job.missing_skills.map((s) => (
                <span key={s} className="rounded-full bg-red-500/10 border border-red-500/30 px-2 py-0.5 text-xs text-red-300">{s}</span>
              ))}
              {job.missing_skills.length === 0 && <span className="text-xs text-slate-500">None</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function JobRecommendationList({ data }: { data: JobRecommendationData }) {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <TrendingUp className="h-8 w-8 text-violet-400" />
        <div>
          <p className="text-2xl font-bold text-white">{data.total_recommendations}</p>
          <p className="text-sm text-slate-400">Jobs matched for <span className="text-violet-400 font-medium">{data.target_role}</span></p>
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {data.recommended_jobs.map((job, i) => (
          <JobCard key={i} job={job} />
        ))}
      </div>

      {data.recommended_jobs.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          No jobs found matching your profile. Try uploading a more detailed resume.
        </div>
      )}
    </div>
  );
}
