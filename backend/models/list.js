const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  name: String,
  email: String,
  assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("List", ListSchema);
