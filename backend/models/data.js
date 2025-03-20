const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
  assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
});

module.exports = mongoose.model("Data", DataSchema);
