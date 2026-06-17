import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function InterviewSession() {
  const location = useLocation();
  const navigate = useNavigate();

  const role = location.state.role;

  const [roleQuestions, setRoleQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3001/api/interview/generate",
        { role },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      console.log(response.data);

      setRoleQuestions(response.data.questions);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  

  const nextQuestion = () => {
    const updatedAnswers = [
      ...answers,
      {
        question: roleQuestions[currentQuestion],
        answer,
      },
    ];

    setAnswers(updatedAnswers);

    if (currentQuestion < roleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswer("");
    }
  };

  const submitInterview = async () => {
    try {
      const token = localStorage.getItem("token");

      const finalAnswers = [
        ...answers,
        {
          question: roleQuestions[currentQuestion],
          answer,
        },
      ];

      await axios.post(
        "http://localhost:3001/api/interview/submit",
        {
          role,
          questions: finalAnswers,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      navigate("/dashboard/interview/result");
    } catch (err) {
      console.log(err);
    }
  };


  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">Generating AI Questions...</h1>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">{role}</h1>

      <h2 className="text-xl mb-6">Question {currentQuestion + 1}</h2>

      <p className="mb-6">{roleQuestions[currentQuestion]}</p>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="border p-4 w-full"
        rows={6}
      />

      {currentQuestion === roleQuestions.length - 1 ? (
        <button
          onClick={submitInterview}
          className="mt-6 bg-green-500 text-white px-6 py-3 rounded"
        >
          Submit Answers
        </button>
      ) : (
        <button
          onClick={nextQuestion}
          className="mt-6 bg-blue-500 text-white px-6 py-3 rounded"
        >
          Next Question
        </button>
      )}
    </div>
  );
}

export default InterviewSession;
