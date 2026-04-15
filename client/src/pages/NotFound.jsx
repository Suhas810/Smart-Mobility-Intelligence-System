import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-10 text-center shadow-2xl shadow-slate-900/40">
      <h1 className="text-5xl font-semibold text-white">404</h1>
      <p className="mt-4 text-lg text-slate-300">Page not found</p>
      <p className="mt-2 text-slate-400">The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="mt-6 inline-flex rounded-3xl bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
        Return home
      </Link>
    </div>
  );
}
