const env = require('./env');

const config = {
  app: {
    baseUrl: env.baseUrl,
  },
  api: {
    baseUrl: env.apiBaseUrl,
  },
  browser: {
    name: env.browser,
    headless: env.headless,
  },
};

module.exports = config;
