const express = require("express");
const router = express.Router();
const { getSafetyScore } = require("../controllers/safetyController");

// POST /api/safety - Get safety score for a location
router.post("/safety", getSafetyScore);

module.exports = router;
