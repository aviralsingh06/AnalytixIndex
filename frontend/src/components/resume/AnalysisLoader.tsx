"use client";

import {
  BrainCircuit,
  Loader2,
  Sparkles,
  ScanSearch,
} from "lucide-react";

export default function AnalysisLoader() {
  return (
    <div className="rounded-3xl border border-violet-500/20 bg-slate-900/80 p-10">

      <div className="flex flex-col items-center text-center">

        <div className="relative">

          <div className="absolute inset-0 animate-ping rounded-full bg-violet-500/20" />

          <div className="relative rounded-full bg-violet-600/20 p-6">

            <BrainCircuit className="h-12 w-12 text-violet-400" />

          </div>

        </div>

        <h2 className="mt-6 text-2xl font-bold text-white">
          AI is analyzing your resume...
        </h2>

        <p className="mt-3 max-w-xl text-slate-400">
          Extracting skills, calculating ATS compatibility,
          identifying missing technologies, matching jobs,
          and generating personalized recommendations.
        </p>

        <div className="mt-10 w-full max-w-xl space-y-5">

          <LoaderItem
            icon={<ScanSearch className="h-5 w-5" />}
            text="Reading Resume"
          />

          <LoaderItem
            icon={<Sparkles className="h-5 w-5" />}
            text="Extracting Skills"
          />

          <LoaderItem
            icon={<BrainCircuit className="h-5 w-5" />}
            text="Running AI Analysis"
          />

        </div>

        <Loader2 className="mt-8 h-8 w-8 animate-spin text-violet-400" />

      </div>

    </div>
  );
}

interface LoaderItemProps {
  icon: React.ReactNode;
  text: string;
}

function LoaderItem({
  icon,
  text,
}: LoaderItemProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">

      <div className="rounded-xl bg-violet-600/20 p-3 text-violet-400">
        {icon}
      </div>

      <div className="flex-1">

        <p className="font-medium text-white">
          {text}
        </p>

      </div>

      <Loader2 className="h-5 w-5 animate-spin text-violet-400" />

    </div>
  );
}