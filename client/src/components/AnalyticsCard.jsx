import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const sampleData = [
  { name: "MG Road", safety: 28 },
  { name: "Indiranagar", safety: 82 },
  { name: "Whitefield", safety: 65 },
  { name: "Cubbon", safety: 91 },
  { name: "Airport Rd", safety: 55 }
];

export default function AnalyticsCard() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-slate-900/40">
      <div className="mb-5">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Analytics</p>
        <h3 className="text-xl font-semibold text-white">Safety trends</h3>
      </div>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sampleData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#1e293b" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
            <Bar dataKey="safety" fill="#38bdf8" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
