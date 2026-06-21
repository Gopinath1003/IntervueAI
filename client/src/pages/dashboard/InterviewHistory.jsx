import { useEffect, useState, useRef } from "react";
import axios from "axios";

function InterviewHistory() {

    const [history, setHistory] =
    useState([]);

    const fetchHistory =
    async () => {

        const token =
        localStorage.getItem("token");

        const response =
        await axios.get(

            `${import.meta.env.VITE_API_URL}/api/interview/history`,

            {
                headers:{
                    Authorization: token
                }
            }
        );

        setHistory(
            response.data
        );
    };

    const hasFetched = useRef(false);
    
      useEffect(() => {
        if (hasFetched.current) return;
    
        hasFetched.current = true;
    
        fetchHistory();
      }, []);

    return (
  <div className="p-6">
    {/* Header */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-white mb-2">
        Interview History
      </h1>

      <p className="text-sm text-slate-400">
        Review your previous interviews and track your progress.
      </p>
    </div>

    {history.length === 0 ? (
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-semibold text-white mb-2">
          No Interviews Yet
        </h2>

        <p className="text-slate-400">
          Complete your first interview to see history here.
        </p>
      </div>
    ) : (
      <div className="grid gap-4">
        {history.map((interview) => (
          <div
            key={interview._id}
            className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              {/* Left */}
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {interview.role}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {new Date(
                    interview.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4">

                <div className="bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-xl">
                  <p className="text-xs text-slate-400">
                    Score
                  </p>

                  <p className="text-lg font-bold text-blue-400">
                    {interview.overallScore}/10
                  </p>
                </div>

                <div
                  className={`px-4 py-2 rounded-xl text-sm font-medium
                  ${
                    interview.overallScore >= 8
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : interview.overallScore >= 6
                      ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}
                >
                  {interview.overallScore >= 8
                    ? "Excellent"
                    : interview.overallScore >= 6
                    ? "Good"
                    : "Needs Improvement"}
                </div>

              </div>
            </div>

            {/* Feedback Preview */}
            {interview.suggestions?.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-800">
                <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">
                  Top Suggestion
                </p>

                <p className="text-sm text-slate-300">
                  {interview.suggestions[0]}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);
}

export default InterviewHistory;