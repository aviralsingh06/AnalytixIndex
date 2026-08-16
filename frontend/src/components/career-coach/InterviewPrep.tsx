"use client";

import React, { useState, useEffect } from "react";
import { getInterviewPrep } from "@/lib/api";
import { Code, CheckCircle, ChevronDown, ChevronUp, Sparkles, BookOpen } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

export default function InterviewPrep() {
  const [role, setRole] = useState("Data Scientist");
  const [categories, setCategories] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Python");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await getInterviewPrep(role);
        setCategories(data.categories || {});
        const catKeys = Object.keys(data.categories || {});
        if (catKeys.length > 0 && !catKeys.includes(activeCategory)) {
          setActiveCategory(catKeys[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [role]);

  const catNames = Object.keys(categories);
  const currentQuestions = categories[activeCategory] || [];

  return (
    <div className="space-y-6">
      {/* Header Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-400" />
            AI Mock Interview & Technical Question Bank
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Curated technical, coding, SQL, machine learning, and HR questions with AI feedback guides.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-medium text-slate-300">Target Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500"
          >
            <option value="Data Scientist">Data Scientist</option>
            <option value="Machine Learning Engineer">ML Engineer</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="Data Engineer">Data Engineer</option>
            <option value="Software Engineer">Software Engineer</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {catNames.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === cat
                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20"
                : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800"
            }`}
          >
            {cat} ({categories[cat]?.length || 0})
          </button>
        ))}
      </div>

      {/* Question Cards */}
      {loading ? (
        <div className="p-8 text-center text-slate-400 text-sm bg-slate-900/50 rounded-2xl border border-slate-800 animate-pulse">
          Loading interview questions for {role}...
        </div>
      ) : currentQuestions.length === 0 ? (
        <div className="p-8 text-center text-slate-400 text-sm bg-slate-900/50 rounded-2xl border border-slate-800">
          No questions found for this category.
        </div>
      ) : (
        <div className="space-y-4">
          {currentQuestions.map((q) => {
            const isExpanded = expandedId === q.id;
            return (
              <div
                key={q.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all"
              >
                <div
                  className="flex items-start justify-between cursor-pointer gap-4"
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-violet-950 text-violet-400 border border-violet-800/60 rounded-full text-[10px] font-semibold">
                        {q.difficulty}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{q.category}</span>
                    </div>
                    <h3 className="text-base font-semibold text-slate-100">{q.question}</h3>
                  </div>

                  <button className="p-1 text-slate-400 hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
                    <div>
                      <h4 className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <CheckCircle className="h-4 w-4" /> AI Key Answer Points & Strategy
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                        {q.answer_guide}
                      </p>
                    </div>

                    {q.sample_code && (
                      <div>
                        <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <Code className="h-4 w-4" /> Reference Solution Code
                        </h4>
                        <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-emerald-300 font-mono overflow-x-auto">
                          {q.sample_code}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
