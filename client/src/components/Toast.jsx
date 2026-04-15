import { motion } from "framer-motion";

export default function Toast({ title, message, subtitle, type = "success", onClose }) {
  const color = type === "error" ? "bg-rose-500/95" : "bg-sky-500/95";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className={`fixed right-6 top-6 z-50 max-w-sm rounded-3xl border border-slate-800 p-5 shadow-2xl shadow-slate-950/60 ${color}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-slate-200">{title}</p>
          <p className="mt-2 text-sm font-semibold text-white">{message}</p>
          {subtitle && <p className="mt-1 text-xs text-slate-100/80">{subtitle}</p>}
        </div>
        <button onClick={onClose} className="text-slate-100 transition hover:text-white/80">
          ✕
        </button>
      </div>
    </motion.div>
  );
}
