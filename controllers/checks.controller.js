const Check = require("../models/check.model");
const Report = require("../models/report.model");
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
  const checks = await Check.find({ userid: req.userid });
  res.send(checks);
};

getCheckById = async (req, res) => {
  const check = await Check.findById(req.params.checkid);
  res.send({ status: "ok", message: check });
};

updateCheck = async (req, res) => {
  if (req.body.name !== undefined) {
    const check = await Check.find({
      name: req.body.name,
      _id: { $ne: req.params.checkid },
    });
    if (check)
      return res.send({
        status: "error",
        message: "There is a check with the same name",
      });
  }

  await Check.findOneAndUpdate(
    { _id: req.params.checkid },
    { $set: { ...req.body } }
  );
  const updatedCheck = await Check.findById(req.params.checkid);
  cronService.removeCheck(req.params.checkid);
  cronService.addCheck(updatedCheck);
  res.send({ status: "ok", message: "Check Updated" });
};

deleteCheck = async (req, res) => {
  await Check.deleteOne({ _id: req.params.checkid });
  await Report.deleteOne({ checkid: req.params.checkid });
  cronService.removeCheck(req.params.checkid);
  return res.send({ status: "ok", mesage: "Check deleted" });
};

module.exports = {
  getChecks,
  getCheckById,
  createCheck,
  updateCheck,
  deleteCheck,
};
