"use client";

import { CheckCircle, XCircle, Trophy, Target, FileText, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

interface ATSData {
  resume_id: number;
  target_role: string;
  ats_score: number;
  grade: string;
  breakdown: {
    required_skills: number;
    optional_skills: number;
    sections: number;
    formatting: number;
  };
  sections: Record<string, boolean>;
  formatting: {
    email: boolean;
    phone: boolean;
    linkedin: boolean;
    github: boolean;
    portfolio: boolean;
    word_count: number;
    length_score: number;
    formatting_score: number;
  };
  skills: string[];
  skill_gap: any;
}

const GRADE_COLORS: Record<string, string> = {
  "A+": "text-emerald-400",
  A: "text-emerald-400",
  "A-": "text-emerald-400",
  "B+": "text-cyan-400",
  B: "text-cyan-400",
  "B-": "text-cyan-400",
  "C+": "text-yellow-400",
  C: "text-yellow-400",
  "C-": "text-orange-400",
  D: "text-red-400",
  F: "text-red-500",
};

function ScoreRing({ score, grade }: { score: number; grade: string }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
      <div className="relative h-36 w-36">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={r} fill="none" stroke="#1e293b" strokeWidth="10" />
          <circle
            cx="60" cy="60" r={r} fill="none"
            stroke={score >= 80 ? "#10b981" : score >= 60 ? "#06b6d4" : score >= 40 ? "#f59e0b" : "#ef4444"}
            strokeWidth="10" strokeLinecap="round"
            strokeDasharray={`${filled} ${circ}`}
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{score}</span>
          <span className="text-xs text-slate-400">/ 100</span>
        </div>
      </div>
      <div className={cn("mt-4 text-5xl font-black", GRADE_COLORS[grade] || "text-white")}>
        {grade}
      </div>
      <p className="mt-1 text-sm text-slate-400">ATS Score</p>
    </div>
  );
}

function BreakdownBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-semibold text-white">{value}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-700"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function BoolBadge({ label, value }: { label: string; value: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
      value ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
    )}>
      {value ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
      {label}
    </div>
  );
}

export default function ATSResultPanel({ data }: { data: ATSData }) {
  const breakdownEntries = [
    { label: "Required Skills", value: data.breakdown.required_skills },
    { label: "Optional Skills", value: data.breakdown.optional_skills },
    { label: "Resume Sections", value: data.breakdown.sections },
    { label: "Formatting", value: data.breakdown.formatting },
  ];

  const sectionEntries = Object.entries(data.sections || {});
  const formattingChecks = [
    { label: "Email", value: data.formatting.email },
    { label: "Phone", value: data.formatting.phone },
    { label: "LinkedIn", value: data.formatting.linkedin },
    { label: "GitHub", value: data.formatting.github },
    { label: "Portfolio", value: data.formatting.portfolio },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Score Ring */}
        <ScoreRing score={Math.round(data.ats_score)} grade={data.grade} />

        {/* Breakdown */}
        <div className="lg:col-span-2 space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
          <div className="flex items-center gap-2 mb-6">
            <Target className="h-5 w-5 text-violet-400" />
            <h3 className="text-lg font-semibold text-white">Score Breakdown</h3>
          </div>
          {breakdownEntries.map((e) => (
            <BreakdownBar key={e.label} label={e.label} value={Math.round(e.value)} />
          ))}
          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-slate-800 pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{data.formatting.word_count}</p>
              <p className="text-xs text-slate-400">Word Count</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{data.formatting.length_score}%</p>
              <p className="text-xs text-slate-400">Length Score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{data.formatting.formatting_score}%</p>
              <p className="text-xs text-slate-400">Format Score</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sections */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">Resume Sections</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {sectionEntries.map(([key, val]) => (
              <BoolBadge key={key} label={key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} value={val as boolean} />
            ))}
          </div>
        </div>

        {/* Formatting */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">Contact & Links</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {formattingChecks.map(({ label, value }) => (
              <BoolBadge key={label} label={label} value={value} />
            ))}
          </div>
        </div>
      </div>

      {/* Skills Found */}
      {data.skills && data.skills.length > 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Skills Detected ({data.skills.length})</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill} className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-300">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
