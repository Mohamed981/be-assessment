const mongoose = require("mongoose");

const Report = new mongoose.Schema(
  {
    checkid: { type: mongoose.Schema.ObjectId, ref: "Check" },
    status: { type: Number, default: 200 },
    availability: { type: Number, default: 0 },
    outages: { type: Number, default: 0 },
    downtime: { type: Number, default: 0 },
    uptime: { type: Number, default: 0 },
    responsetime: { type: Number, default: 0 },
    history: { type: [String], default: [] },
  },
  { collection: "report" }
);

const model = mongoose.model("Report", Report);

module.exports = model;
