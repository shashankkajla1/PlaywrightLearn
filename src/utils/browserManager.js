const { chromium } = require('@playwright/test');

class BrowserManager {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  async launchBrowser() {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    return this.page;
  }

  async closeBrowser() {
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}

module.exports = BrowserManager;
