const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true }, // Password will be hashed before saving
}, { timestamps: true });

module.exports = mongoose.model("Agent", agentSchema);
