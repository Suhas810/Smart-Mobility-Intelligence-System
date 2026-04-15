import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const api = axios.create({ baseURL: API_BASE_URL, headers: { "Content-Type": "application/json" } });

export async function getSafetyScore({ latitude, longitude }) {
  const response = await api.post("/api/safety-score", { latitude, longitude });
  return response.data;
}

export async function getAlerts() {
  const response = await api.get("/api/alerts");
  return response.data;
}

export async function getRoute(payload) {
  const response = await api.post("/api/route", payload);
  return response.data;
}

export async function getHistory() {
  const response = await api.get("/api/history");
  return response.data;
}

export async function saveHistory(entry) {
  const response = await api.post("/api/history", entry);
  return response.data;
}
