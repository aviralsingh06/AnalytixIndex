"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const salaryData = [
  { month: "Jan", salary: 8.2 },
  { month: "Feb", salary: 8.8 },
  { month: "Mar", salary: 9.6 },
  { month: "Apr", salary: 10.4 },
  { month: "May", salary: 11.2 },
  { month: "Jun", salary: 12.1 },
];

export function SalaryChart() {
  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-xl">
          Average Salary Trend
        </CardTitle>

        <p className="text-sm text-slate-400">
          Data Analyst salaries (LPA)
        </p>
      </CardHeader>

      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salaryData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#2e3447"
              />

              <XAxis
                dataKey="month"
                stroke="#94a3b8"
              />

              <YAxis
                stroke="#94a3b8"
                unit="L"
              />

              <Tooltip
                contentStyle={{
                  background: "#111827",
                  border: "1px solid #374151",
                  borderRadius: "12px",
                }}
              />

              <Line
                type="monotone"
                dataKey="salary"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{
                  r: 5,
                }}
                activeDot={{
                  r: 8,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}