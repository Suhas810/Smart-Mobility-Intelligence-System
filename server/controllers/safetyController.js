const dataset = require("../data/dataset.json");
const {
  calculateSafetyScore,
  getRiskLevel,
  getAlertMessage
} = require("../utils/safetyCalculator");

/**
 * Find nearest area to given coordinates
 */
function findNearestArea(lat, lng) {
  let nearestArea = null;
  let minDistance = Infinity;

  dataset.forEach((area) => {
    const distance = Math.sqrt(
      Math.pow(area.lat - lat, 2) + Math.pow(area.lng - lng, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      nearestArea = area;
    }
  });

  return nearestArea;
}

/**
 * POST /api/safety
 * Calculate safety score for given location
 */
exports.getSafetyScore = (req, res) => {
  try {
    const { lat, lng } = req.body;

    // Validate input
    if (typeof lat !== "number" || typeof lng !== "number") {
      return res.status(400).json({
        error: "Invalid input. Please provide lat and lng as numbers."
      });
    }

    // Find nearest area
    const area = findNearestArea(lat, lng);

    if (!area) {
      return res.status(404).json({ error: "No area data found." });
    }

    // Calculate safety metrics
    const score = calculateSafetyScore(area);
    const status = getRiskLevel(score);
    const message = getAlertMessage(status, area.area);

    // Return response
    res.json({
      score,
      status,
      message,
      area: area.area,
      coordinates: {
        lat: area.lat,
        lng: area.lng
      }
    });
  } catch (error) {
    console.error("Error calculating safety score:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
