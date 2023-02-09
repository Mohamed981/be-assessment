const options = require("./swagger");
const servers = require("./servers");
const tags = require("./tags");
const auth = require("./auth");
const components = require("./components");

module.exports = {
  ...options,
  ...servers,
  ...tags,
  ...auth,
  ...components
};
