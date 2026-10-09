const { readJson } = require('../utils/jsonReader');

class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    /** @type {import('@playwright/test').Page} */
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async waitForElement(selector) {
    await this.page.locator(selector).waitFor({ state: 'visible' });
  }

  async getLocatorFromJson(fileName, key) {
    const locatorJson = readJson(`locators/${fileName}.json`);
    return locatorJson[key];
  }
}

module.exports = BasePage;
