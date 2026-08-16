"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const hiringData = [
  { month: "Jan", jobs: 120 },
  { month: "Feb", jobs: 160 },
  { month: "Mar", jobs: 210 },
  { month: "Apr", jobs: 250 },
  { month: "May", jobs: 320 },
  { month: "Jun", jobs: 410 },
];

export function HiringTrendChart() {
  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-xl">
          Hiring Trend
        </CardTitle>

        <p className="text-sm text-slate-400">
          Monthly Data Analyst job openings
        </p>
      </CardHeader>

      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hiringData}>
              <defs>
                <linearGradient
                  id="hiringGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#8b5cf6"
                    stopOpacity={0.6}
                  />

                  <stop
                    offset="95%"
                    stopColor="#8b5cf6"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#2e3447"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="month"
                stroke="#94a3b8"
              />

              <YAxis stroke="#94a3b8" />

              <Tooltip
                contentStyle={{
                  background: "#111827",
                  border: "1px solid #374151",
                  borderRadius: "12px",
                }}
              />

              <Area
                type="monotone"
                dataKey="jobs"
                stroke="#8b5cf6"
                strokeWidth={3}
                fill="url(#hiringGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}