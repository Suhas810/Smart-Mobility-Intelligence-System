import { useState } from "react";

export default function LocationInput({ onCheck, isLoading }) {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [error, setError] = useState("");

  const handleCheck = () => {
    setError("");

    if (!lat || !lng) {
      setError("Please enter both latitude and longitude");
      return;
    }

    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);

    if (isNaN(parsedLat) || isNaN(parsedLng)) {
      setError("Latitude and longitude must be valid numbers");
      return;
    }

    if (parsedLat < -90 || parsedLat > 90) {
      setError("Latitude must be between -90 and 90");
      return;
    }

    if (parsedLng < -180 || parsedLng > 180) {
      setError("Longitude must be between -180 and 180");
      return;
    }

    onCheck(parsedLat, parsedLng);
  };

  return (
    <div className="bg-gray-900 border border-blue-500 rounded-lg p-6 shadow-lg shadow-blue-500/30">
      <h2 className="text-xl font-bold text-blue-400 mb-4">📍 Enter Location</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            step="0.001"
            className="bg-gray-800 text-white border border-blue-400 rounded px-4 py-2 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-500/50"
            disabled={isLoading}
          />
          <input
            type="number"
            placeholder="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            step="0.001"
            className="bg-gray-800 text-white border border-blue-400 rounded px-4 py-2 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-500/50"
            disabled={isLoading}
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          onClick={handleCheck}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-all duration-200 shadow-lg shadow-blue-600/50 hover:shadow-blue-600/70"
        >
          {isLoading ? "⏳ Checking..." : "🔍 Check Safety"}
        </button>
      </div>

      <p className="text-gray-400 text-xs mt-4">
        💡 Tip: Try coordinates like 12.97, 77.59 (MG Road, Bangalore)
      </p>
    </div>
  );
}
