const express = require("express");
const router = express.Router();
const {
  getSafetyScore,
  getAlerts,
  postRoute,
  getHistory,
  postHistory
} = require("../controllers/apiController");

router.post("/safety-score", getSafetyScore);
router.get("/alerts", getAlerts);
router.post("/route", postRoute);
router.get("/history", getHistory);
router.post("/history", postHistory);

module.exports = router;
