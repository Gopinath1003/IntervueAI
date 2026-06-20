import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F] text-white">

      <div className="text-center">

        <h1 className="text-8xl font-black mb-4">
          404
        </h1>

        <h2 className="text-2xl font-semibold mb-3">
          Page Not Found
        </h2>

        <p className="text-slate-400 mb-8">
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/dashboard"
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500"
        >
          Return To Dashboard
        </Link>

      </div>

    </div>
  );
}

export default NotFound;