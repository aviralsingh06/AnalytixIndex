"use client";

import { Sparkles, Upload, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
  return (
    <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

      {/* Left Section */}

      <div>

        <div className="mb-2 flex items-center gap-2">

          <Sparkles className="h-5 w-5 text-violet-400" />

          <span className="text-sm font-medium uppercase tracking-widest text-violet-400">
            AI Powered Dashboard
          </span>

        </div>

        <h1 className="text-4xl font-bold tracking-tight text-white">
          Welcome Back 👋
        </h1>

        <p className="mt-3 max-w-2xl text-slate-400">
          Track hiring trends, analyze resumes, monitor ATS scores,
          discover in-demand skills, and receive AI-powered career
          recommendations from one unified dashboard.
        </p>

      </div>

      {/* Right Section */}

      <div className="flex gap-3">

        <Button
          variant="outline"
          className="border-slate-700 bg-slate-900 text-white hover:bg-slate-800"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>

        <Button className="bg-violet-600 text-white hover:bg-violet-700">

          <Upload className="mr-2 h-4 w-4" />

          Upload Resume

        </Button>

      </div>

    </div>
  );
}