"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AppLayout } from "@/components/layout";
import { getMarketIntelligence } from "@/lib/api";
import MarketDashboard from "@/components/market-intelligence/MarketDashboard";
import { Loader2, TrendingUp, RefreshCw } from "lucide-react";

export default function MarketIntelligencePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  async function fetchData() {
    setLoading(true);
    try {
      const result = await getMarketIntelligence();
      setData(result);
    } catch (err: any) {
      toast.error(err.message || "Failed to load market intelligence.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5">
              <TrendingUp className="h-4 w-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-300">Live Analytics</span>
            </div>
            <h1 className="text-4xl font-bold text-white">Market Intelligence</h1>
            <p className="mt-2 text-slate-400">
              Real-time data science job market trends, salary insights, and top skills.
            </p>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 disabled:opacity-50 transition"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/50 p-16">
            <div className="relative mb-6">
              <div className="h-20 w-20 animate-spin rounded-full border-4 border-slate-700 border-t-violet-500" />
              <TrendingUp className="absolute inset-0 m-auto h-8 w-8 text-violet-400" />
            </div>
            <p className="text-lg font-semibold text-white">Loading Market Data...</p>
            <p className="mt-1 text-sm text-slate-400">Aggregating job market analytics</p>
          </div>
        )}

        {/* Data */}
        {!loading && data && <MarketDashboard data={data} />}

        {/* Error / empty */}
        {!loading && !data && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 p-16 text-center">
            <TrendingUp className="mb-4 h-16 w-16 text-slate-600" />
            <h3 className="text-xl font-semibold text-slate-300">No Data Available</h3>
            <p className="mt-2 text-slate-500">Could not load market intelligence. Try refreshing.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
