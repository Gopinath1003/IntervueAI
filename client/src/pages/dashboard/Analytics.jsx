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

function Analytics() {
  const [data, setData] = useState(null);

  

  const fetchAnalytics = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/interview/analytics`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    setData(response.data);
    console.log(data);
  };

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    fetchAnalytics();
  }, []);

  
  if (!data) return <h1>Loading...</h1>;
  
  const chartData = data.interviews.map((interview, index) => ({
    interview: index + 1,
    score: interview.overallScore || 0,
  }));
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 border rounded">
          <h2>Total Interviews</h2>
          <p className="text-4xl">{data.totalInterviews}</p>
        </div>

        <div className="p-6 border rounded">
          <h2>Average Score</h2>
          <p className="text-4xl">{data.averageScore}</p>
        </div>

        <div className="p-6 border rounded">
          <h2>Best Role</h2>

          <p className="text-2xl">{data.bestRole}</p>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Performance Trend</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="interview" />

            <YAxis />

            <Tooltip />

            <Line type="monotone" dataKey="score" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Analytics;
