import axios from "axios";
import { useNavigate } from "react-router-dom";
import InterviewStepper from "../../components/InterviewStepper";

function StartInterview() {
  const roles = [
    "Java Developer",
    "Python Developer",
    "React Developer",
    "Data Analyst",
  ];

  const navigate = useNavigate();

  const startInterview = async (role) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/interview/create`,
      { role },
      {
        headers: {
          Authorization: token,
        },
      },
    );

    navigate("/dashboard/interview/session", {
      state: {
        role,
        interviewId: response.data._id,
      },
    });
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">Select Interview Role</h1>
      <InterviewStepper step={1} />

      <div className="grid grid-cols-2 gap-4">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => startInterview(role)}
            className="p-6 bg-blue-500 text-white rounded"
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
}

export default StartInterview;
