const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");
const XLSX = require("xlsx");
const Agent = require("../models/Agent");
const DataDistribution = require("../models/DataDistribution");

exports.distributeData = async (req, res) => {
  try {
    console.log("Uploaded File:", req.file); // Debugging: Check if file is uploaded

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();

    let records = [];

    if (ext === ".csv") {
      // ✅ Parse CSV File
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (row) => records.push(row))
        .on("end", async () => {
          await processAndSaveData(records, res);
        });
    } else if (ext === ".xlsx" || ext === ".xls") {
      // ✅ Parse Excel File
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      records = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      await processAndSaveData(records, res);
    } else {
      return res.status(400).json({ error: "Unsupported file format. Please upload CSV or Excel files." });
    }
  } catch (error) {
    console.error("❌ Distribution Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Helper function to process and distribute data
async function processAndSaveData(records, res) {
  try {
    const agents = await Agent.find();

    if (agents.length === 0) {
      return res.status(400).json({ error: "No agents available" });
    }

    if (!records.length) {
      return res.status(400).json({ error: "No data provided for distribution" });
    }

    // ✅ Distribute data among agents in a round-robin manner
    const totalAgents = agents.length;
    const distributedData = records.map((record, index) => ({
      agent_id: agents[index % totalAgents]._id,
      agent_name: agents[index % totalAgents].name,
      file_name: "uploaded_data",
      data: record,
      created_at: new Date(),
    }));

    await DataDistribution.insertMany(distributedData);

    res.status(200).json({ message: "✅ Data distributed successfully!", distributedData });
  } catch (error) {
    console.error("❌ Save Error:", error);
    res.status(500).json({ error: "Failed to process data" });
  }
}
