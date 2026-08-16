"use client";

import {
  BrainCircuit,
  Sparkles,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

interface ResumeSummaryProps {
  data: {
    summary: string;
    recommendations: string[];
  };
}

export default function ResumeSummary({
  data,
}: ResumeSummaryProps) {

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl">

      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-violet-500/10 p-3">

          <BrainCircuit className="h-6 w-6 text-violet-400" />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">
            AI Resume Summary
          </h2>

          <p className="text-slate-400">
            Overall evaluation generated from your uploaded resume.
          </p>

        </div>

      </div>

      {/* Summary */}

      <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/60 p-6">

        <p className="leading-8 text-slate-300">
          {data.summary}
        </p>

      </div>

      {/* Recommendations */}

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

        <div className="flex items-center gap-3">

          <Lightbulb className="h-6 w-6 text-cyan-400" />

          <h3 className="text-xl font-semibold text-white">
            AI Recommendations
          </h3>

        </div>

        <ul className="mt-6 space-y-3">

          {data.recommendations.map((item) => (

            <li
              key={item}
              className="flex items-start gap-3"
            >

              <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-400" />

              <span className="text-slate-300">
                {item}
              </span>

            </li>

          ))}

        </ul>

      </div>

      {/* Footer */}

      <div className="mt-8 flex items-center gap-3 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">

        <Sparkles className="h-6 w-6 text-violet-400" />

        <p className="text-sm text-slate-300">
          This analysis is generated automatically and should be used as
          guidance while improving your resume for ATS optimization.
        </p>

      </div>

    </section>
  );
}