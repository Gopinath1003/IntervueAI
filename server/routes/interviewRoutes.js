const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  createInterview,
  submitInterview,
  getQuestions,
  evaluateInterview,
  saveEvaluation,
  getHistory,
  getAnalytics,
} = require("../controllers/interviewController");

router.post("/create", verifyToken, createInterview);

router.post("/submit", verifyToken, submitInterview);

router.post("/generate", verifyToken, getQuestions);

router.post("/evaluate", verifyToken, evaluateInterview);

router.put("/:id/result", verifyToken, saveEvaluation);

router.get("/history", verifyToken, getHistory);

router.get("/analytics", verifyToken, getAnalytics);

module.exports = router;
