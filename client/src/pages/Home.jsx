import { useState } from "react";
import LocationInput from "../components/LocationInput";
import SafetyCard from "../components/SafetyCard";
import AlertBox from "../components/AlertBox";
import Map from "../components/Map";
import { checkSafety } from "../services/api";

export default function Home() {
  const [safetyData, setSafetyData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckSafety = async (lat, lng) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await checkSafety(lat, lng);
      setSafetyData(data);
    } catch (err) {
      setError("Failed to check safety. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white p-4">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2">
            <span className="text-blue-400">SafeRoute</span> AI
          </h1>
          <p className="text-gray-400 text-lg">
            Real-time Safety Alert System powered by AI
          </p>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-900/30 border border-red-500 rounded-lg p-4 text-red-200">
            <p className="font-semibold">❌ {error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <LocationInput onCheck={handleCheckSafety} isLoading={isLoading} />
          </div>

          {/* Safety Card Section */}
          <div className="lg:col-span-2">
            <SafetyCard data={safetyData} isLoading={isLoading} />
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-8">
          <Map data={safetyData} />
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 border border-blue-500 rounded-lg p-4 shadow-lg shadow-blue-500/20">
            <p className="text-blue-400 font-bold mb-2">🔐 How it Works</p>
            <p className="text-gray-300 text-sm">
              Enter coordinates and get instant safety analysis based on crime rates, lighting, and traffic.
            </p>
          </div>
          <div className="bg-gray-900 border border-blue-500 rounded-lg p-4 shadow-lg shadow-blue-500/20">
            <p className="text-blue-400 font-bold mb-2">⚡ Real-Time</p>
            <p className="text-gray-300 text-sm">
              Get responses in under 2 seconds with live map visualization and risk alerts.
            </p>
          </div>
          <div className="bg-gray-900 border border-blue-500 rounded-lg p-4 shadow-lg shadow-blue-500/20">
            <p className="text-blue-400 font-bold mb-2">📍 Smart Alerts</p>
            <p className="text-gray-300 text-sm">
              Receive detailed safety recommendations and area information in real-time.
            </p>
          </div>
        </div>

        {/* Sample Data */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <p className="text-gray-400 font-semibold mb-4">💡 Sample Locations to Try:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <p>• MG Road: <span className="text-blue-400">12.97, 77.59</span></p>
            <p>• Koramangala: <span className="text-blue-400">12.93, 77.62</span></p>
            <p>• Cubbon Park: <span className="text-blue-400">12.98, 77.59</span></p>
            <p>• Airport Road: <span className="text-blue-400">13.20, 77.71</span></p>
          </div>
        </div>
      </main>

      {/* Alert Popup */}
      <AlertBox data={safetyData} />

      {/* Footer */}
      <footer className="text-center text-gray-600 text-sm mt-12">
        <p>SafeRoute AI © 2026 | Real-Time Safety Intelligence</p>
      </footer>
    </div>
  );
}
