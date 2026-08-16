"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AppLayout } from "@/components/layout";
import { JOB_ROLES, getResumeId } from "@/lib/constants";
import { getCareerCoach } from "@/lib/api";
import CareerCoachResult from "@/components/career-coach/CareerCoachResult";
import InterviewPrep from "@/components/career-coach/InterviewPrep";
import { Loader2, BrainCircuit, ChevronDown, Sparkles, BookOpen } from "lucide-react";

export default function CareerCoachPage() {
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"guidance" | "interview">("guidance");

  async function analyze() {
  if (!targetRole) {
    toast.error("Please select a target role.");
    return;
  }

  setLoading(true);
  setResult(null);

  try {
    const resumeId = getResumeId();

    console.log("========== CAREER COACH ==========");
    console.log("Resume ID:", resumeId);
    console.log("Resume ID type:", typeof resumeId);
    console.log("Target Role:", targetRole);

    if (!resumeId) {
      toast.error("Please upload a resume first.");
      return;
    }

    const data = await getCareerCoach(Number(resumeId), targetRole);

    console.log("CAREER COACH API RESPONSE:");
    console.log(data);
    console.log(
      "CAREER COACH API RESPONSE JSON:",
      JSON.stringify(data, null, 2)
    );

    setResult(data);
  } catch (err: any) {
    console.error("CAREER COACH ERROR:", err);

    toast.error(
      err.message || "Career coach analysis failed."
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5">
              <BrainCircuit className="h-4 w-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-300">AI Career Advisor & Interview Prep</span>
            </div>
            <h1 className="text-4xl font-bold text-white">AI Career Coach</h1>
            <p className="mt-2 text-slate-400">
              Get personalized career roadmap, weekly/monthly study plans, and technical interview questions with AI feedback.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveTab("guidance")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "guidance"
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Career Guidance & Plan
            </button>
            <button
              onClick={() => setActiveTab("interview")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "interview"
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Mock Interview Q&A
            </button>
          </div>
        </div>

        {activeTab === "guidance" ? (
          <>
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
                  <><Loader2 className="h-4 w-4 animate-spin" /> Coaching...</>
                ) : (
                  <><BrainCircuit className="h-4 w-4" /> Get Career Guidance</>
                )}
              </button>
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/50 p-16">
                <div className="relative mb-6">
                  <div className="h-20 w-20 animate-spin rounded-full border-4 border-slate-700 border-t-violet-500" />
                  <BrainCircuit className="absolute inset-0 m-auto h-8 w-8 text-violet-400" />
                </div>
                <p className="text-lg font-semibold text-white">AI Coach Analyzing...</p>
                <p className="mt-1 text-sm text-slate-400">Building your personalized career plan</p>
              </div>
            )}

            {/* Empty state */}
            {!loading && !result && (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 p-16 text-center">
                <BrainCircuit className="mb-4 h-16 w-16 text-slate-600" />
                <h3 className="text-xl font-semibold text-slate-300">No Coaching Session Yet</h3>
                <p className="mt-2 text-slate-500">Select your target role to get a personalized career plan.</p>
              </div>
            )}

            {/* Results */}
            {result && <CareerCoachResult data={result} />}
          </>
        ) : (
          <InterviewPrep />
        )}
      </div>
    </AppLayout>
  );
}
