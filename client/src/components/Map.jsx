import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png"
});

export default function Map({ data, route }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const circleRef = useRef(null);
  const fastestLayerRef = useRef(null);
  const safestLayerRef = useRef(null);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, { zoomControl: true }).setView([12.97, 77.59], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 18
      }).addTo(mapInstanceRef.current);
    }
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (data?.coordinates) {
      const { latitude, longitude } = data.coordinates;
      map.setView([latitude, longitude], 14, { animate: true });

      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }
      if (circleRef.current) {
        map.removeLayer(circleRef.current);
      }

      markerRef.current = L.circleMarker([latitude, longitude], {
        radius: 10,
        fillColor: data.status === "safe" ? "#22c55e" : data.status === "moderate" ? "#f59e0b" : "#ef4444",
        color: "#ffffff",
        weight: 2,
        fillOpacity: 0.85
      }).addTo(map);

      markerRef.current.bindPopup(`
        <div style="text-align:center; color:#fff;">
          <strong>${data.location || data.name || "Selected location"}</strong><br />
          Score: ${data.score} • ${data.risk?.toUpperCase() || "N/A"}
        </div>
      `);

      if (data.status === "dangerous") {
        circleRef.current = L.circle([latitude, longitude], {
          radius: 450,
          color: "#ef4444",
          fillColor: "#ef4444",
          fillOpacity: 0.1,
          weight: 2
        }).addTo(map);
      }
    }
  }, [data]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const resetRouteLayer = (layerRef) => {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
    };

    resetRouteLayer(fastestLayerRef);
    resetRouteLayer(safestLayerRef);

    if (route?.fastestRoute?.path) {
      fastestLayerRef.current = L.geoJSON(route.fastestRoute.path, {
        style: { color: "#38bdf8", weight: 5, opacity: 0.8 }
      }).addTo(map);
    }
    if (route?.safestRoute?.path) {
      safestLayerRef.current = L.geoJSON(route.safestRoute.path, {
        style: { color: "#22c55e", weight: 5, opacity: 0.8, dashArray: "8 8" }
      }).addTo(map);
    }

    const group = L.featureGroup([fastestLayerRef.current, safestLayerRef.current].filter(Boolean));
    if (group.getLayers().length > 0) {
      map.fitBounds(group.getBounds().pad(0.3), { animate: true });
    }
  }, [route]);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-3 shadow-2xl shadow-slate-900/50">
      <div className="mb-4 flex items-center justify-between gap-3 px-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Geospatial view</p>
          <h3 className="text-lg font-semibold text-white">Live route & safety map</h3>
        </div>
      </div>
      <div ref={mapRef} className="h-[520px] rounded-3xl border border-slate-800 bg-slate-900" />
    </div>
  );
}
