import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Home,
} from "lucide-react";

import InterviewStepper from "../../components/InterviewStepper";

function InterviewResult() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state?.evaluation) {
    return (
      <div className="p-6">
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            No Evaluation Found
          </h2>

          <p className="text-slate-400 mb-6">
            Please complete an interview to view results.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-5 py-3 rounded-xl bg-linear-to-r from-blue-600 to-violet-600 text-white"
          >
            Go To Dashboard
          </button>
        </div>
      </div>
    );
  }

  const evaluation = location.state.evaluation;

  return (
    <div className="p-6">
      <InterviewStepper step={3} />

      {/* Header */}
      <div className="mt-6 mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Interview Result
        </h1>

        <p className="text-sm text-slate-400">
          AI-powered evaluation of your interview performance.
        </p>
      </div>

      {/* Score Card */}
      <div className="bg-linear-to-br from-blue-900/20 via-slate-900/80 to-violet-900/20 border border-slate-800 rounded-3xl p-8 mb-6">
        <p className="text-slate-400 text-sm uppercase tracking-wider">
          Overall Score
        </p>

        <h2 className="text-6xl font-black text-white mt-2">
          {evaluation.overallScore}
          <span className="text-2xl text-slate-500">/10</span>
        </h2>

        <p className="text-emerald-400 mt-3">
          Interview successfully evaluated by AI
        </p>
      </div>

      {/* Strengths */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 mb-5">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="text-emerald-400" size={22} />
          <h3 className="text-xl font-semibold text-white">
            Strengths
          </h3>
        </div>

        <ul className="space-y-3">
          {evaluation.strengths?.map((item, index) => (
            <li
              key={index}
              className="text-slate-300 flex gap-3"
            >
              <span className="text-emerald-400">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 mb-5">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="text-yellow-400" size={22} />
          <h3 className="text-xl font-semibold text-white">
            Weaknesses
          </h3>
        </div>

        <ul className="space-y-3">
          {evaluation.weaknesses?.map((item, index) => (
            <li
              key={index}
              className="text-slate-300 flex gap-3"
            >
              <span className="text-yellow-400">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Suggestions */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="text-blue-400" size={22} />
          <h3 className="text-xl font-semibold text-white">
            Suggestions
          </h3>
        </div>

        <ul className="space-y-3">
          {evaluation.suggestions?.map((item, index) => (
            <li
              key={index}
              className="text-slate-300 flex gap-3"
            >
              <span className="text-blue-400">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-linear-to-r from-blue-600 to-violet-600 text-white font-medium hover:opacity-90 transition"
        >
          <Home size={18} />
          Back To Dashboard
        </button>
      </div>
    </div>
  );
}

export default InterviewResult;