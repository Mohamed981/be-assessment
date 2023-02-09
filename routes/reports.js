const express = require("express");
const jwt = require("../utils/jwt");
const reportsController = require("../controllers/reports.controller");

const router = express.Router();

router.get("/", jwt.verifyToken, reportsController.getReports);

module.exports = router;