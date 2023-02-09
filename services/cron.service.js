const cron = require("node-cron");
const axios = require("../utils/axios");
const Check = require("../models/check.model");

tasks = {};

const schedule = (check) => {
  return cron.schedule(`*/${check.interval} * * * *`, function () {
    axios.createAxios(check);
  });
};

const start = async () => {
  const checks = await Check.find({});
  checks.forEach((check) => (tasks[check._id.toString()] = schedule(check)));
};
const addCheck = async (check) => {
  tasks[check._id.toString()] = schedule(check);
};

const removeCheck = async (checkid) => {
  tasks[checkid].stop();
};

module.exports = { start, addCheck, removeCheck };
