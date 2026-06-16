import { useNavigate } from "react-router-dom";
import { Cpu, BarChart2, TrendingUp } from "lucide-react";

function DashboardHome() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

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
            Welcome back, {user.name} 👋
          </h2>
          <p className="text-slate-400 mt-1 text-sm lg:text-base">
            Ready to ace your next interview? You've practiced{" "}
            <span className="text-blue-400 font-semibold">24 times</span> — keep
            the momentum.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5">
            <button onClick={() => navigate("/dashboard/interview/start")} className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200">
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

export default DashboardHome;