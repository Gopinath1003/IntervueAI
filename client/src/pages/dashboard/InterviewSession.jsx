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
    <div className="p-10">
      <InterviewStepper step={2} />
      <h1 className="text-3xl font-bold mb-8">{role}</h1>

      <h2 className="text-xl mb-6">Question {currentQuestion + 1}</h2>

      <p className="mb-6">{roleQuestions[currentQuestion]}</p>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="border p-4 w-full"
        rows={6}
      />
      <button
        onClick={startRecording}
        disabled={isRecording}
        className="mt-4 bg-purple-500 text-white px-4 py-2 rounded"
      >
        {isRecording ? "🎙️ Listening..." : "🎤 Start Recording"}
      </button>

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
