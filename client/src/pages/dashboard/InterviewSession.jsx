import { useLocation } from "react-router-dom";
import { useState } from "react";
import { questions } from "../../data/questions";

function InterviewSession() {
  const location = useLocation();

  const role = location.state.role;

  const roleQuestions = questions[role];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");

  const nextQuestion = () => {
    setAnswers([
      ...answers,
      {
        question: roleQuestions[currentQuestion],

        answer,
      },
    ]);

    if (currentQuestion < roleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);

      setAnswer("");
    }
    if (currentQuestion === roleQuestions.length - 1) {
      // Submit answers to backend
      console.log("Submitting answers:", answers);
    }
  };

  const submitInterview = () => {
    console.log(answers);

    alert("Interview Submitted");
  };

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
