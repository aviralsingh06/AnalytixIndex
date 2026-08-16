"use client";

import AppLayout from "@/components/layout/AppLayout";
import React from "react";
import { BarChart3, TrendingUp, Zap, Target, Award, PieChart, ShieldCheck } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <AppLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <PieChart className="h-6 w-6 text-violet-400" />
            Comprehensive Platform Analytics
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Personalized resume score progression, ATS performance breakdown, skill readiness distribution, and application metrics.
          </p>
        </div>

        {/* Overview Stat Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <span className="text-slate-400 text-xs font-semibold block">ATS Optimization Progress</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-black text-white">84%</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800/60">+14% MoM</span>
            </div>
            <div className="mt-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-violet-500 rounded-full" style={{ width: "84%" }} />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <span className="text-slate-400 text-xs font-semibold block">Skill Match Readiness</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-black text-white">78%</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800/60">+8% MoM</span>
            </div>
            <div className="mt-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "78%" }} />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <span className="text-slate-400 text-xs font-semibold block">Market Demand Rating</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-black text-white">92 / 100</span>
              <span className="text-xs font-bold text-blue-400 bg-blue-950 px-2 py-0.5 rounded-md border border-blue-800/60">High Demand</span>
            </div>
            <div className="mt-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: "92%" }} />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <span className="text-slate-400 text-xs font-semibold block">Estimated Market Value</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-black text-white">$145,000</span>
              <span className="text-xs font-bold text-teal-400 bg-teal-950 px-2 py-0.5 rounded-md border border-teal-800/60">Top 15%</span>
            </div>
            <div className="mt-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-teal-500 rounded-full" style={{ width: "85%" }} />
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Charts & Visual Summaries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-violet-400" /> ATS Section Score Breakdown
            </h3>
            <div className="space-y-3">
              {[
                { label: "Technical Skills Match", score: 88, color: "bg-violet-500" },
                { label: "Experience & Impact Bulletins", score: 80, color: "bg-blue-500" },
                { label: "Education & Degree Credential", score: 95, color: "bg-emerald-500" },
                { label: "Contact Info & Link Accessibility", score: 100, color: "bg-teal-500" },
                { label: "Keywords & Industry Taxonomy", score: 75, color: "bg-amber-500" },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-300">{item.label}</span>
                    <span className="text-white font-bold">{item.score}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-400" /> Target Role Skill Coverage (Data Scientist)
            </h3>
            <div className="space-y-3">
              {[
                { label: "Python & Core Programming", status: "Mastered (95%)", color: "text-emerald-400 bg-emerald-950 border-emerald-800" },
                { label: "SQL & Query Optimization", status: "Mastered (90%)", color: "text-emerald-400 bg-emerald-950 border-emerald-800" },
                { label: "PyTorch & Deep Learning", status: "In Progress (65%)", color: "text-amber-400 bg-amber-950 border-amber-800" },
                { label: "AWS & Cloud Deployment", status: "In Progress (55%)", color: "text-amber-400 bg-amber-950 border-amber-800" },
                { label: "Kubernetes & Docker MLOps", status: "Recommended Gap", color: "text-violet-400 bg-violet-950 border-violet-800" },
              ].map((item) => (
                <div key={item.label} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200">{item.label}</span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${item.color}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
