const { defineConfig, devices } = require('@playwright/test');

const suite = process.env.ALLURE_SUITE || 'ui';
const reportDirectory = `reports/${suite}`;

module.exports = defineConfig({
  testDir: './src/tests',
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: `${reportDirectory}/playwright-report`, open: 'never' }],
    ['allure-playwright', { resultsDir: `${reportDirectory}/allure-results` }],
  ],
  outputDir: `${reportDirectory}/test-results`,
  fullyParallel: true,
  retries: 1,
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: process.env.HEADLESS !== 'false',
    browserName: process.env.BROWSER || 'chromium',
    viewport: { width: 1440, height: 900 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
