import { useState } from "react";
import { sampleLocations } from "../data/locations";

export default function RoutePanel({ onCalculateRoute, loading, routeResult }) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const suggestions = sampleLocations.filter((item) => item.name.toLowerCase().includes((source + destination).toLowerCase()));

  const handleSubmit = (event) => {
    event.preventDefault();
    onCalculateRoute({ source, destination });
  };

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-slate-900/40">
      <div className="mb-5">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Safe Routes</p>
        <h3 className="text-xl font-semibold text-white">Source → Destination</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Start address"
            className="rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
          />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Destination"
            className="rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {suggestions.slice(0, 3).map((location) => (
            <button
              key={location.name}
              type="button"
              onClick={() => {
                if (!source) setSource(location.name);
                else if (!destination) setDestination(location.name);
              }}
              className="rounded-full border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs text-slate-300 transition hover:border-sky-400"
            >
              {location.name}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading || !source || !destination}
          className="inline-flex items-center justify-center rounded-3xl bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          {loading ? "Calculating..." : "Compute Safer Route"}
        </button>
      </form>

      {routeResult && (
        <div className="mt-6 space-y-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 text-sm text-slate-300">
          <div className="space-y-2">
            <p className="text-slate-400">Fastest Route</p>
            <p className="text-white">{routeResult.fastestRoute.summary}</p>
            <p className="text-slate-500">{routeResult.fastestRoute.distance} km • {routeResult.fastestRoute.duration} mins</p>
          </div>
          <div className="space-y-2">
            <p className="text-slate-400">Safest Route</p>
            <p className="text-white">{routeResult.safestRoute.summary}</p>
            <p className="text-slate-500">{routeResult.safestRoute.distance} km • {routeResult.safestRoute.duration} mins</p>
          </div>
        </div>
      )}
    </section>
  );
}
