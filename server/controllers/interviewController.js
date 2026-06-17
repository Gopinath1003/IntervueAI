const Interview = require("../models/Interview");
const { generateQuestions } = require("../services/geminiService");

const createInterview = async (req, res) => {
  try {
    const { role } = req.body;

    const interview = await Interview.create({
      userId: req.user.id,
      role,
    });

    res.status(201).json(interview);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getQuestions = async (req, res) => {
  try {
    const { role } = req.body;

    let questions = await generateQuestions(role);

    questions = questions
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedQuestions = JSON.parse(questions);

    res.json({
      questions: parsedQuestions,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Question generation failed",
    });
  }
};

const submitInterview = async (req, res) => {
  try {
    const { role, questions } = req.body;

    const interview = await Interview.create({
      userId: req.user.id,

      role,

      questions,
    });

    res.status(201).json({
      success: true,
      interview,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createInterview,
  getQuestions,
  submitInterview,
};
