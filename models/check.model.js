const mongoose = require("mongoose");

const Check = new mongoose.Schema(
  {
    userid: { type: mongoose.Schema.ObjectId, ref: "User" },
    name: { type: String, required: true },
    url: { type: String, required: true },
    protocol: { type: String, required: true },
    path: { type: String },
    port: { type: String },
    webhook: { type: String },
    timeout: { type: Number, default: 5 },
    interval: { type: Number, default: 10 },
    threshold: { type: Number, default: 1 },
    authentication: { username: String, password: String },
    httpHeaders: { type: [Object] },
    assert: { statusCode: { type: Number, default: 200 } },
    tags: { type: [String] },
    ignoreSSL: { type: Boolean },
  },
  { collection: "check" }
);

const model = mongoose.model("Check", Check);

module.exports = model;
