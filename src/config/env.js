require('dotenv').config();

const env = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com/',
  apiBaseUrl: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  browser: process.env.BROWSER || 'chromium',
  headless: process.env.HEADLESS !== 'false',
};

module.exports = env;
