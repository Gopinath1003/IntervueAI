import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  LayoutDashboard,
  Play,
  History,
  BarChart2,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronRight,
  TrendingUp,
  Cpu,
  Calendar,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Start Interview", icon: Play, active: false },
  { label: "Interview History", icon: History, active: false },
  { label: "Performance Analytics", icon: BarChart2, active: false },
  { label: "Profile", icon: User, active: false },
  { label: "Settings", icon: Settings, active: false },
];

/* ─── SIDEBAR ──────────────────────────────────────────── */
function Sidebar({ open, onClose }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-40 flex flex-col
          w-64 bg-[#0c0e1a] border-r border-slate-800/60
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-800/60">
          <span className="text-lg font-extrabold bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent tracking-tight">
            IntervueAI
          </span>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-500 hover:text-slate-300 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200 group
                ${
                  active
                    ? "bg-linear-to-r from-blue-600/20 to-violet-600/10 text-white border border-blue-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }
              `}
            >
              <Icon
                size={18}
                className={
                  active
                    ? "text-blue-400"
                    : "text-slate-500 group-hover:text-slate-300 transition-colors"
                }
              />
              {label}
              {active && (
                <ChevronRight size={14} className="ml-auto text-blue-400/60" />
              )}
            </button>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="px-3 py-4 border-t border-slate-800/60 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-800/40">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
              GK
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-200 truncate">
                {user.name}
              </p>
              <p className="text-xs text-slate-500 truncate">Pro Plan</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 group">
            <LogOut
              size={18}
              className="group-hover:text-red-400 transition-colors"
            />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

/* ─── NAVBAR ───────────────────────────────────────────── */
function Navbar({ onMenuClick }) {
  const user = JSON.parse(localStorage.getItem("user"));

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
          <span>Jun 13, 2026</span>
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

/* ─── HERO ─────────────────────────────────────────────── */

function HeroSection() {
  return (
    <div className="relative bg-linear-to-br from-blue-900/20 via-[#0c0e1a] to-violet-900/20 border border-slate-800/60 rounded-2xl p-6 lg:p-8 overflow-hidden">
      {/* decorative blobs */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 right-24 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-emerald-400 font-medium">
              AI Ready
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, Gopi 👋
          </h2>
          <p className="text-slate-400 mt-1 text-sm lg:text-base">
            Ready to ace your next interview? You've practiced{" "}
            <span className="text-blue-400 font-semibold">24 times</span> — keep
            the momentum.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200">
              <Cpu size={16} />
              Start New Interview
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-xl border border-slate-700/60 transition-all duration-200">
              <BarChart2 size={16} />
              View Progress
            </button>
          </div>
        </div>

        {/* Score summary pill */}
        <div className="shrink-0 bg-slate-800/60 border border-slate-700/40 rounded-2xl px-5 py-4 flex items-center gap-4 backdrop-blur-sm">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
              Avg Score
            </p>
            <p className="text-xl font-extrabold text-white">
              78<span className="text-sm font-normal text-slate-400">%</span>
            </p>
            <p className="text-xs text-emerald-400 mt-0.5 flex items-center gap-1">
              <TrendingUp size={11} /> +4% this month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ROOT ─────────────────────────────────────────────── */
function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#070910] text-slate-100 overflow-hidden font-sans">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto px-4 lg:px-6 py-6 space-y-5">
          {/* Hero */}
          <HeroSection />
          <div className="h-4" />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
