"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AppLayout } from "@/components/layout";
import { JOB_ROLES, getResumeId } from "@/lib/constants";
import { getATSScore } from "@/lib/api";
import ATSResultPanel from "@/components/ats-score/ATSResultPanel";
import {
  Loader2,
  SearchCheck,
  ChevronDown,
} from "lucide-react";

export default function ATSScorePage() {
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function analyze() {
    if (!targetRole) {
      toast.error("Please select a target role.");
      return;
    }

    const resumeId = getResumeId();

    if (!resumeId) {
      toast.error("Please upload a resume before running ATS analysis.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await getATSScore(
        resumeId,
        targetRole
      );

      setResult(data);
    } catch (err: any) {
      toast.error(
        err?.message ||
          "ATS analysis failed. Please upload a resume first."
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
          <h1 className="text-3xl font-bold text-white">
            ATS Optimizer
          </h1>

          <p className="mt-2 text-slate-400">
            ATS Score Analysis
          </p>

          <p className="mt-1 text-slate-500">
            Evaluate how well your resume passes Applicant Tracking
            Systems for a specific role.
          </p>
        </div>

        {/* Controls */}

        <div className="flex flex-wrap gap-4">

          <div className="relative">

            <select
              value={targetRole}
              onChange={(e) =>
                setTargetRole(e.target.value)
              }
              className="appearance-none rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 pr-10 text-white focus:border-violet-500 focus:outline-none"
            >
              <option value="">
                Select Target Role
              </option>

              {JOB_ROLES.map((role) => (
                <option
                  key={role}
                  value={role}
                >
                  {role}
                </option>
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
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <SearchCheck className="h-4 w-4" />
                Analyze ATS Score
              </>
            )}
          </button>

        </div>

        {/* Loading */}

        {loading && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/50 p-16">

            <div className="relative mb-6">

              <div className="h-20 w-20 animate-spin rounded-full border-4 border-slate-700 border-t-violet-500" />

              <SearchCheck className="absolute inset-0 m-auto h-8 w-8 text-violet-400" />

            </div>

            <p className="text-lg font-semibold text-white">
              Running ATS Analysis...
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Scanning resume against ATS criteria
            </p>

          </div>
        )}

        {/* Empty State */}

        {!loading && !result && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 p-16 text-center">

            <SearchCheck className="mb-4 h-16 w-16 text-slate-600" />

            <h3 className="text-xl font-semibold text-slate-300">
              No Analysis Yet
            </h3>

            <p className="mt-2 text-slate-500">
              Select a target role and run the ATS analysis
              to see your score.
            </p>

          </div>
        )}

        {/* Results */}

        {result && (
          <ATSResultPanel data={result} />
        )}

      </div>
    </AppLayout>
  );
}