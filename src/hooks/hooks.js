const { Before, After, Status, setDefaultTimeout } = require('@cucumber/cucumber');
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


After(async function ({ result }) {
  try {
    if (result.status === Status.FAILED && this.page && !this.page.isClosed()) {
      await this.attach(await this.page.screenshot({ fullPage: true }), 'image/png');
    }
  } finally {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
});
