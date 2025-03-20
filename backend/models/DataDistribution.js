const mongoose = require("mongoose");

const DataDistributionSchema = new mongoose.Schema({
  agent_id: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true },
  agent_name: { type: String, required: true },
  file_name: { type: String, required: true },
  data: { type: Object, required: true }, // Stores a single record
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DataDistribution", DataDistributionSchema);
