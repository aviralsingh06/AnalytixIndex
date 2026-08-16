"use client";

import { Loader2, Sparkles } from "lucide-react";

interface AnalyzeButtonProps {
  loading: boolean;
  disabled: boolean;
  onAnalyze: () => void;
}

export default function AnalyzeButton({
  loading,
  disabled,
  onAnalyze,
}: AnalyzeButtonProps) {
  return (
    <button
      onClick={onAnalyze}
      disabled={disabled || loading}
      className="flex w-full items-center justify-center gap-3 rounded-2xl bg-violet-600 px-6 py-4 font-semibold text-white transition-all duration-300 hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Analyzing Skill Gap...
        </>
      ) : (
        <>
          <Sparkles className="h-5 w-5" />
          Analyze Skill Gap
        </>
      )}
    </button>
  );
}