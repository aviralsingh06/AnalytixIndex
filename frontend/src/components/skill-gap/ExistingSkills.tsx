"use client";

import {
  CheckCircle2,
  BrainCircuit,
} from "lucide-react";

interface ExistingSkillsProps {
  skills?: string[];
}

export default function ExistingSkills({
  skills = [
    "Python",
    "SQL",
    "Excel",
    "Pandas",
    "NumPy",
    "Power BI",
  ],
}: ExistingSkillsProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl">

      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-emerald-500/10 p-3">

          <BrainCircuit className="h-6 w-6 text-emerald-400" />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">
            Matching Skills
          </h2>

          <p className="text-slate-400">
            These skills from your resume match the selected job role.
          </p>

        </div>

      </div>

      {/* Skills */}

      <div className="mt-8 flex flex-wrap gap-3">

        {skills.map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 transition-all duration-300 hover:scale-105 hover:bg-emerald-500/20"
          >

            <CheckCircle2 className="h-4 w-4 text-emerald-400" />

            <span className="text-sm font-medium text-white">
              {skill}
            </span>

          </div>
        ))}

      </div>

      {/* Footer */}

      <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-950/60 p-5">

        <p className="text-sm text-slate-400">

          <span className="font-semibold text-white">
            {skills.length}
          </span>{" "}

          matching skills were identified for this role.

        </p>

      </div>

    </section>
  );
}