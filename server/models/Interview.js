const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    questions: [
      {
        question: String,
        answer: String,
      },
    ],

    status: {
      type: String,
      default: "completed",
    },

    overallScore: {
      type: Number,
      default: 0,
    },

    strengths: [String],

    weaknesses: [String],

    suggestions: [String],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Interview", interviewSchema);
