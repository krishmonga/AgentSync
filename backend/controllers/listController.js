const xlsx = require("xlsx");
const List = require("../models/list");
const Agent = require("../models/Agent");

// Upload CSV/XLSX & Distribute
exports.uploadList = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    if (!data.length || !data[0].FirstName || !data[0].Phone) {
      return res.status(400).json({ message: "Invalid file format" });
    }

    const agents = await Agent.find();
    if (agents.length === 0) {
      return res.status(400).json({ message: "No agents available" });
    }

    const lists = data.map((item, index) => ({
      firstName: item.FirstName,
      phone: item.Phone,
      notes: item.Notes || "",
      assignedAgent: agents[index % agents.length]._id,
    }));

    await List.insertMany(lists);

    res.status(201).json({ message: "List uploaded successfully", lists });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
