import { useLocation } from "react-router-dom";

const pageLabels = {
  "/": "Dashboard",
  "/safety": "Safety",
  "/alerts": "Alerts",
  "/routes": "Routes",
  "/analytics": "Analytics"
};

export default function Navbar({ onMenuToggle }) {
  const location = useLocation();
  const title = pageLabels[location.pathname] || "SafeRoute AI";

  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-800 bg-slate-950/80 px-6 py-5 backdrop-blur-xl xl:pl-0">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuToggle}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/80 text-slate-200 transition hover:border-sky-500 xl:hidden"
        >
          ☰
        </button>
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-sky-400">{title}</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Real-time route intelligence</h1>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 px-4 py-3 text-sm text-slate-300">
          <span className="font-semibold text-white">USER</span> | Analyst
        </div>
        <button className="rounded-3xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
          Create Alert
        </button>
      </div>
    </header>
  );
}
