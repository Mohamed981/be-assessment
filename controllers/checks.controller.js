const Check = require("../models/check.model");
const Report = require("../models/report.model");
const axios = require("../utils/axios");
const cronService = require("../services/cron.service");

createCheck = async (req, res) => {
  const check = await Check.findOne({ name: req.body.name });
  if (check)
    return res.send({
      status: "error",
      message: "There is a check with the same name",
    });

  const newCheck = new Check({
    userid: req.userid,
    name: req.body.name,
    protocol: req.body.protocol,
    url: req.body.url,
    path: req.body.path,
    port: req.body.port,
    webhook: req.body.webhook,
    timeout: req.body.timeout,
    interval: req.body.interval,
    threshold: req.body.threshold,
    authentication: req.body.authentication,
    httpHeaders: req.body.httpHeaders,
    assert: req.body.assert,
    tags: req.body.tags,
    ignoreSSL: req.body.ignoreSSL,
  });
  await newCheck.save();
  cronService.addCheck(newCheck);
  await Report.create({
    checkid: newCheck._id,
  });
  return res.send({ status: "ok", message: "Check Created" });
};

getChecks = async (req, res) => {
  const checks = await Check.find({});
  res.send(checks);
};
getCheckById = async (req, res) => {
  const check = await Check.findById(req.params.checkid);
  res.send({ status: "ok", message: check });
};
// getCheckByTag = async (req, res) => {
//   const checks = await Check.find({ tags: { $all: [req.params.tag] } });
//   return res.send({ status: "ok", message: checks });
// };

updateCheck = async (req, res) => {
  await Check.findOneAndUpdate(
    { _id: req.params.checkid },
    { $set: { ...req.body } }
  );
  res.send({ status: "ok", message: "Check Updated" });
};
deleteCheck = async (req, res) => {
  cronService.removeCheck(req.params.checkid);
  await Check.deleteOne({ _id: req.params.checkid });
  await Report.deleteOne({ checkid: req.params.checkid });
  return res.send({ status: "ok", mesage: "Check deleted" });
};

module.exports = {
  getChecks,
  getCheckById,
  // getCheckByTag,
  createCheck,
  updateCheck,
  deleteCheck,
};
