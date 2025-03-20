const multer = require("multer");
const path = require("path");

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure "uploads" folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File Filter (CSV, XLSX, and PDF)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [".csv", ".xlsx", ".xls", ".pdf"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only CSV, XLSX, or PDF allowed"), false);
  }
};

// Upload Middleware
const upload = multer({ storage, fileFilter });

module.exports = upload;
