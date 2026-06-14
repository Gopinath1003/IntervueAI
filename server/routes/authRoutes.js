const express = require("express");

const router = express.Router();
const verifyToken = require(".././middleware/authMiddleware");


const {
    signup,
    signin
} = require("../controllers/authController");

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/me", verifyToken, (req, res) => {
    res.status(200).json({
        message: "Welcome to the home page!",
        user: req.user
    });
});

module.exports = router;