const {
    GoogleGenerativeAI
} = require("@google/generative-ai");

const genAI =
new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const generateQuestions =
async (role) => {

    const model =
    genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
    });

    const prompt = `
Generate exactly 5 interview questions for a ${role}.

Requirements:
- Medium difficulty
- Technical questions only
- Return ONLY JSON array

Example:
[
 "Question 1",
 "Question 2"
]
`;

    const result =
    await model.generateContent(prompt);

    return result.response.text();
};

module.exports = {
    generateQuestions
};