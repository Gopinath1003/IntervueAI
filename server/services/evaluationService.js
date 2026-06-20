const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

const evaluateEntireInterview =
async (questions) => {

  const model =
    genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

  const prompt = `
You are a technical interviewer.

Evaluate the entire interview.

Interview Data:

${JSON.stringify(
  questions,
  null,
  2
)}

Return ONLY JSON.

{
  "overallScore": 8,

  "strengths": [
    "Strong understanding of React fundamentals"
  ],

  "weaknesses": [
    "Missed advanced hook concepts"
  ],

  "suggestions": [
    "Practice useMemo and useCallback"
  ]
}
`;

  const result =
    await model.generateContent(
      prompt
    );

  return result.response.text();
};

module.exports = {
  evaluateEntireInterview,
};