"use client";

import { AlertTriangle, PlusCircle } from "lucide-react";

interface MissingSkillsProps {
  data: {
    missing_skills: string[];
  };
}

export default function MissingSkills({
  data,
}: MissingSkillsProps) {

  const skills = data.missing_skills;

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
            These important skills were not found in your resume.
          </p>

        </div>

      </div>

      {/* Skills */}

      <div className="mt-8 flex flex-wrap gap-3">

        {skills.length > 0 ? (

          skills.map((skill) => (

            <div
              key={skill}
              className="flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 transition-all duration-300 hover:scale-105 hover:bg-amber-500/20"
            >

              <PlusCircle className="h-4 w-4 text-amber-400" />

              <span className="text-sm font-medium text-white">
                {skill}
              </span>

            </div>

          ))

        ) : (

          <p className="text-slate-400">
            Excellent! No important skills are currently missing.
          </p>

        )}

      </div>

      {/* Recommendation */}

      <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">

        <h3 className="font-semibold text-white">
          AI Recommendation
        </h3>

        <p className="mt-2 text-sm leading-7 text-slate-400">
          Learn these technologies through projects before adding them to
          your resume. Practical experience is much more valuable than
          listing skills without evidence.
        </p>

      </div>

    </section>
  );
}