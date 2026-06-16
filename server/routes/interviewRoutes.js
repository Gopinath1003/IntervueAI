const express = require("express");

const router = express.Router();

const verifyToken = require(
    "../middleware/authMiddleware"
);

const {
    createInterview
} = require(
    "../controllers/interviewController"
);

router.post(
    "/create",
    verifyToken,
    createInterview
);

module.exports = router;