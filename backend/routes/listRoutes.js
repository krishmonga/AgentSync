const express = require("express");
const upload = require("../middlewares/multer");
const authMiddleware = require("../middlewares/authMiddleware");
const XLSX = require("xlsx");

const router = express.Router();

router.post("/upload-list", authMiddleware, upload.single("file"), (req, res) => {
  try {
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    console.log("Extracted Data:", data);
    res.json({ message: "File uploaded and processed successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Error processing file", error });
  }
});
router.get("/my-lists", authMiddleware, async (req, res) => {
    try {
      const lists = await List.find({ assignedAgent: req.user.id });
      res.json(lists);
    } catch (error) {
      res.status(500).json({ message: "Error fetching lists", error });
    }
  });
  

module.exports = router;
