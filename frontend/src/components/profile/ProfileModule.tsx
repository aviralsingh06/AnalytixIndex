"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { updateProfile, getSavedJobs, getResumes } from "@/lib/api";
import { User, Briefcase, FileText, Bookmark, BookOpen, Award, CheckCircle } from "lucide-react";

export default function ProfileModule() {
  const { user, refreshUser } = useAuth();
  const [fullName, setFullName] = useState(user?.full_name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [targetRole, setTargetRole] = useState(user?.target_role || "Data Scientist");
  const [location, setLocation] = useState(user?.location || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [githubUrl, setGithubUrl] = useState(user?.github_url || "");
  const [linkedinUrl, setLinkedinUrl] = useState(user?.linkedin_url || "");
  const [portfolioUrl, setPortfolioUrl] = useState(user?.portfolio_url || "");
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"details" | "resumes" | "saved_jobs">("details");

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || "");
      setBio(user.bio || "");
      setTargetRole(user.target_role || "Data Scientist");
      setLocation(user.location || "");
      setPhone(user.phone || "");
      setGithubUrl(user.github_url || "");
      setLinkedinUrl(user.linkedin_url || "");
      setPortfolioUrl(user.portfolio_url || "");
    }
  }, [user]);

  useEffect(() => {
    async function loadData() {
      try {
        const [jobs, resList] = await Promise.all([
          getSavedJobs().catch(() => []),
          getResumes(user?.id || 1).catch(() => []),
        ]);
        setSavedJobs(jobs);
        setResumes(resList);
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, [user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await updateProfile({
        full_name: fullName,
        bio,
        target_role: targetRole,
        location,
        phone,
        github_url: githubUrl,
        linkedin_url: linkedinUrl,
        portfolio_url: portfolioUrl,
      });
      await refreshUser();
      setMessage("Profile updated successfully!");
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* User Info Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-violet-500/20">
            {user?.full_name?.charAt(0) || "U"}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user?.full_name}</h2>
            <p className="text-xs text-slate-400">{user?.email} • {user?.target_role || "Data Scientist"}</p>
            <p className="text-xs text-slate-400 mt-1">{user?.location || "San Francisco, CA"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("details")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              activeTab === "details" ? "bg-violet-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            Edit Profile
          </button>
          <button
            onClick={() => setActiveTab("resumes")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              activeTab === "resumes" ? "bg-violet-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            Resumes ({resumes.length})
          </button>
          <button
            onClick={() => setActiveTab("saved_jobs")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              activeTab === "saved_jobs" ? "bg-violet-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            Saved Jobs ({savedJobs.length})
          </button>
        </div>
      </div>

      {message && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle className="h-4 w-4" /> {message}
        </div>
      )}

      {/* Tab Content */}
      {activeTab === "details" && (
        <form onSubmit={handleUpdate} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Personal & Career Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Job Role</label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500"
              >
                <option value="Data Scientist">Data Scientist</option>
                <option value="Machine Learning Engineer">ML Engineer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Data Engineer">Data Engineer</option>
                <option value="Software Engineer">Software Engineer</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Bio / Summary</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub Profile URL</label>
              <input
                type="text"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn Profile URL</label>
              <input
                type="text"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-violet-500/20 transition-all"
          >
            {loading ? "Saving..." : "Save Profile Changes"}
          </button>
        </form>
      )}

      {activeTab === "resumes" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white mb-4">Resume History</h3>
          {resumes.length === 0 ? (
            <p className="text-xs text-slate-400">No resumes uploaded yet.</p>
          ) : (
            <div className="space-y-3">
              {resumes.map((res: any) => (
                <div key={res.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-violet-400" />
                    <div>
                      <h4 className="text-xs font-semibold text-white">{res.file_name}</h4>
                      <p className="text-[10px] text-slate-400">Uploaded {res.upload_date?.substring(0, 10)}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-violet-950 text-violet-300 border border-violet-800/60 rounded-lg text-xs font-bold">
                    Score {res.ats_score || 84}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "saved_jobs" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white mb-4">Saved Jobs</h3>
          {savedJobs.length === 0 ? (
            <p className="text-xs text-slate-400">No saved jobs yet.</p>
          ) : (
            <div className="space-y-3">
              {savedJobs.map((j: any) => (
                <div key={j.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-white">{j.title}</h4>
                    <p className="text-[10px] text-slate-400">{j.company_name} • {j.location} • ${j.salary_min?.toLocaleString()} - ${j.salary_max?.toLocaleString()}</p>
                  </div>
                  {j.apply_url && (
                    <a
                      href={j.apply_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-semibold"
                    >
                      Apply Now
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
