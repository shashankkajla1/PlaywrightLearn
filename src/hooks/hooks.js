const { Before, After, AfterStep, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { createMemory } = require('../utils/memory');

setDefaultTimeout(30000);

Before({ tags: '@memory or @memory_tidyup' }, function ({ pickle }) {
  this.memory = createMemory(pickle.uri);
});

Before(async function () {
  this.browser = await chromium.launch({
    headless: process.env.HEADLESS !== 'false',
  });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});


After(async function () {
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});

AfterStep(async function () {
  if (this.page && this._test && this._test.outcome && this._test.outcome.status === 'failed') {
    await this.page.screenshot({ path: `reports/failed-step-${Date.now()}.png`, fullPage: true });
  }
});
