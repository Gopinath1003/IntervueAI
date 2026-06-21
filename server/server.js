require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const userRoutes = require("./routes/userRoutes")

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://intervueai-beta.vercel.app",
    ],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"));

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/user", userRoutes);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
