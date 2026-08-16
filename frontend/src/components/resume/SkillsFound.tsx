"use client";

import { BrainCircuit, CheckCircle2 } from "lucide-react";

interface Skill {
  skill_name: string;
  category: string;
}

interface SkillsFoundProps {
  data: {
    skills: Skill[];
    skills_found: number;
  };
}

export default function SkillsFound({
  data,
}: SkillsFoundProps) {

  const skills = data.skills;

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl">

      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-emerald-500/10 p-3">

          <BrainCircuit className="h-6 w-6 text-emerald-400" />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">
            Skills Detected
          </h2>

          <p className="text-slate-400">
            AI extracted the following skills from your resume.
          </p>

        </div>

      </div>

      {/* Skills */}

      <div className="mt-8 flex flex-wrap gap-3">

        {skills.map((skill) => (

          <div
            key={skill.skill_name}
            className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 transition-all duration-300 hover:scale-105 hover:bg-emerald-500/20"
          >

            <CheckCircle2 className="h-4 w-4 text-emerald-400" />

            <div className="flex flex-col">

              <span className="text-sm font-medium text-white">
                {skill.skill_name}
              </span>

              <span className="text-xs text-slate-400">
                {skill.category}
              </span>

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-950/60 p-5">

        <p className="text-sm text-slate-400">

          <span className="font-semibold text-white">
            {data.skills_found}
          </span>{" "}

          skills were successfully identified from your resume.

        </p>

      </div>

    </section>
  );
}