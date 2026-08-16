"use client";

import React, { useState, useEffect } from "react";
import { predictSalary } from "@/lib/api";
import { IndianRupee, TrendingUp, Award, MapPin, Sparkles, CheckCircle2 } from "lucide-react";

export default function SalaryPredictor() {
  const [role, setRole] = useState("Data Scientist");
  const [experience, setExperience] = useState(3);
  const [education, setEducation] = useState("Master's");
  const [location, setLocation] = useState("Bengaluru");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["Python", "SQL", "Power BI", "Machine Learning"]);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const availableSkills = ["Python", "SQL", "Excel", "Power BI", "Tableau", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning", "Generative AI", "LLM", "NLP", "Statistics", "AWS", "Azure", "GCP", "Snowflake", "Databricks", "Apache Spark", "Airflow", "Docker", "Kubernetes", "Git"];

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await predictSalary({
        role,
        experience_years: experience,
        education_level: education,
        location,
        skills: selectedSkills,
      });
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlePredict();
  }, [role, experience, education, location]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Control Panel (Sliders & Filters) */}
      <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <IndianRupee className="h-6 w-6 text-emerald-400" />
            Salary Predictor Engine
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Estimate your expected annual CTC in India using AI based on role, experience, education, city, and technical skills.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Job Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500"
            >
              <option value="Data Analyst">Data Analyst</option>
              <option value="Business Analyst">Business Analyst</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Machine Learning Engineer">Machine Learning Engineer</option>
              <option value="AI Engineer">AI Engineer</option>
              <option value="Data Engineer">Data Engineer</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="AI Research Engineer">AI Research Engineer</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold text-slate-300">Years of Experience</span>
              <span className="font-bold text-violet-400">{experience} Years</span>
            </div>
            <input
              type="range"
              min={0}
              max={15}
              value={experience}
              onChange={(e) => setExperience(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Education Degree</label>
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500"
            >
              <option value="Bachelor's">Bachelor&apos;s Degree</option>
              <option value="Master's">Master&apos;s Degree</option>
              <option value="PhD">PhD / Doctorate</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Work Location / Mode</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500"
            >
              <option value="Bengaluru">Bengaluru</option>

              <option value="Hyderabad">Hyderabad</option>

              <option value="Pune">Pune</option>

              <option value="Mumbai">Mumbai</option>

              <option value="Delhi NCR">Delhi NCR</option>

              <option value="Chennai">Chennai</option>

              <option value="Kolkata">Kolkata</option>

              <option value="Ahmedabad">Ahmedabad</option>

              <option value="Remote">Remote (India)</option>

            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Technical Skills Stack</label>
            <div className="flex flex-wrap gap-1.5">
              {availableSkills.map((sk) => {
                const active = selectedSkills.includes(sk);
                return (
                  <button
                    key={sk}
                    onClick={() => toggleSkill(sk)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? "bg-violet-600 text-white border border-violet-400"
                        : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                    }`}
                  >
                    {sk}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-emerald-500/20 transition-all"
          >
            {loading ? "Generating AI Salary Prediction..." : "Predict Salary"}
          </button>
        </div>
      </div>

      {/* Salary Output Dashboard */}
      <div className="lg:col-span-7 space-y-6">
        {result ? (
          <>
            {/* Primary Salary Banner */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800/80 rounded-full text-xs font-bold uppercase tracking-wider">
                  Estimated Annual CTC
                </span>

                <div className="mt-4 flex items-baseline gap-3">
                  <h3 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    ₹{(result.predicted_salary / 100000).toFixed(1)} LPA
                  </h3>
                  <span className="text-sm text-slate-400 font-medium">Annual CTC ({result.currency}) </span>
                </div>

                <p className="text-xs text-emerald-400 mt-2 font-medium">
                  Expected Range: ₹{(result.salary_range_min / 100000).toFixed(1)} LPA – ₹{(result.salary_range_max / 100000).toFixed(1)} LPA
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-slate-800/80 pt-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Experience Factor</span>
                    <span className="font-semibold text-white">{result.experience_impact}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Education Value</span>
                    <span className="font-semibold text-white">{result.education_impact}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Location Benchmark</span>
                    <span className="font-semibold text-white">{result.location_impact}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* High Value Skills */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-violet-400" /> Top Salary Boosting Skills
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.top_value_skills?.map((item: any) => (
                  <div
                    key={item.skill}
                    className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-semibold text-white">{item.skill}</span>
                      <span className="block text-[10px] text-slate-400">{item.demand_level} Market Demand</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800/60">
                      +₹{item.value_add.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Progression Forecast */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-400" /> Career Growth Projection
              </h4>
              <div className="space-y-3">
                {result.career_progression_forecast?.map((item: any) => (
                  <div key={item.year} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">{item.year} — {item.role}</span>
                      <span className="text-white font-bold">₹{(item.salary / 100000).toFixed(1)} LPA</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
                        style={{ width: `${Math.min(100, (item.salary / (result.predicted_salary * 1.5)) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="p-12 text-center text-slate-400 text-sm bg-slate-900/50 rounded-2xl border border-slate-800 animate-pulse">
            Calculating prediction model...
          </div>
        )}
      </div>
    </div>
  );
}
