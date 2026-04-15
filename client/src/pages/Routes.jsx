import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import RoutePanel from "../components/RoutePanel";
import Map from "../components/Map";

export default function RoutesPage() {
  const { routeResult, calculateRoute, routeLoading } = useApp();

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <Map route={routeResult} />
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-slate-900/40">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Route planning</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Safest and fastest paths</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">Enter your source and destination to see the recommended fastest and safest routes, visualized on the map.</p>
          </div>
        </div>

        <RoutePanel onCalculateRoute={calculateRoute} loading={routeLoading} routeResult={routeResult} />
      </div>
    </motion.div>
  );
}
