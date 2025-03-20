const express = require("express");
const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes (example)
router.get("/protected-route", authMiddleware, (req, res) => {
  res.json({ message: "You have access!", user: req.user });
});

module.exports = router;
