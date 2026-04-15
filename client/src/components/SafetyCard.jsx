import { motion } from "framer-motion";

const riskStyles = {
  safe: "border-emerald-400/40 bg-emerald-500/10 text-emerald-100",
  moderate: "border-amber-400/40 bg-amber-500/10 text-amber-100",
  dangerous: "border-rose-400/40 bg-rose-500/10 text-rose-100"
};

export default function SafetyCard({ safetyData, loading }) {
  const style = safetyData ? riskStyles[safetyData.risk] : "border-slate-800 bg-slate-950/80 text-slate-200";

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`rounded-3xl border p-6 shadow-2xl shadow-slate-950/30 ${style}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Safety score</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Risk assessment</h2>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-slate-200">
          {loading ? "Loading..." : safetyData ? safetyData.risk : "No selection"}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5">
          <p className="text-sm text-slate-400">Safety Score</p>
          <p className="mt-4 text-5xl font-semibold text-white">{loading ? "--" : safetyData ? safetyData.score : "--"}</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5">
          <p className="text-sm text-slate-400">Area</p>
          <p className="mt-4 text-2xl font-semibold text-white">{safetyData?.location || "None"}</p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 text-slate-300">
        <h3 className="text-sm uppercase tracking-[0.35em] text-sky-400">Factors</h3>
        <div className="mt-4 space-y-4">
          {safetyData ? [
            { name: "Crime", value: safetyData.factors.crime, color: "bg-rose-500" },
            { name: "Lighting", value: safetyData.factors.lighting, color: "bg-sky-500" },
            { name: "Traffic", value: safetyData.factors.traffic, color: "bg-amber-500" }
          ].map((item) => (
            <div key={item.name}>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>{item.name}</span>
                <span>{item.value}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-800">
                <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.value}%` }} />
              </div>
            </div>
          )) : (
            <p className="text-sm text-slate-500">Select a location or route to review safety factors in real time.</p>
          )}
        </div>
      </div>
    </motion.section>
  );
}
