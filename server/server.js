require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: true } });
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/safe-route-ai";

app.use(cors());
app.use(express.json());

// Serve static frontend files from public folder (built frontend)
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api", apiRoutes);
app.get("/health", (req, res) => res.json({ status: "Server is running" }));

// MongoDB connection (optional - logs error but doesn't crash if unavailable)
if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((error) => console.warn("⚠️ MongoDB connection warning:", error.message));
}

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.emit("alertUpdate", {
    id: "welcome-alert",
    type: "System",
    title: "Real-time alerts ready",
    message: "SafeRoute AI is streaming live safety updates.",
    location: "Global",
    severity: "low"
  });
});

const periodicAlerts = [
  {
    id: "alert-100",
    type: "Lighting issue",
    title: "Dark streets near Jayanagar",
    message: "Lighting conditions have deteriorated in the park area.",
    location: "Jayanagar",
    severity: "medium"
  },
  {
    id: "alert-101",
    type: "Traffic slow-down",
    title: "Slow traffic on Outer Ring Road",
    message: "Expect heavier travel time for eastbound routes.",
    location: "Outer Ring Road",
    severity: "medium"
  },
  {
    id: "alert-102",
    type: "Incident report",
    title: "Crowd activity near MG Road",
    message: "Increased incidents reported, avoid if possible.",
    location: "MG Road",
    severity: "high"
  }
];

setInterval(() => {
  const alert = periodicAlerts[Math.floor(Math.random() * periodicAlerts.length)];
  io.emit("alertUpdate", alert);
}, 20000);

// SPA fallback - serve frontend index.html for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Safety Alert Server running on http://0.0.0.0:${PORT}`);
});

