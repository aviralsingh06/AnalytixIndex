"use client";

import {
  AlertTriangle,
  PlusCircle,
} from "lucide-react";

interface MissingSkillsProps {
  skills?: string[];
}

export default function MissingSkills({
  skills = [],
}: MissingSkillsProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl">

      {/* Header */}
      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-amber-500/10 p-3">
          <AlertTriangle className="h-6 w-6 text-amber-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Missing Skills
          </h2>

          <p className="text-slate-400">
            These important skills are missing for your selected role.
          </p>
        </div>

      </div>

      {/* Skills */}
      <div className="mt-8 space-y-4">

        {skills.length === 0 ? (

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-400">
            🎉 No missing skills found.
          </div>

        ) : (

          skills.map((skill) => (

            <div
              key={skill}
              className="flex items-center rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 transition-all duration-300 hover:bg-amber-500/10"
            >

              <div className="flex items-center gap-3">

                <PlusCircle className="h-5 w-5 text-amber-400" />

                <span className="font-medium text-white">
                  {skill}
                </span>

              </div>

            </div>

          ))

        )}

      </div>

      {/* Footer */}
      <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">

        <h3 className="font-semibold text-white">
          AI Recommendation
        </h3>

        <p className="mt-2 text-sm leading-7 text-slate-400">
          Focus on learning these missing skills first to improve your job
          match score and become more competitive for your target role.
        </p>

      </div>

    </section>
  );
}