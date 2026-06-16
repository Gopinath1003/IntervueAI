import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

import { Menu, Bell, Calendar } from "lucide-react";

/* ─── NAVBAR ───────────────────────────────────────────── */
function Navbar({ onMenuClick }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-20 bg-[#070910]/80 backdrop-blur-xl border-b border-slate-800/60 px-4 lg:px-6 py-3.5 flex items-center gap-4">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-slate-400 hover:text-slate-200 transition-colors p-1"
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      <div className="flex-1">
        <h1 className="text-base font-semibold text-slate-200 hidden sm:block">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Date pill */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-800/40 px-3 py-1.5 rounded-full border border-slate-700/40">
          <Calendar size={12} />
          <span>{formattedDate}</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-xl transition-all">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-[#070910]" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white">
            GK
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-200 leading-none">
              {user.name}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">Pro Plan</p>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ─── ROOT ─────────────────────────────────────────────── */
function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#070910] text-slate-100 overflow-hidden font-sans">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto px-4 lg:px-6 py-6 space-y-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
