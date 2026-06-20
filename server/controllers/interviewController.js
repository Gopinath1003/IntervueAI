const Interview = require("../models/Interview");
const { generateQuestions } = require("../services/geminiService");
const { evaluateEntireInterview } = require("../services/evaluationService");

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
    if (err.response?.status === 429) {
      alert("AI service is busy. Please try again in a few moments.");
      return;
    }
  }
};

const submitInterview = async (req, res) => {
  try {
    const { interviewId, questions } = req.body;

    const interview = await Interview.findByIdAndUpdate(
      interviewId,
      {
        questions,
      },
      { new: true },
    );

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

const evaluateInterview = async (req, res) => {
  try {
    const { questions } = req.body;

    let evaluation = await evaluateEntireInterview(questions);

    evaluation = evaluation
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    res.json(JSON.parse(evaluation));
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Evaluation failed",
    });
  }
};

const saveEvaluation = async (req, res) => {
  try {
    const { id } = req.params;

    const { overallScore, strengths, weaknesses, suggestions } = req.body;

    const interview = await Interview.findByIdAndUpdate(
      id,

      {
        overallScore,
        strengths,
        weaknesses,
        suggestions,
      },

      { new: true },
    );

    res.json(interview);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getHistory = async (req, res) => {
  try {
    const interviews = await Interview.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json(interviews);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const interviews = await Interview.find({
      userId: req.user.id,
    });

    const totalInterviews = interviews.length;

    const averageScore =
      totalInterviews > 0
        ? (
            interviews.reduce(
              (sum, interview) => sum + (interview.overallScore || 0),
              0,
            ) / totalInterviews
          ).toFixed(1)
        : 0;

    // BEST ROLE LOGIC

    const roleScores = {};

    interviews.forEach((interview) => {
      if (!roleScores[interview.role]) {
        roleScores[interview.role] = [];
      }

      roleScores[interview.role].push(interview.overallScore || 0);
    });

    let bestRole = "";
    let bestAverage = 0;

    for (const role in roleScores) {
      const avg =
        roleScores[role].reduce((a, b) => a + b, 0) / roleScores[role].length;

      if (avg > bestAverage) {
        bestAverage = avg;
        bestRole = role;
      }
    }

    res.json({
      totalInterviews,
      averageScore,
      bestRole,
      interviews,
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
  evaluateInterview,
  saveEvaluation,
  getHistory,
  getAnalytics,
};
