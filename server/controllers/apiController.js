const path = require("path");
const dataset = require("../data/dataset.json");
const historyModel = require("../models/History");
const { calculateSafetyScore, getRiskLabel, buildFactors, generateRouteOptions } = require("../utils/safetyCalculator");

const alerts = require("../data/alerts.json");

function findNearestLocation(latitude, longitude) {
  let best = null;
  let bestDistance = Infinity;
  dataset.forEach((item) => {
    const distance = Math.hypot(item.latitude - latitude, item.longitude - longitude);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = item;
    }
  });
  return best;
}

exports.getSafetyScore = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return res.status(400).json({ error: "latitude and longitude are required as numbers." });
    }

    const location = findNearestLocation(latitude, longitude);
    if (!location) {
      return res.status(404).json({ error: "No location data found." });
    }

    const score = calculateSafetyScore(location);
    const risk = getRiskLabel(score);
    const factors = buildFactors(location);

    const result = {
      location: location.name,
      coordinates: { latitude: location.latitude, longitude: location.longitude },
      score,
      risk,
      factors
    };

    await historyModel.create({
      action: "safety",
      location: result.location,
      risk,
      score,
      coordinates: result.coordinates
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAlerts = async (req, res) => {
  res.json(alerts);
};

exports.postRoute = async (req, res) => {
  try {
    const { source, destination } = req.body;
    if (!source || !destination) {
      return res.status(400).json({ error: "source and destination are required." });
    }

    const routeResult = generateRouteOptions(source, destination, dataset);
    await historyModel.create({
      action: "route",
      location: `${source} → ${destination}`,
      risk: null,
      score: null,
      coordinates: null
    });

    res.json(routeResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to calculate route." });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const records = await historyModel.find().sort({ createdAt: -1 }).limit(10);
    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to load history." });
  }
};

exports.postHistory = async (req, res) => {
  try {
    const entry = await historyModel.create(req.body);
    res.json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to save history." });
  }
};
