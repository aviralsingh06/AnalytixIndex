"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AppLayout } from "@/components/layout";
import { JOB_ROLES, getResumeId } from "@/lib/constants";
import { getJobRecommendations } from "@/lib/api";
import JobRecommendationList from "@/components/job-recommendation/JobRecommendationList";
import { Loader2, Briefcase, ChevronDown } from "lucide-react";

export default function JobRecommendationPage() {
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function analyze() {
  if (!targetRole) {
    toast.error("Please select a target role.");
    return;
  }

  setLoading(true);
  setResult(null);

  try {
    const resumeId = getResumeId();

    if (!resumeId) {
      toast.error("Please upload a resume first.");
      return;
    }

    const data = await getJobRecommendations(resumeId, targetRole);

    console.log("Job Recommendation Response:", data);

    setResult(data);
  } catch (err: any) {
    console.error("Job Recommendation Error:", err);

    toast.error(
      err.message || "Job recommendation failed. Upload a resume first."
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5">
            <Briefcase className="h-4 w-4 text-violet-400" />
            <span className="text-sm font-medium text-violet-300">AI Job Matcher</span>
          </div>
          <h1 className="text-4xl font-bold text-white">Job Recommendations</h1>
          <p className="mt-2 text-slate-400">
            Discover jobs matched to your skills with salary estimates and match percentages.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="appearance-none rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 pr-10 text-white focus:border-violet-500 focus:outline-none"
            >
              <option value="">Select Target Role</option>
              {JOB_ROLES.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>

          <button
            onClick={analyze}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Finding Jobs...</>
            ) : (
              <><Briefcase className="h-4 w-4" /> Find Matching Jobs</>
            )}
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/50 p-16">
            <div className="relative mb-6">
              <div className="h-20 w-20 animate-spin rounded-full border-4 border-slate-700 border-t-violet-500" />
              <Briefcase className="absolute inset-0 m-auto h-8 w-8 text-violet-400" />
            </div>
            <p className="text-lg font-semibold text-white">Matching Jobs...</p>
            <p className="mt-1 text-sm text-slate-400">Comparing your skills against job requirements</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !result && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 p-16 text-center">
            <Briefcase className="mb-4 h-16 w-16 text-slate-600" />
            <h3 className="text-xl font-semibold text-slate-300">No Recommendations Yet</h3>
            <p className="mt-2 text-slate-500">Select your target role to discover matching job opportunities.</p>
          </div>
        )}

        {/* Results */}
        {result && <JobRecommendationList data={result} />}
      </div>
    </AppLayout>
  );
}
