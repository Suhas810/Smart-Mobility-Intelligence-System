import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import SearchPanel from "../components/SearchPanel";
import SafetyCard from "../components/SafetyCard";
import AlertPanel from "../components/AlertPanel";
import RoutePanel from "../components/RoutePanel";
import AnalyticsCard from "../components/AnalyticsCard";
import Map from "../components/Map";

export default function Dashboard() {
  const { location, safetyData, routeResult, alerts, history, loading, routeLoading, selectLocation, calculateRoute } = useApp();

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div className="mb-6 grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-slate-900/40">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Overview</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Live safety operations</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">Monitor real-time alerts, route recommendations, and safety score summaries from a single command center.</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
              <p className="text-sm text-slate-400">Latest Safety Score</p>
              <p className="mt-3 text-4xl font-semibold text-white">{safetyData?.score ?? "—"}</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
              <p className="text-sm text-slate-400">Active Alerts</p>
              <p className="mt-3 text-4xl font-semibold text-white">{alerts.length}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
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

          <RoutePanel onCalculateRoute={calculateRoute} loading={routeLoading} routeResult={routeResult} />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <Map data={safetyData} route={routeResult} />
          <AlertPanel alerts={alerts} />
        </div>

        <div className="space-y-6">
          <SafetyCard safetyData={safetyData} loading={loading} />
          <AnalyticsCard />
        </div>
      </div>

      <section className="mt-6 rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-slate-900/40">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Recent activity</p>
            <h3 className="text-xl font-semibold text-white">Search history</h3>
          </div>
        </div>
        <div className="space-y-3 text-sm text-slate-300">
          {history.length === 0 ? (
            <p className="text-slate-500">No history yet. Start searching a location or route.</p>
          ) : (
            history.map((entry, index) => (
              <div key={`${entry.location}-${index}`} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4">
                <p className="font-semibold text-white">{entry.location}</p>
                <p className="mt-1 text-xs text-slate-400">{entry.action === "route" ? "Route search" : "Safety check"}</p>
                {entry.score !== null && <p className="mt-2 text-sm text-slate-300">Score: {entry.score} • Risk: {entry.risk}</p>}
              </div>
            ))
          )}
        </div>
      </section>
    </motion.div>
  );
}
