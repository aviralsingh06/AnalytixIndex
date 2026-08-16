"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Briefcase,
  BrainCircuit,
  SearchCheck,
  TrendingUp,
  DollarSign,
  PieChart,
  User,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

const menuItems = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Resume Analysis", href: "/resume", icon: FileText },
  { title: "Skill Gap", href: "/skill-gap", icon: BarChart3 },
  { title: "ATS Score", href: "/ats-score", icon: SearchCheck },
  { title: "Career Coach", href: "/career-coach", icon: BrainCircuit },
  { title: "Job Recommendations", href: "/job-recommendation", icon: Briefcase },
  { title: "Salary Predictor", href: "/salary-predictor", icon: DollarSign },
  { title: "Market Intelligence", href: "/market-intelligence", icon: TrendingUp },
  { title: "Analytics", href: "/analytics", icon: PieChart },
  { title: "Profile", href: "/profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <aside className="flex h-screen w-72 flex-shrink-0 flex-col border-r border-slate-800 bg-slate-950">
      <Logo />

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-violet-600/20 text-white border border-violet-500/30 shadow-lg shadow-violet-500/10"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 flex-shrink-0 transition-colors",
                  active ? "text-violet-400" : "text-slate-500 group-hover:text-slate-300"
                )}
              />
              <span>{item.title}</span>
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400 shadow-sm shadow-violet-400" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
            isActive("/settings")
              ? "bg-violet-600/20 text-white border border-violet-500/30"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          )}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}