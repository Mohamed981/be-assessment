const Report = require("../models/report.model");
const Check = require("../models/check.model");

const getReports = async (req, res) => {
  const reports = await Report.find({});
  res.send(reports);
};

const getReportsByTag = async (req, res) => {
  const checks = await Check.find(
    { tags: { $all: [req.params.tag] } },
    { _id: 1 }
  );
  let Reports = [];
  await checks.map(async (check) => {
    let report = await Report.findOne({
      checkid: check._id,
    });
    console.log(Reports);
    await Reports.push(report);
  });
  return res.send({ status: "ok", message: Reports });
};
module.exports = { getReports, getReportsByTag };
