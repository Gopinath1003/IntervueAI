import { useLocation } from "react-router-dom";
import InterviewStepper from "../../components/InterviewStepper";

function InterviewResult() {

  const location = useLocation();

  if (!location.state?.evaluation) {
    return <div>No evaluation found</div>;
  }

  const evaluation = location.state.evaluation;

  return (
    <div className="p-10">
      <InterviewStepper step={3} />

      <h1 className="text-3xl font-bold mb-6">
        Interview Result
      </h1>

      <h2 className="text-2xl font-semibold mb-4">
        Overall Score: {evaluation.overallScore}/10
      </h2>

      <div className="mb-6">
        <h3 className="font-bold">Strengths</h3>

        <ul>
          {evaluation.strengths?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="font-bold">Weaknesses</h3>

        <ul>
          {evaluation.weaknesses?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-bold">Suggestions</h3>

        <ul>
          {evaluation.suggestions?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default InterviewResult;