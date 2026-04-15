import { useEffect, useState } from "react";

export default function AlertBox({ data, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (data && data.status === "unsafe") {
      setIsVisible(true);
    }
  }, [data]);

  if (!isVisible || !data || data.status !== "unsafe") {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-red-900/80 border-2 border-red-500 rounded-lg p-8 max-w-md shadow-2xl shadow-red-500/50 animate-pulse">
        <div className="text-center">
          <p className="text-5xl mb-4">🚨</p>
          <h3 className="text-2xl font-bold text-red-200 mb-4">
            Unsafe Area Detected
          </h3>
          <p className="text-red-100 mb-6 text-sm">{data.message}</p>

          <div className="bg-red-800/50 rounded p-4 mb-6 text-left">
            <p className="text-red-200 text-sm font-semibold mb-2">
              ⚠️ Safety Recommendations:
            </p>
            <ul className="text-red-100 text-xs space-y-1 list-disc list-inside">
              <li>Travel with companions if possible</li>
              <li>Stay alert and aware of surroundings</li>
              <li>Use well-lit main roads</li>
              <li>Inform someone about your location</li>
              <li>Keep emergency contacts ready</li>
            </ul>
          </div>

          <button
            onClick={() => {
              setIsVisible(false);
              onClose?.();
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all duration-200"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
