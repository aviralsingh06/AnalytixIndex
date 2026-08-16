"use client";

import {
  BookOpen,
  FolderOpen,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CareerCoachData {
  resume_id: number;
  target_role: string;
  career_summary: string;
  strengths: string[];
  weaknesses: string[];
  priority_skills: string[];
  recommended_projects: string[];
  interview_questions: string[];
  learning_resources: string[];
  career_tips: string[];
}

function Section({
  icon,
  title,
  children,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-800 bg-slate-900/60 p-6",
        className
      )}
    >
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>

      {children}
    </div>
  );
}

export default function CareerCoachResult({
  data,
}: {
  data: CareerCoachData;
}) {
  // Normalize arrays so the UI remains safe if the backend returns
  // an empty or missing array.
  const strengths = Array.isArray(data?.strengths) ? data.strengths : [];
  const weaknesses = Array.isArray(data?.weaknesses) ? data.weaknesses : [];
  const prioritySkills = Array.isArray(data?.priority_skills)
    ? data.priority_skills
    : [];
  const recommendedProjects = Array.isArray(data?.recommended_projects)
    ? data.recommended_projects
    : [];
  const interviewQuestions = Array.isArray(data?.interview_questions)
    ? data.interview_questions
    : [];
  const learningResources = Array.isArray(data?.learning_resources)
    ? data.learning_resources
    : [];
  const careerTips = Array.isArray(data?.career_tips)
    ? data.career_tips
    : [];

  return (
    <div className="space-y-6">
      {/* =====================================================
          CAREER SUMMARY
      ===================================================== */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="mb-3 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-400" />
          <h3 className="text-lg font-semibold text-white">
            Career Summary
          </h3>
        </div>

        <p className="leading-relaxed text-slate-300">
          {data.career_summary ||
            `Your career analysis for ${
              data?.target_role || "the selected role"
            } is ready.`}
        </p>

        {/* Priority Skills */}
        {prioritySkills.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold text-violet-400">
              🎯 Priority Skills to Learn
            </p>

            <div className="flex flex-wrap gap-2">
              {prioritySkills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-sm text-orange-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Strengths */}
        {strengths.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold text-emerald-400">
              ✓ Key Strengths
            </p>

            <ul className="space-y-1">
              {strengths.map((strength, index) => (
                <li key={index} className="text-sm text-slate-300">
                  • {strength}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Areas to Improve */}
        {weaknesses.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold text-red-400">
              ⚠ Areas to Improve
            </p>

            <ul className="space-y-1">
              {weaknesses.map((weakness, index) => (
                <li key={index} className="text-sm text-slate-300">
                  • {weakness}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* =====================================================
          STRENGTHS + AREAS TO IMPROVE
      ===================================================== */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Strengths */}
        <Section
          icon={
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          }
          title={`Strengths (${strengths.length})`}
        >
          {strengths.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {strengths.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No strengths were returned.
            </p>
          )}
        </Section>

        {/* Areas to Improve */}
        <Section
          icon={
            <AlertCircle className="h-5 w-5 text-red-400" />
          }
          title={`Areas to Improve (${weaknesses.length})`}
        >
          {weaknesses.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {weaknesses.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-sm text-red-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No areas to improve were returned.
            </p>
          )}
        </Section>
      </div>

      {/* =====================================================
          RECOMMENDED PROJECTS + INTERVIEW QUESTIONS
      ===================================================== */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recommended Projects */}

        <Section
          icon={
            <FolderOpen className="h-5 w-5 text-cyan-400" />
          }
          title="Recommended Projects"
        >
          {recommendedProjects.length > 0 ? (
            <ul className="space-y-3">
              {recommendedProjects.map((project, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-400">
                    {index + 1}
                  </span>

                  <span className="text-sm leading-relaxed text-slate-300">
                    {project}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">
              No project recommendations available yet.
            </p>
          )}
        </Section>

        {/* Interview Questions */}

        <Section
          icon={
            <HelpCircle className="h-5 w-5 text-yellow-400" />
          }
          title="Interview Prep Questions"
        >
          {interviewQuestions.length > 0 ? (
            <ul className="space-y-3">
              {interviewQuestions.map((question, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 text-sm font-semibold text-yellow-400">
                    Q{index + 1}.
                  </span>

                  <span className="text-sm leading-relaxed text-slate-300">
                    {question}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">
              No interview questions available yet.
            </p>
          )}
        </Section>
      </div>

      {/* =====================================================
          LEARNING RESOURCES + CAREER TIPS
      ===================================================== */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Learning Resources */}

        <Section
          icon={
            <BookOpen className="h-5 w-5 text-violet-400" />
          }
          title="Learning Resources"
        >
          {learningResources.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {learningResources.map((resource, index) => (
                <span
                  key={`${resource}-${index}`}
                  className="rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-sm font-medium text-violet-300"
                >
                  {resource}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No learning resources available yet.
            </p>
          )}
        </Section>

        {/* Career Tips */}

        <Section
          icon={
            <Lightbulb className="h-5 w-5 text-emerald-400" />
          }
          title="Career Tips"
        >
          {careerTips.length > 0 ? (
            <ul className="space-y-3">
              {careerTips.map((tip, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-slate-300"
                >
                  <span className="mt-0.5 text-emerald-400">
                    •
                  </span>

                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">
              No career tips available yet.
            </p>
          )}
        </Section>
      </div>

      {/* =====================================================
          DEBUG INFORMATION
          Remove after backend/frontend integration is verified.
      ===================================================== */}

      {process.env.NODE_ENV === "development" && (
        <details className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
          <summary className="cursor-pointer text-xs text-slate-500">
            Career Coach API Response
          </summary>

          <pre className="mt-3 overflow-auto whitespace-pre-wrap text-xs text-slate-400">
            {JSON.stringify(data, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
}