"use client";

import {
  BookOpen,
  CheckCircle2,
  PlayCircle,
  FileText,
  GraduationCap,
} from "lucide-react";

interface LearningPlan {
  skill: string;
  priority: number;
  difficulty: string;
  estimated_weeks: number;
  youtube: string;
  course: string;
  documentation: string;
}

interface Roadmap {
  target_role: string;
  total_missing_skills: number;
  estimated_completion_weeks: number;
  learning_plan: LearningPlan[];
}

interface LearningRoadmapProps {
  roadmap?: Roadmap;
}

const defaultRoadmap: Roadmap = {
  target_role: "Data Analyst",
  total_missing_skills: 4,
  estimated_completion_weeks: 9,
  learning_plan: [
    {
      skill: "Statistics",
      priority: 1,
      difficulty: "Easy",
      estimated_weeks: 2,
      youtube: "StatQuest",
      course: "Khan Academy Statistics",
      documentation: "NumPy Statistics Documentation",
    },
    {
      skill: "Power BI",
      priority: 2,
      difficulty: "Medium",
      estimated_weeks: 3,
      youtube: "Alex The Analyst",
      course: "Microsoft Learn",
      documentation: "Power BI Documentation",
    },
    {
      skill: "Tableau",
      priority: 3,
      difficulty: "Medium",
      estimated_weeks: 2,
      youtube: "Tableau Tim",
      course: "Tableau eLearning",
      documentation: "Tableau Documentation",
    },
    {
      skill: "Data Visualization",
      priority: 4,
      difficulty: "Medium",
      estimated_weeks: 2,
      youtube: "Alex The Analyst",
      course: "freeCodeCamp Data Visualization",
      documentation: "Matplotlib Documentation",
    },
  ],
};

export default function LearningRoadmap({
  roadmap = defaultRoadmap,
}: LearningRoadmapProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8">

      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-violet-500/10 p-3">
          <BookOpen className="h-6 w-6 text-violet-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            AI Learning Roadmap
          </h2>

          <p className="text-slate-400">
            {roadmap.estimated_completion_weeks} weeks to become a better{" "}
            {roadmap.target_role}
          </p>
        </div>

      </div>

      {/* Timeline */}

      <div className="mt-10 space-y-8">

        {roadmap.learning_plan.map((step, index) => (

          <div
            key={step.skill}
            className="flex gap-6"
          >

            {/* Left */}

            <div className="flex flex-col items-center">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 font-bold text-white">
                {index + 1}
              </div>

              {index !== roadmap.learning_plan.length - 1 && (
                <div className="mt-2 h-24 w-1 rounded-full bg-slate-700" />
              )}

            </div>

            {/* Right */}

            <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6">

              <div className="flex items-center justify-between">

                <h3 className="text-xl font-semibold text-white">
                  {step.skill}
                </h3>

                <span className="rounded-full bg-violet-500/10 px-4 py-1 text-sm font-semibold text-violet-300">
                  {step.estimated_weeks} Weeks
                </span>

              </div>

              <p className="mt-3 text-slate-300">
                Difficulty:
                <span className="ml-2 font-semibold text-violet-300">
                  {step.difficulty}
                </span>
              </p>

              <div className="mt-5 space-y-3">

                <div className="flex items-center gap-2 text-slate-300">
                  <PlayCircle className="h-4 w-4 text-red-400" />
                  <span>{step.youtube}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <GraduationCap className="h-4 w-4 text-green-400" />
                  <span>{step.course}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <FileText className="h-4 w-4 text-cyan-400" />
                  <span>{step.documentation}</span>
                </div>

              </div>

              <div className="mt-5 flex items-center gap-2">

                <CheckCircle2 className="h-5 w-5 text-emerald-400" />

                <span className="text-sm text-emerald-400">
                  Priority #{step.priority}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}