"use client";

import Link from "next/link";
import {
  FileText,
  SearchCheck,
  Briefcase,
  BrainCircuit,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const actions = [
  {
    title: "Analyze Resume",
    description: "Upload and analyze your resume",
    href: "/resume",
    icon: FileText,
  },
  {
    title: "ATS Score",
    description: "Check ATS compatibility",
    href: "/ats-score",
    icon: SearchCheck,
  },
  {
    title: "Find Jobs",
    description: "View personalized recommendations",
    href: "/job-recommendation",
    icon: Briefcase,
  },
  {
    title: "Career Coach",
    description: "Receive AI career guidance",
    href: "/career-coach",
    icon: BrainCircuit,
  },
];

export default function QuickActions() {
  return (
    <section className="space-y-4">

      <h2 className="text-xl font-semibold text-white">
        Quick Actions
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
            >
              <Card className="group h-full cursor-pointer border-slate-800 bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:shadow-lg hover:shadow-violet-500/10">

                <CardContent className="flex flex-col gap-4 p-6">

                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-600/15 text-violet-400 transition-colors group-hover:bg-violet-600 group-hover:text-white">

                    <Icon className="h-7 w-7" />

                  </div>

                  <div>

                    <h3 className="text-lg font-semibold text-white">
                      {action.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      {action.description}
                    </p>

                  </div>

                </CardContent>

              </Card>
            </Link>
          );
        })}

      </div>

    </section>
  );
}