const express = require("express");
const jwt = require("../utils/jwt");
const reportsController = require("../controllers/reports.controller");

const router = express.Router();

// router.post("/", jwt.jwtDecode, reportsController.createCheck);
router.get("/", jwt.jwtDecode, reportsController.getReports);
// router.get("/:id", reportsController.getCheck);
// router.get("/:id", reportsController.getCheck);
// router.put("/:id", creportsController.updateCheck);
// router.delete("/:id", reportsController.deleteCheck);

module.exports = router;