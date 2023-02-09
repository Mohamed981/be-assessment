const Report = require("../models/report.model");
const Check = require("../models/check.model");

const getReports = async (req, res) => {
  const checks = await Check.find(
    { userid: req.userid },
    { _id: 1 }
  );
  let Reports = [];
  for (let i = 0; i < checks.length; i++) {
    let report = await Report.findOne({
      checkid: checks[i]._id,
    });
    await Reports.push(report);
  }
  return res.send({ status: "ok", message: Reports });
};

const getReportsByTag = async (req, res) => {
  const checks = await Check.find(
    { tags: { $all: [req.params.tag] }, userid: req.userid },
    { _id: 1 }
  );
  let Reports = [];
  for (let i = 0; i < checks.length; i++) {
    let report = await Report.findOne({
      checkid: checks[i]._id,
    });
    await Reports.push(report);
  }
  return res.send({ status: "ok", message: Reports });
};
module.exports = { getReports, getReportsByTag };
