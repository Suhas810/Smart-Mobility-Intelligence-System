const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    action: { type: String, required: true },
    location: { type: String, required: true },
    risk: { type: String, default: null },
    score: { type: Number, default: null },
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);
