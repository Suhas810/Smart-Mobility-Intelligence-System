function calculateSafetyScore(location) {
  const crimeScore = (10 - location.crime_rate) / 10;
  const lightingScore = location.lighting / 10;
  const trafficScore = (10 - location.traffic) / 10;
  const rawScore = crimeScore * 0.45 + lightingScore * 0.35 + trafficScore * 0.2;
  return Math.max(0, Math.min(100, Math.round(rawScore * 100)));
}

function getRiskLabel(score) {
  if (score >= 70) return "safe";
  if (score >= 40) return "moderate";
  return "dangerous";
}

function buildFactors(location) {
  return {
    crime: Math.round(location.crime_rate * 10),
    lighting: Math.round(location.lighting * 10),
    traffic: Math.round(location.traffic * 10)
  };
}

function generateRouteOptions(source, destination, dataset) {
  const randomSafe = dataset.filter((item) => item.crime_rate <= 4 && item.lighting >= 6);
  const via = randomSafe.length ? randomSafe[Math.floor(Math.random() * randomSafe.length)] : dataset[0];

  return {
    fastestRoute: {
      summary: `Fastest route from ${source} to ${destination}`,
      distance: 12.5,
      duration: 18,
      path: {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [77.59, 12.97],
            [77.62, 12.93]
          ]
        }
      }
    },
    safestRoute: {
      summary: `Safer route via ${via.name}`,
      distance: 14.2,
      duration: 22,
      path: {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [77.59, 12.97],
            [via.longitude, via.latitude],
            [77.62, 12.93]
          ]
        }
      }
    }
  };
}

module.exports = {
  calculateSafetyScore,
  getRiskLabel,
  buildFactors,
  generateRouteOptions
};
