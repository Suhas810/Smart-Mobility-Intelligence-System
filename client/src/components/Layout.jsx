import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Toast from "./Toast";
import { useApp } from "../context/AppContext";

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toast, error, clearError, clearToast } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="min-h-screen xl:pl-[280px]">
        <Navbar onMenuToggle={() => setMobileOpen((value) => !value)} />
        <main className="px-6 py-6">
          <Outlet />
        </main>
      </div>

      {toast && (
        <Toast
          title={toast.type === "success" ? "Success" : "Info"}
          message={toast.message}
          subtitle={toast.subtitle}
          type={toast.type}
          onClose={clearToast}
        />
      )}
      {error && <Toast title="Error" message={error} type="error" onClose={clearError} />}
    </div>
  );
}
