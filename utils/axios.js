const axios = require("axios").default;
const Report = require("../models/report.model");

notification = require("../notifications/notification");

const handleReport = async (defaults, response) => {
  const report = await Report.findOne({ checkid: defaults.headers.checkid });
  if (response.status === defaults.assert) {
    if (report.status !== defaults.assert)
      notification.getNotifications(
        "System " + defaults.headers.checkid + " is up",
        defaults.webhooh
      );
    report.status = response.status;
    report.uptime = report.uptime + defaults.interval * 60;
    report.responsetime = response.duration;
    report.history.push(
      "Time: " +
        new Date().toISOString() +
        " Response Time: " +
        report.responsetime +
        "  Status: " +
        report.status +
        "  Result: PASS"
    );
  } else {
    if (report.status !== response.response.status)
      notification.getNotifications(
        "System " + defaults.headers.checkid + " is down",
        defaults.webhooh
      );
    report.status = response.response.status;
    report.outages += 1;
    report.downtime = report.downtime + defaults.interval * 60;
    report.responsetime = response.duration;
    report.history.push(
      "Time: " +
        new Date().toISOString() +
        "  Response Time: " +
        report.responsetime +
        "  Status: " +
        report.status +
        "  Result: FAIL"
    );
  }
  report.availability =
    (report.uptime / (report.uptime + report.downtime)) * 100;

  await report.save();
};

const interceptRequest = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      const newConfig = { ...config };
      newConfig.metadata = {
        interval: instance.defaults.interval,
        retry: --instance.defaults.retry,
        startTime: new Date(),
      };
      return newConfig;
    },
    (error) => {
      console.log("request error");
    }
  );
};
const interceptResponse = (instance) => {
  instance.interceptors.response.use(
    (response) => {
      const newRes = { ...response };
      newRes.config.metadata.endTime = new Date();
      newRes.duration =
        newRes.config.metadata.endTime - newRes.config.metadata.startTime;
      return handleReport(instance.defaults, newRes);
    },
    (error) => {
      const newError = { ...error };
      newError.config.metadata.endTime = new Date();
      newError.duration =
        newError.config.metadata.endTime - newError.config.metadata.startTime;
      if (error.config.metadata.retry === 0)
        return handleReport(instance.defaults, newError);
      instance.get(instance.baseURL);
    }
  );
};

const createAxios = (check) => {
  let url = check.url;
  if (check.path !== undefined) url += "/" + check.path;
  if (check.port !== undefined) url += ":" + check.port;

  const instance = axios.create({
    baseURL: url,
    timeout: check.timeout * 1000,
    headers: {
      checkid: check._id,
      authentication: check.authentication,
      ...check.httpHeaders,
    },
    webhook: check.webhook,
    rejectUnauthorized: !check.ignoreSSL,
    retry: check.threshold,
    interval: check.interval,
    assert: check.assert.statusCode,
  });
  interceptRequest(instance);
  interceptResponse(instance);

  instance.get(url).catch((error) => {
    console.log("ERROR: ", error);
  });
  return instance;
};
module.exports = { createAxios };
