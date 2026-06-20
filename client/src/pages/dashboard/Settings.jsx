import {
  Lock,
  Bell,
  Mic,
  Moon,
  Download,
  LogOut,
  Trash2,
  User,
} from "lucide-react";

function Settings() {
  return (
    <div className="p-8 text-white">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">
          Settings
        </h1>

        <p className="text-slate-400">
          Manage your account preferences and interview settings.
        </p>
      </div>

      {/* Security */}
      <div className="bg-[#111827] rounded-3xl p-8 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="text-indigo-400" />
          <h2 className="text-2xl font-semibold">
            Security
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="password"
            placeholder="Current Password"
            className="bg-[#0F172A] p-3 rounded-xl border border-slate-700"
          />

          <input
            type="password"
            placeholder="New Password"
            className="bg-[#0F172A] p-3 rounded-xl border border-slate-700"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="bg-[#0F172A] p-3 rounded-xl border border-slate-700"
          />
        </div>

        <button className="mt-5 bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-xl font-medium">
          Change Password
        </button>
      </div>

      {/* Interview Preferences */}
      <div className="bg-[#111827] rounded-3xl p-8 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Mic className="text-purple-400" />
          <h2 className="text-2xl font-semibold">
            Interview Preferences
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block text-slate-400 mb-2">
              Preferred Role
            </label>

            <select className="w-full bg-[#0F172A] p-3 rounded-xl border border-slate-700">
              <option>Java Developer</option>
              <option>Python Developer</option>
              <option>React Developer</option>
              <option>Data Analyst</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-2">
              Difficulty Level
            </label>

            <select className="w-full bg-[#0F172A] p-3 rounded-xl border border-slate-700">
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

        </div>
      </div>

      {/* Notifications */}
      <div className="bg-[#111827] rounded-3xl p-8 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="text-yellow-400" />
          <h2 className="text-2xl font-semibold">
            Notifications
          </h2>
        </div>

        <div className="space-y-5">

          <div className="flex items-center justify-between">
            <span>Email Notifications</span>

            <input
              type="checkbox"
              className="w-5 h-5"
            />
          </div>

          <div className="flex items-center justify-between">
            <span>Weekly Performance Report</span>

            <input
              type="checkbox"
              className="w-5 h-5"
            />
          </div>

        </div>
      </div>

      {/* Appearance */}
      <div className="bg-[#111827] rounded-3xl p-8 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Moon className="text-cyan-400" />
          <h2 className="text-2xl font-semibold">
            Appearance
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <span>Dark Mode</span>

          <input
            type="checkbox"
            checked
            readOnly
            className="w-5 h-5"
          />
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-[#111827] rounded-3xl p-8 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Download className="text-green-400" />
          <h2 className="text-2xl font-semibold">
            Data Management
          </h2>
        </div>

        <div className="flex flex-wrap gap-4">

          <button className="bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded-xl">
            Export Interview History
          </button>

          <button className="bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded-xl">
            Download Performance Report
          </button>

        </div>
      </div>

      {/* Account */}
      <div className="bg-[#111827] rounded-3xl p-8 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="text-indigo-400" />
          <h2 className="text-2xl font-semibold">
            Account
          </h2>
        </div>

        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-5 py-3 rounded-xl">
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-950/40 border border-red-500/20 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <Trash2 className="text-red-400" />
          <h2 className="text-2xl font-semibold text-red-400">
            Danger Zone
          </h2>
        </div>

        <p className="text-slate-400 mb-6">
          Permanently delete your account and all associated
          interview history, analytics, and personal data.
        </p>

        <button className="bg-red-600 hover:bg-red-500 px-5 py-3 rounded-xl font-medium">
          Delete Account
        </button>
      </div>

    </div>
  );
}

export default Settings;