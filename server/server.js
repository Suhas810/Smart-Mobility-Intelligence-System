require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: true } });
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/safe-route-ai";

app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes);
app.get("/health", (req, res) => res.json({ status: "Server is running" }));

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

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

server.listen(PORT, () => {
  console.log(`🚀 Safety Alert Server running on http://localhost:${PORT}`);
});
