import { useMemo, useState } from "react";
import { sampleLocations } from "../data/locations";

export default function SearchPanel({ onSelect, onUseMyLocation, loading }) {
  const [query, setQuery] = useState("");

  const suggestions = useMemo(() => {
    if (!query.trim()) return sampleLocations.slice(0, 5);
    return sampleLocations.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-sky-500/10 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-sky-400">Search location</p>
          <h2 className="text-lg font-semibold text-white">Find a safe spot</h2>
        </div>
        <button
          onClick={onUseMyLocation}
          className="rounded-full border border-slate-800 bg-slate-800/90 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
          type="button"
        >
          Use My Location
        </button>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search neighborhoods or places"
        className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
      />

      <div className="mt-5 space-y-3">
        {suggestions.map((location) => (
          <button
            key={location.name}
            type="button"
            onClick={() => onSelect(location)}
            className="w-full rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-4 text-left text-sm text-slate-200 transition hover:border-sky-400 hover:bg-slate-800"
          >
            <p className="font-semibold text-white">{location.name}</p>
            <p className="text-xs text-slate-400">Lat {location.latitude}, Lng {location.longitude}</p>
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-3xl bg-slate-950/90 p-4 text-sm text-slate-400">
        <p className="font-semibold text-slate-100">Quick Tip</p>
        <p className="mt-2">Click anywhere on the map or choose a listed location to fetch risk data instantly.</p>
      </div>
    </div>
  );
}
