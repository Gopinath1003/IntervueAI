import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Play,
  History,
  BarChart2,
  User,
  Settings,
  LogOut,
  X,
  ChevronRight,
} from "lucide-react";

function Sidebar({ open, onClose }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Start Interview",
      path: "/dashboard/interview/start",
      icon: Play,
    },
    {
      label: "Interview History",
      path: "/dashboard/history",
      icon: History,
    },
    {
      label: "Performance Analytics",
      path: "/dashboard/analytics",
      icon: BarChart2,
    },
    {
      label: "Profile",
      path: "/dashboard/profile",
      icon: User,
    },
    {
      label: "Settings",
      path: "/dashboard/settings",
      icon: Settings,
    },
  ];

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
          <span onClick={() => navigate("/")} className="text-lg font-extrabold bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent tracking-tight cursor-pointer">
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
          {navItems.map(({ label, icon: Icon, path }) => {
            const isActive = location.pathname === path;

            return (
              <button
                key={label}
                onClick={() => navigate(path)}
                className={`
          w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
          transition-all duration-200 group cursor-pointer
          ${
            isActive
              ? "bg-linear-to-r from-blue-600/20 to-violet-600/10 text-white border border-blue-500/20"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }
        `}
              >
                <Icon
                  size={18}
                  className={
                    isActive
                      ? "text-blue-400"
                      : "text-slate-500 group-hover:text-slate-300 transition-colors"
                  }
                />

                {label}

                {isActive && (
                  <ChevronRight
                    size={14}
                    className="ml-auto text-blue-400/60"
                  />
                )}
              </button>
            );
          })}
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
              <p className="text-xs text-slate-500 truncate">Free Plan</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 group"
          >
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

export default Sidebar;
