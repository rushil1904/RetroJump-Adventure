// score-server/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration with your deployed game URL
app.use(
  cors({
    origin: [
      "https://your-deployed-game.onrender.com",
      "http://localhost:3003",
    ],
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// Score Schema
const ScoreSchema = new mongoose.Schema({
  playerName: String,
  score: Number,
  date: { type: Date, default: Date.now },
});

const Score = mongoose.model("Score", ScoreSchema);

// Routes
app.get("/api/scores", async (req, res) => {
  try {
    const scores = await Score.find().sort({ score: -1 }).limit(5);
    res.json(scores);
  } catch (error) {
    console.error("Error fetching scores:", error);
    res.status(500).json({ message: "Error fetching scores" });
  }
});

app.post("/api/scores", async (req, res) => {
  try {
    const { playerName, score } = req.body;
    const updatedScore = await Score.findOneAndUpdate(
      { playerName },
      { $set: { score: score }, $setOnInsert: { playerName } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(201).json(updatedScore);
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(400).json({ message: "Error saving score" });
  }
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Score server running on port ${PORT}`));
