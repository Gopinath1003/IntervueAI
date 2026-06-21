import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Briefcase,
  Trophy,
  TrendingUp,
  Target,
} from "lucide-react";

function Analytics() {
  const [data, setData] = useState(null);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/interview/analytics`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    fetchAnalytics();
  }, []);

  if (!data) {
    return (
      <div className="p-6">
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-8 text-center">
          <h2 className="text-xl text-white">
            Loading Analytics...
          </h2>
        </div>
      </div>
    );
  }

  const chartData = data.interviews.map((interview, index) => ({
    interview: index + 1,
    score: interview.overallScore || 0,
  }));

  const highestScore = Math.max(
    ...data.interviews.map(
      (i) => i.overallScore || 0
    ),
    0
  );

  const excellent = data.interviews.filter(
    (i) => i.overallScore >= 8
  ).length;

  const good = data.interviews.filter(
    (i) =>
      i.overallScore >= 6 &&
      i.overallScore < 8
  ).length;

  const needsWork = data.interviews.filter(
    (i) => i.overallScore < 6
  ).length;

  const stats = [
    {
      title: "Total Interviews",
      value: data.totalInterviews,
      icon: <Briefcase size={20} />,
      color: "text-blue-400",
    },
    {
      title: "Average Score",
      value: `${data.averageScore}/10`,
      icon: <TrendingUp size={20} />,
      color: "text-emerald-400",
    },
    {
      title: "Best Role",
      value: data.bestRole || "N/A",
      icon: <Target size={20} />,
      color: "text-violet-400",
    },
    {
      title: "Highest Score",
      value: `${highestScore}/10`,
      icon: <Trophy size={20} />,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Analytics
        </h1>

        <p className="text-sm text-slate-400">
          Track your interview performance and
          improvement over time.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5"
          >
            <div
              className={`${item.color} mb-3`}
            >
              {item.icon}
            </div>

            <h2 className="text-2xl font-bold text-white">
              {item.value}
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-6">
          Performance Trend
        </h2>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="interview"
              stroke="#94a3b8"
            />

            <YAxis stroke="#94a3b8" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Score Distribution */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-5">
            Score Distribution
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-emerald-400">
                Excellent (8-10)
              </span>

              <span className="text-white">
                {excellent}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-yellow-400">
                Good (6-7)
              </span>

              <span className="text-white">
                {good}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-red-400">
                Needs Work (&lt;6)
              </span>

              <span className="text-white">
                {needsWork}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Interviews */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-5">
            Recent Interviews
          </h2>

          <div className="space-y-3">
            {data.interviews
              .slice(-5)
              .reverse()
              .map((interview) => (
                <div
                  key={interview._id}
                  className="flex items-center justify-between border-b border-slate-800 pb-3"
                >
                  <div>
                    <p className="text-white text-sm">
                      {interview.role}
                    </p>

                    <p className="text-xs text-slate-500">
                      {new Date(
                        interview.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="text-blue-400 font-semibold">
                    {interview.overallScore}/10
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;