import axios from "axios";
import { useNavigate } from "react-router-dom";
import InterviewStepper from "../../components/InterviewStepper";
import {
  Coffee,
  Code2,
  Atom,
  BarChart3,
  ArrowRight,
} from "lucide-react";

function StartInterview() {
  const navigate = useNavigate();

  const roles = [
    {
      name: "Java Developer",
      icon: <Coffee size={22} />,
      description:
        "Core Java, OOP, Collections, Multithreading and Spring concepts.",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Python Developer",
      icon: <Code2 size={22} />,
      description:
        "Python fundamentals, OOP, Django, APIs and problem solving.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "React Developer",
      icon: <Atom size={22} />,
      description:
        "React, Hooks, State Management, Routing and Frontend concepts.",
      color: "from-cyan-500 to-sky-500",
    },
    {
      name: "Data Analyst",
      icon: <BarChart3 size={22} />,
      description:
        "SQL, Excel, Statistics, Power BI and Data Visualization.",
      color: "from-violet-500 to-purple-500",
    },
  ];

  const startInterview = async (role) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/interview/create`,
        { role },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      navigate("/dashboard/interview/session", {
        state: {
          role,
          interviewId: response.data._id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <InterviewStepper step={1} />

      {/* Header */}
      <div className="mt-6 mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Select Interview Role
        </h1>

        <p className="text-sm text-slate-400 max-w-xl">
          Choose your target role and start an AI-powered mock interview
          tailored to real-world technical questions.
        </p>
      </div>

      {/* Role Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {roles.map((role) => (
          <div
            key={role.name}
            onClick={() => startInterview(role.name)}
            className="group cursor-pointer bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5"
          >
            {/* Icon */}
            <div
              className={`w-11 h-11 rounded-xl bg-linear-to-r ${role.color} flex items-center justify-center text-white mb-4`}
            >
              {role.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-white mb-2">
              {role.name}
            </h3>

            {/* Description */}
            <p className="text-xs text-slate-400 leading-6 mb-5">
              {role.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                AI Generated Questions
              </span>

              <ArrowRight
                size={16}
                className="text-slate-500 group-hover:text-white transition-colors"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StartInterview;