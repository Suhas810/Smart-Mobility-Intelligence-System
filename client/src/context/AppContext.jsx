import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import {
  getAlerts as fetchAlertsApi,
  getHistory as fetchHistoryApi,
  getRoute as fetchRouteApi,
  getSafetyScore as fetchSafetyScoreApi,
  saveHistory as saveHistoryApi
} from "../services/api";

const AppContext = createContext(null);
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function AppProvider({ children }) {
  const [location, setLocation] = useState(null);
  const [safetyData, setSafetyData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [routeResult, setRouteResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [routeLoading, setRouteLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = io(API_BASE_URL, { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("Socket connected", socket.id);
    });

    socket.on("alertUpdate", (alert) => {
      setAlerts((prev) => [alert, ...prev].slice(0, 12));
      setToast({ type: "info", message: alert.title, subtitle: alert.location });
    });

    socket.on("connect_error", (err) => {
      console.error("Socket error", err);
      setError("Unable to connect to live alerts.");
    });

    return () => socket.disconnect();
  }, []);

  const loadInitialData = useCallback(async () => {
    try {
      const [alertsData, historyData] = await Promise.all([fetchAlertsApi(), fetchHistoryApi()]);
      setAlerts(alertsData);
      setHistory(historyData);
    } catch (err) {
      console.error(err);
      setError("Unable to load initial data.");
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const clearError = () => setError(null);
  const clearToast = () => setToast(null);

  const selectLocation = async (locationPayload) => {
    setLocation(locationPayload);
    setLoading(true);
    setError(null);
    try {
      const safety = await fetchSafetyScoreApi(locationPayload);
      setSafetyData(safety);
      setHistory((prev) => [safety, ...prev].slice(0, 10));
      await saveHistoryApi({
        action: "safety",
        location: safety.location,
        risk: safety.risk,
        score: safety.score,
        coordinates: safety.coordinates
      });
      setToast({ type: "success", message: `Safety score loaded for ${safety.location}` });
    } catch (err) {
      console.error(err);
      setError("Unable to fetch safety score.");
    } finally {
      setLoading(false);
    }
  };

  const calculateRoute = async (payload) => {
    setRouteLoading(true);
    setError(null);
    try {
      const route = await fetchRouteApi(payload);
      setRouteResult(route);
      setHistory((prev) => [{ action: "route", location: `${payload.source} → ${payload.destination}`, score: null, risk: null, coordinates: null, createdAt: new Date() }, ...prev].slice(0, 10));
      await saveHistoryApi({
        action: "route",
        location: `${payload.source} → ${payload.destination}`,
        score: null,
        risk: null,
        coordinates: null
      });
      setToast({ type: "success", message: "Route recommendations ready" });
    } catch (err) {
      console.error(err);
      setError("Unable to calculate routes.");
    } finally {
      setRouteLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      location,
      safetyData,
      alerts,
      routeResult,
      history,
      loading,
      routeLoading,
      toast,
      error,
      selectLocation,
      calculateRoute,
      clearError,
      clearToast
    }),
    [location, safetyData, alerts, routeResult, history, loading, routeLoading, toast, error]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return context;
}
