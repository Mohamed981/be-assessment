const express = require("express");
const jwt = require("../utils/jwt");
const checksController = require("../controllers/checks.controller");

const router = express.Router();

router.post("/", jwt.verifyToken, checksController.createCheck);
router.get("/", jwt.verifyToken, checksController.getChecks);
router.get("/:checkid",jwt.verifyToken, checksController.getCheckById);
router.put("/:checkid",jwt.verifyToken, checksController.updateCheck);
router.delete("/:checkid",jwt.verifyToken, checksController.deleteCheck);

module.exports = router;
