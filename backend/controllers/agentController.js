const Agent = require("../models/Agent");
const bcrypt = require("bcryptjs");

// create new agent
exports.createAgent = async (req, res) => {
    try {
      console.log("Received agent data:", req.body); // Debugging Log
  
      const { name, email, mobile, password } = req.body;
      
      if (!name || !email || !mobile || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      let agent = await Agent.findOne({ email });
      if (agent) return res.status(400).json({ message: "Agent already exists" });
  
      // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      agent = new Agent({ name, email, mobile, password: hashedPassword });
      await agent.save();
  
      console.log("Agent successfully saved:", agent); // Debugging Log
      res.status(201).json({ message: "Agent created successfully", agent });
  
    } catch (error) {
      console.error("Error creating agent:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

// adding the agents 
exports.addAgent = async (req, res) => {
    try {
      const { name, email, mobile, password } = req.body;
  
      if (!name || !email || !mobile || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      let agent = await Agent.findOne({ email });
      if (agent) return res.status(400).json({ message: "Agent already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      agent = new Agent({ name, email, mobile, password: hashedPassword });
      await agent.save();
  
      res.status(201).json({ message: "Agent added successfully" });
    } catch (error) {
      console.error("Add Agent Error:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  };

// Get all agents
exports.getAgents = async (req, res) => {
    try {
      const agents = await Agent.find();
      res.json(agents);
    } catch (error) {
      console.error("Error fetching agents:", error);
      res.status(500).json({ message: "Failed to fetch agents" });
    }
  };