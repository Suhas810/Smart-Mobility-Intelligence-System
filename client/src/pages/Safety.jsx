import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import SearchPanel from "../components/SearchPanel";
import SafetyCard from "../components/SafetyCard";
import Map from "../components/Map";

export default function Safety() {
  const { location, safetyData, loading, selectLocation } = useApp();

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <SearchPanel
          onSelect={selectLocation}
          onUseMyLocation={() => {
            navigator.geolocation.getCurrentPosition((position) => {
              selectLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                name: "Current location"
              });
            });
          }}
          loading={loading}
        />

        <div className="space-y-6">
          <SafetyCard safetyData={safetyData} loading={loading} />
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-slate-900/40">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Safety insights</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Risk overview</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">Use the location search panel to fetch a real-time safety score, risk level, and detailed factor breakdown for any selected point.</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Map data={safetyData} />
      </div>
    </motion.div>
  );
}
