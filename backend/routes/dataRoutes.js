const express = require("express");
const upload = require("../middleware/multer");
const { distributeData } = require("../controllers/dataController");
const DataDistribution = require("../models/DataDistribution");

const router = express.Router();

// ✅ Route to upload and distribute data
router.post("/distribute", upload.single("file"), distributeData);

// ✅ Route to fetch distributed data
router.get("/distributed-data", async (req, res) => {
  try {
    const distributedData = await DataDistribution.find();
    res.json(distributedData);
  } catch (error) {
    console.error("Error fetching distributed data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

module.exports = router;
