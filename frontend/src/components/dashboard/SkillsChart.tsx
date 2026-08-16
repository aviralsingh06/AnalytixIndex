"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

const skills = [
  { name: "Python", demand: 95 },
  { name: "SQL", demand: 90 },
  { name: "Power BI", demand: 82 },
  { name: "Tableau", demand: 75 },
  { name: "Excel", demand: 70 },
  { name: "Machine Learning", demand: 68 },
];

export function SkillsChart() {
  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">
            Trending Skills
          </CardTitle>

          <p className="mt-1 text-sm text-gray-400">
            Most demanded technologies this month
          </p>
        </div>

        <Badge className="bg-violet-600 hover:bg-violet-600">
          Live
        </Badge>
      </CardHeader>

      <CardContent className="space-y-6">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">
                {skill.name}
              </span>

              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" />

                <span className="text-sm font-semibold text-emerald-400">
                  {skill.demand}%
                </span>
              </div>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 transition-all duration-700"
                style={{
                  width: `${skill.demand}%`,
                }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}