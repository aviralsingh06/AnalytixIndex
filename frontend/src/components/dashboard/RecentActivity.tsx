import {
  CheckCircle2,
  Briefcase,
  BrainCircuit,
  FileText,
  TrendingUp,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
  {
    title: "Resume uploaded successfully",
    description: "Your latest resume has been analyzed.",
    time: "2 min ago",
    icon: FileText,
    color: "text-blue-400",
  },
  {
    title: "ATS Score Generated",
    description: "Your ATS score is now available.",
    time: "10 min ago",
    icon: CheckCircle2,
    color: "text-green-400",
  },
  {
    title: "New Job Matches Found",
    description: "5 jobs matched your profile.",
    time: "25 min ago",
    icon: Briefcase,
    color: "text-violet-400",
  },
  {
    title: "Career Coach Updated",
    description: "AI generated new career advice.",
    time: "1 hour ago",
    icon: BrainCircuit,
    color: "text-cyan-400",
  },
  {
    title: "Market Intelligence Updated",
    description: "Hiring trends refreshed.",
    time: "Today",
    icon: TrendingUp,
    color: "text-orange-400",
  },
];

export default function RecentActivity() {
  return (
    <Card className="border-slate-800 bg-slate-900">

      <CardHeader>

        <CardTitle className="text-xl text-white">
          Recent Activity
        </CardTitle>

      </CardHeader>

      <CardContent>

        <div className="space-y-5">

          {activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.title}
                className="flex items-start gap-4 rounded-xl border border-transparent p-3 transition-all hover:border-slate-700 hover:bg-slate-800/50"
              >

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 ${activity.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1">

                  <h3 className="font-semibold text-white">
                    {activity.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {activity.description}
                  </p>

                </div>

                <span className="text-xs text-slate-500">
                  {activity.time}
                </span>

              </div>
            );
          })}

        </div>

      </CardContent>

    </Card>
  );
}