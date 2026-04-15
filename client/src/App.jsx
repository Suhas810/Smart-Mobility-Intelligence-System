import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Safety from "./pages/Safety";
import Alerts from "./pages/Alerts";
import RoutesPage from "./pages/Routes";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="safety" element={<Safety />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="routes" element={<RoutesPage />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
