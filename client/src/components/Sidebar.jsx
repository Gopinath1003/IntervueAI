import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Play,
  History,
  BarChart2,
  User,
  Settings,
  LogOut,
  Plus
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
    // {
    //   label: "Settings",
    //   path: "/dashboard/settings",
    //   icon: Settings,
    // },
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
    w-80 bg-[#0c0e1a] border-r border-slate-800/60
    transition-transform duration-300
    ${open ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0 lg:static
  `}
>
  {/* Logo */}
  <div className="px-6 py-6">
    <h1
      onClick={() => navigate("/")}
      className="text-2xl font-bold bg-linear-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent cursor-pointer"
    >
      IntervueAI
    </h1>
  </div>

  {/* Primary CTA */}
  <div className="px-10">
    <button
      onClick={() => navigate("/dashboard/interview/start")}
      className="w-full flex items-center justify-between px-5 py-4 rounded-xl bg-linear-to-r from-blue-600 to-violet-600 text-white font-semibold cursor-pointer"
    >
      New Interview
      <Plus size={18} />
    </button>
  </div>

  {/* Main Navigation */}
  <nav className="mt-10 px-10 flex-1">
    <div className="space-y-4">
      {navItems.map(({ label, icon: Icon, path }) => {
        const isActive = location.pathname === path;

        return (
          <button
            key={label}
            onClick={() => navigate(path)}
            className={`
              w-full flex items-center gap-4 px-4 py-3 rounded-xl
              transition-all duration-200
              ${
                isActive
                  ? "bg-blue-500/10 text-blue-400"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }
            `}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  </nav>

  {/* Settings Section */}
  <div className="px-4 mb-6">
    <button
      onClick={() => navigate("/dashboard/settings")}
      className={`
        w-full flex items-center gap-4 px-4 py-3 rounded-xl
        ${
          location.pathname === "/dashboard/settings"
            ? "bg-blue-500/10 text-blue-400"
            : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
        }
      `}
    >
      <Settings size={20} />
      Settings
    </button>
  </div>

  {/* User Section */}
  <div className="border-t border-slate-800 px-4 py-4">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold">
        GK
      </div>

      <div className="flex-1">
        <p className="text-sm font-medium text-white">
          {user?.name}
        </p>
        <p className="text-xs text-slate-500">
          Free Plan
        </p>
      </div>

      <button onClick={handleLogout}>
        <LogOut
          size={18}
          className="text-slate-400 hover:text-red-400"
        />
      </button>
    </div>
  </div>
</aside>
    </>
  );
}

export default Sidebar;
