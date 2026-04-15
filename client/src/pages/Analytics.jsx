import { motion } from "framer-motion";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";
import { useApp } from "../context/AppContext";

export default function Analytics() {
  const { alerts, history } = useApp();

  const trendData = history.slice(0, 6).map((entry, idx) => ({
    name: entry.location.slice(0, 12),
    score: entry.score ?? 55
  }));

  const alertSeverity = [
    { name: "High", count: alerts.filter((alert) => alert.severity === "high").length },
    { name: "Medium", count: alerts.filter((alert) => alert.severity === "medium").length },
    { name: "Low", count: alerts.filter((alert) => alert.severity === "low").length }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-slate-900/40">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Analytics</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Safety intelligence</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">Explore risk trends and alert distribution from the latest safety checks and incident reports.</p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-slate-900/40">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Alert summary</p>
          <div className="mt-6 space-y-4">
            {alertSeverity.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-4">
                <div>
                  <p className="text-sm text-slate-400">{item.name}</p>
                  <p className="mt-1 text-lg font-semibold text-white">{item.count}</p>
                </div>
                <div className="h-3 w-20 rounded-full bg-slate-800">
                  <div className="h-3 rounded-full bg-sky-500" style={{ width: `${item.count * 16}px` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-slate-900/40">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Trend chart</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Safety score trends</h3>
          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData.length ? trendData : [{ name: "Empty", score: 0 }] }>
                <CartesianGrid stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                <Line type="monotone" dataKey="score" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-slate-900/40">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Distribution</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Alert severity</h3>
          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={alertSeverity} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                <Bar dataKey="count" fill="#38bdf8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
