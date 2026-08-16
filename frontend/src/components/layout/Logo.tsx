import { BrainCircuit } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 shadow-lg">
        <BrainCircuit className="h-7 w-7 text-white" />
      </div>

      <div>
        <h1 className="text-lg font-bold text-white">
          AI Job Market
        </h1>

        <p className="text-xs text-slate-400">
          Intelligence Platform
        </p>
      </div>
    </div>
  );
}