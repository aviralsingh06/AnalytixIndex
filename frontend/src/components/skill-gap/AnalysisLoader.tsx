"use client";

import { BrainCircuit, Loader2, Sparkles } from "lucide-react";

export default function AnalysisLoader() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 backdrop-blur-xl">

      <div className="flex flex-col items-center justify-center">

        <div className="rounded-full bg-violet-500/10 p-6">

          <Loader2 className="h-12 w-12 animate-spin text-violet-400" />

        </div>

        <h2 className="mt-8 text-3xl font-bold text-white">
          Analyzing Skill Gap
        </h2>

        <p className="mt-3 max-w-xl text-center leading-7 text-slate-400">
          Our AI is comparing your resume with the selected job role,
          identifying missing skills, calculating your match score,
          and generating a personalized learning roadmap.
        </p>

        <div className="mt-10 grid w-full max-w-3xl gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

            <BrainCircuit className="mb-3 h-8 w-8 text-violet-400" />

            <h3 className="font-semibold text-white">
              Extracting Skills
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Reading your resume and identifying technical skills.
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

            <Sparkles className="mb-3 h-8 w-8 text-cyan-400" />

            <h3 className="font-semibold text-white">
              Comparing Role
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Matching your skills with industry requirements.
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

            <Loader2 className="mb-3 h-8 w-8 animate-spin text-emerald-400" />

            <h3 className="font-semibold text-white">
              Generating Roadmap
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Preparing personalized recommendations for your career.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}