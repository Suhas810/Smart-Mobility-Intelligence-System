import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import AlertPanel from "../components/AlertPanel";

export default function Alerts() {
  const { alerts } = useApp();

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-slate-900/40">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Alerts center</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Live incident feed</h2>
          </div>
          <span className="rounded-3xl bg-slate-900/80 px-4 py-2 text-sm text-slate-300">Total alerts: {alerts.length}</span>
        </div>
        <p className="text-sm leading-7 text-slate-300">The Alerts page updates automatically through Socket.IO and displays the most recent risk incidents and location-based warnings.</p>
      </div>

      <div className="mt-6 space-y-6">
        <AlertPanel alerts={alerts} />
      </div>
    </motion.div>
  );
}
