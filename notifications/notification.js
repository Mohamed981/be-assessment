const mail = require("./mail-notify");
const firebase = require("./firebase-notify");
const slack = require("./slack-notify");

module.exports = class notification {
  static getNotifications(message, webhook) {
    mail.notify(message, webhook);
    firebase.notify(message, webhook);
    slack.notify(message, webhook);
  }
};
