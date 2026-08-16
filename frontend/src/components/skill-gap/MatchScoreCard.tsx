"use client";

import {
  Target,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

interface MatchScoreCardProps {
  score: number;
  role: string;
}

export default function MatchScoreCard({
  score,
  role,
}: MatchScoreCardProps) {

  const circumference = 2 * Math.PI * 70;

  const progress =
    circumference - (score / 100) * circumference;

  function getStatus() {

    if (score >= 90) return "Excellent Match";

    if (score >= 80) return "Strong Match";

    if (score >= 70) return "Good Match";

    if (score >= 60) return "Average Match";

    return "Low Match";

  }

  function getColor() {

    if (score >= 90) return "text-emerald-400";

    if (score >= 80) return "text-cyan-400";

    if (score >= 70) return "text-yellow-400";

    return "text-red-400";

  }

  return (

    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl">

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Score Circle */}

        <div className="flex flex-col items-center">

          <svg
            width="180"
            height="180"
            className="-rotate-90"
          >

            <circle
              cx="90"
              cy="90"
              r="70"
              fill="none"
              stroke="#1e293b"
              strokeWidth="12"
            />

            <circle
              cx="90"
              cy="90"
              r="70"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={progress}
              className="transition-all duration-700"
            />

          </svg>

          <div className="-mt-28 text-center">

            <p className="text-5xl font-bold text-white">

              {score}%

            </p>

            <p className="text-slate-400">

              Match Score

            </p>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex-1">

          <h2 className="text-3xl font-bold text-white">

            Skill Gap Analysis Complete

          </h2>

          <p className="mt-3 text-slate-400">

            Your resume has been compared against the

            <span className="font-semibold text-cyan-400">

              {" "}
              {role}
              {" "}

            </span>

            role.

          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">

            {/* Overall Match */}

            <div className="rounded-2xl bg-white/5 p-5">

              <Target className="mb-3 h-8 w-8 text-cyan-400" />

              <p className="text-sm text-slate-400">

                Overall Match

              </p>

              <h3 className={`mt-2 text-xl font-bold ${getColor()}`}>

                {getStatus()}

              </h3>

            </div>

            {/* Compatibility */}

            <div className="rounded-2xl bg-white/5 p-5">

              <TrendingUp className="mb-3 h-8 w-8 text-emerald-400" />

              <p className="text-sm text-slate-400">

                Compatibility

              </p>

              <h3 className="mt-2 text-xl font-bold text-white">

                {score}%

              </h3>

            </div>

            {/* Ready */}

            <div className="rounded-2xl bg-white/5 p-5">

              <CheckCircle2 className="mb-3 h-8 w-8 text-violet-400" />

              <p className="text-sm text-slate-400">

                Job Ready

              </p>

              <h3 className="mt-2 text-xl font-bold text-white">

                {score >= 75
                  ? "Yes"
                  : "Needs Improvement"}

              </h3>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}