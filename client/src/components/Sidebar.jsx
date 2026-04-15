import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: "🏠", path: "/" },
  { label: "Safety", icon: "🛡️", path: "/safety" },
  { label: "Alerts", icon: "🚨", path: "/alerts" },
  { label: "Routes", icon: "🗺️", path: "/routes" },
  { label: "Analytics", icon: "📊", path: "/analytics" }
];

export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xl transition-opacity xl:hidden ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] transform overflow-y-auto bg-slate-950/95 border-r border-slate-800 p-6 shadow-2xl shadow-slate-950/40 transition-transform duration-300 xl:static xl:translate-x-0 xl:shadow-none ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-400/75">SafeRoute AI</p>
            <h2 className="text-3xl font-bold text-white mt-3">Safety Cloud</h2>
          </div>
          <button
            type="button"
            className="xl:hidden rounded-2xl bg-slate-900/90 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `group flex items-center gap-4 rounded-3xl px-4 py-4 text-sm font-semibold transition ${
                  isActive
                    ? "border border-sky-400 bg-slate-900 text-white shadow-lg shadow-sky-500/10"
                    : "border border-slate-800 bg-slate-900/70 text-slate-200 hover:border-sky-500 hover:bg-slate-900"
                }`
              }
              onClick={onClose}
            >
              <motion.span whileHover={{ x: 4 }}>{item.icon}</motion.span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="mt-auto rounded-3xl border border-slate-800 bg-slate-900/70 p-5 text-sm text-slate-300">
          <p className="font-semibold text-slate-100">Pro safety engine</p>
          <p className="mt-2 text-slate-400">Powered by live alerts, route scoring, and risk heatmap analytics.</p>
        </div>
      </aside>
    </>
  );
}
