"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { forgotPassword } from "@/lib/api";

export function AuthModal() {
  const { isAuthModalOpen, setAuthModalOpen, authMode, setAuthMode, login, register } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [targetRole, setTargetRole] = useState("Data Scientist");
  const [expLevel, setExpLevel] = useState("Entry-Level");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (authMode === "login") {
        await login(email, password);
      } else if (authMode === "register") {
        await register({
          full_name: fullName,
          email,
          password,
          target_role: targetRole,
          experience_level: expLevel,
        });
      } else if (authMode === "forgot") {
        const res = await forgotPassword(email, password);
        setMessage(res.message || "Password reset successful");
        setTimeout(() => setAuthMode("login"), 2000);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            {authMode === "login" && "Welcome Back"}
            {authMode === "register" && "Create Platform Account"}
            {authMode === "forgot" && "Reset Password"}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {authMode === "login" && "Access your personalized career intelligence dashboard"}
            {authMode === "register" && "Join thousands of data scientists & engineers"}
            {authMode === "forgot" && "Enter your email to set a new password"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-950/80 border border-red-800 rounded-xl text-red-300 text-xs">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 p-3 bg-emerald-950/80 border border-emerald-800 rounded-xl text-emerald-300 text-xs">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === "register" && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Chen"
                className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {authMode === "forgot" ? "New Password" : "Password"}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          {authMode === "register" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Role</label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="Machine Learning Engineer">ML Engineer</option>
                  <option value="Data Analyst">Data Analyst</option>
                  <option value="Data Engineer">Data Engineer</option>
                  <option value="Software Engineer">Software Engineer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Experience</label>
                <select
                  value={expLevel}
                  onChange={(e) => setExpLevel(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="Entry-Level">Entry-Level</option>
                  <option value="Mid-Level">Mid-Level</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead">Lead</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
          >
            {loading ? "Processing..." : authMode === "login" ? "Sign In" : authMode === "register" ? "Create Account" : "Reset Password"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400 space-y-2">
          {authMode === "login" && (
            <>
              <p>
                Don&apos;t have an account?{" "}
                <button onClick={() => setAuthMode("register")} className="text-blue-400 hover:underline font-semibold">
                  Register here
                </button>
              </p>
              <p>
                Forgot your password?{" "}
                <button onClick={() => setAuthMode("forgot")} className="text-slate-300 hover:underline">
                  Reset password
                </button>
              </p>
            </>
          )}

          {authMode === "register" && (
            <p>
              Already have an account?{" "}
              <button onClick={() => setAuthMode("login")} className="text-blue-400 hover:underline font-semibold">
                Sign in
              </button>
            </p>
          )}

          {authMode === "forgot" && (
            <p>
              Remembered your password?{" "}
              <button onClick={() => setAuthMode("login")} className="text-blue-400 hover:underline font-semibold">
                Back to Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
