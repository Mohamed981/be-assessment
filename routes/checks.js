const express = require("express");
const jwt = require("../utils/jwt");
const checksController = require("../controllers/checks.controller");

const router = express.Router();

router.post("/", jwt.jwtDecode, checksController.createCheck);
router.get("/", jwt.jwtDecode, checksController.getChecks);
router.get("/:checkid",jwt.jwtDecode, checksController.getCheckById);
// router.get("/tags/:tag",jwt.jwtDecode, checksController.getCheckByTag);
router.put("/:checkid",jwt.jwtDecode, checksController.updateCheck);
router.delete("/:checkid",jwt.jwtDecode, checksController.deleteCheck);

module.exports = router;
