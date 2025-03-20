const express = require("express");
const Agent = require("../models/Agent"); // Adjust path if needed

const router = express.Router();

// ✅ Add Agent
router.post("/add", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newAgent = new Agent({ name, email, mobile, password });
    await newAgent.save();
    res.status(201).json(newAgent);
  } catch (error) {
    console.error("Error adding agent:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Fetch Agents
router.get("/", async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (error) {
    console.error("Error fetching agents:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Delete Agent
router.delete("/:id", async (req, res) => {
  try {
    await Agent.findByIdAndDelete(req.params.id);
    res.json({ message: "Agent deleted successfully" });
  } catch (error) {
    console.error("Error deleting agent:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
