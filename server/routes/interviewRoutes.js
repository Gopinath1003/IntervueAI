const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  createInterview,
  submitInterview,
  getQuestions,
} = require("../controllers/interviewController");

router.post("/create", verifyToken, createInterview);

router.post("/submit", verifyToken, submitInterview);

router.post("/generate", verifyToken, getQuestions);

module.exports = router;
