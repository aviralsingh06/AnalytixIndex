import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: string;
  trendPositive?: boolean;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendPositive = true,
}: StatsCardProps) {
  return (
    <Card className="border-slate-800 bg-slate-900 shadow-lg transition-all duration-300 hover:border-violet-500 hover:shadow-violet-500/10">

      <CardContent className="p-6">

        <div className="flex items-start justify-between">

          <div>

            <p className="text-sm text-slate-400">
              {title}
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {value}
            </h2>

            {subtitle && (
              <p className="mt-2 text-sm text-slate-500">
                {subtitle}
              </p>
            )}

          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-600/15 text-violet-400">
            {icon}
          </div>

        </div>

        {trend && (
          <div className="mt-6 flex items-center gap-2">

            <ArrowUpRight
              className={`h-4 w-4 ${
                trendPositive
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            />

            <span
              className={`text-sm font-semibold ${
                trendPositive
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {trend}
            </span>

          </div>
        )}

      </CardContent>

    </Card>
  );
}