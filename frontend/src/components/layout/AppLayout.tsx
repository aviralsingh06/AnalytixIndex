"use client";

import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-950">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="flex min-w-0 flex-1 flex-col">

        {/* Navbar */}

        <Navbar />

        {/* Page Content */}

        <main className="min-w-0 flex-1 overflow-auto bg-slate-950 p-8">

          <div className="mx-auto w-full max-w-[1800px]">

            {children}

          </div>

        </main>

      </div>

    </div>
  );
}