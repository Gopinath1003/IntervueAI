require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const interviewRoutes = require("./routes/interviewRoutes");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"));

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
