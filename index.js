require("dotenv").config({ path: ".env" });

const connectDB = require("./database");

const express = require("express");
const cors = require("cors");

const app = express();

const auth = require("./routes/auth");
const checks = require("./routes/checks");
const reports = require("./routes/reports");
const jwt = require("./utils/jwt");
const reportsController = require("./controllers/reports.controller");
const cronService = require("./services/cron.service");

async function initialize() {
  await connectDB();
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/checks", checks);
  app.use("/api/reports", reports);
  app.use("/api/tags/:tag", jwt.verifyToken, reportsController.getReportsByTag);

  cronService.start();

  app.listen(process.env.PORT, () => {
    console.log("Server started on Port ", process.env.PORT);
  });
}

initialize();
