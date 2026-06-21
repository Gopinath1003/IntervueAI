import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import InterviewStepper from "../../components/InterviewStepper";

function InterviewSession() {
  const location = useLocation();
  const navigate = useNavigate();

  const role = location.state.role;
  const interviewId = location.state.interviewId;

  const [roleQuestions, setRoleQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [evaluationLoading, setEvaluationLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const recognitionRef = useRef(null);

  localStorage.setItem("interviewId", interviewId);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.log("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognitionRef.current = recognition;
  }, []);

  const startRecording = () => {
    if (!recognitionRef.current) return;

    setIsRecording(true);

    recognitionRef.current.start();

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      setAnswer((prev) => (prev ? prev + " " + transcript : transcript));

      setIsRecording(false);
    };

    recognitionRef.current.onerror = () => {
      setIsRecording(false);
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
    };
  };

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/interview/generate`,
        { role },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      const questions = response.data.questions;

      setRoleQuestions(questions);

      localStorage.setItem("interviewQuestions", JSON.stringify(questions));

      setRoleQuestions(questions);
      setQuestionsLoading(false);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
      setQuestionsLoading(false);
    }
  };

  const nextQuestion = () => {
    if (!answer.trim()) {
      alert("Please provide an answer");
      return;
    }
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
      if (!answer.trim()) {
        alert("Please provide an answer");
        return;
      }

      const finalAnswers = [
        ...answers,
        {
          question: roleQuestions[currentQuestion],
          answer,
        },
      ];

      setEvaluationLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/interview/submit`,
        {
          interviewId,
          questions: finalAnswers,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      const evaluation = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/interview/evaluate`,
        {
          questions: finalAnswers,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/interview/${interviewId}/result`,
        evaluation.data,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      setEvaluationLoading(false);
      localStorage.removeItem("interviewQuestions");

      localStorage.removeItem("interviewId");

      navigate("/dashboard/interview/result", {
        state: {
          evaluation: evaluation.data,
        },
      });
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");

      setEvaluationLoading(false);
    }
  };

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    fetchQuestions();
  }, []);

  

  if (questionsLoading) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">Generating AI Questions...</h1>
      </div>
    );
  }
  if (evaluationLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <div className="animate-spin h-12 w-12 border-b-2 border-blue-500 rounded-full"></div>

          <h2 className="mt-4">AI is evaluating your interview...</h2>
        </div>
      </div>
    );
  }

  return (
  <div className="p-6">
    <InterviewStepper step={2} />

    {/* Header */}
    <div className="mt-6 mb-8">
      <h1 className="text-3xl font-bold text-white mb-2">
        {role}
      </h1>

      <p className="text-sm text-slate-400">
        Answer the interview questions carefully. AI will evaluate your
        responses and provide detailed feedback.
      </p>
    </div>

    {/* Question Card */}
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-white">
          Question {currentQuestion + 1}
        </h2>

        <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
          {currentQuestion + 1} / {roleQuestions.length}
        </span>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-6">
        <p className="text-slate-200 leading-relaxed">
          {roleQuestions[currentQuestion]}
        </p>
      </div>

      {/* Answer Box */}
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here..."
        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={7}
      />

      {/* Voice Input */}
      <div className="mt-4">
        <button
          onClick={startRecording}
          disabled={isRecording}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
          ${
            isRecording
              ? "bg-red-500/20 text-red-400 border border-red-500/30"
              : "bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30"
          }`}
        >
          {isRecording
            ? "🎙️ Listening..."
            : "🎤 Start Recording"}
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-end">
        {currentQuestion === roleQuestions.length - 1 ? (
          <button
            onClick={submitInterview}
            className="px-6 py-3 rounded-xl bg-linear-to-r from-emerald-500 to-green-600 text-white font-semibold hover:opacity-90 transition"
          >
            Submit Interview
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 to-violet-600 text-white font-semibold hover:opacity-90 transition"
          >
            Next Question →
          </button>
        )}
      </div>
    </div>
  </div>
);
}

export default InterviewSession;
