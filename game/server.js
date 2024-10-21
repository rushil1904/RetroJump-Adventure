const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3003",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsing middleware
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Define Schema
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
    res.status(500).json({ message: error.message, stack: error.stack });
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
    res.status(400).json({ message: error.message, stack: error.stack });
  }
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
