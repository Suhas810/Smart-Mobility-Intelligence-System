import { motion } from "framer-motion";

export default function AlertPanel({ alerts }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-slate-900/40"
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Live Alerts</p>
          <h3 className="text-xl font-semibold text-white">Nearby Incidents</h3>
        </div>
        <span className="rounded-full bg-rose-500/10 px-3 py-2 text-xs text-rose-200">Live</span>
      </div>

      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 text-sm text-slate-400">
            No recent alerts. Your feed is clear.
          </div>
        ) : (
          alerts.slice(0, 5).map((alert) => (
            <div key={alert.id} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-300">{alert.type}</p>
                  <h4 className="mt-1 text-lg font-semibold text-white">{alert.title}</h4>
                </div>
                <span className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200" style={{ backgroundColor: alert.severity === 'high' ? '#f87171' : '#facc15' }}>
                  {alert.severity}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-400">{alert.message}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.25em] text-slate-500">{alert.location}</p>
            </div>
          ))
        )}
      </div>
    </motion.section>
  );
}
