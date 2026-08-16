"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, UserCircle2, LogIn, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const PAGE_TITLES: Record<string, { title: string; sub: string }> = {
  "/": { title: "Dashboard", sub: "Your career intelligence overview" },
  "/resume": { title: "Resume Analysis", sub: "Upload and analyze your resume" },
  "/skill-gap": { title: "Skill Gap Analysis", sub: "Compare your skills with target roles" },
  "/ats-score": { title: "ATS Score", sub: "Optimize your resume for ATS systems" },
  "/career-coach": { title: "AI Career Coach", sub: "Get personalized career guidance & interview prep" },
  "/job-recommendation": { title: "Job Recommendations", sub: "Discover matching opportunities" },
  "/salary-predictor": { title: "Salary Predictor", sub: "AI-powered salary forecast & benchmark" },
  "/market-intelligence": { title: "Market Intelligence", sub: "Real-time job market insights & hiring trends" },
  "/analytics": { title: "Analytics", sub: "Personalized career progress metrics" },
  "/profile": { title: "User Profile", sub: "Manage profile, saved jobs, and learning history" },
  "/settings": { title: "Settings", sub: "Manage your preferences & account security" },
};

export default function Navbar() {
  const pathname = usePathname();
  const page = PAGE_TITLES[pathname] || { title: "AI Job Market", sub: "Discover trends and insights" };
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState(3);
  const { user, token, setAuthModalOpen, setAuthMode, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/95 px-8 backdrop-blur">
      {/* Left */}
      <div>
        <h1 className="text-xl font-bold text-white">{page.title}</h1>
        <p className="text-xs text-slate-400">{page.sub}</p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search platform..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 border-slate-700 bg-slate-900 pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500"
          />
        </div>

        {/* Notifications */}
        <Button
          variant="outline"
          size="icon"
          className="relative border-slate-700 bg-slate-900 hover:bg-slate-800"
          onClick={() => setNotifications(0)}
        >
          <Bell className="h-5 w-5 text-white" />
          {notifications > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-xs text-white">
              {notifications}
            </span>
          )}
        </Button>

        {/* User Auth Info */}
        {token && user ? (
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 hover:border-slate-700 transition-all"
            >
              <UserCircle2 className="h-9 w-9 text-violet-400" />
              <div className="text-left hidden sm:block">
                <p className="text-sm font-semibold text-white">{user.full_name}</p>
                <p className="text-xs text-slate-400">{user.target_role || "Data Scientist"}</p>
              </div>
            </Link>
            <Button
              variant="outline"
              size="icon"
              onClick={logout}
              title="Sign Out"
              className="border-slate-800 bg-slate-900 hover:bg-red-950/50 hover:border-red-800 text-slate-400 hover:text-red-400"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                setAuthMode("login");
                setAuthModalOpen(true);
              }}
              variant="outline"
              className="border-slate-700 bg-slate-900 text-white hover:bg-slate-800 text-xs px-3"
            >
              <LogIn className="h-4 w-4 mr-1 text-violet-400" />
              Sign In
            </Button>
            <Button
              onClick={() => {
                setAuthMode("register");
                setAuthModalOpen(true);
              }}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs px-3 shadow-lg shadow-violet-500/20"
            >
              Get Started
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}